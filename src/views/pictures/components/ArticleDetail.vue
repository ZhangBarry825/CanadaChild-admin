<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">

      <sticky :className="'sub-navbar '+postForm.status">
        <el-button v-loading="loading" v-if="!isEdit" style="margin-left: 10px;" type="success"
                   @click="submitForm">发布
        </el-button>
        <el-button v-loading="loading" v-if="isEdit" style="margin-left: 10px;" type="success"
                   @click="submitForm">修改
        </el-button>
        <!--<el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button>-->
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;">
              <MDinput name="name" v-model="postForm.title" required :maxlength="100">
                标题
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <!--<el-col :span="8">-->
                <!--<el-form-item label-width="45px" label="作者:" class="postInfo-container-item">-->
                <!--<el-select v-model="postForm.author" filterable remote placeholder="搜索用户" :remote-method="getRemoteUserList">-->
                <!--<el-option v-for="(item,index) in userListOptions" :key="item+index" :label="item" :value="item">-->
                <!--</el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                <!--</el-col>-->

                <el-col :span="10">
                  <el-form-item label-width="80px" v-if="!isEdit" label="发布时间:" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.create_time" type="datetime" format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择日期时间">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label-width="80px" v-if="isEdit" label="修改时间:" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.update_time" type="datetime" format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择日期时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <template>
                  <el-form-item label-width="80px" label="文章状态:" class="postInfo-container-item">
                    <el-radio-group v-model="postForm.article_status" @change="changeMyRadio" >
                      <el-radio :label="1">正常</el-radio>
                      <el-radio :label="0">禁用</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </template>
                <!--<el-col :span="6">-->
                <!--<el-form-item label-width="60px" label="重要性:" class="postInfo-container-item">-->
                <!--<el-rate style="margin-top:8px;" v-model="postForm.importance" :max='3' :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :low-threshold="1"-->
                <!--:high-threshold="3">-->
                <!--</el-rate>-->
                <!--</el-form-item>-->
                <!--</el-col>-->
              </el-row>
              <el-row>
                <el-form-item label-width="80px" label="文章类型:" class="postInfo-container-item">
                  <el-select v-model="postForm.type" placeholder="文章类型" disabled="">
                    <el-option label="赴加生子福利" value="赴加生子福利"></el-option>
                    <el-option label="成功案例" value="成功案例"></el-option>
                    <el-option label="月子中心" value="月子中心"></el-option>
                    <el-option label="政策解析" value="政策解析"></el-option>
                    <el-option label="赴加生子费用" value="赴加生子费用"></el-option>
                    <el-option label="赴加攻略" value="赴加攻略"></el-option>
                    <el-option label="赴加签证" value="赴加签证"></el-option>
                    <el-option label="大温介绍" value="大温介绍"></el-option>
                    <el-option label="轮播图" value="轮播图"></el-option>
                  </el-select>
                </el-form-item>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="45px" label="摘要:">
          <el-input type="textarea" class="article-textarea" :rows="1" autosize placeholder="请输入内容"
                    v-model="postForm.description">
          </el-input>
          <span class="word-counter" v-show="contentShortLength">{{contentShortLength}}字</span>
        </el-form-item>

        <div class="editor-container">
          <Tinymce :height=400 ref="editor" v-model="postForm.content"/>
        </div>

        <el-form-item label="轮播图片">
        </el-form-item>
        <div style="margin-bottom: 20px;">
          <Upload v-model="postForm.cover"/>
        </div>
      </div>
    </el-form>

  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce';
  import Upload from '@/components/Upload/singleImage3';
  import MDinput from '@/components/MDinput';
  import Multiselect from 'vue-multiselect';// 使用的一个多选框组件，element-ui的select不能满足所有需求
  import 'vue-multiselect/dist/vue-multiselect.min.css';// 多选框组件css
  import Sticky from '@/components/Sticky'; // 粘性header组件
  import {validateURL} from '@/utils/validate';
  import {fetchArticle, createArticle, updateArticle} from '@/api/article';
  import {userSearch} from '@/api/remoteSearch';
  import Warning from './Warning';
  import {CommentDropdown, PlatformDropdown, SourceUrlDropdown} from './Dropdown';


  const defaultForm = {
    status          : 'draft',
    title           : '', // 文章题目
    content         : '', // 文章内容
    description     : '', // 文章摘要
    source_uri      : '', // 文章外链
    cover           : '', // 文章图片
    create_time     : new Date(), // 前台展示时间
    type            : '',
    id              : '',
    platforms       : ['a-platform'],
    comment_disabled: false,
    importance      : 0,
    article_status  : 1,
    update_time     : ''
  };

  export default {
    name      : 'articleDetail',
    components: {
      Tinymce,
      MDinput,
      Upload,
      Multiselect,
      Sticky,
      Warning,
      CommentDropdown,
      PlatformDropdown,
      SourceUrlDropdown
    },
    props     : {
      isEdit: {
        type   : Boolean,
        default: false
      }
    },
    filters   : {
      statusFilters(status) {
        const statusMap = {
          1: '正常',
          0: '禁用'
        };
        return statusMap[status];
      }
    },
    data() {
      const validateRequire = (rule, value, callback) => {
        if (value === '') {
          this.$message({
            message: rule.field + '为必传项',
            type   : 'error'
          });
          callback(null);
        } else {
          callback();
        }
      };
      const validateSourceUri = (rule, value, callback) => {
        if (value) {
          if (validateURL(value)) {
            callback();
          } else {
            this.$message({
              message: '外链url填写不正确',
              type   : 'error'
            });
            callback(null);
          }
        } else {
          callback();
        }
      };
      return {
        postForm       : Object.assign({}, defaultForm),
        loading        : false,
        userListOptions: [],
        rules          : {
          cover      : [{validator: validateRequire}],
          type       : [{validator: validateRequire}],
          create_time: [{validator: validateRequire}],
          title      : [{validator: validateRequire}],
          content    : [{validator: validateRequire}],
          source_uri : [{
            validator: validateSourceUri,
            trigger  : 'blur'
          }]
        }
      };
    },
    computed  : {
      contentShortLength() {
        return this.postForm.description.length;
      }
    },
    created() {
      if (this.isEdit) {
        let id = this.$route.query.id;
        this.fetchData(id);
      } else {
        this.postForm = Object.assign({}, defaultForm);
      }
    },
    methods   : {
      changeMyRadio(value) {
        console.log(value);
        // this.postForm.article_status = value;
      },
      fetchData(id) {
        fetchArticle(id).then(response => {
          this.postForm.id = response.data.id;
          this.postForm.title = response.data.title;
          this.postForm.description = response.data.description;
          this.postForm.create_time = response.data.create_time;
          this.postForm.content = response.data.content;
          this.postForm.type = response.data.type;
          this.postForm.article_status = response.data.status;
          this.postForm.cover = "/api"+response.data.cover;

          this.postForm.update_time = new Date();
          console.log(this.postForm.create_time);

        }).catch(err => {
          console.log(err);
        });
      },
      submitForm() {
        let that = this;
        if (!this.postForm.title) {
          this.$message({
            message: '标题为必传项',
            type   : 'error'
          });
        } else if (!this.postForm.create_time) {
          this.$message({
            message: '发布时间为必传项',
            type   : 'error'
          });
        } else if (!this.postForm.type) {
          this.$message({
            message: '文章类型为必传项',
            type   : 'error'
          });
        } else if (!this.postForm.description) {
          this.$message({
            message: '摘要为必传项',
            type   : 'error'
          });
        }else if (!this.postForm.cover) {
          this.$message({
            message: '轮播图片为必传项',
            type   : 'error'
          });
        }  else {
          // this.postForm.create_time = parseInt(this.postForm.create_time / 1000);
          console.log(this.postForm.create_time);
          let data = {
            title      : this.postForm['title'],
            type       : this.postForm['type'],
            status     : this.postForm['article_status'],
            description: this.postForm['description'],
            content    : this.postForm['content'],
            cover      : this.postForm['cover'].replace('/api','')
          };
          this.loading = true;
          console.log(data);
          if (!this.isEdit) {
            let date = new Date(this.postForm['create_time']);
            data.create_time = Date.parse(date);
            createArticle(data).then(res => {
              if (res.code === 200) {
                this.$notify({
                  title   : '成功',
                  message : '发布文章成功',
                  type    : 'success',
                  duration: 2000
                });
                this.postForm.status = 'published';
                this.goItems();
              }
            });
          } else {
            let date = new Date(this.postForm['update_time']);
            data.update_time = Date.parse(date);
            data.id = this.postForm['id'];
            updateArticle(data).then(res => {
              if (res.code === 200) {
                this.$notify({
                  title   : '成功',
                  message : '修改成功',
                  type    : 'success',
                  duration: 2000
                });
                this.postForm.status = 'published';
                this.goItems();
              }
            });
          }
          this.loading = false;
        }
      },
      goItems() {
        let path;
        if (this.postForm.type === '赴加生子福利') {
          path = '/list-one';
        } else if (this.postForm.type === '成功案例') {
          path = '/list-two';
        } else if (this.postForm.type === '月子中心') {
          path = '/list-three';
        } else if (this.postForm.type === '政策解读') {
          path = '/list-four';
        } else if (this.postForm.type === '赴加生子费用') {
          path = '/list-five';
        } else if (this.postForm.type === '赴加攻略') {
          path = '/list-six';
        } else if (this.postForm.type === '赴加签证') {
          path = '/list-seven';
        } else if (this.postForm.type === '大温介绍') {
          path = '/list-eight';
        } else if (this.postForm.type === '轮播图') {
          path = '/pictures';
        } else {
          path = '/list-one';
        }
        setTimeout(() => {
          this.$router.push({path});
        }, 2000);
      },
      draftForm() {
        if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
          this.$message({
            message: '请填写必要的标题和内容',
            type   : 'warning'
          });
          return;
        }
        this.$message({
          message  : '保存成功',
          type     : 'success',
          showClose: true,
          duration : 1000
        });
        this.postForm.status = 'draft';
      },
      getRemoteUserList(query) {
        userSearch(query).then(response => {
          if (!response.data.items) return;
          this.userListOptions = response.data.items.map(v => v.name);
        });
      }
    },
    mounted() {
      this.postForm.create_time=new Date()

      if(!this.isEdit){
        if (this.$route.query.type === "赴加生子福利") {
          this.postForm.type = "赴加生子福利";
        } else if (this.$route.query.type === "成功案例") {
          this.postForm.type = "成功案例";
        } else if (this.$route.query.type === "月子中心") {
          this.postForm.type = "月子中心";
        } else if (this.$route.query.type === "政策解读") {
          this.postForm.type = "政策解读";
        } else if (this.$route.query.type === "赴加生子费用") {
          this.postForm.type = "赴加生子费用";
        } else if (this.$route.query.type === "赴加攻略") {
          this.postForm.type = "赴加攻略";
        } else if (this.$route.query.type === "赴加签证") {
          this.postForm.type = "赴加签证";
        } else if (this.$route.query.type === "大温介绍") {
          this.postForm.type = "大温介绍";
        }else if (this.$route.query.type === "轮播图") {
          this.postForm.type = "轮播图";
        }
      }

    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .createPost-container {
    position: relative;
    .createPost-main-container {
      padding: 40px 45px 20px 50px;
      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;
        .postInfo-container-item {
          float: left;
        }
      }
      .editor-container {
        min-height: 500px;
        margin: 0 0 30px;
        .editor-upload-btn-container {
          text-align: right;
          margin-right: 10px;
          .editor-upload-btn {
            display: inline-block;
          }
        }
      }
    }
    .word-counter {
      width: 40px;
      position: absolute;
      right: -10px;
      top: 0px;
    }
  }
</style>
