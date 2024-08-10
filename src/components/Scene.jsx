import {
    Environment,
    Lightformer,
    OrbitControls,
    PerspectiveCamera,
    ContactShadows,
    MeshReflectorMaterial,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader, useThree } from "@react-three/fiber";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import React, { forwardRef, useEffect } from "react";
import { Effects } from "./Effect";
import * as THREE from 'three';

export const Scene = forwardRef(({ onObjectClick, onObjectHover, path, ...props }, ref) => {
    const { gl, scene: threeScene } = useThree();
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;

    const { scene } = useLoader(GLTFLoader, path, (loader) => {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
        loader.setDRACOLoader(dracoLoader);
    });

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }, [scene]);

    useEffect(() => {
        if (ref) {
          ref.current = scene; // Assign scene to ref.current
        }
      }, [ref, scene]);

    const handlePointerUp = (e) => {
        e.stopPropagation();
        if (onObjectClick) {
            onObjectClick(e.object);
        }
    };

    const handlePointerOver = (e) => {
        e.stopPropagation();
        if (onObjectHover) {
            onObjectHover(e.object);
        }
    };

    const handlePointerOut = () => {
        if (onObjectHover) {
            onObjectHover(null);
        }
    };

    const ratioScale = Math.min(1.2, Math.max(0.5, window.innerWidth / 1920));

    return (
        <>
            <group {...props} dispose={null}>
                {/* <PerspectiveCamera makeDefault position={[0, 0, 12]} near={0.5} /> */}
                <primitive object={scene} scale={1.5 * ratioScale} rotation={[0, Math.PI / 1.5, 0]}
                    onPointerUp={handlePointerUp} 
                    onPointerOver={handlePointerOver}
                    onPointerOut={handlePointerOut}
                />
                
                
                {/* <Effects /> */}
                <OrbitControls enablePan={false} enableZoom={true} maxPolarAngle={Math.PI / 2.2} minDistance={5} maxDistance={50} />
            </group>
        </>
    );
});
