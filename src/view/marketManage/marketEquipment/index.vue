<template>
  <div class="marketEquipment">
    <card-seacrh :cardSeacrhData="cardSeacrhData" :seacrh="seacrh" />
    <Table :tableHeader="tableHeader" :tableData="tableData" />
    <Pagination :seacrh="seacrh" :total="total" :callback="getUserService" />
    <el-dialog v-model="dialog" title="设备人员信息编辑" width="30%" draggable @close="close">
      <el-form :model="fromData" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="fromData.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="fromData.tel" placeholder="请输入电话号码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="suBmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script setup name="marketEquipment">
import CardSeacrh from "@/components/CardSeacrh/index.vue";
import Table from "@/components/Table/index.vue";
import Pagination from "@/components/Pagination/index.vue";
import { userService, putUserService } from "@/api/market.js";
import { useMarketList } from "@/hooks/useSundry.js";
const { marketList } = useMarketList();
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
    callback: getUserService,
    size: "large",
  },
]);
const seacrh = reactive({
  page: 1,
  limit: 10,
  mk_id: "",
});
const tableHeader = reactive([
  {
    label: "编号",
    prop: (row) => row.id,
  },
  {
    label: "设备名称",
    prop: (row) => row.sf_title,
  },
  {
    label: "设施负责人",
    prop: (row) => row.name,
  },
  {
    label: "负责人电话",
    prop: (row) => row.tel,
  },
  {
    label: "市场名称",
    prop: (row) => row.market_information?.comp_name,
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
function getUserService() {
  userService(seacrh).then((res) => {
    tableData.value = res.data.data;
    total.value = res.data.total;
  });
}
const dialog = ref(false);
const fromData = reactive({
  name: "",
  tel: "",
});
const rowID = ref("");
function rowEdit(row) {
  fromData.name = row.name;
  fromData.tel = row.tel;
  rowID.value = row.id;
  dialog.value = true;
}
function close() {
  fromData.name = "";
  fromData.tel = "";
  rowID.value = "";
  dialog.value = false;
}
const loading = ref(false);
function suBmit() {
  loading.value = true;
  putUserService(fromData, rowID.value)
    .then((res) => {
      close();
      loading.value = false;
      getUserService();
      ElMessage({
        type: "success",
        message: res.data,
      });
    })
    .catch((err) => {
      loading.value = false;
      ElMessage({
        type: "error",
        message: err.msg,
      });
    });
}

onBeforeMount(() => {
  getUserService();
});
</script>
<style lang="scss" scoped></style>
