import _ from "lodash";
import { FETCH_TILES, DELETE_TILE, FETCH_ENTRIES, DELETE_ENTRY } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {

    // Turns the array of tiles returned into an object with _id values as keys
    case FETCH_TILES:
      return _.mapKeys(action.payload.data, '_id');
    case DELETE_TILE:
      return _.omit(state, action.payload);
    case FETCH_ENTRIES:
      // action.payload is the particular tile object, including its entries property
      // this takes the entire tiles state and concatenates it with this tile object, making
      // its id the key
      return {...state, [action.payload.data._id]: action.payload.data};
    case DELETE_ENTRY:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
