import * as types from './types'

export const citiesReducer = (state = { cities: [] }, action) => {
    switch (action.type) {
        case types.atAddCity:
            return { ...state, cities: state.cities.filter(element => element !== action.name).concat(action.name)};
        case types.atDelCity:
            return { ...state, cities: state.cities.filter(element => element !== action.name)};
        default:
            return state;
    }
}
