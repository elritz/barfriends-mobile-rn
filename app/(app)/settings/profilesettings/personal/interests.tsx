import { useReactiveVar } from '@apollo/client'
import { Badge, Box, HStack, Heading, Pressable, Text, VStack } from '@components/core'
import { useGetInterestsQuery } from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import useRandomNumber from '@util/hooks/useRandomNumber'
import { Skeleton } from 'moti/skeleton'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

export default () => {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const [selectedTags, setSelectedTags] = useState<Array<String>>([])

	const { data, loading, error } = useGetInterestsQuery()

	useEffect(() => {
		const tagids = rAuthorizationVar?.DeviceProfile?.Profile?.DetailInformation?.Tags.map(
			item => item.id,
		)
		if (tagids && tagids.length) {
			setSelectedTags([...tagids])
		}
	}, [])

	if (loading) {
		return (
			<Box bg='$transparent' flex={1} mt={'$4'}>
				<FlashList
					numColumns={1}
					scrollEnabled={false}
					keyExtractor={(item, index) => index.toString()}
					estimatedItemSize={35}
					data={[...Array(6)]}
					showsVerticalScrollIndicator={false}
					renderItem={() => {
						const randWidth = useRandomNumber(100, 240)
						const randInterests = useRandomNumber(5, 15)
						return (
							<VStack m={'$2'}>
								<Skeleton
									height={35}
									width={Number(randWidth)}
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
								<VStack flexWrap={'wrap'} flexDirection={'row'}>
									{[...Array(randInterests)].map(item => {
										const randWidth = useRandomNumber(40, 100)
										return (
											<Skeleton
												height={35}
												width={Number(randWidth)}
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
							</VStack>
						)
					}}
					ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
				/>
			</Box>
		)
	}

	return (
		<Box bg='$transparent' flex={1} mx={'$2'} mt={'$4'}>
			<FlashList
				scrollEnabled
				data={data?.getInterests}
				estimatedItemSize={400}
				keyExtractor={item => item.id.toString()}
				ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
				extraData={selectedTags}
				renderItem={({ item, index }) => {
					return (
						<VStack key={item.id}>
							<Heading>{item.name}</Heading>
							<HStack
								flex={1}
								flexDirection={'row'}
								// alignItems='center'
								// justifyContent='center'
								// justifyContent='space-around'
								// alignContent='center'
								flexWrap={'wrap'}
								space={'sm'}
							>
								{item.Tags.map((tag, index) => {
									return (
										<Pressable
											onPress={() => {
												if (selectedTags.some(e => e === tag.id)) {
													setSelectedTags(prev => {
														return [...prev.filter((tagid, i) => tagid !== tag.id)]
													})
												} else {
													setSelectedTags(oldArray => [...oldArray, tag.id])
												}
											}}
										>
											<Badge
												rounded={'$lg'}
												sx={{
													_light: {
														bg:
															selectedTags.some(e => e === tag.id) ||
															rAuthorizationVar?.DeviceProfile?.Profile?.DetailInformation?.Tags.some(
																e => e.id === item.id,
															)
																? '$primary500'
																: '$light200',
													},
													_dark: {
														bg:
															selectedTags.some(e => e === tag.id) ||
															rAuthorizationVar?.DeviceProfile?.Profile?.DetailInformation?.Tags.some(
																e => e.id === item.id,
															)
																? '$primary500'
																: '$dark300',
													},
												}}
												px={'$3'}
												py={'$2'}
												my={'$2'}
											>
												<Text
													color={
														rTheme.colorScheme === 'light'
															? rTheme.theme?.gluestack.tokens.colors.light900
															: rTheme.theme?.gluestack.tokens.colors.dark900
													}
												>
													{tag.emoji}
													{tag.name}
												</Text>
											</Badge>
										</Pressable>
									)
								})}
							</HStack>
						</VStack>
					)
				}}
			/>
		</Box>
	)
}
