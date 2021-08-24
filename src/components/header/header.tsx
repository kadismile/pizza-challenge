import React from "react";


export const Header =()=> {
  return (<header>
    <div className="header-fixed header-one">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-12 col-sm-12">
            <div className="nav-brand">
              <a href="#"> <h4>PIZZA CHALLENGE</h4> </a>
            </div>
          </div>
          <div className="col-lg-6">
            <nav className="navbar navbar-expand-lg navbar-light">
              <div className="collapse navbar-collapse my-lg-0" id="navbarNav">
                <ul className="navbar-nav mr-auto text-left">
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </header>)
}