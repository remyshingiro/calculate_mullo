// src/data/stateTaxData.js

export const stateTaxData = {
  alabama: { name: "Alabama", taxRate: 0.045, code: "AL" },
  alaska: { name: "Alaska", taxRate: 0.00, code: "AK" }, // No State Tax
  arizona: { name: "Arizona", taxRate: 0.025, code: "AZ" }, // Flat Rate
  arkansas: { name: "Arkansas", taxRate: 0.044, code: "AR" },
  california: { name: "California", taxRate: 0.08, code: "CA" }, // Est. effective for median
  colorado: { name: "Colorado", taxRate: 0.044, code: "CO" }, // Flat Rate
  connecticut: { name: "Connecticut", taxRate: 0.055, code: "CT" },
  delaware: { name: "Delaware", taxRate: 0.05, code: "DE" },
  florida: { name: "Florida", taxRate: 0.00, code: "FL" }, // No State Tax
  georgia: { name: "Georgia", taxRate: 0.0539, code: "GA" }, // Flat Rate
  hawaii: { name: "Hawaii", taxRate: 0.075, code: "HI" },
  idaho: { name: "Idaho", taxRate: 0.0569, code: "ID" }, // Flat Rate
  illinois: { name: "Illinois", taxRate: 0.0495, code: "IL" }, // Flat Rate
  indiana: { name: "Indiana", taxRate: 0.0305, code: "IN" }, // Flat Rate
  iowa: { name: "Iowa", taxRate: 0.038, code: "IA" }, // Flat Rate (New 2025)
  kansas: { name: "Kansas", taxRate: 0.057, code: "KS" },
  kentucky: { name: "Kentucky", taxRate: 0.04, code: "KY" }, // Flat Rate
  louisiana: { name: "Louisiana", taxRate: 0.0425, code: "LA" },
  maine: { name: "Maine", taxRate: 0.065, code: "ME" },
  maryland: { name: "Maryland", taxRate: 0.0575, code: "MD" },
  massachusetts: { name: "Massachusetts", taxRate: 0.05, code: "MA" }, // Flat Rate
  michigan: { name: "Michigan", taxRate: 0.0425, code: "MI" }, // Flat Rate
  minnesota: { name: "Minnesota", taxRate: 0.07, code: "MN" },
  mississippi: { name: "Mississippi", taxRate: 0.044, code: "MS" }, // Flat Rate
  missouri: { name: "Missouri", taxRate: 0.048, code: "MO" },
  montana: { name: "Montana", taxRate: 0.059, code: "MT" },
  nebraska: { name: "Nebraska", taxRate: 0.0584, code: "NE" },
  nevada: { name: "Nevada", taxRate: 0.00, code: "NV" }, // No State Tax
  newhampshire: { name: "New Hampshire", taxRate: 0.00, code: "NH" }, // No Tax on Wages
  newjersey: { name: "New Jersey", taxRate: 0.055, code: "NJ" },
  newmexico: { name: "New Mexico", taxRate: 0.049, code: "NM" },
  newyork: { name: "New York", taxRate: 0.052, code: "NY" }, // Est. effective
  northcarolina: { name: "North Carolina", taxRate: 0.0425, code: "NC" }, // Flat Rate
  northdakota: { name: "North Dakota", taxRate: 0.025, code: "ND" },
  ohio: { name: "Ohio", taxRate: 0.035, code: "OH" },
  oklahoma: { name: "Oklahoma", taxRate: 0.0475, code: "OK" },
  oregon: { name: "Oregon", taxRate: 0.08, code: "OR" },
  pennsylvania: { name: "Pennsylvania", taxRate: 0.0307, code: "PA" }, // Flat Rate
  rhodeisland: { name: "Rhode Island", taxRate: 0.045, code: "RI" },
  southcarolina: { name: "South Carolina", taxRate: 0.064, code: "SC" },
  southdakota: { name: "South Dakota", taxRate: 0.00, code: "SD" }, // No State Tax
  tennessee: { name: "Tennessee", taxRate: 0.00, code: "TN" }, // No State Tax
  texas: { name: "Texas", taxRate: 0.00, code: "TX" }, // No State Tax
  utah: { name: "Utah", taxRate: 0.0455, code: "UT" }, // Flat Rate
  vermont: { name: "Vermont", taxRate: 0.07, code: "VT" },
  virginia: { name: "Virginia", taxRate: 0.0575, code: "VA" },
  washington: { name: "Washington", taxRate: 0.00, code: "WA" }, // No Tax on Wages
  westvirginia: { name: "West Virginia", taxRate: 0.045, code: "WV" },
  wisconsin: { name: "Wisconsin", taxRate: 0.05, code: "WI" },
  wyoming: { name: "Wyoming", taxRate: 0.00, code: "WY" }, // No State Tax
  dc: { name: "District of Columbia", taxRate: 0.06, code: "DC" }
};

// Helper: Common hourly wages from $7.25 (min wage) to $100
// export const commonWages = [
//   "7.25", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", 
//   "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", 
//   "32", "34", "35", "36", "38", "40", "42", "45", "48", "50", 
//   "55", "60", "65", "70", "75", "80", "90", "100"
// ];
// Helper to list all common hourly wages (e.g., $15, $16... $100)
export const commonWages = Array.from({ length: 86 }, (_, i) => (i + 15).toString());