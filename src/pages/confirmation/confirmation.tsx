import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectUser} from "../../redux/userSlice";
import {selectCart} from "../../redux/cartSlice";
import {selectProductSize } from "../../redux/productSlice";
import {Register} from "../register/register";
import {FullPageSpinner} from "../../libs";

export const ConfirmationPage = () => {
  const[redirect, setRedirect] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(()=> {
    setTimeout(()=> {
      setLoading(false)
    }, 1000)
  })
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const productSize = useSelector(selectProductSize);
  const selectedProSize = productSize.find((pz:any) => pz.picked === true)
  const data = JSON.stringify({
    user: user,
    order: {...cart, productSize: selectedProSize}
  }, undefined, 3);

  const resetState = () => {
    localStorage.setItem("persist:root", "")
    setRedirect(true)
  }

  return (
    loading ? <FullPageSpinner/> :
    !redirect ?
    <>
      <section className="page-slider">
        <div className="hero-banner-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <h2 className="banner-title">Confirmation</h2>
              </div>
              <div className="col-lg-6">
                  <button type="button" style={{marginTop: "10px"}} onClick={resetState} className="btn btn-danger" data-dismiss="modal"> Restart </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <pre>
                {data}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </> : <Register />
  )
}