import { useReactiveVar } from '@apollo/client'
import { VStack } from '@components/core'
import { ThemeReactiveVar } from '@reactive'
import { Skeleton } from 'moti/skeleton'

export default function TermsLoadingState() {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	
	return (
		<VStack my={'$5'} space={'lg'} rounded={'$md'} px={'$2'}>
			<Skeleton
				height={10}
				width={'75%'}
				radius={15}
				colorMode={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
				colors={
					rTheme.colorScheme === 'light'
						? [
								String(rTheme.theme?.gluestack.tokens.colors.light100),
								String(rTheme.theme?.gluestack.tokens.colors.light300),
						  ]
						: [
								String(rTheme.theme?.gluestack.tokens.colors.dark100),
								String(rTheme.theme?.gluestack.tokens.colors.dark300),
						  ]
				}
			/>
			{[...Array(4)].map(item => {
				return (
					<Skeleton
						key={item}
						height={10}
						width={'75%'}
						radius={15}
						colorMode={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
						colors={
							rTheme.colorScheme === 'light'
								? [
										String(rTheme.theme?.gluestack.tokens.colors.light100),
										String(rTheme.theme?.gluestack.tokens.colors.light300),
								  ]
								: [
										String(rTheme.theme?.gluestack.tokens.colors.dark100),
										String(rTheme.theme?.gluestack.tokens.colors.dark300),
								  ]
						}
					/>
				)
			})}
		</VStack>
	)
}
