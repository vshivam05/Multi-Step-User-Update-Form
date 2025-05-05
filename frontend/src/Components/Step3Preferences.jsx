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
      <h2>Step 3: Preferences</h2>
      <div>
        <label>Country:</label>
        <select
          name="country"
          value={formData.country}
          onChange={onInputChange}
        >
          <option value="">Select Country</option>
          {countries.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.country && <p className="error">{errors.country}</p>}
      </div>
      <div>
        <label>State:</label>
        <select name="state" value={formData.state} onChange={onInputChange}>
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
        {errors.state && <p className="error">{errors.state}</p>}
      </div>
      <div>
        <label>City:</label>
        <select name="city" value={formData.city} onChange={onInputChange}>
          <option value="">Select City</option>
          {cities.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.city && <p className="error">{errors.city}</p>}
      </div>
      <div>
        <label>Subscription Plan:</label>
        <label>
          <input
            type="radio"
            name="subscriptionPlan"
            value="Basic"
            checked={formData.subscriptionPlan === "Basic"}
            onChange={onInputChange}
          />
          Basic
        </label>
        <label>
          <input
            type="radio"
            name="subscriptionPlan"
            value="Pro"
            checked={formData.subscriptionPlan === "Pro"}
            onChange={onInputChange}
          />
          Pro
        </label>
        <label>
          <input
            type="radio"
            name="subscriptionPlan"
            value="Enterprise"
            checked={formData.subscriptionPlan === "Enterprise"}
            onChange={onInputChange}
          />
          Enterprise
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="newsletter"
            checked={formData.newsletter}
            onChange={onInputChange}
          />
          Subscribe to Newsletter
        </label>
      </div>
    </div>
  );
};

export default Step3Preferences;
