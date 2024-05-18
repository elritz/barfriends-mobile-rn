import { useReactiveVar } from '@apollo/client'
import { FontAwesome5 } from '@expo/vector-icons'
import {
	Box,
	Button,
	ButtonText,
	Heading,
	Icon,
	Pressable,
	SlashIcon,
	VStack,
} from '@gluestack-ui/themed'
import { useGetSecureFriendQrCodeDataLazyQuery } from '#/graphql/generated'
import { AuthorizationReactiveVar, PermissionCameraReactiveVar, ThemeReactiveVar } from '#/reactive'
import { useDisclose } from '#/util/hooks/useDisclose'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

const LOGO_COASTER = require('../../../../../../../assets/images/company/company_coaster.png')

type Props = {
	qrcodesize: number
	logosize?: number
	showIcon?: boolean
	color?: string | undefined
}

export default function QuickBarfriendCard({ qrcodesize, logosize, showIcon, color }: Props) {
	const router = useRouter()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rPermissionCamera = useReactiveVar(PermissionCameraReactiveVar)
	const { isOpen, onOpen, onClose } = useDisclose()
	const [dataQR, setDataQR] = useState('')
	const [retryCount, setRetryCount] = useState(0)

	const [getSecureFriendCodeQrData, { data, loading, error }] =
		useGetSecureFriendQrCodeDataLazyQuery({
			onCompleted: data => {
				const dataQRString = JSON.stringify({
					dataHash: data.getSecureFriendQRCodeData,
					qrCodeProfileId: rAuthorizationVar?.Profile?.id,
				})
				setDataQR(dataQRString)
			},
			onError: err => {
				setRetryCount(prevCount => prevCount + 1)
			},
		})

	useEffect(() => {
		getSecureFriendCodeQrData()
	}, [])

	if (loading) return null

	if (error || !dataQR) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Icon as={SlashIcon} w='$7' h='$7' color={'$error500'} />
				<Heading fontWeight={'$black'} textAlign='center' fontSize={'$lg'} lineHeight={'$md'}>
					QR code not generated
				</Heading>
				<Button variant='link' onPress={() => getSecureFriendCodeQrData()} disabled={retryCount > 5}>
					<ButtonText>Refresh</ButtonText>
				</Button>
			</View>
		)
	}
	return (
		<View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
			<Pressable
				style={{ alignItems: 'center', justifyContent: 'center' }}
				onPress={() =>
					rPermissionCamera?.granted
						? onOpen()
						: router.push({
							pathname: '/(app)/permission/camera',
						})
				}
			>
				<Box bg='$primary400' h={'$16'} w={'$16'} alignItems='center' justifyContent='center' rounded={'$md'}>
					<FontAwesome5
						name={'user'}
						size={30}
						color={
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light900
								: rTheme.theme?.gluestack.tokens.colors.light100
						}
					/>
				</Box>
				<Heading
					mt={'$3'}
					textAlign={'center'}
					fontSize={'$lg'}
					fontWeight={'$black'}
					textTransform={'uppercase'}
					lineHeight={'$lg'}
				>
					Add Friends
				</Heading>
				<VStack
					mt={'$2'}
					flexDirection={'column'}
					justifyContent={'space-around'}
					alignItems={'center'}
				>
				</VStack>
			</Pressable>
		</View>
	)
}
