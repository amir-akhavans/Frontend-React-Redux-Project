import { useLocation } from 'react-router-dom'
import { Country } from '../types'
import Header from '../components/Header'
import { Card, CardContent, Typography, Grid, Link } from '@mui/material'

type LocationState = {
  from: Country
}

const Details = () => {
  const location = useLocation()
  const { from } = location.state as LocationState
  return (
    <>
      <Header search={false} country={from} cart={false} />
      <Grid
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card
          sx={{
            minWidth: '350px',
            width: '50%',
            marginTop: '7%',
          }}
        >
          <CardContent sx={{ paddingTop: '4px' }}>
            <Grid
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <img
                src={from.flags.png}
                alt={from.name.common}
                style={{ height: '70px', alignContent: 'center' }}
              />
              <figure style={{ textAlign: 'center', paddingTop: '16px' }}>
                <img
                  src={from.coatOfArms.png}
                  alt={from.name.common}
                  style={{ height: '60px', alignContent: 'center' }}
                />
                <figcaption style={{ fontSize: '12px' }}>
                  Coat of Arms
                </figcaption>
              </figure>
            </Grid>
            <Typography variant="h5" component="div">
              {from.name.official}
            </Typography>
            <Typography variant="h6" component="div" color="text.secondary">
              Capital City: {from.capital}
            </Typography>
            {Object.values(from.currencies).map((x) => (
              <Typography sx={{ mb: 1.5 }} key={from.name.common}>
                Currency: {x.name} ({x.symbol})
              </Typography>
            ))}
            <Typography variant="body2">
              <Link href={from.maps.googleMaps}>Google Maps</Link>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

export default Details
