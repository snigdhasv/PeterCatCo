import React, { useState, useRef } from 'react';
import { Scene } from './components/Scene';
import { Canvas } from '@react-three/fiber';
import { Leva } from 'leva';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
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
