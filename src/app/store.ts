import { configureStore } from '@reduxjs/toolkit';

import presetsReducer from '../features/presets';
import isClickedReducer from '../features/isClicked';
import currentModeReducer from '../features/currentMode';
import isChosenReducer from '../features/isChosen';

export const store = configureStore({
  reducer: {
    presets: presetsReducer, 
    isClicked: isClickedReducer,
    currentMode: currentModeReducer,
    isChosen: isChosenReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
