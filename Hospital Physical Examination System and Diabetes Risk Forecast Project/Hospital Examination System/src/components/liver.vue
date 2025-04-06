<template>
    <el-table :data="LiversShow" style="width: 100% ;margin:auto;">
      <el-table-column prop="liver_id" label="ID"  >
          <template v-slot="scope">
              {{ scope.row.liver_id }}
          </template>
      </el-table-column>
      <el-table-column prop="patient_id" label="patient_id"  />
      <el-table-column prop="doctor_id" label="doctor_id"  />
      <el-table-column prop="appointment_id" label="appointment_id"  />
      <el-table-column prop="asp" label="asp"  />
      <el-table-column prop="alanine" label="alanine"  />
      <el-table-column prop="alkaline" label="alkaline"  />
      <el-table-column prop="r_glutamyl" label="r_glutamyl"  />
      
      <el-table-column fixed="right" label="操作" >
          <template v-slot="scope">
              <el-button link type="primary" size="small" 
              @click="deleteLiver(scope.row.liver_id)">delete</el-button>
              <el-button link type="primary" size="small"
              @click="updateLiver(scope.row.liver_id)">Edit</el-button>
          </template>
      </el-table-column>
    </el-table>

    <el-pagination
            v-model:current-page=currentPage
            v-model:page-size=pageSize
            :page-sizes="[5, 10, 15, 20]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="Livers.length"
            @size-change="sizeChange"
            @current-change="currentChange"
    />

  
      <el-form :model="Liver" label-width="120px">
            <el-form-item label="LiverID">
              <el-input v-model="Liver.liver_id" placeholder="Please input" clearable/>
            </el-form-item>
          <el-form-item label="patient_id">
              <el-input v-model="Liver.patient_id" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="doctor_id">
              <el-input v-model="Liver.doctor_id" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="appointment_id">
              <el-input v-model="Liver.appointment_id" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="asp">
              <el-input v-model="Liver.asp" placeholder="Please input" clearable/>
          </el-form-item>
          
          <el-form-item label="alanine">
              <el-input v-model="Liver.alanine" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="alkaline">
              <el-input v-model="Liver.alkaline" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="r_glutamyl">
              <el-input v-model="Liver.r_glutamyl" placeholder="Please input" clearable/>
          </el-form-item>
          
          
          
          <el-form-item>
              <el-button type="primary" @click="insertLiver">插入</el-button>
              <el-button type="primary" @click="updateSaveLiver">修改</el-button>
              <el-button type="primary" @click="clearLiver">清空</el-button>
          </el-form-item>
      </el-form>
  
  </template>
  <script>
      import axios from 'axios';
      import{ElButton} from 'element-plus';
      import{reactive}from 'vue';
      const Liver=reactive({
            liver_id:'',
            patient_id:'',
            doctor_id:'',
            appointment_id:'',
            asp:'',
            alanine:'',
            alkaline:'',
            r_glutamyl:''
            
      })
  
      export default {
          name:'Liver',
          data(){
              return{
                  Liver,
                  currentPage:1,// 首页（默认为第1页）
                  pageSize:15,// 每页条数（默认5条）
                  // 分页展示-文章-列表
                  LiversShow:[],
                  startIndex:0,
                  endIndex:15,

              };
          },
          computed:{
              Livers(){
                  return this.$store.getters["Liversinfo/getLivers"]
              },
              
          },
          mounted(){
              let Liverlist = this.$store.getters['Liversinfo/getLivers'];
              if(Liverlist == ''){
                  this.selectall();
                  this.pageChange();
              }
                else{
                    this.pageChange();
                    console.log(2)
                }
            

        
              
          },
          methods:{
            // 页面参数(条数/页码)变化
            pageChange(){
                this.startIndex = (this.currentPage-1)*this.pageSize;
                this.endIndex = this.currentPage*this.pageSize-1;
                let Livers = this.$store.getters['Liversinfo/getLivers'];
                this.LiversShow = Livers.slice(this.startIndex,this.endIndex);

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
                  .get("http://127.0.0.1:1116/Liver/selectall")
                  .then((response) => {
                      
                      console.log(response.data);
  
                      let results = JSON.stringify(response.data);
                      let Livers = JSON.parse(results);
  
                      for (let i in Livers){
  
                          const newLiver={
                              liver_id:Livers[i].liver_id,
                              patient_id:Livers[i].patient_id,
                              doctor_id:Livers[i].doctor_id,
                              appointment_id:Livers[i].appointment_id,
                              asp:Livers[i].asp,
                              alanine:Livers[i].alanine,
                              alkaline:Livers[i].alkaline,
                              r_glutamyl:Livers[i].r_glutamyl,
                              


                              
                          };
                          this.$store.dispatch('Liversinfo/addLiver',newLiver);
                          
                      }
                    //   this.LiversShow=Livers.slice(0,this.pageSize-1)
                    this.pageChange();
                  })
                  .catch((error) => {
                          console.log(error);
                  });
              },
              deleteLiver(liver_id){
                  const url = "http://127.0.0.1:1116/Liver/delete/"+liver_id;
                  axios
                      .get(url)
                      .then((response) => {
                          
                          console.log(response.data);
                          if (response.data == "0"){
                              this.$store.dispatch('Liversinfo/deleteLiver',liver_id)
                              this.pageChange();
                          }
                      
                      }).catch((error) => {
                              console.log(error);
  
                  });
              },
              insertLiver(){
                  const url = "http://127.0.0.1:1116/Liver/insert/"+Liver.liver_id+"/"+Liver.patient_id+
                                      "/"+Liver.doctor_id+"/"+Liver.appointment_id+"/"+Liver.asp+"/"
                                      +Liver.alanine+"/"+Liver.alkaline+"/"+Liver.r_glutamyl;
                  axios
                      .get(url)
                      .then((response) => {
                          
                          console.log(response.data);
                          if (response.data == "0"){
                              const newLiver={
                                liver_id:Liver.liver_id,
                                patient_id:Liver.patient_id,
                                doctor_id:Liver.doctor_id,
                                appointment_id:Liver.appointment_id,
                                asp:Liver.asp,
                                alanine:Liver.alanine,
                                alkaline:Liver.alkaline,
                                r_glutamyl:Liver.r_glutamyl,
                                

                              };
                              this.$store.dispatch('Liversinfo/addLiver',newLiver)
                              this.clearLiver()
                              this.pageChange();
                          }
                      
                      }).catch((error) => {
                              console.log(error);
  
                  });
              },
              updateLiver(liver_id){
                  let Liverlist = this.$store.getters['Liversinfo/getLivers'];
                  
                  for (let i = 0;i < Liverlist.length;i++){
                      if(Liverlist[i].liver_id == liver_id){
                          Liver.liver_id = Liverlist[i].liver_id;
                          Liver.patient_id = Liverlist[i].patient_id;
                          Liver.doctor_id = Liverlist[i].doctor_id;
                          Liver.appointment_id = Liverlist[i].appointment_id;
                          Liver.asp = Liverlist[i].asp;
                          Liver.alanine = Liverlist[i].alanine;
                          Liver.alkaline = Liverlist[i].alkaline;
                          Liver.r_glutamyl = Liverlist[i].r_glutamyl;
                          
                          
                          break;
                      }
                      
                  }
              },
              updateSaveLiver(){
                  const url = "http://127.0.0.1:1116/Liver/update/"+Liver.liver_id+"/"+Liver.patient_id+
                                      "/"+Liver.doctor_id+"/"+Liver.appointment_id+"/"+Liver.asp+"/"
                                      +Liver.alanine+"/"+Liver.alkaline+"/"+Liver.r_glutamyl;
                  axios
                      .get(url)
                      .then((response) => {
                          
                          console.log(response.data);
                          if (response.data == "0"){
                              const newLiver={
                                liver_id:Liver.liver_id,
                                patient_id:Liver.patient_id,
                                doctor_id:Liver.doctor_id,
                                appointment_id:Liver.appointment_id,
                                asp:Liver.asp,
                                alanine:Liver.alanine,
                                alkaline:Liver.alkaline,
                                r_glutamyl:Liver.r_glutamyl,
                                
                                 
                              };
                              this.$store.dispatch('Liversinfo/updateLiver',newLiver);
                              this.clearLiver()
                              this.pageChange();
                          }
                      })
                      .catch((error) => {
                          console.log(error);
  
                  });
              },
              clearLiver(){
                  Liver.liver_id = '';
                  Liver.patient_id ='';
                  Liver.doctor_id = '';
                  Liver.appointment_id = '';
                  Liver.asp ='';
                  Liver.alanine = '';
                  Liver.alkaline = '';
                  Liver.r_glutamyl = '';
                 

              }
          
          },
          components:{ ElButton,},
      };
  </script>