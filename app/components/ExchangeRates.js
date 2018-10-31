import React from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { graphql, } from 'react-apollo';
import gql from 'graphql-tag';
import { formatNumber } from "../i18n";

const renderItem = ({ item }) => {
    return (
        <View style={styles.listItem}>
            <Text style={styles.currency}>{item.currency}</Text>
            <Text style={styles.rate}>{formatNumber(item.rate)}</Text>
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
        padding: 20,
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "baseline",
        borderBottomColor: "#e5e5e5",
        borderBottomWidth: 1,
    },
    currency: {
        fontSize: 21,
        fontWeight: "100",
        textAlign: "left",
        color: '#111',
        letterSpacing: 3,
        marginRight: 20,
    },
    rate: {
        fontSize: 24,
        fontWeight: "400",
        textAlign: "right",
        color: "#888",
        flex: 1,
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