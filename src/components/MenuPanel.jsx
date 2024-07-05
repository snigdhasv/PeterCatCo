import { useState, useRef } from 'react';
import { scenes } from './Experience';
import { slideAtom } from './Experience';
import { atom, useAtom } from 'jotai';
import { storage, database } from './Firebase';
import { ref as storageRef, uploadBytes } from 'firebase/storage';
import '../menu.css';
import { useHover } from './HoverHook';

export const animateAtom = atom(false);       //to set animation overlay

export const MenuPanel = () => {
  const [animate,setAnimate] = useAtom(animateAtom);
  const [slide, setSlide] = useAtom(slideAtom);
  const [hoverRef1, isHovered1] = useHover();
  const [hoverRef2, isHovered2] = useHover(); 
  const [showDropdown, setShowDropdown] = useState(false);
  const fileInputRef = useRef(null);

  const getModelData = async () => {
    const currentScene = scenes[slide];
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
    const modelData = scenes[slide] ? scenes[slide].path : null;

    if (modelData) {
      const blob = new Blob([modelData], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'model.glb';
      a.click();
      URL.revokeObjectURL(url);
    } else {
      alert('No model data available to export!');
    }
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
          <svg fill="#000000" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"/>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
          <g id="SVGRepo_iconCarrier"> <title>animation_line</title> <g id="b9dc111b-c0fc-4dae-9c72-b1a6d11e341d" data-name="Layer 3"> <path d="M10.16,31.71a4.4,4.4,0,0,1-4.64-1A4.34,4.34,0,0,1,4.23,27.6a4.41,4.41,0,0,1,.18-1.2,11.61,11.61,0,0,1-1-2.56,6.4,6.4,0,0,0,9.33,8.63A11.55,11.55,0,0,1,10.16,31.71Z"/> <path d="M18.41,27.68a7.61,7.61,0,0,1-9.08-1.26,7.58,7.58,0,0,1-1.27-9.06,14.26,14.26,0,0,1-.37-2.85,9.58,9.58,0,0,0,.22,13.33,9.63,9.63,0,0,0,13.35.22A14.46,14.46,0,0,1,18.41,27.68Z"/> <path d="M21.66,26.21a12.1,12.1,0,1,1,8.57-3.54h0A12.11,12.11,0,0,1,21.66,26.21ZM21.66,4A10.11,10.11,0,0,0,11.54,14.11a10,10,0,0,0,3,7.14,10.12,10.12,0,0,0,14.31,0A10.11,10.11,0,0,0,21.66,4Zm7.86,18h0Z"/> </g> </g>
          </svg>
          <span onClick={()=>setAnimate()}>Animation</span>
          </a>
        </li>
        <li>
          <a href="#">
            <svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 3v18h14V3H5zm6.5 2H17v8l-3.5-3.5L10 14V5zm-5 2h4v1.5H6.5V7z"/>
            </svg>
            <span>Images</span>
          </a>
        </li>
        <li>
          <a href="#">
            <svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 4v16h14V4H5zm2 2h10v12H7V6zm2 2v2h6V8H9zm0 4v2h6v-2H9z"/>
            </svg>
            <span>Files</span>
          </a>
        </li>
        <li>
          <a href="#">
            <svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 2v6h2V4.41l4.79 4.79 1.42-1.41L14.41 3H16V2h-5zM3 9v6h5.59L7 14.41 11.79 19H5v2h9v-1.41l-1.41-1.42L17 13.41 16.41 13 12 17.41V14H8.41L11 11.41 9.59 10H3zm16 4h2v5h-2z"/>
            </svg>
            <span>Games</span>
          </a>
        </li>
        <li>
          <a href="#">
            <svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 4v16H6V4h12m0-2H6c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h12c1.11 0 2-.89 2-2V4c0-1.11-.89-2-2-2zm-3 4H9v2h6V6zm0 4H9v2h6v-2zm0 4H9v2h6v-2z"/>
            </svg>
            <span>Books</span>
          </a>
        </li>
    {/* Firebase logo hover */}
        <li>
          <a onClick={() => setShowDropdown(!showDropdown)} href="#">
          <svg  viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"/>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
          <g id="SVGRepo_iconCarrier"> <path d="M2.5 11.5L11.5 3.5L12.5 12.5L7.5 14.5L2.5 11.5ZM2.5 11.5L7.5 2.5L9.5 5.5M2.5 11.5L3.5 0.5L6.5 3.5" stroke="#000000" stroke-linejoin="round"/> </g>
          </svg>
            <span ref={hoverRef1} >Firebase</span>
          </a>
          {isHovered1 && (                       //Dropdown menu when firebase title is hovered
            <ul className="dropdown-menu">
              <li>
                <span onClick={handleExport} href="#">
                  Export to Firebase
                </span>
              </li>
              <li>
                <span href="#" onClick={() => fileInputRef.current.click()}>
                  Import from Firebase
                </span>
                <input
                  type="file"
                  accept=".glb,.gltf"              //subject to change
                  onChange={handleImportDevice}
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                />
              </li>
            </ul>
          )}
        </li>
        {/* Local device handler menu */}
        <li>
          <a href="#">
          <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#000000">
          <g id="SVGRepo_bgCarrier" stroke-width="0"/>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
          <g id="SVGRepo_iconCarrier"> <title>device-multiple</title> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"/> </g> <g id="icons_Q2" data-name="icons Q2"> <g> <path d="M42,23V41H34V23h8m2-4H32a2,2,0,0,0-2,2V43a2,2,0,0,0,2,2H44a2,2,0,0,0,2-2V21a2,2,0,0,0-2-2Z"/> <path d="M38,7H7A2,2,0,0,0,5,9V31a2,2,0,0,0,2,2H26V29H9V11H36v4h4V9A2,2,0,0,0,38,7Z"/> <path d="M26,37v4H4a2,2,0,0,1,0-4Z"/> </g> </g> </g> </g>
          </svg>
            <span ref={hoverRef2}>Local Device</span>
            {isHovered2 && (                       //Dropdown menu when firebase title is hovered
            <ul className="dropdown-menu">
              <li>
                <span onClick={handleExport} href="#">
                  Export to Local Device
                </span>
              </li>
              <li>
                <span href="#" onClick={() => fileInputRef.current.click()}>
                  Import from Local Device
                </span>
                <input
                  type="file"
                  accept=".glb,.gltf"              //subject to change
                  onChange={handleImportDevice}
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                />
              </li>
            </ul>
          )}
          </a>
        </li>
      </ul>
    </>
  );
};


{/* <a onClick={() => fileInputRef.current.click()} href="#">
            <svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.9 11.1C20.5 7.8 17.4 5 14 5c-2.2 0-4.1 1.1-5.2 2.9C7.7 7.3 6.9 7 6 7 3.8 7 2 8.8 2 11s1.8 4 4 4h3v-2H6c-1.1 0-2-.9-2-2s.9-2 2-2c.8 0 1.5.5 1.8 1.2.3-.1.7-.2 1.2-.2H14c1.9 0 3.4 1.5 3.4 3.4 0 1.9-1.5 3.4-3.4 3.4-1.1 0-2.2-.5-2.9-1.3-.4.2-.9.3-1.4.3H10v2h1.4c.5 0 .9-.1 1.4-.3.8.7 1.8 1.1 2.9 1.1 3.3 0 6-2.7 6-6 0-.3 0-.7-.1-1z"/>
            </svg>
            <span>Import from Device</span>
          </a>
          <input
            type="file"
            accept=".glb,.gltf"
            onChange={handleImportDevice}
            style={{ display: 'none' }}
            ref={fileInputRef}
          /> */}
        
//onClick={() => setShowDropdown(!showDropdown)}    this is for firebase 

