<template>
    <el-table :data="DoctorsShow" style="width: 100% ;margin:auto;">
      <el-table-column prop="doctor_id" label="doctor_id"  >
          <template v-slot="scope">
              {{ scope.row.doctor_id }}
          </template>
      </el-table-column>
      <el-table-column prop="user_id" label="user_id"  />
      <el-table-column prop="full_name" label="full_name"  />
      <el-table-column prop="specialization" label="specialization"  />
  
      <el-table-column fixed="right" label="操作" >
          <template v-slot="scope">
              <el-button link type="primary" size="small" 
              @click="deleteDoctor(scope.row.doctor_id)">delete</el-button>
              <el-button link type="primary" size="small"
              @click="updateDoctor(scope.row.doctor_id)">Edit</el-button>
          </template>
      </el-table-column>
    </el-table>

    <el-pagination
            v-model:current-page=currentPage
            v-model:page-size=pageSize
            :page-sizes="[5, 10, 15, 20]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="Doctors.length"
            @size-change="sizeChange"
            @current-change="currentChange"
    />

  
      <el-form :model="Doctor" label-width="120px">
            <el-form-item label="doctor_id">
              <el-input v-model="Doctor.doctor_id" placeholder="Please input" clearable/>
            </el-form-item>
          <el-form-item label="user_id">
              <el-input v-model="Doctor.user_id" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="full_name">
              <el-input v-model="Doctor.full_name" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="specialization">
              <el-input v-model="Doctor.specialization" placeholder="Please input" clearable/>
          </el-form-item>
        
          
          <el-form-item>
              <el-button type="primary" @click="insertDoctor">插入</el-button>
              <el-button type="primary" @click="updateSaveDoctor">修改</el-button>
              <el-button type="primary" @click="clearDoctor">清空</el-button>
          </el-form-item>
      </el-form>
  
  </template>
  <script>
      import axios from 'axios';
      import{ElButton} from 'element-plus';
      import{reactive}from 'vue';
      const Doctor=reactive({
            doctor_id:'',
            user_id:'',
            full_name:'',
            specialization:'',
      })
  
      export default {
          name:'Doctor',
          data(){
              return{
                  Doctor,
                  currentPage:1,// 首页（默认为第1页）
                  pageSize:15,// 每页条数（默认5条）
                  // 分页展示-文章-列表
                  DoctorsShow:[],
                  startIndex:0,
                  endIndex:15,

              };
          },
          computed:{
              Doctors(){
                  return this.$store.getters["Doctorsinfo/getDoctors"]
              },
              
          },
          mounted(){
              let Doctorlist = this.$store.getters['Doctorsinfo/getDoctors'];
              if(Doctorlist == ''){
                  this.selectall();
                  this.pageChange();
              }
                else{
                    this.pageChange();
                }
            

        
              
          },
          methods:{
            // 页面参数(条数/页码)变化
            pageChange(){
                this.startIndex = (this.currentPage-1)*this.pageSize;
                this.endIndex = this.currentPage*this.pageSize-1;
                let Doctors = this.$store.getters['Doctorsinfo/getDoctors'];
                this.DoctorsShow = Doctors.slice(this.startIndex,this.endIndex);

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
                  .get("http://127.0.0.1:1116/DoctorInfo/selectall")
                  .then((response) => {
                      
                      console.log(response.data);
  
                      let results = JSON.stringify(response.data);
                      let Doctors = JSON.parse(results);
  
                      for (let i in Doctors){
  
                          const newDoctor={
                              doctor_id:Doctors[i].doctor_id,
                              user_id:Doctors[i].user_id,
                              full_name:Doctors[i].full_name,
                              specialization:Doctors[i].specialization,
                              
                          };
                          this.$store.dispatch('Doctorsinfo/addDoctor',newDoctor);
                          
                      }
                    //   this.DoctorsShow=Doctors.slice(0,this.pageSize-1)
                    this.pageChange();
                  })
                  .catch((error) => {
                          console.log(error);
                  });
              },
              deleteDoctor(doctor_id){
                  const url = "http://127.0.0.1:1116/DoctorInfo/delete/"+doctor_id;
                  axios
                      .get(url)
                      .then((response) => {
                          
                          console.log(response.data);
                          if (response.data == "0"){
                              this.$store.dispatch('Doctorsinfo/deleteDoctor',doctor_id)
                              this.pageChange();
                          }
                      
                      }).catch((error) => {
                              console.log(error);
  
                  });
              },
              insertDoctor(){
                  const url = "http://127.0.0.1:1116/DoctorInfo/insert/"+Doctor.doctor_id+"/"+Doctor.user_id+
                                      "/"+Doctor.full_name+"/"+Doctor.specialization;
                  axios
                      .get(url)
                      .then((response) => {
                          
                          console.log(response.data);
                          if (response.data == "0"){
                              const newDoctor={
                                doctor_id:Doctor.doctor_id,
                                user_id:Doctor.user_id,
                                full_name:Doctor.full_name,
                                specialization:Doctor.specialization,

                              };
                              this.$store.dispatch('Doctorsinfo/addDoctor',newDoctor)
                              this.clearDoctor()
                              this.pageChange();
                          }
                      
                      }).catch((error) => {
                              console.log(error);
  
                  });
              },
              updateDoctor(doctor_id){
                  let Doctorlist = this.$store.getters['Doctorsinfo/getDoctors'];
                  
                  for (let i = 0;i < Doctorlist.length;i++){
                      if(Doctorlist[i].doctor_id == doctor_id){
                          Doctor.doctor_id = Doctorlist[i].doctor_id;
                          Doctor.user_id = Doctorlist[i].user_id;
                          Doctor.full_name = Doctorlist[i].full_name;
                          Doctor.specialization = Doctorlist[i].specialization;                      
                          break;
                      }
                      
                  }
              },
              updateSaveDoctor(){
                  const url = "http://127.0.0.1:1116/DoctorInfo/update/"+Doctor.doctor_id+"/"+Doctor.user_id+
                                      "/"+Doctor.full_name+"/"+Doctor.specialization;
                  axios
                      .get(url)
                      .then((response) => {
                          
                          console.log(response.data);
                          if (response.data == "0"){
                              const newDoctor={
                                doctor_id:Doctor.doctor_id,
                                user_id:Doctor.user_id,
                                full_name:Doctor.full_name,
                                specialization:Doctor.specialization,
                                 
                              };
                              this.$store.dispatch('Doctorsinfo/updateDoctor',newDoctor);
                              this.clearDoctor()
                              this.pageChange();
                          }
                      })
                      .catch((error) => {
                          console.log(error);
  
                  });
              },
              clearDoctor(){
                  Doctor.doctor_id = '';
                  Doctor.user_id ='';
                  Doctor.full_name = '';
                  Doctor.specialization = '';

              }
          
          },
          components:{ ElButton,},
      };
  </script>