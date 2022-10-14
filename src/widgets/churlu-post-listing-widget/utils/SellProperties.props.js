import { FieldType } from "./ListingOptionsProps";

export const firstStepProps = [
  "productTitle",
  "listedPrice",
  "productDescription",
];

export const sellprops = [
  {
    id: "Real-Estate & Space",
    properties: [
      {
        field: "noOfBeds",
        options: FieldType.COUNT,
        label: "Bedrooms",
        fieldType: FieldType.SELECT_DROPDOWN,
        hiddenFor: ['Plot & Agriculture Land', 'Shops', 'Commercial Space', 'Advertising Space', 'Parking Space', 'Storage Space']
      },
      {
        field: "baths",
        options: FieldType.COUNT,
        label: "Bathrooms",
        fieldType: FieldType.SELECT_DROPDOWN,
        hiddenFor: ['Plot & Agriculture Land', 'Shops', 'Commercial Space', 'Advertising Space', 'Parking Space', 'Storage Space']
      },
      {
        field: "propertyType",
        options: ["Condo", "Apartment", "House"],
        label: "Type",
        fieldType: FieldType.SELECT_DROPDOWN,
        hiddenFor: ['Plot & Agriculture Land', 'Shops', 'Commercial Space', 'Advertising Space', 'Parking Space', 'Storage Space']
      },
      {
        field: "address",
        options: [],
        label: "Address",
        fieldType: FieldType.TEXTBOX,
        className: "",
        fullWidth: true,
        hiddenFor: ['Plot & Agriculture Land ', 'Shops', 'Commercial Space', 'Advertising Space', 'Parking Space', 'Storage Space']
      },
      {
        field: "builtYear",
        options: [],
        label: "Built Year",
        fieldType: FieldType.TEXTBOX,
        className: "",
        type: "number",
        fullWidth: true,
        hiddenFor: ['Plot & Agriculture Land ', 'Shops', 'Commercial Space', 'Advertising Space', 'Parking Space', 'Storage Space']
      },
      {
        field: "floorArea",
        options: [],
        label: "Floor Area",
        fieldType: FieldType.TEXTBOX,
        fullWidth: true,
        errorText: "Invalid value",
        type: "number",
        withDropdown: true,
        additionalProperty: {
          options: ["Sq Ft", "Sq Mt"],
          label: ["Floor Area"],
          name: "squareAreaMeasuredIn",
        },
        // hiddenFor: ['Plot & Agriculture Land', 'Shops', 'Commercial Space', 'Advertising Space', 'Parking Space', 'Storage Space']
      },
        {
            category: "Parking Space",
            hiddenFor: ['Plot & Agriculture Land', 'Shops', 'Commercial Space', 'Advertising Space', 'Storage Space']
        },
        {
            field: "indoorParking",
            options: FieldType.COUNT,
            label: "Indoor",
            fieldType: FieldType.SELECT_DROPDOWN,
            hiddenFor: ['Plot & Agriculture Land', 'Shops', 'Commercial Space', 'Advertising Space', 'Storage Space']
        },
        {
            field: "outdoorParking",
            options: FieldType.COUNT,
            label: "Outdoor",
            fieldType: FieldType.SELECT_DROPDOWN,
            hiddenFor: ['Plot & Agriculture Land', 'Shops', 'Commercial Space', 'Advertising Space', 'Storage Space']
        },
        {
            field: "streetParking",
            options: FieldType.COUNT,
            label: "Street",
            fieldType: FieldType.SELECT_DROPDOWN,
            hiddenFor: ['Plot & Agriculture Land', 'Shops', 'Commercial Space', 'Advertising Space', 'Storage Space']
        },
      {
        category: "Nearby You",
        hiddenFor: ['Plot & Agriculture Land', 'Shops', 'Commercial Space', 'Advertising Space', 'Parking Space', 'Storage Space']
      },
      {
        field: "nearestTransport",
        fullWidth: true,
        errorText: "Invalid value",
        type: "number",
        label: "Transport",
        fieldType: FieldType.TEXTBOX,
        withDropdown: true,
        additionalProperty: {
          options: ["Km", "Miles"],
          label: ["Distance in"],
          name: "nearestTransportMeasuredIn",
        },
        hiddenFor: ['Plot & Agriculture Land', 'Shops', 'Commercial Space', 'Advertising Space', 'Parking Space', 'Storage Space']
      },
      {
        field: "nearestChildcare",
        fullWidth: true,
        errorText: "Invalid value",
        type: "number",
        label: "Childcare",
        fieldType: FieldType.TEXTBOX,
        withDropdown: true,
        additionalProperty: {
          options: ["Km", "Miles"],
          label: ["Distance in"],
          name: "nearestChildcareeMeasuredIn",
        },
        hiddenFor: ['Plot & Agriculture Land', 'Shops', 'Commercial Space', 'Advertising Space', 'Parking Space', 'Storage Space']
      },
      {
        field: "nearestStore",
        fullWidth: true,
        errorText: "Invalid value",
        type: "number",
        label: "Store",
        fieldType: FieldType.TEXTBOX,
        withDropdown: true,
        additionalProperty: {
          options: ["Km", "Miles"],
          label: ["Distance in"],
          name: "nearestStoreMeasuredIn",
        },
        hiddenFor: ['Plot & Agriculture Land', 'Shops', 'Commercial Space', 'Advertising Space', 'Parking Space', 'Storage Space']
      },
      {
        field: "nearestSchool",
        fullWidth: true,
        errorText: "Invalid value",
        type: "number",
        label: "School",
        fieldType: FieldType.TEXTBOX,
        withDropdown: true,
        additionalProperty: {
          options: ["Km", "Miles"],
          label: ["Distance in"],
          name: "nearestSchoolMeasuredIn",
        },
        hiddenFor: ['Plot & Agriculture Land', 'Shops', 'Commercial Space', 'Advertising Space', 'Parking Space', 'Storage Space']
      },
      {
        field: "amenities",
        options: [
          "Refrigerator",
          "Stove/Oven",
          "Microwave",
          "Air-conditioning",
          "Fireplace",
          "Garden",
          "Smoke-free",
          "Central heat",
          "Ceiling Fan",
          "Assigned Parking",
          "Pool",
          "In-unit laundry",
          "Storage",
          "CCTV",
          "Hot-tub",
          "Hardwood Floor",
          "Carpet",
          "Secure Entrance",
          "Solar Panel",
          "Wheelchair access",
          "High ceilings",
          "Security Alarm",
          "Walk-in closet",
          "Balcony or deck",
          "Dishwasher",
          "TV",
          "Laundry",
          "Firealarm",
          "Internet",
          "Remote Lock",
          "BBQ",
          'Kitchen'
        ],
        label: "Amenities",
        fieldType: FieldType.CHECKBOX,
        name: "amenitites",
        hiddenFor: ['Plot & Agriculture Land', 'Shops', 'Commercial Space', 'Advertising Space', 'Parking Space', 'Storage Space']
      },
    ],
  },
  {
    id: "Car",
    properties: [
      {
        field: "model",
        label: "Model",
        fieldType: FieldType.TEXTBOX,
        type: "text",
        fullWidth: true,
        errorText: "Invalid value",
      },
      {
        field: "make",
        label: "Make",
        fieldType: FieldType.TEXTBOX,
        type: "text",
        fullWidth: true,
        errorText: "Invalid value",
      },
      {
        field: "bodyType",
        options: [
          "Hatch",
          "Sedan",
          "SUV",
          "Pickup truck",
          "Luxury",
          "Van",
          "Hybrid & Electric Car",
          "Sports",
          "Classic",
        ],
        label: "Car Body Type",
        fieldType: FieldType.SELECT_DROPDOWN,
      },
      {
        field: "seatingCapacity",
        options: [2, 4, 5, 7, "7+"],
        label: "Seating Capacity",
        fieldType: FieldType.SELECT_DROPDOWN,
      },
      {
        field: "features",
        options: [
          "TowBar",
          "Roofrack",
          "Hitch",
          "Remote-start",
          "All wheel Drive",
          "Backup Camera",
        ],
        label: "Features",
        fieldType: FieldType.CHECKBOX,
      },
      {
        field: "kmDriven",
        label: "KM Driven",
        fieldType: FieldType.TEXTBOX,
        type: "number",
        fullWidth: true,
        errorText: "Invalid value",
      },
      {
        field: "transmissionType",
        label: "Transmission Type",
        fieldType: FieldType.SELECT_DROPDOWN,
        options: ["Automatic", "Manual"],
      }
    ],
  },
  {
    id: "Motor Bike",
    properties: [
      {
        field: "make",
        label: "Make",
        fieldType: FieldType.TEXTBOX,
        fullWidth: true,
        errorText: "Invalid value",
        type: "text",
      },
      {
        field: "model",
        label: "Model",
        fieldType: FieldType.TEXTBOX,
        fullWidth: true,
        errorText: "Invalid value",
        type: "text",
      },
      {
        field: "cc",
        options: [],
        label: "Bike - CC",
        fieldType: FieldType.TEXTBOX,
        type: "number",
        fullWidth: true,
        errorText: "Invalid value",
      },
      {
        field: "bikeType",
        options: [
          "Dirt",
          "Sports",
          "Crusier",
          "Scooter",
          "ATV",
          "3-wheeler",
          "Others",
        ],
        label: "Bike Type",
        fieldType: FieldType.SELECT_DROPDOWN,
      },
    ],
  },
  {
    id: "Snowmobile",
    properties: [
      {
        field: "model",
        label: "Model",
        fieldType: FieldType.TEXTBOX,
        fullWidth: true,
        errorText: "Invalid value",
        type: "text",
      },
      {
        field: "make",
        label: "Make",
        fieldType: FieldType.TEXTBOX,
        fullWidth: true,
        errorText: "Invalid value",
        type: "text",
      },
      {
        field: "cc",
        options: [],
        label: "Snowmobile - CC",
        fieldType: FieldType.TEXTBOX,
        type: "number",
        fullWidth: true,
        errorText: "Invalid value",
      },
    ],
  },
  {
    id: "Boats, Kayak & Jetski",
    properties: [
      {
        field: "model",
        label: "Model",
        fieldType: FieldType.TEXTBOX,
        fullWidth: true,
        errorText: "Invalid value",
        type: "text",
      },
      {
        field: "make",
        label: "Make",
        fieldType: FieldType.TEXTBOX,
        fullWidth: true,
        errorText: "Invalid value",
        type: "text",
      },
      {
        field: "seatingCapacity",
        options: [],
        label: "Seating capacity",
        fieldType: FieldType.TEXTBOX,
        fullWidth: true,
        errorText: "Invalid value",
        type: "number",
      },
    ],
  },
  {
    id: "RV/Caravan",
    properties: [
      {
        field: "model",
        label: "Model",
        fieldType: FieldType.TEXTBOX,
        fullWidth: true,
        errorText: "Invalid value",
        type: "text",
      },
      {
        field: "make",
        label: "Make",
        fieldType: FieldType.TEXTBOX,
        fullWidth: true,
        errorText: "Invalid value",
        type: "text",
      },
      {
        field: "features",
        options: [],
        label: "Features",
        fieldType: FieldType.TEXTBOX,
        type: "text",
        fullWidth: true,
        errorText: "Invalid value",
      },
    ],
  },
  {
    id: "Trailers & Boxes",
    properties: [
      {
        field: "model",
        label: "Model",
        fieldType: FieldType.TEXTBOX,
        fullWidth: true,
        errorText: "Invalid value",
        type: "text",
      },
      {
        field: "make",
        label: "Make",
        fieldType: FieldType.TEXTBOX,
        fullWidth: true,
        errorText: "Invalid value",
        type: "text",
      },
      {
        field: "features",
        options: [],
        label: "Caravan features",
        fieldType: FieldType.TEXTBOX,
        fullWidth: true,
        errorText: "Invalid value",
        type: "text",
      },
    ],
  },
];
