<template>
  <div>
    <el-row class="panel-group" :gutter="40">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class='card-panel' @click="goList('赴加生子福利')">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="star" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">赴加生子福利</div>
            <count-to class="card-panel-num" :startVal="0" :endVal="allList.listOne.count||0" :duration="2600"></count-to>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="goList('成功案例')">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="list" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">成功案例</div>
            <count-to class="card-panel-num" :startVal="0" :endVal="allList.listTwo.count||0" :duration="3000"></count-to>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="goList('月子中心')">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="people" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">月子中心</div>
            <count-to class="card-panel-num" :startVal="0" :endVal="allList.listThree.count||0" :duration="3200"></count-to>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="goList('政策解析')">
          <div class="card-panel-icon-wrapper icon-shoppingCard">
            <svg-icon icon-class="documentation" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">政策解析</div>
            <count-to class="card-panel-num" :startVal="0" :endVal="allList.listFour.count||0" :duration="3600"></count-to>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="panel-group" :gutter="40">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class='card-panel' @click="goList('赴加生子费用')">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="money" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">赴加生子费用</div>
            <count-to class="card-panel-num" :startVal="0" :endVal="allList.listFive.count||0" :duration="2600"></count-to>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="goList('赴加攻略')">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="form" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">赴加攻略</div>
            <count-to class="card-panel-num" :startVal="0" :endVal="allList.listSix.count||0" :duration="3000"></count-to>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="goList('赴加签证')">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="international" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">赴加签证</div>
            <count-to class="card-panel-num" :startVal="0" :endVal="allList.listSeven.count||0" :duration="3200"></count-to>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="goList('大温介绍')">
          <div class="card-panel-icon-wrapper icon-shoppingCard">
            <svg-icon icon-class="table" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">大温介绍</div>
            <count-to class="card-panel-num" :startVal="0" :endVal="allList.listEight.count||0" :duration="3600"></count-to>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import CountTo from 'vue-count-to';
  import {fetchAllList} from "@/api/home"

  export default {
    components: {
      CountTo
    },
    data(){
      return{
        allList:{
          listOne:{},
          listTwo:{},
          listThree:{},
          listFour:{},
          listFive:{},
          listSix:{},
          listSeven:{},
          listEight:{},
        }
      }
    },
    methods   : {
      goList(type) {
        let path;
        if (type === '赴加生子福利') {
          path = '/list-one';
        } else if (type === '成功案例') {
          path = '/list-two';
        } else if (type === '月子中心') {
          path = '/list-three';
        } else if (type === '政策解析') {
          path = '/list-four';
        } else if (type === '赴加生子费用') {
          path = '/list-five';
        } else if (type === '赴加攻略') {
          path = '/list-six';
        } else if (type === '赴加签证') {
          path = '/list-seven';
        } else if (type === '大温介绍') {
          path = '/list-eight';
        } else {
          path = '/home';
        }
        this.$router.push({path});
      }
    },
    mounted(){
      fetchAllList().then(res=>{
        if(res.code===200){
          this.allList=res.data
          console.log('this->allList:')
          console.log(this.allList)
        }
      })
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .panel-group {
    margin-top: 18px;
    .card-panel-col {
      margin-bottom: 32px;
    }
    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);
      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }
        .icon-people {
          background: #40c9c6;
        }
        .icon-message {
          background: #36a3f7;
        }
        .icon-money {
          background: #f4516c;
        }
        .icon-shoppingCard {
          background: #34bfa3
        }
      }
      .icon-people {
        color: #40c9c6;
      }
      .icon-message {
        color: #36a3f7;
      }
      .icon-money {
        color: #f4516c;
      }
      .icon-shoppingCard {
        color: #34bfa3
      }
      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }
      .card-panel-icon {
        float: left;
        font-size: 48px;
      }
      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;
        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }
        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }
</style>
