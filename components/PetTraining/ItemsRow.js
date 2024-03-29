import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import StarRating from "./StartRatingDisplay";
import routes from "../../navigation/PetTraining/routes";
import colors from "../../utils/colors";
import { getAllReviewsByItemSub } from "../../services/PetTraining/reviewService";
import { Dimensions } from "react-native";

export default function ItemsRow({ navigation, listings }) {
  const [newList, setNewList] = useState([]);
  useEffect(() => {
    getRating();
  }, []);
  const getRating = () => {
    listings.map((item) => {
      return getAllReviewsByItemSub(newList, setNewList, item);
    });
  };

  return (
    <ScrollView horizontal={true}>
      <View style={styles.itemRow}>
        {listings.length !== 0 ? (
          listings.map((item, index) => {
            return (
              <TouchableHighlight
                key={index}
                underlayColor={colors.lightPurple}
                onPress={() => navigation.navigate(routes.ITEMTOPNAV, { item })}
              >
                <View style={{ margin: 10 }}>
                  <Image style={styles.item} source={{ uri: item.images[0] }} />
                  <StarRating rating={item.rating} />
                  <Image
                    style={styles.itemIcon}
                    source={require("../../assets/training.png")}
                  />
                </View>
              </TouchableHighlight>
            );
          })
        ) : (
          <View style={styles.none}>
            <Text style={styles.noneText}>No Listings</Text>
          </View>
        )}
      </View>
    </ScrollView>
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
  none: {
    paddingLeft: "35%",
    paddingTop: "10%",
    width: Dimensions.get("window").width,
  },
  noneText: {
    fontSize: 20,
    height: 170,

    color: colors.secondary,
  },
});
