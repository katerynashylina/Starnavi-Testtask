import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppPresets } from '../types/AppPresets';

const initialState: AppPresets[] = [];

const presetsSlice = createSlice({
  name: 'presets',
  initialState,
  reducers: {
    setPresets: (_, action: PayloadAction<AppPresets[]>) => {
      return action.payload;
    },
  },
});

export const { setPresets } = presetsSlice.actions;

export default presetsSlice.reducer;
