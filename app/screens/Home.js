import { View, FlatList, StyleSheet, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { color } from "../constants/color";

import { mezmurObj } from "../constants/mezmur";
import ListTitle from "../component/ListTitle";

const Home = () => {
  return (
    <View style={{ flex: 1, backgroundColor: color.backgroundSecondary }}>
      <View style={{ flex: 1 }}>
        <FlatList
          style={styles.flatList}
          data={mezmurObj}
          renderItem={({ item, index }) => (
            <ListTitle title={item.title} subList={item.data} index={index} />
          )}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  flatList: { flex: 1 },
});
