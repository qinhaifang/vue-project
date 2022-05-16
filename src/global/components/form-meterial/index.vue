<template>
  <div class="form-material-inline">
    <template v-if="materialConfig.textBefore">
      <span class="text-before" v-html="materialConfig.textBefore" />
    </template>
    <div
      v-else-if="materialConfig.type === 'divider'"
      class="divider--horizontal"
      v-bind="extend"
    ></div>
    <div v-else-if="materialConfig.type === 'button'">
      <el-button type="primary">待定</el-button>
    </div>
    <el-form-item
      v-else
      ref="formItem"
      :label-width="materialConfig.labelWidth || extend.labelWidth"
      v-bind="extend"
      :class="[
        'form-item',
        materialConfig.className,
        materialConfig.disabled && 'form-item-disabled',
        formConfig.noMargin && 'form-item-noMargin',
        materialConfig.noMargin && 'form-item-noMargin',
        !materialConfig.label ? 'has-label-placeholder' : '',
        (materialConfig.readonly || formConfig.readonly) && 'form-item-readonly'
      ]"
    >
      <template
        v-if="
          materialConfig.label &&
            (formConfig.layout !== 'flow' ||
              formConfig.searchConfig ||
              bkConfig.labelPosition !== 'top')
        "
        #label
      >
        <div class="label-box">
          <div class="label-text">
            <i
              v-if="
                materialConfig.readonlyShow ||
                  formConfig.readonlyShow ||
                  (!(materialConfig.readonly || formConfig.readonly) &&
                    (materialConfig.required ||
                      (Array.isArray(materialConfig.rules) &&
                        materialConfig.rules.find(item => !!item.required))))
              "
              class="form-item-required"
            >
              *
            </i>
            <!-- {{ materialConfig.label }} -->
          </div>
        </div>
      </template>
      <div
        :class="[
          'form-item-content',
          materialConfig.textWrap && 'form-item-block'
        ]"
      >
        <template>
          <!-- 编辑控件 -->
          <template>
            <!-- 輸入框 -->
            <template v-if="type === 'input'">
              <el-input
                v-model="formParams[name]"
                placeholder="请输入内容"
              ></el-input>
            </template>
            <!-- 选择器 -->
            <template v-if="type === 'select'">
              <el-select
                v-model="formParams[name]"
                :placeholder="materialConfig.placeholder || '请选择'"
              >
                <el-option
                  v-for="item in materialConfig.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
            <!-- autocomplete -->
            <template v-else-if="type === 'autocomplete'">
              <H-autocomplete
                :searchConfig="materialConfig"
                v-on:keyup.enter.native="materialConfig.extend.callback"
                v-model="formParams[name]"
              ></H-autocomplete>
            </template>
          </template>
        </template>
      </div>
    </el-form-item>
  </div>
</template>
<script>
import {
  getMergedObject,
  nameMatchType,
  allKeysValueExpected,
  subStrByNum,
  hasField,
  formatDateEL,
  isDate
} from "@/utils/util";
export default {
  props: {
    //表单所有元件参数
    formConfig: {
      required: true,
      type: Object,
      default: () => ({})
    },
    // 元件配置
    materialConfig: {
      required: true,
      type: Object,
      default: () => ({})
    },
    // 表单所有元件参数
    formParams: {
      type: Object,
      required: true
    },
    // 支持所有elementUI组件的配置
    extend: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      type: "", // 组件类型
      name: "" // 组件唯一标识
    };
  },
  watch: {
    formParams: {
      handler() {
        // 表单值发生变化时告知父元素
        this.$emit("formParamsChange", this.formParams);
        // this.setMaterialReadLabel();
      },
      deep: true
    }
  },
  created() {
    const {
      name,
      type,
      props,
      extraFields,
      options,
      http
    } = this.materialConfig;
    this.name = name;
    this.type = type;
  }
};
</script>
<style lang="scss" scoped>
.form-material-inline {
}
</style>
