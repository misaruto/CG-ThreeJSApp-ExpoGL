import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer, TextureLoader } from 'expo-three';
import React, { useEffect, useState } from 'react';
import {
  AmbientLight,
  BoxBufferGeometry,
  CircleBufferGeometry,
  Fog,
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SpotLight,
} from 'three';
export interface CubeCameraCoordinatesProps {
  cameraPositionX: number;
  cameraPositionY: number;
  cameraPositionZ: number;
}

export interface CubeProps {
  CameraCoordinates: CubeCameraCoordinatesProps;
}
const Cube: React.FC<CubeProps> = ({ CameraCoordinates }) => {
  let timeout: number;

  React.useEffect(() => {
    // Clear the animation loop when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  return (
    <GLView
      style={{ flex: 1 }}
      onContextCreate={async (gl: ExpoWebGLRenderingContext) => {
        const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
        const sceneColor = 0x000000;

        // Create a WebGLRenderer without a DOM element
        const renderer = new Renderer({ gl });
        renderer.setSize(width, height);
        renderer.setClearColor(sceneColor);

        const camera = new PerspectiveCamera(70, width / height, 0.01, 1000);
        camera.position.set(2, 5, 5);

        const scene = new Scene();
        scene.fog = new Fog(sceneColor, 1, 10000);

        const ambientLight = new AmbientLight(0x101010);
        scene.add(ambientLight);

        const pointLight = new PointLight(0xffffff, 2, 1000, 1);
        pointLight.position.set(0, 200, 200);
        scene.add(pointLight);

        const spotLight = new SpotLight(0xffffff, 0.5);
        spotLight.position.set(0, 500, 100);
        spotLight.lookAt(scene.position);
        scene.add(spotLight);

        const cube = new CubeMesh();
        scene.add(cube);

        camera.lookAt(cube.position);

        function update() {
          cube.rotation.y += 0.01;
          cube.rotation.x += 0.02;
        }

        // Setup an animation loop
        const render = () => {
          timeout = requestAnimationFrame(render);
          update();
          renderer.render(scene, camera);
          gl.endFrameEXP();
        };
        render();
      }}
    />
  );
};

class CubeMesh extends Mesh {
  constructor() {
    super(
      new BoxBufferGeometry(1.0, 1.0, 1.0),
      new MeshStandardMaterial({
        map: new TextureLoader().load(require('./Companion_Cube-portal.jpg')),
        // color: 0xff0000
      }),
    );
  }
}

export default Cube;
