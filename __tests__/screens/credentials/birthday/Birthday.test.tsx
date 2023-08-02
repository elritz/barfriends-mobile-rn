import BirthdayScreen from '@app/(app)/credential/personalcredentialstack/birthday'
import { render, screen, fireEvent, within } from '@testing-library/react-native'

test('examples of some things', async () => {
	render(<BirthdayScreen />)
	const { getByText } = within(screen.getByTestId('title-text'))

	expect(getByText('expectedtitle'))
})
