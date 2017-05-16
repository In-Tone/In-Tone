import axios from 'axios'

// REDUCER //////////////////////////////
const reducer = (state=null, action) => {
  switch (action.type) {
  case AUTHENTICATED:
    return action.user
  }
  return state
}

// ACTION CREATOR ///////////////////////
const AUTHENTICATED = 'AUTHENTICATED'

export const authenticated = user => ({
  type: AUTHENTICATED, user
})
/////////////////////////////////////////

// DISPATCHERS //////////////////////////
export const login = (email, password) =>
  dispatch =>
    axios.post('/api/login',
      {email, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const logout = () =>
  dispatch =>
    axios.post('/api/login/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const whoami = () =>
  dispatch =>
    axios.get('/api/login/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
      .catch(failed => dispatch(authenticated(null)))
/////////////////////////////////////////////















export const createUser = (newUser) => dispatch => {
	axios.post('/api/users', newUser)
	.then((response) => {
		return axios.post("/api/auth/login/local"
    ,{
      username:response.data.email,password:response.data.password
    }
		)})
  .then((user)=>{
    dispatch(whoami())
  })
}

export default reducer;