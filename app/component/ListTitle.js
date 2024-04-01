import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { color } from "../constants/color";

export const SubList = ({ subList, parentIndex }) => {
  const [subListStates, setSubListStates] = useState(
    Array(subList.length).fill(false)
  );
  return (
    <View style={{ marginLeft: 15 }}>
      <FlatList
        data={subList}
        renderItem={({ item, index }) => (
          <View>
            <View style={styles.view}>
              <TouchableOpacity style={styles.touchable}>
                <Text style={styles.text}>{item.title}</Text>
              </TouchableOpacity>
              <View style={styles.dropDown}>
                {item.data && (
                  <TouchableOpacity
                    onPress={() => {
                      const newSubListStates = [...subListStates];
                      newSubListStates[index] = !newSubListStates[index];
                      setSubListStates(newSubListStates);
                    }}
                  >
                    {subListStates[index] ? (
                      <AntDesign
                        name="caretdown"
                        size={18}
                        color={color.arrowIconSecondary}
                      />
                    ) : (
                      <AntDesign
                        name="caretright"
                        size={18}
                        color={color.arrowIconPrimary}
                      />
                    )}
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {item.data && subListStates[index] && (
              <SubList subList={item.data} parentIndex={index + parentIndex} />
            )}
          </View>
        )}
      />
    </View>
  );
};
const ListTitle = ({ title, subList, index }) => {
  const [showSubList, setShowSubList] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.view}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            navigation.navigate("ListTitle", { subList });
          }}
        >
          <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
        <View style={styles.dropDown}>
          <TouchableOpacity onPress={() => setShowSubList(!showSubList)}>
            {showSubList ? (
              <AntDesign
                name="caretdown"
                size={18}
                color={color.arrowIconSecondary}
              />
            ) : (
              <AntDesign
                name="caretright"
                size={18}
                color={color.arrowIconPrimary}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {showSubList && <SubList subList={subList} parentIndex={index} />}
    </View>
  );
};

export default ListTitle;

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
  dropDown: {
    // backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
    flex: 0.1,
  },
  text: {
    justifyContent: "center",
  },
});
