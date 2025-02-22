// withHooks
import { memo } from "react";
import { useEffect, useRef, useState } from "react";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Linking,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Svg, { Circle } from "react-native-svg";
import { LibSlidingup } from "esoftplay/cache/lib/slidingup/import";
import { Feather } from "@expo/vector-icons";
import { LibNavigation } from "esoftplay/cache/lib/navigation/import";
import { LibStyle } from "esoftplay/cache/lib/style/import";
import { LibCurl } from "esoftplay/cache/lib/curl/import";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { LibList } from "esoftplay/cache/lib/list/import";
import useSafeState from "esoftplay/state";
import { LibProgress } from "esoftplay/cache/lib/progress/import";
import moment from "esoftplay/moment";
import CustomCard from "../components/custom_card";

export interface ChildDetailRaportArgs {}
export interface ChildDetailRaportProps {}

function m(props: ChildDetailRaportProps): any {
  let childDataRaport = LibNavigation.getArgsAll(props).childdetailraport;
  const allMonths = [
    {
      name: "Januari",
      abbreviation: "Jan",
      number: 1,
      days: 31,
    },
    {
      name: "Februari",
      abbreviation: "Feb",
      number: 2,
      days: 28,
    },
    {
      name: "Maret",
      abbreviation: "Mar",
      number: 3,
      days: 31,
    },
    {
      name: "April",
      abbreviation: "Apr",
      number: 4,
      days: 30,
    },
    {
      name: "Mei",
      abbreviation: "May",
      number: 5,
      days: 31,
    },
    {
      name: "Juni",
      abbreviation: "Jun",
      number: 6,
      days: 30,
    },
    {
      name: "Juli",
      abbreviation: "Jul",
      number: 7,
      days: 31,
    },
    {
      name: "Agustus",
      abbreviation: "Aug",
      number: 8,
      days: 31,
    },
    {
      name: "September",
      abbreviation: "Sep",
      number: 9,
      days: 30,
    },
    {
      name: "Oktober",
      abbreviation: "Oct",
      number: 10,
      days: 31,
    },
    {
      name: "November",
      abbreviation: "Nov",
      number: 11,
      days: 30,
    },
    {
      name: "Desember",
      abbreviation: "Dec",
      number: 12,
      days: 31,
    },
  ];

  const allWeeks = [
    {
      name: "Week 1",
      number: 1,
    },
    {
      name: "Week 2",
      number: 2,
    },
    {
      name: "Week 3",
      number: 3,
    },
    {
      name: "Week 4",
      number: 4,
    },
  ];

  const _allMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const allDays = [
    "senin",
    "selasa",
    "rabu",
    "kamis",
    "jumat",
    "sabtu",
    "ahad",
  ];

  const today = new Date();

  const [selectedMonth, setSelectedMonth] = useState(
    allMonths[today.getMonth()]
  );
  const [selectedWeek, setSelectedWeek] = useState(allWeeks[today.getMonth()]);
  const [SelectMonth, setSelectMonth] = useSafeState(
    _allMonth[today.getMonth()]
  );
  const [selectedDay, setSelectedDay] = useSafeState(
    allDays[today.getDay() - 1]
  );
  const [finalWeek, setFinalWeek] = useSafeState(0);
  function elevation(value: any) {
    if (Platform.OS === "ios") {
      if (value === 0) return {};
      return {
        shadowColor: "black",
        shadowOffset: { width: 0, height: value / 2 },
        shadowRadius: value,
        shadowOpacity: 0.24,
      };
    }
    return { elevation: value };
  }

  const R = 30;
  const Circle_length = 2 * Math.PI * R;

  const idclass: string = LibNavigation.getArgsAll(props).class_id;

  const idstudent: string = LibNavigation.getArgsAll(props).student_id;

  const getWeekNumber = () => {
    // Buat objek tanggal untuk tanggal hari ini
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);

    // Hitung selisih antara tanggal hari ini dengan tanggal 1 Januari
    const pastDays = (today.getTime() - firstDayOfYear.getTime()) / 86400000;

    // Ambil minggu keberapa dengan membagi selisih hari dengan 7
    return Math.ceil((pastDays + firstDayOfYear.getDay() + 1) / 7);
  };

  function getWeekInYear(
    year: number,
    month: number,
    weekInMonth: number
  ): number {
    // Mendapatkan tanggal pertama dalam bulan
    const firstDayOfMonth = new Date(year, month, 1);

    // Mendapatkan hari pertama dalam minggu pertama
    const firstWeekDay = firstDayOfMonth.getDay(); // Minggu dimulai dari hari ke-0 (Minggu)

    // Menghitung hari yang dibutuhkan untuk mencapai minggu yang dimaksud
    const daysToAdd = 7 * (weekInMonth - 1) - firstWeekDay;

    // Menciptakan tanggal pada minggu yang dimaksud
    const targetWeekDate = new Date(
      firstDayOfMonth.getTime() + daysToAdd * 86400000
    ); // 86400000 milidetik dalam sehari

    // Mendapatkan minggu keberapa dalam tahun itu jatuh
    const weekOfYear = Math.ceil(
      (targetWeekDate.getTime() - new Date(year, 0, 1).getTime()) / 604800000
    ); // 604800000 milidetik dalam seminggu

    return weekOfYear + 1;
  }

  const getWeekNumberInMonth = () => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const pastDays = today.getDate(); // Hari dalam bulan ini
    const firstDayOfWeek = firstDayOfMonth.getDay(); // Hari pertama dalam minggu pertama bulan ini
    const daysBeforeFirstSunday = (7 - firstDayOfWeek) % 7; // Hari sebelum Minggu pertama dimulai
    const daysFromFirstSunday = pastDays - daysBeforeFirstSunday; // Hari setelah Minggu pertama dimulai
    const weekNumberInMonth = Math.ceil(daysFromFirstSunday / 7 + 1); // Minggu keberapa dalam bulan ini

    return weekNumberInMonth;
  };

  // Gunakan fungsi getWeekNumberInMonth untuk mendapatkan minggu keberapa dalam bulan ini
  const weekNumberInMonth = getWeekNumberInMonth();

  const [SelectWeek, setSelectWeek] = useSafeState(weekNumberInMonth);

  const handlePress = (weeknum: number, weekke: number) => {
    setActiveWeek(weeknum === activeWeek ? null : weeknum);
    // console.log('weeknum', weeknum)
    // console.log('activeWeek', activeWeek)

    setSelectWeek(weeknum), setFinalWeek(weekke);
  };

  const getDay = (date: string) => {
    switch (date) {
      case "0":
        return "Minggu";
      case "1":
        return "Senin";
      case "2":
        return "Selasa";
      case "3":
        return "Rabu";
      case "4":
        return "Kamis";
      case "5":
        return "Jumat";
      case "6":
        return "Sabtu";
      default:
        return "Minggu";
    }
  };

  let slideup = useRef<LibSlidingup>(null);

  const [activeWeek, setActiveWeek] = useState<number | null>(null);

  const allTabs = ["Riwayat Absensi", "Jadwal Anak"];
  const [selectTab, setSelectTab] = useSafeState(allTabs[0]);

  const [StudentDetailAttendance, setStudentDetailAttendance] =
    useSafeState<any>([]);
  const [TeacherScheduleClass, setTeacherScheduleClass] = useSafeState<any>([]);

  const id: number = 1;

  let schedule = "schedule";
  // let filterSchedule = TeacherScheduleClass?.filter((item: any) => item.schedule == schedule)

  const filterApi = (month: number, week: number) => {
    // console.log('ini bulan ', month)

    new LibCurl(
      "student_detail_attendance?class_id=" +
        id +
        "&student_id=" +
        id +
        "&month=" +
        month +
        "&week=" +
        week,
      null,
      (result) => {
        // esp.log(result);
        setStudentDetailAttendance(result);
      },
      (err: any) => {
        console.log("error", err);
      },
      1
    );
  };

  function loadStudentDetailAttendance() {
    new LibCurl(
      "student_detail_attendance?class_id=" + id + "&student_id=" + id,
      null,
      (result) => {
        // esp.log(result);
        setStudentDetailAttendance(result);
      },
      (err: any) => {
        console.log("error", err);
      },
      1
    );
  }

  function loadTeacherScheduleClass() {
    new LibCurl(
      "teacher_schedule_class?class_id=" + id,
      null,
      (result) => {
        setTeacherScheduleClass(result);
      },
      (err: any) => {
        console.log("error", err);
      },
      1
    );
  }

  useEffect(() => {
    console.log(1);
    new LibCurl(
      "student_detail_attendance?class_id=" +
        id +
        "&student_id=" +
        id +
        "&month=" +
        selectedMonth,
      null,
      (result) => {
        setStudentDetailAttendance(result);
        console.log("student detail", result);
      },
      () => {
        // setEror(JSON.stringify(err))
        LibProgress.hide();
        setStudentDetailAttendance(null);
      }
    );

    console.log("child data", JSON.stringify(childDataRaport));
    loadStudentDetailAttendance();
    loadTeacherScheduleClass();
  }, []);

  const Tabs = () => {
    if (selectTab == allTabs[0]) {
      return (
        <View
          style={{
            paddingHorizontal: 20,
            alignItems: "flex-start",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ flexDirection: "row", flex: 1, height: 80 }}>
            <View
              style={{
                height: 80,
                flex: 1,
                alignItems: "center",
                backgroundColor: "#0DBD5E",
                justifyContent: "center",
                borderRadius: 10,
                marginHorizontal: 5,
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "#FFFFFF" }}
              >
                {StudentDetailAttendance?.attendance_data?.hadir}
              </Text>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "#FFFFFF" }}
              >
                Hadir
              </Text>
            </View>

            <View
              style={{
                height: 80,
                flex: 1,
                alignItems: "center",
                backgroundColor: "#F6C956",
                justifyContent: "center",
                borderRadius: 10,
                marginHorizontal: 5,
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "#FFFFFF" }}
              >
                {StudentDetailAttendance?.attendance_data?.sakit}
              </Text>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "#FFFFFF" }}
              >
                Sakit
              </Text>
            </View>

            <View
              style={{
                height: 80,
                flex: 1,
                alignItems: "center",
                backgroundColor: "#0083FD",
                justifyContent: "center",
                borderRadius: 10,
                marginHorizontal: 5,
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "#FFFFFF" }}
              >
                {StudentDetailAttendance?.attendance_data?.ijin}
              </Text>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "#FFFFFF" }}
              >
                Izin
              </Text>
            </View>

            <View
              style={{
                height: 80,
                flex: 1,
                alignItems: "center",
                backgroundColor: "#FF4343",
                justifyContent: "center",
                borderRadius: 10,
                marginHorizontal: 5,
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "#FFFFFF" }}
              >
                {StudentDetailAttendance?.attendance_data?.tidak_hadir}
              </Text>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "#FFFFFF" }}
              >
                Alfa
              </Text>
            </View>
          </View>
          <Pressable
            onPress={() => {
              slideup.current?.show();
            }}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              ...elevation(5),
              height: 60,
              padding: 10,
              flex: 1,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "500",
                color: "#000000",
                textAlign: "center",
                padding: 5,
              }}
            >
              {" "}
              {selectedMonth.name}, Minggu ke {activeWeek}
            </Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            />
            <Feather name="filter" size={20} color="#000000" />
          </Pressable>

          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
            Riwayat Absensi
          </Text>

          {StudentDetailAttendance?.schedule_day?.map?.((items: any) => {
            return (
              // <Pressable onPress={() => LibNavigation.navigate('teacher/detailattendreport')}>
              <View
                style={{
                  marginVertical: 10,
                  backgroundColor: "#0DBD5E",
                  borderRadius: 10,
                  ...elevation(4),
                  padding: 2,
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: LibStyle.width * 0.9 - 4,
                    height: LibStyle.height * 0.1 + 18,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        marginLeft: 10,
                        marginTop: 5,
                        fontSize: 22,
                        color: "#000000",
                      }}
                    >
                      {getDay(items?.day)}
                    </Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        marginTop: 35,
                        fontSize: 15,
                        color: "#000000",
                      }}
                    >
                      {moment(items.created_date).format("DD MMMM YYYY")}
                    </Text>
                  </View>

                  <View
                    style={{
                      height: 100,
                      width: 100,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Svg
                      width={100}
                      height={100}
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Circle
                        cx={100 / 2}
                        cy={100 / 2}
                        r={R}
                        fillOpacity={0.8}
                        stroke={"#96FDC6"}
                        strokeWidth={20}
                        fill={"none"}
                      />

                      <Circle
                        cx={100 / 2}
                        cy={100 / 2}
                        r={R}
                        fillOpacity={0.8}
                        stroke={"#0DBD5E"}
                        strokeWidth={12}
                        fill={"none"}
                        // fillOpacity={0.8}
                        strokeDasharray={`${Circle_length}`}
                        strokeDashoffset={Circle_length / 65}
                        strokeLinecap="round"
                      />
                    </Svg>

                    <Text style={{ position: "absolute", color: "#000000" }}>
                      8/8
                    </Text>
                  </View>
                </View>
              </View>
              // </Pressable>
            );
          })}
        </View>
      );
    } else {
      return (
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 5,
              marginHorizontal: 20,
            }}
          >
            Jadwal anak
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 10,
              marginBottom: 20,
              marginHorizontal: 20,
            }}
          >
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {allDays.map((day) => (
                <Pressable
                  key={day}
                  onPress={() => setSelectedDay(day)}
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginRight: 10,
                    height: 40,
                    borderRadius: 12,
                    borderWidth: 2,
                    width: "auto",
                    paddingHorizontal: 10,
                    alignItems: "center",
                    backgroundColor:
                      selectedDay === day ? "#4B7AD6" : "#FFFFFF",
                    borderColor: day ? "#4B7AD6" : "#4B7Ad6",
                    // padding: 10,
                    // backgroundColor: selectedDay === day ? '#4B7AD6' : '#AAAAAA',
                    // borderRadius: 5,
                    // marginRight: 10,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: selectedDay === day ? "#FFFFFF" : "#4B7AD6",
                      alignSelf: "center",
                    }}
                  >
                    {day}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <LibList
            data={TeacherScheduleClass?.schedules?.filter(
              (item: any) => item.day == selectedDay
            )}
            renderItem={(items) => {
              console.log(items);
              return (
                <View>
                  <LibList
                    data={items.schedule}
                    keyExtractor={(scheduleItem: any) =>
                      scheduleItem.schedule_id
                    }
                    renderItem={(item: any) => (
                      console.log("schedule", schedule),
                      (
                        <View
                          key={item.schedule_id}
                          style={{
                            marginBottom: 10,
                            backgroundColor: "#4B7AD6",
                            borderRadius: 10,
                            alignItems: "flex-end",
                            ...elevation(4),
                            flex: 1,
                            paddingLeft: 4,
                            padding: 2.5,
                            alignSelf: "center",
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              justifyContent: "space-between",
                              flexDirection: "row",
                              overflow: "hidden",
                              width: LibStyle.width * 0.9 - 5,
                              height: LibStyle.height * 0.1 + 18,
                              backgroundColor: "#FFFFFF",
                              borderRadius: 10,
                            }}
                          >
                            <View style={{ flexDirection: "row" }}>
                              <View
                                style={{
                                  justifyContent: "center",
                                  alignItems: "flex-start",
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 60,
                                    color: "#4B7AD6",
                                    marginLeft: -18,
                                  }}
                                >
                                  00
                                </Text>
                              </View>

                              <View
                                style={{
                                  height: "auto",
                                  width: 2,
                                  backgroundColor: "#4B7AD6",
                                  opacity: 0.4,
                                }}
                              />

                              <View>
                                <Text
                                  style={{
                                    marginLeft: 10,
                                    marginBottom: 35,
                                    fontSize: 22,
                                    color: "#4B7AD6",
                                  }}
                                >
                                  {item.course.name.toUpperCase()}
                                </Text>
                                <Text
                                  style={{
                                    marginLeft: 10,
                                    marginBottom: 35,
                                    fontSize: 15,
                                    color: "#4B7AD6",
                                  }}
                                >
                                  {item.clock_start} - {item.clock_end}
                                </Text>
                              </View>
                            </View>

                            <MaterialIcons
                              name="library-books"
                              size={100}
                              color="#B7CAEF"
                              style={{ marginRight: -20, marginTop: 10 }}
                            />
                          </View>
                        </View>
                      )
                    )}
                  />
                </View>
              );
            }}
          />
        </View>
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#4B7AD6",
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            padding: 20,
            paddingTop: 40,
          }}
        >
          <View
            style={{
              backgroundColor: "#FFFFFF",
              height: 120,
              justifyContent: "flex-start",
              alignItems: "center",
              marginVertical: 20,
              padding: 15,
              flexDirection: "row",
              borderRadius: 10,
            }}
          >
            {/* <Image source={require('../../assets/anies.png')} style={{ width: 95, height: 95, justifyContent: 'center' }} /> */}

            <View
              style={{
                marginLeft: 15,
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: 19,
                  color: "#000000",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                Nama: {childDataRaport?.student_name}
              </Text>
              <Text
                style={{
                  fontSize: 19,
                  color: "#000000",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                Kelas: {childDataRaport?.class_name}
              </Text>
              <Text
                style={{
                  fontSize: 19,
                  color: "#000000",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                NIS: {childDataRaport?.nis}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginLeft: 15, marginTop: 15 }}>
          <Text style={{ fontSize: 20, color: "#000000", fontWeight: "600" }}>
            Raport
          </Text>
        </View>
        <CustomCard
          number="1"
          title="10 PPLG 1"
          subtitle="Semester 1"
          childDetailRaport={childDataRaport}
        />
        <CustomCard
          number="2"
          title="10 PPLG 2"
          subtitle="Semester 2"
          childDetailRaport={childDataRaport}
        />
        <CustomCard
          number="3"
          title="11 PPLG 1"
          subtitle="Semester 1"
          childDetailRaport={childDataRaport}
        />
        <CustomCard
          number="4"
          title="11 PPLG 2"
          subtitle="Semester 2"
          childDetailRaport={childDataRaport}
        />
      </ScrollView>

      <LibSlidingup ref={slideup}>
        <View
          style={{
            height: 410,
            backgroundColor: "white",
            padding: 10,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              slideup.current?.hide();
            }}
            style={{ alignItems: "flex-end" }}
          >
            <Feather name="x" size={35} color={"#000000"} />
          </TouchableOpacity>

          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "black",
                marginTop: 10,
                alignSelf: "center",
              }}
            >
              Filter Kehadiran
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: "black",
                marginTop: 20,
              }}
            >
              Pilih Bulan
            </Text>
          </View>

          <FlatList
            data={allMonths}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            contentContainerStyle={{ marginTop: 10, height: 60 }}
            ListHeaderComponent={<View></View>}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <Pressable
                  onPress={() => {
                    setSelectedMonth(item);
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      marginRight: 10,
                      height: 40,
                      borderRadius: 12,
                      borderWidth: 2,
                      width: "auto",
                      paddingHorizontal: 10,
                      alignItems: "center",
                      backgroundColor:
                        item?.name == selectedMonth?.name
                          ? "#4B7AD6"
                          : "#FFFFFF",
                      borderColor:
                        item?.name == selectedMonth?.name
                          ? "#4B7AD6"
                          : "#4B7AD6",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color:
                          item?.name == selectedMonth?.name
                            ? "#FFFFFF"
                            : "#4B7AD6",
                        alignSelf: "center",
                      }}
                    >
                      {item["name"]}
                    </Text>
                    <View style={{ height: 30 }} />
                  </View>
                </Pressable>
              );
            }}
          />

          <View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: "#000000",
                marginTop: 5,
              }}
            >
              Pilih Minggu
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  width: "100%",
                  height: 45,
                  flexDirection: "row",
                  justifyContent: "center",
                  paddingHorizontal: 20,
                }}
              >
                <Pressable
                  onPress={() => {
                    handlePress(1, 0);
                  }}
                  style={{
                    width: "25%",
                    height: 40,
                    backgroundColor: 1 == activeWeek ? "#4B7AD6" : "white",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignContent: "center",
                    marginHorizontal: 5,
                    borderColor: 1 == activeWeek ? "#FFFFFF" : "#4B7AD6",
                    borderWidth: 2,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: 1 == activeWeek ? "#FFFFFF" : "#4B7AD6",
                      textAlign: "center",
                    }}
                  >
                    Minggu 1
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    handlePress(2, 0);
                  }}
                  style={{
                    width: "25%",
                    height: 40,
                    backgroundColor: 2 == activeWeek ? "#4B7AD6" : "white",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignContent: "center",
                    marginHorizontal: 5,
                    borderColor: 2 == activeWeek ? "#FFFFFF" : "#4B7AD6",
                    borderWidth: 2,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: 2 == activeWeek ? "#FFFFFF" : "#4B7AD6",
                      textAlign: "center",
                    }}
                  >
                    Minggu 2
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    handlePress(3, 0);
                  }}
                  style={{
                    width: "25%",
                    height: 40,
                    backgroundColor: 3 == activeWeek ? "#4B7AD6" : "white",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignContent: "center",
                    marginHorizontal: 5,
                    borderColor: 3 == activeWeek ? "#FFFFFF" : "#4B7AD6",
                    borderWidth: 2,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: 3 == activeWeek ? "#FFFFFF" : "#4B7AD6",
                      textAlign: "center",
                    }}
                  >
                    Minggu 3
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    handlePress(4, 0);
                  }}
                  style={{
                    width: "25%",
                    height: 40,
                    backgroundColor: 4 == activeWeek ? "#4B7AD6" : "white",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignContent: "center",
                    marginHorizontal: 5,
                    borderColor: 4 == activeWeek ? "#FFFFFF" : "#4B7AD6",
                    borderWidth: 2,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: 4 == activeWeek ? "#FFFFFF" : "#4B7AD6",
                      textAlign: "center",
                    }}
                  >
                    Minggu 4
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>

          <TouchableOpacity
            onPress={() => {
              slideup.current?.hide();

              const year = 2024;
              const month = SelectMonth - 1; // Januari (index dimulai dari 0)
              const weekInMonth = SelectWeek; // Minggu kedua dalam bulan
              // console.log('select week', SelectWeek)
              let weekInYear = getWeekInYear(year, month, weekInMonth);

              filterApi(selectedMonth?.number, weekInYear);
            }}
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "#4B7AD6",
              borderRadius: 10,
              justifyContent: "center",
              alignContent: "center",
              marginTop: 35,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
              }}
            >
              Terapkan
            </Text>
          </TouchableOpacity>
        </View>
      </LibSlidingup>
    </View>
  );
}

{
  /* <View key={index} style={{ marginBottom: 10, backgroundColor: '#4B7AD6', borderRadius: 10, alignItems: 'flex-end', ...elevation(4), width: 350, padding: 2 }}>
<View style={{width: 340, height: 100, backgroundColor: '#FFFFFF', ...elevation(4), borderRadius: 10 }}>
 
  
  
  <View style={{ marginTop: -15, justifyContent: 'center', alignItems: 'flex-start'  }}>
  <Text style={{ fontSize: 60, color:'#4B7AD6' }}>00</Text>
  </View>

  <View style={{}}>
  <Text style={{fontSize: 22, color: '#4B7AD6' }}>{event}</Text>
  <Text style={{ fontSize: 15, color: '#4B7AD6' }}>00:00 - 00:00</Text>
  </View>

  <View style={{ alignSelf: 'flex-end', marginTop: -90}}>
    <MaterialIcons name='library-books' size={100} color='#B7CAEF' />
  </View>

</View>
</View> */
}

export default memo(m);
