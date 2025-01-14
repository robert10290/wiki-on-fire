import loginUser from "../services/loginService.js";
import {
  InvalidArgumentException,
  InvalidPasswordException,
  NotFoundException,
} from "../services/serviceErrors.js";

/**
 * Login controller.
 *
 * @param {Object} req the request object
 * @param {Object} res the response object
 * @return {void}
 */
export default async (req, res) => {
  if (req.body.username === undefined || req.body.password === undefined)
    res
      .status(400)
      .send({ message: "username and password must be included in the body" });
  try {
    const userDataAndToken = await loginUser(
      req.body.username,
      req.body.password
    );
    const token = (({ token_type, token }) => ({ token_type, token }))(
      userDataAndToken
    );
    res.cookie("wofToken", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 8 * 60 * 60 * 100,
      domain: "localhost",
    });
    const user = userDataAndToken.user;
    delete user.dataValues.password;
    res.status(200).send(user);
  } catch (error) {
    if (error instanceof InvalidArgumentException)
      res.status(400).send({ message: "Invalid username or password type" });
    if (error instanceof InvalidPasswordException)
      res.status(400).send({ message: "Invalid password" });
    if (error instanceof NotFoundException)
      res.status(400).send({ message: "User not found" });
    res.status(400).send({ message: "Error logging in" });
  }
};
