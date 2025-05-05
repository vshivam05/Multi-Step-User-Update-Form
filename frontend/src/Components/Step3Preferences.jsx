import React from "react";

const Step3Preferences = ({
  formData,
  errors,
  countries,
  states,
  cities,
  onInputChange,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Step 3: Preferences</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Country:</label>
        <select
          name="country"
          value={formData.country}
          onChange={onInputChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select Country</option>
          {countries.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="text-red-500 text-sm mt-1">{errors.country}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">State:</label>
        <select
          name="state"
          value={formData.state}
          onChange={onInputChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
        {errors.state && (
          <p className="text-red-500 text-sm mt-1">{errors.state}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">City:</label>
        <select
          name="city"
          value={formData.city}
          onChange={onInputChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select City</option>
          {cities.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.city && (
          <p className="text-red-500 text-sm mt-1">{errors.city}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Subscription Plan:
        </label>
        <div className="flex gap-4">
          {["Basic", "Pro", "Enterprise"].map((plan) => (
            <label key={plan} className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="subscriptionPlan"
                value={plan}
                checked={formData.subscriptionPlan === plan}
                onChange={onInputChange}
                className="accent-blue-600"
              />
              {plan}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            name="newsletter"
            checked={formData.newsletter}
            onChange={onInputChange}
            className="accent-blue-600"
          />
          Subscribe to Newsletter
        </label>
      </div>
    </div>
  );
};

export default Step3Preferences;
