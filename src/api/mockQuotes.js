// src/data/mockQuotes.js
// Mock quotes covering every estimator type — swap for API calls later.

// Maps estimatorType code → human-readable name shown in the table
export const ESTIMATOR_LABELS = {
  // NEW pond
  FISH_TROPHY_BASS:          "Trophy Bass",
  FISH_QUALITY_BASS_BREAM:   "Quality Bass & Bream",
  FISH_VARIETY_SPECIES:      "Variety Species",
  FISH_CATFISH:              "Catfish Pond",
  FISH_BIG_BREAM_SMALL_POND: "Big Bream (Small Pond)",
  CUSTOM_STOCKING:           "Ala Carte / Custom",
  // OLD pond
  ADD_CATCHABLE_FISH:        "Adult Fish",
  FEED_POND_BASS:            "Feed Bass",
  STOCK_GRASS_CARP:          "Grass Carp",
};

export const mockQuotes = [
  // ─── NEW — PondEstimator: FISH_TROPHY_BASS ─────────────────────────────────
  {
    quoteId: "Q-1714000001",
    createdAt: "2025-04-20",
    estimatorType: "FISH_TROPHY_BASS",
    customer: {
      fullName: "James Hartwell",
      email: "james.hartwell@email.com",
      quoteEmail: "james.hartwell@email.com",
      phone: "501-555-0101",
      address: "123 Lakeview Dr, Conway, AR 72034",
      hearAbout: 1,
    },
    pondInfo: { pondType: "NEW", pondSize: 2.5, pondDepth: 8, pondAccess: 1, pondShape: "Rectangle" },
    estimator: {
      quoteId: "Q-1714000001",
      pondType: "FISH_TROPHY_BASS",
      pondTypeTitle: "Trophy Bass Pond Estimator",
      totalPrice: 1852.00,
      selectedOptions: [
        {
          label: "Small Package (1–3 in)", price: 780.00, size: "1 to 3 inch",
          pondType: "FISH_TROPHY_BASS",
          stockDetails: [
            { fishName: "Largemouth Bass", unit: "fish", quantity: 300, size: "1–3 in" },
            { fishName: "Bluegill",        unit: "fish", quantity: 600, size: "1–3 in" },
          ],
          calculatedTotal: 780.00,
        },
        {
          label: "Medium Package (3–4 in)", price: 1000.00, size: "3 to 4 inch",
          pondType: "FISH_TROPHY_BASS",
          stockDetails: [
            { fishName: "Largemouth Bass", unit: "fish", quantity: 200, size: "3–4 in" },
            { fishName: "Bluegill",        unit: "fish", quantity: 400, size: "3–4 in" },
          ],
          calculatedTotal: 1000.00,
        },
      ],
      addons: [
        { code: "FATHEAD_MINNOWS", name: "Fathead Minnows", quantity: 20, unitPrice: 3.6, selected: true, total: 72.00 },
      ],
      grassCarp: { selected: false, quantity: 0, total: 0 },
      stockingDescription: "Trophy bass pond stocking for a 2.5-acre new pond.",
    },
    availability: { availableDate: "2025-05-10", availableTime: "Morning (8am–12pm)" },
  },

  // ─── NEW — PondEstimator: FISH_QUALITY_BASS_BREAM ──────────────────────────
  {
    quoteId: "Q-1714000002",
    createdAt: "2025-04-21",
    estimatorType: "FISH_QUALITY_BASS_BREAM",
    customer: {
      fullName: "Sandra Moores",
      email: "s.moores@lakefront.net",
      quoteEmail: "s.moores@lakefront.net",
      phone: "501-555-0202",
      address: "45 Pond Ridge Rd, Lonoke, AR 72086",
      hearAbout: 2,
    },
    pondInfo: { pondType: "NEW", pondSize: 3.0, pondDepth: 7, pondAccess: 2, pondShape: "Oval" },
    estimator: {
      quoteId: "Q-1714000002",
      pondType: "FISH_QUALITY_BASS_BREAM",
      pondTypeTitle: "Quality Bass & Bream Pond Estimator",
      totalPrice: 1283.50,
      selectedOptions: [
        {
          label: "Large Package (4–5 in)", price: 1240.00, size: "4 to 5 inch",
          pondType: "FISH_QUALITY_BASS_BREAM",
          stockDetails: [
            { fishName: "Largemouth Bass", unit: "fish", quantity: 150, size: "4–5 in" },
            { fishName: "Bluegill",        unit: "fish", quantity: 400, size: "4–5 in" },
            { fishName: "Redear",          unit: "fish", quantity: 100, size: "4–5 in" },
          ],
          calculatedTotal: 1240.00,
        },
      ],
      addons: [],
      grassCarp: { selected: true, quantity: 6, total: 43.50 },
      stockingDescription: "Quality bass & bream stocking for a 3-acre new pond.",
    },
    availability: { availableDate: "2025-05-14", availableTime: "Afternoon (12pm–5pm)" },
  },

  // ─── NEW — PondEstimator: FISH_VARIETY_SPECIES ─────────────────────────────
  {
    quoteId: "Q-1714000003",
    createdAt: "2025-04-22",
    estimatorType: "FISH_VARIETY_SPECIES",
    customer: {
      fullName: "Derek Faulkner",
      email: "derek.f@outdoorponds.com",
      quoteEmail: "derek.f@outdoorponds.com",
      phone: "870-555-0303",
      address: "78 Rural Route 5, Cabot, AR 72023",
      hearAbout: 3,
    },
    pondInfo: { pondType: "NEW", pondSize: 5.0, pondDepth: 10, pondAccess: 1, pondShape: "Rectangle" },
    estimator: {
      quoteId: "Q-1714000003",
      pondType: "FISH_VARIETY_SPECIES",
      pondTypeTitle: "Variety Species Pond Estimator",
      totalPrice: 3420.00,
      selectedOptions: [
        {
          label: "Year-1 Mature Population", price: 3420.00,
          size: "1 inch to Catchable",
          pondType: "FISH_VARIETY_SPECIES",
          isMaturePopulation: true,
          breakdown: [
            { fishName: "Largemouth Bass", size: "1–3 in",  unit: "fish", quantity: 500 },
            { fishName: "Bluegill",        size: "1–3 in",  unit: "fish", quantity: 1000 },
            { fishName: "Channel Catfish", size: "3–5 in",  unit: "fish", quantity: 150 },
            { fishName: "Black Crappie",   size: "1–3 in",  unit: "fish", quantity: 200 },
          ],
          calculatedTotal: 3420.00,
        },
      ],
      addons: [],
      grassCarp: { selected: false, quantity: 0, total: 0 },
      stockingDescription: "Full variety stocking for a 5-acre new pond.",
    },
    availability: { availableDate: "2025-05-20", availableTime: "Morning (8am–12pm)" },
  },

  // ─── NEW — AlaCarteEstimator: CUSTOM_STOCKING ──────────────────────────────
  {
    quoteId: "Q-1714000004",
    createdAt: "2025-04-22",
    estimatorType: "CUSTOM_STOCKING",
    customer: {
      fullName: "Lisa Pemberton",
      email: "lpemberton@gmail.com",
      quoteEmail: "lpemberton@gmail.com",
      phone: "501-555-0404",
      address: "200 Creekside Ln, Beebe, AR 72012",
      hearAbout: 1,
    },
    pondInfo: { pondType: "NEW", pondSize: 1.5, pondDepth: 6, pondAccess: 3, pondShape: "Irregular" },
    estimator: {
      quoteId: "Q-1714000004",
      pondType: "CUSTOM_STOCKING",
      pondTypeTitle: "Ala Carte / Custom Stocking",
      totalPrice: 832.50,
      alaCarteData: [
        { category: "Bluegill",          name: "Bluegill",      size: "3-4 inch",  unit: "fish",   quantity: 500, pricePerUnit: 0.22, total: 110.00 },
        { category: "Northern Bass",     name: "Northern Bass", size: "3-4 inch",  unit: "fish",   quantity: 200, pricePerUnit: 0.95, total: 190.00 },
        { category: "Catfish",           name: "Catfish",       size: "5-7 inch",  unit: "fish",   quantity: 100, pricePerUnit: 0.30, total: 30.00  },
        { category: "Grass Carp",        name: "Grass Carp",    size: "8-10 inch", unit: "fish",   quantity: 10,  pricePerUnit: 5.75, total: 57.50  },
        { category: "Redear",            name: "Redear",        size: "4-5 inch",  unit: "fish",   quantity: 150, pricePerUnit: 0.80, total: 120.00 },
        { category: "Minnows & Shiners", name: "Minnows",       size: "1-3 inch",  unit: "pounds", quantity: 50,  pricePerUnit: 6.50, total: 325.00 },
      ],
      alaCarteTotal: 832.50,
      grassCarp: { selected: false, quantity: 0, total: 0 },
      stockingDescription: "Custom ala carte stocking for a 1.5-acre new pond.",
    },
    availability: { availableDate: "2025-05-18", availableTime: "Afternoon (12pm–5pm)" },
  },

  // ─── OLD — AdultFishEstimator: ADD_CATCHABLE_FISH ──────────────────────────
  {
    quoteId: "Q-1714000005",
    createdAt: "2025-04-23",
    estimatorType: "ADD_CATCHABLE_FISH",
    customer: {
      fullName: "Tom Birchfield",
      email: "tbirchfield@arkfarms.net",
      quoteEmail: "tbirchfield@arkfarms.net",
      phone: "870-555-0505",
      address: "901 Farm Road 22, Stuttgart, AR 72160",
      hearAbout: 4,
    },
    pondInfo: { pondType: "OLD", pondSize: 4.0, pondDepth: 9, pondAccess: 1, pondShape: "Rectangle" },
    estimator: {
      quoteId: "Q-1714000005",
      pondType: "ADD_CATCHABLE_FISH",
      pondTypeTitle: "Adult / Catchable Fish",
      totalPrice: 1212.50,
      adultFishData: [
        { name: "Adult Bass",         size: "12 to 15 inch fish", pricePerPound: 10.50, quantity: 50  },
        { name: "Adult Catfish",      size: "12 to 15 inch fish", pricePerPound: 8.75,  quantity: 80  },
        { name: "Adult Bream",        size: "5 to 6 inch fish",   pricePerPound: 7.25,  quantity: 30  },
        { name: "Adult Hybrid Bream", size: "5 to 6 inch fish",   pricePerPound: 8.50,  quantity: 0   },
        { name: "Adult Redear",       size: "5 to 6 inch fish",   pricePerPound: 7.75,  quantity: 0   },
        { name: "Adult Crappie",      size: "5 to 6 inch fish",   pricePerPound: 9.25,  quantity: 0   },
      ],
      totalCostLess450: 1212.50,
      totalCostMore450: 0,
      grassCarp: { selected: false, quantity: 0, total: 0 },
      stockingDescription: "Adult catchable fish restocking for an existing 4-acre pond.",
    },
    availability: { availableDate: "2025-06-02", availableTime: "Morning (8am–12pm)" },
  },

  // ─── OLD — FeedBassEstimator: FEED_POND_BASS ───────────────────────────────
  {
    quoteId: "Q-1714000006",
    createdAt: "2025-04-23",
    estimatorType: "FEED_POND_BASS",
    customer: {
      fullName: "Rachel Nguyen",
      email: "rn@fishingranch.com",
      quoteEmail: "rn@fishingranch.com",
      phone: "501-555-0606",
      address: "55 Bass Point, Pine Bluff, AR 71601",
      hearAbout: 2,
    },
    pondInfo: { pondType: "OLD", pondSize: 2.0, pondDepth: 6, pondAccess: 2, pondShape: "Irregular" },
    estimator: {
      quoteId: "Q-1714000006",
      pondType: "FEED_POND_BASS",
      pondTypeTitle: "Feed Bass",
      totalPrice: 870.00,
      feedBassData: [
        { name: "Intermediate Bream", unit: "Fish",   recommendation: "1000–2000 per acre after harvest", price: 1.20, quantity: 600 },
        { name: "Fathead Minnows",    unit: "Pounds", recommendation: "100+ lbs per acre",                price: 3.60, quantity: 50  },
        { name: "Golden Shiners",     unit: "Pounds", recommendation: "100+ lbs per acre",                price: 4.30, quantity: 20  },
      ],
      totalCostLess12000: 870.00,
      totalCostMore12000: 0,
      grassCarp: { selected: false, quantity: 0, total: 0 },
      stockingDescription: "Feed fish to grow trophy bass in an existing 2-acre pond.",
    },
    availability: { availableDate: "2025-05-28", availableTime: "Morning (8am–12pm)" },
  },

  // ─── OLD — GrassCarpEstimator: STOCK_GRASS_CARP ────────────────────────────
  {
    quoteId: "Q-1714000007",
    createdAt: "2025-04-24",
    estimatorType: "STOCK_GRASS_CARP",
    customer: {
      fullName: "Mike Castillo",
      email: "m.castillo@lakeview.net",
      quoteEmail: "m.castillo@lakeview.net",
      phone: "870-555-0707",
      address: "320 Weed Lake Rd, Jonesboro, AR 72401",
      hearAbout: 1,
    },
    pondInfo: { pondType: "OLD", pondSize: 3.5, pondDepth: 5, pondAccess: 1, pondShape: "Rectangle" },
    estimator: {
      quoteId: "Q-1714000007",
      pondType: "STOCK_GRASS_CARP",
      pondTypeTitle: "Grass Carp",
      totalPrice: 747.50,
      grassCarpData: [
        { name: "8 to 10 inch Triploid Grass Carp", unit: "Fish", price: 5.75, quantity: 80 },
        { name: "12 inch Triploid Grass Carp",       unit: "Fish", price: 7.25, quantity: 50 },
      ],
      totalCostLess1000: 747.50,
      totalCostMore1000: 0,
      grassCarp: { selected: false, quantity: 0, total: 0 },
      stockingDescription: "Grass carp to control vegetation in an existing 3.5-acre pond.",
    },
    availability: { availableDate: "2025-06-05", availableTime: "Afternoon (12pm–5pm)" },
  },

  // ─── OLD — AlaCarteEstimator: CUSTOM_STOCKING ──────────────────────────────
  {
    quoteId: "Q-1714000008",
    createdAt: "2025-04-24",
    estimatorType: "CUSTOM_STOCKING",
    customer: {
      fullName: "Betty Simmons",
      email: "bsimmons@pondfarm.com",
      quoteEmail: "bsimmons@pondfarm.com",
      phone: "501-555-0808",
      address: "10 Old Mill Rd, Russellville, AR 72801",
      hearAbout: 3,
    },
    pondInfo: { pondType: "OLD", pondSize: 6.0, pondDepth: 11, pondAccess: 2, pondShape: "Irregular" },
    estimator: {
      quoteId: "Q-1714000008",
      pondType: "CUSTOM_STOCKING",
      pondTypeTitle: "Ala Carte / Custom Stocking",
      totalPrice: 3250.00,
      alaCarteData: [
        { category: "Florida Bass",      name: "Florida Bass",   size: "5-7 inch",  unit: "fish",   quantity: 300, pricePerUnit: 2.75, total: 825.00 },
        { category: "Bluegill",          name: "Bluegill",       size: "4-5 inch",  unit: "fish",   quantity: 800, pricePerUnit: 0.65, total: 520.00 },
        { category: "Catfish",           name: "Catfish",        size: "7-9 inch",  unit: "fish",   quantity: 200, pricePerUnit: 0.60, total: 120.00 },
        { category: "Minnows & Shiners", name: "Shiners",        size: "3-5 inch",  unit: "pounds", quantity: 120, pricePerUnit: 7.00, total: 840.00 },
        { category: "Hybrid Crappie",    name: "Hybrid Crappie", size: "3-4 inch",  unit: "fish",   quantity: 200, pricePerUnit: 0.65, total: 130.00 },
        { category: "Redear",            name: "Redear",         size: "3-4 inch",  unit: "fish",   quantity: 250, pricePerUnit: 0.32, total: 80.00  },
      ],
      alaCarteTotal: 3250.00,
      grassCarp: { selected: false, quantity: 0, total: 0 },
      stockingDescription: "Custom ala carte restocking for an existing 6-acre pond.",
    },
    availability: { availableDate: "2025-06-10", availableTime: "Morning (8am–12pm)" },
  },
];