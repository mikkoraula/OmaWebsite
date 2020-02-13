import * as THREE from 'three';
import ReactDOM from 'react-dom';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
// import PropTypes from 'prop-types';

import './BoardTile.css';

const Line = ({ startPoint, endPoint, color }) => {
  const geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(...startPoint));
  geometry.vertices.push(new THREE.Vector3(...endPoint));
  const material = new THREE.LineBasicMaterial({ color: color });
  return <line args={[geometry, material]} />;
};

const BoardTile = ({ x, y, value, tileClicked, isSelected }) => {
  const handleClick = (e) => {
    const x = Math.round(e.point.x);
    const y = Math.round(e.point.y);
    tileClicked(x, y);
  };

  const renderX = x - 0.5;
  const renderY = y - 0.5;
  return (
    <group position={[renderX, renderY, 0]}>
      <mesh position={[0.5, 0.5, 0]} receiveShadow onClick={handleClick}>
        <planeBufferGeometry attach="geometry" args={[1, 1]} />
        <meshPhongMaterial attach="material" color={isSelected ? 'hotpink' : '#272727'} />
      </mesh>
      {/*
      <Line startPoint={[0, 0]} endPoint={[1, 0]} color="deeppink" />
      <Line startPoint={[0, 0]} endPoint={[0, 1]} color="deeppink" />
      <Line startPoint={[1, 0]} endPoint={[1, 1]} color="deeppink" />
      <Line startPoint={[0, 1]} endPoint={[1, 1]} color="deeppink" />
      */}
    </group>
  );
};

export default BoardTile;
