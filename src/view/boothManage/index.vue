<template>
  <div class="boothManage">
    <card-seacrh :cardSeacrhData="cardSeacrhData" :seacrh="seacrh" />
    <Table :tableHeader="tableHeader" :tableData="tableData" />
    <Pagination :seacrh="seacrh" :total="total" :callback="getBoothList" />
    <el-dialog v-model="dialog" title="管理人员设置" width="35%" draggable @close="close">
      <el-form :model="fromData" ref="ruleFormRef" :rules="rules" label-width="80px">
        <el-space wrap>
          <el-form-item label="所属市场" prop="mk_id">
            <el-select v-model="fromData.mk_id" placeholder="请选择所属市场" @change="getsearchSegmentation">
              <el-option v-for="item in marketList" :key="item.id" :label="item.comp_name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="所属分类" prop="seg_id">
            <el-select v-model="fromData.seg_id" placeholder="请选择所属分类">
              <el-option v-for="item in searchSegmentationArr" :key="item.id" :label="item.segmentation_title" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="经营状态" prop="management_forms">
            <el-select v-model="fromData.management_forms" placeholder="请选择经营状态">
              <el-option v-for="item in useSearchForms" :key="item.id" :label="item.mf_title" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="摊位类型" prop="booth_type">
            <el-select v-model="fromData.booth_type" placeholder="请选择摊位类型">
              <el-option v-for="item in useSearchBoothYype" :key="item.id" :label="item.title" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="摊位型号" prop="booth_version">
            <el-select v-model="fromData.booth_version" placeholder="请选择摊位型号">
              <el-option label="大型" :value="1" />
              <el-option label="中型" :value="2" />
              <el-option label="小型" :value="3" />
              <el-option label="微小" :value="4" />
            </el-select>
          </el-form-item>
          <el-form-item label="摊位编号" prop="booth_numbers">
            <el-input style="width: 220px" v-model="fromData.booth_numbers" placeholder="请输入摊位编号" />
          </el-form-item>
          <el-form-item label="摊位经度" prop="booth_longitude">
            <el-input-number style="width: 220px" v-model="fromData.booth_longitude" :precision="9" :step="0.1" :min="0" />
          </el-form-item>
          <el-form-item label="摊位纬度" prop="booth_latitude">
            <el-input-number style="width: 220px" v-model="fromData.booth_latitude" :precision="9" :step="0.1" :min="0" />
          </el-form-item>
          <el-form-item label="摊位面积" prop="booth_footprint">
            <el-input-number style="width: 220px" v-model="fromData.booth_footprint" :precision="2" :step="0.1" :min="0" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loading" @click="suBmit">提交</el-button>
          </el-form-item>
        </el-space>
      </el-form>
    </el-dialog>
  </div>
</template>
<script setup name="boothManage">
  import CardSeacrh from "@/components/CardSeacrh/index.vue";
  import Table from "@/components/Table/index.vue";
  import Pagination from "@/components/Pagination/index.vue";

  import { boothList, boothSubmit, searchSegmentation } from "@/api/market.js";
  import { useMarketList } from "@/hooks/useSundry.js";
  const { marketList, useSearchBoothYype, useSearchForms } = useMarketList();

  const seacrh = reactive({
    page: 1,
    limit: 10,
    mk_id: "",
    seg_id: "",
    management_forms: "",
    name: "",
  });
  const searchSegmentationArr = ref([]);
  const tableHeader = reactive([
    {
      label: "市场名称",
      prop: (row) => row.comp_name,
    },
    {
      label: "所属分类",
      prop: (row) => row.segmentation_title,
    },
    {
      label: "摊位编号",
      prop: (row) => row.booth_numbers,
    },
    {
      label: "摊位类型",
      prop: (row) => row.booth_name,
    },
    {
      label: "摊位大小",
      prop: (row) => row.booth_footprint,
    },
    {
      label: "经营状态",
      prop: (row) => row.mf_title,
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
    mk_id: "", // 市场id
    seg_id: "", // 市场所属分类id
    booth_numbers: "", // 摊位编号
    booth_type: "", // 类型：1摊位，2为门面
    booth_footprint: 0, // 摊位面积
    booth_version: "", // 摊位型号
    management_forms: "", // 经营状态:
    booth_longitude: 0, // 摊位经度
    booth_latitude: 0, // 摊位纬度
  });
  const rules = {
    mk_id: { required: true, message: "请选择所属市场" },
    seg_id: { required: true, message: "请选择市场所属分类" },
    booth_numbers: { required: true, message: "请输入摊位编号" },
    booth_type: { required: true, message: "请选择摊位类型" },
    booth_footprint: { required: true, message: "请输入摊位面积" },
    booth_version: { required: true, message: "请选择摊位型号" },
    management_forms: { required: true, message: "请选择经营状态" },
    booth_longitude: { required: true, message: "请输入摊位经度" },
    booth_latitude: { required: true, message: "请输入摊位纬度" },
  };

  function rowEdit(row) {
    fromData.id = row.id;
    fromData.mk_id = row.mk_id; // 市场id
    getsearchSegmentation(row.mk_id);
    fromData.seg_id = row.seg_id; // 市场所属分类id
    fromData.booth_numbers = row.booth_numbers; // 摊位编号
    fromData.booth_type = row.booth_type; // 类型：1摊位，2为门面
    fromData.booth_footprint = row.booth_footprint * 1; // 摊位面积
    fromData.booth_version = row.booth_version; // 摊位型号
    fromData.management_forms = row.management_forms; // 经营状态:
    fromData.booth_longitude = row.booth_longitude * 1; // 摊位经度
    fromData.booth_latitude = row.booth_latitude * 1; // 摊位纬度
    dialog.value = true;
  }

  function getsearchSegmentation(mk_id) {
    searchSegmentationArr.value = [];
    fromData.seg_id = [];
    searchSegmentation({ mk_id }).then((res) => {
      searchSegmentationArr.value = res.data;
    });
  }

  const cardSeacrhData = reactive([
    {
      placeholder: "请选择市场",
      option: marketList,
      type: "select",
      vModel: "mk_id",
      itemLabel: "comp_name",
      itemValue: "id",
      clearable: true,
      change: getsearchSegmentation,
    },
    {
      placeholder: "请选择所属分类",
      option: searchSegmentationArr,
      type: "select",
      vModel: "seg_id",
      itemLabel: "segmentation_title",
      itemValue: "id",
      clearable: true,
    },
    {
      placeholder: "请选择摊位类型",
      option: useSearchBoothYype,
      type: "select",
      vModel: "booth_type",
      itemLabel: "title",
      itemValue: "id",
      clearable: true,
    },
    {
      placeholder: "请选择经营状态",
      option: useSearchForms,
      type: "select",
      vModel: "management_forms",
      itemLabel: "mf_title",
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
      callback: getBoothList,
      size: "large",
    },
    {
      text: "新增",
      type: "btn",
      callback: () => (dialog.value = true),
      size: "large",
    },
  ]);
  function close() {
    delete fromData.id; // 修改才有
    fromData.mk_id = ""; // 市场id
    fromData.seg_id = ""; // 市场所属分类id
    fromData.booth_numbers = ""; // 摊位编号
    fromData.booth_type = ""; // 类型：1摊位，2为门面
    fromData.booth_footprint = 0; // 摊位面积
    fromData.booth_version = ""; // 摊位型号
    fromData.management_forms = ""; // 经营状态:
    fromData.booth_longitude = 0; // 摊位经度
    fromData.booth_latitude = 0; // 摊位纬度
    dialog.value = false;
  }
  const loading = ref(false);
  const ruleFormRef = ref(null);
  function suBmit() {
    loading.value = true;
    ruleFormRef.value.validate((valid) => {
      if (valid) {
        boothSubmit(fromData)
          .then((res) => {
            loading.value = false;
            ElMessage({ type: "success", message: res.data });
            close();
            getBoothList();
          })
          .catch((err) => {
            loading.value = false;
            ElMessage({ type: "error", message: err.msg });
          });
      } else {
        return false;
      }
    });
  }
  function getBoothList() {
    boothList(seacrh).then((res) => {
      tableData.value = res.data.data;
      total.value = res.data.total;
    });
  }
  onMounted(() => {
    getBoothList();
  });
</script>
<style lang="scss" scoped></style>
