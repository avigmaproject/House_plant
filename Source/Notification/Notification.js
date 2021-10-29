import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  FlatList,
} from 'react-native';
import Header from '../SmartComponent/Header';
import randomColor from 'randomcolor';

const DATA = [
  {
    title: 'Be first to buy New feature',
    time: '7:20 AM',
    content: 'Lorem Ipsum is simply dummy type setting...',
  },
  {
    title: 'Password Changes',
    time: '4:30 AM',
    content: 'Lorem Ipsum is simply dummy type setting...',
  },
  {
    title: 'Sale is on!',
    time: 'Yesterday',
    content: 'Lorem Ipsum is simply dummy type setting...',
  },
  {
    title: 'CashBack Offer',
    time: 'Yesterday',
    content: 'Lorem Ipsum is simply dummy type setting...',
  },
  {
    title: 'Profile Created',
    time: 'Aug 1,2021',
    content: 'Lorem Ipsum is simply dummy type setting...',
  },
];
export default class Notification extends Component {
  render() {
    return (
      <View>
        <ImageBackground
          source={require('../../assets/plan_app_images/bg/all-pages-bg.jpg')}
          resizeMode="cover"
          style={{height: '100%'}}>
          <SafeAreaView style={{height: '100%'}}>
            <Header
              search={true}
              notification={true}
              navigation={this.props.navigation}
              title={'Notification'}
            />
            <View style={{marginTop: 50, marginHorizontal: 20}}>
              <FlatList
                data={DATA}
                renderItem={({item}) => {
                  let color = randomColor({alpha: 0.1});

                  return (
                    <View
                      style={{
                        backgroundColor: '#fff',
                        marginTop: 20,
                        paddingVertical: 10,
                        // height: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          backgroundColor: color,
                          width: 30,
                          height: 50,
                          borderTopRightRadius: 100,
                          borderBottomRightRadius: 100,
                          marginRight: 10,
                          position: 'absolute',
                          left: -15,
                          top: 8,
                        }}></View>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text style={{color: color, fontWeight: 'bold'}}>
                              {item.title}
                            </Text>
                            <Text style={{fontWeight: 'bold'}}>
                              {item.time}
                            </Text>
                          </View>
                          <View>
                            <Text style={{color: 'gray', lineHeight: 30}}>
                              {item.content}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                }}
                keyExtractor={() =>
                  '_' + Math.random().toString(36).substr(2, 9)
                }
              />
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  }
}
