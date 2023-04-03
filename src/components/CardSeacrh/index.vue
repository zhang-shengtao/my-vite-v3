<template>
  <el-card style="margin-bottom: 15px">
    <el-space wrap :size="13">
      <template v-for="list in cardSeacrhData" :key="list.placeholder">
        <template v-if="list.type === 'select'">
          <el-select v-model="seacrh[list.vModel]" :clearable="list.clearable" :placeholder="list.placeholder" :size="list.size || 'large'" @change="list.change">
            <el-option v-for="item in list.option" :key="item.id" :label="item[list.itemLabel || 'name']" :value="item[list.itemValue || 'id']" />
          </el-select>
        </template>
        <template v-if="list.type === 'input'">
          <el-input v-model="seacrh[list.vModel]" :placeholder="list.placeholder" :size="list.size || 'large'" :clearable="list.clearable" @change="list.change"></el-input>
        </template>
        <template v-else-if="list.type === 'picker'">
          <el-date-picker v-model="seacrh[list.vModel]" :value-format="list.valueFormat" :size="list.size || 'large'" :type="list.childrenType || 'month'" :placeholder="list.placeholder" />
        </template>
        <template v-else-if="list.type === 'btn'">
          <el-button :type="list.btnType || 'primary'" :size="list.size || 'large'" @click="list.callback">{{ list.text }}</el-button>
        </template>
      </template>
    </el-space>
  </el-card>
</template>

<script setup>
  const { cardSeacrhData, seacrh } = defineProps({
    cardSeacrhData: {
      type: Array,
      default: [],
      required: true,
    },
    seacrh: {
      type: Object,
      default: [],
      required: true,
    },
  });

  const provinceid = "";
  const provinceList = [];
</script>
