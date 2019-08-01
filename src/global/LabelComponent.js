import React from 'react';
import { Text } from 'react-native';

class LabelComponent extends React.PureComponent {
  render() {
    const { focused, title } = this.props;
    return (
      <Text
        allowFontScaling={false}
        style={{
          color: focused ? '#2ea6d6' : '#b9bacb',
          fontSize: 14,
          marginTop: 3,
          marginBottom: 5,
          textAlign: 'center',
        }}
      >
        {title}
      </Text>
    );
  }
}

export default LabelComponent;
