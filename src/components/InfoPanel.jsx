import React, { useState, useEffect } from 'react';
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
  const [color, setColor] = useState('#ffffff');
  const [material, setMaterial] = useState('MeshBasicMaterial');
  const [geometry, setGeometry] = useState('BoxGeometry');
  const [size, setSize] = useState(1);
  const [side, setSide] = useState(THREE.FrontSide);
  const [opacity, setOpacity] = useState(1);
  const [isTransparent, setIsTransparent] = useState(false);

  useEffect(() => {
    if (object) {
      setColor(`#${object.material.color.getHexString()}`);
      setMaterial(object.material.type);
      setGeometry(object.geometry.type);
      setSize(object.scale.x);
      setSide(object.material.side);
      setOpacity(object.material.opacity);
      setIsTransparent(object.material.transparent);
    }
  }, [object]);

  if (!object) return null;

  return (
    <div className="info-panel">
      <div className="info-header">
        <h2>Info Panel</h2>
        <button className="close-button" onClick={onClose}>X</button>
      </div>
      <p><strong>Name:</strong> {object.name ? object.name : 'Unnamed'}</p>
      <div>
        <label>Color:</label>
        <input type="color" value={color} onChange={(e) => {
          setColor(e.target.value);
          onColorChange(object, e.target.value);
        }} />
      </div>
      <div>
        <label>Material:</label>
        <select value={material} onChange={(e) => {
          setMaterial(e.target.value);
          onMaterialChange(object, e.target.value);
        }}>
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
        <label>Wireframe:</label>
        <button onClick={() => onWireframeToggle(object)}>
          Toggle Wireframe
        </button>
      </div>
      <div>
      <label>Transparent:</label>
        <button onClick={() => {
          onTransparentToggle(object);
          setIsTransparent(!isTransparent); // Update transparency toggle state
        }}>
          {isTransparent ? 'Disable Transparency' : 'Enable Transparency'}
        </button>
      </div>
      {isTransparent && ( // Conditionally render opacity controls when transparency is enabled
        <div>
          <label>Opacity:</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={opacity}
            onChange={(e) => {
              setOpacity(e.target.value);
              onOpacityChange(object, e.target.value);
            }}
          />
        </div>
      )}
      <div>
        <label>Depth Test:</label>
        <button onClick={() => onDepthTestToggle(object)}>
          Toggle Depth Test
        </button>
      </div>
      <div>
        <label>Depth Write:</label>
        <button onClick={() => onDepthWriteToggle(object)}>
          Toggle Depth Write
        </button>
      </div>
      <div>
        <label>Alpha Hash:</label>
        <button onClick={() => onAlphaHashToggle(object)}>
          Toggle Alpha Hash
        </button>
      </div>
      <div>
        <label>Side:</label>
        <select value={side} onChange={(e) => {
          setSide(e.target.value);
          onSideChange(object, e.target.value);
        }}>
          <option value={THREE.FrontSide}>Front</option>
          <option value={THREE.BackSide}>Back</option>
          <option value={THREE.DoubleSide}>Double</option>
        </select>
      </div>
      <div>
        <label>Flat Shading:</label>
        <button onClick={() => onFlatShadingToggle(object)}>
          Toggle Flat Shading
        </button>
      </div>
      <div>
        <label>Vertex Colors:</label>
        <button onClick={() => onVertexColorsToggle(object)}>
          Toggle Vertex Colors
        </button>
      </div>
      <div>
        <label>Geometry:</label>
        <select value={geometry} onChange={(e) => {
          setGeometry(e.target.value);
          onGeometryChange(object, e.target.value);
        }}>
          <option value="BoxGeometry">Box</option>
          <option value="SphereGeometry">Sphere</option>
          <option value="CylinderGeometry">Cylinder</option>
          <option value="ConeGeometry">Cone</option>
          <option value="TorusGeometry">Torus</option>
        </select>
      </div>
      <div>
        <label>Size:</label>
        <input type="number" value={size} onChange={(e) => {
          setSize(e.target.value);
          onSizeChange(object, e.target.value);
        }} />
      </div>
      <div>
        <button onClick={onExport}>Export</button>
      </div>
    </div>
  );
}

export default InfoPanel;
