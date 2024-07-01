import * as THREE from 'three';

const useSceneControls = (setSelectedObject) => {
  const handleColorChange = (object, color) => {
    const newMaterial = object.material.clone();
    newMaterial.color.set(color);
    object.material = newMaterial;
    setSelectedObject({ ...object });
  };

  const handleMaterialChange = (object, materialType) => {
    const newMaterial = new THREE[materialType]();
    Object.assign(newMaterial, object.material);
    object.material = newMaterial;
    setSelectedObject({ ...object });
  };

  const handleWireframeToggle = (object) => {
    const newMaterial = object.material.clone();
    newMaterial.wireframe = !newMaterial.wireframe;
    object.material = newMaterial;
    setSelectedObject({ ...object });
  };

  const handleTransparentToggle = (object) => {
    const newMaterial = object.material.clone();
    newMaterial.transparent = !newMaterial.transparent;
    object.material = newMaterial;
    setSelectedObject({ ...object });
  };

  const handleOpacityChange = (object, opacity) => {
    const newMaterial = object.material.clone();
    newMaterial.opacity = opacity;
    object.material = newMaterial;
    setSelectedObject({ ...object });
  };

  const handleDepthTestToggle = (object) => {
    const newMaterial = object.material.clone();
    newMaterial.depthTest = !newMaterial.depthTest;
    object.material = newMaterial;
    setSelectedObject({ ...object });
  };

  const handleDepthWriteToggle = (object) => {
    const newMaterial = object.material.clone();
    newMaterial.depthWrite = !newMaterial.depthWrite;
    object.material = newMaterial;
    setSelectedObject({ ...object });
  };

  const handleAlphaHashToggle = (object) => {
    const newMaterial = object.material.clone();
    newMaterial.alphaHash = !newMaterial.alphaHash;
    object.material = newMaterial;
    setSelectedObject({ ...object });
  };

  const handleSideChange = (object, side) => {
    const newMaterial = object.material.clone();
    newMaterial.side = side;
    object.material = newMaterial;
    setSelectedObject({ ...object });
  };

  const handleFlatShadingToggle = (object) => {
    const newMaterial = object.material.clone();
    newMaterial.flatShading = !newMaterial.flatShading;
    object.material = newMaterial;
    setSelectedObject({ ...object });
  };

  const handleVertexColorsToggle = (object) => {
    const newMaterial = object.material.clone();
    newMaterial.vertexColors = newMaterial.vertexColors === THREE.NoColors ? THREE.VertexColors : THREE.NoColors;
    object.material = newMaterial;
    setSelectedObject({ ...object });
  };

  const handleGeometryChange = (object, geometryType) => {
    const newGeometry = new THREE[geometryType]();
    object.geometry = newGeometry;
    setSelectedObject({ ...object });
  };

  const handleSizeChange = (object, size) => {
    object.scale.set(size, size, size);
    setSelectedObject({ ...object });
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
