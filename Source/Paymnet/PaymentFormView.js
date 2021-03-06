import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { LiteCreditCardInput } from "react-native-credit-card-input";
import FontAwesome from "react-native-vector-icons/FontAwesome";

/**
 * Renders the payment form and handles the credit card data
 * using the LiteCreditCardInput component.
 */
export default class PaymentFormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cardData: { valid: false } };
  }
  componentDidMount = () => {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.CCInput.setValues({ number: "0000", expiry: "00", cvc: "00" });
      console.log("this.state.cardData", this.state.cardData);
    });
  };
  render() {
    const { onSubmit, submitted, error } = this.props;
    return (
      <View>
        <View
          style={{
            // backgroundColor: "pink",
            borderColor: "gray",
            borderWidth: 1,
            padding: 3,
            borderRadius: 5,
            marginTop: 10,
          }}
        >
          <LiteCreditCardInput
            ref={(c) => (this.CCInput = c)}
            autoFocus
            // requiresName
            onChange={(cardData) => this.setState({ cardData })}
          />
        </View>
        <View style={styles.buttonWrapper}>
          {/* <ButtonView
            onPress={() => onSubmit(this.state.cardData)}
            title="Pay Now"
          /> */}
          <Button
            color="#53a20a"
            title="Subscribe"
            disabled={!this.state.cardData.valid || submitted}
            onPress={() => onSubmit(this.state.cardData)}
          />
          {/* Show errors */}
          {error && (
            <View style={styles.alertWrapper}>
              <View style={styles.alertIconWrapper}>
                <FontAwesome
                  name="exclamation-circle"
                  size={20}
                  style={{ color: "#c22" }}
                />
              </View>
              <View style={styles.alertTextWrapper}>
                <Text style={styles.alertText}>{error}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  buttonWrapper: {
    alignSelf: "center",
    marginTop: 20,
    // zIndex: 100,
  },
  alertTextWrapper: {
    flex: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  alertIconWrapper: {
    padding: 5,
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  alertText: {
    color: "#c22",
    fontSize: 16,
    fontWeight: "400",
  },
  alertWrapper: {
    backgroundColor: "#ecb7b7",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 5,
    paddingVertical: 5,
    marginTop: 10,
  },
});
