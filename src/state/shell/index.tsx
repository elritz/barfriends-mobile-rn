import React from 'react'
import {Provider as ShellLayoutProvder} from './shell-layout'
import ThemeLayoutProvder from './theme-layout'

export function Provider({children}: React.PropsWithChildren<{}>) {
  return (
    <ShellLayoutProvder>
      <ThemeLayoutProvder>{children}</ThemeLayoutProvder>
    </ShellLayoutProvder>
  )
}
