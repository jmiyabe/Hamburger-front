import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "../types";

export const addToCart = (product, quantity) => (dispatch,getState) => {
  const cartItems = getState().cart.cartItems.slice();
  const {id, ...productNoId} = product;
  cartItems.push({id: new Date().getTime().toString() , ...productNoId, count :quantity});
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  
  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems }
  })
}

export const removeFromCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice().filter(x => x.id !== product.id)
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  dispatch({
    type: REMOVE_FROM_CART,
    payload: { cartItems } 
  })
}

export const clearCart = () => (dispatch) => {
  dispatch({
    type: CLEAR_CART,
    payload:[]
  })
}