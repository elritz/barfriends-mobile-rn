import { useReactiveVar } from '@apollo/client'
import { Input } from '@components/core'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'

interface HomeTownScreenProps {}

export default ({}: HomeTownScreenProps) => {
	const colorScheme = useThemeColorScheme()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const [search, setSearch] = useState<string>('')

	const {
		control,
		setError,
		handleSubmit,
		reset,
		formState: { dirtyFields, errors },
	} = useForm({
		defaultValues: {
			lookfor: rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.lookfor,
		},
		mode: 'onChange',
		reValidateMode: 'onChange',
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	return (
		<View>
			<Input
				style={{
					backgroundColor: 'transparent',
					width: '95%',
					alignSelf: 'center',
					paddingHorizontal: 10,
				}}
			>
				<Input.Input
					value={search}
					placeholder='Search...'
					onChangeText={(text: string) => setSearch(text)}
					borderBottomColor={'$transparent'}
					rounded={'$4'}
					keyboardAppearance={colorScheme == 'light' ? 'light' : 'dark'}
					color={
						colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light900
							: rTheme.theme?.gluestack.tokens.colors.dark900
					}
					backgroundColor={
						colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light100
							: rTheme.theme?.gluestack.tokens.colors.dark100
					}
				/>
			</Input>
		</View>
	)
}
