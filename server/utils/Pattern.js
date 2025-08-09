const EMAIL_PATTERN=/.+@.+\..+/;

const PHONE_PATTERN=/^[0-9]{10}$/;

const PASSWORD_PATTERN= /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`]).{8,16}$/;



module.exports={
    EMAIL_PATTERN,
    PHONE_PATTERN,
    PASSWORD_PATTERN
}