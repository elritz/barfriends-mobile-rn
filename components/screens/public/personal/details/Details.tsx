import { Heading, Text, VStack } from '@gluestack-ui/themed'
import { Profile } from '@graphql/generated'
import { capitalizeFirstLetter } from '@util/helpers/capitalizeFirstLetter'
import React, { useState } from 'react'

type Props = {
	profile: Partial<Profile> | null | undefined
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
