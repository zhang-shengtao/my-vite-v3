<template>
  <el-upload class="avatar-uploader" action="http" :http-request="postUploads" :show-file-list="false" :before-upload="beforeAvatarUpload">
    <img v-if="props.modelValue" :src="props.modelValue" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script setup>
import { uploads } from "@/api";
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

function postUploads({ file }) {
  const params = new FormData();
  params.append("type", "image");
  params.append("image", file);
  uploads(params).then((res) => {
    emit("update:modelValue", res.data.url);
  });
}
// 上传图片的校验
function beforeAvatarUpload(file) {
  const isJPG1 = file.type === "image/png";
  const isJPG2 = file.type === "image/jpeg";
  const isJPG3 = file.type === "image/bmp";
  const isJPG4 = file.type === "image/gif";
  const img = [isJPG1, isJPG2, isJPG3, isJPG4];
  const some = img.some((item) => {
    return item;
  });
  if (!some) {
    ElMessage({
      type: "error",
      message: "上传的图片只能是png,jpeg,bmp,gif格式!",
    });
  }
  return some;
}
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.avatar {
  width: 150px;
  height: 150px;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  text-align: center;
}
</style>
