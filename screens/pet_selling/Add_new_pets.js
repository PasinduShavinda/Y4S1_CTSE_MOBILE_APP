import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  Button,
  Alert,
  ScrollView,
  Pressable,
} from "react-native";
import { React, useState } from "react";
import Google_map from "./Google_map";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import ImageViewer from "../../components/pet_selling/ImageViewer";
import { Add_new_pets_to_db } from "../../services/pet_selling/selling_service";
import { Upload_image } from "../../services/pet_selling/Upload_image";
import { Snackbar } from "react-native-paper";

export default function Add_new_pets({ navigation }) {
  const [number, onChangeNumber] = useState("");
  const [latitudePass, setlatitudePass] = useState(null);
  const [longitudePass, setlongitudePass] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [isVisible, setVisible] = useState(false);
  const [snackbarMsg, setsnackbarMsg] = useState("");
  const [image_r, setImage_r] = useState("");
  const [snakVisible, SetSnackVisible] = useState(false);
  const [validatePhnone, setvalidatePhnone] = useState(false);

  // form Data
  const [names, setnames] = useState("");
  const [gender, setgender] = useState(1);
  const [price, setprice] = useState(0);
  const [category, setcategory] = useState("Dog");
  const [age, setage] = useState(0);
  const [description, setdescription] = useState("");
  const [contactNumber, setcontactNumber] = useState(0);
  var date = new Date();
  var today_date =
    date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate(); //To get the Current Date

  const user = "bf734bc34r74vb";

  const Add_new_pets = async () => {
    const regex = /^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/;
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log(regex.test(contactNumber));
    if (!regex.test(contactNumber)) {
      // setsnackbarMsg("Please fill the all fields");
      setvalidatePhnone(true);
      console.log("invalidddd");

      // alert("");
    } else {
      console.log("date");
      console.log(today_date);
      let url = await Upload_image(image_r);
      data = {
        user_id: user,
        name: names,
        gender: gender,
        price: price,
        category: category,
        age: age,
        description: description,
        contactNumber: contactNumber,
        latitudePass: latitudePass,
        longitudePass: longitudePass,
        img: url,
        date: today_date,
      };

      let data = await Add_new_pets_to_db(data);
      SetSnackVisible(true);
    }
  };
  function showAlert() {
    navigation.navigate("google-map");
  }
  function getLocation(latitudePass, longitudePass) {
    setlatitudePass(latitudePass);
    setlongitudePass(longitudePass);
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setImage_r(result);

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.longTextStyles}>
          <View>
            <Text style={styles.titleOfPage}>Fill dog Information</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.boxLeft}>
              <View style={[styles.formDataBox, styles.shadowProp]}>
                <Text>Upload Image</Text>
                <Button title="Choose Photo" onPress={pickImage} />
              </View>
              <View>
                {/* <Image
                  style={styles.tinyLogo}
                  source={{
                    uri: "https://reactnative.dev/img/tiny_logo.png",
                  }}
                /> */}
                {/* <ImageViewer selectedImage={selectedImage} /> */}
                {image && (
                  <Image source={{ uri: image }} style={styles.tinyLogo} />
                )}
              </View>
            </View>
            <View style={styles.boxRight}>
              <View style={[styles.formDataBox, styles.shadowProp]}>
                <Text>Pet Name</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setnames}
                  value={names}
                  placeholder="useless placeholder"
                  keyboardType="text"
                />
              </View>
              <View style={[styles.formDataBox, styles.shadowProp]}>
                <Text>Gender</Text>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue, itemIndex) => setgender(itemValue)}
                >
                  <Picker.Item label="Male" value="1" />
                  <Picker.Item label="Female" value="2" />
                </Picker>
              </View>
              <View style={[styles.formDataBox, styles.shadowProp]}>
                <Text>Price</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setprice}
                  value={price}
                  placeholder="useless placeholder"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
          <View>
            <View style={styles.contentStyles}>
              <View style={[styles.formDataBox, styles.shadowProp]}>
                <Text>Pet Category</Text>
                <Picker
                  selectedValue={category}
                  onValueChange={(itemValue, itemIndex) =>
                    setcategory(itemValue)
                  }
                >
                  <Picker.Item label="Dog" value="Dog" />
                  <Picker.Item label="Cats" value="Cats" />
                  <Picker.Item label="Birds" value="Birds" />
                </Picker>
              </View>
              <View style={[styles.formDataBox, styles.shadowProp]}>
                <Text>Age (months)</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setage}
                  value={age}
                  placeholder="useless placeholder"
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.formDataBox, styles.shadowProp]}>
                <View>
                  {validatePhnone ? (
                    <Text style={{ color: "red" }}>
                      Please Enter Valid Phone Number
                    </Text>
                  ) : (
                    <Text></Text>
                  )}
                </View>
                <Text>Contact Number</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setcontactNumber}
                  value={contactNumber}
                  placeholder="useless placeholder"
                  keyboardType="numeric"
                />
              </View>

              <View style={[styles.formDataBox, styles.shadowProp]}>
                <Text>Description</Text>
                <TextInput
                  editable
                  multiline
                  numberOfLines={4}
                  maxLength={40}
                  onChangeText={(text) => setdescription(text)}
                  value={description}
                  style={{ padding: 10 }}
                />
              </View>
            </View>
            <View style={styles.mapStyle}>
              <Google_map getLocation={getLocation} />
            </View>
          </View>
          <View style={styles.btnStyling}>
            <Pressable style={styles.button} onPress={Add_new_pets}>
              <Text style={styles.text}>Publish</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <Snackbar
        visible={snakVisible}
        onDismiss={() => SetSnackVisible(false)}
        duration={2000}
        action={{
          label: "OK",
          labelStyle: { color: "white", fontSize: 18 },
          onPress: () => {
            SetSnackVisible(false);
          },
        }}
        style={{ backgroundColor: "#B32AD8" }}
      >
        <View>
          <Text>Successfully Added</Text>
        </View>
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  formDataBox: {
    backgroundColor: "white",
    padding: 5,
    marginBottom: 5,
    borderRadius: 10,
    marginRight: 10,
  },
  mapStyle: {
    width: "95%",
    height: 500,
    marginLeft: 10,
    marginRight: 10,
  },
  contentStyles: {
    margin: 15,
  },
  btnStyling: {
    marginLeft: 20,
    marginRight: 25,
    marginBottom: 30,
  },
  text: {
    fontSize: 22,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    elevation: 20,
    shadowColor: "#000",
    backgroundColor: "#B648B8",
    height: 60,
  },
  longTextStyles: {
    backgroundColor: "aliceblue",
  },
  shadowProp: {
    elevation: 20,
    shadowColor: "#52006A",
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 2,
  },
  tinyLogo: {
    width: 120,
    height: 120,
    marginLeft: 5,
    marginBottom: 75,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 5,
  },
  boxRight: {
    paddingLeft: 0,
    paddingTop: 10,
    width: "60%",
  },
  boxLeft: {
    paddingLeft: 0,
    paddingTop: 10,
    width: "40%",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: "aliceblue",
    borderRadius: 15,
    padding: 10,
    paddingBottom: 30,
  },
  titleOfPage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 20,
    marginBottom: 20,
  },
});
