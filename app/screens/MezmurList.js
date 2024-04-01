import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlatList, Pressable } from "react-native-gesture-handler";
import { useNavigation, useRouter } from "expo-router";

import { color } from "../constants/color";

const MezmurList = ({ route }) => {
  //   const { list } = route.params;
  console.log("Mezmur list:", route);
  const navigation = useNavigation();

  const mezmurList = navigation;
  console.log("mezmurList", mezmurList); // navigation.getState().routes[1].params.list)
  return (
    <View>
      {/* <FlatList
        data={mezmurList}
        renderItem={(item, index) => (
          <View style={styles.view}>
            <Pressable
              style={styles.touchable}
              onPress={() => {
                navigation.navigate("screens/mezmurList", { list: item.data });
              }}
            >
              <Text style={styles.text}>{"mezmurList.title"}</Text>
            </Pressable>
          </View>
        )}
      /> */}
    </View>
  );
};

export default MezmurList;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "row",
    height: 50,
    margin: 3,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: color.primary,
  },
  touchable: {
    flex: 0.9,
    width: "50%",
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "green",
  },
});
