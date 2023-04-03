import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite"; // 全局自动引入api
import Components from "unplugin-vue-components/vite"; // 全局自动注册组件
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"; // elementui组件库

import VueSetupExtend from "vite-plugin-vue-setup-extend"; // 在script中写name

import viteCompression from "vite-plugin-compression"; // 打包压缩文件
import path from "path";
import * as fs from "fs";

const libNameReg = /\/node_modules\/([^/]+)\//;

const manualChunks = (id) => {
  if (libNameReg.test(id.toString())) {
    const libName = RegExp.$1;
    switch (libName) {
      case "@vue":
      case "echarts":
      case "three":
      case "three.js":
      case "@popperjs":
      case "element-plus":
      case "@element-plus":
        return libName;
      default:
        return "vendor";
    }
  }
};

export default defineConfig(({ command, mode }) => {
  return {
    base: "./",
    build: {
      //   minify: "terser",
      reportCompressedSize: false,
      rollupOptions: { manualChunks }, // 打包分包
    },
    plugins: [
      vue(),
      VueSetupExtend(), // <script  name="videos">
      AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: ["vue", "vue-router", "pinia"],
        dts: false,
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),

      // 超过500k就压缩
      viteCompression({
        threshold: 512000,
        algorithm: "gzip",
        deleteOriginFile: false,
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: true,
    },
  };
});
