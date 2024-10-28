import {useEffect} from 'react'
import * as Notifications from 'expo-notifications'
import {useRouter} from 'expo-router'

export function useRouterNotifications() {
  const router = useRouter()
  useEffect(() => {
    let isMounted = true

    function processUrl(url: string) {
      // In case you need to modify the URL to make it relative.
      return url
    }

    // Handle URL from expo push notifications
    Notifications.getLastNotificationResponseAsync().then(response => {
      if (!isMounted) {
        return
      }
      const url = response?.notification.request.content.data.url

      if (url) {
        router.replace({pathname: `http${processUrl(url)}`})
      }
    })

    // Listen to expo push notifications
    const subscription = Notifications.addNotificationResponseReceivedListener(
      response => {
        const url = response.notification.request.content.data.url
        router.replace({pathname: `http${processUrl(url)}`})
      },
    )

    return () => {
      isMounted = false
      subscription.remove()
    }
  }, [])
}
