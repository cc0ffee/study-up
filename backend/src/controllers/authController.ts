import bcrypt from "bcryptjs";
import { prisma } from "../config/db.js"
import { generateToken } from "../utils/token.js";

const register = async (req:any , res:any) => {
    const { name, email, password } = req.body;

    const userExists = await prisma.user.findUnique({
        where: {email: email},
    });

    if (userExists) {
        return res.status(400).json({error: "User already exists!"});
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
        data: {
            email: email,
            name: name,
            passwordHash: hashedPassword
        }
    });

    const token = generateToken(user.id, res);

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                name: name,
                email: email
            }
        },
        token
    })
};

const login = async (req:any, res:any) => {
    const {email, password} = req.body;

    const user = await prisma.user.findUnique({
        where: {email: email},
    });

    if (!user) {
        return res.status(400).json({error: "User does not exist!"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
        return res.status(403).json({error: "Invalid email or password!"});
    }

    const token = generateToken(user.id, res);

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                email: email
            },
            token
        }
    });
}

const logout = async (req:any, res:any) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({
        status: "success",
        message: "Logged out successfully",
    });
}

export { register, login, logout };