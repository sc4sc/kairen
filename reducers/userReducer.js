import { produce } from 'immer'
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_CHANGE_MODE,
} from '../actions/user'

const defaultState = {
  loginInProgress: false,
  data: {
    isTraining: false,
  },
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
        draft.data.isAdmin = true
        draft.loginInProgress = false
        break
      }
      case USER_LOGIN_FAILED: {
        draft.loginInProgress = false
        break
      }
      case USER_CHANGE_MODE: {
        draft.data.isTraining = action.payload
        break
      }
      default:
        return
    }
  })
