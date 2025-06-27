import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { User, Brand, ContentPlan, LoadingState, Toast } from "@/types";
import { StepperStep } from "@/components/ui/vertical-stepper";

interface AppState {
  user: User | null;
  currentBrand: Brand | null;
  brands: Brand[];
  contentPlans: ContentPlan[];
  loadingState: LoadingState;
  toasts: Toast[];
  sidebarOpen: boolean;
  stepperSteps: StepperStep[];
  
}

type AppAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_CURRENT_BRAND"; payload: Brand | null }
  | { type: "SET_BRANDS"; payload: Brand[] }
  | { type: "ADD_BRAND"; payload: Brand }
  | { type: "UPDATE_BRAND"; payload: Brand }
  | { type: "SET_CONTENT_PLANS"; payload: ContentPlan[] }
  | { type: "ADD_CONTENT_PLAN"; payload: ContentPlan }
  | { type: "UPDATE_CONTENT_PLAN"; payload: ContentPlan }
  | { type: "SET_LOADING"; payload: LoadingState }
  | { type: "ADD_TOAST"; payload: Toast }
  | { type: "REMOVE_TOAST"; payload: string }
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "SET_SIDEBAR_OPEN"; payload: boolean };

const initialState: AppState = {
  user: null,
  currentBrand: null,
  brands: [],
  contentPlans: [],
  loadingState: {
    isLoading: false,
    message: "",
  },
  toasts: [],
  sidebarOpen: true,
  stepperSteps: [],
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_CURRENT_BRAND":
      return { ...state, currentBrand: action.payload };
    case "SET_BRANDS":
      return { ...state, brands: action.payload };
    case "ADD_BRAND":
      return { ...state, brands: [...state.brands, action.payload] };
    case "UPDATE_BRAND":
      return {
        ...state,
        brands: state.brands.map((brand) =>
          brand.id === action.payload.id ? action.payload : brand,
        ),
        currentBrand:
          state.currentBrand?.id === action.payload.id
            ? action.payload
            : state.currentBrand,
      };
    case "SET_CONTENT_PLANS":
      return { ...state, contentPlans: action.payload };
    case "ADD_CONTENT_PLAN":
      return {
        ...state,
        contentPlans: [...state.contentPlans, action.payload],
      };
    case "UPDATE_CONTENT_PLAN":
      return {
        ...state,
        contentPlans: state.contentPlans.map((plan) =>
          plan.id === action.payload.id ? action.payload : plan,
        ),
      };
    case "SET_LOADING":
      return { ...state, loadingState: action.payload, stepperSteps:action.payload.stepperSteps ?? state.stepperSteps };
    case "ADD_TOAST":
      return { ...state, toasts: [...state.toasts, action.payload] };
    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload),
      };
    case "TOGGLE_SIDEBAR":
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case "SET_SIDEBAR_OPEN":
      return { ...state, sidebarOpen: action.payload };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

// Helper hooks for common operations
export const useUser = () => {
  const { state } = useAppContext();
  return state.user;
};

export const useCurrentBrand = () => {
  const { state } = useAppContext();
  return state.currentBrand;
};

export const useLoadingState = () => {
  const { state } = useAppContext();
  return state.loadingState;
};

export const useToasts = () => {
  const { state, dispatch } = useAppContext();

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    dispatch({ type: "ADD_TOAST", payload: { ...toast, id } });

    if (toast.duration !== -1) {
      setTimeout(() => {
        dispatch({ type: "REMOVE_TOAST", payload: id });
      }, toast.duration || 5000);
    }
  };

  const removeToast = (id: string) => {
    dispatch({ type: "REMOVE_TOAST", payload: id });
  };

  return {
    toasts: state.toasts,
    addToast,
    removeToast,
  };
};
