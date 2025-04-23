import * as z from "zod"

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
})

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(8, {
    message: "Minimum 8 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  country: z.string().min(1, {
    message: "Country is required",
  }),
})

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
})

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(8, {
      message: "Minimum 8 characters required",
    }),
    confirmPassword: z.string().min(8, {
      message: "Minimum 8 characters required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const FarmAnalyzerSchema = z.object({
  farmSize: z.string().min(1, { message: "Farm size is required" }),
  soilType: z.string().min(1, { message: "Soil type is required" }),
  humidity: z.string().min(1, { message: "Humidity is required" }),
  moisture: z.string().min(1, { message: "Moisture is required" }),
  temperature: z.string().min(1, { message: "Temperature is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  additionalInfo: z.string().optional(),
})

export const SoilAnalyzerSchema = z.object({
  soilType: z.string().min(1, { message: "Soil type is required" }),
  ph: z.string().min(1, { message: "pH level is required" }),
  organicMatter: z.string().min(1, { message: "Organic matter content is required" }),
  nitrogen: z.string().min(1, { message: "Nitrogen content is required" }),
  phosphorus: z.string().min(1, { message: "Phosphorus content is required" }),
  potassium: z.string().min(1, { message: "Potassium content is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  additionalInfo: z.string().optional(),
})
