<template>
  <div class="autocomplete">
    <el-autocomplete
      class="autocompleteBox"
      v-model="autocompleteValue"
      :fetch-suggestions="querySearchAsync"
      v-bind="
        getMergedObject(
          searchConfig.extend ? searchConfig.extend : searchConfig,
          {
            maxlength: searchConfig.maxlength || 30,
            placeholder: searchConfig.placeholder || '请输入'
          }
        )
      "
    >
      <i class="el-icon-search el-input__icon" slot="prefix"> </i
    ></el-autocomplete>
  </div>
</template>
<script>
import { getMergedObject } from "@/utils/util";
export default {
  name: "hlAutocomplete",
  data() {
    return {
      autocompleteValue: ""
    };
  },
  props: {
    searchConfig: {
      type: Object,
      default: () => {
        return {};
      }
    },
    value: {
      type: String,
      default: ""
    }
  },
  watch: {
    autocompleteValue: function(newVal, oldVal) {
      this.$emit("input", newVal);
    },
    value(v) {
      this.autocompleteValue = v;
    }
  },
  mounted() {},
  methods: {
    getMergedObject,
    querySearchAsync(queryString, cb) {
      const { url, params, method, onSuccess } = this.searchConfig.http;
      params.content = this.autocompleteValue;

      this.$fetch({
        url, // 配置过来的请求地址
        params,
        method: "get",
        config: {
          showLoading: false
        }
      }).then(res => {
        console.log("res", res);
        // 成功回调并获得用户调整的参数
        if (onSuccess) {
          // 回填经过上层onSuccess拦截处理后的表格数据
          res = onSuccess(res, this) || res;
        }
        cb(res);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.autocomplete {
  width: 100%;
  ::v-deep .el-autocomplete {
    width: 100%;
  }
  ::v-deep .el-input__inner {
    height: 28px;
    line-height: 28px;
    padding: 0 10px 0 35px;
    border-radius: 2px;
  }
  ::v-deep .el-input__prefix {
    left: 10px;
  }
  ::v-deep .el-input__icon {
    width: 15px;
    font-size: 15px;
  }
}
</style>
