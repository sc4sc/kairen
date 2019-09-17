import { produce } from 'immer'
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
} from '../actions/auth'

const defaultState = {
  loginInProgress: false,
  data: {},
}

export default (state = defaultState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case USER_LOGIN_REQUEST: {
        draft.loginInProgress = true
        break
      }
      case USER_LOGIN_SUCCESS: {
        draft.data = action.payload
        draft.loginInProgress = false
        break
      }
      case USER_LOGIN_FAILED: {
        draft.loginInProgress = false
        break
      }
      default:
        return
    }
  })
