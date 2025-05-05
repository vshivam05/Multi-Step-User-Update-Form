import React, { useState, useEffect, useCallback } from "react";
import Step1PersonalInfo from "./Step1PersonalInfo";
import Step2ProfessionalDetails from "./Step2ProfessionalDetails";
import Step3Preferences from "./Step3Preferences";
import Summary from "./Summary";
import {
  fetchCountries,
  fetchStates,
  fetchCities,
  checkUsernameAvailability,
  API,
} from "../api/api";

const initialFormData = {
  profilePhoto: null,
  profilePhotoPreview: null,
  username: "",
  password: "",
  profession: "",
  companyName: "",
  addressLine1: "",
  country: "",
  state: "",
  city: "",
  subscriptionPlan: "Basic",
  newsletter: true,
  gender: "",
  customGender: "",
};

const passwordStrength = (pwd) =>
  [pwd.length >= 8, /\d/.test(pwd), /[!@#$%^&*]/.test(pwd)].filter(Boolean)
    .length;

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [passwordStrengthScore, setPasswordStrengthScore] = useState(0);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Load data
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
      } catch (error) {
        console.error("Failed to load countries:", error);
      }
    };

    loadCountries();
  }, []);

  useEffect(() => {
    const loadStates = async () => {
      if (!formData.country) return;

      try {
        const data = await fetchStates(formData.country);
        setStates(data);
        setFormData((prev) => ({ ...prev, state: "", city: "" }));
        setCities([]);
      } catch (error) {
        console.error("Failed to fetch states:", error);
      }
    };

    loadStates();
  }, [formData.country]);

  useEffect(() => {
    const loadCities = async () => {
      if (!formData.state) return;

      try {
        const data = await fetchCities(formData.state);
        setCities(data);
        setFormData((prev) => ({ ...prev, city: "" }));
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    };

    loadCities();
  }, [formData.state]);

  useEffect(() => {
    setPasswordStrengthScore(passwordStrength(formData.password));
  }, [formData.password]);

  const debouncedCheckUsername = useCallback(
    debounce(async (username) => {
      setUsernameAvailable(await checkUsernameAvailability(username));
    }, 500),
    []
  );

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "profilePhoto") {
      const file = files[0];
      if (!file) return;

      if (!["image/jpeg", "image/png"].includes(file.type)) {
        return setErrors((prev) => ({
          ...prev,
          profilePhoto: "Only JPG/PNG allowed",
        }));
      }
      if (file.size > 2 * 1024 * 1024) {
        return setErrors((prev) => ({
          ...prev,
          profilePhoto: "Max size is 2MB",
        }));
      }

      URL.revokeObjectURL(formData.profilePhotoPreview);
      setFormData((prev) => ({
        ...prev,
        profilePhoto: file,
        profilePhotoPreview: URL.createObjectURL(file),
      }));
      setErrors((prev) => ({ ...prev, profilePhoto: null }));
    } else {
      const newVal = type === "checkbox" ? checked : value;
      setFormData((prev) => ({ ...prev, [name]: newVal }));

      if (name === "username") debouncedCheckUsername(value);
    }
  };

  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.profilePhoto)
        newErrors.profilePhoto = "Profile photo is required";
      if (
        !formData.username ||
        formData.username.length < 4 ||
        /\s/.test(formData.username)
      ) {
        newErrors.username = "4-20 chars, no spaces";
      } else if (usernameAvailable === false) {
        newErrors.username = "Username not available";
      }
    } else if (step === 2) {
      if (!formData.profession) newErrors.profession = "Profession required";
      if (formData.profession === "Entrepreneur" && !formData.companyName) {
        newErrors.companyName = "Company name required";
      }
    } else if (step === 3) {
      if (!formData.addressLine1) newErrors.addressLine1 = "Address required";
      if (!formData.country) newErrors.country = "Country required";
      if (!formData.state) newErrors.state = "State required";
      if (!formData.city) newErrors.city = "City required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => validateStep() && setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    if (!validateStep()) return;

    const data = new FormData();

    Object.entries(formData).forEach(([key, val]) => {
      if (key === "profilePhotoPreview") return;

      if (key === "addressLine1") data.append("address.line1", val);
      else if (key === "country") data.append("address.country", val);
      else if (key === "state") data.append("address.state", val);
      else if (key === "city") data.append("address.city", val);
      else data.append(key, val);
    });

    // Debug log
    for (let pair of data.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const res = await fetch(`${API}/api/users`, {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        alert("Profile submitted successfully!");
        setFormData(initialFormData);
        setStep(1);
      } else {
        alert("Error: " + result.error);
      }
    } catch (err) {
      alert("Submission failed: " + err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      {step === 1 && (
        <Step1PersonalInfo
          formData={formData}
          errors={errors}
          usernameAvailable={usernameAvailable}
          passwordStrengthScore={passwordStrengthScore}
          onInputChange={handleInputChange}
        />
      )}
      {step === 2 && (
        <Step2ProfessionalDetails
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
        />
      )}
      {step === 3 && (
        <Step3Preferences
          formData={formData}
          errors={errors}
          countries={countries}
          states={states}
          cities={cities}
          onInputChange={handleInputChange}
        />
      )}
      {step === 4 && (
        <Summary
          formData={formData}
          countries={countries}
          states={states}
          cities={cities}
        />
      )}

      <div className="flex justify-between mt-8">
        {step > 1 && (
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Back
          </button>
        )}
        {step < 4 ? (
          <button
            onClick={handleNext}
            className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="ml-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
