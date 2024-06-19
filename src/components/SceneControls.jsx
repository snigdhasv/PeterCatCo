import * as THREE from 'three';

const useSceneControls = (updateSelectedObject) => {
    
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

  // Similar handlers for other controls...
  
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

  return {
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
  };
};

export default useSceneControls;
