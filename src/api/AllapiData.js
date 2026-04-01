export const leadSource=[
{ "id": 1, "code": "1", "name": "AGFC Guidebook" },
{ "id": 5, "code": "5", "name": "Event Sponsorship" },
{ "id": 8, "code": "8", "name": "Facebook" },
{ "id": 2, "code": "2", "name": "Farm Bureau Magazine" },
{ "id": 3, "code": "3", "name": "First Electric Magazine" },
{ "id": 9, "code": "9", "name": "Instagram" },
{ "id": 7, "code": "7", "name": "Neighbor" },
{ "id": 6, "code": "6", "name": "Return Customer" },
{ "id": 11, "code": "11", "name": "State Fair" },
{ "id": 4, "code": "4", "name": "Website" },
{ "id": 10, "code": "10", "name": "YouTube" }
]

export const pondAccessOptions = [
{ "id": 4, "code": "FOUR_WHEELER_TRAIL", "name": "4 wheeler trail" },
{ "id": 3, "code": "DIRT_ROAD", "name": "Dirt road" },
{ "id": 6, "code": "NO_DELIVERY_RAIN", "name": "Do not deliver if it rained in the last week" },
{ "id": 1, "code": "SOLID_ROAD", "name": "Good solid road/driveway to the pond" },
{ "id": 2, "code": "GRAVEL_ROAD", "name": "Gravel road" },
{ "id": 7, "code": "TRACTOR_AVAILABLE", "name": "I have a tractor/bulldozer to pull you out if stuck" },
{ "id": 5, "code": "CROSS_FIELD", "name": "You have to cross a cow pasture or lawn or field to get there" }
]

export const fishTypes = [
{ "id": 1, "code": "BASS", "name": "Bass" },
{ "id": 4, "code": "BLACK_CRAPPIE", "name": "Black Crappie" },
{ "id": 11, "code": "BLUE_CATFISH", "name": "Blue Catfish" },
{ "id": 2, "code": "BLUEGILL_SUNFISH", "name": "Bluegill Sunfish" },
{ "id": 5, "code": "CHANNEL_CATFISH", "name": "Channel Catfish" },
{ "id": 8, "code": "FATHEAD_MINNOWS", "name": "Fathead Minnows" },
{ "id": 12, "code": "FLATHEAD_CATFISH", "name": "Flathead Catfish" },
{ "id": 14, "code": "GAR", "name": "Gar" },
{ "id": 7, "code": "GOLDEN_SHINERS", "name": "Golden Shiners" },
{ "id": 9, "code": "GREEN_SUNFISH", "name": "Green Sunfish" },
{ "id": 15, "code": "GRINNEL", "name": "Grinnel" },
{ "id": 6, "code": "HYBRID_BREAM", "name": "Hybrid Bream" },
{ "id": 13, "code": "MUD_CAT", "name": "Mud Cat" },
{ "id": 3, "code": "REDEAR", "name": "Redear" },
{ "id": 16, "code": "SHAD", "name": "Shad" },
{ "id": 10, "code": "WHITE_CRAPPIE", "name": "White Crappie" }
]

export const pondTypeOptions = {
  "NEW": [
    { "id": 1, "code": "FISH_TROPHY_BASS", "name": "I want to fish for trophy bass." },
    { "id": 2, "code": "FISH_QUALITY_BASS_BREAM", "name": "I want to fish for quality bass and bream." },
    { "id": 3, "code": "FISH_VARIETY_SPECIES", "name": "I want to fish for a variety of fish (bass, bream, crappie, catfish)." },
    { "id": 4, "code": "FISH_CATFISH", "name": "I want to fish for catfish." },
    { "id": 5, "code": "FISH_BIG_BREAM_SMALL_POND", "name": "I want to fish for big bream in a small pond." },
    { "id": 6, "code": "CUSTOM_STOCKING", "name": "I want to create my own custom fish stocking from your ala carte menu" }
  ],
  "OLD": [
    { "id": 7, "code": "ADD_CATCHABLE_FISH", "name": "I want to add catchable/adult fish to my existing pond" },
    { "id": 8, "code": "FEED_POND_BASS", "name": "I want to feed the bass in my pond" },
    { "id": 9, "code": "STOCK_GRASS_CARP", "name": "I want to stock grass carp to eat the weeds in my pond" },
    { "id": 10, "code": "CUSTOM_STOCKING", "name": "I want to create my own custom fish stocking from your ala carte menu" }
  ]
}


export const pondConfigs = {
  "FISH_TROPHY_BASS": {
    title: "Trophy Bass Pond Estimator",
    description:
      "Grow Bass over 10 pounds, Slow fishing long term growth. Best to Stock Bass in June for best  Growth potential Stock others first.",
  },

  "FISH_CATFISH": {
    title: "Catfish Pond Estimator",
    description:
      "Grow Catfish up to 5 pounds. Small ponds with low management. Can be stocked year round so long asnot to hot for redear.",
  },

  "FISH_VARIETY_SPECIES": {
    title: "Fishing Pond Estimator",
    description:
      "Grow quality bass, bream, crappie and catfish. Great for kids. All fish can be stocked at same time Crappie do best October to April.",
  },

  "FISH_BIG_BREAM_SMALL_POND": {
    title: "Hybrid Bream Pond Estimator",
    description:
      "Grow Bream up to 1 pound. Small ponds with low management. 80 to 90% male reduced spawning reduces competition makes big bream.",
    
  },

  "FISH_QUALITY_BASS_BREAM": {
    title: "Bass Pond Estimator",
    description:
      "Grow Bass over 5 pounds. Will require regular bass harvest to maintain balance. Best to Stock Bass in June for best  Growth potential Stock others first.",
    
  },
};


export const pondEstimateApi = {
    "quoteType": "FISH_TROPHY_BASS",
    "title": "Trophy Bass Pond Estimator",
    "description": "Grow Bass over 10 pounds, slow long-term growth. Best to stock bass in June.",
    "packages": [
        {
            "packageCode": "SMALL",
            "packageName": "Small Fish Option",
            "description": null,
            "preferredOption": null,
            "estimatedPrice": 881.25,
            "fishItems": [
                {
                    "fishType": "Bass",
                    "size": "1 to 3 inch",
                    "unitType": "FISH",
                    "quantity": 200
                },
                {
                    "fishType": "Bluegill Sunfish",
                    "size": "1 to 3 inch",
                    "unitType": "FISH",
                    "quantity": 100
                },
                {
                    "fishType": "Redear",
                    "size": "1 to 3 inch",
                    "unitType": "FISH",
                    "quantity": 50
                },
                {
                    "fishType": "Black Crappie",
                    "size": "1 to 3 inch",
                    "unitType": "FISH",
                    "quantity": 400
                }
            ]
        },
        {
            "packageCode": "MEDIUM",
            "packageName": "Medium Fish Option",
            "description": null,
            "preferredOption": null,
            "estimatedPrice": 881.25,
            "fishItems": [
                {
                    "fishType": "Bass",
                    "size": "3 to 4 inch",
                    "unitType": "FISH",
                    "quantity": 300
                },
                {
                    "fishType": "Bluegill Sunfish",
                    "size": "3 to 4 inch",
                    "unitType": "FISH",
                    "quantity": 150
                },
                {
                    "fishType": "Redear",
                    "size": "3 to 4 inch",
                    "unitType": "FISH",
                    "quantity": 100
                },
                {
                    "fishType": "Black Crappie",
                    "size": "3 to 4 inch",
                    "unitType": "FISH",
                    "quantity": 600
                }
            ]
        },
        {
            "packageCode": "LARGE",
            "packageName": "Large Fish Option",
            "description": null,
            "preferredOption": null,
            "estimatedPrice": 881.25,
            "fishItems": [
                {
                    "fishType": "Bass",
                    "size": "5 to 6 inch",
                    "unitType": "FISH",
                    "quantity": 300
                },
                {
                    "fishType": "Bluegill Sunfish",
                    "size": "5 to 6 inch",
                    "unitType": "FISH",
                    "quantity": 150
                },
                {
                    "fishType": "Redear",
                    "size": "5 to 6 inch",
                    "unitType": "FISH",
                    "quantity": 100
                },
                {
                    "fishType": "Black Crappie",
                    "size": "5 to 6 inch",
                    "unitType": "FISH",
                    "quantity": 600
                }
            ]
        },
        {
            "packageCode": "YEAR1",
            "packageName": "1 Year Old Population",
            "description": null,
            "preferredOption": null,
            "estimatedPrice": 1797.65,
            "fishItems": [
                {
                    "fishType": "Bass",
                    "size": "1 to 3 inch",
                    "unitType": "FISH",
                    "quantity": 100
                },
                {
                    "fishType": "Bass",
                    "size": "3 to 4 inch",
                    "unitType": "FISH",
                    "quantity": 200
                },
                {
                    "fishType": "Bass",
                    "size": "4 to 5 inch",
                    "unitType": "POUNDS",
                    "quantity": 400
                },
                {
                    "fishType": "Bluegill Sunfish",
                    "size": "1 to 3 inch",
                    "unitType": "FISH",
                    "quantity": 60
                },
                {
                    "fishType": "Bluegill Sunfish",
                    "size": "3 to 4 inch",
                    "unitType": "POUNDS",
                    "quantity": 120
                },
                {
                    "fishType": "Bluegill Sunfish",
                    "size": "4 to 5 inch",
                    "unitType": "FISH",
                    "quantity": 240
                },
                {
                    "fishType": "Black Crappie",
                    "size": "4 to 5 inch",
                    "unitType": "FISH",
                    "quantity": 1000
                }
            ]
        }
    ],
    "addons": [
        {
            "addonCode": "GRASS_CARP",
            "fishSize": "8 to 10 inch",
            "fishName": "Triploid Grass Carp",
            "quantity": 1,
            "unitPrice": 10,
            "selected": false,
            "eligibleStates": [
                "Arkansas",
                "Missouri",
                "Mississippi",
                "Oklahoma",
                "Tennessee"
            ]
        }
    ],
    "quantityInputs": null,
    "minimumOrderAmount": 750,
    "infoNotes": [
        "Bluegill, Redear and Minnows stocked in fall or spring",
        "Bass stocked in June"
    ],
    "disclaimerNotes": [
        "Estimated price is calculated using pond size, fish size and distance from Lonoke, Arkansas",
        "A representative will contact you to confirm the estimate prior to fish delivery"
    ],
    "errors": null,
    "message": "Quote estimation successful."
}