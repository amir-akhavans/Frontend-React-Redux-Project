import Table from '../components/Table'
import Details from './Details'
import { Route, Routes } from 'react-router-dom'
import CartPage from './CartPage'

export const Home = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/Details" element={<Details />} />
        <Route path="/CartPage" element={<CartPage />} />
      </Routes>
    </>
  )
}
