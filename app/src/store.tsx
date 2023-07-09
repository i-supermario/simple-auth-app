import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { profileReducer } from "./slices/profile";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import { editableProfileReducer } from "./slices/editableprofile";


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
export const persistedStore = persistStore(store)
