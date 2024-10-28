import {Dimensions} from 'react-native'
import {Skeleton} from 'moti/skeleton'

import {Center} from '#/src/components/ui/center'
import {HStack} from '#/src/components/ui/hstack'
import {VStack} from '#/src/components/ui/vstack'

export default function SkeletonVenuesHomeScreen() {
  const {width} = Dimensions.get('window')

  const loadingSkelWidth = width / 2.15

  return (
    <Center>
      <VStack space={'md'}>
        {[...Array(6)].map(({_, index: array1Index}) => {
          return (
            <HStack key={array1Index} space={'md'} className="overflow-hidden">
              {[...Array(2)].map((__, index) => {
                return (
                  <Skeleton
                    key={index}
                    radius={'round'}
                    boxHeight={280}
                    width={loadingSkelWidth}
                  />
                )
              })}
            </HStack>
          )
        })}
      </VStack>
    </Center>
  )
}
