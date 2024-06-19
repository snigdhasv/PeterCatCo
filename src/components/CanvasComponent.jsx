import React, { forwardRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

const CanvasComponent = forwardRef(({ sceneRef, children, onObjectClick, onObjectHover, highlightedMesh }, ref) => (
  <Canvas ref={ref} gl={{ logarithmicDepthBuffer: true, antialias: false }} dpr={[1, 1.5]} camera={{ position: [0, 0, 15], fov: 25 }}>
    <color attach="background" args={["#ececec"]} />
    <ambientLight intensity={0.2} />
    <Environment preset={"city"} />
    {React.cloneElement(children, { ref: sceneRef, onObjectClick, onObjectHover, highlightedMesh })}
  </Canvas>
));

export default CanvasComponent;
