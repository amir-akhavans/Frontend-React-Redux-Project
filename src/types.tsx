export type Country = {
  name: {
    common: string
    official: string
  }
  flags: {
    png: string
  }
  languages: {
    [key: string]: string
  }
  population: number
  region: string
  currencies: {
    string: {
      name: string
      symbol: string
    }
  }
  capital: string
  maps: {
    googleMaps: string
  }
  coatOfArms: {
    png: string
  }
}

export type Order = 'asc' | 'desc'

export type SearchHandler = {
  handleCountryNameFilter: (name: string) => void
}

export type ThemeContextType = {
  toggleTheme: () => void
  theme: string
}

type Column = {
  id: 'flag' | 'name' | 'languages' | 'population' | 'region' | 'add'
  label: string
  minWidth?: number
  align?: string
}

export const columns: readonly Column[] = [
  { id: 'flag', label: 'Flag', minWidth: 100 },
  { id: 'name', label: 'Name', minWidth: 170 },
  {
    id: 'languages',
    label: 'Languages',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'region',
    label: 'Region',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'add',
    label: 'Add to Favorites',
    minWidth: 170,
    align: 'left',
  },
]
