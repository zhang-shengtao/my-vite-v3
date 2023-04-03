<template>
  <div class="BusinessUsers">
    <CardSeacrh :cardSeacrhData="cardSeacrhData" :seacrh="seacrh"></CardSeacrh>
    <Table :tableHeader="tableHeader" :tableData="tableData" />
    <Pagination :seacrh="seacrh" :total="total" :callback="getSellerList" />
    <el-dialog v-model="dialog" title="经营户管理" width="35%" draggable @close="close">
      <el-form :model="fromData" ref="ruleFormRef" :rules="rules" label-width="80px">
        <el-space wrap>
          <!-- <el-form-item label="所属市场" prop="mk_id">
            <el-select v-model="fromData.mk_id" placeholder="请选择所属市场" @change="getsearchSegmentation">
              <el-option v-for="item in marketList" :key="item.id" :label="item.comp_name" :value="item.id" />
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="所属分类" prop="seg_id">
            <el-select v-model="fromData.seg_id" placeholder="请选择所属分类">
              <el-option v-for="item in searchSegmentationArr" :key="item.id" :label="item.segmentation_title" :value="item.id" />
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="经营状态" prop="management_forms">
            <el-select v-model="fromData.management_forms" placeholder="请选择经营状态">
              <el-option v-for="item in useSearchForms" :key="item.id" :label="item.mf_title" :value="item.id" />
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="摊位类型" prop="booth_type">
            <el-select v-model="fromData.booth_type" placeholder="请选择摊位类型">
              <el-option v-for="item in useSearchBoothYype" :key="item.id" :label="item.title" :value="item.id" />
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="摊位型号" prop="booth_version">
            <el-select v-model="fromData.booth_version" placeholder="请选择摊位型号">
              <el-option label="大型" :value="1" />
              <el-option label="中型" :value="2" />
              <el-option label="小型" :value="3" />
              <el-option label="微小" :value="4" />
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="摊位编号" prop="booth_numbers">
            <el-input style="width: 220px" v-model="fromData.booth_numbers" placeholder="请输入摊位编号" />
          </el-form-item> -->
          <!-- <el-form-item label="摊位经度" prop="booth_longitude">
            <el-input-number style="width: 220px" v-model="fromData.booth_longitude" :precision="9" :step="0.1" :min="0" />
          </el-form-item> -->
          <!-- <el-form-item label="摊位纬度" prop="booth_latitude">
            <el-input-number style="width: 220px" v-model="fromData.booth_latitude" :precision="9" :step="0.1" :min="0" />
          </el-form-item> -->
          <!-- <el-form-item label="摊位面积" prop="booth_footprint">
            <el-input-number style="width: 220px" v-model="fromData.booth_footprint" :precision="2" :step="0.1" :min="0" />
          </el-form-item> -->
          <!-- <el-form-item>
            <el-button type="primary" :loading="loading" @click="suBmit">提交</el-button>
          </el-form-item> -->
        </el-space>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
  import CardSeacrh from "@/components/CardSeacrh/index.vue";
  import Table from "@/components/Table/index.vue";
  import Pagination from "@/components/Pagination/index.vue";
  import { sellerList, sellerSubmit } from "@/api/market";

  const dialog = ref(false);
  const total = ref(0);
  const seacrh = reactive({
    page: 1,
    limit: 10,
    search: "",
  });
  const cardSeacrhData = reactive([
    {
      placeholder: "关键词搜索",
      type: "input",
      vModel: "search",
      clearable: true,
    },
    {
      text: "筛选",
      type: "btn",
      callback: getSellerList,
      size: "large",
    },
    {
      text: "新增",
      type: "btn",
      callback: () => (dialog.value = true),
      size: "large",
    },
    {
      text: "导入",
      type: "btn",
      callback: () => (dialog.value = true),
      size: "large",
    },
  ]);
  const tableHeader = reactive([
    {
      label: "编号",
      prop: (row) => row.id,
    },
    {
      label: "姓名",
      prop: (row) => row.name,
    },
    {
      label: "手机号",
      prop: (row) => row.tel,
    },
    {
      label: "性别",
      prop: (row) => (row.sex == 1 ? "男" : "女"),
    },
    {
      label: "籍贯",
      prop: (row) => row.native_place,
    },
    {
      label: "出生年月",
      prop: (row) => row.birth_date,
    },
    {
      label: "身份证号",
      prop: (row) => row.national_identification_number,
    },
    {
      type: "img",
      label: "免冠照",
      prop: (row) => row.according_the_img,
    },
    {
      type: "img",
      label: "营业执照",
      prop: (row) => row.health_certificate_img,
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
  const tableData = ref([]); //表格数据

  const fromData = reactive({
    name: "", // 名称
    tel: "", // 电话
    sex: "", // 性别：1为男，2为女
    national_identification_number: "", // 身份证号
    wechat_id: "", // 微信号
    province_id: "", // 省
    city_id: "", // 市
    area_id: "", // 区
    birth_date: "", // 出生日期
    according_the_img: "", // 免冠证
    health_certificate_img: "", // 健康证
    training_certificate_img: "", // 培训证书图片
    training_certificate_title: "", // 培训证书名称
    health_certificate_date: "", // 健康证的发布时间
  });
  const rules = reactive({});
  function getSellerList() {
    sellerList(seacrh).then((res) => {
      tableData.value = res.data.data;
      total.value = res.data.total;
    });
  }
  getSellerList();

  function rowEdit(row) {
    console.log(row);
  }

  function close() {}
</script>
