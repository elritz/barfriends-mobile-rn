import {useEffect, useState} from 'react'
import {StyleSheet} from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import {BarCodeScanner} from 'expo-barcode-scanner'
import * as Haptics from 'expo-haptics'
import {useReactiveVar} from '@apollo/client'

import {
  useGetSecureFriendQrCodeDataQuery,
  useQrAddFriendMutation,
} from '#/graphql/generated'
import {AuthorizationReactiveVar, PermissionCameraReactiveVar} from '#/reactive'
import {Box} from '#/src/components/ui/box'
import {Button} from '#/src/components/ui/button'
import {Center} from '#/src/components/ui/center'
import {Modal} from '#/src/components/ui/modal'
import {Text} from '#/src/components/ui/text'

// const LOGO_COASTER = require("../../../../../../assets/images/company/company_coaster.png");

const CameraModal = ({isOpen, onOpen, onClose}) => {
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
  const rPermissionCamera = useReactiveVar(PermissionCameraReactiveVar)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [scanned, setScanned] = useState(false)
  const [dataQR, setDataQR] = useState('')

  useEffect(() => {
    const getBarCodeScannerPerm = async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync()

      setHasPermission(status === 'granted')
    }
    // ;(async () => {
    // 	const digest = await Crypto.digestStringAsync(
    // 		Crypto.CryptoDigestAlgorithm.SHA256,
    // 		JSON.stringify({ profileid: rAuthorizationVar?.Profile?.id }),
    // 	)
    // 	/* Some crypto operation... */
    // })()
    getBarCodeScannerPerm()
  }, [])

  const {
    data: dataGSFQRCD,
    loading: loadingGSFQRCD,
    error: errorGSFQRCD,
  } = useGetSecureFriendQrCodeDataQuery({
    onCompleted: data => {
      const dataQRString = JSON.stringify({
        dataHash: data.getSecureFriendQRCodeData,
        qrCodeProfileId: rAuthorizationVar?.Profile?.id,
      })
      setDataQR(dataQRString)
    },
  })

  const [QRAddFriendMutation, {data, loading, error}] = useQrAddFriendMutation({
    onCompleted: async data => {
      onClose()
    },
  })

  const handleBarCodeScanned = async ({type, data}) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    const dataParsed = JSON.parse(data)

    QRAddFriendMutation({
      variables: {
        qrCodeProfileId: dataParsed.qrCodeProfileId,
        dataHash: dataParsed.dataHash,
      },
    })

    setScanned(true)
    setTimeout(async () => {
      setScanned(false),
        onClose(),
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }, 1000)

    // alert(`Bar code with type ${type} and data ${data} has been scanned!`)
  }

  if (loadingGSFQRCD || !dataGSFQRCD) return null

  return (
    <Center>
      {/* <Modal isOpen={isOpen} onClose={onClose}>
				<Modal.Content h={'70%'} w={'95%'}>
					<Modal.CloseButton />
					{rPermissionCamera?.granted && (
						<BarCodeScanner
							type={'back'}
							onBarCodeScanned={async data => (scanned ? undefined : await handleBarCodeScanned(data))}
							style={StyleSheet.absoluteFillObject}
						/>
					)}
					<Box
						bg='$transparent'
						sx={{ h: '100%' }}
						alignItems={'center'}
						justifyContent={'flex-end'}
						pb={'$4'}
					>
						<Box p={'$3'} borderRadius={'$md'} bg={'$light900'}>
							{dataQR && (
								<QRCode
									size={120}
									value={dataQR}
									backgroundColor='transparent'
									color={'#ff7000'}
									logo={LOGO_COASTER}
									logoSize={40}
									logoBackgroundColor='transparent'
								/>
							)}
						</Box>
					</Box>
					<Modal.Footer>
						<Button variant='link' mr='$1' onPress={onClose}>
							<Text>Cancel</Text>
						</Button>
						<Button bg='$error500' onPress={onClose}>
							<Text>Delete</Text>
						</Button>
					</Modal.Footer>
				</Modal.Content>
			</Modal> */}
    </Center>
  )
}

export default CameraModal
