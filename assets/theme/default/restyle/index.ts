import { config } from '../../../../gluestack-ui.config'
import gluestack from '../gluestack'
import tokens from '@shopify/polaris-tokens'
import { BaseTheme } from '@shopify/restyle'

const restyle: BaseTheme = {
	...tokens,
	colors: {
		...tokens.color,
		...gluestack,
	},
	spacing: {
		...tokens.space,
		...config.tokens.space,
	},
	borderRadii: {
		...config.tokens.radii,
	},
	breakpoints: {
		...config.tokens.breakpoints,
	},
	zIndices: {},
}

export default restyle
