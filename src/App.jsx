// App.jsx
import React, { useState, useRef } from 'react';
import { useAtom } from "jotai";
import { Leva } from "leva";
import { Overlay, slideAtom } from "./components/Overlay";
import InfoPanel from './components/InfoPanel';
import CanvasComponent from './components/CanvasComponent';
import useObjectControls from './components/ObjectControls';
import useSceneControls from './components/SceneControls';
import useExportControls from './components/ExportControls';
import { scenes } from './components/Experience';
import { Scene } from './components/Scene';

function App() {
  const [slide] = useAtom(slideAtom);
  const [selectedObject, setSelectedObject] = useState(null);
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const sceneRef = useRef();
  const canvasRef = useRef();
  const { handleObjectClick, handleObjectHover, highlightedMesh } = useObjectControls(setSelectedObject, setShowInfoPanel);

  const { handleExport } = useExportControls(canvasRef);
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
  } = useSceneControls(() => setSelectedObject((prev) => prev + 1));

  

  const handleCloseInfoPanel = () => {
    setShowInfoPanel(false);
    setSelectedObject(null);
    console.log("closed");
  };

  return (
    <>
      <Leva hidden />
      <Overlay />
      <CanvasComponent ref={canvasRef} sceneRef={sceneRef} onObjectClick={handleObjectClick} onObjectHover={handleObjectHover} highlightedMesh={highlightedMesh}>
        <Scene
          ref={sceneRef}
          onObjectClick={handleObjectClick}
          onObjectHover={handleObjectHover}
          highlightedMesh={highlightedMesh}
          {...scenes[slide]}
        />
      </CanvasComponent>
      {selectedObject && (
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
          onExport={handleExport}
        />
      )}
    </>
  );
}

export default App;
