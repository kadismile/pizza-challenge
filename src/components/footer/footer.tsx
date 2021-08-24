import React from "react";


export const Footer = () => {
  return (
    <footer className="same-section-spacing footer-bg">
    <div className="container">
      <div className="row">
        <div className="container">
          <div className="row justify-content-center">
            <div className="container-fluid">
              <div className="copy-right">
                <span className="copy-right-seprater" />
                <a href="https://www.github.com/kadismile" target="">{new Date().getFullYear()} . Submitted By kadismile.</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  )
}