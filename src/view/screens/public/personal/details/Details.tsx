import React from 'react'

import {Profile} from '#/graphql/generated'
import {Heading} from '#/src/components/ui/heading'
import {Text} from '#/src/components/ui/text'
import {VStack} from '#/src/components/ui/vstack'
import {capitalizeFirstLetter} from '#/src/util/helpers/capitalizeFirstLetter'

type Props = {
  profile: Partial<Profile> | null | undefined
}

export default function Details({profile: item}: Props) {
  return (
    <VStack space={'md'} className="mt-3 flex-1">
      <Heading className="leading-xs text-lg">
        {capitalizeFirstLetter(item?.IdentifiableInformation?.fullname)}
      </Heading>
      <Text className="leading-xs text-sm font-bold">
        @{item?.IdentifiableInformation?.username}
      </Text>
    </VStack>
  )
}
