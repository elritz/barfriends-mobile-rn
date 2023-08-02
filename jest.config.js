module.exports = {
	preset: 'jest-expo',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
	setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
}
