import { StyleSheet, View, LogBox } from "react-native";
import Navigation from "./Navigation";
import React from "react";
import ListBillByStatus from "./app/screens/ListBillByStatus";

LogBox.ignoreAllLogs();
export default function App() {
  return (
    <View style={styles.container}>
      <Navigation />
      {/* <ListBillByStatus statusDisplay={1}/> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
