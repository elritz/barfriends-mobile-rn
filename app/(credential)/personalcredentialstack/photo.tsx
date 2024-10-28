import {useEffect, useRef, useState} from 'react'
import {Image} from 'react-native'
import {AppState, SafeAreaView, useWindowDimensions, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import {useRouter} from 'expo-router'
// TODO: FN()
import {useReactiveVar} from '@apollo/client'
import {Feather, Ionicons, MaterialIcons} from '@expo/vector-icons'
import {FlashList} from '@shopify/flash-list'
import {Skeleton} from 'moti/skeleton'
import {useForm} from 'react-hook-form'

import {
  CredentialPersonalProfileReactiveVar,
  PermissionsReactiveVar,
  ThemeReactiveVar,
} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Button, ButtonText} from '#/src/components/ui/button'
import {Center} from '#/src/components/ui/center'
import {HStack} from '#/src/components/ui/hstack'
import {Pressable} from '#/src/components/ui/pressable'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'
import useCloudinaryImageUploading from '#/src/util/uploading/useCloudinaryImageUploading'

const UserFemaleIllustration = require('#/assets/images/illustration/user_female_illustration.png')

export default () => {
  const appStateRef = useRef(AppState.currentState)
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const window = useWindowDimensions()
  const credentialPersonalProfileVar = useReactiveVar(
    CredentialPersonalProfileReactiveVar,
  )
  const rPerm = useReactiveVar(PermissionsReactiveVar)
  const rTheme = useReactiveVar(ThemeReactiveVar)
  const [mediaLoading, setMediaLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [numberOfPhotos] = useState(100)
  const [photoLibrary, setPhotoLibrary] = useState<MediaLibrary.Asset[]>([])
  const [lastPhotoID, setLastPhotoID] = useState<string>('')
  const [_, setHasNextPage] = useState<boolean>(true)

  const {handleSubmit, setValue, watch} = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      photo: {
        id: '',
        uri: '',
        url: '',
      },
    },
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  })

  const watchValues = watch()

  const loadMediaAsync = async () => {
    setMediaLoading(true)
    const assets = await MediaLibrary.getAssetsAsync({
      first: numberOfPhotos,
      mediaType: 'photo',
    })
    const id = assets.endCursor
    setLastPhotoID(id)
    setHasNextPage(assets.hasNextPage)
    setPhotoLibrary(assets.assets)
    setMediaLoading(false)
  }

  // const _pickMediaPicker = async () => {
  //   if (!rPerm?.medialibrary.granted) {
  //     router.push({
  //       pathname: '/(app)/permission/medialibrary',
  //     })
  //   } else {
  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: false,
  //       aspect: [4, 3],
  //       quality: 1,
  //     })
  //     if (!result.canceled) {
  //       setValue('photo', {id: '', uri: result.assets[0].uri, url: ''})
  //     }
  //   }
  // }

  const onSubmit = async data => {
    setImageUploading(true)
    const {secure_url} = await useCloudinaryImageUploading(data.photo.uri)
    if (secure_url) {
      CredentialPersonalProfileReactiveVar({
        ...credentialPersonalProfileVar,
        photo: {
          ...data.photo,
          url: secure_url,
        },
      })
      setImageUploading(false)
    }
  }

  const _loadMoreMedia = async () => {
    if (!mediaLoading) {
      setMediaLoading(true)
    }

    const assets = await MediaLibrary.getAssetsAsync({
      first: numberOfPhotos,
      after: lastPhotoID,
    })

    const id = assets.endCursor

    setLastPhotoID(id)
    setHasNextPage(assets.hasNextPage)
    setPhotoLibrary([...photoLibrary, ...assets.assets])
    setMediaLoading(false)
  }

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    )
    return () => {
      subscription.remove()
    }
  }, [])

  const handleAppStateChange = async (nextAppState: any) => {
    if (
      /inactive|background/.exec(appStateRef.current) &&
      nextAppState === 'active'
    ) {
      const mediapermission = await MediaLibrary.getPermissionsAsync()
      PermissionsReactiveVar({
        ...rPerm,
        medialibrary: mediapermission,
      })

      if (mediapermission.granted && mediapermission.status === 'granted') {
      }
    }
    appStateRef.current = nextAppState
  }

  useEffect(() => {
    if (rPerm?.medialibrary.granted) {
      if (!photoLibrary.length) {
        loadMediaAsync()
      }
    } else {
      router.push({
        pathname: '/(app)/permission/medialibrary',
      })
    }
  }, [rPerm, mediaLoading])

  if (!photoLibrary.length) {
    return (
      <Box className="bg-transparent">
        <VStack className="items-center">
          <Image
            accessibilityIgnoresInvertColors
            style={{
              height: window.width / 1.55,
              width: window.width / 1.75,
              margin: 10,
              borderRadius: 20,
            }}
            source={
              watchValues?.photo?.uri
                ? {uri: watchValues.photo.uri}
                : UserFemaleIllustration
            }
          />
          <Box className="mx-2 mb-2 rounded-md p-5">
            <VStack className="my-2 items-center">
              <Text className="px-2">
                Continue with your profile setup, use your own photos to share
                and create the style that reflect you the best.
              </Text>
              <Button
                variant="solid"
                onPress={async () =>
                  router.push({
                    pathname: '/(app)/permission/medialibrary',
                  })
                }
                className="mt-10 w-[85%]">
                <ButtonText>Continue</ButtonText>
              </Button>
            </VStack>
          </Box>
          {[...Array(6)].map((_, index) => {
            return (
              <HStack key={index} className="overflow-hidden">
                {[...Array(3)].map(({_, index: innerIndex}) => {
                  return (
                    <Skeleton
                      key={innerIndex}
                      height={window.width / 3}
                      width={window.width / 3}
                      radius={15}
                      colorMode={
                        rTheme.colorScheme === 'light' ? 'light' : 'dark'
                      }
                      colors={
                        rTheme.colorScheme === 'light'
                          ? [
                              String(
                                rTheme.theme?.gluestack.tokens.colors.light100,
                              ),
                              String(
                                rTheme.theme?.gluestack.tokens.colors.light300,
                              ),
                            ]
                          : [
                              String(
                                rTheme.theme?.gluestack.tokens.colors.light900,
                              ),
                              String(
                                rTheme.theme?.gluestack.tokens.colors.light700,
                              ),
                            ]
                      }
                    />
                  )
                })}
              </HStack>
            )
          })}
        </VStack>
      </Box>
    )
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Center>
        <Svg
          style={{
            position: 'absolute',
          }}
          width={window.width}
          height="100%">
          <Defs>
            <LinearGradient id="grad" x1="1" y1="0" x2="1" y2="1">
              <Stop offset="0.25" stopOpacity="1" />
              <Stop offset="1" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Rect height="100%" width={window.width} fill="url(#grad)" />
        </Svg>
        <Image
          innerIndex
          style={{
            height: window.width / 1.55,
            width: window.width / 1.75,
            margin: 10,
            borderRadius: 20,
          }}
          source={
            watchValues?.photo?.uri
              ? {uri: watchValues.photo.uri}
              : UserFemaleIllustration
          }
        />
      </Center>
      <FlashList
        style={{
          width: '100%',
          height: '100%',
        }}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.4}
        onEndReached={_loadMoreMedia}
        numColumns={3}
        data={photoLibrary}
        scrollEnabled={!imageUploading}
        renderItem={({item}: any) => {
          return (
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                !imageUploading && setValue('photo.uri', item.uri)
              }}>
              <Image
                accessibilityIgnoresInvertColors
                style={{
                  height: window.width / 3,
                  width: window.width / 3,
                  justifyContent: 'center',
                }}
                source={{uri: item.uri}}
              />
              {watchValues?.photo?.uri === item.uri && (
                <Ionicons
                  name="checkmark-circle"
                  color={rTheme.theme?.gluestack.tokens.colors.success500}
                  style={{
                    position: 'absolute',
                    bottom: 1,
                    right: 1,
                  }}
                  size={25}
                />
              )}
            </Pressable>
          )
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          width: '100%',
          height: 90,
          paddingTop: 10,
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingBottom: insets.bottom,
        }}>
        <Pressable accessibilityRole="button" className="mx-[10%] w-[40%]">
          <MaterialIcons
            name={'photo-library'}
            size={29}
            color={rTheme.theme?.gluestack.tokens.colors.green800}
          />
        </Pressable>

        <Button
          onPress={handleSubmit(onSubmit)}
          variant={'link'}
          disabled={imageUploading}
          className="mx-5 w-[40%]">
          <ButtonText className="text-xl text-primary-500">
            {imageUploading ? 'Continue' : 'Uploading'}
          </ButtonText>
          <Feather
            name="arrow-right"
            size={29}
            color={rTheme.theme?.gluestack.tokens.colors.primary500}
          />
        </Button>
      </View>
    </SafeAreaView>
  )
}
