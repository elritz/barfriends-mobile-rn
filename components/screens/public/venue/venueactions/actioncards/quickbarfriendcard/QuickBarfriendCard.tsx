import { useReactiveVar } from '@apollo/client'
import { Box, Heading, Pressable, Text, VStack } from '@components/core'
import { useGetSecureFriendQrCodeDataQuery } from '@graphql/generated'
import { AuthorizationReactiveVar, PermissionCameraReactiveVar } from '@reactive'
import { useDisclose } from '@util/hooks/useDisclose'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { View } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

const LOGO_COASTER = require('../../../../../../../assets/images/company/company_coaster.png')

type Props = {
	qrcodesize: number
	logosize: number
	showIcon?: boolean | true
	color?: string
}

export default function QuickBarfriendCard({ qrcodesize, logosize, showIcon, color }: Props) {
	const router = useRouter()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rPermissionCamera = useReactiveVar(PermissionCameraReactiveVar)
	const { isOpen, onOpen, onClose } = useDisclose()
	const [dataQR, setDataQR] = useState('')

	const { data, loading, error } = useGetSecureFriendQrCodeDataQuery({
		onCompleted: data => {
			const dataQRString = JSON.stringify({
				dataHash: data.getSecureFriendQRCodeData,
				qrCodeProfileId: rAuthorizationVar?.DeviceProfile?.Profile?.id,
			})
			setDataQR(dataQRString)
		},
	})

	if (loading || !data || !dataQR) return null

	return (
		<View style={{ flex: 1 }}>
			<Heading fontWeight={'$black'} fontSize={'$lg'}>
				Add Bfs
			</Heading>
			<Pressable
				onPress={() =>
					rPermissionCamera?.granted
						? onOpen()
						: router.push({
								pathname: '(app)/permission/camera',
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
										logo={showIcon && LOGO_COASTER}
										logoSize={logosize}
										logoBackgroundColor={'transparent'}
									/>
								)}
							</VStack>
						</View>
					) : (
						<Box bg={'transparent'} flexDirection={'column'} justifyContent={'space-around'}>
							<Box bg={'transparent'}  alignItems={'center'} justifyContent={'center'}>
								<View>
									{dataQR && (
										<QRCode
											size={qrcodesize}
											value={dataQR}
											color={'#ff7000'}
											backgroundColor={'transparent'}
											logo={showIcon && LOGO_COASTER}
											logoSize={logosize}
											logoBackgroundColor={'transparent'}
										/>
									)}
								</View>
							</Box>
						</Box>
					)}
				</VStack>
			</Pressable>
		</View>
	)
}
