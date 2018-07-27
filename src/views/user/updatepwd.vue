<template>
  <div class="page">

    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="当前密码" prop="oldPass">
        <el-input v-model.number="ruleForm2.oldPass"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {updatePwd} from "@/api/user";

  export default {
    name: "updatePwd",
    data() {
      let checkoldPass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('当前密码不能为空'));
        }
        callback();
      };
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          oldPass: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          oldPass: [
            { validator: checkoldPass, trigger: 'blur' }
          ]
        }
      };
    },
    methods:{
      submitForm(formName) {
        let that=this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            updatePwd(that.ruleForm2).then(res => {
              console.log(res.data)
              if (res.code === 200) {
                this.$notify({
                  title   : '成功',
                  message : '密码修改成功',
                  type    : 'success',
                  duration: 2000
              });
                that.resetForm('ruleForm2')
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>

<style scoped lang="less">

  .page {
    padding: 50px;
    box-sizing: border-box;
    .demo-ruleForm {
      max-width: 500px;
    }
  }
</style>
