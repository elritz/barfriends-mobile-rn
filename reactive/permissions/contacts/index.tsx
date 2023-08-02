import { makeVar } from '@apollo/client'
import { Contact, PermissionResponse } from 'expo-contacts'
import { PermissionStatus } from 'expo-permissions'

export const permissionContactsInitialState: PermissionResponse = {
	canAskAgain: false,
	expires: 'never',
	granted: false,
	status: PermissionStatus.UNDETERMINED,
}
export const ContactsInitialState: Contact[] | null = []

export const PermissionContactsReactiveVar = makeVar<PermissionResponse | null>(
	permissionContactsInitialState,
)

export const ContactsReactiveVar = makeVar<Contact[] | null>(ContactsInitialState)
