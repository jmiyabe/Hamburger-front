import React, { useState } from 'react';
import {calculateProductPrice,calculateByFormula} from '../calculateProductPrice';
import formatCurrency from '../utils';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

const Cart = (props) => {
  const {cartItems} = props;
  
  const [isOpen, setIsOpen] = useState(false);

  const createOrder = () => {
    props.createOrder(cartItems, getTotalPrice());
  }

  const getTotalPrice = () => {
    return calculateProductPrice(cartItems);
  }

  return(
    <div>
      {cartItems.length === 0 ? 
      <div className='cart cart-header'>
        Cart is Empty
      </div> : 
      <div className='cart cart-header'>
        You have products in the cart {" "}
      </div>
      }
      <div className='cart'>
        <ul className='cart-items'>
          {cartItems.map((item) => {
            return(
              <li key={item.id}>
                <div>
                  {item.name}
                  <div className='cart-right'>
                    {formatCurrency(calculateByFormula(item))} x {item.count}
                    <button className='button'onClick={() => {props.removeFromCart(item)}}>
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      {cartItems.length !== 0 && (
        <div className='cart'>
          <div className='cart-total'>
            <div>
              Total:{" "}
              {formatCurrency(getTotalPrice())}
            </div>
            <button onClick={() => {createOrder(); setIsOpen(true); props.clearCart()}} type='submit' className='button primary'>Buy</button>
          </div>
        </div>
      )}
      {isOpen && (
        <Modal
          isOpen={isOpen}
          ariaHideApp={false}
          >
          <button onClick={() => {setIsOpen(false)}} className='button primary close-modal'>X</button>
          <div className='modal-order'>
            <div className='modal-complete'>
              You have completed the order
            </div>
            <div className='modal-order-id'>
              Check your order ID: {" " + props.order.id}
            </div>
          </div>
        </Modal>
      )}
      
      
    </div>
  )
}

Cart.propTypes = {
  cartItems: PropTypes.array.isRequired,
  createOrder: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
  order: PropTypes.any
}

export default Cart;