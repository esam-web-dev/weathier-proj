import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// تعريف الثنك فنكشن
export let featchWeather = createAsyncThunk(
  "weatherApi/fetchWeather",
  async () => {
    // البرميتر الاول هوة يلي رح يظهر بريديوسر بل براوزر
    const res = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=34.8021&lon=38.9968&appid=d20a6da85f4be8866a6224420b5aa1bc&units=metric"
    );

    let temp = Math.round(res.data.main.temp);
    let tempMax = res.data.main.temp_max;
    let tempMin = res.data.main.temp_min;
    let dis = res.data.weather[0].description;
    let resIcon = res.data.weather[0].icon;

    console.log(res);

    return {
      temp,
      tempMax,
      tempMin,
      dis,
      Icon: `https://openweathermap.org/img/wn/${resIcon}@2x.png`,
    };
  }
);

let weatherApiSlice = createSlice({
  name: "weatherApi",

  initialState: {
    weatherObj: {},
    isLoading: false,
  },

  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(featchWeather.pending, (currentstate, action) => {
        currentstate.isLoading = true;
      })
      .addCase(featchWeather.fulfilled, (currentstate, action) => {
        currentstate.isLoading = false;
        // من هون تم ارسال الاكشن المعبئ بل بي لوود
        currentstate.weatherObj = action.payload; // الميتاشين مسموح هون فقط
        // هون يعتبر انو ريدوسر اخد ل اكشن ولستيت عهوا لمخطط
      })
      .addCase(featchWeather.rejected, (currentstate, action) => {
        currentstate.isLoading = false;
      });
  },
});

export const { changeResult } = weatherApiSlice.actions;
export default weatherApiSlice.reducer;
