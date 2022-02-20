const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

function createToken(user, secretKey, expiresIn) {
  const { id, name, email, userName } = user;

  const payload = {
    id,
    name,
    email,
    userName,
  };

  return jwt.sign(payload, secretKey, { expiresIn });
}

function getUser() {
  onsole.log("getting user");
  return null;
}

async function register(input) {
  const newUser = input;
  newUser.email = newUser.email.toLowerCase();
  newUser.userName = newUser.userName.toLowerCase();

  const { email, userName, password } = newUser;

  //check if the email is used
  const foundEmail = await User.findOne({ email });
  if (foundEmail) throw new Error("El email ya está en uso");

  //check if the userName is used
  const foundUserName = await User.findOne({ userName });
  if (foundUserName) throw new Error("El nombre de usuario ya está en uso");

  //Encrypt password
  const salt = await bcryptjs.genSaltSync(10);
  newUser.password = await bcryptjs.hash(password, salt);

  try {
    const user = new User(newUser);
    user.save();
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function login(input) {
  const { email, password } = input;

  // Search if email exist
  const userFound = await User.findOne({ email: email.toLowerCase() });
  if (!userFound) throw new Error("Error en el email o contraseña");

  const passwordSuccess = await bcryptjs.compare(password, userFound.password);
  if (!passwordSuccess) throw new Error("Error en el email o contraseña");

  return {
    token: createToken(userFound, process.env.SECRET_KEY, "24h"),
  };
}

module.exports = {
  getUser,
  register,
  login,
};
