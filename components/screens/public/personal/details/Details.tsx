import { Heading, Text, VStack } from '@components/core'
import { Profile } from '@graphql/generated'
import { capitalizeFirstLetter } from '@util/@fn/capitalizeFirstLetter'
import React, { useState } from 'react'

type Props = {
	profile: Profile
}

export default function Details({ profile: item }: Props) {
	return (
		<VStack flex={1} space={'md'} mt={'$3'}>
			<Heading fontSize={'$lg'} lineHeight={'$xs'}>
				{capitalizeFirstLetter(item?.IdentifiableInformation?.fullname)}
			</Heading>
			<Text lineHeight={'$xs'} fontWeight={'$bold'} fontSize={'$sm'}>
				@{item?.IdentifiableInformation?.username}
			</Text>
		</VStack>
	)
}
