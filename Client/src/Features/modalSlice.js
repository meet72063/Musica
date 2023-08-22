import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    openLoginModal: false,
    openSideBar: false,
    OpensessionExpiredModal: false,
  },
  reducers: {
    setLoginModal: (state, { payload }) => {
      state.openLoginModal = payload;
    },
    setSideBar: (state, { payload }) => {
      state.openSideBar = payload;
    },
    setSessionExpiredModal: (state, { payload }) => {
      state.OpensessionExpiredModal = payload;
    },
  },
});

export const { setLoginModal, setSideBar, setSessionExpiredModal } =
  modalSlice.actions;
export default modalSlice.reducer;
