import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import {
	Box,
	Button,
	ButtonGroup,
	Divider,
	HStack,
	Heading,
	Icon,
	Pressable,
	Text,
} from '@gluestack-ui/themed'
import { usePublicVenueQuery } from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { useDisclose } from '@util/hooks/useDisclose'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Image } from 'react-native'
import { StyleSheet } from 'react-native'
import { Blurhash } from 'react-native-blurhash'

export default function CurrentVenue() {
	const router = useRouter()
	const [hideBlur, setHideBlur] = useState(false)
	const { isOpen, onClose, onOpen, onToggle } = useDisclose()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rThemeVar = useReactiveVar(ThemeReactiveVar)

	const getTitleCase = str => {
		const titleCase = str
			.toLowerCase()
			.split(' ')
			.map(word => {
				return word.charAt(0).toUpperCase() + word.slice(1)
			})
			.join(' ')

		return titleCase
	}

	const { data, loading, error } = usePublicVenueQuery({
		skip: !rAuthorizationVar?.Profile?.Personal?.LiveOutPersonal?.Out[0]?.venueProfileId,
		fetchPolicy: 'cache-only',
		variables: {
			where: {
				id: {
					equals: rAuthorizationVar?.Profile?.Personal?.LiveOutPersonal?.Out[0]?.venueProfileId,
				},
			},
		},
	})

	if (loading || !data) return null

	function leaveVenue() {
		onToggle()
	}

	return (
		<Box
			bg={'$white'}
			rounded={'$md'}
			sx={{
				h: 220,
				my: 3,
				mx: 2,
			}}
		>
			<Pressable
				onPress={() => {
					router.push({
						pathname: `/(app)/public/venue/${data.publicVenue?.Venue?.id}`,
						params: {
							latitude: Number(data.publicVenue?.Venue?.Location?.Geometry?.latitude),
							longitude: Number(data.publicVenue?.Venue?.Location?.Geometry?.longitude),
						},
					})
				}}
			>
				<Box
					sx={{ h: 220 }}
					rounded={'$md'}
					style={{
						// backgroundColor: themeContext.palette.secondary.background.default,
						justifyContent: 'flex-end',
						overflow: 'hidden',
					}}
				>
					{!loading ? (
						<Image
							source={{ uri: data.publicVenue?.photos[0]?.url }}
							resizeMode='cover'
							onLoadEnd={() => setHideBlur(true)}
							style={{
								...StyleSheet.absoluteFillObject,
								width: undefined,
								height: undefined,
							}}
						/>
					) : null}
					{!hideBlur && (
						<Blurhash
							blurhash={String(data.publicVenue?.photos[0]?.blurhash)}
							style={{
								flex: 1,
							}}
						/>
					)}

					<HStack
						sx={{
							_light: {
								bg: '$light100',
							},
							_dark: {
								bg: '$light800',
							},
							h: 75,
						}}
						p={'$2'}
					>
						<Box bg={'transparent'} flex={1} alignSelf={'center'}>
							<Heading
								fontSize={'$sm'}
								fontWeight={'$medium'}
								textAlign={'left'}
								numberOfLines={2}
								alignSelf={'flex-start'}
								ellipsizeMode='tail'
							>
								{getTitleCase(data.publicVenue?.Venue?.name)}
							</Heading>
						</Box>
						<Box alignContent={'center'} justifyContent={'center'} px={2}>
							<ButtonGroup rounded={'$md'}>
								<Button
									sx={{
										_light: {
											bg: '$light100',
										},
										_dark: {
											bg: '$light800',
										},
									}}
									rounded={'$lg'}
									onPress={!isOpen ? () => onToggle() : () => leaveVenue()}
								>
									<Ionicons name={'ios-exit'} size={30} />

									<Text color='$error500'>{isOpen ? `Leave` : ''}</Text>
								</Button>
								{isOpen && <Divider orientation='vertical' />}
								{isOpen && (
									<>
										<Ionicons
											size={25}
											name={'close'}
											color={
												rThemeVar.colorScheme === 'light'
													? rThemeVar.theme?.gluestack.tokens.colors.light900
													: rThemeVar.theme?.gluestack.tokens.colors.light100
											}
										/>
										<Button
											alignSelf={'center'}
											sx={{
												_light: {
													bg: '$light200',
												},
												_dark: {
													bg: '$light700',
												},
											}}
											rounded={'$lg'}
											onPress={onToggle}
										/>
									</>
								)}
							</ButtonGroup>
						</Box>
					</HStack>
				</Box>
			</Pressable>
		</Box>
	)
}
