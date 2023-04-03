import { ref, reactive, watch } from "vue";

import { getSearchMarket, marketManagePage, searchBoothYype, searchForms ,searchSegmentation} from "@/api/market.js";

const marketList = ref([]); // 市场列表
const useEducation = ref([]); // 文化程度数据
const marketStationSata = ref([]); // 岗位数据
const useSearchBoothYype = ref([]); // 摊位类型
const useSearchForms = ref([]); // 经营状态

export function useMarketList() {
  getSearchMarket().then((res) => {
    marketList.value = res.data;
  });

  // 市场列表数据 文化程度数据 岗位数据
  // marketManagePage().then((res) => {});

  searchBoothYype().then((res) => {
    useSearchBoothYype.value = res.data;
  });
  searchForms().then((res) => {
    useSearchForms.value = res.data;
  });

  return {
    marketList,
    useSearchBoothYype,
    useSearchForms,
  };
}
