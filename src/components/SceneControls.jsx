import * as THREE from 'three';

const useSceneControls = (setSelectedObject) => {
  const updateMaterial = (object, updater) => {
    const newMaterial = object.material.clone();
    updater(newMaterial);
    object.material = newMaterial;
    setSelectedObject({ ...object });
  };

  const handleColorChange = (object, color) => {
    updateMaterial(object, (material) => material.color.set(color));
  };

  const handleMaterialChange = (object, materialType) => {
    const oldMaterial = object.material;
    // Create a new material of the specified type
    const newMaterial = new THREE[materialType]();
    // Copy essential properties from the old material
    newMaterial.color = oldMaterial.color.clone();
    newMaterial.transparent = oldMaterial.transparent;
    newMaterial.opacity = oldMaterial.opacity;
    newMaterial.wireframe = oldMaterial.wireframe;
    // Dispose of the old material
    oldMaterial.dispose();
  
    // Assign the new material to the object
    object.material = newMaterial;
  
    // Update the state to reflect the changes
    setSelectedObject({ ...object });
  };
  

  const handleWireframeToggle = (object) => {
    updateMaterial(object, (material) => material.wireframe = !material.wireframe);
  };

  const handleTransparentToggle = (object) => {
    updateMaterial(object, (material) => material.transparent = !material.transparent);
  };

  const handleOpacityChange = (object, opacity) => {
    updateMaterial(object, (material) => {
      material.opacity = parseFloat(opacity); // Ensure the opacity is a number
    });
  };  

  const handleDepthTestToggle = (object) => {
    updateMaterial(object, (material) => material.depthTest = !material.depthTest);
  };

  const handleDepthWriteToggle = (object) => {
    updateMaterial(object, (material) => material.depthWrite = !material.depthWrite);
  };

  const handleAlphaHashToggle = (object) => {
    updateMaterial(object, (material) => material.alphaHash = !material.alphaHash);
  };

  const handleSideChange = (object, side) => {
    updateMaterial(object, (material) => material.side = side);
  };

  const handleFlatShadingToggle = (object) => {
    updateMaterial(object, (material) => material.flatShading = !material.flatShading);
  };

  const handleVertexColorsToggle = (object) => {
    updateMaterial(object, (material) => material.vertexColors = material.vertexColors === THREE.NoColors ? THREE.VertexColors : THREE.NoColors);
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
