import { Pressable } from "#/components/ui/pressable";
import { Input, InputField } from "#/components/ui/input";
import { HStack } from "#/components/ui/hstack";
import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { ThemeReactiveVar } from '#/reactive'
import { useGlobalSearchParams, useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {
	placeholder?: string
}

const SearchInputResults = (props: Props) => {
	const insets = useSafeAreaInsets()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const router = useRouter()
	const params = useGlobalSearchParams()

	return (
        <HStack className="relative flex-1 mt-[undefined] pb-2">
            <Pressable onPress={() => router.back()} className="justify-center">
				<Ionicons
					color={
						rTheme.colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light700
							: rTheme.theme?.gluestack.tokens.colors.light100
					}
					name='arrow-back'
					size={30}
					style={{
						marginLeft: 8,
						marginHorizontal: 5,
					}}
				/>
			</Pressable>
            <Input
                variant='rounded'
                hitSlop={{ top: 12, bottom: 12, left: 0, right: 15 }}
                isReadOnly
                className={` ${rTheme.colorScheme === 'light' ? rTheme.theme?.gluestack.tokens.colors.light100 : rTheme.theme?.gluestack.tokens.colors.light900} flex-1 mr-3 z-0 `}>
				<InputField
                    placeholderTextColor={
						rTheme.colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light700
							: rTheme.theme?.gluestack.tokens.colors.light100
					}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    autoComplete='off'
                    value={params.searchtext}
                    onPressIn={() => {
						router.push({
							pathname: '/(app)/explore/searchtext',
						})
					}}
                    placeholder={props.placeholder || 'Search'}
                    returnKeyType='search'
                    underlineColorAndroid='transparent'
                    keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
                    className={` ${rTheme.colorScheme === 'light' ? rTheme.theme?.gluestack.tokens.colors.light700 : rTheme.theme?.gluestack.tokens.colors.light400} text-center text-sm leading-xs font-bold `} />
			</Input>
        </HStack>
    );
}

export default SearchInputResults
