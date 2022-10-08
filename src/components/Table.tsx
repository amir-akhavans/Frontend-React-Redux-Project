import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries } from '../store/countries'
import { Link } from 'react-router-dom'
import { Country } from '../types'
import type { RootState, AppDispatch } from '../store/configureStore'
import {
  sortCountryName,
  sortCountryPopulaion,
  sortCountryRegion,
  addedToCart,
  // checkedInCart,
} from '../store/countries'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import Button from '@mui/material/Button'
import TableRow from '@mui/material/TableRow'
import ImportExportIcon from '@mui/icons-material/ImportExport'
import { columns } from '../types'
import Header from './Header'

const TableDisplay = () => {
  const dispatch = useDispatch<AppDispatch>()
  let state = useSelector((state: RootState) => state)

  console.warn('State:', state)

  let allCountries: Country[] = state.list
  useEffect(() => {
    dispatch(getCountries())
  }, [dispatch])

  const handleSorting = (param: string) => {
    if (param === 'name') dispatch(sortCountryName(allCountries))
    else if (param === 'population')
      dispatch(sortCountryPopulaion(allCountries))
    else if (param === 'region') dispatch(sortCountryRegion(allCountries))
  }

  return (
    <>
      <Header search={true} country={null} cart={false} />
      <Paper
        sx={{
          display: 'flex',
          width: '100%',
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '10px',
        }}
      >
        <TableContainer sx={{ maxHeight: '100%', width: '90%' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={'center'}
                    style={{
                      minWidth: column.minWidth,
                    }}
                    onClick={() => handleSorting(column.id)}
                    sx={{
                      ...(column.id === 'name' ||
                      column.id === 'population' ||
                      column.id === 'region'
                        ? {
                            '&.MuiTableCell-root:hover': {
                              cursor: 'pointer',
                            },
                          }
                        : null),
                    }}
                  >
                    {column.id === 'name' ||
                    column.id === 'population' ||
                    column.id === 'region' ? (
                      <ImportExportIcon
                        sx={{
                          fontSize: '1rem',
                        }}
                        style={{
                          verticalAlign: 'middle',
                        }}
                      />
                    ) : null}
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {allCountries.map((country) => (
                <TableRow key={country.name.common}>
                  <TableCell align={'center'}>
                    <img
                      src={country.flags.png}
                      alt={country.name.common}
                      style={{ height: '50px' }}
                    />
                  </TableCell>
                  <TableCell align={'left'}>
                    <Link
                      to="/Details"
                      state={{ from: country }}
                      style={{ textDecoration: 'none', color: 'purple' }}
                    >
                      {country.name.common}
                    </Link>
                  </TableCell>
                  <TableCell align={'left'}>
                    <ul style={{ listStyleType: 'none' }}>
                      {country.languages
                        ? Object.values(country.languages).map((x) => (
                            <li key={x}> {x} </li>
                          ))
                        : 'none'}
                    </ul>
                  </TableCell>
                  <TableCell align={'left'}>{country.population}</TableCell>
                  <TableCell align={'left'}>{country.region}</TableCell>
                  <TableCell align={'center'}>
                    {/* <button onClick={() => dispatch(addedToCart(country))}>
                    ADD
                  </button> */}
                    <Button
                      variant="contained"
                      onClick={() => dispatch(addedToCart(country))}
                    >
                      Add
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  )
}

export default TableDisplay
