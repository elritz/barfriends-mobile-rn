import { makeVar } from "@apollo/client";
import { InitialStateTermsService } from "#/src/constants/Preferences";
import { TermsServiceType } from "#/types/app";

export const TermsServiceReactiveVar = makeVar<TermsServiceType>(
  InitialStateTermsService,
);
