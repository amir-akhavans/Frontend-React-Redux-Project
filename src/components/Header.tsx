import React from 'react'
import ThemeChange from './ThemeChange'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/configureStore'
import { handleSearch } from '../store/countries'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'

import Badge from '@mui/material/Badge'
import SearchIcon from '@mui/icons-material/Search'
import FavoriteIcon from '@mui/icons-material/Favorite'
import PublicSharpIcon from '@mui/icons-material/PublicSharp'
import { Link } from 'react-router-dom'
import { Search, SearchIconWrapper, StyledInputBase } from '../styles'
import { Country } from '../types'
import { Typography } from '@mui/material'

export type SearchHeader = {
  search: boolean
  country: null | Country
  cart: boolean
}

const Header = ({ search, country, cart }: SearchHeader) => {
  let state = useSelector((state: RootState) => state)
  let cartBadge: number = state.numberInCart
  const dispatch = useDispatch<AppDispatch>()
  const handleChange = (e: any) => {
    dispatch(handleSearch(e.target.value))
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            aria-label="show list of all the countries"
            color="inherit"
          >
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              <PublicSharpIcon fontSize="large" />
            </Link>
          </IconButton>
          {search ? (
            <Search sx={{ maxWidth: 'xs' }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleChange}
              />
            </Search>
          ) : country ? (
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, marginLeft: '4%' }}
            >
              Welcome to {country?.name.common}
            </Typography>
          ) : cart ? (
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, marginLeft: '4%' }}
            >
              Favourites
            </Typography>
          ) : (
            'none'
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
            <Badge color="error">
              <ThemeChange />
            </Badge>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show list of favourite countries"
              color="inherit"
            >
              <Badge badgeContent={cartBadge} color="error">
                <Link
                  to="/CartPage"
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  <FavoriteIcon />
                </Link>
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
