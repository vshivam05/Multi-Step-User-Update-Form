import React from "react";

const Step1PersonalInfo = ({
  formData,
  errors,
  usernameAvailable,
  passwordStrengthScore,
  onInputChange,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Step 1: Personal Info</h2>
      <div className="flex flex-col">
        <label className="mb-1 font-medium">
          Profile Photo (JPG/PNG, max 2MB):
        </label>
        <input
          type="file"
          name="profilePhoto"
          accept="image/jpeg,image/png"
          onChange={onInputChange}
          className="border border-gray-300 rounded p-2"
        />
        {errors.profilePhoto && (
          <p className="text-red-600 mt-1">{errors.profilePhoto}</p>
        )}
        {formData.profilePhotoPreview && (
          <img
            src={formData.profilePhotoPreview}
            alt="Preview"
            className="w-24 h-24 object-cover mt-2 rounded"
          />
        )}
      </div>
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={onInputChange}
          className="border border-gray-300 rounded p-2"
        />
        {usernameAvailable === true && (
          <span className="text-green-600">Username available</span>
        )}
        {usernameAvailable === false && (
          <span className="text-red-600">Username not available</span>
        )}
        {errors.username && <p className="text-red-600">{errors.username}</p>}
      </div>
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Gender:</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={onInputChange}
          className="border border-gray-300 rounded p-2"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && <p className="text-red-600">{errors.gender}</p>}
      </div>
      {formData.gender === "Other" && (
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Custom Gender:</label>
          <input
            type="text"
            name="customGender"
            value={formData.customGender}
            onChange={onInputChange}
            className="border border-gray-300 rounded p-2"
          />
          {errors.customGender && (
            <p className="text-red-600">{errors.customGender}</p>
          )}
        </div>
      )}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password || ""}
          onChange={onInputChange}
          className="border border-gray-300 rounded p-2"
        />
        {errors.password && <p className="text-red-600">{errors.password}</p>}
      </div>
    </div>
  );
};

export default Step1PersonalInfo;
