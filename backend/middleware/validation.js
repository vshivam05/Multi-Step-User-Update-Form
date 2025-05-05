const validateUser = (req, res, next) => {
  const {
    profilePhoto,
    username,
    password,
    gender,
    customGender,
    profession,
    companyName,
    address,
    subscriptionPlan,
    newsletter,
  } = req.body;

  if (!profilePhoto && !req.file) {
    return res.status(400).json({ error: "Profile photo is required" });
  }

  if (username && !/^[^\s]{4,20}$/.test(username)) {
    return res.status(400).json({ error: "Invalid username format" });
  }

  if (
    password &&
    !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(password)
  ) {
    return res.status(400).json({ error: "Invalid password format" });
  }

  if (!gender || !["Male", "Female", "Other"].includes(gender)) {
    return res
      .status(400)
      .json({ error: "Gender is required and must be Male, Female, or Other" });
  }

  if (gender === "Other" && !customGender) {
    return res
      .status(400)
      .json({ error: "Custom gender is required when gender is Other" });
  }

  if (
    !profession ||
    !["Student", "Developer", "Entrepreneur"].includes(profession)
  ) {
    return res
      .status(400)
      .json({
        error:
          "Profession is required and must be Student, Developer, or Entrepreneur",
      });
  }

  if (profession === "Entrepreneur" && !companyName) {
    return res
      .status(400)
      .json({ error: "Company name is required for entrepreneurs" });
  }

  if (
    !address ||
    !address.line1 ||
    !address.country ||
    !address.state ||
    !address.city
  ) {
    return res
      .status(400)
      .json({
        error: "Complete address (line1, country, state, city) is required",
      });
  }

  if (
    !subscriptionPlan ||
    !["Basic", "Pro", "Enterprise"].includes(subscriptionPlan)
  ) {
    return res
      .status(400)
      .json({
        error:
          "Subscription plan is required and must be Basic, Pro, or Enterprise",
      });
  }

  if (newsletter !== undefined && typeof newsletter !== "boolean") {
    return res
      .status(400)
      .json({ error: "Newsletter must be a boolean value" });
  }

  next();
};

module.exports = { validateUser };
