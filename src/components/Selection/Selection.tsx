import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Option } from '../Option/Option';
import './Selection.scss';
import { setCurrentMode } from '../../features/currentMode';
import { setIsChosen } from '../../features/isChosen';
import { Square } from '../../types/Square';

type Props = {
  setHoveredSquares: Dispatch<SetStateAction<Square[]>>;
  setResetField: Dispatch<SetStateAction<boolean>>;
}

export const Selection: React.FC<Props> = ({ setHoveredSquares, setResetField }) => {
  const presets = useAppSelector(store => store.presets);
  const dispatch = useAppDispatch();

  const handleModeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedMode = event.target.value;
    setHoveredSquares([]);
    setResetField(true);

    dispatch(setCurrentMode(selectedMode));
    dispatch(setIsChosen(!!selectedMode));
  };

  return (
    <div className="selection">
      <label
        className="selection__mode
        selection__mode--text"
      >
        Modes:
        <select
          onChange={handleModeChange}
          className="selection__mode--item select"
          defaultValue=""
        >
          <option value="" disabled>
            Pick the mode
          </option>
          {presets.map(preset => (
            <Option
              key={preset.id}
              name={preset.name}
            />
          ))}
        </select>
      </label>
    </div>
  );
}