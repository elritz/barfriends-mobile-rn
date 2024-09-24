import GoBack from '../GoBack'
import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { ThemeReactiveVar } from '#/reactive'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

const ChevronBackArrow = () => {
	const rTheme = useReactiveVar(ThemeReactiveVar)

	return (
        <GoBack height={parseInt(wp(10).toFixed(0))} width={parseInt(wp(6).toFixed(0))}>
            <Ionicons
				name='chevron-back-outline'
				size={35}
				color={
					rTheme.colorScheme === 'light'
						? rTheme.theme?.gluestack.tokens.colors.light900
						: rTheme.theme?.gluestack.tokens.colors.light100
				}
			/>
        </GoBack>
    );
}

export default ChevronBackArrow
