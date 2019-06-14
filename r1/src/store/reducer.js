import { combineReducers } from 'redux-immutable';
import {types} from './index'
const initState = {
    title: '',
    value: '默认'
}

const m1 = (state = initState, action) => {
    switch(action.type) {
        case types.CHANGE_DATA: {
            return {
                ...state,
                value: action.value
            }
        }
        default: return {...state}
    }
}

const m2 = (state = initState, action) => {
    switch(action.type) {
        case types.CHANGE_TITLE: {
            return {
                ...state,
                title: action.title
            }
        }
        default: return {...state}
    }
}

const reducer = combineReducers({
    m1: m1,
    m2: m2
})
export default reducer
