// Master Price List
export const fishPricing = {
  "1 to 3 inch Bluegill": { price: 0.1, unit: "fish" },
  "3 to 4 inch Bluegill": { price: 0.22, unit: "fish" },
  "4 to 5 inch Bluegill": { price: 0.65, unit: "fish" },
  "Giant Bream": { price: 8, unit: "pound" },
  "1 to 3 inch Redear": { price: 0.15, unit: "fish" },
  "3 to 4 inch Redear": { price: 0.32, unit: "fish" },
  "4 to 5 inch Redear": { price: 0.8, unit: "fish" },
  "Giant Redear": { price: 9, unit: "pound" },
  "1 to 3 inch Black Crappie": { price: 0.34, unit: "fish" },
  "3 to 4 inch Black Crappie": { price: 0.43, unit: "fish" },
  "4 to 5 inch Black Crappie": { price: 0.75, unit: "fish" },
  "Giant Crappie": { price: 9, unit: "pound" },
  "1 to 3 inch Hybrid Crappie": { price: 0.39, unit: "fish" },
  "3 to 4 inch Hybrid Crappie": { price: 0.65, unit: "fish" },
  "4 to 5 inch Hybrid Crappie": { price: 1.1, unit: "fish" },
  "1 to 3 inch Hybrid Bream": { price: 0.1, unit: "fish" },
  "3 to 4 inch Hybrid Bream": { price: 0.22, unit: "fish" },
  "4 to 5 inch Hybrid Bream": { price: 0.65, unit: "fish" },
  "3 to 5 inch Catfish": { price: 0.13, unit: "fish" },
  "5 to 7 inch Catfish": { price: 0.3, unit: "fish" },
  "7 to 9 inch Catfish": { price: 0.6, unit: "fish" },
  "1 pound plus Catfish": { price: 1.75, unit: "pound" },
  "1 to 3 inch Bass": { price: 0.38, unit: "fish" },
  "3 to 4 inch Bass": { price: 0.95, unit: "fish" },
  "4 to 5 inch Bass": { price: 1.25, unit: "fish" },
  "5 to 7 inch Bass": { price: 2.15, unit: "fish" },
  "7 to 9 inch Bass": { price: 3.15, unit: "fish" },
  "10 to 12 inch Bass": { price: 12.5, unit: "pound" },
  "12 to 15 inch Bass": { price: 10, unit: "pound" },
  "1 to 3 inch Minnows": { price: 6.5, unit: "pound" },
  "3 to 5 inch Shiners": { price: 7, unit: "pound" },
  "8 to 10 inch Triploid Grass Carp": { price: 5.75, unit: "fish" },
  "12 inch Triploid Grass Carp": { price: 7.25, unit: "fish" },
  "8 to 10 inch Diploid Grass Carp": { price: 2.75, unit: "fish" },
  "12 inch Diploid Grass Carp": { price: 3.5, unit: "fish" },
  "8 to 10 inch F1 Bass": { price: 3.8, unit: "fish" },
  "1 to 3 inch F1 Florida Bass": { price: 0.5, unit: "fish" },
  "3 to 4 inch F1 Florida Bass": { price: 1.05, unit: "fish" },
  "4 to 5 inch F1 Florida Bass": { price: 1.9, unit: "fish" },
  "5 to 7 inch F1 Florida Bass": { price: 2.75, unit: "fish" },
  "7 to 9 inch F1 Florida Bass": { price: 3.8, unit: "fish" },
  "Intermediate Bream": { price: 0, unit: "fish" },
  "Fathead Minnows": { price: 0, unit: "pound" },
  "Golden Shiners": { price: 0, unit: "pound" },
  // Adult Fish
  "Adult Bass": { price: 10, unit: "pound" },
  "Adult Catfish": { price: 10, unit: "pound" },
  "Adult Bream": { price: 0, unit: "fish" },
  "Adult Hybrid Bream": { price: 0, unit: "fish" },
  "Adult Redear": { price: 0, unit: "fish" },
  "Adult Crappie": { price: 0, unit: "fish" },
};

export const markupRates = {
  "15+ acres": 1.4,
  "10-14 acres": 1.6,
  "5-9 acres": 1.8,
  "0-4 acres": 2,
};

export const freightRates = {
  pickup: 2.45,
  bigTruck: 4.75,
};

export function calculateFishCost(
  fishType,
  quantity
) {
  const fishInfo = fishPricing[fishType];
  if (!fishInfo) return 0;
  return fishInfo.price * quantity;
}

export function calculateTotalWithMarkup(
  subtotal,
  pondSizeAcres
) {
  let markup = markupRates["0-4 acres"];
  if (pondSizeAcres >= 15) markup = markupRates["15+ acres"];
  else if (pondSizeAcres >= 10) markup = markupRates["10-14 acres"];
  else if (pondSizeAcres >= 5) markup = markupRates["5-9 acres"];
  
  return subtotal * markup;
}

export function calculateFreight(
  miles,
  deliveryType
) {
  return miles * freightRates[deliveryType];
}
