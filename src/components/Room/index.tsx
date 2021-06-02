import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer, TextureLoader, THREE } from 'expo-three';
import React, { useState } from 'react';
import {
  AmbientLight,
  BoxBufferGeometry,
  Fog,
  GridHelper,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SpotLight,
} from 'three';
import { Asset } from 'expo-asset';

export interface RoomCameraCoordinatesProps {
  cameraPositionX: number;
  cameraPositionY: number;
  cameraPositionZ: number;
}

export interface RoomProps {
  CameraCoordinates: RoomCameraCoordinatesProps;
}
const Room: React.FC<RoomProps> = ({ CameraCoordinates }) => {
  let timeout: number;

  React.useEffect(() => {
    // Clear the animation loop when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  const [materialsBCK, setMaterialBCK] = useState<MeshBasicMaterial[]>([]);

  const GetRoomBCK = async () => {
    const materials = [];
    const asset = Asset.fromModule(require('./img.png'));
    await asset.downloadAsync();
    const texture = new TextureLoader().load(asset.localUri);

    for (let i = 0; i < 6; i++) {
      materials.push(new THREE.MeshBasicMaterial({ map: textures[i] }));
    }
    setMaterialBCK(materials);
  };

  return (
    <GLView
      style={{ flex: 1 }}
      onContextCreate={async (gl: ExpoWebGLRenderingContext) => {
        const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
        const sceneColor = 0x600000;

        // Create a WebGLRenderer without a DOM element
        const renderer = new Renderer({ gl });
        renderer.setSize(width, height);
        renderer.setClearColor(sceneColor);

        const camera = new PerspectiveCamera(70, width / height, 0.01, 1000);
        camera.position.set(
          CameraCoordinates.cameraPositionX,
          CameraCoordinates.cameraPositionY,
          CameraCoordinates.cameraPositionZ,
        );

        const scene = new Scene();
        scene.fog = new Fog(sceneColor, 1, 10000);
        scene.add(new GridHelper(10, 10));

        const ambientLight = new AmbientLight(0x101010);
        scene.add(ambientLight);

        const pointLight = new PointLight(0xffffff, 2, 1000, 1);
        pointLight.position.set(0, 200, 200);
        scene.add(pointLight);

        const spotLight = new SpotLight(0xffffff, 0.5);
        spotLight.position.set(0, 500, 100);
        spotLight.lookAt(scene.position);
        scene.add(spotLight);

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

class IconMesh extends Mesh {
  constructor() {
    super(
      new BoxBufferGeometry(1.0, 1.0, 1.0),
      new MeshStandardMaterial({
        map: new TextureLoader().load(require('./icon.png')),
        // color: 0xff0000
      }),
    );
  }
}

export default Room;
