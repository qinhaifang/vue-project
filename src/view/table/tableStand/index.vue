<!--
 * @Author: haifang.qin
 * @Date: 2022-04-27 09:57:33
 * @LastEditors: haifang.qin
 * @LastEditTime: 2022-04-29 11:43:38
 * @FilePath: \vue-project\src\view\table\tableStand\index.vue
-->
<template>
  <div>
    <H-table :table-config="tableConfig"></H-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchForm: {},
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
