import { ref, reactive, watch } from "vue";
import { provinceCityArea } from "@/api/market";

const useProvince = ref([]);
const useCity = ref([]);
const useCounty = ref([]);
const useRue = ref([]);

// province_id: "", // 省
//   city_id: "", // 城市
//   area_id: "", // 隶属行政区划及代码
//   street_id: "", // 街道
export default function (Object, province_id, city_id, area_id, street_id) {
  // 省
  provinceCityArea().then((res) => {
    useProvince.value = res.data;
    useCity.value = [];
    useCounty.value = [];
    useRue.value = [];
    if (city_id) Object[city_id] = "";
    if (area_id) Object[area_id] = "";
    if (street_id) Object[street_id] = "";
  });
  // 城市
  function useGetCityArea(id) {
    if (province_id) Object[province_id] = id;
    useCity.value = [];
    useCounty.value = [];
    useRue.value = [];
    if (city_id) Object[city_id] = "";
    if (area_id) Object[area_id] = "";
    if (street_id) Object[street_id] = "";
    provinceCityArea(id).then((res) => {
      useCity.value = res.data.children;
    });
  }
  // 区县
  function useGetArea(id) {
    if (city_id) Object[city_id] = id;
    useCounty.value = [];
    useRue.value = [];
    if (area_id) Object[area_id] = "";
    if (street_id) Object[street_id] = "";
    provinceCityArea(id).then((res) => {
      useCounty.value = res.data.children;
    });
  }
  // 街道
  function useGetRue(id) {
    if (area_id) Object[area_id] = id;
    useRue.value = [];
    if (street_id) Object[street_id] = "";
    provinceCityArea(id).then((res) => {
      useRue.value = res.data.children;
    });
  }

  return {
    useGetCityArea,
    useGetArea,
    useGetRue,
    useProvince,
    useCity,
    useCounty,
    useRue,
  };
}

// 省
export function getCityArea(id) {
  CityArea(id).then((res) => {
    city.push(...res.data);
  });
  return province;
}
