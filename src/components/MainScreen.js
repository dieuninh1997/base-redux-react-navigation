import React from 'react';
import { createBottomTabNavigator, TabBarBottom, createStackNavigator } from 'react-navigation';
import { View, Easing, Animated } from 'react-native';
import HomeScreen from './home';
import TodoScreen from './todo';
import LabelComponent from '../global/LabelComponent';
import Navigator from '../utils/Navigator';

const transitionConfig = () => ({
  transitionSpec: {
    duration: 300,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
  },
  screenInterpolator: (sceneProps) => {
    const { layout, position, scene } = sceneProps;
    const { index } = scene;

    const height = layout.initHeight;
    const translateY = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [height, 0, 0],
    });

    const opacity = position.interpolate({
      inputRange: [index - 1, index - 0.99, index],
      outputRange: [0, 1, 1],
    });

    return { opacity, transform: [{ translateY }] };
  },
});
const MainTabNavigator = createBottomTabNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: () => ({
      tabBarLabel: ({ focused }) => <LabelComponent title="home" focused={focused} />,
    }),
  },
  TodoScreen: {
    screen: TodoScreen,
    navigationOptions: () => ({
      tabBarLabel: ({ focused }) => <LabelComponent title="todo" focused={focused} />,
    }),
  },
},
{
  navigationOptions: () => ({
    gesturesEnabled: false,
  }),
  lazy: false,
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: '#2ea6d6',
    inactiveTintColor: '#b9bacb',
    style: {
      backgroundColor: '#111441',
      height: 50,
      borderTopWidth: 1,
      borderTopColor: '#383b6b',
    },
    labelStyle: {
      fontSize: 11,
      marginTop: -3,
      marginBottom: 5,
    },
  },
  animationEnabled: true,
  initialRouteName: 'TodoScreen',
  swipeEnabled: false,
});

const MainScreenNavigator = createStackNavigator({
  MainTabNavigator: { screen: MainTabNavigator },
}, {
  headerMode: 'none',
  cardStyle: {
    opacity: 1,
  },
  transitionConfig,
});

export default class MainScreen extends React.PureComponent {
  handleNavigationChange = () => {
    // firebase.analytics().setCurrentScreen(action.routeName);
  }

  static router = MainScreenNavigator.router;

  render() {
    const { navigation } = this.props;
    Navigator.setTopLevelNavigator(navigation);
    return (
      <View style={{ flex: 1 }}>
        <MainScreenNavigator
          onNavigationStateChange={this.handleNavigationChange}
          uriPrefix="/app"
          navigation={navigation}
        />
      </View>
    );
  }
}
