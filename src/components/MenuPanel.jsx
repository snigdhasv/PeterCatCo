import { useState, useRef } from 'react';
import { scenes } from './Experience';
import { slideAtom } from './Experience';
import { useAtom } from 'jotai';
import '../menu.css';
//import { useAtom } from 'jotai';

export const MenuPanel = () => {
  const [slide,setSlide] = useAtom(slideAtom);
  const [showDropdown, setShowDropdown] = useState(false);
  const fileInputRef = useRef(null);

  const getModelData = async () => {
    const currentScene = scenes[displaySlide];
    if (currentScene) {
      const modelUrl = currentScene.path;
      try {
        const response = await fetch(modelUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch model data');
        }
        return await response.arrayBuffer();
      } catch (error) {
        console.error('Error fetching model data:', error);
        return null;
      }
    } else {
      console.warn('No scene found to export.');
      return null;
    }
  };

  const handleImportDevice = (event) => {
    console.log('handling device import');
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const path = URL.createObjectURL(file);
        const name = file.name.replace(/\.glb$/i, '');
        const obj = {
          path: `${path}`,
          name: `${name}`
        };
        scenes.push(obj);
        setSlide(scenes.length - 1);
        alert("Model imported to the last step");
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleExportDevice = () => {
    const modelData = null;

    const blob = new Blob([modelData], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'model.glb';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExport = async () => {
    const modelData = await getModelData();
    if (modelData) {
      const modelName = prompt('Enter a name for the model:');
      if (modelName) {
        try {
          const modelRef = storageRef(storage, `${modelName}.glb`);
          const blob = new Blob([modelData], { type: 'application/octet-stream' });
          await uploadBytes(modelRef, blob);
          alert('Model uploaded successfully!');
        } catch (error) {
          console.error('Error uploading model:', error);
        }
      }
    } else {
      alert('No model data available to export!');
    }
  };

  return (
    <>
      <ul className="sidebar-menu">
        <li>
          <a href="#">
            <i className="ai-home"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="ai-image"></i>
            <span>Images</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="ai-file"></i>
            <span>Files</span>
          </a>
        </li>
        <li>
          <a href="#">
            
            <i className="ai-game-controller"></i>
            <span>Games</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="ai-book-open"></i>
            <span>Books</span>
          </a>
        </li>
        <li>
          <a onClick={() => setShowDropdown(!showDropdown)} href="#">
            <>
                <svg fill="#000000" width="800px" height="800px" viewBox="0 0 512 512" id="icons" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                <g id="SVGRepo_iconCarrier">
                <path id="icon" d="M93.19,329.38,140.64,25.31c1.64-10.37,15.55-12.82,20.46-3.55l51,95.45ZM432,400,385.26,123.21a11,11,0,0,0-18.54-6L80,400l159.36,91.91a33.18,33.18,0,0,0,31.91,0ZM302.36,158.93,265.82,89.39a10.86,10.86,0,0,0-19.36,0L85.83,375.74Z"/>
                </g>  
                </svg>
            </>
            <i className="ai-gear"></i>
            <span>Import from Firebase</span>
          </a>
        </li>
        <li>
          <a onClick={handleExport} href="#">
            <>
                <svg fill="#000000" width="800px" height="800px" viewBox="0 0 512 512" id="icons" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                <g id="SVGRepo_iconCarrier">
                <path id="icon" d="M93.19,329.38,140.64,25.31c1.64-10.37,15.55-12.82,20.46-3.55l51,95.45ZM432,400,385.26,123.21a11,11,0,0,0-18.54-6L80,400l159.36,91.91a33.18,33.18,0,0,0,31.91,0ZM302.36,158.93,265.82,89.39a10.86,10.86,0,0,0-19.36,0L85.83,375.74Z"/>
                </g>  
                </svg>
            </>
            <i className="ai-person"></i>
            <span>Export to Firebase</span>
          </a>
        </li>
        <li>
          <a onClick={() => fileInputRef.current.click()} href="#">
            <i className="ai-bell"></i>
            <span>Import from Device</span>
          </a>
          <input
            type="file"
            accept=".glb,.gltf"
            onChange={handleImportDevice}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
        </li>
        <li>
          <a onClick={handleExportDevice} href="#">
            <i className="ai-person"></i>
            <span>Export to Device</span>
          </a>
        </li>
      </ul>
    </>
  );
};
