<template>
  <div>
    <card-seacrh :cardSeacrhData="cardSeacrhData" :seacrh="seacrh" />
    <Table :tableHeader="tableHeader" :tableData="tableData" />
    <Pagination :seacrh="seacrh" :total="total" :callback="getMarketSegmentationList" />
    <el-dialog v-model="dialog" title="分区设置" width="30%" draggable @close="close">
      <el-form :model="fromData" label-width="80px">
        <el-form-item label="市场名称">
          <el-select v-model="fromData.mk_id" placeholder="请选择市场">
            <el-option v-for="item in marketList" :key="item.id" :label="item.comp_name" :value="item.id"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分区名称">
          <el-input v-model="fromData.segmentation_title" placeholder="请输入分区名称" />
        </el-form-item>
        <el-form-item label="摊位数量">
          <el-input-number v-model="fromData.booth_number" :precision="0" :step="1" :min="1" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="suBmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script setup>
import CardSeacrh from "@/components/CardSeacrh/index.vue";
import Table from "@/components/Table/index.vue";
import Pagination from "@/components/Pagination/index.vue";
import { useMarketList } from "@/hooks/useSundry.js";
import { marketSegmentationList, marketSegmentationSubmit } from "@/api/market.js";
const { marketList } = useMarketList();
const seacrh = reactive({
  page: 1,
  limit: 20,
  mk_id: "",
});
const cardSeacrhData = reactive([
  {
    placeholder: "请选择市场",
    option: marketList,
    type: "select",
    vModel: "mk_id",
    itemLabel: "comp_name",
    itemValue: "id",
    clearable: true,
  },
  {
    text: "筛选",
    type: "btn",
    callback: getMarketSegmentationList,
    size: "large",
  },
  {
    text: "新增",
    type: "btn",
    callback: () => (dialog.value = true),
    size: "large",
  },
]);
const tableHeader = reactive([
  {
    label: "市场ID",
    prop: (row) => row.id,
  },
  {
    label: "市场名称",
    prop: (row) => row.comp_name,
  },
  {
    label: "市场分区",
    prop: (row) => row.segmentation_title,
  },
  {
    label: "摊位数量",
    prop: (row) => row.booth_number,
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
]);
const tableData = ref([]);
const total = ref(0);
function getMarketSegmentationList() {
  marketSegmentationList(seacrh).then((res) => {
    tableData.value = res.data.data;
    total.value = res.data.total;
  });
}

const dialog = ref(false);
const fromData = reactive({
  mk_id: "",
  segmentation_title: "",
  booth_number: 1,
});

function suBmit() {
  marketSegmentationSubmit(fromData)
    .then((res) => {
      close();
      getMarketSegmentationList();
      ElMessage({
        type: "success",
        message: res.data,
      });
    })
    .catch((err) => {
      ElMessage({
        type: "error",
        message: err.msg,
      });
    });
}

function close() {
  fromData.mk_id = "";
  fromData.segmentation_title = "";
  fromData.booth_number = 1;
  delete fromData.id;
  dialog.value = false;
}

function rowEdit(row) {
  marketList.value.forEach((item) => {
    if (item.comp_name == row.comp_name) {
      fromData.mk_id = item.id;
    }
  });
  fromData.segmentation_title = row.segmentation_title;
  fromData.booth_number = row.booth_number;
  fromData.id = row.id;
  dialog.value = true;
}
onMounted(() => {
  getMarketSegmentationList();
});
</script>
<style lang="scss" scoped></style>
