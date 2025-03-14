import { string, z } from "zod";

const registerUserValidation = z.object({
    name:z.string(),
    email:z.string().email({message:"Invalid Email"}),
    password:z.string({required_error:"Password is required"}).min(6, {message:"Password must be at least 6 Characters long"}),
    role:z.enum(["faculty", "student"], {message:"Invalid Role"}),
    profileImage:z.string().optional(),
})

const loginUserValidationSchema = z.object({
    id:z.string({required_error:"Id is Required"}),
    password:z.string({required_error:"Password is Required"})
})

export const UserValidations = {
    registerUserValidation,
    loginUserValidationSchema
}