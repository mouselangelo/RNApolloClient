/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import ExchangeRates from "./components/ExchangeRates";

const client = new ApolloClient({
  uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <ExchangeRates />
        </View>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
