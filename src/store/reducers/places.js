import { ADD_PLACE, SELECT_PLACE, DELETE_PLACE, DESELECT_PLACE} from '../actions/actionTypes'
const initialState = {
    places: [],
    selectedPlace: null
  }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      console.log("add item:" + action.placeName)
      return {
        ...state,
        places: state.places.concat(
          { 
            key: String(Math.random()),
            name: action.placeName.trim(),
            image: {
             uri: 'https://facebook.github.io/react-native/img/favicon.png'
            }
          })
        }
    case DELETE_PLACE:
        return {
          ...state,
          places: state.places.filter((place) => { 
              return place.key !==  state.selectedPlace.key
          }),
          selectedPlace: null
        }
    default:
        return state;
  }
}

export default reducer