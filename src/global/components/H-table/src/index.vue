<!--
 * @Author: haifang.qin
 * @Date: 2022-04-28 09:32:32
 * @LastEditors: haifang.qin
 * @LastEditTime: 2022-06-06 14:41:50
 * @FilePath: \vue-project\src\global\components\H-table\src\index.vue
-->
<template>
  <div class="list-wrapper">
    <div class="table-wrapper" ref="table">
      <!-- table -->
      <el-table
        ref="list"
        v-if="!tableConfig.autoHeight || maxHeight"
        :data="tableData"
        v-loading="loadingStatus"
        v-bind="tableBind()"
      >
        <!--序号列: 默认是有序号的-->
        <el-table-column type="index" label="序号" width="80" />

        <template v-if="Array.isArray(tableColumnData)">
          <template v-for="item in tableColumnData">
            <!--操作列-->
            <template v-if="item && item.type === 'operation'">
              <el-table-column
                :key="item.name"
                :prop="item.name"
                :label="item.label"
                :width="item.width || getOpertionWidth(item.data)"
                v-bind="
                  getMergedObject(item.extend, {
                    fixed: 'right',
                    align: 'left'
                  })
                "
                class-name="list-operation"
              >
                <template slot-scope="scope">
                  <div class="table-btn-wrapper">
                    <hl-button
                      :tableRow="scope.row"
                      :buttonConfig="item.data"
                    ></hl-button>
                  </div>
                </template>
              </el-table-column>
            </template>
            <!-- 常规显示 -->
            <recursive-title
              :key="item.name"
              v-bind="{
                rowKey: rowKey,
                data: item,
                formConfigs: formConfigs
              }"
            />
          </template>
        </template>
      </el-table>
    </div>
    <!-- 分页区域 -->
    <div
      ref="pagination"
      v-if="tableConfig.http && !tableConfig.noPagination"
      class="pagination-wrapper"
    >
      <template>
        <el-pagination
          v-show="tableData.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="paginationSetting[listDataProps.pageNumber]"
          :page-sizes="tableConfig.pageSizes || [100, 200, 500]"
          :page-size="paginationSetting[listDataProps.pageSize]"
          :total="Number(totalCount)"
          v-bind="
            getMergedObject(tableConfig.extend, {
              layout: 'total, sizes, prev, pager, next, jumper',
              background: false
            })
          "
          class="pagination-content"
        />
      </template>
    </div>
  </div>
</template>
<script>
import {
  isEmptyObj,
  getMergedObject,
  toUnitNumber,
  deepCopy,
  hasField,
  stringIsHTML,
  targetStyle,
  isIE
} from "@/utils/util";
import RecursiveTitle from "./recursive-title.vue";
import tableColumnsRender from "./render";
export default {
  components: { RecursiveTitle, tableColumnsRender },
  props: {
    tableConfig: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data() {
    const { tableConfig } = this;
    const bkConfig = this.$root.bkConfig || this.$bkConfig;
    /**
     * @namespace 数据对应字段
     */
    const listDataProps = Object.assign(
      {
        data: "data",
        results: "results",
        pageNumber: "pageNumber",
        pageSize: "pageSize",
        totalCount: "totalCount"
      },
      tableConfig.props
    );
    return {
      bkConfig,
      maxHeight: "",
      rowKey: "index", // 行唯一标记
      listDataProps, // 字段配置
      data: [],
      tableData: [], //表格数据
      totalCount: 0, // 总数
      tableColumnDataCache: [],
      tableColumn: [], // 缓存tableConfig的data，避免修改source，便于进行缓存操作
      // 分页数据
      paginationSetting: {
        [listDataProps.pageNumber]: 1, // 当前页
        [listDataProps.pageSize]:
          (tableConfig && tableConfig.size) ||
          (tableConfig.pageSizes ? tableConfig.pageSizes[0] : 100) // 每页长度
      },
      sortFlag: false, // 排序标识
      sortParams: {}, // 排序参数
      formConfigs: {}, // 聚合行内表单
      loadingStatus: !!(tableConfig.http && tableConfig.http.url) // 数据加载状态
    };
  },
  computed: {
    tableColumnData() {
      // 代替tableConfig.data, 在组件中修改数据, 可以在此过滤表格项，节省代码，统一管理
      let col;
      if (this.tableColumnDataCache && this.tableColumnDataCache.length === 0) {
        col = this.tableConfig.data;
      } else {
        col = this.tableColumnDataCache;
      }
      const columns = col
        .filter(item => {
          if (item.visible === false) {
            return false;
          }
          if (item.bkVisible === false) {
            return false;
          }
          return true;
        })
        .sort((pre, next) => pre.bkIndex - next.bkIndex);
      return columns;
    }
  },
  watch: {
    tableData: {
      handler(val) {}
    }
  },
  created() {
    // 设置 rowkey
    // this.rowKey =
    //   (tableConfig.extend && tableConfig.extend["row-key"]) || this.rowKey;
    this.getTableData();
  },
  mounted() {
    const { autoHeight = true } = this.tableConfig;
    // 必须在所以节点渲染完后执行,
    this.$nextTick(() => {
      // 请求表格数据 依照筛选数据
      if (autoHeight) {
        this.initTableHeight();
      }
      if (isIE()) {
        // 解决elementUI分页页码选择器在IE下光标聚焦的问题
        const { pagination } = this.$refs;
        const paginationSelect =
          pagination && pagination.querySelector("input.el-input__inner");
        if (paginationSelect)
          paginationSelect.setAttribute("unselectable", "on");
      }
      // this.bindSortable();
    });
  },
  methods: {
    getMergedObject,
    indexMethod(index) {
      index =
        index +
        1 +
        (this.paginationSetting[this.listDataProps.pageNumber] - 1) *
          this.paginationSetting[this.listDataProps.pageSize];
      return index;
    },
    //获取操作列的宽度
    getOpertionWidth(arr) {
      if (!Array.isArray(arr)) return false;
      return arr.length * 14 + 20 + 40 + (arr.length - 1 || 1) * 20;
    },
    initRowConfig() {
      if (Array.isArray(this.tableData)) {
        this.tableData.forEach((item, index) => {
          const row = item;
          row.index = index;
          this.rowFormItemTogather(row);
        });
      }
    },
    getTableData(needScroll = false, extra, flag) {
      const { tableConfig, paginationSetting, listDataProps } = this;
      if (!tableConfig.http || !tableConfig.http.url) return;
      const { params, onBefore } = tableConfig.http;
      const { extend, selection, radio, showLoading } = tableConfig;
      const tableConfigParams = params || {};
      let currentParams = Object.assign(tableConfigParams, paginationSetting);
      // 扩强请求的参数
      if (extra) {
        currentParams = Object.assign({}, currentParams, extra);
      }
      // 排序请求参数
      if (this.sortFlag) {
        currentParams = Object.assign({}, currentParams, sortParams);
      }
      // 请求前置
      if (typeof onBefore === "function") {
        const realParams = onBefore(currentParams, this);
        if (realParams === false) {
          this.loadingStatus = false;
          return;
        }
        currentParams = realParams || currentParams;
      }
      const {
        url,
        method,
        onSuccess,
        onFaild,
        onSuccessTotal
      } = tableConfig.http;

      this.loadingStatus = showLoading;
      this.scrollToTableLeft();
      const { data, results, totalCount } = listDataProps;
      this.$fetch({
        url, // 配置过来的请求地址
        data: currentParams,
        method: method || "post",
        config: { showLoading: showLoading }
      })
        .then(res => {
          this.loadingStatus = false;
          let list = [];
          this.tableData = res.data.userList;
          this.totalCount = res.data.total || 0;
        })
        .catch(e => {
          this.loadingStatus = false;
        });
    },
    /**
     * 更改页面size
     */
    handleSizeChange(size) {
      if (this.paginationSetting[this.listDataProps.pageSize] !== size) {
        this.paginationSetting[this.listDataProps.pageSize] = size;
        // 重绘table高度
        // if (this.tableConfig.autoHeight) this.initTableHeight();
      }
      // 静态分页
      if (this.tableDataTotalFlag) {
        this.setStaticListStatus({ startIndex: 0, pageCurrent: 1 });
        return;
      }
      // 异步分页
      this.getTableData(true);
    },
    /**
     * 切换页码
     * @param {Boolean} flag 是否清空跳转页数内容
     */
    handleCurrentChange(pageIndex, flag) {
      // 单选不涉及跨页选择数据，为了防止切换页码后，tableSelection仍然保留有上一页选择的数据，在此对单选情况做清空处理。
      if (this.radio !== "") {
        this.radio = "";
        this.tableSelection = [];
      }
      this.paginationSetting[this.listDataProps.pageNumber] = pageIndex;
      // 静态分页
      const size = this.paginationSetting[this.listDataProps.pageSize];
      if (this.tableDataTotalFlag) {
        this.setStaticListStatus({ startIndex: (pageIndex - 1) * size });
        return;
      }
      // 异步分页
      this.getTableData(true, null, flag);
    },
    /**
     * 静态处理列表的展示状态
     * @param {Object} obj 配置对象
     * @param {} obj.startIndex 配置对象
     */
    setStaticListStatus(obj = {}) {
      const { startIndex, pageCurrent } = obj;
      if (startIndex !== undefined && startIndex !== null) {
        this.startIndex = startIndex;
      }
      if (pageCurrent !== undefined && pageCurrent !== null) {
        this.paginationSetting[this.listDataProps.pageNumber] = pageCurrent;
      }
      this.tableData = this.tableDataTotal.slice(
        this.startIndex,
        this.startIndex + this.paginationSetting[this.listDataProps.pageSize]
      );
    },
    /**
     * 查询数据时table横向滚动复原
     */
    scrollToTableLeft() {
      const elTable = this.$refs.table;
      if (!elTable) return;
      const elBody = elTable.getElementsByClassName(
        "el-table__body-wrapper"
      )[0];
      if (elBody) elBody.scrollLeft = 0;
    },
    /**
     * @desc table动态绑定属性
     */
    tableBind() {
      const bindObj = {
        "show-overflow-tooltip": true,
        border: true,
        stripe: true
      };
      const { tableConfig, maxHeight, reserveSelection } = this;
      const { autoHeight, extend } = tableConfig;
      // 自动适应高度
      if (autoHeight) {
        bindObj.height = maxHeight;
      }
      // 选中高亮 表现与行自动选中有冲突
      if (tableConfig.selection === false && tableConfig.radio === true) {
        bindObj["highlight-current-row"] = true;
      }
      // 为跨页多选设置一个row - key;
      if (extend && !extend["row-key"] && reserveSelection === true)
        bindObj["row-key"] = this.rowKey;
      return Object.keys(bindObj).length
        ? getMergedObject(extend, bindObj)
        : extend;
    },
    /**
     * 按照一屏显示设置表格的最大高度，
     */
    initTableHeight() {
      const { table, pagination } = this.$refs;

      // 窗口的高度
      const winHeight = window.innerHeight;
      // 主容器实际的距离顶部的高
      // getBoundingClientRect()用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置。
      // top,lef,right,bottom,width,height
      const tableTop = table.getBoundingClientRect().top + window.pageYOffset;
      // 主容器样式
      const computedStyle = targetStyle(table);
      // 主容器margin
      const tableMarginTop = toUnitNumber(computedStyle.marginTop);
      const tableMarginBottom = toUnitNumber(computedStyle.marginBottom);
      // 获得底部的高度
      let parantsOffterBottom = this.getParentsOffsetBottom(table);
      // 这是按表格为页面最底部计算，允许设置部偏移值
      if (
        typeof this.tableConfig.autoHeight !== "boolean" &&
        this.tableConfig.autoHeight
      ) {
        parantsOffterBottom += this.tableConfig.autoHeight;
      }
      // 获得分页的高度
      let paginationHeight = 2;
      if (pagination) {
        const paginationStyle = targetStyle(pagination);
        paginationHeight += pagination.clientHeight || 0;
        const top = toUnitNumber(paginationStyle.marginTop);
        const bottom = toUnitNumber(paginationStyle.marginBottom);
        paginationHeight += top + bottom;
      }

      // 获得剩余屏幕的高度
      let tableHeight =
        winHeight - tableTop - tableMarginTop - tableMarginBottom;
      // 去除分页的高度
      tableHeight -= paginationHeight;
      //  去除窗口的下边距和填充
      tableHeight -= parantsOffterBottom;
      let initMinHeight = 200;
      if (typeof this.tableConfig.minHeight === "number") {
        initMinHeight = this.tableConfig.minHeight;
      }
      if (tableHeight >= initMinHeight) {
        this.maxHeight = tableHeight;
      } else {
        // 设置最低的表格滚动高度200，或者配置的minHeight。
        this.maxHeight = initMinHeight;
      }
    },
    /**
     * 父级的节点下内外边距
     * @param {String} className  允许用‘，’分割的多className
     */
    getParentsOffsetBottom(el, m = 0) {
      const target = el.parentNode;
      let offset = m;
      if (target) {
        const style = targetStyle(target);
        offset += toUnitNumber(style.marginBottom);
        offset += toUnitNumber(style.paddingBottom);
      }

      // 继续递归
      if (target.parentNode && target.parentNode.nodeName !== "HTML") {
        return this.getParentsOffsetBottom(target, offset);
      }

      return offset;
    },

    /**
     * 处理多级表头的formConfig 递归
     */
    handleRowFormItem(item, row, formConfig) {
      const { rowKey } = this;
      const guid = row[rowKey];
      if (item.type !== "operation" && !item.formExtend) {
        const { data } = item;
        if (data && data.length != 0) {
          for (let i = 0; i < data.length; i += 1) {
            this.handleRowFormItem(data[i], row, formConfig);
          }
        } else {
          formConfig.data.push(item);
        }
      } else if (item.formExtend) {
        // 设置所有的行表单配置
        const colConfig = deepCopy(item.formExtend);
        colConfig.name = item.name;
        if (Array.isArray(colConfig.independentOptions)) {
          const { independentOptions } = colConfig;
          if (independentOptions[guid]) {
            colConfig.options = independentOptions[guid].options;
          } else {
            colConfig.options = independentOptions[0].options;
          }
        }
        // 为cell配置操作行
        const { extend } = colConfig;
        if (extend && (extend.change || extend.blur)) {
          colConfig.extend = this.setRowChangeBind(row, colConfig);
        }
        formConfig.data.push(colConfig);
      }
    },
    /**
     * 聚合表格内每行的表单元素，方便进行关联、禁用等操作
     * @param {Object} row 当前数据
     */
    rowFormItemTogather(row) {
      const { tableConfig, rowKey } = this;

      const guid = row[rowKey];
      let formConfig = this.formConfigs[guid];
      if (formConfig) return;
      // 创建配置级
      formConfig = { data: [] };
      this.$set(this.formConfigs, guid, formConfig);
      if (this.tableConfig.mode === "readonly") {
        // 保存当前状态
        this.$set(formConfig, "readonly", formConfig.readonly !== false);
      }
      if (Array.isArray(tableConfig.data) === false) return;
      tableConfig.data.forEach(item => {
        this.handleRowFormItem(item, row, formConfig);
      });
    },
    /**
     * 行编辑事件选中当前行配置
     * @param {Object} row 行数据
     * @param {Object} cfg 操作配置
     */
    setRowChangeBind(row, cfg) {
      const { extend } = cfg;
      if (!extend.isSetBind) {
        extend.isSetBind = true;
        const { change, blur } = extend;
        if (change)
          extend.change = event => this.setRowChangeFn(event, row, change, cfg);
        if (blur)
          extend.blur = event => this.setRowChangeFn(event, row, blur, cfg);
      }
      return extend;
    },
    /**
     * 行编辑选中当前行并执行事件函数
     * @param {Objecy} event
     * @param {Object} row
     * @param {Function} fn 事件函数
     * @param { Object } cfg 当前配置
     */
    setRowChangeFn(event, row, fn, cfg) {
      this.operationIndex = row[this.rowKey];
      const val = row[cfg.name];
      if (fn) fn(val, event);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../style/index.scss";
.list-wrapper {
  .table-wrapper {
    .el-table__header .has-gutter th.is-leaf:nth-last-child(2) {
      border-right: none;
    }
    .el-table {
      overflow: auto;
    }
    .el-table::before {
      height: 0;
    }
    .el-table--group::after,
    .el-table--border::after {
      height: 0;
    }
    .el-table__fixed::before,
    .el-table__fixed-right::before {
      height: 0;
    }
    //表格样式
    .el-table {
      .formBlock {
        span {
        }
        .scopeHeaderInput {
        }
      }
      .formInlineBlock {
        display: flex;
        align-items: center;
        height: 45px;
        span {
          margin-right: 20px;
        }
        .scopeHeaderInput {
          flex: 1;
        }
      }
      .emptyImgBox {
        padding: 20px;
      }
      .el-form-item {
        margin-bottom: 0;
      }
      .el-input__inner {
        height: 28px;
        line-height: 28px;
      }
      .el-input-number {
        line-height: 28px;
      }
      .el-input-number__decrease,
      .el-input-number__increase {
        width: 28px;
      }
      .list-operation {
        .cell {
          padding-right: 40px;
        }
      }
      td,
      th {
        padding: 0;
        height: 33px;
      }
      th {
        background: #e9e9f5;
        & {
          border-right: 1px solid #d4d4d9;
          border-bottom: 1px solid #d4d4d9;
        }
        & > .cell {
          font-size: 14px;
          color: #575d6c;
        }
      }
      td {
        & {
          border-right: 0;
        }
        & > .cell {
          font-size: 12px;
          color: #666;
        }
      }
      .ascending .sort-caret.ascending {
        border-bottom-color: #000;
      }
      .descending .sort-caret.descending {
        border-top-color: #000;
      }
      .sort-caret.ascending {
        border-bottom-color: #999;
      }
      .sort-caret.descending {
        border-top-color: #999;
      }
      .el-table__row {
        border-bottom: 1px solid #efefef;
        &:last-child {
          .el-table__cell {
            // border-bottom: 0;
          }
        }
      }
      .el-table__body tr.el-table__row--striped td.el-table__cell {
        background-color: #efefef;
      }
      .el-table__body tr.hover-row.current-row > td,
      .el-table__body tr.hover-row.el-table__row--striped.current-row > td,
      .el-table__body tr.hover-row.el-table__row--striped > td,
      .el-table__body tr.hover-row > td {
        background-color: #d9f3ed;
      }
    }
    .el-table .cell,
    .el-table th div,
    .el-table--border td:first-child .cell,
    .el-table--border th:first-child .cell {
      padding-left: 20px;
      &.scopeHeaderInput {
        padding-left: 0;
      }
    }
    .el-table .cell,
    .el-table th div {
      padding-right: 20px;
      &.scopeHeaderInput {
        padding-right: 0;
      }
    }
  }
  //分页样式
  .pagination-wrapper {
    margin-top: 30px;
    height: 28px;
    .el-pagination {
      display: flex;
      justify-content: flex-end;
      .el-input {
        width: 77px;
        .el-input__inner {
          padding-right: 19px;
          font-size: 12px;
          height: 24px;
          line-height: 24px;
        }
      }
      .el-input__icon {
        height: 24px;
        line-height: 24px;
      }
      span:not([class*="suffix"]),
      button {
        min-width: 24px;
        height: 24px;
        line-height: 24px;
      }
      .el-pager li,
      button {
        min-width: 24px;
        height: 24px;
        line-height: 22px;
        font-size: 12px;
        border: 1px solid $--border-color-base;
        color: #666;
        border-radius: 2px;
        margin-left: 8px;
        &.active {
          background: $--color-primary;
          border: 1px solid $--color-primary;
          color: #fff;
        }
      }
      .btn-prev,
      .btn-next {
        padding: 0;
      }
      .el-pagination__sizes {
        margin: 0;
      }
      .el-pagination__jump {
        font-size: 12px;
        margin-left: 10px;
        .el-pagination__editor {
          width: 34px;
          height: 24px;
          &.el-input {
            margin: 0 8px;
            .el-input__inner {
              padding-right: 0;
              padding-left: 0;
            }
          }
        }
      }
    }
  }
}
</style>
