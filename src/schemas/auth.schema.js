import { z } from "zod";

export const registerSchema = z.object({
    username: z.string({ required_error: "Username is required" }),
    email: z.string({ required_error: "Email is required" }).email({ message: "Email is invalid" }),
    password: z.string({ required_error: "Password is required" }).min(6, { message: "Password must be at least 6 characters" }),
    nombre: z.string({ required_error: "Nombre is required" }).min(1, { message: "Nombre is required" }),
    apellidos: z.string({ required_error: "Apellidos is required" }).min(1, { message: "Apellidos is required" }),
    telefono: z.string({ required_error: "Teléfono is required" }).min(1, { message: "Teléfono is required" }),
    direccion: z.string({ required_error: "Dirección is required" }).min(1, { message: "Dirección is required" })
});

export const loginSchema = z.object({
    email: z.string().email({ message: "Email is invalid" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" })
});
