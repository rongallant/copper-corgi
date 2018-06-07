import React, {Component} from 'react';
import {Text, View, TextInput} from 'react-native';

export default class UsernameField extends Component {

  render() {
    return (
        <TextInput
            name={"username"}
            value="Default"
        />
    );
  }
};

