<!--
 * @Author: haifang.qin
 * @Date: 2022-04-28 10:27:21
 * @LastEditors: haifang.qin
 * @LastEditTime: 2022-04-29 15:22:42
 * @FilePath: \vue-project\src\global\components\H-table\src\recursive-title.vue
-->
<template>
  <el-table-column
    :key="data.name"
    :prop="data.name"
    v-bind="
      getMergedObject(data.extend, {
        'show-overflow-tooltip': true,
        align: 'left',
        label: data.label,
        minWidth: data.minWidth || '165px'
      })
    "
  >
  </el-table-column>
</template>
<script>
import { getMergedObject } from "@/utils/util";
import hlRecursiveTitle from "./recursive-title";
export default {
  components: {
    hlRecursiveTitle
  },
  props: {
    rowKey: {
      type: String,
      default: ""
    },
    data: {
      type: Object,
      default: () => ({})
    },
    formConfigs: {
      type: Object,
      default: () => ({})
    }
  },
  created() {},
  methods: {
    getMergedObject
  }
};
</script>
