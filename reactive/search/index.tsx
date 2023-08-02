import { makeVar } from '@apollo/client'

type SearchType = {
	searchtext: string
}

export const searchInitialState: SearchType = {
	searchtext: '',
}

export const SearchReactiveVar = makeVar<SearchType | null>(searchInitialState)

type SearchAreaType = {
	searchtext: string
	country: string
	state: string
	city: string
}
