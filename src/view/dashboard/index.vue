<template>
  <div>
    <div>{{ num }}</div>
    <el-button type="primary" size="default" @click="++num">加1</el-button>
  </div>
</template>
<script setup name="dashboard">
const num = ref(0);
</script>
<style lang="" scoped></style>
