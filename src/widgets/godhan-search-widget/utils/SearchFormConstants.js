export const formConstants = {
  searchForm: {
    minRange: {
      name: "minRange",
      value: "",
      rules: ["ISNUMBER", "MINLENGTH-1", "MAXLENGTH-10"],
      isValid: true,
      errorText: "Invalid number",
    },
    maxRange: {
      name: "maxRange",
      value: "",
      rules: ["ISNUMBER", "MINLENGTH-1", "MAXLENGTH-10"],
      isValid: true,
      errorText: "Invalid number",
    },
  },
  customFiltersForm: {},
};
