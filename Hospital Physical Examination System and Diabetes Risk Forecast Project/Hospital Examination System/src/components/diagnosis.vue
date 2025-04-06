<template>
    <el-table :data="DiagnosissShow" style="width: 100% ;margin:auto;">
      <el-table-column prop="diagnosis_id" label="diagnosis_id"  >
          <template v-slot="scope">
              {{ scope.row.diagnosis_id }}
          </template>
      </el-table-column>
      <el-table-column prop="patient_id" label="patient_id"  />
      <el-table-column prop="doctor_id" label="doctor_id"  />
      <el-table-column prop="appointment_id" label="appointment_id"  />
      <el-table-column prop="blood_id" label="blood_id"  />
      <el-table-column prop="liver_id" label="liver_id"  />
      <el-table-column prop="renin_id" label="renin_id"  />
  
      <el-table-column fixed="right" label="操作" >
          <template v-slot="scope">
              <el-button link type="primary" size="small" 
              @click="deleteDiagnosis(scope.row.diagnosis_id)">delete</el-button>
              <el-button link type="primary" size="small"
              @click="updateDiagnosis(scope.row.diagnosis_id)">Edit</el-button>
          </template>
      </el-table-column>
    </el-table>

    <el-pagination
            v-model:current-page=currentPage
            v-model:page-size=pageSize
            :page-sizes="[5, 10, 15, 20]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="Diagnosiss.length"
            @size-change="sizeChange"
            @current-change="currentChange"
    />

  
      <el-form :model="Diagnosis" label-width="120px">
            <el-form-item label="diagnosis_id">
              <el-input v-model="Diagnosis.diagnosis_id" placeholder="Please input" clearable/>
            </el-form-item>
          <el-form-item label="patient_id">
              <el-input v-model="Diagnosis.patient_id" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="doctor_id">
              <el-input v-model="Diagnosis.doctor_id" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="appointment_id">
              <el-input v-model="Diagnosis.appointment_id" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="blood_id">
              <el-input v-model="Diagnosis.blood_id" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="liver_id">
              <el-input v-model="Diagnosis.liver_id" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="renin_id">
            <el-input v-model="Diagnosis.renin_id" placeholder="Please input" clearable/>
          </el-form-item>
          
          <el-form-item>
              <el-button type="primary" @click="insertDiagnosis">插入</el-button>
              <el-button type="primary" @click="updateSaveDiagnosis">修改</el-button>
              <el-button type="primary" @click="clearDiagnosis">清空</el-button>
          </el-form-item>
      </el-form>
  
  </template>
  <script>
      import axios from 'axios';
      import{ElButton} from 'element-plus';
      import{reactive}from 'vue';
      const Diagnosis=reactive({
            diagnosis_id:'',
            patient_id:'',
            doctor_id:'',
            appointment_id:'',
            blood_id:'',
            liver_id:'',
            renin_id:'',
      })
  
      export default {
          name:'Diagnosis',
          data(){
              return{
                  Diagnosis,
                  currentPage:1,// 首页（默认为第1页）
                  pageSize:15,// 每页条数（默认5条）
                  // 分页展示-文章-列表
                  DiagnosissShow:[],
                  startIndex:0,
                  endIndex:15,

              };
          },
          computed:{
              Diagnosiss(){
                  return this.$store.getters["Diagnosissinfo/getDiagnosiss"]
              },
              
          },
          mounted(){
              let Diagnosislist = this.$store.getters['Diagnosissinfo/getDiagnosiss'];
              if(Diagnosislist == ''){
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
                let Diagnosiss = this.$store.getters['Diagnosissinfo/getDiagnosiss'];
                this.DiagnosissShow = Diagnosiss.slice(this.startIndex,this.endIndex);

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
                  .get("http://127.0.0.1:1116/Diagnosis/selectall")
                  .then((response) => {
                      
                      console.log(response.data);
  
                      let results = JSON.stringify(response.data);
                      let Diagnosiss = JSON.parse(results);
  
                      for (let i in Diagnosiss){
  
                          const newDiagnosis={
                              diagnosis_id:Diagnosiss[i].diagnosis_id,
                              patient_id:Diagnosiss[i].patient_id,
                              doctor_id:Diagnosiss[i].doctor_id,
                              appointment_id:Diagnosiss[i].appointment_id,
                              blood_id:Diagnosiss[i].blood_id,
                              liver_id:Diagnosiss[i].liver_id,
                              renin_id:Diagnosiss[i].renin_id,
                              
                          };
                          this.$store.dispatch('Diagnosissinfo/addDiagnosis',newDiagnosis);
                          
                      }
                    //   this.DiagnosissShow=Diagnosiss.slice(0,this.pageSize-1)
                    this.pageChange();
                  })
                  .catch((error) => {
                          console.log(error);
                  });
              },
              deleteDiagnosis(diagnosis_id){
                  const url = "http://127.0.0.1:1116/Diagnosis/delete/"+diagnosis_id;
                  axios
                      .get(url)
                      .then((response) => {
                          
                          console.log(response.data);
                          if (response.data == "0"){
                              this.$store.dispatch('Diagnosissinfo/deleteDiagnosis',diagnosis_id)
                              this.pageChange();
                          }
                      
                      }).catch((error) => {
                              console.log(error);
  
                  });
              },
              insertDiagnosis(){
                  const url = "http://127.0.0.1:1116/Diagnosis/insert/"+Diagnosis.diagnosis_id+"/"+Diagnosis.patient_id+
                                      "/"+Diagnosis.doctor_id+"/"+Diagnosis.appointment_id+"/"+Diagnosis.blood_id+"/"
                                      +Diagnosis.liver_id+"/"+Diagnosis.renin_id;
                  axios
                      .get(url)
                      .then((response) => {
                          
                          console.log(response.data);
                          if (response.data == "0"){
                              const newDiagnosis={
                                diagnosis_id:Diagnosis.diagnosis_id,
                                patient_id:Diagnosis.patient_id,
                                doctor_id:Diagnosis.doctor_id,
                                appointment_id:Diagnosis.appointment_id,
                                blood_id:Diagnosis.blood_id,
                                liver_id:Diagnosis.liver_id,
                                renin_id:Diagnosis.renin_id,

                              };
                              this.$store.dispatch('Diagnosissinfo/addDiagnosis',newDiagnosis)
                              this.clearDiagnosis()
                              this.pageChange();
                          }
                      
                      }).catch((error) => {
                              console.log(error);
  
                  });
              },
              updateDiagnosis(diagnosis_id){
                  let Diagnosislist = this.$store.getters['Diagnosissinfo/getDiagnosiss'];
                  
                  for (let i = 0;i < Diagnosislist.length;i++){
                      if(Diagnosislist[i].diagnosis_id == diagnosis_id){
                          Diagnosis.diagnosis_id = Diagnosislist[i].diagnosis_id;
                          Diagnosis.patient_id = Diagnosislist[i].patient_id;
                          Diagnosis.doctor_id = Diagnosislist[i].doctor_id;
                          Diagnosis.appointment_id = Diagnosislist[i].appointment_id;
                          Diagnosis.blood_id = Diagnosislist[i].blood_id;
                          Diagnosis.liver_id = Diagnosislist[i].liver_id;
                          Diagnosis.renin_id = Diagnosislist[i].renin_id;
                          
                          break;
                      }
                      
                  }
              },
              updateSaveDiagnosis(){
                  const url = "http://127.0.0.1:1116/Diagnosis/update/"+Diagnosis.diagnosis_id+"/"+Diagnosis.patient_id+
                                      "/"+Diagnosis.doctor_id+"/"+Diagnosis.appointment_id+"/"+Diagnosis.blood_id+"/"
                                      +Diagnosis.liver_id+"/"+Diagnosis.renin_id;
                  axios
                      .get(url)
                      .then((response) => {
                          
                          console.log(response.data);
                          if (response.data == "0"){
                              const newDiagnosis={
                                diagnosis_id:Diagnosis.diagnosis_id,
                                patient_id:Diagnosis.patient_id,
                                doctor_id:Diagnosis.doctor_id,
                                appointment_id:Diagnosis.appointment_id,
                                blood_id:Diagnosis.blood_id,
                                liver_id:Diagnosis.liver_id,
                                renin_id:Diagnosis.renin_id,
                                 
                              };
                              this.$store.dispatch('Diagnosissinfo/updateDiagnosis',newDiagnosis);
                              this.clearDiagnosis()
                              this.pageChange();
                          }
                      })
                      .catch((error) => {
                          console.log(error);
  
                  });
              },
              clearDiagnosis(){
                  Diagnosis.diagnosis_id = '';
                  Diagnosis.patient_id ='';
                  Diagnosis.doctor_id = '';
                  Diagnosis.appointment_id = '';
                  Diagnosis.blood_id ='';
                  Diagnosis.liver_id = '';
                  Diagnosis.renin_id = '';

              }
          
          },
          components:{ ElButton,},
      };
  </script>