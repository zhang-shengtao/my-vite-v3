<template>
  <el-card>
    <el-form ref="ruleFormRef" :model="fromData" :rules="rules" label-width="110px" class="demo-ruleForm">
      <el-space wrap>
        <el-form-item label="市场名称" prop="comp_name">
          <el-input v-model="fromData.comp_name" style="width: 222px" size="large" placeholder="请输入市场名称" />
        </el-form-item>
        <el-form-item label="市场编码" prop="comp_id">
          <el-input v-model="fromData.comp_id" style="width: 222px" size="large" placeholder="请输入市场编码" />
        </el-form-item>
        <el-form-item label="社会信用代码" prop="reg_id">
          <el-input v-model="fromData.reg_id" style="width: 222px" size="large" placeholder="请输入社会统一信用代码" />
        </el-form-item>
        <el-form-item label="法人代表" prop="legal_represent">
          <el-input v-model="fromData.legal_represent" style="width: 222px" size="large" placeholder="请输入法人代表" />
        </el-form-item>
        <el-form-item label="联系电话" prop="tel">
          <el-input v-model="fromData.tel" style="width: 222px" size="large" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="传真" prop="fax">
          <el-input v-model="fromData.fax" style="width: 222px" size="large" placeholder="请输入传真" />
        </el-form-item>
        <el-form-item label="备案日期" prop="record_date">
          <el-date-picker v-model="fromData.record_date" value-format="YYYY-MM-DD" type="date" placeholder="请选择备案日期" size="large" />
        </el-form-item>
        <el-form-item label="备案过期时间" prop="record_expiration_date">
          <el-date-picker v-model="fromData.record_expiration_date" value-format="YYYY-MM-DD" type="date" placeholder="请选择备案过期时间" size="large" />
        </el-form-item>
        <el-form-item label="营业时间" prop="business_start">
          <el-time-picker style="width: 222px; box-sizing: border-box" is-range v-model="timePicker" :clearable="false" size="large" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="请选择营业时间" value-format="HH:mm:ss" />
        </el-form-item>
        <el-form-item label="省份" prop="province_id">
          <el-select v-model="fromData.province_id" placeholder="请选择省份" size="large" @change="useGetCityArea">
            <el-option v-for="(item, index) in useProvince" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="city_id">
          <el-select v-model="fromData.city_id" placeholder="请选择城市" size="large" @change="useGetArea">
            <el-option v-for="(item, index) in useCity" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="区县" prop="area_id">
          <el-select v-model="fromData.area_id" placeholder="请选择区县" size="large" @change="useGetRue">
            <el-option v-for="(item, index) in useCounty" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="街道" prop="street_id">
          <el-select v-model="fromData.street_id" placeholder="请选择街道" size="large">
            <el-option v-for="(item, index) in useRue" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" prop="addr">
          <el-input v-model="fromData.addr" style="width: 222px" size="large" placeholder="请输入详细地址" />
        </el-form-item>
        <el-form-item label="覆盖人群约" prop="covered_population">
          <el-input v-model.number="fromData.covered_population" style="width: 222px" size="large" placeholder="请输入覆盖人群约">
            <template #suffix>
              <i style="font-style: normal">人</i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="市场面积" prop="market_footprint">
          <el-input v-model.number="fromData.market_footprint" style="width: 222px" size="large" placeholder="请输入市场面积">
            <template #suffix>
              <i style="font-style: normal">㎡</i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="出入口数量" prop="entry_exit_number">
          <el-input-number v-model.number="fromData.entry_exit_number" :min="0" :precision="0" :step="1" size="large" style="width: 222px" />
        </el-form-item>
        <el-form-item label="市场经营类型" prop="market_operation_type">
          <el-select v-model="fromData.market_operation_type" placeholder="请选择市场经营类型" size="large">
            <el-option label="批发" value="1" />
            <el-option label="批发兼营" value="2" />
            <el-option label="零售" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="市场经营特色" prop="feature_type">
          <el-select v-model="fromData.feature_type" placeholder="请选择市场经营特色" size="large">
            <el-option label="海鲜" value="1" />
            <el-option label="综合" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="市场经度" prop="longitude">
          <!-- <el-input v-model.number="fromData.longitude" style="width: 222px" size="large" placeholder="请输入市场经度" /> -->
          <el-input-number v-model="fromData.longitude" :min="0" :max="180" :precision="9" :step="0.1" size="large" style="width: 222px" />
        </el-form-item>
        <el-form-item label="市场维度" prop="latitude">
          <!-- <el-input v-model.number="fromData.latitude" style="width: 222px" size="large" placeholder="请输入市场维度" /> -->
          <el-input-number v-model="fromData.latitude" :min="0" :max="90" :precision="9" :step="0.1" size="large" style="width: 222px" />
        </el-form-item>
        <el-form-item label="市场信用等级" prop="market_credit_level">
          <el-input-number v-model="fromData.market_credit_level" :min="0" :precision="0" :step="1" size="large" style="width: 222px" />
        </el-form-item>
        <el-form-item label="检测室等级" prop="test_room_level">
          <el-input-number v-model="fromData.test_room_level" :min="0" :max="5" :precision="0" :step="1" size="large" style="width: 222px" />
        </el-form-item>
        <el-form-item label="防疫防控等级" prop="epidemic_prevention_level">
          <el-input-number v-model="fromData.epidemic_prevention_level" :min="0" :precision="0" :max="5" :step="1" size="large" style="width: 222px" />
        </el-form-item>
        <el-form-item label="公厕等级" prop="public_toilets_level">
          <el-input-number v-model="fromData.public_toilets_level" :precision="0" :min="0" :max="5" :step="1" size="large" style="width: 222px" />
        </el-form-item>
      </el-space>
      <el-form-item label="市场简介" prop="intro">
        <el-input v-model="fromData.intro" maxlength="300" placeholder="请输入市场简介" show-word-limit type="textarea" />
      </el-form-item>
      <el-space wrap>
        <el-form-item label="市场证照" prop="market_business_licenses">
          <upload v-model="fromData.market_business_licenses" />
        </el-form-item>
        <el-form-item label="负责人免冠照" prop="market_principal">
          <upload v-model="fromData.market_principal" />
        </el-form-item>
        <el-form-item label="市场平面图" prop="market_plan">
          <upload v-model="fromData.market_plan" />
        </el-form-item>
        <el-form-item label="消防逃生图" prop="fire_escape_plan">
          <upload v-model="fromData.fire_escape_plan" />
        </el-form-item>
        <el-form-item label="市场Logo" prop="market_logo">
          <upload v-model="fromData.market_logo" />
        </el-form-item>
        <el-form-item label="市场照片" prop="market_picture">
          <upload v-model="fromData.market_picture" />
        </el-form-item>
      </el-space>
      <el-tabs type="border-card">
        <el-tab-pane :label="item" v-for="(item, index) in fire" :key="index + 1">
          <FireControl ref="fireControlID" :id="index + 1" v-model:fire_element_data="fromData.fire_element_data" />
        </el-tab-pane>
      </el-tabs>
      <el-tabs type="border-card" style="margin-top: 15px">
        <el-tab-pane v-for="item in serviceFacilities" :label="item.label">
          <fireControl v-if="item.com == 'FireControl'" ref="fireControlIDs" :id="item.id" v-model:service_facility="fromData.service_facility" />
          <PublicToilets v-else-if="item.id === 1" :id="item.id" v-model:service_facility="fromData.service_facility" ref="publicToilet" :public_toilet="public_toilet" />
          <PublicToilets v-else v-model:Parking_space="fromData.Parking_space" />
        </el-tab-pane>
      </el-tabs>
      <el-button type="primary" :loading="loading" size="large" style="margin-top: 15px" @click="onSubmit">立即提交</el-button>
    </el-form>
  </el-card>
</template>

<script setup>
import FireControl from "./components/fireControl.vue";
import PublicToilets from "./components/PublicToilets.vue";
import upload from "@/components/Upload/index.vue";
import useProvinceCity from "@/hooks/useProvinceCity.js";
import { marketInfoadd, getMarketAddpage } from "@/api/market.js";
const fire = ["消防水池", "消防栓", "灭火器", "烟感", "消防出入口", "消防点", "市场消防队人员"];
const serviceFacilities = [
  { label: "母婴室", com: "FireControl", id: 2 },
  { label: "残障人士通道", com: "FireControl", id: 3 },
  { label: "无害化处理点", com: "FireControl", id: 4 },
  { label: "志愿者服务站", com: "FireControl", id: 6 },
  { label: "停车位数量", com: "PublicToilets" },
  { label: "公厕", com: "PublicToilets", id: 1 },
  { label: "智慧农贸工作室", com: "FireControl", id: 7 },
  { label: "消费者维权投诉站", com: "FireControl", id: 8 },
  { label: "公平秤", com: "FireControl", id: 9 },
  { label: "广播设备", com: "FireControl", id: 10 },
  { label: "垃圾收集分类", com: "FireControl", id: 11 },
  { label: "食品安全管理员", com: "FireControl", id: 12 },
  { label: "监控设备", com: "FireControl", id: 13 },
];
const router = useRouter();
const timePicker = ref([]); // 营业时间
watch(timePicker, (val) => {
  fromData.business_start = val[0];
  fromData.business_end = val[1];
});
const fromData = reactive({
  comp_name: "", // 市场名称
  comp_id: "", // 市场编码
  reg_id: "", // 统一社会信用代码
  legal_represent: "", // 法人代表
  tel: "", // 联系电话
  fax: "", // 传真
  record_date: "", // 备案日期
  record_expiration_date: "", // 备案过期时间
  business_start: "", // 营业开始日期
  business_end: "", // 营业开始结束
  province_id: "", // 省
  city_id: "", // 城市
  area_id: "", // 隶属行政区划及代码
  street_id: "", // 街道
  addr: "", // 地址
  longitude: 0, // 经度
  latitude: 0, // 纬度
  market_footprint: "", // 市场面积
  entry_exit_number: 0, // 出入口数量
  covered_population: "", // 覆盖人群约
  market_operation_type: "", // 市场经营类型
  feature_type: "", // 市场经营特色
  market_credit_level: 0, // 市场信用等级
  test_room_level: 0, // 检测室等级
  epidemic_prevention_level: 0, // 防疫防控等级
  public_toilets_level: 0, // 公厕等级
  market_business_licenses: "", // 市场证照
  market_principal: "", // 市场负责人免冠照
  market_plan: "", // 市场平面图
  fire_escape_plan: "", // 消防逃生图
  market_logo: "", // 市场Logo
  market_picture: "", // 市场照片
  intro: "", // 市场简介
  fire_element_data: [], // 消防要素json数据
  service_facility: [], // 服务设施json数据
  Parking_space: {
    motorized_number: 0, // 机动车位数量 否
    motorized_addr: [], // 机动车位位置 否
    non_motorized_number: 0, // 非机动车位数量 否
    non_motorized_addr: [], // 非机动车位位置 否
    non_charging_number: 0, // 非充电桩车 位 否
    non_charging_addr: [], // 非充电桩车位位置 否
  },
});
const rules = reactive({
  comp_name: { required: true, message: "请输入市场名称", trigger: "blur" },
  comp_id: { required: true, message: "请输入市场编码", trigger: "blur" },
  reg_id: { required: true, message: "请输入统一社会信用代码", trigger: "blur" },
  record_date: { required: true, message: "请选择备案日期", trigger: "blur" },
  business_start: { required: true, message: "请选择营业时间", trigger: "blur" },
  province_id: { required: true, message: "请选择省份", trigger: "blur" },
  city_id: { required: true, message: "请选择城市", trigger: "blur" },
  area_id: { required: true, message: "请选择区县", trigger: "blur" },
  street_id: { required: true, message: "请选择乡镇街道", trigger: "blur" },
  addr: { required: true, message: "请输入详细地址", trigger: "blur" },
  longitude: { required: true, message: "请输入地理经度", trigger: "blur" },
  latitude: { required: true, message: "请输入地理维度", trigger: "blur" },
  market_footprint: { required: true, validator, trigger: "blur" },
  entry_exit_number: { required: true, validator, trigger: "blur" },
  covered_population: { required: true, validator, trigger: "blur" },
  market_operation_type: { required: true, message: "请选择选择经营类型", trigger: "blur" },
  feature_type: { required: true, message: "请选择市场经营特色", trigger: "blur" },
  market_credit_level: { required: true, message: "请选择市场信用等级" },
  test_room_level: { required: true, message: "请选择检测室等级" },
  epidemic_prevention_level: { required: true, message: "请选择防疫防控等级" },
  public_toilets_level: { required: true, message: "请选择公厕等级" },
  market_business_licenses: { required: true, message: "请上传市场证照", trigger: "blur" },
  market_principal: { required: true, message: "请上传市场负责人免冠", trigger: "blur" },
  market_plan: { required: true, message: "请上传市场平面图", trigger: "blur" },
  fire_escape_plan: { required: true, message: "请上传消防逃生图", trigger: "blur" },
  market_logo: { required: true, message: "请上传市场logo", trigger: "blur" },
  market_picture: { required: true, message: "请上传市场照片", trigger: "blur" },
});
const { useGetCityArea, useGetArea, useGetRue, useProvince, useCity, useCounty, useRue } = useProvinceCity(fromData, "province_id", "city_id", "area_id", "street_id");

function validator(rule, value, callback) {
  if (value === "") {
    callback(new Error("请输入非负值得有效数字"));
  } else if (value * 1 <= 0) {
    callback(new Error("请输入非负值得有效数字"));
  } else {
    callback();
  }
}
const id = useRoute().params.id;
const loading = ref(false);
const ruleFormRef = ref(null);
function onSubmit() {
  loading.value = true;
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      const data = {
        ...fromData,
        ...fromData.Parking_space,
        fire_element_data: JSON.stringify(fromData.fire_element_data),
        service_facility: JSON.stringify(fromData.service_facility),
      };
      delete data.Parking_space;
      marketInfoadd(data)
        .then((res) => {
          ElMessage({
            type: "success",
            message: res.data,
          });
          loading.value = false;
          router.replace("/");
        })
        .catch((err) => {
          ElMessage({
            type: "error",
            message: err.msg,
          });
          loading.value = false;
        });
    } else {
      loading.value = false;
      return false;
    }
  });
}
const fireControlID = ref(null);
const fireControlIDs = ref(null);
const publicToilet = ref(null);
const public_toilet = ref({});
if (id) {
  getMarketAddpage({ id }).then((res) => {
    const marketData = res.data.market_data;
    fromData.id = marketData.id;
    fromData.comp_name = marketData.comp_name;
    fromData.comp_id = marketData.comp_id;
    fromData.reg_id = marketData.reg_id;
    fromData.tel = marketData.tel; // 联系电话
    fromData.fax = marketData.fax; // 传真
    fromData.record_date = marketData.record_date; // 备案日期
    fromData.record_expiration_date = marketData.record_expiration_date; // 备案过期时间
    timePicker.value = [marketData.business_start, marketData.business_end]; // 营业开始日期 // 营业开始结束
    fromData.province_id = marketData.province_id; // 省
    useGetCityArea(marketData.province_id);
    fromData.city_id = marketData.city_id; // 城市
    useGetArea(marketData.city_id);
    fromData.area_id = marketData.area_id; // 隶属行政区划及代码
    useGetRue(marketData.area_id);
    fromData.street_id = marketData.street_id; // 街道
    fromData.addr = marketData.addr; //  地址
    fromData.longitude = marketData.other.longitude * 1; // 经度
    fromData.latitude = marketData.other.latitude * 1; // 纬度
    fromData.market_footprint = marketData.other.market_footprint; // 市场面积
    fromData.entry_exit_number = marketData.other.entry_exit_number; // 出入口数量
    fromData.covered_population = marketData.other.covered_population; // 覆盖人群约
    fromData.market_operation_type = marketData.other.market_operation_type + ""; // 市场经营类型
    fromData.feature_type = marketData.other.feature_type + ""; //  市场经营特色
    fromData.market_credit_level = marketData.other.market_credit_level; //  市场信用等级
    fromData.test_room_level = marketData.other.test_room_level; //  检测室等级
    fromData.epidemic_prevention_level = marketData.other.epidemic_prevention_level; //  防疫防控等级
    fromData.public_toilets_level = marketData.other.public_toilets_level; //  公厕等级
    fromData.market_business_licenses = marketData.other.market_business_licenses; //  市场经营特色
    fromData.market_business_licenses = marketData.imgs.market_business_licenses;
    fromData.market_principal = marketData.imgs.market_principal;
    fromData.market_plan = marketData.imgs.market_plan;
    fromData.fire_escape_plan = marketData.imgs.fire_escape_plan;
    fromData.market_logo = marketData.imgs.market_logo;
    fromData.market_picture = marketData.imgs.market_picture;
    fromData.intro = marketData.intro; //  市场简介
    fromData.Parking_space.motorized_number = marketData.parking_spaces.motorized_number;
    fromData.Parking_space.motorized_addr = marketData.parking_spaces.motorized_addr;
    fromData.Parking_space.non_motorized_number = marketData.parking_spaces.non_motorized_number;
    fromData.Parking_space.non_motorized_addr = marketData.parking_spaces.non_motorized_addr;
    fromData.Parking_space.non_charging_number = marketData.parking_spaces.non_charging_number;
    fromData.Parking_space.non_charging_addr = marketData.parking_spaces.non_charging_addr;
    marketData.fire_element.map((item) => {
      item.intro = item.info;
      item.id = item.element_id;
      delete item.info;
    });
    marketData.service_facility.map((item) => {
      item.id = item.sf_id;
      item.info.map((items) => {
        items.location = items.location_describe;
      });
    });
    fromData.fire_element_data = marketData.fire_element;
    fromData.service_facility = marketData.service_facility;
    public_toilet.value = marketData.public_toilet;
    nextTick(() => {
      fireControlID.value.forEach((item) => {
        item.assign();
      });
      fireControlIDs.value.forEach((item) => {
        item.assign();
      });
      publicToilet.value.forEach((item) => {
        item.assign();
      });
    });
  });
}
</script>

<style lang="scss"></style>
