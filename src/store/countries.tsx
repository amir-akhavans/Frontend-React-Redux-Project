import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Country } from '../types'

export interface countriesState {
  list: Country[]
  refList: Country[]
  cart: Country[]
  numberInCart: number
  status: string
  sortName: boolean
  sortPopulation: boolean
  sortRegion: boolean
}

const initialState: countriesState = {
  list: [],
  refList: [],
  cart: [],
  numberInCart: 0,
  status: '',
  sortName: false,
  sortPopulation: false,
  sortRegion: false,
}

export const getCountries = createAsyncThunk(
  'countries/getCountries',
  async () => {
    return axios
      .get(
        'https://restcountries.com/v3.1/all?fields=name,languages,capital,flags,population,region,currencies,capital,maps,coatOfArms'
      )
      .then((response) => response.data)
  }
)

const slice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    handleSearch: (state, action) => {
      const searchItem = action.payload.toLowerCase()
      const filterCountries = state.refList.filter((country) => {
        const name = country.name.common.toLowerCase()
        if (name.startsWith(searchItem)) {
          return country
        }
        return false
      })
      state.list = filterCountries
    },
    sortCountryName: (state, action) => {
      const list = action.payload
      if (!state.sortName) {
        const sortedCountries = [...list].sort((a, b) =>
          a.name.common > b.name.common ? 1 : -1
        )
        state.sortName = true
        state.list = sortedCountries
      } else {
        const sortedCountries = [...list].sort((a, b) =>
          a.name.common > b.name.common ? -1 : 1
        )
        state.sortName = false
        state.list = sortedCountries
      }
    },

    sortCountryPopulaion: (state, action) => {
      const list = action.payload
      if (!state.sortPopulation) {
        const sortedCountries = [...list].sort((a, b) =>
          a.population > b.population ? 1 : -1
        )
        state.sortPopulation = true
        state.list = sortedCountries
      } else {
        const sortedCountries = [...list].sort((a, b) =>
          a.population > b.population ? -1 : 1
        )
        state.sortPopulation = false
        state.list = sortedCountries
      }
    },

    sortCountryRegion: (state, action) => {
      if (!state.sortRegion) {
        const list = action.payload
        const sortedCountries = [...list].sort((a, b) =>
          a.region > b.region ? 1 : -1
        )
        state.sortRegion = true
        state.list = sortedCountries
      } else {
        const list = action.payload
        const sortedCountries = [...list].sort((a, b) =>
          a.region > b.region ? -1 : 1
        )
        state.sortRegion = false
        state.list = sortedCountries
      }
    },
    addedToCart: (state, { payload }) => {
      const index = state.cart.findIndex(
        (x) => x.name.common === payload.name.common
      )
      if (index === -1) {
        state.cart.push(payload)
        state.numberInCart++
      } else console.log('already added')
    },
    removedFromCart: (state, { payload }) => {
      const index = state.cart.findIndex(
        (x) => x.name.common === payload.name.common
      )
      state.cart.splice(index, 1)
      state.numberInCart--
    },
    // checkedInCart: (state, { payload }) => {
    //   state.cart.some((country) => payload === country)
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getCountries.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.list = action.payload
      state.refList = action.payload
      state.status = 'success'
      // console.log(Object.values(state.list[0].currencies))
    })
    builder.addCase(getCountries.rejected, (state) => {
      console.log('Something went wrong')
      state.status = 'failed'
    })
  },
})

export const {
  sortCountryName,
  sortCountryPopulaion,
  sortCountryRegion,
  handleSearch,
  addedToCart,
  removedFromCart,
  // checkedInCart,
} = slice.actions

export default slice.reducer
