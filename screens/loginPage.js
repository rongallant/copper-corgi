import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UsernameField from '../components/usernameField';
import { Card, Button } from 'react-native-material-design';

export default class LoginPage extends Component {

  render() {
    return (
        <View style={styles.container}>
          <Card>
            <Card.Body>
              <Text>Welcome to the login page.</Text>
              <UsernameField/>
            </Card.Body>
            <Card.Actions position="right">
              <Button value="ACTION" />
            </Card.Actions>
          </Card>
        </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
