import { createSlice } from '@reduxjs/toolkit';

export const documentSlice = createSlice({
  name: 'counter',
  initialState: {
    documentId: "null",
    documentName:"null",
    documentAdminId: "null",
  },
  reducers: {
    setDocument: (state, action) => {
      state.documentId = action.payload.documentId;
      state.documentName = action.payload.documentName;
      state.documentAdminId = action.payload.documentAdminId;
    },
    removeDocument: (state) => {
      state.documentId = null;
      state.documentName = null;
      state.documentAdminId = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDocument, removeDocument } = documentSlice.actions;

export default documentSlice.reducer;
