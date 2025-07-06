import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { User, Toast } from "@/types";

interface AppState {
  user: User | null;
  toasts: Toast[];
  sidebarOpen: boolean;
  
}

type AppAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "ADD_TOAST"; payload: Toast }
  | { type: "REMOVE_TOAST"; payload: string }
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "SET_SIDEBAR_OPEN"; payload: boolean };

const initialState: AppState = {
  user: null,
  toasts: [],
  sidebarOpen: true,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
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
  const { state, dispatch } = useAppContext();
  const setUser = (user: User | null) => {
    dispatch({ type: "SET_USER", payload: user });
  };
  return {
    user: state.user,
    setUser,
  };
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
