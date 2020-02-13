import * as THREE from 'three';
import ReactDOM from 'react-dom';
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
// import PropTypes from 'prop-types';

import './Box.css';
import { BoxBufferGeometry } from 'three';

const Box = ({ x, y }) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  //const [isMoving, setIsMoving] = useState(false);

  const [targetCoordinatesQueue, setTargetCoordinatesQueue] = useState([]);
  const [movementsQueue, setMovementsQueue] = useState([]);

  // these coordinates are to track where the movement animation is going (the actual position is given as props)
  const [animationX, setAnimationX] = useState(x ? x : 0);
  const [animationY, setAnimationY] = useState(y ? y : 0);

  // track the two corners of the cube, the moving rotations are made around these anchors
  const bottomLeftAnchor = useRef();
  const topRightAnchor = useRef();

  // Set up state for the hovered and active state
  //const [hovered, setHover] = useState(false);
  //const [rotateDirection, setRotateDirection] = useState('');

  const addLocationToQueue = (x, y) => {
    // add to the target locations
    setTargetCoordinatesQueue((targetCoordinatesQueue) => [...targetCoordinatesQueue, [x, y]]);

    // then calculate the new location movement based on either current location OR from the last target from the location queue
    const startX = movementsQueue.length
      ? targetCoordinatesQueue[targetCoordinatesQueue.length - 1][0]
      : animationX;
    const startY = movementsQueue.length
      ? targetCoordinatesQueue[targetCoordinatesQueue.length - 1][1]
      : animationY;

    let requiredYMovement = y - startY;
    let requiredXMovement = x - startX;
    while (requiredYMovement !== 0) {
      if (requiredYMovement < 0) {
        setMovementsQueue((movementsQueue) => [...movementsQueue, 'down']);
        requiredYMovement++;
      } else {
        setMovementsQueue((movementsQueue) => [...movementsQueue, 'up']);
        requiredYMovement--;
      }
    }
    while (requiredXMovement !== 0) {
      if (requiredXMovement < 0) {
        setMovementsQueue((movementsQueue) => [...movementsQueue, 'left']);
        requiredXMovement++;
      } else {
        setMovementsQueue((movementsQueue) => [...movementsQueue, 'right']);
        requiredXMovement--;
      }
    }
  };

  useEffect(() => {
    console.log(' box should be moved');
    addLocationToQueue(x, y);
  }, [x, y]);

  const rotateSpeed = 0.1;
  // AKA how fast the rotation is
  const rotateAnglePerFrame = 0.1;

  // handles one animation update
  // this is a tricky method as a lot of it depends on the direction, but the base logic is same for each direction
  const handleAnimationFrame = (direction) => {
    // determine which anchor the box is rotated against
    const anchor = direction === 'up' || direction === 'right' ? topRightAnchor : bottomLeftAnchor;
    // determine on which axis the rotation should happen
    const rotateAxis = direction === 'up' || direction === 'down' ? 'x' : 'y';
    // determine if the animation should be increasing or decreasing the rotation angle
    const rotateDirection = direction === 'down' || direction === 'right' ? 1 : -1;
    // determine does the current movement increase or decrease the coordinate value
    const movementCoordinateValueDirection = direction === 'up' || direction === 'right' ? 1 : -1;

    if (Math.abs(anchor.current.rotation[rotateAxis]) + rotateSpeed < Math.PI / 2) {
      anchor.current.rotation[rotateAxis] =
        anchor.current.rotation[rotateAxis] + rotateDirection * rotateSpeed;
    }
    // else means the current animation would go over 90 degrees
    // => movement will finish with this call
    // => set the angle back to 0 degrees, and instead move the whole cube one over
    // this allows us to maintain the anchors in the right place
    // NOTE: this means that the cube won't actually roll freely: the bottom face will always be bottom face
    // if we want to make the cube have different faces, this needs to be changed
    else {
      anchor.current.rotation[rotateAxis] = 0;

      let newAnimationX = animationX;
      let newAnimationY = animationY;
      if (direction === 'left' || direction === 'right') {
        newAnimationX += movementCoordinateValueDirection;
      } else {
        newAnimationY += movementCoordinateValueDirection;
      }
      setAnimationX(newAnimationX);
      setAnimationY(newAnimationY);

      // remove the first movement from the queue
      setMovementsQueue(movementsQueue.filter((m, index) => index !== 0));
      // check if the movement reached a target from targets queue
      if (
        targetCoordinatesQueue[0][0] === newAnimationX &&
        targetCoordinatesQueue[0][1] === newAnimationY
      ) {
        setTargetCoordinatesQueue(targetCoordinatesQueue.filter((tc, index) => index !== 0));
      }

      console.log(
        'finished this movement animation, still got following movements ahead: ',
        ...movementsQueue
      );
    }
  };
  // Rotate cube every frame, this is outside of React without overhead
  useFrame(() => {
    if (movementsQueue && movementsQueue.length) {
      handleAnimationFrame(movementsQueue[0]);
    }
  });

  const boxClicked = (e) => {
    console.log('box clicked ');
  };

  // set outer anchor position
  const bottomLeftPosition = [animationX - 0.5, animationY - 0.5, 0];

  // anything inside the bottomLeftAnchor will have their position determined from that anchor (not from the world itself)
  return (
    <group ref={bottomLeftAnchor} position={bottomLeftPosition}>
      <group ref={topRightAnchor} position={[1, 1, 0]}>
        <mesh position={[-0.5, -0.5, 0.5]} ref={mesh} scale={[1, 1, 1]} onClick={boxClicked}>
          {/*<primitive object={geometry} attach="geometry" />*/}
          <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
          <meshStandardMaterial attach="material" color="darkred" />
        </mesh>
      </group>
    </group>
  );
};

export default Box;
