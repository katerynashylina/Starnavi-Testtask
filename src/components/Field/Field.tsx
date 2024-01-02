import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import './Field.scss';

type Props = {
  handleMouseEnter: (row: number, col: number) => void,
  resetField: boolean;
  setResetField: Dispatch<SetStateAction<boolean>>,
}

export const Field: React.FC<Props> = ({ handleMouseEnter, resetField, setResetField }) => {
  const currentMode = useAppSelector(store => store.currentMode.currentMode);
  const presets = useAppSelector(store => store.presets);
  const isClicked = useAppSelector(store => store.isClicked.isClicked);

  const fieldSize = presets.find(item => item.name === currentMode)?.field || 5;
  const [cells, setCells] = useState(Array.from({ length: fieldSize * fieldSize }, () => false));

  useEffect(() => {
    if (resetField) {
      setResetField(false);
      setCells(Array.from({ length: fieldSize * fieldSize }, () => false));
    }
  }, [resetField]);

  const determineCellSize = () => {
    if (fieldSize === 3) return 50;
    if (fieldSize <= 10) return 40;
    if (fieldSize > 10 && fieldSize <= 55) return 25;
    return 7;
  };

  const cellSize = determineCellSize();

  const toggleCellColor = (index: number) => {
    const newCells = [...cells];
    newCells[index] = !newCells[index];
    setCells(newCells);
  };

  const handleHover = (index: number, row: number, col: number) => {
    if (isClicked) {
      handleMouseEnter(row, col);
      toggleCellColor(index);
    }
  }

  const cellItems = [];
  for (let row = 1; row <= fieldSize; row++) {
    for (let col = 1; col <= fieldSize; col++) {
      const index = row * fieldSize + col;
      cellItems.push(
        <div
          key={`${row}-${col}`}
          onMouseEnter={() => handleHover(index, row, col)}
          style={{
            width: cellSize,
            height: cellSize,
            border: '1px solid #000',
            background: cells[index] ? '#007ff0' : '#fff',
          }}
        >
        </div>
      );
    }
  }

  const fieldStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${fieldSize}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${fieldSize}, ${cellSize}px)`,
    gap: '1px',
    border: '1px solid #000',
    width: fieldSize * cellSize + fieldSize - 1,
  };

  return (
    <div className='field'>
      <h1>Field Size: {fieldSize}</h1>
      <div style={fieldStyle}>{cellItems}</div>
    </div>
  );
}