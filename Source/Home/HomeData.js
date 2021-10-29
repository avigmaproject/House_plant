import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

export default class HomeData extends Component {
  OpenUrl = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };
  render() {
    return (
      <View style={{ marginTop: 40 }}>
        <FlatList
          numColumns={2}
          data={this.props.Data}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  // backgroundColor: 'pink',
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    width: "90%",
                    backgroundColor: "#fff",
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                  }}
                >
                  <Image
                    resizeMode={"stretch"}
                    source={{ uri: item.Hp_Image }}
                    style={{
                      width: 120,
                      height: 120,
                      marginRight: 15,
                      alignSelf: "center",
                    }}
                  />
                  <View
                    style={{
                      marginTop: 10,
                      // backgroundColor: "pink",
                      height: 40,
                    }}
                  >
                    <Text
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      {item.HP_ProductName}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 8,
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          color: "#53a20a",
                          fontFamily: "Roboto-Medium",
                          fontSize: 20,
                        }}
                      >
                        ${item.HP_Price}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => this.OpenUrl(item.HP_WebLsiteink)}
                      style={{
                        backgroundColor: "#53a20a",
                        padding: "2%",
                      }}
                    >
                      <AntDesign name="arrowright" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={() => "_" + Math.random().toString(36).substr(2, 9)}
        />
      </View>
    );
  }
}
