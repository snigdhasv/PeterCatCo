import React, { useState, useRef } from 'react';
import { Scene } from './components/Scene';
import { Canvas } from '@react-three/fiber';
import { Leva } from 'leva';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Environment, Lightformer,MeshReflectorMaterial } from '@react-three/drei';

import { XR, createXRStore, VRButton } from '@react-three/xr';

import useLights from './components/LightsManager';
import Lights from './components/Lights';
import LightControls from './components/LightControls';
import { Experience, slideAtom, scenes } from './components/Experience';
import { Overlay } from './components/Overlay';
import InfoPanel from './components/InfoPanel';
import useObjectControls from './components/ObjectControls';
import useSceneControls from './components/SceneControls';
import { MenuPanel, TexturesMaterialsAtom, LightsAtom } from './components/MenuPanel';

function App() {
  const {
    lights,
    globalExposure,
    addLight,
    updateLight,
    deleteLight,
    resetLights,
    toggleGlobalShadows,
    globalShadows,
    updateGlobalExposure,
    expandedLightId,
    setExpandedLightId,
  } = useLights();

  const [slide] = useAtom(slideAtom);
  const [selectedObject, setSelectedObject] = useState(null);
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const sceneRef = useRef();
  const canvasRef = useRef();
  const [TexturesMaterials, setTexturesMaterials] = useAtom(TexturesMaterialsAtom);
  const [Light, setLights] = useAtom(LightsAtom);

  const store = createXRStore();

  const { handleObjectClick, handleObjectHover, highlightedMesh } = useObjectControls(setSelectedObject, setShowInfoPanel);

  const {
    handleColorChange,
    handleMaterialChange,
    handleWireframeToggle,
    handleTransparentToggle,
    handleOpacityChange,
    handleDepthTestToggle,
    handleDepthWriteToggle,
    handleAlphaHashToggle,
    handleSideChange,
    handleFlatShadingToggle,
    handleVertexColorsToggle,
    handleGeometryChange,
    handleSizeChange,
  } = useSceneControls(() => {});

  const handleClosePanel = () => {
    setShowInfoPanel(false);
    setSelectedObject(null);
  };

  // Conditional hover handler
  const conditionalObjectHover = (mesh) => {
    if (TexturesMaterials) {
      handleObjectHover(mesh);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && canvas.gl) {
      const vrButton = VRButton.createButton(canvas.gl);
      document.body.appendChild(vrButton);
  
      return () => {
        document.body.removeChild(vrButton);
      };
    }
  }, [canvasRef]);
  
  const ratioScale = Math.min(1.2, Math.max(0.5, window.innerWidth / 1920));

  return (
    <>
      <Leva hidden />
      <Overlay sceneRef={sceneRef} store={store} />
      <Canvas
        ref={canvasRef}
        shadows
        gl={{ logarithmicDepthBuffer: true, antialias: false }}
        dpr={[1, 1.5]}
        style={{ backgroundColor: '#15151a' }}
      >
        <XR store={store}>
        <Experience />
        <Scene
          ref={sceneRef}
          onObjectClick={handleObjectClick}
          onObjectHover={conditionalObjectHover}
          highlightedMesh={highlightedMesh}
          {...scenes[slide]}
        />
        <Lights lights={lights} globalExposure={globalExposure} />
        </XR>
        <hemisphereLight intensity={0.5} />
                
      <mesh scale={3 * ratioScale} position={[3 * ratioScale, -0.1, -0.8]} rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}>
          <ringGeometry args={[0.9, 1, 4, 1]} />
          <meshStandardMaterial color="white" roughness={0.75} />
      </mesh>
      <mesh scale={4 * ratioScale} position={[-3 * ratioScale, -0.1, -0.4]} rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}>
          <ringGeometry args={[0.9, 1, 3, 1]} />
          <meshStandardMaterial color="white" roughness={0.75} />
      </mesh>
      
      <Environment background>
          <color attach="background" args={["#15151a"]} />
          <Lightformer intensity={1} rotation-x={Math.PI / 2} position={[0, 4, -9]} scale={[10, 1, 1]} />
          <Lightformer intensity={1} rotation-x={Math.PI / 2} position={[0, 4, -6]} scale={[10, 1, 1]} />
          <Lightformer intensity={1} rotation-x={Math.PI / 2} position={[0, 4, -3]} scale={[10, 1, 1]} />
          <Lightformer intensity={1} rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[10, 1, 1]} />
          <Lightformer intensity={1} rotation-x={Math.PI / 2} position={[0, 4, 3]} scale={[10, 1, 1]} />
          <Lightformer intensity={1} rotation-x={Math.PI / 2} position={[0, 4, 6]} scale={[10, 1, 1]} />
          <Lightformer intensity={1} rotation-x={Math.PI / 2} position={[0, 4, 9]} scale={[10, 1, 1]} />
      </Environment>
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]} scale={[100, 100, 1]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <MeshReflectorMaterial 
              blur={[400, 100]}
              resolution={1024}
              mixBlur={1}
              mixStrength={60}
              depthScale={1}
              minDepthThreshold={0.85}
              maxDepthThreshold={1}
              color="#333333"
              roughness={0.7}
              metalness={0.5}
          />
      </mesh>
      </Canvas>
      
      <MenuPanel />
      {selectedObject && TexturesMaterials && (
        <InfoPanel
          object={selectedObject}
          onClose={handleClosePanel}
          onColorChange={handleColorChange}
          onMaterialChange={handleMaterialChange}
          onWireframeToggle={handleWireframeToggle}
          onTransparentToggle={handleTransparentToggle}
          onOpacityChange={handleOpacityChange}
          onDepthTestToggle={handleDepthTestToggle}
          onDepthWriteToggle={handleDepthWriteToggle}
          onAlphaHashToggle={handleAlphaHashToggle}
          onSideChange={handleSideChange}
          onFlatShadingToggle={handleFlatShadingToggle}
          onVertexColorsToggle={handleVertexColorsToggle}
          onGeometryChange={handleGeometryChange}
          onSizeChange={handleSizeChange}
        />
      )}
      {!TexturesMaterials}
      {Light && (
        <LightControls
          lights={lights}
          updateLight={updateLight}
          setExpandedLightId={setExpandedLightId}
          expandedLightId={expandedLightId}
          addLight={addLight}
          deleteLight={deleteLight}
          resetLights={resetLights}
          toggleGlobalShadows={toggleGlobalShadows}
          globalShadows={globalShadows}
          globalExposure={globalExposure}
          updateGlobalExposure={updateGlobalExposure}
        />
      )}
      {!Lights}
    </>
  );
}

export default App;
