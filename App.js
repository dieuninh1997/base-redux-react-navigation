import React from 'react';
import { Easing, Animated } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import screens from './src/components';
import Navigator from './src/utils/Navigator';
import MainScreen from './src/components/MainScreen';

const AppNavigator = createStackNavigator({
  // SplashScreen: { screen: screens.SplashScreen },
  MainScreen: { screen: MainScreen },
},
{
  headerMode: 'none',
  cardStyle: {
    opacity: 1,
  },
  transitionConfig: () => ({
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
  }),
});

const Navigation = createAppContainer(AppNavigator);

export default class App extends React.PureComponent {
  render() {
    return (
      <Navigation ref={navigatorRef => Navigator.setTopLevelNavigator(navigatorRef)} />
    );
  }
}
