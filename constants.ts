const options = [
    {
        id: 0,
        title: "Text me",
        imgUrl: "/text-message-phone-smartphone-svgrepo-com.png"
    },
    {
        id: 1,
        title: "Call me",
        imgUrl: "/text-message-phone-smartphone-svgrepo-com.png"
    }
]

export const LoginSetupSteps = [
    { label: "Login User", step: "1" },
    { label: "Confirm Your Sign-In Details", step: "2" },
    { label: "Verify Number", step: "3" },
    { label: "Enter Code", step: "4" },
    { label: "Enter Code", step: "5" },
    // { label: "Confirmation", step: "4" },
];

export const AccountSetupSteps = [
    { label: "Personal Info", step: "1" },
    { label: "Id Details", step: "2" },
    { label: "Verification", step: "3" },
    // { label: "Confirmation", step: "4" },
];

export const getImageName = (url: string) => {
    return url?.split("/")?.pop()?.split("-")[0];
};