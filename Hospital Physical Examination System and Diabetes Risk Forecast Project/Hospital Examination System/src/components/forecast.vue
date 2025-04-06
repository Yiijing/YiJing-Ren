<template>
    <div>
        <el-form :model="userData" label-width="120px">
            <el-form-item label='年龄'>
                    <el-input v-model="userData['年龄'][0]" placeholder="Please input" clearable/>
            </el-form-item>
            <el-form :inline="true"  :label-position="top">
                <el-row>
                    <el-col :span="8">
                <el-form-item label="*天门冬氨酸氨基转换酶">
                    <el-input v-model="userData['*天门冬氨酸氨基转换酶'][0]" placeholder="Please input" clearable/>
                </el-form-item>
            </el-col>
            <el-col :span="8">
        <el-form-item label="嗜碱细胞%">
              <el-input v-model="userData['嗜碱细胞%'][0]" placeholder="Please input" clearable/>
          </el-form-item></el-col>
            <el-col :span="8">
                <el-form-item label="*丙氨酸氨基转换酶">
                    <el-input v-model="userData['*丙氨酸氨基转换酶'][0]" placeholder="Please input" clearable/>
                </el-form-item>
            </el-col>
            </el-row>
            </el-form>
          <el-form :inline="true" :label-position="top">
            <el-row>
                    <el-col :span="8">
            <el-form-item label="*碱性磷酸酶">
              <el-input v-model="userData['*碱性磷酸酶'][0]" placeholder="Please input" clearable/>
            </el-form-item>
        </el-col>
            <el-col :span="8">
            <el-form-item label="*r-谷氨酰基转换酶">
              <el-input v-model="userData['*r-谷氨酰基转换酶'][0]" placeholder="Please input" clearable/>
            </el-form-item>
        </el-col>
            <el-col :span="8">
            <el-form-item label='*总蛋白'>
              <el-input v-model="userData['*总蛋白'][0]" placeholder="Please input" clearable/>
            </el-form-item>
        </el-col>
            </el-row>
        </el-form>
        <el-form :inline="true" :label-position="top">
            <el-row>
                    <el-col :span="8">
            <el-form-item label="白蛋白">
                <el-input v-model="userData['白蛋白'][0]" placeholder="Please input" clearable/>
            </el-form-item>
        </el-col>
            <el-col :span="8">
            <el-form-item label="*球蛋白">
                <el-input v-model="userData['*球蛋白'][0]" placeholder="Please input" clearable/>
            </el-form-item>
        </el-col>
            <el-col :span="8">
            <el-form-item label="白球比例">
                <el-input v-model="userData['白球比例'][0]" placeholder="Please input" clearable/>
            </el-form-item>
        </el-col>
            </el-row>
        </el-form>
        <el-form :inline="true" :label-position="top">
            <el-row>
                    <el-col :span="8">
            <el-form-item label="甘油三酯">
                <el-input v-model="userData['甘油三酯'][0]" placeholder="Please input" clearable/>
            </el-form-item>
        </el-col>
            <el-col :span="8">
            <el-form-item label='总胆固醇'>
                <el-input v-model="userData['总胆固醇'][0]" placeholder="Please input" clearable/>
                </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="高密度脂蛋白胆固醇">
                <el-input v-model="userData['高密度脂蛋白胆固醇'][0]" placeholder="Please input" clearable/>
            </el-form-item>
        </el-col>
            </el-row>
        </el-form>
        <el-form :inline="true" :label-position="top">
            <el-row>
                    <el-col :span="8">
            <el-form-item label="低密度脂蛋白胆固醇">
              <el-input v-model="userData['低密度脂蛋白胆固醇'][0]" placeholder="Please input" clearable/>
          </el-form-item>
        </el-col>
            <el-col :span="8">
          <el-form-item label="尿素">
              <el-input v-model="userData['尿素'][0]" placeholder="Please input" clearable/>
          </el-form-item></el-col>
            <el-col :span="8">
          <el-form-item label="肌酐">
              <el-input v-model="userData['肌酐'][0]" placeholder="Please input" clearable/>
          </el-form-item></el-col>
            </el-row>
        </el-form>
        <el-form :inline="true" :label-position="top">
            <el-row>
                    <el-col :span="8">
            <el-form-item label="尿酸">
              <el-input v-model="userData['尿酸'][0]" placeholder="Please input" clearable/>
          </el-form-item>
        </el-col>
            <el-col :span="8">
          <el-form-item label="Outcome">
              <el-input v-model="userData['Outcome'][0]" placeholder="Please input" clearable/>
          </el-form-item></el-col>
            <el-col :span="8">
          <el-form-item label='白细胞计数'>
              <el-input v-model="userData['白细胞计数'][0]" placeholder="Please input" clearable/>
            </el-form-item></el-col>
            </el-row>
        </el-form>
          
        <el-form :inline="true" :label-position="top">
            <el-row>
                    <el-col :span="8">
             <el-form-item label="红细胞计数">
                <el-input v-model="userData['红细胞计数'][0]" placeholder="Please input" clearable/>
            </el-form-item></el-col>
            <el-col :span="8">
            <el-form-item label="血红蛋白">
                <el-input v-model="userData['血红蛋白'][0]" placeholder="Please input" clearable/>
            </el-form-item></el-col>
            <el-col :span="8">
            <el-form-item label="红细胞压积">
                <el-input v-model="userData['红细胞压积'][0]" placeholder="Please input" clearable/>
            </el-form-item></el-col>
            </el-row>
        </el-form>
        <el-form :inline="true" :label-position="top"><el-row>
                    <el-col :span="8">
            <el-form-item label="红细胞平均体积">
              <el-input v-model="userData['红细胞平均体积'][0]" placeholder="Please input" clearable/>
          </el-form-item></el-col>
            <el-col :span="8">
          <el-form-item label='红细胞平均血红蛋白量'>
              <el-input v-model="userData['红细胞平均血红蛋白量'][0]" placeholder="Please input" clearable/>
            </el-form-item></el-col>
            <el-col :span="8">
          <el-form-item label="红细胞平均血红蛋白浓度">
              <el-input v-model="userData['红细胞平均血红蛋白浓度'][0]" placeholder="Please input" clearable/>
          </el-form-item></el-col>
            </el-row>
        </el-form>
        <el-form :inline="true" :label-position="top"><el-row>
                    <el-col :span="8">
            <el-form-item label="红细胞体积分布宽度">
              <el-input v-model="userData['红细胞体积分布宽度'][0]" placeholder="Please input" clearable/>
          </el-form-item></el-col>
            <el-col :span="8">
          <el-form-item label="血小板计数">
              <el-input v-model="userData['血小板计数'][0]" placeholder="Please input" clearable/>
          </el-form-item></el-col>
            <el-col :span="8">
          <el-form-item label="血小板平均体积">
              <el-input v-model="userData['血小板平均体积'][0]" placeholder="Please input" clearable/>
          </el-form-item></el-col>
            </el-row>
    </el-form>
    <el-form :inline="true" :label-position="top"><el-row>
                    <el-col :span="8">
        <el-form-item label='血小板体积分布宽度'>
              <el-input v-model="userData['血小板体积分布宽度'][0]" placeholder="Please input" clearable/>
            </el-form-item></el-col>
            <el-col :span="8">
          <el-form-item label="血小板比积">
              <el-input v-model="userData['血小板比积'][0]" placeholder="Please input" clearable/>
          </el-form-item></el-col>
            <el-col :span="8">
          <el-form-item label="中性粒细胞%">
              <el-input v-model="userData['中性粒细胞%'][0]" placeholder="Please input" clearable/>
          </el-form-item></el-col>
            </el-row>
    </el-form>
    <el-form :inline="true" :label-position="top"><el-row>
                    <el-col :span="8">
        <el-form-item label="淋巴细胞%">
              <el-input v-model="userData['淋巴细胞%'][0]" placeholder="Please input" clearable/>
          </el-form-item></el-col>
            <el-col :span="8">
          <el-form-item label="单核细胞%">
              <el-input v-model="userData['单核细胞%'][0]" placeholder="Please input" clearable/>
          </el-form-item></el-col>
            <el-col :span="8">
          <el-form-item label="嗜酸细胞%">
              <el-input v-model="userData['嗜酸细胞%'][0]" placeholder="Please input" clearable/>
          </el-form-item></el-col>
            </el-row>
    </el-form>
    <el-form :inline="true" :label-position="top">
        <el-row>
                
            <el-col :span="8">
          <el-form-item label="血糖">
              <el-input v-model="userData['血糖'][0]" placeholder="Please input" clearable/>
          </el-form-item></el-col>
            </el-row>
    </el-form>
          
          <el-form-item>
              <el-button type="primary" @click="submitData">提交</el-button>
          </el-form-item>
          <el-form-item label="后端响应数据：">
              <el-text>{{responseData}}</el-text>
          </el-form-item>
      </el-form>
    </div>
</template>  
    
<script>
import axios from 'axios';

export default {
    data() {
        return {
            userData: {
                '年龄': ['',],
                '*天门冬氨酸氨基转换酶': ['',],
                '*丙氨酸氨基转换酶': ['',],
                '*碱性磷酸酶': ['',],
                '*r-谷氨酰基转换酶': ['',],
                '*总蛋白': ['',],
                '白蛋白': ['',],
                '*球蛋白':['',],
                '白球比例': ['',],
                '甘油三酯': ['',],
                '总胆固醇': ['',],
                '高密度脂蛋白胆固醇': ['',],
                '低密度脂蛋白胆固醇': ['',],
                '尿素': ['',],
                '肌酐': ['',],
                '尿酸': ['',],
                '白细胞计数':['',],
                '红细胞计数': ['',],
                '血红蛋白': ['',],
                '红细胞压积': ['',],
                '红细胞平均体积':['',],
                '红细胞平均血红蛋白量': ['',],
                '红细胞平均血红蛋白浓度': ['',],
                '红细胞体积分布宽度': ['',],
                '血小板计数':['',],
                '血小板平均体积': ['',],
                '血小板体积分布宽度': ['',],
                '血小板比积': ['',],
                '中性粒细胞%':['',],
                '淋巴细胞%': ['',],
                '单核细胞%': ['',],
                '嗜酸细胞%': ['',],
                '嗜碱细胞%':['',],
                '血糖': ['',],
                'Outcome':['',]
            },
            responseData: '', // 用于存储后端响应数据  
        };
    },
    methods: {
        async submitData() {
            try {
                // 发送POST请求到后端，传递userData作为数据  
                try { 
                    const url = 'http://127.0.0.1:1116/forcast'; 
                    axios.post(url, this.userData)  
                    .then(response => {  
                    console.log(response.data); // 处理响应数据  
                    this.responseData = response.data; // 存储后端响应数据 
                    })  
                    .catch(error => {  
                    console.error(error); // 处理错误  
                    });  
                    // const response = await axios.post('http://127.0.0.1:1116/forcast', this.userData); 
                    //  this.responseData = response.data; // 存储后端响应数据 
                    // 处理响应  
                } catch (error) {  
                    // 处理错误  
                    console.error(error);  
                }
                 
            } catch (error) {
                console.error(error); // 处理错误或显示错误消息给用户  
            }
        }
    }
};
</script>