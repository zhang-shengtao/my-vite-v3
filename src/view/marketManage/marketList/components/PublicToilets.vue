<template>
  <template v-if="props.Parking_space">
    <h3>机动车车位数量 <el-input-number v-model="props.Parking_space.motorized_number" :min="0" :precision="0" :step="1" size="large" style="width: 222px" @change="change" /></h3>
    <el-space wrap>
      <el-form-item label="位置描述" v-for="(item, index) in props.Parking_space.motorized_addr" :key="index">
        <el-input v-model="props.Parking_space.motorized_addr[index]" style="width: 400px" size="large" placeholder="请输入位置描述" />
      </el-form-item>
    </el-space>
    <h3>非机动车位数量 <el-input-number v-model="props.Parking_space.non_motorized_number" :min="0" :precision="0" :step="1" size="large" style="width: 222px" @change="change1" /></h3>
    <el-space wrap>
      <el-form-item label="位置描述" v-for="(item, index) in props.Parking_space.non_motorized_addr" :key="index">
        <el-input v-model="props.Parking_space.non_motorized_addr[index]" style="width: 400px" size="large" placeholder="请输入位置描述" />
      </el-form-item>
    </el-space>
    <h3>非充电桩车位置 <el-input-number v-model="props.Parking_space.non_charging_number" :min="0" :precision="0" :step="1" size="large" style="width: 222px" @change="change2" /></h3>
    <el-space wrap>
      <el-form-item label="位置描述" v-for="(item, index) in props.Parking_space.non_charging_addr" :key="index">
        <el-input v-model="props.Parking_space.non_charging_addr[index]" style="width: 400px" size="large" placeholder="请输入位置描述" />
      </el-form-item>
    </el-space>
  </template>
  <template v-else>
    <h3>男厕坑位数量 {{ man_choice }}个</h3>
    <el-space wrap>
      <el-form-item label="大便器蹲式数量">
        <el-input-number v-model="info.man_choice_pee_squat" :min="0" :precision="0" :step="1" size="large" style="width: 222px" />
      </el-form-item>
      <el-form-item label="大便器坐式数量">
        <el-input-number v-model="info.man_choice_pee_sit" :min="0" :precision="0" :step="1" size="large" style="width: 222px" />
      </el-form-item>
      <el-form-item label="小便器挂试数量">
        <el-input-number v-model="info.man_choice_pee_squat_urinal" :min="0" :precision="0" :step="1" size="large" style="width: 222px" />
      </el-form-item>
      <el-form-item label="小便池的数量">
        <el-input-number v-model="info.man_choice_pee_sit_urinal" :min="0" :precision="0" :step="1" size="large" style="width: 222px" />
      </el-form-item>
    </el-space>
    <el-space wrap>
      <div>
        <h3>女厕坑位数量 {{ woman_choice }}个</h3>
        <el-space wrap>
          <el-form-item label="女蹲式坑位数量">
            <el-input-number v-model="info.woman_choice_pee_squat" :min="0" :precision="0" :step="1" size="large" style="width: 222px" />
          </el-form-item>
          <el-form-item label="女坐式坑位数量">
            <el-input-number v-model="info.woman_choice_pee_sit" :min="0" :precision="0" :step="1" size="large" style="width: 222px" />
          </el-form-item>
        </el-space>
      </div>
      <div>
        <h3>洗手台 {{ adult_wash }}个</h3>
        <el-space wrap>
          <el-form-item label="成年洗手盆数量">
            <el-input-number v-model="info.adult_wash_basin" :min="0" :precision="0" :step="1" size="large" style="width: 222px" />
          </el-form-item>
          <el-form-item label="儿童洗手盆数量">
            <el-input-number v-model="info.child_wash_basin" :min="0" :precision="0" :step="1" size="large" style="width: 222px" />
          </el-form-item>
        </el-space>
      </div>
    </el-space>
    <h3>残障人士(老人)专间 {{ dp_wipe }}个</h3>
    <el-space wrap>
      <el-form-item label="专间坐式数量">
        <el-input-number v-model="info.dp_sit" :min="0" :precision="0" :step="1" size="large" style="width: 222px" />
      </el-form-item>
      <el-form-item label="擦手设备数量">
        <el-input-number v-model="info.dp_wipe_handheld" :min="0" :precision="0" :step="1" size="large" style="width: 222px" />
      </el-form-item>
      <el-form-item label="扶手设备数量">
        <el-input-number v-model="info.dp_handheld" :min="0" :precision="0" :step="1" size="large" style="width: 222px" />
      </el-form-item>
    </el-space>
    <el-space wrap>
      <div>
        <h3>擦手纸设备</h3>
        <el-space wrap>
          <el-form-item label="擦手设备数量">
            <el-input-number v-model="info.paper_cleaning_equipment_num" :min="0" :precision="0" :step="1" size="large" style="width: 222px" />
          </el-form-item>
        </el-space>
      </div>
      <div>
        <h3>烘干机</h3>
        <el-space wrap>
          <el-form-item label="烘干机">
            <el-input-number v-model="info.dryer_num" :min="0" :precision="0" :step="1" size="large" style="width: 222px" />
          </el-form-item>
        </el-space>
      </div>
      <div>
        <h3>除臭设备</h3>
        <el-space wrap>
          <el-form-item label="除臭设备数量">
            <el-input-number v-model="info.deodorize_num" :min="0" :precision="0" :step="1" size="large" style="width: 222px" />
          </el-form-item>
        </el-space>
      </div>
      <div>
        <h3>防蚊灭蝇设备</h3>
        <el-space wrap>
          <el-form-item label="防蚊灭蝇设备">
            <el-input-number v-model="info.mosquito_fly_num" :min="0" :precision="0" :step="1" size="large" style="width: 222px" />
          </el-form-item>
        </el-space>
      </div>
      <div>
        <h3>空调</h3>
        <el-space wrap>
          <el-form-item label="空调设备数量">
            <el-input-number v-model="info.air_num" :min="0" :precision="0" :step="1" size="large" style="width: 222px" />
          </el-form-item>
        </el-space>
      </div>
      <div>
        <h3>卫生负责人</h3>
        <el-space wrap>
          <el-form-item label="卫生负责人">
            <el-input v-model="info.health_name" placeholder="请输入卫生负责人姓名" size="large" style="width: 222px" />
          </el-form-item>
          <el-form-item label="负责人电话">
            <el-input v-model="info.health_tel" placeholder="请输入卫生负责人电话" size="large" style="width: 222px" />
          </el-form-item>
        </el-space>
      </div>
    </el-space>
    <h3>信息发布点 {{ non_electronic }}个</h3>
    <el-space wrap>
      <el-form-item label="电子数字式数量">
        <el-input-number v-model="info.electronic" :min="0" :precision="0" :step="1" size="large" style="width: 222px" />
      </el-form-item>
      <el-form-item label="电子数字式数量">
        <el-input-number v-model="info.non_electronic" :min="0" :precision="0" :step="1" size="large" style="width: 222px" />
      </el-form-item>
    </el-space>
    <h3>公厕位置</h3>
    <div class="tabs">
      <el-input v-model="info.longitude" placeholder="请输入地理经度" size="large" style="width: 222px; flex-shrink: 0" />
      <el-input v-model="info.latitude" placeholder="请输入地理维度" size="large" style="width: 222px; margin: 0 15px; flex-shrink: 0" />
      <el-input v-model="info.location_describe" placeholder="请输入位置描述" size="large" />
    </div>
    <el-space wrap :size="25">
      <div>
        <h3>男厕照片</h3>
        <upload v-model="info.man_imgs" />
      </div>
      <div>
        <h3>女厕照片</h3>
        <upload v-model="info.woman_imgs" />
      </div>
      <div>
        <h3>卫生负责人免冠照</h3>
        <upload v-model="info.health_img" />
      </div>
    </el-space>
  </template>
</template>

<script setup>
import upload from "@/components/Upload/index.vue";
const props = defineProps(["id", "Parking_space", "service_facility", "public_toilet"]);
const info = reactive({
  man_choice_pee_squat: 0, // 大便器蹲式数量
  man_choice_pee_sit: 0, // 大便器坐式数量
  man_choice_pee_squat_urinal: 0, // 小便器挂试数量
  man_choice_pee_sit_urinal: 0, // 小便池数量
  woman_choice_pee_squat: 0, // 女蹲式坑位数量
  woman_choice_pee_sit: 0, // 女坐式坑位数量
  disabled_people: 0, // 残障人士专间: 1有，0没
  dp_sit: 0, // 专间坐式数量
  dp_wipe_handheld: 0, // 擦手设备数量
  dp_handheld: 0, // 扶手设备数量
  adult_wash_basin: 0, // 成年洗手盆数量
  child_wash_basin: 0, // 儿童洗手盆数量
  paper_cleaning_equipment: 0, // 擦手纸设备: 1有，0无
  paper_cleaning_equipment_num: 0, // 擦手纸设备数量
  dryer: 0, // 烘干机: 1有，0无
  dryer_num: 0, // 烘干机数量
  deodorize: 0, // 除臭设备: 1有，0无
  deodorize_num: 0, // 除臭设备数量
  mosquito_fly: 0, // 防蚊灭蝇设备: 1有，0无
  mosquito_fly_num: 0, // 防蚊灭蝇设备数量
  air: 0, // 空调: 1有，0无”
  air_num: 0, // 空调数量
  information_release_point: 0, // 信息发布点: 1有，0无
  electronic: 0, // 电子数字式数量
  non_electronic: 0, // 非电子数字式
  health_name: "", // 卫生负责人
  health_tel: "", // 卫生负责人电话
  health_img: "", // 卫生负责人免冠照
  woman_imgs: "", // 女厕所图片
  man_imgs: "", // 男厕所图片
  longitude: "", // 经度
  latitude: "", // 纬度
  location_describe: "", // 位置描述
});
const id = useRoute().params.id;

function assign() {
  if (props.public_toilet) {
    Object.keys(info).forEach((item) => {
      info[item] = props.public_toilet[item];
    });
  }
}

function change(num1, num2) {
  popPush("motorized_addr", num1, num2);
}
function change1(num1, num2) {
  popPush("non_motorized_addr", num1, num2);
}
function change2(num1, num2) {
  popPush("non_charging_addr", num1, num2);
}
function popPush(arg, num1, num2) {
  if (num1 > num2) {
    for (let index = 0; index < num1 - num2; index++) {
      props.Parking_space[arg].push("");
    }
  }
  if (num1 < num2) {
    for (let index = 0; index < num2 - num1; index++) {
      props.Parking_space[arg].pop();
    }
  }
}
// 男坑位总数
const man_choice = computed(() => {
  return info.man_choice_pee_squat + info.man_choice_pee_sit + info.man_choice_pee_squat_urinal + info.man_choice_pee_sit_urinal;
});
// 女坑位总数
const woman_choice = computed(() => {
  return info.woman_choice_pee_squat + info.woman_choice_pee_sit;
});
// 洗手台总数
const adult_wash = computed(() => {
  return info.adult_wash_basin + info.child_wash_basin;
});
// 残障人士(老人)专间
const dp_wipe = computed(() => {
  return info.dp_sit + info.dp_wipe_handheld + info.dp_handheld;
});
// 信息发布点
const non_electronic = computed(() => {
  return info.electronic + info.non_electronic;
});
watch(dp_wipe, (val) => {
  if (val >= 1) info.disabled_people = 1;
});
watch(
  () => info.paper_cleaning_equipment_num,
  (val) => {
    if (val >= 1) info.paper_cleaning_equipment = 1;
  }
);
watch(
  () => info.dryer_num,
  (val) => {
    if (val >= 1) info.dryer = 1;
  }
);
watch(
  () => info.deodorize_num,
  (val) => {
    if (val >= 1) info.deodorize = 1;
  }
);
watch(
  () => info.mosquito_fly_num,
  (val) => {
    if (val >= 1) info.mosquito_fly = 1;
  }
);
watch(
  () => info.air_num,
  (val) => {
    if (val >= 1) info.air = 1;
  }
);
watch(non_electronic, (val) => {
  if (val >= 1) info.information_release_point = 1;
});
watch(info, (val) => {
  const some = props.service_facility.some((item) => {
    return item.sf_id == props.id || item.id == props.id;
  });
  if (!some) {
    props.service_facility.push({
      id: 1,
      info,
      title: "公厕",
    });
  } else {
    props.service_facility.forEach((item) => {
      if (item.id == props.id) {
        item.info = info;
      }
    });
  }
});

defineExpose({ assign });
</script>

<style lang="scss">
.tabs {
  display: flex;
  justify-content: space-between;
}

.shrink {
  flex-shrink: 0;
}
</style>
