import jwt, { SignOptions } from "jsonwebtoken";
import type { StringValue } from "ms";

export const generateToken = (userId:any, res:any) => {
    const payload = { id: userId };

    const options: SignOptions = {
        expiresIn: (process.env.JWT_EXPIRES_IN as StringValue) ?? "7d",
    };

    const token = jwt.sign(payload, (process.env.JWT_SECRET as jwt.Secret), options);

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return token;
}