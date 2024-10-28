import {BlurView} from 'expo-blur'
import {Stack} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {FormProvider, useForm} from 'react-hook-form'

import LogoTransparent from '#/assets/images/company/LogoTransparent'
import {
  Emojimood,
  useRefreshDeviceManagerQuery,
  useUpdateStoryEmojimoodMutation,
} from '#/graphql/generated'
import {ThemeReactiveVar} from '#/reactive'
import ChevronBackArrow from '#/src/components/atoms/ChevronBackArrow'
import {Button, ButtonText} from '#/src/components/ui/button'
import {HStack} from '#/src/components/ui/hstack'

export type FormType = {
  emojimood: Emojimood
}

export default () => {
  const rTheme = useReactiveVar(ThemeReactiveVar)

  const methods = useForm<FormType>({
    defaultValues: {
      emojimood: {
        id: '',
        emojiname: '',
        colors: ['#00000000'],
        emoji: '',
      },
    },
  })

  const {
    data: rdmData,
    loading: rdmLoading,
    error: rdmError,
  } = useRefreshDeviceManagerQuery({
    onCompleted(data) {
      if (
        data.refreshDeviceManager?.__typename ===
          'AuthorizationDeviceProfile' &&
        data.refreshDeviceManager.Profile?.tonightStory?.emojimood
      ) {
        methods.setValue('emojimood', {
          id: data.refreshDeviceManager.Profile?.tonightStory?.emojimood?.id,
          emojiname:
            data.refreshDeviceManager.Profile?.tonightStory?.emojimood
              ?.emojiname,
          colors:
            data.refreshDeviceManager.Profile?.tonightStory?.emojimood?.colors,
          emoji:
            data.refreshDeviceManager.Profile?.tonightStory?.emojimood.emoji,
        })
      }
    },
  })

  const [updateStoryEmojimoodMutation, {data, loading, error}] =
    useUpdateStoryEmojimoodMutation({
      update: (cache, {data}) => {
        if (
          data?.updateStoryEmojimood?.__typename === 'Story' &&
          rdmData?.refreshDeviceManager?.__typename ===
            'AuthorizationDeviceProfile' &&
          rdmData.refreshDeviceManager.Profile?.tonightStory
        ) {
          cache.modify({
            id: cache.identify(
              rdmData.refreshDeviceManager.Profile?.tonightStory,
            ),
            fields: {
              emojimood(existingEmojimood, {toReference}) {
                return {
                  ...data?.updateStoryEmojimood?.emojimood,
                }
              },
            },
          })
        }
      },
    })

  return (
    <FormProvider {...methods}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
          },

          contentStyle: {
            backgroundColor: 'transparent',
          },
          headerShown: false,
          animation: 'fade',
        }}>
        <Stack.Screen
          name={'devicemanager'}
          options={{
            headerTitle: () => <LogoTransparent height={30} width={192} />,
            headerLeft: () => <ChevronBackArrow />,
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name={'medialibrary'}
          options={{
            headerTitle: () => <LogoTransparent height={30} width={192} />,
            headerLeft: () => <ChevronBackArrow />,
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={'emojimood'}
          options={{
            headerShown: true,
            title: '',
            headerTransparent: true,
            header: () => {
              return (
                <BlurView
                  tint={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
                  intensity={70}>
                  <HStack className="items-center justify-between py-3 pr-2">
                    <ChevronBackArrow />
                    <HStack space="md">
                      {methods.watch('emojimood.id') ||
                      (rdmData?.refreshDeviceManager?.__typename ===
                        'AuthorizationDeviceProfile' &&
                        rdmData.refreshDeviceManager.Profile?.tonightStory
                          ?.emojimood?.id) ? (
                        <Button
                          size="xs"
                          disabled={loading}
                          onPress={() => {
                            updateStoryEmojimoodMutation({
                              variables: {
                                emojimoodId: parseInt(
                                  methods.getValues('emojimood.id'),
                                ),
                              },
                            })
                          }}
                          className="dark:bg-green-500">
                          <ButtonText className="text-sm font-bold">
                            {loading ? 'Updating' : 'Update'}
                          </ButtonText>
                        </Button>
                      ) : null}
                    </HStack>
                  </HStack>
                </BlurView>
              )
            },
          }}
        />
      </Stack>
    </FormProvider>
  )
}
