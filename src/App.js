import React, { useEffect, useState } from 'react';
import Products from './components/Products';
import Cart from './components/Cart';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  const [order, setOrder] = useState();
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []) ;
  
  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem("cartItems", []);
  }

  const createOrder = (purchaseOrder, totalPrice) => {
    const newOrder = {
      id: new Date().getTime().toString() ,
      products: Object.values({...purchaseOrder}),
      totalPrice: Number(totalPrice).toFixed(2)
    };
    setOrder(newOrder);
    fetch("http://localhost:8080/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newOrder)
    }).then(res => { res.status === 200 && console.log("Purchase order created");})
  }

  return (
    <Provider store={store}>
      <div className="grid-container">
        <header>
          <a href="/">Hamburguer Challenge</a>
        </header>
        <main>
          <div className='content'>
            <div className='main'>
              <Products/>
            </div>
            <div className='sidebar'>
              <Cart cartItems={cartItems} createOrder={createOrder} order={order} />
            </div>  
          </div>
        </main>
        <footer>
          All Rights is reserved.
        </footer>
      </div>
    </Provider>
  );
}

export default App;
