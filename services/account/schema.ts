import * as yup from "yup"


export const multiStepSchema = yup.object({
    fullname: yup.string().required("Fullname is required"),
    mothersMaidenName: yup.string().required("Maiden name is required"),
    fathersFullName: yup.string().required("Please enter your father's first name"),
    dob: yup.string().required("DOB is required"),
    ssn: yup.string().required("SSN is required"),
    address: yup.string().required("Address is required"),
    mobileNo: yup.string().required("Mobile number is required"),
    driverLicenseFp: yup.string().nullable().default(null),
    driverLicenseBp: yup.string().nullable().default(null),
    idType: yup.string().required("ID type is required"),
    driverLicenseNumber: yup.string().nullable().default(null),
    expiryDate: yup.string().nullable().default(null),
    issueDate: yup.string().nullable().default(null),

});


export type MultiStepPayload = yup.InferType<typeof multiStepSchema>
// export type MultiStepPayload = yup.InferType<typeof multiStepSchema>