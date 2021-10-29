import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class Header extends Component {
  render() {
    return (
      <View>
        <View
          style={{
            height: 50,
            // backgroundColor: '#F6F6',
            width: "100%",
            flexDirection: "row",
            // justifyContent: 'center',
            alignItems: "center",
          }}
        >
          {this.props.back ? (
            <View style={{ width: "20%", marginLeft: 20 }}>
              <TouchableOpacity
                style={{
                  width: "50%",
                  backgroundColor: "#fff",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                }}
                onPress={() => this.props.navigation.goBack()}
              >
                <Ionicons name="chevron-back" size={30} color="#53a20a" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={{
                width: "20%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Feather name="align-left" size={30} color="#fff" />
            </TouchableOpacity>
          )}
          <View
            style={{
              width:
                this.props.search || this.props.notification ? "60%" : "50%",
              alignItems: "center",
              // backgroundColor: 'pink',
            }}
          >
            <Text
              style={{
                fontSize: 25,
                color: "#fff",
                fontFamily: "Roboto-Medium",
              }}
            >
              {this.props.title}
            </Text>
          </View>
          {(this.props.search || this.props.notification) && (
            <View
              style={{
                flexDirection: "row",
                width: "20%",
                justifyContent: this.props.search ? "space-around" : "center",
              }}
            >
              {this.props.search &&
                (this.props.searchdata ? (
                  <TouchableOpacity onPress={this.props.searchdata}>
                    <Feather name="search" size={30} color="#fff" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("Home", {
                        filterModal: true,
                      })
                    }
                  >
                    <Feather name="search" size={30} color="#fff" />
                  </TouchableOpacity>
                ))}

              {this.props.notification && (
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Notification")}
                >
                  {/* //</View>{this.props.notification} */}
                  <Ionicons name="notifications" size={30} color="#fff" />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
    );
  }
}
