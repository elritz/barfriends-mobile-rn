import { Text } from "#/components/ui/text";
import { Heading } from "#/components/ui/heading";
import { HStack } from "#/components/ui/hstack";
import { Button, ButtonText, ButtonSpinner } from "#/components/ui/button";
import { Box } from "#/components/ui/box";
import { useUpdateProfilePrivacyTermsDocumentUpdateMutation } from '#/graphql/generated'
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
        <Box className="flex-1 p-5">
            <Box className="mt-[45%] bg-transparent flex-1">
				<Text className="text-lg">Welcome to Barfriends</Text>
				<Heading className="text-4xl leading-3xl">
					Review the Terms &
				</Heading>
				<Heading className="text-4xl leading-3xl">
					Services
				</Heading>
				<Link href={'/(information)/latestprivacyservicetoptab'}>
					<Text className="text-lg">
						By continuing, you agree to the
						<Text className="text-lg font-bold text-primary-500">
							{' '}
							Terms
						</Text>
						,
						<Text className="text-lg font-bold text-primary-500">
							{' '}
							Services{' '}
						</Text>
						and
						<Text className="text-lg font-bold text-primary-500">
							{' '}
							Privacy Policy
						</Text>
						.
					</Text>
				</Link>
				<HStack className="justify-end mt-5">
					<Button
                        onPress={() => {
							updateProfilePrivacyTermsDocuments()
						}}
                        size='lg'
                        className="rounded-full self-center">
						<ButtonText className="mr-2">Continue</ButtonText>
						{loading && <ButtonSpinner size={'small'} />}
					</Button>
				</HStack>
			</Box>
        </Box>
    );
}
