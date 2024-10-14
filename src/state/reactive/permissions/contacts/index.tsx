import { makeVar } from "@apollo/client";
import {
  InitialStateContacts,
  InitialStatePermissionContacts,
} from "#/src/constants/Preferences";
import { Contact, PermissionResponse } from "expo-contacts";

export const PermissionContactsReactiveVar = makeVar<PermissionResponse | null>(
  InitialStatePermissionContacts,
);

export const ContactsReactiveVar = makeVar<Contact[] | null>(
  InitialStateContacts,
);
