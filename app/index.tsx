import {Redirect} from 'expo-router'

export default function index() {
  // const personal_username_misia = 'misia'
  // const device_manager_profile_id = 'e90675d1-009f-4ca8-9d76-f163a885189f'
  // const personal_username_ritz = 'ritz'
  // const device_manager_profile_id = 'e90675d1-009f-4ca8-9d76-f163a885189f'

  //? Hometabs
  // return <Redirect href={"/brokenstate"} />;
  // return <Redirect href={'/(app)/hometab/venuefeed'} />
  // return <Redirect href={"/(app)/hometab/tonight"} />;
  //?? Hometabs > Convesations
  // return <Redirect href={"/(app)/hometab/conversations"} />;
  // return <Redirect href={{ pathname: '/(app)/conversation/[conversationid]', params: { conversationid: 'ce353001-e8d6-4175-ae25-9c37cbd742f0' } }} />
  // return <Redirect href={{ pathname: '/(app)/animatedconversation/[animatedconversationid]', params: { animatedconversationid: 'ce353001-e8d6-4175-ae25-9c37cbd742f0' } }} />
  //?  Hometabs > User profile
  return <Redirect href={'/(app)/hometab/profilestack/personalprofile'} />
  // return <Redirect href={'/(app)/hometab/developmentstack'} />
  //?? Permission
  // return <Redirect href={'/(app)/permission/backgroundlocation'} />
  // return <Redirect href={'/(app)/permission/camera'} />
  // return <Redirect href={'/(app)/permission/contacts'} />
  // return <Redirect href={'/(app)/permission/foregroundlocation'} />
  // return <Redirect href={'/(app)/permission/medialibrary'} />
  // return <Redirect href={'/(app)/permission/microphone'} />
  // return <Redirect href={'/(app)/permission/networkinformation'} />
  // return <Redirect href={'/(app)/permission/notifications'} />

  //? Search Area
  // return <Redirect href={'/(app)/searcharea'} />
  // return <Redirect href={'/(app)/searcharea/searchcountry'} />
  //? Explore
  // return <Redirect href={'/(app)/explore/searchresults/?searchtext=cool'} />

  //? Modals
  // return <Redirect href={`/(app)/modal/devicemanager/${device_manager_profile_id}`} />

  // return <Redirect href={'/(app)/conversation'} />

  //? Credential
  // return <Redirect href={'/(credential)/personalcredentialstack/getstarted'} />
  // return <Redirect href={'/(credential)/personalcredentialstack/phone'} />
  // return <Redirect href={'/(credential)/personalcredentialstack/email'} />
  // return <Redirect href={'/(credential)/personalcredentialstack/name'} />
  // return <Redirect href={'/(credential)/personalcredentialstack/username'} />
  // return <Redirect href={'/(credential)/personalcredentialstack/password'} />
  // return <Redirect href={'/(credential)/personalcredentialstack/create'} />
  // return <Redirect href={'/(credential)/personalcredentialstack/birthday'} />

  // return <Redirect href={'/(credential)/logincredentialstack/authenticator'} />
  // return <Redirect href={'/(credential)/logincredentialstack/loginpassword'} />

  //? Public
  // return <Redirect href={`/(app)/public/personal/${personal_username_misia}`} />
  // return <Redirect href={`/(app)/public/personal/${personal_username_ritz}`} />
  // return (
  //   <Redirect
  //     href={`/(app)/public/venue/cristian.tromp86`}
  //   />
  // );

  //? Broken state
  // console.log("LOAD BROKEN STATE RWHY NOT RENDER HERE:>> ");
  // return (
  //   <View style={{flex: 1, backgroundColor: 'blue'}}>
  //     <Text>HEllo Workd</Text>
  //   </View>
  // )
}
