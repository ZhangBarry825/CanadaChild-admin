<template>
  <div class="news">
    <div class="buttons">
      <div class="button">
        <el-button type="primary" icon="el-icon-edit" @click="goPublish">新增</el-button>
        <el-button type="primary" icon="el-icon-delete" @click="allDelete">删除</el-button>
      </div>
      <div class="button" style="margin-right: 50px">
        <el-input style="width: 150px" v-model="searchText"></el-input>
        <el-button type="primary" @click="searchRes(1,10)" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <el-table v-loading="loading"
      ref="multipleTable"
      :data="tableData3"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">

      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        :formatter = "timeFormat"
        label="日期"
        prop="update_time"
        width="160">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="300"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        prop="status"
        label="状态"
        width="100"
        :filters="[{ text: '禁用', value: 0}, { text: '正常', value: 1 }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === 0 ? 'danger' : 'primary' "
            plain disable-transitions>{{scope.row.status|statusFilter}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button size="mini" type="danger" @click="open2(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="page-num"
      background
      layout="prev, pager, next"
      :current-page="currentPage"
      @current-change="currentChange"
      :total="totalPage">
    </el-pagination>
  </div>
</template>

<script>


  import {getListOne, delListOne} from "@/api/list-one";
  import {searchArticle} from "@/api/article";

  export default {
    name   : 'listFiveIndex',
    data() {
      return {
        tableData3       : [],
        multipleSelection: [],
        totalPage        : 0,
        currentPage      : 1,
        searchText:'',
        loading:false,
        type:'赴加生子费用'
      };
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: '正常',
          0: '禁用'
        };
        return statusMap[status];
      }
    },
    methods: {
      timeFormat(row, column,cellValue){
        let date = new Date();
        date.setTime(cellValue );
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        let second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
      },
      open2($index, row) {
        let that = this;
        this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText : '取消',
          type             : 'warning'
        }).then(() => {
          delListOne(row.id).then(res => {
            if (res.code === 200) {
              this.$message({
                type   : 'success',
                message: '删除成功!'
              });
              that.getItems(that.type, that.currentPage, 10);
            }
          });
        }).catch(() => {
          this.$message({
            type   : 'info',
            message: '已取消删除'
          });
        });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection);
      },
      handleEdit(index, row) {
        this.$router.push('/article/update?id=' + row.id);
      },
      allDelete() {
        if (this.multipleSelection.length < 1) {
          this.$message({
            showClose: true,
            message  : '请先选择要删除的文章!'
          });
        } else {
          let that = this;
          this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText : '取消',
            type             : 'warning'
          }).then(() => {
            let ret = true;
            this.loading=true
            that.multipleSelection.forEach(function (value) {
              delListOne(value.id).then(res => {
                if (res.code !== 200) {
                  ret = false;
                }
              });
            });
            setTimeout(()=>{
              this.loading=false
              if (ret) {
                this.$message({
                  type   : 'success',
                  message: '删除成功!'
                });
              }
              console.log(that.currentPage);
              that.currentPage = 1;
              that.getItems(that.type, 1, 10);
            },3000)


          }).catch(() => {
            this.$message({
              type   : 'info',
              message: '已取消删除'
            });
          });
        }
      },
      filterTag(value, row) {
        return row.status === value;
      },
      goPublish() {
        this.$router.push('/article/create?type='+this.type);
      },
      currentChange(val) {

        if(this.searchText===''){
          console.log(val);
          this.currentPage = val;
          this.getItems(this.type, val, 10);
        }else {
          console.log(val);
          this.currentPage = val;
          this.searchRes(val, 10);
        }
      },
      searchRes(pageNum, pageSize){
        if(this.searchText!==''){
        let key=this.searchText
          let data={
          key:key,
          type:this.type,
          page_num:pageNum,
          page_size:pageSize
          }
        searchArticle(data).then(res => {
          console.log("res:");
          console.log(res);
          if (res.code === 200) {
            this.tableData3 = res.data.rows;
            this.totalPage = res.data.count;
            // this.currentPage = pageNum;
          }
        });
        }else {
          this.getItems(this.type, 1, 10);
        }
      },
      getItems(type, pageNum, pageSize) {
        getListOne(type, pageNum, pageSize).then(res => {
          if (res.code === 200) {
            this.tableData3 = res.data.rows;
            this.totalPage = res.data.count;
          }
        });
      }
    },
    mounted() {
      this.getItems(this.type, 1, 10);
    }
  };
</script>

<style scoped lang="less">
  .news {
    padding-top: 20px;
    .buttons {
      min-width: 1000px;
      width: 100%;
      padding-left: 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .page-num {
      margin-top: 20px;
    }
  }

</style>
