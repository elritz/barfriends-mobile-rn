import { useReactiveVar } from '@apollo/client'
import { defaulttheme } from '#/assets/theme/default'
import { ThemeReactiveVar } from '#/reactive'
import { Path, Svg } from 'react-native-svg'

interface Props {
	width?: number
	height?: number
	backgroundColor?: string
	iconColor?: string
}

const CompanyCoasterLogoDynamicInverse: React.FC<Props> = ({
	width = 100,
	height = 100,
	backgroundColor = ThemeReactiveVar().colorScheme === 'light' ? 'white' : 'black',
	iconColor = defaulttheme.barfriends.dark.primary,
}: Props) => {
	return (
        <Svg
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			fill='none'
			viewBox='0 0 520 520'
		>
            <Path
				fill={backgroundColor}
				fillRule='evenodd'
				d='M85 0h330c46.944 0 85 38.056 85 85v330c0 46.944-38.056 85-85 85H85c-46.944 0-85-38.056-85-85V85C0 38.056 38.056 0 85 0Zm323.325 257.618.023.049c2.204 7.659 4.294 15.9 5.917 22.3v.001l.001.002c1.209 4.768 2.159 8.512 2.703 10.231.296 1.972-1.576 2.842-3.107 1.972-2.503-2.164-10.498-12.785-15.501-19.472-1.774-2.456-3.858-1.697-4.671-1.15-1.438 2.03-3.124 4.702-5.113 7.854-16.232 25.73-52.636 83.436-139.347 84.595-86.268-.96-123.194-59.648-139.529-85.611-1.67-2.653-3.124-4.965-4.394-6.838-.801-.596-2.778-1.123-4.364.779l-.326.436c-2.7 3.613-12.947 17.326-15.48 19.407-2.21 1.182-3.421-.974-3.08-2.026 1.501-4.433 2.83-9.967 4.203-15.681 1.4-5.825 2.844-11.837 4.56-17.059 2.072-4.845 5.655-7.462 10.534-8.375 2.88-.391 6.043-.214 9.73 2.213 61.272 40.628 124.199 41.216 134.904 41.124 73.019 1.989 126.667-31.541 142.33-41.33.454-.284.876-.548 1.266-.79 2.257-.999 4.352-1.425 5.878-1.365 8.815.147 11.681 6.226 12.863 8.734Zm-203.259-15.554c16.713 0 30.261-23.743 30.261-53.032 0-29.289-13.548-53.032-30.261-53.032s-30.261 23.743-30.261 53.032c0 29.289 13.548 53.032 30.261 53.032Zm56.293-53.032c0 29.289 13.548 53.032 30.261 53.032s30.261-23.743 30.261-53.032c0-29.289-13.548-53.032-30.261-53.032s-30.261 23.743-30.261 53.032Z'
				clipRule='evenodd'
			/>
        </Svg>
    );
}

export default CompanyCoasterLogoDynamicInverse
