import * as express from "express";
import { authModel } from "../models/authModel";
import * as helper from "../helpers/authHelper";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await authModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: "User already exists" });
      return;
    }

    const hashedPassword = await helper.hashPassword(password);
    const newUser = await authModel.create({
      name,
      email,
      authentication: { password: hashedPassword },
      role,
    });

    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const login = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await authModel
      .findOne({ email })

      console.log(email , user?.authentication?.password)

    if (!user || !user.authentication || !user.authentication.password) {
      res.status(501).json({
        success: false,
        message: "No user find with that email , kindly register",
      });
      return;
    }

    console.log(email)

    const isPasswordValid = await helper.comparePassword(
      password,
      user.authentication.password
    );

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }

    const sessionDuration = helper.getSessionDuration(user.role);

    console.log(user.role);
    

    const sessionToken = helper.generateJWT(
      { userId: user._id, role: user.role },
      sessionDuration
    );

    user.authentication.sessionToken = sessionToken;
    await user.save();

    res.status(200).json({
      Success: true,
      Data: user,
      "Session Expires in ": sessionDuration,
      Message: " Login successfull",
    });

  } catch (error) {

    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};
