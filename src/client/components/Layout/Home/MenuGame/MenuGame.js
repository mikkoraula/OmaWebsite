import * as THREE from 'three';
import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useThree, useFrame } from 'react-three-fiber';
import './MenuGame.css';
import Board from './Board';
import Box from './Box';
//import { Camera } from 'three';

// need to create own camera to change the default position
const Camera = (props) => {
  const ref = useRef();
  const { setDefaultCamera } = useThree();
  // Make the camera known to the system
  useEffect(() => void setDefaultCamera(ref.current), []);
  // Update it every frame
  useFrame(() => ref.current.updateMatrixWorld());
  return <perspectiveCamera ref={ref} {...props} />;
};

const MenuBoard = () => {
  const [tilesMatrix, setTilesMatrix] = useState([
    [1, 2, 3, 4, 5, 6, 7],
    [11, 12, 13, 14, 15, 16, 17],
    [21, 22, 23, 24, 25, 26, 27],
    [31, 32, 33, 34, 35, 36, 37],
    [41, 42, 43, 44, 45, 46, 47],
    [51, 52, 53, 54, 55, 56, 57],
    [61, 62, 63, 64, 65, 66, 67],
  ]);
  const [boxX, setBoxX] = useState(3);
  const [boxY, setBoxY] = useState(3);
  const [selectedTile, setSelectedTile] = useState([]);

  console.log('hello');

  const tileClicked = (x, y) => {
    console.log('tile clicked x: ', x, ', y: ', y);
    setBoxX(parseInt(x));
    setBoxY(parseInt(y));
    setSelectedTile([x, y]);
  };

  return (
    <Canvas>
      <Camera position={[3, 3, 9]} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Board tilesMatrix={tilesMatrix} tileClicked={tileClicked} selectedTile={selectedTile} />
      <Box x={boxX} y={boxY} />
    </Canvas>
  );
};
export default MenuBoard;
