<template>
  <div class="news">
    <div class="buttons">
      <div class="button">
        <el-button type="primary" icon="el-icon-edit" @click="goPublish">新增</el-button>
        <el-button type="primary" icon="el-icon-delete">删除</el-button>
      </div>
      <div class="button" style="margin-right: 50px">
        <el-input style="width: 150px"></el-input>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <el-table
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
        label="日期"
        prop="date"
        width="120">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="300">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        prop="tag"
        label="状态"
        width="100"
        :filters="[{ text: '禁用', value: '禁用' }, { text: '正常', value: '正常' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '禁用' ? 'primary' : 'success'"
            disable-transitions>{{scope.row.tag}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="page-num"
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name   : 'index',
    data() {
      return {
        tableData3       : [{
          date   : '2016-05-03',
          title   : '今年上半年，央企交出亮眼成绩单！',
          description: '不止6月，整个上半年，央企经济运行都保持了稳中向好的态势，收入利润持续快速增长，创历史同期最好水平，交出了一份亮眼的成绩单——累计实现营业收入13.7万亿元，同比增长10.1%；实现增加值3.5万亿元，同比增长7.5%；实现利润8877.9亿元，同比增长23%；上交税费总额1.2万亿元，同比增长10.3%。',
          tag    : '禁用'
        },{
          date   : '2016-05-03',
          title   : '今年上半年，央企交出亮眼成绩单！',
          description: '不止6月，整个上半年，央企经济运行都保持了稳中向好的态势，收入利润持续快速增长，创历史同期最好水平，交出了一份亮眼的成绩单——累计实现营业收入13.7万亿元，同比增长10.1%；实现增加值3.5万亿元，同比增长7.5%；实现利润8877.9亿元，同比增长23%；上交税费总额1.2万亿元，同比增长10.3%。',
          tag    : '禁用'
        },{
          date   : '2016-05-03',
          title   : '今年上半年，央企交出亮眼成绩单！',
          description: '不止6月，整个上半年，央企经济运行都保持了稳中向好的态势，收入利润持续快速增长，创历史同期最好水平，交出了一份亮眼的成绩单——累计实现营业收入13.7万亿元，同比增长10.1%；实现增加值3.5万亿元，同比增长7.5%；实现利润8877.9亿元，同比增长23%；上交税费总额1.2万亿元，同比增长10.3%。',
          tag    : '正常'
        },{
          date   : '2016-05-03',
          title   : '今年上半年，央企交出亮眼成绩单！',
          description: '不止6月，整个上半年，央企经济运行都保持了稳中向好的态势，收入利润持续快速增长，创历史同期最好水平，交出了一份亮眼的成绩单——累计实现营业收入13.7万亿元，同比增长10.1%；实现增加值3.5万亿元，同比增长7.5%；实现利润8877.9亿元，同比增长23%；上交税费总额1.2万亿元，同比增长10.3%。',
          tag    : '正常'
        },{
          date   : '2016-05-03',
          title   : '今年上半年，央企交出亮眼成绩单！',
          description: '不止6月，整个上半年，央企经济运行都保持了稳中向好的态势，收入利润持续快速增长，创历史同期最好水平，交出了一份亮眼的成绩单——累计实现营业收入13.7万亿元，同比增长10.1%；实现增加值3.5万亿元，同比增长7.5%；实现利润8877.9亿元，同比增长23%；上交税费总额1.2万亿元，同比增长10.3%。',
          tag    : '禁用'
        },{
          date   : '2016-05-03',
          title   : '今年上半年，央企交出亮眼成绩单！',
          description: '不止6月，整个上半年，央企经济运行都保持了稳中向好的态势，收入利润持续快速增长，创历史同期最好水平，交出了一份亮眼的成绩单——累计实现营业收入13.7万亿元，同比增长10.1%；实现增加值3.5万亿元，同比增长7.5%；实现利润8877.9亿元，同比增长23%；上交税费总额1.2万亿元，同比增长10.3%。',
          tag    : '禁用'
        },{
          date   : '2016-05-03',
          title   : '今年上半年，央企交出亮眼成绩单！',
          description: '不止6月，整个上半年，央企经济运行都保持了稳中向好的态势，收入利润持续快速增长，创历史同期最好水平，交出了一份亮眼的成绩单——累计实现营业收入13.7万亿元，同比增长10.1%；实现增加值3.5万亿元，同比增长7.5%；实现利润8877.9亿元，同比增长23%；上交税费总额1.2万亿元，同比增长10.3%。',
          tag    : '禁用'
        },{
          date   : '2016-05-03',
          title   : '今年上半年，央企交出亮眼成绩单！',
          description: '不止6月，整个上半年，央企经济运行都保持了稳中向好的态势，收入利润持续快速增长，创历史同期最好水平，交出了一份亮眼的成绩单——累计实现营业收入13.7万亿元，同比增长10.1%；实现增加值3.5万亿元，同比增长7.5%；实现利润8877.9亿元，同比增长23%；上交税费总额1.2万亿元，同比增长10.3%。',
          tag    : '禁用'
        },{
          date   : '2016-05-03',
          title   : '今年上半年，央企交出亮眼成绩单！',
          description: '不止6月，整个上半年，央企经济运行都保持了稳中向好的态势，收入利润持续快速增长，创历史同期最好水平，交出了一份亮眼的成绩单——累计实现营业收入13.7万亿元，同比增长10.1%；实现增加值3.5万亿元，同比增长7.5%；实现利润8877.9亿元，同比增长23%；上交税费总额1.2万亿元，同比增长10.3%。',
          tag    : '禁用'
        },{
          date   : '2016-05-03',
          title   : '今年上半年，央企交出亮眼成绩单！',
          description: '不止6月，整个上半年，央企经济运行都保持了稳中向好的态势，收入利润持续快速增长，创历史同期最好水平，交出了一份亮眼的成绩单——累计实现营业收入13.7万亿元，同比增长10.1%；实现增加值3.5万亿元，同比增长7.5%；实现利润8877.9亿元，同比增长23%；上交税费总额1.2万亿元，同比增长10.3%。',
          tag    : '禁用'
        }, ],
        multipleSelection: []
      };
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      goPublish(){
        this.$router.push('/article/create');
      }
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
