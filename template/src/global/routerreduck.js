import { routerReducer } from 'react-router-redux'

const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'

const initialState = {
  pre: '',
  location: null
}

export const router = function (state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        pre: state.location && state.location.payload.pathname,
        location: routerReducer(action)
      }
    default:
      return { ...state }
  }
}
