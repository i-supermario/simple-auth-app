import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { profileReducer } from "./reducers/profile";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";
import { editableProfileReducer } from "./reducers/editableprofile";

const persistConfig = {
    key: 'auth',
    storage
}

const reducers = combineReducers({profile: profileReducer, profileEditable : editableProfileReducer})

const persistedReducer = persistReducer(persistConfig,reducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store