import React, { useEffect, useState } from 'react';
import formatCurrency from '../utils';
import Modal from 'react-modal';
import { calculateByFormula } from '../calculateProductPrice';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
const Products = (props) => {

  const [ingredients, setIngredients] = useState([]);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    props.fetchProducts();
    getIngredients();
  },[])

  const getIngredients = () => {
    fetch('/api/ingredients')
      .then((res) => res.json())
      .then((data) => {
        setIngredients(data)
      })
      .catch(err => {
        console.log('Fetch Error :-S', err);
    })
  }

  const openModal = (prod) => {
    setProduct({...prod})
  }

  const closeModal = () => {
    setProduct(null);    
    setQuantity(1);
  }

  const addIngredint = (id) => {
    const copyProduct = JSON.parse(JSON.stringify(product));

    if(copyProduct.ingredientList.some((ing) => ing.id === id)){
      copyProduct.ingredientList.find((ing) => ing.id === id).quantity += 1;
    } else {
      copyProduct.ingredientList.push({...ingredients.find((ing) => ing.id === id)})
    }
    setProduct(copyProduct)
  }

  const subIngredient = (id) => {
    const copyProduct = JSON.parse(JSON.stringify(product));
      if(copyProduct.ingredientList.some((ing) => ing.id === id)){
        if(copyProduct.ingredientList.find((ing) => ing.id === id).quantity > 0){
          copyProduct.ingredientList.find((ing) => ing.id === id).quantity -= 1;
        }
      }
    setProduct(copyProduct)
  }

  return(
    <div>
      {!props.products ? 
        <div>Loading...</div>
      : <ul className="products">
        { props.products.map((prod) => {
          return(
            <li key={prod.id}>
              <div className="product">
                  <p>{prod.name}</p>
              </div>
              <div className='product-price'>
                <div>{formatCurrency(prod.ingredientList.reduce((acc, ingredient) => {return acc + ingredient.price},0))}</div>
                <button onClick={() => {openModal(prod)}} className="button primary">Add to Cart</button>
              </div>
            </li>
          )
        })}
      </ul>}
      {product && (
        <Modal
          isOpen={product !== null}
          onRequestClose={closeModal}
          ariaHideApp={false}>
          <div>
            <button onClick={closeModal} className='button primary close-modal'>X</button>
            <div>
              {product.name}
              <p>
                Ingredients: {" "}
              </p>
              <div className='modal-grid'>
                <ul>
                  {ingredients.map((ingredient) => {
                    return(
                      <li key={ingredient.id}>
                        <div className='modal-name'>{ingredient.name}</div>
                        <div className='modal-price'>{formatCurrency(ingredient.price)}</div>
                        <div className='modal-quantity'>
                         <button onClick={() => subIngredient(ingredient.id)} className='button primary'>
                            -
                          </button>
                          {product.ingredientList.some((ing) => ing.id === ingredient.id) ? 
                          product.ingredientList.find(ing => ing.id === ingredient.id).quantity : 0 }
                          <button onClick={() => addIngredint(ingredient.id)} className='button primary'>
                            +
                          </button>
                        </div>
                         
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div className='modal-total'>
                <div>
                  Quantity: {" "}
                  <button onClick={() => quantity > 1 && setQuantity(quantity - 1)} className='button primary'>
                    -
                  </button>
                  {quantity}
                  <button onClick={() => setQuantity(quantity + 1)} className='button primary'> 
                    +
                  </button>
                </div>
                Total: {" "}
                {formatCurrency(calculateByFormula(product) * quantity)}
                <button onClick={() => {props.addToCart(product, quantity); closeModal()} }className="button primary">Add to Cart</button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

Products.propTypes = {
  products: PropTypes.array.isRequired,
  addToCart: PropTypes.func.isRequired,
}

export default connect((state)=> ({products: state.products.items }), { fetchProducts, addToCart, })(Products);