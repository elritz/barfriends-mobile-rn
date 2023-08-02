// TODO: UX(Complete this card for venues etc....)
import { Product } from './Model'
import { Box, Button, HStack, Heading, Text, VStack } from '@components/core'
import { Image } from 'react-native'
import { Dimensions, View } from 'react-native'

const { width } = Dimensions.get('window')
export const CARD_HEIGHT = (width * 1564) / 1600

interface CardProps {
	product: Product
}

const Card = ({ product }: CardProps) => {
	switch (product.type) {
		case '_ad1':
			return (
				<Box
					bg={'$transparent'}
					sx={{
						w: width,
						h: CARD_HEIGHT,
					}}
				>
					<VStack
						style={{
							borderRadius: 16,
							margin: 19,
							flex: 1,
							backgroundColor: product.color1,
							padding: 16,
							justifyContent: 'space-between',
						}}
					>
						<VStack>
							<Heading
								fontSize={'$6xl'}
								fontWeight={'$extrabold'}
								textTransform='uppercase'
								allowFontScaling
								adjustsFontSizeToFit
								textAlign='left'
								sx={{
									lineHeight: 60,
									color: product.primaryTextColor,
								}}
							>
								{product.title}
							</Heading>
							<Text
								fontWeight={'$bold'}
								fontSize={'$xl'}
								sx={{
									color: product.secondaryTextColor,
								}}
							>
								{product.subtitle}
							</Text>
						</VStack>
						<HStack>
							<Button
								rounded={'$full'}
								w={'auto'}
								alignSelf='center'
								onPress={() => console.log('route', product.route)}
								sx={{
									bg: product.buttonColor,
								}}
							>
								<Button.Text
									px={'$2'}
									sx={{
										color: product.buttonTextColor,
									}}
								>
									{product.buttoncta}
								</Button.Text>
							</Button>
						</HStack>
					</VStack>
				</Box>
			)
		case '_ad2':
			return (
				<Box
					bg={'$transparent'}
					sx={{
						w: width,
						h: CARD_HEIGHT,
					}}
				>
					<View
						style={{
							borderRadius: 16,
							margin: 19,
							flex: 1,
							backgroundColor: product.color1,
							padding: 16,
							justifyContent: 'space-between',
						}}
					>
						<View>
							<Heading
								fontSize={'$2xl'}
								sx={{
									color: product.primaryTextColor,
								}}
							>
								{product.title}
							</Heading>
							<Text
								sx={{
									color: product.secondaryTextColor,
								}}
							>
								{product.subtitle}
							</Text>
						</View>
						<Button
							rounded={'$full'}
							w={'auto'}
							alignSelf='center'
							onPress={() => console.log('route', product.route)}
							sx={{
								bg: product.buttonColor,
							}}
						>
							<Button.Text
								px={'$2'}
								sx={{
									color: product.buttonTextColor,
								}}
							>
								{product.buttoncta}
							</Button.Text>
						</Button>
					</View>
				</Box>
			)
		case '_ad3':
			return (
				<Box
					bg={'$transparent'}
					sx={{
						w: width,
						h: CARD_HEIGHT,
					}}
				>
					<VStack
						style={{
							borderRadius: 16,
							margin: 19,
							flex: 1,
							backgroundColor: product.color1,
							padding: 16,
							justifyContent: 'space-between',
						}}
					>
						<VStack>
							<Heading
								fontSize={'$6xl'}
								fontWeight={'$extrabold'}
								textTransform='uppercase'
								allowFontScaling
								adjustsFontSizeToFit
								textAlign='left'
								sx={{
									lineHeight: 60,
									color: product.primaryTextColor,
								}}
							>
								{product.title}
							</Heading>
							<Text
								fontWeight={'$bold'}
								fontSize={'$xl'}
								sx={{
									color: product.secondaryTextColor,
								}}
							>
								{product.subtitle}
							</Text>
						</VStack>
						<HStack>
							<Button
								rounded={'$full'}
								w={'auto'}
								alignSelf='center'
								onPress={() => console.log('route', product.route)}
								sx={{
									bg: product.buttonColor,
								}}
							>
								<Button.Text
									px={'$2'}
									sx={{
										color: product.buttonTextColor,
									}}
								>
									{product.buttoncta}
								</Button.Text>
							</Button>
						</HStack>
					</VStack>
				</Box>
			)
		case '_ad4':
			return (
				<Box
					bg={'$transparent'}
					sx={{
						w: width,
						h: CARD_HEIGHT,
						position: 'relative',
					}}
				>
					<VStack
						style={{
							position: 'relative',
							borderRadius: 16,
							margin: 19,
							flex: 1,
							backgroundColor: product.color1,
							justifyContent: 'space-between',
							overflow: 'hidden',
						}}
					>
						<Image source={product.cover} style={{ width: '100%', height: '100%' }} resizeMode='cover' />
						<HStack
							position='absolute'
							left={0}
							right={0}
							bottom={0}
							justifyContent='space-around'
							py={'$3'}
						>
							<Button
								rounded={'$full'}
								w={'auto'}
								alignSelf='center'
								zIndex={10}
								onPress={() => console.log('route', product.route)}
								sx={{
									bg: product.buttonColor,
								}}
							>
								<Button.Text
									px={'$2'}
									sx={{
										color: product.buttonTextColor,
									}}
								>
									{product.buttoncta}
								</Button.Text>
							</Button>
						</HStack>
					</VStack>
				</Box>
			)
		case '_ad5':
			return (
				<Box
					bg={'$transparent'}
					sx={{
						w: width,
						h: CARD_HEIGHT,
						position: 'relative',
					}}
				>
					<VStack
						p={'$3'}
						style={{
							position: 'relative',
							borderRadius: 16,
							margin: 19,
							flex: 1,
							backgroundColor: product.color1,
							justifyContent: 'space-between',
							alignItems: 'center',
							overflow: 'hidden',
						}}
					>
						<Image
							source={product.logo}
							resizeMode='contain'
							style={{ width: 150, height: 150, borderRadius: 15 }}
						/>
						<Heading
							fontSize={'$2xl'}
							fontWeight={'$extrabold'}
							textTransform='uppercase'
							// lineHeight={'$6xl'}
							allowFontScaling
							adjustsFontSizeToFit
							textAlign='center'
							sx={{
								color: product.primaryTextColor,
							}}
						>
							{product.title}
						</Heading>
						<Text
							// bg='$green300'
							fontSize={'$lg'}
							sx={{
								color: product.secondaryTextColor,
							}}
						>
							{product.subtitle}
						</Text>
						<HStack
							// position='absolute'
							// left={0}
							// right={0}
							// bottom={0}
							justifyContent='space-around'
							py={'$3'}
						>
							<Button
								rounded={'$full'}
								w={'auto'}
								alignSelf='center'
								zIndex={10}
								onPress={() => console.log('route', product.route)}
								sx={{
									bg: product.buttonColor,
								}}
							>
								<Button.Text
									px={'$2'}
									sx={{
										color: product.buttonTextColor,
									}}
								>
									{product.buttoncta}
								</Button.Text>
							</Button>
						</HStack>
					</VStack>
				</Box>
			)
	}
}

export default Card
