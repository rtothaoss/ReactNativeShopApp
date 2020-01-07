import * as actionTypes from '../actions/actionTypes'
import Order from '../../models/order'



const INITIAL_STATE = {
    orders: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.SET_ORDERS:
            return {
                orders: action.orders
            }
        case actionTypes.ADD_ORDER:
            const newOrder = new Order(
                action.orderData.id,
                action.orderData.items,
                action.orderData.amount,
                action.orderData.date
            )
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }
    }
    return state
}