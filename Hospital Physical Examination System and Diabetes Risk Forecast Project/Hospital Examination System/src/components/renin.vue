<template>
    <el-table :data="ReninsShow" style="width: 100% ;margin:auto;">
      <el-table-column prop="renin_id" label="renin_id"  >
          <template v-slot="scope">
              {{ scope.row.renin_id }}
          </template>
      </el-table-column>
      <el-table-column prop="patient_id" label="patient_id"  />
      <el-table-column prop="doctor_id" label="doctor_id"  />
      <el-table-column prop="appointment_id" label="appointment_id"  />
      <el-table-column prop="urea" label="urea"  />
      <el-table-column prop="creatinine" label="creatinine"  />
      <el-table-column prop="uric_acid" label="uric_acid"  />
  
      <el-table-column fixed="right" label="操作" >
          <template v-slot="scope">
              <el-button link type="primary" size="small" 
              @click="deleteRenin(scope.row.renin_id)">delete</el-button>
              <el-button link type="primary" size="small"
              @click="updateRenin(scope.row.renin_id)">Edit</el-button>
          </template>
      </el-table-column>
    </el-table>

    <el-pagination
            v-model:current-page=currentPage
            v-model:page-size=pageSize
            :page-sizes="[5, 10, 15, 20]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="Renins.length"
            @size-change="sizeChange"
            @current-change="currentChange"
    />

  
      <el-form :model="Renin" label-width="120px">
            <el-form-item label="renin_id">
              <el-input v-model="Renin.renin_id" placeholder="Please input" clearable/>
            </el-form-item>
          <el-form-item label="patient_id">
              <el-input v-model="Renin.patient_id" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="doctor_id">
              <el-input v-model="Renin.doctor_id" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="appointment_id">
              <el-input v-model="Renin.appointment_id" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="urea">
              <el-input v-model="Renin.urea" placeholder="Please input" clearable/>
          </el-form-item>
          
          <el-form-item label="creatinine">
              <el-input v-model="Renin.creatinine" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="uric_acid">
            <el-input v-model="Renin.uric_acid" placeholder="Please input" clearable/>
          </el-form-item>
          
          <el-form-item>
              <el-button type="primary" @click="insertRenin">插入</el-button>
              <el-button type="primary" @click="updateSaveRenin">修改</el-button>
              <el-button type="primary" @click="clearRenin">清空</el-button>
          </el-form-item>
      </el-form>
  
  </template>
  <script>
      import axios from 'axios';
      import{ElButton} from 'element-plus';
      import{reactive}from 'vue';
      const Renin=reactive({
            renin_id:'',
            patient_id:'',
            doctor_id:'',
            appointment_id:'',
            urea:'',
            creatinine:'',
            uric_acid:'',
      })
  
      export default {
          name:'Renin',
          data(){
              return{
                  Renin,
                  currentPage:1,// 首页（默认为第1页）
                  pageSize:15,// 每页条数（默认5条）
                  // 分页展示-文章-列表
                  ReninsShow:[],
                  startIndex:0,
                  endIndex:15,

              };
          },
          computed:{
              Renins(){
                  return this.$store.getters["Reninsinfo/getRenins"]
              },
              
          },
          mounted(){
              let Reninlist = this.$store.getters['Reninsinfo/getRenins'];
              if(Reninlist == ''){
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
                let Renins = this.$store.getters['Reninsinfo/getRenins'];
                this.ReninsShow = Renins.slice(this.startIndex,this.endIndex);

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
                  .get("http://127.0.0.1:1116/Renin/selectall")
                  .then((response) => {
                      
                      console.log(response.data);
  
                      let results = JSON.stringify(response.data);
                      let Renins = JSON.parse(results);
  
                      for (let i in Renins){
  
                          const newRenin={
                              renin_id:Renins[i].renin_id,
                              patient_id:Renins[i].patient_id,
                              doctor_id:Renins[i].doctor_id,
                              appointment_id:Renins[i].appointment_id,
                              urea:Renins[i].urea,
                              creatinine:Renins[i].creatinine,
                              uric_acid:Renins[i].uric_acid,
                              
                          };
                          this.$store.dispatch('Reninsinfo/addRenin',newRenin);
                          
                      }
                    //   this.ReninsShow=Renins.slice(0,this.pageSize-1)
                    this.pageChange();
                  })
                  .catch((error) => {
                          console.log(error);
                  });
              },
              deleteRenin(renin_id){
                  const url = "http://127.0.0.1:1116/Renin/delete/"+renin_id;
                  axios
                      .get(url)
                      .then((response) => {
                          
                          console.log(response.data);
                          if (response.data == "0"){
                              this.$store.dispatch('Reninsinfo/deleteRenin',renin_id)
                              this.pageChange();
                          }
                      
                      }).catch((error) => {
                              console.log(error);
  
                  });
              },
              insertRenin(){
                  const url = "http://127.0.0.1:1116/Renin/insert/"+Renin.renin_id+"/"+Renin.patient_id+
                                      "/"+Renin.doctor_id+"/"+Renin.appointment_id+"/"+Renin.urea+"/"
                                      +Renin.creatinine+"/"+Renin.uric_acid;
                  axios
                      .get(url)
                      .then((response) => {
                          
                          console.log(response.data);
                          if (response.data == "0"){
                              const newRenin={
                                renin_id:Renin.renin_id,
                                patient_id:Renin.patient_id,
                                doctor_id:Renin.doctor_id,
                                appointment_id:Renin.appointment_id,
                                urea:Renin.urea,
                                creatinine:Renin.creatinine,
                                uric_acid:Renin.uric_acid,

                              };
                              this.$store.dispatch('Reninsinfo/addRenin',newRenin)
                              this.clearRenin()
                              this.pageChange();
                          }
                      
                      }).catch((error) => {
                              console.log(error);
  
                  });
              },
              updateRenin(renin_id){
                  let Reninlist = this.$store.getters['Reninsinfo/getRenins'];
                  
                  for (let i = 0;i < Reninlist.length;i++){
                      if(Reninlist[i].renin_id == renin_id){
                          Renin.renin_id = Reninlist[i].renin_id;
                          Renin.patient_id = Reninlist[i].patient_id;
                          Renin.doctor_id = Reninlist[i].doctor_id;
                          Renin.appointment_id = Reninlist[i].appointment_id;
                          Renin.urea = Reninlist[i].urea;
                          Renin.creatinine = Reninlist[i].creatinine;
                          Renin.uric_acid = Reninlist[i].uric_acid;
                          
                          break;
                      }
                      
                  }
              },
              updateSaveRenin(){
                  const url = "http://127.0.0.1:1116/Renin/update/"+Renin.renin_id+"/"+Renin.patient_id+
                                      "/"+Renin.doctor_id+"/"+Renin.appointment_id+"/"+Renin.urea+"/"
                                      +Renin.creatinine+"/"+Renin.uric_acid;
                  axios
                      .get(url)
                      .then((response) => {
                          
                          console.log(response.data);
                          if (response.data == "0"){
                              const newRenin={
                                renin_id:Renin.renin_id,
                                patient_id:Renin.patient_id,
                                doctor_id:Renin.doctor_id,
                                appointment_id:Renin.appointment_id,
                                urea:Renin.urea,
                                creatinine:Renin.creatinine,
                                uric_acid:Renin.uric_acid,
                                 
                              };
                              this.$store.dispatch('Reninsinfo/updateRenin',newRenin);
                              this.clearRenin()
                              this.pageChange();
                          }
                      })
                      .catch((error) => {
                          console.log(error);
  
                  });
              },
              clearRenin(){
                  Renin.renin_id = '';
                  Renin.patient_id ='';
                  Renin.doctor_id = '';
                  Renin.appointment_id = '';
                  Renin.urea ='';
                  Renin.creatinine = '';
                  Renin.uric_acid = '';

              }
          
          },
          components:{ ElButton,},
      };
  </script>