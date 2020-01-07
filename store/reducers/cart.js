import * as actionTypes from '../actions/actionTypes'
import CartItem from '../../models/cart-item'

const INITIAL_STATE = {
    items: {},
    totalAmount: 0
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART: {
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;

            let updatedOrNewCartItem

            if (state.items[addedProduct.id]) { //this is how you access a dynamic property 
                //already have the item in the cart
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                )

            } else {

                updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);

            }
            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
                totalAmount: state.totalAmount + prodPrice
            }
        }
        case actionTypes.REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.pid];
            const currentQty = selectedCartItem.quantity;
            let updatedCartItems;
            if (currentQty > 1) {
              // need to reduce it, not erase it
              const updatedCartItem = new CartItem(
                selectedCartItem.quantity - 1,
                selectedCartItem.productPrice,
                selectedCartItem.productTitle,
                selectedCartItem.sum - selectedCartItem.productPrice
              );
              updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
            } else {
              updatedCartItems = { ...state.items };
              delete updatedCartItems[action.pid];
            }
            return {
              ...state,
              items: updatedCartItems,
              totalAmount: state.totalAmount - selectedCartItem.productPrice
            };
        case actionTypes.ADD_ORDER:
          return INITIAL_STATE

        case actionTypes.DELETE_PRODUCT:
            if(!state.items[action.pid]) {
              return state
            }

          const updatedItems = {...state.items}
          const itemTotal = state.items[action.pid].sum
          delete updatedItems[action.pid]
          return {
            ...state,
            items: updatedItems,
            totalAmount: state.totalAmount - itemTotal
          }
        }
      
        return state;
      };