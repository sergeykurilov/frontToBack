//get current user profile

import axios from "axios";

export const getCurrentUserProfile = () => async dispatch => {
    try {
        const res = await axios.get('api/profile/me')
        dispatch({
            type: 'GET_PROFILE',
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: 'PROFILE_ERROR',
            payload: {
                msg: e.message.statusText,
                status: e.response.status
            }
        })
    }
}