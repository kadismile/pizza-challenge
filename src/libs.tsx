import React from "react";

export function DisabledButton() {
  return (
    <button className="contact-btn forget" type="submit"
      style = {{
        filter: "opacity(0.5)",
        color: "#fff"
        , fontSize: "15px",
        pointerEvents: "none",
        padding: "10px 20px"
      }}
    >Submit
    </button>
  )
}

export function FullPageSpinner() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <img src="/images/ajax-loader.gif" style={{width: "7%"}} alt=""/>
    </div>
  );
}

export function DisablePaymentButton() {
  return (
    <a
       style = {{
        filter: "opacity(0.5)",
        color: "#fff",
        fontSize: "15px",
        cursor: "not-allowed",
        padding: "10px 20px"
    }}
   className="proceed-to-checkout">Proceed To Payment</a>
  )
}