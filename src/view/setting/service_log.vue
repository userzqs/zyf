<template>
  <div>
    <div class="title">服务日志</div>
    <el-table :data="logList" size="mini">
      <el-table-column label="编号" type="index"></el-table-column>
      <el-table-column label="用户" prop="username"></el-table-column>
      <el-table-column label="操作" prop="function"></el-table-column>
      <el-table-column label="状态" prop="status">
        <template slot-scope="scope">
          <el-tag type="error" size="mini" v-if="scope.row.status==0">失败</el-tag>
          <el-tag type="success" size="mini" v-if="scope.row.status==1">成功</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="时间" prop="createAt"></el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :current-page.sync="page"
      @current-change="handlePageChange"
      :page-size="size"
    ></el-pagination>
  </div>
</template>

<script>
import api from "../../api";
export default {
  data() {
    return {
      total: 0,
      page: 1,
      size: 10,
      logList: []
    };
  },
  mounted() {
    this.handlePageChange(1);
  },
  methods: {
    handlePageChange(page) {
      api.service.servelog(page, this.size).then(data => {
        this.total = data.total;
        this.page = data.page;
        // this.size = data.size;
        this.logList = data.list;
      });
    }
  }
};
</script>

<style>
.title {
  font-size: 20px;
  font-weight: 600;
  padding-left: 12px;
  border-left: 4px solid #4874ed;
  color: #292929;
  margin-bottom: 24px;
}
</style>
