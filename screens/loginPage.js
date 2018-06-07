import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import UsernameField from '../components/usernameField';
import {
  Body,
  Container,
  Card,
  CardItem,
  Header,
  Content,
  Text,
  Button
} from 'native-base';

export default class LoginPage extends Component {

  render() {
    return (
        <Container>
          <Header/>
          <Content>
            <Card>
              <CardItem>
                <Body>
                  <Text>Welcome to the login page.</Text>
                  <UsernameField/>
                  <Button value="ACTION"/>
                </Body>
              </CardItem>
            </Card>
          </Content>
        </Container>
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
