import React from 'react';
import * as THREE from 'three';

function InfoPanel({
  object,
  onClose,
  onColorChange,
  onMaterialChange,
  onWireframeToggle,
  onTransparentToggle,
  onOpacityChange,
  onDepthTestToggle,
  onDepthWriteToggle,
  onAlphaHashToggle,
  onSideChange,
  onFlatShadingToggle,
  onVertexColorsToggle,
  onGeometryChange,
  onSizeChange,
  onExport,
}) {
  if (!object) return null;

  const { geometry, material, name } = object;

  const handleColorChange = (e) => {
    const colorValue = e.target.value;
    onColorChange(object, colorValue);
  };

  const handleMaterialChange = (e) => {
    const materialType = e.target.value;
    onMaterialChange(object, materialType);
  };

  const handleGeometryChange = (e) => {
    const geometryType = e.target.value;
    onGeometryChange(object, geometryType);
  };

  const handleSizeChange = (e) => {
    const sizeValue = parseFloat(e.target.value);
    onSizeChange(object, sizeValue);
  };

  const handleSideChange = (e) => {
    const sideValue = parseInt(e.target.value);
    onSideChange(object, sideValue);
  };

  return (
    <div className="info-panel">
      <div className="info-header">
        <h2>Info Panel</h2>
        <button className="close-button" onClick={onClose}>
          X
        </button>
      </div>
      <p><strong>Name:</strong> {name ? name : 'Unnamed'}</p>
      <div>
        <label>Color:</label>
        <input
          type="color"
          value={material && material.color ? `#${material.color.getHexString()}` : '#ffffff'}
          onChange={handleColorChange}
        />
      </div>
      <div>
        <label>Material:</label>
        <select value={material ? material.type : ''} onChange={handleMaterialChange}>
          <option value="MeshBasicMaterial">Basic</option>
          <option value="MeshLambertMaterial">Lambert</option>
          <option value="MeshPhongMaterial">Phong</option>
          <option value="MeshStandardMaterial">Standard</option>
          <option value="MeshNormalMaterial">Normal</option>
          <option value="MeshPhysicalMaterial">Physical</option>
          <option value="MeshToonMaterial">Toon</option>
          <option value="MeshMatcapMaterial">Matcap</option>
        </select>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={material ? material.wireframe : false}
            onChange={() => onWireframeToggle(object)}
          />
          Wireframe
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={material ? material.transparent : false}
            onChange={() => onTransparentToggle(object)}
          />
          Transparent
        </label>
      </div>
      {material && material.transparent && (
        <div>
          <label>Opacity:</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={material.opacity}
            onChange={(e) => onOpacityChange(object, parseFloat(e.target.value))}
          />
        </div>
      )}
      <div>
        <label>
          <input
            type="checkbox"
            checked={material ? material.depthTest : false}
            onChange={() => onDepthTestToggle(object)}
          />
          Depth Test
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={material ? material.depthWrite : false}
            onChange={() => onDepthWriteToggle(object)}
          />
          Depth Write
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={material ? material.alphaHash : false}
            onChange={() => onAlphaHashToggle(object)}
          />
          Alpha Hash
        </label>
      </div>
      <div>
        <label>Side:</label>
        <select value={material ? material.side : THREE.FrontSide} onChange={handleSideChange}>
          <option value={THREE.FrontSide}>Front Side</option>
          <option value={THREE.BackSide}>Back Side</option>
          <option value={THREE.DoubleSide}>Double Side</option>
        </select>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={material ? material.flatShading : false}
            onChange={() => onFlatShadingToggle(object)}
          />
          Flat Shading
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={material ? material.vertexColors !== THREE.NoColors : false}
            onChange={() => onVertexColorsToggle(object)}
          />
          Vertex Colors
        </label>
      </div>
      <div>
        <label>Geometry:</label>
        <select value={geometry ? geometry.type : ''} onChange={handleGeometryChange}>
          <option value="ConeGeometry">Cone</option>
          <option value="BoxGeometry">Box</option>
          <option value="SphereGeometry">Sphere</option>
        </select>
      </div>
      <div>
        <label>Size:</label>
        <input
          type="number"
          step="0.1"
          value={object.scale.x || 1}
          onChange={handleSizeChange}
        />
      </div>
      <div>
        <button onClick={onExport}>Export</button>
      </div>
    </div>
  );
}

export default InfoPanel;
