import { useDispatch, useSelector } from 'react-redux'
import { removedFromCart } from '../store/countries'
import type { RootState, AppDispatch } from '../store/configureStore'
import Header from '../components/Header'
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material'

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const cartElements = useSelector((state: RootState) => state.cart)
  return (
    <>
      <Header search={false} country={null} cart={true} />
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
        <TableContainer
          sx={{ maxHeight: '100%', width: '60%', minWidth: '350px' }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align={'center'}>Favorite Countries</TableCell>
                <TableCell align={'center'}>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartElements.map((country) => (
                <TableRow key={country.name.common}>
                  <TableCell align={'center'}>{country.name.common}</TableCell>
                  <TableCell align={'center'}>
                    <Button
                      variant="contained"
                      onClick={() => dispatch(removedFromCart(country))}
                    >
                      Remove
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

export default CartPage
