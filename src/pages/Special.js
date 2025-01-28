import { ARCanvas, ARMarker } from "@artcom/react-three-arjs";
import React, { useRef, useEffect, useState } from "react";
import * as THREE from 'three';
import { createRoot } from "react-dom/client";
import { useThree, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

import { AnimationMixer } from 'three';




function Special() {
  const cameraRef = useRef();
  const rendererRef = useRef();
  const pointer = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  const meshRef0 = useRef();
 
  



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
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <mesh ref={meshRef0} position={[0, 0.5, 0]} scale={[0.5, 0.5, 0.5]}>
      {/* Box geometry to create a cube */}
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4CC3D9" />
    </mesh>
          </ARMarker>


    </ARCanvas>



    
    
  
  );
}

export default Special;