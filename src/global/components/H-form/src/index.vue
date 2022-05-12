<!--
 * @Author: haifang.qin
 * @Date: 2022-04-28 09:32:32
 * @LastEditors: haifang.qin
 * @LastEditTime: 2022-05-05 14:26:53
 * @FilePath: \vue-project\src\global\components\H-table\src\index.vue
-->
<template>
  <div class="form-wrapper">
    <el-form
      ref="formGroup"
      :model="formParams"
      :class="[
        (formConfig.layout && `form-${formConfig.layout}`) || 'form-grid',
        formConfig.noMargin && 'form-item-noMargin',
        formConfig.border && `form-border`
      ]"
    >
      <template
        v-if="
          (formConfig.layout === 'flow' ||
            formConfig.layout === 'inlineBlock') &&
            formConfig.media !== false &&
            Array.isArray(formConfig.data)
        "
      >
        <template v-for="materialConfig in formConfig.data">
          <div
            :key="materialConfig.name"
            :class="{
              'form-material': true,
              hide: dependOnChange(materialConfig),
              'search-show': handleSearchFormVisible(materialConfig),
              [materialConfig.className]: materialConfig.className
            }"
            :style="{
              width:
                (formConfig.layout === 'inlineBlock' &&
                  materialConfig.width + 'px') ||
                '100%'
            }"
          >
            <Form-meterial
              :ref="`form-${materialConfig.name}`"
              :form-config="formConfig"
              :form-params="formParams"
              :material-config="materialConfig"
              :extend="
                materialConfig.extend ? materialConfig.extend : materialConfig
              "
            ></Form-meterial>
          </div>
        </template>
      </template>
    </el-form>
  </div>
</template>
<script>
import { getMergedObject, allKeysValueExpected, hasField } from "@/utils/util";
import FormMeterial from "./../../form-meterial/index.vue";
export default {
  components: { FormMeterial },
  props: {
    formConfig: {
      required: true,
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      formParams: {} //表单所有参数集合
    };
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    getMergedObject,
    /**
     * 依赖字段值匹配时隐藏
     * @param {Object} materialConfig 元组件配置
     */
    dependOnChange(materialConfig) {
      const { depend } = materialConfig;
      const { name, value, visibleSwitch } = depend || {};
      if (
        !depend ||
        !name ||
        value === undefined ||
        value === null ||
        !visibleSwitch
      )
        return false;
      // 默认依赖字段符合预期
      let visibleFlag = true;
      // 根据预期值判断是否有不符合预期的情况
      visibleFlag = allKeysValueExpected({
        value,
        name,
        formParamisArray: this.formParamisArray,
        formParams: this.formParams
      });
      // 控制数据的rules，隐藏的标签都不需要校验数据 v0.13.12
      if (materialConfig.rules) {
        if (visibleSwitch) {
          if (visibleFlag || materialConfig.visible === false) {
            materialConfig.required = false;
            materialConfig.rules.map(item => {
              item.required = false;
              return "";
            });
          } else {
            materialConfig.required = true;
            materialConfig.rules.map(item => {
              item.required = true;
              return "";
            });
          }
        }
      }
      return visibleFlag;
    },
    /**
     * 针对list组件查询条件部分的显示隐藏
     */
    handleSearchFormVisible(materialConfig) {
      const { noFold, visible, name } = materialConfig;
      const { layout } = this.formConfig;
      let visibleVal;
      if (typeof visible === "function") {
        visibleVal = visible.call(materialConfig, this);
      } else if (typeof visible === "boolean") {
        visibleVal = visible;
      }
      if (hasField(materialConfig, "noFold")) {
        if (noFold === true && hasField(materialConfig, "visible")) {
          return visibleVal;
        }
        return noFold;
      }
      if (hasField(materialConfig, "visible")) {
        return visibleVal;
      }
      if (layout === "flow" && !name) {
        return false;
      }
      return true;
    }
  }
};
</script>
<style lang="scss" src="./index.scss"></style>
