export const formConstants = {
  profileForm: {
    name: {
      name: 'name',
      rules: ['MINLENGTH-6', 'MAXLENGTH-20', 'ISNAME'],
      placeholder: 'Name',
      value: '',
      isValid: true,
      errorText: 'Invalid name'
    },
    oldPassword: {
      name: 'oldPassword',
      rules: ['MINLENGTH-8', 'ISPASSWORD'],
      placeholder: 'Old Password',
      value: '',
      isValid: true,
      errorText: 'Password should contain atleast 8 characters, one capital letter and a special character'
    },
    newPassword: {
      name: 'newPassword',
      rules: ['MINLENGTH-8', 'ISPASSWORD'],
      placeholder: 'New Password',
      value: '',
      isValid: true,
      errorText: 'Password should contain atleast 8 characters, one capital letter and a special character'
    },
    confirmPassword: {
      name: 'confirmPassword',
      rules: ['MINLENGTH-8'],
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
      errorText: 'Invalid email address'
    },
    pincode: {
      name: 'pincode',
      rules: ['MINLENGTH-6', 'MAXLENGTH-8'],
      placeholder: 'Pincode',
      value: '',
      isValid: true,
      errorText: 'Invalid pincode'
    },
    mobileNumber: {
      name: 'mobileNumber',
      rules: ['MINLENGTH-10', 'MAXLENGTH-10', 'ISNUMERIC'],
      placeholder: 'Mobile Number',
      value: '',
      isValid: true,
      errorText: 'Invalid mobile number'
    }
  },
  ticketForm: {
    comment: {
      name: 'comment',
      rules: [],
      placeholder: 'Comment here',
      value: '',
      isValid: true,
      errorText: 'Please enter some text'
    },
    title: {
      name: 'title',
      rules: [],
      placeholder: 'Title',
      value: '',
      isValid: true,
      errorText: 'Please enter some text'
    },
    ticketType: {
      name: 'ticketType',
      rules: [],
      placeholder: 'Change ticket type',
      value: 'Complaint',
      isValid: true,
      errorText: 'Please enter change type'
    }
  },
  chatForm: {
    currentConversation: {
      name: 'currentConversation',
      rules: [],
      placeholder: 'Current Conversation',
      value: {}
    },
    currentMessage: {
      name: 'currentMessage',
      rules: [],
      placeholder: 'Enter your message',
      value: '',
      isValid: true,
      errorText: ''
    },
    socketObject: {
      name: 'socketObject',
      value: {}
    },
    fromUser: {
      name: 'fromUser',
      rules: [],
      placeholder: 'From User',
      value: ''
    },
    toUser: {
      name: 'toUser',
      rules: [],
      placeholder: 'From User',
      value: ''
    }
  },
  sellerProfileForm: {
    selectedItem: {
      name: 'selectedItem',
      value: {}
    },
    selectedAction: {
      name: 'selectedAction',
      value: ''
    }
  },
  otpForm: {
    otp: {
      name: 'otp',
      value: '',
      isValid: true
    },
    emailOtp: {
      name: 'emailOtp',
      value: '',
      isValid: true
    },
    currentlyUpdatedProperty: {
      name: 'currentlyUpdatedProperty',
      value: ''
    },
    currentlyUpdatedValue: {
      name: 'currentlyUpdatedValue',
      value: ''
    },
    verificationStatus: {
      name: 'verificationStatus',
      value: false
    }
  },
  sponsorshipForm: {
    typeOfSponsorship: {
      name: 'typeOfSponsorship',
      rules: [],
      value: '',
      label: ''
    },
    selectedAmount: {
      name: 'selectedAmount',
      value: ''
    },
    selectedDuration: {
      name: 'selectedDuration',
      value: ''
    }
  },
}
