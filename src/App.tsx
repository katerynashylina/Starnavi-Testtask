import { useEffect } from "react";
import { getPresets } from "./helpers/fetchPresets";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { setPresets } from "./features/presets";

import './styles/reset.scss';
import './styles/normalize.scss';
import './App.scss';
import { MainPage } from "./components/MainPage/MainPage";

export const App = () => {
  const isClicked = useAppSelector(store => store.isClicked.isClicked);
  const dispatch = useAppDispatch();

  const loadPresets = async () => {
    try {
      const presetsFromServer = await getPresets();

      dispatch(setPresets(presetsFromServer));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    loadPresets();
  }, []);

  return (
    <div className="page">
      <div className="page__container">
        {!isClicked && (
          <p className="page__text">
            To start the app <strong>choose the mode</strong> and <strong>click the "start" button</strong>
          </p>
        )}

        <MainPage />
      </div>
    </div>
  );
}