import React from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { graphql, } from 'react-apollo';
import gql from 'graphql-tag';

const renderItem = ({ item }) => {
    return (
        <View style={styles.listItem}>
            <Text style={styles.currency}>{item.currency}</Text>
            <Text style={styles.rate}>{item.rate}</Text>
        </View>
    );
};

const ExchangeRates = ({ data: { loading, error, rates } }) => {
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>)
    }
    if (error) {
        return (
            <View style={styles.container}>
                <Text style={[styles.caption, styles.error]}>Oops! Something went wrong.</Text>
            </View>)
    }
    return (
        <FlatList
            data={rates}
            renderItem={renderItem}
            keyExtractor={item => item.currency}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    caption: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    error: {
        color: 'red'
    },
    listItem: {
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        height: 66,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#e5e5e5",
        borderBottomWidth: 1,
    },
    currency: {
        fontSize: 21,
        fontWeight: "100",
        textAlign: "left",
        color: '#222'
    },
    rate: {
        fontSize: 24,
        fontWeight: "400",
        textAlign: "right",
        color: "#999",
        flex: 1
    }
});

export default graphql(gql`
query rates {
            rates(currency: "USD") {
            currency
    rate
        }
      }
`)(ExchangeRates);