import * as THREE from 'three';
import React from 'react';
import PropTypes from 'prop-types';

import BoardTile from './BoardTile';
import './Board.css';

const Board = ({ tilesMatrix, tileClicked, selectedTile }) => {
  return (
    <group position={[0, 0, 0]}>
      {tilesMatrix.map((rows, rowIndex) => {
        return rows.map((squareValue, columnIndex) => {
          return (
            <BoardTile
              key={columnIndex + '-' + rowIndex}
              x={columnIndex}
              y={rowIndex}
              visitCount={squareValue}
              tileClicked={tileClicked}
              isSelected={selectedTile[0] === columnIndex && selectedTile[1] === rowIndex}
            />
          );
        });
      })}
    </group>
  );
};

Board.propTypes = {
  tilesMatrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
};
Board.defaultProps = {
  tilesMatrix: [
    [0, 0],
    [0, 0],
  ],
};

export default Board;
