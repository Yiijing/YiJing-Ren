<template>
    <el-table :data="BloodroutinesShow" style="width: 100% ;margin:auto;">
      <el-table-column prop="blood_id" label="ID"  >
          <template v-slot="scope">
              {{ scope.row.blood_id }}
          </template>
      </el-table-column>
      <el-table-column prop="patient_id" label="patient_id"  />
      <el-table-column prop="doctor_id" label="doctor_id"  />
      <el-table-column prop="appointment_id" label="appointment_id"  />
      <el-table-column prop="Neu" label="Neu"  />
      <el-table-column prop="Lym" label="Lym"  />
      <el-table-column prop="Mon" label="Mon"  />
      <el-table-column prop="Eos" label="Eos"  />
      <el-table-column prop="Bas" label="Bas"  />

      <el-table-column fixed="right" label="操作" >
          <template v-slot="scope">
              <el-button link type="primary" size="small" 
              @click="deleteBloodroutine(scope.row.blood_id)">delete</el-button>
              <el-button link type="primary" size="small"
              @click="updateBloodroutine(scope.row.blood_id)">Edit</el-button>
          </template>
      </el-table-column>
    </el-table>

    <el-pagination
            v-model:current-page=currentPage
            v-model:page-size=pageSize
            :page-sizes="[5, 10, 15, 20]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="Bloodroutines.length"
            @size-change="sizeChange"
            @current-change="currentChange"
    />

  
      <el-form :model="Bloodroutine" label-width="120px">
            <el-form-item label="BloodroutineID">
              <el-input v-model="Bloodroutine.blood_id" placeholder="Please input" clearable/>
            </el-form-item>
          <el-form-item label="patient_id">
              <el-input v-model="Bloodroutine.patient_id" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="doctor_id">
              <el-input v-model="Bloodroutine.doctor_id" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="appointment_id">
              <el-input v-model="Bloodroutine.appointment_id" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="Neu">
              <el-input v-model="Bloodroutine.Neu" placeholder="Please input" clearable/>
          </el-form-item>
          
          <el-form-item label="Lym">
              <el-input v-model="Bloodroutine.Lym" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="Mon">
              <el-input v-model="Bloodroutine.Mon" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="Eos">
              <el-input v-model="Bloodroutine.Eos" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="Bas">
              <el-input v-model="Bloodroutine.Bas" placeholder="Please input" clearable/>
          </el-form-item>
          
          
          <el-form-item>
              <el-button type="primary" @click="insertBloodroutine">插入</el-button>
              <el-button type="primary" @click="updateSaveBloodroutine">修改</el-button>
              <el-button type="primary" @click="clearBloodroutine">清空</el-button>
          </el-form-item>
      </el-form>
  
  </template>
  <script>
      import axios from 'axios';
      import{ElButton} from 'element-plus';
      import{reactive}from 'vue';
      const Bloodroutine=reactive({
            blood_id:'',
            patient_id:'',
            doctor_id:'',
            appointment_id:'',
            Neu:'',
            Lym:'',
            Mon:'',
            Eos:'',
            Bas:''
      })
  
      export default {
          name:'Bloodroutine',
          data(){
              return{
                  Bloodroutine,
                  currentPage:1,// 首页（默认为第1页）
                  pageSize:15,// 每页条数（默认5条）
                  // 分页展示-文章-列表
                  BloodroutinesShow:[],
                  startIndex:0,
                  endIndex:15,

              };
          },
          computed:{
              Bloodroutines(){
                  return this.$store.getters["Bloodroutinesinfo/getBloodroutines"]
              },
              
          },
          mounted(){
              let Bloodroutinelist = this.$store.getters['Bloodroutinesinfo/getBloodroutines'];
              if(Bloodroutinelist == ''){
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
                let Bloodroutines = this.$store.getters['Bloodroutinesinfo/getBloodroutines'];
                this.BloodroutinesShow = Bloodroutines.slice(this.startIndex,this.endIndex);

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
                  .get("http://127.0.0.1:1116/Bloodroutine/selectall")
                  .then((response) => {
                      
                      console.log(response.data);
  
                      let results = JSON.stringify(response.data);
                      let Bloodroutines = JSON.parse(results);
  
                      for (let i in Bloodroutines){
  
                          const newBloodroutine={
                              blood_id:Bloodroutines[i].blood_id,
                              patient_id:Bloodroutines[i].patient_id,
                              doctor_id:Bloodroutines[i].doctor_id,
                              appointment_id:Bloodroutines[i].appointment_id,
                              Neu:Bloodroutines[i].Neu,
                              Lym:Bloodroutines[i].Lym,
                              Mon:Bloodroutines[i].Mon,
                              Eos:Bloodroutines[i].Eos,
                              Bas:Bloodroutines[i].Bas,


                              
                          };
                          this.$store.dispatch('Bloodroutinesinfo/addBloodroutine',newBloodroutine);
                          
                      }
                    //   this.BloodroutinesShow=Bloodroutines.slice(0,this.pageSize-1)
                    this.pageChange();
                  })
                  .catch((error) => {
                          console.log(error);
                  });
              },
              deleteBloodroutine(blood_id){
                  const url = "http://127.0.0.1:1116/Bloodroutine/delete/"+blood_id;
                  axios
                      .get(url)
                      .then((response) => {
                          
                          console.log(response.data);
                          if (response.data == "0"){
                              this.$store.dispatch('Bloodroutinesinfo/deleteBloodroutine',blood_id)
                              this.pageChange();
                          }
                      
                      }).catch((error) => {
                              console.log(error);
  
                  });
              },
              insertBloodroutine(){
                  const url = "http://127.0.0.1:1116/Bloodroutine/insert/"+Bloodroutine.blood_id+"/"+Bloodroutine.patient_id+
                                      "/"+Bloodroutine.doctor_id+"/"+Bloodroutine.appointment_id+"/"+Bloodroutine.Neu+"/"
                                      +Bloodroutine.Lym+"/"+Bloodroutine.Mon+"/"+Bloodroutine.Eos+"/"+Bloodroutine.Bas;
                  axios
                      .get(url)
                      .then((response) => {
                          
                          console.log(response.data);
                          if (response.data == "0"){
                              const newBloodroutine={
                                blood_id:Bloodroutine.blood_id,
                                patient_id:Bloodroutine.patient_id,
                                doctor_id:Bloodroutine.doctor_id,
                                appointment_id:Bloodroutine.appointment_id,
                                Neu:Bloodroutine.Neu,
                                Lym:Bloodroutine.Lym,
                                Mon:Bloodroutine.Mon,
                                Eos:Bloodroutine.Eos,
                                Bas:Bloodroutine.Bas,

                              };
                              this.$store.dispatch('Bloodroutinesinfo/addBloodroutine',newBloodroutine)
                              this.clearBloodroutine()
                              this.pageChange();
                          }
                      
                      }).catch((error) => {
                              console.log(error);
  
                  });
              },
              updateBloodroutine(blood_id){
                  let Bloodroutinelist = this.$store.getters['Bloodroutinesinfo/getBloodroutines'];
                  
                  for (let i = 0;i < Bloodroutinelist.length;i++){
                      if(Bloodroutinelist[i].blood_id == blood_id){
                          Bloodroutine.blood_id = Bloodroutinelist[i].blood_id;
                          Bloodroutine.patient_id = Bloodroutinelist[i].patient_id;
                          Bloodroutine.doctor_id = Bloodroutinelist[i].doctor_id;
                          Bloodroutine.appointment_id = Bloodroutinelist[i].appointment_id;
                          Bloodroutine.Neu = Bloodroutinelist[i].Neu;
                          Bloodroutine.Lym = Bloodroutinelist[i].Lym;
                          Bloodroutine.Mon = Bloodroutinelist[i].Mon;
                          Bloodroutine.Eos = Bloodroutinelist[i].Eos;
                          Bloodroutine.Bas = Bloodroutinelist[i].Bas;
                          
                          break;
                      }
                      
                  }
              },
              updateSaveBloodroutine(){
                  const url = "http://127.0.0.1:1116/Bloodroutine/update/"+Bloodroutine.blood_id+"/"+Bloodroutine.patient_id+
                                      "/"+Bloodroutine.doctor_id+"/"+Bloodroutine.appointment_id+"/"+Bloodroutine.Neu+"/"
                                      +Bloodroutine.Lym+"/"+Bloodroutine.Mon+"/"+Bloodroutine.Eos+"/"+Bloodroutine.Bas;
                  axios
                      .get(url)
                      .then((response) => {
                          
                          console.log(response.data);
                          if (response.data == "0"){
                              const newBloodroutine={
                                blood_id:Bloodroutine.blood_id,
                                patient_id:Bloodroutine.patient_id,
                                doctor_id:Bloodroutine.doctor_id,
                                appointment_id:Bloodroutine.appointment_id,
                                Neu:Bloodroutine.Neu,
                                Lym:Bloodroutine.Lym,
                                Mon:Bloodroutine.Mon,
                                Eos:Bloodroutine.Eos,
                                Bas:Bloodroutine.Bas,
                                 
                              };
                              this.$store.dispatch('Bloodroutinesinfo/updateBloodroutine',newBloodroutine);
                              this.clearBloodroutine()
                              this.pageChange();
                          }
                      })
                      .catch((error) => {
                          console.log(error);
  
                  });
              },
              clearBloodroutine(){
                  Bloodroutine.blood_id = '';
                  Bloodroutine.patient_id ='';
                  Bloodroutine.doctor_id = '';
                  Bloodroutine.appointment_id = '';
                  Bloodroutine.Neu ='';
                  Bloodroutine.Lym = '';
                  Bloodroutine.Mon = '';
                  Bloodroutine.Eos = '';
                  Bloodroutine.Bas = '';

              }
          
          },
          components:{ ElButton,},
      };
  </script>