import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Input} from 'native-base';

export default class UsernameField extends Component {

  render() {
    return (
        <Input
            name={"username"}
            placeholder="Username"
        />
    );
  }
};

