import { useReactiveVar } from '@apollo/client'
import { Box, Button, Heading, Icon, Pressable, SlashIcon, VStack } from '@gluestack-ui/themed'
import { useGetSecureFriendQrCodeDataLazyQuery } from '@graphql/generated'
import { AuthorizationReactiveVar, PermissionCameraReactiveVar } from '@reactive'
import { useDisclose } from '@util/hooks/useDisclose'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

const LOGO_COASTER = require('../../../../../../../assets/images/company/company_coaster.png')

type Props = {
	qrcodesize: number
	logosize?: number
	showIcon?: boolean
	color?: string
}

export default function QuickBarfriendCard({ qrcodesize, logosize, showIcon, color }: Props) {
	const router = useRouter()
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
					<Button.Text>Refresh</Button.Text>
				</Button>
			</View>
		)
	}
	return (
		<View style={{ flex: 1 }}>
			<Heading fontWeight={'$black'} fontSize={'$lg'}>
				Add Friend
			</Heading>
			<Pressable
				onPress={() =>
					rPermissionCamera?.granted
						? onOpen()
						: router.push({
								pathname: '/(app)/permission/camera',
						  })
				}
			>
				<VStack
					mt={'$2'}
					flexDirection={'column'}
					justifyContent={'space-around'}
					alignItems={'center'}
				>
					{rPermissionCamera?.granted ? (
						<View>
							<VStack alignItems={'center'} justifyContent={'center'}>
								{dataQR && (
									<QRCode
										size={qrcodesize}
										value={dataQR}
										color={color}
										backgroundColor={'transparent'}
										logo={showIcon ? LOGO_COASTER : null}
										logoSize={logosize}
										logoBackgroundColor={'transparent'}
									/>
								)}
							</VStack>
						</View>
					) : (
						<Box bg={'transparent'} flexDirection={'column'} justifyContent={'space-around'}>
							<Box bg={'transparent'} alignItems={'center'} justifyContent={'center'}>
								<>
									{dataQR && (
										<QRCode
											size={qrcodesize}
											value={dataQR}
											color={'#ff7000'}
											backgroundColor={'transparent'}
											logo={showIcon ? LOGO_COASTER : null}
											logoSize={logosize}
											logoBackgroundColor={'transparent'}
										/>
									)}
								</>
							</Box>
						</Box>
					)}
				</VStack>
			</Pressable>
		</View>
	)
}
