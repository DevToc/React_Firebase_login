export const femaleCattle = ['Buffalo', 'Buffalo Calf', 'Cow', 'Goat'];

export const formConstants = {
  listingForm: {
    selectedListingType: {
      name: "selectedListingType",
      value: "",
    },
    selectedCattle: {
      name: "selectedCattle",
      value: {},
    },
    selectedBreed: {
      name: "selectedBreed",
      value: {}
    },
    selectedCattleObject: {
      name: "selectedCattleObject",
      value: {},
    },
    selectedBreedObject: {
      name: "selectedBreedObject",
      value: {}
    },
    productTitle: {
      name: "productTitle",
      rules: ["MINLENGTH-6", "MAXLENGTH-40"],
      placeholder: "Add Listing title (*)",
      value: "",
      isValid: true,
      errorText:
        "Invalid title. Product title should be between 6 and 40 valid characters",
      helperText: "Give a short title. e.g. New born calf available for sale",
    },
    listedPrice: {
      name: "listedPrice",
      value: "",
      placeholder: `Price INR (*)`,
      rules: ["ISNUMBER"],
      isValid: true,
      errorText: "Invalid Amount",
      type: "number",
    },
    negotiable: {
      name: "negotiable",
      value: "false",
      placeholder: `Negotiable?`,
    },
    productDescription: {
      name: "productDescription",
      rules: ["MINLENGTH-10", "MAXLENGTH-4000"],
      placeholder: "Describe your product (*)",
      value: "",
      isValid: true,
      errorText: "Invalid product description. Minimum Characters 10, Maximum 4,000.",
      helperText:
        "Describe your cattle and add more information on the cattle, its features and specifications",
    },
    offeredBy: {
      name: "offeredBy",
      placeholder: "Are you posting on behalf of a business?",
      value: "false"
    },
    files: {
      value: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
    },
    averageWeight: {
      name: "averageWeight",
      value: "",
      placeholder: `Average cattle weight (Kg)`,
      rules: ["ISAMOUNT"],
      isValid: true,
      errorText: "Enter a valid weight in Kg",
    },
    averageAge: {
      name: "averageAge",
      value: "",
      placeholder: `Average cattle age(years)`,
      rules: ["ISAMOUNT"],
      isValid: true,
      errorText: "Enter the cattle age in years",
    },
    averageBirthWeight: {
      name: "averageBirthWeight",
      value: "",
      placeholder: `Average cattle birth weight (kg)`,
      rules: ["ISAMOUNT"],
      isValid: true,
      errorText: "Enter the cattle weight in kg",
    },
    babiesCount: {
      name: "babiesCount",
      value: "",
      placeholder: 'How many times has the cattle given birth?',
      rules: ["ISAMOUNT"],
      isValid: true,
      options: [1, 2, 3, 4, 5, 6, 7]
    },
    milkStatus: {
      name: "milkStatus",
      value: "",
      placeholder: 'Milk Status',
      isValid: true,
    },
    dailyMilkCapacity: {
      name: "dailyMilkCapacity",
      value: "",
      placeholder: 'Daily Milk Capacity',
      isValid: true,
    },

    contactNumber: {
      name: "contactNumber",
      rules: ["MINLENGTH-10", "MAXLENGTH-10", "ISNUMBER"],
      placeholder: "Enter your contact number",
      value: "",
      isValid: true,
      errorText: "Invalid contact number",
    },
    contactEmail: {
      name: "contactEmail",
      rules: ["ISEMAIL"],
      placeholder: "Enter your email address",
      value: "",
      isValid: true,
      errorText: "Invalid email address",
    },
    isNumberDisplayed: {
      name: "isNumberDisplayed",
      rules: [],
      value: false,
      placeholder: "Display phone number in the ad?",
    },
    isEmailDisplayed: {
      name: "isEmailDisplayed",
      rules: [],
      value: false,
      placeholder: "Display contact email in the ad?",
    },
  },
};
