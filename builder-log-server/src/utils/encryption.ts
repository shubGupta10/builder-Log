import { Schema, model } from "mongoose";
import crypto from "crypto";

const SECRET_KEY = process.env.ENCRYPTION_KEY as string;
const ALGORITHM = "aes-256-cbc";

export function encrypt(text: string): string {
    if (!text) return text;
    
    const key = crypto.createHash("sha256").update(SECRET_KEY).digest();
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    
    return iv.toString("hex") + ":" + encrypted;
}

export function decrypt(text: string): string {
    if (!text || typeof text === "undefined") return text;
    
    if (!text.includes(":")) return text;
    
    const parts = text.split(":");
    if (parts.length !== 2) return text;
    
    const ivHex = parts[0];
    const encryptedHex = parts[1];
    
    if (!ivHex || !encryptedHex) return text;
    
    const iv = Buffer.from(ivHex, "hex");
    const key = crypto.createHash("sha256").update(SECRET_KEY).digest();
    
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    const decrypted = decipher.update(encryptedHex, "hex", "utf8") + decipher.final("utf8");
    
    return decrypted;
}