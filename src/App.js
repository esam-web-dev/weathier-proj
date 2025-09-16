import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Typography } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";

import { useEffect } from "react";
import { useState } from "react";
//
import { useSelector, useDispatch } from "react-redux";
// import { changeResult } from "./weatherApiSlice";
//
import { featchWeather } from "./weatherApiSlice";
//
//
import CircularProgress from "@mui/material/CircularProgress";
//
// import axios from "axios";
import moment from "moment/moment";
import "moment/min/locales"; // مشان جيب اللغة العربية للتاريخ
import { useTranslation } from "react-i18next"; // هي مكتبة لحالة مشان ترجمة
moment.locale("ar"); // طبق عربي

//

const themeCreate = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});

function App() {
  // Redux
  let dispatch = useDispatch();
  //
  let temp = useSelector((state) => {
    return state.weather.weatherObj;
  });
  // console.log("temp:");
  // console.log(temp);
  //
  let isLoading = useSelector((state) => {
    // console.log("the State Is", state.weather.result);
    return state.weather.isLoading;
  });

  //
  let { t, i18n } = useTranslation();
  //
  let [language, setLanguage] = useState("ar");
  //
  let [DateAndTime, setDateAndTime] = useState("");
  // let [temp, setTempValue] = useState({
  //   number: null,
  //   discription: "",
  //   min: null,
  //   max: null,
  // });

  // == == //

  function handleLanClicked() {
    if (language == "ar") {
      setLanguage("en");
      i18n.changeLanguage("en");
      moment.locale("en"); // هي مشان تاريخ يصير بل انجليزي
    } else {
      setLanguage("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    }
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a")); // هون مشان ياخد تاريخ بلغتو لجديدة
  }

  // == == //

  useEffect(() => {
    // try redux //
    // dispatch(changeResult());
    dispatch(featchWeather());

    i18n.changeLanguage(language); // تغيير اللغة للعربية تلقائيا عند فتح صفحة لمرة واحدة
  }, []);

  useEffect(() => {
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));

    /////////////////////////////////////
    //  // 1. أنشئ AbortController
    //   const controller = new AbortController();

    //   // 2. اطلب الـ API
    //   axios
    //     .get(
    //       "https://api.openweathermap.org/data/2.5/weather?lat=34.8021&lon=38.9968&appid=d20a6da85f4be8866a6224420b5aa1bc&units=metric"
    //       // ,
    //       // { signal: controller.signal } // تمرير إشارة الإلغاء
    //     )
    //     .then((res) => {
    //       temp = Math.round(res.data.main.temp);
    //       let tempMax = res.data.main.temp_max;
    //       let tempMin = res.data.main.temp_min;
    //       let dis = res.data.weather[0].description;
    //       let resIcon = res.data.weather[0].icon;
    //       setTempValue({
    //         number: temp,
    //         discription: dis,
    //         min: tempMin,
    //         max: tempMax,
    //         icon: `https://openweathermap.org/img/wn/${resIcon}@2x.png`,
    //       });
    //     })
    //     .catch((err) => {
    //       if (err.code === "ERR_CANCELED") {
    //         console.log("✅ الطلب اتلغى");
    //       } else {
    //         console.error("❌ صار خطأ:", err);
    //       }
    //     });

    //   // 3. cleanup → إلغاء الطلب عند الخروج أو إعادة التشغيل
    //   return () => {
    //     console.log("إلغاء الطلب...");
    //     controller.abort(); // هاد مشان يقطعلك الطلب
    //   };
  }, []); // [] يعني رح يشتغل مرة واحدة فقط عند mount

  return (
    <div className="App">
      <ThemeProvider theme={themeCreate}>
        <Container maxWidth="sm">
          {/* Start Container Card */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            {/* Start Card */}
            <div
              dir={language == "ar" ? "rtl" : "ltr"}
              style={{
                backgroundColor: "rgb(28 52 91 / 36%)",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0 11px 1px rgba(0,0,0,0.05)",
                width: "100%",
              }}
            >
              {/* Start Content */}
              <div>
                {/* Start City & Time */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "Start",
                    alignItems: "end",
                  }}
                  dir={language == "ar" ? "rtl" : "ltr"}
                >
                  <Typography
                    variant="h2"
                    sx={{ marginRight: "20px", fontWeight: "600" }}
                  >
                    {t("Syria")}
                  </Typography>
                  <Typography variant="h5" sx={{ marginRight: "20px" }}>
                    {DateAndTime}
                  </Typography>
                </div>
                {/* End City & Time */}
                <hr />

                {/* Start Dgree & Discrep */}
                <div>
                  {/* Start Temp */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <img src={temp.Icon}></img>
                      {isLoading ? (
                        <CircularProgress style={{ color: "white" }} />
                      ) : (
                        ""
                      )}
                      <Typography variant="h1" sx={{ textAlign: "right" }}>
                        {temp.temp} cْ
                      </Typography>
                    </div>
                    {/* Start Image Temp */}
                    <CloudIcon
                      style={{ fontSize: "200px", color: "white" }}
                    ></CloudIcon>
                    {/* End Image Temp */}
                  </div>

                  {/* End Temp */}
                  <Typography variant="h6">{temp.discription}</Typography>
                  {/* Start Min & Max */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h5 style={{ flex: "1" }}>
                      {t("Min")}: {temp.tempMin}
                    </h5>
                    <h5>|</h5>
                    <h5 style={{ flex: "1" }}>
                      {t("Max")} : {temp.tempMax}
                    </h5>
                  </div>
                  {/* End Min & Max */}
                </div>
                {/* End Dgree & Discrep */}
              </div>
              {/* End Content */}
            </div>
            {/* End Card */}
            {/* Start Button Translate */}
            <Button
              variant="text"
              sx={{
                display: "block",
                width: "100%",
                textAlign: "left",
                color: "white",
                marginTop: "20px",
                backgroundColor: "rgb(28 52 91 / 25%)",
              }}
              onClick={handleLanClicked}
            >
              {language == "en" ? "عربي" : "انجليزي"}
            </Button>
            {/* End Button Translate */}
          </div>
          {/* End Container Card */}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
