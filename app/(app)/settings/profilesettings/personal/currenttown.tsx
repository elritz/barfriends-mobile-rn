import { useReactiveVar } from '@apollo/client'
import { Input } from '@components/core'
import { ThemeReactiveVar } from '@reactive'
import { useState } from 'react'
import { View } from 'react-native'

interface CurrentPlacceScreenProps {}

export default ({}: CurrentPlacceScreenProps) => {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const [search, setSearch] = useState<string>('')

	return (
		<View>
			<Input
				style={{
					backgroundColor: 'transparent',
					width: '95%',
					alignSelf: 'center',
					paddingHorizontal: 5,
					borderRadius: 14,
				}}
			>
				<Input.Input
					style={{
						color:
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light900
								: rTheme.theme?.gluestack.tokens.colors.dark900,
						borderBottomColor: 'transparent',
						backgroundColor:
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light50
								: rTheme.theme?.gluestack.tokens.colors.dark50,
					}}
					placeholder='Search...'
					onChangeText={(text: string) => setSearch(text)}
					value={search}
					keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
				/>
			</Input>
		</View>
	)
}
