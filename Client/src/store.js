import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from "./Features/userDetailSlice";
import songReducer from "./Features/SongSlice";
import currentTrackReducer from "./Features/CurrentTrack";
// import artistReducer from './Features/artistSlice'
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import modalReducer from "./Features/modalSlice";
import userPlayistReducer from "./Features/UserPlaylistSlice";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  userDetails: userDetailsReducer,
  songs: songReducer,
  currentTrack: currentTrackReducer,
  modal: modalReducer,
  playlists: userPlayistReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
