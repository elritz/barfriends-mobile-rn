import { Redirect } from "expo-router";
import React from "react";
export default function index() {
  const personal_username_misia = "misia";
  // const device_manager_profile_id = 'e90675d1-009f-4ca8-9d76-f163a885189f'
  const personal_username_ritz = "ritz";
  const device_manager_profile_id = "e90675d1-009f-4ca8-9d76-f163a885189f";

  //? Hometabs
  // return <Redirect href={'/brokenstate'} />
  return <Redirect href={'/(app)/hometab/venuefeed'} />
  //?? Convesations
  // return <Redirect href={"/(app)/hometab/conversations"} />;
  // return <Redirect href={{ pathname: '/(app)/conversation/[conversationid]', params: { conversationid: 'ce353001-e8d6-4175-ae25-9c37cbd742f0' } }} />
  // return <Redirect href={{ pathname: '/(app)/animatedconversation/[animatedconversationid]', params: { animatedconversationid: 'ce353001-e8d6-4175-ae25-9c37cbd742f0' } }} />
  //?? User profile
  // return <Redirect href={"/(app)/hometab/profilestack/userprofile"} />;
  // return <Redirect href={'/(app)/hometab/developmentstack/theme'} />

  //? Search Area
  // return <Redirect href={'/(app)/searcharea'} />
  // return <Redirect href={'/(app)/searcharea/searchcountry'} />
  //? Explore
  // return <Redirect href={'/(app)/explore/searchresults/?searchtext=cool'} />

  //? Modals
  // return <Redirect href={'/(app)/modal/asks/backgroundlocationnextask'} />
  // return <Redirect href={`/(app)/modal/devicemanager/${device_manager_profile_id}`} />

  // return <Redirect href={'/(app)/conversation'} />

  //? Credential
  // return <Redirect href={'/(credential)/personalcredentialstack/getstarted'} />
  // return <Redirect href={'/(credential)/personalcredentialstack/create'} />
  // return <Redirect href={'/(credential)/personalcredentialstack/name'} />
  // return <Redirect href={'/(credential)/personalcredentialstack/birthday'} />
  // return <Redirect href={'/(credential)/logincredentialstack/loginpassword'} />
  // return <Redirect href={'/(credential)/logincredentialstack/authenticator'} />

  //? Public
  // return <Redirect href={`/(app)/public/personal/${personal_username_misia}`} />
  // return <Redirect href={`/(app)/public/personal/${personal_username_ritz}`} />
  // return (
  //   <Redirect
  //     href={`/(app)/public/venue/cristian.tromp86`}
  //   />
  // );

  //? Broken state
  // console.log('LOAD BROKEN STATE RWHY NOT RENDER HERE:>> ',);
  // return (
  // 	<View style={{ flex: 1, backgroundColor: 'red' }}>
  // 		<Text>HEllo Workd</Text>
  // 	</View>
  // )
}

// const rTheme = useReactiveVar(ThemeReactiveVar)
// const [isLoading, setLoading] = useState(true)

// useRouterNotifications()

// const { data, loading, error } = useCheckPrivacyTermsDocumentUpdateQuery({
// 	onCompleted: data => {
// 		setTimeout(() => {
// 			setLoading(false)
// 		}, 500)
// 		if (
// 			data.checkPrivacyTermsDocumentUpdate.__typename === 'LatestPrivacyAndTermsDocumentResponse'
// 		) {
// 			TermsServiceReactiveVar({
// 				update: true,
// 			})
// 		}
// 		if (data.checkPrivacyTermsDocumentUpdate.__typename === 'Error') {
// 			TermsServiceReactiveVar({
// 				update: false,
// 			})
// 		}
// 	},
// })

// const styles = StyleSheet.create({
// 	dot: {
// 		height: size,
// 		width: size,
// 		borderRadius: size / 1.5,
// 		backgroundColor:
// 			rTheme.colorScheme === 'light'
// 				? rTheme.theme?.gluestack.tokens.colors.light200
// 				: rTheme.theme?.gluestack.tokens.colors.light800,
// 	},
// })
// const LoadingAnimationLocation = () => {
// 	return (
// 		<View
// 			// bg={'transparent'}
// 			style={[
// 				styles.dot,
// 				{
// 					marginTop: windowHeight - size / 2,
// 					marginLeft: '50%',
// 					transform: [{ translateX: -size / 2 }],
// 					alignContent: 'center',
// 					justifyContent: 'center',
// 				},
// 			]}
// 		>
// 			{[...Array(4).keys()].map((item, index) => {
// 				return (
// 					<MotiView
// 						key={uniqueId()}
// 						style={[styles.dot, StyleSheet.absoluteFillObject]}
// 						from={{
// 							opacity: 0.5,
// 							scale: 1,
// 						}}
// 						animate={{
// 							opacity: 0,
// 							scale: 2.5,
// 						}}
// 						transition={{
// 							type: 'timing',
// 							duration: 2000,
// 							easing: Easing.out(Easing.ease),
// 							loop: true,
// 							repeatReverse: true,
// 							delay: index * 600,
// 						}}
// 					/>
// 				)
// 			})}
// 		</View>
// 	)
// }

// if (!data || isLoading) {
// 	return (
// 		<View
// 			style={{
// 				flex: 1,
// 				alignContent: 'center',
// 				// marginTop: size * 1.5,
// 				backgroundColor:
// 					rTheme.colorScheme === 'light'
// 						? rTheme.theme?.gluestack.tokens.colors.light100
// 						: rTheme.theme?.gluestack.tokens.colors.light800,
// 			}}
// 		>
// 			<LoadingAnimationLocation />
// 		</View>
// 	)
// }
