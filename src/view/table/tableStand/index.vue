<!--
 * @Author: haifang.qin
 * @Date: 2022-04-27 09:57:33
 * @LastEditors: haifang.qin
 * @LastEditTime: 2022-04-29 11:43:38
 * @FilePath: \vue-project\src\view\table\tableStand\index.vue
-->
<template>
  <div>
    <div class="searchBox">
      <div class="isFlex">
        <H-form
          ref="form"
          v-model="searchForm"
          :form-config="formConfig"
        ></H-form>
        <el-button type="primary">查询</el-button>
      </div>
      <el-button type="primary">新增</el-button>
    </div>
    <H-table ref="tables" :tableConfig="tableConfig"></H-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchForm: {},
      // 搜索表单
      formConfig: {
        layout: "inlineBlock",
        noMargin: true,
        data: [
          {
            type: "select",
            label: "用户状态：",
            width: 200,
            labelWidth: "78px",
            name: "status",
            placeholder: "请选择状态",
            // textBefore: "textBefore",
            // type: "button", //divider
            options: [
              {
                value: "选项1",
                label: "黄金糕"
              },
              {
                value: "选项2",
                label: "双皮奶"
              },
              {
                value: "选项3",
                label: "蚵仔煎"
              },
              {
                value: "选项4",
                label: "龙须面"
              },
              {
                value: "选项5",
                label: "北京烤鸭"
              }
            ]
          },
          {
            type: "input",
            label: "用户名称：",
            width: 200,
            labelWidth: "78px",
            name: "content"
          }
        ]
      },
      tableConfig: {
        results: [],
        autoHeight: true,
        data: [
          {
            name: "id",
            label: "Id"
          },
          {
            name: "username",
            label: "用户名"
          },
          {
            name: "address",
            label: "地址"
          }
        ],
        http: {
          url: "/user/list/get",
          params: this.searchForm,
          method: "get"
        }
      }
    };
  }
};
</script>
