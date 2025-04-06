import { createStore } from 'vuex'

const UserMoudle = {
  namespaced : true,
  state:{
    Users:[],
  },
  mutations: {
    addUser(state,payload){
      state.Users.push(payload);
    },
    deleteUser(state,payload){
      state.Users = state.Users.filter(User => User.user_id !== payload);
    },
    updateUser(state,payload){
      for (let i = 0;i<state.Users.length;i++){
        if(state.Users[i].user_id == payload.user_id){
          state.Users[i].user_id = payload.user_id;
          state.Users[i].username = payload.username;
          state.Users[i].password = payload.password;
          state.Users[i].email = payload.email;
          state.Users[i].contact_number = payload.contact_number;       
          break;
        }
      }
    }
    
  },
  actions:{
    addUser(context,payload){
      context.commit('addUser',payload);
    },
    deleteUser(context,payload){
      context.commit('deleteUser',payload);
    },
    updateUser(context,payload){
      context.commit('updateUser',payload);
    }
  },
  getters:{
    getUsers(state){
      return state.Users;
    }
  }
}

const PatientMoudle = {
  namespaced : true,
  state:{
    Patients:[],
  },
  mutations: {
    addPatient(state,payload){
      state.Patients.push(payload);
    },
    deletePatient(state,payload){
      state.Patients = state.Patients.filter(Patient => Patient.patient_id !== payload);
    },
    updatePatient(state,payload){
      for (let i = 0;i<state.Patients.length;i++){
        if(state.Patients[i].patient_id == payload.patient_id){
          state.Patients[i].patient_id = payload.patient_id;
          state.Patients[i].user_id = payload.user_id;
          state.Patients[i].full_name = payload.full_name;
          state.Patients[i].date_of_birth = payload.date_of_birth;
          state.Patients[i].gender = payload.gender;       
          break;
        }
      }
    }
    
  },
  actions:{
    addPatient(context,payload){
      context.commit('addPatient',payload);
    },
    deletePatient(context,payload){
      context.commit('deletePatient',payload);
    },
    updatePatient(context,payload){
      context.commit('updatePatient',payload);
    }
  },
  getters:{
    getPatients(state){
      return state.Patients;
    }
  }
}

const AppointmentMoudle = {
  namespaced : true,
  state:{
    Appointments:[],
  },
  mutations: {
    addAppointment(state,payload){
      state.Appointments.push(payload);
    },
    deleteAppointment(state,payload){
      state.Appointments = state.Appointments.filter(Appointment => Appointment.appointment_id !== payload);
    },
    updateAppointment(state,payload){
      for (let i = 0;i<state.Appointments.length;i++){
        if(state.Appointments[i].appointment_id == payload.appointment_id){
          state.Appointments[i].appointment_id = payload.appointment_id;
          state.Appointments[i].patient_id = payload.patient_id;
          state.Appointments[i].doctor_id = payload.doctor_id;
          state.Appointments[i].appointment_date = payload.appointment_date;
          state.Appointments[i].appointment_time = payload.appointment_time;       
          break;
        }
      }
    }
    
  },
  actions:{
    addAppointment(context,payload){
      context.commit('addAppointment',payload);
    },
    deleteAppointment(context,payload){
      context.commit('deleteAppointment',payload);
    },
    updateAppointment(context,payload){
      context.commit('updateAppointment',payload);
    }
  },
  getters:{
    getAppointments(state){
      return state.Appointments;
    }
  }
}

const DoctorMoudle = {
  namespaced : true,
  state:{
    Doctors:[],
  },
  mutations: {
    addDoctor(state,payload){
      state.Doctors.push(payload);
    },
    deleteDoctor(state,payload){
      state.Doctors = state.Doctors.filter(Doctor => Doctor.doctor_id !== payload);
    },
    updateDoctor(state,payload){
      for (let i = 0;i<state.Doctors.length;i++){
        if(state.Doctors[i].doctor_id == payload.doctor_id){
          state.Doctors[i].doctor_id = payload.doctor_id;
          state.Doctors[i].user_id = payload.user_id;
          state.Doctors[i].full_name = payload.full_name;
          state.Doctors[i].specialization = payload.specialization;
          break;
        }
      }
    }
    
  },
  actions:{
    addDoctor(context,payload){
      context.commit('addDoctor',payload);
    },
    deleteDoctor(context,payload){
      context.commit('deleteDoctor',payload);
    },
    updateDoctor(context,payload){
      context.commit('updateDoctor',payload);
    }
  },
  getters:{
    getDoctors(state){
      return state.Doctors;
    }
  }
}

const ReninMoudle = {
  namespaced : true,
  state:{
    Renins:[],
  },
  mutations: {
    addRenin(state,payload){
      state.Renins.push(payload);
    },
    deleteRenin(state,payload){
      state.Renins = state.Renins.filter(Renin => Renin.renin_id !== payload);
    },
    updateRenin(state,payload){
      for (let i = 0;i<state.Renins.length;i++){
        if(state.Renins[i].renin_id == payload.renin_id){
          state.Renins[i].renin_id = payload.renin_id;
          state.Renins[i].patient_id = payload.patient_id;
          state.Renins[i].doctor_id = payload.doctor_id;
          state.Renins[i].appointment_id = payload.appointment_id;
          state.Renins[i].urea = payload.urea;
          state.Renins[i].creatinine = payload.creatinine;
          state.Renins[i].uric_acid = payload.uric_acid;
          
          break;
        }
      }
    }
    
  },
  actions:{
    addRenin(context,payload){
      context.commit('addRenin',payload);
    },
    deleteRenin(context,payload){
      context.commit('deleteRenin',payload);
    },
    updateRenin(context,payload){
      context.commit('updateRenin',payload);
    }
  },
  getters:{
    getRenins(state){
      return state.Renins;
    }
  }
}

const DiagnosisMoudle = {
  namespaced : true,
  state:{
    Diagnosiss:[],
  },
  mutations: {
    addDiagnosis(state,payload){
      state.Diagnosiss.push(payload);
    },
    deleteDiagnosis(state,payload){
      state.Diagnosiss = state.Diagnosiss.filter(Diagnosis => Diagnosis.diagnosis_id !== payload);
    },
    updateDiagnosis(state,payload){
      for (let i = 0;i<state.Diagnosiss.length;i++){
        if(state.Diagnosiss[i].diagnosis_id == payload.diagnosis_id){
          state.Diagnosiss[i].diagnosis_id = payload.diagnosis_id;
          state.Diagnosiss[i].patient_id = payload.patient_id;
          state.Diagnosiss[i].doctor_id = payload.doctor_id;
          state.Diagnosiss[i].appointment_id = payload.appointment_id;
          state.Diagnosiss[i].blood_id = payload.blood_id;
          state.Diagnosiss[i].liver_id = payload.liver_id;
          state.Diagnosiss[i].renin_id = payload.renin_id;
          
          break;
        }
      }
    }
    
  },
  actions:{
    addDiagnosis(context,payload){
      context.commit('addDiagnosis',payload);
    },
    deleteDiagnosis(context,payload){
      context.commit('deleteDiagnosis',payload);
    },
    updateDiagnosis(context,payload){
      context.commit('updateDiagnosis',payload);
    }
  },
  getters:{
    getDiagnosiss(state){
      return state.Diagnosiss;
    }
  }
}

const BloodroutineMoudle = {
  namespaced : true,
  state:{
    Bloodroutines:[],
  },
  mutations: {
    addBloodroutine(state,payload){
      state.Bloodroutines.push(payload);
    },
    deleteBloodroutine(state,payload){
      state.Bloodroutines = state.Bloodroutines.filter(Bloodroutine => Bloodroutine.blood_id !== payload);
    },
    updateBloodroutine(state,payload){
      for (let i = 0;i<state.Bloodroutines.length;i++){
        if(state.Bloodroutines[i].blood_id == payload.blood_id){
          state.Bloodroutines[i].blood_id = payload.blood_id;
          state.Bloodroutines[i].patient_id = payload.patient_id;
          state.Bloodroutines[i].doctor_id = payload.doctor_id;
          state.Bloodroutines[i].appointment_id = payload.appointment_id;
          state.Bloodroutines[i].Neu = payload.Neu;
          state.Bloodroutines[i].Lym = payload.Lym;
          state.Bloodroutines[i].Mon = payload.Mon;
          state.Bloodroutines[i].Eos= payload.Eos;
          state.Bloodroutines[i].Bas= payload.Bas;
          
          break;
        }
      }
    }
    
  },
  actions:{
    addBloodroutine(context,payload){
      context.commit('addBloodroutine',payload);
    },
    deleteBloodroutine(context,payload){
      context.commit('deleteBloodroutine',payload);
    },
    updateBloodroutine(context,payload){
      context.commit('updateBloodroutine',payload);
    }
  },
  getters:{
    getBloodroutines(state){
      return state.Bloodroutines;
    }
  }
}

const LiverMoudle = {
  namespaced : true,
  state:{
    Livers:[],
  },
  mutations: {
    addLiver(state,payload){
      state.Livers.push(payload);
    },
    deleteLiver(state,payload){
      state.Livers = state.Livers.filter(Liver => Liver.liver_id !== payload);
    },
    updateLiver(state,payload){
      for (let i = 0;i<state.Livers.length;i++){
        if(state.Livers[i].liver_id == payload.liver_id){
          state.Livers[i].liver_id = payload.liver_id;
          state.Livers[i].patient_id = payload.patient_id;
          state.Livers[i].doctor_id = payload.doctor_id;
          state.Livers[i].appointment_id = payload.appointment_id;
          state.Livers[i].asp = payload.asp;
          state.Livers[i].alanine = payload.alanine;
          state.Livers[i].alkaline = payload.alkaline;
          state.Livers[i].r_glutamyl= payload.r_glutamyl;
          
          
          break;
        }
      }
    }
    
  },
  actions:{
    addLiver(context,payload){
      context.commit('addLiver',payload);
    },
    deleteLiver(context,payload){
      context.commit('deleteLiver',payload);
    },
    updateLiver(context,payload){
      context.commit('updateLiver',payload);
    }
  },
  getters:{
    getLivers(state){
      return state.Livers;
    }
  }
}

const ResultsMoudle = {
  namespaced : true,
  state:{
    Results:[],
    Physical:[]
  },
  mutations: {
    addResult(state,payload){
      state.Results.push(payload);
    },
    deleteResult(state,payload){
      state.Results = state.Results.filter(Result => Result.patient_id !== payload);
    },
    updateResult(state,payload){
      for (let i = 0;i<state.Results.length;i++){
        if(state.Results[i].patient_id == payload.patient_id){
          state.Results[i].patient_id = payload.patient_id;
          state.Results[i].user_id = payload.user_id;
          state.Results[i].full_name = payload.full_name;
          state.Results[i].date_of_birth = payload.date_of_birth;
          state.Results[i].gender = payload.gender;       
          break;
        }
      }
    },

    addPhysical(state,payload){
      state.Physical.push(payload);
    },
    deletePhysical(state,payload){
      state.Physical = state.Physical.filter(Physical => Physical.patient_id !== payload);
    },
    updatePhysical(state,payload){
      for (let i = 0;i<state.Physical.length;i++){
        if(state.Physical[i].patient_id == payload.patient_id){
          state.Physical[i].patient_id = payload.patient_id;
          state.Physical[i].user_id = payload.user_id;
          state.Physical[i].full_name = payload.full_name;
          state.Physical[i].date_of_birth = payload.date_of_birth;
          state.Physical[i].gender = payload.gender;       
          break;
        }
      }
    }
    
  },
  actions:{
    addResult(context,payload){
      context.commit('addResult',payload);
    },

    addPhysical(context,payload){
      context.commit('addPhysical',payload);
    },
   
  },
  getters:{
    getResults(state){
      return state.Results;
    },
    getPhysical(state){
      return state.Physical;
    }
  }
}

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Usersinfo:UserMoudle,
    Patientsinfo:PatientMoudle,
    Appointmentsinfo:AppointmentMoudle,
    Doctorsinfo:DoctorMoudle,
    Reninsinfo:ReninMoudle,
    Diagnosissinfo:DiagnosisMoudle,
    Bloodroutinesinfo:BloodroutineMoudle,
    Liversinfo:LiverMoudle,
    Resultsinfo:ResultsMoudle,
  }
})
