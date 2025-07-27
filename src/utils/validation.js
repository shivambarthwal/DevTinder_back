const validator = require("validator");

const validationSignUp = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Enter a valid name");
  } else if (!validator.isEmail(email)) {
    throw new Error("Enter a valid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a valid & Strong password");
  }
};

const validationLogin = (req) => {
  const { email, password } = req.body;
  if (!validator.isEmail(email)) {
    throw new Error("Enter a valid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a valid password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "email",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(req?.body).every((field) =>
    allowedEditFields.includes(field)
  );
  console.log(isEditAllowed);
  return isEditAllowed;
};

module.exports = { validationSignUp, validationLogin, validateEditProfileData };
