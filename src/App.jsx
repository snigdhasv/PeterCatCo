//App.jsx
import React, { useState, useRef, useEffect} from 'react';
import { OrbitControls, Stats } from '@react-three/drei';
import { Environment } from '@react-three/drei';
import { useAtom } from "jotai";
import { saveAs } from 'file-saver';
import * as THREE from'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience, scenes } from "./components/Experience";
import { Overlay, slideAtom } from "./components/Overlay";
import { Scene } from './components/Scene';
import InfoPanel from './components/InfoPanel';

function App() {
  const [slide] = useAtom(slideAtom);
  const [selectedObject, setSelectedObject] = useState(null);
  const [selectedObjectState, setSelectedObjectState] = useState(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false); 
  const sceneRef = useRef();
  const canvasRef =useRef();
  const selectedObjectRef = useRef(null);
  const [highlightedMesh, setHighlightedMesh] = useState(null);

  useEffect(() => {
    if (selectedObject && selectedObject.material) {
      selectedObjectRef.current = selectedObject;
    }
  }, [selectedObject]);

  const handleObjectClick = (mesh) => {
    setSelectedObject(mesh);
    setSelectedObjectState(mesh.uuid);
    setShowInfoPanel(true); 
  };

  const handleObjectHover = (mesh) => {
    if (mesh && mesh !== highlightedMesh) {
      if (highlightedMesh) {
        highlightedMesh.material.color.copy(highlightedMesh.originalColor);
      }
      mesh.originalColor = mesh.material.color.clone();
      const darkerColor = mesh.originalColor.clone().multiplyScalar(0.8);
      mesh.material.color.copy(darkerColor);
      setHighlightedMesh(mesh);
    } else if (!mesh && highlightedMesh) {
      highlightedMesh.material.color.copy(highlightedMesh.originalColor);
      setHighlightedMesh(null);
    }
  };

  const updateSelectedObject = () => {
    setSelectedObjectState((prev) => prev + 1);
  };

  const handleColorChange = (object, color) => {
    const newMaterial = object.material.clone();
    newMaterial.color.set(color);
    object.material = newMaterial;
    updateSelectedObject();
  };

  const handleMaterialChange = (object, newMaterialType) => {
    let newMaterial;
    switch (newMaterialType) {
      case 'MeshBasicMaterial':
        newMaterial = new THREE.MeshBasicMaterial({ color: object.material.color });
        break;
      case 'MeshLambertMaterial':
        newMaterial = new THREE.MeshLambertMaterial({ color: object.material.color });
        break;
      case 'MeshPhongMaterial':
        newMaterial = new THREE.MeshPhongMaterial({ color: object.material.color });
        break;
      case 'MeshStandardMaterial':
        newMaterial = new THREE.MeshStandardMaterial({ color: object.material.color });
        break;
      case 'MeshNormalMaterial':
        newMaterial = new THREE.MeshNormalMaterial({ color: object.material.color });
        break;
      case 'MeshPhysicalMaterial':
        newMaterial = new THREE.MeshPhysicalMaterial({ color: object.material.color });
        break;
      case 'MeshToonMaterial':
        newMaterial = new THREE.MeshToonMaterial({ color: object.material.color });
        break;
      case 'MeshMatcapMaterial':
        newMaterial = new THREE.MeshMatcapMaterial({ color: object.material.color });
        break;
      default:
        newMaterial = new THREE.MeshBasicMaterial({ color: object.material.color });
    }
    object.material = newMaterial;
    updateSelectedObject();
  };

  const handleWireframeToggle = (object) => {
    const newMaterial = object.material.clone();
    newMaterial.wireframe = !newMaterial.wireframe;
    object.material = newMaterial;
    updateSelectedObject();
  };

  const handleTransparentToggle = (object) => {
    const newMaterial = object.material.clone();
    newMaterial.transparent = !newMaterial.transparent;
    object.material = newMaterial;
    updateSelectedObject();
  };

  const handleOpacityChange = (object, value) => {
    const newMaterial = object.material.clone();
    newMaterial.opacity = value;
    object.material = newMaterial;
    updateSelectedObject();
  };

  const handleDepthTestToggle = (object) => {
    const newMaterial = object.material.clone();
    newMaterial.depthTest = !newMaterial.depthTest;
    object.material = newMaterial;
    updateSelectedObject();
  };

  const handleDepthWriteToggle = (object) => {
    const newMaterial = object.material.clone();
    newMaterial.depthWrite = !newMaterial.depthWrite;
    object.material = newMaterial;
    updateSelectedObject();
  };

  const handleAlphaHashToggle = (object) => {
    const newMaterial = object.material.clone();
    newMaterial.alphaHash = !newMaterial.alphaHash;
    object.material = newMaterial;
    updateSelectedObject();
  };

  const handleSideChange = (object, value) => {
    const newMaterial = object.material.clone();
    newMaterial.side = value;
    object.material = newMaterial;
    updateSelectedObject();
  };

  const handleFlatShadingToggle = (object) => {
    const newMaterial = object.material.clone();
    newMaterial.flatShading = !newMaterial.flatShading;
    newMaterial.needsUpdate = true;
    object.material = newMaterial;
    updateSelectedObject();
  };

  const handleVertexColorsToggle = (object) => {
    const newMaterial = object.material.clone();
    newMaterial.vertexColors = newMaterial.vertexColors === THREE.NoColors ? THREE.VertexColors : THREE.NoColors;
    newMaterial.needsUpdate = true;
    object.material = newMaterial;
    updateSelectedObject();
  };

  const handleGeometryChange = (object, newGeometryType) => {
    let newGeometry;
    switch (newGeometryType) {
      case 'ConeGeometry':
        newGeometry = new THREE.ConeGeometry(1, 1, 32);
        break;
      case 'BoxGeometry':
        newGeometry = new THREE.BoxGeometry(1, 1, 1);
        break;
      case 'SphereGeometry':
        newGeometry = new THREE.SphereGeometry(1, 32, 32);
        break;
      default:
        newGeometry = new THREE.BoxGeometry(1, 1, 1);
    }
    object.geometry = newGeometry;
    updateSelectedObject();
  };

  const handleSizeChange = (object, size) => {
    object.scale.set(size, size, size);
    updateSelectedObject();
  };
  const handleCloseInfoPanel = () => {
    setShowInfoPanel(false);
    setSelectedObject(null);
  };

  const handleExport = () => {
    console.log('Scene for export:', canvasRef.current);
    const exporter = new GLTFExporter();

    const options = {
      binary: true,
      trs: false,
      onlyVisible: true,
      truncateDrawRange: true,
      embedImages: true
    };

    try {
      exporter.parse(
        canvasRef.current,
        (result) => {
          const output = options.binary ? result : JSON.stringify(result, null, 2);
          const blob = new Blob([output], { type: options.binary ? 'application/octet-stream' : 'application/json' });
          saveAs(blob, 'scene.glb');
        },
        (error) => {
          console.error('An error occurred during parsing', error);
          console.log('Scene for export:', canvasRef.current);
        },
        options
      );
    } catch (error) {
      console.error('An unexpected error occurred during export:', error);
      console.error('An unexpected error occurred during export:', error);
    }
  };

  return (
    <>
    <Leva hidden/>
      <Overlay />
      <Canvas ref={canvasRef} gl={{ logarithmicDepthBuffer: true, antialias: false }} dpr={[1, 1.5]} camera={{ position: [0, 0, 15], fov: 25 }}>
        <color attach="background" args={["#ececec"]} />
        <ambientLight intensity={0.2} />
        <Environment preset={"city"} />
        <Scene
        ref={sceneRef}
        onObjectClick={handleObjectClick}
        onObjectHover={handleObjectHover}
        highlightedMesh={highlightedMesh} 
        {...scenes[slide]}/>
      </Canvas>
      {showInfoPanel && (
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