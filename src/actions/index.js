import axios from "axios";

export const FETCH_TILES = "fetch_tiles";
export const CREATE_TILE = "create_tiles";
export const UPDATE_TILE = "update_tile";
export const DELETE_TILE = "delete_tile";
export const UPDATE_COLOR = "update_color";

export const FETCH_ENTRIES = "fetch_entries";
export const CREATE_ENTRY = "create_entry";
export const DELETE_ENTRY = "delete_entry";
export const UPDATE_ENTRY = "update_entry";

export const AUTHORIZE_USER = "authorize_user";
export const UNAUTHORIZE_USER = "unauthorize_user";
export const AUTH_ERROR = "auth_error";

const ROOT_URL = "https://timetilesapi.herokuapp.com";
// const ROOT_URL = "http://localhost:3000";

export function authorizeUser({email, password}, callback) {
  return function(dispatch) {

    axios.post(`${ROOT_URL}/login`, { email, password })
      // If request is successful...
      .then(response => {
        // Update state to indicate user is authenticated
        dispatch({ type: AUTHORIZE_USER, payload: response.data.name });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('name', response.data.name);
      })
      // Callback pushes user to the app route
      .then(() => callback())
      .catch(() => {
        dispatch(authError("Incorrect email or password"));
      });
  }
}

export function unauthorizeUser() {
  localStorage.removeItem('token');
  return { type: UNAUTHORIZE_USER }
}

export function signupUser({name, email, password}, callback) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { name, email, password })
      // If request is successful...
      .then((response) => {
        // Update state to indicate user is authenticated and save token
        dispatch({ type: AUTHORIZE_USER, payload: response.data.name });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('token', response.data.name);
      })
        // Callback pushes user to the app route
      .then(() => callback())
      .catch((error) => {
        if (error.response) {
          dispatch(authError(error.response.data.error));
        }
      });
  }
}

// Get tiles for the user by sending the user's token in the header
export function fetchTiles() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
    })
      .then((response) => {
        dispatch({ type: FETCH_TILES, payload: response })
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

// Add a tile for the user by sending the user's token in the header
export function createTile(values, callback) {
  return function(dispatch) {
    axios.post(ROOT_URL, values, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
  })
    .then((response) => {
      dispatch({ type: CREATE_TILE, payload: response })
    })
    .then(() => callback())
    .catch((error) => {
      console.log(error);
    })
  }
}


export function updateTile(tileId, values, callback) {
  return function(dispatch) {
    axios.put(`${ROOT_URL}/tile/${tileId}/settings`, values, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
  })
    .then((response) => {
      dispatch({ type: UPDATE_TILE, payload: response })
    })
    .then(() => callback())
    .catch((error) => {
      console.log(error);
    })
  }
}

export function deleteTile(id, callback) {
  const request = axios.delete(`${ROOT_URL}/tile/${id}`, {
    headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
  })
    .then(() => callback());
  return {
    type: DELETE_TILE,
    payload: id
  }
}

export function updateColor(id, colorValue, callback) {
  const request = axios.put(`${ROOT_URL}/tile/${id}`, colorValue, {
    headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
  })
    .then(() => callback());
  return {
    type: UPDATE_COLOR,
    payload: request
  }
}


export function fetchEntries(tileId) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/tile/${tileId}`, {
    headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
  })
    .then((response) => {
      dispatch({ type: FETCH_ENTRIES, payload: response })
    })
    .catch((error) => {
      console.log(error);
    })
  }
}

// ENTRIES:
export function createEntry(values, tileId, callback) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/tile/${tileId}`, values, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
    })
      .then(function(response){
        dispatch({type: CREATE_ENTRY, payload: response});
      })
      .then(() => callback())
      .catch(function(err) {
        // dispatch({type: FETCH_ENTRIES_REJECTED, payload: err})
        console.log(err);
      })
  }
}



export function updateEntry(values, tileId, entryId, callback) {
  return function(dispatch) {
    axios.put(`${ROOT_URL}/tile/${tileId}/entry/${entryId}`, values, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
    })
      .then(function(response){
        dispatch({type: UPDATE_ENTRY, payload: response});
      })
      .then(() => callback())
      .catch(function(err) {
        console.log(err);
      })
  }
}

export function deleteEntry(tileId, entryId, callback) {
  const request = axios.delete(`${ROOT_URL}/tile/${tileId}/entry/${entryId}`, {
    headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
  })
    .then(() => callback());
  return {
    type: DELETE_ENTRY,
    payload: request
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}
