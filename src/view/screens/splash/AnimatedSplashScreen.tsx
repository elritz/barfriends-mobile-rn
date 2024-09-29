import { useReactiveVar } from "@apollo/client";
import { ThemeReactiveVar } from "#/reactive";
import VectorFonts from "#/src/util/helpers/VectorFonts";
import { cacheFonts, cacheImages } from "#/src/util/hooks/local/useCacheImages";
import { useAssets } from "expo-asset";
import { Image } from "expo-image";
import { SplashScreen } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

function AnimatedSplashScreen({ children }) {
  const rThemeVar = useReactiveVar(ThemeReactiveVar);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);
  // const [assets, Aerror] = useAssets([
  // 	require(`../../../assets/images/splash/splash.${process.env.EXPO_PUBLIC_NODE_ENV}.light.png`),
  // 	require(`../../../assets/images/splash/splash.${process.env.EXPO_PUBLIC_NODE_ENV}.dark.png`),
  // ])

  useEffect(() => {
    setTimeout(() => setAnimationComplete(true), 1);
    SplashScreen.hideAsync();
  }, []);

  const onImageLoaded = useCallback(async () => {
    try {
      const imageAssets = cacheImages([]);
      const fontAssets = cacheFonts([...VectorFonts]);

      await Promise.all([...imageAssets, ...fontAssets]);
    } catch (e) {
      console.warn(e);
      // handle errors
    } finally {
      setAnimationComplete(true);
    }
  }, []);

  // if (!assets) {
  // 	return null
  // }

  // if (assets && !isSplashAnimationComplete) {
  // 	return (
  // 		<View
  // 			pointerEvents='none'
  // 			style={[
  // 				StyleSheet.absoluteFill,
  // 				{
  // 					backgroundColor: rThemeVar.colorScheme === 'light' ? '#f1f1f1' : '#0d0d0d',
  // 				},
  // 			]}
  // 		>
  // 			<Image
  // 				onLoad={onImageLoaded}
  // 				source={{
  // 					uri: rThemeVar.colorScheme ? assets[0].uri : assets[1].uri,
  // 				}}
  // 				style={{
  // 					width: '100%',
  // 					height: '100%',
  // 				}}
  // 				contentFit='cover'
  // 			/>
  // 		</View>
  // 	)
  // }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {children}
    </View>
  );
}

export default AnimatedSplashScreen;
