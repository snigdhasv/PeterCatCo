import { useState, useEffect, useRef } from 'react';

const useObjectControls = (setSelectedObject, setShowInfoPanel) => {
  const [highlightedMesh, setHighlightedMesh] = useState(null);
  const selectedObjectRef = useRef();

  useEffect(() => {
    if (selectedObjectRef.current && selectedObjectRef.current.material) {
      setShowInfoPanel(true);
    }
  }, [selectedObjectRef.current, setShowInfoPanel]);

  const handleObjectClick = (mesh) => {
    setSelectedObject(mesh);
    selectedObjectRef.current = mesh;
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

  return { handleObjectClick, handleObjectHover, highlightedMesh };
};

export default useObjectControls;
