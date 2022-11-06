

export const mobileNumberPrefixConstants = {
    'IN': '+91',
    'CA': '+1',
    'AU': '+61'
}
export const formConstants = {
    loginForm: {
        mobileNumber: {
            name: 'mobileNumber',
            rules: ['ISNUMBER', 'MINLENGTH-10', 'MAXLENGTH-10'],
            placeholder: 'Enter 10 digit mobile number',
            value: '',
            isValid: true,
            errorText: 'Invalid mobile number'
        },
        emailAddress: {
            name: 'emailAddress',
            rules: ['ISEMAIL'],
            placeholder: 'Email address',
            value: '',
            isValid: true,
            errorText: 'Invalid email address'
        },
        password: {
            name: 'password',
            rules: [],
            placeholder: 'Password',
            value: '',
            isValid: true,
            errorText: 'Invalid password'
        },
        otp: {
            name: 'otp',
            rules: ['ISNUMBER'],
            placeholder: 'OTP',
            value: '',
            isValid: true,
            errorText: 'Invalid OTP. Please try again'
        }
    },
    signupForm: {
        name: {
            name: 'name',
            rules: ['MINLENGTH-6', 'MAXLENGTH-20', 'ISNAME'],
            placeholder: 'Name',
            value: '',
            isValid: true,
            errorText: 'Name should be between 6 and 20 valid characters'
        },
        password: {
            name: 'password',
            rules: ['MINLENGTH-8', 'ISPASSWORD'],
            placeholder: 'Password',
            value: '',
            isValid: true,
            errorText: 'Password should contain atleast 8 characters, one capital letter and a special character'
        },
        confirmpassword: {
            name: 'confirmpassword',
            rules: ['ISPASSWORD'],
            placeholder: 'Confirm Password',
            value: '',
            isValid: true,
            errorText: 'Passwords do not match'
        },
        emailAddress: {
            name: 'emailAddress',
            rules: ['ISEMAIL'],
            placeholder: 'Email',
            value: '',
            isValid: true,
            errorText: 'Passwords do not match'
        }
    }
}
