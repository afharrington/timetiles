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
      // action.payload.data is the entire tile
      // Turns array of entires into an object with _id values as keys
      let entries = _.mapKeys(action.payload.data.entries, '_id');
      // Add entries to the tile object
      let tile = {...action.payload.data, entries};
      // Return the entire tiles state with the new tile
      return {...state, [action.payload.data._id]: tile };
    case DELETE_ENTRY:
      return _.omit(state, action.payload);

    default:
      return state;
  }
}
