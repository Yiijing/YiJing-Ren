<template>
  <div class="login-wrap">
    <h3 style="text-align: center;">用户登录</h3>
    <div class="login-container">
      
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="top">
        <el-form-item label="用户名" prop="user_id">
          <el-input v-model="loginForm.user_id"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="primary" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  </template>
  
  <script>
   import axios from 'axios';
  export default {
    name: 'Login',
    data() {
      var validateUsername = (rule, value, callback) => {
          if(value !== ''){
            axios
            .get("http://127.0.0.1:1116/Users/selectall")
            .then((response) => {
                let u = response.data;
                let user = u.find(({user_id}) => user_id === this.loginForm.user_id);

                if(user === undefined ){
                    
                  callback(new Error('用户未注册'))
                  // return false
                }else {
                  callback()
                }
              });
           }
        
        }


        var validatePassword = (rule, value, callback) => {
          if(value !== ''){
            axios
            .get("http://127.0.0.1:1116/Users/selectall")
            .then((response) => {
                let u = response.data;
                let user = u.find(({user_id}) => user_id === this.loginForm.user_id);
                
                if(user !== undefined){
                    if(value!==user['password']){
                      callback(new Error('请输入正确的密码'))
                      // return false
                    }else {
                      callback()
                    }
                  }

              });
           }
        
        }
      return {
        loginForm: {
          user_id: '',
          password: ''
        },
        loginRules: {
          user_id: [
            { required: true, message: '请输入用户ID', trigger: 'blur' },
            { validator: validateUsername, message: '用户未注册', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { validator: validatePassword, message: '密码不正确', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      login() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            // 登录逻辑，可以发送请求到后端进行验证
            alert('登录成功');
            // 登录成功后跳转到首页
            this.$router.push('/home');
          } else {
            console.log('表单验证失败');
          }
        });
      },
      register(){
        this.$router.push('/Register');
      }
    },
    
  };
  </script>
  
  <style scoped>
  .login-wrap {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          padding-top: 10%;
          /* background-image: url(); */
          /* background-color: #112346; */
          background-repeat: no-repeat;
          background-position: center right;
          background-size: 100%;
      }
      .login-container {
          border-radius: 10px;
          margin: 0px auto;
          width: 550px;
          padding: 30px 35px 15px 35px;
          background: #fff;
          border: 1px solid #eaeaea;
          text-align: left;
          box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
      }
  </style>
  