<template>
  <h3>数量 <el-input-number v-model="obj.number" :min="0" :precision="0" :step="1" size="large" style="width: 222px; margin-left: 15px" @change="change" /></h3>
  <template v-if="(props.service_facility && props.id == 7) || props.id != 7">
    <template v-if="(props.service_facility && props.id == 6) || (props.service_facility && props.id == 8)">
      <el-space wrap>
        <div v-for="(item, index) in obj.info" :key="index">
          <div class="tabs">
            <div style="margin-right: 15px">
              <div class="tabs">
                <el-form-item label="市场经度">
                  <el-input v-model="item.latitude" style="width: 200px" size="large" placeholder="请输入市场经度." />
                </el-form-item>
                <el-form-item label="市场纬度">
                  <el-input v-model="item.longitude" style="width: 200px" size="large" placeholder="请输入市场纬度" />
                </el-form-item>
              </div>
              <el-form-item label="位置描述">
                <el-input v-if="props.fire_element_data" v-model="item.location_describe" size="large" placeholder="请输入位置描述" />
                <el-input v-else v-model="item.location" size="large" placeholder="请输入位置描述" />
              </el-form-item>
            </div>
            <upload v-model="item.img" />
          </div>
        </div>
      </el-space>
    </template>
    <template v-else>
      <div class="flex" v-for="(item, index) in obj.info" :key="index">
        <h5 class="shrink" style="margin-right: 15px">地理位置</h5>
        <el-input v-model="item.latitude" size="large" placeholder="请输入市场经度" type="text" style="width: 222px; flex-shrink: 0" />
        <el-input v-model="item.longitude" size="large" placeholder="请输入市场纬度" type="text" style="width: 222px; margin: 0 15px; flex-shrink: 0" />
        <el-input v-if="props.fire_element_data" v-model="item.location_describe" size="large" placeholder="请输入位置描述" type="text" />
        <el-input v-else v-model="item.location" size="large" placeholder="请输入位置描述" type="text" />
      </div>
    </template>
  </template>
  <template v-if="props.id == 7 && props.fire_element_data">
    <el-space wrap>
      <div class="tabs" v-for="(item, index) in obj.info" :key="index">
        <div style="margin-right: 15px">
          <el-form-item label="人员姓名" prop="name">
            <el-input v-model="item.name" style="width: 222px" size="large" placeholder="请输入人员姓名" />
          </el-form-item>
          <el-form-item label="人员电话" prop="name">
            <el-input v-model="item.tel" style="width: 222px" size="large" placeholder="请输入联系电话" />
          </el-form-item>
        </div>
        <upload v-model="item.img" />
      </div>
    </el-space>
  </template>
</template>

<script setup>
import upload from "@/components/Upload/index.vue";
const props = defineProps(["id", "fire_element_data", "service_facility"]);
const id = useRoute().params.id;
const obj = reactive({
  number: 0,
  id: props.id,
  info: [],
});

function assign() {
  if (props.fire_element_data) {
    props.fire_element_data.forEach((item) => {
      if (item.element_id == props.id) {
        obj.id = item.id;
        obj.element_id = item.element_id;
        obj.number = item.number;
        obj.info = item.intro;
        obj.mk_id = item.mk_id;
      }
    });
  }
  if (props.service_facility) {
    props.service_facility.forEach((item) => {
      if (item.sf_id == props.id) {
        obj.id = item.id;
        obj.info = item.info;
        obj.mk_id = item.mk_id;
        obj.number = item.number;
        obj.sf_id = item.sf_id;
      }
    });
  }
}

function validator(rule, value, callback) {
  if (value === "") {
    callback(new Error("请输入非负值得有效数字"));
  } else if (value * 1 <= 0) {
    callback(new Error("请输入非负值得有效数字"));
  } else {
    callback();
  }
}

function change(num1, num2) {
  // // 消防
  if (props.fire_element_data) {
    if (num1 > num2) {
      for (let index = 0; index < num1 - num2; index++) {
        obj.info.push({
          id: "",
          name: "",
          tel: "",
          img: "",
          latitude: "",
          longitude: "",
          location_describe: "",
        });
      }
      const some = props.fire_element_data.some((item) => {
        return item.element_id == props.id || item.id == props.id;
      });
      if (!some) {
        const pushObj = { ...obj, intro: obj.info };
        delete pushObj.info;
        props.fire_element_data.push(pushObj);
      } else {
        props.fire_element_data.forEach((item) => {
          if (item.element_id == props.id || item.id == props.id) {
            item.number = obj.number;
            item.info = obj.intro;
          }
        });
      }
    } else {
      pop("fire_element_data", num1, num2);
    }
  }
  //   服务
  if (props.service_facility) {
    if (num1 > num2) {
      for (let index = 0; index < num1 - num2; index++) {
        obj.info.push({
          id: "",
          img: "",
          latitude: "",
          longitude: "",
          location: "",
        });
      }
      const some = props.service_facility.some((item) => {
        return item.sf_id == props.id || item.id == props.id;
      });

      if (!some) {
        props.service_facility.push(obj);
      } else {
        props.service_facility.forEach((item) => {
          if (item.sf_id == props.id || item.id == props.id) {
            item.number = obj.number;
            item.info = obj.info;
          }
        });
      }
    } else {
      pop("service_facility", num1, num2);
    }
  }
}

function pop(arg, num1, num2) {
  for (let index = 0; index < num2 - num1; index++) {
    obj.info.pop();
  }
  props[arg].forEach((item, index) => {
    if (item.sf_id == props.id || item.element_id == props.id || item.id == props.id) {
      if (obj.info.length === 0) {
        props[arg].splice(index, 1);
      } else {
        item.number = obj.number;
        item.info = obj.info || obj.intro;
      }
    }
  });
}

defineExpose({ assign });
</script>

<style lang="scss">
.shrink {
  flex-shrink: 0;
}
.tabs {
  display: flex;
  align-items: center;
}
</style>
