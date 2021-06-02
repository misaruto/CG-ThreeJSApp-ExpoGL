import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Cube, { CubeCameraCoordinatesProps } from '../../components/Cube';

const Home: React.FC = () => {
  //E somente um teste
  const [cubeCameraCoordinates, setCubeCameraCoordinates] =
    useState<CubeCameraCoordinatesProps>({
      cameraPositionX: 1,
      cameraPositionY: 5,
      cameraPositionZ: 5,
    });

  return (
    <>
      <Animated.View style={{ flex: 1, height: '80%' }}>
        <Cube CameraCoordinates={cubeCameraCoordinates} />
      </Animated.View>
    </>
  );
};

export default Home;
