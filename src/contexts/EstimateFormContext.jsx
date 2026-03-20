import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "esmt_ui_estimate_form";

export const initialEstimateFormData = {
  customer: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    quoteEmail: "",
    hearAbout: "",
  },
  pondInfo: {
    pondSize: "",
    distance: "",
    pondAccess: "",
    pondType: "",
    hasFish: "",
    selectedFish: [],
    selectedOption: "",
  },
  estimator: {
    pondType: "",
    selectedOptionIndices: [],
    selectedOptions: [],
    grassCarp: {
      selected: false,
      quantity: 1,
      total: 0,
    },
    hybridChoice: {
      regularHybrid: false,
      specklebelly: false,
    },
    breakdown: [],
    totalPrice: 0,
    
    // Adult Fish Estimator fields
    adultFishData: [],
    totalCostLess450: 0,
    totalCostMore450: 0,

    // Feed Bass Estimator fields
    feedBassData: [],
    totalCostLess12000: 0,
    totalCostMore12000: 0,

    // Grass Carp Estimator fields
    grassCarpData: [],
    totalCostLess1000: 0,
    totalCostMore1000: 0,

    // Ala Carte Estimator fields
    alaCarteData: [],
    alaCarteTotal: 0,
  },
  availability: {
    availableDate: "",
    availableTime: "",
  },
};

const EstimateFormContext = createContext({
  data: initialEstimateFormData,
  updateSection: () => {},
  reset: () => {},
});

export function EstimateFormProvider({ children }) {
  const [data, setData] = useState(() => {
    if (typeof window === "undefined") return initialEstimateFormData;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      // ignore parse errors
    }
    return initialEstimateFormData;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      // ignore
    }
  }, [data]);

  const updateSection = (section, patch) => {
    setData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...patch,
      },
    }));
  };

  const reset = () => setData(initialEstimateFormData);

  const value = useMemo(() => ({ data, updateSection, reset }), [data]);

  return (
    <EstimateFormContext.Provider value={value}>
      {children}
    </EstimateFormContext.Provider>
  );
}

export function useEstimateForm() {
  const context = useContext(EstimateFormContext);
  if (!context) {
    throw new Error("useEstimateForm must be used within EstimateFormProvider");
  }
  return context;
}
