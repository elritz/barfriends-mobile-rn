// TODO: FN(What functionality was suppose to be here)
import { Box, Button, HStack, Heading, Text } from '@gluestack-ui/themed'
import { useUpdateProfilePrivacyTermsDocumentUpdateMutation } from '@graphql/generated'
import { Link, useRouter } from 'expo-router'

export default function TermsServices() {
	const router = useRouter()
	const [updateProfilePrivacyTermsDocuments, { data, loading, error }] =
		useUpdateProfilePrivacyTermsDocumentUpdateMutation({
			onCompleted: data => {
				if (data.updateProfilePrivacyTermsDocumentUpdate) {
					router.push({
						pathname: '/(app)/hometab/venuefeed',
					})
				}
			},
		})

	return (
		<Box flex={1} p={'$5'}>
			<Box mt={'45%'} bg='transparent' flex={1}>
				<Text fontSize={'$lg'}>Welcome to Revel</Text>
				<Heading fontSize={'$4xl'} lineHeight={'$3xl'}>
					Review the Terms &
				</Heading>
				<Heading fontSize={'$4xl'} lineHeight={'$3xl'}>
					Services
				</Heading>
				<Link href={'/(information)/latestprivacyservicetoptab'}>
					<Text fontSize={'$lg'}>
						By continuing, you agree to the
						<Text fontSize={'$lg'} fontWeight={'$bold'} color={'$primary500'}>
							{' '}
							Terms
						</Text>
						,
						<Text fontSize={'$lg'} fontWeight={'$bold'} color={'$primary500'}>
							{' '}
							Services{' '}
						</Text>
						and
						<Text fontSize={'$lg'} fontWeight={'$bold'} color={'$primary500'}>
							{' '}
							Privacy Policy
						</Text>
						.
					</Text>
				</Link>
				<HStack justifyContent='flex-end' mt={'$5'}>
					<Button
						onPress={() => {
							updateProfilePrivacyTermsDocuments()
						}}
						rounded={'$full'}
						alignSelf='center'
						size='lg'
					>
						<Button.Text mr={'$2'}>Continue</Button.Text>
						{loading && <Button.Spinner size={'small'} />}
					</Button>
				</HStack>
			</Box>
		</Box>
	)
}
