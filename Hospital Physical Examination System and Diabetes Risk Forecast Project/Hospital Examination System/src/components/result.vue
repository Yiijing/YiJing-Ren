<template>
    <el-form>
        <el-form-item label="患者ID">
        <el-input v-model="Result.patient_id" placeholder="Please input" clearable/>
        <el-button type="primary" @click="selectall(Result.patient_id)">查询</el-button>
        </el-form-item>
    </el-form>

    

    <span>患者体检信息</span>
    <el-table :data="Results" style="width: 100% ;margin:auto;">
      <el-table-column prop="diagnosis_id" label="体检单号" /> 
      <el-table-column prop="full_name" label="患者姓名"  />
      <el-table-column prop="date_of_birth" label="出生日期"  />
      <el-table-column prop="gender" label="性别"  />
      <el-table-column prop="appointment_date" label="预约日期" />
      <el-table-column prop="appointment_time" label="预约具体时间"  />
      <el-table-column prop="docname" label="医生姓名"  />
    </el-table>

    <span>查询检测结果</span>
    <el-form>
        <el-form-item label="体检单号">
            <el-input v-model="Result.diagnosis_id" placeholder="Please input" clearable/>
            <el-button type="primary" @click="select(Result.diagnosis_id)">查询</el-button>
        </el-form-item>
    </el-form>
    <el-table :data="Physical" style="width: 100% ;margin:auto;">
      <el-table-column prop="diagnosis_id" label="体检单号" />  
      <el-table-column prop="Neu" label="中性粒细胞%" /> 
      <el-table-column prop="Lym" label="淋巴细胞%"  />
      <el-table-column prop="Mon" label="单核细胞%"  />
      <el-table-column prop="Eos" label="嗜酸细胞%"  />
      <el-table-column prop="Bas" label="嗜碱细胞%" />
      <el-table-column prop="asp" label="天门冬氨酸氨基转换酶"  />
      <el-table-column prop="alkaline" label="丙氨酸氨基转换酶"  />
      <el-table-column prop="alanine" label="碱性磷酸酶"  />
      <el-table-column prop="r_glutamyl" label="r-谷氨酰基转换酶"  />
      <el-table-column prop="urea" label="尿素"  />
      <el-table-column prop="creatinine" label="肌酐"  />
      <el-table-column prop="uric_acid" label="尿酸"  />
    </el-table>
</template>

<script>
import axios from 'axios';
// import{ElButton} from 'element-plus';
import{reactive}from 'vue';
const Result=reactive({
            patient_id:'',
            diagnosis_id:'',
            full_name:'',
            date_of_birth:'',
            gender:'',
            appointment_date:'',
            appointment_time:'',
            docname:''
      })

export default({
    name:'Result',
    data(){
        return{
            Result,
        }
    },
    computed:{
        Results(){
            return this.$store.getters["Resultsinfo/getResults"]
        },
        Physical(){
            return this.$store.getters["Resultsinfo/getPhysical"]
        }
              
    },
    mounted(){
        let Resultslist = this.$store.getters['Resultsinfo/getResults'];
        let Physicallist = this.$store.getters["Resultsinfo/getPhysical"]
        if(Resultslist == ''){
            this.selectall(Result.patient_id);
        }
        if(Physicallist == ''){
            this.select(Result.diagnosis_id);
        }
    },
    methods:{
        selectall(patient_id){
            console.log('mounted 挂载DOM后');
            const url = 'http://127.0.0.1:1116/result/selectall/'+ patient_id
            axios
            .get(url)
            .then((response) => {
                
                console.log(response.data);

                let results = JSON.stringify(response.data);
                let Results = JSON.parse(results);

                for (let i in Results){

                    const newResult={
                        patient_id:Results[i].patient_id,
                        diagnosis_id:Results[i].diagnosis_id,
                        user_id:Results[i].user_id,
                        full_name:Results[i].full_name,
                        date_of_birth:Results[i].date_of_birth,
                        gender:Results[i].gender,
                        appointment_date:Results[i].appointment_date,
                        appointment_time:Results[i].appointment_time,
                        docname:Results[i].docname
                    };
                    this.$store.dispatch('Resultsinfo/addResult',newResult);
                }
            })
            .catch((error) => {
                    console.log(error);
            });
        },
        select(diagnosis_id){
            console.log('mounted 挂载DOM后');
            const url = 'http://127.0.0.1:1116/result/select/'+ diagnosis_id
            axios
            .get(url)
            .then((response) => {
                
                console.log(response.data);

                let results = JSON.stringify(response.data);
                let Physicals = JSON.parse(results);

                for (let i in Physicals){

                    const newPhysical={
                        patient_id:Physicals[i].patient_id,
                        diagnosis_id:Physicals[i].diagnosis_id,
                        Neu:Physicals[i].Neu,
                        Lym:Physicals[i].Lym,
                        Mon:Physicals[i].Mon,
                        Eos:Physicals[i].Eos,
                        Bas:Physicals[i].Bas,
                        asp:Physicals[i].asp,
                        alanine:Physicals[i].alanine,
                        alkaline:Physicals[i].alkaline,
                        r_glutamyl:Physicals[i].r_glutamyl,
                        urea:Physicals[i].urea,
                        creatinine:Physicals[i].creatinine,
                        uric_acid:Physicals[i].uric_acid,
                        
                    };
                    this.$store.dispatch('Resultsinfo/addPhysical',newPhysical);
                }
            })
            .catch((error) => {
                    console.log(error);
            });
        },
    },
    
             

})
</script>
