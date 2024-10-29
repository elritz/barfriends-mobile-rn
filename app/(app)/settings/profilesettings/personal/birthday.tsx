import {useState} from 'react'
import {View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useRouter} from 'expo-router'
import {useReactiveVar} from '@apollo/client'
import {Controller, useForm} from 'react-hook-form'

import {
  AuthorizationDeviceProfile,
  Profile,
  useUpdateOneProfileMutation,
} from '#/graphql/generated'
import {AuthorizationReactiveVar} from '#/reactive'
import DatePicker from '#/src/components/atoms/DatePicker'
import {Box} from '#/src/components/ui/box'
import {Button} from '#/src/components/ui/button'
import {Text} from '#/src/components/ui/text'
import {calcDateDiffFromNow} from '#/src/util/helpers/luxon'
import {secureStorageItemCreate} from '#/src/util/hooks/local/useSecureStorage'

export default () => {
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
  const [legalAge] = useState<number>(19)
  const router = useRouter()

  const [updateOneProfilMutation, {loading: UOPLoading}] =
    useUpdateOneProfileMutation({
      onError: error => {
        setError('date', error)
      },
      onCompleted: data => {
        const profile = data.updateOneProfile as Profile
        const deviceprofile = rAuthorizationVar as AuthorizationDeviceProfile

        AuthorizationReactiveVar({
          ...deviceprofile,
          Profile: profile,
        })
        router.back()
        // reset({ date: data.updateOneProfile.IdentifiableInformation.birthday })
      },
    })

  const {
    control,
    setError,
    handleSubmit,
    formState: {dirtyFields, errors},
  } = useForm({
    defaultValues: {
      date:
        new Date(
          rAuthorizationVar?.Profile?.IdentifiableInformation?.birthday,
        ) || '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  })

  const validateDate1 = async (
    selectedDate: Date | undefined,
  ): Promise<boolean> => {
    if (!selectedDate) {
      return false
    }
    const {years} = calcDateDiffFromNow(selectedDate)
    if (years === 0) {
      return false
    }
    return true
  }

  const validateDate2 = async (
    selectedDate: Date | undefined,
  ): Promise<boolean> => {
    if (!selectedDate) {
      return false
    }
    const {days, months, years} = calcDateDiffFromNow(selectedDate)
    if (
      years &&
      months &&
      days &&
      years + 1 === legalAge &&
      months >= 11 &&
      days >= 27
    ) {
      await secureStorageItemCreate({
        key: 'BIRTHDAY',
        value: String(selectedDate),
      })
      return true
    } else if (years && years < legalAge) {
      return false
    }
    return true
  }

  const onSubmit = (data: any) => {
    updateOneProfilMutation({
      variables: {
        where: {
          id: rAuthorizationVar?.Profile?.id,
        },
        data: {
          IdentifiableInformation: {
            update: {
              data: {
                birthday: {
                  set: data.date,
                },
              },
            },
          },
        },
      },
    })
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginHorizontal: '5%',
      }}>
      <>
        <Controller
          control={control}
          name="date"
          render={({field: {value, onChange}}) => (
            <View style={{width: '100%', height: '70%'}}>
              <DatePicker
                display="spinner"
                mode="date"
                value={value}
                maxDate={new Date()}
                onChange={(e, selectedDate) => onChange(selectedDate)}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </View>
          )}
          rules={{
            required: {
              value: true,
              message: 'Your birthday is required to continue.',
            },
            validate: {
              validateYear1: async value =>
                (await validateDate1(value)) || 'You must exsist to sign up.',
              validateYear2: async value =>
                (await validateDate2(value)) ||
                `Must be closer to ${legalAge} to join.`,
            },
          }}
        />
      </>
      <Text>{errors.date && errors?.date.message}</Text>
      <Box className="py-15 w-[100%] justify-center">
        {dirtyFields.date && (
          <Button
            disabled={UOPLoading}
            onPress={handleSubmit(onSubmit)}
            size={'lg'}
            className="dark:bg-light-9000 my-5 rounded-md bg-light-500">
            <Text>Update</Text>
          </Button>
        )}
      </Box>
    </SafeAreaView>
  )
}
