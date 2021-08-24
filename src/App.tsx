import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Header} from "./components/header/header";
import {Footer} from "./components/footer/footer";
import {Register} from "./pages/register/register";
import {useSelector} from "react-redux";
import {selectUser} from "./redux/userSlice";
import {Shop} from "./pages/shop/shopt";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {ConfirmationPage} from "./pages/confirmation/confirmation";


function App() {
  const user = useSelector(selectUser);
  const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
  return (
    <>
      <Router>
        <Header />
        <Switch>
          { user.payments ? <Route path='/confirmation' exact> <ConfirmationPage /> </Route> :""}
          {
            !user?.name ?
              <Route path='/' exact> <Register/></Route>
              :
              <Elements stripe={stripePromise}>
                <Shop/>
              </Elements>
          }
        </Switch>
      </Router>
      <Footer/>
    </>
  );
}

export default App;
