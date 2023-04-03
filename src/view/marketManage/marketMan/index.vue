<template>
  <div class="marketMan">
    <card-seacrh :cardSeacrhData="cardSeacrhData" :seacrh="seacrh" />
    <Table :tableHeader="tableHeader" :tableData="tableData" />
    <Pagination :seacrh="seacrh" :total="total" :callback="getMarketManageList" />
    <el-dialog v-model="dialog" title="管理人员设置" width="35%" draggable @close="close">
      <el-form :model="fromData" ref="ruleFormRef" :rules="rules" label-width="80px">
        <el-space wrap>
          <el-form-item label="所属市场" prop="mk_id">
            <el-select v-model="fromData.mk_id" placeholder="请选择所属市场">
              <el-option v-for="item in marketList" :key="item.id" :label="item.comp_name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="管理名称" prop="name">
            <el-input style="width: 220px" v-model="fromData.name" placeholder="请输入管理人员名称" />
          </el-form-item>
          <el-form-item label="所属岗位" prop="station_status">
            <el-select v-model="fromData.station_status" placeholder="请选择所属市场">
              <el-option v-for="item in station" :key="item.id" :label="item.station_title" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="联系电话" prop="tel">
            <el-input style="width: 220px" maxlength="11" v-model.number="fromData.tel" placeholder="请输入联系电话" />
          </el-form-item>
          <el-form-item label="文化程度" prop="education_status">
            <el-select v-model="fromData.education_status" placeholder="请选择文化程度">
              <el-option label="小学" :value="1" />
              <el-option label="中学" :value="2" />
              <el-option label="高学" :value="3" />
              <el-option label="大专" :value="4" />
              <el-option label="本科" :value="5" />
            </el-select>
          </el-form-item>
          <el-form-item label="管理年龄" prop="age">
            <el-input-number style="width: 220px" v-model="fromData.age" :precision="0" :step="1" :min="1" :max="100" />
          </el-form-item>
          <el-form-item label="证照" prop="license">
            <div style="width: 220px">
              <Upload v-model="fromData.license" />
            </div>
          </el-form-item>
          <el-form-item label="管理头像" prop="icon">
            <Upload v-model="fromData.icon" />
          </el-form-item>
          <el-form-item label="性别">
            <div style="width: 220px">
              <el-radio-group v-model="fromData.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loading" @click="suBmit">提交</el-button>
          </el-form-item>
        </el-space>
      </el-form>
    </el-dialog>
  </div>
</template>
<script setup name="marketMan">
import CardSeacrh from "@/components/CardSeacrh/index.vue";
import Table from "@/components/Table/index.vue";
import Pagination from "@/components/Pagination/index.vue";
import Upload from "@/components/Upload/index.vue";
import { useMarketList } from "@/hooks/useSundry.js";
const { marketList } = useMarketList();
import { searchStation, marketManageList, marketManageAdd, marketManageModify, marketManageUpdate } from "@/api/market.js";
const station = ref([]);
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
    placeholder: "请选择岗位",
    option: station,
    type: "select",
    vModel: "station_status",
    itemLabel: "station_title",
    itemValue: "id",
    clearable: true,
  },
  {
    placeholder: "关键词搜索(姓名或电话)",
    type: "input",
    vModel: "search",
    clearable: true,
  },
  {
    text: "筛选",
    type: "btn",
    callback: getMarketManageList,
    size: "large",
  },
  {
    text: "新增",
    type: "btn",
    callback: () => (dialog.value = true),
    size: "large",
  },
]);
searchStation().then((res) => {
  station.value = res.data;
});
const seacrh = reactive({
  page: 1,
  limit: 10,
  mk_id: "",
  station_status: "",
  search: "",
});
const tableHeader = reactive([
  {
    label: "所属市场",
    prop: (row) => row.comp_name,
  },
  {
    label: "姓名",
    prop: (row) => row.name,
  },
  {
    type: "img",
    label: "免冠头像",
    prop: (row) => row.icon,
  },
  {
    label: "岗位",
    prop: (row) => row.station_title,
  },
  {
    label: "手机号",
    prop: (row) => row.tel,
  },
  {
    type: "img",
    label: "证照",
    prop: (row) => row.license,
  },
  {
    label: "性别",
    prop: (row) => (row.sex == 1 ? "男" : "女"),
  },
  {
    label: "年龄",
    prop: (row) => row.age,
  },
  {
    label: "文化程度",
    prop: (row) => row.education_title,
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
const fromData = reactive({
  mk_id: "", // 市场对应的id
  name: "", // 管理人员名称
  icon: "", // 管理人员头像
  station_status: "", // 岗位,对应id
  license: "", // 证照
  tel: "", // 联系电话
  sex: 1, // 性别：1为男，2为女
  education_status: "", // 文化程度：对应id
  age: 1, // 年龄
});
const rules = {
  mk_id: { required: true, message: "请选择所属市场", trigger: "blur" },
  name: { required: true, message: "请输入管理人员名称", trigger: "blur" },
  icon: { required: true, message: "请上传管理人员头像", trigger: "blur" },
  station_status: { required: true, message: "请选择岗位", trigger: "blur" },
  license: { required: true, message: "请上传证照", trigger: "blur" },
  tel: {
    validator: (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号码"));
      } else {
        const rgx = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (rgx.test(fromData.tel)) {
          callback();
        } else {
          callback(new Error("请输入正确的手机号码"));
        }
      }
    },
    trigger: "blur",
    required: true,
  },
  education_status: { required: true, message: "请选择文化程度", trigger: "blur" },
};

const dialog = ref(false);
function rowEdit(row) {
  marketManageModify({ id: row.id }).then((res) => {
    const rowData = res.data.manage_data;
    fromData.mk_id = rowData.mk_id; // 市场对应的id
    fromData.name = rowData.name; // 管理人员名称
    fromData.icon = rowData.icon; // 管理人员头像
    fromData.station_status = rowData.station_status; // 岗位,对应id
    fromData.license = rowData.license; // 证照
    fromData.tel = rowData.tel; // 联系电话
    fromData.sex = rowData.sex; // 性别：1为男，2为女
    fromData.education_status = rowData.education_status; // 文化程度：对应id
    fromData.age = rowData.age * 1; // 年龄
    fromData.id = row.id;
    dialog.value = true;
  });
}
function close() {
  fromData.mk_id = ""; // 市场对应的id
  fromData.name = ""; // 管理人员名称
  fromData.icon = ""; // 管理人员头像
  fromData.station_status = ""; // 岗位,对应id
  fromData.license = ""; // 证照
  fromData.tel = ""; // 联系电话
  fromData.sex = 1; // 性别：1为男，2为女
  fromData.education_status = ""; // 文化程度：对应id
  fromData.age = 1; // 年龄
  dialog.value = false;
  delete fromData.id;
}
const loading = ref(false);
const ruleFormRef = ref(null);
function suBmit() {
  loading.value = true;
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      if (fromData.id) {
        marketManageUpdate(fromData)
          .then((res) => {
            loading.value = false;
            ElMessage({ type: "success", message: res.data });
            close();
            getMarketManageList();
          })
          .catch((err) => {
            loading.value = false;
            ElMessage({ type: "error", message: err.msg });
          });
      } else {
        marketManageAdd(fromData)
          .then((res) => {
            loading.value = false;
            ElMessage({ type: "success", message: res.data });
            close();
            getMarketManageList();
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

function getMarketManageList() {
  marketManageList(seacrh).then((res) => {
    tableData.value = res.data.data;
    total.value = res.data.total;
  });
}
onMounted(() => {
  getMarketManageList();
});
</script>
<style lang="scss" scoped></style>
