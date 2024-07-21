import { VStack } from "#/components/ui/vstack";
import { Text } from "#/components/ui/text";
import { Heading } from "#/components/ui/heading";
import { Profile } from '#/graphql/generated'
import { capitalizeFirstLetter } from '#/util/helpers/capitalizeFirstLetter'
import React, { useState } from 'react'

type Props = {
	profile: Partial<Profile> | null | undefined
}

export default function Details({ profile: item }: Props) {
	return (
        <VStack space={'md'} className="flex-1 mt-3">
            <Heading className="text-lg leading-xs">
				{capitalizeFirstLetter(item?.IdentifiableInformation?.fullname)}
			</Heading>
            <Text className="leading-xs font-bold text-sm">
				@{item?.IdentifiableInformation?.username}
			</Text>
        </VStack>
    );
}
