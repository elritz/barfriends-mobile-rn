import {uniqueId} from 'lodash'

import {Box} from '#/src/components/ui/box'

type Props = {
  children: React.ReactNode
  h?: number
}

export default function ActionCard({children, h}: Props) {
  return (
    <Box
      key={uniqueId()}
      style={{
        alignItems: 'center',
        height: h,
      }}
      className={`flex-1 justify-center rounded-lg bg-light-50 p-2 dark:bg-light-800`}>
      {children}
    </Box>
  )
}
