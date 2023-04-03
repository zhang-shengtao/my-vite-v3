<template>
  <div class="marketSort">
    <card-seacrh :cardSeacrhData="cardSeacrhData" :seacrh="seacrh" />
    <Table :tableHeader="tableHeader" :tableData="tableData" />
    <Pagination :seacrh="seacrh" :total="total" :callback="getMarketRanking" />
    <el-dialog v-model="dialog" title="市场排名设置" width="30%" draggable @close="close">
      <el-form :model="fromData" :rules="rules" ref="ruleFormRef" label-width="80px">
        <el-form-item label="姓名" prop="mk_id" v-if="!id">
          <el-select v-model="fromData.mk_id" placeholder="请选择所属市场">
            <el-option v-for="item in marketList" :key="item.id" :label="item.comp_name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="day" v-if="!id">
          <el-date-picker v-model="fromData.day" value-format="YYYY-MM" type="month" placeholder="请选择月份" />
        </el-form-item>
        <el-form-item label="分数">
          <el-input-number style="width: 220px" v-model="fromData.ranking" :precision="0" :step="1" :min="0" :max="100" />
        </el-form-item>
        <el-form-item label="排名" prop="score">
          <el-input-number style="width: 220px" v-model="fromData.score" :precision="0" :step="1" :min="0" :max="100" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="suBmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script setup name="marketSort">
import CardSeacrh from "@/components/CardSeacrh/index.vue";
import Table from "@/components/Table/index.vue";
import Pagination from "@/components/Pagination/index.vue";
import { marketRanking, postMarketRanking, putMarketRanking } from "@/api/market.js";
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
    placeholder: "请选择月份",
    type: "picker",
    vModel: "day",
    valueFormat: "YYYY-MM",
    clearable: true,
  },
  {
    text: "筛选",
    type: "btn",
    callback: getMarketRanking,
    size: "large",
  },
  {
    text: "新增",
    type: "btn",
    callback: () => (loading.value = true),
    size: "large",
  },
]);
const seacrh = reactive({
  page: 1,
  limit: 10,
  mk_id: "",
  day: "",
});
const tableHeader = reactive([
  {
    label: "排名",
    prop: (row) => row.ranking,
  },
  {
    label: "月份",
    prop: (row) => row.day,
  },
  {
    label: "市场名称",
    prop: (row) => row.market_information?.comp_name,
  },
  {
    label: "分数",
    prop: (row) => row.score,
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
const dialog = ref(false);
const fromData = reactive({
  mk_id: "",
  day: "",
  ranking: 1,
  score: 0,
});
const id = ref("");
const rules = {
  mk_id: { required: true, message: "请选择所属市场" },
  day: { required: true, message: "请选择时间" },
  score: { required: true, message: "请输入分数" },
};
function close() {
  fromData.mk_id = "";
  fromData.day = "";
  fromData.ranking = 1;
  fromData.score = 0;
  id.value = "";
  dialog.value = false;
}
function rowEdit(row) {
  id.value = row.id;
  fromData.ranking = row.ranking * 1;
  fromData.score = row.score * 1;
  delete fromData.mk_id;
  delete fromData.day;
  dialog.value = true;
}
const loading = ref(false);
const ruleFormRef = ref(null);
function suBmit() {
  loading.value = true;
  ruleFormRef.value.validate((vaild) => {
    if (vaild) {
      if (id.value) {
        putMarketRanking(fromData, id.value)
          .then((res) => {
            loading.value = false;
            ElMessage({ type: "success", message: res.data });
            close();
            getMarketRanking();
          })
          .catch((err) => {
            loading.value = false;
            ElMessage({ type: "error", message: err.msg });
          });
      } else {
        postMarketRanking(fromData)
          .then((res) => {
            loading.value = false;
            ElMessage({ type: "success", message: res.data });
            close();
            getMarketRanking();
          })
          .catch((err) => {
            loading.value = false;
            ElMessage({ type: "error", message: err.msg });
          });
      }
    } else {
      return false;
    }
  });
}

function getMarketRanking() {
  marketRanking(seacrh).then((res) => {
    tableData.value = res.data.data;
    total.value = res.data.total;
  });
}
onBeforeMount(() => {
  getMarketRanking();
});
</script>
<style lang="scss" scoped></style>
