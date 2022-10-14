export const formConstants = {
  homeForm: {
    searchField: {
      name: "searchField",
      placeholder: "I am looking for....",
      value: "",
    },
    listType: {
      name: "listType",
      placeholder: "List type",
      value: "",
    },
    latitude: {
      name: "latitude",
      placeholder: "Latitude",
      value: "",
    },
    longitude: {
      name: "longitude",
      placeholder: "Longitude",
      value: "",
    },
    locationArea: {
      name: "locationArea",
      placeholder: "Location Area",
      value: "",
    },
    locationCity: {
      name: "locationCity",
      placeholder: "Location City",
      value: "",
    },
    offset: {
      name: "offset",
      placeholder: "Offset",
      value: 0,
    },
    selectedItem: {
      name: "selectedItem",
      placeholder: "Selected item",
      value: {},
    },
    bidAmount: {
      name: "bidAmount",
      placeholder: "Start typing.. ",
      value: "",
      type: "number",
      rules: ["REQUIRED"],
      isValid: true,
      errorText: "Invalid Amount",
    },
    userMessage: {
      name: "userMessage",
      value: null,
    },
    selectedLocation: {
      name: "selectedLocation",
      value: null,
    },
    selectedType: {
      name: "selectedType",
      value: "",
    },
    selectedCategoryId: {
      name: "selectedCategoryId",
      value: "",
    },
    selectedParent: {
      name: "selectedParent",
      value: "",
    },
    skipFormClear: {
      name: "skipFormClear",
      value: false,
    },
    secondarySelectedParent: {
      name: "secondarySelectedParent",
      value: "",
    },
    sortBy: {
      name: "sortBy",
      value: "New",
    },
    searchBy: {
      name: "searchBy",
      value: "",
    },
    radius: {
      name: 'radius',
      value: 0
    }
  },
};
