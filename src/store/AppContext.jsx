import { createContext, useEffect, useReducer } from "react";
import { axiosInstance } from "../utils/axiosInstance.js";

export const AppContext = createContext({
    username: "",
    userID: "",
    token: "",
    loginError: false,
    login: () => {}
});

function AppReducer(state, action) {
}

export default function AppContextProvider({children}){
    const [state, dispatch] = useReducer(AppReducer, {
        username: "",
        userID: "",
        token: "",
        loginError: false,
        login: () => {},
    });

    const AppContextValue = {
        username: state.username,
        userID: state.userID,
        token: state.token,
        loginError: state.loginError,
        login: state.login,
    }

    return (
        <AppContext.Provider value={AppContextValue}>
            {children}
        </AppContext.Provider>
    );
}