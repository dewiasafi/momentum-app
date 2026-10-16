import { resolve } from "node:dns";
import { RegisterFormData, RegisterResponse } from "../types";

export const registerUserApi = async (
     data: RegisterFormData
): Promise<RegisterResponse> => {
     await new Promise((resolve) => setTimeout(resolve, 1000));
     if (data.email === "registered@example.com") {
          throw new Error("Email ini sudah terdaftar. Gunakan email lain.");
     }

     return {
          success: true,
          message: "Akun berhasil dibuat!",
     }

}