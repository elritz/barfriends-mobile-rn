import {VStack} from '#/src/components/ui/vstack'
import {Text} from '#/src/components/ui/text'
import {Pressable} from '#/src/components/ui/pressable'
import {Heading} from '#/src/components/ui/heading'
import {HStack} from '#/src/components/ui/hstack'
import {Box} from '#/src/components/ui/box'
import JoinCard from './joincard/JoinCard'
import LeaveAllCard from './leaveallcard/LeaveAllCard'
import LeaveJoinCard from './leavejoinedcard/LeaveJoinedCard'
import LeaveTotalCard from './leavetotalcard/LeaveTotalCard'
import TotalCard from './totalcard/TotalCard'
import {useState} from 'react'

export default function DevActions() {
  const [showDevMode, setShowDevMode] = useState(false)

  return (
    <VStack space={'md'} className="justify-between">
      <Box className="w-[90%]">
        <Pressable onPress={() => setShowDevMode(!showDevMode)}>
          <>
            <Heading className="font-800 text-center text-lg uppercase">
              You are in {'\n'}
              <Heading className="text-center font-black text-green-400">
                Dev Mode!
              </Heading>
            </Heading>
            <Text className="text-md mx-2 text-center">
              This section is for quick actions that we may need for testing! As
              developers!
            </Text>
          </>
        </Pressable>
        <VStack>
          <HStack
            space={'sm'}
            className="mx-1 flex-wrap justify-around pb-2 pt-2">
            <TotalCard />
            <JoinCard />
            <LeaveJoinCard />
            <LeaveTotalCard />
            <LeaveAllCard />
          </HStack>
        </VStack>
      </Box>
    </VStack>
  )
}
