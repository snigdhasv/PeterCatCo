import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { scenesAtom, slideAtom } from './Experience';
import { storage } from './Firebase';
import CloudLoader from './CloudLoaderComponent';
import leftArrow from '../assets/left-arrow.svg';
import rightArrow from '../assets/right-arrow.svg';
import logo from '../assets/logo.svg';
import trash from '../assets/trash.svg'
import '../index.css';
import { animateAtom } from './MenuPanel';
import { ref as storageRef, uploadBytes } from 'firebase/storage';
import KeyframesContainer from './KeyframesContainer';

import playImage from '../assets/cssIcons/playButton.png';
import pauseImage from '../assets/cssIcons/pauseButton.png';
import loopActiveImage from '../assets/cssIcons/loopActive.png';
import loopInactiveImage from '../assets/cssIcons/loopInactive.png';

export const Overlay = () => {
  const [slide, setSlide] = useAtom(slideAtom);
  const [displaySlide, setDisplaySlide] = useState(slide);
  const [visible, setVisible] = useState(false);
  const [scenes, setScenes] = useAtom(scenesAtom);
  const [showDropdown, setShowDropdown] = useState(false);
  const [animate,setAnimate] = useAtom(animateAtom);


//These states are required for Keyframes Container 

  const [exportTrigger, setExportTrigger] = useState(null);
    const [importFile, setImportFile] = useState(null); 
    const [animationControl, setAnimationControl] = useState('pause');
    const [loop, setLoop] = useState(false);
    const [availableAnimations, setAvailableAnimations] = useState([]);
    const [selectedAnimations, setSelectedAnimations] = useState([]);
    const [customAnimations, setCustomAnimations] = useState({});
//end of keyframes container states


  useEffect(() => {
    setVisible(false);
    setTimeout(() => {
      setDisplaySlide(slide);
      setVisible(true);
    }, 200);
  }, [slide]);

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
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const path = URL.createObjectURL(file);
        const name = file.name.replace(/\.glb$/i, '');
        const obj = {
          path: `${path}`,
          name: `${name}`
        }
        scenes.push(obj);
        setSlide(scenes.length-1);
        alert("Model imported to the last step");
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const importModel = (file, onLoad) => {
    const reader = new FileReader();
    reader.onload = function (e) {
        const contents = e.target.result;
        const loader = new GLTFLoader();
        loader.parse(contents, '', function (gltf) {
            onLoad(gltf);
        });
    };
    reader.readAsArrayBuffer(file);
};


  const togglePlayPause = () => {
    setAnimationControl(prev => (prev === 'play' ? 'pause' : 'play'));
    console.log('Animation control:', animationControl);
     };
                                
    const handleAnimationSelect = (animationName) => {
    setSelectedAnimations(prev => {
    if (prev.includes(animationName)) {
    return prev.filter(name => name !== animationName);
    } else {
    return [...prev, animationName];
    }
        });
    console.log('Selected animations:', selectedAnimations);
     };
                                
     const handleAddNewAnimation = (newAnimation) => {
    setAvailableAnimations(prev => [...prev, newAnimation.name]);
      setCustomAnimations(prev => ({
    ...prev,
     [newAnimation.name]: newAnimation
    }));
    console.log('New animation added:', newAnimation);
     };

  const handleDelete = (index) => {
    if (scenes.length > 1) {
      const confirmDeletion = window.confirm("Are you sure you want to delete this model?");
      if (confirmDeletion) {
        scenes.splice(index, 1);
        setSlide((prev) => (prev < scenes.length - 1 ? prev + 1 : 0));
      }
    } else {
      alert("Cannot delete the last remaining model.");
    }
  };

  const handlePageChange = (pageNumber) => {
    setSlide(pageNumber);
  };
  

  return (
    
    <div className={`overlay ${visible ? 'visible' : 'invisible'}`}>
      <>
      {animate&&<KeyframesContainer
                    handleImport={handleImportDevice}
                    exportTrigger={exportTrigger}
                    togglePlayPause={togglePlayPause}
                    animationControl={animationControl}
                    playImage={playImage}
                    pauseImage={pauseImage}
                    loop={loop}
                    setLoop={setLoop}
                    loopActiveImage={loopActiveImage}
                    loopInactiveImage={loopInactiveImage}
                    availableAnimations={availableAnimations}
                    selectedAnimations={selectedAnimations}
                    handleAnimationSelect={handleAnimationSelect}
                    onAddNewAnimation={handleAddNewAnimation}
                />}
        {!animate}
        <div className="nav">
          <div className="arrows">
          <img
            src={leftArrow}
            alt="Previous Slide"
            className="nav-button"
            onClick={() => setSlide((prev) => (prev > 0 ? prev - 1 : scenes.length - 1))}
          />
          <img
            src={rightArrow}
            alt="Next Slide"
            className="nav-button"
            onClick={() => setSlide((prev) => (prev < scenes.length - 1 ? prev + 1 : 0))}
          />
          </div>
          <img
            src = {trash}
            alt="delete"
            className="delete"
            onClick={()=> handleDelete(slide)}
          />
        </div>
        <div className="content">
          <h1 className="title">{scenes[slide].name}</h1>
          <div className="pages">
            {scenes.map((scene, index) => (
              <button
                key={index}
                className={`pages-button ${slide === index ? 'active' : ''}`}
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </button>
            ))} 
          </div>
        </div>
        
      </>
    </div>
  );
};