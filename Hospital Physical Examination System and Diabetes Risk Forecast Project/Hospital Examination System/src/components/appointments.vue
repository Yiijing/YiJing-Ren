<template>
    <el-table :data="AppointmentsShow" style="width: 100% ;margin:auto;">
      <el-table-column prop="appointment_id" label="appointment_id"  >
          <template v-slot="scope">
              {{ scope.row.appointment_id }}
          </template>
      </el-table-column>
      <el-table-column prop="patient_id" label="patient_id"  />
      <el-table-column prop="doctor_id" label="doctor_id"  />
      <el-table-column prop="appointment_date" label="appointment_date"  />
      <el-table-column prop="appointment_time" label="appointment_time"  />
      
  
      <el-table-column fixed="right" label="操作" >
          <template v-slot="scope">
              <el-button link type="primary" size="small" 
              @click="deleteAppointment(scope.row.appointment_id)">delete</el-button>
              <el-button link type="primary" size="small"
              @click="updateAppointment(scope.row.appointment_id)">Edit</el-button>
          </template>
      </el-table-column>
    </el-table>

    <el-pagination
            v-model:current-page=currentPage
            v-model:page-size=pageSize
            :page-sizes="[5, 10, 15, 20]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="Appointments.length"
            @size-change="sizeChange"
            @current-change="currentChange"
    />

  
      <el-form :model="Appointment" label-width="120px">
            <el-form-item label="appointment_id">
              <el-input v-model="Appointment.appointment_id" placeholder="Please input" clearable/>
            </el-form-item>
          <el-form-item label="patient_id">
              <el-input v-model="Appointment.patient_id" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="doctor_id">
              <el-input v-model="Appointment.doctor_id" placeholder="Please input" clearable/>
          </el-form-item>
          <el-form-item label="appointment_date">
              <div class="block">
                <el-date-picker
                    v-model="Appointment.appointment_date"
                    type="date"
                    placeholder="Pick a Date"
                    format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD"
                />
                </div>
          </el-form-item>
          <el-form-item label="appointment_time">
              <el-time-picker v-model="Appointment.appointment_time" value-format="hh:mm:ss" placeholder="Arbitrary time" />
            </el-form-item>
          
          <el-form-item>
              <el-button type="primary" @click="insertAppointment">插入</el-button>
              <el-button type="primary" @click="updateSaveAppointment">修改</el-button>
              <el-button type="primary" @click="clearAppointment">清空</el-button>
          </el-form-item>
      </el-form>
  
  </template>
  <script>
      import axios from 'axios';
      import{ElButton} from 'element-plus';
      import{reactive}from 'vue';
      const Appointment=reactive({
            appointment_id:'',
            patient_id:'',
            doctor_id:'',
            appointment_date:'',
            appointment_time:'',
      })
  
      export default {
          name:'Appointment',
          data(){
              return{
                  Appointment,
                  currentPage:1,// 首页（默认为第1页）
                  pageSize:15,// 每页条数（默认5条）
                  // 分页展示-文章-列表
                  AppointmentsShow:[],
                  startIndex:0,
                  endIndex:15,

              };
          },
          computed:{
              Appointments(){
                  return this.$store.getters["Appointmentsinfo/getAppointments"]
              },
              
          },
          mounted(){
              let Appointmentlist = this.$store.getters['Appointmentsinfo/getAppointments'];
              if(Appointmentlist == ''){
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
                let Appointments = this.$store.getters['Appointmentsinfo/getAppointments'];
                this.AppointmentsShow = Appointments.slice(this.startIndex,this.endIndex);

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
                  .get("http://127.0.0.1:1116/Appointments/selectall")
                  .then((response) => {
                      
                      console.log(response.data);
  
                      let results = JSON.stringify(response.data);
                      let Appointments = JSON.parse(results);
  
                      for (let i in Appointments){
  
                          const newAppointment={
                              appointment_id:Appointments[i].appointment_id,
                              patient_id:Appointments[i].patient_id,
                              doctor_id:Appointments[i].doctor_id,
                              appointment_date:Appointments[i].appointment_date,
                              appointment_time:Appointments[i].appointment_time,
                              
                          };
                          this.$store.dispatch('Appointmentsinfo/addAppointment',newAppointment);
                          
                      }
                    //   this.AppointmentsShow=Appointments.slice(0,this.pageSize-1)
                    this.pageChange();
                  })
                  .catch((error) => {
                          console.log(error);
                  });
              },
              deleteAppointment(appointment_id){
                  const url = "http://127.0.0.1:1116/Appointments/delete/"+appointment_id;
                  axios
                      .get(url)
                      .then((response) => {
                          
                          console.log(response.data);
                          if (response.data == "0"){
                              this.$store.dispatch('Appointmentsinfo/deleteAppointment',appointment_id)
                              this.pageChange();
                          }
                      
                      }).catch((error) => {
                              console.log(error);
  
                  });
              },
              insertAppointment(){
                  const url = "http://127.0.0.1:1116/Appointments/insert/"+Appointment.appointment_id+"/"+Appointment.patient_id+
                                      "/"+Appointment.doctor_id+"/"+Appointment.appointment_date+"/"+Appointment.appointment_time;
                  axios
                      .get(url)
                      .then((response) => {
                          
                          console.log(response.data);
                          if (response.data == "0"){
                              const newAppointment={
                                appointment_id:Appointment.appointment_id,
                                patient_id:Appointment.patient_id,
                                doctor_id:Appointment.doctor_id,
                                appointment_date:Appointment.appointment_date,
                                appointment_time:Appointment.appointment_time,

                              };
                              this.$store.dispatch('Appointmentsinfo/addAppointment',newAppointment)
                              this.clearAppointment()
                              this.pageChange();
                          }
                      
                      }).catch((error) => {
                              console.log(error);
  
                  });
              },
              updateAppointment(appointment_id){
                  let Appointmentlist = this.$store.getters['Appointmentsinfo/getAppointments'];
                  
                  for (let i = 0;i < Appointmentlist.length;i++){
                      if(Appointmentlist[i].appointment_id == appointment_id){
                          Appointment.appointment_id = Appointmentlist[i].appointment_id;
                          Appointment.patient_id = Appointmentlist[i].patient_id;
                          Appointment.doctor_id = Appointmentlist[i].doctor_id;
                          Appointment.appointment_date = Appointmentlist[i].appointment_date;
                          Appointment.appointment_time = Appointmentlist[i].appointment_time;
                          
                          break;
                      }
                      
                  }
              },
              updateSaveAppointment(){
                  const url = "http://127.0.0.1:1116/Appointments/update/"+Appointment.appointment_id+"/"+Appointment.patient_id+
                                      "/"+Appointment.doctor_id+"/"+Appointment.appointment_date+"/"+Appointment.appointment_time;
                  axios
                      .get(url)
                      .then((response) => {
                          
                          console.log(response.data);
                          if (response.data == "0"){
                              const newAppointment={
                                appointment_id:Appointment.appointment_id,
                                patient_id:Appointment.patient_id,
                                doctor_id:Appointment.doctor_id,
                                appointment_date:Appointment.appointment_date,
                                appointment_time:Appointment.appointment_time,
                                 
                              };
                              this.$store.dispatch('Appointmentsinfo/updateAppointment',newAppointment);
                              this.clearAppointment()
                              this.pageChange();
                          }
                      })
                      .catch((error) => {
                          console.log(error);
  
                  });
              },
              clearAppointment(){
                  Appointment.appointment_id = '';
                  Appointment.patient_id ='';
                  Appointment.doctor_id = '';
                  Appointment.appointment_date = '';
                  Appointment.appointment_time ='';

              }
          
          },
          components:{ ElButton,},
      };
  </script>