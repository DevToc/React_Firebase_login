import { globalUtils } from "../../../utils";

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


    productID: {
      name: "productID",
      value: "",
    },
    sponsorship: {
      name: "sponsorship",
      value: "free",
    },
    category: {
      name: "category",
      value: "",
    },
    selectedLocation: {
      name: "selectedLocation",
      value: null,
    },
    selectedCategoryName: {
      name: "selectedCategoryName",
      value: null,
    },
    productTitle: {
      name: "productTitle",
      rules: ["MINLENGTH-6", "MAXLENGTH-40"],
      placeholder: "Ad title (*)",
      value: "",
      isValid: true,
      errorText:
        "Invalid title. Product title should be between 6 and 40 valid characters",
      helperText: "Give a short title. e.g. brand, item, condition",
    },
    productDescription: {
      name: "productDescription",
      rules: ["MINLENGTH-10", "MAXLENGTH-4000"],
      placeholder: "Describe your product *",
      value: "",
      isValid: true,
      errorText: "Invalid product description. Minimum Characters 10, Maximum 4,000.",
      helperText:
        "Detailed description of the item such as complete state of the item, operating features, capacity, accessories, etc.",
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
      placeholder: "Display your contact number in the post?",
    },
    isEmailDisplayed: {
      name: "isEmailDisplayed",
      rules: [],
      value: false,
      placeholder: "Display your contact email in the post?",
    },
    listedPrice: {
      name: "listedPrice",
      value: "",
      placeholder: `Price in ${globalUtils.getCountryProperty("currency")} *`,
      rules: ["ISNUMBER"],
      isValid: true,
      errorText: "Invalid Amount",
      type: "number",
    },
    wantedPurpose: {
      name: "wantedPurpose",
      value: "",
      placeholder: 'Wanted Purpose'
    },
    priceFrom: {
      name: "priceFrom",
      rules: [],
      errorText: "Invalid budget",
      isValid: true,
      placeholder: "From *",
      value: "",
    },
    priceTo: {
      name: "priceTo",
      rules: [],
      value: "",
      isValid: true,
      errorText: "Invalid budget",
      placeholder: "To *",
    },
    isHourly: {
      name: "isHourly",
      value: false,
    },
    rent: {
      name: "rent",
      rules: ["ISNUMBER"],
      value: "",
      isValid: true,
      errorText: "Invalid amount",
      placeholder: `Rent in ${globalUtils.getCountryProperty("currency")} *`,
      type: "number",
    },
    rentDuration: {
      name: "rentDuration",
      value: "",
      isValid: true,
    },
    securityDeposit: {
      name: "securityDeposit",
      value: "",
    },
    securityAmount: {
      name: "securityAmount",
      rules: ["ISNUMBER"],
      value: "",
      isValid: true,
      errorText: "Invalid amount",
      placeholder: `Security Amount(${globalUtils.getCountryProperty(
        "currency"
      )})`,
      type: "number",
    },
    availableAnytime: {
      name: "availableAnytime",
      value: true,
    },
    availableFrom: {
      name: "availableFrom",
      value: null,
    },
    itemDescription: {
      name: "itemDescription",
      value: false,
    },
    offeredBy: {
      name: "offeredBy",
      value: false,
    },
    postTypeWanted: {
      name: "postTypeWanted",
      value: false,
    },
    searchBy: {
      name: "searchBy",
      value: "",
    },
    isListingSubmitted: {
      name: "isListingSubmitted",
      value: false,
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
  },
};
