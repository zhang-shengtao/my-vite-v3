<template>
  <el-pagination style="margin-top: 10px" v-model:currentPage="seacrh.page" v-model:page-size="seacrh.limit" :page-sizes="[10, 20, 30]" :background="true" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>

<script setup>
const { seacrh, total, page, limit, callback } = defineProps({
  seacrh: {
    type: Object,
    default: {},
    required: true,
  },
  total: {
    type: Number,
    default: 0,
    required: true,
  },
  page: {
    type: String,
    default: "page",
  },
  limit: {
    type: String,
    default: "limit",
  },
  callback: {
    type: Function,
    required: true,
  },
});

function handleSizeChange(limits) {
  seacrh[limit] = limits;
  callback();
}
function handleCurrentChange(pages) {
  seacrh[page] = pages;
  callback();
}
</script>
