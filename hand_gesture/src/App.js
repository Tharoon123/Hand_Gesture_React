import logo from './logo.svg';
import './App.css';
import React,{useEffect, useRef} from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import * as facemesh from '@tensorflow-models/facemesh';
import Webcam from 'react-webcam';
import { drawHand } from './Utilities';
import { drawMesh } from './Utilities2';

function App() {

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  //-------------------------------------------Face Detection -------------------------
  /*//  Load posenet
  const runFacemesh = async () => {
    // OLD MODEL
     const net = await facemesh.load({
       inputResolution: { width: 800, height: 600 },
       scale: 0.8,
     });
     setInterval(()=>{
      detectFace(net)
    },100)
    
  };

  const detectFace = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      // OLD MODEL
      const face = await net.estimateFaces(video);
      console.log(face);

      // Get canvas context
      const ctx = canvasRef.current.getContext("2d");
      requestAnimationFrame(()=>{drawMesh(face, ctx)});
    }
  };

  useEffect(()=>{runFacemesh()}, []);
  */


  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded.");
    setInterval(() => {
      detectHand(net);
    }, 100);
  }

  const detectHand = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video);
      console.log(hand);

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };


  runHandpose();

  return (
    <div className="App">
      <header className="App-header">
      <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
