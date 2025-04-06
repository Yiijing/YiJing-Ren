<template>
    <div class="login-wrap">
      <h3 style="text-align: center;">用户注册</h3>
      <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm login-container">
        <el-form-item label="用户ID" prop="user_id">
          <el-input v-model="ruleForm.user_id" />
        </el-form-item>
        <el-form-item label="用户姓名" prop="username">
          <el-input v-model="ruleForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" />
        </el-form-item>
        <el-form-item label="联系电话" prop="contact_number">
          <el-input v-model="ruleForm.contact_number" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
          <el-button ><el-link href="/" >登录</el-link></el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    
    name: 'Register',
    data() {
        var validateUsername = (rule, value, callback) => {
          if(value !== ''){
            axios
            .get("http://127.0.0.1:1116/Users/selectall")
            .then((response) => {
                let u = response.data;
                let user = u.find(({user_id}) => user_id === this.ruleForm.user_id);

                if(user !== undefined ){
                    
                  callback(new Error('用户已注册'))
                  // return false
                }else {
                  callback()
                }
              });
           }
        
        }
      var checkEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'))
        } else {
          if (this.ruleForm.checkEmail !== '') {
            // this.$refs.ruleForm.validateField('checkEmail')
          }
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      var validateContact = (rule, value, callback) => {
      if (value !== '') {
        if (value.length < 11) {
          callback(new Error('请输入至少11位电话号码'))
        } else {
          callback()
        }
      }
    }
      return {
        ruleForm: {
          user_id:'',
          username:'',
          password: '',
          checkPass: '',
          email: '',
          contact_number:'',
        },
        rules: {
          user_id:[
            { required: true, message: '请输入用户ID', trigger: 'blur' },
            { validator: validateUsername, message: '用户已注册', trigger: 'blur' }
          ],
          username:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          email: [
          
            { validator: checkEmail, trigger: 'blur' }
          ],
          contact_number:[

          { validator: validateContact, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const User = this.ruleForm;
            console.log(User.user_id)
            const url = "http://127.0.0.1:1116/Users/insert/"+User.user_id+"/"+User.username+
                                      "/"+User.password+"/"+User.email+"/"+User.contact_number;
            axios
                .get(url)
                .then((response) => {
                    
                    console.log(response.data);
                    if (response.data == "0"){
                        const newUser={
                        user_id:User.user_id,
                        username:User.username,
                        password:User.password,
                        email:User.email,
                        contact_number:User.contact_number,

                        };
                        this.$store.dispatch('Usersinfo/addUser',newUser)
                        
                    }
                
                }).catch((error) => {
                        console.log(error);

                    });
            alert('注册成功');
            this.$router.push('/');
              
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
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
  
      .title {
          margin: 0px auto 40px auto;
          text-align: center;
          color: #505458;
      }
  </style>
  
  