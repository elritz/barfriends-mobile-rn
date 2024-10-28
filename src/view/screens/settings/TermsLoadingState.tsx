import {useReactiveVar} from '@apollo/client'
import {Skeleton} from 'moti/skeleton'

import {ThemeReactiveVar} from '#/reactive'
import {VStack} from '#/src/components/ui/vstack'

export default function TermsLoadingState() {
  const rTheme = useReactiveVar(ThemeReactiveVar)

  return (
    <VStack space={'lg'} className="my-5 rounded-md px-2">
      <Skeleton
        height={10}
        width={'75%'}
        radius={15}
        colorMode={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
        colors={
          rTheme.colorScheme === 'light'
            ? [
                String(rTheme.theme?.gluestack.tokens.colors.light100),
                String(rTheme.theme?.gluestack.tokens.colors.light300),
              ]
            : [
                String(rTheme.theme?.gluestack.tokens.colors.light900),
                String(rTheme.theme?.gluestack.tokens.colors.light700),
              ]
        }
      />
      {[...Array(4)].map(item => {
        return (
          <Skeleton
            key={item}
            height={10}
            width={'75%'}
            radius={15}
            colorMode={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
            colors={
              rTheme.colorScheme === 'light'
                ? [
                    String(rTheme.theme?.gluestack.tokens.colors.light100),
                    String(rTheme.theme?.gluestack.tokens.colors.light300),
                  ]
                : [
                    String(rTheme.theme?.gluestack.tokens.colors.light900),
                    String(rTheme.theme?.gluestack.tokens.colors.light700),
                  ]
            }
          />
        )
      })}
    </VStack>
  )
}
