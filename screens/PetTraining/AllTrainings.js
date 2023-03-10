import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
  TouchableHighlight,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { getAllTrainings } from "../../services/PetTraining/trainingService";
import Screen from "../../components/PetTraining/common/Screen";
import { FlatGrid } from "react-native-super-grid";
import colors from "../../utils/colors";
import StarRating from "../../components/PetTraining/StartRatingDisplay";
import routes from "../../navigation/PetTraining/routes";

export default function AllTrainings({ navigation }) {
  const [listings, setListings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getAll();
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAll();
  }, []);
  const getAll = async () => {
    const listings = [];
    await getAllTrainings()
      .then((querySnapshot) => {
        querySnapshot.forEach((snapshot, index) => {
          listings.push(snapshot.data());
        });
        setRefreshing(false);
      })
      .catch((error) => {
        console.log("Error: ", error);
        setRefreshing(false);
      });
    setListings(listings);
  };
  return (
    <Screen>
      <FlatGrid
        itemDimension={130}
        data={listings}
        spacing={10}
        renderItem={({ item }) => (
          <TouchableHighlight
            underlayColor={colors.lightPurple}
            onPress={() => navigation.navigate(routes.ITEMTOPNAV, { item })}
          >
            <View style={{ margin: 10 }}>
              <Image style={styles.item} source={{ uri: item.images[0] }} />
              <StarRating rating={1} />
              <Image
                style={styles.itemIcon}
                source={require("../../assets/training.png")}
              />
            </View>
          </TouchableHighlight>
        )}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  itemRow: {
    flexDirection: "row",
    marginTop: 5,
  },
  item: {
    width: 170,
    height: 170,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    position: "relative",
    zIndex: 1,
  },
  itemIcon: {
    width: 30,
    height: 30,
    borderColor: colors.primary,
    borderWidth: 3,
    borderRadius: 50,
    position: "absolute",
    zIndex: 999,
    alignSelf: "flex-end",
  },
});
