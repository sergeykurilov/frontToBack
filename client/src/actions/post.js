import axios from "axios";
import {ADD_COMMENT, DELETE_COMMENT, DELETE_POSTS, GET_POST, GET_POSTS, POSTS_ERROR, UPDATE_LIKES} from "./types";
import {setAlert} from "./alert";

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts')
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POSTS_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

//add like

export const addLike = (id) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${id}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: res.data}
        })
    } catch (err) {
        dispatch({
            type: POSTS_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

//remove like

export const removeLike = (id) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: res.data}
        })
    } catch (err) {
        dispatch({
            type: POSTS_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

//delete post

export const deletePost = (id) => async dispatch => {
    try {
        await axios.delete(`/api/posts/${id}`)
        dispatch({
            type: DELETE_POSTS,
            payload: id
        })
        dispatch(setAlert('Post Removed', 'success'))
    } catch (err) {
        dispatch({
            type: POSTS_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

//add post

export const addPost = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/posts/`, formData, config)
        dispatch({
            type: DELETE_POSTS,
            payload: res.data
        })
        dispatch(setAlert('Post Created', 'success'))
    } catch (err) {
        dispatch({
            type: POSTS_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

// get post

export const getPost = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`)
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POSTS_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

//add comment

export const addComment = (postId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config)
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })
        dispatch(setAlert('Comment added successfully', 'success'))
    } catch (err) {
        dispatch({
            type: POSTS_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

//delete comment

export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`)
        dispatch({
            type: DELETE_COMMENT,
            payload: postId
        })
        dispatch(setAlert('Comment removed successfully', 'success'))
    } catch (err) {
        dispatch({
            type: POSTS_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}