import React, {useState} from "react";
import toastr from 'toastr'
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import { Redirect } from "react-router-dom";
import {useDispatch} from "react-redux";
import {setPayments} from "../../redux/userSlice";


interface CardPaymentProps {
  subTotal: number
}
const doc:any = window

export const CardPayment: React.FC<CardPaymentProps> = (props: CardPaymentProps) => {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const stripe: any = useStripe();
  const elements: any = useElements();
  const  handleSubmit =  async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if (error) {
      toastr.error(error.message);
    } else {
      console.log("paymentMethod ", paymentMethod)
      dispatch(setPayments(paymentMethod));
      doc.$('#cardPayment').modal('hide');
      setRedirect(true);
    }
  }

  return (
    !redirect ?
      <div className="modal fade" id="cardPayment"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel" style={{color: "black"}}>Payments</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span style={{fontSize: "13px", color: "red"}}>AMOUNT: ${props.subTotal}</span>
            </button>
          </div>
          <div className="modal-body">
            <form autoComplete="off">
              <div style={{marginBottom: "20px"}}>
                <CardElement/>
              </div>
              <a data-toggle="modal" onClick={handleSubmit} style={{cursor: "pointer"}}  className="proceed-to-checkout">Pay</a>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div> :
      <Redirect to="/confirmation" />
  )
}