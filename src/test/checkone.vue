<template>
  <div id="check">
    <el-form :model="ruleForm2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="年龄" prop="age" :rules="age">
        <el-input v-model.number="ruleForm2.age"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
        <el-button @click="zgClick('重置')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        console.log(value,1);
        console.log(rule,2);
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 100);
      };
      return {
        ruleForm2: {
          age: ''
        },
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      isClickAble(){
//        zhuge.track('点击测试2', {
//          '商品分类' : '手机',
//          '商品名称' : 'iPhone7 64g',
//          '数量' : 2
//        });   //属性名称不能超过255个字符，属性值不能超过200个字符
      },
      handleClose(){
        alert("测试")
      }
    },
    mounted() {

    },
    watch: {
      '$route' (to, from) {
          console.log(to);
          console.log(from);
        if(to){
            this.zgTimeIn();
          console.log("计时开始")
        }
        if(from){
            this.zgTimeOut("开始计时");
            console.log("计时结束")
        }
      }
    }
  }
</script>

<style lang="less">

</style>
