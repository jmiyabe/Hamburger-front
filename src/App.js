import React, { useEffect, useState } from 'react';
import Products from './components/Products';
import Cart from './components/Cart';

const App = () => {
  const [order, setOrder] = useState();
  const [products, setProduts] = useState([]);
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []) ;
  
  useEffect(() => {
    getProducts();
  },[])

  const addToCart = (product, quantity) => {
    const actualCart = cartItems.slice();
    const {id, ...productNoId} = product;
    actualCart.push({id: new Date().getTime().toString() , ...productNoId, count :quantity});
    
    setCartItems(actualCart);
    localStorage.setItem("cartItems", JSON.stringify(actualCart));
  }

  const removeFromCart = (product) => {
    const actualCart = cartItems.slice();
    actualCart.filter((item) => item.id !== product.id );
    setCartItems(actualCart.filter((item) => item.id !== product.id ));
    localStorage.setItem("cartItems", JSON.stringify(actualCart.filter((item) => item.id !== product.id )));
  }

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

  const getProducts = () => {
    fetch('http://localhost:8080/api/lunchs')
      .then((res) => res.json())
      .then((data) => {
        setProduts(data)
      })
      .catch(err => {
        console.log('Fetch Error :-S', err);
    })
  }

  return (
    <div className="grid-container">
      <header>
        <a href="/">Hamburguer Challenge</a>
      </header>
      <main>
        <div className='content'>
          <div className='main'>
            <Products products={products} addToCart={addToCart}/>
          </div>
          <div className='sidebar'>
            <Cart cartItems={cartItems} removeFromCart={removeFromCart} createOrder={createOrder} order={order} clearCart={clearCart} />
          </div>  
        </div>
      </main>
      <footer>
        All Rights is reserved.
      </footer>
    </div>
  );
}

export default App;
