import { ARCanvas, ARMarker } from "@artcom/react-three-arjs";
import React, { useRef, useEffect, useState } from "react";
import * as THREE from 'three';
import { createRoot } from "react-dom/client";
import { useThree, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

import { AnimationMixer } from 'three';
import {create} from 'zustand';
import heart from '../3dmodels/heart_compressed.glb'




function Special() {
  const cameraRef = useRef();
  const rendererRef = useRef();
  const pointer = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  const meshRef0 = useRef();
 
  function Model({ meshReference, name, url, scale, position, rotation }) {
    const { scene, animations } = useGLTF(url);
    const mixer = useRef();
  
    useEffect(() => {
      if (scene) {
        scene.traverse((child) => {
          if (child.isMesh) {
            child.name = name; // Assign your custom name to the mesh
          }
        });
  
        // Initialize the mixer with the loaded animations
        if (animations && animations.length) {
          mixer.current = new AnimationMixer(scene);
          animations.forEach((clip) => {
            const action = mixer.current.clipAction(clip);
            action.play(); // Play all animations
          });
        }
      }
  
      return () => {
        // Clean up on unmount
        if (mixer.current) {
          mixer.current.stopAllAction();
        }
      };
    }, [scene, animations, name]);
  
    useFrame((state) => {
      // Update the mixer on every frame
      if (mixer.current) {
        const delta = state.clock.getDelta();
        mixer.current.update(delta);
      }
    });
  
    return (
      <mesh ref={meshReference} name={name} rotation={rotation} position={position}>
        <primitive object={scene} scale={scale} />
      </mesh>
    );
  }



  return (
   
        <ARCanvas
      gl={{ antialias: false, powerPreference: "default", physicallyCorrectLights: true }}
      onCameraStreamReady={() => console.log("Camera stream ready")}
      onCameraStreamError={() => console.error("Camera stream error")}
      onCreated={({ gl, camera }) => {
        gl.setSize(window.innerWidth, window.innerHeight);
        cameraRef.current = camera;
        rendererRef.current = gl;
      }}
    >
   

     


           <ARMarker
        params={{ smooth: true }}
        type={"barcode"}
        barcodeValue={0}
        matrixCodeType="3x3"
        onMarkerFound={() => {
          //console.log("Marker Found");
        }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={10} />
        

    <Model  url={heart} scale={0.25} position={[0, 0, 0]}/>

          </ARMarker>


    </ARCanvas>



    
    
  
  );
}

export default Special;