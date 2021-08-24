import React, {useState} from "react";
import {DisabledButton} from "../../libs";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/userSlice";

export const Register = () => {
  const dispatch = useDispatch();
  const formFields = {
    name: "",
    street_name: "",
    house_number: "",
    postal_code: "",
    city: "",
    phone_number: ""
  }
  const [formValues, setFormValues] = useState({ ...formFields, errors: formFields });
  const [submitForm, setSubmitForm] = useState(false)
  const disableForm = () => {
    let newValues = { ...formValues };
    let isError = false;
    for (let val of Object.values(newValues)) {
      if (val === "") {
        isError = true
      }
    }
    if (isError && submitForm) {
      return true
    }
    if (!isError && !submitForm) {
      return true
    }
    if (isError && !submitForm) {
      return true
    }
    if (!isError && !submitForm) {
      return false
    }
  };
  const handleChange = (event: { preventDefault: () => void; target: { name: any; value: any; }; }) => {
    event.preventDefault();
    let { name, value } = event.target;
    let errors = formValues.errors;
    if (name === "phone_number") {
      if (!/^[0-9]+$/.test(value)) {
        return
      }
    }
    validateForm(name, errors, value);
    setFormValues(prevState => {
      return {
        ...prevState,
        errors,
        [name]: value
      }
    });
    for (let val of Object.values(formValues.errors)) {
      if (val !== "") {
        setSubmitForm(false)
      }
    }
  };
  const validateForm = (name:any, errors:any, value:any) => {
    switch (name) {
      case "name":
        errors.name = "";
        if (value.length && value.length <= 2) {
          errors.name = "your full name must be more than 3 characters long!";
          setSubmitForm(false);
        } else {
          setSubmitForm(true);
        }
        return errors.name;
      case "phone_number":
        errors.phone_number = "";
        if (value.length && value.length <= 5) {
          errors.phone_number = "phone number is invalid";
          setSubmitForm(false);
        } else {
          setSubmitForm(true);
        }
        return errors.phone_number;
      case "street_name":
        errors.street_name = "";
        if (value.length && value.length <= 3) {
          errors.street_name = "street name is too short";
          setSubmitForm(false);
        } else {
          setSubmitForm(true);
        }
        return errors.street_name;
      case "house_number":
        errors.house_number = "";
        if (value.length && value.length <= 1) {
          errors.house_number = "house number is too short";
          setSubmitForm(false);
        } else {
          setSubmitForm(true);
        }
        return errors.house_number;
      case "postal_code":
        errors.postal_code = "";
        if (value.length && value.length <= 3) {
          errors.postal_code = "postal code is not valid";
          setSubmitForm(false);
        } else {
          setSubmitForm(true);
        }
        return errors.postal_code;
      case "city":
        errors.city = "";
        if (value.length && value.length <= 3) {
          errors.city = "city name is too short";
          setSubmitForm(false);
        } else {
          setSubmitForm(true);
        }
        return errors.city;
      default:
        setSubmitForm(false);
        break;
    }

  };
  const { errors } = formValues;
  const displayError = (error: string) => {
    if (error.length)
      return <span className="addUser__error">{error}</span>
  }
  const  handleSubmit =  async (event: { preventDefault: () => void; }) => {
    event.preventDefault()
    let newValues: any = { ...formValues };
    let finalValue: any = {}
    for (let i in formValues) {
      if (i !== "errors") {
        finalValue[i] = newValues[i]
      }
    }
    dispatch(setUser(finalValue))
  }
  return (
    <>
      <section className="page-slider">
        <div className="hero-banner-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <h2 className="banner-title">Welcome</h2>
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
            <div className="offset-2 col-lg-8">
              <div className="resigter-customer">
                <h4 className={""}>CUSTOMER INFORMATION</h4>
                <div className="login-form">
                  <p>Kindly Fill The form Below To Continue</p>
                  <form>

                    <div className="form-row">
                      <div className="form-group col-12 col-md pr-4">
                        <input
                          type="text"
                          aria-label="name-input"
                          name="name"
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Your Name"
                          value={formValues.name}
                        />
                        { displayError(errors.name) }
                      </div>

                      <div className="form-group col-12 col-md">
                        <input
                          aria-label="phone-input"
                          name="phone_number"
                          type="number"
                          value={formValues.phone_number}
                          onChange={handleChange}
                          placeholder="Phone Number"
                          className="form-control"
                        />
                        { displayError(errors.phone_number) }
                      </div>
                    </div>


                    <div className="form-row">
                      <div className="form-group col-12 col-md pr-4">
                        <input type="text"
                               onChange={handleChange}
                               name="house_number"
                               className="form-control"
                               placeholder="Enter Your House Number"
                               value={formValues.house_number}
                        />
                        { displayError(errors.house_number) }
                      </div>
                      <div className="form-group col-12 col-md">
                        <input type="text"
                               onChange={handleChange}
                               name="street_name"
                               className="form-control"
                               placeholder="Enter Your Street Name"
                               value={formValues.street_name}
                        />
                        { displayError(errors.street_name) }
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group col-12 col-md pr-4">
                        <input type="text"
                               onChange={handleChange}
                               name="postal_code"
                               className="form-control"
                               placeholder="Enter Your Postal Code"
                               value={formValues.postal_code}
                        />
                        { displayError(errors.postal_code) }
                      </div>
                      <div className="form-group col-12 col-md">
                        <input type="text"
                               onChange={handleChange}
                               name="city"
                               className="form-control"
                               placeholder="Enter Your City Name"
                               value={formValues.city}
                        />
                        { displayError(errors.city) }
                      </div>
                    </div>

                    { disableForm() ?
                      <DisabledButton/> :
                      <button type="submit" style={{padding: "10px 20px"}} onClick={handleSubmit} className="contact-btn forget">SUBMIT</button>
                    }
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}