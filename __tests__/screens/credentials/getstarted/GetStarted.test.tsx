import GetStartedScreen from '@screens/credential/getstarted/GetStartedScreen'
import { render, screen, fireEvent, within } from '@testing-library/react-native'

test('examples of some things', async () => {
	const expectedtitle = "Let's Fucking Gooooooo out tonight!"
	render(<GetStartedScreen />)

	const { getByText } = within(screen.getByTestId('title-text'))
	expect(getByText('expectedtitle')).toHaveTextContent(expectedtitle)
})
