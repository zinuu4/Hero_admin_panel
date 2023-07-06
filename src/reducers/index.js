const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filteredHeroes: []
}

const reducer = (state = initialState, action) => {
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
                filteredHeroes: action.filteredHeroes
            }
        case 'HERO_DELETED': 
            const newHeroList = state.heroes.filter(item => item.id !== action.payload);
            return {
                ...state,
                heroes: newHeroList,
            }
        case 'HERO_ADDED':
            let newHeroListWithCreatedHero = [...state.heroes, action.payload];
            return {
                ...state,
                heroes: newHeroListWithCreatedHero
            }
        default: return state
    }
}

export default reducer;