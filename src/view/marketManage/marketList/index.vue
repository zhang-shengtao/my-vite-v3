<template>
  <div class="marketList">
    <card-seacrh :cardSeacrhData="cardSeacrhData" :seacrh="seacrh" />
    <Table :tableHeader="tableHeader" :tableData="tableData" />
    <Pagination :seacrh="seacrh" :total="total" page="page" limit="limit" :callback="getMarketList" />
  </div>
</template>
<script setup name="marketList">
import Table from "@/components/Table/index.vue";
import CardSeacrh from "@/components/CardSeacrh/index.vue";
import Pagination from "@/components/Pagination/index.vue";
import { provinceCityArea, marketType, searchMarket, marketList } from "@/api/market";
const router = useRouter();
const seacrh = reactive({
  page: 1, // 页码
  limit: 10, // 条数 默认10
  mk_id: "", // 市场id
  provinceids: "",
  province_id: "", // 城市id
  market_operation_type: "", // 市场经营类型
});
const total = ref(0);
const cardSeacrhData = reactive([
  {
    placeholder: "请选择省份",
    option: [],
    type: "select",
    vModel: "provinceids",
    change: getProvinceCityArea,
    itemLabel: "name",
    itemValue: "id",
    clearable: false,
  },
  {},
  {
    placeholder: "请选择经营类型",
    option: [],
    type: "select",
    vModel: "market_operation_type",
    itemLabel: "operation_title",
    clearable: true,
  },
  {
    placeholder: "请选择市场",
    option: [],
    type: "select",
    vModel: "mk_id",
    itemLabel: "comp_name",
    clearable: true,
  },
  {
    text: "筛选",
    type: "btn",
    callback: getMarketList,
    size: "large",
  },
  {
    text: "新增",
    type: "btn",
    callback: rowEdit,
    size: "large",
  },
]);
const tableHeader = [
  {
    label: "市场编号",
    prop: (row) => row.comp_id,
  },
  {
    label: "市场名称",
    prop: (row) => row.comp_name,
  },
  {
    label: "地址",
    prop: (row) => row.addr,
  },
  {
    label: "负责人",
    prop: (row) => row.manage_personnels,
  },
  {
    label: "商户数",
    prop: (row) => row.merchant,
  },
  {
    label: "摊位",
    prop: (row) => row.booth,
  },
  {
    label: "营业时间",
    prop: (row) => row.business_start,
  },
  {
    label: "经营类型",
    prop: (row) => row.operation_title,
  },
  {
    label: "市场等级",
    prop: (row) => row.market_credit_level,
  },
  {
    type: "tag",
    label: "操作",
    tag: [
      {
        label: "编辑",
        callback: rowEdit,
      },
    ],
  },
];
const tableData = ref([]);

function rowEdit(row) {
  let id = "";
  if (Object.prototype.toString.call(row).slice(1, -8) === "object") {
    id = row.id;
  }
  router.push({
    path: id ? "/indexFrom/" + id : "/indexFrom",
  });
}

// 省份城市
function getProvinceCityArea(id = "") {
  provinceCityArea(id).then((res) => {
    if (!id) {
      cardSeacrhData[0].option.push(...res.data);
    } else {
      seacrh.province_id = "";
      const obj = {
        placeholder: "请选择城市",
        option: res.data.children,
        vModel: "province_id",
        type: "select",
        itemLabel: "name",
        itemValue: "id",
        clearable: true,
      };
      cardSeacrhData[1] = obj;
    }
  });
}
// 市场经营类型
function getMarketType() {
  marketType().then((res) => {
    cardSeacrhData[2].option = res.data;
  });
}
function getSearchMarket() {
  searchMarket().then((res) => {
    cardSeacrhData[3].option = res.data;
  });
}
function getMarketList() {
  marketList(seacrh).then((res) => {
    tableData.value = res.data.data;
    total.value = res.data.total;
  });
}

onMounted(() => {
  getProvinceCityArea();
  getMarketType();
  getSearchMarket();
  getMarketList();
});
</script>
<style lang="scss" scoped></style>
