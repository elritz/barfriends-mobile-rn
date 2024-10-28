import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  View,
} from 'react-native'
import {useReactiveVar} from '@apollo/client'
import {Ionicons} from '@expo/vector-icons'
import {Controller, useForm} from 'react-hook-form'

import {
  AuthorizationDeviceProfile,
  Profile,
  useUpdateProfileIdentifiableInformationMutation,
} from '#/graphql/generated'
import {AuthorizationReactiveVar, ThemeReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Button} from '#/src/components/ui/button'
import {Input} from '#/src/components/ui/input'
import {Text} from '#/src/components/ui/text'

interface GenderScreenProps {}

const genderlist = [
  {
    gender: 'female',
  },
  {
    gender: 'male',
  },
]

export default ({}: GenderScreenProps) => {
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
  const rTheme = useReactiveVar(ThemeReactiveVar)

  const [
    updateProfileIdentifiableInfmationMutation,
    {data: UPIIData, loading: UPIILoading, error: UPIIError},
  ] = useUpdateProfileIdentifiableInformationMutation({
    variables: {
      data: {
        gender: {
          set: rAuthorizationVar?.Profile?.IdentifiableInformation?.gender,
        },
      },
    },
    onCompleted: data => {
      if (
        data &&
        data.updateProfileIdentifiableInformation.__typename ===
          'AuthorizationDeviceProfile'
      ) {
        const profile =
          data.updateProfileIdentifiableInformation as unknown as Profile
        const deviceprofile = rAuthorizationVar as AuthorizationDeviceProfile

        AuthorizationReactiveVar({
          ...deviceprofile,
          Profile: profile,
        })
        reset({
          gender: String(
            data?.updateProfileIdentifiableInformation?.Profile
              ?.IdentifiableInformation?.gender,
          ),
        })
      }
      if (data.updateProfileIdentifiableInformation.__typename === 'Error') {
        setError('gender', {
          message: data.updateProfileIdentifiableInformation.message,
        })
      }
    },
  })

  const {
    control,
    setError,
    handleSubmit,
    reset,
    formState: {dirtyFields, errors},
  } = useForm({
    defaultValues: {
      gender: rAuthorizationVar?.Profile?.IdentifiableInformation?.gender || '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  })

  const onSubmit = data => {
    if (dirtyFields.gender) {
      updateProfileIdentifiableInfmationMutation({
        variables: {
          data: {
            gender: {
              set: data.gender,
            },
          },
        },
      })
    }
  }

  return (
    <ScrollView>
      <Controller
        name="gender"
        control={control}
        rules={{
          required: true,
          validate: {
            // maxLength: (value) => value.trim().split(/\s+/).length <= 200 || 'Description must be less than 200 characters'
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <View style={{alignItems: 'center'}}>
              {genderlist.map((item, i) => (
                <Pressable
                  accessibilityRole="button"
                  key={i}
                  onPress={() => onChange(item.gender)}
                  style={{
                    width: '95%',
                    padding: 15,
                    marginVertical: 5,
                    height: 55,
                    borderColor: 'transparent',
                    borderRadius: 25,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text>{item.gender}</Text>
                  {value === item.gender && (
                    <Ionicons
                      name="checkmark-sharp"
                      size={25}
                      color={
                        rTheme.colorScheme === 'light'
                          ? rTheme.theme?.gluestack.tokens.colors.light900
                          : rTheme.theme?.gluestack.tokens.colors.light100
                      }
                    />
                  )}
                </Pressable>
              ))}
            </View>
            <KeyboardAvoidingView
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                height: '100%',
                width: '100%',
              }}>
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardAppearance={
                  rTheme.colorScheme === 'light' ? 'light' : 'dark'
                }
                blurOnSubmit={false}
                onSubmitEditing={handleSubmit(onSubmit)}
                autoFocus
                placeholder="Gender...."
                returnKeyType="done"
                autoCapitalize="none"
                autoComplete="off"
                keyboardType="default"
                rightElement={
                  <Box className="ml-3">
                    {UPIILoading && dirtyFields.gender ? (
                      <ActivityIndicator
                        size="small"
                        color={rTheme.theme?.gluestack.tokens.colors.primary500}
                      />
                    ) : (
                      dirtyFields.gender && (
                        <Pressable
                          accessibilityRole="button"
                          onPress={() => reset()}>
                          <Text>Reset</Text>
                        </Pressable>
                      )
                    )}
                  </Box>
                }
                className="rounded-md p-4 text-[md]"
              />
              <Text>{errors?.gender?.message}</Text>
              <Box className="min-h-[70px] w-[100%] flex-row items-center justify-between p-5">
                <Text style={{alignSelf: 'center', marginHorizontal: 10}}>
                  ERROR GOES HERE
                </Text>
                {(dirtyFields.gender || !!errors.gender) && (
                  <Button
                    disabled={false}
                    onPress={handleSubmit(onSubmit)}
                    className="dark:bg-light-9000 self-center rounded-md bg-light-500 px-10">
                    <Text>Update</Text>
                  </Button>
                )}
              </Box>
            </KeyboardAvoidingView>
          </>
        )}
      />
    </ScrollView>
  )
}
