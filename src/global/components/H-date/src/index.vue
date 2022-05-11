<!--
 * @Author: haifang.qin
 * @Date: 2022-04-28 09:32:32
 * @LastEditors: haifang.qin
 * @LastEditTime: 2022-05-05 14:26:53
 * @FilePath: \vue-project\src\global\components\H-table\src\index.vue
-->
<template>
  <div>
    <el-date-picker
      v-model="dateValue"
      :type="dateConfig.type || 'date'"
      placeholder="选择日期"
      v-bind="
        getMergedObject(dateConfig.extend ? dateConfig.extend : dateConfig, {
          placeholder: '选择日期',
          valueFormat: formatFun(),
          format: formatFun(),
          rangeSeparator: '至',
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期',
          editable: false,
          clearIcon: 'el-icon-close',
          pickerOptions: pickerOptions
        })
      "
      v-on="getMergedObject(dateConfig.extend, {})"
    >
    </el-date-picker>
  </div>
</template>
<script>
import { getMergedObject } from "@/utils/util";
import { shortcuts } from "./pickerOptions";
export default {
  props: {
    initValue: {
      type: [String, Array],
      default: ""
    },
    dateConfig: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      dateValue: "",
      pickerOptions: {
        shortcuts: []
      }
    };
  },
  watch: {
    dateValue: function(newVal) {
      this.$emit("input", newVal);
    },
    initValue: function(newVal) {
      this.dateValue = newVal;
    }
  },
  created() {
    const { dateConfig } = this;
    if (dateConfig.extend.visibleShortcut) {
      this.pickerOptions.shortcuts = shortcuts;
    }
    console.log(111, this.pickerOptions);
  },
  mounted() {
    const { dateConfig } = this;
  },
  methods: {
    getMergedObject,
    init() {
      this.dateValue = this.initValue || "";
    },
    formatFun() {
      const type = this.dateConfig.extend
        ? this.dateConfig.extend.type
        : this.dateConfig.type;
      switch (type) {
        case "week":
          return "yyyy-MM-dd";
        case "month":
          return "yyyy-MM";
        case "year":
          return "yyyy";
        case "daterange":
          return "yyyyyy-MM-dd";
        default:
          return "yyyy-MM-dd";
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
