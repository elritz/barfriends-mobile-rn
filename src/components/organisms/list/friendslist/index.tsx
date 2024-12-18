import {useReactiveVar} from '@apollo/client'
import {useWindowDimensions} from 'react-native'

import {AuthorizationReactiveVar} from '#/reactive'
import {CardFullImageNameEmoji} from '#/src/components/molecules/personal/CardFullImageNameEmoji'
import {Divider} from '#/src/components/ui/divider'
import {HStack} from '#/src/components/ui/hstack'
import {VStack} from '#/src/components/ui/vstack'

const numColumns = 3

export const FriendsList = ({}) => {
  const {width} = useWindowDimensions()
  const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
  const cardWidth = (width * 0.9) / numColumns

  const friendslist = rAuthorizationVar?.Profile?.Relationships

  if (!friendslist) return null

  return (
    <VStack className="flex-column mx-1 h-[100%] flex-1">
      {friendslist.length ? (
        <>
          <HStack className="flex-wrap justify-start">
            {friendslist.map((item, index) => {
              return (
                <CardFullImageNameEmoji
                  key={index}
                  cardWidth={cardWidth}
                  item={item}
                />
              )
            })}
          </HStack>
          <Divider style={{marginVertical: 10}} />
        </>
      ) : null}
    </VStack>
  )
}
