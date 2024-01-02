import { Square } from '../../types/Square';
import './HoveredList.scss';
import { useAppSelector } from '../../app/hooks';
import React from 'react';

type Props = {
  hoveredSquaresArray: Square[],
}

export const HoveredList: React.FC<Props> = ({ hoveredSquaresArray }) => {
  const isClicked = useAppSelector(store => store.isClicked.isClicked);

  return (
    <div className="hovered-list">
      <h3
        style={{ opacity: !isClicked ? '0' : '1' }}
      >
        Hovered squares:
      </h3>

      <div className="hovered-list__elements">
        {hoveredSquaresArray.map(square => (
          <React.Fragment
            key={`${square.row}-${square.col}`}
          >
            <p className='hovered-list__wrapper'>
              {square.row} row, {square.col} column
            </p>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
