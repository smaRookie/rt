import { types } from './index'
export const changeData = () => {
    return (dispatch) => {
        dispatch({
            type: types.CHANGE_DATA,
            value: 'aaa'
        })
    }
}
export const changeTitle = () => {
    return (dispatch) => {
        dispatch({
            type: types.CHANGE_TITLE,
            title: Math.random()
        })
    }
}
