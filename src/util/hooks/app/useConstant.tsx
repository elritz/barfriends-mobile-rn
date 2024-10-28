import Constants from 'expo-constants'
import {AppManifest} from 'expo-constants/build/Constants.types'

const constantInstallationId = (): string => Constants.sessionId

const constantsManifest = (): AppManifest | null => Constants.manifest

export {constantInstallationId, constantsManifest}
