import React from "react";

const Step2ProfessionalDetails = ({ formData, errors, onInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">
        Step 2: Professional Details
      </h2>
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Profession:</label>
        <select
          name="profession"
          value={formData.profession}
          onChange={onInputChange}
          className="border border-gray-300 rounded p-2"
        >
          <option value="">Select Profession</option>
          <option value="Student">Student</option>
          <option value="Developer">Developer</option>
          <option value="Entrepreneur">Entrepreneur</option>
        </select>
        {errors.profession && (
          <p className="text-red-600">{errors.profession}</p>
        )}
      </div>
      {formData.profession === "Entrepreneur" && (
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={onInputChange}
            className="border border-gray-300 rounded p-2"
          />
          {errors.companyName && (
            <p className="text-red-600">{errors.companyName}</p>
          )}
        </div>
      )}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Address Line 1:</label>
        <input
          type="text"
          name="addressLine1"
          value={formData.addressLine1}
          onChange={onInputChange}
          className="border border-gray-300 rounded p-2"
        />
        {errors.addressLine1 && (
          <p className="text-red-600">{errors.addressLine1}</p>
        )}
      </div>
    </div>
  );
};

export default Step2ProfessionalDetails;
