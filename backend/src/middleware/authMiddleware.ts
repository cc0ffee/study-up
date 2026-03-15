import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

export const authMiddleware = async (req: any, res: any, next: any) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.status(401).json({ error: "Not authorized, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret);
        const user = await prisma.user.findUnique({
            // @ts-ignore
            where: { id: decoded.id },
        });

        if (!user) {
            return res.status(401).json({error: "User not found"});
        }

        req.user = user;
        next();

    } catch (err) {
        return res.status(401).json({ error: "Not authorized, token failed"})
    }
}