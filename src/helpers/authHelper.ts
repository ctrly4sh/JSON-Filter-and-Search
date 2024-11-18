import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "boogyman6969";

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const generateJWT = (payload: object, expiresIn: string): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

export const getSessionDuration = (role: string): string => {
    console.log(role)
  switch (role) {
    case "buyer":
      return "2d";
    case "seller":
      return "5d";
    case "admin":
      return "7d";
    default:
      return "10d";
  }
};
