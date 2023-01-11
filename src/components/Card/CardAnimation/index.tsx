import React, { useEffect } from 'react';
import { useWindowDimensions, ViewProps } from 'react-native';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

import { AnimationContainer } from './styles';

interface CardAnimationProps extends ViewProps {
  children: React.ReactNode;
}

export function CardAnimation({ children, ...rest }: CardAnimationProps) {
  const { width: displayWidth } = useWindowDimensions();
  const cardOpacity = useSharedValue(0);
  const cardOffset = useSharedValue(0.25 * displayWidth);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(cardOffset.value,[0,50],[0,1],Extrapolate.CLAMP),
      transformX: interpolate(cardOffset.value,[0,50],[0.25 * displayWidth,0], Extrapolate.CLAMP)
    }
  })

  useEffect(() => {
     cardOpacity.value = withTiming(50, {duration:1000})
     cardOpacity.value = withTiming(50, {duration:1000})
  }, []);

  return (
    <AnimationContainer {...rest} style={animatedStyle}>
      {children}
    </AnimationContainer>
  )
}