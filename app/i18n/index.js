import React from "react";
import i18n from "react-native-i18n";

export function formatNumber(value) {
    return i18n.toNumber(value, { precision: 2 });
};

export default i18n;