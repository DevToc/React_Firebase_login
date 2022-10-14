export const displayProfileDetails = [
  // {
  //   property: 'name',
  //   label: 'Name',
  //   isEditable: true
  // },
  {
    property: 'memberSince', label: 'Member Since', isEditable: true
  },
  {
    property: 'email', label: 'Email address', isEditable: true, isVerificationRequired: true
  },
  {
    property: 'mobileNumber', label: window.screen.width < 340 ? 'Contact' : 'Contact number', isEditable: true, isVerificationRequired: true
  },
  {
    property: 'countryCode', label: 'Country code', isEditable: false, isChangeLinkRequired: true
  },
]

export const itemStatusesAvailable = [
  {
    id: 'Extended',
    label: 'Extend',
    availableFor: ['New', 'Active'],
    description: "You can extend your listing"
  },
  {
    id: 'Expired',
    label: 'Expire',
    availableFor: ['New', 'Active'],
    description: 'If you want to make your listing inactive/remove your listing permanently, you can expire your listing'
  },
  {
    id: 'Inactive',
    label: 'Pause',
    availableFor: ['New', 'Active'],
    description: 'If you want to make your listing inactive temporarily, pause your listing'
  },
  {
    id: 'Active',
    label: 'Activate',
    availableFor: ['Inactive'],
    description: 'Make your inactive listing active again'
  }
]

export const trackingTableHeaders = ['Reference ID', 'Creation Date', 'Last Updated On', 'Type', 'Title']