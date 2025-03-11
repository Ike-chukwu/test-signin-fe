import * as yup from "yup"

export const loginSchema = yup.object({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
})
export const loginSchemaDup = yup.object({
    emailDup: yup.string().required("Email is required"),
    passwordDup: yup.string().required("Password is required"),
})


export const multiStepSchema = yup.object({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
    emailDup: yup.string().required("Email is required"),
    passwordDup: yup.string().required("Password is required"),
    number: yup.string().required("Please enter a valid phone number"),
    code: yup.string()
        .required("Code is required"),
    codeDup: yup.string()
        .required("Code is required")
})

export type LoginPayload = yup.InferType<typeof loginSchema>
export type MultiStepPayload = yup.InferType<typeof multiStepSchema>