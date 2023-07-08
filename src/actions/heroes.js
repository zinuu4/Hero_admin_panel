export const fetchHeroes = (request) => (dispatch) => {
  dispatch(heroesFetching());
  request("http://localhost:3001/heroes")
      .then(data => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()))
}

export const heroesFetching = () => {
  return {
      type: 'HEROES_FETCHING'
  }
}

export const heroesFetched = (heroes) => {
  return {
      type: 'HEROES_FETCHED',
      payload: heroes
  }
}

export const heroesFetchingError = () => {
  return {
      type: 'HEROES_FETCHING_ERROR'
  }
}

export const visibleData = (heroes) => {
  return {
      type: 'VISIBLE_DATA',
      payload: heroes
  }
}

export const heroDeleted = (id) => {
  return {
      type: 'HERO_DELETED',
      payload: id
  }
}

export const addHero = (hero) => {
  return {
      type: 'HERO_ADDED',
      payload: hero
  }
}