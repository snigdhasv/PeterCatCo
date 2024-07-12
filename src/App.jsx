import React, { useState, useRef } from 'react';
import { Scene } from './components/Scene';
import { Canvas } from '@react-three/fiber';
import { Leva } from 'leva';
import { useAtom } from 'jotai';
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

  const handleCloseInfoPanel = () => {
    setShowInfoPanel(false);
    setSelectedObject(null);
  };

  return (
    <>
      <Leva hidden />
      <Overlay />
      <Canvas
        shadows
        gl={{ logarithmicDepthBuffer: true, antialias: false }}
        dpr={[1, 1.5]}
      >
        <Experience />
        <Scene
          ref={sceneRef}
          onObjectClick={handleObjectClick} // Ensure this is passed correctly
          onObjectHover={handleObjectHover} // Ensure this is passed correctly
          highlightedMesh={highlightedMesh}
          {...scenes[slide]}
        />
        <Lights lights={lights} globalExposure={globalExposure} />
      </Canvas>
      <MenuPanel/>
      {selectedObject && TexturesMaterials && (
        <InfoPanel
          object={selectedObject}
          onClose={handleCloseInfoPanel}
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
          setExpandedLightId={setExpandedLightId} // Correctly pass this prop
          expandedLightId={expandedLightId} // Ensure this prop is also passed
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
