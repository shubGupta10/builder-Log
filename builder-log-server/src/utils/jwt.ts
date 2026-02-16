import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signToken = (userId: string) => {
    return jwt.sign(
        {userId},
        process.env.JWT_SECRET as string,
        {expiresIn: "7d"}
    )
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET as string) as {userId: string};
}