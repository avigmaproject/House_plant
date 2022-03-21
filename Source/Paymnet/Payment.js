import React, { Component } from "react";
import { Text, View, Keyboard, StyleSheet } from "react-native";
const STRIPE_ERROR = "Payment service error. Try again later.";
const SERVER_ERROR = "Server error. Try again later.";
const STRIPE_PUBLISHABLE_KEY = "pk_test_tzGMHzjhaHnfnJ3X5IQSY6Vo";
const STRIPE_SECKRET_KEY = "sk_test_Vk6eHDT29MB4wCDtNCJBjrAW";
import { setProfile, setMembership } from "../store/action/profile/action";
import { createstripecustomer, userprofile } from "../Utils/apiconfig";
import { connect } from "react-redux";
import AddSubscriptionView from "./AddSubscriptionView";
import Spinner from "react-native-loading-spinner-overlay";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      error: null,
      paymentid: "",
    };
  }
  componentDidMount = () => {
    // this.GetProductInfo();
  };
  GetProductInfo = async () => {
    let product = await fetch(
      "https://api.stripe.com/v1/products/prod_KrlLMmhTBhXTA9",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${STRIPE_SECKRET_KEY}`,
        },
        method: "get",
      }
    ).then((response) => response.json());
    console.log(product);
    let Price = await fetch(
      "https://api.stripe.com/v1/prices/price_1KCjM5GJpgN7Tc88Bd8VrVj5",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${STRIPE_SECKRET_KEY}`,
        },
        method: "get",
      }
    ).then((response) => response.json());
    console.log(Price);
  };
  GetUserProfile = async () => {
    this.setState({ submitted: true });
    let data = {
      Type: 2,
    };
    // console.log("userprofile", data, this.props.token);
    await userprofile(data, this.props.token)
      .then((res) => {
        console.log("res: ", res[0][0]);
        this.props.setProfile(res[0][0]);
        this.props.setMembership(res[0][0].User_Ispaid);
        this.setState({ submitted: false });
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ submitted: false });
          console.log("error.response", error.response);
        } else if (error.request) {
          this.setState({ submitted: false });
          console.log("request error", error.request);
        } else if (error) {
          alert("Server Error");
          this.setState({ submitted: false });
        }
      });
  };
  Pay = async (paymentid) => {
    this.setState({ submitted: true });
    let data = {
      Type: 4,
      User_Stripe_PaymentID: paymentid,
    };
    console.log("gethouseplant", data, this.props.token);
    await createstripecustomer(data, this.props.token)
      .then((res) => {
        console.log("res: ", res[0].CustomerID);
        alert("Subscription done successfully");
        this.GetUserProfile();
        this.setState({ submitted: false });
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ submitted: false });
          console.log("error.response", error.response);
        } else if (error.request) {
          this.setState({ submitted: false });
          console.log("request error", error.request);
        } else if (error) {
          alert("Server Error");
          this.setState({ submitted: false });
        }
      });
  };

  // Handles submitting the payment request
  onSubmit = async (creditCardInput) => {
    Keyboard.dismiss();
    console.log("minal", creditCardInput);
    // const { navigation } = this.props;
    // Disable the Submit button after the request is sent
    this.setState({ submitted: true });
    let creditCardToken;
    try {
      console.log("minal1");
      // Create a credit card token
      creditCardToken = await this.getCreditCardToken(creditCardInput);
      console.log("minal2creditCardToken", creditCardToken.id);
      this.setState({ paymentid: creditCardToken.id });
      if (creditCardToken.id) {
        this.Pay(creditCardToken.id);
      }
      if (creditCardToken.error) {
        // Reset the state if Stripe responds with an error
        // Set submitted to false to let the user subscribe again
        this.setState({ submitted: false, error: STRIPE_ERROR });
        return;
      }
    } catch (e) {
      // Reset the state if the request was sent with an error
      // Set submitted to false to let the user subscribe again
      this.setState({ submitted: false, error: STRIPE_ERROR });
      return;
    }
    // Send a request to your server with the received credit card token
    const { error } = await this.subscribeUser(creditCardToken);
    // Handle any errors from your server
    if (error) {
      this.setState({ submitted: false, error: SERVER_ERROR });
    } else {
      this.setState({ submitted: false, error: null });
      // navigation.navigate("Home");
    }
  };

  // render the subscription view component and pass the props to it

  subscribeUser = (creditCardToken) => {
    return new Promise((resolve) => {
      console.log("Credit card token\n", creditCardToken);
      setTimeout(() => {
        resolve({ status: true });
      }, 1000);
    });
  };

  getCreditCardToken = async (creditCardData) => {
    const card = {
      type: "card",
      "card[number]": creditCardData.values.number.replace(/ /g, ""),
      "card[exp_month]": creditCardData.values.expiry.split("/")[0],
      "card[exp_year]": creditCardData.values.expiry.split("/")[1],
      "card[cvc]": creditCardData.values.cvc,
    };
    console.log(card);
    return fetch("https://api.stripe.com/v1/payment_methods", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${STRIPE_SECKRET_KEY}`,
      },
      method: "post",
      body: Object.keys(card)
        .map((key) => key + "=" + card[key])
        .join("&"),
    }).then((response) => response.json());
  };
  render() {
    const { submitted, error } = this.state;
    return (
      <AddSubscriptionView
        navigation={this.props.navigation}
        error={error}
        submitted={submitted}
        onSubmit={this.onSubmit}
      />
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.authReducer.token,
});

const mapDispatchToProps = {
  setProfile,
  setMembership,
};
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
