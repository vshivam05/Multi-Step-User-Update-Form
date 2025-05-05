import React from "react";

const Summary = ({ formData, countries, states, cities }) => {
  return (
    <div>
      <h2>Summary</h2>
      <p>
        <strong>Username:</strong> {formData.username}
      </p>
      <p>
        <strong>Gender:</strong>{" "}
        {formData.gender === "Other" ? formData.customGender : formData.gender}
      </p>
      <p>
        <strong>Profession:</strong> {formData.profession}
      </p>
      {formData.profession === "Entrepreneur" && (
        <p>
          <strong>Company Name:</strong> {formData.companyName}
        </p>
      )}
      <p>
        <strong>Address:</strong> {formData.addressLine1},{" "}
        {states.find((s) => s._id === formData.state)?.name},{" "}
        {cities.find((c) => c._id === formData.city)?.name},{" "}
        {countries.find((c) => c._id === formData.country)?.name}
      </p>
      <p>
        <strong>Subscription Plan:</strong> {formData.subscriptionPlan}
      </p>
      <p>
        <strong>Newsletter:</strong> {formData.newsletter ? "Yes" : "No"}
      </p>
      {formData.profilePhotoPreview && (
        <img
          src={formData.profilePhotoPreview}
          alt="Profile"
          style={{ width: "100px", height: "100px" }}
        />
      )}
    </div>
  );
};

export default Summary;
