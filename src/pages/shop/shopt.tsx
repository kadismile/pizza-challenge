import React, {useEffect, useState} from "react";
import Select from "react-select";
import {useDispatch, useSelector} from 'react-redux'
import {selectProduct, selectProductSize, setProductSize } from "../../redux/productSlice";
import {selectCart, removeItem, addItem} from "../../redux/cartSlice";
import {selectUser} from "../../redux/userSlice";
import {CartButton} from "../../components/cart/CartButton";
import {DisablePaymentButton, FullPageSpinner} from "../../libs";
import {CardPayment} from "../../components/modals/card-payments";


export const Shop = () => {
  const [loading, setLoading] = useState(true)
  useEffect(()=> {
    setTimeout(()=> {
      setLoading(false)
    }, 1000)
  })
  const dispatch = useDispatch();
  const products = useSelector(selectProduct);
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const productSize = useSelector(selectProductSize);
  const showModal = false;
  const [pizzaType, setPizzaType] = useState( "Select Pizza Type");
  const [price, setPrice] = useState(0.00);
  const handleClick = async (data: any) => {
    let newData = await dispatch(setProductSize(data))
    const {label, price} = newData.payload;
    setPizzaType(label);
    setPrice(price)
    //let newData = await dispatch(setProductSize(data))
    console.log("x ", newData.payload.label)
  }
  const removeProduct = (id: number) => {
    dispatch(removeItem(id))
  }
  const checkCart = (productId: number) => {
    return cart.find((c: any) => c.id === productId)
  }
  const disableButton = () => {
    return (price === 0.00 || !cart.length)
  }
  const subTotal = () => {
    return cart.reduce((a:any,b:any) => a+b.price, 0.00) + price
  }

  return (
    loading ? <FullPageSpinner/> :
    <>
      <section className="page-slider">
        <div className="hero-banner-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <h2 className="banner-title">Hello {user.name}</h2>
              </div>
              <div className="col-lg-6">
                <div className="about-slider-img">
                  <img src="/images/about-slider-img.png" className="wow fadeInRight" data-wow-delay=".25s" data-wow-duration="1s" data-wow-iteration={1} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ws-section-spacing">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="checkout-card">
                <ul>
                  <li className="chechout-title">Choose a Pizza Size
                    <span className="chechout-span">Amount</span>
                  </li>
                  <li>
                    <ul className="chechout-item">
                      <li>
                        <div className="row">
                          <div className="col-1">
                            <img src="/images/pizza.png" className="wow zoomIn" data-wow-delay=".25s" data-wow-duration="1s" data-wow-iteration={1} alt="" />
                          </div>
                          <div className="col-3">
                            <Select
                              value={{ label: pizzaType}}
                              onChange={handleClick}
                              options={productSize}
                            />
                          </div>

                          <div className="col-8">
                            <span className="fa-pull-right" style={{marginRight:" 40%"}}>${price}</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <br/>
                  <li className="chechout-title">Add Pizza Toppings </li>
                  <li>
                    <ul className="chechout-item">
                      { products.map((product:any, index: number) => {
                        return (
                          <li key={index}>
                            <img src={product.image} alt="" className="wow zoomIn" data-wow-delay=".25s" data-wow-duration="1s" data-wow-iteration={1}/>
                            {product.name}
                            <span>
                              ${product.price}
                              {
                                checkCart(product.id) ?
                                <i style={{color: "#c72b2b", cursor: "pointer"}} onClick={ () => {removeProduct(product.id)}} className="fas fa-trash fa-pull-right"> </i> :
                                  ""
                              }
                            </span>
                            <span>
                              <CartButton product={product} />
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                  <li>Subtotal<span className="Subtotal">${subTotal()}</span></li>
                  <li className="chechout-shiping">Shiping<span className="Subtotal">Shpping Free</span></li>
                  <li className="chechout-total">Total<span className="Subtotal">${subTotal()}</span></li>
                </ul>
               {
                  disableButton() ?
                    <DisablePaymentButton /> :
                    <>
                      <a data-toggle="modal" style={{cursor: "pointer"}} data-target="#cardPayment" className="proceed-to-checkout">Proceed To Payment</a>
                      <CardPayment subTotal={subTotal()}/>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      {showModal ? <CardPayment subTotal={subTotal()} /> : ""}
    </>
  )

}