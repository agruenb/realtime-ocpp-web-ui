import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface sessionState {
    lastUpdate: string,
    key: string,
    permissions: Array<string>
}

const initialState: sessionState = {
    lastUpdate: "",
    key: "",
    permissions: ["/chargepoints", "/load-distribution", "/transactions", "/tags"]
};

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        updateKey: (state, action: PayloadAction<string>) => {
            let newState = {
                lastUpdate: (new Date()).toISOString(),
                key: action.payload,
                permissions: state.permissions
            }
            localStorage.setItem("session", JSON.stringify(newState))
            return newState;
        },
        setSession: (state, action: PayloadAction<sessionState>) => {
            let newState = {
                lastUpdate: (new Date()).toISOString(),
                key: action.payload.key,
                permissions: action.payload.permissions
            }
            localStorage.setItem("session", JSON.stringify(newState))
            return newState;
        },
        validateKey: (state) => {
            return  {
                lastUpdate: (new Date()).toISOString(),
                key: "",
                permissions: state.permissions
            };
        }
    }
});

export const { updateKey, validateKey, setSession } = sessionSlice.actions;

export default sessionSlice.reducer;