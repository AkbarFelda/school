// withHooks
import { memo } from "react";
import { LibCurl } from "esoftplay/cache/lib/curl/import";
import { LibNavigation } from "esoftplay/cache/lib/navigation/import";
// import { LibPicture } from "esoftplay/cache/lib/picture/import";
import esp from "esoftplay/esp";
import { useRef, useState, useEffect } from "react";
// import { LibStyle } from 'esoftplay/cache/lib/style/import';
import React from "react";
import navigation from "esoftplay/modules/lib/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { LibStyle } from "esoftplay/cache/lib/style/import";
import { useTimeout } from "esoftplay/timeout";
import { Auth } from "../auth/login";
import { LibNotification } from "esoftplay/cache/lib/notification/import";
import { UserClass } from "esoftplay/cache/user/class/import";
// Props untuk komponen ParentsHome
export interface ParentsHomeProps {}

function shadows(value: number) {
  return {
    elevation: 3, // For Android
    shadowColor: "#000", // For iOS
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: value,
  };
}

export function pushToken(): void {
  console.log("Api pushToken ...");
  AsyncStorage.getItem("token").then((token: any) => {
    if (token) {
      let post = { token: token };
      new LibCurl(
        "user_token",
        post,
        (result, msg) => {
          console.log(token);
          console.log("result", result);
          console.log("msg", msg);
          UserClass?.pushToken();
        },
        (error) => {
          console.log("error", error);
          console.log(token);
          AsyncStorage.removeItem("push_id");
        }
      );
    }
  });
}
// Komponen ParentsHome
function ParentsHome({}: ParentsHomeProps): JSX.Element {
  const { width, height } = Dimensions.get("window");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef<FlatList<any>>(null);

  // Fungsi untuk memperbarui indeks slide saat digulirkan
  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  // Fungsi untuk pindah ke slide berikutnya
  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    const lastSlideIndex = slides.length - 1;

    if (nextSlideIndex <= lastSlideIndex) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    } else {
      // Jika sudah di slide terakhir, kembali ke slide pertama
      const offset = 0;
      ref?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(0);
    }
  };

  const [ParentStudent, setParentStudent] = useState<any>([]);
  const [childList, setChildList] = useState<any>();

  function loadParentStudent() {
    new LibCurl(
      "parent_student",
      null,
      (result, msg) => {
        setParentStudent(result);
        setChildList(result.student_data.length);
      },
      (err) => {
        console.log("error", err);
      },
      1
    );
  }

  // // Efek untuk auto slide setiap beberapaslides detik
  useEffect(() => {
    loadParentStudent();
  }, []);

  // Data anak-anak dan kehadirannya

  // Data kehadiran anak pada setiap slide
  const slides: [] = ParentStudent.student_data;
  const timeout = useTimeout();

  const data = UserClass.state().useSelector((s) => s);
  async function apilogout() {
    console.log("menjalankan apilogout....");
    esp.mod("lib/notification").requestPermission((token) => {
      console.log("token :..==", token);
      // const data = UserClass.state().useSelector(s => s)

      const post = { token: token };

      new LibCurl(
        "logout",
        get,
        (result, msg) => {
          console.log("check post", post);
          console.log("check apikey", data.apikey);
          console.log("check uri", data.uri);
          console.log("result", result);
          console.log("msg", msg);
        },
        (error) => {
          console.log("check post", post);
          console.log("check apikey", data.apikey);
          console.log("check uri", data.uri);
          console.log("api logout error :", error);
          console.log("apilogout");
        },
        1
      );
    });
  }

  const logout = () => {
    console.log("menjalankan logout....");
    apilogout();
    timeout(() => {
      UserClass.pushToken();
      // pushToken()
      LibNotification.drop();
      Auth.reset();
      UserClass.delete();
      navigation.reset("auth/login");
    }, 1000);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      {/* Kartu Orang Tua */}
      <View
        style={{
          flex: 1,
          backgroundColor: "#4B7AD6",
          justifyContent: "flex-start",
          padding: 20,
          paddingTop: 40,
          borderBottomRightRadius: 12,
          borderBottomLeftRadius: 12,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#FFFFFF" }}>
          Selamat datang
        </Text>
        <View
          style={{
            backgroundColor: "#FFFFFF",
            width: LibStyle.width * 1 - 40,
            height: LibStyle.height * 0.2 - 50,
            justifyContent: "flex-start",
            alignItems: "center",
            marginVertical: 20,
            padding: 15,
            flexDirection: "row",
            borderRadius: 10,
          }}
        >
          <Image
            source={
              ParentStudent.image
                ? { uri: ParentStudent.image }
                : require("/var/www/html/school/cgi-bin/mobile/assets/anies.png")
            }
            style={{
              width: 105,
              height: 105,
              borderRadius: 135 / 2,
              borderWidth: 3,
              borderColor: "#FFFFFF",
            }}
          />
          <View
            style={{
              marginLeft: 15,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#000000",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              {ParentStudent.name}
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: "#000000",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              +{ParentStudent.phone}
            </Text>
          </View>
        </View>
      </View>

      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          marginTop: 15,
          marginLeft: 15,
        }}
      >
        Pantau aktivitas anak anda{" "}
      </Text>

      {/* Kartu Aktivitas Anak */}
      <View
        style={{
          flex: 3,
          backgroundColor: "#FFFFFF",
          justifyContent: "center",
          paddingTop: 10,
          alignItems: "flex-start",
        }}
      >
        {/* Kartu Anak */}
        <FlatList
          ref={ref}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          contentContainerStyle={{
            alignItems: "center",
            backgroundColor: "#ffffff",
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={ParentStudent.student_data}
          pagingEnabled
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            console.log("item:", JSON.stringify(item));
            console.log(item.class_name);

            return (
              <View
                style={{
                  alignItems: "center",
                  width: width - 75,
                  paddingBottom: 20,
                  borderRadius: 12,
                  backgroundColor: "#ffffff",
                  marginLeft: 15,
                  marginRight: 15,
                  justifyContent: "center",
                  padding: 7,
                }}
              >
                <Pressable
                  onPress={() => {
                    console.log("childDetailRaport:", JSON.stringify(item));
                    LibNavigation.navigate("parent/childdetailraport", {
                      childdetailraport: item,
                    });
                  }}
                >
                  <View
                    style={{
                      height: height * 0.54,
                      backgroundColor: "#4B7AD6",
                      width: LibStyle.width * 0.8,
                      borderRadius: 12,
                      marginTop: 10,
                      ...shadows(3),
                      paddingTop: 79,
                    }}
                  >
                    <View
                      style={{
                        padding: 1,
                        alignItems: "center",
                        backgroundColor: "#FFFFFF",
                        borderBottomLeftRadius: 12,
                        borderBottomRightRadius: 12,
                        height: height * 0.44,
                      }}
                    >
                      <Image
                        source={{
                          uri: "https://images.unsplash.com/photo-1507823782123-27db7f9fd196?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        }}
                        style={{
                          width: 105,
                          height: 105,
                          borderRadius: 135 / 2,
                          borderWidth: 3,
                          borderColor: "#FFFFFF",
                          marginTop: 10,
                        }}
                      />

                      <View style={{ marginTop: 10 }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: "#000000",
                          }}
                        >
                          Nama: {item.student_name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: "#000000",
                          }}
                        >
                          Kelas: {item.class_name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: "#000000",
                          }}
                        >
                          NIS: {item.nis}
                        </Text>
                      </View>

                      {/* Tombol Lihat Raport */}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          marginTop: 35,
                        }}
                      >
                        <Pressable
                          onPress={() => {
                            console.log(
                              "childDetailRaport:",
                              JSON.stringify(item)
                            );
                            LibNavigation.navigate("parent/childdetailraport", {
                              childdetailraport: item,
                            });
                          }}
                          style={{
                            height: 50,
                            width: 290,
                            alignItems: "center",
                            backgroundColor: "#4B7AD6",
                            justifyContent: "center",
                            borderRadius: 10,
                            padding: 10,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: "bold",
                              color: "#FFFFFF",
                            }}
                          >
                            Lihat Raport
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </Pressable>
                {/* slide indicator */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 10,
                  }}
                ></View>
              </View>
            );
          }}
          onScroll={(e) => updateCurrentSlideIndex(e)}
        />

        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            width: LibStyle.width,
          }}
        >
          {Array.from({ length: childList }, (_, index) => (
            <View
              key={index}
              style={{
                height: 15,
                width: 20,
                backgroundColor:
                  currentSlideIndex === index ? "#3F8DFD" : "#757171",
                marginHorizontal: 3,
                borderRadius: 12,
              }}
            />
          ))}
        </View>
        {/* Kartu Logout */}

        {/* <View style={{ flexDirection: "row", alignContent: 'center', justifyContent: 'center', width: LibStyle.width }}>
          <View style={{ flexDirection: "row", width: LibStyle.width / 4 }}>
            {ParentStudent.student_data.map((_: any, index: React.Key | null | undefined) => (
              <View
                key={index}
                style={[
                  {
                    height: 15,
                    width: 20,
                    backgroundColor: '#757171',
                    marginHorizontal: 3,
                    borderRadius: 12,
                  },
                  currentSlideIndex === index && {
                    backgroundColor: '#3F8DFD',
                    width: 35,
                  },
                ]}
              />
            ))}
          </View>
        </View> */}
      </View>
    </View>
  );
}

export default memo(ParentsHome);
