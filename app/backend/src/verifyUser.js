import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return next(errorHandler(401, "Unauthorized"));

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });

        if (!user) return next(errorHandler(404, "Usuário não encontrado"));

        req.user = user;
        next();
    } catch (error) {
        return next(errorHandler(401, "Token inválido"));
    }
};