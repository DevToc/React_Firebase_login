export const additionalPropTypes = [
    'Car',
    'Motor Bike',
    'Snowmobile',
    'RV/Caravan',
    'Trailers & Boxes',
    'Boats, Kayak & Jetski'
]

export const firstStepProps = ['productTitle', 'productDescription'];

export const contactInformationProps = ['contactNumber', 'contactEmail']
export const productDescriptionLength = 4000;

export const FieldType = {
    RADIO: 'radioGroup',
    TEXTBOX: 'textField',
    TOGGLE: 'toggle',
    SELECT_DROPDOWN: 'selectDropdown',
    CHECKBOX: 'checkbox',
    COUNT: ['0', '1', '2', '3', '4'],
    DISTANCE: ['> 1km', '> 5km', '> 10km', '> 15km'],
    EMPLOYMENT_TYPE: ['Full-Time', 'Part-time', 'Contract', 'Temporary', 'Please Contact'],
    RATE_FOR_SERVICES: ['Hourly', 'Daily', 'Weekly', 'Monthly']
}

export const priceFields = [
    {
        field: 'listedPrice',
        id: 'listedPrice',
        type: ['sell', 'rent']
    },
    {
        field: 'listedPrice',
        id: 'listedPrice',
        type: ['task', 'wanted']
    },
    {
        field: 'listedPrice',
        id: 'listedPrice',
        type: ['task', 'wanted']
    }
]

export const contactInformationFields = [
    {
        field: 'contactNumber',
        id: 'contactNumber'
    },
    {
        field: 'contactEmail',
        id: 'contactEmail'
    },
    {
        field: 'isNumberDisplayed',
        id: 'contactNumberDisplayed'
    },
    {
        field: 'isEmailDisplayed',
        id: 'contactEmailAddressDisplayed'
    }
]

export const categoryFields = [
    {
        field: 'selectedCategory',
        id: 'category'
    },
    {
        field: 'selectedCategoryName',
        id: 'categoryName'
    },
    {
        field: 'selectedLocation',
        id: 'listedLocation'
    }
]

export const productFields = [
    {
        field: 'productTitle',
        id: 'productTitle'
    }, {
        field: 'productDescription',
        id: 'productDescription'
    }, {
        field: 'availableFrom',
        id: 'listItemBy',
        isDateFormat: 'YYYY-MM-DDThh:mm:ssZ'
    }, {
        field: 'availableFrom',
        id: 'wantedOnOrBefore',
        isDateFormat: 'YYYY-MM-DDThh:mm:ssZ'
    }, {
        field: 'wantedPurpose',
        id: 'purpose'
    }
]

export const rentProps = [
    "rent", "rentDuration", "securityDeposit", "securityAmount"
]