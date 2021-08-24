import React from "react";
import {addItem, selectCart} from "../../redux/cartSlice";
import {useDispatch, useSelector} from 'react-redux'


export const CartButton = (props: any) => {
  const { product } = props
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  const addToCart = () => {
    const newProduct = {...product}
    newProduct.quantity = 1
    console.log("newProduct ", newProduct)
    dispatch(addItem(newProduct))
  }

  const hideButton = () => {
    return cart.find((c:any) => c.id == product.id)
  }

return (
  <div className="purchase-section multiple">
    <div className="purchase">
      {!hideButton() ?
        <button type="submit" onClick={addToCart} className="contact-btn forget"> <i className="fas fa-cart-plus"> </i> Add to cart</button> :
        <button type="submit"  style={{ backgroundColor: "#c8dec8"}} className="contact-btn forget"> <i className="fas fa-cart-plus"> </i> Added to cart</button>
      }
    </div>
  </div>
)
}