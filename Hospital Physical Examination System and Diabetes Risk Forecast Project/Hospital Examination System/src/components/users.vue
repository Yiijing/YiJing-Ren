<template>
    <el-table :data="UsersShow" style="width: 100% ;margin:auto;">
      <el-table-column prop="user_id" label="user_id"  >
          <template v-slot="scope">
              {{ scope.row.user_id }}
          </template>
      </el-table-column>
      <el-table-column prop="username" label="username"  />
      <el-table-column prop="password" label="User"  />
      <el-table-column prop="email" label="email"  />
      <el-table-column prop="contact_number" label="contact_number"  />

  
      <el-table-column fixed="right" label="操作" >
          <template v-slot="scope">
              <el-button link type="primary" size="small" 
              @click="deleteUser(scope.row.user_id)">delete</el-button>
              <el-button link type="primary" size="small"
              @click="updateUser(scope.row.user_id)">Edit</el-button>
          </template>
      </el-table-column>
    </el-table>

    <el-pagination
            v-model:current-page=currentPage
            v-model:page-size=pageSize
            :page-sizes="[5, 10, 15, 20]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="Users.length"
            @size-change="sizeChange"
            @current-change="currentChange"
    />

  
      <el-form :model="User" label-width="120px">
            <el-form-item label="user_id">
              <el-input v-model="User.user_id" placeholder="Please input" clearable/>
            </el-form-item>
          <el-form-item label="username">
              <el-input v-model="User.username" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="password">
              <el-input v-model="User.password" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="contact_number">
              <el-input v-model="User.contact_number" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="email">
              <el-input v-model="User.email" placeholder="Please input" clearable/>
          </el-form-item>
          
          <el-form-item>
              <el-button type="primary" @click="insertUser">插入</el-button>
              <el-button type="primary" @click="updateSaveUser">修改</el-button>
              <el-button type="primary" @click="clearUser">清空</el-button>
          </el-form-item>
      </el-form>
  
  </template>
  <script>
      import axios from 'axios';
      import{ElButton} from 'element-plus';
      import{reactive}from 'vue';
      const User=reactive({
            user_id:'',
            username:'',
            password:'',
            email:'',
            contact_number:'',
      })
  
      export default {
          name:'User',
          data(){
              return{
                  User,
                  currentPage:1,// 首页（默认为第1页）
                  pageSize:15,// 每页条数（默认5条）
                  // 分页展示-文章-列表
                  UsersShow:[],
                  startIndex:0,
                  endIndex:15,

              };
          },
          computed:{
              Users(){
                  return this.$store.getters["Usersinfo/getUsers"]
              },
              
          },
          mounted(){
              let Userlist = this.$store.getters['Usersinfo/getUsers'];
              if(Userlist == ''){
                  this.selectall();

              }

          },
          methods:{
            // 页面参数(条数/页码)变化
            pageChange(){
                this.startIndex = (this.currentPage-1)*this.pageSize;
                this.endIndex = this.currentPage*this.pageSize-1;
                let Users = this.$store.getters['Usersinfo/getUsers'];
                this.UsersShow = Users.slice(this.startIndex,this.endIndex);

            },
            // 每页条数变化
            sizeChange(){
                this.pageChange();
            },
            // 当前页变化
            currentChange(){
                this.pageChange();
            },
              selectall(){
                  console.log('mounted 挂载DOM后');
                  axios
                  .get("http://127.0.0.1:1116/Users/selectall")
                  .then((response) => {
                      
                      console.log(response.data);
  
                      let results = JSON.stringify(response.data);
                      let Users = JSON.parse(results);
  
                      for (let i in Users){
  
                          const newUser={
                              user_id:Users[i].user_id,
                              username:Users[i].username,
                              password:Users[i].password,
                              email:Users[i].email,
                              contact_number:Users[i].contact_number,
                              
                          };
                          this.$store.dispatch('Usersinfo/addUser',newUser);
                          
                      }
                    //   this.UsersShow=Users.slice(0,this.pageSize-1)
                    this.pageChange();
                  })
                  .catch((error) => {
                          console.log(error);
                  });
              },
              deleteUser(user_id){
                  const url = "http://127.0.0.1:1116/Users/delete/"+user_id;
                  axios
                      .get(url)
                      .then((response) => {
                          
                          console.log(response.data);
                          if (response.data == "0"){
                              this.$store.dispatch('Usersinfo/deleteUser',user_id)
                              this.pageChange();
                          }
                      
                      }).catch((error) => {
                              console.log(error);
  
                  });
              },
              insertUser(){
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
                              this.clearUser()
                              this.pageChange();
                          }
                      
                      }).catch((error) => {
                              console.log(error);
  
                  });
              },
              updateUser(user_id){
                  let Userlist = this.$store.getters['Usersinfo/getUsers'];
                  
                  for (let i = 0;i < Userlist.length;i++){
                      if(Userlist[i].user_id == user_id){
                          User.user_id = Userlist[i].user_id;
                          User.username = Userlist[i].username;
                          User.password = Userlist[i].password;
                          User.email = Userlist[i].email;
                          User.contact_number = Userlist[i].contact_number;
                          
                          break;
                      }
                      
                  }
              },
              updateSaveUser(){
                  const url = "http://127.0.0.1:1116/Users/update/"+User.user_id+"/"+User.username+
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
                              this.$store.dispatch('Usersinfo/updateUser',newUser);
                              this.clearUser()
                              this.pageChange();
                          }
                      })
                      .catch((error) => {
                          console.log(error);
  
                  });
              },
              clearUser(){
                  User.user_id = '';
                  User.username ='';
                  User.password = '';
                  User.email = '';
                  User.contact_number ='';

              }
          
          },
          components:{ ElButton,},
      };
  </script>