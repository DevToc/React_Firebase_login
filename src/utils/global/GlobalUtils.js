import moment from "moment";
import { globalConstants } from "./GlobalConstants";
import { Geolocation } from "@ionic-native/geolocation";
import _get from "lodash/get";
import _includes from "lodash/includes";
import icons from "../../assets/icons/categories";
import CategoryIcon from "@material-ui/icons/Category";
import { updateFormStore } from "../index";

class GlobalUtils {
  findOffset() {
    return 0;
  }

  getValueFromUrlQuery(key) {
    const search = window.location.search;
    var queryObject = {};
    search
      .substr(1)
      .split("&")
      .forEach(function (item) {
        queryObject[item.split("=")[0]] = item.split("=")[1];
      });
    if (key in queryObject) {
      return queryObject[key].toString();
    }
  }

  getCurrentPage() {
    return window.location.pathname.replace("/", "");
  }

  getHostName() {
    const hostname = window.location.hostname.replace(
      /(https?:\/\/)?(www.)?/i,
      ""
    );
    return hostname.substring(hostname.indexOf(".") + 1);
  }

  scrollTo(ele, effect = "smooth") {
    setTimeout(() => {
      if (document.getElementById(ele)) {
        document.getElementById(ele).scrollIntoView({
          behavior: effect,
        });
      }
    }, 10);
  }

  scrollOnClick = (name) => {
    const div = document.getElementsByName(name);
    if (div && div.length > 0) {
      const singleDiv = div[0];
      var headerOffset = 100;
      var elementPosition = singleDiv.getBoundingClientRect().top;
      var offsetPosition = elementPosition - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  isTokenAvailable = () => !!localStorage.getItem("token");

  getToken = () => localStorage.getItem("token");

  setLocalStorageValue = (key, value) => localStorage.setItem(key, value);

  removeToken = (val = "token") => localStorage.removeItem(val);

  getRequestFormatForDate = (date, dateFormat = "YYYY-MM-DDThh:mm:ss") =>
    moment(date).format(dateFormat);

  getFormattedDateWithSourceFormat = (date, sourceFormat, targetFormat) =>
    moment(date, sourceFormat).format(targetFormat);

  getDateDifference = (date1, date2, format) => {
    const diff = date1.diff(date2, "minutes");
    if (diff > 0) {
      if (diff < 60) {
        return " expires in " + diff + " minutes ";
      }
      if (diff < 1440 && diff > 60) {
        if (diff % 60 !== 0) {
          return (
            " expires in " +
            Math.floor(diff / 60) +
            " hours " +
            (diff % 60) +
            " minutes "
          );
        } else {
          return " expires in " + Math.floor(diff / 60) + " hours ";
        }
      } else {
        return " expires on " + date2.format("DD MMM YYYY");
      }
    } else {
      return " expired on " + date2.format("DD MMM YYYY");
    }
  };

  getFormattedDate = (date, format) => {
    const momentDate = moment(date, format || "DD-MM-YYYYThh:mm:ss");
    return moment(momentDate).calendar({
      lastDay: "[Yesterday]",
      sameDay: "[Today]",
      nextDay: "[Tomorrow]",
      lastWeek: "DD/MMM/YY",
      nextWeek: "DD/MMM/YY",
      sameWeek: "DD/MMM/YY",
      sameElse: "DD/MMM/YY",
    });
  };

  getFormattedDateForChat = (date) => {
    return moment(date).calendar({
      lastWeek: "[Last] dddd",
      lastDay: "[Yesterday]",
      lastMonth: "[A month ago]",
      lastYear: "[A year ago]",
      sameDay: "[Today at] hh:mm A",
      sameElse: "DD MMM YYYY",
      nextDay: "[Tomorrow]",
      nextWeek: "[Next] dddd",
    });
  };

  getCountryProperty = (property, countryCode = "") => {
    if (countryCode) {
      const countryDomain = globalConstants.getCountry[countryCode];
      const val = globalConstants.godhanAddress[countryDomain];
      return val[property];
    } else {
      let country = "";
      country =
        globalConstants.getCountry["IN"];
      const val = globalConstants.godhanAddress[country];
      return val[property];

    }
  };

  isNumeric = (str) => {
    return /^-?\d+$/.test(str);
  };

  isFloat = (str) => !isNaN(str);

  handleSearch = async (
    fetchFilterOptions,
    fetchProductList,
    category,
    type
  ) => {
    try {
      const position = await Geolocation.getCurrentPosition();
      fetchFilterOptions({
        listType: _get(category, "name"),
        type,
        categoryId: _get(category, "id"),
      });
      fetchProductList({
        offset: 0,
        payload: {
          listType: _get(category, "name"),
          latitude: _get(position, "coords.latitude"),
          longitude: _get(position, "coords.longitude"),
          type,
          categoryId: _get(category, "id"),
        },
      });
    } catch (err) {
      fetchFilterOptions({
        listType: _get(category, "name"),
        type,
        categoryId: _get(category, "id"),
      });
      fetchProductList({
        offset: 0,
        payload: {
          listType: _get(category, "name"),
          type,
          categoryId: _get(category, "id"),
        },
      });
    }
  };

  getValue = (value) => {
    switch (value) {
      case "rent":
        return 0;
      case "sell":
        return 1;
      case "wanted":
        return 2;
      case "task":
        return 3;
      default:
        return null;
    }
  };

  getFormattedPrice = (val) => {
    const numericPrice = parseInt(val, 10);
    return numericPrice.toLocaleString("en-us", {
      currency: this.getCountryProperty("featuredCurrency"),
    });
  };

  getLocation = (val) => {
    try {
      return val.split(",")[0];
    } catch {
      return val;
    }
  };

  clearCategory = () => {
    updateFormStore({
      form: "homeForm",
      field: "selectedCategoryId",
      value: "",
    });
    updateFormStore({
      form: "homeForm",
      field: "selectedCategoryName",
      value: "",
    });
    updateFormStore({
      form: "homeForm",
      field: "selectedParent",
      value: "",
    });
    updateFormStore({
      form: "homeForm",
      field: "secondarySelectedParent",
      value: "",
    });
    updateFormStore({
      form: "homeForm",
      field: "listType",
      value: "",
    });
  };

  getCategoryById = (id, { sellList, rentList, wantedList }) => {
    return (
      sellList.find((item) => item.id === id) ||
      rentList.find((item) => item.id === id) ||
      wantedList.find((item) => item.id === id)
    );
  };

  getCategoryIcon = (id) => {
    switch (id) {
      case 100:
      case 10000:
      case 50000:
        return icons.furniture;
      case 700:
      case 16000:
      case 56000:
        return icons.camping;
      case 26000:
      case 66000:
        return icons.catering;
      case 400:
      case 13000:
      case 53000:
        return icons.commercial;
      case 1000:
      case 20000:
      case 60000:
        return icons.computer;
      case 200:
      case 11000:
      case 51000:
        return icons.farming;
      case 300:
      case 12000:
      case 52000:
        return icons.fashion;
      case 900:
      case 19000:
      case 59000:
        return icons.music;
      case 1100:
      case 21000:
      case 61000:
        return icons.tools;
      case 800:
      case 17000:
      case 57000:
        return icons.realEstate;
      case 2100:
      case 23000:
      case 63000:
        return icons.scaffold;
      case 27000:
      case 67000:
        return icons.services;
      case 2000:
      case 22000:
      case 62000:
        return icons.bins;
      case 600:
      case 15000:
      case 55000:
        return icons.sport;
      case 500:
      case 14000:
      case 54000:
        return icons.vehicle;
      case 2300:
      case 25000:
      case 65000:
        return icons.warehouse;

      default:
        return CategoryIcon;
    }
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  getCountryFromLocalStorage = () => localStorage.getItem("godhan-location");

  getSessionStorageItem = (key) => sessionStorage.getItem(key);
  setSessionStorageItem = (key, value) => sessionStorage.setItem(key, value);
  removeSessionStorageItem = (key) => sessionStorage.removeItem(key);
}

export const globalUtils = new GlobalUtils();
