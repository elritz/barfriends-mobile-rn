import { Text } from "#/components/ui/text";
import { Pressable } from "#/components/ui/pressable";
import { Icon } from "#/components/ui/icon";
import { Heading } from "#/components/ui/heading";
import { HStack } from "#/components/ui/hstack";
import { Divider } from "#/components/ui/divider";
import { Button, ButtonGroup } from "#/components/ui/button";
import { Box } from "#/components/ui/box";
import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { usePublicVenueQuery } from '#/graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '#/reactive'
import { useDisclose } from '#/util/hooks/useDisclose'
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
        <Box className="bg-white rounded-md h-[220px]  my-3  mx-2">
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
                    style={{
						// backgroundColor: themeContext.palette.secondary.background.default,
						justifyContent: 'flex-end',
						overflow: 'hidden',
					}}
                    className="h-[220px] rounded-md">
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

					<HStack className="bg-light-100  dark:bg-light-800 h-[75px] p-2">
						<Box className="bg-transparent flex-1 self-center">
							<Heading
                                numberOfLines={2}
                                ellipsizeMode='tail'
                                className="text-sm font-medium text-[left] self-start">
								{getTitleCase(data.publicVenue?.Venue?.name)}
							</Heading>
						</Box>
						<Box className="content-center justify-center px-2">
							<ButtonGroup className="rounded-md">
								<Button
                                    onPress={!isOpen ? () => onToggle() : () => leaveVenue()}
                                    className="bg-light-100  dark:bg-light-800 rounded-lg">
									<Ionicons name={'exit'} size={30} />

									<Text className="text-error-500">{isOpen ? `Leave` : ''}</Text>
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
                                            onPress={onToggle}
                                            className="self-center bg-light-200  dark:bg-light-700 rounded-lg" />
									</>
								)}
							</ButtonGroup>
						</Box>
					</HStack>
				</Box>
			</Pressable>
        </Box>
    );
}
