const initialState = {
  heroes: [],
  filteredHeroes: [],
  heroesLoadingStatus: 'idle',
}

const heroes = (state = initialState, action) => {
  switch (action.type) {
      case 'HEROES_FETCHING':
          return {
              ...state,
              heroesLoadingStatus: 'loading'
          }
      case 'HEROES_FETCHED':
          return {
              ...state,
              heroes: action.payload,
              heroesLoadingStatus: 'idle'
          }
      case 'HEROES_FETCHING_ERROR':
          return {
              ...state,
              heroesLoadingStatus: 'error'
          }
      case 'VISIBLE_DATA':
        return {
            ...state,
            filteredHeroes: action.payload
        }
      case 'HERO_DELETED': 
          return {
              ...state,
              heroes: state.heroes.filter(item => item.id !== action.payload),
          }
      case 'HERO_ADDED':
          return {
              ...state,
              heroes: [...state.heroes, action.payload]
          }
      default: return state
  }
}

export default heroes;