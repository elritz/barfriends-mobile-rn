import { useReactiveVar } from '@apollo/client'
import CompanyCoasterLogoDynamic from '@assets/images/company/CompanyCoasterLogoDynamic'
import TabBarIcon, { TabProps } from '@components/atoms/icons/tabbaricon/TabBarIcon'
import { ProfileType, useGetADeviceManagerQuery } from '@graphql/generated'
import { useNavigation } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { Image } from '@rneui/base'
import * as Haptics from 'expo-haptics'
import { useContext } from 'react'
import { Pressable, ActivityIndicator } from 'react-native'
import { ThemeContext } from 'styled-components/native'

const HEIGHT = 27

const ProfileTab = (props: TabProps) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const { data, loading, error } = useGetADeviceManagerQuery({
		skip: !rAuthorizationVar.id,
		fetchPolicy: 'network-only',
	})

	const onLongPressProfileIcon = async () => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
		if (rAuthorizationVar.id) {
			navigation.navigate('ModalNavigator', {
				screen: 'DeviceManagerModal',
			})
		} else {
			navigation.navigate('CredentialNavigator', {
				screen: 'PersonalCredentialStack',
				params: {
					screen: 'GetStartedScreen',
				},
			})
		}
	}

	return (
		<>
			<TabBarIcon
				color={props.color}
				icon={
					<Pressable
						delayLongPress={200}
						style={{ zIndex: 100 }}
						onPress={() =>
							navigation.navigate('HomeTabNavigator', {
								screen: 'ProfileStack',
								params: {
									screen: 'UserProfileScreen',
								},
							})
						}
						onLongPress={() => !loading && onLongPressProfileIcon()}
					>
						<>
							{rAuthorizationVar?.DeviceProfile?.Profile &&
							rAuthorizationVar?.DeviceProfile?.Profile?.photos.length ? (
								<Image
									source={{ uri: rAuthorizationVar.DeviceProfile.Profile.photos[0].url }}
									style={{
										width: HEIGHT,
										height: HEIGHT,
										borderRadius: 4,
										borderColor: props.color,
										borderWidth: 1.5,
									}}
									PlaceholderContent={<ActivityIndicator />}
								/>
							) : (
								<CompanyCoasterLogoDynamic
									width={HEIGHT}
									height={HEIGHT}
									iconColor={themeContext.palette.primary.background}
									backgroundColor={props.color}
								/>
							)}
						</>
					</Pressable>
				}
			/>
		</>
	)
}

export default ProfileTab
