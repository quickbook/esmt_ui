export const mockEstimateOptionsApiData = {
  options: [
    {
      label: "Small Fish Option",
      size: "1-3 inch",
      price: 120,
    },
    {
      label: "Medium Fish Option",
      size: "3-4 inch",
      price: 220,
    },
    {
      label: "Large Fish Option",
      size: "4-5 inch",
      price: 350,
    },
    {
      label: "1 Year Old Population",
      size: "1 inch to Catchable",
      price: 500,
    },
  ],

  // realistic stocking values (aligned with pond logic)
  stock: [
    [500, 200, 50, 10, 5], // small fish option
    [800, 300, 75, 15, 8], // medium
    [1200, 500, 100, 25, 10], // large
  ],

  breakdownValues: [
    50, // 5-6 inch Bluegill (lbs)
    300, // 3-4 inch Bluegill
    800, // 1-3 inch Bluegill
    30, // Redear lbs
    200, // Redear 3-4
    500, // Redear 1-3
    100, // Minnows lbs
    40, // Bass lbs
  ],

  grassCarpPrice: 5.75,
};

export const pondConfigs = {
  "trophy-bass": {
    title: "Trophy Bass Pond Estimator",
    description:
      "Grow Bass over 10 pounds, Slow fishing long term growth. Best to Stock Bass in June for best  Growth potential Stock others first.",
    stockDesc:
      "Bluegill, Redear and Minnows stocked in fall or spring and Bass stocked in June",
    columns: [
      "Head-Bluegill",
      "Head-Redear",
      "Head-Bass",
      "Pounds-Minnows",
      "Pounds-Shinners",
    ],

    // 🔵 BLUE SECTION (from your image)
    breakdownHeaders: [
      { label: "5 to 6 inch Bluegill", type: "pounds" },
      { label: "3 to 4 inch Bluegill", type: "head" },
      { label: "1 to 3 inch Bluegill", type: "head" },
      { label: "5 to 6 inch Redear", type: "pounds" },
      { label: "3 to 4 inch Redear", type: "head" },
      { label: "1 to 3 inch Redear", type: "head" },
      { label: "Minnows", type: "pounds" },
      { label: "12 to 15 inch Bass", type: "pounds" },
    ],
  },

  "catfish-pond": {
    title: "Catfish Pond Estimator",
    description:
      "Grow Catfish up to 5 pounds. Small ponds with low management. Can be stocked year round so long asnot to hot for redear.",
    stockDesc: "All fish stocked at same time.",
    columns: ["Head-Redear", "Pounds-Minnows", "Head-Catfish"],

    breakdownHeaders: [
      { label: "5 to 6 inch Redear", type: "pounds" },
      { label: "Minnows", type: "pounds" },
      { label: "12 to 15 inch Catfish", type: "pounds" },
    ],
  },

  "fishing-pond": {
    title: "Fishing Pond Estimator",
    description:
      "Grow quality bass, bream, crappie and catfish. Great for kids. All fish can be stocked at same time Crappie do best October to April.",
    stockDesc:
      "Crappie are not available May through September, Hybrid Crappie can be substituted for Black Crappie if they are available, Not all sizes of hybrid crappie are available at all times.",
    columns: [
      "Head-Bluegill",
      "Head-Redear",
      "Head-Bass",
      " Pounds-Minnows",
      "Head-Catfish",
      "Head-Crappie",
    ],

    breakdownHeaders: [
      { label: "5 to 6 inch Bluegill", type: "pounds" },
      { label: "3 to 4 inch Bluegill", type: "head" },
      { label: "1 to 3 inch Bluegill", type: "head" },
      { label: "5 to 6 inch Redear", type: "pounds" },
      { label: "3 to 4 inch Redear", type: "head" },
      { label: "1 to 3 inch Redear", type: "head" },
      { label: "Minnows", type: "pounds" },
      { label: "12 to 15 inch Bass", type: "pounds" },
      { label: "12 to 15 inch Catfish", type: "pounds" },
      { label: "5 to 6 inch Crappie", type: "head" },
    ],
  },

  "hybrid-bream": {
    title: "Hybrid Bream Pond Estimator",
    description:
      "Grow Bream up to 1 pound. Small ponds with low management. 80 to 90% male reduced spawning reduces competition makes big bream.",
    stockDesc: "All fish stocked at same time.",
    columns: [
      "Head-Hybrid Bream",
      "Head-Redear",
      "Head-Bass",
      "Pounds-Minnows",
      "Head-Catfish",
    ],

    breakdownHeaders: [
      { label: "5 to 6 inch Hybrid", type: "pounds" },
      { label: "5 to 6 inch Redear", type: "pounds" },
      { label: "Minnows", type: "pounds" },
      { label: "12 to 15 inch Bass", type: "pounds" },
      { label: "12 to 15 inch Catfish", type: "pounds" },
    ],
  },

  "bass-pond": {
    title: "Bass Pond Estimator",
    description:
      "Grow Bass over 5 pounds. Will require regular bass harvest to maintain balance. Best to Stock Bass in June for best  Growth potential Stock others first.",
    stockDesc:
      "Bluegill, Redear and Minnows stocked in fall or spring and Bass stocked in June",
    columns: ["Head-Bluegill", "Head-Redear", "Head-Bass", "Pounds-Minnows"],

    breakdownHeaders: [
      { label: "5 to 6 inch Bluegill", type: "pounds" },
      { label: "3 to 4 inch Bluegill", type: "head" },
      { label: "1 to 3 inch Bluegill", type: "head" },
      { label: "5 to 6 inch Redear", type: "pounds" },
      { label: "3 to 4 inch Redear", type: "head" },
      { label: "1 to 3 inch Redear", type: "head" },
      { label: "Minnows", type: "pounds" },
      { label: "12 to 15 inch Bass", type: "pounds" },
    ],
  },
};
