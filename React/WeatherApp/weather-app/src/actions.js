import * as types from './types'

export const addCity = (name) => ({
    type: types.atAddCity,
    name: name,
    key: name
});

export const delCity = (name) => ({
    type: types.atDelCity,
    name: name,
    key: name
});

