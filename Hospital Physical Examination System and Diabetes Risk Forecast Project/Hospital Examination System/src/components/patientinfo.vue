<template>
    <el-table :data="PatientsShow" style="width: 100% ;margin:auto;">
      <el-table-column prop="patient_id" label="patient_id"  >
          <template v-slot="scope">
              {{ scope.row.patient_id }}
          </template>
      </el-table-column>
      <el-table-column prop="user_id" label="user_id"  />
      <el-table-column prop="full_name" label="full_name"  />
      <el-table-column prop="date_of_birth" label="date_of_birth"  />
      <el-table-column prop="gender" label="gender"  />
      
  
      <el-table-column fixed="right" label="操作" >
          <template v-slot="scope">
              <el-button link type="primary" size="small" 
              @click="deletePatient(scope.row.patient_id)">delete</el-button>
              <el-button link type="primary" size="small"
              @click="updatePatient(scope.row.patient_id)">Edit</el-button>
          </template>
      </el-table-column>
    </el-table>

    <el-pagination
            v-model:current-page=currentPage
            v-model:page-size=pageSize
            :page-sizes="[5, 10, 15, 20]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="Patients.length"
            @size-change="sizeChange"
            @current-change="currentChange"
    />

  
      <el-form :model="Patient" label-width="120px">
            <el-form-item label="patient_id">
              <el-input v-model="Patient.patient_id" placeholder="Please input" clearable/>
            </el-form-item>
          <el-form-item label="user_id">
              <el-input v-model="Patient.user_id" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="full_name">
              <el-input v-model="Patient.full_name" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="gender">
              <el-input v-model="Patient.gender" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="date_of_birth">
              <el-input v-model="Patient.date_of_birth" placeholder="Please input" clearable/>
          </el-form-item>
          
          <el-form-item>
              <el-button type="primary" @click="insertPatient">插入</el-button>
              <el-button type="primary" @click="updateSavePatient">修改</el-button>
              <el-button type="primary" @click="clearPatient">清空</el-button>
          </el-form-item>
      </el-form>
  
  </template>
  <script>
      import axios from 'axios';
      import{ElButton} from 'element-plus';
      import{reactive}from 'vue';
      const Patient=reactive({
            patient_id:'',
            user_id:'',
            full_name:'',
            date_of_birth:'',
            gender:'',
      })
  
      export default {
          name:'Patient',
          data(){
              return{
                  Patient,
                  currentPage:1,// 首页（默认为第1页）
                  pageSize:15,// 每页条数（默认5条）
                  // 分页展示-文章-列表
                  PatientsShow:[],
                  startIndex:0,
                  endIndex:15,

              };
          },
          computed:{
              Patients(){
                  return this.$store.getters["Patientsinfo/getPatients"]
              },
              
          },
          mounted(){
              let Patientlist = this.$store.getters['Patientsinfo/getPatients'];
              if(Patientlist == ''){
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
                let Patients = this.$store.getters['Patientsinfo/getPatients'];
                this.PatientsShow = Patients.slice(this.startIndex,this.endIndex);

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
                  .get("http://127.0.0.1:1116/PatientInfo/selectall")
                  .then((response) => {
                      
                      console.log(response.data);
  
                      let results = JSON.stringify(response.data);
                      let Patients = JSON.parse(results);
  
                      for (let i in Patients){
  
                          const newPatient={
                              patient_id:Patients[i].patient_id,
                              user_id:Patients[i].user_id,
                              full_name:Patients[i].full_name,
                              date_of_birth:Patients[i].date_of_birth,
                              gender:Patients[i].gender,
                              
                          };
                          this.$store.dispatch('Patientsinfo/addPatient',newPatient);
                          
                      }
                    //   this.PatientsShow=Patients.slice(0,this.pageSize-1)
                    this.pageChange();
                  })
                  .catch((error) => {
                          console.log(error);
                  });
              },
              deletePatient(patient_id){
                  const url = "http://127.0.0.1:1116/PatientInfo/delete/"+patient_id;
                  axios
                      .get(url)
                      .then((response) => {
                          
                          console.log(response.data);
                          if (response.data == "0"){
                              this.$store.dispatch('Patientsinfo/deletePatient',patient_id)
                              this.pageChange();
                          }
                      
                      }).catch((error) => {
                              console.log(error);
  
                  });
              },
              insertPatient(){
                  const url = "http://127.0.0.1:1116/PatientInfo/insert/"+Patient.patient_id+"/"+Patient.user_id+
                                      "/"+Patient.full_name+"/"+Patient.date_of_birth+"/"+Patient.gender;
                  axios
                      .get(url)
                      .then((response) => {
                          
                          console.log(response.data);
                          if (response.data == "0"){
                              const newPatient={
                                patient_id:Patient.patient_id,
                                user_id:Patient.user_id,
                                full_name:Patient.full_name,
                                date_of_birth:Patient.date_of_birth,
                                gender:Patient.gender,

                              };
                              this.$store.dispatch('Patientsinfo/addPatient',newPatient)
                              this.clearPatient()
                              this.pageChange();
                          }
                      
                      }).catch((error) => {
                              console.log(error);
  
                  });
              },
              updatePatient(patient_id){
                  let Patientlist = this.$store.getters['Patientsinfo/getPatients'];
                  
                  for (let i = 0;i < Patientlist.length;i++){
                      if(Patientlist[i].patient_id == patient_id){
                          Patient.patient_id = Patientlist[i].patient_id;
                          Patient.user_id = Patientlist[i].user_id;
                          Patient.full_name = Patientlist[i].full_name;
                          Patient.date_of_birth = Patientlist[i].date_of_birth;
                          Patient.gender = Patientlist[i].gender;
                          
                          break;
                      }
                      
                  }
              },
              updateSavePatient(){
                  const url = "http://127.0.0.1:1116/PatientInfo/update/"+Patient.patient_id+"/"+Patient.user_id+
                                      "/"+Patient.full_name+"/"+Patient.date_of_birth+"/"+Patient.gender;
                  axios
                      .get(url)
                      .then((response) => {
                          
                          console.log(response.data);
                          if (response.data == "0"){
                              const newPatient={
                                patient_id:Patient.patient_id,
                                user_id:Patient.user_id,
                                full_name:Patient.full_name,
                                date_of_birth:Patient.date_of_birth,
                                gender:Patient.gender,
                                 
                              };
                              this.$store.dispatch('Patientsinfo/updatePatient',newPatient);
                              this.clearPatient()
                              this.pageChange();
                          }
                      })
                      .catch((error) => {
                          console.log(error);
  
                  });
              },
              clearPatient(){
                  Patient.patient_id = '';
                  Patient.user_id ='';
                  Patient.full_name = '';
                  Patient.date_of_birth = '';
                  Patient.gender ='';

              }
          
          },
          components:{ ElButton,},
      };
  </script>