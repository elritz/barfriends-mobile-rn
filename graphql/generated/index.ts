import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Json: any;
};

export type AdAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type AdCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type AdCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type AdCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type Address = {
  __typename?: 'Address';
  AddressComponents: Array<AddressComponent>;
  createdAt: Scalars['DateTime'];
  formattedAddress: Scalars['String'];
  id: Scalars['ID'];
  Location: Array<Location>;
  updatedAt: Scalars['DateTime'];
};


export type AddressAddressComponentsArgs = {
  cursor?: InputMaybe<AddressComponentWhereUniqueInput>;
  distinct?: InputMaybe<Array<AddressComponentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AddressComponentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AddressComponentWhereInput>;
};


export type AddressLocationArgs = {
  cursor?: InputMaybe<LocationWhereUniqueInput>;
  distinct?: InputMaybe<Array<LocationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<LocationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<LocationWhereInput>;
};

export type AddressComponent = {
  __typename?: 'AddressComponent';
  Address?: Maybe<Address>;
  addressId?: Maybe<Scalars['String']>;
  h3Index15?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  long_name: Scalars['String'];
  short_name: Scalars['String'];
  types: Array<Scalars['String']>;
};

export type AddressComponentAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type AddressComponentCountOrderByAggregateInput = {
  addressId?: InputMaybe<SortOrder>;
  h3Index15?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  long_name?: InputMaybe<SortOrder>;
  short_name?: InputMaybe<SortOrder>;
  types?: InputMaybe<SortOrder>;
};

export type AddressComponentCreateInput = {
  Address?: InputMaybe<AddressCreateNestedOneWithoutAddressComponentsInput>;
  h3Index15?: InputMaybe<Scalars['String']>;
  long_name: Scalars['String'];
  short_name: Scalars['String'];
  types?: InputMaybe<Array<Scalars['String']>>;
};

export type AddressComponentCreateManyAddressInput = {
  h3Index15?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  long_name: Scalars['String'];
  short_name: Scalars['String'];
  types?: InputMaybe<Array<Scalars['String']>>;
};

export type AddressComponentCreateManyAddressInputEnvelope = {
  data: Array<AddressComponentCreateManyAddressInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type AddressComponentCreateManyInput = {
  addressId?: InputMaybe<Scalars['String']>;
  h3Index15?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  long_name: Scalars['String'];
  short_name: Scalars['String'];
  types?: InputMaybe<Array<Scalars['String']>>;
};

export type AddressComponentCreateNestedManyWithoutAddressInput = {
  connect?: InputMaybe<Array<AddressComponentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AddressComponentCreateOrConnectWithoutAddressInput>>;
  create?: InputMaybe<Array<AddressComponentCreateWithoutAddressInput>>;
  createMany?: InputMaybe<AddressComponentCreateManyAddressInputEnvelope>;
};

export type AddressComponentCreateOrConnectWithoutAddressInput = {
  create: AddressComponentCreateWithoutAddressInput;
  where: AddressComponentWhereUniqueInput;
};

export type AddressComponentCreatetypesInput = {
  set: Array<Scalars['String']>;
};

export type AddressComponentCreateWithoutAddressInput = {
  h3Index15?: InputMaybe<Scalars['String']>;
  long_name: Scalars['String'];
  short_name: Scalars['String'];
  types?: InputMaybe<Array<Scalars['String']>>;
};

export type AddressComponentListRelationFilter = {
  every?: InputMaybe<AddressComponentWhereInput>;
  none?: InputMaybe<AddressComponentWhereInput>;
  some?: InputMaybe<AddressComponentWhereInput>;
};

export type AddressComponentMaxOrderByAggregateInput = {
  addressId?: InputMaybe<SortOrder>;
  h3Index15?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  long_name?: InputMaybe<SortOrder>;
  short_name?: InputMaybe<SortOrder>;
};

export type AddressComponentMinOrderByAggregateInput = {
  addressId?: InputMaybe<SortOrder>;
  h3Index15?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  long_name?: InputMaybe<SortOrder>;
  short_name?: InputMaybe<SortOrder>;
};

export type AddressComponentOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type AddressComponentOrderByWithAggregationInput = {
  _avg?: InputMaybe<AddressComponentAvgOrderByAggregateInput>;
  _count?: InputMaybe<AddressComponentCountOrderByAggregateInput>;
  _max?: InputMaybe<AddressComponentMaxOrderByAggregateInput>;
  _min?: InputMaybe<AddressComponentMinOrderByAggregateInput>;
  _sum?: InputMaybe<AddressComponentSumOrderByAggregateInput>;
  addressId?: InputMaybe<SortOrder>;
  h3Index15?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  long_name?: InputMaybe<SortOrder>;
  short_name?: InputMaybe<SortOrder>;
  types?: InputMaybe<SortOrder>;
};

export type AddressComponentOrderByWithRelationInput = {
  Address?: InputMaybe<AddressOrderByWithRelationInput>;
  addressId?: InputMaybe<SortOrder>;
  h3Index15?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  long_name?: InputMaybe<SortOrder>;
  short_name?: InputMaybe<SortOrder>;
  types?: InputMaybe<SortOrder>;
};

export enum AddressComponentScalarFieldEnum {
  AddressId = 'addressId',
  H3Index15 = 'h3Index15',
  Id = 'id',
  LongName = 'long_name',
  ShortName = 'short_name',
  Types = 'types'
}

export type AddressComponentScalarWhereInput = {
  addressId?: InputMaybe<StringNullableFilter>;
  AND?: InputMaybe<Array<AddressComponentScalarWhereInput>>;
  h3Index15?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  long_name?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<AddressComponentScalarWhereInput>>;
  OR?: InputMaybe<Array<AddressComponentScalarWhereInput>>;
  short_name?: InputMaybe<StringFilter>;
  types?: InputMaybe<StringNullableListFilter>;
};

export type AddressComponentScalarWhereWithAggregatesInput = {
  addressId?: InputMaybe<StringNullableWithAggregatesFilter>;
  AND?: InputMaybe<Array<AddressComponentScalarWhereWithAggregatesInput>>;
  h3Index15?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  long_name?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<AddressComponentScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<AddressComponentScalarWhereWithAggregatesInput>>;
  short_name?: InputMaybe<StringWithAggregatesFilter>;
  types?: InputMaybe<StringNullableListFilter>;
};

export type AddressComponentSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type AddressComponentUpdateInput = {
  Address?: InputMaybe<AddressUpdateOneWithoutAddressComponentsNestedInput>;
  h3Index15?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  long_name?: InputMaybe<StringFieldUpdateOperationsInput>;
  short_name?: InputMaybe<StringFieldUpdateOperationsInput>;
  types?: InputMaybe<Array<Scalars['String']>>;
};

export type AddressComponentUpdateManyMutationInput = {
  h3Index15?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  long_name?: InputMaybe<StringFieldUpdateOperationsInput>;
  short_name?: InputMaybe<StringFieldUpdateOperationsInput>;
  types?: InputMaybe<Array<Scalars['String']>>;
};

export type AddressComponentUpdateManyWithoutAddressNestedInput = {
  connect?: InputMaybe<Array<AddressComponentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AddressComponentCreateOrConnectWithoutAddressInput>>;
  create?: InputMaybe<Array<AddressComponentCreateWithoutAddressInput>>;
  createMany?: InputMaybe<AddressComponentCreateManyAddressInputEnvelope>;
  delete?: InputMaybe<Array<AddressComponentWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AddressComponentScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AddressComponentWhereUniqueInput>>;
  set?: InputMaybe<Array<AddressComponentWhereUniqueInput>>;
  update?: InputMaybe<Array<AddressComponentUpdateWithWhereUniqueWithoutAddressInput>>;
  updateMany?: InputMaybe<Array<AddressComponentUpdateManyWithWhereWithoutAddressInput>>;
  upsert?: InputMaybe<Array<AddressComponentUpsertWithWhereUniqueWithoutAddressInput>>;
};

export type AddressComponentUpdateManyWithWhereWithoutAddressInput = {
  data: AddressComponentUpdateManyMutationInput;
  where: AddressComponentScalarWhereInput;
};

export type AddressComponentUpdatetypesInput = {
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type AddressComponentUpdateWithoutAddressInput = {
  h3Index15?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  long_name?: InputMaybe<StringFieldUpdateOperationsInput>;
  short_name?: InputMaybe<StringFieldUpdateOperationsInput>;
  types?: InputMaybe<Array<Scalars['String']>>;
};

export type AddressComponentUpdateWithWhereUniqueWithoutAddressInput = {
  data: AddressComponentUpdateWithoutAddressInput;
  where: AddressComponentWhereUniqueInput;
};

export type AddressComponentUpsertWithWhereUniqueWithoutAddressInput = {
  create: AddressComponentCreateWithoutAddressInput;
  update: AddressComponentUpdateWithoutAddressInput;
  where: AddressComponentWhereUniqueInput;
};

export type AddressComponentWhereInput = {
  Address?: InputMaybe<AddressWhereInput>;
  addressId?: InputMaybe<StringNullableFilter>;
  AND?: InputMaybe<Array<AddressComponentWhereInput>>;
  h3Index15?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  long_name?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<AddressComponentWhereInput>>;
  OR?: InputMaybe<Array<AddressComponentWhereInput>>;
  short_name?: InputMaybe<StringFilter>;
  types?: InputMaybe<StringNullableListFilter>;
};

export type AddressComponentWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type AddressCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  formattedAddress?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type AddressCreateInput = {
  AddressComponents?: InputMaybe<AddressComponentCreateNestedManyWithoutAddressInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  formattedAddress: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  Location?: InputMaybe<LocationCreateNestedManyWithoutAddressInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type AddressCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  formattedAddress: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type AddressCreateNestedOneWithoutAddressComponentsInput = {
  connect?: InputMaybe<AddressWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AddressCreateOrConnectWithoutAddressComponentsInput>;
  create?: InputMaybe<AddressCreateWithoutAddressComponentsInput>;
};

export type AddressCreateNestedOneWithoutLocationInput = {
  connect?: InputMaybe<AddressWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AddressCreateOrConnectWithoutLocationInput>;
  create?: InputMaybe<AddressCreateWithoutLocationInput>;
};

export type AddressCreateOrConnectWithoutAddressComponentsInput = {
  create: AddressCreateWithoutAddressComponentsInput;
  where: AddressWhereUniqueInput;
};

export type AddressCreateOrConnectWithoutLocationInput = {
  create: AddressCreateWithoutLocationInput;
  where: AddressWhereUniqueInput;
};

export type AddressCreateWithoutAddressComponentsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  formattedAddress: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  Location?: InputMaybe<LocationCreateNestedManyWithoutAddressInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type AddressCreateWithoutLocationInput = {
  AddressComponents?: InputMaybe<AddressComponentCreateNestedManyWithoutAddressInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  formattedAddress: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type AddressMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  formattedAddress?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type AddressMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  formattedAddress?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type AddressOrderByWithAggregationInput = {
  _count?: InputMaybe<AddressCountOrderByAggregateInput>;
  _max?: InputMaybe<AddressMaxOrderByAggregateInput>;
  _min?: InputMaybe<AddressMinOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  formattedAddress?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type AddressOrderByWithRelationInput = {
  AddressComponents?: InputMaybe<AddressComponentOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  formattedAddress?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  Location?: InputMaybe<LocationOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type AddressRelationFilter = {
  is?: InputMaybe<AddressWhereInput>;
  isNot?: InputMaybe<AddressWhereInput>;
};

export enum AddressScalarFieldEnum {
  CreatedAt = 'createdAt',
  FormattedAddress = 'formattedAddress',
  Id = 'id',
  UpdatedAt = 'updatedAt'
}

export type AddressScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<AddressScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  formattedAddress?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<AddressScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<AddressScalarWhereWithAggregatesInput>>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type AddressUpdateInput = {
  AddressComponents?: InputMaybe<AddressComponentUpdateManyWithoutAddressNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  formattedAddress?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Location?: InputMaybe<LocationUpdateManyWithoutAddressNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AddressUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  formattedAddress?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AddressUpdateOneWithoutAddressComponentsNestedInput = {
  connect?: InputMaybe<AddressWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AddressCreateOrConnectWithoutAddressComponentsInput>;
  create?: InputMaybe<AddressCreateWithoutAddressComponentsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AddressUpdateWithoutAddressComponentsInput>;
  upsert?: InputMaybe<AddressUpsertWithoutAddressComponentsInput>;
};

export type AddressUpdateOneWithoutLocationNestedInput = {
  connect?: InputMaybe<AddressWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AddressCreateOrConnectWithoutLocationInput>;
  create?: InputMaybe<AddressCreateWithoutLocationInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AddressUpdateWithoutLocationInput>;
  upsert?: InputMaybe<AddressUpsertWithoutLocationInput>;
};

export type AddressUpdateWithoutAddressComponentsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  formattedAddress?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Location?: InputMaybe<LocationUpdateManyWithoutAddressNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AddressUpdateWithoutLocationInput = {
  AddressComponents?: InputMaybe<AddressComponentUpdateManyWithoutAddressNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  formattedAddress?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AddressUpsertWithoutAddressComponentsInput = {
  create: AddressCreateWithoutAddressComponentsInput;
  update: AddressUpdateWithoutAddressComponentsInput;
};

export type AddressUpsertWithoutLocationInput = {
  create: AddressCreateWithoutLocationInput;
  update: AddressUpdateWithoutLocationInput;
};

export type AddressWhereInput = {
  AddressComponents?: InputMaybe<AddressComponentListRelationFilter>;
  AND?: InputMaybe<Array<AddressWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  formattedAddress?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  Location?: InputMaybe<LocationListRelationFilter>;
  NOT?: InputMaybe<Array<AddressWhereInput>>;
  OR?: InputMaybe<Array<AddressWhereInput>>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AddressWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type AdMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type AdMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type AdOrderByWithAggregationInput = {
  _avg?: InputMaybe<AdAvgOrderByAggregateInput>;
  _count?: InputMaybe<AdCountOrderByAggregateInput>;
  _max?: InputMaybe<AdMaxOrderByAggregateInput>;
  _min?: InputMaybe<AdMinOrderByAggregateInput>;
  _sum?: InputMaybe<AdSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type AdOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum AdScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  UpdatedAt = 'updatedAt'
}

export type AdScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<AdScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  NOT?: InputMaybe<Array<AdScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<AdScalarWhereWithAggregatesInput>>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type AdSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type AdUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AdUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AdWhereInput = {
  AND?: InputMaybe<Array<AdWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  NOT?: InputMaybe<Array<AdWhereInput>>;
  OR?: InputMaybe<Array<AdWhereInput>>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AdWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export enum AppType {
  Barfriends = 'BARFRIENDS',
  Petfriends = 'PETFRIENDS'
}

export type Area = {
  __typename?: 'Area';
  City: City;
  cityId: Scalars['String'];
  ComingArea?: Maybe<ComingArea>;
  Country: Country;
  countryId: Scalars['String'];
  H3Index5VenueRecommendation?: Maybe<H3Index5VenueRecommendation>;
  H3Index6VenueRecommendation?: Maybe<H3Index6VenueRecommendation>;
  id: Scalars['ID'];
  Location?: Maybe<Location>;
  State: State;
  stateId: Scalars['String'];
  timesRequested?: Maybe<Scalars['Int']>;
};

export type AreaAvgOrderByAggregateInput = {
  timesRequested?: InputMaybe<SortOrder>;
};

export type AreaCountOrderByAggregateInput = {
  cityId?: InputMaybe<SortOrder>;
  countryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  stateId?: InputMaybe<SortOrder>;
  timesRequested?: InputMaybe<SortOrder>;
};

export type AreaCreateInput = {
  City: CityCreateNestedOneWithoutAreaInput;
  ComingArea?: InputMaybe<ComingAreaCreateNestedOneWithoutAreaInput>;
  Country: CountryCreateNestedOneWithoutAreaInput;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationCreateNestedOneWithoutAreaInput>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationCreateNestedOneWithoutAreaInput>;
  id?: InputMaybe<Scalars['String']>;
  Location?: InputMaybe<LocationCreateNestedOneWithoutAreaInput>;
  State: StateCreateNestedOneWithoutAreaInput;
  timesRequested?: InputMaybe<Scalars['Int']>;
};

export type AreaCreateManyCityInput = {
  countryId: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  stateId: Scalars['String'];
  timesRequested?: InputMaybe<Scalars['Int']>;
};

export type AreaCreateManyCityInputEnvelope = {
  data: Array<AreaCreateManyCityInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type AreaCreateManyCountryInput = {
  cityId: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  stateId: Scalars['String'];
  timesRequested?: InputMaybe<Scalars['Int']>;
};

export type AreaCreateManyCountryInputEnvelope = {
  data: Array<AreaCreateManyCountryInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type AreaCreateManyInput = {
  cityId: Scalars['String'];
  countryId: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  stateId: Scalars['String'];
  timesRequested?: InputMaybe<Scalars['Int']>;
};

export type AreaCreateManyStateInput = {
  cityId: Scalars['String'];
  countryId: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  timesRequested?: InputMaybe<Scalars['Int']>;
};

export type AreaCreateManyStateInputEnvelope = {
  data: Array<AreaCreateManyStateInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type AreaCreateNestedManyWithoutCityInput = {
  connect?: InputMaybe<Array<AreaWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AreaCreateOrConnectWithoutCityInput>>;
  create?: InputMaybe<Array<AreaCreateWithoutCityInput>>;
  createMany?: InputMaybe<AreaCreateManyCityInputEnvelope>;
};

export type AreaCreateNestedManyWithoutCountryInput = {
  connect?: InputMaybe<Array<AreaWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AreaCreateOrConnectWithoutCountryInput>>;
  create?: InputMaybe<Array<AreaCreateWithoutCountryInput>>;
  createMany?: InputMaybe<AreaCreateManyCountryInputEnvelope>;
};

export type AreaCreateNestedManyWithoutStateInput = {
  connect?: InputMaybe<Array<AreaWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AreaCreateOrConnectWithoutStateInput>>;
  create?: InputMaybe<Array<AreaCreateWithoutStateInput>>;
  createMany?: InputMaybe<AreaCreateManyStateInputEnvelope>;
};

export type AreaCreateNestedOneWithoutComingAreaInput = {
  connect?: InputMaybe<AreaWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AreaCreateOrConnectWithoutComingAreaInput>;
  create?: InputMaybe<AreaCreateWithoutComingAreaInput>;
};

export type AreaCreateNestedOneWithoutH3Index5VenueRecommendationInput = {
  connect?: InputMaybe<AreaWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AreaCreateOrConnectWithoutH3Index5VenueRecommendationInput>;
  create?: InputMaybe<AreaCreateWithoutH3Index5VenueRecommendationInput>;
};

export type AreaCreateNestedOneWithoutH3Index6VenueRecommendationInput = {
  connect?: InputMaybe<AreaWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AreaCreateOrConnectWithoutH3Index6VenueRecommendationInput>;
  create?: InputMaybe<AreaCreateWithoutH3Index6VenueRecommendationInput>;
};

export type AreaCreateNestedOneWithoutLocationInput = {
  connect?: InputMaybe<AreaWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AreaCreateOrConnectWithoutLocationInput>;
  create?: InputMaybe<AreaCreateWithoutLocationInput>;
};

export type AreaCreateOrConnectWithoutCityInput = {
  create: AreaCreateWithoutCityInput;
  where: AreaWhereUniqueInput;
};

export type AreaCreateOrConnectWithoutComingAreaInput = {
  create: AreaCreateWithoutComingAreaInput;
  where: AreaWhereUniqueInput;
};

export type AreaCreateOrConnectWithoutCountryInput = {
  create: AreaCreateWithoutCountryInput;
  where: AreaWhereUniqueInput;
};

export type AreaCreateOrConnectWithoutH3Index5VenueRecommendationInput = {
  create: AreaCreateWithoutH3Index5VenueRecommendationInput;
  where: AreaWhereUniqueInput;
};

export type AreaCreateOrConnectWithoutH3Index6VenueRecommendationInput = {
  create: AreaCreateWithoutH3Index6VenueRecommendationInput;
  where: AreaWhereUniqueInput;
};

export type AreaCreateOrConnectWithoutLocationInput = {
  create: AreaCreateWithoutLocationInput;
  where: AreaWhereUniqueInput;
};

export type AreaCreateOrConnectWithoutStateInput = {
  create: AreaCreateWithoutStateInput;
  where: AreaWhereUniqueInput;
};

export type AreaCreateWithoutCityInput = {
  ComingArea?: InputMaybe<ComingAreaCreateNestedOneWithoutAreaInput>;
  Country: CountryCreateNestedOneWithoutAreaInput;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationCreateNestedOneWithoutAreaInput>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationCreateNestedOneWithoutAreaInput>;
  id?: InputMaybe<Scalars['String']>;
  Location?: InputMaybe<LocationCreateNestedOneWithoutAreaInput>;
  State: StateCreateNestedOneWithoutAreaInput;
  timesRequested?: InputMaybe<Scalars['Int']>;
};

export type AreaCreateWithoutComingAreaInput = {
  City: CityCreateNestedOneWithoutAreaInput;
  Country: CountryCreateNestedOneWithoutAreaInput;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationCreateNestedOneWithoutAreaInput>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationCreateNestedOneWithoutAreaInput>;
  id?: InputMaybe<Scalars['String']>;
  Location?: InputMaybe<LocationCreateNestedOneWithoutAreaInput>;
  State: StateCreateNestedOneWithoutAreaInput;
  timesRequested?: InputMaybe<Scalars['Int']>;
};

export type AreaCreateWithoutCountryInput = {
  City: CityCreateNestedOneWithoutAreaInput;
  ComingArea?: InputMaybe<ComingAreaCreateNestedOneWithoutAreaInput>;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationCreateNestedOneWithoutAreaInput>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationCreateNestedOneWithoutAreaInput>;
  id?: InputMaybe<Scalars['String']>;
  Location?: InputMaybe<LocationCreateNestedOneWithoutAreaInput>;
  State: StateCreateNestedOneWithoutAreaInput;
  timesRequested?: InputMaybe<Scalars['Int']>;
};

export type AreaCreateWithoutH3Index5VenueRecommendationInput = {
  City: CityCreateNestedOneWithoutAreaInput;
  ComingArea?: InputMaybe<ComingAreaCreateNestedOneWithoutAreaInput>;
  Country: CountryCreateNestedOneWithoutAreaInput;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationCreateNestedOneWithoutAreaInput>;
  id?: InputMaybe<Scalars['String']>;
  Location?: InputMaybe<LocationCreateNestedOneWithoutAreaInput>;
  State: StateCreateNestedOneWithoutAreaInput;
  timesRequested?: InputMaybe<Scalars['Int']>;
};

export type AreaCreateWithoutH3Index6VenueRecommendationInput = {
  City: CityCreateNestedOneWithoutAreaInput;
  ComingArea?: InputMaybe<ComingAreaCreateNestedOneWithoutAreaInput>;
  Country: CountryCreateNestedOneWithoutAreaInput;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationCreateNestedOneWithoutAreaInput>;
  id?: InputMaybe<Scalars['String']>;
  Location?: InputMaybe<LocationCreateNestedOneWithoutAreaInput>;
  State: StateCreateNestedOneWithoutAreaInput;
  timesRequested?: InputMaybe<Scalars['Int']>;
};

export type AreaCreateWithoutLocationInput = {
  City: CityCreateNestedOneWithoutAreaInput;
  ComingArea?: InputMaybe<ComingAreaCreateNestedOneWithoutAreaInput>;
  Country: CountryCreateNestedOneWithoutAreaInput;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationCreateNestedOneWithoutAreaInput>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationCreateNestedOneWithoutAreaInput>;
  id?: InputMaybe<Scalars['String']>;
  State: StateCreateNestedOneWithoutAreaInput;
  timesRequested?: InputMaybe<Scalars['Int']>;
};

export type AreaCreateWithoutStateInput = {
  City: CityCreateNestedOneWithoutAreaInput;
  ComingArea?: InputMaybe<ComingAreaCreateNestedOneWithoutAreaInput>;
  Country: CountryCreateNestedOneWithoutAreaInput;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationCreateNestedOneWithoutAreaInput>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationCreateNestedOneWithoutAreaInput>;
  id?: InputMaybe<Scalars['String']>;
  Location?: InputMaybe<LocationCreateNestedOneWithoutAreaInput>;
  timesRequested?: InputMaybe<Scalars['Int']>;
};

export type AreaListRelationFilter = {
  every?: InputMaybe<AreaWhereInput>;
  none?: InputMaybe<AreaWhereInput>;
  some?: InputMaybe<AreaWhereInput>;
};

export type AreaMaxOrderByAggregateInput = {
  cityId?: InputMaybe<SortOrder>;
  countryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  stateId?: InputMaybe<SortOrder>;
  timesRequested?: InputMaybe<SortOrder>;
};

export type AreaMinOrderByAggregateInput = {
  cityId?: InputMaybe<SortOrder>;
  countryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  stateId?: InputMaybe<SortOrder>;
  timesRequested?: InputMaybe<SortOrder>;
};

export type AreaOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type AreaOrderByWithAggregationInput = {
  _avg?: InputMaybe<AreaAvgOrderByAggregateInput>;
  _count?: InputMaybe<AreaCountOrderByAggregateInput>;
  _max?: InputMaybe<AreaMaxOrderByAggregateInput>;
  _min?: InputMaybe<AreaMinOrderByAggregateInput>;
  _sum?: InputMaybe<AreaSumOrderByAggregateInput>;
  cityId?: InputMaybe<SortOrder>;
  countryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  stateId?: InputMaybe<SortOrder>;
  timesRequested?: InputMaybe<SortOrder>;
};

export type AreaOrderByWithRelationInput = {
  City?: InputMaybe<CityOrderByWithRelationInput>;
  cityId?: InputMaybe<SortOrder>;
  ComingArea?: InputMaybe<ComingAreaOrderByWithRelationInput>;
  Country?: InputMaybe<CountryOrderByWithRelationInput>;
  countryId?: InputMaybe<SortOrder>;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationOrderByWithRelationInput>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationOrderByWithRelationInput>;
  id?: InputMaybe<SortOrder>;
  Location?: InputMaybe<LocationOrderByWithRelationInput>;
  State?: InputMaybe<StateOrderByWithRelationInput>;
  stateId?: InputMaybe<SortOrder>;
  timesRequested?: InputMaybe<SortOrder>;
};

export type AreaRelationFilter = {
  is?: InputMaybe<AreaWhereInput>;
  isNot?: InputMaybe<AreaWhereInput>;
};

export type AreaResponse = {
  __typename?: 'AreaResponse';
  City: City;
  Country: Country;
  Geometry: Coords;
  State: State;
};

export enum AreaScalarFieldEnum {
  CityId = 'cityId',
  CountryId = 'countryId',
  Id = 'id',
  StateId = 'stateId',
  TimesRequested = 'timesRequested'
}

export type AreaScalarWhereInput = {
  AND?: InputMaybe<Array<AreaScalarWhereInput>>;
  cityId?: InputMaybe<StringFilter>;
  countryId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<AreaScalarWhereInput>>;
  OR?: InputMaybe<Array<AreaScalarWhereInput>>;
  stateId?: InputMaybe<StringFilter>;
  timesRequested?: InputMaybe<IntNullableFilter>;
};

export type AreaScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<AreaScalarWhereWithAggregatesInput>>;
  cityId?: InputMaybe<StringWithAggregatesFilter>;
  countryId?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<AreaScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<AreaScalarWhereWithAggregatesInput>>;
  stateId?: InputMaybe<StringWithAggregatesFilter>;
  timesRequested?: InputMaybe<IntNullableWithAggregatesFilter>;
};

export type AreaSumOrderByAggregateInput = {
  timesRequested?: InputMaybe<SortOrder>;
};

export type AreaUpdateInput = {
  City?: InputMaybe<CityUpdateOneRequiredWithoutAreaNestedInput>;
  ComingArea?: InputMaybe<ComingAreaUpdateOneWithoutAreaNestedInput>;
  Country?: InputMaybe<CountryUpdateOneRequiredWithoutAreaNestedInput>;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationUpdateOneWithoutAreaNestedInput>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationUpdateOneWithoutAreaNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Location?: InputMaybe<LocationUpdateOneWithoutAreaNestedInput>;
  State?: InputMaybe<StateUpdateOneRequiredWithoutAreaNestedInput>;
  timesRequested?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
};

export type AreaUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  timesRequested?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
};

export type AreaUpdateManyWithoutCityNestedInput = {
  connect?: InputMaybe<Array<AreaWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AreaCreateOrConnectWithoutCityInput>>;
  create?: InputMaybe<Array<AreaCreateWithoutCityInput>>;
  createMany?: InputMaybe<AreaCreateManyCityInputEnvelope>;
  delete?: InputMaybe<Array<AreaWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AreaScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AreaWhereUniqueInput>>;
  set?: InputMaybe<Array<AreaWhereUniqueInput>>;
  update?: InputMaybe<Array<AreaUpdateWithWhereUniqueWithoutCityInput>>;
  updateMany?: InputMaybe<Array<AreaUpdateManyWithWhereWithoutCityInput>>;
  upsert?: InputMaybe<Array<AreaUpsertWithWhereUniqueWithoutCityInput>>;
};

export type AreaUpdateManyWithoutCountryNestedInput = {
  connect?: InputMaybe<Array<AreaWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AreaCreateOrConnectWithoutCountryInput>>;
  create?: InputMaybe<Array<AreaCreateWithoutCountryInput>>;
  createMany?: InputMaybe<AreaCreateManyCountryInputEnvelope>;
  delete?: InputMaybe<Array<AreaWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AreaScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AreaWhereUniqueInput>>;
  set?: InputMaybe<Array<AreaWhereUniqueInput>>;
  update?: InputMaybe<Array<AreaUpdateWithWhereUniqueWithoutCountryInput>>;
  updateMany?: InputMaybe<Array<AreaUpdateManyWithWhereWithoutCountryInput>>;
  upsert?: InputMaybe<Array<AreaUpsertWithWhereUniqueWithoutCountryInput>>;
};

export type AreaUpdateManyWithoutStateNestedInput = {
  connect?: InputMaybe<Array<AreaWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AreaCreateOrConnectWithoutStateInput>>;
  create?: InputMaybe<Array<AreaCreateWithoutStateInput>>;
  createMany?: InputMaybe<AreaCreateManyStateInputEnvelope>;
  delete?: InputMaybe<Array<AreaWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AreaScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AreaWhereUniqueInput>>;
  set?: InputMaybe<Array<AreaWhereUniqueInput>>;
  update?: InputMaybe<Array<AreaUpdateWithWhereUniqueWithoutStateInput>>;
  updateMany?: InputMaybe<Array<AreaUpdateManyWithWhereWithoutStateInput>>;
  upsert?: InputMaybe<Array<AreaUpsertWithWhereUniqueWithoutStateInput>>;
};

export type AreaUpdateManyWithWhereWithoutCityInput = {
  data: AreaUpdateManyMutationInput;
  where: AreaScalarWhereInput;
};

export type AreaUpdateManyWithWhereWithoutCountryInput = {
  data: AreaUpdateManyMutationInput;
  where: AreaScalarWhereInput;
};

export type AreaUpdateManyWithWhereWithoutStateInput = {
  data: AreaUpdateManyMutationInput;
  where: AreaScalarWhereInput;
};

export type AreaUpdateOneWithoutComingAreaNestedInput = {
  connect?: InputMaybe<AreaWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AreaCreateOrConnectWithoutComingAreaInput>;
  create?: InputMaybe<AreaCreateWithoutComingAreaInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AreaUpdateWithoutComingAreaInput>;
  upsert?: InputMaybe<AreaUpsertWithoutComingAreaInput>;
};

export type AreaUpdateOneWithoutH3Index5VenueRecommendationNestedInput = {
  connect?: InputMaybe<AreaWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AreaCreateOrConnectWithoutH3Index5VenueRecommendationInput>;
  create?: InputMaybe<AreaCreateWithoutH3Index5VenueRecommendationInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AreaUpdateWithoutH3Index5VenueRecommendationInput>;
  upsert?: InputMaybe<AreaUpsertWithoutH3Index5VenueRecommendationInput>;
};

export type AreaUpdateOneWithoutH3Index6VenueRecommendationNestedInput = {
  connect?: InputMaybe<AreaWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AreaCreateOrConnectWithoutH3Index6VenueRecommendationInput>;
  create?: InputMaybe<AreaCreateWithoutH3Index6VenueRecommendationInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AreaUpdateWithoutH3Index6VenueRecommendationInput>;
  upsert?: InputMaybe<AreaUpsertWithoutH3Index6VenueRecommendationInput>;
};

export type AreaUpdateOneWithoutLocationNestedInput = {
  connect?: InputMaybe<AreaWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AreaCreateOrConnectWithoutLocationInput>;
  create?: InputMaybe<AreaCreateWithoutLocationInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AreaUpdateWithoutLocationInput>;
  upsert?: InputMaybe<AreaUpsertWithoutLocationInput>;
};

export type AreaUpdateWithoutCityInput = {
  ComingArea?: InputMaybe<ComingAreaUpdateOneWithoutAreaNestedInput>;
  Country?: InputMaybe<CountryUpdateOneRequiredWithoutAreaNestedInput>;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationUpdateOneWithoutAreaNestedInput>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationUpdateOneWithoutAreaNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Location?: InputMaybe<LocationUpdateOneWithoutAreaNestedInput>;
  State?: InputMaybe<StateUpdateOneRequiredWithoutAreaNestedInput>;
  timesRequested?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
};

export type AreaUpdateWithoutComingAreaInput = {
  City?: InputMaybe<CityUpdateOneRequiredWithoutAreaNestedInput>;
  Country?: InputMaybe<CountryUpdateOneRequiredWithoutAreaNestedInput>;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationUpdateOneWithoutAreaNestedInput>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationUpdateOneWithoutAreaNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Location?: InputMaybe<LocationUpdateOneWithoutAreaNestedInput>;
  State?: InputMaybe<StateUpdateOneRequiredWithoutAreaNestedInput>;
  timesRequested?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
};

export type AreaUpdateWithoutCountryInput = {
  City?: InputMaybe<CityUpdateOneRequiredWithoutAreaNestedInput>;
  ComingArea?: InputMaybe<ComingAreaUpdateOneWithoutAreaNestedInput>;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationUpdateOneWithoutAreaNestedInput>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationUpdateOneWithoutAreaNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Location?: InputMaybe<LocationUpdateOneWithoutAreaNestedInput>;
  State?: InputMaybe<StateUpdateOneRequiredWithoutAreaNestedInput>;
  timesRequested?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
};

export type AreaUpdateWithoutH3Index5VenueRecommendationInput = {
  City?: InputMaybe<CityUpdateOneRequiredWithoutAreaNestedInput>;
  ComingArea?: InputMaybe<ComingAreaUpdateOneWithoutAreaNestedInput>;
  Country?: InputMaybe<CountryUpdateOneRequiredWithoutAreaNestedInput>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationUpdateOneWithoutAreaNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Location?: InputMaybe<LocationUpdateOneWithoutAreaNestedInput>;
  State?: InputMaybe<StateUpdateOneRequiredWithoutAreaNestedInput>;
  timesRequested?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
};

export type AreaUpdateWithoutH3Index6VenueRecommendationInput = {
  City?: InputMaybe<CityUpdateOneRequiredWithoutAreaNestedInput>;
  ComingArea?: InputMaybe<ComingAreaUpdateOneWithoutAreaNestedInput>;
  Country?: InputMaybe<CountryUpdateOneRequiredWithoutAreaNestedInput>;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationUpdateOneWithoutAreaNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Location?: InputMaybe<LocationUpdateOneWithoutAreaNestedInput>;
  State?: InputMaybe<StateUpdateOneRequiredWithoutAreaNestedInput>;
  timesRequested?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
};

export type AreaUpdateWithoutLocationInput = {
  City?: InputMaybe<CityUpdateOneRequiredWithoutAreaNestedInput>;
  ComingArea?: InputMaybe<ComingAreaUpdateOneWithoutAreaNestedInput>;
  Country?: InputMaybe<CountryUpdateOneRequiredWithoutAreaNestedInput>;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationUpdateOneWithoutAreaNestedInput>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationUpdateOneWithoutAreaNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  State?: InputMaybe<StateUpdateOneRequiredWithoutAreaNestedInput>;
  timesRequested?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
};

export type AreaUpdateWithoutStateInput = {
  City?: InputMaybe<CityUpdateOneRequiredWithoutAreaNestedInput>;
  ComingArea?: InputMaybe<ComingAreaUpdateOneWithoutAreaNestedInput>;
  Country?: InputMaybe<CountryUpdateOneRequiredWithoutAreaNestedInput>;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationUpdateOneWithoutAreaNestedInput>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationUpdateOneWithoutAreaNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Location?: InputMaybe<LocationUpdateOneWithoutAreaNestedInput>;
  timesRequested?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
};

export type AreaUpdateWithWhereUniqueWithoutCityInput = {
  data: AreaUpdateWithoutCityInput;
  where: AreaWhereUniqueInput;
};

export type AreaUpdateWithWhereUniqueWithoutCountryInput = {
  data: AreaUpdateWithoutCountryInput;
  where: AreaWhereUniqueInput;
};

export type AreaUpdateWithWhereUniqueWithoutStateInput = {
  data: AreaUpdateWithoutStateInput;
  where: AreaWhereUniqueInput;
};

export type AreaUpsertWithoutComingAreaInput = {
  create: AreaCreateWithoutComingAreaInput;
  update: AreaUpdateWithoutComingAreaInput;
};

export type AreaUpsertWithoutH3Index5VenueRecommendationInput = {
  create: AreaCreateWithoutH3Index5VenueRecommendationInput;
  update: AreaUpdateWithoutH3Index5VenueRecommendationInput;
};

export type AreaUpsertWithoutH3Index6VenueRecommendationInput = {
  create: AreaCreateWithoutH3Index6VenueRecommendationInput;
  update: AreaUpdateWithoutH3Index6VenueRecommendationInput;
};

export type AreaUpsertWithoutLocationInput = {
  create: AreaCreateWithoutLocationInput;
  update: AreaUpdateWithoutLocationInput;
};

export type AreaUpsertWithWhereUniqueWithoutCityInput = {
  create: AreaCreateWithoutCityInput;
  update: AreaUpdateWithoutCityInput;
  where: AreaWhereUniqueInput;
};

export type AreaUpsertWithWhereUniqueWithoutCountryInput = {
  create: AreaCreateWithoutCountryInput;
  update: AreaUpdateWithoutCountryInput;
  where: AreaWhereUniqueInput;
};

export type AreaUpsertWithWhereUniqueWithoutStateInput = {
  create: AreaCreateWithoutStateInput;
  update: AreaUpdateWithoutStateInput;
  where: AreaWhereUniqueInput;
};

export type AreaWhereInput = {
  AND?: InputMaybe<Array<AreaWhereInput>>;
  City?: InputMaybe<CityWhereInput>;
  cityId?: InputMaybe<StringFilter>;
  ComingArea?: InputMaybe<ComingAreaWhereInput>;
  Country?: InputMaybe<CountryWhereInput>;
  countryId?: InputMaybe<StringFilter>;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationWhereInput>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationWhereInput>;
  id?: InputMaybe<StringFilter>;
  Location?: InputMaybe<LocationWhereInput>;
  NOT?: InputMaybe<Array<AreaWhereInput>>;
  OR?: InputMaybe<Array<AreaWhereInput>>;
  State?: InputMaybe<StateWhereInput>;
  stateId?: InputMaybe<StringFilter>;
  timesRequested?: InputMaybe<IntNullableFilter>;
};

export type AreaWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type AuthenticationProvider = {
  __typename?: 'AuthenticationProvider';
  codepassword?: Maybe<Code>;
  Credentials?: Maybe<Credentials>;
  emails: Array<Email>;
  id: Scalars['ID'];
  Password?: Maybe<Password>;
  phones: Array<Phone>;
};


export type AuthenticationProviderEmailsArgs = {
  cursor?: InputMaybe<EmailWhereUniqueInput>;
  distinct?: InputMaybe<Array<EmailScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<EmailOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EmailWhereInput>;
};


export type AuthenticationProviderPhonesArgs = {
  cursor?: InputMaybe<PhoneWhereUniqueInput>;
  distinct?: InputMaybe<Array<PhoneScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PhoneOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PhoneWhereInput>;
};

export type AuthenticationProviderCountOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type AuthenticationProviderCreateInput = {
  codepassword?: InputMaybe<CodeCreateNestedOneWithoutAuthenticationProviderInput>;
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutAuthenticationProviderInput>;
  emails?: InputMaybe<EmailCreateNestedManyWithoutAuthenticationProviderInput>;
  id?: InputMaybe<Scalars['String']>;
  Password?: InputMaybe<PasswordCreateNestedOneWithoutAuthenticationProviderInput>;
  phones?: InputMaybe<PhoneCreateNestedManyWithoutAuthenticationProviderInput>;
};

export type AuthenticationProviderCreateManyInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type AuthenticationProviderCreateNestedManyWithoutEmailsInput = {
  connect?: InputMaybe<Array<AuthenticationProviderWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AuthenticationProviderCreateOrConnectWithoutEmailsInput>>;
  create?: InputMaybe<Array<AuthenticationProviderCreateWithoutEmailsInput>>;
};

export type AuthenticationProviderCreateNestedManyWithoutPhonesInput = {
  connect?: InputMaybe<Array<AuthenticationProviderWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AuthenticationProviderCreateOrConnectWithoutPhonesInput>>;
  create?: InputMaybe<Array<AuthenticationProviderCreateWithoutPhonesInput>>;
};

export type AuthenticationProviderCreateNestedOneWithoutCodepasswordInput = {
  connect?: InputMaybe<AuthenticationProviderWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AuthenticationProviderCreateOrConnectWithoutCodepasswordInput>;
  create?: InputMaybe<AuthenticationProviderCreateWithoutCodepasswordInput>;
};

export type AuthenticationProviderCreateNestedOneWithoutCredentialsInput = {
  connect?: InputMaybe<AuthenticationProviderWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AuthenticationProviderCreateOrConnectWithoutCredentialsInput>;
  create?: InputMaybe<AuthenticationProviderCreateWithoutCredentialsInput>;
};

export type AuthenticationProviderCreateNestedOneWithoutPasswordInput = {
  connect?: InputMaybe<AuthenticationProviderWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AuthenticationProviderCreateOrConnectWithoutPasswordInput>;
  create?: InputMaybe<AuthenticationProviderCreateWithoutPasswordInput>;
};

export type AuthenticationProviderCreateOrConnectWithoutCodepasswordInput = {
  create: AuthenticationProviderCreateWithoutCodepasswordInput;
  where: AuthenticationProviderWhereUniqueInput;
};

export type AuthenticationProviderCreateOrConnectWithoutCredentialsInput = {
  create: AuthenticationProviderCreateWithoutCredentialsInput;
  where: AuthenticationProviderWhereUniqueInput;
};

export type AuthenticationProviderCreateOrConnectWithoutEmailsInput = {
  create: AuthenticationProviderCreateWithoutEmailsInput;
  where: AuthenticationProviderWhereUniqueInput;
};

export type AuthenticationProviderCreateOrConnectWithoutPasswordInput = {
  create: AuthenticationProviderCreateWithoutPasswordInput;
  where: AuthenticationProviderWhereUniqueInput;
};

export type AuthenticationProviderCreateOrConnectWithoutPhonesInput = {
  create: AuthenticationProviderCreateWithoutPhonesInput;
  where: AuthenticationProviderWhereUniqueInput;
};

export type AuthenticationProviderCreateWithoutCodepasswordInput = {
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutAuthenticationProviderInput>;
  emails?: InputMaybe<EmailCreateNestedManyWithoutAuthenticationProviderInput>;
  id?: InputMaybe<Scalars['String']>;
  Password?: InputMaybe<PasswordCreateNestedOneWithoutAuthenticationProviderInput>;
  phones?: InputMaybe<PhoneCreateNestedManyWithoutAuthenticationProviderInput>;
};

export type AuthenticationProviderCreateWithoutCredentialsInput = {
  codepassword?: InputMaybe<CodeCreateNestedOneWithoutAuthenticationProviderInput>;
  emails?: InputMaybe<EmailCreateNestedManyWithoutAuthenticationProviderInput>;
  id?: InputMaybe<Scalars['String']>;
  Password?: InputMaybe<PasswordCreateNestedOneWithoutAuthenticationProviderInput>;
  phones?: InputMaybe<PhoneCreateNestedManyWithoutAuthenticationProviderInput>;
};

export type AuthenticationProviderCreateWithoutEmailsInput = {
  codepassword?: InputMaybe<CodeCreateNestedOneWithoutAuthenticationProviderInput>;
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutAuthenticationProviderInput>;
  id?: InputMaybe<Scalars['String']>;
  Password?: InputMaybe<PasswordCreateNestedOneWithoutAuthenticationProviderInput>;
  phones?: InputMaybe<PhoneCreateNestedManyWithoutAuthenticationProviderInput>;
};

export type AuthenticationProviderCreateWithoutPasswordInput = {
  codepassword?: InputMaybe<CodeCreateNestedOneWithoutAuthenticationProviderInput>;
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutAuthenticationProviderInput>;
  emails?: InputMaybe<EmailCreateNestedManyWithoutAuthenticationProviderInput>;
  id?: InputMaybe<Scalars['String']>;
  phones?: InputMaybe<PhoneCreateNestedManyWithoutAuthenticationProviderInput>;
};

export type AuthenticationProviderCreateWithoutPhonesInput = {
  codepassword?: InputMaybe<CodeCreateNestedOneWithoutAuthenticationProviderInput>;
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutAuthenticationProviderInput>;
  emails?: InputMaybe<EmailCreateNestedManyWithoutAuthenticationProviderInput>;
  id?: InputMaybe<Scalars['String']>;
  Password?: InputMaybe<PasswordCreateNestedOneWithoutAuthenticationProviderInput>;
};

export type AuthenticationProviderListRelationFilter = {
  every?: InputMaybe<AuthenticationProviderWhereInput>;
  none?: InputMaybe<AuthenticationProviderWhereInput>;
  some?: InputMaybe<AuthenticationProviderWhereInput>;
};

export type AuthenticationProviderMaxOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type AuthenticationProviderMinOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type AuthenticationProviderOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type AuthenticationProviderOrderByWithAggregationInput = {
  _count?: InputMaybe<AuthenticationProviderCountOrderByAggregateInput>;
  _max?: InputMaybe<AuthenticationProviderMaxOrderByAggregateInput>;
  _min?: InputMaybe<AuthenticationProviderMinOrderByAggregateInput>;
  id?: InputMaybe<SortOrder>;
};

export type AuthenticationProviderOrderByWithRelationInput = {
  codepassword?: InputMaybe<CodeOrderByWithRelationInput>;
  Credentials?: InputMaybe<CredentialsOrderByWithRelationInput>;
  emails?: InputMaybe<EmailOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  Password?: InputMaybe<PasswordOrderByWithRelationInput>;
  phones?: InputMaybe<PhoneOrderByRelationAggregateInput>;
};

export type AuthenticationProviderRelationFilter = {
  is?: InputMaybe<AuthenticationProviderWhereInput>;
  isNot?: InputMaybe<AuthenticationProviderWhereInput>;
};

export enum AuthenticationProviderScalarFieldEnum {
  Id = 'id'
}

export type AuthenticationProviderScalarWhereInput = {
  AND?: InputMaybe<Array<AuthenticationProviderScalarWhereInput>>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<AuthenticationProviderScalarWhereInput>>;
  OR?: InputMaybe<Array<AuthenticationProviderScalarWhereInput>>;
};

export type AuthenticationProviderScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<AuthenticationProviderScalarWhereWithAggregatesInput>>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<AuthenticationProviderScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<AuthenticationProviderScalarWhereWithAggregatesInput>>;
};

export type AuthenticationProviderUpdateInput = {
  codepassword?: InputMaybe<CodeUpdateOneWithoutAuthenticationProviderNestedInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutAuthenticationProviderNestedInput>;
  emails?: InputMaybe<EmailUpdateManyWithoutAuthenticationProviderNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Password?: InputMaybe<PasswordUpdateOneWithoutAuthenticationProviderNestedInput>;
  phones?: InputMaybe<PhoneUpdateManyWithoutAuthenticationProviderNestedInput>;
};

export type AuthenticationProviderUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type AuthenticationProviderUpdateManyWithoutEmailsNestedInput = {
  connect?: InputMaybe<Array<AuthenticationProviderWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AuthenticationProviderCreateOrConnectWithoutEmailsInput>>;
  create?: InputMaybe<Array<AuthenticationProviderCreateWithoutEmailsInput>>;
  delete?: InputMaybe<Array<AuthenticationProviderWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AuthenticationProviderScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AuthenticationProviderWhereUniqueInput>>;
  set?: InputMaybe<Array<AuthenticationProviderWhereUniqueInput>>;
  update?: InputMaybe<Array<AuthenticationProviderUpdateWithWhereUniqueWithoutEmailsInput>>;
  updateMany?: InputMaybe<Array<AuthenticationProviderUpdateManyWithWhereWithoutEmailsInput>>;
  upsert?: InputMaybe<Array<AuthenticationProviderUpsertWithWhereUniqueWithoutEmailsInput>>;
};

export type AuthenticationProviderUpdateManyWithoutPhonesNestedInput = {
  connect?: InputMaybe<Array<AuthenticationProviderWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AuthenticationProviderCreateOrConnectWithoutPhonesInput>>;
  create?: InputMaybe<Array<AuthenticationProviderCreateWithoutPhonesInput>>;
  delete?: InputMaybe<Array<AuthenticationProviderWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AuthenticationProviderScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AuthenticationProviderWhereUniqueInput>>;
  set?: InputMaybe<Array<AuthenticationProviderWhereUniqueInput>>;
  update?: InputMaybe<Array<AuthenticationProviderUpdateWithWhereUniqueWithoutPhonesInput>>;
  updateMany?: InputMaybe<Array<AuthenticationProviderUpdateManyWithWhereWithoutPhonesInput>>;
  upsert?: InputMaybe<Array<AuthenticationProviderUpsertWithWhereUniqueWithoutPhonesInput>>;
};

export type AuthenticationProviderUpdateManyWithWhereWithoutEmailsInput = {
  data: AuthenticationProviderUpdateManyMutationInput;
  where: AuthenticationProviderScalarWhereInput;
};

export type AuthenticationProviderUpdateManyWithWhereWithoutPhonesInput = {
  data: AuthenticationProviderUpdateManyMutationInput;
  where: AuthenticationProviderScalarWhereInput;
};

export type AuthenticationProviderUpdateOneRequiredWithoutPasswordNestedInput = {
  connect?: InputMaybe<AuthenticationProviderWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AuthenticationProviderCreateOrConnectWithoutPasswordInput>;
  create?: InputMaybe<AuthenticationProviderCreateWithoutPasswordInput>;
  update?: InputMaybe<AuthenticationProviderUpdateWithoutPasswordInput>;
  upsert?: InputMaybe<AuthenticationProviderUpsertWithoutPasswordInput>;
};

export type AuthenticationProviderUpdateOneWithoutCodepasswordNestedInput = {
  connect?: InputMaybe<AuthenticationProviderWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AuthenticationProviderCreateOrConnectWithoutCodepasswordInput>;
  create?: InputMaybe<AuthenticationProviderCreateWithoutCodepasswordInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AuthenticationProviderUpdateWithoutCodepasswordInput>;
  upsert?: InputMaybe<AuthenticationProviderUpsertWithoutCodepasswordInput>;
};

export type AuthenticationProviderUpdateOneWithoutCredentialsNestedInput = {
  connect?: InputMaybe<AuthenticationProviderWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AuthenticationProviderCreateOrConnectWithoutCredentialsInput>;
  create?: InputMaybe<AuthenticationProviderCreateWithoutCredentialsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AuthenticationProviderUpdateWithoutCredentialsInput>;
  upsert?: InputMaybe<AuthenticationProviderUpsertWithoutCredentialsInput>;
};

export type AuthenticationProviderUpdateWithoutCodepasswordInput = {
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutAuthenticationProviderNestedInput>;
  emails?: InputMaybe<EmailUpdateManyWithoutAuthenticationProviderNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Password?: InputMaybe<PasswordUpdateOneWithoutAuthenticationProviderNestedInput>;
  phones?: InputMaybe<PhoneUpdateManyWithoutAuthenticationProviderNestedInput>;
};

export type AuthenticationProviderUpdateWithoutCredentialsInput = {
  codepassword?: InputMaybe<CodeUpdateOneWithoutAuthenticationProviderNestedInput>;
  emails?: InputMaybe<EmailUpdateManyWithoutAuthenticationProviderNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Password?: InputMaybe<PasswordUpdateOneWithoutAuthenticationProviderNestedInput>;
  phones?: InputMaybe<PhoneUpdateManyWithoutAuthenticationProviderNestedInput>;
};

export type AuthenticationProviderUpdateWithoutEmailsInput = {
  codepassword?: InputMaybe<CodeUpdateOneWithoutAuthenticationProviderNestedInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutAuthenticationProviderNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Password?: InputMaybe<PasswordUpdateOneWithoutAuthenticationProviderNestedInput>;
  phones?: InputMaybe<PhoneUpdateManyWithoutAuthenticationProviderNestedInput>;
};

export type AuthenticationProviderUpdateWithoutPasswordInput = {
  codepassword?: InputMaybe<CodeUpdateOneWithoutAuthenticationProviderNestedInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutAuthenticationProviderNestedInput>;
  emails?: InputMaybe<EmailUpdateManyWithoutAuthenticationProviderNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  phones?: InputMaybe<PhoneUpdateManyWithoutAuthenticationProviderNestedInput>;
};

export type AuthenticationProviderUpdateWithoutPhonesInput = {
  codepassword?: InputMaybe<CodeUpdateOneWithoutAuthenticationProviderNestedInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutAuthenticationProviderNestedInput>;
  emails?: InputMaybe<EmailUpdateManyWithoutAuthenticationProviderNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Password?: InputMaybe<PasswordUpdateOneWithoutAuthenticationProviderNestedInput>;
};

export type AuthenticationProviderUpdateWithWhereUniqueWithoutEmailsInput = {
  data: AuthenticationProviderUpdateWithoutEmailsInput;
  where: AuthenticationProviderWhereUniqueInput;
};

export type AuthenticationProviderUpdateWithWhereUniqueWithoutPhonesInput = {
  data: AuthenticationProviderUpdateWithoutPhonesInput;
  where: AuthenticationProviderWhereUniqueInput;
};

export type AuthenticationProviderUpsertWithoutCodepasswordInput = {
  create: AuthenticationProviderCreateWithoutCodepasswordInput;
  update: AuthenticationProviderUpdateWithoutCodepasswordInput;
};

export type AuthenticationProviderUpsertWithoutCredentialsInput = {
  create: AuthenticationProviderCreateWithoutCredentialsInput;
  update: AuthenticationProviderUpdateWithoutCredentialsInput;
};

export type AuthenticationProviderUpsertWithoutPasswordInput = {
  create: AuthenticationProviderCreateWithoutPasswordInput;
  update: AuthenticationProviderUpdateWithoutPasswordInput;
};

export type AuthenticationProviderUpsertWithWhereUniqueWithoutEmailsInput = {
  create: AuthenticationProviderCreateWithoutEmailsInput;
  update: AuthenticationProviderUpdateWithoutEmailsInput;
  where: AuthenticationProviderWhereUniqueInput;
};

export type AuthenticationProviderUpsertWithWhereUniqueWithoutPhonesInput = {
  create: AuthenticationProviderCreateWithoutPhonesInput;
  update: AuthenticationProviderUpdateWithoutPhonesInput;
  where: AuthenticationProviderWhereUniqueInput;
};

export type AuthenticationProviderWhereInput = {
  AND?: InputMaybe<Array<AuthenticationProviderWhereInput>>;
  codepassword?: InputMaybe<CodeWhereInput>;
  Credentials?: InputMaybe<CredentialsWhereInput>;
  emails?: InputMaybe<EmailListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<AuthenticationProviderWhereInput>>;
  OR?: InputMaybe<Array<AuthenticationProviderWhereInput>>;
  Password?: InputMaybe<PasswordWhereInput>;
  phones?: InputMaybe<PhoneListRelationFilter>;
};

export type AuthenticationProviderWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type AuthenticationResponseUnion = AuthorizationDeviceManager | Error;

export type Authenticators = {
  EmailInput?: InputMaybe<EmailInput>;
  PhoneInput?: InputMaybe<PhoneInput>;
  username?: InputMaybe<Scalars['String']>;
};

export type AuthorizationDeviceManager = {
  __typename?: 'AuthorizationDeviceManager';
  Device?: Maybe<Device>;
  DeviceProfile?: Maybe<AuthorizationDeviceProfile>;
  id: Scalars['String'];
};

export type AuthorizationDeviceProfile = {
  __typename?: 'AuthorizationDeviceProfile';
  accesstoken?: Maybe<Scalars['String']>;
  AppType: AppType;
  createdAt: Scalars['DateTime'];
  DeviceManager: DeviceManager;
  deviceManagerId: Scalars['String'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  Profile?: Maybe<Profile>;
  profileId: Scalars['String'];
  ProfileType: ProfileType;
  refreshtoken?: Maybe<Scalars['String']>;
  RefreshToken?: Maybe<RefreshToken>;
  updatedAt: Scalars['DateTime'];
};

export type AuthorizedProfilesResponseUnion = Error | ProfilesResponse;

export type AuthorizedProfilesWhereInput = {
  profiles: CustomProfileWhereInput;
};

/** Batch payloads from prisma. */
export type BatchPayload = {
  __typename?: 'BatchPayload';
  /** Prisma Batch Payload */
  count: Scalars['Int'];
};

export type BoolFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Boolean']>;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type BoolNullableFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolNullableFilter>;
};

export type BoolNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedBoolNullableFilter>;
  _min?: InputMaybe<NestedBoolNullableFilter>;
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolNullableWithAggregatesFilter>;
};

export type BoolWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedBoolFilter>;
  _min?: InputMaybe<NestedBoolFilter>;
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolWithAggregatesFilter>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
  Tags: Array<Tag>;
};


export type CategoryTagsArgs = {
  cursor?: InputMaybe<TagWhereUniqueInput>;
  distinct?: InputMaybe<Array<TagScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TagOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TagWhereInput>;
};

export type CategoryCountOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type CategoryCreateInput = {
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  Tags?: InputMaybe<TagCreateNestedManyWithoutCategoryInput>;
};

export type CategoryCreateManyInput = {
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CategoryCreateNestedOneWithoutTagsInput = {
  connect?: InputMaybe<CategoryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CategoryCreateOrConnectWithoutTagsInput>;
  create?: InputMaybe<CategoryCreateWithoutTagsInput>;
};

export type CategoryCreateOrConnectWithoutTagsInput = {
  create: CategoryCreateWithoutTagsInput;
  where: CategoryWhereUniqueInput;
};

export type CategoryCreateWithoutTagsInput = {
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CategoryMaxOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type CategoryMinOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type CategoryOrderByWithAggregationInput = {
  _count?: InputMaybe<CategoryCountOrderByAggregateInput>;
  _max?: InputMaybe<CategoryMaxOrderByAggregateInput>;
  _min?: InputMaybe<CategoryMinOrderByAggregateInput>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type CategoryOrderByWithRelationInput = {
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  Tags?: InputMaybe<TagOrderByRelationAggregateInput>;
};

export type CategoryRelationFilter = {
  is?: InputMaybe<CategoryWhereInput>;
  isNot?: InputMaybe<CategoryWhereInput>;
};

export enum CategoryScalarFieldEnum {
  Id = 'id',
  Name = 'name'
}

export type CategoryScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<CategoryScalarWhereWithAggregatesInput>>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<CategoryScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<CategoryScalarWhereWithAggregatesInput>>;
};

export type CategoryUpdateInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  Tags?: InputMaybe<TagUpdateManyWithoutCategoryNestedInput>;
};

export type CategoryUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CategoryUpdateOneWithoutTagsNestedInput = {
  connect?: InputMaybe<CategoryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CategoryCreateOrConnectWithoutTagsInput>;
  create?: InputMaybe<CategoryCreateWithoutTagsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<CategoryUpdateWithoutTagsInput>;
  upsert?: InputMaybe<CategoryUpsertWithoutTagsInput>;
};

export type CategoryUpdateWithoutTagsInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CategoryUpsertWithoutTagsInput = {
  create: CategoryCreateWithoutTagsInput;
  update: CategoryUpdateWithoutTagsInput;
};

export type CategoryWhereInput = {
  AND?: InputMaybe<Array<CategoryWhereInput>>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<CategoryWhereInput>>;
  OR?: InputMaybe<Array<CategoryWhereInput>>;
  Tags?: InputMaybe<TagListRelationFilter>;
};

export type CategoryWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type ChatroomCountOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type ChatroomCreateInput = {
  id?: InputMaybe<Scalars['String']>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutChatroomInput>;
  profiles?: InputMaybe<ProfileCreateNestedManyWithoutChatroomInput>;
};

export type ChatroomCreateManyInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type ChatroomCreateNestedManyWithoutProfilesInput = {
  connect?: InputMaybe<Array<ChatroomWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ChatroomCreateOrConnectWithoutProfilesInput>>;
  create?: InputMaybe<Array<ChatroomCreateWithoutProfilesInput>>;
};

export type ChatroomCreateNestedOneWithoutMessagesInput = {
  connect?: InputMaybe<ChatroomWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChatroomCreateOrConnectWithoutMessagesInput>;
  create?: InputMaybe<ChatroomCreateWithoutMessagesInput>;
};

export type ChatroomCreateOrConnectWithoutMessagesInput = {
  create: ChatroomCreateWithoutMessagesInput;
  where: ChatroomWhereUniqueInput;
};

export type ChatroomCreateOrConnectWithoutProfilesInput = {
  create: ChatroomCreateWithoutProfilesInput;
  where: ChatroomWhereUniqueInput;
};

export type ChatroomCreateWithoutMessagesInput = {
  id?: InputMaybe<Scalars['String']>;
  profiles?: InputMaybe<ProfileCreateNestedManyWithoutChatroomInput>;
};

export type ChatroomCreateWithoutProfilesInput = {
  id?: InputMaybe<Scalars['String']>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutChatroomInput>;
};

export type ChatroomListRelationFilter = {
  every?: InputMaybe<ChatroomWhereInput>;
  none?: InputMaybe<ChatroomWhereInput>;
  some?: InputMaybe<ChatroomWhereInput>;
};

export type ChatroomMaxOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type ChatroomMinOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type ChatroomOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ChatroomOrderByWithAggregationInput = {
  _count?: InputMaybe<ChatroomCountOrderByAggregateInput>;
  _max?: InputMaybe<ChatroomMaxOrderByAggregateInput>;
  _min?: InputMaybe<ChatroomMinOrderByAggregateInput>;
  id?: InputMaybe<SortOrder>;
};

export type ChatroomOrderByWithRelationInput = {
  id?: InputMaybe<SortOrder>;
  messages?: InputMaybe<MessageOrderByRelationAggregateInput>;
  profiles?: InputMaybe<ProfileOrderByRelationAggregateInput>;
};

export type ChatroomRelationFilter = {
  is?: InputMaybe<ChatroomWhereInput>;
  isNot?: InputMaybe<ChatroomWhereInput>;
};

export enum ChatroomScalarFieldEnum {
  Id = 'id'
}

export type ChatroomScalarWhereInput = {
  AND?: InputMaybe<Array<ChatroomScalarWhereInput>>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<ChatroomScalarWhereInput>>;
  OR?: InputMaybe<Array<ChatroomScalarWhereInput>>;
};

export type ChatroomScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<ChatroomScalarWhereWithAggregatesInput>>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<ChatroomScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<ChatroomScalarWhereWithAggregatesInput>>;
};

export type ChatroomUpdateInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutChatroomNestedInput>;
  profiles?: InputMaybe<ProfileUpdateManyWithoutChatroomNestedInput>;
};

export type ChatroomUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type ChatroomUpdateManyWithoutProfilesNestedInput = {
  connect?: InputMaybe<Array<ChatroomWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ChatroomCreateOrConnectWithoutProfilesInput>>;
  create?: InputMaybe<Array<ChatroomCreateWithoutProfilesInput>>;
  delete?: InputMaybe<Array<ChatroomWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ChatroomScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ChatroomWhereUniqueInput>>;
  set?: InputMaybe<Array<ChatroomWhereUniqueInput>>;
  update?: InputMaybe<Array<ChatroomUpdateWithWhereUniqueWithoutProfilesInput>>;
  updateMany?: InputMaybe<Array<ChatroomUpdateManyWithWhereWithoutProfilesInput>>;
  upsert?: InputMaybe<Array<ChatroomUpsertWithWhereUniqueWithoutProfilesInput>>;
};

export type ChatroomUpdateManyWithWhereWithoutProfilesInput = {
  data: ChatroomUpdateManyMutationInput;
  where: ChatroomScalarWhereInput;
};

export type ChatroomUpdateOneWithoutMessagesNestedInput = {
  connect?: InputMaybe<ChatroomWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChatroomCreateOrConnectWithoutMessagesInput>;
  create?: InputMaybe<ChatroomCreateWithoutMessagesInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<ChatroomUpdateWithoutMessagesInput>;
  upsert?: InputMaybe<ChatroomUpsertWithoutMessagesInput>;
};

export type ChatroomUpdateWithoutMessagesInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  profiles?: InputMaybe<ProfileUpdateManyWithoutChatroomNestedInput>;
};

export type ChatroomUpdateWithoutProfilesInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutChatroomNestedInput>;
};

export type ChatroomUpdateWithWhereUniqueWithoutProfilesInput = {
  data: ChatroomUpdateWithoutProfilesInput;
  where: ChatroomWhereUniqueInput;
};

export type ChatroomUpsertWithoutMessagesInput = {
  create: ChatroomCreateWithoutMessagesInput;
  update: ChatroomUpdateWithoutMessagesInput;
};

export type ChatroomUpsertWithWhereUniqueWithoutProfilesInput = {
  create: ChatroomCreateWithoutProfilesInput;
  update: ChatroomUpdateWithoutProfilesInput;
  where: ChatroomWhereUniqueInput;
};

export type ChatroomWhereInput = {
  AND?: InputMaybe<Array<ChatroomWhereInput>>;
  id?: InputMaybe<StringFilter>;
  messages?: InputMaybe<MessageListRelationFilter>;
  NOT?: InputMaybe<Array<ChatroomWhereInput>>;
  OR?: InputMaybe<Array<ChatroomWhereInput>>;
  profiles?: InputMaybe<ProfileListRelationFilter>;
};

export type ChatroomWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type City = {
  __typename?: 'City';
  Area: Array<Area>;
  Geometry: Geometry;
  geometryId: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type CityAreaArgs = {
  cursor?: InputMaybe<AreaWhereUniqueInput>;
  distinct?: InputMaybe<Array<AreaScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AreaOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AreaWhereInput>;
};

export type CityAvgOrderByAggregateInput = {
  geometryId?: InputMaybe<SortOrder>;
};

export type CityCountOrderByAggregateInput = {
  geometryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type CityCreateInput = {
  Area?: InputMaybe<AreaCreateNestedManyWithoutCityInput>;
  Geometry: GeometryCreateNestedOneWithoutCityInput;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CityCreateManyInput = {
  geometryId: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CityCreateNestedOneWithoutAreaInput = {
  connect?: InputMaybe<CityWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CityCreateOrConnectWithoutAreaInput>;
  create?: InputMaybe<CityCreateWithoutAreaInput>;
};

export type CityCreateNestedOneWithoutGeometryInput = {
  connect?: InputMaybe<CityWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CityCreateOrConnectWithoutGeometryInput>;
  create?: InputMaybe<CityCreateWithoutGeometryInput>;
};

export type CityCreateOrConnectWithoutAreaInput = {
  create: CityCreateWithoutAreaInput;
  where: CityWhereUniqueInput;
};

export type CityCreateOrConnectWithoutGeometryInput = {
  create: CityCreateWithoutGeometryInput;
  where: CityWhereUniqueInput;
};

export type CityCreateWithoutAreaInput = {
  Geometry: GeometryCreateNestedOneWithoutCityInput;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CityCreateWithoutGeometryInput = {
  Area?: InputMaybe<AreaCreateNestedManyWithoutCityInput>;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CityMaxOrderByAggregateInput = {
  geometryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type CityMinOrderByAggregateInput = {
  geometryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type CityOrderByWithAggregationInput = {
  _avg?: InputMaybe<CityAvgOrderByAggregateInput>;
  _count?: InputMaybe<CityCountOrderByAggregateInput>;
  _max?: InputMaybe<CityMaxOrderByAggregateInput>;
  _min?: InputMaybe<CityMinOrderByAggregateInput>;
  _sum?: InputMaybe<CitySumOrderByAggregateInput>;
  geometryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type CityOrderByWithRelationInput = {
  Area?: InputMaybe<AreaOrderByRelationAggregateInput>;
  Geometry?: InputMaybe<GeometryOrderByWithRelationInput>;
  geometryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type CityRelationFilter = {
  is?: InputMaybe<CityWhereInput>;
  isNot?: InputMaybe<CityWhereInput>;
};

export type CityResponseObject = {
  __typename?: 'CityResponseObject';
  countryCode: Scalars['String'];
  latitude?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  stateCode: Scalars['String'];
  venuesInArea?: Maybe<Scalars['Int']>;
};

export enum CityScalarFieldEnum {
  GeometryId = 'geometryId',
  Id = 'id',
  Name = 'name'
}

export type CityScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<CityScalarWhereWithAggregatesInput>>;
  geometryId?: InputMaybe<IntWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<CityScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<CityScalarWhereWithAggregatesInput>>;
};

export type CitySumOrderByAggregateInput = {
  geometryId?: InputMaybe<SortOrder>;
};

export type CityUpdateInput = {
  Area?: InputMaybe<AreaUpdateManyWithoutCityNestedInput>;
  Geometry?: InputMaybe<GeometryUpdateOneRequiredWithoutCityNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CityUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CityUpdateOneRequiredWithoutAreaNestedInput = {
  connect?: InputMaybe<CityWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CityCreateOrConnectWithoutAreaInput>;
  create?: InputMaybe<CityCreateWithoutAreaInput>;
  update?: InputMaybe<CityUpdateWithoutAreaInput>;
  upsert?: InputMaybe<CityUpsertWithoutAreaInput>;
};

export type CityUpdateOneWithoutGeometryNestedInput = {
  connect?: InputMaybe<CityWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CityCreateOrConnectWithoutGeometryInput>;
  create?: InputMaybe<CityCreateWithoutGeometryInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<CityUpdateWithoutGeometryInput>;
  upsert?: InputMaybe<CityUpsertWithoutGeometryInput>;
};

export type CityUpdateWithoutAreaInput = {
  Geometry?: InputMaybe<GeometryUpdateOneRequiredWithoutCityNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CityUpdateWithoutGeometryInput = {
  Area?: InputMaybe<AreaUpdateManyWithoutCityNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CityUpsertWithoutAreaInput = {
  create: CityCreateWithoutAreaInput;
  update: CityUpdateWithoutAreaInput;
};

export type CityUpsertWithoutGeometryInput = {
  create: CityCreateWithoutGeometryInput;
  update: CityUpdateWithoutGeometryInput;
};

export type CityWhereInput = {
  AND?: InputMaybe<Array<CityWhereInput>>;
  Area?: InputMaybe<AreaListRelationFilter>;
  Geometry?: InputMaybe<GeometryWhereInput>;
  geometryId?: InputMaybe<IntFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<CityWhereInput>>;
  OR?: InputMaybe<Array<CityWhereInput>>;
};

export type CityWhereUniqueInput = {
  geometryId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Code = {
  __typename?: 'Code';
  code: Scalars['String'];
  id: Scalars['ID'];
};

export type CodeCountOrderByAggregateInput = {
  authenitcationProviderId?: InputMaybe<SortOrder>;
  canUseAsRecovery?: InputMaybe<SortOrder>;
  code?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CodeCreateInput = {
  AuthenticationProvider?: InputMaybe<AuthenticationProviderCreateNestedOneWithoutCodepasswordInput>;
  canUseAsRecovery?: InputMaybe<Scalars['Boolean']>;
  code: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CodeCreateManyInput = {
  authenitcationProviderId?: InputMaybe<Scalars['String']>;
  canUseAsRecovery?: InputMaybe<Scalars['Boolean']>;
  code: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CodeCreateNestedOneWithoutAuthenticationProviderInput = {
  connect?: InputMaybe<CodeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CodeCreateOrConnectWithoutAuthenticationProviderInput>;
  create?: InputMaybe<CodeCreateWithoutAuthenticationProviderInput>;
};

export type CodeCreateOrConnectWithoutAuthenticationProviderInput = {
  create: CodeCreateWithoutAuthenticationProviderInput;
  where: CodeWhereUniqueInput;
};

export type CodeCreateWithoutAuthenticationProviderInput = {
  canUseAsRecovery?: InputMaybe<Scalars['Boolean']>;
  code: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CodeDataInput = {
  /** Length is the total numbers that you want the code to be. */
  length?: InputMaybe<Scalars['Int']>;
};

export type CodeMaxOrderByAggregateInput = {
  authenitcationProviderId?: InputMaybe<SortOrder>;
  canUseAsRecovery?: InputMaybe<SortOrder>;
  code?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CodeMinOrderByAggregateInput = {
  authenitcationProviderId?: InputMaybe<SortOrder>;
  canUseAsRecovery?: InputMaybe<SortOrder>;
  code?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CodeOrderByWithAggregationInput = {
  _count?: InputMaybe<CodeCountOrderByAggregateInput>;
  _max?: InputMaybe<CodeMaxOrderByAggregateInput>;
  _min?: InputMaybe<CodeMinOrderByAggregateInput>;
  authenitcationProviderId?: InputMaybe<SortOrder>;
  canUseAsRecovery?: InputMaybe<SortOrder>;
  code?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CodeOrderByWithRelationInput = {
  authenitcationProviderId?: InputMaybe<SortOrder>;
  AuthenticationProvider?: InputMaybe<AuthenticationProviderOrderByWithRelationInput>;
  canUseAsRecovery?: InputMaybe<SortOrder>;
  code?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CodeRelationFilter = {
  is?: InputMaybe<CodeWhereInput>;
  isNot?: InputMaybe<CodeWhereInput>;
};

export type CodeResponse = Code | Error;

export enum CodeScalarFieldEnum {
  AuthenitcationProviderId = 'authenitcationProviderId',
  CanUseAsRecovery = 'canUseAsRecovery',
  Code = 'code',
  CreatedAt = 'createdAt',
  Id = 'id',
  UpdatedAt = 'updatedAt'
}

export type CodeScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<CodeScalarWhereWithAggregatesInput>>;
  authenitcationProviderId?: InputMaybe<StringNullableWithAggregatesFilter>;
  canUseAsRecovery?: InputMaybe<BoolNullableWithAggregatesFilter>;
  code?: InputMaybe<StringWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<CodeScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<CodeScalarWhereWithAggregatesInput>>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type CodeUpdateInput = {
  AuthenticationProvider?: InputMaybe<AuthenticationProviderUpdateOneWithoutCodepasswordNestedInput>;
  canUseAsRecovery?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  code?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CodeUpdateManyMutationInput = {
  canUseAsRecovery?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  code?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CodeUpdateOneWithoutAuthenticationProviderNestedInput = {
  connect?: InputMaybe<CodeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CodeCreateOrConnectWithoutAuthenticationProviderInput>;
  create?: InputMaybe<CodeCreateWithoutAuthenticationProviderInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<CodeUpdateWithoutAuthenticationProviderInput>;
  upsert?: InputMaybe<CodeUpsertWithoutAuthenticationProviderInput>;
};

export type CodeUpdateWithoutAuthenticationProviderInput = {
  canUseAsRecovery?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  code?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CodeUpsertWithoutAuthenticationProviderInput = {
  create: CodeCreateWithoutAuthenticationProviderInput;
  update: CodeUpdateWithoutAuthenticationProviderInput;
};

export type CodeWhereInput = {
  AND?: InputMaybe<Array<CodeWhereInput>>;
  authenitcationProviderId?: InputMaybe<StringNullableFilter>;
  AuthenticationProvider?: InputMaybe<AuthenticationProviderWhereInput>;
  canUseAsRecovery?: InputMaybe<BoolNullableFilter>;
  code?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<CodeWhereInput>>;
  OR?: InputMaybe<Array<CodeWhereInput>>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CodeWhereUniqueInput = {
  authenitcationProviderId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type ComingArea = {
  __typename?: 'ComingArea';
  Area?: Maybe<Area>;
  areaId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  h3Index5: Scalars['String'];
  h3Index6: Scalars['String'];
  id: Scalars['ID'];
  keywordSuggestions: Array<Scalars['String']>;
  timesRequested?: Maybe<Scalars['Int']>;
  toBeNotifiedProfileIds: Array<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  Vote: Array<Vote>;
};


export type ComingAreaVoteArgs = {
  cursor?: InputMaybe<VoteWhereUniqueInput>;
  distinct?: InputMaybe<Array<VoteScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<VoteOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<VoteWhereInput>;
};

export type ComingAreaAvgOrderByAggregateInput = {
  timesRequested?: InputMaybe<SortOrder>;
};

export type ComingAreaCountOrderByAggregateInput = {
  areaId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  h3Index5?: InputMaybe<SortOrder>;
  h3Index6?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  keywordSuggestions?: InputMaybe<SortOrder>;
  timesRequested?: InputMaybe<SortOrder>;
  toBeNotifiedProfileIds?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ComingAreaCreateInput = {
  Area?: InputMaybe<AreaCreateNestedOneWithoutComingAreaInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  h3Index5: Scalars['String'];
  h3Index6: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  keywordSuggestions?: InputMaybe<Array<Scalars['String']>>;
  timesRequested?: InputMaybe<Scalars['Int']>;
  toBeNotifiedProfileIds?: InputMaybe<Array<Scalars['String']>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Vote?: InputMaybe<VoteCreateNestedManyWithoutComingAreaInput>;
};

export type ComingAreaCreatekeywordSuggestionsInput = {
  set: Array<Scalars['String']>;
};

export type ComingAreaCreateManyInput = {
  areaId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  h3Index5: Scalars['String'];
  h3Index6: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  keywordSuggestions?: InputMaybe<Array<Scalars['String']>>;
  timesRequested?: InputMaybe<Scalars['Int']>;
  toBeNotifiedProfileIds?: InputMaybe<Array<Scalars['String']>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ComingAreaCreateNestedOneWithoutAreaInput = {
  connect?: InputMaybe<ComingAreaWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ComingAreaCreateOrConnectWithoutAreaInput>;
  create?: InputMaybe<ComingAreaCreateWithoutAreaInput>;
};

export type ComingAreaCreateNestedOneWithoutVoteInput = {
  connect?: InputMaybe<ComingAreaWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ComingAreaCreateOrConnectWithoutVoteInput>;
  create?: InputMaybe<ComingAreaCreateWithoutVoteInput>;
};

export type ComingAreaCreateOrConnectWithoutAreaInput = {
  create: ComingAreaCreateWithoutAreaInput;
  where: ComingAreaWhereUniqueInput;
};

export type ComingAreaCreateOrConnectWithoutVoteInput = {
  create: ComingAreaCreateWithoutVoteInput;
  where: ComingAreaWhereUniqueInput;
};

export type ComingAreaCreatetoBeNotifiedProfileIdsInput = {
  set: Array<Scalars['String']>;
};

export type ComingAreaCreateWithoutAreaInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  h3Index5: Scalars['String'];
  h3Index6: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  keywordSuggestions?: InputMaybe<Array<Scalars['String']>>;
  timesRequested?: InputMaybe<Scalars['Int']>;
  toBeNotifiedProfileIds?: InputMaybe<Array<Scalars['String']>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Vote?: InputMaybe<VoteCreateNestedManyWithoutComingAreaInput>;
};

export type ComingAreaCreateWithoutVoteInput = {
  Area?: InputMaybe<AreaCreateNestedOneWithoutComingAreaInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  h3Index5: Scalars['String'];
  h3Index6: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  keywordSuggestions?: InputMaybe<Array<Scalars['String']>>;
  timesRequested?: InputMaybe<Scalars['Int']>;
  toBeNotifiedProfileIds?: InputMaybe<Array<Scalars['String']>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ComingAreaMaxOrderByAggregateInput = {
  areaId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  h3Index5?: InputMaybe<SortOrder>;
  h3Index6?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  timesRequested?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ComingAreaMinOrderByAggregateInput = {
  areaId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  h3Index5?: InputMaybe<SortOrder>;
  h3Index6?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  timesRequested?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ComingAreaOrderByWithAggregationInput = {
  _avg?: InputMaybe<ComingAreaAvgOrderByAggregateInput>;
  _count?: InputMaybe<ComingAreaCountOrderByAggregateInput>;
  _max?: InputMaybe<ComingAreaMaxOrderByAggregateInput>;
  _min?: InputMaybe<ComingAreaMinOrderByAggregateInput>;
  _sum?: InputMaybe<ComingAreaSumOrderByAggregateInput>;
  areaId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  h3Index5?: InputMaybe<SortOrder>;
  h3Index6?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  keywordSuggestions?: InputMaybe<SortOrder>;
  timesRequested?: InputMaybe<SortOrder>;
  toBeNotifiedProfileIds?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ComingAreaOrderByWithRelationInput = {
  Area?: InputMaybe<AreaOrderByWithRelationInput>;
  areaId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  h3Index5?: InputMaybe<SortOrder>;
  h3Index6?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  keywordSuggestions?: InputMaybe<SortOrder>;
  timesRequested?: InputMaybe<SortOrder>;
  toBeNotifiedProfileIds?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  Vote?: InputMaybe<VoteOrderByRelationAggregateInput>;
};

export type ComingAreaRelationFilter = {
  is?: InputMaybe<ComingAreaWhereInput>;
  isNot?: InputMaybe<ComingAreaWhereInput>;
};

export type ComingAreaResponse = {
  __typename?: 'ComingAreaResponse';
  comingAreas: Array<ComingArea>;
  searchArea?: Maybe<Area>;
};

export enum ComingAreaScalarFieldEnum {
  AreaId = 'areaId',
  CreatedAt = 'createdAt',
  H3Index5 = 'h3Index5',
  H3Index6 = 'h3Index6',
  Id = 'id',
  KeywordSuggestions = 'keywordSuggestions',
  TimesRequested = 'timesRequested',
  ToBeNotifiedProfileIds = 'toBeNotifiedProfileIds',
  UpdatedAt = 'updatedAt'
}

export type ComingAreaScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<ComingAreaScalarWhereWithAggregatesInput>>;
  areaId?: InputMaybe<StringNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  h3Index5?: InputMaybe<StringWithAggregatesFilter>;
  h3Index6?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  keywordSuggestions?: InputMaybe<StringNullableListFilter>;
  NOT?: InputMaybe<Array<ComingAreaScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<ComingAreaScalarWhereWithAggregatesInput>>;
  timesRequested?: InputMaybe<IntNullableWithAggregatesFilter>;
  toBeNotifiedProfileIds?: InputMaybe<StringNullableListFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type ComingAreaSumOrderByAggregateInput = {
  timesRequested?: InputMaybe<SortOrder>;
};

export type ComingAreaUpdateInput = {
  Area?: InputMaybe<AreaUpdateOneWithoutComingAreaNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  h3Index5?: InputMaybe<StringFieldUpdateOperationsInput>;
  h3Index6?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywordSuggestions?: InputMaybe<Array<Scalars['String']>>;
  timesRequested?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  toBeNotifiedProfileIds?: InputMaybe<Array<Scalars['String']>>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Vote?: InputMaybe<VoteUpdateManyWithoutComingAreaNestedInput>;
};

export type ComingAreaUpdatekeywordSuggestionsInput = {
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type ComingAreaUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  h3Index5?: InputMaybe<StringFieldUpdateOperationsInput>;
  h3Index6?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywordSuggestions?: InputMaybe<Array<Scalars['String']>>;
  timesRequested?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  toBeNotifiedProfileIds?: InputMaybe<Array<Scalars['String']>>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ComingAreaUpdateOneWithoutAreaNestedInput = {
  connect?: InputMaybe<ComingAreaWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ComingAreaCreateOrConnectWithoutAreaInput>;
  create?: InputMaybe<ComingAreaCreateWithoutAreaInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<ComingAreaUpdateWithoutAreaInput>;
  upsert?: InputMaybe<ComingAreaUpsertWithoutAreaInput>;
};

export type ComingAreaUpdateOneWithoutVoteNestedInput = {
  connect?: InputMaybe<ComingAreaWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ComingAreaCreateOrConnectWithoutVoteInput>;
  create?: InputMaybe<ComingAreaCreateWithoutVoteInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<ComingAreaUpdateWithoutVoteInput>;
  upsert?: InputMaybe<ComingAreaUpsertWithoutVoteInput>;
};

export type ComingAreaUpdatetoBeNotifiedProfileIdsInput = {
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type ComingAreaUpdateWithoutAreaInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  h3Index5?: InputMaybe<StringFieldUpdateOperationsInput>;
  h3Index6?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywordSuggestions?: InputMaybe<Array<Scalars['String']>>;
  timesRequested?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  toBeNotifiedProfileIds?: InputMaybe<Array<Scalars['String']>>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Vote?: InputMaybe<VoteUpdateManyWithoutComingAreaNestedInput>;
};

export type ComingAreaUpdateWithoutVoteInput = {
  Area?: InputMaybe<AreaUpdateOneWithoutComingAreaNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  h3Index5?: InputMaybe<StringFieldUpdateOperationsInput>;
  h3Index6?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywordSuggestions?: InputMaybe<Array<Scalars['String']>>;
  timesRequested?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  toBeNotifiedProfileIds?: InputMaybe<Array<Scalars['String']>>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ComingAreaUpsertWithoutAreaInput = {
  create: ComingAreaCreateWithoutAreaInput;
  update: ComingAreaUpdateWithoutAreaInput;
};

export type ComingAreaUpsertWithoutVoteInput = {
  create: ComingAreaCreateWithoutVoteInput;
  update: ComingAreaUpdateWithoutVoteInput;
};

export type ComingAreaWhereInput = {
  AND?: InputMaybe<Array<ComingAreaWhereInput>>;
  Area?: InputMaybe<AreaWhereInput>;
  areaId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  h3Index5?: InputMaybe<StringFilter>;
  h3Index6?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  keywordSuggestions?: InputMaybe<StringNullableListFilter>;
  NOT?: InputMaybe<Array<ComingAreaWhereInput>>;
  OR?: InputMaybe<Array<ComingAreaWhereInput>>;
  timesRequested?: InputMaybe<IntNullableFilter>;
  toBeNotifiedProfileIds?: InputMaybe<StringNullableListFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  Vote?: InputMaybe<VoteListRelationFilter>;
};

export type ComingAreaWhereUniqueInput = {
  areaId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type ContactInput = {
  name?: InputMaybe<Scalars['String']>;
  number?: InputMaybe<Scalars['String']>;
};

export type Coords = {
  __typename?: 'Coords';
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

export type CoordsInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type Country = {
  __typename?: 'Country';
  Area: Array<Area>;
  Geometry: Geometry;
  geometryId: Scalars['Int'];
  id: Scalars['ID'];
  isoCode: Scalars['String'];
  name: Scalars['String'];
};


export type CountryAreaArgs = {
  cursor?: InputMaybe<AreaWhereUniqueInput>;
  distinct?: InputMaybe<Array<AreaScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AreaOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AreaWhereInput>;
};

export type CountryAvgOrderByAggregateInput = {
  geometryId?: InputMaybe<SortOrder>;
};

export type CountryCountOrderByAggregateInput = {
  geometryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isoCode?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type CountryCreateInput = {
  Area?: InputMaybe<AreaCreateNestedManyWithoutCountryInput>;
  Geometry: GeometryCreateNestedOneWithoutCountryInput;
  id?: InputMaybe<Scalars['String']>;
  isoCode: Scalars['String'];
  name: Scalars['String'];
};

export type CountryCreateManyInput = {
  geometryId: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  isoCode: Scalars['String'];
  name: Scalars['String'];
};

export type CountryCreateNestedOneWithoutAreaInput = {
  connect?: InputMaybe<CountryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CountryCreateOrConnectWithoutAreaInput>;
  create?: InputMaybe<CountryCreateWithoutAreaInput>;
};

export type CountryCreateNestedOneWithoutGeometryInput = {
  connect?: InputMaybe<CountryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CountryCreateOrConnectWithoutGeometryInput>;
  create?: InputMaybe<CountryCreateWithoutGeometryInput>;
};

export type CountryCreateOrConnectWithoutAreaInput = {
  create: CountryCreateWithoutAreaInput;
  where: CountryWhereUniqueInput;
};

export type CountryCreateOrConnectWithoutGeometryInput = {
  create: CountryCreateWithoutGeometryInput;
  where: CountryWhereUniqueInput;
};

export type CountryCreateWithoutAreaInput = {
  Geometry: GeometryCreateNestedOneWithoutCountryInput;
  id?: InputMaybe<Scalars['String']>;
  isoCode: Scalars['String'];
  name: Scalars['String'];
};

export type CountryCreateWithoutGeometryInput = {
  Area?: InputMaybe<AreaCreateNestedManyWithoutCountryInput>;
  id?: InputMaybe<Scalars['String']>;
  isoCode: Scalars['String'];
  name: Scalars['String'];
};

export type CountryMaxOrderByAggregateInput = {
  geometryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isoCode?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type CountryMinOrderByAggregateInput = {
  geometryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isoCode?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type CountryOrderByWithAggregationInput = {
  _avg?: InputMaybe<CountryAvgOrderByAggregateInput>;
  _count?: InputMaybe<CountryCountOrderByAggregateInput>;
  _max?: InputMaybe<CountryMaxOrderByAggregateInput>;
  _min?: InputMaybe<CountryMinOrderByAggregateInput>;
  _sum?: InputMaybe<CountrySumOrderByAggregateInput>;
  geometryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isoCode?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type CountryOrderByWithRelationInput = {
  Area?: InputMaybe<AreaOrderByRelationAggregateInput>;
  Geometry?: InputMaybe<GeometryOrderByWithRelationInput>;
  geometryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isoCode?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type CountryRelationFilter = {
  is?: InputMaybe<CountryWhereInput>;
  isNot?: InputMaybe<CountryWhereInput>;
};

export type CountryResponseObject = {
  __typename?: 'CountryResponseObject';
  currency: Scalars['String'];
  flag: Scalars['String'];
  isoCode: Scalars['String'];
  latitude: Scalars['String'];
  longitude: Scalars['String'];
  name: Scalars['String'];
  phonecode: Scalars['String'];
};

export enum CountryScalarFieldEnum {
  GeometryId = 'geometryId',
  Id = 'id',
  IsoCode = 'isoCode',
  Name = 'name'
}

export type CountryScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<CountryScalarWhereWithAggregatesInput>>;
  geometryId?: InputMaybe<IntWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  isoCode?: InputMaybe<StringWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<CountryScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<CountryScalarWhereWithAggregatesInput>>;
};

export type CountrySumOrderByAggregateInput = {
  geometryId?: InputMaybe<SortOrder>;
};

export type CountryUpdateInput = {
  Area?: InputMaybe<AreaUpdateManyWithoutCountryNestedInput>;
  Geometry?: InputMaybe<GeometryUpdateOneRequiredWithoutCountryNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isoCode?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CountryUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isoCode?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CountryUpdateOneRequiredWithoutAreaNestedInput = {
  connect?: InputMaybe<CountryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CountryCreateOrConnectWithoutAreaInput>;
  create?: InputMaybe<CountryCreateWithoutAreaInput>;
  update?: InputMaybe<CountryUpdateWithoutAreaInput>;
  upsert?: InputMaybe<CountryUpsertWithoutAreaInput>;
};

export type CountryUpdateOneWithoutGeometryNestedInput = {
  connect?: InputMaybe<CountryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CountryCreateOrConnectWithoutGeometryInput>;
  create?: InputMaybe<CountryCreateWithoutGeometryInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<CountryUpdateWithoutGeometryInput>;
  upsert?: InputMaybe<CountryUpsertWithoutGeometryInput>;
};

export type CountryUpdateWithoutAreaInput = {
  Geometry?: InputMaybe<GeometryUpdateOneRequiredWithoutCountryNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isoCode?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CountryUpdateWithoutGeometryInput = {
  Area?: InputMaybe<AreaUpdateManyWithoutCountryNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isoCode?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CountryUpsertWithoutAreaInput = {
  create: CountryCreateWithoutAreaInput;
  update: CountryUpdateWithoutAreaInput;
};

export type CountryUpsertWithoutGeometryInput = {
  create: CountryCreateWithoutGeometryInput;
  update: CountryUpdateWithoutGeometryInput;
};

export type CountryWhereInput = {
  AND?: InputMaybe<Array<CountryWhereInput>>;
  Area?: InputMaybe<AreaListRelationFilter>;
  Geometry?: InputMaybe<GeometryWhereInput>;
  geometryId?: InputMaybe<IntFilter>;
  id?: InputMaybe<StringFilter>;
  isoCode?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<CountryWhereInput>>;
  OR?: InputMaybe<Array<CountryWhereInput>>;
};

export type CountryWhereUniqueInput = {
  geometryId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  isoCode?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type CreatePersonalDataInput = {
  address: Scalars['String'];
  birthday: Scalars['DateTime'];
  EmailInput?: InputMaybe<EmailInput>;
  fullname?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  PhoneInput?: InputMaybe<PhoneInput>;
  PrivacyPolicyId?: InputMaybe<Scalars['ID']>;
  ServicesId?: InputMaybe<Scalars['ID']>;
  username: Scalars['String'];
};

export type CreateVenueDataInput = {
  address: Scalars['String'];
  birthday?: InputMaybe<Scalars['DateTime']>;
  capacity: Scalars['String'];
  contacts: Array<VenueContactInput>;
  description?: InputMaybe<Scalars['String']>;
  EmailInput?: InputMaybe<EmailInput>;
  established: Scalars['DateTime'];
  ownername: Scalars['String'];
  password: Scalars['String'];
  PhoneInput?: InputMaybe<PhoneInput>;
  photos?: InputMaybe<PhotoCreateManyProfileInputEnvelope>;
  PrivacyPolicyId?: InputMaybe<Scalars['ID']>;
  ServicesId?: InputMaybe<Scalars['ID']>;
  venuelocalname: Scalars['String'];
  venuename: Scalars['String'];
  venuetypes?: InputMaybe<Array<Scalars['String']>>;
  venueusername: Scalars['String'];
};

export type Credentials = {
  __typename?: 'Credentials';
  AuthenticationProvider?: Maybe<AuthenticationProvider>;
  authenticationProviderId?: Maybe<Scalars['String']>;
  createdtAt: Scalars['DateTime'];
  id: Scalars['ID'];
  LegalAgreement: Array<LegalAgreement>;
  Profile: Profile;
  profileId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};


export type CredentialsLegalAgreementArgs = {
  cursor?: InputMaybe<LegalAgreementWhereUniqueInput>;
  distinct?: InputMaybe<Array<LegalAgreementScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<LegalAgreementOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<LegalAgreementWhereInput>;
};

export type CredentialsCountOrderByAggregateInput = {
  authenticationProviderId?: InputMaybe<SortOrder>;
  createdtAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CredentialsCreateInput = {
  AuthenticationProvider?: InputMaybe<AuthenticationProviderCreateNestedOneWithoutCredentialsInput>;
  createdtAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  LegalAgreement?: InputMaybe<LegalAgreementCreateNestedManyWithoutCredentialsInput>;
  Profile: ProfileCreateNestedOneWithoutCredentialsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CredentialsCreateManyInput = {
  authenticationProviderId?: InputMaybe<Scalars['String']>;
  createdtAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  profileId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CredentialsCreateNestedOneWithoutAuthenticationProviderInput = {
  connect?: InputMaybe<CredentialsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CredentialsCreateOrConnectWithoutAuthenticationProviderInput>;
  create?: InputMaybe<CredentialsCreateWithoutAuthenticationProviderInput>;
};

export type CredentialsCreateNestedOneWithoutLegalAgreementInput = {
  connect?: InputMaybe<CredentialsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CredentialsCreateOrConnectWithoutLegalAgreementInput>;
  create?: InputMaybe<CredentialsCreateWithoutLegalAgreementInput>;
};

export type CredentialsCreateNestedOneWithoutProfileInput = {
  connect?: InputMaybe<CredentialsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CredentialsCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<CredentialsCreateWithoutProfileInput>;
};

export type CredentialsCreateOrConnectWithoutAuthenticationProviderInput = {
  create: CredentialsCreateWithoutAuthenticationProviderInput;
  where: CredentialsWhereUniqueInput;
};

export type CredentialsCreateOrConnectWithoutLegalAgreementInput = {
  create: CredentialsCreateWithoutLegalAgreementInput;
  where: CredentialsWhereUniqueInput;
};

export type CredentialsCreateOrConnectWithoutProfileInput = {
  create: CredentialsCreateWithoutProfileInput;
  where: CredentialsWhereUniqueInput;
};

export type CredentialsCreateWithoutAuthenticationProviderInput = {
  createdtAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  LegalAgreement?: InputMaybe<LegalAgreementCreateNestedManyWithoutCredentialsInput>;
  Profile: ProfileCreateNestedOneWithoutCredentialsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CredentialsCreateWithoutLegalAgreementInput = {
  AuthenticationProvider?: InputMaybe<AuthenticationProviderCreateNestedOneWithoutCredentialsInput>;
  createdtAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  Profile: ProfileCreateNestedOneWithoutCredentialsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CredentialsCreateWithoutProfileInput = {
  AuthenticationProvider?: InputMaybe<AuthenticationProviderCreateNestedOneWithoutCredentialsInput>;
  createdtAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  LegalAgreement?: InputMaybe<LegalAgreementCreateNestedManyWithoutCredentialsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CredentialsMaxOrderByAggregateInput = {
  authenticationProviderId?: InputMaybe<SortOrder>;
  createdtAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CredentialsMinOrderByAggregateInput = {
  authenticationProviderId?: InputMaybe<SortOrder>;
  createdtAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CredentialsOrderByWithAggregationInput = {
  _count?: InputMaybe<CredentialsCountOrderByAggregateInput>;
  _max?: InputMaybe<CredentialsMaxOrderByAggregateInput>;
  _min?: InputMaybe<CredentialsMinOrderByAggregateInput>;
  authenticationProviderId?: InputMaybe<SortOrder>;
  createdtAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CredentialsOrderByWithRelationInput = {
  AuthenticationProvider?: InputMaybe<AuthenticationProviderOrderByWithRelationInput>;
  authenticationProviderId?: InputMaybe<SortOrder>;
  createdtAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  LegalAgreement?: InputMaybe<LegalAgreementOrderByRelationAggregateInput>;
  Profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CredentialsRelationFilter = {
  is?: InputMaybe<CredentialsWhereInput>;
  isNot?: InputMaybe<CredentialsWhereInput>;
};

export enum CredentialsScalarFieldEnum {
  AuthenticationProviderId = 'authenticationProviderId',
  CreatedtAt = 'createdtAt',
  Id = 'id',
  ProfileId = 'profileId',
  UpdatedAt = 'updatedAt'
}

export type CredentialsScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<CredentialsScalarWhereWithAggregatesInput>>;
  authenticationProviderId?: InputMaybe<StringNullableWithAggregatesFilter>;
  createdtAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<CredentialsScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<CredentialsScalarWhereWithAggregatesInput>>;
  profileId?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type CredentialsUpdateInput = {
  AuthenticationProvider?: InputMaybe<AuthenticationProviderUpdateOneWithoutCredentialsNestedInput>;
  createdtAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  LegalAgreement?: InputMaybe<LegalAgreementUpdateManyWithoutCredentialsNestedInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutCredentialsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CredentialsUpdateManyMutationInput = {
  createdtAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CredentialsUpdateOneWithoutAuthenticationProviderNestedInput = {
  connect?: InputMaybe<CredentialsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CredentialsCreateOrConnectWithoutAuthenticationProviderInput>;
  create?: InputMaybe<CredentialsCreateWithoutAuthenticationProviderInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<CredentialsUpdateWithoutAuthenticationProviderInput>;
  upsert?: InputMaybe<CredentialsUpsertWithoutAuthenticationProviderInput>;
};

export type CredentialsUpdateOneWithoutLegalAgreementNestedInput = {
  connect?: InputMaybe<CredentialsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CredentialsCreateOrConnectWithoutLegalAgreementInput>;
  create?: InputMaybe<CredentialsCreateWithoutLegalAgreementInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<CredentialsUpdateWithoutLegalAgreementInput>;
  upsert?: InputMaybe<CredentialsUpsertWithoutLegalAgreementInput>;
};

export type CredentialsUpdateOneWithoutProfileNestedInput = {
  connect?: InputMaybe<CredentialsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CredentialsCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<CredentialsCreateWithoutProfileInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<CredentialsUpdateWithoutProfileInput>;
  upsert?: InputMaybe<CredentialsUpsertWithoutProfileInput>;
};

export type CredentialsUpdateWithoutAuthenticationProviderInput = {
  createdtAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  LegalAgreement?: InputMaybe<LegalAgreementUpdateManyWithoutCredentialsNestedInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutCredentialsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CredentialsUpdateWithoutLegalAgreementInput = {
  AuthenticationProvider?: InputMaybe<AuthenticationProviderUpdateOneWithoutCredentialsNestedInput>;
  createdtAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutCredentialsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CredentialsUpdateWithoutProfileInput = {
  AuthenticationProvider?: InputMaybe<AuthenticationProviderUpdateOneWithoutCredentialsNestedInput>;
  createdtAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  LegalAgreement?: InputMaybe<LegalAgreementUpdateManyWithoutCredentialsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CredentialsUpsertWithoutAuthenticationProviderInput = {
  create: CredentialsCreateWithoutAuthenticationProviderInput;
  update: CredentialsUpdateWithoutAuthenticationProviderInput;
};

export type CredentialsUpsertWithoutLegalAgreementInput = {
  create: CredentialsCreateWithoutLegalAgreementInput;
  update: CredentialsUpdateWithoutLegalAgreementInput;
};

export type CredentialsUpsertWithoutProfileInput = {
  create: CredentialsCreateWithoutProfileInput;
  update: CredentialsUpdateWithoutProfileInput;
};

export type CredentialsWhereInput = {
  AND?: InputMaybe<Array<CredentialsWhereInput>>;
  AuthenticationProvider?: InputMaybe<AuthenticationProviderWhereInput>;
  authenticationProviderId?: InputMaybe<StringNullableFilter>;
  createdtAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  LegalAgreement?: InputMaybe<LegalAgreementListRelationFilter>;
  NOT?: InputMaybe<Array<CredentialsWhereInput>>;
  OR?: InputMaybe<Array<CredentialsWhereInput>>;
  Profile?: InputMaybe<ProfileWhereInput>;
  profileId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CredentialsWhereUniqueInput = {
  authenticationProviderId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  profileId?: InputMaybe<Scalars['String']>;
};

export type CustomCodeWhereInput = {
  Authenticators?: InputMaybe<Authenticators>;
};

export type CustomProfileWhereInput = {
  email?: InputMaybe<Scalars['String']>;
  Phone?: InputMaybe<PhoneInput>;
  username?: InputMaybe<Scalars['String']>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type DateTimeNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedDateTimeNullableFilter>;
  _min?: InputMaybe<NestedDateTimeNullableFilter>;
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type DateTimeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedDateTimeFilter>;
  _min?: InputMaybe<NestedDateTimeFilter>;
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type DetailInformation = {
  __typename?: 'DetailInformation';
  capacity?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  established?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  Profile: Profile;
  profileId: Scalars['String'];
  Tags: Array<Tag>;
};


export type DetailInformationTagsArgs = {
  cursor?: InputMaybe<TagWhereUniqueInput>;
  distinct?: InputMaybe<Array<TagScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TagOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TagWhereInput>;
};

export type DetailInformationAvgOrderByAggregateInput = {
  capacity?: InputMaybe<SortOrder>;
};

export type DetailInformationCountOrderByAggregateInput = {
  capacity?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  established?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
};

export type DetailInformationCreateInput = {
  capacity?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  established?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  Profile: ProfileCreateNestedOneWithoutDetailInformationInput;
  Tags?: InputMaybe<TagCreateNestedManyWithoutDetailInformationInput>;
};

export type DetailInformationCreateManyInput = {
  capacity?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  established?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  profileId: Scalars['String'];
};

export type DetailInformationCreateNestedManyWithoutTagsInput = {
  connect?: InputMaybe<Array<DetailInformationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DetailInformationCreateOrConnectWithoutTagsInput>>;
  create?: InputMaybe<Array<DetailInformationCreateWithoutTagsInput>>;
};

export type DetailInformationCreateNestedOneWithoutProfileInput = {
  connect?: InputMaybe<DetailInformationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DetailInformationCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<DetailInformationCreateWithoutProfileInput>;
};

export type DetailInformationCreateOrConnectWithoutProfileInput = {
  create: DetailInformationCreateWithoutProfileInput;
  where: DetailInformationWhereUniqueInput;
};

export type DetailInformationCreateOrConnectWithoutTagsInput = {
  create: DetailInformationCreateWithoutTagsInput;
  where: DetailInformationWhereUniqueInput;
};

export type DetailInformationCreateWithoutProfileInput = {
  capacity?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  established?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  Tags?: InputMaybe<TagCreateNestedManyWithoutDetailInformationInput>;
};

export type DetailInformationCreateWithoutTagsInput = {
  capacity?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  established?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  Profile: ProfileCreateNestedOneWithoutDetailInformationInput;
};

export type DetailInformationListRelationFilter = {
  every?: InputMaybe<DetailInformationWhereInput>;
  none?: InputMaybe<DetailInformationWhereInput>;
  some?: InputMaybe<DetailInformationWhereInput>;
};

export type DetailInformationMaxOrderByAggregateInput = {
  capacity?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  established?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
};

export type DetailInformationMinOrderByAggregateInput = {
  capacity?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  established?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
};

export type DetailInformationOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type DetailInformationOrderByWithAggregationInput = {
  _avg?: InputMaybe<DetailInformationAvgOrderByAggregateInput>;
  _count?: InputMaybe<DetailInformationCountOrderByAggregateInput>;
  _max?: InputMaybe<DetailInformationMaxOrderByAggregateInput>;
  _min?: InputMaybe<DetailInformationMinOrderByAggregateInput>;
  _sum?: InputMaybe<DetailInformationSumOrderByAggregateInput>;
  capacity?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  established?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
};

export type DetailInformationOrderByWithRelationInput = {
  capacity?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  established?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  Profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  profileId?: InputMaybe<SortOrder>;
  Tags?: InputMaybe<TagOrderByRelationAggregateInput>;
};

export type DetailInformationRelationFilter = {
  is?: InputMaybe<DetailInformationWhereInput>;
  isNot?: InputMaybe<DetailInformationWhereInput>;
};

export enum DetailInformationScalarFieldEnum {
  Capacity = 'capacity',
  Description = 'description',
  Established = 'established',
  Id = 'id',
  ProfileId = 'profileId'
}

export type DetailInformationScalarWhereInput = {
  AND?: InputMaybe<Array<DetailInformationScalarWhereInput>>;
  capacity?: InputMaybe<IntNullableFilter>;
  description?: InputMaybe<StringNullableFilter>;
  established?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<DetailInformationScalarWhereInput>>;
  OR?: InputMaybe<Array<DetailInformationScalarWhereInput>>;
  profileId?: InputMaybe<StringFilter>;
};

export type DetailInformationScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<DetailInformationScalarWhereWithAggregatesInput>>;
  capacity?: InputMaybe<IntNullableWithAggregatesFilter>;
  description?: InputMaybe<StringNullableWithAggregatesFilter>;
  established?: InputMaybe<DateTimeNullableWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<DetailInformationScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<DetailInformationScalarWhereWithAggregatesInput>>;
  profileId?: InputMaybe<StringWithAggregatesFilter>;
};

export type DetailInformationSumOrderByAggregateInput = {
  capacity?: InputMaybe<SortOrder>;
};

export type DetailInformationUpdateInput = {
  capacity?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  established?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutDetailInformationNestedInput>;
  Tags?: InputMaybe<TagUpdateManyWithoutDetailInformationNestedInput>;
};

export type DetailInformationUpdateManyMutationInput = {
  capacity?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  established?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type DetailInformationUpdateManyWithoutTagsNestedInput = {
  connect?: InputMaybe<Array<DetailInformationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DetailInformationCreateOrConnectWithoutTagsInput>>;
  create?: InputMaybe<Array<DetailInformationCreateWithoutTagsInput>>;
  delete?: InputMaybe<Array<DetailInformationWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<DetailInformationScalarWhereInput>>;
  disconnect?: InputMaybe<Array<DetailInformationWhereUniqueInput>>;
  set?: InputMaybe<Array<DetailInformationWhereUniqueInput>>;
  update?: InputMaybe<Array<DetailInformationUpdateWithWhereUniqueWithoutTagsInput>>;
  updateMany?: InputMaybe<Array<DetailInformationUpdateManyWithWhereWithoutTagsInput>>;
  upsert?: InputMaybe<Array<DetailInformationUpsertWithWhereUniqueWithoutTagsInput>>;
};

export type DetailInformationUpdateManyWithWhereWithoutTagsInput = {
  data: DetailInformationUpdateManyMutationInput;
  where: DetailInformationScalarWhereInput;
};

export type DetailInformationUpdateOneWithoutProfileNestedInput = {
  connect?: InputMaybe<DetailInformationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DetailInformationCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<DetailInformationCreateWithoutProfileInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<DetailInformationUpdateWithoutProfileInput>;
  upsert?: InputMaybe<DetailInformationUpsertWithoutProfileInput>;
};

export type DetailInformationUpdateWithoutProfileInput = {
  capacity?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  established?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Tags?: InputMaybe<TagUpdateManyWithoutDetailInformationNestedInput>;
};

export type DetailInformationUpdateWithoutTagsInput = {
  capacity?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  established?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutDetailInformationNestedInput>;
};

export type DetailInformationUpdateWithWhereUniqueWithoutTagsInput = {
  data: DetailInformationUpdateWithoutTagsInput;
  where: DetailInformationWhereUniqueInput;
};

export type DetailInformationUpsertWithoutProfileInput = {
  create: DetailInformationCreateWithoutProfileInput;
  update: DetailInformationUpdateWithoutProfileInput;
};

export type DetailInformationUpsertWithWhereUniqueWithoutTagsInput = {
  create: DetailInformationCreateWithoutTagsInput;
  update: DetailInformationUpdateWithoutTagsInput;
  where: DetailInformationWhereUniqueInput;
};

export type DetailInformationWhereInput = {
  AND?: InputMaybe<Array<DetailInformationWhereInput>>;
  capacity?: InputMaybe<IntNullableFilter>;
  description?: InputMaybe<StringNullableFilter>;
  established?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<DetailInformationWhereInput>>;
  OR?: InputMaybe<Array<DetailInformationWhereInput>>;
  Profile?: InputMaybe<ProfileWhereInput>;
  profileId?: InputMaybe<StringFilter>;
  Tags?: InputMaybe<TagListRelationFilter>;
};

export type DetailInformationWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  profileId?: InputMaybe<Scalars['String']>;
};

export type Device = {
  __typename?: 'Device';
  createdAt?: Maybe<Scalars['DateTime']>;
  DeviceManager: DeviceManager;
  deviceManagerId: Scalars['String'];
  deviceType: Scalars['String'];
  id: Scalars['ID'];
  PushToken?: Maybe<PushToken>;
  pushTokenId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type DeviceCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  deviceManagerId?: InputMaybe<SortOrder>;
  deviceType?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  pushTokenId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DeviceCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  DeviceManager: DeviceManagerCreateNestedOneWithoutDeviceInput;
  deviceType: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  PushToken?: InputMaybe<PushTokenCreateNestedOneWithoutDeviceInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type DeviceCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  deviceManagerId: Scalars['String'];
  deviceType: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  pushTokenId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type DeviceCreateNestedOneWithoutDeviceManagerInput = {
  connect?: InputMaybe<DeviceWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DeviceCreateOrConnectWithoutDeviceManagerInput>;
  create?: InputMaybe<DeviceCreateWithoutDeviceManagerInput>;
};

export type DeviceCreateNestedOneWithoutPushTokenInput = {
  connect?: InputMaybe<DeviceWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DeviceCreateOrConnectWithoutPushTokenInput>;
  create?: InputMaybe<DeviceCreateWithoutPushTokenInput>;
};

export type DeviceCreateOrConnectWithoutDeviceManagerInput = {
  create: DeviceCreateWithoutDeviceManagerInput;
  where: DeviceWhereUniqueInput;
};

export type DeviceCreateOrConnectWithoutPushTokenInput = {
  create: DeviceCreateWithoutPushTokenInput;
  where: DeviceWhereUniqueInput;
};

export type DeviceCreateWithoutDeviceManagerInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  deviceType: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  PushToken?: InputMaybe<PushTokenCreateNestedOneWithoutDeviceInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type DeviceCreateWithoutPushTokenInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  DeviceManager: DeviceManagerCreateNestedOneWithoutDeviceInput;
  deviceType: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type DeviceManager = {
  __typename?: 'DeviceManager';
  createdAt: Scalars['DateTime'];
  Device?: Maybe<Device>;
  DeviceProfile: Array<AuthorizationDeviceProfile>;
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};


export type DeviceManagerDeviceProfileArgs = {
  cursor?: InputMaybe<DeviceProfileWhereUniqueInput>;
  distinct?: InputMaybe<Array<DeviceProfileScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<DeviceProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DeviceProfileWhereInput>;
};

export type DeviceManagerCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DeviceManagerCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Device?: InputMaybe<DeviceCreateNestedOneWithoutDeviceManagerInput>;
  DeviceProfile?: InputMaybe<DeviceProfileCreateNestedManyWithoutDeviceManagerInput>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type DeviceManagerCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type DeviceManagerCreateNestedOneWithoutDeviceInput = {
  connect?: InputMaybe<DeviceManagerWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DeviceManagerCreateOrConnectWithoutDeviceInput>;
  create?: InputMaybe<DeviceManagerCreateWithoutDeviceInput>;
};

export type DeviceManagerCreateNestedOneWithoutDeviceProfileInput = {
  connect?: InputMaybe<DeviceManagerWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DeviceManagerCreateOrConnectWithoutDeviceProfileInput>;
  create?: InputMaybe<DeviceManagerCreateWithoutDeviceProfileInput>;
};

export type DeviceManagerCreateOrConnectWithoutDeviceInput = {
  create: DeviceManagerCreateWithoutDeviceInput;
  where: DeviceManagerWhereUniqueInput;
};

export type DeviceManagerCreateOrConnectWithoutDeviceProfileInput = {
  create: DeviceManagerCreateWithoutDeviceProfileInput;
  where: DeviceManagerWhereUniqueInput;
};

export type DeviceManagerCreateWithoutDeviceInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  DeviceProfile?: InputMaybe<DeviceProfileCreateNestedManyWithoutDeviceManagerInput>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type DeviceManagerCreateWithoutDeviceProfileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Device?: InputMaybe<DeviceCreateNestedOneWithoutDeviceManagerInput>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type DeviceManagerDeviceProfiles = {
  __typename?: 'DeviceManagerDeviceProfiles';
  DeviceProfiles: Array<AuthorizationDeviceProfile>;
};

export type DeviceManagerDeviceProfilesResponseUnion = DeviceManagerDeviceProfiles | Error;

export type DeviceManagerMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DeviceManagerMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DeviceManagerOrderByWithAggregationInput = {
  _count?: InputMaybe<DeviceManagerCountOrderByAggregateInput>;
  _max?: InputMaybe<DeviceManagerMaxOrderByAggregateInput>;
  _min?: InputMaybe<DeviceManagerMinOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DeviceManagerOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  Device?: InputMaybe<DeviceOrderByWithRelationInput>;
  DeviceProfile?: InputMaybe<DeviceProfileOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DeviceManagerRelationFilter = {
  is?: InputMaybe<DeviceManagerWhereInput>;
  isNot?: InputMaybe<DeviceManagerWhereInput>;
};

export enum DeviceManagerScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  UpdatedAt = 'updatedAt'
}

export type DeviceManagerScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<DeviceManagerScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<DeviceManagerScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<DeviceManagerScalarWhereWithAggregatesInput>>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type DeviceManagerUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Device?: InputMaybe<DeviceUpdateOneWithoutDeviceManagerNestedInput>;
  DeviceProfile?: InputMaybe<DeviceProfileUpdateManyWithoutDeviceManagerNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type DeviceManagerUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type DeviceManagerUpdateOneRequiredWithoutDeviceNestedInput = {
  connect?: InputMaybe<DeviceManagerWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DeviceManagerCreateOrConnectWithoutDeviceInput>;
  create?: InputMaybe<DeviceManagerCreateWithoutDeviceInput>;
  update?: InputMaybe<DeviceManagerUpdateWithoutDeviceInput>;
  upsert?: InputMaybe<DeviceManagerUpsertWithoutDeviceInput>;
};

export type DeviceManagerUpdateOneRequiredWithoutDeviceProfileNestedInput = {
  connect?: InputMaybe<DeviceManagerWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DeviceManagerCreateOrConnectWithoutDeviceProfileInput>;
  create?: InputMaybe<DeviceManagerCreateWithoutDeviceProfileInput>;
  update?: InputMaybe<DeviceManagerUpdateWithoutDeviceProfileInput>;
  upsert?: InputMaybe<DeviceManagerUpsertWithoutDeviceProfileInput>;
};

export type DeviceManagerUpdateWithoutDeviceInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  DeviceProfile?: InputMaybe<DeviceProfileUpdateManyWithoutDeviceManagerNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type DeviceManagerUpdateWithoutDeviceProfileInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Device?: InputMaybe<DeviceUpdateOneWithoutDeviceManagerNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type DeviceManagerUpsertWithoutDeviceInput = {
  create: DeviceManagerCreateWithoutDeviceInput;
  update: DeviceManagerUpdateWithoutDeviceInput;
};

export type DeviceManagerUpsertWithoutDeviceProfileInput = {
  create: DeviceManagerCreateWithoutDeviceProfileInput;
  update: DeviceManagerUpdateWithoutDeviceProfileInput;
};

export type DeviceManagerWhereInput = {
  AND?: InputMaybe<Array<DeviceManagerWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  Device?: InputMaybe<DeviceWhereInput>;
  DeviceProfile?: InputMaybe<DeviceProfileListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<DeviceManagerWhereInput>>;
  OR?: InputMaybe<Array<DeviceManagerWhereInput>>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type DeviceManagerWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type DeviceMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  deviceManagerId?: InputMaybe<SortOrder>;
  deviceType?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  pushTokenId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DeviceMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  deviceManagerId?: InputMaybe<SortOrder>;
  deviceType?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  pushTokenId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DeviceOrderByWithAggregationInput = {
  _count?: InputMaybe<DeviceCountOrderByAggregateInput>;
  _max?: InputMaybe<DeviceMaxOrderByAggregateInput>;
  _min?: InputMaybe<DeviceMinOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  deviceManagerId?: InputMaybe<SortOrder>;
  deviceType?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  pushTokenId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DeviceOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  DeviceManager?: InputMaybe<DeviceManagerOrderByWithRelationInput>;
  deviceManagerId?: InputMaybe<SortOrder>;
  deviceType?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  PushToken?: InputMaybe<PushTokenOrderByWithRelationInput>;
  pushTokenId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DeviceProfileCountOrderByAggregateInput = {
  accesstoken?: InputMaybe<SortOrder>;
  AppType?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  deviceManagerId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  ProfileType?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DeviceProfileCreateInput = {
  accesstoken?: InputMaybe<Scalars['String']>;
  AppType: AppType;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  DeviceManager: DeviceManagerCreateNestedOneWithoutDeviceProfileInput;
  id?: InputMaybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  profileId: Scalars['String'];
  ProfileType: ProfileType;
  RefreshToken?: InputMaybe<RefreshTokenCreateNestedOneWithoutDeviceProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type DeviceProfileCreateManyDeviceManagerInput = {
  accesstoken?: InputMaybe<Scalars['String']>;
  AppType: AppType;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  profileId: Scalars['String'];
  ProfileType: ProfileType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type DeviceProfileCreateManyDeviceManagerInputEnvelope = {
  data: Array<DeviceProfileCreateManyDeviceManagerInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type DeviceProfileCreateManyInput = {
  accesstoken?: InputMaybe<Scalars['String']>;
  AppType: AppType;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  deviceManagerId: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  profileId: Scalars['String'];
  ProfileType: ProfileType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type DeviceProfileCreateNestedManyWithoutDeviceManagerInput = {
  connect?: InputMaybe<Array<DeviceProfileWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DeviceProfileCreateOrConnectWithoutDeviceManagerInput>>;
  create?: InputMaybe<Array<DeviceProfileCreateWithoutDeviceManagerInput>>;
  createMany?: InputMaybe<DeviceProfileCreateManyDeviceManagerInputEnvelope>;
};

export type DeviceProfileCreateNestedOneWithoutRefreshTokenInput = {
  connect?: InputMaybe<DeviceProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DeviceProfileCreateOrConnectWithoutRefreshTokenInput>;
  create?: InputMaybe<DeviceProfileCreateWithoutRefreshTokenInput>;
};

export type DeviceProfileCreateOrConnectWithoutDeviceManagerInput = {
  create: DeviceProfileCreateWithoutDeviceManagerInput;
  where: DeviceProfileWhereUniqueInput;
};

export type DeviceProfileCreateOrConnectWithoutRefreshTokenInput = {
  create: DeviceProfileCreateWithoutRefreshTokenInput;
  where: DeviceProfileWhereUniqueInput;
};

export type DeviceProfileCreateWithoutDeviceManagerInput = {
  accesstoken?: InputMaybe<Scalars['String']>;
  AppType: AppType;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  profileId: Scalars['String'];
  ProfileType: ProfileType;
  RefreshToken?: InputMaybe<RefreshTokenCreateNestedOneWithoutDeviceProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type DeviceProfileCreateWithoutRefreshTokenInput = {
  accesstoken?: InputMaybe<Scalars['String']>;
  AppType: AppType;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  DeviceManager: DeviceManagerCreateNestedOneWithoutDeviceProfileInput;
  id?: InputMaybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  profileId: Scalars['String'];
  ProfileType: ProfileType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type DeviceProfileListRelationFilter = {
  every?: InputMaybe<DeviceProfileWhereInput>;
  none?: InputMaybe<DeviceProfileWhereInput>;
  some?: InputMaybe<DeviceProfileWhereInput>;
};

export type DeviceProfileMaxOrderByAggregateInput = {
  accesstoken?: InputMaybe<SortOrder>;
  AppType?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  deviceManagerId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  ProfileType?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DeviceProfileMinOrderByAggregateInput = {
  accesstoken?: InputMaybe<SortOrder>;
  AppType?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  deviceManagerId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  ProfileType?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DeviceProfileOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type DeviceProfileOrderByWithAggregationInput = {
  _count?: InputMaybe<DeviceProfileCountOrderByAggregateInput>;
  _max?: InputMaybe<DeviceProfileMaxOrderByAggregateInput>;
  _min?: InputMaybe<DeviceProfileMinOrderByAggregateInput>;
  accesstoken?: InputMaybe<SortOrder>;
  AppType?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  deviceManagerId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  ProfileType?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DeviceProfileOrderByWithRelationInput = {
  accesstoken?: InputMaybe<SortOrder>;
  AppType?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  DeviceManager?: InputMaybe<DeviceManagerOrderByWithRelationInput>;
  deviceManagerId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  ProfileType?: InputMaybe<SortOrder>;
  RefreshToken?: InputMaybe<RefreshTokenOrderByWithRelationInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DeviceProfileRelationFilter = {
  is?: InputMaybe<DeviceProfileWhereInput>;
  isNot?: InputMaybe<DeviceProfileWhereInput>;
};

export enum DeviceProfileScalarFieldEnum {
  Accesstoken = 'accesstoken',
  AppType = 'AppType',
  CreatedAt = 'createdAt',
  DeviceManagerId = 'deviceManagerId',
  Id = 'id',
  IsActive = 'isActive',
  ProfileId = 'profileId',
  ProfileType = 'ProfileType',
  UpdatedAt = 'updatedAt'
}

export type DeviceProfileScalarWhereInput = {
  accesstoken?: InputMaybe<StringNullableFilter>;
  AND?: InputMaybe<Array<DeviceProfileScalarWhereInput>>;
  AppType?: InputMaybe<EnumAppTypeFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deviceManagerId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  NOT?: InputMaybe<Array<DeviceProfileScalarWhereInput>>;
  OR?: InputMaybe<Array<DeviceProfileScalarWhereInput>>;
  profileId?: InputMaybe<StringFilter>;
  ProfileType?: InputMaybe<EnumProfileTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type DeviceProfileScalarWhereWithAggregatesInput = {
  accesstoken?: InputMaybe<StringNullableWithAggregatesFilter>;
  AND?: InputMaybe<Array<DeviceProfileScalarWhereWithAggregatesInput>>;
  AppType?: InputMaybe<EnumAppTypeWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  deviceManagerId?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  isActive?: InputMaybe<BoolWithAggregatesFilter>;
  NOT?: InputMaybe<Array<DeviceProfileScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<DeviceProfileScalarWhereWithAggregatesInput>>;
  profileId?: InputMaybe<StringWithAggregatesFilter>;
  ProfileType?: InputMaybe<EnumProfileTypeWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type DeviceProfileUpdateInput = {
  accesstoken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  AppType?: InputMaybe<EnumAppTypeFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  DeviceManager?: InputMaybe<DeviceManagerUpdateOneRequiredWithoutDeviceProfileNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  profileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  RefreshToken?: InputMaybe<RefreshTokenUpdateOneWithoutDeviceProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type DeviceProfileUpdateManyMutationInput = {
  accesstoken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  AppType?: InputMaybe<EnumAppTypeFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  profileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type DeviceProfileUpdateManyWithoutDeviceManagerNestedInput = {
  connect?: InputMaybe<Array<DeviceProfileWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DeviceProfileCreateOrConnectWithoutDeviceManagerInput>>;
  create?: InputMaybe<Array<DeviceProfileCreateWithoutDeviceManagerInput>>;
  createMany?: InputMaybe<DeviceProfileCreateManyDeviceManagerInputEnvelope>;
  delete?: InputMaybe<Array<DeviceProfileWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<DeviceProfileScalarWhereInput>>;
  disconnect?: InputMaybe<Array<DeviceProfileWhereUniqueInput>>;
  set?: InputMaybe<Array<DeviceProfileWhereUniqueInput>>;
  update?: InputMaybe<Array<DeviceProfileUpdateWithWhereUniqueWithoutDeviceManagerInput>>;
  updateMany?: InputMaybe<Array<DeviceProfileUpdateManyWithWhereWithoutDeviceManagerInput>>;
  upsert?: InputMaybe<Array<DeviceProfileUpsertWithWhereUniqueWithoutDeviceManagerInput>>;
};

export type DeviceProfileUpdateManyWithWhereWithoutDeviceManagerInput = {
  data: DeviceProfileUpdateManyMutationInput;
  where: DeviceProfileScalarWhereInput;
};

export type DeviceProfileUpdateOneWithoutRefreshTokenNestedInput = {
  connect?: InputMaybe<DeviceProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DeviceProfileCreateOrConnectWithoutRefreshTokenInput>;
  create?: InputMaybe<DeviceProfileCreateWithoutRefreshTokenInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<DeviceProfileUpdateWithoutRefreshTokenInput>;
  upsert?: InputMaybe<DeviceProfileUpsertWithoutRefreshTokenInput>;
};

export type DeviceProfileUpdateWithoutDeviceManagerInput = {
  accesstoken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  AppType?: InputMaybe<EnumAppTypeFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  profileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  RefreshToken?: InputMaybe<RefreshTokenUpdateOneWithoutDeviceProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type DeviceProfileUpdateWithoutRefreshTokenInput = {
  accesstoken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  AppType?: InputMaybe<EnumAppTypeFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  DeviceManager?: InputMaybe<DeviceManagerUpdateOneRequiredWithoutDeviceProfileNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  profileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type DeviceProfileUpdateWithWhereUniqueWithoutDeviceManagerInput = {
  data: DeviceProfileUpdateWithoutDeviceManagerInput;
  where: DeviceProfileWhereUniqueInput;
};

export type DeviceProfileUpsertWithoutRefreshTokenInput = {
  create: DeviceProfileCreateWithoutRefreshTokenInput;
  update: DeviceProfileUpdateWithoutRefreshTokenInput;
};

export type DeviceProfileUpsertWithWhereUniqueWithoutDeviceManagerInput = {
  create: DeviceProfileCreateWithoutDeviceManagerInput;
  update: DeviceProfileUpdateWithoutDeviceManagerInput;
  where: DeviceProfileWhereUniqueInput;
};

export type DeviceProfileWhereInput = {
  accesstoken?: InputMaybe<StringNullableFilter>;
  AND?: InputMaybe<Array<DeviceProfileWhereInput>>;
  AppType?: InputMaybe<EnumAppTypeFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  DeviceManager?: InputMaybe<DeviceManagerWhereInput>;
  deviceManagerId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  NOT?: InputMaybe<Array<DeviceProfileWhereInput>>;
  OR?: InputMaybe<Array<DeviceProfileWhereInput>>;
  profileId?: InputMaybe<StringFilter>;
  ProfileType?: InputMaybe<EnumProfileTypeFilter>;
  RefreshToken?: InputMaybe<RefreshTokenWhereInput>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type DeviceProfileWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type DeviceRelationFilter = {
  is?: InputMaybe<DeviceWhereInput>;
  isNot?: InputMaybe<DeviceWhereInput>;
};

export enum DeviceScalarFieldEnum {
  CreatedAt = 'createdAt',
  DeviceManagerId = 'deviceManagerId',
  DeviceType = 'deviceType',
  Id = 'id',
  PushTokenId = 'pushTokenId',
  UpdatedAt = 'updatedAt'
}

export type DeviceScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<DeviceScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeNullableWithAggregatesFilter>;
  deviceManagerId?: InputMaybe<StringWithAggregatesFilter>;
  deviceType?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<DeviceScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<DeviceScalarWhereWithAggregatesInput>>;
  pushTokenId?: InputMaybe<StringNullableWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeNullableWithAggregatesFilter>;
};

export type DeviceUpdateInput = {
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  DeviceManager?: InputMaybe<DeviceManagerUpdateOneRequiredWithoutDeviceNestedInput>;
  deviceType?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  PushToken?: InputMaybe<PushTokenUpdateOneWithoutDeviceNestedInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type DeviceUpdateManyMutationInput = {
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  deviceType?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type DeviceUpdateOneWithoutDeviceManagerNestedInput = {
  connect?: InputMaybe<DeviceWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DeviceCreateOrConnectWithoutDeviceManagerInput>;
  create?: InputMaybe<DeviceCreateWithoutDeviceManagerInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<DeviceUpdateWithoutDeviceManagerInput>;
  upsert?: InputMaybe<DeviceUpsertWithoutDeviceManagerInput>;
};

export type DeviceUpdateOneWithoutPushTokenNestedInput = {
  connect?: InputMaybe<DeviceWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DeviceCreateOrConnectWithoutPushTokenInput>;
  create?: InputMaybe<DeviceCreateWithoutPushTokenInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<DeviceUpdateWithoutPushTokenInput>;
  upsert?: InputMaybe<DeviceUpsertWithoutPushTokenInput>;
};

export type DeviceUpdateWithoutDeviceManagerInput = {
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  deviceType?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  PushToken?: InputMaybe<PushTokenUpdateOneWithoutDeviceNestedInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type DeviceUpdateWithoutPushTokenInput = {
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  DeviceManager?: InputMaybe<DeviceManagerUpdateOneRequiredWithoutDeviceNestedInput>;
  deviceType?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type DeviceUpsertWithoutDeviceManagerInput = {
  create: DeviceCreateWithoutDeviceManagerInput;
  update: DeviceUpdateWithoutDeviceManagerInput;
};

export type DeviceUpsertWithoutPushTokenInput = {
  create: DeviceCreateWithoutPushTokenInput;
  update: DeviceUpdateWithoutPushTokenInput;
};

export type DeviceWhereInput = {
  AND?: InputMaybe<Array<DeviceWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  DeviceManager?: InputMaybe<DeviceManagerWhereInput>;
  deviceManagerId?: InputMaybe<StringFilter>;
  deviceType?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<DeviceWhereInput>>;
  OR?: InputMaybe<Array<DeviceWhereInput>>;
  PushToken?: InputMaybe<PushTokenWhereInput>;
  pushTokenId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type DeviceWhereUniqueInput = {
  deviceManagerId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  pushTokenId?: InputMaybe<Scalars['String']>;
};

export type Document = {
  __typename?: 'Document';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  LegalAgreement: Array<LegalAgreement>;
  TypeOfDocument: TypeOfDocument;
  updatedAt: Scalars['DateTime'];
};

export type DocumentAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type DocumentCountOrderByAggregateInput = {
  content?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  TypeOfDocument?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DocumentCreateInput = {
  content: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  LegalAgreement?: InputMaybe<LegalAgreementCreateNestedManyWithoutDocumentInput>;
  TypeOfDocument: TypeOfDocument;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type DocumentCreateManyInput = {
  content: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  TypeOfDocument: TypeOfDocument;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type DocumentCreateNestedOneWithoutLegalAgreementInput = {
  connect?: InputMaybe<DocumentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DocumentCreateOrConnectWithoutLegalAgreementInput>;
  create?: InputMaybe<DocumentCreateWithoutLegalAgreementInput>;
};

export type DocumentCreateOrConnectWithoutLegalAgreementInput = {
  create: DocumentCreateWithoutLegalAgreementInput;
  where: DocumentWhereUniqueInput;
};

export type DocumentCreateWithoutLegalAgreementInput = {
  content: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  TypeOfDocument: TypeOfDocument;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type DocumentMaxOrderByAggregateInput = {
  content?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  TypeOfDocument?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DocumentMinOrderByAggregateInput = {
  content?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  TypeOfDocument?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DocumentOrderByWithAggregationInput = {
  _avg?: InputMaybe<DocumentAvgOrderByAggregateInput>;
  _count?: InputMaybe<DocumentCountOrderByAggregateInput>;
  _max?: InputMaybe<DocumentMaxOrderByAggregateInput>;
  _min?: InputMaybe<DocumentMinOrderByAggregateInput>;
  _sum?: InputMaybe<DocumentSumOrderByAggregateInput>;
  content?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  TypeOfDocument?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DocumentOrderByWithRelationInput = {
  content?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  LegalAgreement?: InputMaybe<LegalAgreementOrderByRelationAggregateInput>;
  TypeOfDocument?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DocumentRelationFilter = {
  is?: InputMaybe<DocumentWhereInput>;
  isNot?: InputMaybe<DocumentWhereInput>;
};

export enum DocumentScalarFieldEnum {
  Content = 'content',
  CreatedAt = 'createdAt',
  Id = 'id',
  TypeOfDocument = 'TypeOfDocument',
  UpdatedAt = 'updatedAt'
}

export type DocumentScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<DocumentScalarWhereWithAggregatesInput>>;
  content?: InputMaybe<StringWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  NOT?: InputMaybe<Array<DocumentScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<DocumentScalarWhereWithAggregatesInput>>;
  TypeOfDocument?: InputMaybe<EnumTypeOfDocumentWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type DocumentSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type DocumentUpdateInput = {
  content?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  LegalAgreement?: InputMaybe<LegalAgreementUpdateManyWithoutDocumentNestedInput>;
  TypeOfDocument?: InputMaybe<EnumTypeOfDocumentFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type DocumentUpdateManyMutationInput = {
  content?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  TypeOfDocument?: InputMaybe<EnumTypeOfDocumentFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type DocumentUpdateOneRequiredWithoutLegalAgreementNestedInput = {
  connect?: InputMaybe<DocumentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DocumentCreateOrConnectWithoutLegalAgreementInput>;
  create?: InputMaybe<DocumentCreateWithoutLegalAgreementInput>;
  update?: InputMaybe<DocumentUpdateWithoutLegalAgreementInput>;
  upsert?: InputMaybe<DocumentUpsertWithoutLegalAgreementInput>;
};

export type DocumentUpdateWithoutLegalAgreementInput = {
  content?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  TypeOfDocument?: InputMaybe<EnumTypeOfDocumentFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type DocumentUpsertWithoutLegalAgreementInput = {
  create: DocumentCreateWithoutLegalAgreementInput;
  update: DocumentUpdateWithoutLegalAgreementInput;
};

export type DocumentWhereInput = {
  AND?: InputMaybe<Array<DocumentWhereInput>>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  LegalAgreement?: InputMaybe<LegalAgreementListRelationFilter>;
  NOT?: InputMaybe<Array<DocumentWhereInput>>;
  OR?: InputMaybe<Array<DocumentWhereInput>>;
  TypeOfDocument?: InputMaybe<EnumTypeOfDocumentFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type DocumentWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type Email = {
  __typename?: 'Email';
  AuthenticationProvider: Array<AuthenticationProvider>;
  canUseAsRecovery?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};


export type EmailAuthenticationProviderArgs = {
  cursor?: InputMaybe<AuthenticationProviderWhereUniqueInput>;
  distinct?: InputMaybe<Array<AuthenticationProviderScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AuthenticationProviderOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AuthenticationProviderWhereInput>;
};

export type EmailAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type EmailCountOrderByAggregateInput = {
  canUseAsRecovery?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type EmailCreateInput = {
  AuthenticationProvider?: InputMaybe<AuthenticationProviderCreateNestedManyWithoutEmailsInput>;
  canUseAsRecovery?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type EmailCreateManyInput = {
  canUseAsRecovery?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  id?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type EmailCreateNestedManyWithoutAuthenticationProviderInput = {
  connect?: InputMaybe<Array<EmailWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EmailCreateOrConnectWithoutAuthenticationProviderInput>>;
  create?: InputMaybe<Array<EmailCreateWithoutAuthenticationProviderInput>>;
};

export type EmailCreateOrConnectWithoutAuthenticationProviderInput = {
  create: EmailCreateWithoutAuthenticationProviderInput;
  where: EmailWhereUniqueInput;
};

export type EmailCreateWithoutAuthenticationProviderInput = {
  canUseAsRecovery?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type EmailInput = {
  email?: InputMaybe<Scalars['String']>;
};

export type EmailListRelationFilter = {
  every?: InputMaybe<EmailWhereInput>;
  none?: InputMaybe<EmailWhereInput>;
  some?: InputMaybe<EmailWhereInput>;
};

export type EmailMaxOrderByAggregateInput = {
  canUseAsRecovery?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type EmailMinOrderByAggregateInput = {
  canUseAsRecovery?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type EmailOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type EmailOrderByWithAggregationInput = {
  _avg?: InputMaybe<EmailAvgOrderByAggregateInput>;
  _count?: InputMaybe<EmailCountOrderByAggregateInput>;
  _max?: InputMaybe<EmailMaxOrderByAggregateInput>;
  _min?: InputMaybe<EmailMinOrderByAggregateInput>;
  _sum?: InputMaybe<EmailSumOrderByAggregateInput>;
  canUseAsRecovery?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type EmailOrderByWithRelationInput = {
  AuthenticationProvider?: InputMaybe<AuthenticationProviderOrderByRelationAggregateInput>;
  canUseAsRecovery?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum EmailScalarFieldEnum {
  CanUseAsRecovery = 'canUseAsRecovery',
  CreatedAt = 'createdAt',
  Email = 'email',
  Id = 'id',
  UpdatedAt = 'updatedAt'
}

export type EmailScalarWhereInput = {
  AND?: InputMaybe<Array<EmailScalarWhereInput>>;
  canUseAsRecovery?: InputMaybe<BoolNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  NOT?: InputMaybe<Array<EmailScalarWhereInput>>;
  OR?: InputMaybe<Array<EmailScalarWhereInput>>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type EmailScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<EmailScalarWhereWithAggregatesInput>>;
  canUseAsRecovery?: InputMaybe<BoolNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  email?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  NOT?: InputMaybe<Array<EmailScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<EmailScalarWhereWithAggregatesInput>>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type EmailSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type EmailUpdateInput = {
  AuthenticationProvider?: InputMaybe<AuthenticationProviderUpdateManyWithoutEmailsNestedInput>;
  canUseAsRecovery?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type EmailUpdateManyMutationInput = {
  canUseAsRecovery?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type EmailUpdateManyWithoutAuthenticationProviderNestedInput = {
  connect?: InputMaybe<Array<EmailWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EmailCreateOrConnectWithoutAuthenticationProviderInput>>;
  create?: InputMaybe<Array<EmailCreateWithoutAuthenticationProviderInput>>;
  delete?: InputMaybe<Array<EmailWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<EmailScalarWhereInput>>;
  disconnect?: InputMaybe<Array<EmailWhereUniqueInput>>;
  set?: InputMaybe<Array<EmailWhereUniqueInput>>;
  update?: InputMaybe<Array<EmailUpdateWithWhereUniqueWithoutAuthenticationProviderInput>>;
  updateMany?: InputMaybe<Array<EmailUpdateManyWithWhereWithoutAuthenticationProviderInput>>;
  upsert?: InputMaybe<Array<EmailUpsertWithWhereUniqueWithoutAuthenticationProviderInput>>;
};

export type EmailUpdateManyWithWhereWithoutAuthenticationProviderInput = {
  data: EmailUpdateManyMutationInput;
  where: EmailScalarWhereInput;
};

export type EmailUpdateWithoutAuthenticationProviderInput = {
  canUseAsRecovery?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type EmailUpdateWithWhereUniqueWithoutAuthenticationProviderInput = {
  data: EmailUpdateWithoutAuthenticationProviderInput;
  where: EmailWhereUniqueInput;
};

export type EmailUpsertWithWhereUniqueWithoutAuthenticationProviderInput = {
  create: EmailCreateWithoutAuthenticationProviderInput;
  update: EmailUpdateWithoutAuthenticationProviderInput;
  where: EmailWhereUniqueInput;
};

export type EmailWhereInput = {
  AND?: InputMaybe<Array<EmailWhereInput>>;
  AuthenticationProvider?: InputMaybe<AuthenticationProviderListRelationFilter>;
  canUseAsRecovery?: InputMaybe<BoolNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  NOT?: InputMaybe<Array<EmailWhereInput>>;
  OR?: InputMaybe<Array<EmailWhereInput>>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type EmailWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type Emojimood = {
  __typename?: 'Emojimood';
  colors: Array<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  emojiname?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type EmojimoodAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type EmojimoodCountOrderByAggregateInput = {
  colors?: InputMaybe<SortOrder>;
  emoji?: InputMaybe<SortOrder>;
  emojiname?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type EmojimoodCreatecolorsInput = {
  set: Array<Scalars['String']>;
};

export type EmojimoodCreateInput = {
  colors?: InputMaybe<Array<Scalars['String']>>;
  emoji?: InputMaybe<Scalars['String']>;
  emojiname?: InputMaybe<Scalars['String']>;
  Story?: InputMaybe<StoryCreateNestedManyWithoutEmojimoodInput>;
};

export type EmojimoodCreateManyInput = {
  colors?: InputMaybe<Array<Scalars['String']>>;
  emoji?: InputMaybe<Scalars['String']>;
  emojiname?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
};

export type EmojimoodCreateNestedOneWithoutStoryInput = {
  connect?: InputMaybe<EmojimoodWhereUniqueInput>;
  connectOrCreate?: InputMaybe<EmojimoodCreateOrConnectWithoutStoryInput>;
  create?: InputMaybe<EmojimoodCreateWithoutStoryInput>;
};

export type EmojimoodCreateOrConnectWithoutStoryInput = {
  create: EmojimoodCreateWithoutStoryInput;
  where: EmojimoodWhereUniqueInput;
};

export type EmojimoodCreateWithoutStoryInput = {
  colors?: InputMaybe<Array<Scalars['String']>>;
  emoji?: InputMaybe<Scalars['String']>;
  emojiname?: InputMaybe<Scalars['String']>;
};

export type EmojimoodMaxOrderByAggregateInput = {
  emoji?: InputMaybe<SortOrder>;
  emojiname?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type EmojimoodMinOrderByAggregateInput = {
  emoji?: InputMaybe<SortOrder>;
  emojiname?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type EmojimoodOrderByWithAggregationInput = {
  _avg?: InputMaybe<EmojimoodAvgOrderByAggregateInput>;
  _count?: InputMaybe<EmojimoodCountOrderByAggregateInput>;
  _max?: InputMaybe<EmojimoodMaxOrderByAggregateInput>;
  _min?: InputMaybe<EmojimoodMinOrderByAggregateInput>;
  _sum?: InputMaybe<EmojimoodSumOrderByAggregateInput>;
  colors?: InputMaybe<SortOrder>;
  emoji?: InputMaybe<SortOrder>;
  emojiname?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type EmojimoodOrderByWithRelationInput = {
  colors?: InputMaybe<SortOrder>;
  emoji?: InputMaybe<SortOrder>;
  emojiname?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  Story?: InputMaybe<StoryOrderByRelationAggregateInput>;
};

export type EmojimoodRelationFilter = {
  is?: InputMaybe<EmojimoodWhereInput>;
  isNot?: InputMaybe<EmojimoodWhereInput>;
};

export enum EmojimoodScalarFieldEnum {
  Colors = 'colors',
  Emoji = 'emoji',
  Emojiname = 'emojiname',
  Id = 'id'
}

export type EmojimoodScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<EmojimoodScalarWhereWithAggregatesInput>>;
  colors?: InputMaybe<StringNullableListFilter>;
  emoji?: InputMaybe<StringNullableWithAggregatesFilter>;
  emojiname?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  NOT?: InputMaybe<Array<EmojimoodScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<EmojimoodScalarWhereWithAggregatesInput>>;
};

export type EmojimoodSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type EmojimoodUpdatecolorsInput = {
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type EmojimoodUpdateInput = {
  colors?: InputMaybe<Array<Scalars['String']>>;
  emoji?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  emojiname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  Story?: InputMaybe<StoryUpdateManyWithoutEmojimoodNestedInput>;
};

export type EmojimoodUpdateManyMutationInput = {
  colors?: InputMaybe<Array<Scalars['String']>>;
  emoji?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  emojiname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type EmojimoodUpdateOneWithoutStoryNestedInput = {
  connect?: InputMaybe<EmojimoodWhereUniqueInput>;
  connectOrCreate?: InputMaybe<EmojimoodCreateOrConnectWithoutStoryInput>;
  create?: InputMaybe<EmojimoodCreateWithoutStoryInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<EmojimoodUpdateWithoutStoryInput>;
  upsert?: InputMaybe<EmojimoodUpsertWithoutStoryInput>;
};

export type EmojimoodUpdateWithoutStoryInput = {
  colors?: InputMaybe<Array<Scalars['String']>>;
  emoji?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  emojiname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type EmojimoodUpsertWithoutStoryInput = {
  create: EmojimoodCreateWithoutStoryInput;
  update: EmojimoodUpdateWithoutStoryInput;
};

export type EmojimoodWhereInput = {
  AND?: InputMaybe<Array<EmojimoodWhereInput>>;
  colors?: InputMaybe<StringNullableListFilter>;
  emoji?: InputMaybe<StringNullableFilter>;
  emojiname?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  NOT?: InputMaybe<Array<EmojimoodWhereInput>>;
  OR?: InputMaybe<Array<EmojimoodWhereInput>>;
  Story?: InputMaybe<StoryListRelationFilter>;
};

export type EmojimoodWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type EnumAppTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<AppType>;
};

export type EnumAppTypeFilter = {
  equals?: InputMaybe<AppType>;
  in?: InputMaybe<Array<AppType>>;
  not?: InputMaybe<AppType>;
  notIn?: InputMaybe<Array<AppType>>;
};

export type EnumAppTypeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumAppTypeFilter>;
  _min?: InputMaybe<NestedEnumAppTypeFilter>;
  equals?: InputMaybe<AppType>;
  in?: InputMaybe<Array<AppType>>;
  not?: InputMaybe<AppType>;
  notIn?: InputMaybe<Array<AppType>>;
};

export type EnumOutTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<OutType>;
};

export type EnumOutTypeFilter = {
  equals?: InputMaybe<OutType>;
  in?: InputMaybe<Array<OutType>>;
  not?: InputMaybe<OutType>;
  notIn?: InputMaybe<Array<OutType>>;
};

export type EnumOutTypeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumOutTypeFilter>;
  _min?: InputMaybe<NestedEnumOutTypeFilter>;
  equals?: InputMaybe<OutType>;
  in?: InputMaybe<Array<OutType>>;
  not?: InputMaybe<OutType>;
  notIn?: InputMaybe<Array<OutType>>;
};

export type EnumPhotoTypeNullableFilter = {
  equals?: InputMaybe<PhotoType>;
  in?: InputMaybe<Array<PhotoType>>;
  not?: InputMaybe<PhotoType>;
  notIn?: InputMaybe<Array<PhotoType>>;
};

export type EnumPhotoTypeNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedEnumPhotoTypeNullableFilter>;
  _min?: InputMaybe<NestedEnumPhotoTypeNullableFilter>;
  equals?: InputMaybe<PhotoType>;
  in?: InputMaybe<Array<PhotoType>>;
  not?: InputMaybe<PhotoType>;
  notIn?: InputMaybe<Array<PhotoType>>;
};

export type EnumProfileTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<ProfileType>;
};

export type EnumProfileTypeFilter = {
  equals?: InputMaybe<ProfileType>;
  in?: InputMaybe<Array<ProfileType>>;
  not?: InputMaybe<ProfileType>;
  notIn?: InputMaybe<Array<ProfileType>>;
};

export type EnumProfileTypeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumProfileTypeFilter>;
  _min?: InputMaybe<NestedEnumProfileTypeFilter>;
  equals?: InputMaybe<ProfileType>;
  in?: InputMaybe<Array<ProfileType>>;
  not?: InputMaybe<ProfileType>;
  notIn?: InputMaybe<Array<ProfileType>>;
};

export type EnumRelationshipStatusNullableListFilter = {
  equals?: InputMaybe<Array<RelationshipStatus>>;
  has?: InputMaybe<RelationshipStatus>;
  hasEvery?: InputMaybe<Array<RelationshipStatus>>;
  hasSome?: InputMaybe<Array<RelationshipStatus>>;
  isEmpty?: InputMaybe<Scalars['Boolean']>;
};

export type EnumSecureDataTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<SecureDataType>;
};

export type EnumSecureDataTypeFilter = {
  equals?: InputMaybe<SecureDataType>;
  in?: InputMaybe<Array<SecureDataType>>;
  not?: InputMaybe<SecureDataType>;
  notIn?: InputMaybe<Array<SecureDataType>>;
};

export type EnumSecureDataTypeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumSecureDataTypeFilter>;
  _min?: InputMaybe<NestedEnumSecureDataTypeFilter>;
  equals?: InputMaybe<SecureDataType>;
  in?: InputMaybe<Array<SecureDataType>>;
  not?: InputMaybe<SecureDataType>;
  notIn?: InputMaybe<Array<SecureDataType>>;
};

export type EnumTypeOfDocumentFieldUpdateOperationsInput = {
  set?: InputMaybe<TypeOfDocument>;
};

export type EnumTypeOfDocumentFilter = {
  equals?: InputMaybe<TypeOfDocument>;
  in?: InputMaybe<Array<TypeOfDocument>>;
  not?: InputMaybe<TypeOfDocument>;
  notIn?: InputMaybe<Array<TypeOfDocument>>;
};

export type EnumTypeOfDocumentWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumTypeOfDocumentFilter>;
  _min?: InputMaybe<NestedEnumTypeOfDocumentFilter>;
  equals?: InputMaybe<TypeOfDocument>;
  in?: InputMaybe<Array<TypeOfDocument>>;
  not?: InputMaybe<TypeOfDocument>;
  notIn?: InputMaybe<Array<TypeOfDocument>>;
};

/** Long necks, cool patterns, taller than you. */
export type Error = {
  __typename?: 'Error';
  errorCode: Scalars['String'];
  message: Scalars['String'];
};

export type ExploreResponse = {
  __typename?: 'ExploreResponse';
  events?: Maybe<Array<Scalars['Json']>>;
  people: Array<Personal>;
  venues: Array<Venue>;
};

export type FloatFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Float']>;
  divide?: InputMaybe<Scalars['Float']>;
  increment?: InputMaybe<Scalars['Float']>;
  multiply?: InputMaybe<Scalars['Float']>;
  set?: InputMaybe<Scalars['Float']>;
};

export type FloatFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type FloatWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedFloatFilter>;
  _min?: InputMaybe<NestedFloatFilter>;
  _sum?: InputMaybe<NestedFloatFilter>;
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type FriendRequest = {
  __typename?: 'FriendRequest';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  Notifications: Array<Notifications>;
  NotificationStatus: NotificationStatus;
  notificationStatusId: Scalars['String'];
  receiverProfile: Profile;
  receiverProfileId: Scalars['String'];
  senderProfile: Profile;
  senderProfileId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type FriendRequestCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  notificationStatusId?: InputMaybe<SortOrder>;
  receiverProfileId?: InputMaybe<SortOrder>;
  senderProfileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type FriendRequestCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  Notifications?: InputMaybe<NotificationsCreateNestedManyWithoutFriendRequestsInput>;
  NotificationStatus: NotificationStatusCreateNestedOneWithoutFriendRequestInput;
  receiverProfileId: Scalars['String'];
  senderProfileId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type FriendRequestCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  notificationStatusId: Scalars['String'];
  receiverProfileId: Scalars['String'];
  senderProfileId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type FriendRequestCreateNestedManyWithoutNotificationsInput = {
  connect?: InputMaybe<Array<FriendRequestWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<FriendRequestCreateOrConnectWithoutNotificationsInput>>;
  create?: InputMaybe<Array<FriendRequestCreateWithoutNotificationsInput>>;
};

export type FriendRequestCreateNestedOneWithoutNotificationStatusInput = {
  connect?: InputMaybe<FriendRequestWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FriendRequestCreateOrConnectWithoutNotificationStatusInput>;
  create?: InputMaybe<FriendRequestCreateWithoutNotificationStatusInput>;
};

export type FriendRequestCreateOrConnectWithoutNotificationsInput = {
  create: FriendRequestCreateWithoutNotificationsInput;
  where: FriendRequestWhereUniqueInput;
};

export type FriendRequestCreateOrConnectWithoutNotificationStatusInput = {
  create: FriendRequestCreateWithoutNotificationStatusInput;
  where: FriendRequestWhereUniqueInput;
};

export type FriendRequestCreateWithoutNotificationsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  NotificationStatus: NotificationStatusCreateNestedOneWithoutFriendRequestInput;
  receiverProfileId: Scalars['String'];
  senderProfileId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type FriendRequestCreateWithoutNotificationStatusInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  Notifications?: InputMaybe<NotificationsCreateNestedManyWithoutFriendRequestsInput>;
  receiverProfileId: Scalars['String'];
  senderProfileId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type FriendRequestListRelationFilter = {
  every?: InputMaybe<FriendRequestWhereInput>;
  none?: InputMaybe<FriendRequestWhereInput>;
  some?: InputMaybe<FriendRequestWhereInput>;
};

export type FriendRequestMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  notificationStatusId?: InputMaybe<SortOrder>;
  receiverProfileId?: InputMaybe<SortOrder>;
  senderProfileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type FriendRequestMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  notificationStatusId?: InputMaybe<SortOrder>;
  receiverProfileId?: InputMaybe<SortOrder>;
  senderProfileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type FriendRequestOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FriendRequestOrderByWithAggregationInput = {
  _count?: InputMaybe<FriendRequestCountOrderByAggregateInput>;
  _max?: InputMaybe<FriendRequestMaxOrderByAggregateInput>;
  _min?: InputMaybe<FriendRequestMinOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  notificationStatusId?: InputMaybe<SortOrder>;
  receiverProfileId?: InputMaybe<SortOrder>;
  senderProfileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type FriendRequestOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  Notifications?: InputMaybe<NotificationsOrderByRelationAggregateInput>;
  NotificationStatus?: InputMaybe<NotificationStatusOrderByWithRelationInput>;
  notificationStatusId?: InputMaybe<SortOrder>;
  receiverProfileId?: InputMaybe<SortOrder>;
  senderProfileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type FriendRequestRelationFilter = {
  is?: InputMaybe<FriendRequestWhereInput>;
  isNot?: InputMaybe<FriendRequestWhereInput>;
};

export enum FriendRequestScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  NotificationStatusId = 'notificationStatusId',
  ReceiverProfileId = 'receiverProfileId',
  SenderProfileId = 'senderProfileId',
  UpdatedAt = 'updatedAt'
}

export type FriendRequestScalarWhereInput = {
  AND?: InputMaybe<Array<FriendRequestScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<FriendRequestScalarWhereInput>>;
  notificationStatusId?: InputMaybe<StringFilter>;
  OR?: InputMaybe<Array<FriendRequestScalarWhereInput>>;
  receiverProfileId?: InputMaybe<StringFilter>;
  senderProfileId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type FriendRequestScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<FriendRequestScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<FriendRequestScalarWhereWithAggregatesInput>>;
  notificationStatusId?: InputMaybe<StringWithAggregatesFilter>;
  OR?: InputMaybe<Array<FriendRequestScalarWhereWithAggregatesInput>>;
  receiverProfileId?: InputMaybe<StringWithAggregatesFilter>;
  senderProfileId?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type FriendRequestUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Notifications?: InputMaybe<NotificationsUpdateManyWithoutFriendRequestsNestedInput>;
  NotificationStatus?: InputMaybe<NotificationStatusUpdateOneRequiredWithoutFriendRequestNestedInput>;
  receiverProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  senderProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type FriendRequestUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  receiverProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  senderProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type FriendRequestUpdateManyWithoutNotificationsNestedInput = {
  connect?: InputMaybe<Array<FriendRequestWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<FriendRequestCreateOrConnectWithoutNotificationsInput>>;
  create?: InputMaybe<Array<FriendRequestCreateWithoutNotificationsInput>>;
  delete?: InputMaybe<Array<FriendRequestWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<FriendRequestScalarWhereInput>>;
  disconnect?: InputMaybe<Array<FriendRequestWhereUniqueInput>>;
  set?: InputMaybe<Array<FriendRequestWhereUniqueInput>>;
  update?: InputMaybe<Array<FriendRequestUpdateWithWhereUniqueWithoutNotificationsInput>>;
  updateMany?: InputMaybe<Array<FriendRequestUpdateManyWithWhereWithoutNotificationsInput>>;
  upsert?: InputMaybe<Array<FriendRequestUpsertWithWhereUniqueWithoutNotificationsInput>>;
};

export type FriendRequestUpdateManyWithWhereWithoutNotificationsInput = {
  data: FriendRequestUpdateManyMutationInput;
  where: FriendRequestScalarWhereInput;
};

export type FriendRequestUpdateOneWithoutNotificationStatusNestedInput = {
  connect?: InputMaybe<FriendRequestWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FriendRequestCreateOrConnectWithoutNotificationStatusInput>;
  create?: InputMaybe<FriendRequestCreateWithoutNotificationStatusInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<FriendRequestUpdateWithoutNotificationStatusInput>;
  upsert?: InputMaybe<FriendRequestUpsertWithoutNotificationStatusInput>;
};

export type FriendRequestUpdateWithoutNotificationsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  NotificationStatus?: InputMaybe<NotificationStatusUpdateOneRequiredWithoutFriendRequestNestedInput>;
  receiverProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  senderProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type FriendRequestUpdateWithoutNotificationStatusInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Notifications?: InputMaybe<NotificationsUpdateManyWithoutFriendRequestsNestedInput>;
  receiverProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  senderProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type FriendRequestUpdateWithWhereUniqueWithoutNotificationsInput = {
  data: FriendRequestUpdateWithoutNotificationsInput;
  where: FriendRequestWhereUniqueInput;
};

export type FriendRequestUpsertWithoutNotificationStatusInput = {
  create: FriendRequestCreateWithoutNotificationStatusInput;
  update: FriendRequestUpdateWithoutNotificationStatusInput;
};

export type FriendRequestUpsertWithWhereUniqueWithoutNotificationsInput = {
  create: FriendRequestCreateWithoutNotificationsInput;
  update: FriendRequestUpdateWithoutNotificationsInput;
  where: FriendRequestWhereUniqueInput;
};

export type FriendRequestWhereInput = {
  AND?: InputMaybe<Array<FriendRequestWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<FriendRequestWhereInput>>;
  Notifications?: InputMaybe<NotificationsListRelationFilter>;
  NotificationStatus?: InputMaybe<NotificationStatusWhereInput>;
  notificationStatusId?: InputMaybe<StringFilter>;
  OR?: InputMaybe<Array<FriendRequestWhereInput>>;
  receiverProfileId?: InputMaybe<StringFilter>;
  senderProfileId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type FriendRequestWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  notificationStatusId?: InputMaybe<Scalars['String']>;
};

export type Geometry = {
  __typename?: 'Geometry';
  City?: Maybe<City>;
  Country?: Maybe<Country>;
  h3Index15?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  latitude: Scalars['Float'];
  Location?: Maybe<Location>;
  longitude: Scalars['Float'];
  State?: Maybe<State>;
};

export type GeometryAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
};

export type GeometryCountOrderByAggregateInput = {
  h3Index15?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
};

export type GeometryCreateInput = {
  City?: InputMaybe<CityCreateNestedOneWithoutGeometryInput>;
  Country?: InputMaybe<CountryCreateNestedOneWithoutGeometryInput>;
  h3Index15?: InputMaybe<Scalars['String']>;
  latitude: Scalars['Float'];
  Location?: InputMaybe<LocationCreateNestedOneWithoutGeometryInput>;
  longitude: Scalars['Float'];
  State?: InputMaybe<StateCreateNestedOneWithoutGeometryInput>;
};

export type GeometryCreateManyInput = {
  h3Index15?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type GeometryCreateNestedOneWithoutCityInput = {
  connect?: InputMaybe<GeometryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GeometryCreateOrConnectWithoutCityInput>;
  create?: InputMaybe<GeometryCreateWithoutCityInput>;
};

export type GeometryCreateNestedOneWithoutCountryInput = {
  connect?: InputMaybe<GeometryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GeometryCreateOrConnectWithoutCountryInput>;
  create?: InputMaybe<GeometryCreateWithoutCountryInput>;
};

export type GeometryCreateNestedOneWithoutLocationInput = {
  connect?: InputMaybe<GeometryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GeometryCreateOrConnectWithoutLocationInput>;
  create?: InputMaybe<GeometryCreateWithoutLocationInput>;
};

export type GeometryCreateNestedOneWithoutStateInput = {
  connect?: InputMaybe<GeometryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GeometryCreateOrConnectWithoutStateInput>;
  create?: InputMaybe<GeometryCreateWithoutStateInput>;
};

export type GeometryCreateOrConnectWithoutCityInput = {
  create: GeometryCreateWithoutCityInput;
  where: GeometryWhereUniqueInput;
};

export type GeometryCreateOrConnectWithoutCountryInput = {
  create: GeometryCreateWithoutCountryInput;
  where: GeometryWhereUniqueInput;
};

export type GeometryCreateOrConnectWithoutLocationInput = {
  create: GeometryCreateWithoutLocationInput;
  where: GeometryWhereUniqueInput;
};

export type GeometryCreateOrConnectWithoutStateInput = {
  create: GeometryCreateWithoutStateInput;
  where: GeometryWhereUniqueInput;
};

export type GeometryCreateWithoutCityInput = {
  Country?: InputMaybe<CountryCreateNestedOneWithoutGeometryInput>;
  h3Index15?: InputMaybe<Scalars['String']>;
  latitude: Scalars['Float'];
  Location?: InputMaybe<LocationCreateNestedOneWithoutGeometryInput>;
  longitude: Scalars['Float'];
  State?: InputMaybe<StateCreateNestedOneWithoutGeometryInput>;
};

export type GeometryCreateWithoutCountryInput = {
  City?: InputMaybe<CityCreateNestedOneWithoutGeometryInput>;
  h3Index15?: InputMaybe<Scalars['String']>;
  latitude: Scalars['Float'];
  Location?: InputMaybe<LocationCreateNestedOneWithoutGeometryInput>;
  longitude: Scalars['Float'];
  State?: InputMaybe<StateCreateNestedOneWithoutGeometryInput>;
};

export type GeometryCreateWithoutLocationInput = {
  City?: InputMaybe<CityCreateNestedOneWithoutGeometryInput>;
  Country?: InputMaybe<CountryCreateNestedOneWithoutGeometryInput>;
  h3Index15?: InputMaybe<Scalars['String']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  State?: InputMaybe<StateCreateNestedOneWithoutGeometryInput>;
};

export type GeometryCreateWithoutStateInput = {
  City?: InputMaybe<CityCreateNestedOneWithoutGeometryInput>;
  Country?: InputMaybe<CountryCreateNestedOneWithoutGeometryInput>;
  h3Index15?: InputMaybe<Scalars['String']>;
  latitude: Scalars['Float'];
  Location?: InputMaybe<LocationCreateNestedOneWithoutGeometryInput>;
  longitude: Scalars['Float'];
};

export type GeometryMaxOrderByAggregateInput = {
  h3Index15?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
};

export type GeometryMinOrderByAggregateInput = {
  h3Index15?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
};

export type GeometryOrderByWithAggregationInput = {
  _avg?: InputMaybe<GeometryAvgOrderByAggregateInput>;
  _count?: InputMaybe<GeometryCountOrderByAggregateInput>;
  _max?: InputMaybe<GeometryMaxOrderByAggregateInput>;
  _min?: InputMaybe<GeometryMinOrderByAggregateInput>;
  _sum?: InputMaybe<GeometrySumOrderByAggregateInput>;
  h3Index15?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
};

export type GeometryOrderByWithRelationInput = {
  City?: InputMaybe<CityOrderByWithRelationInput>;
  Country?: InputMaybe<CountryOrderByWithRelationInput>;
  h3Index15?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  Location?: InputMaybe<LocationOrderByWithRelationInput>;
  longitude?: InputMaybe<SortOrder>;
  State?: InputMaybe<StateOrderByWithRelationInput>;
};

export type GeometryRelationFilter = {
  is?: InputMaybe<GeometryWhereInput>;
  isNot?: InputMaybe<GeometryWhereInput>;
};

export enum GeometryScalarFieldEnum {
  H3Index15 = 'h3Index15',
  Id = 'id',
  Latitude = 'latitude',
  Longitude = 'longitude'
}

export type GeometryScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<GeometryScalarWhereWithAggregatesInput>>;
  h3Index15?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  latitude?: InputMaybe<FloatWithAggregatesFilter>;
  longitude?: InputMaybe<FloatWithAggregatesFilter>;
  NOT?: InputMaybe<Array<GeometryScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<GeometryScalarWhereWithAggregatesInput>>;
};

export type GeometrySumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
};

export type GeometryUpdateInput = {
  City?: InputMaybe<CityUpdateOneWithoutGeometryNestedInput>;
  Country?: InputMaybe<CountryUpdateOneWithoutGeometryNestedInput>;
  h3Index15?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  latitude?: InputMaybe<FloatFieldUpdateOperationsInput>;
  Location?: InputMaybe<LocationUpdateOneWithoutGeometryNestedInput>;
  longitude?: InputMaybe<FloatFieldUpdateOperationsInput>;
  State?: InputMaybe<StateUpdateOneWithoutGeometryNestedInput>;
};

export type GeometryUpdateManyMutationInput = {
  h3Index15?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  latitude?: InputMaybe<FloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<FloatFieldUpdateOperationsInput>;
};

export type GeometryUpdateOneRequiredWithoutCityNestedInput = {
  connect?: InputMaybe<GeometryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GeometryCreateOrConnectWithoutCityInput>;
  create?: InputMaybe<GeometryCreateWithoutCityInput>;
  update?: InputMaybe<GeometryUpdateWithoutCityInput>;
  upsert?: InputMaybe<GeometryUpsertWithoutCityInput>;
};

export type GeometryUpdateOneRequiredWithoutCountryNestedInput = {
  connect?: InputMaybe<GeometryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GeometryCreateOrConnectWithoutCountryInput>;
  create?: InputMaybe<GeometryCreateWithoutCountryInput>;
  update?: InputMaybe<GeometryUpdateWithoutCountryInput>;
  upsert?: InputMaybe<GeometryUpsertWithoutCountryInput>;
};

export type GeometryUpdateOneRequiredWithoutStateNestedInput = {
  connect?: InputMaybe<GeometryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GeometryCreateOrConnectWithoutStateInput>;
  create?: InputMaybe<GeometryCreateWithoutStateInput>;
  update?: InputMaybe<GeometryUpdateWithoutStateInput>;
  upsert?: InputMaybe<GeometryUpsertWithoutStateInput>;
};

export type GeometryUpdateOneWithoutLocationNestedInput = {
  connect?: InputMaybe<GeometryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GeometryCreateOrConnectWithoutLocationInput>;
  create?: InputMaybe<GeometryCreateWithoutLocationInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<GeometryUpdateWithoutLocationInput>;
  upsert?: InputMaybe<GeometryUpsertWithoutLocationInput>;
};

export type GeometryUpdateWithoutCityInput = {
  Country?: InputMaybe<CountryUpdateOneWithoutGeometryNestedInput>;
  h3Index15?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  latitude?: InputMaybe<FloatFieldUpdateOperationsInput>;
  Location?: InputMaybe<LocationUpdateOneWithoutGeometryNestedInput>;
  longitude?: InputMaybe<FloatFieldUpdateOperationsInput>;
  State?: InputMaybe<StateUpdateOneWithoutGeometryNestedInput>;
};

export type GeometryUpdateWithoutCountryInput = {
  City?: InputMaybe<CityUpdateOneWithoutGeometryNestedInput>;
  h3Index15?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  latitude?: InputMaybe<FloatFieldUpdateOperationsInput>;
  Location?: InputMaybe<LocationUpdateOneWithoutGeometryNestedInput>;
  longitude?: InputMaybe<FloatFieldUpdateOperationsInput>;
  State?: InputMaybe<StateUpdateOneWithoutGeometryNestedInput>;
};

export type GeometryUpdateWithoutLocationInput = {
  City?: InputMaybe<CityUpdateOneWithoutGeometryNestedInput>;
  Country?: InputMaybe<CountryUpdateOneWithoutGeometryNestedInput>;
  h3Index15?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  latitude?: InputMaybe<FloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<FloatFieldUpdateOperationsInput>;
  State?: InputMaybe<StateUpdateOneWithoutGeometryNestedInput>;
};

export type GeometryUpdateWithoutStateInput = {
  City?: InputMaybe<CityUpdateOneWithoutGeometryNestedInput>;
  Country?: InputMaybe<CountryUpdateOneWithoutGeometryNestedInput>;
  h3Index15?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  latitude?: InputMaybe<FloatFieldUpdateOperationsInput>;
  Location?: InputMaybe<LocationUpdateOneWithoutGeometryNestedInput>;
  longitude?: InputMaybe<FloatFieldUpdateOperationsInput>;
};

export type GeometryUpsertWithoutCityInput = {
  create: GeometryCreateWithoutCityInput;
  update: GeometryUpdateWithoutCityInput;
};

export type GeometryUpsertWithoutCountryInput = {
  create: GeometryCreateWithoutCountryInput;
  update: GeometryUpdateWithoutCountryInput;
};

export type GeometryUpsertWithoutLocationInput = {
  create: GeometryCreateWithoutLocationInput;
  update: GeometryUpdateWithoutLocationInput;
};

export type GeometryUpsertWithoutStateInput = {
  create: GeometryCreateWithoutStateInput;
  update: GeometryUpdateWithoutStateInput;
};

export type GeometryWhereInput = {
  AND?: InputMaybe<Array<GeometryWhereInput>>;
  City?: InputMaybe<CityWhereInput>;
  Country?: InputMaybe<CountryWhereInput>;
  h3Index15?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  latitude?: InputMaybe<FloatFilter>;
  Location?: InputMaybe<LocationWhereInput>;
  longitude?: InputMaybe<FloatFilter>;
  NOT?: InputMaybe<Array<GeometryWhereInput>>;
  OR?: InputMaybe<Array<GeometryWhereInput>>;
  State?: InputMaybe<StateWhereInput>;
};

export type GeometryWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type Group = {
  __typename?: 'Group';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  Photos: Array<Photo>;
  Profile: Array<Profile>;
  updatedAt: Scalars['DateTime'];
};


export type GroupPhotosArgs = {
  cursor?: InputMaybe<PhotoWhereUniqueInput>;
  distinct?: InputMaybe<Array<PhotoScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PhotoOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PhotoWhereInput>;
};


export type GroupProfileArgs = {
  cursor?: InputMaybe<ProfileWhereUniqueInput>;
  distinct?: InputMaybe<Array<ProfileScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProfileWhereInput>;
};

export type GroupCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GroupCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  Photos?: InputMaybe<PhotoCreateNestedManyWithoutGroupInput>;
  Profile?: InputMaybe<ProfileCreateNestedManyWithoutGroupsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type GroupCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type GroupCreateNestedManyWithoutProfileInput = {
  connect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GroupCreateOrConnectWithoutProfileInput>>;
  create?: InputMaybe<Array<GroupCreateWithoutProfileInput>>;
};

export type GroupCreateNestedOneWithoutPhotosInput = {
  connect?: InputMaybe<GroupWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GroupCreateOrConnectWithoutPhotosInput>;
  create?: InputMaybe<GroupCreateWithoutPhotosInput>;
};

export type GroupCreateOrConnectWithoutPhotosInput = {
  create: GroupCreateWithoutPhotosInput;
  where: GroupWhereUniqueInput;
};

export type GroupCreateOrConnectWithoutProfileInput = {
  create: GroupCreateWithoutProfileInput;
  where: GroupWhereUniqueInput;
};

export type GroupCreateWithoutPhotosInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  Profile?: InputMaybe<ProfileCreateNestedManyWithoutGroupsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type GroupCreateWithoutProfileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  Photos?: InputMaybe<PhotoCreateNestedManyWithoutGroupInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type GroupListRelationFilter = {
  every?: InputMaybe<GroupWhereInput>;
  none?: InputMaybe<GroupWhereInput>;
  some?: InputMaybe<GroupWhereInput>;
};

export type GroupMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GroupMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GroupOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type GroupOrderByWithAggregationInput = {
  _count?: InputMaybe<GroupCountOrderByAggregateInput>;
  _max?: InputMaybe<GroupMaxOrderByAggregateInput>;
  _min?: InputMaybe<GroupMinOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GroupOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  Photos?: InputMaybe<PhotoOrderByRelationAggregateInput>;
  Profile?: InputMaybe<ProfileOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GroupRelationFilter = {
  is?: InputMaybe<GroupWhereInput>;
  isNot?: InputMaybe<GroupWhereInput>;
};

export enum GroupScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

export type GroupScalarWhereInput = {
  AND?: InputMaybe<Array<GroupScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<GroupScalarWhereInput>>;
  OR?: InputMaybe<Array<GroupScalarWhereInput>>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type GroupScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<GroupScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<GroupScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<GroupScalarWhereWithAggregatesInput>>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type GroupUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  Photos?: InputMaybe<PhotoUpdateManyWithoutGroupNestedInput>;
  Profile?: InputMaybe<ProfileUpdateManyWithoutGroupsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type GroupUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type GroupUpdateManyWithoutProfileNestedInput = {
  connect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GroupCreateOrConnectWithoutProfileInput>>;
  create?: InputMaybe<Array<GroupCreateWithoutProfileInput>>;
  delete?: InputMaybe<Array<GroupWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<GroupScalarWhereInput>>;
  disconnect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  set?: InputMaybe<Array<GroupWhereUniqueInput>>;
  update?: InputMaybe<Array<GroupUpdateWithWhereUniqueWithoutProfileInput>>;
  updateMany?: InputMaybe<Array<GroupUpdateManyWithWhereWithoutProfileInput>>;
  upsert?: InputMaybe<Array<GroupUpsertWithWhereUniqueWithoutProfileInput>>;
};

export type GroupUpdateManyWithWhereWithoutProfileInput = {
  data: GroupUpdateManyMutationInput;
  where: GroupScalarWhereInput;
};

export type GroupUpdateOneWithoutPhotosNestedInput = {
  connect?: InputMaybe<GroupWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GroupCreateOrConnectWithoutPhotosInput>;
  create?: InputMaybe<GroupCreateWithoutPhotosInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<GroupUpdateWithoutPhotosInput>;
  upsert?: InputMaybe<GroupUpsertWithoutPhotosInput>;
};

export type GroupUpdateWithoutPhotosInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateManyWithoutGroupsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type GroupUpdateWithoutProfileInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  Photos?: InputMaybe<PhotoUpdateManyWithoutGroupNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type GroupUpdateWithWhereUniqueWithoutProfileInput = {
  data: GroupUpdateWithoutProfileInput;
  where: GroupWhereUniqueInput;
};

export type GroupUpsertWithoutPhotosInput = {
  create: GroupCreateWithoutPhotosInput;
  update: GroupUpdateWithoutPhotosInput;
};

export type GroupUpsertWithWhereUniqueWithoutProfileInput = {
  create: GroupCreateWithoutProfileInput;
  update: GroupUpdateWithoutProfileInput;
  where: GroupWhereUniqueInput;
};

export type GroupWhereInput = {
  AND?: InputMaybe<Array<GroupWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<GroupWhereInput>>;
  OR?: InputMaybe<Array<GroupWhereInput>>;
  Photos?: InputMaybe<PhotoListRelationFilter>;
  Profile?: InputMaybe<ProfileListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type GroupWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type H3Index5VenueRecommendation = {
  __typename?: 'H3Index5VenueRecommendation';
  Area?: Maybe<Area>;
  areaId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  h3Index5: Scalars['String'];
  id: Scalars['ID'];
  keywordSuggestions: Array<Scalars['Json']>;
  SearchAreaMetrics: Array<SearchAreaMetrics>;
  timesRequested?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['DateTime'];
  venuesProfileIds: Array<Scalars['String']>;
  Vote: Array<Vote>;
};


export type H3Index5VenueRecommendationSearchAreaMetricsArgs = {
  cursor?: InputMaybe<SearchAreaMetricsWhereUniqueInput>;
  distinct?: InputMaybe<Array<SearchAreaMetricsScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SearchAreaMetricsOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SearchAreaMetricsWhereInput>;
};


export type H3Index5VenueRecommendationVoteArgs = {
  cursor?: InputMaybe<VoteWhereUniqueInput>;
  distinct?: InputMaybe<Array<VoteScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<VoteOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<VoteWhereInput>;
};

export type H3Index5VenueRecommendationAvgOrderByAggregateInput = {
  timesRequested?: InputMaybe<SortOrder>;
};

export type H3Index5VenueRecommendationCountOrderByAggregateInput = {
  areaId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  h3Index5?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  keywordSuggestions?: InputMaybe<SortOrder>;
  timesRequested?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  venuesProfileIds?: InputMaybe<SortOrder>;
};

export type H3Index5VenueRecommendationCreateInput = {
  Area?: InputMaybe<AreaCreateNestedOneWithoutH3Index5VenueRecommendationInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  h3Index5: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  keywordSuggestions?: InputMaybe<Array<Scalars['Json']>>;
  SearchAreaMetrics?: InputMaybe<SearchAreaMetricsCreateNestedManyWithoutH3Index5VenueRecommendationInput>;
  timesRequested?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venuesProfileIds?: InputMaybe<Array<Scalars['String']>>;
  Vote?: InputMaybe<VoteCreateNestedManyWithoutH3Index5VenueRecommendationInput>;
};

export type H3Index5VenueRecommendationCreatekeywordSuggestionsInput = {
  set: Array<Scalars['Json']>;
};

export type H3Index5VenueRecommendationCreateManyInput = {
  areaId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  h3Index5: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  keywordSuggestions?: InputMaybe<Array<Scalars['Json']>>;
  timesRequested?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venuesProfileIds?: InputMaybe<Array<Scalars['String']>>;
};

export type H3Index5VenueRecommendationCreateNestedOneWithoutAreaInput = {
  connect?: InputMaybe<H3Index5VenueRecommendationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<H3Index5VenueRecommendationCreateOrConnectWithoutAreaInput>;
  create?: InputMaybe<H3Index5VenueRecommendationCreateWithoutAreaInput>;
};

export type H3Index5VenueRecommendationCreateNestedOneWithoutSearchAreaMetricsInput = {
  connect?: InputMaybe<H3Index5VenueRecommendationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<H3Index5VenueRecommendationCreateOrConnectWithoutSearchAreaMetricsInput>;
  create?: InputMaybe<H3Index5VenueRecommendationCreateWithoutSearchAreaMetricsInput>;
};

export type H3Index5VenueRecommendationCreateNestedOneWithoutVoteInput = {
  connect?: InputMaybe<H3Index5VenueRecommendationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<H3Index5VenueRecommendationCreateOrConnectWithoutVoteInput>;
  create?: InputMaybe<H3Index5VenueRecommendationCreateWithoutVoteInput>;
};

export type H3Index5VenueRecommendationCreateOrConnectWithoutAreaInput = {
  create: H3Index5VenueRecommendationCreateWithoutAreaInput;
  where: H3Index5VenueRecommendationWhereUniqueInput;
};

export type H3Index5VenueRecommendationCreateOrConnectWithoutSearchAreaMetricsInput = {
  create: H3Index5VenueRecommendationCreateWithoutSearchAreaMetricsInput;
  where: H3Index5VenueRecommendationWhereUniqueInput;
};

export type H3Index5VenueRecommendationCreateOrConnectWithoutVoteInput = {
  create: H3Index5VenueRecommendationCreateWithoutVoteInput;
  where: H3Index5VenueRecommendationWhereUniqueInput;
};

export type H3Index5VenueRecommendationCreatevenuesProfileIdsInput = {
  set: Array<Scalars['String']>;
};

export type H3Index5VenueRecommendationCreateWithoutAreaInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  h3Index5: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  keywordSuggestions?: InputMaybe<Array<Scalars['Json']>>;
  SearchAreaMetrics?: InputMaybe<SearchAreaMetricsCreateNestedManyWithoutH3Index5VenueRecommendationInput>;
  timesRequested?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venuesProfileIds?: InputMaybe<Array<Scalars['String']>>;
  Vote?: InputMaybe<VoteCreateNestedManyWithoutH3Index5VenueRecommendationInput>;
};

export type H3Index5VenueRecommendationCreateWithoutSearchAreaMetricsInput = {
  Area?: InputMaybe<AreaCreateNestedOneWithoutH3Index5VenueRecommendationInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  h3Index5: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  keywordSuggestions?: InputMaybe<Array<Scalars['Json']>>;
  timesRequested?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venuesProfileIds?: InputMaybe<Array<Scalars['String']>>;
  Vote?: InputMaybe<VoteCreateNestedManyWithoutH3Index5VenueRecommendationInput>;
};

export type H3Index5VenueRecommendationCreateWithoutVoteInput = {
  Area?: InputMaybe<AreaCreateNestedOneWithoutH3Index5VenueRecommendationInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  h3Index5: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  keywordSuggestions?: InputMaybe<Array<Scalars['Json']>>;
  SearchAreaMetrics?: InputMaybe<SearchAreaMetricsCreateNestedManyWithoutH3Index5VenueRecommendationInput>;
  timesRequested?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venuesProfileIds?: InputMaybe<Array<Scalars['String']>>;
};

export type H3Index5VenueRecommendationMaxOrderByAggregateInput = {
  areaId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  h3Index5?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  timesRequested?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type H3Index5VenueRecommendationMinOrderByAggregateInput = {
  areaId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  h3Index5?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  timesRequested?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type H3Index5VenueRecommendationOrderByWithAggregationInput = {
  _avg?: InputMaybe<H3Index5VenueRecommendationAvgOrderByAggregateInput>;
  _count?: InputMaybe<H3Index5VenueRecommendationCountOrderByAggregateInput>;
  _max?: InputMaybe<H3Index5VenueRecommendationMaxOrderByAggregateInput>;
  _min?: InputMaybe<H3Index5VenueRecommendationMinOrderByAggregateInput>;
  _sum?: InputMaybe<H3Index5VenueRecommendationSumOrderByAggregateInput>;
  areaId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  h3Index5?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  keywordSuggestions?: InputMaybe<SortOrder>;
  timesRequested?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  venuesProfileIds?: InputMaybe<SortOrder>;
};

export type H3Index5VenueRecommendationOrderByWithRelationInput = {
  Area?: InputMaybe<AreaOrderByWithRelationInput>;
  areaId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  h3Index5?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  keywordSuggestions?: InputMaybe<SortOrder>;
  SearchAreaMetrics?: InputMaybe<SearchAreaMetricsOrderByRelationAggregateInput>;
  timesRequested?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  venuesProfileIds?: InputMaybe<SortOrder>;
  Vote?: InputMaybe<VoteOrderByRelationAggregateInput>;
};

export type H3Index5VenueRecommendationRelationFilter = {
  is?: InputMaybe<H3Index5VenueRecommendationWhereInput>;
  isNot?: InputMaybe<H3Index5VenueRecommendationWhereInput>;
};

export enum H3Index5VenueRecommendationScalarFieldEnum {
  AreaId = 'areaId',
  CreatedAt = 'createdAt',
  H3Index5 = 'h3Index5',
  Id = 'id',
  KeywordSuggestions = 'keywordSuggestions',
  TimesRequested = 'timesRequested',
  UpdatedAt = 'updatedAt',
  VenuesProfileIds = 'venuesProfileIds'
}

export type H3Index5VenueRecommendationScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<H3Index5VenueRecommendationScalarWhereWithAggregatesInput>>;
  areaId?: InputMaybe<StringNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  h3Index5?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  keywordSuggestions?: InputMaybe<JsonNullableListFilter>;
  NOT?: InputMaybe<Array<H3Index5VenueRecommendationScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<H3Index5VenueRecommendationScalarWhereWithAggregatesInput>>;
  timesRequested?: InputMaybe<IntNullableWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  venuesProfileIds?: InputMaybe<StringNullableListFilter>;
};

export type H3Index5VenueRecommendationSumOrderByAggregateInput = {
  timesRequested?: InputMaybe<SortOrder>;
};

export type H3Index5VenueRecommendationUpdateInput = {
  Area?: InputMaybe<AreaUpdateOneWithoutH3Index5VenueRecommendationNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  h3Index5?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywordSuggestions?: InputMaybe<Array<Scalars['Json']>>;
  SearchAreaMetrics?: InputMaybe<SearchAreaMetricsUpdateManyWithoutH3Index5VenueRecommendationNestedInput>;
  timesRequested?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venuesProfileIds?: InputMaybe<Array<Scalars['String']>>;
  Vote?: InputMaybe<VoteUpdateManyWithoutH3Index5VenueRecommendationNestedInput>;
};

export type H3Index5VenueRecommendationUpdatekeywordSuggestionsInput = {
  push?: InputMaybe<Scalars['Json']>;
  set?: InputMaybe<Array<Scalars['Json']>>;
};

export type H3Index5VenueRecommendationUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  h3Index5?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywordSuggestions?: InputMaybe<Array<Scalars['Json']>>;
  timesRequested?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venuesProfileIds?: InputMaybe<Array<Scalars['String']>>;
};

export type H3Index5VenueRecommendationUpdateOneWithoutAreaNestedInput = {
  connect?: InputMaybe<H3Index5VenueRecommendationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<H3Index5VenueRecommendationCreateOrConnectWithoutAreaInput>;
  create?: InputMaybe<H3Index5VenueRecommendationCreateWithoutAreaInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<H3Index5VenueRecommendationUpdateWithoutAreaInput>;
  upsert?: InputMaybe<H3Index5VenueRecommendationUpsertWithoutAreaInput>;
};

export type H3Index5VenueRecommendationUpdateOneWithoutSearchAreaMetricsNestedInput = {
  connect?: InputMaybe<H3Index5VenueRecommendationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<H3Index5VenueRecommendationCreateOrConnectWithoutSearchAreaMetricsInput>;
  create?: InputMaybe<H3Index5VenueRecommendationCreateWithoutSearchAreaMetricsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<H3Index5VenueRecommendationUpdateWithoutSearchAreaMetricsInput>;
  upsert?: InputMaybe<H3Index5VenueRecommendationUpsertWithoutSearchAreaMetricsInput>;
};

export type H3Index5VenueRecommendationUpdateOneWithoutVoteNestedInput = {
  connect?: InputMaybe<H3Index5VenueRecommendationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<H3Index5VenueRecommendationCreateOrConnectWithoutVoteInput>;
  create?: InputMaybe<H3Index5VenueRecommendationCreateWithoutVoteInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<H3Index5VenueRecommendationUpdateWithoutVoteInput>;
  upsert?: InputMaybe<H3Index5VenueRecommendationUpsertWithoutVoteInput>;
};

export type H3Index5VenueRecommendationUpdatevenuesProfileIdsInput = {
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type H3Index5VenueRecommendationUpdateWithoutAreaInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  h3Index5?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywordSuggestions?: InputMaybe<Array<Scalars['Json']>>;
  SearchAreaMetrics?: InputMaybe<SearchAreaMetricsUpdateManyWithoutH3Index5VenueRecommendationNestedInput>;
  timesRequested?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venuesProfileIds?: InputMaybe<Array<Scalars['String']>>;
  Vote?: InputMaybe<VoteUpdateManyWithoutH3Index5VenueRecommendationNestedInput>;
};

export type H3Index5VenueRecommendationUpdateWithoutSearchAreaMetricsInput = {
  Area?: InputMaybe<AreaUpdateOneWithoutH3Index5VenueRecommendationNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  h3Index5?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywordSuggestions?: InputMaybe<Array<Scalars['Json']>>;
  timesRequested?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venuesProfileIds?: InputMaybe<Array<Scalars['String']>>;
  Vote?: InputMaybe<VoteUpdateManyWithoutH3Index5VenueRecommendationNestedInput>;
};

export type H3Index5VenueRecommendationUpdateWithoutVoteInput = {
  Area?: InputMaybe<AreaUpdateOneWithoutH3Index5VenueRecommendationNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  h3Index5?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywordSuggestions?: InputMaybe<Array<Scalars['Json']>>;
  SearchAreaMetrics?: InputMaybe<SearchAreaMetricsUpdateManyWithoutH3Index5VenueRecommendationNestedInput>;
  timesRequested?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venuesProfileIds?: InputMaybe<Array<Scalars['String']>>;
};

export type H3Index5VenueRecommendationUpsertWithoutAreaInput = {
  create: H3Index5VenueRecommendationCreateWithoutAreaInput;
  update: H3Index5VenueRecommendationUpdateWithoutAreaInput;
};

export type H3Index5VenueRecommendationUpsertWithoutSearchAreaMetricsInput = {
  create: H3Index5VenueRecommendationCreateWithoutSearchAreaMetricsInput;
  update: H3Index5VenueRecommendationUpdateWithoutSearchAreaMetricsInput;
};

export type H3Index5VenueRecommendationUpsertWithoutVoteInput = {
  create: H3Index5VenueRecommendationCreateWithoutVoteInput;
  update: H3Index5VenueRecommendationUpdateWithoutVoteInput;
};

export type H3Index5VenueRecommendationWhereInput = {
  AND?: InputMaybe<Array<H3Index5VenueRecommendationWhereInput>>;
  Area?: InputMaybe<AreaWhereInput>;
  areaId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  h3Index5?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  keywordSuggestions?: InputMaybe<JsonNullableListFilter>;
  NOT?: InputMaybe<Array<H3Index5VenueRecommendationWhereInput>>;
  OR?: InputMaybe<Array<H3Index5VenueRecommendationWhereInput>>;
  SearchAreaMetrics?: InputMaybe<SearchAreaMetricsListRelationFilter>;
  timesRequested?: InputMaybe<IntNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  venuesProfileIds?: InputMaybe<StringNullableListFilter>;
  Vote?: InputMaybe<VoteListRelationFilter>;
};

export type H3Index5VenueRecommendationWhereUniqueInput = {
  areaId?: InputMaybe<Scalars['String']>;
  h3Index5?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type H3Index6VenueRecommendation = {
  __typename?: 'H3Index6VenueRecommendation';
  Area?: Maybe<Area>;
  areaId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  h3Index6: Scalars['String'];
  id: Scalars['ID'];
  keywordSuggestions: Array<Scalars['Json']>;
  SearchAreaMetrics: Array<SearchAreaMetrics>;
  timesRequested?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['DateTime'];
  venuesProfileIds: Array<Scalars['String']>;
  Vote: Array<Vote>;
};


export type H3Index6VenueRecommendationSearchAreaMetricsArgs = {
  cursor?: InputMaybe<SearchAreaMetricsWhereUniqueInput>;
  distinct?: InputMaybe<Array<SearchAreaMetricsScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SearchAreaMetricsOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SearchAreaMetricsWhereInput>;
};


export type H3Index6VenueRecommendationVoteArgs = {
  cursor?: InputMaybe<VoteWhereUniqueInput>;
  distinct?: InputMaybe<Array<VoteScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<VoteOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<VoteWhereInput>;
};

export type H3Index6VenueRecommendationAvgOrderByAggregateInput = {
  timesRequested?: InputMaybe<SortOrder>;
};

export type H3Index6VenueRecommendationCountOrderByAggregateInput = {
  areaId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  h3Index6?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  keywordSuggestions?: InputMaybe<SortOrder>;
  timesRequested?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  venuesProfileIds?: InputMaybe<SortOrder>;
};

export type H3Index6VenueRecommendationCreateInput = {
  Area?: InputMaybe<AreaCreateNestedOneWithoutH3Index6VenueRecommendationInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  h3Index6: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  keywordSuggestions?: InputMaybe<Array<Scalars['Json']>>;
  SearchAreaMetrics?: InputMaybe<SearchAreaMetricsCreateNestedManyWithoutH3Index6VenueRecommendationInput>;
  timesRequested?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venuesProfileIds?: InputMaybe<Array<Scalars['String']>>;
  Vote?: InputMaybe<VoteCreateNestedManyWithoutH3Index6VenueRecommendationInput>;
};

export type H3Index6VenueRecommendationCreatekeywordSuggestionsInput = {
  set: Array<Scalars['Json']>;
};

export type H3Index6VenueRecommendationCreateManyInput = {
  areaId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  h3Index6: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  keywordSuggestions?: InputMaybe<Array<Scalars['Json']>>;
  timesRequested?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venuesProfileIds?: InputMaybe<Array<Scalars['String']>>;
};

export type H3Index6VenueRecommendationCreateNestedOneWithoutAreaInput = {
  connect?: InputMaybe<H3Index6VenueRecommendationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<H3Index6VenueRecommendationCreateOrConnectWithoutAreaInput>;
  create?: InputMaybe<H3Index6VenueRecommendationCreateWithoutAreaInput>;
};

export type H3Index6VenueRecommendationCreateNestedOneWithoutSearchAreaMetricsInput = {
  connect?: InputMaybe<H3Index6VenueRecommendationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<H3Index6VenueRecommendationCreateOrConnectWithoutSearchAreaMetricsInput>;
  create?: InputMaybe<H3Index6VenueRecommendationCreateWithoutSearchAreaMetricsInput>;
};

export type H3Index6VenueRecommendationCreateNestedOneWithoutVoteInput = {
  connect?: InputMaybe<H3Index6VenueRecommendationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<H3Index6VenueRecommendationCreateOrConnectWithoutVoteInput>;
  create?: InputMaybe<H3Index6VenueRecommendationCreateWithoutVoteInput>;
};

export type H3Index6VenueRecommendationCreateOrConnectWithoutAreaInput = {
  create: H3Index6VenueRecommendationCreateWithoutAreaInput;
  where: H3Index6VenueRecommendationWhereUniqueInput;
};

export type H3Index6VenueRecommendationCreateOrConnectWithoutSearchAreaMetricsInput = {
  create: H3Index6VenueRecommendationCreateWithoutSearchAreaMetricsInput;
  where: H3Index6VenueRecommendationWhereUniqueInput;
};

export type H3Index6VenueRecommendationCreateOrConnectWithoutVoteInput = {
  create: H3Index6VenueRecommendationCreateWithoutVoteInput;
  where: H3Index6VenueRecommendationWhereUniqueInput;
};

export type H3Index6VenueRecommendationCreatevenuesProfileIdsInput = {
  set: Array<Scalars['String']>;
};

export type H3Index6VenueRecommendationCreateWithoutAreaInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  h3Index6: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  keywordSuggestions?: InputMaybe<Array<Scalars['Json']>>;
  SearchAreaMetrics?: InputMaybe<SearchAreaMetricsCreateNestedManyWithoutH3Index6VenueRecommendationInput>;
  timesRequested?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venuesProfileIds?: InputMaybe<Array<Scalars['String']>>;
  Vote?: InputMaybe<VoteCreateNestedManyWithoutH3Index6VenueRecommendationInput>;
};

export type H3Index6VenueRecommendationCreateWithoutSearchAreaMetricsInput = {
  Area?: InputMaybe<AreaCreateNestedOneWithoutH3Index6VenueRecommendationInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  h3Index6: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  keywordSuggestions?: InputMaybe<Array<Scalars['Json']>>;
  timesRequested?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venuesProfileIds?: InputMaybe<Array<Scalars['String']>>;
  Vote?: InputMaybe<VoteCreateNestedManyWithoutH3Index6VenueRecommendationInput>;
};

export type H3Index6VenueRecommendationCreateWithoutVoteInput = {
  Area?: InputMaybe<AreaCreateNestedOneWithoutH3Index6VenueRecommendationInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  h3Index6: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  keywordSuggestions?: InputMaybe<Array<Scalars['Json']>>;
  SearchAreaMetrics?: InputMaybe<SearchAreaMetricsCreateNestedManyWithoutH3Index6VenueRecommendationInput>;
  timesRequested?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venuesProfileIds?: InputMaybe<Array<Scalars['String']>>;
};

export type H3Index6VenueRecommendationMaxOrderByAggregateInput = {
  areaId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  h3Index6?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  timesRequested?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type H3Index6VenueRecommendationMinOrderByAggregateInput = {
  areaId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  h3Index6?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  timesRequested?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type H3Index6VenueRecommendationOrderByWithAggregationInput = {
  _avg?: InputMaybe<H3Index6VenueRecommendationAvgOrderByAggregateInput>;
  _count?: InputMaybe<H3Index6VenueRecommendationCountOrderByAggregateInput>;
  _max?: InputMaybe<H3Index6VenueRecommendationMaxOrderByAggregateInput>;
  _min?: InputMaybe<H3Index6VenueRecommendationMinOrderByAggregateInput>;
  _sum?: InputMaybe<H3Index6VenueRecommendationSumOrderByAggregateInput>;
  areaId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  h3Index6?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  keywordSuggestions?: InputMaybe<SortOrder>;
  timesRequested?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  venuesProfileIds?: InputMaybe<SortOrder>;
};

export type H3Index6VenueRecommendationOrderByWithRelationInput = {
  Area?: InputMaybe<AreaOrderByWithRelationInput>;
  areaId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  h3Index6?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  keywordSuggestions?: InputMaybe<SortOrder>;
  SearchAreaMetrics?: InputMaybe<SearchAreaMetricsOrderByRelationAggregateInput>;
  timesRequested?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  venuesProfileIds?: InputMaybe<SortOrder>;
  Vote?: InputMaybe<VoteOrderByRelationAggregateInput>;
};

export type H3Index6VenueRecommendationRelationFilter = {
  is?: InputMaybe<H3Index6VenueRecommendationWhereInput>;
  isNot?: InputMaybe<H3Index6VenueRecommendationWhereInput>;
};

export enum H3Index6VenueRecommendationScalarFieldEnum {
  AreaId = 'areaId',
  CreatedAt = 'createdAt',
  H3Index6 = 'h3Index6',
  Id = 'id',
  KeywordSuggestions = 'keywordSuggestions',
  TimesRequested = 'timesRequested',
  UpdatedAt = 'updatedAt',
  VenuesProfileIds = 'venuesProfileIds'
}

export type H3Index6VenueRecommendationScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<H3Index6VenueRecommendationScalarWhereWithAggregatesInput>>;
  areaId?: InputMaybe<StringNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  h3Index6?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  keywordSuggestions?: InputMaybe<JsonNullableListFilter>;
  NOT?: InputMaybe<Array<H3Index6VenueRecommendationScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<H3Index6VenueRecommendationScalarWhereWithAggregatesInput>>;
  timesRequested?: InputMaybe<IntNullableWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  venuesProfileIds?: InputMaybe<StringNullableListFilter>;
};

export type H3Index6VenueRecommendationSumOrderByAggregateInput = {
  timesRequested?: InputMaybe<SortOrder>;
};

export type H3Index6VenueRecommendationUpdateInput = {
  Area?: InputMaybe<AreaUpdateOneWithoutH3Index6VenueRecommendationNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  h3Index6?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywordSuggestions?: InputMaybe<Array<Scalars['Json']>>;
  SearchAreaMetrics?: InputMaybe<SearchAreaMetricsUpdateManyWithoutH3Index6VenueRecommendationNestedInput>;
  timesRequested?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venuesProfileIds?: InputMaybe<Array<Scalars['String']>>;
  Vote?: InputMaybe<VoteUpdateManyWithoutH3Index6VenueRecommendationNestedInput>;
};

export type H3Index6VenueRecommendationUpdatekeywordSuggestionsInput = {
  push?: InputMaybe<Scalars['Json']>;
  set?: InputMaybe<Array<Scalars['Json']>>;
};

export type H3Index6VenueRecommendationUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  h3Index6?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywordSuggestions?: InputMaybe<Array<Scalars['Json']>>;
  timesRequested?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venuesProfileIds?: InputMaybe<Array<Scalars['String']>>;
};

export type H3Index6VenueRecommendationUpdateOneWithoutAreaNestedInput = {
  connect?: InputMaybe<H3Index6VenueRecommendationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<H3Index6VenueRecommendationCreateOrConnectWithoutAreaInput>;
  create?: InputMaybe<H3Index6VenueRecommendationCreateWithoutAreaInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<H3Index6VenueRecommendationUpdateWithoutAreaInput>;
  upsert?: InputMaybe<H3Index6VenueRecommendationUpsertWithoutAreaInput>;
};

export type H3Index6VenueRecommendationUpdateOneWithoutSearchAreaMetricsNestedInput = {
  connect?: InputMaybe<H3Index6VenueRecommendationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<H3Index6VenueRecommendationCreateOrConnectWithoutSearchAreaMetricsInput>;
  create?: InputMaybe<H3Index6VenueRecommendationCreateWithoutSearchAreaMetricsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<H3Index6VenueRecommendationUpdateWithoutSearchAreaMetricsInput>;
  upsert?: InputMaybe<H3Index6VenueRecommendationUpsertWithoutSearchAreaMetricsInput>;
};

export type H3Index6VenueRecommendationUpdateOneWithoutVoteNestedInput = {
  connect?: InputMaybe<H3Index6VenueRecommendationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<H3Index6VenueRecommendationCreateOrConnectWithoutVoteInput>;
  create?: InputMaybe<H3Index6VenueRecommendationCreateWithoutVoteInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<H3Index6VenueRecommendationUpdateWithoutVoteInput>;
  upsert?: InputMaybe<H3Index6VenueRecommendationUpsertWithoutVoteInput>;
};

export type H3Index6VenueRecommendationUpdatevenuesProfileIdsInput = {
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type H3Index6VenueRecommendationUpdateWithoutAreaInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  h3Index6?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywordSuggestions?: InputMaybe<Array<Scalars['Json']>>;
  SearchAreaMetrics?: InputMaybe<SearchAreaMetricsUpdateManyWithoutH3Index6VenueRecommendationNestedInput>;
  timesRequested?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venuesProfileIds?: InputMaybe<Array<Scalars['String']>>;
  Vote?: InputMaybe<VoteUpdateManyWithoutH3Index6VenueRecommendationNestedInput>;
};

export type H3Index6VenueRecommendationUpdateWithoutSearchAreaMetricsInput = {
  Area?: InputMaybe<AreaUpdateOneWithoutH3Index6VenueRecommendationNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  h3Index6?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywordSuggestions?: InputMaybe<Array<Scalars['Json']>>;
  timesRequested?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venuesProfileIds?: InputMaybe<Array<Scalars['String']>>;
  Vote?: InputMaybe<VoteUpdateManyWithoutH3Index6VenueRecommendationNestedInput>;
};

export type H3Index6VenueRecommendationUpdateWithoutVoteInput = {
  Area?: InputMaybe<AreaUpdateOneWithoutH3Index6VenueRecommendationNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  h3Index6?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywordSuggestions?: InputMaybe<Array<Scalars['Json']>>;
  SearchAreaMetrics?: InputMaybe<SearchAreaMetricsUpdateManyWithoutH3Index6VenueRecommendationNestedInput>;
  timesRequested?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venuesProfileIds?: InputMaybe<Array<Scalars['String']>>;
};

export type H3Index6VenueRecommendationUpsertWithoutAreaInput = {
  create: H3Index6VenueRecommendationCreateWithoutAreaInput;
  update: H3Index6VenueRecommendationUpdateWithoutAreaInput;
};

export type H3Index6VenueRecommendationUpsertWithoutSearchAreaMetricsInput = {
  create: H3Index6VenueRecommendationCreateWithoutSearchAreaMetricsInput;
  update: H3Index6VenueRecommendationUpdateWithoutSearchAreaMetricsInput;
};

export type H3Index6VenueRecommendationUpsertWithoutVoteInput = {
  create: H3Index6VenueRecommendationCreateWithoutVoteInput;
  update: H3Index6VenueRecommendationUpdateWithoutVoteInput;
};

export type H3Index6VenueRecommendationWhereInput = {
  AND?: InputMaybe<Array<H3Index6VenueRecommendationWhereInput>>;
  Area?: InputMaybe<AreaWhereInput>;
  areaId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  h3Index6?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  keywordSuggestions?: InputMaybe<JsonNullableListFilter>;
  NOT?: InputMaybe<Array<H3Index6VenueRecommendationWhereInput>>;
  OR?: InputMaybe<Array<H3Index6VenueRecommendationWhereInput>>;
  SearchAreaMetrics?: InputMaybe<SearchAreaMetricsListRelationFilter>;
  timesRequested?: InputMaybe<IntNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  venuesProfileIds?: InputMaybe<StringNullableListFilter>;
  Vote?: InputMaybe<VoteListRelationFilter>;
};

export type H3Index6VenueRecommendationWhereUniqueInput = {
  areaId?: InputMaybe<Scalars['String']>;
  h3Index6?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type IdentifiableInformation = {
  __typename?: 'IdentifiableInformation';
  birthday?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  currenttown?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  fullname?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  hometown?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastname?: Maybe<Scalars['String']>;
  lookfor?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  Profile: Profile;
  profileId: Scalars['String'];
  storageId?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type IdentifiableInformationCountOrderByAggregateInput = {
  birthday?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  currenttown?: InputMaybe<SortOrder>;
  firstname?: InputMaybe<SortOrder>;
  fullname?: InputMaybe<SortOrder>;
  gender?: InputMaybe<SortOrder>;
  hometown?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lastname?: InputMaybe<SortOrder>;
  lookfor?: InputMaybe<SortOrder>;
  nickname?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  storageId?: InputMaybe<SortOrder>;
  surname?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  username?: InputMaybe<SortOrder>;
};

export type IdentifiableInformationCreateInput = {
  birthday?: InputMaybe<Scalars['DateTime']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  currenttown?: InputMaybe<Scalars['String']>;
  firstname?: InputMaybe<Scalars['String']>;
  fullname?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  hometown?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
  lookfor?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
  Profile: ProfileCreateNestedOneWithoutIdentifiableInformationInput;
  storageId?: InputMaybe<Scalars['String']>;
  surname?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  username: Scalars['String'];
};

export type IdentifiableInformationCreateManyInput = {
  birthday?: InputMaybe<Scalars['DateTime']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  currenttown?: InputMaybe<Scalars['String']>;
  firstname?: InputMaybe<Scalars['String']>;
  fullname?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  hometown?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
  lookfor?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
  profileId: Scalars['String'];
  storageId?: InputMaybe<Scalars['String']>;
  surname?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  username: Scalars['String'];
};

export type IdentifiableInformationCreateNestedOneWithoutProfileInput = {
  connect?: InputMaybe<IdentifiableInformationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<IdentifiableInformationCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<IdentifiableInformationCreateWithoutProfileInput>;
};

export type IdentifiableInformationCreateOrConnectWithoutProfileInput = {
  create: IdentifiableInformationCreateWithoutProfileInput;
  where: IdentifiableInformationWhereUniqueInput;
};

export type IdentifiableInformationCreateWithoutProfileInput = {
  birthday?: InputMaybe<Scalars['DateTime']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  currenttown?: InputMaybe<Scalars['String']>;
  firstname?: InputMaybe<Scalars['String']>;
  fullname?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  hometown?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
  lookfor?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
  storageId?: InputMaybe<Scalars['String']>;
  surname?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  username: Scalars['String'];
};

export type IdentifiableInformationMaxOrderByAggregateInput = {
  birthday?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  currenttown?: InputMaybe<SortOrder>;
  firstname?: InputMaybe<SortOrder>;
  fullname?: InputMaybe<SortOrder>;
  gender?: InputMaybe<SortOrder>;
  hometown?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lastname?: InputMaybe<SortOrder>;
  lookfor?: InputMaybe<SortOrder>;
  nickname?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  storageId?: InputMaybe<SortOrder>;
  surname?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  username?: InputMaybe<SortOrder>;
};

export type IdentifiableInformationMinOrderByAggregateInput = {
  birthday?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  currenttown?: InputMaybe<SortOrder>;
  firstname?: InputMaybe<SortOrder>;
  fullname?: InputMaybe<SortOrder>;
  gender?: InputMaybe<SortOrder>;
  hometown?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lastname?: InputMaybe<SortOrder>;
  lookfor?: InputMaybe<SortOrder>;
  nickname?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  storageId?: InputMaybe<SortOrder>;
  surname?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  username?: InputMaybe<SortOrder>;
};

export type IdentifiableInformationOrderByWithAggregationInput = {
  _count?: InputMaybe<IdentifiableInformationCountOrderByAggregateInput>;
  _max?: InputMaybe<IdentifiableInformationMaxOrderByAggregateInput>;
  _min?: InputMaybe<IdentifiableInformationMinOrderByAggregateInput>;
  birthday?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  currenttown?: InputMaybe<SortOrder>;
  firstname?: InputMaybe<SortOrder>;
  fullname?: InputMaybe<SortOrder>;
  gender?: InputMaybe<SortOrder>;
  hometown?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lastname?: InputMaybe<SortOrder>;
  lookfor?: InputMaybe<SortOrder>;
  nickname?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  storageId?: InputMaybe<SortOrder>;
  surname?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  username?: InputMaybe<SortOrder>;
};

export type IdentifiableInformationOrderByWithRelationInput = {
  birthday?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  currenttown?: InputMaybe<SortOrder>;
  firstname?: InputMaybe<SortOrder>;
  fullname?: InputMaybe<SortOrder>;
  gender?: InputMaybe<SortOrder>;
  hometown?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lastname?: InputMaybe<SortOrder>;
  lookfor?: InputMaybe<SortOrder>;
  nickname?: InputMaybe<SortOrder>;
  Profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  profileId?: InputMaybe<SortOrder>;
  storageId?: InputMaybe<SortOrder>;
  surname?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  username?: InputMaybe<SortOrder>;
};

export type IdentifiableInformationRelationFilter = {
  is?: InputMaybe<IdentifiableInformationWhereInput>;
  isNot?: InputMaybe<IdentifiableInformationWhereInput>;
};

export enum IdentifiableInformationScalarFieldEnum {
  Birthday = 'birthday',
  CreatedAt = 'createdAt',
  Currenttown = 'currenttown',
  Firstname = 'firstname',
  Fullname = 'fullname',
  Gender = 'gender',
  Hometown = 'hometown',
  Id = 'id',
  Lastname = 'lastname',
  Lookfor = 'lookfor',
  Nickname = 'nickname',
  ProfileId = 'profileId',
  StorageId = 'storageId',
  Surname = 'surname',
  UpdatedAt = 'updatedAt',
  Username = 'username'
}

export type IdentifiableInformationScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<IdentifiableInformationScalarWhereWithAggregatesInput>>;
  birthday?: InputMaybe<DateTimeNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  currenttown?: InputMaybe<StringNullableWithAggregatesFilter>;
  firstname?: InputMaybe<StringNullableWithAggregatesFilter>;
  fullname?: InputMaybe<StringNullableWithAggregatesFilter>;
  gender?: InputMaybe<StringNullableWithAggregatesFilter>;
  hometown?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  lastname?: InputMaybe<StringNullableWithAggregatesFilter>;
  lookfor?: InputMaybe<StringNullableWithAggregatesFilter>;
  nickname?: InputMaybe<StringNullableWithAggregatesFilter>;
  NOT?: InputMaybe<Array<IdentifiableInformationScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<IdentifiableInformationScalarWhereWithAggregatesInput>>;
  profileId?: InputMaybe<StringWithAggregatesFilter>;
  storageId?: InputMaybe<StringNullableWithAggregatesFilter>;
  surname?: InputMaybe<StringNullableWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  username?: InputMaybe<StringWithAggregatesFilter>;
};

export type IdentifiableInformationUpdateInput = {
  birthday?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  currenttown?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  firstname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  fullname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  gender?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  hometown?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lookfor?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  nickname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutIdentifiableInformationNestedInput>;
  storageId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  surname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type IdentifiableInformationUpdateManyMutationInput = {
  birthday?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  currenttown?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  firstname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  fullname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  gender?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  hometown?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lookfor?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  nickname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  storageId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  surname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type IdentifiableInformationUpdateOneWithoutProfileNestedInput = {
  connect?: InputMaybe<IdentifiableInformationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<IdentifiableInformationCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<IdentifiableInformationCreateWithoutProfileInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<IdentifiableInformationUpdateWithoutProfileInput>;
  upsert?: InputMaybe<IdentifiableInformationUpsertWithoutProfileInput>;
};

export type IdentifiableInformationUpdateWithoutProfileInput = {
  birthday?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  currenttown?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  firstname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  fullname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  gender?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  hometown?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lookfor?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  nickname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  storageId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  surname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type IdentifiableInformationUpsertWithoutProfileInput = {
  create: IdentifiableInformationCreateWithoutProfileInput;
  update: IdentifiableInformationUpdateWithoutProfileInput;
};

export type IdentifiableInformationWhereInput = {
  AND?: InputMaybe<Array<IdentifiableInformationWhereInput>>;
  birthday?: InputMaybe<DateTimeNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  currenttown?: InputMaybe<StringNullableFilter>;
  firstname?: InputMaybe<StringNullableFilter>;
  fullname?: InputMaybe<StringNullableFilter>;
  gender?: InputMaybe<StringNullableFilter>;
  hometown?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  lastname?: InputMaybe<StringNullableFilter>;
  lookfor?: InputMaybe<StringNullableFilter>;
  nickname?: InputMaybe<StringNullableFilter>;
  NOT?: InputMaybe<Array<IdentifiableInformationWhereInput>>;
  OR?: InputMaybe<Array<IdentifiableInformationWhereInput>>;
  Profile?: InputMaybe<ProfileWhereInput>;
  profileId?: InputMaybe<StringFilter>;
  storageId?: InputMaybe<StringNullableFilter>;
  surname?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  username?: InputMaybe<StringFilter>;
};

export type IdentifiableInformationWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  profileId?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type IntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']>;
  divide?: InputMaybe<Scalars['Int']>;
  increment?: InputMaybe<Scalars['Int']>;
  multiply?: InputMaybe<Scalars['Int']>;
  set?: InputMaybe<Scalars['Int']>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type IntNullableWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatNullableFilter>;
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedIntNullableFilter>;
  _min?: InputMaybe<NestedIntNullableFilter>;
  _sum?: InputMaybe<NestedIntNullableFilter>;
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type IntWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedIntFilter>;
  _min?: InputMaybe<NestedIntFilter>;
  _sum?: InputMaybe<NestedIntFilter>;
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type JsonFilter = {
  array_contains?: InputMaybe<Scalars['Json']>;
  array_ends_with?: InputMaybe<Scalars['Json']>;
  array_starts_with?: InputMaybe<Scalars['Json']>;
  equals?: InputMaybe<Scalars['Json']>;
  gt?: InputMaybe<Scalars['Json']>;
  gte?: InputMaybe<Scalars['Json']>;
  lt?: InputMaybe<Scalars['Json']>;
  lte?: InputMaybe<Scalars['Json']>;
  not?: InputMaybe<Scalars['Json']>;
  path?: InputMaybe<Array<Scalars['String']>>;
  string_contains?: InputMaybe<Scalars['String']>;
  string_ends_with?: InputMaybe<Scalars['String']>;
  string_starts_with?: InputMaybe<Scalars['String']>;
};

export type JsonNullableListFilter = {
  equals?: InputMaybe<Array<Scalars['Json']>>;
  has?: InputMaybe<Scalars['Json']>;
  hasEvery?: InputMaybe<Array<Scalars['Json']>>;
  hasSome?: InputMaybe<Array<Scalars['Json']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']>;
};

export enum JsonNullValueFilter {
  AnyNull = 'AnyNull',
  DbNull = 'DbNull',
  JsonNull = 'JsonNull'
}

export enum JsonNullValueInput {
  JsonNull = 'JsonNull'
}

export type JsonWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedJsonFilter>;
  _min?: InputMaybe<NestedJsonFilter>;
  array_contains?: InputMaybe<Scalars['Json']>;
  array_ends_with?: InputMaybe<Scalars['Json']>;
  array_starts_with?: InputMaybe<Scalars['Json']>;
  equals?: InputMaybe<Scalars['Json']>;
  gt?: InputMaybe<Scalars['Json']>;
  gte?: InputMaybe<Scalars['Json']>;
  lt?: InputMaybe<Scalars['Json']>;
  lte?: InputMaybe<Scalars['Json']>;
  not?: InputMaybe<Scalars['Json']>;
  path?: InputMaybe<Array<Scalars['String']>>;
  string_contains?: InputMaybe<Scalars['String']>;
  string_ends_with?: InputMaybe<Scalars['String']>;
  string_starts_with?: InputMaybe<Scalars['String']>;
};

export type LegalAgreement = {
  __typename?: 'LegalAgreement';
  aggreed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  Credentials?: Maybe<Credentials>;
  credentialsId?: Maybe<Scalars['String']>;
  Document: Document;
  documentId: Scalars['Int'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type LegalAgreementAvgOrderByAggregateInput = {
  documentId?: InputMaybe<SortOrder>;
};

export type LegalAgreementCountOrderByAggregateInput = {
  aggreed?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  credentialsId?: InputMaybe<SortOrder>;
  documentId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type LegalAgreementCreateInput = {
  aggreed?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutLegalAgreementInput>;
  Document: DocumentCreateNestedOneWithoutLegalAgreementInput;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type LegalAgreementCreateManyCredentialsInput = {
  aggreed?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  documentId: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type LegalAgreementCreateManyCredentialsInputEnvelope = {
  data: Array<LegalAgreementCreateManyCredentialsInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type LegalAgreementCreateManyDocumentInput = {
  aggreed?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  credentialsId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type LegalAgreementCreateManyDocumentInputEnvelope = {
  data: Array<LegalAgreementCreateManyDocumentInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type LegalAgreementCreateManyInput = {
  aggreed?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  credentialsId?: InputMaybe<Scalars['String']>;
  documentId: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type LegalAgreementCreateNestedManyWithoutCredentialsInput = {
  connect?: InputMaybe<Array<LegalAgreementWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<LegalAgreementCreateOrConnectWithoutCredentialsInput>>;
  create?: InputMaybe<Array<LegalAgreementCreateWithoutCredentialsInput>>;
  createMany?: InputMaybe<LegalAgreementCreateManyCredentialsInputEnvelope>;
};

export type LegalAgreementCreateNestedManyWithoutDocumentInput = {
  connect?: InputMaybe<Array<LegalAgreementWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<LegalAgreementCreateOrConnectWithoutDocumentInput>>;
  create?: InputMaybe<Array<LegalAgreementCreateWithoutDocumentInput>>;
  createMany?: InputMaybe<LegalAgreementCreateManyDocumentInputEnvelope>;
};

export type LegalAgreementCreateOrConnectWithoutCredentialsInput = {
  create: LegalAgreementCreateWithoutCredentialsInput;
  where: LegalAgreementWhereUniqueInput;
};

export type LegalAgreementCreateOrConnectWithoutDocumentInput = {
  create: LegalAgreementCreateWithoutDocumentInput;
  where: LegalAgreementWhereUniqueInput;
};

export type LegalAgreementCreateWithoutCredentialsInput = {
  aggreed?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Document: DocumentCreateNestedOneWithoutLegalAgreementInput;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type LegalAgreementCreateWithoutDocumentInput = {
  aggreed?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutLegalAgreementInput>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type LegalAgreementListRelationFilter = {
  every?: InputMaybe<LegalAgreementWhereInput>;
  none?: InputMaybe<LegalAgreementWhereInput>;
  some?: InputMaybe<LegalAgreementWhereInput>;
};

export type LegalAgreementMaxOrderByAggregateInput = {
  aggreed?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  credentialsId?: InputMaybe<SortOrder>;
  documentId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type LegalAgreementMinOrderByAggregateInput = {
  aggreed?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  credentialsId?: InputMaybe<SortOrder>;
  documentId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type LegalAgreementOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type LegalAgreementOrderByWithAggregationInput = {
  _avg?: InputMaybe<LegalAgreementAvgOrderByAggregateInput>;
  _count?: InputMaybe<LegalAgreementCountOrderByAggregateInput>;
  _max?: InputMaybe<LegalAgreementMaxOrderByAggregateInput>;
  _min?: InputMaybe<LegalAgreementMinOrderByAggregateInput>;
  _sum?: InputMaybe<LegalAgreementSumOrderByAggregateInput>;
  aggreed?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  credentialsId?: InputMaybe<SortOrder>;
  documentId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type LegalAgreementOrderByWithRelationInput = {
  aggreed?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  Credentials?: InputMaybe<CredentialsOrderByWithRelationInput>;
  credentialsId?: InputMaybe<SortOrder>;
  Document?: InputMaybe<DocumentOrderByWithRelationInput>;
  documentId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum LegalAgreementScalarFieldEnum {
  Aggreed = 'aggreed',
  CreatedAt = 'createdAt',
  CredentialsId = 'credentialsId',
  DocumentId = 'documentId',
  Id = 'id',
  UpdatedAt = 'updatedAt'
}

export type LegalAgreementScalarWhereInput = {
  aggreed?: InputMaybe<BoolFilter>;
  AND?: InputMaybe<Array<LegalAgreementScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  credentialsId?: InputMaybe<StringNullableFilter>;
  documentId?: InputMaybe<IntFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<LegalAgreementScalarWhereInput>>;
  OR?: InputMaybe<Array<LegalAgreementScalarWhereInput>>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type LegalAgreementScalarWhereWithAggregatesInput = {
  aggreed?: InputMaybe<BoolWithAggregatesFilter>;
  AND?: InputMaybe<Array<LegalAgreementScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  credentialsId?: InputMaybe<StringNullableWithAggregatesFilter>;
  documentId?: InputMaybe<IntWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<LegalAgreementScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<LegalAgreementScalarWhereWithAggregatesInput>>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type LegalAgreementSumOrderByAggregateInput = {
  documentId?: InputMaybe<SortOrder>;
};

export type LegalAgreementUpdateInput = {
  aggreed?: InputMaybe<BoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutLegalAgreementNestedInput>;
  Document?: InputMaybe<DocumentUpdateOneRequiredWithoutLegalAgreementNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type LegalAgreementUpdateManyMutationInput = {
  aggreed?: InputMaybe<BoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type LegalAgreementUpdateManyWithoutCredentialsNestedInput = {
  connect?: InputMaybe<Array<LegalAgreementWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<LegalAgreementCreateOrConnectWithoutCredentialsInput>>;
  create?: InputMaybe<Array<LegalAgreementCreateWithoutCredentialsInput>>;
  createMany?: InputMaybe<LegalAgreementCreateManyCredentialsInputEnvelope>;
  delete?: InputMaybe<Array<LegalAgreementWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<LegalAgreementScalarWhereInput>>;
  disconnect?: InputMaybe<Array<LegalAgreementWhereUniqueInput>>;
  set?: InputMaybe<Array<LegalAgreementWhereUniqueInput>>;
  update?: InputMaybe<Array<LegalAgreementUpdateWithWhereUniqueWithoutCredentialsInput>>;
  updateMany?: InputMaybe<Array<LegalAgreementUpdateManyWithWhereWithoutCredentialsInput>>;
  upsert?: InputMaybe<Array<LegalAgreementUpsertWithWhereUniqueWithoutCredentialsInput>>;
};

export type LegalAgreementUpdateManyWithoutDocumentNestedInput = {
  connect?: InputMaybe<Array<LegalAgreementWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<LegalAgreementCreateOrConnectWithoutDocumentInput>>;
  create?: InputMaybe<Array<LegalAgreementCreateWithoutDocumentInput>>;
  createMany?: InputMaybe<LegalAgreementCreateManyDocumentInputEnvelope>;
  delete?: InputMaybe<Array<LegalAgreementWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<LegalAgreementScalarWhereInput>>;
  disconnect?: InputMaybe<Array<LegalAgreementWhereUniqueInput>>;
  set?: InputMaybe<Array<LegalAgreementWhereUniqueInput>>;
  update?: InputMaybe<Array<LegalAgreementUpdateWithWhereUniqueWithoutDocumentInput>>;
  updateMany?: InputMaybe<Array<LegalAgreementUpdateManyWithWhereWithoutDocumentInput>>;
  upsert?: InputMaybe<Array<LegalAgreementUpsertWithWhereUniqueWithoutDocumentInput>>;
};

export type LegalAgreementUpdateManyWithWhereWithoutCredentialsInput = {
  data: LegalAgreementUpdateManyMutationInput;
  where: LegalAgreementScalarWhereInput;
};

export type LegalAgreementUpdateManyWithWhereWithoutDocumentInput = {
  data: LegalAgreementUpdateManyMutationInput;
  where: LegalAgreementScalarWhereInput;
};

export type LegalAgreementUpdateWithoutCredentialsInput = {
  aggreed?: InputMaybe<BoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Document?: InputMaybe<DocumentUpdateOneRequiredWithoutLegalAgreementNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type LegalAgreementUpdateWithoutDocumentInput = {
  aggreed?: InputMaybe<BoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutLegalAgreementNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type LegalAgreementUpdateWithWhereUniqueWithoutCredentialsInput = {
  data: LegalAgreementUpdateWithoutCredentialsInput;
  where: LegalAgreementWhereUniqueInput;
};

export type LegalAgreementUpdateWithWhereUniqueWithoutDocumentInput = {
  data: LegalAgreementUpdateWithoutDocumentInput;
  where: LegalAgreementWhereUniqueInput;
};

export type LegalAgreementUpsertWithWhereUniqueWithoutCredentialsInput = {
  create: LegalAgreementCreateWithoutCredentialsInput;
  update: LegalAgreementUpdateWithoutCredentialsInput;
  where: LegalAgreementWhereUniqueInput;
};

export type LegalAgreementUpsertWithWhereUniqueWithoutDocumentInput = {
  create: LegalAgreementCreateWithoutDocumentInput;
  update: LegalAgreementUpdateWithoutDocumentInput;
  where: LegalAgreementWhereUniqueInput;
};

export type LegalAgreementWhereInput = {
  aggreed?: InputMaybe<BoolFilter>;
  AND?: InputMaybe<Array<LegalAgreementWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  Credentials?: InputMaybe<CredentialsWhereInput>;
  credentialsId?: InputMaybe<StringNullableFilter>;
  Document?: InputMaybe<DocumentWhereInput>;
  documentId?: InputMaybe<IntFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<LegalAgreementWhereInput>>;
  OR?: InputMaybe<Array<LegalAgreementWhereInput>>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type LegalAgreementWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type LiveOutPersonal = {
  __typename?: 'LiveOutPersonal';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  Out: Array<Out>;
  Personal: Personal;
  personalId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};


export type LiveOutPersonalOutArgs = {
  cursor?: InputMaybe<OutWhereUniqueInput>;
  distinct?: InputMaybe<Array<OutScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OutOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OutWhereInput>;
};

export type LiveOutPersonalCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  personalId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type LiveOutPersonalCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  Out?: InputMaybe<OutCreateNestedManyWithoutLiveOutPersonalInput>;
  Personal: PersonalCreateNestedOneWithoutLiveOutPersonalInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type LiveOutPersonalCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  personalId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type LiveOutPersonalCreateNestedOneWithoutOutInput = {
  connect?: InputMaybe<LiveOutPersonalWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LiveOutPersonalCreateOrConnectWithoutOutInput>;
  create?: InputMaybe<LiveOutPersonalCreateWithoutOutInput>;
};

export type LiveOutPersonalCreateNestedOneWithoutPersonalInput = {
  connect?: InputMaybe<LiveOutPersonalWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LiveOutPersonalCreateOrConnectWithoutPersonalInput>;
  create?: InputMaybe<LiveOutPersonalCreateWithoutPersonalInput>;
};

export type LiveOutPersonalCreateOrConnectWithoutOutInput = {
  create: LiveOutPersonalCreateWithoutOutInput;
  where: LiveOutPersonalWhereUniqueInput;
};

export type LiveOutPersonalCreateOrConnectWithoutPersonalInput = {
  create: LiveOutPersonalCreateWithoutPersonalInput;
  where: LiveOutPersonalWhereUniqueInput;
};

export type LiveOutPersonalCreateWithoutOutInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  Personal: PersonalCreateNestedOneWithoutLiveOutPersonalInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type LiveOutPersonalCreateWithoutPersonalInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  Out?: InputMaybe<OutCreateNestedManyWithoutLiveOutPersonalInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type LiveOutPersonalMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  personalId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type LiveOutPersonalMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  personalId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type LiveOutPersonalOrderByWithAggregationInput = {
  _count?: InputMaybe<LiveOutPersonalCountOrderByAggregateInput>;
  _max?: InputMaybe<LiveOutPersonalMaxOrderByAggregateInput>;
  _min?: InputMaybe<LiveOutPersonalMinOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  personalId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type LiveOutPersonalOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  Out?: InputMaybe<OutOrderByRelationAggregateInput>;
  Personal?: InputMaybe<PersonalOrderByWithRelationInput>;
  personalId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type LiveOutPersonalRelationFilter = {
  is?: InputMaybe<LiveOutPersonalWhereInput>;
  isNot?: InputMaybe<LiveOutPersonalWhereInput>;
};

export enum LiveOutPersonalScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  PersonalId = 'personalId',
  UpdatedAt = 'updatedAt'
}

export type LiveOutPersonalScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<LiveOutPersonalScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<LiveOutPersonalScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<LiveOutPersonalScalarWhereWithAggregatesInput>>;
  personalId?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type LiveOutPersonalUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Out?: InputMaybe<OutUpdateManyWithoutLiveOutPersonalNestedInput>;
  Personal?: InputMaybe<PersonalUpdateOneRequiredWithoutLiveOutPersonalNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type LiveOutPersonalUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type LiveOutPersonalUpdateOneWithoutOutNestedInput = {
  connect?: InputMaybe<LiveOutPersonalWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LiveOutPersonalCreateOrConnectWithoutOutInput>;
  create?: InputMaybe<LiveOutPersonalCreateWithoutOutInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<LiveOutPersonalUpdateWithoutOutInput>;
  upsert?: InputMaybe<LiveOutPersonalUpsertWithoutOutInput>;
};

export type LiveOutPersonalUpdateOneWithoutPersonalNestedInput = {
  connect?: InputMaybe<LiveOutPersonalWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LiveOutPersonalCreateOrConnectWithoutPersonalInput>;
  create?: InputMaybe<LiveOutPersonalCreateWithoutPersonalInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<LiveOutPersonalUpdateWithoutPersonalInput>;
  upsert?: InputMaybe<LiveOutPersonalUpsertWithoutPersonalInput>;
};

export type LiveOutPersonalUpdateWithoutOutInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Personal?: InputMaybe<PersonalUpdateOneRequiredWithoutLiveOutPersonalNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type LiveOutPersonalUpdateWithoutPersonalInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Out?: InputMaybe<OutUpdateManyWithoutLiveOutPersonalNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type LiveOutPersonalUpsertWithoutOutInput = {
  create: LiveOutPersonalCreateWithoutOutInput;
  update: LiveOutPersonalUpdateWithoutOutInput;
};

export type LiveOutPersonalUpsertWithoutPersonalInput = {
  create: LiveOutPersonalCreateWithoutPersonalInput;
  update: LiveOutPersonalUpdateWithoutPersonalInput;
};

export type LiveOutPersonalWhereInput = {
  AND?: InputMaybe<Array<LiveOutPersonalWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<LiveOutPersonalWhereInput>>;
  OR?: InputMaybe<Array<LiveOutPersonalWhereInput>>;
  Out?: InputMaybe<OutListRelationFilter>;
  Personal?: InputMaybe<PersonalWhereInput>;
  personalId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type LiveOutPersonalWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  personalId?: InputMaybe<Scalars['String']>;
};

export type LiveOutVenue = {
  __typename?: 'LiveOutVenue';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  Out: Array<Out>;
  updatedAt: Scalars['DateTime'];
  Venue: Venue;
  venueId: Scalars['String'];
};


export type LiveOutVenueOutArgs = {
  cursor?: InputMaybe<OutWhereUniqueInput>;
  distinct?: InputMaybe<Array<OutScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OutOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OutWhereInput>;
};

export type LiveOutVenueCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  venueId?: InputMaybe<SortOrder>;
};

export type LiveOutVenueCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  Out?: InputMaybe<OutCreateNestedManyWithoutLiveOutVenueInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue: VenueCreateNestedOneWithoutLiveOutVenueInput;
};

export type LiveOutVenueCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueId: Scalars['String'];
};

export type LiveOutVenueCreateNestedOneWithoutOutInput = {
  connect?: InputMaybe<LiveOutVenueWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LiveOutVenueCreateOrConnectWithoutOutInput>;
  create?: InputMaybe<LiveOutVenueCreateWithoutOutInput>;
};

export type LiveOutVenueCreateNestedOneWithoutVenueInput = {
  connect?: InputMaybe<LiveOutVenueWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LiveOutVenueCreateOrConnectWithoutVenueInput>;
  create?: InputMaybe<LiveOutVenueCreateWithoutVenueInput>;
};

export type LiveOutVenueCreateOrConnectWithoutOutInput = {
  create: LiveOutVenueCreateWithoutOutInput;
  where: LiveOutVenueWhereUniqueInput;
};

export type LiveOutVenueCreateOrConnectWithoutVenueInput = {
  create: LiveOutVenueCreateWithoutVenueInput;
  where: LiveOutVenueWhereUniqueInput;
};

export type LiveOutVenueCreateWithoutOutInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue: VenueCreateNestedOneWithoutLiveOutVenueInput;
};

export type LiveOutVenueCreateWithoutVenueInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  Out?: InputMaybe<OutCreateNestedManyWithoutLiveOutVenueInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type LiveOutVenueMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  venueId?: InputMaybe<SortOrder>;
};

export type LiveOutVenueMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  venueId?: InputMaybe<SortOrder>;
};

export type LiveOutVenueOrderByWithAggregationInput = {
  _count?: InputMaybe<LiveOutVenueCountOrderByAggregateInput>;
  _max?: InputMaybe<LiveOutVenueMaxOrderByAggregateInput>;
  _min?: InputMaybe<LiveOutVenueMinOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  venueId?: InputMaybe<SortOrder>;
};

export type LiveOutVenueOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  Out?: InputMaybe<OutOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
  Venue?: InputMaybe<VenueOrderByWithRelationInput>;
  venueId?: InputMaybe<SortOrder>;
};

export type LiveOutVenueRelationFilter = {
  is?: InputMaybe<LiveOutVenueWhereInput>;
  isNot?: InputMaybe<LiveOutVenueWhereInput>;
};

export enum LiveOutVenueScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  UpdatedAt = 'updatedAt',
  VenueId = 'venueId'
}

export type LiveOutVenueScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<LiveOutVenueScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<LiveOutVenueScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<LiveOutVenueScalarWhereWithAggregatesInput>>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  venueId?: InputMaybe<StringWithAggregatesFilter>;
};

export type LiveOutVenueUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Out?: InputMaybe<OutUpdateManyWithoutLiveOutVenueNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneRequiredWithoutLiveOutVenueNestedInput>;
};

export type LiveOutVenueUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type LiveOutVenueUpdateOneWithoutOutNestedInput = {
  connect?: InputMaybe<LiveOutVenueWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LiveOutVenueCreateOrConnectWithoutOutInput>;
  create?: InputMaybe<LiveOutVenueCreateWithoutOutInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<LiveOutVenueUpdateWithoutOutInput>;
  upsert?: InputMaybe<LiveOutVenueUpsertWithoutOutInput>;
};

export type LiveOutVenueUpdateOneWithoutVenueNestedInput = {
  connect?: InputMaybe<LiveOutVenueWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LiveOutVenueCreateOrConnectWithoutVenueInput>;
  create?: InputMaybe<LiveOutVenueCreateWithoutVenueInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<LiveOutVenueUpdateWithoutVenueInput>;
  upsert?: InputMaybe<LiveOutVenueUpsertWithoutVenueInput>;
};

export type LiveOutVenueUpdateWithoutOutInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneRequiredWithoutLiveOutVenueNestedInput>;
};

export type LiveOutVenueUpdateWithoutVenueInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Out?: InputMaybe<OutUpdateManyWithoutLiveOutVenueNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type LiveOutVenueUpsertWithoutOutInput = {
  create: LiveOutVenueCreateWithoutOutInput;
  update: LiveOutVenueUpdateWithoutOutInput;
};

export type LiveOutVenueUpsertWithoutVenueInput = {
  create: LiveOutVenueCreateWithoutVenueInput;
  update: LiveOutVenueUpdateWithoutVenueInput;
};

export type LiveOutVenueWhereInput = {
  AND?: InputMaybe<Array<LiveOutVenueWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<LiveOutVenueWhereInput>>;
  OR?: InputMaybe<Array<LiveOutVenueWhereInput>>;
  Out?: InputMaybe<OutListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  Venue?: InputMaybe<VenueWhereInput>;
  venueId?: InputMaybe<StringFilter>;
};

export type LiveOutVenueWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  venueId?: InputMaybe<Scalars['String']>;
};

export type LiveVenueTotals = {
  __typename?: 'LiveVenueTotals';
  joined?: Maybe<Array<Out>>;
  totaled?: Maybe<Array<Out>>;
};

export type Location = {
  __typename?: 'Location';
  Address?: Maybe<Address>;
  addressId?: Maybe<Scalars['String']>;
  Area?: Maybe<Area>;
  areaId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  Geometry?: Maybe<Geometry>;
  geometryId?: Maybe<Scalars['Int']>;
  h3Index15: Scalars['String'];
  id: Scalars['ID'];
  plusCode?: Maybe<PluseCode>;
  pluseCodeId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  Venue?: Maybe<Venue>;
  venueId?: Maybe<Scalars['String']>;
};

export type LocationAvgOrderByAggregateInput = {
  geometryId?: InputMaybe<SortOrder>;
};

export type LocationCountOrderByAggregateInput = {
  addressId?: InputMaybe<SortOrder>;
  areaId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  geometryId?: InputMaybe<SortOrder>;
  h3Index15?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  pluseCodeId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  venueId?: InputMaybe<SortOrder>;
};

export type LocationCreateInput = {
  Address?: InputMaybe<AddressCreateNestedOneWithoutLocationInput>;
  Area?: InputMaybe<AreaCreateNestedOneWithoutLocationInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Geometry?: InputMaybe<GeometryCreateNestedOneWithoutLocationInput>;
  h3Index15: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  plusCode?: InputMaybe<PluseCodeCreateNestedOneWithoutLocationInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutLocationInput>;
};

export type LocationCreateManyAddressInput = {
  areaId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  geometryId?: InputMaybe<Scalars['Int']>;
  h3Index15: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  pluseCodeId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueId?: InputMaybe<Scalars['String']>;
};

export type LocationCreateManyAddressInputEnvelope = {
  data: Array<LocationCreateManyAddressInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type LocationCreateManyInput = {
  addressId?: InputMaybe<Scalars['String']>;
  areaId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  geometryId?: InputMaybe<Scalars['Int']>;
  h3Index15: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  pluseCodeId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueId?: InputMaybe<Scalars['String']>;
};

export type LocationCreateNestedManyWithoutAddressInput = {
  connect?: InputMaybe<Array<LocationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<LocationCreateOrConnectWithoutAddressInput>>;
  create?: InputMaybe<Array<LocationCreateWithoutAddressInput>>;
  createMany?: InputMaybe<LocationCreateManyAddressInputEnvelope>;
};

export type LocationCreateNestedOneWithoutAreaInput = {
  connect?: InputMaybe<LocationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LocationCreateOrConnectWithoutAreaInput>;
  create?: InputMaybe<LocationCreateWithoutAreaInput>;
};

export type LocationCreateNestedOneWithoutGeometryInput = {
  connect?: InputMaybe<LocationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LocationCreateOrConnectWithoutGeometryInput>;
  create?: InputMaybe<LocationCreateWithoutGeometryInput>;
};

export type LocationCreateNestedOneWithoutPlusCodeInput = {
  connect?: InputMaybe<LocationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LocationCreateOrConnectWithoutPlusCodeInput>;
  create?: InputMaybe<LocationCreateWithoutPlusCodeInput>;
};

export type LocationCreateNestedOneWithoutVenueInput = {
  connect?: InputMaybe<LocationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LocationCreateOrConnectWithoutVenueInput>;
  create?: InputMaybe<LocationCreateWithoutVenueInput>;
};

export type LocationCreateOrConnectWithoutAddressInput = {
  create: LocationCreateWithoutAddressInput;
  where: LocationWhereUniqueInput;
};

export type LocationCreateOrConnectWithoutAreaInput = {
  create: LocationCreateWithoutAreaInput;
  where: LocationWhereUniqueInput;
};

export type LocationCreateOrConnectWithoutGeometryInput = {
  create: LocationCreateWithoutGeometryInput;
  where: LocationWhereUniqueInput;
};

export type LocationCreateOrConnectWithoutPlusCodeInput = {
  create: LocationCreateWithoutPlusCodeInput;
  where: LocationWhereUniqueInput;
};

export type LocationCreateOrConnectWithoutVenueInput = {
  create: LocationCreateWithoutVenueInput;
  where: LocationWhereUniqueInput;
};

export type LocationCreateWithoutAddressInput = {
  Area?: InputMaybe<AreaCreateNestedOneWithoutLocationInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Geometry?: InputMaybe<GeometryCreateNestedOneWithoutLocationInput>;
  h3Index15: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  plusCode?: InputMaybe<PluseCodeCreateNestedOneWithoutLocationInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutLocationInput>;
};

export type LocationCreateWithoutAreaInput = {
  Address?: InputMaybe<AddressCreateNestedOneWithoutLocationInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Geometry?: InputMaybe<GeometryCreateNestedOneWithoutLocationInput>;
  h3Index15: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  plusCode?: InputMaybe<PluseCodeCreateNestedOneWithoutLocationInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutLocationInput>;
};

export type LocationCreateWithoutGeometryInput = {
  Address?: InputMaybe<AddressCreateNestedOneWithoutLocationInput>;
  Area?: InputMaybe<AreaCreateNestedOneWithoutLocationInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  h3Index15: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  plusCode?: InputMaybe<PluseCodeCreateNestedOneWithoutLocationInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutLocationInput>;
};

export type LocationCreateWithoutPlusCodeInput = {
  Address?: InputMaybe<AddressCreateNestedOneWithoutLocationInput>;
  Area?: InputMaybe<AreaCreateNestedOneWithoutLocationInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Geometry?: InputMaybe<GeometryCreateNestedOneWithoutLocationInput>;
  h3Index15: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutLocationInput>;
};

export type LocationCreateWithoutVenueInput = {
  Address?: InputMaybe<AddressCreateNestedOneWithoutLocationInput>;
  Area?: InputMaybe<AreaCreateNestedOneWithoutLocationInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Geometry?: InputMaybe<GeometryCreateNestedOneWithoutLocationInput>;
  h3Index15: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  plusCode?: InputMaybe<PluseCodeCreateNestedOneWithoutLocationInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type LocationListRelationFilter = {
  every?: InputMaybe<LocationWhereInput>;
  none?: InputMaybe<LocationWhereInput>;
  some?: InputMaybe<LocationWhereInput>;
};

export type LocationMaxOrderByAggregateInput = {
  addressId?: InputMaybe<SortOrder>;
  areaId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  geometryId?: InputMaybe<SortOrder>;
  h3Index15?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  pluseCodeId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  venueId?: InputMaybe<SortOrder>;
};

export type LocationMinOrderByAggregateInput = {
  addressId?: InputMaybe<SortOrder>;
  areaId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  geometryId?: InputMaybe<SortOrder>;
  h3Index15?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  pluseCodeId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  venueId?: InputMaybe<SortOrder>;
};

export type LocationOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type LocationOrderByWithAggregationInput = {
  _avg?: InputMaybe<LocationAvgOrderByAggregateInput>;
  _count?: InputMaybe<LocationCountOrderByAggregateInput>;
  _max?: InputMaybe<LocationMaxOrderByAggregateInput>;
  _min?: InputMaybe<LocationMinOrderByAggregateInput>;
  _sum?: InputMaybe<LocationSumOrderByAggregateInput>;
  addressId?: InputMaybe<SortOrder>;
  areaId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  geometryId?: InputMaybe<SortOrder>;
  h3Index15?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  pluseCodeId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  venueId?: InputMaybe<SortOrder>;
};

export type LocationOrderByWithRelationInput = {
  Address?: InputMaybe<AddressOrderByWithRelationInput>;
  addressId?: InputMaybe<SortOrder>;
  Area?: InputMaybe<AreaOrderByWithRelationInput>;
  areaId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  Geometry?: InputMaybe<GeometryOrderByWithRelationInput>;
  geometryId?: InputMaybe<SortOrder>;
  h3Index15?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  plusCode?: InputMaybe<PluseCodeOrderByWithRelationInput>;
  pluseCodeId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  Venue?: InputMaybe<VenueOrderByWithRelationInput>;
  venueId?: InputMaybe<SortOrder>;
};

export type LocationRelationFilter = {
  is?: InputMaybe<LocationWhereInput>;
  isNot?: InputMaybe<LocationWhereInput>;
};

export enum LocationScalarFieldEnum {
  AddressId = 'addressId',
  AreaId = 'areaId',
  CreatedAt = 'createdAt',
  GeometryId = 'geometryId',
  H3Index15 = 'h3Index15',
  Id = 'id',
  PluseCodeId = 'pluseCodeId',
  UpdatedAt = 'updatedAt',
  VenueId = 'venueId'
}

export type LocationScalarWhereInput = {
  addressId?: InputMaybe<StringNullableFilter>;
  AND?: InputMaybe<Array<LocationScalarWhereInput>>;
  areaId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  geometryId?: InputMaybe<IntNullableFilter>;
  h3Index15?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<LocationScalarWhereInput>>;
  OR?: InputMaybe<Array<LocationScalarWhereInput>>;
  pluseCodeId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  venueId?: InputMaybe<StringNullableFilter>;
};

export type LocationScalarWhereWithAggregatesInput = {
  addressId?: InputMaybe<StringNullableWithAggregatesFilter>;
  AND?: InputMaybe<Array<LocationScalarWhereWithAggregatesInput>>;
  areaId?: InputMaybe<StringNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  geometryId?: InputMaybe<IntNullableWithAggregatesFilter>;
  h3Index15?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<LocationScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<LocationScalarWhereWithAggregatesInput>>;
  pluseCodeId?: InputMaybe<StringNullableWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  venueId?: InputMaybe<StringNullableWithAggregatesFilter>;
};

export type LocationSumOrderByAggregateInput = {
  geometryId?: InputMaybe<SortOrder>;
};

export type LocationUpdateInput = {
  Address?: InputMaybe<AddressUpdateOneWithoutLocationNestedInput>;
  Area?: InputMaybe<AreaUpdateOneWithoutLocationNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Geometry?: InputMaybe<GeometryUpdateOneWithoutLocationNestedInput>;
  h3Index15?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  plusCode?: InputMaybe<PluseCodeUpdateOneWithoutLocationNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutLocationNestedInput>;
};

export type LocationUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  h3Index15?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type LocationUpdateManyWithoutAddressNestedInput = {
  connect?: InputMaybe<Array<LocationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<LocationCreateOrConnectWithoutAddressInput>>;
  create?: InputMaybe<Array<LocationCreateWithoutAddressInput>>;
  createMany?: InputMaybe<LocationCreateManyAddressInputEnvelope>;
  delete?: InputMaybe<Array<LocationWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<LocationScalarWhereInput>>;
  disconnect?: InputMaybe<Array<LocationWhereUniqueInput>>;
  set?: InputMaybe<Array<LocationWhereUniqueInput>>;
  update?: InputMaybe<Array<LocationUpdateWithWhereUniqueWithoutAddressInput>>;
  updateMany?: InputMaybe<Array<LocationUpdateManyWithWhereWithoutAddressInput>>;
  upsert?: InputMaybe<Array<LocationUpsertWithWhereUniqueWithoutAddressInput>>;
};

export type LocationUpdateManyWithWhereWithoutAddressInput = {
  data: LocationUpdateManyMutationInput;
  where: LocationScalarWhereInput;
};

export type LocationUpdateOneWithoutAreaNestedInput = {
  connect?: InputMaybe<LocationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LocationCreateOrConnectWithoutAreaInput>;
  create?: InputMaybe<LocationCreateWithoutAreaInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<LocationUpdateWithoutAreaInput>;
  upsert?: InputMaybe<LocationUpsertWithoutAreaInput>;
};

export type LocationUpdateOneWithoutGeometryNestedInput = {
  connect?: InputMaybe<LocationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LocationCreateOrConnectWithoutGeometryInput>;
  create?: InputMaybe<LocationCreateWithoutGeometryInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<LocationUpdateWithoutGeometryInput>;
  upsert?: InputMaybe<LocationUpsertWithoutGeometryInput>;
};

export type LocationUpdateOneWithoutPlusCodeNestedInput = {
  connect?: InputMaybe<LocationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LocationCreateOrConnectWithoutPlusCodeInput>;
  create?: InputMaybe<LocationCreateWithoutPlusCodeInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<LocationUpdateWithoutPlusCodeInput>;
  upsert?: InputMaybe<LocationUpsertWithoutPlusCodeInput>;
};

export type LocationUpdateOneWithoutVenueNestedInput = {
  connect?: InputMaybe<LocationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LocationCreateOrConnectWithoutVenueInput>;
  create?: InputMaybe<LocationCreateWithoutVenueInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<LocationUpdateWithoutVenueInput>;
  upsert?: InputMaybe<LocationUpsertWithoutVenueInput>;
};

export type LocationUpdateWithoutAddressInput = {
  Area?: InputMaybe<AreaUpdateOneWithoutLocationNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Geometry?: InputMaybe<GeometryUpdateOneWithoutLocationNestedInput>;
  h3Index15?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  plusCode?: InputMaybe<PluseCodeUpdateOneWithoutLocationNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutLocationNestedInput>;
};

export type LocationUpdateWithoutAreaInput = {
  Address?: InputMaybe<AddressUpdateOneWithoutLocationNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Geometry?: InputMaybe<GeometryUpdateOneWithoutLocationNestedInput>;
  h3Index15?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  plusCode?: InputMaybe<PluseCodeUpdateOneWithoutLocationNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutLocationNestedInput>;
};

export type LocationUpdateWithoutGeometryInput = {
  Address?: InputMaybe<AddressUpdateOneWithoutLocationNestedInput>;
  Area?: InputMaybe<AreaUpdateOneWithoutLocationNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  h3Index15?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  plusCode?: InputMaybe<PluseCodeUpdateOneWithoutLocationNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutLocationNestedInput>;
};

export type LocationUpdateWithoutPlusCodeInput = {
  Address?: InputMaybe<AddressUpdateOneWithoutLocationNestedInput>;
  Area?: InputMaybe<AreaUpdateOneWithoutLocationNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Geometry?: InputMaybe<GeometryUpdateOneWithoutLocationNestedInput>;
  h3Index15?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutLocationNestedInput>;
};

export type LocationUpdateWithoutVenueInput = {
  Address?: InputMaybe<AddressUpdateOneWithoutLocationNestedInput>;
  Area?: InputMaybe<AreaUpdateOneWithoutLocationNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Geometry?: InputMaybe<GeometryUpdateOneWithoutLocationNestedInput>;
  h3Index15?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  plusCode?: InputMaybe<PluseCodeUpdateOneWithoutLocationNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type LocationUpdateWithWhereUniqueWithoutAddressInput = {
  data: LocationUpdateWithoutAddressInput;
  where: LocationWhereUniqueInput;
};

export type LocationUpsertWithoutAreaInput = {
  create: LocationCreateWithoutAreaInput;
  update: LocationUpdateWithoutAreaInput;
};

export type LocationUpsertWithoutGeometryInput = {
  create: LocationCreateWithoutGeometryInput;
  update: LocationUpdateWithoutGeometryInput;
};

export type LocationUpsertWithoutPlusCodeInput = {
  create: LocationCreateWithoutPlusCodeInput;
  update: LocationUpdateWithoutPlusCodeInput;
};

export type LocationUpsertWithoutVenueInput = {
  create: LocationCreateWithoutVenueInput;
  update: LocationUpdateWithoutVenueInput;
};

export type LocationUpsertWithWhereUniqueWithoutAddressInput = {
  create: LocationCreateWithoutAddressInput;
  update: LocationUpdateWithoutAddressInput;
  where: LocationWhereUniqueInput;
};

export type LocationWhereInput = {
  Address?: InputMaybe<AddressWhereInput>;
  addressId?: InputMaybe<StringNullableFilter>;
  AND?: InputMaybe<Array<LocationWhereInput>>;
  Area?: InputMaybe<AreaWhereInput>;
  areaId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  Geometry?: InputMaybe<GeometryWhereInput>;
  geometryId?: InputMaybe<IntNullableFilter>;
  h3Index15?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<LocationWhereInput>>;
  OR?: InputMaybe<Array<LocationWhereInput>>;
  plusCode?: InputMaybe<PluseCodeWhereInput>;
  pluseCodeId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  Venue?: InputMaybe<VenueWhereInput>;
  venueId?: InputMaybe<StringNullableFilter>;
};

export type LocationWhereUniqueInput = {
  areaId?: InputMaybe<Scalars['String']>;
  geometryId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  pluseCodeId?: InputMaybe<Scalars['String']>;
  venueId?: InputMaybe<Scalars['String']>;
};

export type MessageCountOrderByAggregateInput = {
  chatroomId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  message?: InputMaybe<SortOrder>;
  responseId?: InputMaybe<SortOrder>;
  senderId?: InputMaybe<SortOrder>;
};

export type MessageCreateInput = {
  Chatroom?: InputMaybe<ChatroomCreateNestedOneWithoutMessagesInput>;
  id?: InputMaybe<Scalars['String']>;
  message: Scalars['String'];
  response?: InputMaybe<MessageCreateNestedOneWithoutResponsesInput>;
  responses?: InputMaybe<MessageCreateNestedManyWithoutResponseInput>;
  senderId: Scalars['String'];
};

export type MessageCreateManyChatroomInput = {
  id?: InputMaybe<Scalars['String']>;
  message: Scalars['String'];
  responseId?: InputMaybe<Scalars['String']>;
  senderId: Scalars['String'];
};

export type MessageCreateManyChatroomInputEnvelope = {
  data: Array<MessageCreateManyChatroomInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type MessageCreateManyInput = {
  chatroomId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  message: Scalars['String'];
  responseId?: InputMaybe<Scalars['String']>;
  senderId: Scalars['String'];
};

export type MessageCreateManyResponseInput = {
  chatroomId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  message: Scalars['String'];
  senderId: Scalars['String'];
};

export type MessageCreateManyResponseInputEnvelope = {
  data: Array<MessageCreateManyResponseInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type MessageCreateNestedManyWithoutChatroomInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCreateOrConnectWithoutChatroomInput>>;
  create?: InputMaybe<Array<MessageCreateWithoutChatroomInput>>;
  createMany?: InputMaybe<MessageCreateManyChatroomInputEnvelope>;
};

export type MessageCreateNestedManyWithoutResponseInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCreateOrConnectWithoutResponseInput>>;
  create?: InputMaybe<Array<MessageCreateWithoutResponseInput>>;
  createMany?: InputMaybe<MessageCreateManyResponseInputEnvelope>;
};

export type MessageCreateNestedOneWithoutResponsesInput = {
  connect?: InputMaybe<MessageWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MessageCreateOrConnectWithoutResponsesInput>;
  create?: InputMaybe<MessageCreateWithoutResponsesInput>;
};

export type MessageCreateOrConnectWithoutChatroomInput = {
  create: MessageCreateWithoutChatroomInput;
  where: MessageWhereUniqueInput;
};

export type MessageCreateOrConnectWithoutResponseInput = {
  create: MessageCreateWithoutResponseInput;
  where: MessageWhereUniqueInput;
};

export type MessageCreateOrConnectWithoutResponsesInput = {
  create: MessageCreateWithoutResponsesInput;
  where: MessageWhereUniqueInput;
};

export type MessageCreateWithoutChatroomInput = {
  id?: InputMaybe<Scalars['String']>;
  message: Scalars['String'];
  response?: InputMaybe<MessageCreateNestedOneWithoutResponsesInput>;
  responses?: InputMaybe<MessageCreateNestedManyWithoutResponseInput>;
  senderId: Scalars['String'];
};

export type MessageCreateWithoutResponseInput = {
  Chatroom?: InputMaybe<ChatroomCreateNestedOneWithoutMessagesInput>;
  id?: InputMaybe<Scalars['String']>;
  message: Scalars['String'];
  responses?: InputMaybe<MessageCreateNestedManyWithoutResponseInput>;
  senderId: Scalars['String'];
};

export type MessageCreateWithoutResponsesInput = {
  Chatroom?: InputMaybe<ChatroomCreateNestedOneWithoutMessagesInput>;
  id?: InputMaybe<Scalars['String']>;
  message: Scalars['String'];
  response?: InputMaybe<MessageCreateNestedOneWithoutResponsesInput>;
  senderId: Scalars['String'];
};

export type MessageListRelationFilter = {
  every?: InputMaybe<MessageWhereInput>;
  none?: InputMaybe<MessageWhereInput>;
  some?: InputMaybe<MessageWhereInput>;
};

export type MessageMaxOrderByAggregateInput = {
  chatroomId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  message?: InputMaybe<SortOrder>;
  responseId?: InputMaybe<SortOrder>;
  senderId?: InputMaybe<SortOrder>;
};

export type MessageMinOrderByAggregateInput = {
  chatroomId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  message?: InputMaybe<SortOrder>;
  responseId?: InputMaybe<SortOrder>;
  senderId?: InputMaybe<SortOrder>;
};

export type MessageOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type MessageOrderByWithAggregationInput = {
  _count?: InputMaybe<MessageCountOrderByAggregateInput>;
  _max?: InputMaybe<MessageMaxOrderByAggregateInput>;
  _min?: InputMaybe<MessageMinOrderByAggregateInput>;
  chatroomId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  message?: InputMaybe<SortOrder>;
  responseId?: InputMaybe<SortOrder>;
  senderId?: InputMaybe<SortOrder>;
};

export type MessageOrderByWithRelationInput = {
  Chatroom?: InputMaybe<ChatroomOrderByWithRelationInput>;
  chatroomId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  message?: InputMaybe<SortOrder>;
  response?: InputMaybe<MessageOrderByWithRelationInput>;
  responseId?: InputMaybe<SortOrder>;
  responses?: InputMaybe<MessageOrderByRelationAggregateInput>;
  senderId?: InputMaybe<SortOrder>;
};

export type MessageRelationFilter = {
  is?: InputMaybe<MessageWhereInput>;
  isNot?: InputMaybe<MessageWhereInput>;
};

export enum MessageScalarFieldEnum {
  ChatroomId = 'chatroomId',
  Id = 'id',
  Message = 'message',
  ResponseId = 'responseId',
  SenderId = 'senderId'
}

export type MessageScalarWhereInput = {
  AND?: InputMaybe<Array<MessageScalarWhereInput>>;
  chatroomId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  message?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<MessageScalarWhereInput>>;
  OR?: InputMaybe<Array<MessageScalarWhereInput>>;
  responseId?: InputMaybe<StringNullableFilter>;
  senderId?: InputMaybe<StringFilter>;
};

export type MessageScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<MessageScalarWhereWithAggregatesInput>>;
  chatroomId?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  message?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<MessageScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<MessageScalarWhereWithAggregatesInput>>;
  responseId?: InputMaybe<StringNullableWithAggregatesFilter>;
  senderId?: InputMaybe<StringWithAggregatesFilter>;
};

export type MessageUpdateInput = {
  Chatroom?: InputMaybe<ChatroomUpdateOneWithoutMessagesNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  message?: InputMaybe<StringFieldUpdateOperationsInput>;
  response?: InputMaybe<MessageUpdateOneWithoutResponsesNestedInput>;
  responses?: InputMaybe<MessageUpdateManyWithoutResponseNestedInput>;
  senderId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type MessageUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  message?: InputMaybe<StringFieldUpdateOperationsInput>;
  senderId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type MessageUpdateManyWithoutChatroomNestedInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCreateOrConnectWithoutChatroomInput>>;
  create?: InputMaybe<Array<MessageCreateWithoutChatroomInput>>;
  createMany?: InputMaybe<MessageCreateManyChatroomInputEnvelope>;
  delete?: InputMaybe<Array<MessageWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MessageScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  set?: InputMaybe<Array<MessageWhereUniqueInput>>;
  update?: InputMaybe<Array<MessageUpdateWithWhereUniqueWithoutChatroomInput>>;
  updateMany?: InputMaybe<Array<MessageUpdateManyWithWhereWithoutChatroomInput>>;
  upsert?: InputMaybe<Array<MessageUpsertWithWhereUniqueWithoutChatroomInput>>;
};

export type MessageUpdateManyWithoutResponseNestedInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCreateOrConnectWithoutResponseInput>>;
  create?: InputMaybe<Array<MessageCreateWithoutResponseInput>>;
  createMany?: InputMaybe<MessageCreateManyResponseInputEnvelope>;
  delete?: InputMaybe<Array<MessageWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MessageScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  set?: InputMaybe<Array<MessageWhereUniqueInput>>;
  update?: InputMaybe<Array<MessageUpdateWithWhereUniqueWithoutResponseInput>>;
  updateMany?: InputMaybe<Array<MessageUpdateManyWithWhereWithoutResponseInput>>;
  upsert?: InputMaybe<Array<MessageUpsertWithWhereUniqueWithoutResponseInput>>;
};

export type MessageUpdateManyWithWhereWithoutChatroomInput = {
  data: MessageUpdateManyMutationInput;
  where: MessageScalarWhereInput;
};

export type MessageUpdateManyWithWhereWithoutResponseInput = {
  data: MessageUpdateManyMutationInput;
  where: MessageScalarWhereInput;
};

export type MessageUpdateOneWithoutResponsesNestedInput = {
  connect?: InputMaybe<MessageWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MessageCreateOrConnectWithoutResponsesInput>;
  create?: InputMaybe<MessageCreateWithoutResponsesInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<MessageUpdateWithoutResponsesInput>;
  upsert?: InputMaybe<MessageUpsertWithoutResponsesInput>;
};

export type MessageUpdateWithoutChatroomInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  message?: InputMaybe<StringFieldUpdateOperationsInput>;
  response?: InputMaybe<MessageUpdateOneWithoutResponsesNestedInput>;
  responses?: InputMaybe<MessageUpdateManyWithoutResponseNestedInput>;
  senderId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type MessageUpdateWithoutResponseInput = {
  Chatroom?: InputMaybe<ChatroomUpdateOneWithoutMessagesNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  message?: InputMaybe<StringFieldUpdateOperationsInput>;
  responses?: InputMaybe<MessageUpdateManyWithoutResponseNestedInput>;
  senderId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type MessageUpdateWithoutResponsesInput = {
  Chatroom?: InputMaybe<ChatroomUpdateOneWithoutMessagesNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  message?: InputMaybe<StringFieldUpdateOperationsInput>;
  response?: InputMaybe<MessageUpdateOneWithoutResponsesNestedInput>;
  senderId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type MessageUpdateWithWhereUniqueWithoutChatroomInput = {
  data: MessageUpdateWithoutChatroomInput;
  where: MessageWhereUniqueInput;
};

export type MessageUpdateWithWhereUniqueWithoutResponseInput = {
  data: MessageUpdateWithoutResponseInput;
  where: MessageWhereUniqueInput;
};

export type MessageUpsertWithoutResponsesInput = {
  create: MessageCreateWithoutResponsesInput;
  update: MessageUpdateWithoutResponsesInput;
};

export type MessageUpsertWithWhereUniqueWithoutChatroomInput = {
  create: MessageCreateWithoutChatroomInput;
  update: MessageUpdateWithoutChatroomInput;
  where: MessageWhereUniqueInput;
};

export type MessageUpsertWithWhereUniqueWithoutResponseInput = {
  create: MessageCreateWithoutResponseInput;
  update: MessageUpdateWithoutResponseInput;
  where: MessageWhereUniqueInput;
};

export type MessageWhereInput = {
  AND?: InputMaybe<Array<MessageWhereInput>>;
  Chatroom?: InputMaybe<ChatroomWhereInput>;
  chatroomId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  message?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<MessageWhereInput>>;
  OR?: InputMaybe<Array<MessageWhereInput>>;
  response?: InputMaybe<MessageWhereInput>;
  responseId?: InputMaybe<StringNullableFilter>;
  responses?: InputMaybe<MessageListRelationFilter>;
  senderId?: InputMaybe<StringFilter>;
};

export type MessageWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptFriendRequest: Relationship;
  addPersonalJoinsVenue: Profile;
  addPersonalTotalsVenue: Scalars['Boolean'];
  addStoryPhotos: Story;
  createFriendRequest: Scalars['Boolean'];
  createGuestProfile: AuthenticationResponseUnion;
  createPersonalProfile: AuthenticationResponseUnion;
  createVenueProfile: AuthenticationResponseUnion;
  declineFriendRequest: Scalars['Boolean'];
  deleteFriendRequest: Scalars['Boolean'];
  qrAddFriend: Relationship;
  refreshDeviceManager: AuthenticationResponseUnion;
  removeAllFromVenueDeveloper: Scalars['Boolean'];
  removeDeviceProfileFromDeviceManager: Scalars['Boolean'];
  removeFriend: Scalars['Boolean'];
  removePersonalJoinsVenue: Profile;
  removePersonalTotalsVenue: Scalars['Boolean'];
  removeStoryPhotos: Story;
  sendAuthenticatorDeviceOwnerCode: CodeResponse;
  sendAuthenticatorForgotPasswordCode: CodeResponse;
  switchDeviceProfile: AuthenticationResponseUnion;
  updateCityRequested: Scalars['Boolean'];
  /** Update H6 coming area to be notified */
  updateH6ComingAreaToBeNotified: ComingArea;
  /** Update H6 coming area vote */
  updateH6ComingAreaVote: ComingArea;
  /** This function updates the upvote for a venue recommendation for a H3Index6. If the user has already upvoted, it will be set to false. If the user has not upvoted, it will be set to true. */
  updateH6VenueRemmendation: H3Index6VenueRecommendation;
  updateOneProfile?: Maybe<Profile>;
  updateProfileIdentifiableInformation: AuthenticationResponseUnion;
  updateStoryEmojimood: Story;
  updateThemeManagerSwitchTheme: ProfileTheme;
  upsertDevicePushToken: Scalars['Boolean'];
};


export type MutationAcceptFriendRequestArgs = {
  friendRequestId: Scalars['String'];
  venueIdMetAt?: InputMaybe<Scalars['String']>;
};


export type MutationAddPersonalJoinsVenueArgs = {
  profileIdVenue?: InputMaybe<Scalars['String']>;
};


export type MutationAddPersonalTotalsVenueArgs = {
  profileIdPersonal?: InputMaybe<Scalars['String']>;
  profileIdVenue?: InputMaybe<Scalars['String']>;
};


export type MutationAddStoryPhotosArgs = {
  photos?: InputMaybe<PhotoCreateManyProfileInputEnvelope>;
};


export type MutationCreateFriendRequestArgs = {
  receiversProfileId: Array<Scalars['String']>;
  senderProfileId: Scalars['String'];
};


export type MutationCreatePersonalProfileArgs = {
  data?: InputMaybe<CreatePersonalDataInput>;
};


export type MutationCreateVenueProfileArgs = {
  data?: InputMaybe<CreateVenueDataInput>;
};


export type MutationDeclineFriendRequestArgs = {
  friendRequestId: Scalars['String'];
};


export type MutationDeleteFriendRequestArgs = {
  friendRequestId: Scalars['String'];
};


export type MutationQrAddFriendArgs = {
  dataHash: Scalars['String'];
  qrCodeProfileId: Scalars['String'];
};


export type MutationRemoveAllFromVenueDeveloperArgs = {
  profileIdVenue?: InputMaybe<Scalars['String']>;
};


export type MutationRemoveDeviceProfileFromDeviceManagerArgs = {
  profileId: Scalars['String'];
  profileType?: InputMaybe<ProfileType>;
};


export type MutationRemoveFriendArgs = {
  relationshipId: Scalars['String'];
};


export type MutationRemovePersonalTotalsVenueArgs = {
  profileIdVenue?: InputMaybe<Scalars['String']>;
};


export type MutationRemoveStoryPhotosArgs = {
  photoId: Scalars['String'];
};


export type MutationSendAuthenticatorDeviceOwnerCodeArgs = {
  data?: InputMaybe<CodeDataInput>;
  where?: InputMaybe<CustomCodeWhereInput>;
};


export type MutationSendAuthenticatorForgotPasswordCodeArgs = {
  data?: InputMaybe<CodeDataInput>;
  where?: InputMaybe<CustomCodeWhereInput>;
};


export type MutationSwitchDeviceProfileArgs = {
  profileId: Scalars['String'];
};


export type MutationUpdateCityRequestedArgs = {
  cityName: Scalars['String'];
};


export type MutationUpdateH6ComingAreaToBeNotifiedArgs = {
  comingAreaId: Scalars['String'];
};


export type MutationUpdateH6ComingAreaVoteArgs = {
  comingAreaId: Scalars['String'];
};


export type MutationUpdateH6VenueRemmendationArgs = {
  venueRecommendationId: Scalars['String'];
};


export type MutationUpdateOneProfileArgs = {
  data: ProfileUpdateInput;
  where: ProfileWhereUniqueInput;
};


export type MutationUpdateProfileIdentifiableInformationArgs = {
  data: IdentifiableInformationUpdateInput;
};


export type MutationUpdateStoryEmojimoodArgs = {
  emojimoodId: Scalars['Int'];
  storyId?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateThemeManagerSwitchThemeArgs = {
  id: Scalars['String'];
  themeId: Scalars['String'];
};


export type MutationUpsertDevicePushTokenArgs = {
  androidToken?: InputMaybe<Scalars['String']>;
  appleToken?: InputMaybe<Scalars['String']>;
  expoToken?: InputMaybe<Scalars['String']>;
};

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type NestedBoolNullableFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolNullableFilter>;
};

export type NestedBoolNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedBoolNullableFilter>;
  _min?: InputMaybe<NestedBoolNullableFilter>;
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolNullableWithAggregatesFilter>;
};

export type NestedBoolWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedBoolFilter>;
  _min?: InputMaybe<NestedBoolFilter>;
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolWithAggregatesFilter>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedDateTimeNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedDateTimeNullableFilter>;
  _min?: InputMaybe<NestedDateTimeNullableFilter>;
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedDateTimeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedDateTimeFilter>;
  _min?: InputMaybe<NestedDateTimeFilter>;
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedEnumAppTypeFilter = {
  equals?: InputMaybe<AppType>;
  in?: InputMaybe<Array<AppType>>;
  not?: InputMaybe<AppType>;
  notIn?: InputMaybe<Array<AppType>>;
};

export type NestedEnumAppTypeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumAppTypeFilter>;
  _min?: InputMaybe<NestedEnumAppTypeFilter>;
  equals?: InputMaybe<AppType>;
  in?: InputMaybe<Array<AppType>>;
  not?: InputMaybe<AppType>;
  notIn?: InputMaybe<Array<AppType>>;
};

export type NestedEnumOutTypeFilter = {
  equals?: InputMaybe<OutType>;
  in?: InputMaybe<Array<OutType>>;
  not?: InputMaybe<OutType>;
  notIn?: InputMaybe<Array<OutType>>;
};

export type NestedEnumOutTypeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumOutTypeFilter>;
  _min?: InputMaybe<NestedEnumOutTypeFilter>;
  equals?: InputMaybe<OutType>;
  in?: InputMaybe<Array<OutType>>;
  not?: InputMaybe<OutType>;
  notIn?: InputMaybe<Array<OutType>>;
};

export type NestedEnumPhotoTypeNullableFilter = {
  equals?: InputMaybe<PhotoType>;
  in?: InputMaybe<Array<PhotoType>>;
  not?: InputMaybe<PhotoType>;
  notIn?: InputMaybe<Array<PhotoType>>;
};

export type NestedEnumPhotoTypeNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedEnumPhotoTypeNullableFilter>;
  _min?: InputMaybe<NestedEnumPhotoTypeNullableFilter>;
  equals?: InputMaybe<PhotoType>;
  in?: InputMaybe<Array<PhotoType>>;
  not?: InputMaybe<PhotoType>;
  notIn?: InputMaybe<Array<PhotoType>>;
};

export type NestedEnumProfileTypeFilter = {
  equals?: InputMaybe<ProfileType>;
  in?: InputMaybe<Array<ProfileType>>;
  not?: InputMaybe<ProfileType>;
  notIn?: InputMaybe<Array<ProfileType>>;
};

export type NestedEnumProfileTypeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumProfileTypeFilter>;
  _min?: InputMaybe<NestedEnumProfileTypeFilter>;
  equals?: InputMaybe<ProfileType>;
  in?: InputMaybe<Array<ProfileType>>;
  not?: InputMaybe<ProfileType>;
  notIn?: InputMaybe<Array<ProfileType>>;
};

export type NestedEnumSecureDataTypeFilter = {
  equals?: InputMaybe<SecureDataType>;
  in?: InputMaybe<Array<SecureDataType>>;
  not?: InputMaybe<SecureDataType>;
  notIn?: InputMaybe<Array<SecureDataType>>;
};

export type NestedEnumSecureDataTypeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumSecureDataTypeFilter>;
  _min?: InputMaybe<NestedEnumSecureDataTypeFilter>;
  equals?: InputMaybe<SecureDataType>;
  in?: InputMaybe<Array<SecureDataType>>;
  not?: InputMaybe<SecureDataType>;
  notIn?: InputMaybe<Array<SecureDataType>>;
};

export type NestedEnumTypeOfDocumentFilter = {
  equals?: InputMaybe<TypeOfDocument>;
  in?: InputMaybe<Array<TypeOfDocument>>;
  not?: InputMaybe<TypeOfDocument>;
  notIn?: InputMaybe<Array<TypeOfDocument>>;
};

export type NestedEnumTypeOfDocumentWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumTypeOfDocumentFilter>;
  _min?: InputMaybe<NestedEnumTypeOfDocumentFilter>;
  equals?: InputMaybe<TypeOfDocument>;
  in?: InputMaybe<Array<TypeOfDocument>>;
  not?: InputMaybe<TypeOfDocument>;
  notIn?: InputMaybe<Array<TypeOfDocument>>;
};

export type NestedFloatFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type NestedFloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type NestedFloatWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedFloatFilter>;
  _min?: InputMaybe<NestedFloatFilter>;
  _sum?: InputMaybe<NestedFloatFilter>;
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedIntNullableWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatNullableFilter>;
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedIntNullableFilter>;
  _min?: InputMaybe<NestedIntNullableFilter>;
  _sum?: InputMaybe<NestedIntNullableFilter>;
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedIntWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedIntFilter>;
  _min?: InputMaybe<NestedIntFilter>;
  _sum?: InputMaybe<NestedIntFilter>;
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedJsonFilter = {
  array_contains?: InputMaybe<Scalars['Json']>;
  array_ends_with?: InputMaybe<Scalars['Json']>;
  array_starts_with?: InputMaybe<Scalars['Json']>;
  equals?: InputMaybe<Scalars['Json']>;
  gt?: InputMaybe<Scalars['Json']>;
  gte?: InputMaybe<Scalars['Json']>;
  lt?: InputMaybe<Scalars['Json']>;
  lte?: InputMaybe<Scalars['Json']>;
  not?: InputMaybe<Scalars['Json']>;
  path?: InputMaybe<Array<Scalars['String']>>;
  string_contains?: InputMaybe<Scalars['String']>;
  string_ends_with?: InputMaybe<Scalars['String']>;
  string_starts_with?: InputMaybe<Scalars['String']>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedStringNullableFilter>;
  _min?: InputMaybe<NestedStringNullableFilter>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedStringFilter>;
  _min?: InputMaybe<NestedStringFilter>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NotificationFriendRequestStatusResponse = Error | FriendRequest | RejectedFriendsResponse | Relationship;

export type NotificationResponse = {
  __typename?: 'NotificationResponse';
  friendRequestNotifications?: Maybe<Array<FriendRequest>>;
};

export type Notifications = {
  __typename?: 'Notifications';
  FriendRequests: Array<FriendRequest>;
  id: Scalars['ID'];
  Profile: Profile;
  profileId: Scalars['String'];
};


export type NotificationsFriendRequestsArgs = {
  cursor?: InputMaybe<FriendRequestWhereUniqueInput>;
  distinct?: InputMaybe<Array<FriendRequestScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FriendRequestOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FriendRequestWhereInput>;
};

export type NotificationsCountOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
};

export type NotificationsCreateInput = {
  FriendRequests?: InputMaybe<FriendRequestCreateNestedManyWithoutNotificationsInput>;
  id?: InputMaybe<Scalars['String']>;
  Profile: ProfileCreateNestedOneWithoutNotificationsInput;
};

export type NotificationsCreateManyInput = {
  id?: InputMaybe<Scalars['String']>;
  profileId: Scalars['String'];
};

export type NotificationsCreateNestedManyWithoutFriendRequestsInput = {
  connect?: InputMaybe<Array<NotificationsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<NotificationsCreateOrConnectWithoutFriendRequestsInput>>;
  create?: InputMaybe<Array<NotificationsCreateWithoutFriendRequestsInput>>;
};

export type NotificationsCreateNestedOneWithoutProfileInput = {
  connect?: InputMaybe<NotificationsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<NotificationsCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<NotificationsCreateWithoutProfileInput>;
};

export type NotificationsCreateOrConnectWithoutFriendRequestsInput = {
  create: NotificationsCreateWithoutFriendRequestsInput;
  where: NotificationsWhereUniqueInput;
};

export type NotificationsCreateOrConnectWithoutProfileInput = {
  create: NotificationsCreateWithoutProfileInput;
  where: NotificationsWhereUniqueInput;
};

export type NotificationsCreateWithoutFriendRequestsInput = {
  id?: InputMaybe<Scalars['String']>;
  Profile: ProfileCreateNestedOneWithoutNotificationsInput;
};

export type NotificationsCreateWithoutProfileInput = {
  FriendRequests?: InputMaybe<FriendRequestCreateNestedManyWithoutNotificationsInput>;
  id?: InputMaybe<Scalars['String']>;
};

export type NotificationsListRelationFilter = {
  every?: InputMaybe<NotificationsWhereInput>;
  none?: InputMaybe<NotificationsWhereInput>;
  some?: InputMaybe<NotificationsWhereInput>;
};

export type NotificationsMaxOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
};

export type NotificationsMinOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
};

export type NotificationsOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type NotificationsOrderByWithAggregationInput = {
  _count?: InputMaybe<NotificationsCountOrderByAggregateInput>;
  _max?: InputMaybe<NotificationsMaxOrderByAggregateInput>;
  _min?: InputMaybe<NotificationsMinOrderByAggregateInput>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
};

export type NotificationsOrderByWithRelationInput = {
  FriendRequests?: InputMaybe<FriendRequestOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  Profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  profileId?: InputMaybe<SortOrder>;
};

export type NotificationsRelationFilter = {
  is?: InputMaybe<NotificationsWhereInput>;
  isNot?: InputMaybe<NotificationsWhereInput>;
};

export enum NotificationsScalarFieldEnum {
  Id = 'id',
  ProfileId = 'profileId'
}

export type NotificationsScalarWhereInput = {
  AND?: InputMaybe<Array<NotificationsScalarWhereInput>>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<NotificationsScalarWhereInput>>;
  OR?: InputMaybe<Array<NotificationsScalarWhereInput>>;
  profileId?: InputMaybe<StringFilter>;
};

export type NotificationsScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<NotificationsScalarWhereWithAggregatesInput>>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<NotificationsScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<NotificationsScalarWhereWithAggregatesInput>>;
  profileId?: InputMaybe<StringWithAggregatesFilter>;
};

export type NotificationStatus = {
  __typename?: 'NotificationStatus';
  createdAt: Scalars['DateTime'];
  FriendRequest?: Maybe<FriendRequest>;
  id: Scalars['ID'];
  isAccepted: Scalars['Boolean'];
  isAnswered: Scalars['Boolean'];
  isCanceled: Scalars['Boolean'];
  isChecked: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
};

export type NotificationStatusCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isAccepted?: InputMaybe<SortOrder>;
  isAnswered?: InputMaybe<SortOrder>;
  isCanceled?: InputMaybe<SortOrder>;
  isChecked?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type NotificationStatusCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  FriendRequest?: InputMaybe<FriendRequestCreateNestedOneWithoutNotificationStatusInput>;
  id?: InputMaybe<Scalars['String']>;
  isAccepted?: InputMaybe<Scalars['Boolean']>;
  isAnswered?: InputMaybe<Scalars['Boolean']>;
  isCanceled?: InputMaybe<Scalars['Boolean']>;
  isChecked?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type NotificationStatusCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  isAccepted?: InputMaybe<Scalars['Boolean']>;
  isAnswered?: InputMaybe<Scalars['Boolean']>;
  isCanceled?: InputMaybe<Scalars['Boolean']>;
  isChecked?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type NotificationStatusCreateNestedOneWithoutFriendRequestInput = {
  connect?: InputMaybe<NotificationStatusWhereUniqueInput>;
  connectOrCreate?: InputMaybe<NotificationStatusCreateOrConnectWithoutFriendRequestInput>;
  create?: InputMaybe<NotificationStatusCreateWithoutFriendRequestInput>;
};

export type NotificationStatusCreateOrConnectWithoutFriendRequestInput = {
  create: NotificationStatusCreateWithoutFriendRequestInput;
  where: NotificationStatusWhereUniqueInput;
};

export type NotificationStatusCreateWithoutFriendRequestInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  isAccepted?: InputMaybe<Scalars['Boolean']>;
  isAnswered?: InputMaybe<Scalars['Boolean']>;
  isCanceled?: InputMaybe<Scalars['Boolean']>;
  isChecked?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type NotificationStatusMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isAccepted?: InputMaybe<SortOrder>;
  isAnswered?: InputMaybe<SortOrder>;
  isCanceled?: InputMaybe<SortOrder>;
  isChecked?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type NotificationStatusMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isAccepted?: InputMaybe<SortOrder>;
  isAnswered?: InputMaybe<SortOrder>;
  isCanceled?: InputMaybe<SortOrder>;
  isChecked?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type NotificationStatusOrderByWithAggregationInput = {
  _count?: InputMaybe<NotificationStatusCountOrderByAggregateInput>;
  _max?: InputMaybe<NotificationStatusMaxOrderByAggregateInput>;
  _min?: InputMaybe<NotificationStatusMinOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isAccepted?: InputMaybe<SortOrder>;
  isAnswered?: InputMaybe<SortOrder>;
  isCanceled?: InputMaybe<SortOrder>;
  isChecked?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type NotificationStatusOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  FriendRequest?: InputMaybe<FriendRequestOrderByWithRelationInput>;
  id?: InputMaybe<SortOrder>;
  isAccepted?: InputMaybe<SortOrder>;
  isAnswered?: InputMaybe<SortOrder>;
  isCanceled?: InputMaybe<SortOrder>;
  isChecked?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type NotificationStatusRelationFilter = {
  is?: InputMaybe<NotificationStatusWhereInput>;
  isNot?: InputMaybe<NotificationStatusWhereInput>;
};

export enum NotificationStatusScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  IsAccepted = 'isAccepted',
  IsAnswered = 'isAnswered',
  IsCanceled = 'isCanceled',
  IsChecked = 'isChecked',
  UpdatedAt = 'updatedAt'
}

export type NotificationStatusScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<NotificationStatusScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  isAccepted?: InputMaybe<BoolWithAggregatesFilter>;
  isAnswered?: InputMaybe<BoolWithAggregatesFilter>;
  isCanceled?: InputMaybe<BoolWithAggregatesFilter>;
  isChecked?: InputMaybe<BoolWithAggregatesFilter>;
  NOT?: InputMaybe<Array<NotificationStatusScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<NotificationStatusScalarWhereWithAggregatesInput>>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type NotificationStatusUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  FriendRequest?: InputMaybe<FriendRequestUpdateOneWithoutNotificationStatusNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isAccepted?: InputMaybe<BoolFieldUpdateOperationsInput>;
  isAnswered?: InputMaybe<BoolFieldUpdateOperationsInput>;
  isCanceled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  isChecked?: InputMaybe<BoolFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type NotificationStatusUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isAccepted?: InputMaybe<BoolFieldUpdateOperationsInput>;
  isAnswered?: InputMaybe<BoolFieldUpdateOperationsInput>;
  isCanceled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  isChecked?: InputMaybe<BoolFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type NotificationStatusUpdateOneRequiredWithoutFriendRequestNestedInput = {
  connect?: InputMaybe<NotificationStatusWhereUniqueInput>;
  connectOrCreate?: InputMaybe<NotificationStatusCreateOrConnectWithoutFriendRequestInput>;
  create?: InputMaybe<NotificationStatusCreateWithoutFriendRequestInput>;
  update?: InputMaybe<NotificationStatusUpdateWithoutFriendRequestInput>;
  upsert?: InputMaybe<NotificationStatusUpsertWithoutFriendRequestInput>;
};

export type NotificationStatusUpdateWithoutFriendRequestInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isAccepted?: InputMaybe<BoolFieldUpdateOperationsInput>;
  isAnswered?: InputMaybe<BoolFieldUpdateOperationsInput>;
  isCanceled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  isChecked?: InputMaybe<BoolFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type NotificationStatusUpsertWithoutFriendRequestInput = {
  create: NotificationStatusCreateWithoutFriendRequestInput;
  update: NotificationStatusUpdateWithoutFriendRequestInput;
};

export type NotificationStatusWhereInput = {
  AND?: InputMaybe<Array<NotificationStatusWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  FriendRequest?: InputMaybe<FriendRequestWhereInput>;
  id?: InputMaybe<StringFilter>;
  isAccepted?: InputMaybe<BoolFilter>;
  isAnswered?: InputMaybe<BoolFilter>;
  isCanceled?: InputMaybe<BoolFilter>;
  isChecked?: InputMaybe<BoolFilter>;
  NOT?: InputMaybe<Array<NotificationStatusWhereInput>>;
  OR?: InputMaybe<Array<NotificationStatusWhereInput>>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type NotificationStatusWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type NotificationsUpdateInput = {
  FriendRequests?: InputMaybe<FriendRequestUpdateManyWithoutNotificationsNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutNotificationsNestedInput>;
};

export type NotificationsUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type NotificationsUpdateManyWithoutFriendRequestsNestedInput = {
  connect?: InputMaybe<Array<NotificationsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<NotificationsCreateOrConnectWithoutFriendRequestsInput>>;
  create?: InputMaybe<Array<NotificationsCreateWithoutFriendRequestsInput>>;
  delete?: InputMaybe<Array<NotificationsWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<NotificationsScalarWhereInput>>;
  disconnect?: InputMaybe<Array<NotificationsWhereUniqueInput>>;
  set?: InputMaybe<Array<NotificationsWhereUniqueInput>>;
  update?: InputMaybe<Array<NotificationsUpdateWithWhereUniqueWithoutFriendRequestsInput>>;
  updateMany?: InputMaybe<Array<NotificationsUpdateManyWithWhereWithoutFriendRequestsInput>>;
  upsert?: InputMaybe<Array<NotificationsUpsertWithWhereUniqueWithoutFriendRequestsInput>>;
};

export type NotificationsUpdateManyWithWhereWithoutFriendRequestsInput = {
  data: NotificationsUpdateManyMutationInput;
  where: NotificationsScalarWhereInput;
};

export type NotificationsUpdateOneWithoutProfileNestedInput = {
  connect?: InputMaybe<NotificationsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<NotificationsCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<NotificationsCreateWithoutProfileInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<NotificationsUpdateWithoutProfileInput>;
  upsert?: InputMaybe<NotificationsUpsertWithoutProfileInput>;
};

export type NotificationsUpdateWithoutFriendRequestsInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutNotificationsNestedInput>;
};

export type NotificationsUpdateWithoutProfileInput = {
  FriendRequests?: InputMaybe<FriendRequestUpdateManyWithoutNotificationsNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type NotificationsUpdateWithWhereUniqueWithoutFriendRequestsInput = {
  data: NotificationsUpdateWithoutFriendRequestsInput;
  where: NotificationsWhereUniqueInput;
};

export type NotificationsUpsertWithoutProfileInput = {
  create: NotificationsCreateWithoutProfileInput;
  update: NotificationsUpdateWithoutProfileInput;
};

export type NotificationsUpsertWithWhereUniqueWithoutFriendRequestsInput = {
  create: NotificationsCreateWithoutFriendRequestsInput;
  update: NotificationsUpdateWithoutFriendRequestsInput;
  where: NotificationsWhereUniqueInput;
};

export type NotificationsWhereInput = {
  AND?: InputMaybe<Array<NotificationsWhereInput>>;
  FriendRequests?: InputMaybe<FriendRequestListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<NotificationsWhereInput>>;
  OR?: InputMaybe<Array<NotificationsWhereInput>>;
  Profile?: InputMaybe<ProfileWhereInput>;
  profileId?: InputMaybe<StringFilter>;
};

export type NotificationsWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  profileId?: InputMaybe<Scalars['String']>;
};

export type NullableBoolFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Boolean']>;
};

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']>;
};

export type NullableEnumPhotoTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<PhotoType>;
};

export type NullableIntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']>;
  divide?: InputMaybe<Scalars['Int']>;
  increment?: InputMaybe<Scalars['Int']>;
  multiply?: InputMaybe<Scalars['Int']>;
  set?: InputMaybe<Scalars['Int']>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type OrganizedCityResponseObject = {
  __typename?: 'OrganizedCityResponseObject';
  allCities?: Maybe<Array<CityResponseObject>>;
  popularCities?: Maybe<Array<CityResponseObject>>;
};

export type Out = {
  __typename?: 'Out';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  leftAt?: Maybe<Scalars['DateTime']>;
  LiveOutPersonal?: Maybe<LiveOutPersonal>;
  liveOutPersonalId?: Maybe<Scalars['String']>;
  LiveOutVenue?: Maybe<LiveOutVenue>;
  liveOutVenueId?: Maybe<Scalars['String']>;
  personalProfileId: Scalars['String'];
  PersonalStats?: Maybe<PersonalStats>;
  personalStatsId?: Maybe<Scalars['String']>;
  type: OutType;
  updatedAt: Scalars['DateTime'];
  venueProfileId: Scalars['String'];
  VenueStats?: Maybe<VenueStats>;
  venueStatsId?: Maybe<Scalars['String']>;
};

export type OutCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  leftAt?: InputMaybe<SortOrder>;
  liveOutPersonalId?: InputMaybe<SortOrder>;
  liveOutVenueId?: InputMaybe<SortOrder>;
  personalProfileId?: InputMaybe<SortOrder>;
  personalStatsId?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  venueProfileId?: InputMaybe<SortOrder>;
  venueStatsId?: InputMaybe<SortOrder>;
};

export type OutCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  leftAt?: InputMaybe<Scalars['DateTime']>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalCreateNestedOneWithoutOutInput>;
  LiveOutVenue?: InputMaybe<LiveOutVenueCreateNestedOneWithoutOutInput>;
  personalProfileId: Scalars['String'];
  PersonalStats?: InputMaybe<PersonalStatsCreateNestedOneWithoutOutInput>;
  type: OutType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueProfileId: Scalars['String'];
  VenueStats?: InputMaybe<VenueStatsCreateNestedOneWithoutOutInput>;
};

export type OutCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  leftAt?: InputMaybe<Scalars['DateTime']>;
  liveOutPersonalId?: InputMaybe<Scalars['String']>;
  liveOutVenueId?: InputMaybe<Scalars['String']>;
  personalProfileId: Scalars['String'];
  personalStatsId?: InputMaybe<Scalars['String']>;
  type: OutType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueProfileId: Scalars['String'];
  venueStatsId?: InputMaybe<Scalars['String']>;
};

export type OutCreateManyLiveOutPersonalInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  leftAt?: InputMaybe<Scalars['DateTime']>;
  liveOutVenueId?: InputMaybe<Scalars['String']>;
  personalProfileId: Scalars['String'];
  personalStatsId?: InputMaybe<Scalars['String']>;
  type: OutType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueProfileId: Scalars['String'];
  venueStatsId?: InputMaybe<Scalars['String']>;
};

export type OutCreateManyLiveOutPersonalInputEnvelope = {
  data: Array<OutCreateManyLiveOutPersonalInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type OutCreateManyLiveOutVenueInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  leftAt?: InputMaybe<Scalars['DateTime']>;
  liveOutPersonalId?: InputMaybe<Scalars['String']>;
  personalProfileId: Scalars['String'];
  personalStatsId?: InputMaybe<Scalars['String']>;
  type: OutType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueProfileId: Scalars['String'];
  venueStatsId?: InputMaybe<Scalars['String']>;
};

export type OutCreateManyLiveOutVenueInputEnvelope = {
  data: Array<OutCreateManyLiveOutVenueInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type OutCreateManyPersonalStatsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  leftAt?: InputMaybe<Scalars['DateTime']>;
  liveOutPersonalId?: InputMaybe<Scalars['String']>;
  liveOutVenueId?: InputMaybe<Scalars['String']>;
  personalProfileId: Scalars['String'];
  type: OutType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueProfileId: Scalars['String'];
  venueStatsId?: InputMaybe<Scalars['String']>;
};

export type OutCreateManyPersonalStatsInputEnvelope = {
  data: Array<OutCreateManyPersonalStatsInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type OutCreateManyVenueStatsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  leftAt?: InputMaybe<Scalars['DateTime']>;
  liveOutPersonalId?: InputMaybe<Scalars['String']>;
  liveOutVenueId?: InputMaybe<Scalars['String']>;
  personalProfileId: Scalars['String'];
  personalStatsId?: InputMaybe<Scalars['String']>;
  type: OutType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueProfileId: Scalars['String'];
};

export type OutCreateManyVenueStatsInputEnvelope = {
  data: Array<OutCreateManyVenueStatsInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type OutCreateNestedManyWithoutLiveOutPersonalInput = {
  connect?: InputMaybe<Array<OutWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OutCreateOrConnectWithoutLiveOutPersonalInput>>;
  create?: InputMaybe<Array<OutCreateWithoutLiveOutPersonalInput>>;
  createMany?: InputMaybe<OutCreateManyLiveOutPersonalInputEnvelope>;
};

export type OutCreateNestedManyWithoutLiveOutVenueInput = {
  connect?: InputMaybe<Array<OutWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OutCreateOrConnectWithoutLiveOutVenueInput>>;
  create?: InputMaybe<Array<OutCreateWithoutLiveOutVenueInput>>;
  createMany?: InputMaybe<OutCreateManyLiveOutVenueInputEnvelope>;
};

export type OutCreateNestedManyWithoutPersonalStatsInput = {
  connect?: InputMaybe<Array<OutWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OutCreateOrConnectWithoutPersonalStatsInput>>;
  create?: InputMaybe<Array<OutCreateWithoutPersonalStatsInput>>;
  createMany?: InputMaybe<OutCreateManyPersonalStatsInputEnvelope>;
};

export type OutCreateNestedManyWithoutVenueStatsInput = {
  connect?: InputMaybe<Array<OutWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OutCreateOrConnectWithoutVenueStatsInput>>;
  create?: InputMaybe<Array<OutCreateWithoutVenueStatsInput>>;
  createMany?: InputMaybe<OutCreateManyVenueStatsInputEnvelope>;
};

export type OutCreateOrConnectWithoutLiveOutPersonalInput = {
  create: OutCreateWithoutLiveOutPersonalInput;
  where: OutWhereUniqueInput;
};

export type OutCreateOrConnectWithoutLiveOutVenueInput = {
  create: OutCreateWithoutLiveOutVenueInput;
  where: OutWhereUniqueInput;
};

export type OutCreateOrConnectWithoutPersonalStatsInput = {
  create: OutCreateWithoutPersonalStatsInput;
  where: OutWhereUniqueInput;
};

export type OutCreateOrConnectWithoutVenueStatsInput = {
  create: OutCreateWithoutVenueStatsInput;
  where: OutWhereUniqueInput;
};

export type OutCreateWithoutLiveOutPersonalInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  leftAt?: InputMaybe<Scalars['DateTime']>;
  LiveOutVenue?: InputMaybe<LiveOutVenueCreateNestedOneWithoutOutInput>;
  personalProfileId: Scalars['String'];
  PersonalStats?: InputMaybe<PersonalStatsCreateNestedOneWithoutOutInput>;
  type: OutType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueProfileId: Scalars['String'];
  VenueStats?: InputMaybe<VenueStatsCreateNestedOneWithoutOutInput>;
};

export type OutCreateWithoutLiveOutVenueInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  leftAt?: InputMaybe<Scalars['DateTime']>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalCreateNestedOneWithoutOutInput>;
  personalProfileId: Scalars['String'];
  PersonalStats?: InputMaybe<PersonalStatsCreateNestedOneWithoutOutInput>;
  type: OutType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueProfileId: Scalars['String'];
  VenueStats?: InputMaybe<VenueStatsCreateNestedOneWithoutOutInput>;
};

export type OutCreateWithoutPersonalStatsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  leftAt?: InputMaybe<Scalars['DateTime']>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalCreateNestedOneWithoutOutInput>;
  LiveOutVenue?: InputMaybe<LiveOutVenueCreateNestedOneWithoutOutInput>;
  personalProfileId: Scalars['String'];
  type: OutType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueProfileId: Scalars['String'];
  VenueStats?: InputMaybe<VenueStatsCreateNestedOneWithoutOutInput>;
};

export type OutCreateWithoutVenueStatsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  leftAt?: InputMaybe<Scalars['DateTime']>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalCreateNestedOneWithoutOutInput>;
  LiveOutVenue?: InputMaybe<LiveOutVenueCreateNestedOneWithoutOutInput>;
  personalProfileId: Scalars['String'];
  PersonalStats?: InputMaybe<PersonalStatsCreateNestedOneWithoutOutInput>;
  type: OutType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueProfileId: Scalars['String'];
};

export type OutListRelationFilter = {
  every?: InputMaybe<OutWhereInput>;
  none?: InputMaybe<OutWhereInput>;
  some?: InputMaybe<OutWhereInput>;
};

export type OutMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  leftAt?: InputMaybe<SortOrder>;
  liveOutPersonalId?: InputMaybe<SortOrder>;
  liveOutVenueId?: InputMaybe<SortOrder>;
  personalProfileId?: InputMaybe<SortOrder>;
  personalStatsId?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  venueProfileId?: InputMaybe<SortOrder>;
  venueStatsId?: InputMaybe<SortOrder>;
};

export type OutMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  leftAt?: InputMaybe<SortOrder>;
  liveOutPersonalId?: InputMaybe<SortOrder>;
  liveOutVenueId?: InputMaybe<SortOrder>;
  personalProfileId?: InputMaybe<SortOrder>;
  personalStatsId?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  venueProfileId?: InputMaybe<SortOrder>;
  venueStatsId?: InputMaybe<SortOrder>;
};

export type OutOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type OutOrderByWithAggregationInput = {
  _count?: InputMaybe<OutCountOrderByAggregateInput>;
  _max?: InputMaybe<OutMaxOrderByAggregateInput>;
  _min?: InputMaybe<OutMinOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  leftAt?: InputMaybe<SortOrder>;
  liveOutPersonalId?: InputMaybe<SortOrder>;
  liveOutVenueId?: InputMaybe<SortOrder>;
  personalProfileId?: InputMaybe<SortOrder>;
  personalStatsId?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  venueProfileId?: InputMaybe<SortOrder>;
  venueStatsId?: InputMaybe<SortOrder>;
};

export type OutOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  leftAt?: InputMaybe<SortOrder>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalOrderByWithRelationInput>;
  liveOutPersonalId?: InputMaybe<SortOrder>;
  LiveOutVenue?: InputMaybe<LiveOutVenueOrderByWithRelationInput>;
  liveOutVenueId?: InputMaybe<SortOrder>;
  personalProfileId?: InputMaybe<SortOrder>;
  PersonalStats?: InputMaybe<PersonalStatsOrderByWithRelationInput>;
  personalStatsId?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  venueProfileId?: InputMaybe<SortOrder>;
  VenueStats?: InputMaybe<VenueStatsOrderByWithRelationInput>;
  venueStatsId?: InputMaybe<SortOrder>;
};

export enum OutScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  LeftAt = 'leftAt',
  LiveOutPersonalId = 'liveOutPersonalId',
  LiveOutVenueId = 'liveOutVenueId',
  PersonalProfileId = 'personalProfileId',
  PersonalStatsId = 'personalStatsId',
  Type = 'type',
  UpdatedAt = 'updatedAt',
  VenueProfileId = 'venueProfileId',
  VenueStatsId = 'venueStatsId'
}

export type OutScalarWhereInput = {
  AND?: InputMaybe<Array<OutScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  leftAt?: InputMaybe<DateTimeNullableFilter>;
  liveOutPersonalId?: InputMaybe<StringNullableFilter>;
  liveOutVenueId?: InputMaybe<StringNullableFilter>;
  NOT?: InputMaybe<Array<OutScalarWhereInput>>;
  OR?: InputMaybe<Array<OutScalarWhereInput>>;
  personalProfileId?: InputMaybe<StringFilter>;
  personalStatsId?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumOutTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  venueProfileId?: InputMaybe<StringFilter>;
  venueStatsId?: InputMaybe<StringNullableFilter>;
};

export type OutScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<OutScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  leftAt?: InputMaybe<DateTimeNullableWithAggregatesFilter>;
  liveOutPersonalId?: InputMaybe<StringNullableWithAggregatesFilter>;
  liveOutVenueId?: InputMaybe<StringNullableWithAggregatesFilter>;
  NOT?: InputMaybe<Array<OutScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<OutScalarWhereWithAggregatesInput>>;
  personalProfileId?: InputMaybe<StringWithAggregatesFilter>;
  personalStatsId?: InputMaybe<StringNullableWithAggregatesFilter>;
  type?: InputMaybe<EnumOutTypeWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  venueProfileId?: InputMaybe<StringWithAggregatesFilter>;
  venueStatsId?: InputMaybe<StringNullableWithAggregatesFilter>;
};

export enum OutType {
  Join = 'JOIN',
  Total = 'TOTAL'
}

export type OutUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  leftAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalUpdateOneWithoutOutNestedInput>;
  LiveOutVenue?: InputMaybe<LiveOutVenueUpdateOneWithoutOutNestedInput>;
  personalProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  PersonalStats?: InputMaybe<PersonalStatsUpdateOneWithoutOutNestedInput>;
  type?: InputMaybe<EnumOutTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venueProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  VenueStats?: InputMaybe<VenueStatsUpdateOneWithoutOutNestedInput>;
};

export type OutUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  leftAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  personalProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumOutTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venueProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type OutUpdateManyWithoutLiveOutPersonalNestedInput = {
  connect?: InputMaybe<Array<OutWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OutCreateOrConnectWithoutLiveOutPersonalInput>>;
  create?: InputMaybe<Array<OutCreateWithoutLiveOutPersonalInput>>;
  createMany?: InputMaybe<OutCreateManyLiveOutPersonalInputEnvelope>;
  delete?: InputMaybe<Array<OutWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<OutScalarWhereInput>>;
  disconnect?: InputMaybe<Array<OutWhereUniqueInput>>;
  set?: InputMaybe<Array<OutWhereUniqueInput>>;
  update?: InputMaybe<Array<OutUpdateWithWhereUniqueWithoutLiveOutPersonalInput>>;
  updateMany?: InputMaybe<Array<OutUpdateManyWithWhereWithoutLiveOutPersonalInput>>;
  upsert?: InputMaybe<Array<OutUpsertWithWhereUniqueWithoutLiveOutPersonalInput>>;
};

export type OutUpdateManyWithoutLiveOutVenueNestedInput = {
  connect?: InputMaybe<Array<OutWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OutCreateOrConnectWithoutLiveOutVenueInput>>;
  create?: InputMaybe<Array<OutCreateWithoutLiveOutVenueInput>>;
  createMany?: InputMaybe<OutCreateManyLiveOutVenueInputEnvelope>;
  delete?: InputMaybe<Array<OutWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<OutScalarWhereInput>>;
  disconnect?: InputMaybe<Array<OutWhereUniqueInput>>;
  set?: InputMaybe<Array<OutWhereUniqueInput>>;
  update?: InputMaybe<Array<OutUpdateWithWhereUniqueWithoutLiveOutVenueInput>>;
  updateMany?: InputMaybe<Array<OutUpdateManyWithWhereWithoutLiveOutVenueInput>>;
  upsert?: InputMaybe<Array<OutUpsertWithWhereUniqueWithoutLiveOutVenueInput>>;
};

export type OutUpdateManyWithoutPersonalStatsNestedInput = {
  connect?: InputMaybe<Array<OutWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OutCreateOrConnectWithoutPersonalStatsInput>>;
  create?: InputMaybe<Array<OutCreateWithoutPersonalStatsInput>>;
  createMany?: InputMaybe<OutCreateManyPersonalStatsInputEnvelope>;
  delete?: InputMaybe<Array<OutWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<OutScalarWhereInput>>;
  disconnect?: InputMaybe<Array<OutWhereUniqueInput>>;
  set?: InputMaybe<Array<OutWhereUniqueInput>>;
  update?: InputMaybe<Array<OutUpdateWithWhereUniqueWithoutPersonalStatsInput>>;
  updateMany?: InputMaybe<Array<OutUpdateManyWithWhereWithoutPersonalStatsInput>>;
  upsert?: InputMaybe<Array<OutUpsertWithWhereUniqueWithoutPersonalStatsInput>>;
};

export type OutUpdateManyWithoutVenueStatsNestedInput = {
  connect?: InputMaybe<Array<OutWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OutCreateOrConnectWithoutVenueStatsInput>>;
  create?: InputMaybe<Array<OutCreateWithoutVenueStatsInput>>;
  createMany?: InputMaybe<OutCreateManyVenueStatsInputEnvelope>;
  delete?: InputMaybe<Array<OutWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<OutScalarWhereInput>>;
  disconnect?: InputMaybe<Array<OutWhereUniqueInput>>;
  set?: InputMaybe<Array<OutWhereUniqueInput>>;
  update?: InputMaybe<Array<OutUpdateWithWhereUniqueWithoutVenueStatsInput>>;
  updateMany?: InputMaybe<Array<OutUpdateManyWithWhereWithoutVenueStatsInput>>;
  upsert?: InputMaybe<Array<OutUpsertWithWhereUniqueWithoutVenueStatsInput>>;
};

export type OutUpdateManyWithWhereWithoutLiveOutPersonalInput = {
  data: OutUpdateManyMutationInput;
  where: OutScalarWhereInput;
};

export type OutUpdateManyWithWhereWithoutLiveOutVenueInput = {
  data: OutUpdateManyMutationInput;
  where: OutScalarWhereInput;
};

export type OutUpdateManyWithWhereWithoutPersonalStatsInput = {
  data: OutUpdateManyMutationInput;
  where: OutScalarWhereInput;
};

export type OutUpdateManyWithWhereWithoutVenueStatsInput = {
  data: OutUpdateManyMutationInput;
  where: OutScalarWhereInput;
};

export type OutUpdateWithoutLiveOutPersonalInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  leftAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  LiveOutVenue?: InputMaybe<LiveOutVenueUpdateOneWithoutOutNestedInput>;
  personalProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  PersonalStats?: InputMaybe<PersonalStatsUpdateOneWithoutOutNestedInput>;
  type?: InputMaybe<EnumOutTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venueProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  VenueStats?: InputMaybe<VenueStatsUpdateOneWithoutOutNestedInput>;
};

export type OutUpdateWithoutLiveOutVenueInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  leftAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalUpdateOneWithoutOutNestedInput>;
  personalProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  PersonalStats?: InputMaybe<PersonalStatsUpdateOneWithoutOutNestedInput>;
  type?: InputMaybe<EnumOutTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venueProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  VenueStats?: InputMaybe<VenueStatsUpdateOneWithoutOutNestedInput>;
};

export type OutUpdateWithoutPersonalStatsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  leftAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalUpdateOneWithoutOutNestedInput>;
  LiveOutVenue?: InputMaybe<LiveOutVenueUpdateOneWithoutOutNestedInput>;
  personalProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumOutTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venueProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  VenueStats?: InputMaybe<VenueStatsUpdateOneWithoutOutNestedInput>;
};

export type OutUpdateWithoutVenueStatsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  leftAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalUpdateOneWithoutOutNestedInput>;
  LiveOutVenue?: InputMaybe<LiveOutVenueUpdateOneWithoutOutNestedInput>;
  personalProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  PersonalStats?: InputMaybe<PersonalStatsUpdateOneWithoutOutNestedInput>;
  type?: InputMaybe<EnumOutTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venueProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type OutUpdateWithWhereUniqueWithoutLiveOutPersonalInput = {
  data: OutUpdateWithoutLiveOutPersonalInput;
  where: OutWhereUniqueInput;
};

export type OutUpdateWithWhereUniqueWithoutLiveOutVenueInput = {
  data: OutUpdateWithoutLiveOutVenueInput;
  where: OutWhereUniqueInput;
};

export type OutUpdateWithWhereUniqueWithoutPersonalStatsInput = {
  data: OutUpdateWithoutPersonalStatsInput;
  where: OutWhereUniqueInput;
};

export type OutUpdateWithWhereUniqueWithoutVenueStatsInput = {
  data: OutUpdateWithoutVenueStatsInput;
  where: OutWhereUniqueInput;
};

export type OutUpsertWithWhereUniqueWithoutLiveOutPersonalInput = {
  create: OutCreateWithoutLiveOutPersonalInput;
  update: OutUpdateWithoutLiveOutPersonalInput;
  where: OutWhereUniqueInput;
};

export type OutUpsertWithWhereUniqueWithoutLiveOutVenueInput = {
  create: OutCreateWithoutLiveOutVenueInput;
  update: OutUpdateWithoutLiveOutVenueInput;
  where: OutWhereUniqueInput;
};

export type OutUpsertWithWhereUniqueWithoutPersonalStatsInput = {
  create: OutCreateWithoutPersonalStatsInput;
  update: OutUpdateWithoutPersonalStatsInput;
  where: OutWhereUniqueInput;
};

export type OutUpsertWithWhereUniqueWithoutVenueStatsInput = {
  create: OutCreateWithoutVenueStatsInput;
  update: OutUpdateWithoutVenueStatsInput;
  where: OutWhereUniqueInput;
};

export type OutWhereInput = {
  AND?: InputMaybe<Array<OutWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  leftAt?: InputMaybe<DateTimeNullableFilter>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalWhereInput>;
  liveOutPersonalId?: InputMaybe<StringNullableFilter>;
  LiveOutVenue?: InputMaybe<LiveOutVenueWhereInput>;
  liveOutVenueId?: InputMaybe<StringNullableFilter>;
  NOT?: InputMaybe<Array<OutWhereInput>>;
  OR?: InputMaybe<Array<OutWhereInput>>;
  personalProfileId?: InputMaybe<StringFilter>;
  PersonalStats?: InputMaybe<PersonalStatsWhereInput>;
  personalStatsId?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumOutTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  venueProfileId?: InputMaybe<StringFilter>;
  VenueStats?: InputMaybe<VenueStatsWhereInput>;
  venueStatsId?: InputMaybe<StringNullableFilter>;
};

export type OutWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Password = {
  __typename?: 'Password';
  authenitcationProviderId: Scalars['String'];
  AuthenticationProvider: AuthenticationProvider;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  password: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type PasswordCountOrderByAggregateInput = {
  authenitcationProviderId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PasswordCreateInput = {
  AuthenticationProvider: AuthenticationProviderCreateNestedOneWithoutPasswordInput;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PasswordCreateManyInput = {
  authenitcationProviderId: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PasswordCreateNestedOneWithoutAuthenticationProviderInput = {
  connect?: InputMaybe<PasswordWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PasswordCreateOrConnectWithoutAuthenticationProviderInput>;
  create?: InputMaybe<PasswordCreateWithoutAuthenticationProviderInput>;
};

export type PasswordCreateOrConnectWithoutAuthenticationProviderInput = {
  create: PasswordCreateWithoutAuthenticationProviderInput;
  where: PasswordWhereUniqueInput;
};

export type PasswordCreateWithoutAuthenticationProviderInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PasswordMaxOrderByAggregateInput = {
  authenitcationProviderId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PasswordMinOrderByAggregateInput = {
  authenitcationProviderId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PasswordOrderByWithAggregationInput = {
  _count?: InputMaybe<PasswordCountOrderByAggregateInput>;
  _max?: InputMaybe<PasswordMaxOrderByAggregateInput>;
  _min?: InputMaybe<PasswordMinOrderByAggregateInput>;
  authenitcationProviderId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PasswordOrderByWithRelationInput = {
  authenitcationProviderId?: InputMaybe<SortOrder>;
  AuthenticationProvider?: InputMaybe<AuthenticationProviderOrderByWithRelationInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PasswordRelationFilter = {
  is?: InputMaybe<PasswordWhereInput>;
  isNot?: InputMaybe<PasswordWhereInput>;
};

export enum PasswordScalarFieldEnum {
  AuthenitcationProviderId = 'authenitcationProviderId',
  CreatedAt = 'createdAt',
  Id = 'id',
  Password = 'password',
  UpdatedAt = 'updatedAt'
}

export type PasswordScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<PasswordScalarWhereWithAggregatesInput>>;
  authenitcationProviderId?: InputMaybe<StringWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<PasswordScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<PasswordScalarWhereWithAggregatesInput>>;
  password?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type PasswordUpdateInput = {
  AuthenticationProvider?: InputMaybe<AuthenticationProviderUpdateOneRequiredWithoutPasswordNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PasswordUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PasswordUpdateOneWithoutAuthenticationProviderNestedInput = {
  connect?: InputMaybe<PasswordWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PasswordCreateOrConnectWithoutAuthenticationProviderInput>;
  create?: InputMaybe<PasswordCreateWithoutAuthenticationProviderInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<PasswordUpdateWithoutAuthenticationProviderInput>;
  upsert?: InputMaybe<PasswordUpsertWithoutAuthenticationProviderInput>;
};

export type PasswordUpdateWithoutAuthenticationProviderInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PasswordUpsertWithoutAuthenticationProviderInput = {
  create: PasswordCreateWithoutAuthenticationProviderInput;
  update: PasswordUpdateWithoutAuthenticationProviderInput;
};

export type PasswordWhereInput = {
  AND?: InputMaybe<Array<PasswordWhereInput>>;
  authenitcationProviderId?: InputMaybe<StringFilter>;
  AuthenticationProvider?: InputMaybe<AuthenticationProviderWhereInput>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<PasswordWhereInput>>;
  OR?: InputMaybe<Array<PasswordWhereInput>>;
  password?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type PasswordWhereUniqueInput = {
  authenitcationProviderId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type PathAvgOrderByAggregateInput = {
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
};

export type PathCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
  TonightPathId?: InputMaybe<SortOrder>;
};

export type PathCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  TonightPath?: InputMaybe<TonightPathCreateNestedOneWithoutPathInput>;
};

export type PathCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  TonightPathId?: InputMaybe<Scalars['String']>;
};

export type PathCreateManyTonightPathInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type PathCreateManyTonightPathInputEnvelope = {
  data: Array<PathCreateManyTonightPathInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PathCreateNestedManyWithoutTonightPathInput = {
  connect?: InputMaybe<Array<PathWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PathCreateOrConnectWithoutTonightPathInput>>;
  create?: InputMaybe<Array<PathCreateWithoutTonightPathInput>>;
  createMany?: InputMaybe<PathCreateManyTonightPathInputEnvelope>;
};

export type PathCreateOrConnectWithoutTonightPathInput = {
  create: PathCreateWithoutTonightPathInput;
  where: PathWhereUniqueInput;
};

export type PathCreateWithoutTonightPathInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type PathListRelationFilter = {
  every?: InputMaybe<PathWhereInput>;
  none?: InputMaybe<PathWhereInput>;
  some?: InputMaybe<PathWhereInput>;
};

export type PathMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
  TonightPathId?: InputMaybe<SortOrder>;
};

export type PathMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
  TonightPathId?: InputMaybe<SortOrder>;
};

export type PathOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type PathOrderByWithAggregationInput = {
  _avg?: InputMaybe<PathAvgOrderByAggregateInput>;
  _count?: InputMaybe<PathCountOrderByAggregateInput>;
  _max?: InputMaybe<PathMaxOrderByAggregateInput>;
  _min?: InputMaybe<PathMinOrderByAggregateInput>;
  _sum?: InputMaybe<PathSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
  TonightPathId?: InputMaybe<SortOrder>;
};

export type PathOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
  TonightPath?: InputMaybe<TonightPathOrderByWithRelationInput>;
  TonightPathId?: InputMaybe<SortOrder>;
};

export enum PathScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  Latitude = 'latitude',
  Longitude = 'longitude',
  TonightPathId = 'TonightPathId'
}

export type PathScalarWhereInput = {
  AND?: InputMaybe<Array<PathScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  latitude?: InputMaybe<FloatFilter>;
  longitude?: InputMaybe<FloatFilter>;
  NOT?: InputMaybe<Array<PathScalarWhereInput>>;
  OR?: InputMaybe<Array<PathScalarWhereInput>>;
  TonightPathId?: InputMaybe<StringNullableFilter>;
};

export type PathScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<PathScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  latitude?: InputMaybe<FloatWithAggregatesFilter>;
  longitude?: InputMaybe<FloatWithAggregatesFilter>;
  NOT?: InputMaybe<Array<PathScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<PathScalarWhereWithAggregatesInput>>;
  TonightPathId?: InputMaybe<StringNullableWithAggregatesFilter>;
};

export type PathSumOrderByAggregateInput = {
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
};

export type PathUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  latitude?: InputMaybe<FloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<FloatFieldUpdateOperationsInput>;
  TonightPath?: InputMaybe<TonightPathUpdateOneWithoutPathNestedInput>;
};

export type PathUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  latitude?: InputMaybe<FloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<FloatFieldUpdateOperationsInput>;
};

export type PathUpdateManyWithoutTonightPathNestedInput = {
  connect?: InputMaybe<Array<PathWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PathCreateOrConnectWithoutTonightPathInput>>;
  create?: InputMaybe<Array<PathCreateWithoutTonightPathInput>>;
  createMany?: InputMaybe<PathCreateManyTonightPathInputEnvelope>;
  delete?: InputMaybe<Array<PathWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PathScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PathWhereUniqueInput>>;
  set?: InputMaybe<Array<PathWhereUniqueInput>>;
  update?: InputMaybe<Array<PathUpdateWithWhereUniqueWithoutTonightPathInput>>;
  updateMany?: InputMaybe<Array<PathUpdateManyWithWhereWithoutTonightPathInput>>;
  upsert?: InputMaybe<Array<PathUpsertWithWhereUniqueWithoutTonightPathInput>>;
};

export type PathUpdateManyWithWhereWithoutTonightPathInput = {
  data: PathUpdateManyMutationInput;
  where: PathScalarWhereInput;
};

export type PathUpdateWithoutTonightPathInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  latitude?: InputMaybe<FloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<FloatFieldUpdateOperationsInput>;
};

export type PathUpdateWithWhereUniqueWithoutTonightPathInput = {
  data: PathUpdateWithoutTonightPathInput;
  where: PathWhereUniqueInput;
};

export type PathUpsertWithWhereUniqueWithoutTonightPathInput = {
  create: PathCreateWithoutTonightPathInput;
  update: PathUpdateWithoutTonightPathInput;
  where: PathWhereUniqueInput;
};

export type PathWhereInput = {
  AND?: InputMaybe<Array<PathWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  latitude?: InputMaybe<FloatFilter>;
  longitude?: InputMaybe<FloatFilter>;
  NOT?: InputMaybe<Array<PathWhereInput>>;
  OR?: InputMaybe<Array<PathWhereInput>>;
  TonightPath?: InputMaybe<TonightPathWhereInput>;
  TonightPathId?: InputMaybe<StringNullableFilter>;
};

export type PathWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export enum Permission {
  Administator = 'ADMINISTATOR',
  General = 'GENERAL',
  Owner = 'OWNER'
}

export type Personal = {
  __typename?: 'Personal';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  LiveOutPersonal?: Maybe<LiveOutPersonal>;
  PersonalStats?: Maybe<PersonalStats>;
  personalStatsId?: Maybe<Scalars['String']>;
  Profile: Profile;
  profileId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type PersonalCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  personalStatsId?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PersonalCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalCreateNestedOneWithoutPersonalInput>;
  PersonalStats?: InputMaybe<PersonalStatsCreateNestedOneWithoutPersonalInput>;
  Profile: ProfileCreateNestedOneWithoutPersonalInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PersonalCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  personalStatsId?: InputMaybe<Scalars['String']>;
  profileId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PersonalCreateNestedOneWithoutLiveOutPersonalInput = {
  connect?: InputMaybe<PersonalWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonalCreateOrConnectWithoutLiveOutPersonalInput>;
  create?: InputMaybe<PersonalCreateWithoutLiveOutPersonalInput>;
};

export type PersonalCreateNestedOneWithoutPersonalStatsInput = {
  connect?: InputMaybe<PersonalWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonalCreateOrConnectWithoutPersonalStatsInput>;
  create?: InputMaybe<PersonalCreateWithoutPersonalStatsInput>;
};

export type PersonalCreateNestedOneWithoutProfileInput = {
  connect?: InputMaybe<PersonalWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonalCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<PersonalCreateWithoutProfileInput>;
};

export type PersonalCreateOrConnectWithoutLiveOutPersonalInput = {
  create: PersonalCreateWithoutLiveOutPersonalInput;
  where: PersonalWhereUniqueInput;
};

export type PersonalCreateOrConnectWithoutPersonalStatsInput = {
  create: PersonalCreateWithoutPersonalStatsInput;
  where: PersonalWhereUniqueInput;
};

export type PersonalCreateOrConnectWithoutProfileInput = {
  create: PersonalCreateWithoutProfileInput;
  where: PersonalWhereUniqueInput;
};

export type PersonalCreateWithoutLiveOutPersonalInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  PersonalStats?: InputMaybe<PersonalStatsCreateNestedOneWithoutPersonalInput>;
  Profile: ProfileCreateNestedOneWithoutPersonalInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PersonalCreateWithoutPersonalStatsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalCreateNestedOneWithoutPersonalInput>;
  Profile: ProfileCreateNestedOneWithoutPersonalInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PersonalCreateWithoutProfileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalCreateNestedOneWithoutPersonalInput>;
  PersonalStats?: InputMaybe<PersonalStatsCreateNestedOneWithoutPersonalInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PersonalMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  personalStatsId?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PersonalMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  personalStatsId?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PersonalOrderByWithAggregationInput = {
  _count?: InputMaybe<PersonalCountOrderByAggregateInput>;
  _max?: InputMaybe<PersonalMaxOrderByAggregateInput>;
  _min?: InputMaybe<PersonalMinOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  personalStatsId?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PersonalOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalOrderByWithRelationInput>;
  PersonalStats?: InputMaybe<PersonalStatsOrderByWithRelationInput>;
  personalStatsId?: InputMaybe<SortOrder>;
  Profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PersonalRelationFilter = {
  is?: InputMaybe<PersonalWhereInput>;
  isNot?: InputMaybe<PersonalWhereInput>;
};

export enum PersonalScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  PersonalStatsId = 'personalStatsId',
  ProfileId = 'profileId',
  UpdatedAt = 'updatedAt'
}

export type PersonalScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<PersonalScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<PersonalScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<PersonalScalarWhereWithAggregatesInput>>;
  personalStatsId?: InputMaybe<StringNullableWithAggregatesFilter>;
  profileId?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type PersonalStats = {
  __typename?: 'PersonalStats';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  Out: Array<Out>;
  Personal?: Maybe<Personal>;
  updatedAt: Scalars['DateTime'];
};


export type PersonalStatsOutArgs = {
  cursor?: InputMaybe<OutWhereUniqueInput>;
  distinct?: InputMaybe<Array<OutScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OutOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OutWhereInput>;
};

export type PersonalStatsCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PersonalStatsCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  Out?: InputMaybe<OutCreateNestedManyWithoutPersonalStatsInput>;
  Personal?: InputMaybe<PersonalCreateNestedOneWithoutPersonalStatsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PersonalStatsCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PersonalStatsCreateNestedOneWithoutOutInput = {
  connect?: InputMaybe<PersonalStatsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonalStatsCreateOrConnectWithoutOutInput>;
  create?: InputMaybe<PersonalStatsCreateWithoutOutInput>;
};

export type PersonalStatsCreateNestedOneWithoutPersonalInput = {
  connect?: InputMaybe<PersonalStatsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonalStatsCreateOrConnectWithoutPersonalInput>;
  create?: InputMaybe<PersonalStatsCreateWithoutPersonalInput>;
};

export type PersonalStatsCreateOrConnectWithoutOutInput = {
  create: PersonalStatsCreateWithoutOutInput;
  where: PersonalStatsWhereUniqueInput;
};

export type PersonalStatsCreateOrConnectWithoutPersonalInput = {
  create: PersonalStatsCreateWithoutPersonalInput;
  where: PersonalStatsWhereUniqueInput;
};

export type PersonalStatsCreateWithoutOutInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  Personal?: InputMaybe<PersonalCreateNestedOneWithoutPersonalStatsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PersonalStatsCreateWithoutPersonalInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  Out?: InputMaybe<OutCreateNestedManyWithoutPersonalStatsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PersonalStatsMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PersonalStatsMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PersonalStatsOrderByWithAggregationInput = {
  _count?: InputMaybe<PersonalStatsCountOrderByAggregateInput>;
  _max?: InputMaybe<PersonalStatsMaxOrderByAggregateInput>;
  _min?: InputMaybe<PersonalStatsMinOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PersonalStatsOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  Out?: InputMaybe<OutOrderByRelationAggregateInput>;
  Personal?: InputMaybe<PersonalOrderByWithRelationInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PersonalStatsRelationFilter = {
  is?: InputMaybe<PersonalStatsWhereInput>;
  isNot?: InputMaybe<PersonalStatsWhereInput>;
};

export enum PersonalStatsScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  UpdatedAt = 'updatedAt'
}

export type PersonalStatsScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<PersonalStatsScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<PersonalStatsScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<PersonalStatsScalarWhereWithAggregatesInput>>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type PersonalStatsUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Out?: InputMaybe<OutUpdateManyWithoutPersonalStatsNestedInput>;
  Personal?: InputMaybe<PersonalUpdateOneWithoutPersonalStatsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PersonalStatsUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PersonalStatsUpdateOneWithoutOutNestedInput = {
  connect?: InputMaybe<PersonalStatsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonalStatsCreateOrConnectWithoutOutInput>;
  create?: InputMaybe<PersonalStatsCreateWithoutOutInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<PersonalStatsUpdateWithoutOutInput>;
  upsert?: InputMaybe<PersonalStatsUpsertWithoutOutInput>;
};

export type PersonalStatsUpdateOneWithoutPersonalNestedInput = {
  connect?: InputMaybe<PersonalStatsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonalStatsCreateOrConnectWithoutPersonalInput>;
  create?: InputMaybe<PersonalStatsCreateWithoutPersonalInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<PersonalStatsUpdateWithoutPersonalInput>;
  upsert?: InputMaybe<PersonalStatsUpsertWithoutPersonalInput>;
};

export type PersonalStatsUpdateWithoutOutInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Personal?: InputMaybe<PersonalUpdateOneWithoutPersonalStatsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PersonalStatsUpdateWithoutPersonalInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Out?: InputMaybe<OutUpdateManyWithoutPersonalStatsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PersonalStatsUpsertWithoutOutInput = {
  create: PersonalStatsCreateWithoutOutInput;
  update: PersonalStatsUpdateWithoutOutInput;
};

export type PersonalStatsUpsertWithoutPersonalInput = {
  create: PersonalStatsCreateWithoutPersonalInput;
  update: PersonalStatsUpdateWithoutPersonalInput;
};

export type PersonalStatsWhereInput = {
  AND?: InputMaybe<Array<PersonalStatsWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<PersonalStatsWhereInput>>;
  OR?: InputMaybe<Array<PersonalStatsWhereInput>>;
  Out?: InputMaybe<OutListRelationFilter>;
  Personal?: InputMaybe<PersonalWhereInput>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type PersonalStatsWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type PersonalUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalUpdateOneWithoutPersonalNestedInput>;
  PersonalStats?: InputMaybe<PersonalStatsUpdateOneWithoutPersonalNestedInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutPersonalNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PersonalUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PersonalUpdateOneRequiredWithoutLiveOutPersonalNestedInput = {
  connect?: InputMaybe<PersonalWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonalCreateOrConnectWithoutLiveOutPersonalInput>;
  create?: InputMaybe<PersonalCreateWithoutLiveOutPersonalInput>;
  update?: InputMaybe<PersonalUpdateWithoutLiveOutPersonalInput>;
  upsert?: InputMaybe<PersonalUpsertWithoutLiveOutPersonalInput>;
};

export type PersonalUpdateOneWithoutPersonalStatsNestedInput = {
  connect?: InputMaybe<PersonalWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonalCreateOrConnectWithoutPersonalStatsInput>;
  create?: InputMaybe<PersonalCreateWithoutPersonalStatsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<PersonalUpdateWithoutPersonalStatsInput>;
  upsert?: InputMaybe<PersonalUpsertWithoutPersonalStatsInput>;
};

export type PersonalUpdateOneWithoutProfileNestedInput = {
  connect?: InputMaybe<PersonalWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonalCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<PersonalCreateWithoutProfileInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<PersonalUpdateWithoutProfileInput>;
  upsert?: InputMaybe<PersonalUpsertWithoutProfileInput>;
};

export type PersonalUpdateWithoutLiveOutPersonalInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  PersonalStats?: InputMaybe<PersonalStatsUpdateOneWithoutPersonalNestedInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutPersonalNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PersonalUpdateWithoutPersonalStatsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalUpdateOneWithoutPersonalNestedInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutPersonalNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PersonalUpdateWithoutProfileInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalUpdateOneWithoutPersonalNestedInput>;
  PersonalStats?: InputMaybe<PersonalStatsUpdateOneWithoutPersonalNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PersonalUpsertWithoutLiveOutPersonalInput = {
  create: PersonalCreateWithoutLiveOutPersonalInput;
  update: PersonalUpdateWithoutLiveOutPersonalInput;
};

export type PersonalUpsertWithoutPersonalStatsInput = {
  create: PersonalCreateWithoutPersonalStatsInput;
  update: PersonalUpdateWithoutPersonalStatsInput;
};

export type PersonalUpsertWithoutProfileInput = {
  create: PersonalCreateWithoutProfileInput;
  update: PersonalUpdateWithoutProfileInput;
};

export type PersonalWhereInput = {
  AND?: InputMaybe<Array<PersonalWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalWhereInput>;
  NOT?: InputMaybe<Array<PersonalWhereInput>>;
  OR?: InputMaybe<Array<PersonalWhereInput>>;
  PersonalStats?: InputMaybe<PersonalStatsWhereInput>;
  personalStatsId?: InputMaybe<StringNullableFilter>;
  Profile?: InputMaybe<ProfileWhereInput>;
  profileId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type PersonalWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  personalStatsId?: InputMaybe<Scalars['String']>;
  profileId?: InputMaybe<Scalars['String']>;
};

export type Phone = {
  __typename?: 'Phone';
  AuthenticationProvider: Array<AuthenticationProvider>;
  canUseAsRecovery?: Maybe<Scalars['Boolean']>;
  completeNumber?: Maybe<Scalars['String']>;
  countryCallingCode?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  number: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};


export type PhoneAuthenticationProviderArgs = {
  cursor?: InputMaybe<AuthenticationProviderWhereUniqueInput>;
  distinct?: InputMaybe<Array<AuthenticationProviderScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AuthenticationProviderOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AuthenticationProviderWhereInput>;
};

export type PhoneAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type PhoneCountOrderByAggregateInput = {
  canUseAsRecovery?: InputMaybe<SortOrder>;
  completeNumber?: InputMaybe<SortOrder>;
  countryCallingCode?: InputMaybe<SortOrder>;
  countryCode?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  number?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PhoneCreateInput = {
  AuthenticationProvider?: InputMaybe<AuthenticationProviderCreateNestedManyWithoutPhonesInput>;
  canUseAsRecovery?: InputMaybe<Scalars['Boolean']>;
  completeNumber?: InputMaybe<Scalars['String']>;
  countryCallingCode?: InputMaybe<Scalars['String']>;
  countryCode?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  number: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PhoneCreateManyInput = {
  canUseAsRecovery?: InputMaybe<Scalars['Boolean']>;
  completeNumber?: InputMaybe<Scalars['String']>;
  countryCallingCode?: InputMaybe<Scalars['String']>;
  countryCode?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  number: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PhoneCreateNestedManyWithoutAuthenticationProviderInput = {
  connect?: InputMaybe<Array<PhoneWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PhoneCreateOrConnectWithoutAuthenticationProviderInput>>;
  create?: InputMaybe<Array<PhoneCreateWithoutAuthenticationProviderInput>>;
};

export type PhoneCreateOrConnectWithoutAuthenticationProviderInput = {
  create: PhoneCreateWithoutAuthenticationProviderInput;
  where: PhoneWhereUniqueInput;
};

export type PhoneCreateWithoutAuthenticationProviderInput = {
  canUseAsRecovery?: InputMaybe<Scalars['Boolean']>;
  completeNumber?: InputMaybe<Scalars['String']>;
  countryCallingCode?: InputMaybe<Scalars['String']>;
  countryCode?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  number: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PhoneInput = {
  completeNumber?: InputMaybe<Scalars['String']>;
  countryCallingCode?: InputMaybe<Scalars['String']>;
  countryCode?: InputMaybe<Scalars['String']>;
  /** Accepted phone formats: 5193334444 or +15193334444 */
  number?: InputMaybe<Scalars['String']>;
};

export type PhoneListRelationFilter = {
  every?: InputMaybe<PhoneWhereInput>;
  none?: InputMaybe<PhoneWhereInput>;
  some?: InputMaybe<PhoneWhereInput>;
};

export type PhoneMaxOrderByAggregateInput = {
  canUseAsRecovery?: InputMaybe<SortOrder>;
  completeNumber?: InputMaybe<SortOrder>;
  countryCallingCode?: InputMaybe<SortOrder>;
  countryCode?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  number?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PhoneMinOrderByAggregateInput = {
  canUseAsRecovery?: InputMaybe<SortOrder>;
  completeNumber?: InputMaybe<SortOrder>;
  countryCallingCode?: InputMaybe<SortOrder>;
  countryCode?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  number?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PhoneOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type PhoneOrderByWithAggregationInput = {
  _avg?: InputMaybe<PhoneAvgOrderByAggregateInput>;
  _count?: InputMaybe<PhoneCountOrderByAggregateInput>;
  _max?: InputMaybe<PhoneMaxOrderByAggregateInput>;
  _min?: InputMaybe<PhoneMinOrderByAggregateInput>;
  _sum?: InputMaybe<PhoneSumOrderByAggregateInput>;
  canUseAsRecovery?: InputMaybe<SortOrder>;
  completeNumber?: InputMaybe<SortOrder>;
  countryCallingCode?: InputMaybe<SortOrder>;
  countryCode?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  number?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PhoneOrderByWithRelationInput = {
  AuthenticationProvider?: InputMaybe<AuthenticationProviderOrderByRelationAggregateInput>;
  canUseAsRecovery?: InputMaybe<SortOrder>;
  completeNumber?: InputMaybe<SortOrder>;
  countryCallingCode?: InputMaybe<SortOrder>;
  countryCode?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  number?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum PhoneScalarFieldEnum {
  CanUseAsRecovery = 'canUseAsRecovery',
  CompleteNumber = 'completeNumber',
  CountryCallingCode = 'countryCallingCode',
  CountryCode = 'countryCode',
  CreatedAt = 'createdAt',
  Id = 'id',
  Number = 'number',
  UpdatedAt = 'updatedAt'
}

export type PhoneScalarWhereInput = {
  AND?: InputMaybe<Array<PhoneScalarWhereInput>>;
  canUseAsRecovery?: InputMaybe<BoolNullableFilter>;
  completeNumber?: InputMaybe<StringNullableFilter>;
  countryCallingCode?: InputMaybe<StringNullableFilter>;
  countryCode?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  NOT?: InputMaybe<Array<PhoneScalarWhereInput>>;
  number?: InputMaybe<StringFilter>;
  OR?: InputMaybe<Array<PhoneScalarWhereInput>>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type PhoneScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<PhoneScalarWhereWithAggregatesInput>>;
  canUseAsRecovery?: InputMaybe<BoolNullableWithAggregatesFilter>;
  completeNumber?: InputMaybe<StringNullableWithAggregatesFilter>;
  countryCallingCode?: InputMaybe<StringNullableWithAggregatesFilter>;
  countryCode?: InputMaybe<StringNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  NOT?: InputMaybe<Array<PhoneScalarWhereWithAggregatesInput>>;
  number?: InputMaybe<StringWithAggregatesFilter>;
  OR?: InputMaybe<Array<PhoneScalarWhereWithAggregatesInput>>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type PhoneSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type PhoneUpdateInput = {
  AuthenticationProvider?: InputMaybe<AuthenticationProviderUpdateManyWithoutPhonesNestedInput>;
  canUseAsRecovery?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  completeNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  countryCallingCode?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  countryCode?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  number?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PhoneUpdateManyMutationInput = {
  canUseAsRecovery?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  completeNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  countryCallingCode?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  countryCode?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  number?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PhoneUpdateManyWithoutAuthenticationProviderNestedInput = {
  connect?: InputMaybe<Array<PhoneWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PhoneCreateOrConnectWithoutAuthenticationProviderInput>>;
  create?: InputMaybe<Array<PhoneCreateWithoutAuthenticationProviderInput>>;
  delete?: InputMaybe<Array<PhoneWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PhoneScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PhoneWhereUniqueInput>>;
  set?: InputMaybe<Array<PhoneWhereUniqueInput>>;
  update?: InputMaybe<Array<PhoneUpdateWithWhereUniqueWithoutAuthenticationProviderInput>>;
  updateMany?: InputMaybe<Array<PhoneUpdateManyWithWhereWithoutAuthenticationProviderInput>>;
  upsert?: InputMaybe<Array<PhoneUpsertWithWhereUniqueWithoutAuthenticationProviderInput>>;
};

export type PhoneUpdateManyWithWhereWithoutAuthenticationProviderInput = {
  data: PhoneUpdateManyMutationInput;
  where: PhoneScalarWhereInput;
};

export type PhoneUpdateWithoutAuthenticationProviderInput = {
  canUseAsRecovery?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  completeNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  countryCallingCode?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  countryCode?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  number?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PhoneUpdateWithWhereUniqueWithoutAuthenticationProviderInput = {
  data: PhoneUpdateWithoutAuthenticationProviderInput;
  where: PhoneWhereUniqueInput;
};

export type PhoneUpsertWithWhereUniqueWithoutAuthenticationProviderInput = {
  create: PhoneCreateWithoutAuthenticationProviderInput;
  update: PhoneUpdateWithoutAuthenticationProviderInput;
  where: PhoneWhereUniqueInput;
};

export type PhoneWhereInput = {
  AND?: InputMaybe<Array<PhoneWhereInput>>;
  AuthenticationProvider?: InputMaybe<AuthenticationProviderListRelationFilter>;
  canUseAsRecovery?: InputMaybe<BoolNullableFilter>;
  completeNumber?: InputMaybe<StringNullableFilter>;
  countryCallingCode?: InputMaybe<StringNullableFilter>;
  countryCode?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  NOT?: InputMaybe<Array<PhoneWhereInput>>;
  number?: InputMaybe<StringFilter>;
  OR?: InputMaybe<Array<PhoneWhereInput>>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type PhoneWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type Photo = {
  __typename?: 'Photo';
  active: Scalars['Boolean'];
  blurhash?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  Group?: Maybe<Group>;
  groupId?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  position?: Maybe<Scalars['Int']>;
  Profile?: Maybe<Profile>;
  profileId?: Maybe<Scalars['String']>;
  ratio?: Maybe<Scalars['String']>;
  Story?: Maybe<Story>;
  storyId?: Maybe<Scalars['String']>;
  type?: Maybe<PhotoType>;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type PhotoAvgOrderByAggregateInput = {
  height?: InputMaybe<SortOrder>;
  position?: InputMaybe<SortOrder>;
  width?: InputMaybe<SortOrder>;
};

export type PhotoCountOrderByAggregateInput = {
  active?: InputMaybe<SortOrder>;
  blurhash?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  groupId?: InputMaybe<SortOrder>;
  height?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  position?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  ratio?: InputMaybe<SortOrder>;
  storyId?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
  width?: InputMaybe<SortOrder>;
};

export type PhotoCreateInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  blurhash?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Group?: InputMaybe<GroupCreateNestedOneWithoutPhotosInput>;
  height?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Int']>;
  Profile?: InputMaybe<ProfileCreateNestedOneWithoutPhotosInput>;
  ratio?: InputMaybe<Scalars['String']>;
  Story?: InputMaybe<StoryCreateNestedOneWithoutPhotosInput>;
  type?: InputMaybe<PhotoType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width?: InputMaybe<Scalars['Int']>;
};

export type PhotoCreateManyGroupInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  blurhash?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  height?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Int']>;
  profileId?: InputMaybe<Scalars['String']>;
  ratio?: InputMaybe<Scalars['String']>;
  storyId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<PhotoType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width?: InputMaybe<Scalars['Int']>;
};

export type PhotoCreateManyGroupInputEnvelope = {
  data: Array<PhotoCreateManyGroupInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PhotoCreateManyInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  blurhash?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  groupId?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Int']>;
  profileId?: InputMaybe<Scalars['String']>;
  ratio?: InputMaybe<Scalars['String']>;
  storyId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<PhotoType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width?: InputMaybe<Scalars['Int']>;
};

export type PhotoCreateManyProfileInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  blurhash?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  groupId?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Int']>;
  ratio?: InputMaybe<Scalars['String']>;
  storyId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<PhotoType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width?: InputMaybe<Scalars['Int']>;
};

export type PhotoCreateManyProfileInputEnvelope = {
  data: Array<PhotoCreateManyProfileInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PhotoCreateManyStoryInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  blurhash?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  groupId?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Int']>;
  profileId?: InputMaybe<Scalars['String']>;
  ratio?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<PhotoType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width?: InputMaybe<Scalars['Int']>;
};

export type PhotoCreateManyStoryInputEnvelope = {
  data: Array<PhotoCreateManyStoryInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PhotoCreateNestedManyWithoutGroupInput = {
  connect?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PhotoCreateOrConnectWithoutGroupInput>>;
  create?: InputMaybe<Array<PhotoCreateWithoutGroupInput>>;
  createMany?: InputMaybe<PhotoCreateManyGroupInputEnvelope>;
};

export type PhotoCreateNestedManyWithoutProfileInput = {
  connect?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PhotoCreateOrConnectWithoutProfileInput>>;
  create?: InputMaybe<Array<PhotoCreateWithoutProfileInput>>;
  createMany?: InputMaybe<PhotoCreateManyProfileInputEnvelope>;
};

export type PhotoCreateNestedManyWithoutStoryInput = {
  connect?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PhotoCreateOrConnectWithoutStoryInput>>;
  create?: InputMaybe<Array<PhotoCreateWithoutStoryInput>>;
  createMany?: InputMaybe<PhotoCreateManyStoryInputEnvelope>;
};

export type PhotoCreateOrConnectWithoutGroupInput = {
  create: PhotoCreateWithoutGroupInput;
  where: PhotoWhereUniqueInput;
};

export type PhotoCreateOrConnectWithoutProfileInput = {
  create: PhotoCreateWithoutProfileInput;
  where: PhotoWhereUniqueInput;
};

export type PhotoCreateOrConnectWithoutStoryInput = {
  create: PhotoCreateWithoutStoryInput;
  where: PhotoWhereUniqueInput;
};

export type PhotoCreateWithoutGroupInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  blurhash?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  height?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Int']>;
  Profile?: InputMaybe<ProfileCreateNestedOneWithoutPhotosInput>;
  ratio?: InputMaybe<Scalars['String']>;
  Story?: InputMaybe<StoryCreateNestedOneWithoutPhotosInput>;
  type?: InputMaybe<PhotoType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width?: InputMaybe<Scalars['Int']>;
};

export type PhotoCreateWithoutProfileInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  blurhash?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Group?: InputMaybe<GroupCreateNestedOneWithoutPhotosInput>;
  height?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Int']>;
  ratio?: InputMaybe<Scalars['String']>;
  Story?: InputMaybe<StoryCreateNestedOneWithoutPhotosInput>;
  type?: InputMaybe<PhotoType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width?: InputMaybe<Scalars['Int']>;
};

export type PhotoCreateWithoutStoryInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  blurhash?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Group?: InputMaybe<GroupCreateNestedOneWithoutPhotosInput>;
  height?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Int']>;
  Profile?: InputMaybe<ProfileCreateNestedOneWithoutPhotosInput>;
  ratio?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<PhotoType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width?: InputMaybe<Scalars['Int']>;
};

export type PhotoListRelationFilter = {
  every?: InputMaybe<PhotoWhereInput>;
  none?: InputMaybe<PhotoWhereInput>;
  some?: InputMaybe<PhotoWhereInput>;
};

export type PhotoMaxOrderByAggregateInput = {
  active?: InputMaybe<SortOrder>;
  blurhash?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  groupId?: InputMaybe<SortOrder>;
  height?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  position?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  ratio?: InputMaybe<SortOrder>;
  storyId?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
  width?: InputMaybe<SortOrder>;
};

export type PhotoMinOrderByAggregateInput = {
  active?: InputMaybe<SortOrder>;
  blurhash?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  groupId?: InputMaybe<SortOrder>;
  height?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  position?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  ratio?: InputMaybe<SortOrder>;
  storyId?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
  width?: InputMaybe<SortOrder>;
};

export type PhotoOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type PhotoOrderByWithAggregationInput = {
  _avg?: InputMaybe<PhotoAvgOrderByAggregateInput>;
  _count?: InputMaybe<PhotoCountOrderByAggregateInput>;
  _max?: InputMaybe<PhotoMaxOrderByAggregateInput>;
  _min?: InputMaybe<PhotoMinOrderByAggregateInput>;
  _sum?: InputMaybe<PhotoSumOrderByAggregateInput>;
  active?: InputMaybe<SortOrder>;
  blurhash?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  groupId?: InputMaybe<SortOrder>;
  height?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  position?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  ratio?: InputMaybe<SortOrder>;
  storyId?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
  width?: InputMaybe<SortOrder>;
};

export type PhotoOrderByWithRelationInput = {
  active?: InputMaybe<SortOrder>;
  blurhash?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  Group?: InputMaybe<GroupOrderByWithRelationInput>;
  groupId?: InputMaybe<SortOrder>;
  height?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  position?: InputMaybe<SortOrder>;
  Profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  profileId?: InputMaybe<SortOrder>;
  ratio?: InputMaybe<SortOrder>;
  Story?: InputMaybe<StoryOrderByWithRelationInput>;
  storyId?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
  width?: InputMaybe<SortOrder>;
};

export enum PhotoScalarFieldEnum {
  Active = 'active',
  Blurhash = 'blurhash',
  CreatedAt = 'createdAt',
  GroupId = 'groupId',
  Height = 'height',
  Id = 'id',
  Position = 'position',
  ProfileId = 'profileId',
  Ratio = 'ratio',
  StoryId = 'storyId',
  Type = 'type',
  UpdatedAt = 'updatedAt',
  Url = 'url',
  Width = 'width'
}

export type PhotoScalarWhereInput = {
  active?: InputMaybe<BoolFilter>;
  AND?: InputMaybe<Array<PhotoScalarWhereInput>>;
  blurhash?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  groupId?: InputMaybe<StringNullableFilter>;
  height?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<PhotoScalarWhereInput>>;
  OR?: InputMaybe<Array<PhotoScalarWhereInput>>;
  position?: InputMaybe<IntNullableFilter>;
  profileId?: InputMaybe<StringNullableFilter>;
  ratio?: InputMaybe<StringNullableFilter>;
  storyId?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumPhotoTypeNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  url?: InputMaybe<StringFilter>;
  width?: InputMaybe<IntNullableFilter>;
};

export type PhotoScalarWhereWithAggregatesInput = {
  active?: InputMaybe<BoolWithAggregatesFilter>;
  AND?: InputMaybe<Array<PhotoScalarWhereWithAggregatesInput>>;
  blurhash?: InputMaybe<StringNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  groupId?: InputMaybe<StringNullableWithAggregatesFilter>;
  height?: InputMaybe<IntNullableWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<PhotoScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<PhotoScalarWhereWithAggregatesInput>>;
  position?: InputMaybe<IntNullableWithAggregatesFilter>;
  profileId?: InputMaybe<StringNullableWithAggregatesFilter>;
  ratio?: InputMaybe<StringNullableWithAggregatesFilter>;
  storyId?: InputMaybe<StringNullableWithAggregatesFilter>;
  type?: InputMaybe<EnumPhotoTypeNullableWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  url?: InputMaybe<StringWithAggregatesFilter>;
  width?: InputMaybe<IntNullableWithAggregatesFilter>;
};

export type PhotoSumOrderByAggregateInput = {
  height?: InputMaybe<SortOrder>;
  position?: InputMaybe<SortOrder>;
  width?: InputMaybe<SortOrder>;
};

export enum PhotoType {
  Banner = 'BANNER',
  Logo = 'LOGO'
}

export type PhotoUpdateInput = {
  active?: InputMaybe<BoolFieldUpdateOperationsInput>;
  blurhash?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Group?: InputMaybe<GroupUpdateOneWithoutPhotosNestedInput>;
  height?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  position?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneWithoutPhotosNestedInput>;
  ratio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  Story?: InputMaybe<StoryUpdateOneWithoutPhotosNestedInput>;
  type?: InputMaybe<NullableEnumPhotoTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
  width?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
};

export type PhotoUpdateManyMutationInput = {
  active?: InputMaybe<BoolFieldUpdateOperationsInput>;
  blurhash?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  height?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  position?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  ratio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  type?: InputMaybe<NullableEnumPhotoTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
  width?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
};

export type PhotoUpdateManyWithoutGroupNestedInput = {
  connect?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PhotoCreateOrConnectWithoutGroupInput>>;
  create?: InputMaybe<Array<PhotoCreateWithoutGroupInput>>;
  createMany?: InputMaybe<PhotoCreateManyGroupInputEnvelope>;
  delete?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PhotoScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  set?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  update?: InputMaybe<Array<PhotoUpdateWithWhereUniqueWithoutGroupInput>>;
  updateMany?: InputMaybe<Array<PhotoUpdateManyWithWhereWithoutGroupInput>>;
  upsert?: InputMaybe<Array<PhotoUpsertWithWhereUniqueWithoutGroupInput>>;
};

export type PhotoUpdateManyWithoutProfileNestedInput = {
  connect?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PhotoCreateOrConnectWithoutProfileInput>>;
  create?: InputMaybe<Array<PhotoCreateWithoutProfileInput>>;
  createMany?: InputMaybe<PhotoCreateManyProfileInputEnvelope>;
  delete?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PhotoScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  set?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  update?: InputMaybe<Array<PhotoUpdateWithWhereUniqueWithoutProfileInput>>;
  updateMany?: InputMaybe<Array<PhotoUpdateManyWithWhereWithoutProfileInput>>;
  upsert?: InputMaybe<Array<PhotoUpsertWithWhereUniqueWithoutProfileInput>>;
};

export type PhotoUpdateManyWithoutStoryNestedInput = {
  connect?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PhotoCreateOrConnectWithoutStoryInput>>;
  create?: InputMaybe<Array<PhotoCreateWithoutStoryInput>>;
  createMany?: InputMaybe<PhotoCreateManyStoryInputEnvelope>;
  delete?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PhotoScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  set?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  update?: InputMaybe<Array<PhotoUpdateWithWhereUniqueWithoutStoryInput>>;
  updateMany?: InputMaybe<Array<PhotoUpdateManyWithWhereWithoutStoryInput>>;
  upsert?: InputMaybe<Array<PhotoUpsertWithWhereUniqueWithoutStoryInput>>;
};

export type PhotoUpdateManyWithWhereWithoutGroupInput = {
  data: PhotoUpdateManyMutationInput;
  where: PhotoScalarWhereInput;
};

export type PhotoUpdateManyWithWhereWithoutProfileInput = {
  data: PhotoUpdateManyMutationInput;
  where: PhotoScalarWhereInput;
};

export type PhotoUpdateManyWithWhereWithoutStoryInput = {
  data: PhotoUpdateManyMutationInput;
  where: PhotoScalarWhereInput;
};

export type PhotoUpdateWithoutGroupInput = {
  active?: InputMaybe<BoolFieldUpdateOperationsInput>;
  blurhash?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  height?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  position?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneWithoutPhotosNestedInput>;
  ratio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  Story?: InputMaybe<StoryUpdateOneWithoutPhotosNestedInput>;
  type?: InputMaybe<NullableEnumPhotoTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
  width?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
};

export type PhotoUpdateWithoutProfileInput = {
  active?: InputMaybe<BoolFieldUpdateOperationsInput>;
  blurhash?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Group?: InputMaybe<GroupUpdateOneWithoutPhotosNestedInput>;
  height?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  position?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  ratio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  Story?: InputMaybe<StoryUpdateOneWithoutPhotosNestedInput>;
  type?: InputMaybe<NullableEnumPhotoTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
  width?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
};

export type PhotoUpdateWithoutStoryInput = {
  active?: InputMaybe<BoolFieldUpdateOperationsInput>;
  blurhash?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Group?: InputMaybe<GroupUpdateOneWithoutPhotosNestedInput>;
  height?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  position?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneWithoutPhotosNestedInput>;
  ratio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  type?: InputMaybe<NullableEnumPhotoTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
  width?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
};

export type PhotoUpdateWithWhereUniqueWithoutGroupInput = {
  data: PhotoUpdateWithoutGroupInput;
  where: PhotoWhereUniqueInput;
};

export type PhotoUpdateWithWhereUniqueWithoutProfileInput = {
  data: PhotoUpdateWithoutProfileInput;
  where: PhotoWhereUniqueInput;
};

export type PhotoUpdateWithWhereUniqueWithoutStoryInput = {
  data: PhotoUpdateWithoutStoryInput;
  where: PhotoWhereUniqueInput;
};

export type PhotoUpsertWithWhereUniqueWithoutGroupInput = {
  create: PhotoCreateWithoutGroupInput;
  update: PhotoUpdateWithoutGroupInput;
  where: PhotoWhereUniqueInput;
};

export type PhotoUpsertWithWhereUniqueWithoutProfileInput = {
  create: PhotoCreateWithoutProfileInput;
  update: PhotoUpdateWithoutProfileInput;
  where: PhotoWhereUniqueInput;
};

export type PhotoUpsertWithWhereUniqueWithoutStoryInput = {
  create: PhotoCreateWithoutStoryInput;
  update: PhotoUpdateWithoutStoryInput;
  where: PhotoWhereUniqueInput;
};

export type PhotoWhereInput = {
  active?: InputMaybe<BoolFilter>;
  AND?: InputMaybe<Array<PhotoWhereInput>>;
  blurhash?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  Group?: InputMaybe<GroupWhereInput>;
  groupId?: InputMaybe<StringNullableFilter>;
  height?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<PhotoWhereInput>>;
  OR?: InputMaybe<Array<PhotoWhereInput>>;
  position?: InputMaybe<IntNullableFilter>;
  Profile?: InputMaybe<ProfileWhereInput>;
  profileId?: InputMaybe<StringNullableFilter>;
  ratio?: InputMaybe<StringNullableFilter>;
  Story?: InputMaybe<StoryWhereInput>;
  storyId?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumPhotoTypeNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  url?: InputMaybe<StringFilter>;
  width?: InputMaybe<IntNullableFilter>;
};

export type PhotoWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type PlaceType = {
  __typename?: 'PlaceType';
  coords: Coords;
  isoCode: Scalars['String'];
  name: Scalars['String'];
};

export type PluseCode = {
  __typename?: 'PluseCode';
  compoundCode?: Maybe<Scalars['String']>;
  globalCode: Scalars['String'];
  id: Scalars['ID'];
  Location?: Maybe<Location>;
};

export type PluseCodeCountOrderByAggregateInput = {
  compoundCode?: InputMaybe<SortOrder>;
  globalCode?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type PluseCodeCreateInput = {
  compoundCode?: InputMaybe<Scalars['String']>;
  globalCode: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  Location?: InputMaybe<LocationCreateNestedOneWithoutPlusCodeInput>;
};

export type PluseCodeCreateManyInput = {
  compoundCode?: InputMaybe<Scalars['String']>;
  globalCode: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
};

export type PluseCodeCreateNestedOneWithoutLocationInput = {
  connect?: InputMaybe<PluseCodeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PluseCodeCreateOrConnectWithoutLocationInput>;
  create?: InputMaybe<PluseCodeCreateWithoutLocationInput>;
};

export type PluseCodeCreateOrConnectWithoutLocationInput = {
  create: PluseCodeCreateWithoutLocationInput;
  where: PluseCodeWhereUniqueInput;
};

export type PluseCodeCreateWithoutLocationInput = {
  compoundCode?: InputMaybe<Scalars['String']>;
  globalCode: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
};

export type PluseCodeMaxOrderByAggregateInput = {
  compoundCode?: InputMaybe<SortOrder>;
  globalCode?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type PluseCodeMinOrderByAggregateInput = {
  compoundCode?: InputMaybe<SortOrder>;
  globalCode?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type PluseCodeOrderByWithAggregationInput = {
  _count?: InputMaybe<PluseCodeCountOrderByAggregateInput>;
  _max?: InputMaybe<PluseCodeMaxOrderByAggregateInput>;
  _min?: InputMaybe<PluseCodeMinOrderByAggregateInput>;
  compoundCode?: InputMaybe<SortOrder>;
  globalCode?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type PluseCodeOrderByWithRelationInput = {
  compoundCode?: InputMaybe<SortOrder>;
  globalCode?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  Location?: InputMaybe<LocationOrderByWithRelationInput>;
};

export type PluseCodeRelationFilter = {
  is?: InputMaybe<PluseCodeWhereInput>;
  isNot?: InputMaybe<PluseCodeWhereInput>;
};

export enum PluseCodeScalarFieldEnum {
  CompoundCode = 'compoundCode',
  GlobalCode = 'globalCode',
  Id = 'id'
}

export type PluseCodeScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<PluseCodeScalarWhereWithAggregatesInput>>;
  compoundCode?: InputMaybe<StringNullableWithAggregatesFilter>;
  globalCode?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<PluseCodeScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<PluseCodeScalarWhereWithAggregatesInput>>;
};

export type PluseCodeUpdateInput = {
  compoundCode?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  globalCode?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Location?: InputMaybe<LocationUpdateOneWithoutPlusCodeNestedInput>;
};

export type PluseCodeUpdateManyMutationInput = {
  compoundCode?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  globalCode?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type PluseCodeUpdateOneWithoutLocationNestedInput = {
  connect?: InputMaybe<PluseCodeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PluseCodeCreateOrConnectWithoutLocationInput>;
  create?: InputMaybe<PluseCodeCreateWithoutLocationInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<PluseCodeUpdateWithoutLocationInput>;
  upsert?: InputMaybe<PluseCodeUpsertWithoutLocationInput>;
};

export type PluseCodeUpdateWithoutLocationInput = {
  compoundCode?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  globalCode?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type PluseCodeUpsertWithoutLocationInput = {
  create: PluseCodeCreateWithoutLocationInput;
  update: PluseCodeUpdateWithoutLocationInput;
};

export type PluseCodeWhereInput = {
  AND?: InputMaybe<Array<PluseCodeWhereInput>>;
  compoundCode?: InputMaybe<StringNullableFilter>;
  globalCode?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  Location?: InputMaybe<LocationWhereInput>;
  NOT?: InputMaybe<Array<PluseCodeWhereInput>>;
  OR?: InputMaybe<Array<PluseCodeWhereInput>>;
};

export type PluseCodeWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type PopularSearchServiceCountOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  popularPersonals?: InputMaybe<SortOrder>;
  popularVenues?: InputMaybe<SortOrder>;
};

export type PopularSearchServiceCreateInput = {
  id?: InputMaybe<Scalars['String']>;
  popularPersonals?: InputMaybe<Array<Scalars['Json']>>;
  popularVenues?: InputMaybe<Array<Scalars['Json']>>;
};

export type PopularSearchServiceCreateManyInput = {
  id?: InputMaybe<Scalars['String']>;
  popularPersonals?: InputMaybe<Array<Scalars['Json']>>;
  popularVenues?: InputMaybe<Array<Scalars['Json']>>;
};

export type PopularSearchServiceCreatepopularPersonalsInput = {
  set: Array<Scalars['Json']>;
};

export type PopularSearchServiceCreatepopularVenuesInput = {
  set: Array<Scalars['Json']>;
};

export type PopularSearchServiceMaxOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type PopularSearchServiceMinOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type PopularSearchServiceOrderByWithAggregationInput = {
  _count?: InputMaybe<PopularSearchServiceCountOrderByAggregateInput>;
  _max?: InputMaybe<PopularSearchServiceMaxOrderByAggregateInput>;
  _min?: InputMaybe<PopularSearchServiceMinOrderByAggregateInput>;
  id?: InputMaybe<SortOrder>;
  popularPersonals?: InputMaybe<SortOrder>;
  popularVenues?: InputMaybe<SortOrder>;
};

export type PopularSearchServiceOrderByWithRelationInput = {
  id?: InputMaybe<SortOrder>;
  popularPersonals?: InputMaybe<SortOrder>;
  popularVenues?: InputMaybe<SortOrder>;
};

export enum PopularSearchServiceScalarFieldEnum {
  Id = 'id',
  PopularPersonals = 'popularPersonals',
  PopularVenues = 'popularVenues'
}

export type PopularSearchServiceScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<PopularSearchServiceScalarWhereWithAggregatesInput>>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<PopularSearchServiceScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<PopularSearchServiceScalarWhereWithAggregatesInput>>;
  popularPersonals?: InputMaybe<JsonNullableListFilter>;
  popularVenues?: InputMaybe<JsonNullableListFilter>;
};

export type PopularSearchServiceUpdateInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  popularPersonals?: InputMaybe<Array<Scalars['Json']>>;
  popularVenues?: InputMaybe<Array<Scalars['Json']>>;
};

export type PopularSearchServiceUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  popularPersonals?: InputMaybe<Array<Scalars['Json']>>;
  popularVenues?: InputMaybe<Array<Scalars['Json']>>;
};

export type PopularSearchServiceUpdatepopularPersonalsInput = {
  push?: InputMaybe<Scalars['Json']>;
  set?: InputMaybe<Array<Scalars['Json']>>;
};

export type PopularSearchServiceUpdatepopularVenuesInput = {
  push?: InputMaybe<Scalars['Json']>;
  set?: InputMaybe<Array<Scalars['Json']>>;
};

export type PopularSearchServiceWhereInput = {
  AND?: InputMaybe<Array<PopularSearchServiceWhereInput>>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<PopularSearchServiceWhereInput>>;
  OR?: InputMaybe<Array<PopularSearchServiceWhereInput>>;
  popularPersonals?: InputMaybe<JsonNullableListFilter>;
  popularVenues?: InputMaybe<JsonNullableListFilter>;
};

export type PopularSearchServiceWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

/** Returns the Profile latest Privacy and Terms of Service documents to the client. */
export type PrivacyAndTermsDocumentResponse = {
  __typename?: 'PrivacyAndTermsDocumentResponse';
  privacy: Document;
  termsofservice: Document;
};

export type Profile = {
  __typename?: 'Profile';
  bfsprofileid: Scalars['String'];
  createdAt: Scalars['DateTime'];
  Credentials: Credentials;
  DetailInformation?: Maybe<DetailInformation>;
  id: Scalars['String'];
  IdentifiableInformation?: Maybe<IdentifiableInformation>;
  Personal?: Maybe<Personal>;
  photos?: Maybe<Array<Photo>>;
  profilePhoto?: Maybe<Photo>;
  ProfileType: ProfileType;
  Relationships: Array<Relationship>;
  resentSearches?: Maybe<SearchesService>;
  ThemeManager?: Maybe<ThemeManager>;
  tonightStory?: Maybe<Story>;
  updatedAt: Scalars['DateTime'];
  Venue?: Maybe<Venue>;
};

export type ProfileCountOrderByAggregateInput = {
  bfsprofileid?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  DeviceManager?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  ProfileType?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProfileCreateDeviceManagerInput = {
  set: Array<Scalars['String']>;
};

export type ProfileCreateInput = {
  bfsprofileid?: InputMaybe<Scalars['String']>;
  Chatroom?: InputMaybe<ChatroomCreateNestedManyWithoutProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutProfileInput>;
  DetailInformation?: InputMaybe<DetailInformationCreateNestedOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupCreateNestedManyWithoutProfileInput>;
  id?: InputMaybe<Scalars['String']>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationCreateNestedOneWithoutProfileInput>;
  Notifications?: InputMaybe<NotificationsCreateNestedOneWithoutProfileInput>;
  Personal?: InputMaybe<PersonalCreateNestedOneWithoutProfileInput>;
  Photos?: InputMaybe<PhotoCreateNestedManyWithoutProfileInput>;
  ProfileType?: InputMaybe<ProfileType>;
  Relationships?: InputMaybe<RelationshipCreateNestedManyWithoutProfileInput>;
  SearchesService?: InputMaybe<SearchesServiceCreateNestedOneWithoutProfileInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysCreateNestedManyWithoutProfileInput>;
  Settings?: InputMaybe<SettingsCreateNestedOneWithoutProfileInput>;
  Storys?: InputMaybe<StoryCreateNestedManyWithoutProfileInput>;
  ThemeManager?: InputMaybe<ThemeManagerCreateNestedOneWithoutProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutProfileInput>;
  Vote?: InputMaybe<VoteCreateNestedManyWithoutProfileInput>;
};

export type ProfileCreateManyInput = {
  bfsprofileid?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<Scalars['String']>;
  ProfileType?: InputMaybe<ProfileType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ProfileCreateNestedManyWithoutChatroomInput = {
  connect?: InputMaybe<Array<ProfileWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ProfileCreateOrConnectWithoutChatroomInput>>;
  create?: InputMaybe<Array<ProfileCreateWithoutChatroomInput>>;
};

export type ProfileCreateNestedManyWithoutGroupsInput = {
  connect?: InputMaybe<Array<ProfileWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ProfileCreateOrConnectWithoutGroupsInput>>;
  create?: InputMaybe<Array<ProfileCreateWithoutGroupsInput>>;
};

export type ProfileCreateNestedOneWithoutCredentialsInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutCredentialsInput>;
  create?: InputMaybe<ProfileCreateWithoutCredentialsInput>;
};

export type ProfileCreateNestedOneWithoutDetailInformationInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutDetailInformationInput>;
  create?: InputMaybe<ProfileCreateWithoutDetailInformationInput>;
};

export type ProfileCreateNestedOneWithoutIdentifiableInformationInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutIdentifiableInformationInput>;
  create?: InputMaybe<ProfileCreateWithoutIdentifiableInformationInput>;
};

export type ProfileCreateNestedOneWithoutNotificationsInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutNotificationsInput>;
  create?: InputMaybe<ProfileCreateWithoutNotificationsInput>;
};

export type ProfileCreateNestedOneWithoutPersonalInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutPersonalInput>;
  create?: InputMaybe<ProfileCreateWithoutPersonalInput>;
};

export type ProfileCreateNestedOneWithoutPhotosInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutPhotosInput>;
  create?: InputMaybe<ProfileCreateWithoutPhotosInput>;
};

export type ProfileCreateNestedOneWithoutRelationshipsInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutRelationshipsInput>;
  create?: InputMaybe<ProfileCreateWithoutRelationshipsInput>;
};

export type ProfileCreateNestedOneWithoutSearchesServiceInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutSearchesServiceInput>;
  create?: InputMaybe<ProfileCreateWithoutSearchesServiceInput>;
};

export type ProfileCreateNestedOneWithoutSecuredDataKeysInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutSecuredDataKeysInput>;
  create?: InputMaybe<ProfileCreateWithoutSecuredDataKeysInput>;
};

export type ProfileCreateNestedOneWithoutSettingsInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutSettingsInput>;
  create?: InputMaybe<ProfileCreateWithoutSettingsInput>;
};

export type ProfileCreateNestedOneWithoutStorysInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutStorysInput>;
  create?: InputMaybe<ProfileCreateWithoutStorysInput>;
};

export type ProfileCreateNestedOneWithoutThemeManagerInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutThemeManagerInput>;
  create?: InputMaybe<ProfileCreateWithoutThemeManagerInput>;
};

export type ProfileCreateNestedOneWithoutVenueInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutVenueInput>;
  create?: InputMaybe<ProfileCreateWithoutVenueInput>;
};

export type ProfileCreateNestedOneWithoutVoteInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutVoteInput>;
  create?: InputMaybe<ProfileCreateWithoutVoteInput>;
};

export type ProfileCreateOrConnectWithoutChatroomInput = {
  create: ProfileCreateWithoutChatroomInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileCreateOrConnectWithoutCredentialsInput = {
  create: ProfileCreateWithoutCredentialsInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileCreateOrConnectWithoutDetailInformationInput = {
  create: ProfileCreateWithoutDetailInformationInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileCreateOrConnectWithoutGroupsInput = {
  create: ProfileCreateWithoutGroupsInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileCreateOrConnectWithoutIdentifiableInformationInput = {
  create: ProfileCreateWithoutIdentifiableInformationInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileCreateOrConnectWithoutNotificationsInput = {
  create: ProfileCreateWithoutNotificationsInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileCreateOrConnectWithoutPersonalInput = {
  create: ProfileCreateWithoutPersonalInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileCreateOrConnectWithoutPhotosInput = {
  create: ProfileCreateWithoutPhotosInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileCreateOrConnectWithoutRelationshipsInput = {
  create: ProfileCreateWithoutRelationshipsInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileCreateOrConnectWithoutSearchesServiceInput = {
  create: ProfileCreateWithoutSearchesServiceInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileCreateOrConnectWithoutSecuredDataKeysInput = {
  create: ProfileCreateWithoutSecuredDataKeysInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileCreateOrConnectWithoutSettingsInput = {
  create: ProfileCreateWithoutSettingsInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileCreateOrConnectWithoutStorysInput = {
  create: ProfileCreateWithoutStorysInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileCreateOrConnectWithoutThemeManagerInput = {
  create: ProfileCreateWithoutThemeManagerInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileCreateOrConnectWithoutVenueInput = {
  create: ProfileCreateWithoutVenueInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileCreateOrConnectWithoutVoteInput = {
  create: ProfileCreateWithoutVoteInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileCreateWithoutChatroomInput = {
  bfsprofileid?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutProfileInput>;
  DetailInformation?: InputMaybe<DetailInformationCreateNestedOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupCreateNestedManyWithoutProfileInput>;
  id?: InputMaybe<Scalars['String']>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationCreateNestedOneWithoutProfileInput>;
  Notifications?: InputMaybe<NotificationsCreateNestedOneWithoutProfileInput>;
  Personal?: InputMaybe<PersonalCreateNestedOneWithoutProfileInput>;
  Photos?: InputMaybe<PhotoCreateNestedManyWithoutProfileInput>;
  ProfileType?: InputMaybe<ProfileType>;
  Relationships?: InputMaybe<RelationshipCreateNestedManyWithoutProfileInput>;
  SearchesService?: InputMaybe<SearchesServiceCreateNestedOneWithoutProfileInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysCreateNestedManyWithoutProfileInput>;
  Settings?: InputMaybe<SettingsCreateNestedOneWithoutProfileInput>;
  Storys?: InputMaybe<StoryCreateNestedManyWithoutProfileInput>;
  ThemeManager?: InputMaybe<ThemeManagerCreateNestedOneWithoutProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutProfileInput>;
  Vote?: InputMaybe<VoteCreateNestedManyWithoutProfileInput>;
};

export type ProfileCreateWithoutCredentialsInput = {
  bfsprofileid?: InputMaybe<Scalars['String']>;
  Chatroom?: InputMaybe<ChatroomCreateNestedManyWithoutProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  DetailInformation?: InputMaybe<DetailInformationCreateNestedOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupCreateNestedManyWithoutProfileInput>;
  id?: InputMaybe<Scalars['String']>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationCreateNestedOneWithoutProfileInput>;
  Notifications?: InputMaybe<NotificationsCreateNestedOneWithoutProfileInput>;
  Personal?: InputMaybe<PersonalCreateNestedOneWithoutProfileInput>;
  Photos?: InputMaybe<PhotoCreateNestedManyWithoutProfileInput>;
  ProfileType?: InputMaybe<ProfileType>;
  Relationships?: InputMaybe<RelationshipCreateNestedManyWithoutProfileInput>;
  SearchesService?: InputMaybe<SearchesServiceCreateNestedOneWithoutProfileInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysCreateNestedManyWithoutProfileInput>;
  Settings?: InputMaybe<SettingsCreateNestedOneWithoutProfileInput>;
  Storys?: InputMaybe<StoryCreateNestedManyWithoutProfileInput>;
  ThemeManager?: InputMaybe<ThemeManagerCreateNestedOneWithoutProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutProfileInput>;
  Vote?: InputMaybe<VoteCreateNestedManyWithoutProfileInput>;
};

export type ProfileCreateWithoutDetailInformationInput = {
  bfsprofileid?: InputMaybe<Scalars['String']>;
  Chatroom?: InputMaybe<ChatroomCreateNestedManyWithoutProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupCreateNestedManyWithoutProfileInput>;
  id?: InputMaybe<Scalars['String']>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationCreateNestedOneWithoutProfileInput>;
  Notifications?: InputMaybe<NotificationsCreateNestedOneWithoutProfileInput>;
  Personal?: InputMaybe<PersonalCreateNestedOneWithoutProfileInput>;
  Photos?: InputMaybe<PhotoCreateNestedManyWithoutProfileInput>;
  ProfileType?: InputMaybe<ProfileType>;
  Relationships?: InputMaybe<RelationshipCreateNestedManyWithoutProfileInput>;
  SearchesService?: InputMaybe<SearchesServiceCreateNestedOneWithoutProfileInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysCreateNestedManyWithoutProfileInput>;
  Settings?: InputMaybe<SettingsCreateNestedOneWithoutProfileInput>;
  Storys?: InputMaybe<StoryCreateNestedManyWithoutProfileInput>;
  ThemeManager?: InputMaybe<ThemeManagerCreateNestedOneWithoutProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutProfileInput>;
  Vote?: InputMaybe<VoteCreateNestedManyWithoutProfileInput>;
};

export type ProfileCreateWithoutGroupsInput = {
  bfsprofileid?: InputMaybe<Scalars['String']>;
  Chatroom?: InputMaybe<ChatroomCreateNestedManyWithoutProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutProfileInput>;
  DetailInformation?: InputMaybe<DetailInformationCreateNestedOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<Scalars['String']>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationCreateNestedOneWithoutProfileInput>;
  Notifications?: InputMaybe<NotificationsCreateNestedOneWithoutProfileInput>;
  Personal?: InputMaybe<PersonalCreateNestedOneWithoutProfileInput>;
  Photos?: InputMaybe<PhotoCreateNestedManyWithoutProfileInput>;
  ProfileType?: InputMaybe<ProfileType>;
  Relationships?: InputMaybe<RelationshipCreateNestedManyWithoutProfileInput>;
  SearchesService?: InputMaybe<SearchesServiceCreateNestedOneWithoutProfileInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysCreateNestedManyWithoutProfileInput>;
  Settings?: InputMaybe<SettingsCreateNestedOneWithoutProfileInput>;
  Storys?: InputMaybe<StoryCreateNestedManyWithoutProfileInput>;
  ThemeManager?: InputMaybe<ThemeManagerCreateNestedOneWithoutProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutProfileInput>;
  Vote?: InputMaybe<VoteCreateNestedManyWithoutProfileInput>;
};

export type ProfileCreateWithoutIdentifiableInformationInput = {
  bfsprofileid?: InputMaybe<Scalars['String']>;
  Chatroom?: InputMaybe<ChatroomCreateNestedManyWithoutProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutProfileInput>;
  DetailInformation?: InputMaybe<DetailInformationCreateNestedOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupCreateNestedManyWithoutProfileInput>;
  id?: InputMaybe<Scalars['String']>;
  Notifications?: InputMaybe<NotificationsCreateNestedOneWithoutProfileInput>;
  Personal?: InputMaybe<PersonalCreateNestedOneWithoutProfileInput>;
  Photos?: InputMaybe<PhotoCreateNestedManyWithoutProfileInput>;
  ProfileType?: InputMaybe<ProfileType>;
  Relationships?: InputMaybe<RelationshipCreateNestedManyWithoutProfileInput>;
  SearchesService?: InputMaybe<SearchesServiceCreateNestedOneWithoutProfileInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysCreateNestedManyWithoutProfileInput>;
  Settings?: InputMaybe<SettingsCreateNestedOneWithoutProfileInput>;
  Storys?: InputMaybe<StoryCreateNestedManyWithoutProfileInput>;
  ThemeManager?: InputMaybe<ThemeManagerCreateNestedOneWithoutProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutProfileInput>;
  Vote?: InputMaybe<VoteCreateNestedManyWithoutProfileInput>;
};

export type ProfileCreateWithoutNotificationsInput = {
  bfsprofileid?: InputMaybe<Scalars['String']>;
  Chatroom?: InputMaybe<ChatroomCreateNestedManyWithoutProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutProfileInput>;
  DetailInformation?: InputMaybe<DetailInformationCreateNestedOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupCreateNestedManyWithoutProfileInput>;
  id?: InputMaybe<Scalars['String']>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationCreateNestedOneWithoutProfileInput>;
  Personal?: InputMaybe<PersonalCreateNestedOneWithoutProfileInput>;
  Photos?: InputMaybe<PhotoCreateNestedManyWithoutProfileInput>;
  ProfileType?: InputMaybe<ProfileType>;
  Relationships?: InputMaybe<RelationshipCreateNestedManyWithoutProfileInput>;
  SearchesService?: InputMaybe<SearchesServiceCreateNestedOneWithoutProfileInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysCreateNestedManyWithoutProfileInput>;
  Settings?: InputMaybe<SettingsCreateNestedOneWithoutProfileInput>;
  Storys?: InputMaybe<StoryCreateNestedManyWithoutProfileInput>;
  ThemeManager?: InputMaybe<ThemeManagerCreateNestedOneWithoutProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutProfileInput>;
  Vote?: InputMaybe<VoteCreateNestedManyWithoutProfileInput>;
};

export type ProfileCreateWithoutPersonalInput = {
  bfsprofileid?: InputMaybe<Scalars['String']>;
  Chatroom?: InputMaybe<ChatroomCreateNestedManyWithoutProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutProfileInput>;
  DetailInformation?: InputMaybe<DetailInformationCreateNestedOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupCreateNestedManyWithoutProfileInput>;
  id?: InputMaybe<Scalars['String']>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationCreateNestedOneWithoutProfileInput>;
  Notifications?: InputMaybe<NotificationsCreateNestedOneWithoutProfileInput>;
  Photos?: InputMaybe<PhotoCreateNestedManyWithoutProfileInput>;
  ProfileType?: InputMaybe<ProfileType>;
  Relationships?: InputMaybe<RelationshipCreateNestedManyWithoutProfileInput>;
  SearchesService?: InputMaybe<SearchesServiceCreateNestedOneWithoutProfileInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysCreateNestedManyWithoutProfileInput>;
  Settings?: InputMaybe<SettingsCreateNestedOneWithoutProfileInput>;
  Storys?: InputMaybe<StoryCreateNestedManyWithoutProfileInput>;
  ThemeManager?: InputMaybe<ThemeManagerCreateNestedOneWithoutProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutProfileInput>;
  Vote?: InputMaybe<VoteCreateNestedManyWithoutProfileInput>;
};

export type ProfileCreateWithoutPhotosInput = {
  bfsprofileid?: InputMaybe<Scalars['String']>;
  Chatroom?: InputMaybe<ChatroomCreateNestedManyWithoutProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutProfileInput>;
  DetailInformation?: InputMaybe<DetailInformationCreateNestedOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupCreateNestedManyWithoutProfileInput>;
  id?: InputMaybe<Scalars['String']>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationCreateNestedOneWithoutProfileInput>;
  Notifications?: InputMaybe<NotificationsCreateNestedOneWithoutProfileInput>;
  Personal?: InputMaybe<PersonalCreateNestedOneWithoutProfileInput>;
  ProfileType?: InputMaybe<ProfileType>;
  Relationships?: InputMaybe<RelationshipCreateNestedManyWithoutProfileInput>;
  SearchesService?: InputMaybe<SearchesServiceCreateNestedOneWithoutProfileInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysCreateNestedManyWithoutProfileInput>;
  Settings?: InputMaybe<SettingsCreateNestedOneWithoutProfileInput>;
  Storys?: InputMaybe<StoryCreateNestedManyWithoutProfileInput>;
  ThemeManager?: InputMaybe<ThemeManagerCreateNestedOneWithoutProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutProfileInput>;
  Vote?: InputMaybe<VoteCreateNestedManyWithoutProfileInput>;
};

export type ProfileCreateWithoutRelationshipsInput = {
  bfsprofileid?: InputMaybe<Scalars['String']>;
  Chatroom?: InputMaybe<ChatroomCreateNestedManyWithoutProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutProfileInput>;
  DetailInformation?: InputMaybe<DetailInformationCreateNestedOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupCreateNestedManyWithoutProfileInput>;
  id?: InputMaybe<Scalars['String']>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationCreateNestedOneWithoutProfileInput>;
  Notifications?: InputMaybe<NotificationsCreateNestedOneWithoutProfileInput>;
  Personal?: InputMaybe<PersonalCreateNestedOneWithoutProfileInput>;
  Photos?: InputMaybe<PhotoCreateNestedManyWithoutProfileInput>;
  ProfileType?: InputMaybe<ProfileType>;
  SearchesService?: InputMaybe<SearchesServiceCreateNestedOneWithoutProfileInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysCreateNestedManyWithoutProfileInput>;
  Settings?: InputMaybe<SettingsCreateNestedOneWithoutProfileInput>;
  Storys?: InputMaybe<StoryCreateNestedManyWithoutProfileInput>;
  ThemeManager?: InputMaybe<ThemeManagerCreateNestedOneWithoutProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutProfileInput>;
  Vote?: InputMaybe<VoteCreateNestedManyWithoutProfileInput>;
};

export type ProfileCreateWithoutSearchesServiceInput = {
  bfsprofileid?: InputMaybe<Scalars['String']>;
  Chatroom?: InputMaybe<ChatroomCreateNestedManyWithoutProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutProfileInput>;
  DetailInformation?: InputMaybe<DetailInformationCreateNestedOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupCreateNestedManyWithoutProfileInput>;
  id?: InputMaybe<Scalars['String']>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationCreateNestedOneWithoutProfileInput>;
  Notifications?: InputMaybe<NotificationsCreateNestedOneWithoutProfileInput>;
  Personal?: InputMaybe<PersonalCreateNestedOneWithoutProfileInput>;
  Photos?: InputMaybe<PhotoCreateNestedManyWithoutProfileInput>;
  ProfileType?: InputMaybe<ProfileType>;
  Relationships?: InputMaybe<RelationshipCreateNestedManyWithoutProfileInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysCreateNestedManyWithoutProfileInput>;
  Settings?: InputMaybe<SettingsCreateNestedOneWithoutProfileInput>;
  Storys?: InputMaybe<StoryCreateNestedManyWithoutProfileInput>;
  ThemeManager?: InputMaybe<ThemeManagerCreateNestedOneWithoutProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutProfileInput>;
  Vote?: InputMaybe<VoteCreateNestedManyWithoutProfileInput>;
};

export type ProfileCreateWithoutSecuredDataKeysInput = {
  bfsprofileid?: InputMaybe<Scalars['String']>;
  Chatroom?: InputMaybe<ChatroomCreateNestedManyWithoutProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutProfileInput>;
  DetailInformation?: InputMaybe<DetailInformationCreateNestedOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupCreateNestedManyWithoutProfileInput>;
  id?: InputMaybe<Scalars['String']>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationCreateNestedOneWithoutProfileInput>;
  Notifications?: InputMaybe<NotificationsCreateNestedOneWithoutProfileInput>;
  Personal?: InputMaybe<PersonalCreateNestedOneWithoutProfileInput>;
  Photos?: InputMaybe<PhotoCreateNestedManyWithoutProfileInput>;
  ProfileType?: InputMaybe<ProfileType>;
  Relationships?: InputMaybe<RelationshipCreateNestedManyWithoutProfileInput>;
  SearchesService?: InputMaybe<SearchesServiceCreateNestedOneWithoutProfileInput>;
  Settings?: InputMaybe<SettingsCreateNestedOneWithoutProfileInput>;
  Storys?: InputMaybe<StoryCreateNestedManyWithoutProfileInput>;
  ThemeManager?: InputMaybe<ThemeManagerCreateNestedOneWithoutProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutProfileInput>;
  Vote?: InputMaybe<VoteCreateNestedManyWithoutProfileInput>;
};

export type ProfileCreateWithoutSettingsInput = {
  bfsprofileid?: InputMaybe<Scalars['String']>;
  Chatroom?: InputMaybe<ChatroomCreateNestedManyWithoutProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutProfileInput>;
  DetailInformation?: InputMaybe<DetailInformationCreateNestedOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupCreateNestedManyWithoutProfileInput>;
  id?: InputMaybe<Scalars['String']>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationCreateNestedOneWithoutProfileInput>;
  Notifications?: InputMaybe<NotificationsCreateNestedOneWithoutProfileInput>;
  Personal?: InputMaybe<PersonalCreateNestedOneWithoutProfileInput>;
  Photos?: InputMaybe<PhotoCreateNestedManyWithoutProfileInput>;
  ProfileType?: InputMaybe<ProfileType>;
  Relationships?: InputMaybe<RelationshipCreateNestedManyWithoutProfileInput>;
  SearchesService?: InputMaybe<SearchesServiceCreateNestedOneWithoutProfileInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysCreateNestedManyWithoutProfileInput>;
  Storys?: InputMaybe<StoryCreateNestedManyWithoutProfileInput>;
  ThemeManager?: InputMaybe<ThemeManagerCreateNestedOneWithoutProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutProfileInput>;
  Vote?: InputMaybe<VoteCreateNestedManyWithoutProfileInput>;
};

export type ProfileCreateWithoutStorysInput = {
  bfsprofileid?: InputMaybe<Scalars['String']>;
  Chatroom?: InputMaybe<ChatroomCreateNestedManyWithoutProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutProfileInput>;
  DetailInformation?: InputMaybe<DetailInformationCreateNestedOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupCreateNestedManyWithoutProfileInput>;
  id?: InputMaybe<Scalars['String']>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationCreateNestedOneWithoutProfileInput>;
  Notifications?: InputMaybe<NotificationsCreateNestedOneWithoutProfileInput>;
  Personal?: InputMaybe<PersonalCreateNestedOneWithoutProfileInput>;
  Photos?: InputMaybe<PhotoCreateNestedManyWithoutProfileInput>;
  ProfileType?: InputMaybe<ProfileType>;
  Relationships?: InputMaybe<RelationshipCreateNestedManyWithoutProfileInput>;
  SearchesService?: InputMaybe<SearchesServiceCreateNestedOneWithoutProfileInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysCreateNestedManyWithoutProfileInput>;
  Settings?: InputMaybe<SettingsCreateNestedOneWithoutProfileInput>;
  ThemeManager?: InputMaybe<ThemeManagerCreateNestedOneWithoutProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutProfileInput>;
  Vote?: InputMaybe<VoteCreateNestedManyWithoutProfileInput>;
};

export type ProfileCreateWithoutThemeManagerInput = {
  bfsprofileid?: InputMaybe<Scalars['String']>;
  Chatroom?: InputMaybe<ChatroomCreateNestedManyWithoutProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutProfileInput>;
  DetailInformation?: InputMaybe<DetailInformationCreateNestedOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupCreateNestedManyWithoutProfileInput>;
  id?: InputMaybe<Scalars['String']>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationCreateNestedOneWithoutProfileInput>;
  Notifications?: InputMaybe<NotificationsCreateNestedOneWithoutProfileInput>;
  Personal?: InputMaybe<PersonalCreateNestedOneWithoutProfileInput>;
  Photos?: InputMaybe<PhotoCreateNestedManyWithoutProfileInput>;
  ProfileType?: InputMaybe<ProfileType>;
  Relationships?: InputMaybe<RelationshipCreateNestedManyWithoutProfileInput>;
  SearchesService?: InputMaybe<SearchesServiceCreateNestedOneWithoutProfileInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysCreateNestedManyWithoutProfileInput>;
  Settings?: InputMaybe<SettingsCreateNestedOneWithoutProfileInput>;
  Storys?: InputMaybe<StoryCreateNestedManyWithoutProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutProfileInput>;
  Vote?: InputMaybe<VoteCreateNestedManyWithoutProfileInput>;
};

export type ProfileCreateWithoutVenueInput = {
  bfsprofileid?: InputMaybe<Scalars['String']>;
  Chatroom?: InputMaybe<ChatroomCreateNestedManyWithoutProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutProfileInput>;
  DetailInformation?: InputMaybe<DetailInformationCreateNestedOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupCreateNestedManyWithoutProfileInput>;
  id?: InputMaybe<Scalars['String']>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationCreateNestedOneWithoutProfileInput>;
  Notifications?: InputMaybe<NotificationsCreateNestedOneWithoutProfileInput>;
  Personal?: InputMaybe<PersonalCreateNestedOneWithoutProfileInput>;
  Photos?: InputMaybe<PhotoCreateNestedManyWithoutProfileInput>;
  ProfileType?: InputMaybe<ProfileType>;
  Relationships?: InputMaybe<RelationshipCreateNestedManyWithoutProfileInput>;
  SearchesService?: InputMaybe<SearchesServiceCreateNestedOneWithoutProfileInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysCreateNestedManyWithoutProfileInput>;
  Settings?: InputMaybe<SettingsCreateNestedOneWithoutProfileInput>;
  Storys?: InputMaybe<StoryCreateNestedManyWithoutProfileInput>;
  ThemeManager?: InputMaybe<ThemeManagerCreateNestedOneWithoutProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Vote?: InputMaybe<VoteCreateNestedManyWithoutProfileInput>;
};

export type ProfileCreateWithoutVoteInput = {
  bfsprofileid?: InputMaybe<Scalars['String']>;
  Chatroom?: InputMaybe<ChatroomCreateNestedManyWithoutProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutProfileInput>;
  DetailInformation?: InputMaybe<DetailInformationCreateNestedOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupCreateNestedManyWithoutProfileInput>;
  id?: InputMaybe<Scalars['String']>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationCreateNestedOneWithoutProfileInput>;
  Notifications?: InputMaybe<NotificationsCreateNestedOneWithoutProfileInput>;
  Personal?: InputMaybe<PersonalCreateNestedOneWithoutProfileInput>;
  Photos?: InputMaybe<PhotoCreateNestedManyWithoutProfileInput>;
  ProfileType?: InputMaybe<ProfileType>;
  Relationships?: InputMaybe<RelationshipCreateNestedManyWithoutProfileInput>;
  SearchesService?: InputMaybe<SearchesServiceCreateNestedOneWithoutProfileInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysCreateNestedManyWithoutProfileInput>;
  Settings?: InputMaybe<SettingsCreateNestedOneWithoutProfileInput>;
  Storys?: InputMaybe<StoryCreateNestedManyWithoutProfileInput>;
  ThemeManager?: InputMaybe<ThemeManagerCreateNestedOneWithoutProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutProfileInput>;
};

export type ProfileListRelationFilter = {
  every?: InputMaybe<ProfileWhereInput>;
  none?: InputMaybe<ProfileWhereInput>;
  some?: InputMaybe<ProfileWhereInput>;
};

export type ProfileMaxOrderByAggregateInput = {
  bfsprofileid?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  ProfileType?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProfileMinOrderByAggregateInput = {
  bfsprofileid?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  ProfileType?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProfileOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ProfileOrderByWithAggregationInput = {
  _count?: InputMaybe<ProfileCountOrderByAggregateInput>;
  _max?: InputMaybe<ProfileMaxOrderByAggregateInput>;
  _min?: InputMaybe<ProfileMinOrderByAggregateInput>;
  bfsprofileid?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  DeviceManager?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  ProfileType?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProfileOrderByWithRelationInput = {
  bfsprofileid?: InputMaybe<SortOrder>;
  Chatroom?: InputMaybe<ChatroomOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  Credentials?: InputMaybe<CredentialsOrderByWithRelationInput>;
  DetailInformation?: InputMaybe<DetailInformationOrderByWithRelationInput>;
  DeviceManager?: InputMaybe<SortOrder>;
  Groups?: InputMaybe<GroupOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationOrderByWithRelationInput>;
  Notifications?: InputMaybe<NotificationsOrderByWithRelationInput>;
  Personal?: InputMaybe<PersonalOrderByWithRelationInput>;
  Photos?: InputMaybe<PhotoOrderByRelationAggregateInput>;
  ProfileType?: InputMaybe<SortOrder>;
  Relationships?: InputMaybe<RelationshipOrderByRelationAggregateInput>;
  SearchesService?: InputMaybe<SearchesServiceOrderByWithRelationInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysOrderByRelationAggregateInput>;
  Settings?: InputMaybe<SettingsOrderByWithRelationInput>;
  Storys?: InputMaybe<StoryOrderByRelationAggregateInput>;
  ThemeManager?: InputMaybe<ThemeManagerOrderByWithRelationInput>;
  updatedAt?: InputMaybe<SortOrder>;
  Venue?: InputMaybe<VenueOrderByWithRelationInput>;
  Vote?: InputMaybe<VoteOrderByRelationAggregateInput>;
};

export type ProfilePersonal = {
  __typename?: 'ProfilePersonal';
  bfsprofileid: Scalars['String'];
  createdAt: Scalars['DateTime'];
  Credentials: Credentials;
  DetailInformation?: Maybe<DetailInformation>;
  id: Scalars['String'];
  IdentifiableInformation?: Maybe<IdentifiableInformation>;
  photos: Array<Photo>;
  profilePhoto?: Maybe<Photo>;
  ProfileType: ProfileType;
  Relationships: Array<Relationship>;
  resentSearches?: Maybe<SearchesService>;
  ThemeManager?: Maybe<ThemeManager>;
  tonightStory?: Maybe<Story>;
  updatedAt: Scalars['DateTime'];
};

export type ProfileRelationFilter = {
  is?: InputMaybe<ProfileWhereInput>;
  isNot?: InputMaybe<ProfileWhereInput>;
};

export enum ProfileScalarFieldEnum {
  Bfsprofileid = 'bfsprofileid',
  CreatedAt = 'createdAt',
  DeviceManager = 'DeviceManager',
  Id = 'id',
  ProfileType = 'ProfileType',
  UpdatedAt = 'updatedAt'
}

export type ProfileScalarWhereInput = {
  AND?: InputMaybe<Array<ProfileScalarWhereInput>>;
  bfsprofileid?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  DeviceManager?: InputMaybe<StringNullableListFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<ProfileScalarWhereInput>>;
  OR?: InputMaybe<Array<ProfileScalarWhereInput>>;
  ProfileType?: InputMaybe<EnumProfileTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ProfileScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<ProfileScalarWhereWithAggregatesInput>>;
  bfsprofileid?: InputMaybe<StringWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  DeviceManager?: InputMaybe<StringNullableListFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<ProfileScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<ProfileScalarWhereWithAggregatesInput>>;
  ProfileType?: InputMaybe<EnumProfileTypeWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type ProfilesResponse = {
  __typename?: 'ProfilesResponse';
  email: Array<Profile>;
  phone: Array<Profile>;
  username: Array<Profile>;
};

export type ProfileTheme = {
  __typename?: 'ProfileTheme';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  Theme: Theme;
  themeId: Scalars['String'];
  ThemeManager: ThemeManager;
  themeManagerId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type ProfileThemeCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  themeId?: InputMaybe<SortOrder>;
  themeManagerId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProfileThemeCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  Theme: ThemeCreateNestedOneWithoutProfileThemeInput;
  ThemeManager?: InputMaybe<ThemeManagerCreateNestedOneWithoutProfileThemeInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ProfileThemeCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  themeId: Scalars['String'];
  themeManagerId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ProfileThemeCreateManyThemeInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  themeManagerId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ProfileThemeCreateManyThemeInputEnvelope = {
  data: Array<ProfileThemeCreateManyThemeInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ProfileThemeCreateManyThemeManagerInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  themeId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ProfileThemeCreateManyThemeManagerInputEnvelope = {
  data: Array<ProfileThemeCreateManyThemeManagerInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ProfileThemeCreateNestedManyWithoutThemeInput = {
  connect?: InputMaybe<Array<ProfileThemeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ProfileThemeCreateOrConnectWithoutThemeInput>>;
  create?: InputMaybe<Array<ProfileThemeCreateWithoutThemeInput>>;
  createMany?: InputMaybe<ProfileThemeCreateManyThemeInputEnvelope>;
};

export type ProfileThemeCreateNestedManyWithoutThemeManagerInput = {
  connect?: InputMaybe<Array<ProfileThemeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ProfileThemeCreateOrConnectWithoutThemeManagerInput>>;
  create?: InputMaybe<Array<ProfileThemeCreateWithoutThemeManagerInput>>;
  createMany?: InputMaybe<ProfileThemeCreateManyThemeManagerInputEnvelope>;
};

export type ProfileThemeCreateOrConnectWithoutThemeInput = {
  create: ProfileThemeCreateWithoutThemeInput;
  where: ProfileThemeWhereUniqueInput;
};

export type ProfileThemeCreateOrConnectWithoutThemeManagerInput = {
  create: ProfileThemeCreateWithoutThemeManagerInput;
  where: ProfileThemeWhereUniqueInput;
};

export type ProfileThemeCreateWithoutThemeInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  ThemeManager?: InputMaybe<ThemeManagerCreateNestedOneWithoutProfileThemeInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ProfileThemeCreateWithoutThemeManagerInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  Theme: ThemeCreateNestedOneWithoutProfileThemeInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ProfileThemeListRelationFilter = {
  every?: InputMaybe<ProfileThemeWhereInput>;
  none?: InputMaybe<ProfileThemeWhereInput>;
  some?: InputMaybe<ProfileThemeWhereInput>;
};

export type ProfileThemeMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  themeId?: InputMaybe<SortOrder>;
  themeManagerId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProfileThemeMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  themeId?: InputMaybe<SortOrder>;
  themeManagerId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProfileThemeOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ProfileThemeOrderByWithAggregationInput = {
  _count?: InputMaybe<ProfileThemeCountOrderByAggregateInput>;
  _max?: InputMaybe<ProfileThemeMaxOrderByAggregateInput>;
  _min?: InputMaybe<ProfileThemeMinOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  themeId?: InputMaybe<SortOrder>;
  themeManagerId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProfileThemeOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  Theme?: InputMaybe<ThemeOrderByWithRelationInput>;
  themeId?: InputMaybe<SortOrder>;
  ThemeManager?: InputMaybe<ThemeManagerOrderByWithRelationInput>;
  themeManagerId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum ProfileThemeScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  IsActive = 'isActive',
  ThemeId = 'themeId',
  ThemeManagerId = 'themeManagerId',
  UpdatedAt = 'updatedAt'
}

export type ProfileThemeScalarWhereInput = {
  AND?: InputMaybe<Array<ProfileThemeScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  NOT?: InputMaybe<Array<ProfileThemeScalarWhereInput>>;
  OR?: InputMaybe<Array<ProfileThemeScalarWhereInput>>;
  themeId?: InputMaybe<StringFilter>;
  themeManagerId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ProfileThemeScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<ProfileThemeScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  isActive?: InputMaybe<BoolWithAggregatesFilter>;
  NOT?: InputMaybe<Array<ProfileThemeScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<ProfileThemeScalarWhereWithAggregatesInput>>;
  themeId?: InputMaybe<StringWithAggregatesFilter>;
  themeManagerId?: InputMaybe<StringNullableWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type ProfileThemeUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  Theme?: InputMaybe<ThemeUpdateOneRequiredWithoutProfileThemeNestedInput>;
  ThemeManager?: InputMaybe<ThemeManagerUpdateOneWithoutProfileThemeNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ProfileThemeUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ProfileThemeUpdateManyWithoutThemeManagerNestedInput = {
  connect?: InputMaybe<Array<ProfileThemeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ProfileThemeCreateOrConnectWithoutThemeManagerInput>>;
  create?: InputMaybe<Array<ProfileThemeCreateWithoutThemeManagerInput>>;
  createMany?: InputMaybe<ProfileThemeCreateManyThemeManagerInputEnvelope>;
  delete?: InputMaybe<Array<ProfileThemeWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ProfileThemeScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ProfileThemeWhereUniqueInput>>;
  set?: InputMaybe<Array<ProfileThemeWhereUniqueInput>>;
  update?: InputMaybe<Array<ProfileThemeUpdateWithWhereUniqueWithoutThemeManagerInput>>;
  updateMany?: InputMaybe<Array<ProfileThemeUpdateManyWithWhereWithoutThemeManagerInput>>;
  upsert?: InputMaybe<Array<ProfileThemeUpsertWithWhereUniqueWithoutThemeManagerInput>>;
};

export type ProfileThemeUpdateManyWithoutThemeNestedInput = {
  connect?: InputMaybe<Array<ProfileThemeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ProfileThemeCreateOrConnectWithoutThemeInput>>;
  create?: InputMaybe<Array<ProfileThemeCreateWithoutThemeInput>>;
  createMany?: InputMaybe<ProfileThemeCreateManyThemeInputEnvelope>;
  delete?: InputMaybe<Array<ProfileThemeWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ProfileThemeScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ProfileThemeWhereUniqueInput>>;
  set?: InputMaybe<Array<ProfileThemeWhereUniqueInput>>;
  update?: InputMaybe<Array<ProfileThemeUpdateWithWhereUniqueWithoutThemeInput>>;
  updateMany?: InputMaybe<Array<ProfileThemeUpdateManyWithWhereWithoutThemeInput>>;
  upsert?: InputMaybe<Array<ProfileThemeUpsertWithWhereUniqueWithoutThemeInput>>;
};

export type ProfileThemeUpdateManyWithWhereWithoutThemeInput = {
  data: ProfileThemeUpdateManyMutationInput;
  where: ProfileThemeScalarWhereInput;
};

export type ProfileThemeUpdateManyWithWhereWithoutThemeManagerInput = {
  data: ProfileThemeUpdateManyMutationInput;
  where: ProfileThemeScalarWhereInput;
};

export type ProfileThemeUpdateWithoutThemeInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  ThemeManager?: InputMaybe<ThemeManagerUpdateOneWithoutProfileThemeNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ProfileThemeUpdateWithoutThemeManagerInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  Theme?: InputMaybe<ThemeUpdateOneRequiredWithoutProfileThemeNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ProfileThemeUpdateWithWhereUniqueWithoutThemeInput = {
  data: ProfileThemeUpdateWithoutThemeInput;
  where: ProfileThemeWhereUniqueInput;
};

export type ProfileThemeUpdateWithWhereUniqueWithoutThemeManagerInput = {
  data: ProfileThemeUpdateWithoutThemeManagerInput;
  where: ProfileThemeWhereUniqueInput;
};

export type ProfileThemeUpsertWithWhereUniqueWithoutThemeInput = {
  create: ProfileThemeCreateWithoutThemeInput;
  update: ProfileThemeUpdateWithoutThemeInput;
  where: ProfileThemeWhereUniqueInput;
};

export type ProfileThemeUpsertWithWhereUniqueWithoutThemeManagerInput = {
  create: ProfileThemeCreateWithoutThemeManagerInput;
  update: ProfileThemeUpdateWithoutThemeManagerInput;
  where: ProfileThemeWhereUniqueInput;
};

export type ProfileThemeWhereInput = {
  AND?: InputMaybe<Array<ProfileThemeWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  NOT?: InputMaybe<Array<ProfileThemeWhereInput>>;
  OR?: InputMaybe<Array<ProfileThemeWhereInput>>;
  Theme?: InputMaybe<ThemeWhereInput>;
  themeId?: InputMaybe<StringFilter>;
  ThemeManager?: InputMaybe<ThemeManagerWhereInput>;
  themeManagerId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ProfileThemeWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export enum ProfileType {
  Guest = 'GUEST',
  Personal = 'PERSONAL',
  Venue = 'VENUE'
}

export type ProfileUpdateDeviceManagerInput = {
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type ProfileUpdateInput = {
  bfsprofileid?: InputMaybe<StringFieldUpdateOperationsInput>;
  Chatroom?: InputMaybe<ChatroomUpdateManyWithoutProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutProfileNestedInput>;
  DetailInformation?: InputMaybe<DetailInformationUpdateOneWithoutProfileNestedInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupUpdateManyWithoutProfileNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationUpdateOneWithoutProfileNestedInput>;
  Notifications?: InputMaybe<NotificationsUpdateOneWithoutProfileNestedInput>;
  Personal?: InputMaybe<PersonalUpdateOneWithoutProfileNestedInput>;
  Photos?: InputMaybe<PhotoUpdateManyWithoutProfileNestedInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  Relationships?: InputMaybe<RelationshipUpdateManyWithoutProfileNestedInput>;
  SearchesService?: InputMaybe<SearchesServiceUpdateOneWithoutProfileNestedInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysUpdateManyWithoutProfileNestedInput>;
  Settings?: InputMaybe<SettingsUpdateOneWithoutProfileNestedInput>;
  Storys?: InputMaybe<StoryUpdateManyWithoutProfileNestedInput>;
  ThemeManager?: InputMaybe<ThemeManagerUpdateOneWithoutProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutProfileNestedInput>;
  Vote?: InputMaybe<VoteUpdateManyWithoutProfileNestedInput>;
};

export type ProfileUpdateManyMutationInput = {
  bfsprofileid?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ProfileUpdateManyWithoutChatroomNestedInput = {
  connect?: InputMaybe<Array<ProfileWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ProfileCreateOrConnectWithoutChatroomInput>>;
  create?: InputMaybe<Array<ProfileCreateWithoutChatroomInput>>;
  delete?: InputMaybe<Array<ProfileWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ProfileScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ProfileWhereUniqueInput>>;
  set?: InputMaybe<Array<ProfileWhereUniqueInput>>;
  update?: InputMaybe<Array<ProfileUpdateWithWhereUniqueWithoutChatroomInput>>;
  updateMany?: InputMaybe<Array<ProfileUpdateManyWithWhereWithoutChatroomInput>>;
  upsert?: InputMaybe<Array<ProfileUpsertWithWhereUniqueWithoutChatroomInput>>;
};

export type ProfileUpdateManyWithoutGroupsNestedInput = {
  connect?: InputMaybe<Array<ProfileWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ProfileCreateOrConnectWithoutGroupsInput>>;
  create?: InputMaybe<Array<ProfileCreateWithoutGroupsInput>>;
  delete?: InputMaybe<Array<ProfileWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ProfileScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ProfileWhereUniqueInput>>;
  set?: InputMaybe<Array<ProfileWhereUniqueInput>>;
  update?: InputMaybe<Array<ProfileUpdateWithWhereUniqueWithoutGroupsInput>>;
  updateMany?: InputMaybe<Array<ProfileUpdateManyWithWhereWithoutGroupsInput>>;
  upsert?: InputMaybe<Array<ProfileUpsertWithWhereUniqueWithoutGroupsInput>>;
};

export type ProfileUpdateManyWithWhereWithoutChatroomInput = {
  data: ProfileUpdateManyMutationInput;
  where: ProfileScalarWhereInput;
};

export type ProfileUpdateManyWithWhereWithoutGroupsInput = {
  data: ProfileUpdateManyMutationInput;
  where: ProfileScalarWhereInput;
};

export type ProfileUpdateOneRequiredWithoutCredentialsNestedInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutCredentialsInput>;
  create?: InputMaybe<ProfileCreateWithoutCredentialsInput>;
  update?: InputMaybe<ProfileUpdateWithoutCredentialsInput>;
  upsert?: InputMaybe<ProfileUpsertWithoutCredentialsInput>;
};

export type ProfileUpdateOneRequiredWithoutDetailInformationNestedInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutDetailInformationInput>;
  create?: InputMaybe<ProfileCreateWithoutDetailInformationInput>;
  update?: InputMaybe<ProfileUpdateWithoutDetailInformationInput>;
  upsert?: InputMaybe<ProfileUpsertWithoutDetailInformationInput>;
};

export type ProfileUpdateOneRequiredWithoutIdentifiableInformationNestedInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutIdentifiableInformationInput>;
  create?: InputMaybe<ProfileCreateWithoutIdentifiableInformationInput>;
  update?: InputMaybe<ProfileUpdateWithoutIdentifiableInformationInput>;
  upsert?: InputMaybe<ProfileUpsertWithoutIdentifiableInformationInput>;
};

export type ProfileUpdateOneRequiredWithoutNotificationsNestedInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutNotificationsInput>;
  create?: InputMaybe<ProfileCreateWithoutNotificationsInput>;
  update?: InputMaybe<ProfileUpdateWithoutNotificationsInput>;
  upsert?: InputMaybe<ProfileUpsertWithoutNotificationsInput>;
};

export type ProfileUpdateOneRequiredWithoutPersonalNestedInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutPersonalInput>;
  create?: InputMaybe<ProfileCreateWithoutPersonalInput>;
  update?: InputMaybe<ProfileUpdateWithoutPersonalInput>;
  upsert?: InputMaybe<ProfileUpsertWithoutPersonalInput>;
};

export type ProfileUpdateOneRequiredWithoutSearchesServiceNestedInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutSearchesServiceInput>;
  create?: InputMaybe<ProfileCreateWithoutSearchesServiceInput>;
  update?: InputMaybe<ProfileUpdateWithoutSearchesServiceInput>;
  upsert?: InputMaybe<ProfileUpsertWithoutSearchesServiceInput>;
};

export type ProfileUpdateOneRequiredWithoutSecuredDataKeysNestedInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutSecuredDataKeysInput>;
  create?: InputMaybe<ProfileCreateWithoutSecuredDataKeysInput>;
  update?: InputMaybe<ProfileUpdateWithoutSecuredDataKeysInput>;
  upsert?: InputMaybe<ProfileUpsertWithoutSecuredDataKeysInput>;
};

export type ProfileUpdateOneRequiredWithoutSettingsNestedInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutSettingsInput>;
  create?: InputMaybe<ProfileCreateWithoutSettingsInput>;
  update?: InputMaybe<ProfileUpdateWithoutSettingsInput>;
  upsert?: InputMaybe<ProfileUpsertWithoutSettingsInput>;
};

export type ProfileUpdateOneRequiredWithoutThemeManagerNestedInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutThemeManagerInput>;
  create?: InputMaybe<ProfileCreateWithoutThemeManagerInput>;
  update?: InputMaybe<ProfileUpdateWithoutThemeManagerInput>;
  upsert?: InputMaybe<ProfileUpsertWithoutThemeManagerInput>;
};

export type ProfileUpdateOneRequiredWithoutVenueNestedInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutVenueInput>;
  create?: InputMaybe<ProfileCreateWithoutVenueInput>;
  update?: InputMaybe<ProfileUpdateWithoutVenueInput>;
  upsert?: InputMaybe<ProfileUpsertWithoutVenueInput>;
};

export type ProfileUpdateOneRequiredWithoutVoteNestedInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutVoteInput>;
  create?: InputMaybe<ProfileCreateWithoutVoteInput>;
  update?: InputMaybe<ProfileUpdateWithoutVoteInput>;
  upsert?: InputMaybe<ProfileUpsertWithoutVoteInput>;
};

export type ProfileUpdateOneWithoutPhotosNestedInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutPhotosInput>;
  create?: InputMaybe<ProfileCreateWithoutPhotosInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<ProfileUpdateWithoutPhotosInput>;
  upsert?: InputMaybe<ProfileUpsertWithoutPhotosInput>;
};

export type ProfileUpdateOneWithoutRelationshipsNestedInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutRelationshipsInput>;
  create?: InputMaybe<ProfileCreateWithoutRelationshipsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<ProfileUpdateWithoutRelationshipsInput>;
  upsert?: InputMaybe<ProfileUpsertWithoutRelationshipsInput>;
};

export type ProfileUpdateOneWithoutStorysNestedInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutStorysInput>;
  create?: InputMaybe<ProfileCreateWithoutStorysInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<ProfileUpdateWithoutStorysInput>;
  upsert?: InputMaybe<ProfileUpsertWithoutStorysInput>;
};

export type ProfileUpdateWithoutChatroomInput = {
  bfsprofileid?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutProfileNestedInput>;
  DetailInformation?: InputMaybe<DetailInformationUpdateOneWithoutProfileNestedInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupUpdateManyWithoutProfileNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationUpdateOneWithoutProfileNestedInput>;
  Notifications?: InputMaybe<NotificationsUpdateOneWithoutProfileNestedInput>;
  Personal?: InputMaybe<PersonalUpdateOneWithoutProfileNestedInput>;
  Photos?: InputMaybe<PhotoUpdateManyWithoutProfileNestedInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  Relationships?: InputMaybe<RelationshipUpdateManyWithoutProfileNestedInput>;
  SearchesService?: InputMaybe<SearchesServiceUpdateOneWithoutProfileNestedInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysUpdateManyWithoutProfileNestedInput>;
  Settings?: InputMaybe<SettingsUpdateOneWithoutProfileNestedInput>;
  Storys?: InputMaybe<StoryUpdateManyWithoutProfileNestedInput>;
  ThemeManager?: InputMaybe<ThemeManagerUpdateOneWithoutProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutProfileNestedInput>;
  Vote?: InputMaybe<VoteUpdateManyWithoutProfileNestedInput>;
};

export type ProfileUpdateWithoutCredentialsInput = {
  bfsprofileid?: InputMaybe<StringFieldUpdateOperationsInput>;
  Chatroom?: InputMaybe<ChatroomUpdateManyWithoutProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  DetailInformation?: InputMaybe<DetailInformationUpdateOneWithoutProfileNestedInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupUpdateManyWithoutProfileNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationUpdateOneWithoutProfileNestedInput>;
  Notifications?: InputMaybe<NotificationsUpdateOneWithoutProfileNestedInput>;
  Personal?: InputMaybe<PersonalUpdateOneWithoutProfileNestedInput>;
  Photos?: InputMaybe<PhotoUpdateManyWithoutProfileNestedInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  Relationships?: InputMaybe<RelationshipUpdateManyWithoutProfileNestedInput>;
  SearchesService?: InputMaybe<SearchesServiceUpdateOneWithoutProfileNestedInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysUpdateManyWithoutProfileNestedInput>;
  Settings?: InputMaybe<SettingsUpdateOneWithoutProfileNestedInput>;
  Storys?: InputMaybe<StoryUpdateManyWithoutProfileNestedInput>;
  ThemeManager?: InputMaybe<ThemeManagerUpdateOneWithoutProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutProfileNestedInput>;
  Vote?: InputMaybe<VoteUpdateManyWithoutProfileNestedInput>;
};

export type ProfileUpdateWithoutDetailInformationInput = {
  bfsprofileid?: InputMaybe<StringFieldUpdateOperationsInput>;
  Chatroom?: InputMaybe<ChatroomUpdateManyWithoutProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutProfileNestedInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupUpdateManyWithoutProfileNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationUpdateOneWithoutProfileNestedInput>;
  Notifications?: InputMaybe<NotificationsUpdateOneWithoutProfileNestedInput>;
  Personal?: InputMaybe<PersonalUpdateOneWithoutProfileNestedInput>;
  Photos?: InputMaybe<PhotoUpdateManyWithoutProfileNestedInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  Relationships?: InputMaybe<RelationshipUpdateManyWithoutProfileNestedInput>;
  SearchesService?: InputMaybe<SearchesServiceUpdateOneWithoutProfileNestedInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysUpdateManyWithoutProfileNestedInput>;
  Settings?: InputMaybe<SettingsUpdateOneWithoutProfileNestedInput>;
  Storys?: InputMaybe<StoryUpdateManyWithoutProfileNestedInput>;
  ThemeManager?: InputMaybe<ThemeManagerUpdateOneWithoutProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutProfileNestedInput>;
  Vote?: InputMaybe<VoteUpdateManyWithoutProfileNestedInput>;
};

export type ProfileUpdateWithoutGroupsInput = {
  bfsprofileid?: InputMaybe<StringFieldUpdateOperationsInput>;
  Chatroom?: InputMaybe<ChatroomUpdateManyWithoutProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutProfileNestedInput>;
  DetailInformation?: InputMaybe<DetailInformationUpdateOneWithoutProfileNestedInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationUpdateOneWithoutProfileNestedInput>;
  Notifications?: InputMaybe<NotificationsUpdateOneWithoutProfileNestedInput>;
  Personal?: InputMaybe<PersonalUpdateOneWithoutProfileNestedInput>;
  Photos?: InputMaybe<PhotoUpdateManyWithoutProfileNestedInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  Relationships?: InputMaybe<RelationshipUpdateManyWithoutProfileNestedInput>;
  SearchesService?: InputMaybe<SearchesServiceUpdateOneWithoutProfileNestedInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysUpdateManyWithoutProfileNestedInput>;
  Settings?: InputMaybe<SettingsUpdateOneWithoutProfileNestedInput>;
  Storys?: InputMaybe<StoryUpdateManyWithoutProfileNestedInput>;
  ThemeManager?: InputMaybe<ThemeManagerUpdateOneWithoutProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutProfileNestedInput>;
  Vote?: InputMaybe<VoteUpdateManyWithoutProfileNestedInput>;
};

export type ProfileUpdateWithoutIdentifiableInformationInput = {
  bfsprofileid?: InputMaybe<StringFieldUpdateOperationsInput>;
  Chatroom?: InputMaybe<ChatroomUpdateManyWithoutProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutProfileNestedInput>;
  DetailInformation?: InputMaybe<DetailInformationUpdateOneWithoutProfileNestedInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupUpdateManyWithoutProfileNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Notifications?: InputMaybe<NotificationsUpdateOneWithoutProfileNestedInput>;
  Personal?: InputMaybe<PersonalUpdateOneWithoutProfileNestedInput>;
  Photos?: InputMaybe<PhotoUpdateManyWithoutProfileNestedInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  Relationships?: InputMaybe<RelationshipUpdateManyWithoutProfileNestedInput>;
  SearchesService?: InputMaybe<SearchesServiceUpdateOneWithoutProfileNestedInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysUpdateManyWithoutProfileNestedInput>;
  Settings?: InputMaybe<SettingsUpdateOneWithoutProfileNestedInput>;
  Storys?: InputMaybe<StoryUpdateManyWithoutProfileNestedInput>;
  ThemeManager?: InputMaybe<ThemeManagerUpdateOneWithoutProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutProfileNestedInput>;
  Vote?: InputMaybe<VoteUpdateManyWithoutProfileNestedInput>;
};

export type ProfileUpdateWithoutNotificationsInput = {
  bfsprofileid?: InputMaybe<StringFieldUpdateOperationsInput>;
  Chatroom?: InputMaybe<ChatroomUpdateManyWithoutProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutProfileNestedInput>;
  DetailInformation?: InputMaybe<DetailInformationUpdateOneWithoutProfileNestedInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupUpdateManyWithoutProfileNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationUpdateOneWithoutProfileNestedInput>;
  Personal?: InputMaybe<PersonalUpdateOneWithoutProfileNestedInput>;
  Photos?: InputMaybe<PhotoUpdateManyWithoutProfileNestedInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  Relationships?: InputMaybe<RelationshipUpdateManyWithoutProfileNestedInput>;
  SearchesService?: InputMaybe<SearchesServiceUpdateOneWithoutProfileNestedInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysUpdateManyWithoutProfileNestedInput>;
  Settings?: InputMaybe<SettingsUpdateOneWithoutProfileNestedInput>;
  Storys?: InputMaybe<StoryUpdateManyWithoutProfileNestedInput>;
  ThemeManager?: InputMaybe<ThemeManagerUpdateOneWithoutProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutProfileNestedInput>;
  Vote?: InputMaybe<VoteUpdateManyWithoutProfileNestedInput>;
};

export type ProfileUpdateWithoutPersonalInput = {
  bfsprofileid?: InputMaybe<StringFieldUpdateOperationsInput>;
  Chatroom?: InputMaybe<ChatroomUpdateManyWithoutProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutProfileNestedInput>;
  DetailInformation?: InputMaybe<DetailInformationUpdateOneWithoutProfileNestedInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupUpdateManyWithoutProfileNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationUpdateOneWithoutProfileNestedInput>;
  Notifications?: InputMaybe<NotificationsUpdateOneWithoutProfileNestedInput>;
  Photos?: InputMaybe<PhotoUpdateManyWithoutProfileNestedInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  Relationships?: InputMaybe<RelationshipUpdateManyWithoutProfileNestedInput>;
  SearchesService?: InputMaybe<SearchesServiceUpdateOneWithoutProfileNestedInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysUpdateManyWithoutProfileNestedInput>;
  Settings?: InputMaybe<SettingsUpdateOneWithoutProfileNestedInput>;
  Storys?: InputMaybe<StoryUpdateManyWithoutProfileNestedInput>;
  ThemeManager?: InputMaybe<ThemeManagerUpdateOneWithoutProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutProfileNestedInput>;
  Vote?: InputMaybe<VoteUpdateManyWithoutProfileNestedInput>;
};

export type ProfileUpdateWithoutPhotosInput = {
  bfsprofileid?: InputMaybe<StringFieldUpdateOperationsInput>;
  Chatroom?: InputMaybe<ChatroomUpdateManyWithoutProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutProfileNestedInput>;
  DetailInformation?: InputMaybe<DetailInformationUpdateOneWithoutProfileNestedInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupUpdateManyWithoutProfileNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationUpdateOneWithoutProfileNestedInput>;
  Notifications?: InputMaybe<NotificationsUpdateOneWithoutProfileNestedInput>;
  Personal?: InputMaybe<PersonalUpdateOneWithoutProfileNestedInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  Relationships?: InputMaybe<RelationshipUpdateManyWithoutProfileNestedInput>;
  SearchesService?: InputMaybe<SearchesServiceUpdateOneWithoutProfileNestedInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysUpdateManyWithoutProfileNestedInput>;
  Settings?: InputMaybe<SettingsUpdateOneWithoutProfileNestedInput>;
  Storys?: InputMaybe<StoryUpdateManyWithoutProfileNestedInput>;
  ThemeManager?: InputMaybe<ThemeManagerUpdateOneWithoutProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutProfileNestedInput>;
  Vote?: InputMaybe<VoteUpdateManyWithoutProfileNestedInput>;
};

export type ProfileUpdateWithoutRelationshipsInput = {
  bfsprofileid?: InputMaybe<StringFieldUpdateOperationsInput>;
  Chatroom?: InputMaybe<ChatroomUpdateManyWithoutProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutProfileNestedInput>;
  DetailInformation?: InputMaybe<DetailInformationUpdateOneWithoutProfileNestedInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupUpdateManyWithoutProfileNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationUpdateOneWithoutProfileNestedInput>;
  Notifications?: InputMaybe<NotificationsUpdateOneWithoutProfileNestedInput>;
  Personal?: InputMaybe<PersonalUpdateOneWithoutProfileNestedInput>;
  Photos?: InputMaybe<PhotoUpdateManyWithoutProfileNestedInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  SearchesService?: InputMaybe<SearchesServiceUpdateOneWithoutProfileNestedInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysUpdateManyWithoutProfileNestedInput>;
  Settings?: InputMaybe<SettingsUpdateOneWithoutProfileNestedInput>;
  Storys?: InputMaybe<StoryUpdateManyWithoutProfileNestedInput>;
  ThemeManager?: InputMaybe<ThemeManagerUpdateOneWithoutProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutProfileNestedInput>;
  Vote?: InputMaybe<VoteUpdateManyWithoutProfileNestedInput>;
};

export type ProfileUpdateWithoutSearchesServiceInput = {
  bfsprofileid?: InputMaybe<StringFieldUpdateOperationsInput>;
  Chatroom?: InputMaybe<ChatroomUpdateManyWithoutProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutProfileNestedInput>;
  DetailInformation?: InputMaybe<DetailInformationUpdateOneWithoutProfileNestedInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupUpdateManyWithoutProfileNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationUpdateOneWithoutProfileNestedInput>;
  Notifications?: InputMaybe<NotificationsUpdateOneWithoutProfileNestedInput>;
  Personal?: InputMaybe<PersonalUpdateOneWithoutProfileNestedInput>;
  Photos?: InputMaybe<PhotoUpdateManyWithoutProfileNestedInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  Relationships?: InputMaybe<RelationshipUpdateManyWithoutProfileNestedInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysUpdateManyWithoutProfileNestedInput>;
  Settings?: InputMaybe<SettingsUpdateOneWithoutProfileNestedInput>;
  Storys?: InputMaybe<StoryUpdateManyWithoutProfileNestedInput>;
  ThemeManager?: InputMaybe<ThemeManagerUpdateOneWithoutProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutProfileNestedInput>;
  Vote?: InputMaybe<VoteUpdateManyWithoutProfileNestedInput>;
};

export type ProfileUpdateWithoutSecuredDataKeysInput = {
  bfsprofileid?: InputMaybe<StringFieldUpdateOperationsInput>;
  Chatroom?: InputMaybe<ChatroomUpdateManyWithoutProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutProfileNestedInput>;
  DetailInformation?: InputMaybe<DetailInformationUpdateOneWithoutProfileNestedInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupUpdateManyWithoutProfileNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationUpdateOneWithoutProfileNestedInput>;
  Notifications?: InputMaybe<NotificationsUpdateOneWithoutProfileNestedInput>;
  Personal?: InputMaybe<PersonalUpdateOneWithoutProfileNestedInput>;
  Photos?: InputMaybe<PhotoUpdateManyWithoutProfileNestedInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  Relationships?: InputMaybe<RelationshipUpdateManyWithoutProfileNestedInput>;
  SearchesService?: InputMaybe<SearchesServiceUpdateOneWithoutProfileNestedInput>;
  Settings?: InputMaybe<SettingsUpdateOneWithoutProfileNestedInput>;
  Storys?: InputMaybe<StoryUpdateManyWithoutProfileNestedInput>;
  ThemeManager?: InputMaybe<ThemeManagerUpdateOneWithoutProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutProfileNestedInput>;
  Vote?: InputMaybe<VoteUpdateManyWithoutProfileNestedInput>;
};

export type ProfileUpdateWithoutSettingsInput = {
  bfsprofileid?: InputMaybe<StringFieldUpdateOperationsInput>;
  Chatroom?: InputMaybe<ChatroomUpdateManyWithoutProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutProfileNestedInput>;
  DetailInformation?: InputMaybe<DetailInformationUpdateOneWithoutProfileNestedInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupUpdateManyWithoutProfileNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationUpdateOneWithoutProfileNestedInput>;
  Notifications?: InputMaybe<NotificationsUpdateOneWithoutProfileNestedInput>;
  Personal?: InputMaybe<PersonalUpdateOneWithoutProfileNestedInput>;
  Photos?: InputMaybe<PhotoUpdateManyWithoutProfileNestedInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  Relationships?: InputMaybe<RelationshipUpdateManyWithoutProfileNestedInput>;
  SearchesService?: InputMaybe<SearchesServiceUpdateOneWithoutProfileNestedInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysUpdateManyWithoutProfileNestedInput>;
  Storys?: InputMaybe<StoryUpdateManyWithoutProfileNestedInput>;
  ThemeManager?: InputMaybe<ThemeManagerUpdateOneWithoutProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutProfileNestedInput>;
  Vote?: InputMaybe<VoteUpdateManyWithoutProfileNestedInput>;
};

export type ProfileUpdateWithoutStorysInput = {
  bfsprofileid?: InputMaybe<StringFieldUpdateOperationsInput>;
  Chatroom?: InputMaybe<ChatroomUpdateManyWithoutProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutProfileNestedInput>;
  DetailInformation?: InputMaybe<DetailInformationUpdateOneWithoutProfileNestedInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupUpdateManyWithoutProfileNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationUpdateOneWithoutProfileNestedInput>;
  Notifications?: InputMaybe<NotificationsUpdateOneWithoutProfileNestedInput>;
  Personal?: InputMaybe<PersonalUpdateOneWithoutProfileNestedInput>;
  Photos?: InputMaybe<PhotoUpdateManyWithoutProfileNestedInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  Relationships?: InputMaybe<RelationshipUpdateManyWithoutProfileNestedInput>;
  SearchesService?: InputMaybe<SearchesServiceUpdateOneWithoutProfileNestedInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysUpdateManyWithoutProfileNestedInput>;
  Settings?: InputMaybe<SettingsUpdateOneWithoutProfileNestedInput>;
  ThemeManager?: InputMaybe<ThemeManagerUpdateOneWithoutProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutProfileNestedInput>;
  Vote?: InputMaybe<VoteUpdateManyWithoutProfileNestedInput>;
};

export type ProfileUpdateWithoutThemeManagerInput = {
  bfsprofileid?: InputMaybe<StringFieldUpdateOperationsInput>;
  Chatroom?: InputMaybe<ChatroomUpdateManyWithoutProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutProfileNestedInput>;
  DetailInformation?: InputMaybe<DetailInformationUpdateOneWithoutProfileNestedInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupUpdateManyWithoutProfileNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationUpdateOneWithoutProfileNestedInput>;
  Notifications?: InputMaybe<NotificationsUpdateOneWithoutProfileNestedInput>;
  Personal?: InputMaybe<PersonalUpdateOneWithoutProfileNestedInput>;
  Photos?: InputMaybe<PhotoUpdateManyWithoutProfileNestedInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  Relationships?: InputMaybe<RelationshipUpdateManyWithoutProfileNestedInput>;
  SearchesService?: InputMaybe<SearchesServiceUpdateOneWithoutProfileNestedInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysUpdateManyWithoutProfileNestedInput>;
  Settings?: InputMaybe<SettingsUpdateOneWithoutProfileNestedInput>;
  Storys?: InputMaybe<StoryUpdateManyWithoutProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutProfileNestedInput>;
  Vote?: InputMaybe<VoteUpdateManyWithoutProfileNestedInput>;
};

export type ProfileUpdateWithoutVenueInput = {
  bfsprofileid?: InputMaybe<StringFieldUpdateOperationsInput>;
  Chatroom?: InputMaybe<ChatroomUpdateManyWithoutProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutProfileNestedInput>;
  DetailInformation?: InputMaybe<DetailInformationUpdateOneWithoutProfileNestedInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupUpdateManyWithoutProfileNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationUpdateOneWithoutProfileNestedInput>;
  Notifications?: InputMaybe<NotificationsUpdateOneWithoutProfileNestedInput>;
  Personal?: InputMaybe<PersonalUpdateOneWithoutProfileNestedInput>;
  Photos?: InputMaybe<PhotoUpdateManyWithoutProfileNestedInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  Relationships?: InputMaybe<RelationshipUpdateManyWithoutProfileNestedInput>;
  SearchesService?: InputMaybe<SearchesServiceUpdateOneWithoutProfileNestedInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysUpdateManyWithoutProfileNestedInput>;
  Settings?: InputMaybe<SettingsUpdateOneWithoutProfileNestedInput>;
  Storys?: InputMaybe<StoryUpdateManyWithoutProfileNestedInput>;
  ThemeManager?: InputMaybe<ThemeManagerUpdateOneWithoutProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Vote?: InputMaybe<VoteUpdateManyWithoutProfileNestedInput>;
};

export type ProfileUpdateWithoutVoteInput = {
  bfsprofileid?: InputMaybe<StringFieldUpdateOperationsInput>;
  Chatroom?: InputMaybe<ChatroomUpdateManyWithoutProfilesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutProfileNestedInput>;
  DetailInformation?: InputMaybe<DetailInformationUpdateOneWithoutProfileNestedInput>;
  DeviceManager?: InputMaybe<Array<Scalars['String']>>;
  Groups?: InputMaybe<GroupUpdateManyWithoutProfileNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationUpdateOneWithoutProfileNestedInput>;
  Notifications?: InputMaybe<NotificationsUpdateOneWithoutProfileNestedInput>;
  Personal?: InputMaybe<PersonalUpdateOneWithoutProfileNestedInput>;
  Photos?: InputMaybe<PhotoUpdateManyWithoutProfileNestedInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  Relationships?: InputMaybe<RelationshipUpdateManyWithoutProfileNestedInput>;
  SearchesService?: InputMaybe<SearchesServiceUpdateOneWithoutProfileNestedInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysUpdateManyWithoutProfileNestedInput>;
  Settings?: InputMaybe<SettingsUpdateOneWithoutProfileNestedInput>;
  Storys?: InputMaybe<StoryUpdateManyWithoutProfileNestedInput>;
  ThemeManager?: InputMaybe<ThemeManagerUpdateOneWithoutProfileNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutProfileNestedInput>;
};

export type ProfileUpdateWithWhereUniqueWithoutChatroomInput = {
  data: ProfileUpdateWithoutChatroomInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileUpdateWithWhereUniqueWithoutGroupsInput = {
  data: ProfileUpdateWithoutGroupsInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileUpsertWithoutCredentialsInput = {
  create: ProfileCreateWithoutCredentialsInput;
  update: ProfileUpdateWithoutCredentialsInput;
};

export type ProfileUpsertWithoutDetailInformationInput = {
  create: ProfileCreateWithoutDetailInformationInput;
  update: ProfileUpdateWithoutDetailInformationInput;
};

export type ProfileUpsertWithoutIdentifiableInformationInput = {
  create: ProfileCreateWithoutIdentifiableInformationInput;
  update: ProfileUpdateWithoutIdentifiableInformationInput;
};

export type ProfileUpsertWithoutNotificationsInput = {
  create: ProfileCreateWithoutNotificationsInput;
  update: ProfileUpdateWithoutNotificationsInput;
};

export type ProfileUpsertWithoutPersonalInput = {
  create: ProfileCreateWithoutPersonalInput;
  update: ProfileUpdateWithoutPersonalInput;
};

export type ProfileUpsertWithoutPhotosInput = {
  create: ProfileCreateWithoutPhotosInput;
  update: ProfileUpdateWithoutPhotosInput;
};

export type ProfileUpsertWithoutRelationshipsInput = {
  create: ProfileCreateWithoutRelationshipsInput;
  update: ProfileUpdateWithoutRelationshipsInput;
};

export type ProfileUpsertWithoutSearchesServiceInput = {
  create: ProfileCreateWithoutSearchesServiceInput;
  update: ProfileUpdateWithoutSearchesServiceInput;
};

export type ProfileUpsertWithoutSecuredDataKeysInput = {
  create: ProfileCreateWithoutSecuredDataKeysInput;
  update: ProfileUpdateWithoutSecuredDataKeysInput;
};

export type ProfileUpsertWithoutSettingsInput = {
  create: ProfileCreateWithoutSettingsInput;
  update: ProfileUpdateWithoutSettingsInput;
};

export type ProfileUpsertWithoutStorysInput = {
  create: ProfileCreateWithoutStorysInput;
  update: ProfileUpdateWithoutStorysInput;
};

export type ProfileUpsertWithoutThemeManagerInput = {
  create: ProfileCreateWithoutThemeManagerInput;
  update: ProfileUpdateWithoutThemeManagerInput;
};

export type ProfileUpsertWithoutVenueInput = {
  create: ProfileCreateWithoutVenueInput;
  update: ProfileUpdateWithoutVenueInput;
};

export type ProfileUpsertWithoutVoteInput = {
  create: ProfileCreateWithoutVoteInput;
  update: ProfileUpdateWithoutVoteInput;
};

export type ProfileUpsertWithWhereUniqueWithoutChatroomInput = {
  create: ProfileCreateWithoutChatroomInput;
  update: ProfileUpdateWithoutChatroomInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileUpsertWithWhereUniqueWithoutGroupsInput = {
  create: ProfileCreateWithoutGroupsInput;
  update: ProfileUpdateWithoutGroupsInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileVenue = {
  __typename?: 'ProfileVenue';
  bfsprofileid: Scalars['String'];
  createdAt: Scalars['DateTime'];
  Credentials: Credentials;
  DetailInformation?: Maybe<DetailInformation>;
  distanceInM?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  IdentifiableInformation?: Maybe<IdentifiableInformation>;
  photos: Array<Photo>;
  profilePhoto?: Maybe<Photo>;
  ProfileType: ProfileType;
  Relationships: Array<Relationship>;
  ThemeManager?: Maybe<ThemeManager>;
  tonightStory?: Maybe<Story>;
  updatedAt: Scalars['DateTime'];
  Venue?: Maybe<Venue>;
};

export type ProfileVenueNearbyResponse = {
  __typename?: 'ProfileVenueNearbyResponse';
  searchArea?: Maybe<AreaResponse>;
  venuesNearby: Array<ProfileVenue>;
};

export type ProfileWhereInput = {
  AND?: InputMaybe<Array<ProfileWhereInput>>;
  bfsprofileid?: InputMaybe<StringFilter>;
  Chatroom?: InputMaybe<ChatroomListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  Credentials?: InputMaybe<CredentialsWhereInput>;
  DetailInformation?: InputMaybe<DetailInformationWhereInput>;
  DeviceManager?: InputMaybe<StringNullableListFilter>;
  Groups?: InputMaybe<GroupListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationWhereInput>;
  NOT?: InputMaybe<Array<ProfileWhereInput>>;
  Notifications?: InputMaybe<NotificationsWhereInput>;
  OR?: InputMaybe<Array<ProfileWhereInput>>;
  Personal?: InputMaybe<PersonalWhereInput>;
  Photos?: InputMaybe<PhotoListRelationFilter>;
  ProfileType?: InputMaybe<EnumProfileTypeFilter>;
  Relationships?: InputMaybe<RelationshipListRelationFilter>;
  SearchesService?: InputMaybe<SearchesServiceWhereInput>;
  SecuredDataKeys?: InputMaybe<SecuredDataKeysListRelationFilter>;
  Settings?: InputMaybe<SettingsWhereInput>;
  Storys?: InputMaybe<StoryListRelationFilter>;
  ThemeManager?: InputMaybe<ThemeManagerWhereInput>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  Venue?: InputMaybe<VenueWhereInput>;
  Vote?: InputMaybe<VoteListRelationFilter>;
};

export type ProfileWhereUniqueInput = {
  bfsprofileid?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type PushToken = {
  __typename?: 'PushToken';
  androidToken?: Maybe<Scalars['String']>;
  appleToken?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  Device?: Maybe<Device>;
  expoToken?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isExpired: Scalars['Boolean'];
  receipts: Array<Scalars['Json']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PushTokenCountOrderByAggregateInput = {
  androidToken?: InputMaybe<SortOrder>;
  appleToken?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  expoToken?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isExpired?: InputMaybe<SortOrder>;
  receipts?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PushTokenCreateInput = {
  androidToken?: InputMaybe<Scalars['String']>;
  appleToken?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Device?: InputMaybe<DeviceCreateNestedOneWithoutPushTokenInput>;
  expoToken?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  isExpired?: InputMaybe<Scalars['Boolean']>;
  receipts?: InputMaybe<Array<Scalars['Json']>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PushTokenCreateManyInput = {
  androidToken?: InputMaybe<Scalars['String']>;
  appleToken?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  expoToken?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  isExpired?: InputMaybe<Scalars['Boolean']>;
  receipts?: InputMaybe<Array<Scalars['Json']>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PushTokenCreateNestedOneWithoutDeviceInput = {
  connect?: InputMaybe<PushTokenWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PushTokenCreateOrConnectWithoutDeviceInput>;
  create?: InputMaybe<PushTokenCreateWithoutDeviceInput>;
};

export type PushTokenCreateOrConnectWithoutDeviceInput = {
  create: PushTokenCreateWithoutDeviceInput;
  where: PushTokenWhereUniqueInput;
};

export type PushTokenCreatereceiptsInput = {
  set: Array<Scalars['Json']>;
};

export type PushTokenCreateWithoutDeviceInput = {
  androidToken?: InputMaybe<Scalars['String']>;
  appleToken?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  expoToken?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  isExpired?: InputMaybe<Scalars['Boolean']>;
  receipts?: InputMaybe<Array<Scalars['Json']>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PushTokenMaxOrderByAggregateInput = {
  androidToken?: InputMaybe<SortOrder>;
  appleToken?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  expoToken?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isExpired?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PushTokenMinOrderByAggregateInput = {
  androidToken?: InputMaybe<SortOrder>;
  appleToken?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  expoToken?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isExpired?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PushTokenOrderByWithAggregationInput = {
  _count?: InputMaybe<PushTokenCountOrderByAggregateInput>;
  _max?: InputMaybe<PushTokenMaxOrderByAggregateInput>;
  _min?: InputMaybe<PushTokenMinOrderByAggregateInput>;
  androidToken?: InputMaybe<SortOrder>;
  appleToken?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  expoToken?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isExpired?: InputMaybe<SortOrder>;
  receipts?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PushTokenOrderByWithRelationInput = {
  androidToken?: InputMaybe<SortOrder>;
  appleToken?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  Device?: InputMaybe<DeviceOrderByWithRelationInput>;
  expoToken?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isExpired?: InputMaybe<SortOrder>;
  receipts?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PushTokenRelationFilter = {
  is?: InputMaybe<PushTokenWhereInput>;
  isNot?: InputMaybe<PushTokenWhereInput>;
};

export enum PushTokenScalarFieldEnum {
  AndroidToken = 'androidToken',
  AppleToken = 'appleToken',
  CreatedAt = 'createdAt',
  ExpoToken = 'expoToken',
  Id = 'id',
  IsExpired = 'isExpired',
  Receipts = 'receipts',
  UpdatedAt = 'updatedAt'
}

export type PushTokenScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<PushTokenScalarWhereWithAggregatesInput>>;
  androidToken?: InputMaybe<StringNullableWithAggregatesFilter>;
  appleToken?: InputMaybe<StringNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeNullableWithAggregatesFilter>;
  expoToken?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  isExpired?: InputMaybe<BoolWithAggregatesFilter>;
  NOT?: InputMaybe<Array<PushTokenScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<PushTokenScalarWhereWithAggregatesInput>>;
  receipts?: InputMaybe<JsonNullableListFilter>;
  updatedAt?: InputMaybe<DateTimeNullableWithAggregatesFilter>;
};

export type PushTokenUpdateInput = {
  androidToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  appleToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  Device?: InputMaybe<DeviceUpdateOneWithoutPushTokenNestedInput>;
  expoToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isExpired?: InputMaybe<BoolFieldUpdateOperationsInput>;
  receipts?: InputMaybe<Array<Scalars['Json']>>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type PushTokenUpdateManyMutationInput = {
  androidToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  appleToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  expoToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isExpired?: InputMaybe<BoolFieldUpdateOperationsInput>;
  receipts?: InputMaybe<Array<Scalars['Json']>>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type PushTokenUpdateOneWithoutDeviceNestedInput = {
  connect?: InputMaybe<PushTokenWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PushTokenCreateOrConnectWithoutDeviceInput>;
  create?: InputMaybe<PushTokenCreateWithoutDeviceInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<PushTokenUpdateWithoutDeviceInput>;
  upsert?: InputMaybe<PushTokenUpsertWithoutDeviceInput>;
};

export type PushTokenUpdatereceiptsInput = {
  push?: InputMaybe<Scalars['Json']>;
  set?: InputMaybe<Array<Scalars['Json']>>;
};

export type PushTokenUpdateWithoutDeviceInput = {
  androidToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  appleToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  expoToken?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isExpired?: InputMaybe<BoolFieldUpdateOperationsInput>;
  receipts?: InputMaybe<Array<Scalars['Json']>>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type PushTokenUpsertWithoutDeviceInput = {
  create: PushTokenCreateWithoutDeviceInput;
  update: PushTokenUpdateWithoutDeviceInput;
};

export type PushTokenWhereInput = {
  AND?: InputMaybe<Array<PushTokenWhereInput>>;
  androidToken?: InputMaybe<StringNullableFilter>;
  appleToken?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  Device?: InputMaybe<DeviceWhereInput>;
  expoToken?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  isExpired?: InputMaybe<BoolFilter>;
  NOT?: InputMaybe<Array<PushTokenWhereInput>>;
  OR?: InputMaybe<Array<PushTokenWhereInput>>;
  receipts?: InputMaybe<JsonNullableListFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type PushTokenWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  authorizedProfiles?: Maybe<AuthorizedProfilesResponseUnion>;
  checkUsername: Scalars['Boolean'];
  currentVenue?: Maybe<ProfileVenue>;
  emojimood?: Maybe<Emojimood>;
  emojimoods: Array<Emojimood>;
  exploreSearch: ExploreResponse;
  friendsFromContacts: Scalars['String'];
  getADeviceManager: DeviceManagerDeviceProfilesResponseUnion;
  getAllCitiesByState: OrganizedCityResponseObject;
  getAllCountries: Array<CountryResponseObject>;
  getAllStatesByCountry: Array<StateResponseObject>;
  getAllThemes: Array<Theme>;
  getInterests: Array<Category>;
  getLiveVenueTotals: LiveVenueTotals;
  getNotifications: NotificationResponse;
  getProfileThemeManager: ThemeManager;
  getRelationshipFriendRequestStatus: NotificationFriendRequestStatusResponse;
  getSecureFriendQRCodeData: Scalars['String'];
  H3IndexGrid: Array<Scalars['String']>;
  H3IndexLatLng: Array<Scalars['Float']>;
  loginPassword: Scalars['Boolean'];
  privacyTermsDocuments: PrivacyAndTermsDocumentResponse;
  profile?: Maybe<Profile>;
  profiles: Array<Profile>;
  sendAuthenticatorDeviceOwnerCode: Scalars['Boolean'];
  venue?: Maybe<Venue>;
  venues: Array<Venue>;
  venuesNearby: RecommendationResponseUnion;
};


export type QueryAuthorizedProfilesArgs = {
  where: AuthorizedProfilesWhereInput;
};


export type QueryCheckUsernameArgs = {
  username: Scalars['String'];
};


export type QueryCurrentVenueArgs = {
  currentLocationCoords?: InputMaybe<CoordsInput>;
  cursor?: InputMaybe<ProfileWhereUniqueInput>;
  distinct?: InputMaybe<Array<ProfileScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProfileWhereInput>;
};


export type QueryEmojimoodArgs = {
  where: EmojimoodWhereUniqueInput;
};


export type QueryExploreSearchArgs = {
  search: Scalars['String'];
};


export type QueryFriendsFromContactsArgs = {
  contact: Array<ContactInput>;
};


export type QueryGetAllCitiesByStateArgs = {
  countryIsoCode: Scalars['String'];
  stateIsoCode: Scalars['String'];
};


export type QueryGetAllStatesByCountryArgs = {
  countryIsoCode: Scalars['String'];
};


export type QueryGetLiveVenueTotalsArgs = {
  profileIdVenue?: InputMaybe<Scalars['String']>;
};


export type QueryGetRelationshipFriendRequestStatusArgs = {
  profileId: Scalars['String'];
};


export type QueryH3IndexGridArgs = {
  cell: Scalars['String'];
  ringSize?: Scalars['Int'];
};


export type QueryH3IndexLatLngArgs = {
  cell: Scalars['String'];
};


export type QueryLoginPasswordArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type QueryProfileArgs = {
  cursor?: InputMaybe<ProfileWhereUniqueInput>;
  distinct?: InputMaybe<Array<ProfileScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProfileWhereInput>;
};


export type QueryProfilesArgs = {
  cursor?: InputMaybe<ProfileWhereUniqueInput>;
  distinct?: InputMaybe<Array<ProfileScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProfileWhereInput>;
};


export type QueryVenueArgs = {
  cursor?: InputMaybe<VenueWhereUniqueInput>;
  distinct?: InputMaybe<Array<VenueScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<VenueOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<VenueWhereInput>;
};


export type QueryVenuesArgs = {
  cursor?: InputMaybe<VenueWhereUniqueInput>;
  distinct?: InputMaybe<Array<VenueScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<VenueOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<VenueWhereInput>;
};


export type QueryVenuesNearbyArgs = {
  countryIsoCode: Scalars['String'];
  currentLocationCoords?: InputMaybe<CoordsInput>;
  kRing?: InputMaybe<Scalars['Int']>;
  searchAreaCoords: CoordsInput;
  stateIsoCode: Scalars['String'];
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type RecommendationResponseUnion = ComingAreaResponse | Error | VenuesNearbyResponse;

export type RefreshToken = {
  __typename?: 'RefreshToken';
  createdAt: Scalars['DateTime'];
  DeviceProfile?: Maybe<AuthorizationDeviceProfile>;
  DeviceProfileId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  token: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type RefreshTokenAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type RefreshTokenCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  DeviceProfileId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  token?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type RefreshTokenCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  DeviceProfile?: InputMaybe<DeviceProfileCreateNestedOneWithoutRefreshTokenInput>;
  token: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type RefreshTokenCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  DeviceProfileId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  token: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type RefreshTokenCreateNestedOneWithoutDeviceProfileInput = {
  connect?: InputMaybe<RefreshTokenWhereUniqueInput>;
  connectOrCreate?: InputMaybe<RefreshTokenCreateOrConnectWithoutDeviceProfileInput>;
  create?: InputMaybe<RefreshTokenCreateWithoutDeviceProfileInput>;
};

export type RefreshTokenCreateOrConnectWithoutDeviceProfileInput = {
  create: RefreshTokenCreateWithoutDeviceProfileInput;
  where: RefreshTokenWhereUniqueInput;
};

export type RefreshTokenCreateWithoutDeviceProfileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  token: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type RefreshTokenMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  DeviceProfileId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  token?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type RefreshTokenMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  DeviceProfileId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  token?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type RefreshTokenOrderByWithAggregationInput = {
  _avg?: InputMaybe<RefreshTokenAvgOrderByAggregateInput>;
  _count?: InputMaybe<RefreshTokenCountOrderByAggregateInput>;
  _max?: InputMaybe<RefreshTokenMaxOrderByAggregateInput>;
  _min?: InputMaybe<RefreshTokenMinOrderByAggregateInput>;
  _sum?: InputMaybe<RefreshTokenSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  DeviceProfileId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  token?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type RefreshTokenOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  DeviceProfile?: InputMaybe<DeviceProfileOrderByWithRelationInput>;
  DeviceProfileId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  token?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type RefreshTokenRelationFilter = {
  is?: InputMaybe<RefreshTokenWhereInput>;
  isNot?: InputMaybe<RefreshTokenWhereInput>;
};

export enum RefreshTokenScalarFieldEnum {
  CreatedAt = 'createdAt',
  DeviceProfileId = 'DeviceProfileId',
  Id = 'id',
  Token = 'token',
  UpdatedAt = 'updatedAt'
}

export type RefreshTokenScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<RefreshTokenScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  DeviceProfileId?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  NOT?: InputMaybe<Array<RefreshTokenScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<RefreshTokenScalarWhereWithAggregatesInput>>;
  token?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type RefreshTokenSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type RefreshTokenUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  DeviceProfile?: InputMaybe<DeviceProfileUpdateOneWithoutRefreshTokenNestedInput>;
  token?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type RefreshTokenUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  token?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type RefreshTokenUpdateOneWithoutDeviceProfileNestedInput = {
  connect?: InputMaybe<RefreshTokenWhereUniqueInput>;
  connectOrCreate?: InputMaybe<RefreshTokenCreateOrConnectWithoutDeviceProfileInput>;
  create?: InputMaybe<RefreshTokenCreateWithoutDeviceProfileInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<RefreshTokenUpdateWithoutDeviceProfileInput>;
  upsert?: InputMaybe<RefreshTokenUpsertWithoutDeviceProfileInput>;
};

export type RefreshTokenUpdateWithoutDeviceProfileInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  token?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type RefreshTokenUpsertWithoutDeviceProfileInput = {
  create: RefreshTokenCreateWithoutDeviceProfileInput;
  update: RefreshTokenUpdateWithoutDeviceProfileInput;
};

export type RefreshTokenWhereInput = {
  AND?: InputMaybe<Array<RefreshTokenWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  DeviceProfile?: InputMaybe<DeviceProfileWhereInput>;
  DeviceProfileId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  NOT?: InputMaybe<Array<RefreshTokenWhereInput>>;
  OR?: InputMaybe<Array<RefreshTokenWhereInput>>;
  token?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type RefreshTokenWhereUniqueInput = {
  DeviceProfileId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  token?: InputMaybe<Scalars['String']>;
};

export type RejectedFriendsResponse = {
  __typename?: 'RejectedFriendsResponse';
  friends: Scalars['Boolean'];
};

export type Relationship = {
  __typename?: 'Relationship';
  createdAt: Scalars['DateTime'];
  friendProfile?: Maybe<Profile>;
  friendProfileId: Scalars['String'];
  id: Scalars['ID'];
  Profile?: Maybe<Profile>;
  profileId?: Maybe<Scalars['String']>;
  RelationshipStatus: Array<RelationshipStatus>;
  updatedAt: Scalars['DateTime'];
  venueMetAt?: Maybe<Scalars['String']>;
};

export type RelationshipCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  friendProfileId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  RelationshipStatus?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  venueMetAt?: InputMaybe<SortOrder>;
};

export type RelationshipCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  friendProfileId: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  Profile?: InputMaybe<ProfileCreateNestedOneWithoutRelationshipsInput>;
  RelationshipStatus?: InputMaybe<Array<RelationshipStatus>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueMetAt?: InputMaybe<Scalars['String']>;
};

export type RelationshipCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  friendProfileId: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  profileId?: InputMaybe<Scalars['String']>;
  RelationshipStatus?: InputMaybe<Array<RelationshipStatus>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueMetAt?: InputMaybe<Scalars['String']>;
};

export type RelationshipCreateManyProfileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  friendProfileId: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  RelationshipStatus?: InputMaybe<Array<RelationshipStatus>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueMetAt?: InputMaybe<Scalars['String']>;
};

export type RelationshipCreateManyProfileInputEnvelope = {
  data: Array<RelationshipCreateManyProfileInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type RelationshipCreateNestedManyWithoutProfileInput = {
  connect?: InputMaybe<Array<RelationshipWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RelationshipCreateOrConnectWithoutProfileInput>>;
  create?: InputMaybe<Array<RelationshipCreateWithoutProfileInput>>;
  createMany?: InputMaybe<RelationshipCreateManyProfileInputEnvelope>;
};

export type RelationshipCreateOrConnectWithoutProfileInput = {
  create: RelationshipCreateWithoutProfileInput;
  where: RelationshipWhereUniqueInput;
};

export type RelationshipCreateRelationshipStatusInput = {
  set: Array<RelationshipStatus>;
};

export type RelationshipCreateWithoutProfileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  friendProfileId: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  RelationshipStatus?: InputMaybe<Array<RelationshipStatus>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueMetAt?: InputMaybe<Scalars['String']>;
};

export type RelationshipListRelationFilter = {
  every?: InputMaybe<RelationshipWhereInput>;
  none?: InputMaybe<RelationshipWhereInput>;
  some?: InputMaybe<RelationshipWhereInput>;
};

export type RelationshipMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  friendProfileId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  venueMetAt?: InputMaybe<SortOrder>;
};

export type RelationshipMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  friendProfileId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  venueMetAt?: InputMaybe<SortOrder>;
};

export type RelationshipOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type RelationshipOrderByWithAggregationInput = {
  _count?: InputMaybe<RelationshipCountOrderByAggregateInput>;
  _max?: InputMaybe<RelationshipMaxOrderByAggregateInput>;
  _min?: InputMaybe<RelationshipMinOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  friendProfileId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  RelationshipStatus?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  venueMetAt?: InputMaybe<SortOrder>;
};

export type RelationshipOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  friendProfileId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  Profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  profileId?: InputMaybe<SortOrder>;
  RelationshipStatus?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  venueMetAt?: InputMaybe<SortOrder>;
};

export enum RelationshipScalarFieldEnum {
  CreatedAt = 'createdAt',
  FriendProfileId = 'friendProfileId',
  Id = 'id',
  ProfileId = 'profileId',
  RelationshipStatus = 'RelationshipStatus',
  UpdatedAt = 'updatedAt',
  VenueMetAt = 'venueMetAt'
}

export type RelationshipScalarWhereInput = {
  AND?: InputMaybe<Array<RelationshipScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  friendProfileId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<RelationshipScalarWhereInput>>;
  OR?: InputMaybe<Array<RelationshipScalarWhereInput>>;
  profileId?: InputMaybe<StringNullableFilter>;
  RelationshipStatus?: InputMaybe<EnumRelationshipStatusNullableListFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  venueMetAt?: InputMaybe<StringNullableFilter>;
};

export type RelationshipScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<RelationshipScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  friendProfileId?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<RelationshipScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<RelationshipScalarWhereWithAggregatesInput>>;
  profileId?: InputMaybe<StringNullableWithAggregatesFilter>;
  RelationshipStatus?: InputMaybe<EnumRelationshipStatusNullableListFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  venueMetAt?: InputMaybe<StringNullableWithAggregatesFilter>;
};

export enum RelationshipStatus {
  Dating = 'DATING',
  Friends = 'FRIENDS'
}

export type RelationshipUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  friendProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneWithoutRelationshipsNestedInput>;
  RelationshipStatus?: InputMaybe<Array<RelationshipStatus>>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venueMetAt?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type RelationshipUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  friendProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  RelationshipStatus?: InputMaybe<Array<RelationshipStatus>>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venueMetAt?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type RelationshipUpdateManyWithoutProfileNestedInput = {
  connect?: InputMaybe<Array<RelationshipWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RelationshipCreateOrConnectWithoutProfileInput>>;
  create?: InputMaybe<Array<RelationshipCreateWithoutProfileInput>>;
  createMany?: InputMaybe<RelationshipCreateManyProfileInputEnvelope>;
  delete?: InputMaybe<Array<RelationshipWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<RelationshipScalarWhereInput>>;
  disconnect?: InputMaybe<Array<RelationshipWhereUniqueInput>>;
  set?: InputMaybe<Array<RelationshipWhereUniqueInput>>;
  update?: InputMaybe<Array<RelationshipUpdateWithWhereUniqueWithoutProfileInput>>;
  updateMany?: InputMaybe<Array<RelationshipUpdateManyWithWhereWithoutProfileInput>>;
  upsert?: InputMaybe<Array<RelationshipUpsertWithWhereUniqueWithoutProfileInput>>;
};

export type RelationshipUpdateManyWithWhereWithoutProfileInput = {
  data: RelationshipUpdateManyMutationInput;
  where: RelationshipScalarWhereInput;
};

export type RelationshipUpdateRelationshipStatusInput = {
  push?: InputMaybe<Array<RelationshipStatus>>;
  set?: InputMaybe<Array<RelationshipStatus>>;
};

export type RelationshipUpdateWithoutProfileInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  friendProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  RelationshipStatus?: InputMaybe<Array<RelationshipStatus>>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venueMetAt?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type RelationshipUpdateWithWhereUniqueWithoutProfileInput = {
  data: RelationshipUpdateWithoutProfileInput;
  where: RelationshipWhereUniqueInput;
};

export type RelationshipUpsertWithWhereUniqueWithoutProfileInput = {
  create: RelationshipCreateWithoutProfileInput;
  update: RelationshipUpdateWithoutProfileInput;
  where: RelationshipWhereUniqueInput;
};

export type RelationshipWhereInput = {
  AND?: InputMaybe<Array<RelationshipWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  friendProfileId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<RelationshipWhereInput>>;
  OR?: InputMaybe<Array<RelationshipWhereInput>>;
  Profile?: InputMaybe<ProfileWhereInput>;
  profileId?: InputMaybe<StringNullableFilter>;
  RelationshipStatus?: InputMaybe<EnumRelationshipStatusNullableListFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  venueMetAt?: InputMaybe<StringNullableFilter>;
};

export type RelationshipWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type SearchAreaMetrics = {
  __typename?: 'SearchAreaMetrics';
  createdAt: Scalars['DateTime'];
  h3Index15?: Maybe<Scalars['String']>;
  H3Index5VenueRecommendation?: Maybe<H3Index5VenueRecommendation>;
  h3Index5VenueRecommendationId?: Maybe<Scalars['String']>;
  H3Index6VenueRecommendation?: Maybe<H3Index6VenueRecommendation>;
  h3Index6VenueRecommendationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  SearchesService?: Maybe<SearchesService>;
  searchesServiceId?: Maybe<Scalars['String']>;
  timesRequested: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type SearchAreaMetricsAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  timesRequested?: InputMaybe<SortOrder>;
};

export type SearchAreaMetricsCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  h3Index15?: InputMaybe<SortOrder>;
  h3Index5VenueRecommendationId?: InputMaybe<SortOrder>;
  h3Index6VenueRecommendationId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  searchesServiceId?: InputMaybe<SortOrder>;
  timesRequested?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SearchAreaMetricsCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  h3Index15?: InputMaybe<Scalars['String']>;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationCreateNestedOneWithoutSearchAreaMetricsInput>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationCreateNestedOneWithoutSearchAreaMetricsInput>;
  SearchesService?: InputMaybe<SearchesServiceCreateNestedOneWithoutSearchAreaMetricsInput>;
  timesRequested?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SearchAreaMetricsCreateManyH3Index5VenueRecommendationInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  h3Index15?: InputMaybe<Scalars['String']>;
  h3Index6VenueRecommendationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  searchesServiceId?: InputMaybe<Scalars['String']>;
  timesRequested?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SearchAreaMetricsCreateManyH3Index5VenueRecommendationInputEnvelope = {
  data: Array<SearchAreaMetricsCreateManyH3Index5VenueRecommendationInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type SearchAreaMetricsCreateManyH3Index6VenueRecommendationInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  h3Index15?: InputMaybe<Scalars['String']>;
  h3Index5VenueRecommendationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  searchesServiceId?: InputMaybe<Scalars['String']>;
  timesRequested?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SearchAreaMetricsCreateManyH3Index6VenueRecommendationInputEnvelope = {
  data: Array<SearchAreaMetricsCreateManyH3Index6VenueRecommendationInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type SearchAreaMetricsCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  h3Index15?: InputMaybe<Scalars['String']>;
  h3Index5VenueRecommendationId?: InputMaybe<Scalars['String']>;
  h3Index6VenueRecommendationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  searchesServiceId?: InputMaybe<Scalars['String']>;
  timesRequested?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SearchAreaMetricsCreateManySearchesServiceInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  h3Index15?: InputMaybe<Scalars['String']>;
  h3Index5VenueRecommendationId?: InputMaybe<Scalars['String']>;
  h3Index6VenueRecommendationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  timesRequested?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SearchAreaMetricsCreateManySearchesServiceInputEnvelope = {
  data: Array<SearchAreaMetricsCreateManySearchesServiceInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type SearchAreaMetricsCreateNestedManyWithoutH3Index5VenueRecommendationInput = {
  connect?: InputMaybe<Array<SearchAreaMetricsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SearchAreaMetricsCreateOrConnectWithoutH3Index5VenueRecommendationInput>>;
  create?: InputMaybe<Array<SearchAreaMetricsCreateWithoutH3Index5VenueRecommendationInput>>;
  createMany?: InputMaybe<SearchAreaMetricsCreateManyH3Index5VenueRecommendationInputEnvelope>;
};

export type SearchAreaMetricsCreateNestedManyWithoutH3Index6VenueRecommendationInput = {
  connect?: InputMaybe<Array<SearchAreaMetricsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SearchAreaMetricsCreateOrConnectWithoutH3Index6VenueRecommendationInput>>;
  create?: InputMaybe<Array<SearchAreaMetricsCreateWithoutH3Index6VenueRecommendationInput>>;
  createMany?: InputMaybe<SearchAreaMetricsCreateManyH3Index6VenueRecommendationInputEnvelope>;
};

export type SearchAreaMetricsCreateNestedManyWithoutSearchesServiceInput = {
  connect?: InputMaybe<Array<SearchAreaMetricsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SearchAreaMetricsCreateOrConnectWithoutSearchesServiceInput>>;
  create?: InputMaybe<Array<SearchAreaMetricsCreateWithoutSearchesServiceInput>>;
  createMany?: InputMaybe<SearchAreaMetricsCreateManySearchesServiceInputEnvelope>;
};

export type SearchAreaMetricsCreateOrConnectWithoutH3Index5VenueRecommendationInput = {
  create: SearchAreaMetricsCreateWithoutH3Index5VenueRecommendationInput;
  where: SearchAreaMetricsWhereUniqueInput;
};

export type SearchAreaMetricsCreateOrConnectWithoutH3Index6VenueRecommendationInput = {
  create: SearchAreaMetricsCreateWithoutH3Index6VenueRecommendationInput;
  where: SearchAreaMetricsWhereUniqueInput;
};

export type SearchAreaMetricsCreateOrConnectWithoutSearchesServiceInput = {
  create: SearchAreaMetricsCreateWithoutSearchesServiceInput;
  where: SearchAreaMetricsWhereUniqueInput;
};

export type SearchAreaMetricsCreateWithoutH3Index5VenueRecommendationInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  h3Index15?: InputMaybe<Scalars['String']>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationCreateNestedOneWithoutSearchAreaMetricsInput>;
  SearchesService?: InputMaybe<SearchesServiceCreateNestedOneWithoutSearchAreaMetricsInput>;
  timesRequested?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SearchAreaMetricsCreateWithoutH3Index6VenueRecommendationInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  h3Index15?: InputMaybe<Scalars['String']>;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationCreateNestedOneWithoutSearchAreaMetricsInput>;
  SearchesService?: InputMaybe<SearchesServiceCreateNestedOneWithoutSearchAreaMetricsInput>;
  timesRequested?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SearchAreaMetricsCreateWithoutSearchesServiceInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  h3Index15?: InputMaybe<Scalars['String']>;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationCreateNestedOneWithoutSearchAreaMetricsInput>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationCreateNestedOneWithoutSearchAreaMetricsInput>;
  timesRequested?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SearchAreaMetricsListRelationFilter = {
  every?: InputMaybe<SearchAreaMetricsWhereInput>;
  none?: InputMaybe<SearchAreaMetricsWhereInput>;
  some?: InputMaybe<SearchAreaMetricsWhereInput>;
};

export type SearchAreaMetricsMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  h3Index15?: InputMaybe<SortOrder>;
  h3Index5VenueRecommendationId?: InputMaybe<SortOrder>;
  h3Index6VenueRecommendationId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  searchesServiceId?: InputMaybe<SortOrder>;
  timesRequested?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SearchAreaMetricsMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  h3Index15?: InputMaybe<SortOrder>;
  h3Index5VenueRecommendationId?: InputMaybe<SortOrder>;
  h3Index6VenueRecommendationId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  searchesServiceId?: InputMaybe<SortOrder>;
  timesRequested?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SearchAreaMetricsOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type SearchAreaMetricsOrderByWithAggregationInput = {
  _avg?: InputMaybe<SearchAreaMetricsAvgOrderByAggregateInput>;
  _count?: InputMaybe<SearchAreaMetricsCountOrderByAggregateInput>;
  _max?: InputMaybe<SearchAreaMetricsMaxOrderByAggregateInput>;
  _min?: InputMaybe<SearchAreaMetricsMinOrderByAggregateInput>;
  _sum?: InputMaybe<SearchAreaMetricsSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  h3Index15?: InputMaybe<SortOrder>;
  h3Index5VenueRecommendationId?: InputMaybe<SortOrder>;
  h3Index6VenueRecommendationId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  searchesServiceId?: InputMaybe<SortOrder>;
  timesRequested?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SearchAreaMetricsOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  h3Index15?: InputMaybe<SortOrder>;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationOrderByWithRelationInput>;
  h3Index5VenueRecommendationId?: InputMaybe<SortOrder>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationOrderByWithRelationInput>;
  h3Index6VenueRecommendationId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  SearchesService?: InputMaybe<SearchesServiceOrderByWithRelationInput>;
  searchesServiceId?: InputMaybe<SortOrder>;
  timesRequested?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum SearchAreaMetricsScalarFieldEnum {
  CreatedAt = 'createdAt',
  H3Index15 = 'h3Index15',
  H3Index5VenueRecommendationId = 'h3Index5VenueRecommendationId',
  H3Index6VenueRecommendationId = 'h3Index6VenueRecommendationId',
  Id = 'id',
  SearchesServiceId = 'searchesServiceId',
  TimesRequested = 'timesRequested',
  UpdatedAt = 'updatedAt'
}

export type SearchAreaMetricsScalarWhereInput = {
  AND?: InputMaybe<Array<SearchAreaMetricsScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  h3Index15?: InputMaybe<StringNullableFilter>;
  h3Index5VenueRecommendationId?: InputMaybe<StringNullableFilter>;
  h3Index6VenueRecommendationId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  NOT?: InputMaybe<Array<SearchAreaMetricsScalarWhereInput>>;
  OR?: InputMaybe<Array<SearchAreaMetricsScalarWhereInput>>;
  searchesServiceId?: InputMaybe<StringNullableFilter>;
  timesRequested?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type SearchAreaMetricsScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<SearchAreaMetricsScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  h3Index15?: InputMaybe<StringNullableWithAggregatesFilter>;
  h3Index5VenueRecommendationId?: InputMaybe<StringNullableWithAggregatesFilter>;
  h3Index6VenueRecommendationId?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  NOT?: InputMaybe<Array<SearchAreaMetricsScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<SearchAreaMetricsScalarWhereWithAggregatesInput>>;
  searchesServiceId?: InputMaybe<StringNullableWithAggregatesFilter>;
  timesRequested?: InputMaybe<IntWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type SearchAreaMetricsSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  timesRequested?: InputMaybe<SortOrder>;
};

export type SearchAreaMetricsUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  h3Index15?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationUpdateOneWithoutSearchAreaMetricsNestedInput>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationUpdateOneWithoutSearchAreaMetricsNestedInput>;
  SearchesService?: InputMaybe<SearchesServiceUpdateOneWithoutSearchAreaMetricsNestedInput>;
  timesRequested?: InputMaybe<IntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SearchAreaMetricsUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  h3Index15?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  timesRequested?: InputMaybe<IntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SearchAreaMetricsUpdateManyWithoutH3Index5VenueRecommendationNestedInput = {
  connect?: InputMaybe<Array<SearchAreaMetricsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SearchAreaMetricsCreateOrConnectWithoutH3Index5VenueRecommendationInput>>;
  create?: InputMaybe<Array<SearchAreaMetricsCreateWithoutH3Index5VenueRecommendationInput>>;
  createMany?: InputMaybe<SearchAreaMetricsCreateManyH3Index5VenueRecommendationInputEnvelope>;
  delete?: InputMaybe<Array<SearchAreaMetricsWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<SearchAreaMetricsScalarWhereInput>>;
  disconnect?: InputMaybe<Array<SearchAreaMetricsWhereUniqueInput>>;
  set?: InputMaybe<Array<SearchAreaMetricsWhereUniqueInput>>;
  update?: InputMaybe<Array<SearchAreaMetricsUpdateWithWhereUniqueWithoutH3Index5VenueRecommendationInput>>;
  updateMany?: InputMaybe<Array<SearchAreaMetricsUpdateManyWithWhereWithoutH3Index5VenueRecommendationInput>>;
  upsert?: InputMaybe<Array<SearchAreaMetricsUpsertWithWhereUniqueWithoutH3Index5VenueRecommendationInput>>;
};

export type SearchAreaMetricsUpdateManyWithoutH3Index6VenueRecommendationNestedInput = {
  connect?: InputMaybe<Array<SearchAreaMetricsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SearchAreaMetricsCreateOrConnectWithoutH3Index6VenueRecommendationInput>>;
  create?: InputMaybe<Array<SearchAreaMetricsCreateWithoutH3Index6VenueRecommendationInput>>;
  createMany?: InputMaybe<SearchAreaMetricsCreateManyH3Index6VenueRecommendationInputEnvelope>;
  delete?: InputMaybe<Array<SearchAreaMetricsWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<SearchAreaMetricsScalarWhereInput>>;
  disconnect?: InputMaybe<Array<SearchAreaMetricsWhereUniqueInput>>;
  set?: InputMaybe<Array<SearchAreaMetricsWhereUniqueInput>>;
  update?: InputMaybe<Array<SearchAreaMetricsUpdateWithWhereUniqueWithoutH3Index6VenueRecommendationInput>>;
  updateMany?: InputMaybe<Array<SearchAreaMetricsUpdateManyWithWhereWithoutH3Index6VenueRecommendationInput>>;
  upsert?: InputMaybe<Array<SearchAreaMetricsUpsertWithWhereUniqueWithoutH3Index6VenueRecommendationInput>>;
};

export type SearchAreaMetricsUpdateManyWithoutSearchesServiceNestedInput = {
  connect?: InputMaybe<Array<SearchAreaMetricsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SearchAreaMetricsCreateOrConnectWithoutSearchesServiceInput>>;
  create?: InputMaybe<Array<SearchAreaMetricsCreateWithoutSearchesServiceInput>>;
  createMany?: InputMaybe<SearchAreaMetricsCreateManySearchesServiceInputEnvelope>;
  delete?: InputMaybe<Array<SearchAreaMetricsWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<SearchAreaMetricsScalarWhereInput>>;
  disconnect?: InputMaybe<Array<SearchAreaMetricsWhereUniqueInput>>;
  set?: InputMaybe<Array<SearchAreaMetricsWhereUniqueInput>>;
  update?: InputMaybe<Array<SearchAreaMetricsUpdateWithWhereUniqueWithoutSearchesServiceInput>>;
  updateMany?: InputMaybe<Array<SearchAreaMetricsUpdateManyWithWhereWithoutSearchesServiceInput>>;
  upsert?: InputMaybe<Array<SearchAreaMetricsUpsertWithWhereUniqueWithoutSearchesServiceInput>>;
};

export type SearchAreaMetricsUpdateManyWithWhereWithoutH3Index5VenueRecommendationInput = {
  data: SearchAreaMetricsUpdateManyMutationInput;
  where: SearchAreaMetricsScalarWhereInput;
};

export type SearchAreaMetricsUpdateManyWithWhereWithoutH3Index6VenueRecommendationInput = {
  data: SearchAreaMetricsUpdateManyMutationInput;
  where: SearchAreaMetricsScalarWhereInput;
};

export type SearchAreaMetricsUpdateManyWithWhereWithoutSearchesServiceInput = {
  data: SearchAreaMetricsUpdateManyMutationInput;
  where: SearchAreaMetricsScalarWhereInput;
};

export type SearchAreaMetricsUpdateWithoutH3Index5VenueRecommendationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  h3Index15?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationUpdateOneWithoutSearchAreaMetricsNestedInput>;
  SearchesService?: InputMaybe<SearchesServiceUpdateOneWithoutSearchAreaMetricsNestedInput>;
  timesRequested?: InputMaybe<IntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SearchAreaMetricsUpdateWithoutH3Index6VenueRecommendationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  h3Index15?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationUpdateOneWithoutSearchAreaMetricsNestedInput>;
  SearchesService?: InputMaybe<SearchesServiceUpdateOneWithoutSearchAreaMetricsNestedInput>;
  timesRequested?: InputMaybe<IntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SearchAreaMetricsUpdateWithoutSearchesServiceInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  h3Index15?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationUpdateOneWithoutSearchAreaMetricsNestedInput>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationUpdateOneWithoutSearchAreaMetricsNestedInput>;
  timesRequested?: InputMaybe<IntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SearchAreaMetricsUpdateWithWhereUniqueWithoutH3Index5VenueRecommendationInput = {
  data: SearchAreaMetricsUpdateWithoutH3Index5VenueRecommendationInput;
  where: SearchAreaMetricsWhereUniqueInput;
};

export type SearchAreaMetricsUpdateWithWhereUniqueWithoutH3Index6VenueRecommendationInput = {
  data: SearchAreaMetricsUpdateWithoutH3Index6VenueRecommendationInput;
  where: SearchAreaMetricsWhereUniqueInput;
};

export type SearchAreaMetricsUpdateWithWhereUniqueWithoutSearchesServiceInput = {
  data: SearchAreaMetricsUpdateWithoutSearchesServiceInput;
  where: SearchAreaMetricsWhereUniqueInput;
};

export type SearchAreaMetricsUpsertWithWhereUniqueWithoutH3Index5VenueRecommendationInput = {
  create: SearchAreaMetricsCreateWithoutH3Index5VenueRecommendationInput;
  update: SearchAreaMetricsUpdateWithoutH3Index5VenueRecommendationInput;
  where: SearchAreaMetricsWhereUniqueInput;
};

export type SearchAreaMetricsUpsertWithWhereUniqueWithoutH3Index6VenueRecommendationInput = {
  create: SearchAreaMetricsCreateWithoutH3Index6VenueRecommendationInput;
  update: SearchAreaMetricsUpdateWithoutH3Index6VenueRecommendationInput;
  where: SearchAreaMetricsWhereUniqueInput;
};

export type SearchAreaMetricsUpsertWithWhereUniqueWithoutSearchesServiceInput = {
  create: SearchAreaMetricsCreateWithoutSearchesServiceInput;
  update: SearchAreaMetricsUpdateWithoutSearchesServiceInput;
  where: SearchAreaMetricsWhereUniqueInput;
};

export type SearchAreaMetricsWhereInput = {
  AND?: InputMaybe<Array<SearchAreaMetricsWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  h3Index15?: InputMaybe<StringNullableFilter>;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationWhereInput>;
  h3Index5VenueRecommendationId?: InputMaybe<StringNullableFilter>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationWhereInput>;
  h3Index6VenueRecommendationId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  NOT?: InputMaybe<Array<SearchAreaMetricsWhereInput>>;
  OR?: InputMaybe<Array<SearchAreaMetricsWhereInput>>;
  SearchesService?: InputMaybe<SearchesServiceWhereInput>;
  searchesServiceId?: InputMaybe<StringNullableFilter>;
  timesRequested?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type SearchAreaMetricsWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type SearchesService = {
  __typename?: 'SearchesService';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  Profile: Profile;
  profileId: Scalars['String'];
  SearchAreaMetrics: Array<SearchAreaMetrics>;
  searches: Array<Scalars['Json']>;
  updatedAt: Scalars['DateTime'];
};


export type SearchesServiceSearchAreaMetricsArgs = {
  cursor?: InputMaybe<SearchAreaMetricsWhereUniqueInput>;
  distinct?: InputMaybe<Array<SearchAreaMetricsScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SearchAreaMetricsOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SearchAreaMetricsWhereInput>;
};

export type SearchesServiceCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  searches?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SearchesServiceCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  Profile: ProfileCreateNestedOneWithoutSearchesServiceInput;
  SearchAreaMetrics?: InputMaybe<SearchAreaMetricsCreateNestedManyWithoutSearchesServiceInput>;
  searches?: InputMaybe<Array<Scalars['Json']>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SearchesServiceCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  profileId: Scalars['String'];
  searches?: InputMaybe<Array<Scalars['Json']>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SearchesServiceCreateNestedOneWithoutProfileInput = {
  connect?: InputMaybe<SearchesServiceWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SearchesServiceCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<SearchesServiceCreateWithoutProfileInput>;
};

export type SearchesServiceCreateNestedOneWithoutSearchAreaMetricsInput = {
  connect?: InputMaybe<SearchesServiceWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SearchesServiceCreateOrConnectWithoutSearchAreaMetricsInput>;
  create?: InputMaybe<SearchesServiceCreateWithoutSearchAreaMetricsInput>;
};

export type SearchesServiceCreateOrConnectWithoutProfileInput = {
  create: SearchesServiceCreateWithoutProfileInput;
  where: SearchesServiceWhereUniqueInput;
};

export type SearchesServiceCreateOrConnectWithoutSearchAreaMetricsInput = {
  create: SearchesServiceCreateWithoutSearchAreaMetricsInput;
  where: SearchesServiceWhereUniqueInput;
};

export type SearchesServiceCreatesearchesInput = {
  set: Array<Scalars['Json']>;
};

export type SearchesServiceCreateWithoutProfileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  SearchAreaMetrics?: InputMaybe<SearchAreaMetricsCreateNestedManyWithoutSearchesServiceInput>;
  searches?: InputMaybe<Array<Scalars['Json']>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SearchesServiceCreateWithoutSearchAreaMetricsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  Profile: ProfileCreateNestedOneWithoutSearchesServiceInput;
  searches?: InputMaybe<Array<Scalars['Json']>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SearchesServiceMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SearchesServiceMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SearchesServiceOrderByWithAggregationInput = {
  _count?: InputMaybe<SearchesServiceCountOrderByAggregateInput>;
  _max?: InputMaybe<SearchesServiceMaxOrderByAggregateInput>;
  _min?: InputMaybe<SearchesServiceMinOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  searches?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SearchesServiceOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  Profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  profileId?: InputMaybe<SortOrder>;
  SearchAreaMetrics?: InputMaybe<SearchAreaMetricsOrderByRelationAggregateInput>;
  searches?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SearchesServiceRelationFilter = {
  is?: InputMaybe<SearchesServiceWhereInput>;
  isNot?: InputMaybe<SearchesServiceWhereInput>;
};

export enum SearchesServiceScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  ProfileId = 'profileId',
  Searches = 'searches',
  UpdatedAt = 'updatedAt'
}

export type SearchesServiceScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<SearchesServiceScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<SearchesServiceScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<SearchesServiceScalarWhereWithAggregatesInput>>;
  profileId?: InputMaybe<StringWithAggregatesFilter>;
  searches?: InputMaybe<JsonNullableListFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type SearchesServiceUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutSearchesServiceNestedInput>;
  SearchAreaMetrics?: InputMaybe<SearchAreaMetricsUpdateManyWithoutSearchesServiceNestedInput>;
  searches?: InputMaybe<Array<Scalars['Json']>>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SearchesServiceUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  searches?: InputMaybe<Array<Scalars['Json']>>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SearchesServiceUpdateOneWithoutProfileNestedInput = {
  connect?: InputMaybe<SearchesServiceWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SearchesServiceCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<SearchesServiceCreateWithoutProfileInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<SearchesServiceUpdateWithoutProfileInput>;
  upsert?: InputMaybe<SearchesServiceUpsertWithoutProfileInput>;
};

export type SearchesServiceUpdateOneWithoutSearchAreaMetricsNestedInput = {
  connect?: InputMaybe<SearchesServiceWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SearchesServiceCreateOrConnectWithoutSearchAreaMetricsInput>;
  create?: InputMaybe<SearchesServiceCreateWithoutSearchAreaMetricsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<SearchesServiceUpdateWithoutSearchAreaMetricsInput>;
  upsert?: InputMaybe<SearchesServiceUpsertWithoutSearchAreaMetricsInput>;
};

export type SearchesServiceUpdatesearchesInput = {
  push?: InputMaybe<Scalars['Json']>;
  set?: InputMaybe<Array<Scalars['Json']>>;
};

export type SearchesServiceUpdateWithoutProfileInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  SearchAreaMetrics?: InputMaybe<SearchAreaMetricsUpdateManyWithoutSearchesServiceNestedInput>;
  searches?: InputMaybe<Array<Scalars['Json']>>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SearchesServiceUpdateWithoutSearchAreaMetricsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutSearchesServiceNestedInput>;
  searches?: InputMaybe<Array<Scalars['Json']>>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SearchesServiceUpsertWithoutProfileInput = {
  create: SearchesServiceCreateWithoutProfileInput;
  update: SearchesServiceUpdateWithoutProfileInput;
};

export type SearchesServiceUpsertWithoutSearchAreaMetricsInput = {
  create: SearchesServiceCreateWithoutSearchAreaMetricsInput;
  update: SearchesServiceUpdateWithoutSearchAreaMetricsInput;
};

export type SearchesServiceWhereInput = {
  AND?: InputMaybe<Array<SearchesServiceWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<SearchesServiceWhereInput>>;
  OR?: InputMaybe<Array<SearchesServiceWhereInput>>;
  Profile?: InputMaybe<ProfileWhereInput>;
  profileId?: InputMaybe<StringFilter>;
  SearchAreaMetrics?: InputMaybe<SearchAreaMetricsListRelationFilter>;
  searches?: InputMaybe<JsonNullableListFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type SearchesServiceWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  profileId?: InputMaybe<Scalars['String']>;
};

export enum SecureDataType {
  Friending = 'FRIENDING',
  Joining = 'JOINING'
}

export type SecuredDataKeysAvgOrderByAggregateInput = {
  used?: InputMaybe<SortOrder>;
};

export type SecuredDataKeysCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  key?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  SecureDataType?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  used?: InputMaybe<SortOrder>;
};

export type SecuredDataKeysCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  key: Scalars['String'];
  Profile: ProfileCreateNestedOneWithoutSecuredDataKeysInput;
  SecureDataType: SecureDataType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  used?: InputMaybe<Scalars['Int']>;
};

export type SecuredDataKeysCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  key: Scalars['String'];
  profileId: Scalars['String'];
  SecureDataType: SecureDataType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  used?: InputMaybe<Scalars['Int']>;
};

export type SecuredDataKeysCreateManyProfileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  key: Scalars['String'];
  SecureDataType: SecureDataType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  used?: InputMaybe<Scalars['Int']>;
};

export type SecuredDataKeysCreateManyProfileInputEnvelope = {
  data: Array<SecuredDataKeysCreateManyProfileInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type SecuredDataKeysCreateNestedManyWithoutProfileInput = {
  connect?: InputMaybe<Array<SecuredDataKeysWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SecuredDataKeysCreateOrConnectWithoutProfileInput>>;
  create?: InputMaybe<Array<SecuredDataKeysCreateWithoutProfileInput>>;
  createMany?: InputMaybe<SecuredDataKeysCreateManyProfileInputEnvelope>;
};

export type SecuredDataKeysCreateOrConnectWithoutProfileInput = {
  create: SecuredDataKeysCreateWithoutProfileInput;
  where: SecuredDataKeysWhereUniqueInput;
};

export type SecuredDataKeysCreateWithoutProfileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  key: Scalars['String'];
  SecureDataType: SecureDataType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  used?: InputMaybe<Scalars['Int']>;
};

export type SecuredDataKeysListRelationFilter = {
  every?: InputMaybe<SecuredDataKeysWhereInput>;
  none?: InputMaybe<SecuredDataKeysWhereInput>;
  some?: InputMaybe<SecuredDataKeysWhereInput>;
};

export type SecuredDataKeysMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  key?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  SecureDataType?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  used?: InputMaybe<SortOrder>;
};

export type SecuredDataKeysMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  key?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  SecureDataType?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  used?: InputMaybe<SortOrder>;
};

export type SecuredDataKeysOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type SecuredDataKeysOrderByWithAggregationInput = {
  _avg?: InputMaybe<SecuredDataKeysAvgOrderByAggregateInput>;
  _count?: InputMaybe<SecuredDataKeysCountOrderByAggregateInput>;
  _max?: InputMaybe<SecuredDataKeysMaxOrderByAggregateInput>;
  _min?: InputMaybe<SecuredDataKeysMinOrderByAggregateInput>;
  _sum?: InputMaybe<SecuredDataKeysSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  key?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  SecureDataType?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  used?: InputMaybe<SortOrder>;
};

export type SecuredDataKeysOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  key?: InputMaybe<SortOrder>;
  Profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  profileId?: InputMaybe<SortOrder>;
  SecureDataType?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  used?: InputMaybe<SortOrder>;
};

export enum SecuredDataKeysScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  Key = 'key',
  ProfileId = 'profileId',
  SecureDataType = 'SecureDataType',
  UpdatedAt = 'updatedAt',
  Used = 'used'
}

export type SecuredDataKeysScalarWhereInput = {
  AND?: InputMaybe<Array<SecuredDataKeysScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  key?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<SecuredDataKeysScalarWhereInput>>;
  OR?: InputMaybe<Array<SecuredDataKeysScalarWhereInput>>;
  profileId?: InputMaybe<StringFilter>;
  SecureDataType?: InputMaybe<EnumSecureDataTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  used?: InputMaybe<IntFilter>;
};

export type SecuredDataKeysScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<SecuredDataKeysScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  key?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<SecuredDataKeysScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<SecuredDataKeysScalarWhereWithAggregatesInput>>;
  profileId?: InputMaybe<StringWithAggregatesFilter>;
  SecureDataType?: InputMaybe<EnumSecureDataTypeWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  used?: InputMaybe<IntWithAggregatesFilter>;
};

export type SecuredDataKeysSumOrderByAggregateInput = {
  used?: InputMaybe<SortOrder>;
};

export type SecuredDataKeysUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  key?: InputMaybe<StringFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutSecuredDataKeysNestedInput>;
  SecureDataType?: InputMaybe<EnumSecureDataTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  used?: InputMaybe<IntFieldUpdateOperationsInput>;
};

export type SecuredDataKeysUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  key?: InputMaybe<StringFieldUpdateOperationsInput>;
  SecureDataType?: InputMaybe<EnumSecureDataTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  used?: InputMaybe<IntFieldUpdateOperationsInput>;
};

export type SecuredDataKeysUpdateManyWithoutProfileNestedInput = {
  connect?: InputMaybe<Array<SecuredDataKeysWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SecuredDataKeysCreateOrConnectWithoutProfileInput>>;
  create?: InputMaybe<Array<SecuredDataKeysCreateWithoutProfileInput>>;
  createMany?: InputMaybe<SecuredDataKeysCreateManyProfileInputEnvelope>;
  delete?: InputMaybe<Array<SecuredDataKeysWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<SecuredDataKeysScalarWhereInput>>;
  disconnect?: InputMaybe<Array<SecuredDataKeysWhereUniqueInput>>;
  set?: InputMaybe<Array<SecuredDataKeysWhereUniqueInput>>;
  update?: InputMaybe<Array<SecuredDataKeysUpdateWithWhereUniqueWithoutProfileInput>>;
  updateMany?: InputMaybe<Array<SecuredDataKeysUpdateManyWithWhereWithoutProfileInput>>;
  upsert?: InputMaybe<Array<SecuredDataKeysUpsertWithWhereUniqueWithoutProfileInput>>;
};

export type SecuredDataKeysUpdateManyWithWhereWithoutProfileInput = {
  data: SecuredDataKeysUpdateManyMutationInput;
  where: SecuredDataKeysScalarWhereInput;
};

export type SecuredDataKeysUpdateWithoutProfileInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  key?: InputMaybe<StringFieldUpdateOperationsInput>;
  SecureDataType?: InputMaybe<EnumSecureDataTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  used?: InputMaybe<IntFieldUpdateOperationsInput>;
};

export type SecuredDataKeysUpdateWithWhereUniqueWithoutProfileInput = {
  data: SecuredDataKeysUpdateWithoutProfileInput;
  where: SecuredDataKeysWhereUniqueInput;
};

export type SecuredDataKeysUpsertWithWhereUniqueWithoutProfileInput = {
  create: SecuredDataKeysCreateWithoutProfileInput;
  update: SecuredDataKeysUpdateWithoutProfileInput;
  where: SecuredDataKeysWhereUniqueInput;
};

export type SecuredDataKeysWhereInput = {
  AND?: InputMaybe<Array<SecuredDataKeysWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  key?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<SecuredDataKeysWhereInput>>;
  OR?: InputMaybe<Array<SecuredDataKeysWhereInput>>;
  Profile?: InputMaybe<ProfileWhereInput>;
  profileId?: InputMaybe<StringFilter>;
  SecureDataType?: InputMaybe<EnumSecureDataTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  used?: InputMaybe<IntFilter>;
};

export type SecuredDataKeysWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};

export type SettingsCountOrderByAggregateInput = {
  eventPushNotifications?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  messagePushNotifications?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  PushNotifications?: InputMaybe<SortOrder>;
};

export type SettingsCreateInput = {
  eventPushNotifications: Scalars['Boolean'];
  id?: InputMaybe<Scalars['String']>;
  messagePushNotifications: Scalars['Boolean'];
  Profile: ProfileCreateNestedOneWithoutSettingsInput;
  PushNotifications: Scalars['Boolean'];
};

export type SettingsCreateManyInput = {
  eventPushNotifications: Scalars['Boolean'];
  id?: InputMaybe<Scalars['String']>;
  messagePushNotifications: Scalars['Boolean'];
  profileId: Scalars['String'];
  PushNotifications: Scalars['Boolean'];
};

export type SettingsCreateNestedOneWithoutProfileInput = {
  connect?: InputMaybe<SettingsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SettingsCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<SettingsCreateWithoutProfileInput>;
};

export type SettingsCreateOrConnectWithoutProfileInput = {
  create: SettingsCreateWithoutProfileInput;
  where: SettingsWhereUniqueInput;
};

export type SettingsCreateWithoutProfileInput = {
  eventPushNotifications: Scalars['Boolean'];
  id?: InputMaybe<Scalars['String']>;
  messagePushNotifications: Scalars['Boolean'];
  PushNotifications: Scalars['Boolean'];
};

export type SettingsMaxOrderByAggregateInput = {
  eventPushNotifications?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  messagePushNotifications?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  PushNotifications?: InputMaybe<SortOrder>;
};

export type SettingsMinOrderByAggregateInput = {
  eventPushNotifications?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  messagePushNotifications?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  PushNotifications?: InputMaybe<SortOrder>;
};

export type SettingsOrderByWithAggregationInput = {
  _count?: InputMaybe<SettingsCountOrderByAggregateInput>;
  _max?: InputMaybe<SettingsMaxOrderByAggregateInput>;
  _min?: InputMaybe<SettingsMinOrderByAggregateInput>;
  eventPushNotifications?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  messagePushNotifications?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  PushNotifications?: InputMaybe<SortOrder>;
};

export type SettingsOrderByWithRelationInput = {
  eventPushNotifications?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  messagePushNotifications?: InputMaybe<SortOrder>;
  Profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  profileId?: InputMaybe<SortOrder>;
  PushNotifications?: InputMaybe<SortOrder>;
};

export type SettingsRelationFilter = {
  is?: InputMaybe<SettingsWhereInput>;
  isNot?: InputMaybe<SettingsWhereInput>;
};

export enum SettingsScalarFieldEnum {
  EventPushNotifications = 'eventPushNotifications',
  Id = 'id',
  MessagePushNotifications = 'messagePushNotifications',
  ProfileId = 'profileId',
  PushNotifications = 'PushNotifications'
}

export type SettingsScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<SettingsScalarWhereWithAggregatesInput>>;
  eventPushNotifications?: InputMaybe<BoolWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  messagePushNotifications?: InputMaybe<BoolWithAggregatesFilter>;
  NOT?: InputMaybe<Array<SettingsScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<SettingsScalarWhereWithAggregatesInput>>;
  profileId?: InputMaybe<StringWithAggregatesFilter>;
  PushNotifications?: InputMaybe<BoolWithAggregatesFilter>;
};

export type SettingsUpdateInput = {
  eventPushNotifications?: InputMaybe<BoolFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  messagePushNotifications?: InputMaybe<BoolFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutSettingsNestedInput>;
  PushNotifications?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type SettingsUpdateManyMutationInput = {
  eventPushNotifications?: InputMaybe<BoolFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  messagePushNotifications?: InputMaybe<BoolFieldUpdateOperationsInput>;
  PushNotifications?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type SettingsUpdateOneWithoutProfileNestedInput = {
  connect?: InputMaybe<SettingsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SettingsCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<SettingsCreateWithoutProfileInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<SettingsUpdateWithoutProfileInput>;
  upsert?: InputMaybe<SettingsUpsertWithoutProfileInput>;
};

export type SettingsUpdateWithoutProfileInput = {
  eventPushNotifications?: InputMaybe<BoolFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  messagePushNotifications?: InputMaybe<BoolFieldUpdateOperationsInput>;
  PushNotifications?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type SettingsUpsertWithoutProfileInput = {
  create: SettingsCreateWithoutProfileInput;
  update: SettingsUpdateWithoutProfileInput;
};

export type SettingsWhereInput = {
  AND?: InputMaybe<Array<SettingsWhereInput>>;
  eventPushNotifications?: InputMaybe<BoolFilter>;
  id?: InputMaybe<StringFilter>;
  messagePushNotifications?: InputMaybe<BoolFilter>;
  NOT?: InputMaybe<Array<SettingsWhereInput>>;
  OR?: InputMaybe<Array<SettingsWhereInput>>;
  Profile?: InputMaybe<ProfileWhereInput>;
  profileId?: InputMaybe<StringFilter>;
  PushNotifications?: InputMaybe<BoolFilter>;
};

export type SettingsWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  profileId?: InputMaybe<Scalars['String']>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type State = {
  __typename?: 'State';
  Area: Array<Area>;
  Geometry: Geometry;
  geometryId: Scalars['Int'];
  id: Scalars['ID'];
  isoCode: Scalars['String'];
  name: Scalars['String'];
};


export type StateAreaArgs = {
  cursor?: InputMaybe<AreaWhereUniqueInput>;
  distinct?: InputMaybe<Array<AreaScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AreaOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AreaWhereInput>;
};

export type StateAvgOrderByAggregateInput = {
  geometryId?: InputMaybe<SortOrder>;
};

export type StateCountOrderByAggregateInput = {
  geometryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isoCode?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type StateCreateInput = {
  Area?: InputMaybe<AreaCreateNestedManyWithoutStateInput>;
  Geometry: GeometryCreateNestedOneWithoutStateInput;
  id?: InputMaybe<Scalars['String']>;
  isoCode: Scalars['String'];
  name: Scalars['String'];
};

export type StateCreateManyInput = {
  geometryId: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  isoCode: Scalars['String'];
  name: Scalars['String'];
};

export type StateCreateNestedOneWithoutAreaInput = {
  connect?: InputMaybe<StateWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StateCreateOrConnectWithoutAreaInput>;
  create?: InputMaybe<StateCreateWithoutAreaInput>;
};

export type StateCreateNestedOneWithoutGeometryInput = {
  connect?: InputMaybe<StateWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StateCreateOrConnectWithoutGeometryInput>;
  create?: InputMaybe<StateCreateWithoutGeometryInput>;
};

export type StateCreateOrConnectWithoutAreaInput = {
  create: StateCreateWithoutAreaInput;
  where: StateWhereUniqueInput;
};

export type StateCreateOrConnectWithoutGeometryInput = {
  create: StateCreateWithoutGeometryInput;
  where: StateWhereUniqueInput;
};

export type StateCreateWithoutAreaInput = {
  Geometry: GeometryCreateNestedOneWithoutStateInput;
  id?: InputMaybe<Scalars['String']>;
  isoCode: Scalars['String'];
  name: Scalars['String'];
};

export type StateCreateWithoutGeometryInput = {
  Area?: InputMaybe<AreaCreateNestedManyWithoutStateInput>;
  id?: InputMaybe<Scalars['String']>;
  isoCode: Scalars['String'];
  name: Scalars['String'];
};

export type StateMaxOrderByAggregateInput = {
  geometryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isoCode?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type StateMinOrderByAggregateInput = {
  geometryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isoCode?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type StateOrderByWithAggregationInput = {
  _avg?: InputMaybe<StateAvgOrderByAggregateInput>;
  _count?: InputMaybe<StateCountOrderByAggregateInput>;
  _max?: InputMaybe<StateMaxOrderByAggregateInput>;
  _min?: InputMaybe<StateMinOrderByAggregateInput>;
  _sum?: InputMaybe<StateSumOrderByAggregateInput>;
  geometryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isoCode?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type StateOrderByWithRelationInput = {
  Area?: InputMaybe<AreaOrderByRelationAggregateInput>;
  Geometry?: InputMaybe<GeometryOrderByWithRelationInput>;
  geometryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isoCode?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type StateRelationFilter = {
  is?: InputMaybe<StateWhereInput>;
  isNot?: InputMaybe<StateWhereInput>;
};

export type StateResponseObject = {
  __typename?: 'StateResponseObject';
  countryCode: Scalars['String'];
  isoCode: Scalars['String'];
  latitude?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export enum StateScalarFieldEnum {
  GeometryId = 'geometryId',
  Id = 'id',
  IsoCode = 'isoCode',
  Name = 'name'
}

export type StateScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<StateScalarWhereWithAggregatesInput>>;
  geometryId?: InputMaybe<IntWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  isoCode?: InputMaybe<StringWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<StateScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<StateScalarWhereWithAggregatesInput>>;
};

export type StateSumOrderByAggregateInput = {
  geometryId?: InputMaybe<SortOrder>;
};

export type StateUpdateInput = {
  Area?: InputMaybe<AreaUpdateManyWithoutStateNestedInput>;
  Geometry?: InputMaybe<GeometryUpdateOneRequiredWithoutStateNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isoCode?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type StateUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isoCode?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type StateUpdateOneRequiredWithoutAreaNestedInput = {
  connect?: InputMaybe<StateWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StateCreateOrConnectWithoutAreaInput>;
  create?: InputMaybe<StateCreateWithoutAreaInput>;
  update?: InputMaybe<StateUpdateWithoutAreaInput>;
  upsert?: InputMaybe<StateUpsertWithoutAreaInput>;
};

export type StateUpdateOneWithoutGeometryNestedInput = {
  connect?: InputMaybe<StateWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StateCreateOrConnectWithoutGeometryInput>;
  create?: InputMaybe<StateCreateWithoutGeometryInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<StateUpdateWithoutGeometryInput>;
  upsert?: InputMaybe<StateUpsertWithoutGeometryInput>;
};

export type StateUpdateWithoutAreaInput = {
  Geometry?: InputMaybe<GeometryUpdateOneRequiredWithoutStateNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isoCode?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type StateUpdateWithoutGeometryInput = {
  Area?: InputMaybe<AreaUpdateManyWithoutStateNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isoCode?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type StateUpsertWithoutAreaInput = {
  create: StateCreateWithoutAreaInput;
  update: StateUpdateWithoutAreaInput;
};

export type StateUpsertWithoutGeometryInput = {
  create: StateCreateWithoutGeometryInput;
  update: StateUpdateWithoutGeometryInput;
};

export type StateWhereInput = {
  AND?: InputMaybe<Array<StateWhereInput>>;
  Area?: InputMaybe<AreaListRelationFilter>;
  Geometry?: InputMaybe<GeometryWhereInput>;
  geometryId?: InputMaybe<IntFilter>;
  id?: InputMaybe<StringFilter>;
  isoCode?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<StateWhereInput>>;
  OR?: InputMaybe<Array<StateWhereInput>>;
};

export type StateWhereUniqueInput = {
  geometryId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  isoCode?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Story = {
  __typename?: 'Story';
  createdAt: Scalars['DateTime'];
  date: Scalars['DateTime'];
  emojimood?: Maybe<Emojimood>;
  id: Scalars['ID'];
  photos: Array<Photo>;
  Profile: Profile;
  startDate: Scalars['DateTime'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type StoryAvgOrderByAggregateInput = {
  emojimoodId?: InputMaybe<SortOrder>;
};

export type StoryCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  date?: InputMaybe<SortOrder>;
  emojimoodId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type StoryCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  date: Scalars['DateTime'];
  emojimood?: InputMaybe<EmojimoodCreateNestedOneWithoutStoryInput>;
  id?: InputMaybe<Scalars['String']>;
  Photos?: InputMaybe<PhotoCreateNestedManyWithoutStoryInput>;
  Profile?: InputMaybe<ProfileCreateNestedOneWithoutStorysInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type StoryCreateManyEmojimoodInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  date: Scalars['DateTime'];
  id?: InputMaybe<Scalars['String']>;
  profileId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type StoryCreateManyEmojimoodInputEnvelope = {
  data: Array<StoryCreateManyEmojimoodInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type StoryCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  date: Scalars['DateTime'];
  emojimoodId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  profileId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type StoryCreateManyProfileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  date: Scalars['DateTime'];
  emojimoodId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type StoryCreateManyProfileInputEnvelope = {
  data: Array<StoryCreateManyProfileInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type StoryCreateNestedManyWithoutEmojimoodInput = {
  connect?: InputMaybe<Array<StoryWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<StoryCreateOrConnectWithoutEmojimoodInput>>;
  create?: InputMaybe<Array<StoryCreateWithoutEmojimoodInput>>;
  createMany?: InputMaybe<StoryCreateManyEmojimoodInputEnvelope>;
};

export type StoryCreateNestedManyWithoutProfileInput = {
  connect?: InputMaybe<Array<StoryWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<StoryCreateOrConnectWithoutProfileInput>>;
  create?: InputMaybe<Array<StoryCreateWithoutProfileInput>>;
  createMany?: InputMaybe<StoryCreateManyProfileInputEnvelope>;
};

export type StoryCreateNestedOneWithoutPhotosInput = {
  connect?: InputMaybe<StoryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StoryCreateOrConnectWithoutPhotosInput>;
  create?: InputMaybe<StoryCreateWithoutPhotosInput>;
};

export type StoryCreateOrConnectWithoutEmojimoodInput = {
  create: StoryCreateWithoutEmojimoodInput;
  where: StoryWhereUniqueInput;
};

export type StoryCreateOrConnectWithoutPhotosInput = {
  create: StoryCreateWithoutPhotosInput;
  where: StoryWhereUniqueInput;
};

export type StoryCreateOrConnectWithoutProfileInput = {
  create: StoryCreateWithoutProfileInput;
  where: StoryWhereUniqueInput;
};

export type StoryCreateWithoutEmojimoodInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  date: Scalars['DateTime'];
  id?: InputMaybe<Scalars['String']>;
  Photos?: InputMaybe<PhotoCreateNestedManyWithoutStoryInput>;
  Profile?: InputMaybe<ProfileCreateNestedOneWithoutStorysInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type StoryCreateWithoutPhotosInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  date: Scalars['DateTime'];
  emojimood?: InputMaybe<EmojimoodCreateNestedOneWithoutStoryInput>;
  id?: InputMaybe<Scalars['String']>;
  Profile?: InputMaybe<ProfileCreateNestedOneWithoutStorysInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type StoryCreateWithoutProfileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  date: Scalars['DateTime'];
  emojimood?: InputMaybe<EmojimoodCreateNestedOneWithoutStoryInput>;
  id?: InputMaybe<Scalars['String']>;
  Photos?: InputMaybe<PhotoCreateNestedManyWithoutStoryInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type StoryListRelationFilter = {
  every?: InputMaybe<StoryWhereInput>;
  none?: InputMaybe<StoryWhereInput>;
  some?: InputMaybe<StoryWhereInput>;
};

export type StoryMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  date?: InputMaybe<SortOrder>;
  emojimoodId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type StoryMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  date?: InputMaybe<SortOrder>;
  emojimoodId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type StoryOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type StoryOrderByWithAggregationInput = {
  _avg?: InputMaybe<StoryAvgOrderByAggregateInput>;
  _count?: InputMaybe<StoryCountOrderByAggregateInput>;
  _max?: InputMaybe<StoryMaxOrderByAggregateInput>;
  _min?: InputMaybe<StoryMinOrderByAggregateInput>;
  _sum?: InputMaybe<StorySumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  date?: InputMaybe<SortOrder>;
  emojimoodId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type StoryOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  date?: InputMaybe<SortOrder>;
  emojimood?: InputMaybe<EmojimoodOrderByWithRelationInput>;
  emojimoodId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  Photos?: InputMaybe<PhotoOrderByRelationAggregateInput>;
  Profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type StoryRelationFilter = {
  is?: InputMaybe<StoryWhereInput>;
  isNot?: InputMaybe<StoryWhereInput>;
};

export enum StoryScalarFieldEnum {
  CreatedAt = 'createdAt',
  Date = 'date',
  EmojimoodId = 'emojimoodId',
  Id = 'id',
  ProfileId = 'profileId',
  UpdatedAt = 'updatedAt'
}

export type StoryScalarWhereInput = {
  AND?: InputMaybe<Array<StoryScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  date?: InputMaybe<DateTimeFilter>;
  emojimoodId?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<StoryScalarWhereInput>>;
  OR?: InputMaybe<Array<StoryScalarWhereInput>>;
  profileId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type StoryScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<StoryScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  date?: InputMaybe<DateTimeWithAggregatesFilter>;
  emojimoodId?: InputMaybe<IntNullableWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<StoryScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<StoryScalarWhereWithAggregatesInput>>;
  profileId?: InputMaybe<StringNullableWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type StorySumOrderByAggregateInput = {
  emojimoodId?: InputMaybe<SortOrder>;
};

export type StoryUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  date?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  emojimood?: InputMaybe<EmojimoodUpdateOneWithoutStoryNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Photos?: InputMaybe<PhotoUpdateManyWithoutStoryNestedInput>;
  Profile?: InputMaybe<ProfileUpdateOneWithoutStorysNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type StoryUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  date?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type StoryUpdateManyWithoutEmojimoodNestedInput = {
  connect?: InputMaybe<Array<StoryWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<StoryCreateOrConnectWithoutEmojimoodInput>>;
  create?: InputMaybe<Array<StoryCreateWithoutEmojimoodInput>>;
  createMany?: InputMaybe<StoryCreateManyEmojimoodInputEnvelope>;
  delete?: InputMaybe<Array<StoryWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<StoryScalarWhereInput>>;
  disconnect?: InputMaybe<Array<StoryWhereUniqueInput>>;
  set?: InputMaybe<Array<StoryWhereUniqueInput>>;
  update?: InputMaybe<Array<StoryUpdateWithWhereUniqueWithoutEmojimoodInput>>;
  updateMany?: InputMaybe<Array<StoryUpdateManyWithWhereWithoutEmojimoodInput>>;
  upsert?: InputMaybe<Array<StoryUpsertWithWhereUniqueWithoutEmojimoodInput>>;
};

export type StoryUpdateManyWithoutProfileNestedInput = {
  connect?: InputMaybe<Array<StoryWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<StoryCreateOrConnectWithoutProfileInput>>;
  create?: InputMaybe<Array<StoryCreateWithoutProfileInput>>;
  createMany?: InputMaybe<StoryCreateManyProfileInputEnvelope>;
  delete?: InputMaybe<Array<StoryWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<StoryScalarWhereInput>>;
  disconnect?: InputMaybe<Array<StoryWhereUniqueInput>>;
  set?: InputMaybe<Array<StoryWhereUniqueInput>>;
  update?: InputMaybe<Array<StoryUpdateWithWhereUniqueWithoutProfileInput>>;
  updateMany?: InputMaybe<Array<StoryUpdateManyWithWhereWithoutProfileInput>>;
  upsert?: InputMaybe<Array<StoryUpsertWithWhereUniqueWithoutProfileInput>>;
};

export type StoryUpdateManyWithWhereWithoutEmojimoodInput = {
  data: StoryUpdateManyMutationInput;
  where: StoryScalarWhereInput;
};

export type StoryUpdateManyWithWhereWithoutProfileInput = {
  data: StoryUpdateManyMutationInput;
  where: StoryScalarWhereInput;
};

export type StoryUpdateOneWithoutPhotosNestedInput = {
  connect?: InputMaybe<StoryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StoryCreateOrConnectWithoutPhotosInput>;
  create?: InputMaybe<StoryCreateWithoutPhotosInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<StoryUpdateWithoutPhotosInput>;
  upsert?: InputMaybe<StoryUpsertWithoutPhotosInput>;
};

export type StoryUpdateWithoutEmojimoodInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  date?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Photos?: InputMaybe<PhotoUpdateManyWithoutStoryNestedInput>;
  Profile?: InputMaybe<ProfileUpdateOneWithoutStorysNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type StoryUpdateWithoutPhotosInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  date?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  emojimood?: InputMaybe<EmojimoodUpdateOneWithoutStoryNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneWithoutStorysNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type StoryUpdateWithoutProfileInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  date?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  emojimood?: InputMaybe<EmojimoodUpdateOneWithoutStoryNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Photos?: InputMaybe<PhotoUpdateManyWithoutStoryNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type StoryUpdateWithWhereUniqueWithoutEmojimoodInput = {
  data: StoryUpdateWithoutEmojimoodInput;
  where: StoryWhereUniqueInput;
};

export type StoryUpdateWithWhereUniqueWithoutProfileInput = {
  data: StoryUpdateWithoutProfileInput;
  where: StoryWhereUniqueInput;
};

export type StoryUpsertWithoutPhotosInput = {
  create: StoryCreateWithoutPhotosInput;
  update: StoryUpdateWithoutPhotosInput;
};

export type StoryUpsertWithWhereUniqueWithoutEmojimoodInput = {
  create: StoryCreateWithoutEmojimoodInput;
  update: StoryUpdateWithoutEmojimoodInput;
  where: StoryWhereUniqueInput;
};

export type StoryUpsertWithWhereUniqueWithoutProfileInput = {
  create: StoryCreateWithoutProfileInput;
  update: StoryUpdateWithoutProfileInput;
  where: StoryWhereUniqueInput;
};

export type StoryWhereInput = {
  AND?: InputMaybe<Array<StoryWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  date?: InputMaybe<DateTimeFilter>;
  emojimood?: InputMaybe<EmojimoodWhereInput>;
  emojimoodId?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<StoryWhereInput>>;
  OR?: InputMaybe<Array<StoryWhereInput>>;
  Photos?: InputMaybe<PhotoListRelationFilter>;
  Profile?: InputMaybe<ProfileWhereInput>;
  profileId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type StoryWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type StringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableListFilter = {
  equals?: InputMaybe<Array<Scalars['String']>>;
  has?: InputMaybe<Scalars['String']>;
  hasEvery?: InputMaybe<Array<Scalars['String']>>;
  hasSome?: InputMaybe<Array<Scalars['String']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']>;
};

export type StringNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedStringNullableFilter>;
  _min?: InputMaybe<NestedStringNullableFilter>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedStringFilter>;
  _min?: InputMaybe<NestedStringFilter>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Tag = {
  __typename?: 'Tag';
  Category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['String']>;
  DetailInformation: Array<DetailInformation>;
  emoji?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type TagDetailInformationArgs = {
  cursor?: InputMaybe<DetailInformationWhereUniqueInput>;
  distinct?: InputMaybe<Array<DetailInformationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<DetailInformationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DetailInformationWhereInput>;
};

export type TagAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type TagCountOrderByAggregateInput = {
  categoryId?: InputMaybe<SortOrder>;
  emoji?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type TagCreateInput = {
  Category?: InputMaybe<CategoryCreateNestedOneWithoutTagsInput>;
  DetailInformation?: InputMaybe<DetailInformationCreateNestedManyWithoutTagsInput>;
  emoji?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type TagCreateManyCategoryInput = {
  emoji?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type TagCreateManyCategoryInputEnvelope = {
  data: Array<TagCreateManyCategoryInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type TagCreateManyInput = {
  categoryId?: InputMaybe<Scalars['String']>;
  emoji?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type TagCreateNestedManyWithoutCategoryInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TagCreateOrConnectWithoutCategoryInput>>;
  create?: InputMaybe<Array<TagCreateWithoutCategoryInput>>;
  createMany?: InputMaybe<TagCreateManyCategoryInputEnvelope>;
};

export type TagCreateNestedManyWithoutDetailInformationInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TagCreateOrConnectWithoutDetailInformationInput>>;
  create?: InputMaybe<Array<TagCreateWithoutDetailInformationInput>>;
};

export type TagCreateOrConnectWithoutCategoryInput = {
  create: TagCreateWithoutCategoryInput;
  where: TagWhereUniqueInput;
};

export type TagCreateOrConnectWithoutDetailInformationInput = {
  create: TagCreateWithoutDetailInformationInput;
  where: TagWhereUniqueInput;
};

export type TagCreateWithoutCategoryInput = {
  DetailInformation?: InputMaybe<DetailInformationCreateNestedManyWithoutTagsInput>;
  emoji?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type TagCreateWithoutDetailInformationInput = {
  Category?: InputMaybe<CategoryCreateNestedOneWithoutTagsInput>;
  emoji?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type TagListRelationFilter = {
  every?: InputMaybe<TagWhereInput>;
  none?: InputMaybe<TagWhereInput>;
  some?: InputMaybe<TagWhereInput>;
};

export type TagMaxOrderByAggregateInput = {
  categoryId?: InputMaybe<SortOrder>;
  emoji?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type TagMinOrderByAggregateInput = {
  categoryId?: InputMaybe<SortOrder>;
  emoji?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type TagOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type TagOrderByWithAggregationInput = {
  _avg?: InputMaybe<TagAvgOrderByAggregateInput>;
  _count?: InputMaybe<TagCountOrderByAggregateInput>;
  _max?: InputMaybe<TagMaxOrderByAggregateInput>;
  _min?: InputMaybe<TagMinOrderByAggregateInput>;
  _sum?: InputMaybe<TagSumOrderByAggregateInput>;
  categoryId?: InputMaybe<SortOrder>;
  emoji?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type TagOrderByWithRelationInput = {
  Category?: InputMaybe<CategoryOrderByWithRelationInput>;
  categoryId?: InputMaybe<SortOrder>;
  DetailInformation?: InputMaybe<DetailInformationOrderByRelationAggregateInput>;
  emoji?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export enum TagScalarFieldEnum {
  CategoryId = 'categoryId',
  Emoji = 'emoji',
  Id = 'id',
  Name = 'name'
}

export type TagScalarWhereInput = {
  AND?: InputMaybe<Array<TagScalarWhereInput>>;
  categoryId?: InputMaybe<StringNullableFilter>;
  emoji?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<TagScalarWhereInput>>;
  OR?: InputMaybe<Array<TagScalarWhereInput>>;
};

export type TagScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<TagScalarWhereWithAggregatesInput>>;
  categoryId?: InputMaybe<StringNullableWithAggregatesFilter>;
  emoji?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<TagScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<TagScalarWhereWithAggregatesInput>>;
};

export type TagSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type TagUpdateInput = {
  Category?: InputMaybe<CategoryUpdateOneWithoutTagsNestedInput>;
  DetailInformation?: InputMaybe<DetailInformationUpdateManyWithoutTagsNestedInput>;
  emoji?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type TagUpdateManyMutationInput = {
  emoji?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type TagUpdateManyWithoutCategoryNestedInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TagCreateOrConnectWithoutCategoryInput>>;
  create?: InputMaybe<Array<TagCreateWithoutCategoryInput>>;
  createMany?: InputMaybe<TagCreateManyCategoryInputEnvelope>;
  delete?: InputMaybe<Array<TagWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<TagScalarWhereInput>>;
  disconnect?: InputMaybe<Array<TagWhereUniqueInput>>;
  set?: InputMaybe<Array<TagWhereUniqueInput>>;
  update?: InputMaybe<Array<TagUpdateWithWhereUniqueWithoutCategoryInput>>;
  updateMany?: InputMaybe<Array<TagUpdateManyWithWhereWithoutCategoryInput>>;
  upsert?: InputMaybe<Array<TagUpsertWithWhereUniqueWithoutCategoryInput>>;
};

export type TagUpdateManyWithoutDetailInformationNestedInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TagCreateOrConnectWithoutDetailInformationInput>>;
  create?: InputMaybe<Array<TagCreateWithoutDetailInformationInput>>;
  delete?: InputMaybe<Array<TagWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<TagScalarWhereInput>>;
  disconnect?: InputMaybe<Array<TagWhereUniqueInput>>;
  set?: InputMaybe<Array<TagWhereUniqueInput>>;
  update?: InputMaybe<Array<TagUpdateWithWhereUniqueWithoutDetailInformationInput>>;
  updateMany?: InputMaybe<Array<TagUpdateManyWithWhereWithoutDetailInformationInput>>;
  upsert?: InputMaybe<Array<TagUpsertWithWhereUniqueWithoutDetailInformationInput>>;
};

export type TagUpdateManyWithWhereWithoutCategoryInput = {
  data: TagUpdateManyMutationInput;
  where: TagScalarWhereInput;
};

export type TagUpdateManyWithWhereWithoutDetailInformationInput = {
  data: TagUpdateManyMutationInput;
  where: TagScalarWhereInput;
};

export type TagUpdateWithoutCategoryInput = {
  DetailInformation?: InputMaybe<DetailInformationUpdateManyWithoutTagsNestedInput>;
  emoji?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type TagUpdateWithoutDetailInformationInput = {
  Category?: InputMaybe<CategoryUpdateOneWithoutTagsNestedInput>;
  emoji?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type TagUpdateWithWhereUniqueWithoutCategoryInput = {
  data: TagUpdateWithoutCategoryInput;
  where: TagWhereUniqueInput;
};

export type TagUpdateWithWhereUniqueWithoutDetailInformationInput = {
  data: TagUpdateWithoutDetailInformationInput;
  where: TagWhereUniqueInput;
};

export type TagUpsertWithWhereUniqueWithoutCategoryInput = {
  create: TagCreateWithoutCategoryInput;
  update: TagUpdateWithoutCategoryInput;
  where: TagWhereUniqueInput;
};

export type TagUpsertWithWhereUniqueWithoutDetailInformationInput = {
  create: TagCreateWithoutDetailInformationInput;
  update: TagUpdateWithoutDetailInformationInput;
  where: TagWhereUniqueInput;
};

export type TagWhereInput = {
  AND?: InputMaybe<Array<TagWhereInput>>;
  Category?: InputMaybe<CategoryWhereInput>;
  categoryId?: InputMaybe<StringNullableFilter>;
  DetailInformation?: InputMaybe<DetailInformationListRelationFilter>;
  emoji?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<TagWhereInput>>;
  OR?: InputMaybe<Array<TagWhereInput>>;
};

export type TagWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type Theme = {
  __typename?: 'Theme';
  createdAt: Scalars['DateTime'];
  endDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  mobileVersions: Array<Scalars['String']>;
  name: Scalars['String'];
  ProfileTheme: Array<ProfileTheme>;
  startDate?: Maybe<Scalars['DateTime']>;
  theme: Scalars['Json'];
  updatedAt: Scalars['DateTime'];
  webVersions: Array<Scalars['String']>;
};

export type ThemeCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  endDate?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  mobileVersions?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  startDate?: InputMaybe<SortOrder>;
  theme?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  webVersions?: InputMaybe<SortOrder>;
};

export type ThemeCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  mobileVersions?: InputMaybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  ProfileTheme?: InputMaybe<ProfileThemeCreateNestedManyWithoutThemeInput>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  theme: Scalars['Json'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  webVersions?: InputMaybe<Array<Scalars['String']>>;
};

export type ThemeCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  mobileVersions?: InputMaybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  startDate?: InputMaybe<Scalars['DateTime']>;
  theme: Scalars['Json'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  webVersions?: InputMaybe<Array<Scalars['String']>>;
};

export type ThemeCreatemobileVersionsInput = {
  set: Array<Scalars['String']>;
};

export type ThemeCreateNestedOneWithoutProfileThemeInput = {
  connect?: InputMaybe<ThemeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ThemeCreateOrConnectWithoutProfileThemeInput>;
  create?: InputMaybe<ThemeCreateWithoutProfileThemeInput>;
};

export type ThemeCreateOrConnectWithoutProfileThemeInput = {
  create: ThemeCreateWithoutProfileThemeInput;
  where: ThemeWhereUniqueInput;
};

export type ThemeCreatewebVersionsInput = {
  set: Array<Scalars['String']>;
};

export type ThemeCreateWithoutProfileThemeInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  mobileVersions?: InputMaybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  startDate?: InputMaybe<Scalars['DateTime']>;
  theme: Scalars['Json'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  webVersions?: InputMaybe<Array<Scalars['String']>>;
};

export type ThemeManager = {
  __typename?: 'ThemeManager';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  Profile: Profile;
  profileId: Scalars['String'];
  ProfileTheme: Array<ProfileTheme>;
  updatedAt: Scalars['DateTime'];
};


export type ThemeManagerProfileThemeArgs = {
  cursor?: InputMaybe<ProfileThemeWhereUniqueInput>;
  distinct?: InputMaybe<Array<ProfileThemeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ProfileThemeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProfileThemeWhereInput>;
};

export type ThemeManagerCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ThemeManagerCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  Profile: ProfileCreateNestedOneWithoutThemeManagerInput;
  ProfileTheme?: InputMaybe<ProfileThemeCreateNestedManyWithoutThemeManagerInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ThemeManagerCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  profileId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ThemeManagerCreateNestedOneWithoutProfileInput = {
  connect?: InputMaybe<ThemeManagerWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ThemeManagerCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<ThemeManagerCreateWithoutProfileInput>;
};

export type ThemeManagerCreateNestedOneWithoutProfileThemeInput = {
  connect?: InputMaybe<ThemeManagerWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ThemeManagerCreateOrConnectWithoutProfileThemeInput>;
  create?: InputMaybe<ThemeManagerCreateWithoutProfileThemeInput>;
};

export type ThemeManagerCreateOrConnectWithoutProfileInput = {
  create: ThemeManagerCreateWithoutProfileInput;
  where: ThemeManagerWhereUniqueInput;
};

export type ThemeManagerCreateOrConnectWithoutProfileThemeInput = {
  create: ThemeManagerCreateWithoutProfileThemeInput;
  where: ThemeManagerWhereUniqueInput;
};

export type ThemeManagerCreateWithoutProfileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  ProfileTheme?: InputMaybe<ProfileThemeCreateNestedManyWithoutThemeManagerInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ThemeManagerCreateWithoutProfileThemeInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  Profile: ProfileCreateNestedOneWithoutThemeManagerInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ThemeManagerMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ThemeManagerMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ThemeManagerOrderByWithAggregationInput = {
  _count?: InputMaybe<ThemeManagerCountOrderByAggregateInput>;
  _max?: InputMaybe<ThemeManagerMaxOrderByAggregateInput>;
  _min?: InputMaybe<ThemeManagerMinOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ThemeManagerOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  Profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  profileId?: InputMaybe<SortOrder>;
  ProfileTheme?: InputMaybe<ProfileThemeOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ThemeManagerRelationFilter = {
  is?: InputMaybe<ThemeManagerWhereInput>;
  isNot?: InputMaybe<ThemeManagerWhereInput>;
};

export enum ThemeManagerScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  ProfileId = 'profileId',
  UpdatedAt = 'updatedAt'
}

export type ThemeManagerScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<ThemeManagerScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<ThemeManagerScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<ThemeManagerScalarWhereWithAggregatesInput>>;
  profileId?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type ThemeManagerUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutThemeManagerNestedInput>;
  ProfileTheme?: InputMaybe<ProfileThemeUpdateManyWithoutThemeManagerNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ThemeManagerUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ThemeManagerUpdateOneWithoutProfileNestedInput = {
  connect?: InputMaybe<ThemeManagerWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ThemeManagerCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<ThemeManagerCreateWithoutProfileInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<ThemeManagerUpdateWithoutProfileInput>;
  upsert?: InputMaybe<ThemeManagerUpsertWithoutProfileInput>;
};

export type ThemeManagerUpdateOneWithoutProfileThemeNestedInput = {
  connect?: InputMaybe<ThemeManagerWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ThemeManagerCreateOrConnectWithoutProfileThemeInput>;
  create?: InputMaybe<ThemeManagerCreateWithoutProfileThemeInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<ThemeManagerUpdateWithoutProfileThemeInput>;
  upsert?: InputMaybe<ThemeManagerUpsertWithoutProfileThemeInput>;
};

export type ThemeManagerUpdateWithoutProfileInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  ProfileTheme?: InputMaybe<ProfileThemeUpdateManyWithoutThemeManagerNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ThemeManagerUpdateWithoutProfileThemeInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutThemeManagerNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ThemeManagerUpsertWithoutProfileInput = {
  create: ThemeManagerCreateWithoutProfileInput;
  update: ThemeManagerUpdateWithoutProfileInput;
};

export type ThemeManagerUpsertWithoutProfileThemeInput = {
  create: ThemeManagerCreateWithoutProfileThemeInput;
  update: ThemeManagerUpdateWithoutProfileThemeInput;
};

export type ThemeManagerWhereInput = {
  AND?: InputMaybe<Array<ThemeManagerWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<ThemeManagerWhereInput>>;
  OR?: InputMaybe<Array<ThemeManagerWhereInput>>;
  Profile?: InputMaybe<ProfileWhereInput>;
  profileId?: InputMaybe<StringFilter>;
  ProfileTheme?: InputMaybe<ProfileThemeListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ThemeManagerWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  profileId?: InputMaybe<Scalars['String']>;
};

export type ThemeMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  endDate?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  startDate?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ThemeMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  endDate?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  startDate?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ThemeOrderByWithAggregationInput = {
  _count?: InputMaybe<ThemeCountOrderByAggregateInput>;
  _max?: InputMaybe<ThemeMaxOrderByAggregateInput>;
  _min?: InputMaybe<ThemeMinOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  endDate?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  mobileVersions?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  startDate?: InputMaybe<SortOrder>;
  theme?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  webVersions?: InputMaybe<SortOrder>;
};

export type ThemeOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  endDate?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  mobileVersions?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  ProfileTheme?: InputMaybe<ProfileThemeOrderByRelationAggregateInput>;
  startDate?: InputMaybe<SortOrder>;
  theme?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  webVersions?: InputMaybe<SortOrder>;
};

export type ThemeRelationFilter = {
  is?: InputMaybe<ThemeWhereInput>;
  isNot?: InputMaybe<ThemeWhereInput>;
};

export enum ThemeScalarFieldEnum {
  CreatedAt = 'createdAt',
  EndDate = 'endDate',
  Id = 'id',
  MobileVersions = 'mobileVersions',
  Name = 'name',
  StartDate = 'startDate',
  Theme = 'theme',
  UpdatedAt = 'updatedAt',
  WebVersions = 'webVersions'
}

export type ThemeScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<ThemeScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  endDate?: InputMaybe<DateTimeNullableWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  mobileVersions?: InputMaybe<StringNullableListFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<ThemeScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<ThemeScalarWhereWithAggregatesInput>>;
  startDate?: InputMaybe<DateTimeNullableWithAggregatesFilter>;
  theme?: InputMaybe<JsonWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  webVersions?: InputMaybe<StringNullableListFilter>;
};

export type ThemeUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  endDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mobileVersions?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  ProfileTheme?: InputMaybe<ProfileThemeUpdateManyWithoutThemeNestedInput>;
  startDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  theme?: InputMaybe<Scalars['Json']>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  webVersions?: InputMaybe<Array<Scalars['String']>>;
};

export type ThemeUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  endDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mobileVersions?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  startDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  theme?: InputMaybe<Scalars['Json']>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  webVersions?: InputMaybe<Array<Scalars['String']>>;
};

export type ThemeUpdatemobileVersionsInput = {
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type ThemeUpdateOneRequiredWithoutProfileThemeNestedInput = {
  connect?: InputMaybe<ThemeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ThemeCreateOrConnectWithoutProfileThemeInput>;
  create?: InputMaybe<ThemeCreateWithoutProfileThemeInput>;
  update?: InputMaybe<ThemeUpdateWithoutProfileThemeInput>;
  upsert?: InputMaybe<ThemeUpsertWithoutProfileThemeInput>;
};

export type ThemeUpdatewebVersionsInput = {
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type ThemeUpdateWithoutProfileThemeInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  endDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mobileVersions?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  startDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  theme?: InputMaybe<Scalars['Json']>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  webVersions?: InputMaybe<Array<Scalars['String']>>;
};

export type ThemeUpsertWithoutProfileThemeInput = {
  create: ThemeCreateWithoutProfileThemeInput;
  update: ThemeUpdateWithoutProfileThemeInput;
};

export type ThemeWhereInput = {
  AND?: InputMaybe<Array<ThemeWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  endDate?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  mobileVersions?: InputMaybe<StringNullableListFilter>;
  name?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<ThemeWhereInput>>;
  OR?: InputMaybe<Array<ThemeWhereInput>>;
  ProfileTheme?: InputMaybe<ProfileThemeListRelationFilter>;
  startDate?: InputMaybe<DateTimeNullableFilter>;
  theme?: InputMaybe<JsonFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  webVersions?: InputMaybe<StringNullableListFilter>;
};

export type ThemeWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type TonightPathCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type TonightPathCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  Path?: InputMaybe<PathCreateNestedManyWithoutTonightPathInput>;
  profileId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type TonightPathCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  profileId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type TonightPathCreateNestedOneWithoutPathInput = {
  connect?: InputMaybe<TonightPathWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TonightPathCreateOrConnectWithoutPathInput>;
  create?: InputMaybe<TonightPathCreateWithoutPathInput>;
};

export type TonightPathCreateOrConnectWithoutPathInput = {
  create: TonightPathCreateWithoutPathInput;
  where: TonightPathWhereUniqueInput;
};

export type TonightPathCreateWithoutPathInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  profileId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type TonightPathMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type TonightPathMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type TonightPathOrderByWithAggregationInput = {
  _count?: InputMaybe<TonightPathCountOrderByAggregateInput>;
  _max?: InputMaybe<TonightPathMaxOrderByAggregateInput>;
  _min?: InputMaybe<TonightPathMinOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type TonightPathOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  Path?: InputMaybe<PathOrderByRelationAggregateInput>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type TonightPathRelationFilter = {
  is?: InputMaybe<TonightPathWhereInput>;
  isNot?: InputMaybe<TonightPathWhereInput>;
};

export enum TonightPathScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  ProfileId = 'profileId',
  UpdatedAt = 'updatedAt'
}

export type TonightPathScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<TonightPathScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<TonightPathScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<TonightPathScalarWhereWithAggregatesInput>>;
  profileId?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type TonightPathUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Path?: InputMaybe<PathUpdateManyWithoutTonightPathNestedInput>;
  profileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type TonightPathUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  profileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type TonightPathUpdateOneWithoutPathNestedInput = {
  connect?: InputMaybe<TonightPathWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TonightPathCreateOrConnectWithoutPathInput>;
  create?: InputMaybe<TonightPathCreateWithoutPathInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<TonightPathUpdateWithoutPathInput>;
  upsert?: InputMaybe<TonightPathUpsertWithoutPathInput>;
};

export type TonightPathUpdateWithoutPathInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  profileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type TonightPathUpsertWithoutPathInput = {
  create: TonightPathCreateWithoutPathInput;
  update: TonightPathUpdateWithoutPathInput;
};

export type TonightPathWhereInput = {
  AND?: InputMaybe<Array<TonightPathWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<TonightPathWhereInput>>;
  OR?: InputMaybe<Array<TonightPathWhereInput>>;
  Path?: InputMaybe<PathListRelationFilter>;
  profileId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type TonightPathWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export enum TransactionIsolationLevel {
  ReadCommitted = 'ReadCommitted',
  ReadUncommitted = 'ReadUncommitted',
  RepeatableRead = 'RepeatableRead',
  Serializable = 'Serializable'
}

export enum TypeOfDocument {
  ProfilePrivacyPolicy = 'PROFILE_PRIVACY_POLICY',
  ProfileTermsOfService = 'PROFILE_TERMS_OF_SERVICE'
}

export type UpdateManyNotificationStatusInput = {
  /** List of the NotificationStatus IDs to update */
  notificationStatusIds: Array<UpdateNotificationStatusInput>;
};

export type UpdateManyNotificationStatusUnionResponse = Error | UpdateNotificationResponse;

export type UpdateNotificationResponse = {
  __typename?: 'UpdateNotificationResponse';
  count: Scalars['Int'];
};

export type UpdateNotificationStatusInput = {
  /** A NotificationStatus ID */
  id: Scalars['String'];
};

export type Venue = {
  __typename?: 'Venue';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  LiveOutVenue?: Maybe<LiveOutVenue>;
  Location?: Maybe<Location>;
  name?: Maybe<Scalars['String']>;
  Profile: Profile;
  profileId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  VenueStats: VenueStats;
  venueStatsId: Scalars['String'];
};

export type VenueContactInput = {
  type?: InputMaybe<Scalars['String']>;
  value: Scalars['String'];
};

export type VenueCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  venueStatsId?: InputMaybe<SortOrder>;
};

export type VenueCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  LiveOutVenue?: InputMaybe<LiveOutVenueCreateNestedOneWithoutVenueInput>;
  Location?: InputMaybe<LocationCreateNestedOneWithoutVenueInput>;
  name?: InputMaybe<Scalars['String']>;
  Profile: ProfileCreateNestedOneWithoutVenueInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  VenueStats: VenueStatsCreateNestedOneWithoutVenueInput;
};

export type VenueCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  profileId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueStatsId: Scalars['String'];
};

export type VenueCreateNestedOneWithoutLiveOutVenueInput = {
  connect?: InputMaybe<VenueWhereUniqueInput>;
  connectOrCreate?: InputMaybe<VenueCreateOrConnectWithoutLiveOutVenueInput>;
  create?: InputMaybe<VenueCreateWithoutLiveOutVenueInput>;
};

export type VenueCreateNestedOneWithoutLocationInput = {
  connect?: InputMaybe<VenueWhereUniqueInput>;
  connectOrCreate?: InputMaybe<VenueCreateOrConnectWithoutLocationInput>;
  create?: InputMaybe<VenueCreateWithoutLocationInput>;
};

export type VenueCreateNestedOneWithoutProfileInput = {
  connect?: InputMaybe<VenueWhereUniqueInput>;
  connectOrCreate?: InputMaybe<VenueCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<VenueCreateWithoutProfileInput>;
};

export type VenueCreateNestedOneWithoutVenueStatsInput = {
  connect?: InputMaybe<VenueWhereUniqueInput>;
  connectOrCreate?: InputMaybe<VenueCreateOrConnectWithoutVenueStatsInput>;
  create?: InputMaybe<VenueCreateWithoutVenueStatsInput>;
};

export type VenueCreateOrConnectWithoutLiveOutVenueInput = {
  create: VenueCreateWithoutLiveOutVenueInput;
  where: VenueWhereUniqueInput;
};

export type VenueCreateOrConnectWithoutLocationInput = {
  create: VenueCreateWithoutLocationInput;
  where: VenueWhereUniqueInput;
};

export type VenueCreateOrConnectWithoutProfileInput = {
  create: VenueCreateWithoutProfileInput;
  where: VenueWhereUniqueInput;
};

export type VenueCreateOrConnectWithoutVenueStatsInput = {
  create: VenueCreateWithoutVenueStatsInput;
  where: VenueWhereUniqueInput;
};

export type VenueCreateWithoutLiveOutVenueInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  Location?: InputMaybe<LocationCreateNestedOneWithoutVenueInput>;
  name?: InputMaybe<Scalars['String']>;
  Profile: ProfileCreateNestedOneWithoutVenueInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  VenueStats: VenueStatsCreateNestedOneWithoutVenueInput;
};

export type VenueCreateWithoutLocationInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  LiveOutVenue?: InputMaybe<LiveOutVenueCreateNestedOneWithoutVenueInput>;
  name?: InputMaybe<Scalars['String']>;
  Profile: ProfileCreateNestedOneWithoutVenueInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  VenueStats: VenueStatsCreateNestedOneWithoutVenueInput;
};

export type VenueCreateWithoutProfileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  LiveOutVenue?: InputMaybe<LiveOutVenueCreateNestedOneWithoutVenueInput>;
  Location?: InputMaybe<LocationCreateNestedOneWithoutVenueInput>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  VenueStats: VenueStatsCreateNestedOneWithoutVenueInput;
};

export type VenueCreateWithoutVenueStatsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  LiveOutVenue?: InputMaybe<LiveOutVenueCreateNestedOneWithoutVenueInput>;
  Location?: InputMaybe<LocationCreateNestedOneWithoutVenueInput>;
  name?: InputMaybe<Scalars['String']>;
  Profile: ProfileCreateNestedOneWithoutVenueInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type VenueMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  venueStatsId?: InputMaybe<SortOrder>;
};

export type VenueMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  venueStatsId?: InputMaybe<SortOrder>;
};

export type VenueOrderByWithAggregationInput = {
  _count?: InputMaybe<VenueCountOrderByAggregateInput>;
  _max?: InputMaybe<VenueMaxOrderByAggregateInput>;
  _min?: InputMaybe<VenueMinOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  venueStatsId?: InputMaybe<SortOrder>;
};

export type VenueOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  LiveOutVenue?: InputMaybe<LiveOutVenueOrderByWithRelationInput>;
  Location?: InputMaybe<LocationOrderByWithRelationInput>;
  name?: InputMaybe<SortOrder>;
  Profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  VenueStats?: InputMaybe<VenueStatsOrderByWithRelationInput>;
  venueStatsId?: InputMaybe<SortOrder>;
};

export type VenueRelationFilter = {
  is?: InputMaybe<VenueWhereInput>;
  isNot?: InputMaybe<VenueWhereInput>;
};

export enum VenueScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  ProfileId = 'profileId',
  UpdatedAt = 'updatedAt',
  VenueStatsId = 'venueStatsId'
}

export type VenueScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<VenueScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  name?: InputMaybe<StringNullableWithAggregatesFilter>;
  NOT?: InputMaybe<Array<VenueScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<VenueScalarWhereWithAggregatesInput>>;
  profileId?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  venueStatsId?: InputMaybe<StringWithAggregatesFilter>;
};

export type VenuesNearbyResponse = {
  __typename?: 'VenuesNearbyResponse';
  searchArea?: Maybe<Area>;
  venuesNearby: Array<ProfileVenue>;
};

export type VenueStats = {
  __typename?: 'VenueStats';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  Out: Array<Out>;
  updatedAt: Scalars['DateTime'];
  Venue?: Maybe<Venue>;
};


export type VenueStatsOutArgs = {
  cursor?: InputMaybe<OutWhereUniqueInput>;
  distinct?: InputMaybe<Array<OutScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OutOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OutWhereInput>;
};

export type VenueStatsCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type VenueStatsCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  Out?: InputMaybe<OutCreateNestedManyWithoutVenueStatsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutVenueStatsInput>;
};

export type VenueStatsCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type VenueStatsCreateNestedOneWithoutOutInput = {
  connect?: InputMaybe<VenueStatsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<VenueStatsCreateOrConnectWithoutOutInput>;
  create?: InputMaybe<VenueStatsCreateWithoutOutInput>;
};

export type VenueStatsCreateNestedOneWithoutVenueInput = {
  connect?: InputMaybe<VenueStatsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<VenueStatsCreateOrConnectWithoutVenueInput>;
  create?: InputMaybe<VenueStatsCreateWithoutVenueInput>;
};

export type VenueStatsCreateOrConnectWithoutOutInput = {
  create: VenueStatsCreateWithoutOutInput;
  where: VenueStatsWhereUniqueInput;
};

export type VenueStatsCreateOrConnectWithoutVenueInput = {
  create: VenueStatsCreateWithoutVenueInput;
  where: VenueStatsWhereUniqueInput;
};

export type VenueStatsCreateWithoutOutInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutVenueStatsInput>;
};

export type VenueStatsCreateWithoutVenueInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  Out?: InputMaybe<OutCreateNestedManyWithoutVenueStatsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type VenueStatsMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type VenueStatsMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type VenueStatsOrderByWithAggregationInput = {
  _count?: InputMaybe<VenueStatsCountOrderByAggregateInput>;
  _max?: InputMaybe<VenueStatsMaxOrderByAggregateInput>;
  _min?: InputMaybe<VenueStatsMinOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type VenueStatsOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  Out?: InputMaybe<OutOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
  Venue?: InputMaybe<VenueOrderByWithRelationInput>;
};

export type VenueStatsRelationFilter = {
  is?: InputMaybe<VenueStatsWhereInput>;
  isNot?: InputMaybe<VenueStatsWhereInput>;
};

export enum VenueStatsScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  UpdatedAt = 'updatedAt'
}

export type VenueStatsScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<VenueStatsScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<VenueStatsScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<VenueStatsScalarWhereWithAggregatesInput>>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type VenueStatsUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Out?: InputMaybe<OutUpdateManyWithoutVenueStatsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutVenueStatsNestedInput>;
};

export type VenueStatsUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type VenueStatsUpdateOneRequiredWithoutVenueNestedInput = {
  connect?: InputMaybe<VenueStatsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<VenueStatsCreateOrConnectWithoutVenueInput>;
  create?: InputMaybe<VenueStatsCreateWithoutVenueInput>;
  update?: InputMaybe<VenueStatsUpdateWithoutVenueInput>;
  upsert?: InputMaybe<VenueStatsUpsertWithoutVenueInput>;
};

export type VenueStatsUpdateOneWithoutOutNestedInput = {
  connect?: InputMaybe<VenueStatsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<VenueStatsCreateOrConnectWithoutOutInput>;
  create?: InputMaybe<VenueStatsCreateWithoutOutInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<VenueStatsUpdateWithoutOutInput>;
  upsert?: InputMaybe<VenueStatsUpsertWithoutOutInput>;
};

export type VenueStatsUpdateWithoutOutInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutVenueStatsNestedInput>;
};

export type VenueStatsUpdateWithoutVenueInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Out?: InputMaybe<OutUpdateManyWithoutVenueStatsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type VenueStatsUpsertWithoutOutInput = {
  create: VenueStatsCreateWithoutOutInput;
  update: VenueStatsUpdateWithoutOutInput;
};

export type VenueStatsUpsertWithoutVenueInput = {
  create: VenueStatsCreateWithoutVenueInput;
  update: VenueStatsUpdateWithoutVenueInput;
};

export type VenueStatsWhereInput = {
  AND?: InputMaybe<Array<VenueStatsWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<VenueStatsWhereInput>>;
  OR?: InputMaybe<Array<VenueStatsWhereInput>>;
  Out?: InputMaybe<OutListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  Venue?: InputMaybe<VenueWhereInput>;
};

export type VenueStatsWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type VenueUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  LiveOutVenue?: InputMaybe<LiveOutVenueUpdateOneWithoutVenueNestedInput>;
  Location?: InputMaybe<LocationUpdateOneWithoutVenueNestedInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutVenueNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  VenueStats?: InputMaybe<VenueStatsUpdateOneRequiredWithoutVenueNestedInput>;
};

export type VenueUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type VenueUpdateOneRequiredWithoutLiveOutVenueNestedInput = {
  connect?: InputMaybe<VenueWhereUniqueInput>;
  connectOrCreate?: InputMaybe<VenueCreateOrConnectWithoutLiveOutVenueInput>;
  create?: InputMaybe<VenueCreateWithoutLiveOutVenueInput>;
  update?: InputMaybe<VenueUpdateWithoutLiveOutVenueInput>;
  upsert?: InputMaybe<VenueUpsertWithoutLiveOutVenueInput>;
};

export type VenueUpdateOneWithoutLocationNestedInput = {
  connect?: InputMaybe<VenueWhereUniqueInput>;
  connectOrCreate?: InputMaybe<VenueCreateOrConnectWithoutLocationInput>;
  create?: InputMaybe<VenueCreateWithoutLocationInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<VenueUpdateWithoutLocationInput>;
  upsert?: InputMaybe<VenueUpsertWithoutLocationInput>;
};

export type VenueUpdateOneWithoutProfileNestedInput = {
  connect?: InputMaybe<VenueWhereUniqueInput>;
  connectOrCreate?: InputMaybe<VenueCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<VenueCreateWithoutProfileInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<VenueUpdateWithoutProfileInput>;
  upsert?: InputMaybe<VenueUpsertWithoutProfileInput>;
};

export type VenueUpdateOneWithoutVenueStatsNestedInput = {
  connect?: InputMaybe<VenueWhereUniqueInput>;
  connectOrCreate?: InputMaybe<VenueCreateOrConnectWithoutVenueStatsInput>;
  create?: InputMaybe<VenueCreateWithoutVenueStatsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<VenueUpdateWithoutVenueStatsInput>;
  upsert?: InputMaybe<VenueUpsertWithoutVenueStatsInput>;
};

export type VenueUpdateWithoutLiveOutVenueInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Location?: InputMaybe<LocationUpdateOneWithoutVenueNestedInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutVenueNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  VenueStats?: InputMaybe<VenueStatsUpdateOneRequiredWithoutVenueNestedInput>;
};

export type VenueUpdateWithoutLocationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  LiveOutVenue?: InputMaybe<LiveOutVenueUpdateOneWithoutVenueNestedInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutVenueNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  VenueStats?: InputMaybe<VenueStatsUpdateOneRequiredWithoutVenueNestedInput>;
};

export type VenueUpdateWithoutProfileInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  LiveOutVenue?: InputMaybe<LiveOutVenueUpdateOneWithoutVenueNestedInput>;
  Location?: InputMaybe<LocationUpdateOneWithoutVenueNestedInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  VenueStats?: InputMaybe<VenueStatsUpdateOneRequiredWithoutVenueNestedInput>;
};

export type VenueUpdateWithoutVenueStatsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  LiveOutVenue?: InputMaybe<LiveOutVenueUpdateOneWithoutVenueNestedInput>;
  Location?: InputMaybe<LocationUpdateOneWithoutVenueNestedInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutVenueNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type VenueUpsertWithoutLiveOutVenueInput = {
  create: VenueCreateWithoutLiveOutVenueInput;
  update: VenueUpdateWithoutLiveOutVenueInput;
};

export type VenueUpsertWithoutLocationInput = {
  create: VenueCreateWithoutLocationInput;
  update: VenueUpdateWithoutLocationInput;
};

export type VenueUpsertWithoutProfileInput = {
  create: VenueCreateWithoutProfileInput;
  update: VenueUpdateWithoutProfileInput;
};

export type VenueUpsertWithoutVenueStatsInput = {
  create: VenueCreateWithoutVenueStatsInput;
  update: VenueUpdateWithoutVenueStatsInput;
};

export type VenueWhereInput = {
  AND?: InputMaybe<Array<VenueWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  LiveOutVenue?: InputMaybe<LiveOutVenueWhereInput>;
  Location?: InputMaybe<LocationWhereInput>;
  name?: InputMaybe<StringNullableFilter>;
  NOT?: InputMaybe<Array<VenueWhereInput>>;
  OR?: InputMaybe<Array<VenueWhereInput>>;
  Profile?: InputMaybe<ProfileWhereInput>;
  profileId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  VenueStats?: InputMaybe<VenueStatsWhereInput>;
  venueStatsId?: InputMaybe<StringFilter>;
};

export type VenueWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  profileId?: InputMaybe<Scalars['String']>;
  venueStatsId?: InputMaybe<Scalars['String']>;
};

export type Vote = {
  __typename?: 'Vote';
  ComingArea?: Maybe<ComingArea>;
  comingAreaId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  H3Index5VenueRecommendation?: Maybe<H3Index5VenueRecommendation>;
  h3Index5VenueRecommendationId?: Maybe<Scalars['String']>;
  H3Index6VenueRecommendation?: Maybe<H3Index6VenueRecommendation>;
  h3Index6VenueRecommendationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  Profile: Profile;
  profileId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  upvote: Scalars['Boolean'];
};

export type VoteCountOrderByAggregateInput = {
  comingAreaId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  h3Index5VenueRecommendationId?: InputMaybe<SortOrder>;
  h3Index6VenueRecommendationId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  upvote?: InputMaybe<SortOrder>;
};

export type VoteCreateInput = {
  ComingArea?: InputMaybe<ComingAreaCreateNestedOneWithoutVoteInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationCreateNestedOneWithoutVoteInput>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationCreateNestedOneWithoutVoteInput>;
  id?: InputMaybe<Scalars['String']>;
  Profile: ProfileCreateNestedOneWithoutVoteInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  upvote: Scalars['Boolean'];
};

export type VoteCreateManyComingAreaInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  h3Index5VenueRecommendationId?: InputMaybe<Scalars['String']>;
  h3Index6VenueRecommendationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  profileId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  upvote: Scalars['Boolean'];
};

export type VoteCreateManyComingAreaInputEnvelope = {
  data: Array<VoteCreateManyComingAreaInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type VoteCreateManyH3Index5VenueRecommendationInput = {
  comingAreaId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  h3Index6VenueRecommendationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  profileId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  upvote: Scalars['Boolean'];
};

export type VoteCreateManyH3Index5VenueRecommendationInputEnvelope = {
  data: Array<VoteCreateManyH3Index5VenueRecommendationInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type VoteCreateManyH3Index6VenueRecommendationInput = {
  comingAreaId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  h3Index5VenueRecommendationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  profileId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  upvote: Scalars['Boolean'];
};

export type VoteCreateManyH3Index6VenueRecommendationInputEnvelope = {
  data: Array<VoteCreateManyH3Index6VenueRecommendationInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type VoteCreateManyInput = {
  comingAreaId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  h3Index5VenueRecommendationId?: InputMaybe<Scalars['String']>;
  h3Index6VenueRecommendationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  profileId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  upvote: Scalars['Boolean'];
};

export type VoteCreateManyProfileInput = {
  comingAreaId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  h3Index5VenueRecommendationId?: InputMaybe<Scalars['String']>;
  h3Index6VenueRecommendationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  upvote: Scalars['Boolean'];
};

export type VoteCreateManyProfileInputEnvelope = {
  data: Array<VoteCreateManyProfileInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type VoteCreateNestedManyWithoutComingAreaInput = {
  connect?: InputMaybe<Array<VoteWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<VoteCreateOrConnectWithoutComingAreaInput>>;
  create?: InputMaybe<Array<VoteCreateWithoutComingAreaInput>>;
  createMany?: InputMaybe<VoteCreateManyComingAreaInputEnvelope>;
};

export type VoteCreateNestedManyWithoutH3Index5VenueRecommendationInput = {
  connect?: InputMaybe<Array<VoteWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<VoteCreateOrConnectWithoutH3Index5VenueRecommendationInput>>;
  create?: InputMaybe<Array<VoteCreateWithoutH3Index5VenueRecommendationInput>>;
  createMany?: InputMaybe<VoteCreateManyH3Index5VenueRecommendationInputEnvelope>;
};

export type VoteCreateNestedManyWithoutH3Index6VenueRecommendationInput = {
  connect?: InputMaybe<Array<VoteWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<VoteCreateOrConnectWithoutH3Index6VenueRecommendationInput>>;
  create?: InputMaybe<Array<VoteCreateWithoutH3Index6VenueRecommendationInput>>;
  createMany?: InputMaybe<VoteCreateManyH3Index6VenueRecommendationInputEnvelope>;
};

export type VoteCreateNestedManyWithoutProfileInput = {
  connect?: InputMaybe<Array<VoteWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<VoteCreateOrConnectWithoutProfileInput>>;
  create?: InputMaybe<Array<VoteCreateWithoutProfileInput>>;
  createMany?: InputMaybe<VoteCreateManyProfileInputEnvelope>;
};

export type VoteCreateOrConnectWithoutComingAreaInput = {
  create: VoteCreateWithoutComingAreaInput;
  where: VoteWhereUniqueInput;
};

export type VoteCreateOrConnectWithoutH3Index5VenueRecommendationInput = {
  create: VoteCreateWithoutH3Index5VenueRecommendationInput;
  where: VoteWhereUniqueInput;
};

export type VoteCreateOrConnectWithoutH3Index6VenueRecommendationInput = {
  create: VoteCreateWithoutH3Index6VenueRecommendationInput;
  where: VoteWhereUniqueInput;
};

export type VoteCreateOrConnectWithoutProfileInput = {
  create: VoteCreateWithoutProfileInput;
  where: VoteWhereUniqueInput;
};

export type VoteCreateWithoutComingAreaInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationCreateNestedOneWithoutVoteInput>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationCreateNestedOneWithoutVoteInput>;
  id?: InputMaybe<Scalars['String']>;
  Profile: ProfileCreateNestedOneWithoutVoteInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  upvote: Scalars['Boolean'];
};

export type VoteCreateWithoutH3Index5VenueRecommendationInput = {
  ComingArea?: InputMaybe<ComingAreaCreateNestedOneWithoutVoteInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationCreateNestedOneWithoutVoteInput>;
  id?: InputMaybe<Scalars['String']>;
  Profile: ProfileCreateNestedOneWithoutVoteInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  upvote: Scalars['Boolean'];
};

export type VoteCreateWithoutH3Index6VenueRecommendationInput = {
  ComingArea?: InputMaybe<ComingAreaCreateNestedOneWithoutVoteInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationCreateNestedOneWithoutVoteInput>;
  id?: InputMaybe<Scalars['String']>;
  Profile: ProfileCreateNestedOneWithoutVoteInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  upvote: Scalars['Boolean'];
};

export type VoteCreateWithoutProfileInput = {
  ComingArea?: InputMaybe<ComingAreaCreateNestedOneWithoutVoteInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationCreateNestedOneWithoutVoteInput>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationCreateNestedOneWithoutVoteInput>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  upvote: Scalars['Boolean'];
};

export type VoteListRelationFilter = {
  every?: InputMaybe<VoteWhereInput>;
  none?: InputMaybe<VoteWhereInput>;
  some?: InputMaybe<VoteWhereInput>;
};

export type VoteMaxOrderByAggregateInput = {
  comingAreaId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  h3Index5VenueRecommendationId?: InputMaybe<SortOrder>;
  h3Index6VenueRecommendationId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  upvote?: InputMaybe<SortOrder>;
};

export type VoteMinOrderByAggregateInput = {
  comingAreaId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  h3Index5VenueRecommendationId?: InputMaybe<SortOrder>;
  h3Index6VenueRecommendationId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  upvote?: InputMaybe<SortOrder>;
};

export type VoteOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type VoteOrderByWithAggregationInput = {
  _count?: InputMaybe<VoteCountOrderByAggregateInput>;
  _max?: InputMaybe<VoteMaxOrderByAggregateInput>;
  _min?: InputMaybe<VoteMinOrderByAggregateInput>;
  comingAreaId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  h3Index5VenueRecommendationId?: InputMaybe<SortOrder>;
  h3Index6VenueRecommendationId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  upvote?: InputMaybe<SortOrder>;
};

export type VoteOrderByWithRelationInput = {
  ComingArea?: InputMaybe<ComingAreaOrderByWithRelationInput>;
  comingAreaId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationOrderByWithRelationInput>;
  h3Index5VenueRecommendationId?: InputMaybe<SortOrder>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationOrderByWithRelationInput>;
  h3Index6VenueRecommendationId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  Profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  upvote?: InputMaybe<SortOrder>;
};

export enum VoteScalarFieldEnum {
  ComingAreaId = 'comingAreaId',
  CreatedAt = 'createdAt',
  H3Index5VenueRecommendationId = 'h3Index5VenueRecommendationId',
  H3Index6VenueRecommendationId = 'h3Index6VenueRecommendationId',
  Id = 'id',
  ProfileId = 'profileId',
  UpdatedAt = 'updatedAt',
  Upvote = 'upvote'
}

export type VoteScalarWhereInput = {
  AND?: InputMaybe<Array<VoteScalarWhereInput>>;
  comingAreaId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  h3Index5VenueRecommendationId?: InputMaybe<StringNullableFilter>;
  h3Index6VenueRecommendationId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<VoteScalarWhereInput>>;
  OR?: InputMaybe<Array<VoteScalarWhereInput>>;
  profileId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  upvote?: InputMaybe<BoolFilter>;
};

export type VoteScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<VoteScalarWhereWithAggregatesInput>>;
  comingAreaId?: InputMaybe<StringNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  h3Index5VenueRecommendationId?: InputMaybe<StringNullableWithAggregatesFilter>;
  h3Index6VenueRecommendationId?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  NOT?: InputMaybe<Array<VoteScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<VoteScalarWhereWithAggregatesInput>>;
  profileId?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  upvote?: InputMaybe<BoolWithAggregatesFilter>;
};

export type VoteUpdateInput = {
  ComingArea?: InputMaybe<ComingAreaUpdateOneWithoutVoteNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationUpdateOneWithoutVoteNestedInput>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationUpdateOneWithoutVoteNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutVoteNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  upvote?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type VoteUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  upvote?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type VoteUpdateManyWithoutComingAreaNestedInput = {
  connect?: InputMaybe<Array<VoteWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<VoteCreateOrConnectWithoutComingAreaInput>>;
  create?: InputMaybe<Array<VoteCreateWithoutComingAreaInput>>;
  createMany?: InputMaybe<VoteCreateManyComingAreaInputEnvelope>;
  delete?: InputMaybe<Array<VoteWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<VoteScalarWhereInput>>;
  disconnect?: InputMaybe<Array<VoteWhereUniqueInput>>;
  set?: InputMaybe<Array<VoteWhereUniqueInput>>;
  update?: InputMaybe<Array<VoteUpdateWithWhereUniqueWithoutComingAreaInput>>;
  updateMany?: InputMaybe<Array<VoteUpdateManyWithWhereWithoutComingAreaInput>>;
  upsert?: InputMaybe<Array<VoteUpsertWithWhereUniqueWithoutComingAreaInput>>;
};

export type VoteUpdateManyWithoutH3Index5VenueRecommendationNestedInput = {
  connect?: InputMaybe<Array<VoteWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<VoteCreateOrConnectWithoutH3Index5VenueRecommendationInput>>;
  create?: InputMaybe<Array<VoteCreateWithoutH3Index5VenueRecommendationInput>>;
  createMany?: InputMaybe<VoteCreateManyH3Index5VenueRecommendationInputEnvelope>;
  delete?: InputMaybe<Array<VoteWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<VoteScalarWhereInput>>;
  disconnect?: InputMaybe<Array<VoteWhereUniqueInput>>;
  set?: InputMaybe<Array<VoteWhereUniqueInput>>;
  update?: InputMaybe<Array<VoteUpdateWithWhereUniqueWithoutH3Index5VenueRecommendationInput>>;
  updateMany?: InputMaybe<Array<VoteUpdateManyWithWhereWithoutH3Index5VenueRecommendationInput>>;
  upsert?: InputMaybe<Array<VoteUpsertWithWhereUniqueWithoutH3Index5VenueRecommendationInput>>;
};

export type VoteUpdateManyWithoutH3Index6VenueRecommendationNestedInput = {
  connect?: InputMaybe<Array<VoteWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<VoteCreateOrConnectWithoutH3Index6VenueRecommendationInput>>;
  create?: InputMaybe<Array<VoteCreateWithoutH3Index6VenueRecommendationInput>>;
  createMany?: InputMaybe<VoteCreateManyH3Index6VenueRecommendationInputEnvelope>;
  delete?: InputMaybe<Array<VoteWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<VoteScalarWhereInput>>;
  disconnect?: InputMaybe<Array<VoteWhereUniqueInput>>;
  set?: InputMaybe<Array<VoteWhereUniqueInput>>;
  update?: InputMaybe<Array<VoteUpdateWithWhereUniqueWithoutH3Index6VenueRecommendationInput>>;
  updateMany?: InputMaybe<Array<VoteUpdateManyWithWhereWithoutH3Index6VenueRecommendationInput>>;
  upsert?: InputMaybe<Array<VoteUpsertWithWhereUniqueWithoutH3Index6VenueRecommendationInput>>;
};

export type VoteUpdateManyWithoutProfileNestedInput = {
  connect?: InputMaybe<Array<VoteWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<VoteCreateOrConnectWithoutProfileInput>>;
  create?: InputMaybe<Array<VoteCreateWithoutProfileInput>>;
  createMany?: InputMaybe<VoteCreateManyProfileInputEnvelope>;
  delete?: InputMaybe<Array<VoteWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<VoteScalarWhereInput>>;
  disconnect?: InputMaybe<Array<VoteWhereUniqueInput>>;
  set?: InputMaybe<Array<VoteWhereUniqueInput>>;
  update?: InputMaybe<Array<VoteUpdateWithWhereUniqueWithoutProfileInput>>;
  updateMany?: InputMaybe<Array<VoteUpdateManyWithWhereWithoutProfileInput>>;
  upsert?: InputMaybe<Array<VoteUpsertWithWhereUniqueWithoutProfileInput>>;
};

export type VoteUpdateManyWithWhereWithoutComingAreaInput = {
  data: VoteUpdateManyMutationInput;
  where: VoteScalarWhereInput;
};

export type VoteUpdateManyWithWhereWithoutH3Index5VenueRecommendationInput = {
  data: VoteUpdateManyMutationInput;
  where: VoteScalarWhereInput;
};

export type VoteUpdateManyWithWhereWithoutH3Index6VenueRecommendationInput = {
  data: VoteUpdateManyMutationInput;
  where: VoteScalarWhereInput;
};

export type VoteUpdateManyWithWhereWithoutProfileInput = {
  data: VoteUpdateManyMutationInput;
  where: VoteScalarWhereInput;
};

export type VoteUpdateWithoutComingAreaInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationUpdateOneWithoutVoteNestedInput>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationUpdateOneWithoutVoteNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutVoteNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  upvote?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type VoteUpdateWithoutH3Index5VenueRecommendationInput = {
  ComingArea?: InputMaybe<ComingAreaUpdateOneWithoutVoteNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationUpdateOneWithoutVoteNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutVoteNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  upvote?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type VoteUpdateWithoutH3Index6VenueRecommendationInput = {
  ComingArea?: InputMaybe<ComingAreaUpdateOneWithoutVoteNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationUpdateOneWithoutVoteNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutVoteNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  upvote?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type VoteUpdateWithoutProfileInput = {
  ComingArea?: InputMaybe<ComingAreaUpdateOneWithoutVoteNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationUpdateOneWithoutVoteNestedInput>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationUpdateOneWithoutVoteNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  upvote?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type VoteUpdateWithWhereUniqueWithoutComingAreaInput = {
  data: VoteUpdateWithoutComingAreaInput;
  where: VoteWhereUniqueInput;
};

export type VoteUpdateWithWhereUniqueWithoutH3Index5VenueRecommendationInput = {
  data: VoteUpdateWithoutH3Index5VenueRecommendationInput;
  where: VoteWhereUniqueInput;
};

export type VoteUpdateWithWhereUniqueWithoutH3Index6VenueRecommendationInput = {
  data: VoteUpdateWithoutH3Index6VenueRecommendationInput;
  where: VoteWhereUniqueInput;
};

export type VoteUpdateWithWhereUniqueWithoutProfileInput = {
  data: VoteUpdateWithoutProfileInput;
  where: VoteWhereUniqueInput;
};

export type VoteUpsertWithWhereUniqueWithoutComingAreaInput = {
  create: VoteCreateWithoutComingAreaInput;
  update: VoteUpdateWithoutComingAreaInput;
  where: VoteWhereUniqueInput;
};

export type VoteUpsertWithWhereUniqueWithoutH3Index5VenueRecommendationInput = {
  create: VoteCreateWithoutH3Index5VenueRecommendationInput;
  update: VoteUpdateWithoutH3Index5VenueRecommendationInput;
  where: VoteWhereUniqueInput;
};

export type VoteUpsertWithWhereUniqueWithoutH3Index6VenueRecommendationInput = {
  create: VoteCreateWithoutH3Index6VenueRecommendationInput;
  update: VoteUpdateWithoutH3Index6VenueRecommendationInput;
  where: VoteWhereUniqueInput;
};

export type VoteUpsertWithWhereUniqueWithoutProfileInput = {
  create: VoteCreateWithoutProfileInput;
  update: VoteUpdateWithoutProfileInput;
  where: VoteWhereUniqueInput;
};

export type VoteWhereInput = {
  AND?: InputMaybe<Array<VoteWhereInput>>;
  ComingArea?: InputMaybe<ComingAreaWhereInput>;
  comingAreaId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  H3Index5VenueRecommendation?: InputMaybe<H3Index5VenueRecommendationWhereInput>;
  h3Index5VenueRecommendationId?: InputMaybe<StringNullableFilter>;
  H3Index6VenueRecommendation?: InputMaybe<H3Index6VenueRecommendationWhereInput>;
  h3Index6VenueRecommendationId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<VoteWhereInput>>;
  OR?: InputMaybe<Array<VoteWhereInput>>;
  Profile?: InputMaybe<ProfileWhereInput>;
  profileId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  upvote?: InputMaybe<BoolFilter>;
};

export type VoteWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Area_FragmentFragment = { __typename?: 'Area', id: string, City: { __typename?: 'City', id: string, name: string, Geometry: { __typename?: 'Geometry', id: string, latitude: number, longitude: number } }, State: { __typename?: 'State', id: string, name: string, isoCode: string, Geometry: { __typename?: 'Geometry', id: string, latitude: number, longitude: number } }, Country: { __typename?: 'Country', id: string, name: string, isoCode: string, Geometry: { __typename?: 'Geometry', id: string, latitude: number, longitude: number } } };

export type Country_FragmentFragment = { __typename?: 'Country', id: string, name: string, isoCode: string, Geometry: { __typename?: 'Geometry', id: string, latitude: number, longitude: number } };

export type State_FragmentFragment = { __typename?: 'State', id: string, name: string, isoCode: string, Geometry: { __typename?: 'Geometry', id: string, latitude: number, longitude: number } };

export type City_FragmentFragment = { __typename?: 'City', id: string, name: string, Geometry: { __typename?: 'Geometry', id: string, latitude: number, longitude: number } };

export type Authorization_Device_Profile_FragmentFragment = { __typename?: 'AuthorizationDeviceProfile', id: string, profileId: string, isActive: boolean, refreshtoken?: string | null, accesstoken?: string | null, deviceManagerId: string, AppType: AppType, ProfileType: ProfileType, createdAt: any, updatedAt: any, Profile?: { __typename: 'Profile', id: string, ProfileType: ProfileType, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, capacity?: number | null, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: string, emoji?: string | null, name: string }> } | null, resentSearches?: { __typename?: 'SearchesService', id: string, profileId: string, searches: Array<any>, Profile: { __typename?: 'Profile', id: string } } | null, ThemeManager?: { __typename?: 'ThemeManager', id: string, ProfileTheme: Array<{ __typename?: 'ProfileTheme', id: string, isActive: boolean, themeId: string, themeManagerId?: string | null, updatedAt: any, createdAt: any, ThemeManager: { __typename?: 'ThemeManager', id: string }, Theme: { __typename?: 'Theme', id: string, name: string, theme: any, mobileVersions: Array<string>, webVersions: Array<string>, startDate?: any | null, updatedAt: any, createdAt: any, endDate?: any | null } }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, RelationshipStatus: Array<RelationshipStatus>, venueMetAt?: string | null, createdAt: any, updatedAt: any, friendProfile?: { __typename?: 'Profile', id: string, ProfileType: ProfileType, tonightStory?: { __typename?: 'Story', emojimood?: { __typename?: 'Emojimood', id: string, emojiname?: string | null, emoji?: string | null, colors: Array<string> } | null, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, active: boolean, position?: number | null, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> } | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, firstname?: string | null, lastname?: string | null, fullname?: string | null, username: string } | null } | null }>, profilePhoto?: { __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any } | null, photos?: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> | null, Credentials: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: string, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: string, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null }, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, personalId: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }>, Personal: { __typename?: 'Personal', id: string } } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }> } | null, Location?: { __typename?: 'Location', id: string, h3Index15: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: string, h3Index15?: string | null, latitude: number, longitude: number } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: string, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, tonightStory?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood?: { __typename: 'Emojimood', id: string, colors: Array<string>, emojiname?: string | null, emoji?: string | null } | null } | null } | null, DeviceManager: { __typename?: 'DeviceManager', id: string }, RefreshToken?: { __typename?: 'RefreshToken', id: string, token: string, createdAt: any, updatedAt: any } | null };

export type Authorization_Device_Manager_FragmentFragment = { __typename?: 'AuthorizationDeviceManager', id: string, DeviceProfile?: { __typename?: 'AuthorizationDeviceProfile', id: string, profileId: string, isActive: boolean, refreshtoken?: string | null, accesstoken?: string | null, deviceManagerId: string, AppType: AppType, ProfileType: ProfileType, createdAt: any, updatedAt: any, Profile?: { __typename: 'Profile', id: string, ProfileType: ProfileType, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, capacity?: number | null, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: string, emoji?: string | null, name: string }> } | null, resentSearches?: { __typename?: 'SearchesService', id: string, profileId: string, searches: Array<any>, Profile: { __typename?: 'Profile', id: string } } | null, ThemeManager?: { __typename?: 'ThemeManager', id: string, ProfileTheme: Array<{ __typename?: 'ProfileTheme', id: string, isActive: boolean, themeId: string, themeManagerId?: string | null, updatedAt: any, createdAt: any, ThemeManager: { __typename?: 'ThemeManager', id: string }, Theme: { __typename?: 'Theme', id: string, name: string, theme: any, mobileVersions: Array<string>, webVersions: Array<string>, startDate?: any | null, updatedAt: any, createdAt: any, endDate?: any | null } }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, RelationshipStatus: Array<RelationshipStatus>, venueMetAt?: string | null, createdAt: any, updatedAt: any, friendProfile?: { __typename?: 'Profile', id: string, ProfileType: ProfileType, tonightStory?: { __typename?: 'Story', emojimood?: { __typename?: 'Emojimood', id: string, emojiname?: string | null, emoji?: string | null, colors: Array<string> } | null, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, active: boolean, position?: number | null, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> } | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, firstname?: string | null, lastname?: string | null, fullname?: string | null, username: string } | null } | null }>, profilePhoto?: { __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any } | null, photos?: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> | null, Credentials: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: string, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: string, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null }, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, personalId: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }>, Personal: { __typename?: 'Personal', id: string } } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }> } | null, Location?: { __typename?: 'Location', id: string, h3Index15: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: string, h3Index15?: string | null, latitude: number, longitude: number } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: string, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, tonightStory?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood?: { __typename: 'Emojimood', id: string, colors: Array<string>, emojiname?: string | null, emoji?: string | null } | null } | null } | null, DeviceManager: { __typename?: 'DeviceManager', id: string }, RefreshToken?: { __typename?: 'RefreshToken', id: string, token: string, createdAt: any, updatedAt: any } | null } | null, Device?: { __typename?: 'Device', id: string } | null };

export type Credentials_FragmentFragment = { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: string, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: string, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null };

export type Detail_Information_FragmentFragment = { __typename?: 'DetailInformation', id: string, capacity?: number | null, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: string, emoji?: string | null, name: string }> };

export type Error_FragmentFragment = { __typename?: 'Error', errorCode: string, message: string };

export type Indetifiable_Information_FragmentFragment = { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null };

export type Code_FragmentFragment = { __typename?: 'Code', id: string, code: string };

export type Location_FragmentFragment = { __typename?: 'Location', id: string, h3Index15: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: string, h3Index15?: string | null, latitude: number, longitude: number } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: string, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null };

export type Out_FragmentFragment = { __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null };

export type Personal_FragmentFragment = { __typename?: 'Personal', id: string, updatedAt: any, createdAt: any, Profile: { __typename: 'Profile', id: string, ProfileType: ProfileType, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, capacity?: number | null, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: string, emoji?: string | null, name: string }> } | null, resentSearches?: { __typename?: 'SearchesService', id: string, profileId: string, searches: Array<any>, Profile: { __typename?: 'Profile', id: string } } | null, ThemeManager?: { __typename?: 'ThemeManager', id: string, ProfileTheme: Array<{ __typename?: 'ProfileTheme', id: string, isActive: boolean, themeId: string, themeManagerId?: string | null, updatedAt: any, createdAt: any, ThemeManager: { __typename?: 'ThemeManager', id: string }, Theme: { __typename?: 'Theme', id: string, name: string, theme: any, mobileVersions: Array<string>, webVersions: Array<string>, startDate?: any | null, updatedAt: any, createdAt: any, endDate?: any | null } }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, RelationshipStatus: Array<RelationshipStatus>, venueMetAt?: string | null, createdAt: any, updatedAt: any, friendProfile?: { __typename?: 'Profile', id: string, ProfileType: ProfileType, tonightStory?: { __typename?: 'Story', emojimood?: { __typename?: 'Emojimood', id: string, emojiname?: string | null, emoji?: string | null, colors: Array<string> } | null, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, active: boolean, position?: number | null, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> } | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, firstname?: string | null, lastname?: string | null, fullname?: string | null, username: string } | null } | null }>, profilePhoto?: { __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any } | null, photos?: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> | null, Credentials: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: string, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: string, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null }, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, personalId: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }>, Personal: { __typename?: 'Personal', id: string } } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }> } | null, Location?: { __typename?: 'Location', id: string, h3Index15: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: string, h3Index15?: string | null, latitude: number, longitude: number } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: string, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, tonightStory?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood?: { __typename: 'Emojimood', id: string, colors: Array<string>, emojiname?: string | null, emoji?: string | null } | null } | null } };

export type Profile_FragmentFragment = { __typename: 'Profile', id: string, ProfileType: ProfileType, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, capacity?: number | null, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: string, emoji?: string | null, name: string }> } | null, resentSearches?: { __typename?: 'SearchesService', id: string, profileId: string, searches: Array<any>, Profile: { __typename?: 'Profile', id: string } } | null, ThemeManager?: { __typename?: 'ThemeManager', id: string, ProfileTheme: Array<{ __typename?: 'ProfileTheme', id: string, isActive: boolean, themeId: string, themeManagerId?: string | null, updatedAt: any, createdAt: any, ThemeManager: { __typename?: 'ThemeManager', id: string }, Theme: { __typename?: 'Theme', id: string, name: string, theme: any, mobileVersions: Array<string>, webVersions: Array<string>, startDate?: any | null, updatedAt: any, createdAt: any, endDate?: any | null } }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, RelationshipStatus: Array<RelationshipStatus>, venueMetAt?: string | null, createdAt: any, updatedAt: any, friendProfile?: { __typename?: 'Profile', id: string, ProfileType: ProfileType, tonightStory?: { __typename?: 'Story', emojimood?: { __typename?: 'Emojimood', id: string, emojiname?: string | null, emoji?: string | null, colors: Array<string> } | null, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, active: boolean, position?: number | null, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> } | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, firstname?: string | null, lastname?: string | null, fullname?: string | null, username: string } | null } | null }>, profilePhoto?: { __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any } | null, photos?: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> | null, Credentials: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: string, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: string, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null }, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, personalId: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }>, Personal: { __typename?: 'Personal', id: string } } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }> } | null, Location?: { __typename?: 'Location', id: string, h3Index15: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: string, h3Index15?: string | null, latitude: number, longitude: number } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: string, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, tonightStory?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood?: { __typename: 'Emojimood', id: string, colors: Array<string>, emojiname?: string | null, emoji?: string | null } | null } | null };

export type Public_Profile_FragmentFragment = { __typename: 'Profile', id: string, ProfileType: ProfileType, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, capacity?: number | null, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: string, emoji?: string | null, name: string }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, RelationshipStatus: Array<RelationshipStatus>, venueMetAt?: string | null, createdAt: any, updatedAt: any, friendProfile?: { __typename?: 'Profile', id: string, ProfileType: ProfileType, tonightStory?: { __typename?: 'Story', emojimood?: { __typename?: 'Emojimood', id: string, emojiname?: string | null, emoji?: string | null, colors: Array<string> } | null, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, active: boolean, position?: number | null, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> } | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, firstname?: string | null, lastname?: string | null, fullname?: string | null, username: string } | null } | null }>, profilePhoto?: { __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any } | null, photos?: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> | null, Credentials: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: string, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: string, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null }, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, createdAt: any, updatedAt: any }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, venueProfileId: string, personalProfileId: string }> } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, Out: Array<{ __typename?: 'Out', id: string, venueProfileId: string, personalProfileId: string }> } | null, Location?: { __typename?: 'Location', id: string, h3Index15: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: string, h3Index15?: string | null, latitude: number, longitude: number } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: string, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, tonightStory?: { __typename?: 'Story', id: string, date: any, startDate: any, createdAt: any, updatedAt?: any | null, emojimood?: { __typename?: 'Emojimood', id: string, emojiname?: string | null, emoji?: string | null, colors: Array<string> } | null, Profile: { __typename?: 'Profile', id: string }, photos: Array<{ __typename?: 'Photo', id: string, url: string, active: boolean, blurhash?: string | null, ratio?: string | null, type?: PhotoType | null, position?: number | null, createdAt: any, updatedAt: any }> } | null };

export type Profile_Venues_FragmentFragment = { __typename: 'ProfileVenue', id: string, ProfileType: ProfileType, distanceInM?: number | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, capacity?: number | null, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: string, emoji?: string | null, name: string }> } | null, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }>, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, Out: Array<{ __typename?: 'Out', id: string, venueProfileId: string, personalProfileId: string }> } | null, Location?: { __typename?: 'Location', id: string, h3Index15: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: string, h3Index15?: string | null, latitude: number, longitude: number } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: string, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null };

export type Relationship_FragmentFragment = { __typename?: 'Relationship', id: string, RelationshipStatus: Array<RelationshipStatus>, venueMetAt?: string | null, createdAt: any, updatedAt: any, friendProfile?: { __typename?: 'Profile', id: string, ProfileType: ProfileType, tonightStory?: { __typename?: 'Story', emojimood?: { __typename?: 'Emojimood', id: string, emojiname?: string | null, emoji?: string | null, colors: Array<string> } | null, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, active: boolean, position?: number | null, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> } | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, firstname?: string | null, lastname?: string | null, fullname?: string | null, username: string } | null } | null };

export type Story_FragmentFragment = { __typename?: 'Story', id: string, date: any, startDate: any, createdAt: any, updatedAt?: any | null, emojimood?: { __typename?: 'Emojimood', colors: Array<string>, emoji?: string | null, emojiname?: string | null, id: string } | null, photos: Array<{ __typename?: 'Photo', active: boolean, blurhash?: string | null, createdAt: any, groupId?: string | null, height?: number | null, id: string, position?: number | null, profileId?: string | null, ratio?: string | null, storyId?: string | null, type?: PhotoType | null, updatedAt: any, url: string, width?: number | null, Group?: { __typename?: 'Group', id: string } | null, Profile?: { __typename?: 'Profile', id: string } | null, Story?: { __typename?: 'Story', id: string } | null }> };

export type Theme_FragmentFragment = { __typename?: 'Theme', id: string, name: string, theme: any, mobileVersions: Array<string>, webVersions: Array<string>, startDate?: any | null, updatedAt: any, createdAt: any, endDate?: any | null };

export type Profile_Theme_FragmentFragment = { __typename?: 'ProfileTheme', id: string, isActive: boolean, themeId: string, themeManagerId?: string | null, updatedAt: any, createdAt: any, ThemeManager: { __typename?: 'ThemeManager', id: string }, Theme: { __typename?: 'Theme', id: string, name: string, theme: any, mobileVersions: Array<string>, webVersions: Array<string>, startDate?: any | null, updatedAt: any, createdAt: any, endDate?: any | null } };

export type Theme_Manager_FragmentFragment = { __typename?: 'ThemeManager', id: string, ProfileTheme: Array<{ __typename?: 'ProfileTheme', id: string, isActive: boolean, themeId: string, themeManagerId?: string | null, updatedAt: any, createdAt: any, ThemeManager: { __typename?: 'ThemeManager', id: string }, Theme: { __typename?: 'Theme', id: string, name: string, theme: any, mobileVersions: Array<string>, webVersions: Array<string>, startDate?: any | null, updatedAt: any, createdAt: any, endDate?: any | null } }> };

export type Venue_FragmentFragment = { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename: 'Profile', id: string, ProfileType: ProfileType, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, capacity?: number | null, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: string, emoji?: string | null, name: string }> } | null, resentSearches?: { __typename?: 'SearchesService', id: string, profileId: string, searches: Array<any>, Profile: { __typename?: 'Profile', id: string } } | null, ThemeManager?: { __typename?: 'ThemeManager', id: string, ProfileTheme: Array<{ __typename?: 'ProfileTheme', id: string, isActive: boolean, themeId: string, themeManagerId?: string | null, updatedAt: any, createdAt: any, ThemeManager: { __typename?: 'ThemeManager', id: string }, Theme: { __typename?: 'Theme', id: string, name: string, theme: any, mobileVersions: Array<string>, webVersions: Array<string>, startDate?: any | null, updatedAt: any, createdAt: any, endDate?: any | null } }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, RelationshipStatus: Array<RelationshipStatus>, venueMetAt?: string | null, createdAt: any, updatedAt: any, friendProfile?: { __typename?: 'Profile', id: string, ProfileType: ProfileType, tonightStory?: { __typename?: 'Story', emojimood?: { __typename?: 'Emojimood', id: string, emojiname?: string | null, emoji?: string | null, colors: Array<string> } | null, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, active: boolean, position?: number | null, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> } | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, firstname?: string | null, lastname?: string | null, fullname?: string | null, username: string } | null } | null }>, profilePhoto?: { __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any } | null, photos?: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> | null, Credentials: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: string, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: string, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null }, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, personalId: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }>, Personal: { __typename?: 'Personal', id: string } } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }> } | null, Location?: { __typename?: 'Location', id: string, h3Index15: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: string, h3Index15?: string | null, latitude: number, longitude: number } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: string, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, tonightStory?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood?: { __typename: 'Emojimood', id: string, colors: Array<string>, emojiname?: string | null, emoji?: string | null } | null } | null } };

export type UpsertDevicePushTokenMutationVariables = Exact<{
  androidToken?: InputMaybe<Scalars['String']>;
  appleToken?: InputMaybe<Scalars['String']>;
  expoToken?: InputMaybe<Scalars['String']>;
}>;


export type UpsertDevicePushTokenMutation = { __typename?: 'Mutation', upsertDevicePushToken: boolean };

export type SwitchDeviceProfileMutationVariables = Exact<{
  profileId: Scalars['String'];
}>;


export type SwitchDeviceProfileMutation = { __typename?: 'Mutation', switchDeviceProfile: { __typename: 'AuthorizationDeviceManager', id: string, DeviceProfile?: { __typename?: 'AuthorizationDeviceProfile', id: string, isActive: boolean, refreshtoken?: string | null, accesstoken?: string | null, AppType: AppType, deviceManagerId: string, DeviceManager: { __typename?: 'DeviceManager', id: string }, Profile?: { __typename: 'Profile', id: string, ProfileType: ProfileType, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, capacity?: number | null, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: string, emoji?: string | null, name: string }> } | null, resentSearches?: { __typename?: 'SearchesService', id: string, profileId: string, searches: Array<any>, Profile: { __typename?: 'Profile', id: string } } | null, ThemeManager?: { __typename?: 'ThemeManager', id: string, ProfileTheme: Array<{ __typename?: 'ProfileTheme', id: string, isActive: boolean, themeId: string, themeManagerId?: string | null, updatedAt: any, createdAt: any, ThemeManager: { __typename?: 'ThemeManager', id: string }, Theme: { __typename?: 'Theme', id: string, name: string, theme: any, mobileVersions: Array<string>, webVersions: Array<string>, startDate?: any | null, updatedAt: any, createdAt: any, endDate?: any | null } }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, RelationshipStatus: Array<RelationshipStatus>, venueMetAt?: string | null, createdAt: any, updatedAt: any, friendProfile?: { __typename?: 'Profile', id: string, ProfileType: ProfileType, tonightStory?: { __typename?: 'Story', emojimood?: { __typename?: 'Emojimood', id: string, emojiname?: string | null, emoji?: string | null, colors: Array<string> } | null, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, active: boolean, position?: number | null, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> } | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, firstname?: string | null, lastname?: string | null, fullname?: string | null, username: string } | null } | null }>, profilePhoto?: { __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any } | null, photos?: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> | null, Credentials: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: string, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: string, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null }, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, personalId: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }>, Personal: { __typename?: 'Personal', id: string } } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }> } | null, Location?: { __typename?: 'Location', id: string, h3Index15: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: string, h3Index15?: string | null, latitude: number, longitude: number } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: string, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, tonightStory?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood?: { __typename: 'Emojimood', id: string, colors: Array<string>, emojiname?: string | null, emoji?: string | null } | null } | null } | null } | null } | { __typename?: 'Error', errorCode: string, message: string } };

export type RefreshDeviceManagerMutationVariables = Exact<{ [key: string]: never; }>;


export type GetADeviceManagerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetADeviceManagerQuery = { __typename?: 'Query', getADeviceManager: { __typename?: 'DeviceManagerDeviceProfiles', DeviceProfiles: Array<{ __typename?: 'AuthorizationDeviceProfile', id: string, AppType: AppType, isActive: boolean, accesstoken?: string | null, refreshtoken?: string | null, Profile?: { __typename: 'Profile', id: string, ProfileType: ProfileType, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, capacity?: number | null, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: string, emoji?: string | null, name: string }> } | null, resentSearches?: { __typename?: 'SearchesService', id: string, profileId: string, searches: Array<any>, Profile: { __typename?: 'Profile', id: string } } | null, ThemeManager?: { __typename?: 'ThemeManager', id: string, ProfileTheme: Array<{ __typename?: 'ProfileTheme', id: string, isActive: boolean, themeId: string, themeManagerId?: string | null, updatedAt: any, createdAt: any, ThemeManager: { __typename?: 'ThemeManager', id: string }, Theme: { __typename?: 'Theme', id: string, name: string, theme: any, mobileVersions: Array<string>, webVersions: Array<string>, startDate?: any | null, updatedAt: any, createdAt: any, endDate?: any | null } }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, RelationshipStatus: Array<RelationshipStatus>, venueMetAt?: string | null, createdAt: any, updatedAt: any, friendProfile?: { __typename?: 'Profile', id: string, ProfileType: ProfileType, tonightStory?: { __typename?: 'Story', emojimood?: { __typename?: 'Emojimood', id: string, emojiname?: string | null, emoji?: string | null, colors: Array<string> } | null, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, active: boolean, position?: number | null, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> } | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, firstname?: string | null, lastname?: string | null, fullname?: string | null, username: string } | null } | null }>, profilePhoto?: { __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any } | null, photos?: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> | null, Credentials: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: string, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: string, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null }, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, personalId: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }>, Personal: { __typename?: 'Personal', id: string } } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }> } | null, Location?: { __typename?: 'Location', id: string, h3Index15: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: string, h3Index15?: string | null, latitude: number, longitude: number } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: string, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, tonightStory?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood?: { __typename: 'Emojimood', id: string, colors: Array<string>, emojiname?: string | null, emoji?: string | null } | null } | null } | null }> } | { __typename?: 'Error' } };

export type SendAuthenticatorDeviceOwnerCodeMutationVariables = Exact<{
  data?: InputMaybe<CodeDataInput>;
  where?: InputMaybe<CustomCodeWhereInput>;
}>;


export type SendAuthenticatorDeviceOwnerCodeMutation = { __typename?: 'Mutation', sendAuthenticatorDeviceOwnerCode: { __typename?: 'Code', id: string, code: string } | { __typename?: 'Error', errorCode: string, message: string } };

export type AuthorizedProfilesQueryVariables = Exact<{
  where: AuthorizedProfilesWhereInput;
}>;


export type AuthorizedProfilesQuery = { __typename?: 'Query', authorizedProfiles?: { __typename?: 'Error', errorCode: string, message: string } | { __typename?: 'ProfilesResponse', email: Array<{ __typename?: 'Profile', id: string, ProfileType: ProfileType, profilePhoto?: { __typename?: 'Photo', id: string, blurhash?: string | null, url: string } | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null } | null }>, phone: Array<{ __typename?: 'Profile', id: string, ProfileType: ProfileType, profilePhoto?: { __typename?: 'Photo', id: string, blurhash?: string | null, url: string } | null, photos?: Array<{ __typename?: 'Photo', id: string, blurhash?: string | null, url: string }> | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null } | null, tonightStory?: { __typename?: 'Story', id: string, emojimood?: { __typename?: 'Emojimood', colors: Array<string>, emoji?: string | null, emojiname?: string | null } | null } | null }>, username: Array<{ __typename?: 'Profile', id: string, ProfileType: ProfileType, profilePhoto?: { __typename?: 'Photo', id: string, blurhash?: string | null, url: string } | null, photos?: Array<{ __typename?: 'Photo', id: string, blurhash?: string | null, url: string }> | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null } | null }> } | null };

export type PrivacyTermsDocumentsQueryVariables = Exact<{ [key: string]: never; }>;


export type PrivacyTermsDocumentsQuery = { __typename?: 'Query', privacyTermsDocuments: { __typename?: 'PrivacyAndTermsDocumentResponse', privacy: { __typename?: 'Document', id: string, TypeOfDocument: TypeOfDocument, createdAt: any, updatedAt: any, content: string, LegalAgreement: Array<{ __typename?: 'LegalAgreement', id: string }> }, termsofservice: { __typename?: 'Document', id: string, TypeOfDocument: TypeOfDocument, createdAt: any, updatedAt: any, content: string, LegalAgreement: Array<{ __typename?: 'LegalAgreement', id: string }> } } };

export type LoginPasswordQueryVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginPasswordQuery = { __typename?: 'Query', loginPassword: boolean };

export type CheckUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type CheckUsernameQuery = { __typename?: 'Query', checkUsername: boolean };

export type RemoveAllFromVenueDeveloperMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveAllFromVenueDeveloperMutation = { __typename?: 'Mutation', removeAllFromVenueDeveloper: boolean };

export type EmojimoodsQueryVariables = Exact<{ [key: string]: never; }>;


export type EmojimoodsQuery = { __typename?: 'Query', emojimoods: Array<{ __typename?: 'Emojimood', id: string, colors: Array<string>, emoji?: string | null, emojiname?: string | null }> };

export type EmojimoodQueryVariables = Exact<{
  where: EmojimoodWhereUniqueInput;
}>;


export type EmojimoodQuery = { __typename?: 'Query', emojimood?: { __typename?: 'Emojimood', id: string, colors: Array<string>, emoji?: string | null, emojiname?: string | null } | null };

export type ExploreSearchQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type ExploreSearchQuery = { __typename?: 'Query', exploreSearch: { __typename?: 'ExploreResponse', events?: Array<any> | null, people: Array<{ __typename?: 'Personal', id: string, Profile: { __typename?: 'Profile', id: string, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, fullname?: string | null, firstname?: string | null, lastname?: string | null, username: string } | null, photos?: Array<{ __typename?: 'Photo', id: string, active: boolean, blurhash?: string | null, url: string }> | null } }>, venues: Array<{ __typename?: 'Venue', id: string, Profile: { __typename?: 'Profile', id: string, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, fullname?: string | null, firstname?: string | null, lastname?: string | null, username: string } | null, photos?: Array<{ __typename?: 'Photo', id: string, active: boolean, blurhash?: string | null, url: string }> | null } }> } };

export type CreateFriendRequestMutationVariables = Exact<{
  senderProfileId: Scalars['String'];
  receiversProfileId: Array<Scalars['String']> | Scalars['String'];
}>;


export type CreateFriendRequestMutation = { __typename?: 'Mutation', createFriendRequest: boolean };

export type DeleteFriendRequestMutationVariables = Exact<{
  friendRequestId: Scalars['String'];
}>;


export type DeleteFriendRequestMutation = { __typename?: 'Mutation', deleteFriendRequest: boolean };

export type QrAddFriendMutationVariables = Exact<{
  qrCodeProfileId: Scalars['String'];
  dataHash: Scalars['String'];
}>;


export type QrAddFriendMutation = { __typename?: 'Mutation', qrAddFriend: { __typename?: 'Relationship', id: string, venueMetAt?: string | null, RelationshipStatus: Array<RelationshipStatus>, createdAt: any, updatedAt: any, Profile?: { __typename?: 'Profile', id: string } | null } };

export type AcceptFriendRequestMutationVariables = Exact<{
  friendRequestId: Scalars['String'];
  venueIdMetAt?: InputMaybe<Scalars['String']>;
}>;


export type AcceptFriendRequestMutation = { __typename?: 'Mutation', acceptFriendRequest: { __typename?: 'Relationship', id: string, venueMetAt?: string | null, RelationshipStatus: Array<RelationshipStatus>, createdAt: any, updatedAt: any, Profile?: { __typename?: 'Profile', id: string } | null } };

export type DeclineFriendRequestMutationVariables = Exact<{
  friendRequestId: Scalars['String'];
}>;


export type DeclineFriendRequestMutation = { __typename?: 'Mutation', declineFriendRequest: boolean };

export type RemoveFriendMutationVariables = Exact<{
  relationshipId: Scalars['String'];
}>;


export type RemoveFriendMutation = { __typename?: 'Mutation', removeFriend: boolean };

export type GetRelationshipFriendRequestStatusQueryVariables = Exact<{
  profileId: Scalars['String'];
}>;


export type GetRelationshipFriendRequestStatusQuery = { __typename?: 'Query', getRelationshipFriendRequestStatus: { __typename?: 'Error', errorCode: string, message: string } | { __typename?: 'FriendRequest', id: string, receiverProfileId: string, senderProfileId: string, notificationStatusId: string, Notifications: Array<{ __typename?: 'Notifications', id: string, profileId: string, Profile: { __typename?: 'Profile', id: string } }>, NotificationStatus: { __typename?: 'NotificationStatus', id: string, isAccepted: boolean, isAnswered: boolean, isChecked: boolean } } | { __typename?: 'RejectedFriendsResponse', friends: boolean } | { __typename?: 'Relationship', id: string, RelationshipStatus: Array<RelationshipStatus>, venueMetAt?: string | null, createdAt: any, updatedAt: any, friendProfile?: { __typename?: 'Profile', id: string, ProfileType: ProfileType, tonightStory?: { __typename?: 'Story', emojimood?: { __typename?: 'Emojimood', id: string, emojiname?: string | null, emoji?: string | null, colors: Array<string> } | null, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, active: boolean, position?: number | null, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> } | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, firstname?: string | null, lastname?: string | null, fullname?: string | null, username: string } | null } | null } };

export type GetSecureFriendQrCodeDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSecureFriendQrCodeDataQuery = { __typename?: 'Query', getSecureFriendQRCodeData: string };

export type GetInterestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInterestsQuery = { __typename?: 'Query', getInterests: Array<{ __typename?: 'Category', id: string, name: string, Tags: Array<{ __typename?: 'Tag', id: string, name: string, categoryId?: string | null, emoji?: string | null }> }> };

export type GetNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotificationsQuery = { __typename?: 'Query', getNotifications: { __typename?: 'NotificationResponse', friendRequestNotifications?: Array<{ __typename?: 'FriendRequest', id: string, notificationStatusId: string, receiverProfileId: string, createdAt: any, updatedAt: any, NotificationStatus: { __typename?: 'NotificationStatus', id: string, isAccepted: boolean, isAnswered: boolean, isChecked: boolean, FriendRequest?: { __typename?: 'FriendRequest', id: string, receiverProfileId: string, senderProfileId: string, notificationStatusId: string, Notifications: Array<{ __typename?: 'Notifications', id: string }>, NotificationStatus: { __typename?: 'NotificationStatus', id: string } } | null }, senderProfile: { __typename?: 'Profile', id: string, photos?: Array<{ __typename?: 'Photo', id: string, type?: PhotoType | null, url: string }> | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null } | null }, receiverProfile: { __typename?: 'Profile', id: string, photos?: Array<{ __typename?: 'Photo', id: string, type?: PhotoType | null, url: string }> | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null } | null } }> | null } };

export type AddPersonalTotalsVenueMutationVariables = Exact<{
  profileIdVenue: Scalars['String'];
}>;


export type AddPersonalTotalsVenueMutation = { __typename?: 'Mutation', addPersonalTotalsVenue: boolean };

export type RemovePersonalTotalsVenueMutationVariables = Exact<{
  profileIdVenue: Scalars['String'];
}>;


export type RemovePersonalTotalsVenueMutation = { __typename?: 'Mutation', removePersonalTotalsVenue: boolean };

export type AddPersonalJoinsVenueMutationVariables = Exact<{
  profileIdVenue: Scalars['String'];
}>;


export type AddPersonalJoinsVenueMutation = { __typename?: 'Mutation', addPersonalJoinsVenue: { __typename?: 'Profile', id: string, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string }, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }>, Personal: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string } } } | null } | null } };

export type RemovePersonalJoinsVenueMutationVariables = Exact<{ [key: string]: never; }>;


export type RemovePersonalJoinsVenueMutation = { __typename?: 'Mutation', removePersonalJoinsVenue: { __typename?: 'Profile', id: string, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string }, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }>, Personal: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string } } } | null } | null } };

export type CurrentVenueQueryVariables = Exact<{
  where?: InputMaybe<ProfileWhereInput>;
  currentLocationCoords?: InputMaybe<CoordsInput>;
}>;


export type CurrentVenueQuery = { __typename?: 'Query', currentVenue?: { __typename: 'ProfileVenue', id: string, ProfileType: ProfileType, distanceInM?: number | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, capacity?: number | null, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: string, emoji?: string | null, name: string }> } | null, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }>, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, Out: Array<{ __typename?: 'Out', id: string, venueProfileId: string, personalProfileId: string }> } | null, Location?: { __typename?: 'Location', id: string, h3Index15: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: string, h3Index15?: string | null, latitude: number, longitude: number } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: string, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null } | null };

export type GetLiveVenueTotalsQueryVariables = Exact<{
  profileIdVenue: Scalars['String'];
}>;


export type GetLiveVenueTotalsQuery = { __typename?: 'Query', getLiveVenueTotals: { __typename?: 'LiveVenueTotals', totaled?: Array<{ __typename?: 'Out', id: string, personalProfileId: string }> | null, joined?: Array<{ __typename?: 'Out', id: string, personalProfileId: string }> | null } };

export type CreatePersonalProfileMutationVariables = Exact<{
  data?: InputMaybe<CreatePersonalDataInput>;
}>;


export type CreatePersonalProfileMutation = { __typename?: 'Mutation', createPersonalProfile: { __typename?: 'AuthorizationDeviceManager', id: string, DeviceProfile?: { __typename?: 'AuthorizationDeviceProfile', id: string, profileId: string, isActive: boolean, refreshtoken?: string | null, accesstoken?: string | null, deviceManagerId: string, AppType: AppType, ProfileType: ProfileType, createdAt: any, updatedAt: any, Profile?: { __typename: 'Profile', id: string, ProfileType: ProfileType, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, capacity?: number | null, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: string, emoji?: string | null, name: string }> } | null, resentSearches?: { __typename?: 'SearchesService', id: string, profileId: string, searches: Array<any>, Profile: { __typename?: 'Profile', id: string } } | null, ThemeManager?: { __typename?: 'ThemeManager', id: string, ProfileTheme: Array<{ __typename?: 'ProfileTheme', id: string, isActive: boolean, themeId: string, themeManagerId?: string | null, updatedAt: any, createdAt: any, ThemeManager: { __typename?: 'ThemeManager', id: string }, Theme: { __typename?: 'Theme', id: string, name: string, theme: any, mobileVersions: Array<string>, webVersions: Array<string>, startDate?: any | null, updatedAt: any, createdAt: any, endDate?: any | null } }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, RelationshipStatus: Array<RelationshipStatus>, venueMetAt?: string | null, createdAt: any, updatedAt: any, friendProfile?: { __typename?: 'Profile', id: string, ProfileType: ProfileType, tonightStory?: { __typename?: 'Story', emojimood?: { __typename?: 'Emojimood', id: string, emojiname?: string | null, emoji?: string | null, colors: Array<string> } | null, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, active: boolean, position?: number | null, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> } | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, firstname?: string | null, lastname?: string | null, fullname?: string | null, username: string } | null } | null }>, profilePhoto?: { __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any } | null, photos?: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> | null, Credentials: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: string, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: string, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null }, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, personalId: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }>, Personal: { __typename?: 'Personal', id: string } } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }> } | null, Location?: { __typename?: 'Location', id: string, h3Index15: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: string, h3Index15?: string | null, latitude: number, longitude: number } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: string, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, tonightStory?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood?: { __typename: 'Emojimood', id: string, colors: Array<string>, emojiname?: string | null, emoji?: string | null } | null } | null } | null, DeviceManager: { __typename?: 'DeviceManager', id: string }, RefreshToken?: { __typename?: 'RefreshToken', id: string, token: string, createdAt: any, updatedAt: any } | null } | null, Device?: { __typename?: 'Device', id: string } | null } | { __typename?: 'Error', errorCode: string, message: string } };

export type CreateGuestProfileMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateGuestProfileMutation = { __typename?: 'Mutation', createGuestProfile: { __typename?: 'AuthorizationDeviceManager', id: string, DeviceProfile?: { __typename?: 'AuthorizationDeviceProfile', id: string, profileId: string, isActive: boolean, refreshtoken?: string | null, accesstoken?: string | null, deviceManagerId: string, AppType: AppType, ProfileType: ProfileType, createdAt: any, updatedAt: any, Profile?: { __typename: 'Profile', id: string, ProfileType: ProfileType, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, capacity?: number | null, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: string, emoji?: string | null, name: string }> } | null, resentSearches?: { __typename?: 'SearchesService', id: string, profileId: string, searches: Array<any>, Profile: { __typename?: 'Profile', id: string } } | null, ThemeManager?: { __typename?: 'ThemeManager', id: string, ProfileTheme: Array<{ __typename?: 'ProfileTheme', id: string, isActive: boolean, themeId: string, themeManagerId?: string | null, updatedAt: any, createdAt: any, ThemeManager: { __typename?: 'ThemeManager', id: string }, Theme: { __typename?: 'Theme', id: string, name: string, theme: any, mobileVersions: Array<string>, webVersions: Array<string>, startDate?: any | null, updatedAt: any, createdAt: any, endDate?: any | null } }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, RelationshipStatus: Array<RelationshipStatus>, venueMetAt?: string | null, createdAt: any, updatedAt: any, friendProfile?: { __typename?: 'Profile', id: string, ProfileType: ProfileType, tonightStory?: { __typename?: 'Story', emojimood?: { __typename?: 'Emojimood', id: string, emojiname?: string | null, emoji?: string | null, colors: Array<string> } | null, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, active: boolean, position?: number | null, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> } | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, firstname?: string | null, lastname?: string | null, fullname?: string | null, username: string } | null } | null }>, profilePhoto?: { __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any } | null, photos?: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> | null, Credentials: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: string, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: string, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null }, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, personalId: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }>, Personal: { __typename?: 'Personal', id: string } } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }> } | null, Location?: { __typename?: 'Location', id: string, h3Index15: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: string, h3Index15?: string | null, latitude: number, longitude: number } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: string, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, tonightStory?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood?: { __typename: 'Emojimood', id: string, colors: Array<string>, emojiname?: string | null, emoji?: string | null } | null } | null } | null, DeviceManager: { __typename?: 'DeviceManager', id: string }, RefreshToken?: { __typename?: 'RefreshToken', id: string, token: string, createdAt: any, updatedAt: any } | null } | null, Device?: { __typename?: 'Device', id: string } | null } | { __typename?: 'Error', errorCode: string, message: string } };

export type UpdateProfileIdentifiableInformationMutationVariables = Exact<{
  data: IdentifiableInformationUpdateInput;
}>;


export type UpdateProfileIdentifiableInformationMutation = { __typename?: 'Mutation', updateProfileIdentifiableInformation: { __typename?: 'AuthorizationDeviceManager', id: string, DeviceProfile?: { __typename?: 'AuthorizationDeviceProfile', id: string, profileId: string, isActive: boolean, refreshtoken?: string | null, accesstoken?: string | null, deviceManagerId: string, AppType: AppType, ProfileType: ProfileType, createdAt: any, updatedAt: any, Profile?: { __typename: 'Profile', id: string, ProfileType: ProfileType, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, capacity?: number | null, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: string, emoji?: string | null, name: string }> } | null, resentSearches?: { __typename?: 'SearchesService', id: string, profileId: string, searches: Array<any>, Profile: { __typename?: 'Profile', id: string } } | null, ThemeManager?: { __typename?: 'ThemeManager', id: string, ProfileTheme: Array<{ __typename?: 'ProfileTheme', id: string, isActive: boolean, themeId: string, themeManagerId?: string | null, updatedAt: any, createdAt: any, ThemeManager: { __typename?: 'ThemeManager', id: string }, Theme: { __typename?: 'Theme', id: string, name: string, theme: any, mobileVersions: Array<string>, webVersions: Array<string>, startDate?: any | null, updatedAt: any, createdAt: any, endDate?: any | null } }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, RelationshipStatus: Array<RelationshipStatus>, venueMetAt?: string | null, createdAt: any, updatedAt: any, friendProfile?: { __typename?: 'Profile', id: string, ProfileType: ProfileType, tonightStory?: { __typename?: 'Story', emojimood?: { __typename?: 'Emojimood', id: string, emojiname?: string | null, emoji?: string | null, colors: Array<string> } | null, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, active: boolean, position?: number | null, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> } | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, firstname?: string | null, lastname?: string | null, fullname?: string | null, username: string } | null } | null }>, profilePhoto?: { __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any } | null, photos?: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> | null, Credentials: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: string, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: string, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null }, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, personalId: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }>, Personal: { __typename?: 'Personal', id: string } } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }> } | null, Location?: { __typename?: 'Location', id: string, h3Index15: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: string, h3Index15?: string | null, latitude: number, longitude: number } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: string, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, tonightStory?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood?: { __typename: 'Emojimood', id: string, colors: Array<string>, emojiname?: string | null, emoji?: string | null } | null } | null } | null, DeviceManager: { __typename?: 'DeviceManager', id: string }, RefreshToken?: { __typename?: 'RefreshToken', id: string, token: string, createdAt: any, updatedAt: any } | null } | null, Device?: { __typename?: 'Device', id: string } | null } | { __typename?: 'Error', errorCode: string, message: string } };

export type UpdateOneProfileMutationVariables = Exact<{
  data: ProfileUpdateInput;
  where: ProfileWhereUniqueInput;
}>;


export type UpdateOneProfileMutation = { __typename?: 'Mutation', updateOneProfile?: { __typename: 'Profile', id: string, ProfileType: ProfileType, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, capacity?: number | null, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: string, emoji?: string | null, name: string }> } | null, resentSearches?: { __typename?: 'SearchesService', id: string, profileId: string, searches: Array<any>, Profile: { __typename?: 'Profile', id: string } } | null, ThemeManager?: { __typename?: 'ThemeManager', id: string, ProfileTheme: Array<{ __typename?: 'ProfileTheme', id: string, isActive: boolean, themeId: string, themeManagerId?: string | null, updatedAt: any, createdAt: any, ThemeManager: { __typename?: 'ThemeManager', id: string }, Theme: { __typename?: 'Theme', id: string, name: string, theme: any, mobileVersions: Array<string>, webVersions: Array<string>, startDate?: any | null, updatedAt: any, createdAt: any, endDate?: any | null } }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, RelationshipStatus: Array<RelationshipStatus>, venueMetAt?: string | null, createdAt: any, updatedAt: any, friendProfile?: { __typename?: 'Profile', id: string, ProfileType: ProfileType, tonightStory?: { __typename?: 'Story', emojimood?: { __typename?: 'Emojimood', id: string, emojiname?: string | null, emoji?: string | null, colors: Array<string> } | null, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, active: boolean, position?: number | null, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> } | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, firstname?: string | null, lastname?: string | null, fullname?: string | null, username: string } | null } | null }>, profilePhoto?: { __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any } | null, photos?: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> | null, Credentials: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: string, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: string, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null }, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, personalId: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }>, Personal: { __typename?: 'Personal', id: string } } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }> } | null, Location?: { __typename?: 'Location', id: string, h3Index15: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: string, h3Index15?: string | null, latitude: number, longitude: number } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: string, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, tonightStory?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood?: { __typename: 'Emojimood', id: string, colors: Array<string>, emojiname?: string | null, emoji?: string | null } | null } | null } | null };

export type ProfileQueryVariables = Exact<{
  where?: InputMaybe<ProfileWhereInput>;
}>;


export type ProfileQuery = { __typename?: 'Query', profile?: { __typename: 'Profile', id: string, ProfileType: ProfileType, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, capacity?: number | null, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: string, emoji?: string | null, name: string }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, RelationshipStatus: Array<RelationshipStatus>, venueMetAt?: string | null, createdAt: any, updatedAt: any, friendProfile?: { __typename?: 'Profile', id: string, ProfileType: ProfileType, tonightStory?: { __typename?: 'Story', emojimood?: { __typename?: 'Emojimood', id: string, emojiname?: string | null, emoji?: string | null, colors: Array<string> } | null, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, active: boolean, position?: number | null, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> } | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, firstname?: string | null, lastname?: string | null, fullname?: string | null, username: string } | null } | null }>, profilePhoto?: { __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any } | null, photos?: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> | null, Credentials: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: string, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: string, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null }, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, createdAt: any, updatedAt: any }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, venueProfileId: string, personalProfileId: string }> } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, Out: Array<{ __typename?: 'Out', id: string, venueProfileId: string, personalProfileId: string }> } | null, Location?: { __typename?: 'Location', id: string, h3Index15: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: string, h3Index15?: string | null, latitude: number, longitude: number } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: string, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, tonightStory?: { __typename?: 'Story', id: string, date: any, startDate: any, createdAt: any, updatedAt?: any | null, emojimood?: { __typename?: 'Emojimood', id: string, emojiname?: string | null, emoji?: string | null, colors: Array<string> } | null, Profile: { __typename?: 'Profile', id: string }, photos: Array<{ __typename?: 'Photo', id: string, url: string, active: boolean, blurhash?: string | null, ratio?: string | null, type?: PhotoType | null, position?: number | null, createdAt: any, updatedAt: any }> } | null } | null };

export type ProfileVenueQueryVariables = Exact<{
  where?: InputMaybe<ProfileWhereInput>;
}>;


export type ProfileVenueQuery = { __typename?: 'Query', profile?: { __typename: 'Profile', id: string, ProfileType: ProfileType, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, capacity?: number | null, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: string, emoji?: string | null, name: string }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, RelationshipStatus: Array<RelationshipStatus>, venueMetAt?: string | null, createdAt: any, updatedAt: any, friendProfile?: { __typename?: 'Profile', id: string, ProfileType: ProfileType, tonightStory?: { __typename?: 'Story', emojimood?: { __typename?: 'Emojimood', id: string, emojiname?: string | null, emoji?: string | null, colors: Array<string> } | null, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, active: boolean, position?: number | null, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> } | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, firstname?: string | null, lastname?: string | null, fullname?: string | null, username: string } | null } | null }>, profilePhoto?: { __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any } | null, photos?: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> | null, Credentials: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: string, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: string, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null }, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, createdAt: any, updatedAt: any }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, venueProfileId: string, personalProfileId: string }> } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, Out: Array<{ __typename?: 'Out', id: string, venueProfileId: string, personalProfileId: string }> } | null, Location?: { __typename?: 'Location', id: string, h3Index15: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: string, h3Index15?: string | null, latitude: number, longitude: number } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: string, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, tonightStory?: { __typename?: 'Story', id: string, date: any, startDate: any, createdAt: any, updatedAt?: any | null, emojimood?: { __typename?: 'Emojimood', id: string, emojiname?: string | null, emoji?: string | null, colors: Array<string> } | null, Profile: { __typename?: 'Profile', id: string }, photos: Array<{ __typename?: 'Photo', id: string, url: string, active: boolean, blurhash?: string | null, ratio?: string | null, type?: PhotoType | null, position?: number | null, createdAt: any, updatedAt: any }> } | null } | null };

export type ProfilesQueryVariables = Exact<{
  where?: InputMaybe<ProfileWhereInput>;
  take?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  distinct?: InputMaybe<Array<ProfileScalarFieldEnum> | ProfileScalarFieldEnum>;
}>;


export type ProfilesQuery = { __typename?: 'Query', profiles: Array<{ __typename: 'Profile', id: string, ProfileType: ProfileType, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, capacity?: number | null, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: string, emoji?: string | null, name: string }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, RelationshipStatus: Array<RelationshipStatus>, venueMetAt?: string | null, createdAt: any, updatedAt: any, friendProfile?: { __typename?: 'Profile', id: string, ProfileType: ProfileType, tonightStory?: { __typename?: 'Story', emojimood?: { __typename?: 'Emojimood', id: string, emojiname?: string | null, emoji?: string | null, colors: Array<string> } | null, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, active: boolean, position?: number | null, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> } | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, firstname?: string | null, lastname?: string | null, fullname?: string | null, username: string } | null } | null }>, profilePhoto?: { __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any } | null, photos?: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> | null, Credentials: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: string, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: string, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null }, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, createdAt: any, updatedAt: any }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, venueProfileId: string, personalProfileId: string }> } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, Out: Array<{ __typename?: 'Out', id: string, venueProfileId: string, personalProfileId: string }> } | null, Location?: { __typename?: 'Location', id: string, h3Index15: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: string, h3Index15?: string | null, latitude: number, longitude: number } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: string, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, tonightStory?: { __typename?: 'Story', id: string, date: any, startDate: any, createdAt: any, updatedAt?: any | null, emojimood?: { __typename?: 'Emojimood', id: string, emojiname?: string | null, emoji?: string | null, colors: Array<string> } | null, Profile: { __typename?: 'Profile', id: string }, photos: Array<{ __typename?: 'Photo', id: string, url: string, active: boolean, blurhash?: string | null, ratio?: string | null, type?: PhotoType | null, position?: number | null, createdAt: any, updatedAt: any }> } | null }> };

export type VenueQueryVariables = Exact<{
  where?: InputMaybe<VenueWhereInput>;
}>;


export type VenueQuery = { __typename?: 'Query', venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename: 'Profile', id: string, ProfileType: ProfileType, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, capacity?: number | null, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: string, emoji?: string | null, name: string }> } | null, resentSearches?: { __typename?: 'SearchesService', id: string, profileId: string, searches: Array<any>, Profile: { __typename?: 'Profile', id: string } } | null, ThemeManager?: { __typename?: 'ThemeManager', id: string, ProfileTheme: Array<{ __typename?: 'ProfileTheme', id: string, isActive: boolean, themeId: string, themeManagerId?: string | null, updatedAt: any, createdAt: any, ThemeManager: { __typename?: 'ThemeManager', id: string }, Theme: { __typename?: 'Theme', id: string, name: string, theme: any, mobileVersions: Array<string>, webVersions: Array<string>, startDate?: any | null, updatedAt: any, createdAt: any, endDate?: any | null } }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, RelationshipStatus: Array<RelationshipStatus>, venueMetAt?: string | null, createdAt: any, updatedAt: any, friendProfile?: { __typename?: 'Profile', id: string, ProfileType: ProfileType, tonightStory?: { __typename?: 'Story', emojimood?: { __typename?: 'Emojimood', id: string, emojiname?: string | null, emoji?: string | null, colors: Array<string> } | null, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, active: boolean, position?: number | null, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> } | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, firstname?: string | null, lastname?: string | null, fullname?: string | null, username: string } | null } | null }>, profilePhoto?: { __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any } | null, photos?: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> | null, Credentials: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: string, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: string, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null }, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, personalId: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }>, Personal: { __typename?: 'Personal', id: string } } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }> } | null, Location?: { __typename?: 'Location', id: string, h3Index15: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: string, h3Index15?: string | null, latitude: number, longitude: number } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: string, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, tonightStory?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood?: { __typename: 'Emojimood', id: string, colors: Array<string>, emojiname?: string | null, emoji?: string | null } | null } | null } } | null };

export type VenuesQueryVariables = Exact<{
  where?: InputMaybe<VenueWhereInput>;
}>;


export type VenuesQuery = { __typename?: 'Query', venues: Array<{ __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename: 'Profile', id: string, ProfileType: ProfileType, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, capacity?: number | null, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: string, emoji?: string | null, name: string }> } | null, resentSearches?: { __typename?: 'SearchesService', id: string, profileId: string, searches: Array<any>, Profile: { __typename?: 'Profile', id: string } } | null, ThemeManager?: { __typename?: 'ThemeManager', id: string, ProfileTheme: Array<{ __typename?: 'ProfileTheme', id: string, isActive: boolean, themeId: string, themeManagerId?: string | null, updatedAt: any, createdAt: any, ThemeManager: { __typename?: 'ThemeManager', id: string }, Theme: { __typename?: 'Theme', id: string, name: string, theme: any, mobileVersions: Array<string>, webVersions: Array<string>, startDate?: any | null, updatedAt: any, createdAt: any, endDate?: any | null } }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, RelationshipStatus: Array<RelationshipStatus>, venueMetAt?: string | null, createdAt: any, updatedAt: any, friendProfile?: { __typename?: 'Profile', id: string, ProfileType: ProfileType, tonightStory?: { __typename?: 'Story', emojimood?: { __typename?: 'Emojimood', id: string, emojiname?: string | null, emoji?: string | null, colors: Array<string> } | null, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, active: boolean, position?: number | null, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> } | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, firstname?: string | null, lastname?: string | null, fullname?: string | null, username: string } | null } | null }>, profilePhoto?: { __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any } | null, photos?: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }> | null, Credentials: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: string, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: string, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null }, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, personalId: string, createdAt: any, updatedAt: any, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }>, Personal: { __typename?: 'Personal', id: string } } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, Out: Array<{ __typename?: 'Out', id: string, type: OutType, personalProfileId: string, venueProfileId: string, venueStatsId?: string | null, personalStatsId?: string | null, liveOutVenueId?: string | null, leftAt?: any | null, liveOutPersonalId?: string | null, createdAt: any, updatedAt: any, VenueStats?: { __typename?: 'VenueStats', id: string } | null, PersonalStats?: { __typename?: 'PersonalStats', id: string } | null, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string } | null }> } | null, Location?: { __typename?: 'Location', id: string, h3Index15: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: string, h3Index15?: string | null, latitude: number, longitude: number } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: string, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, tonightStory?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood?: { __typename: 'Emojimood', id: string, colors: Array<string>, emojiname?: string | null, emoji?: string | null } | null } | null } }> };

export type UpdateH6ComingAreaVoteMutationVariables = Exact<{
  comingAreaId: Scalars['String'];
}>;


export type UpdateH6ComingAreaVoteMutation = { __typename?: 'Mutation', updateH6ComingAreaVote: { __typename?: 'ComingArea', id: string, areaId?: string | null, h3Index5: string, h3Index6: string, keywordSuggestions: Array<string>, timesRequested?: number | null, toBeNotifiedProfileIds: Array<string>, Area?: { __typename?: 'Area', id: string } | null, Vote: Array<{ __typename?: 'Vote', id: string, upvote: boolean, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string } }> } };

export type UpdateComingAreaToBeNotifiedMutationVariables = Exact<{
  comingAreaId: Scalars['String'];
}>;


export type UpdateComingAreaToBeNotifiedMutation = { __typename?: 'Mutation', updateH6ComingAreaToBeNotified: { __typename?: 'ComingArea', id: string, areaId?: string | null, h3Index5: string, h3Index6: string, keywordSuggestions: Array<string>, timesRequested?: number | null, toBeNotifiedProfileIds: Array<string>, Area?: { __typename?: 'Area', id: string } | null, Vote: Array<{ __typename?: 'Vote', id: string, upvote: boolean, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string } }> } };

export type UpdateH6VenueRemmendationMutationVariables = Exact<{
  venueRecommendationId: Scalars['String'];
}>;


export type UpdateH6VenueRemmendationMutation = { __typename?: 'Mutation', updateH6VenueRemmendation: { __typename?: 'H3Index6VenueRecommendation', id: string } };

export type VenuesNearbyQueryVariables = Exact<{
  countryIsoCode: Scalars['String'];
  stateIsoCode: Scalars['String'];
  kRing?: InputMaybe<Scalars['Int']>;
  currentLocationCoords?: InputMaybe<CoordsInput>;
  searchAreaCoords: CoordsInput;
}>;


export type VenuesNearbyQuery = { __typename?: 'Query', venuesNearby: { __typename?: 'ComingAreaResponse', comingAreas: Array<{ __typename?: 'ComingArea', id: string, h3Index5: string, h3Index6: string, keywordSuggestions: Array<string>, timesRequested?: number | null, toBeNotifiedProfileIds: Array<string>, createdAt: any, updatedAt: any, Area?: { __typename?: 'Area', id: string, City: { __typename?: 'City', id: string, name: string, Geometry: { __typename?: 'Geometry', id: string, latitude: number, longitude: number } }, State: { __typename?: 'State', id: string, name: string, isoCode: string, Geometry: { __typename?: 'Geometry', id: string, latitude: number, longitude: number } }, Country: { __typename?: 'Country', id: string, name: string, isoCode: string, Geometry: { __typename?: 'Geometry', id: string, latitude: number, longitude: number } } } | null, Vote: Array<{ __typename?: 'Vote', id: string, profileId: string, upvote: boolean }> }>, searchArea?: { __typename?: 'Area', id: string, City: { __typename?: 'City', id: string, name: string, Geometry: { __typename?: 'Geometry', id: string, latitude: number, longitude: number } }, State: { __typename?: 'State', id: string, name: string, isoCode: string, Geometry: { __typename?: 'Geometry', id: string, latitude: number, longitude: number } }, Country: { __typename?: 'Country', id: string, name: string, isoCode: string, Geometry: { __typename?: 'Geometry', id: string, latitude: number, longitude: number } } } | null } | { __typename?: 'Error', errorCode: string, message: string } | { __typename?: 'VenuesNearbyResponse', searchArea?: { __typename?: 'Area', id: string, City: { __typename?: 'City', id: string, name: string, Geometry: { __typename?: 'Geometry', id: string, latitude: number, longitude: number } }, State: { __typename?: 'State', id: string, name: string, isoCode: string, Geometry: { __typename?: 'Geometry', id: string, latitude: number, longitude: number } }, Country: { __typename?: 'Country', id: string, name: string, isoCode: string, Geometry: { __typename?: 'Geometry', id: string, latitude: number, longitude: number } } } | null, venuesNearby: Array<{ __typename: 'ProfileVenue', id: string, ProfileType: ProfileType, distanceInM?: number | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, capacity?: number | null, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: string, emoji?: string | null, name: string }> } | null, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }>, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, Out: Array<{ __typename?: 'Out', id: string, venueProfileId: string, personalProfileId: string }> } | null, Location?: { __typename?: 'Location', id: string, h3Index15: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: string, h3Index15?: string | null, latitude: number, longitude: number } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: string, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null }> } };

export type GetAllCountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCountriesQuery = { __typename?: 'Query', getAllCountries: Array<{ __typename?: 'CountryResponseObject', name: string, phonecode: string, isoCode: string, flag: string, currency: string, latitude: string, longitude: string }> };

export type GetAllStatesByCountryQueryVariables = Exact<{
  countryIsoCode: Scalars['String'];
}>;


export type GetAllStatesByCountryQuery = { __typename?: 'Query', getAllStatesByCountry: Array<{ __typename?: 'StateResponseObject', name: string, isoCode: string, countryCode: string, latitude?: string | null, longitude?: string | null }> };

export type GetAllCitiesByStateQueryVariables = Exact<{
  countryIsoCode: Scalars['String'];
  stateIsoCode: Scalars['String'];
}>;


export type GetAllCitiesByStateQuery = { __typename?: 'Query', getAllCitiesByState: { __typename?: 'OrganizedCityResponseObject', popularCities?: Array<{ __typename?: 'CityResponseObject', name: string, stateCode: string, venuesInArea?: number | null, countryCode: string, latitude?: string | null, longitude?: string | null }> | null, allCities?: Array<{ __typename?: 'CityResponseObject', name: string, stateCode: string, venuesInArea?: number | null, countryCode: string, latitude?: string | null, longitude?: string | null }> | null } };

export type AddStoryPhotosMutationVariables = Exact<{
  photos?: InputMaybe<PhotoCreateManyProfileInputEnvelope>;
}>;


export type AddStoryPhotosMutation = { __typename?: 'Mutation', addStoryPhotos: { __typename?: 'Story', id: string, date: any, startDate: any, createdAt: any, updatedAt?: any | null, emojimood?: { __typename?: 'Emojimood', colors: Array<string>, emoji?: string | null, emojiname?: string | null, id: string } | null, photos: Array<{ __typename?: 'Photo', active: boolean, blurhash?: string | null, createdAt: any, groupId?: string | null, height?: number | null, id: string, position?: number | null, profileId?: string | null, ratio?: string | null, storyId?: string | null, type?: PhotoType | null, updatedAt: any, url: string, width?: number | null, Group?: { __typename?: 'Group', id: string } | null, Profile?: { __typename?: 'Profile', id: string } | null, Story?: { __typename?: 'Story', id: string } | null }> } };

export type RemoveStoryPhotosMutationVariables = Exact<{
  photoId: Scalars['String'];
}>;


export type RemoveStoryPhotosMutation = { __typename?: 'Mutation', removeStoryPhotos: { __typename?: 'Story', id: string, date: any, startDate: any, createdAt: any, updatedAt?: any | null, emojimood?: { __typename?: 'Emojimood', colors: Array<string>, emoji?: string | null, emojiname?: string | null, id: string } | null, photos: Array<{ __typename?: 'Photo', active: boolean, blurhash?: string | null, createdAt: any, groupId?: string | null, height?: number | null, id: string, position?: number | null, profileId?: string | null, ratio?: string | null, storyId?: string | null, type?: PhotoType | null, updatedAt: any, url: string, width?: number | null, Group?: { __typename?: 'Group', id: string } | null, Profile?: { __typename?: 'Profile', id: string } | null, Story?: { __typename?: 'Story', id: string } | null }> } };

export type UpdateStoryEmojimoodMutationVariables = Exact<{
  emojimoodId: Scalars['Int'];
}>;


export type UpdateStoryEmojimoodMutation = { __typename?: 'Mutation', updateStoryEmojimood: { __typename?: 'Story', id: string, date: any, startDate: any, createdAt: any, updatedAt?: any | null, emojimood?: { __typename?: 'Emojimood', colors: Array<string>, emoji?: string | null, emojiname?: string | null, id: string } | null, photos: Array<{ __typename?: 'Photo', active: boolean, blurhash?: string | null, createdAt: any, groupId?: string | null, height?: number | null, id: string, position?: number | null, profileId?: string | null, ratio?: string | null, storyId?: string | null, type?: PhotoType | null, updatedAt: any, url: string, width?: number | null, Group?: { __typename?: 'Group', id: string } | null, Profile?: { __typename?: 'Profile', id: string } | null, Story?: { __typename?: 'Story', id: string } | null }> } };

export type UpdateThemeManagerSwitchThemeMutationVariables = Exact<{
  id: Scalars['String'];
  themeId: Scalars['String'];
}>;


export type UpdateThemeManagerSwitchThemeMutation = { __typename?: 'Mutation', updateThemeManagerSwitchTheme: { __typename?: 'ProfileTheme', id: string, isActive: boolean, themeId: string, themeManagerId?: string | null, updatedAt: any, createdAt: any, ThemeManager: { __typename?: 'ThemeManager', id: string }, Theme: { __typename?: 'Theme', id: string, name: string, theme: any, mobileVersions: Array<string>, webVersions: Array<string>, startDate?: any | null, updatedAt: any, createdAt: any, endDate?: any | null } } };

export type GetAllThemesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllThemesQuery = { __typename?: 'Query', getAllThemes: Array<{ __typename?: 'Theme', id: string, name: string, theme: any, mobileVersions: Array<string>, webVersions: Array<string>, startDate?: any | null, updatedAt: any, createdAt: any, endDate?: any | null }> };

export type GetProfileThemeManagerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileThemeManagerQuery = { __typename?: 'Query', getProfileThemeManager: { __typename?: 'ThemeManager', id: string, ProfileTheme: Array<{ __typename?: 'ProfileTheme', id: string, isActive: boolean, themeId: string, themeManagerId?: string | null, updatedAt: any, createdAt: any, ThemeManager: { __typename?: 'ThemeManager', id: string }, Theme: { __typename?: 'Theme', id: string, name: string, theme: any, mobileVersions: Array<string>, webVersions: Array<string>, startDate?: any | null, updatedAt: any, createdAt: any, endDate?: any | null } }> } };

export const Area_FragmentFragmentDoc = gql`
    fragment AREA_FRAGMENT on Area {
  id
  City {
    id
    name
    Geometry {
      id
      latitude
      longitude
    }
  }
  State {
    id
    name
    isoCode
    Geometry {
      id
      latitude
      longitude
    }
  }
  Country {
    id
    name
    isoCode
    Geometry {
      id
      latitude
      longitude
    }
  }
}
    `;
export const Country_FragmentFragmentDoc = gql`
    fragment COUNTRY_FRAGMENT on Country {
  id
  name
  isoCode
  Geometry {
    id
    latitude
    longitude
  }
}
    `;
export const State_FragmentFragmentDoc = gql`
    fragment STATE_FRAGMENT on State {
  id
  name
  isoCode
  Geometry {
    id
    latitude
    longitude
  }
}
    `;
export const City_FragmentFragmentDoc = gql`
    fragment CITY_FRAGMENT on City {
  id
  name
  Geometry {
    id
    latitude
    longitude
  }
}
    `;
export const Indetifiable_Information_FragmentFragmentDoc = gql`
    fragment INDETIFIABLE_INFORMATION_FRAGMENT on IdentifiableInformation {
  id
  username
  fullname
  nickname
  firstname
  lastname
  gender
  lookfor
  birthday
  hometown
  currenttown
}
    `;
export const Detail_Information_FragmentFragmentDoc = gql`
    fragment DETAIL_INFORMATION_FRAGMENT on DetailInformation {
  id
  Tags {
    id
    emoji
    name
  }
  capacity
  description
  established
  profileId
}
    `;
export const Theme_FragmentFragmentDoc = gql`
    fragment THEME_FRAGMENT on Theme {
  id
  name
  theme
  mobileVersions
  webVersions
  startDate
  updatedAt
  createdAt
  endDate
}
    `;
export const Profile_Theme_FragmentFragmentDoc = gql`
    fragment PROFILE_THEME_FRAGMENT on ProfileTheme {
  id
  isActive
  themeId
  themeManagerId
  ThemeManager {
    id
  }
  Theme {
    ...THEME_FRAGMENT
  }
  updatedAt
  createdAt
}
    ${Theme_FragmentFragmentDoc}`;
export const Theme_Manager_FragmentFragmentDoc = gql`
    fragment THEME_MANAGER_FRAGMENT on ThemeManager {
  id
  ProfileTheme {
    ...PROFILE_THEME_FRAGMENT
  }
}
    ${Profile_Theme_FragmentFragmentDoc}`;
export const Relationship_FragmentFragmentDoc = gql`
    fragment RELATIONSHIP_FRAGMENT on Relationship {
  id
  RelationshipStatus
  friendProfile {
    id
    ProfileType
    tonightStory {
      emojimood {
        id
        emojiname
        emoji
        colors
      }
      photos {
        id
        url
        type
        active
        position
        ratio
        blurhash
        createdAt
        updatedAt
      }
    }
    IdentifiableInformation {
      id
      firstname
      lastname
      fullname
      username
    }
  }
  venueMetAt
  createdAt
  updatedAt
}
    `;
export const Credentials_FragmentFragmentDoc = gql`
    fragment CREDENTIALS_FRAGMENT on Credentials {
  id
  AuthenticationProvider {
    id
    phones {
      id
      number
      completeNumber
      countryCode
      canUseAsRecovery
      countryCallingCode
      createdAt
      updatedAt
    }
    emails {
      id
      email
      canUseAsRecovery
      createdAt
      updatedAt
    }
  }
}
    `;
export const Out_FragmentFragmentDoc = gql`
    fragment OUT_FRAGMENT on Out {
  id
  type
  personalProfileId
  venueProfileId
  VenueStats {
    id
  }
  venueStatsId
  PersonalStats {
    id
  }
  personalStatsId
  LiveOutVenue {
    id
  }
  liveOutVenueId
  leftAt
  LiveOutPersonal {
    id
  }
  liveOutPersonalId
  createdAt
  updatedAt
}
    `;
export const Location_FragmentFragmentDoc = gql`
    fragment LOCATION_FRAGMENT on Location {
  id
  h3Index15
  Geometry {
    id
    h3Index15
    latitude
    longitude
  }
  plusCode {
    compoundCode
    globalCode
    id
  }
  Address {
    id
    formattedAddress
    AddressComponents {
      id
      short_name
      long_name
      types
      h3Index15
    }
  }
  createdAt
  updatedAt
}
    `;
export const Profile_FragmentFragmentDoc = gql`
    fragment PROFILE_FRAGMENT on Profile {
  __typename
  id
  ProfileType
  IdentifiableInformation {
    ...INDETIFIABLE_INFORMATION_FRAGMENT
  }
  DetailInformation {
    ...DETAIL_INFORMATION_FRAGMENT
  }
  resentSearches {
    id
    Profile {
      id
    }
    profileId
    searches
  }
  ThemeManager {
    ...THEME_MANAGER_FRAGMENT
  }
  Relationships {
    ...RELATIONSHIP_FRAGMENT
  }
  profilePhoto {
    id
    url
    type
    position
    active
    ratio
    blurhash
    createdAt
    updatedAt
  }
  photos {
    id
    url
    type
    position
    active
    ratio
    blurhash
    createdAt
    updatedAt
  }
  Credentials {
    ...CREDENTIALS_FRAGMENT
  }
  Personal {
    id
    Profile {
      id
      createdAt
      updatedAt
    }
    profileId
    PersonalStats {
      id
      Out {
        ...OUT_FRAGMENT
      }
      createdAt
      updatedAt
    }
    LiveOutPersonal {
      id
      Out {
        ...OUT_FRAGMENT
      }
      Personal {
        id
      }
      personalId
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
  Venue {
    id
    Profile {
      id
      createdAt
      updatedAt
    }
    LiveOutVenue {
      id
      Out {
        ...OUT_FRAGMENT
      }
    }
    Location {
      ...LOCATION_FRAGMENT
    }
    createdAt
    updatedAt
  }
  tonightStory {
    id
    photos {
      id
      position
      url
    }
    emojimood {
      __typename
      id
      colors
      emojiname
      emoji
    }
  }
}
    ${Indetifiable_Information_FragmentFragmentDoc}
${Detail_Information_FragmentFragmentDoc}
${Theme_Manager_FragmentFragmentDoc}
${Relationship_FragmentFragmentDoc}
${Credentials_FragmentFragmentDoc}
${Out_FragmentFragmentDoc}
${Location_FragmentFragmentDoc}`;
export const Authorization_Device_Profile_FragmentFragmentDoc = gql`
    fragment AUTHORIZATION_DEVICE_PROFILE_FRAGMENT on AuthorizationDeviceProfile {
  id
  profileId
  isActive
  refreshtoken
  accesstoken
  deviceManagerId
  Profile {
    ...PROFILE_FRAGMENT
  }
  AppType
  ProfileType
  DeviceManager {
    id
  }
  RefreshToken {
    id
    token
    createdAt
    updatedAt
  }
  createdAt
  updatedAt
}
    ${Profile_FragmentFragmentDoc}`;
export const Authorization_Device_Manager_FragmentFragmentDoc = gql`
    fragment AUTHORIZATION_DEVICE_MANAGER_FRAGMENT on AuthorizationDeviceManager {
  id
  DeviceProfile {
    ...AUTHORIZATION_DEVICE_PROFILE_FRAGMENT
  }
  Device {
    id
  }
}
    ${Authorization_Device_Profile_FragmentFragmentDoc}`;
export const Error_FragmentFragmentDoc = gql`
    fragment ERROR_FRAGMENT on Error {
  errorCode
  message
}
    `;
export const Code_FragmentFragmentDoc = gql`
    fragment CODE_FRAGMENT on Code {
  id
  code
}
    `;
export const Personal_FragmentFragmentDoc = gql`
    fragment PERSONAL_FRAGMENT on Personal {
  id
  Profile {
    ...PROFILE_FRAGMENT
  }
  updatedAt
  createdAt
}
    ${Profile_FragmentFragmentDoc}`;
export const Public_Profile_FragmentFragmentDoc = gql`
    fragment PUBLIC_PROFILE_FRAGMENT on Profile {
  __typename
  id
  ProfileType
  IdentifiableInformation {
    ...INDETIFIABLE_INFORMATION_FRAGMENT
  }
  DetailInformation {
    ...DETAIL_INFORMATION_FRAGMENT
  }
  Relationships {
    ...RELATIONSHIP_FRAGMENT
  }
  profilePhoto {
    id
    url
    type
    position
    active
    ratio
    blurhash
    createdAt
    updatedAt
  }
  photos {
    id
    url
    type
    position
    active
    ratio
    blurhash
    createdAt
    updatedAt
  }
  Credentials {
    ...CREDENTIALS_FRAGMENT
  }
  Personal {
    id
    Profile {
      id
      createdAt
      updatedAt
    }
    profileId
    PersonalStats {
      id
      Out {
        id
        type
        personalProfileId
        venueProfileId
        createdAt
        updatedAt
      }
    }
    LiveOutPersonal {
      id
      Out {
        id
        venueProfileId
        personalProfileId
      }
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
  Venue {
    id
    Profile {
      id
      createdAt
      updatedAt
    }
    LiveOutVenue {
      id
      Out {
        id
        venueProfileId
        personalProfileId
      }
    }
    Location {
      ...LOCATION_FRAGMENT
    }
    createdAt
    updatedAt
  }
  tonightStory {
    id
    date
    emojimood {
      id
      emojiname
      emoji
      colors
    }
    Profile {
      id
    }
    photos {
      id
      url
      active
      blurhash
      ratio
      type
      position
      createdAt
      updatedAt
    }
    startDate
    createdAt
    updatedAt
  }
}
    ${Indetifiable_Information_FragmentFragmentDoc}
${Detail_Information_FragmentFragmentDoc}
${Relationship_FragmentFragmentDoc}
${Credentials_FragmentFragmentDoc}
${Location_FragmentFragmentDoc}`;
export const Profile_Venues_FragmentFragmentDoc = gql`
    fragment PROFILE_VENUES_FRAGMENT on ProfileVenue {
  __typename
  id
  ProfileType
  IdentifiableInformation {
    ...INDETIFIABLE_INFORMATION_FRAGMENT
  }
  distanceInM
  DetailInformation {
    ...DETAIL_INFORMATION_FRAGMENT
  }
  photos {
    id
    url
    type
    position
    active
    ratio
    blurhash
    createdAt
    updatedAt
  }
  Venue {
    id
    Profile {
      id
      createdAt
      updatedAt
    }
    LiveOutVenue {
      id
      Out {
        id
        venueProfileId
        personalProfileId
      }
    }
    Location {
      ...LOCATION_FRAGMENT
    }
    createdAt
    updatedAt
  }
}
    ${Indetifiable_Information_FragmentFragmentDoc}
${Detail_Information_FragmentFragmentDoc}
${Location_FragmentFragmentDoc}`;
export const Story_FragmentFragmentDoc = gql`
    fragment STORY_FRAGMENT on Story {
  id
  date
  emojimood {
    colors
    emoji
    emojiname
    id
  }
  startDate
  createdAt
  updatedAt
  photos {
    Group {
      id
    }
    Profile {
      id
    }
    Story {
      id
    }
    active
    blurhash
    createdAt
    groupId
    height
    id
    position
    profileId
    ratio
    storyId
    type
    updatedAt
    url
    width
  }
}
    `;
export const Venue_FragmentFragmentDoc = gql`
    fragment VENUE_FRAGMENT on Venue {
  id
  Profile {
    ...PROFILE_FRAGMENT
  }
  createdAt
  updatedAt
}
    ${Profile_FragmentFragmentDoc}`;
export const UpsertDevicePushTokenDocument = gql`
    mutation upsertDevicePushToken($androidToken: String, $appleToken: String, $expoToken: String) {
  upsertDevicePushToken(androidToken: $androidToken, appleToken: $appleToken, expoToken: $expoToken)
}
    `;
export type UpsertDevicePushTokenMutationFn = Apollo.MutationFunction<UpsertDevicePushTokenMutation, UpsertDevicePushTokenMutationVariables>;

/**
 * __useUpsertDevicePushTokenMutation__
 *
 * To run a mutation, you first call `useUpsertDevicePushTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertDevicePushTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertDevicePushTokenMutation, { data, loading, error }] = useUpsertDevicePushTokenMutation({
 *   variables: {
 *      androidToken: // value for 'androidToken'
 *      appleToken: // value for 'appleToken'
 *      expoToken: // value for 'expoToken'
 *   },
 * });
 */
export function useUpsertDevicePushTokenMutation(baseOptions?: Apollo.MutationHookOptions<UpsertDevicePushTokenMutation, UpsertDevicePushTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertDevicePushTokenMutation, UpsertDevicePushTokenMutationVariables>(UpsertDevicePushTokenDocument, options);
      }
export type UpsertDevicePushTokenMutationHookResult = ReturnType<typeof useUpsertDevicePushTokenMutation>;
export type UpsertDevicePushTokenMutationResult = Apollo.MutationResult<UpsertDevicePushTokenMutation>;
export type UpsertDevicePushTokenMutationOptions = Apollo.BaseMutationOptions<UpsertDevicePushTokenMutation, UpsertDevicePushTokenMutationVariables>;
export const SwitchDeviceProfileDocument = gql`
    mutation switchDeviceProfile($profileId: String!) {
  switchDeviceProfile(profileId: $profileId) {
    ... on AuthorizationDeviceManager {
      __typename
      id
      DeviceProfile {
        id
        isActive
        refreshtoken
        accesstoken
        AppType
        DeviceManager {
          id
        }
        deviceManagerId
        Profile {
          ...PROFILE_FRAGMENT
        }
      }
    }
    ... on Error {
      errorCode
      message
    }
  }
}
    ${Profile_FragmentFragmentDoc}`;
export type SwitchDeviceProfileMutationFn = Apollo.MutationFunction<SwitchDeviceProfileMutation, SwitchDeviceProfileMutationVariables>;

/**
 * __useSwitchDeviceProfileMutation__
 *
 * To run a mutation, you first call `useSwitchDeviceProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSwitchDeviceProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [switchDeviceProfileMutation, { data, loading, error }] = useSwitchDeviceProfileMutation({
 *   variables: {
 *      profileId: // value for 'profileId'
 *   },
 * });
 */
export function useSwitchDeviceProfileMutation(baseOptions?: Apollo.MutationHookOptions<SwitchDeviceProfileMutation, SwitchDeviceProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SwitchDeviceProfileMutation, SwitchDeviceProfileMutationVariables>(SwitchDeviceProfileDocument, options);
      }
export type SwitchDeviceProfileMutationHookResult = ReturnType<typeof useSwitchDeviceProfileMutation>;
export type SwitchDeviceProfileMutationResult = Apollo.MutationResult<SwitchDeviceProfileMutation>;
export type SwitchDeviceProfileMutationOptions = Apollo.BaseMutationOptions<SwitchDeviceProfileMutation, SwitchDeviceProfileMutationVariables>;
export const RefreshDeviceManagerDocument = gql`
    mutation refreshDeviceManager {
  refreshDeviceManager {
    ... on AuthorizationDeviceManager {
      id
      DeviceProfile {
        id
        isActive
        refreshtoken
        accesstoken
        AppType
        DeviceManager {
          id
        }
        deviceManagerId
        Profile {
          ...PROFILE_FRAGMENT
        }
      }
    }
    ... on Error {
      errorCode
      message
    }
  }
}
    ${Profile_FragmentFragmentDoc}`;
export type RefreshDeviceManagerMutationFn = Apollo.MutationFunction<RefreshDeviceManagerMutation, RefreshDeviceManagerMutationVariables>;

/**
 * __useRefreshDeviceManagerMutation__
 *
 * To run a mutation, you first call `useRefreshDeviceManagerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshDeviceManagerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshDeviceManagerMutation, { data, loading, error }] = useRefreshDeviceManagerMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshDeviceManagerMutation(baseOptions?: Apollo.MutationHookOptions<RefreshDeviceManagerMutation, RefreshDeviceManagerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshDeviceManagerMutation, RefreshDeviceManagerMutationVariables>(RefreshDeviceManagerDocument, options);
      }
export type RefreshDeviceManagerMutationHookResult = ReturnType<typeof useRefreshDeviceManagerMutation>;
export type RefreshDeviceManagerMutationResult = Apollo.MutationResult<RefreshDeviceManagerMutation>;
export type RefreshDeviceManagerMutationOptions = Apollo.BaseMutationOptions<RefreshDeviceManagerMutation, RefreshDeviceManagerMutationVariables>;
export const GetADeviceManagerDocument = gql`
    query getADeviceManager {
  getADeviceManager {
    ... on DeviceManagerDeviceProfiles {
      DeviceProfiles {
        id
        AppType
        isActive
        accesstoken
        refreshtoken
        Profile {
          ...PROFILE_FRAGMENT
        }
      }
    }
  }
}
    ${Profile_FragmentFragmentDoc}`;

/**
 * __useGetADeviceManagerQuery__
 *
 * To run a query within a React component, call `useGetADeviceManagerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetADeviceManagerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetADeviceManagerQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetADeviceManagerQuery(baseOptions?: Apollo.QueryHookOptions<GetADeviceManagerQuery, GetADeviceManagerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetADeviceManagerQuery, GetADeviceManagerQueryVariables>(GetADeviceManagerDocument, options);
      }
export function useGetADeviceManagerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetADeviceManagerQuery, GetADeviceManagerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetADeviceManagerQuery, GetADeviceManagerQueryVariables>(GetADeviceManagerDocument, options);
        }
export type GetADeviceManagerQueryHookResult = ReturnType<typeof useGetADeviceManagerQuery>;
export type GetADeviceManagerLazyQueryHookResult = ReturnType<typeof useGetADeviceManagerLazyQuery>;
export type GetADeviceManagerQueryResult = Apollo.QueryResult<GetADeviceManagerQuery, GetADeviceManagerQueryVariables>;
export const SendAuthenticatorDeviceOwnerCodeDocument = gql`
    mutation sendAuthenticatorDeviceOwnerCode($data: CodeDataInput, $where: CustomCodeWhereInput) {
  sendAuthenticatorDeviceOwnerCode(data: $data, where: $where) {
    ... on Code {
      ...CODE_FRAGMENT
    }
    ... on Error {
      ...ERROR_FRAGMENT
    }
  }
}
    ${Code_FragmentFragmentDoc}
${Error_FragmentFragmentDoc}`;
export type SendAuthenticatorDeviceOwnerCodeMutationFn = Apollo.MutationFunction<SendAuthenticatorDeviceOwnerCodeMutation, SendAuthenticatorDeviceOwnerCodeMutationVariables>;

/**
 * __useSendAuthenticatorDeviceOwnerCodeMutation__
 *
 * To run a mutation, you first call `useSendAuthenticatorDeviceOwnerCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendAuthenticatorDeviceOwnerCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendAuthenticatorDeviceOwnerCodeMutation, { data, loading, error }] = useSendAuthenticatorDeviceOwnerCodeMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useSendAuthenticatorDeviceOwnerCodeMutation(baseOptions?: Apollo.MutationHookOptions<SendAuthenticatorDeviceOwnerCodeMutation, SendAuthenticatorDeviceOwnerCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendAuthenticatorDeviceOwnerCodeMutation, SendAuthenticatorDeviceOwnerCodeMutationVariables>(SendAuthenticatorDeviceOwnerCodeDocument, options);
      }
export type SendAuthenticatorDeviceOwnerCodeMutationHookResult = ReturnType<typeof useSendAuthenticatorDeviceOwnerCodeMutation>;
export type SendAuthenticatorDeviceOwnerCodeMutationResult = Apollo.MutationResult<SendAuthenticatorDeviceOwnerCodeMutation>;
export type SendAuthenticatorDeviceOwnerCodeMutationOptions = Apollo.BaseMutationOptions<SendAuthenticatorDeviceOwnerCodeMutation, SendAuthenticatorDeviceOwnerCodeMutationVariables>;
export const AuthorizedProfilesDocument = gql`
    query authorizedProfiles($where: AuthorizedProfilesWhereInput!) {
  authorizedProfiles(where: $where) {
    ... on Error {
      ...ERROR_FRAGMENT
    }
    ... on ProfilesResponse {
      email {
        id
        ProfileType
        profilePhoto {
          id
          blurhash
          url
        }
        IdentifiableInformation {
          id
          username
          fullname
        }
      }
      phone {
        id
        ProfileType
        profilePhoto {
          id
          blurhash
          url
        }
        photos {
          id
          blurhash
          url
        }
        IdentifiableInformation {
          id
          username
          fullname
        }
        tonightStory {
          id
          emojimood {
            colors
            emoji
            emojiname
          }
        }
      }
      username {
        id
        ProfileType
        profilePhoto {
          id
          blurhash
          url
        }
        photos {
          id
          blurhash
          url
        }
        IdentifiableInformation {
          id
          username
          fullname
        }
      }
    }
  }
}
    ${Error_FragmentFragmentDoc}`;

/**
 * __useAuthorizedProfilesQuery__
 *
 * To run a query within a React component, call `useAuthorizedProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthorizedProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthorizedProfilesQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useAuthorizedProfilesQuery(baseOptions: Apollo.QueryHookOptions<AuthorizedProfilesQuery, AuthorizedProfilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthorizedProfilesQuery, AuthorizedProfilesQueryVariables>(AuthorizedProfilesDocument, options);
      }
export function useAuthorizedProfilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthorizedProfilesQuery, AuthorizedProfilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthorizedProfilesQuery, AuthorizedProfilesQueryVariables>(AuthorizedProfilesDocument, options);
        }
export type AuthorizedProfilesQueryHookResult = ReturnType<typeof useAuthorizedProfilesQuery>;
export type AuthorizedProfilesLazyQueryHookResult = ReturnType<typeof useAuthorizedProfilesLazyQuery>;
export type AuthorizedProfilesQueryResult = Apollo.QueryResult<AuthorizedProfilesQuery, AuthorizedProfilesQueryVariables>;
export const PrivacyTermsDocumentsDocument = gql`
    query privacyTermsDocuments {
  privacyTermsDocuments {
    privacy {
      id
      LegalAgreement {
        id
      }
      TypeOfDocument
      createdAt
      updatedAt
      content
    }
    termsofservice {
      id
      LegalAgreement {
        id
      }
      TypeOfDocument
      createdAt
      updatedAt
      content
    }
  }
}
    `;

/**
 * __usePrivacyTermsDocumentsQuery__
 *
 * To run a query within a React component, call `usePrivacyTermsDocumentsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrivacyTermsDocumentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrivacyTermsDocumentsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePrivacyTermsDocumentsQuery(baseOptions?: Apollo.QueryHookOptions<PrivacyTermsDocumentsQuery, PrivacyTermsDocumentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PrivacyTermsDocumentsQuery, PrivacyTermsDocumentsQueryVariables>(PrivacyTermsDocumentsDocument, options);
      }
export function usePrivacyTermsDocumentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PrivacyTermsDocumentsQuery, PrivacyTermsDocumentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PrivacyTermsDocumentsQuery, PrivacyTermsDocumentsQueryVariables>(PrivacyTermsDocumentsDocument, options);
        }
export type PrivacyTermsDocumentsQueryHookResult = ReturnType<typeof usePrivacyTermsDocumentsQuery>;
export type PrivacyTermsDocumentsLazyQueryHookResult = ReturnType<typeof usePrivacyTermsDocumentsLazyQuery>;
export type PrivacyTermsDocumentsQueryResult = Apollo.QueryResult<PrivacyTermsDocumentsQuery, PrivacyTermsDocumentsQueryVariables>;
export const LoginPasswordDocument = gql`
    query loginPassword($username: String!, $password: String!) {
  loginPassword(username: $username, password: $password)
}
    `;

/**
 * __useLoginPasswordQuery__
 *
 * To run a query within a React component, call `useLoginPasswordQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginPasswordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginPasswordQuery({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginPasswordQuery(baseOptions: Apollo.QueryHookOptions<LoginPasswordQuery, LoginPasswordQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginPasswordQuery, LoginPasswordQueryVariables>(LoginPasswordDocument, options);
      }
export function useLoginPasswordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginPasswordQuery, LoginPasswordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginPasswordQuery, LoginPasswordQueryVariables>(LoginPasswordDocument, options);
        }
export type LoginPasswordQueryHookResult = ReturnType<typeof useLoginPasswordQuery>;
export type LoginPasswordLazyQueryHookResult = ReturnType<typeof useLoginPasswordLazyQuery>;
export type LoginPasswordQueryResult = Apollo.QueryResult<LoginPasswordQuery, LoginPasswordQueryVariables>;
export const CheckUsernameDocument = gql`
    query checkUsername($username: String!) {
  checkUsername(username: $username)
}
    `;

/**
 * __useCheckUsernameQuery__
 *
 * To run a query within a React component, call `useCheckUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCheckUsernameQuery(baseOptions: Apollo.QueryHookOptions<CheckUsernameQuery, CheckUsernameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckUsernameQuery, CheckUsernameQueryVariables>(CheckUsernameDocument, options);
      }
export function useCheckUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckUsernameQuery, CheckUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckUsernameQuery, CheckUsernameQueryVariables>(CheckUsernameDocument, options);
        }
export type CheckUsernameQueryHookResult = ReturnType<typeof useCheckUsernameQuery>;
export type CheckUsernameLazyQueryHookResult = ReturnType<typeof useCheckUsernameLazyQuery>;
export type CheckUsernameQueryResult = Apollo.QueryResult<CheckUsernameQuery, CheckUsernameQueryVariables>;
export const RemoveAllFromVenueDeveloperDocument = gql`
    mutation removeAllFromVenueDeveloper {
  removeAllFromVenueDeveloper
}
    `;
export type RemoveAllFromVenueDeveloperMutationFn = Apollo.MutationFunction<RemoveAllFromVenueDeveloperMutation, RemoveAllFromVenueDeveloperMutationVariables>;

/**
 * __useRemoveAllFromVenueDeveloperMutation__
 *
 * To run a mutation, you first call `useRemoveAllFromVenueDeveloperMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAllFromVenueDeveloperMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAllFromVenueDeveloperMutation, { data, loading, error }] = useRemoveAllFromVenueDeveloperMutation({
 *   variables: {
 *   },
 * });
 */
export function useRemoveAllFromVenueDeveloperMutation(baseOptions?: Apollo.MutationHookOptions<RemoveAllFromVenueDeveloperMutation, RemoveAllFromVenueDeveloperMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveAllFromVenueDeveloperMutation, RemoveAllFromVenueDeveloperMutationVariables>(RemoveAllFromVenueDeveloperDocument, options);
      }
export type RemoveAllFromVenueDeveloperMutationHookResult = ReturnType<typeof useRemoveAllFromVenueDeveloperMutation>;
export type RemoveAllFromVenueDeveloperMutationResult = Apollo.MutationResult<RemoveAllFromVenueDeveloperMutation>;
export type RemoveAllFromVenueDeveloperMutationOptions = Apollo.BaseMutationOptions<RemoveAllFromVenueDeveloperMutation, RemoveAllFromVenueDeveloperMutationVariables>;
export const EmojimoodsDocument = gql`
    query emojimoods {
  emojimoods {
    id
    colors
    emoji
    emojiname
  }
}
    `;

/**
 * __useEmojimoodsQuery__
 *
 * To run a query within a React component, call `useEmojimoodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmojimoodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmojimoodsQuery({
 *   variables: {
 *   },
 * });
 */
export function useEmojimoodsQuery(baseOptions?: Apollo.QueryHookOptions<EmojimoodsQuery, EmojimoodsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EmojimoodsQuery, EmojimoodsQueryVariables>(EmojimoodsDocument, options);
      }
export function useEmojimoodsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EmojimoodsQuery, EmojimoodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EmojimoodsQuery, EmojimoodsQueryVariables>(EmojimoodsDocument, options);
        }
export type EmojimoodsQueryHookResult = ReturnType<typeof useEmojimoodsQuery>;
export type EmojimoodsLazyQueryHookResult = ReturnType<typeof useEmojimoodsLazyQuery>;
export type EmojimoodsQueryResult = Apollo.QueryResult<EmojimoodsQuery, EmojimoodsQueryVariables>;
export const EmojimoodDocument = gql`
    query emojimood($where: EmojimoodWhereUniqueInput!) {
  emojimood(where: $where) {
    id
    colors
    emoji
    emojiname
  }
}
    `;

/**
 * __useEmojimoodQuery__
 *
 * To run a query within a React component, call `useEmojimoodQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmojimoodQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmojimoodQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useEmojimoodQuery(baseOptions: Apollo.QueryHookOptions<EmojimoodQuery, EmojimoodQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EmojimoodQuery, EmojimoodQueryVariables>(EmojimoodDocument, options);
      }
export function useEmojimoodLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EmojimoodQuery, EmojimoodQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EmojimoodQuery, EmojimoodQueryVariables>(EmojimoodDocument, options);
        }
export type EmojimoodQueryHookResult = ReturnType<typeof useEmojimoodQuery>;
export type EmojimoodLazyQueryHookResult = ReturnType<typeof useEmojimoodLazyQuery>;
export type EmojimoodQueryResult = Apollo.QueryResult<EmojimoodQuery, EmojimoodQueryVariables>;
export const ExploreSearchDocument = gql`
    query exploreSearch($search: String!) {
  exploreSearch(search: $search) {
    people {
      id
      Profile {
        id
        IdentifiableInformation {
          id
          fullname
          firstname
          lastname
          username
        }
        photos {
          id
          active
          blurhash
          url
        }
      }
    }
    venues {
      id
      Profile {
        id
        IdentifiableInformation {
          id
          fullname
          firstname
          lastname
          username
        }
        photos {
          id
          active
          blurhash
          url
        }
      }
    }
    events
  }
}
    `;

/**
 * __useExploreSearchQuery__
 *
 * To run a query within a React component, call `useExploreSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useExploreSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExploreSearchQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useExploreSearchQuery(baseOptions: Apollo.QueryHookOptions<ExploreSearchQuery, ExploreSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExploreSearchQuery, ExploreSearchQueryVariables>(ExploreSearchDocument, options);
      }
export function useExploreSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExploreSearchQuery, ExploreSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExploreSearchQuery, ExploreSearchQueryVariables>(ExploreSearchDocument, options);
        }
export type ExploreSearchQueryHookResult = ReturnType<typeof useExploreSearchQuery>;
export type ExploreSearchLazyQueryHookResult = ReturnType<typeof useExploreSearchLazyQuery>;
export type ExploreSearchQueryResult = Apollo.QueryResult<ExploreSearchQuery, ExploreSearchQueryVariables>;
export const CreateFriendRequestDocument = gql`
    mutation createFriendRequest($senderProfileId: String!, $receiversProfileId: [String!]!) {
  createFriendRequest(senderProfileId: $senderProfileId, receiversProfileId: $receiversProfileId)
}
    `;
export type CreateFriendRequestMutationFn = Apollo.MutationFunction<CreateFriendRequestMutation, CreateFriendRequestMutationVariables>;

/**
 * __useCreateFriendRequestMutation__
 *
 * To run a mutation, you first call `useCreateFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFriendRequestMutation, { data, loading, error }] = useCreateFriendRequestMutation({
 *   variables: {
 *      senderProfileId: // value for 'senderProfileId'
 *      receiversProfileId: // value for 'receiversProfileId'
 *   },
 * });
 */
export function useCreateFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateFriendRequestMutation, CreateFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFriendRequestMutation, CreateFriendRequestMutationVariables>(CreateFriendRequestDocument, options);
      }
export type CreateFriendRequestMutationHookResult = ReturnType<typeof useCreateFriendRequestMutation>;
export type CreateFriendRequestMutationResult = Apollo.MutationResult<CreateFriendRequestMutation>;
export type CreateFriendRequestMutationOptions = Apollo.BaseMutationOptions<CreateFriendRequestMutation, CreateFriendRequestMutationVariables>;
export const DeleteFriendRequestDocument = gql`
    mutation deleteFriendRequest($friendRequestId: String!) {
  deleteFriendRequest(friendRequestId: $friendRequestId)
}
    `;
export type DeleteFriendRequestMutationFn = Apollo.MutationFunction<DeleteFriendRequestMutation, DeleteFriendRequestMutationVariables>;

/**
 * __useDeleteFriendRequestMutation__
 *
 * To run a mutation, you first call `useDeleteFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFriendRequestMutation, { data, loading, error }] = useDeleteFriendRequestMutation({
 *   variables: {
 *      friendRequestId: // value for 'friendRequestId'
 *   },
 * });
 */
export function useDeleteFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFriendRequestMutation, DeleteFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFriendRequestMutation, DeleteFriendRequestMutationVariables>(DeleteFriendRequestDocument, options);
      }
export type DeleteFriendRequestMutationHookResult = ReturnType<typeof useDeleteFriendRequestMutation>;
export type DeleteFriendRequestMutationResult = Apollo.MutationResult<DeleteFriendRequestMutation>;
export type DeleteFriendRequestMutationOptions = Apollo.BaseMutationOptions<DeleteFriendRequestMutation, DeleteFriendRequestMutationVariables>;
export const QrAddFriendDocument = gql`
    mutation qrAddFriend($qrCodeProfileId: String!, $dataHash: String!) {
  qrAddFriend(qrCodeProfileId: $qrCodeProfileId, dataHash: $dataHash) {
    id
    venueMetAt
    Profile {
      id
    }
    RelationshipStatus
    createdAt
    updatedAt
  }
}
    `;
export type QrAddFriendMutationFn = Apollo.MutationFunction<QrAddFriendMutation, QrAddFriendMutationVariables>;

/**
 * __useQrAddFriendMutation__
 *
 * To run a mutation, you first call `useQrAddFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useQrAddFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [qrAddFriendMutation, { data, loading, error }] = useQrAddFriendMutation({
 *   variables: {
 *      qrCodeProfileId: // value for 'qrCodeProfileId'
 *      dataHash: // value for 'dataHash'
 *   },
 * });
 */
export function useQrAddFriendMutation(baseOptions?: Apollo.MutationHookOptions<QrAddFriendMutation, QrAddFriendMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<QrAddFriendMutation, QrAddFriendMutationVariables>(QrAddFriendDocument, options);
      }
export type QrAddFriendMutationHookResult = ReturnType<typeof useQrAddFriendMutation>;
export type QrAddFriendMutationResult = Apollo.MutationResult<QrAddFriendMutation>;
export type QrAddFriendMutationOptions = Apollo.BaseMutationOptions<QrAddFriendMutation, QrAddFriendMutationVariables>;
export const AcceptFriendRequestDocument = gql`
    mutation acceptFriendRequest($friendRequestId: String!, $venueIdMetAt: String) {
  acceptFriendRequest(friendRequestId: $friendRequestId, venueIdMetAt: $venueIdMetAt) {
    id
    venueMetAt
    Profile {
      id
    }
    RelationshipStatus
    createdAt
    updatedAt
  }
}
    `;
export type AcceptFriendRequestMutationFn = Apollo.MutationFunction<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;

/**
 * __useAcceptFriendRequestMutation__
 *
 * To run a mutation, you first call `useAcceptFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptFriendRequestMutation, { data, loading, error }] = useAcceptFriendRequestMutation({
 *   variables: {
 *      friendRequestId: // value for 'friendRequestId'
 *      venueIdMetAt: // value for 'venueIdMetAt'
 *   },
 * });
 */
export function useAcceptFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>(AcceptFriendRequestDocument, options);
      }
export type AcceptFriendRequestMutationHookResult = ReturnType<typeof useAcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationResult = Apollo.MutationResult<AcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationOptions = Apollo.BaseMutationOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;
export const DeclineFriendRequestDocument = gql`
    mutation declineFriendRequest($friendRequestId: String!) {
  declineFriendRequest(friendRequestId: $friendRequestId)
}
    `;
export type DeclineFriendRequestMutationFn = Apollo.MutationFunction<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>;

/**
 * __useDeclineFriendRequestMutation__
 *
 * To run a mutation, you first call `useDeclineFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineFriendRequestMutation, { data, loading, error }] = useDeclineFriendRequestMutation({
 *   variables: {
 *      friendRequestId: // value for 'friendRequestId'
 *   },
 * });
 */
export function useDeclineFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>(DeclineFriendRequestDocument, options);
      }
export type DeclineFriendRequestMutationHookResult = ReturnType<typeof useDeclineFriendRequestMutation>;
export type DeclineFriendRequestMutationResult = Apollo.MutationResult<DeclineFriendRequestMutation>;
export type DeclineFriendRequestMutationOptions = Apollo.BaseMutationOptions<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>;
export const RemoveFriendDocument = gql`
    mutation removeFriend($relationshipId: String!) {
  removeFriend(relationshipId: $relationshipId)
}
    `;
export type RemoveFriendMutationFn = Apollo.MutationFunction<RemoveFriendMutation, RemoveFriendMutationVariables>;

/**
 * __useRemoveFriendMutation__
 *
 * To run a mutation, you first call `useRemoveFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFriendMutation, { data, loading, error }] = useRemoveFriendMutation({
 *   variables: {
 *      relationshipId: // value for 'relationshipId'
 *   },
 * });
 */
export function useRemoveFriendMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFriendMutation, RemoveFriendMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFriendMutation, RemoveFriendMutationVariables>(RemoveFriendDocument, options);
      }
export type RemoveFriendMutationHookResult = ReturnType<typeof useRemoveFriendMutation>;
export type RemoveFriendMutationResult = Apollo.MutationResult<RemoveFriendMutation>;
export type RemoveFriendMutationOptions = Apollo.BaseMutationOptions<RemoveFriendMutation, RemoveFriendMutationVariables>;
export const GetRelationshipFriendRequestStatusDocument = gql`
    query getRelationshipFriendRequestStatus($profileId: String!) {
  getRelationshipFriendRequestStatus(profileId: $profileId) {
    ... on Error {
      errorCode
      message
    }
    ... on FriendRequest {
      id
      Notifications {
        id
        profileId
        Profile {
          id
        }
      }
      receiverProfileId
      senderProfileId
      NotificationStatus {
        id
        isAccepted
        isAnswered
        isChecked
      }
      notificationStatusId
    }
    ... on Relationship {
      ...RELATIONSHIP_FRAGMENT
    }
    ... on RejectedFriendsResponse {
      friends
    }
  }
}
    ${Relationship_FragmentFragmentDoc}`;

/**
 * __useGetRelationshipFriendRequestStatusQuery__
 *
 * To run a query within a React component, call `useGetRelationshipFriendRequestStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRelationshipFriendRequestStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRelationshipFriendRequestStatusQuery({
 *   variables: {
 *      profileId: // value for 'profileId'
 *   },
 * });
 */
export function useGetRelationshipFriendRequestStatusQuery(baseOptions: Apollo.QueryHookOptions<GetRelationshipFriendRequestStatusQuery, GetRelationshipFriendRequestStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRelationshipFriendRequestStatusQuery, GetRelationshipFriendRequestStatusQueryVariables>(GetRelationshipFriendRequestStatusDocument, options);
      }
export function useGetRelationshipFriendRequestStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRelationshipFriendRequestStatusQuery, GetRelationshipFriendRequestStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRelationshipFriendRequestStatusQuery, GetRelationshipFriendRequestStatusQueryVariables>(GetRelationshipFriendRequestStatusDocument, options);
        }
export type GetRelationshipFriendRequestStatusQueryHookResult = ReturnType<typeof useGetRelationshipFriendRequestStatusQuery>;
export type GetRelationshipFriendRequestStatusLazyQueryHookResult = ReturnType<typeof useGetRelationshipFriendRequestStatusLazyQuery>;
export type GetRelationshipFriendRequestStatusQueryResult = Apollo.QueryResult<GetRelationshipFriendRequestStatusQuery, GetRelationshipFriendRequestStatusQueryVariables>;
export const GetSecureFriendQrCodeDataDocument = gql`
    query getSecureFriendQRCodeData {
  getSecureFriendQRCodeData
}
    `;

/**
 * __useGetSecureFriendQrCodeDataQuery__
 *
 * To run a query within a React component, call `useGetSecureFriendQrCodeDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSecureFriendQrCodeDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSecureFriendQrCodeDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSecureFriendQrCodeDataQuery(baseOptions?: Apollo.QueryHookOptions<GetSecureFriendQrCodeDataQuery, GetSecureFriendQrCodeDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSecureFriendQrCodeDataQuery, GetSecureFriendQrCodeDataQueryVariables>(GetSecureFriendQrCodeDataDocument, options);
      }
export function useGetSecureFriendQrCodeDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSecureFriendQrCodeDataQuery, GetSecureFriendQrCodeDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSecureFriendQrCodeDataQuery, GetSecureFriendQrCodeDataQueryVariables>(GetSecureFriendQrCodeDataDocument, options);
        }
export type GetSecureFriendQrCodeDataQueryHookResult = ReturnType<typeof useGetSecureFriendQrCodeDataQuery>;
export type GetSecureFriendQrCodeDataLazyQueryHookResult = ReturnType<typeof useGetSecureFriendQrCodeDataLazyQuery>;
export type GetSecureFriendQrCodeDataQueryResult = Apollo.QueryResult<GetSecureFriendQrCodeDataQuery, GetSecureFriendQrCodeDataQueryVariables>;
export const GetInterestsDocument = gql`
    query getInterests {
  getInterests {
    id
    name
    Tags {
      id
      name
      categoryId
      emoji
    }
  }
}
    `;

/**
 * __useGetInterestsQuery__
 *
 * To run a query within a React component, call `useGetInterestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInterestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInterestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetInterestsQuery(baseOptions?: Apollo.QueryHookOptions<GetInterestsQuery, GetInterestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInterestsQuery, GetInterestsQueryVariables>(GetInterestsDocument, options);
      }
export function useGetInterestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInterestsQuery, GetInterestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInterestsQuery, GetInterestsQueryVariables>(GetInterestsDocument, options);
        }
export type GetInterestsQueryHookResult = ReturnType<typeof useGetInterestsQuery>;
export type GetInterestsLazyQueryHookResult = ReturnType<typeof useGetInterestsLazyQuery>;
export type GetInterestsQueryResult = Apollo.QueryResult<GetInterestsQuery, GetInterestsQueryVariables>;
export const GetNotificationsDocument = gql`
    query getNotifications {
  getNotifications {
    friendRequestNotifications {
      id
      NotificationStatus {
        id
        FriendRequest {
          id
          Notifications {
            id
          }
          receiverProfileId
          senderProfileId
          NotificationStatus {
            id
          }
          notificationStatusId
        }
        isAccepted
        isAnswered
        isChecked
      }
      notificationStatusId
      receiverProfileId
      senderProfile {
        id
        photos {
          id
          type
          url
        }
        IdentifiableInformation {
          id
          username
          fullname
        }
      }
      receiverProfile {
        id
        photos {
          id
          type
          url
        }
        IdentifiableInformation {
          id
          username
          fullname
        }
      }
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetNotificationsQuery__
 *
 * To run a query within a React component, call `useGetNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
      }
export function useGetNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
        }
export type GetNotificationsQueryHookResult = ReturnType<typeof useGetNotificationsQuery>;
export type GetNotificationsLazyQueryHookResult = ReturnType<typeof useGetNotificationsLazyQuery>;
export type GetNotificationsQueryResult = Apollo.QueryResult<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const AddPersonalTotalsVenueDocument = gql`
    mutation addPersonalTotalsVenue($profileIdVenue: String!) {
  addPersonalTotalsVenue(profileIdVenue: $profileIdVenue)
}
    `;
export type AddPersonalTotalsVenueMutationFn = Apollo.MutationFunction<AddPersonalTotalsVenueMutation, AddPersonalTotalsVenueMutationVariables>;

/**
 * __useAddPersonalTotalsVenueMutation__
 *
 * To run a mutation, you first call `useAddPersonalTotalsVenueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPersonalTotalsVenueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPersonalTotalsVenueMutation, { data, loading, error }] = useAddPersonalTotalsVenueMutation({
 *   variables: {
 *      profileIdVenue: // value for 'profileIdVenue'
 *   },
 * });
 */
export function useAddPersonalTotalsVenueMutation(baseOptions?: Apollo.MutationHookOptions<AddPersonalTotalsVenueMutation, AddPersonalTotalsVenueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPersonalTotalsVenueMutation, AddPersonalTotalsVenueMutationVariables>(AddPersonalTotalsVenueDocument, options);
      }
export type AddPersonalTotalsVenueMutationHookResult = ReturnType<typeof useAddPersonalTotalsVenueMutation>;
export type AddPersonalTotalsVenueMutationResult = Apollo.MutationResult<AddPersonalTotalsVenueMutation>;
export type AddPersonalTotalsVenueMutationOptions = Apollo.BaseMutationOptions<AddPersonalTotalsVenueMutation, AddPersonalTotalsVenueMutationVariables>;
export const RemovePersonalTotalsVenueDocument = gql`
    mutation removePersonalTotalsVenue($profileIdVenue: String!) {
  removePersonalTotalsVenue(profileIdVenue: $profileIdVenue)
}
    `;
export type RemovePersonalTotalsVenueMutationFn = Apollo.MutationFunction<RemovePersonalTotalsVenueMutation, RemovePersonalTotalsVenueMutationVariables>;

/**
 * __useRemovePersonalTotalsVenueMutation__
 *
 * To run a mutation, you first call `useRemovePersonalTotalsVenueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePersonalTotalsVenueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePersonalTotalsVenueMutation, { data, loading, error }] = useRemovePersonalTotalsVenueMutation({
 *   variables: {
 *      profileIdVenue: // value for 'profileIdVenue'
 *   },
 * });
 */
export function useRemovePersonalTotalsVenueMutation(baseOptions?: Apollo.MutationHookOptions<RemovePersonalTotalsVenueMutation, RemovePersonalTotalsVenueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePersonalTotalsVenueMutation, RemovePersonalTotalsVenueMutationVariables>(RemovePersonalTotalsVenueDocument, options);
      }
export type RemovePersonalTotalsVenueMutationHookResult = ReturnType<typeof useRemovePersonalTotalsVenueMutation>;
export type RemovePersonalTotalsVenueMutationResult = Apollo.MutationResult<RemovePersonalTotalsVenueMutation>;
export type RemovePersonalTotalsVenueMutationOptions = Apollo.BaseMutationOptions<RemovePersonalTotalsVenueMutation, RemovePersonalTotalsVenueMutationVariables>;
export const AddPersonalJoinsVenueDocument = gql`
    mutation addPersonalJoinsVenue($profileIdVenue: String!) {
  addPersonalJoinsVenue(profileIdVenue: $profileIdVenue) {
    id
    Personal {
      id
      Profile {
        id
      }
      profileId
      createdAt
      updatedAt
      LiveOutPersonal {
        id
        Out {
          id
          type
          personalProfileId
          venueProfileId
          VenueStats {
            id
          }
          venueStatsId
          PersonalStats {
            id
          }
          personalStatsId
          LiveOutVenue {
            id
          }
          liveOutVenueId
          leftAt
          LiveOutPersonal {
            id
          }
          liveOutPersonalId
          createdAt
          updatedAt
        }
        Personal {
          id
          Profile {
            id
          }
          profileId
          createdAt
          updatedAt
        }
      }
    }
  }
}
    `;
export type AddPersonalJoinsVenueMutationFn = Apollo.MutationFunction<AddPersonalJoinsVenueMutation, AddPersonalJoinsVenueMutationVariables>;

/**
 * __useAddPersonalJoinsVenueMutation__
 *
 * To run a mutation, you first call `useAddPersonalJoinsVenueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPersonalJoinsVenueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPersonalJoinsVenueMutation, { data, loading, error }] = useAddPersonalJoinsVenueMutation({
 *   variables: {
 *      profileIdVenue: // value for 'profileIdVenue'
 *   },
 * });
 */
export function useAddPersonalJoinsVenueMutation(baseOptions?: Apollo.MutationHookOptions<AddPersonalJoinsVenueMutation, AddPersonalJoinsVenueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPersonalJoinsVenueMutation, AddPersonalJoinsVenueMutationVariables>(AddPersonalJoinsVenueDocument, options);
      }
export type AddPersonalJoinsVenueMutationHookResult = ReturnType<typeof useAddPersonalJoinsVenueMutation>;
export type AddPersonalJoinsVenueMutationResult = Apollo.MutationResult<AddPersonalJoinsVenueMutation>;
export type AddPersonalJoinsVenueMutationOptions = Apollo.BaseMutationOptions<AddPersonalJoinsVenueMutation, AddPersonalJoinsVenueMutationVariables>;
export const RemovePersonalJoinsVenueDocument = gql`
    mutation removePersonalJoinsVenue {
  removePersonalJoinsVenue {
    id
    Personal {
      id
      Profile {
        id
      }
      profileId
      createdAt
      updatedAt
      LiveOutPersonal {
        id
        Out {
          id
          type
          personalProfileId
          venueProfileId
          VenueStats {
            id
          }
          venueStatsId
          PersonalStats {
            id
          }
          personalStatsId
          LiveOutVenue {
            id
          }
          liveOutVenueId
          leftAt
          LiveOutPersonal {
            id
          }
          liveOutPersonalId
          createdAt
          updatedAt
        }
        Personal {
          id
          Profile {
            id
          }
          profileId
          createdAt
          updatedAt
        }
      }
    }
  }
}
    `;
export type RemovePersonalJoinsVenueMutationFn = Apollo.MutationFunction<RemovePersonalJoinsVenueMutation, RemovePersonalJoinsVenueMutationVariables>;

/**
 * __useRemovePersonalJoinsVenueMutation__
 *
 * To run a mutation, you first call `useRemovePersonalJoinsVenueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePersonalJoinsVenueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePersonalJoinsVenueMutation, { data, loading, error }] = useRemovePersonalJoinsVenueMutation({
 *   variables: {
 *   },
 * });
 */
export function useRemovePersonalJoinsVenueMutation(baseOptions?: Apollo.MutationHookOptions<RemovePersonalJoinsVenueMutation, RemovePersonalJoinsVenueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePersonalJoinsVenueMutation, RemovePersonalJoinsVenueMutationVariables>(RemovePersonalJoinsVenueDocument, options);
      }
export type RemovePersonalJoinsVenueMutationHookResult = ReturnType<typeof useRemovePersonalJoinsVenueMutation>;
export type RemovePersonalJoinsVenueMutationResult = Apollo.MutationResult<RemovePersonalJoinsVenueMutation>;
export type RemovePersonalJoinsVenueMutationOptions = Apollo.BaseMutationOptions<RemovePersonalJoinsVenueMutation, RemovePersonalJoinsVenueMutationVariables>;
export const CurrentVenueDocument = gql`
    query currentVenue($where: ProfileWhereInput, $currentLocationCoords: CoordsInput) {
  currentVenue(where: $where, currentLocationCoords: $currentLocationCoords) {
    ...PROFILE_VENUES_FRAGMENT
  }
}
    ${Profile_Venues_FragmentFragmentDoc}`;

/**
 * __useCurrentVenueQuery__
 *
 * To run a query within a React component, call `useCurrentVenueQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentVenueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentVenueQuery({
 *   variables: {
 *      where: // value for 'where'
 *      currentLocationCoords: // value for 'currentLocationCoords'
 *   },
 * });
 */
export function useCurrentVenueQuery(baseOptions?: Apollo.QueryHookOptions<CurrentVenueQuery, CurrentVenueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentVenueQuery, CurrentVenueQueryVariables>(CurrentVenueDocument, options);
      }
export function useCurrentVenueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentVenueQuery, CurrentVenueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentVenueQuery, CurrentVenueQueryVariables>(CurrentVenueDocument, options);
        }
export type CurrentVenueQueryHookResult = ReturnType<typeof useCurrentVenueQuery>;
export type CurrentVenueLazyQueryHookResult = ReturnType<typeof useCurrentVenueLazyQuery>;
export type CurrentVenueQueryResult = Apollo.QueryResult<CurrentVenueQuery, CurrentVenueQueryVariables>;
export const GetLiveVenueTotalsDocument = gql`
    query getLiveVenueTotals($profileIdVenue: String!) {
  getLiveVenueTotals(profileIdVenue: $profileIdVenue) {
    totaled {
      id
      personalProfileId
    }
    joined {
      id
      personalProfileId
    }
  }
}
    `;

/**
 * __useGetLiveVenueTotalsQuery__
 *
 * To run a query within a React component, call `useGetLiveVenueTotalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLiveVenueTotalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLiveVenueTotalsQuery({
 *   variables: {
 *      profileIdVenue: // value for 'profileIdVenue'
 *   },
 * });
 */
export function useGetLiveVenueTotalsQuery(baseOptions: Apollo.QueryHookOptions<GetLiveVenueTotalsQuery, GetLiveVenueTotalsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLiveVenueTotalsQuery, GetLiveVenueTotalsQueryVariables>(GetLiveVenueTotalsDocument, options);
      }
export function useGetLiveVenueTotalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLiveVenueTotalsQuery, GetLiveVenueTotalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLiveVenueTotalsQuery, GetLiveVenueTotalsQueryVariables>(GetLiveVenueTotalsDocument, options);
        }
export type GetLiveVenueTotalsQueryHookResult = ReturnType<typeof useGetLiveVenueTotalsQuery>;
export type GetLiveVenueTotalsLazyQueryHookResult = ReturnType<typeof useGetLiveVenueTotalsLazyQuery>;
export type GetLiveVenueTotalsQueryResult = Apollo.QueryResult<GetLiveVenueTotalsQuery, GetLiveVenueTotalsQueryVariables>;
export const CreatePersonalProfileDocument = gql`
    mutation createPersonalProfile($data: CreatePersonalDataInput) {
  createPersonalProfile(data: $data) {
    ... on Error {
      ...ERROR_FRAGMENT
    }
    ... on AuthorizationDeviceManager {
      ...AUTHORIZATION_DEVICE_MANAGER_FRAGMENT
    }
  }
}
    ${Error_FragmentFragmentDoc}
${Authorization_Device_Manager_FragmentFragmentDoc}`;
export type CreatePersonalProfileMutationFn = Apollo.MutationFunction<CreatePersonalProfileMutation, CreatePersonalProfileMutationVariables>;

/**
 * __useCreatePersonalProfileMutation__
 *
 * To run a mutation, you first call `useCreatePersonalProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePersonalProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPersonalProfileMutation, { data, loading, error }] = useCreatePersonalProfileMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePersonalProfileMutation(baseOptions?: Apollo.MutationHookOptions<CreatePersonalProfileMutation, CreatePersonalProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePersonalProfileMutation, CreatePersonalProfileMutationVariables>(CreatePersonalProfileDocument, options);
      }
export type CreatePersonalProfileMutationHookResult = ReturnType<typeof useCreatePersonalProfileMutation>;
export type CreatePersonalProfileMutationResult = Apollo.MutationResult<CreatePersonalProfileMutation>;
export type CreatePersonalProfileMutationOptions = Apollo.BaseMutationOptions<CreatePersonalProfileMutation, CreatePersonalProfileMutationVariables>;
export const CreateGuestProfileDocument = gql`
    mutation createGuestProfile {
  createGuestProfile {
    ... on Error {
      ...ERROR_FRAGMENT
    }
    ... on AuthorizationDeviceManager {
      ...AUTHORIZATION_DEVICE_MANAGER_FRAGMENT
    }
  }
}
    ${Error_FragmentFragmentDoc}
${Authorization_Device_Manager_FragmentFragmentDoc}`;
export type CreateGuestProfileMutationFn = Apollo.MutationFunction<CreateGuestProfileMutation, CreateGuestProfileMutationVariables>;

/**
 * __useCreateGuestProfileMutation__
 *
 * To run a mutation, you first call `useCreateGuestProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGuestProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGuestProfileMutation, { data, loading, error }] = useCreateGuestProfileMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateGuestProfileMutation(baseOptions?: Apollo.MutationHookOptions<CreateGuestProfileMutation, CreateGuestProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGuestProfileMutation, CreateGuestProfileMutationVariables>(CreateGuestProfileDocument, options);
      }
export type CreateGuestProfileMutationHookResult = ReturnType<typeof useCreateGuestProfileMutation>;
export type CreateGuestProfileMutationResult = Apollo.MutationResult<CreateGuestProfileMutation>;
export type CreateGuestProfileMutationOptions = Apollo.BaseMutationOptions<CreateGuestProfileMutation, CreateGuestProfileMutationVariables>;
export const UpdateProfileIdentifiableInformationDocument = gql`
    mutation updateProfileIdentifiableInformation($data: IdentifiableInformationUpdateInput!) {
  updateProfileIdentifiableInformation(data: $data) {
    ... on Error {
      ...ERROR_FRAGMENT
    }
    ... on AuthorizationDeviceManager {
      ...AUTHORIZATION_DEVICE_MANAGER_FRAGMENT
    }
  }
}
    ${Error_FragmentFragmentDoc}
${Authorization_Device_Manager_FragmentFragmentDoc}`;
export type UpdateProfileIdentifiableInformationMutationFn = Apollo.MutationFunction<UpdateProfileIdentifiableInformationMutation, UpdateProfileIdentifiableInformationMutationVariables>;

/**
 * __useUpdateProfileIdentifiableInformationMutation__
 *
 * To run a mutation, you first call `useUpdateProfileIdentifiableInformationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileIdentifiableInformationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileIdentifiableInformationMutation, { data, loading, error }] = useUpdateProfileIdentifiableInformationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProfileIdentifiableInformationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileIdentifiableInformationMutation, UpdateProfileIdentifiableInformationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileIdentifiableInformationMutation, UpdateProfileIdentifiableInformationMutationVariables>(UpdateProfileIdentifiableInformationDocument, options);
      }
export type UpdateProfileIdentifiableInformationMutationHookResult = ReturnType<typeof useUpdateProfileIdentifiableInformationMutation>;
export type UpdateProfileIdentifiableInformationMutationResult = Apollo.MutationResult<UpdateProfileIdentifiableInformationMutation>;
export type UpdateProfileIdentifiableInformationMutationOptions = Apollo.BaseMutationOptions<UpdateProfileIdentifiableInformationMutation, UpdateProfileIdentifiableInformationMutationVariables>;
export const UpdateOneProfileDocument = gql`
    mutation updateOneProfile($data: ProfileUpdateInput!, $where: ProfileWhereUniqueInput!) {
  updateOneProfile(data: $data, where: $where) {
    ...PROFILE_FRAGMENT
  }
}
    ${Profile_FragmentFragmentDoc}`;
export type UpdateOneProfileMutationFn = Apollo.MutationFunction<UpdateOneProfileMutation, UpdateOneProfileMutationVariables>;

/**
 * __useUpdateOneProfileMutation__
 *
 * To run a mutation, you first call `useUpdateOneProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOneProfileMutation, { data, loading, error }] = useUpdateOneProfileMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateOneProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOneProfileMutation, UpdateOneProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOneProfileMutation, UpdateOneProfileMutationVariables>(UpdateOneProfileDocument, options);
      }
export type UpdateOneProfileMutationHookResult = ReturnType<typeof useUpdateOneProfileMutation>;
export type UpdateOneProfileMutationResult = Apollo.MutationResult<UpdateOneProfileMutation>;
export type UpdateOneProfileMutationOptions = Apollo.BaseMutationOptions<UpdateOneProfileMutation, UpdateOneProfileMutationVariables>;
export const ProfileDocument = gql`
    query profile($where: ProfileWhereInput) {
  profile(where: $where) {
    ...PUBLIC_PROFILE_FRAGMENT
  }
}
    ${Public_Profile_FragmentFragmentDoc}`;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const ProfileVenueDocument = gql`
    query profileVenue($where: ProfileWhereInput) {
  profile(where: $where) {
    ...PUBLIC_PROFILE_FRAGMENT
  }
}
    ${Public_Profile_FragmentFragmentDoc}`;

/**
 * __useProfileVenueQuery__
 *
 * To run a query within a React component, call `useProfileVenueQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileVenueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileVenueQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProfileVenueQuery(baseOptions?: Apollo.QueryHookOptions<ProfileVenueQuery, ProfileVenueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileVenueQuery, ProfileVenueQueryVariables>(ProfileVenueDocument, options);
      }
export function useProfileVenueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileVenueQuery, ProfileVenueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileVenueQuery, ProfileVenueQueryVariables>(ProfileVenueDocument, options);
        }
export type ProfileVenueQueryHookResult = ReturnType<typeof useProfileVenueQuery>;
export type ProfileVenueLazyQueryHookResult = ReturnType<typeof useProfileVenueLazyQuery>;
export type ProfileVenueQueryResult = Apollo.QueryResult<ProfileVenueQuery, ProfileVenueQueryVariables>;
export const ProfilesDocument = gql`
    query profiles($where: ProfileWhereInput, $take: Int, $skip: Int, $distinct: [ProfileScalarFieldEnum!]) {
  profiles(where: $where, take: $take, skip: $skip, distinct: $distinct) {
    ...PUBLIC_PROFILE_FRAGMENT
  }
}
    ${Public_Profile_FragmentFragmentDoc}`;

/**
 * __useProfilesQuery__
 *
 * To run a query within a React component, call `useProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfilesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      distinct: // value for 'distinct'
 *   },
 * });
 */
export function useProfilesQuery(baseOptions?: Apollo.QueryHookOptions<ProfilesQuery, ProfilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfilesQuery, ProfilesQueryVariables>(ProfilesDocument, options);
      }
export function useProfilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfilesQuery, ProfilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfilesQuery, ProfilesQueryVariables>(ProfilesDocument, options);
        }
export type ProfilesQueryHookResult = ReturnType<typeof useProfilesQuery>;
export type ProfilesLazyQueryHookResult = ReturnType<typeof useProfilesLazyQuery>;
export type ProfilesQueryResult = Apollo.QueryResult<ProfilesQuery, ProfilesQueryVariables>;
export const VenueDocument = gql`
    query venue($where: VenueWhereInput) {
  venue(where: $where) {
    ...VENUE_FRAGMENT
  }
}
    ${Venue_FragmentFragmentDoc}`;

/**
 * __useVenueQuery__
 *
 * To run a query within a React component, call `useVenueQuery` and pass it any options that fit your needs.
 * When your component renders, `useVenueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVenueQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useVenueQuery(baseOptions?: Apollo.QueryHookOptions<VenueQuery, VenueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VenueQuery, VenueQueryVariables>(VenueDocument, options);
      }
export function useVenueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VenueQuery, VenueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VenueQuery, VenueQueryVariables>(VenueDocument, options);
        }
export type VenueQueryHookResult = ReturnType<typeof useVenueQuery>;
export type VenueLazyQueryHookResult = ReturnType<typeof useVenueLazyQuery>;
export type VenueQueryResult = Apollo.QueryResult<VenueQuery, VenueQueryVariables>;
export const VenuesDocument = gql`
    query venues($where: VenueWhereInput) {
  venues(where: $where) {
    ...VENUE_FRAGMENT
  }
}
    ${Venue_FragmentFragmentDoc}`;

/**
 * __useVenuesQuery__
 *
 * To run a query within a React component, call `useVenuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useVenuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVenuesQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useVenuesQuery(baseOptions?: Apollo.QueryHookOptions<VenuesQuery, VenuesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VenuesQuery, VenuesQueryVariables>(VenuesDocument, options);
      }
export function useVenuesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VenuesQuery, VenuesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VenuesQuery, VenuesQueryVariables>(VenuesDocument, options);
        }
export type VenuesQueryHookResult = ReturnType<typeof useVenuesQuery>;
export type VenuesLazyQueryHookResult = ReturnType<typeof useVenuesLazyQuery>;
export type VenuesQueryResult = Apollo.QueryResult<VenuesQuery, VenuesQueryVariables>;
export const UpdateH6ComingAreaVoteDocument = gql`
    mutation updateH6ComingAreaVote($comingAreaId: String!) {
  updateH6ComingAreaVote(comingAreaId: $comingAreaId) {
    id
    areaId
    h3Index5
    h3Index6
    keywordSuggestions
    timesRequested
    toBeNotifiedProfileIds
    Area {
      id
    }
    Vote {
      id
      upvote
      profileId
      Profile {
        id
      }
      createdAt
      updatedAt
    }
  }
}
    `;
export type UpdateH6ComingAreaVoteMutationFn = Apollo.MutationFunction<UpdateH6ComingAreaVoteMutation, UpdateH6ComingAreaVoteMutationVariables>;

/**
 * __useUpdateH6ComingAreaVoteMutation__
 *
 * To run a mutation, you first call `useUpdateH6ComingAreaVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateH6ComingAreaVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateH6ComingAreaVoteMutation, { data, loading, error }] = useUpdateH6ComingAreaVoteMutation({
 *   variables: {
 *      comingAreaId: // value for 'comingAreaId'
 *   },
 * });
 */
export function useUpdateH6ComingAreaVoteMutation(baseOptions?: Apollo.MutationHookOptions<UpdateH6ComingAreaVoteMutation, UpdateH6ComingAreaVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateH6ComingAreaVoteMutation, UpdateH6ComingAreaVoteMutationVariables>(UpdateH6ComingAreaVoteDocument, options);
      }
export type UpdateH6ComingAreaVoteMutationHookResult = ReturnType<typeof useUpdateH6ComingAreaVoteMutation>;
export type UpdateH6ComingAreaVoteMutationResult = Apollo.MutationResult<UpdateH6ComingAreaVoteMutation>;
export type UpdateH6ComingAreaVoteMutationOptions = Apollo.BaseMutationOptions<UpdateH6ComingAreaVoteMutation, UpdateH6ComingAreaVoteMutationVariables>;
export const UpdateComingAreaToBeNotifiedDocument = gql`
    mutation updateComingAreaToBeNotified($comingAreaId: String!) {
  updateH6ComingAreaToBeNotified(comingAreaId: $comingAreaId) {
    id
    areaId
    h3Index5
    h3Index6
    keywordSuggestions
    timesRequested
    toBeNotifiedProfileIds
    Area {
      id
    }
    Vote {
      id
      upvote
      profileId
      Profile {
        id
      }
      createdAt
      updatedAt
    }
  }
}
    `;
export type UpdateComingAreaToBeNotifiedMutationFn = Apollo.MutationFunction<UpdateComingAreaToBeNotifiedMutation, UpdateComingAreaToBeNotifiedMutationVariables>;

/**
 * __useUpdateComingAreaToBeNotifiedMutation__
 *
 * To run a mutation, you first call `useUpdateComingAreaToBeNotifiedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateComingAreaToBeNotifiedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateComingAreaToBeNotifiedMutation, { data, loading, error }] = useUpdateComingAreaToBeNotifiedMutation({
 *   variables: {
 *      comingAreaId: // value for 'comingAreaId'
 *   },
 * });
 */
export function useUpdateComingAreaToBeNotifiedMutation(baseOptions?: Apollo.MutationHookOptions<UpdateComingAreaToBeNotifiedMutation, UpdateComingAreaToBeNotifiedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateComingAreaToBeNotifiedMutation, UpdateComingAreaToBeNotifiedMutationVariables>(UpdateComingAreaToBeNotifiedDocument, options);
      }
export type UpdateComingAreaToBeNotifiedMutationHookResult = ReturnType<typeof useUpdateComingAreaToBeNotifiedMutation>;
export type UpdateComingAreaToBeNotifiedMutationResult = Apollo.MutationResult<UpdateComingAreaToBeNotifiedMutation>;
export type UpdateComingAreaToBeNotifiedMutationOptions = Apollo.BaseMutationOptions<UpdateComingAreaToBeNotifiedMutation, UpdateComingAreaToBeNotifiedMutationVariables>;
export const UpdateH6VenueRemmendationDocument = gql`
    mutation updateH6VenueRemmendation($venueRecommendationId: String!) {
  updateH6VenueRemmendation(venueRecommendationId: $venueRecommendationId) {
    id
  }
}
    `;
export type UpdateH6VenueRemmendationMutationFn = Apollo.MutationFunction<UpdateH6VenueRemmendationMutation, UpdateH6VenueRemmendationMutationVariables>;

/**
 * __useUpdateH6VenueRemmendationMutation__
 *
 * To run a mutation, you first call `useUpdateH6VenueRemmendationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateH6VenueRemmendationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateH6VenueRemmendationMutation, { data, loading, error }] = useUpdateH6VenueRemmendationMutation({
 *   variables: {
 *      venueRecommendationId: // value for 'venueRecommendationId'
 *   },
 * });
 */
export function useUpdateH6VenueRemmendationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateH6VenueRemmendationMutation, UpdateH6VenueRemmendationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateH6VenueRemmendationMutation, UpdateH6VenueRemmendationMutationVariables>(UpdateH6VenueRemmendationDocument, options);
      }
export type UpdateH6VenueRemmendationMutationHookResult = ReturnType<typeof useUpdateH6VenueRemmendationMutation>;
export type UpdateH6VenueRemmendationMutationResult = Apollo.MutationResult<UpdateH6VenueRemmendationMutation>;
export type UpdateH6VenueRemmendationMutationOptions = Apollo.BaseMutationOptions<UpdateH6VenueRemmendationMutation, UpdateH6VenueRemmendationMutationVariables>;
export const VenuesNearbyDocument = gql`
    query venuesNearby($countryIsoCode: String!, $stateIsoCode: String!, $kRing: Int, $currentLocationCoords: CoordsInput, $searchAreaCoords: CoordsInput!) {
  venuesNearby(currentLocationCoords: $currentLocationCoords, searchAreaCoords: $searchAreaCoords, countryIsoCode: $countryIsoCode, stateIsoCode: $stateIsoCode, kRing: $kRing) {
    ... on ComingAreaResponse {
      comingAreas {
        id
        h3Index5
        h3Index6
        keywordSuggestions
        timesRequested
        toBeNotifiedProfileIds
        Area {
          ...AREA_FRAGMENT
        }
        Vote {
          id
          profileId
          upvote
        }
        createdAt
        updatedAt
      }
      searchArea {
        ...AREA_FRAGMENT
      }
    }
    ... on Error {
      errorCode
      message
    }
    ... on VenuesNearbyResponse {
      searchArea {
        ...AREA_FRAGMENT
      }
      venuesNearby {
        ...PROFILE_VENUES_FRAGMENT
      }
    }
  }
}
    ${Area_FragmentFragmentDoc}
${Profile_Venues_FragmentFragmentDoc}`;

/**
 * __useVenuesNearbyQuery__
 *
 * To run a query within a React component, call `useVenuesNearbyQuery` and pass it any options that fit your needs.
 * When your component renders, `useVenuesNearbyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVenuesNearbyQuery({
 *   variables: {
 *      countryIsoCode: // value for 'countryIsoCode'
 *      stateIsoCode: // value for 'stateIsoCode'
 *      kRing: // value for 'kRing'
 *      currentLocationCoords: // value for 'currentLocationCoords'
 *      searchAreaCoords: // value for 'searchAreaCoords'
 *   },
 * });
 */
export function useVenuesNearbyQuery(baseOptions: Apollo.QueryHookOptions<VenuesNearbyQuery, VenuesNearbyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VenuesNearbyQuery, VenuesNearbyQueryVariables>(VenuesNearbyDocument, options);
      }
export function useVenuesNearbyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VenuesNearbyQuery, VenuesNearbyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VenuesNearbyQuery, VenuesNearbyQueryVariables>(VenuesNearbyDocument, options);
        }
export type VenuesNearbyQueryHookResult = ReturnType<typeof useVenuesNearbyQuery>;
export type VenuesNearbyLazyQueryHookResult = ReturnType<typeof useVenuesNearbyLazyQuery>;
export type VenuesNearbyQueryResult = Apollo.QueryResult<VenuesNearbyQuery, VenuesNearbyQueryVariables>;
export const GetAllCountriesDocument = gql`
    query getAllCountries {
  getAllCountries {
    name
    phonecode
    isoCode
    flag
    currency
    latitude
    longitude
  }
}
    `;

/**
 * __useGetAllCountriesQuery__
 *
 * To run a query within a React component, call `useGetAllCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCountriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCountriesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCountriesQuery, GetAllCountriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCountriesQuery, GetAllCountriesQueryVariables>(GetAllCountriesDocument, options);
      }
export function useGetAllCountriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCountriesQuery, GetAllCountriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCountriesQuery, GetAllCountriesQueryVariables>(GetAllCountriesDocument, options);
        }
export type GetAllCountriesQueryHookResult = ReturnType<typeof useGetAllCountriesQuery>;
export type GetAllCountriesLazyQueryHookResult = ReturnType<typeof useGetAllCountriesLazyQuery>;
export type GetAllCountriesQueryResult = Apollo.QueryResult<GetAllCountriesQuery, GetAllCountriesQueryVariables>;
export const GetAllStatesByCountryDocument = gql`
    query getAllStatesByCountry($countryIsoCode: String!) {
  getAllStatesByCountry(countryIsoCode: $countryIsoCode) {
    name
    isoCode
    countryCode
    latitude
    longitude
  }
}
    `;

/**
 * __useGetAllStatesByCountryQuery__
 *
 * To run a query within a React component, call `useGetAllStatesByCountryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllStatesByCountryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllStatesByCountryQuery({
 *   variables: {
 *      countryIsoCode: // value for 'countryIsoCode'
 *   },
 * });
 */
export function useGetAllStatesByCountryQuery(baseOptions: Apollo.QueryHookOptions<GetAllStatesByCountryQuery, GetAllStatesByCountryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllStatesByCountryQuery, GetAllStatesByCountryQueryVariables>(GetAllStatesByCountryDocument, options);
      }
export function useGetAllStatesByCountryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllStatesByCountryQuery, GetAllStatesByCountryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllStatesByCountryQuery, GetAllStatesByCountryQueryVariables>(GetAllStatesByCountryDocument, options);
        }
export type GetAllStatesByCountryQueryHookResult = ReturnType<typeof useGetAllStatesByCountryQuery>;
export type GetAllStatesByCountryLazyQueryHookResult = ReturnType<typeof useGetAllStatesByCountryLazyQuery>;
export type GetAllStatesByCountryQueryResult = Apollo.QueryResult<GetAllStatesByCountryQuery, GetAllStatesByCountryQueryVariables>;
export const GetAllCitiesByStateDocument = gql`
    query getAllCitiesByState($countryIsoCode: String!, $stateIsoCode: String!) {
  getAllCitiesByState(countryIsoCode: $countryIsoCode, stateIsoCode: $stateIsoCode) {
    popularCities {
      name
      stateCode
      venuesInArea
      countryCode
      latitude
      longitude
    }
    allCities {
      name
      stateCode
      venuesInArea
      countryCode
      latitude
      longitude
    }
  }
}
    `;

/**
 * __useGetAllCitiesByStateQuery__
 *
 * To run a query within a React component, call `useGetAllCitiesByStateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCitiesByStateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCitiesByStateQuery({
 *   variables: {
 *      countryIsoCode: // value for 'countryIsoCode'
 *      stateIsoCode: // value for 'stateIsoCode'
 *   },
 * });
 */
export function useGetAllCitiesByStateQuery(baseOptions: Apollo.QueryHookOptions<GetAllCitiesByStateQuery, GetAllCitiesByStateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCitiesByStateQuery, GetAllCitiesByStateQueryVariables>(GetAllCitiesByStateDocument, options);
      }
export function useGetAllCitiesByStateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCitiesByStateQuery, GetAllCitiesByStateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCitiesByStateQuery, GetAllCitiesByStateQueryVariables>(GetAllCitiesByStateDocument, options);
        }
export type GetAllCitiesByStateQueryHookResult = ReturnType<typeof useGetAllCitiesByStateQuery>;
export type GetAllCitiesByStateLazyQueryHookResult = ReturnType<typeof useGetAllCitiesByStateLazyQuery>;
export type GetAllCitiesByStateQueryResult = Apollo.QueryResult<GetAllCitiesByStateQuery, GetAllCitiesByStateQueryVariables>;
export const AddStoryPhotosDocument = gql`
    mutation addStoryPhotos($photos: PhotoCreateManyProfileInputEnvelope) {
  addStoryPhotos(photos: $photos) {
    ...STORY_FRAGMENT
  }
}
    ${Story_FragmentFragmentDoc}`;
export type AddStoryPhotosMutationFn = Apollo.MutationFunction<AddStoryPhotosMutation, AddStoryPhotosMutationVariables>;

/**
 * __useAddStoryPhotosMutation__
 *
 * To run a mutation, you first call `useAddStoryPhotosMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddStoryPhotosMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addStoryPhotosMutation, { data, loading, error }] = useAddStoryPhotosMutation({
 *   variables: {
 *      photos: // value for 'photos'
 *   },
 * });
 */
export function useAddStoryPhotosMutation(baseOptions?: Apollo.MutationHookOptions<AddStoryPhotosMutation, AddStoryPhotosMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddStoryPhotosMutation, AddStoryPhotosMutationVariables>(AddStoryPhotosDocument, options);
      }
export type AddStoryPhotosMutationHookResult = ReturnType<typeof useAddStoryPhotosMutation>;
export type AddStoryPhotosMutationResult = Apollo.MutationResult<AddStoryPhotosMutation>;
export type AddStoryPhotosMutationOptions = Apollo.BaseMutationOptions<AddStoryPhotosMutation, AddStoryPhotosMutationVariables>;
export const RemoveStoryPhotosDocument = gql`
    mutation removeStoryPhotos($photoId: String!) {
  removeStoryPhotos(photoId: $photoId) {
    ...STORY_FRAGMENT
  }
}
    ${Story_FragmentFragmentDoc}`;
export type RemoveStoryPhotosMutationFn = Apollo.MutationFunction<RemoveStoryPhotosMutation, RemoveStoryPhotosMutationVariables>;

/**
 * __useRemoveStoryPhotosMutation__
 *
 * To run a mutation, you first call `useRemoveStoryPhotosMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveStoryPhotosMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeStoryPhotosMutation, { data, loading, error }] = useRemoveStoryPhotosMutation({
 *   variables: {
 *      photoId: // value for 'photoId'
 *   },
 * });
 */
export function useRemoveStoryPhotosMutation(baseOptions?: Apollo.MutationHookOptions<RemoveStoryPhotosMutation, RemoveStoryPhotosMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveStoryPhotosMutation, RemoveStoryPhotosMutationVariables>(RemoveStoryPhotosDocument, options);
      }
export type RemoveStoryPhotosMutationHookResult = ReturnType<typeof useRemoveStoryPhotosMutation>;
export type RemoveStoryPhotosMutationResult = Apollo.MutationResult<RemoveStoryPhotosMutation>;
export type RemoveStoryPhotosMutationOptions = Apollo.BaseMutationOptions<RemoveStoryPhotosMutation, RemoveStoryPhotosMutationVariables>;
export const UpdateStoryEmojimoodDocument = gql`
    mutation updateStoryEmojimood($emojimoodId: Int!) {
  updateStoryEmojimood(emojimoodId: $emojimoodId) {
    ...STORY_FRAGMENT
  }
}
    ${Story_FragmentFragmentDoc}`;
export type UpdateStoryEmojimoodMutationFn = Apollo.MutationFunction<UpdateStoryEmojimoodMutation, UpdateStoryEmojimoodMutationVariables>;

/**
 * __useUpdateStoryEmojimoodMutation__
 *
 * To run a mutation, you first call `useUpdateStoryEmojimoodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStoryEmojimoodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStoryEmojimoodMutation, { data, loading, error }] = useUpdateStoryEmojimoodMutation({
 *   variables: {
 *      emojimoodId: // value for 'emojimoodId'
 *   },
 * });
 */
export function useUpdateStoryEmojimoodMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStoryEmojimoodMutation, UpdateStoryEmojimoodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStoryEmojimoodMutation, UpdateStoryEmojimoodMutationVariables>(UpdateStoryEmojimoodDocument, options);
      }
export type UpdateStoryEmojimoodMutationHookResult = ReturnType<typeof useUpdateStoryEmojimoodMutation>;
export type UpdateStoryEmojimoodMutationResult = Apollo.MutationResult<UpdateStoryEmojimoodMutation>;
export type UpdateStoryEmojimoodMutationOptions = Apollo.BaseMutationOptions<UpdateStoryEmojimoodMutation, UpdateStoryEmojimoodMutationVariables>;
export const UpdateThemeManagerSwitchThemeDocument = gql`
    mutation updateThemeManagerSwitchTheme($id: String!, $themeId: String!) {
  updateThemeManagerSwitchTheme(id: $id, themeId: $themeId) {
    ...PROFILE_THEME_FRAGMENT
  }
}
    ${Profile_Theme_FragmentFragmentDoc}`;
export type UpdateThemeManagerSwitchThemeMutationFn = Apollo.MutationFunction<UpdateThemeManagerSwitchThemeMutation, UpdateThemeManagerSwitchThemeMutationVariables>;

/**
 * __useUpdateThemeManagerSwitchThemeMutation__
 *
 * To run a mutation, you first call `useUpdateThemeManagerSwitchThemeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateThemeManagerSwitchThemeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateThemeManagerSwitchThemeMutation, { data, loading, error }] = useUpdateThemeManagerSwitchThemeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      themeId: // value for 'themeId'
 *   },
 * });
 */
export function useUpdateThemeManagerSwitchThemeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateThemeManagerSwitchThemeMutation, UpdateThemeManagerSwitchThemeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateThemeManagerSwitchThemeMutation, UpdateThemeManagerSwitchThemeMutationVariables>(UpdateThemeManagerSwitchThemeDocument, options);
      }
export type UpdateThemeManagerSwitchThemeMutationHookResult = ReturnType<typeof useUpdateThemeManagerSwitchThemeMutation>;
export type UpdateThemeManagerSwitchThemeMutationResult = Apollo.MutationResult<UpdateThemeManagerSwitchThemeMutation>;
export type UpdateThemeManagerSwitchThemeMutationOptions = Apollo.BaseMutationOptions<UpdateThemeManagerSwitchThemeMutation, UpdateThemeManagerSwitchThemeMutationVariables>;
export const GetAllThemesDocument = gql`
    query getAllThemes {
  getAllThemes {
    ...THEME_FRAGMENT
  }
}
    ${Theme_FragmentFragmentDoc}`;

/**
 * __useGetAllThemesQuery__
 *
 * To run a query within a React component, call `useGetAllThemesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllThemesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllThemesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllThemesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllThemesQuery, GetAllThemesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllThemesQuery, GetAllThemesQueryVariables>(GetAllThemesDocument, options);
      }
export function useGetAllThemesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllThemesQuery, GetAllThemesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllThemesQuery, GetAllThemesQueryVariables>(GetAllThemesDocument, options);
        }
export type GetAllThemesQueryHookResult = ReturnType<typeof useGetAllThemesQuery>;
export type GetAllThemesLazyQueryHookResult = ReturnType<typeof useGetAllThemesLazyQuery>;
export type GetAllThemesQueryResult = Apollo.QueryResult<GetAllThemesQuery, GetAllThemesQueryVariables>;
export const GetProfileThemeManagerDocument = gql`
    query getProfileThemeManager {
  getProfileThemeManager {
    ...THEME_MANAGER_FRAGMENT
  }
}
    ${Theme_Manager_FragmentFragmentDoc}`;

/**
 * __useGetProfileThemeManagerQuery__
 *
 * To run a query within a React component, call `useGetProfileThemeManagerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileThemeManagerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileThemeManagerQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfileThemeManagerQuery(baseOptions?: Apollo.QueryHookOptions<GetProfileThemeManagerQuery, GetProfileThemeManagerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileThemeManagerQuery, GetProfileThemeManagerQueryVariables>(GetProfileThemeManagerDocument, options);
      }
export function useGetProfileThemeManagerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileThemeManagerQuery, GetProfileThemeManagerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileThemeManagerQuery, GetProfileThemeManagerQueryVariables>(GetProfileThemeManagerDocument, options);
        }
export type GetProfileThemeManagerQueryHookResult = ReturnType<typeof useGetProfileThemeManagerQuery>;
export type GetProfileThemeManagerLazyQueryHookResult = ReturnType<typeof useGetProfileThemeManagerLazyQuery>;
export type GetProfileThemeManagerQueryResult = Apollo.QueryResult<GetProfileThemeManagerQuery, GetProfileThemeManagerQueryVariables>;