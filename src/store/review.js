import axios from 'axios'
const reviews = (state = [], action) => {
    if (action.type === 'GET_REVIEWS') {
        return action.reviews
    }
    return state
}

export const fetchReviews = (product) => {
    return async (dispatch) => {
        const response = await axios.get(`/api/reviews/${product.id}`)
        dispatch({ type: 'GET_REVIEWS', reviews: response.data })
    }
}

export default reviews
