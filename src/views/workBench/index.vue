<template>
  <div id="workBench">
    <!--左侧导航-->
 <!--   <div class="center_header main-left">
      <el-menu default-active="1" class="el-menu-vertical-demo" >
        <el-menu-item index="1" style="color:#475669;"><i class="el-icon-message"></i>个人工作台</el-menu-item>
      </el-menu>
    </div>-->
    <!-- 右侧主内容区 -->
    <div class="main-right clearfix">
      <transition name="el-fade-in-linear">
        <router-view class="view">

        </router-view>
      </transition>
      <!--广告-->
      <img :src="guanggao" alt="" v-if="show" class="guanggao" @click="open">
      <span class="close"  v-if="willShow"  @click="close()">
      <i class="el-icon-close"></i>
    </span>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import ElCol from "element-ui/packages/col/src/col";
import guanggao from "../../../static/images/guanggao.jpg";
export default {
  data(){
    return {
      guanggao:guanggao,
      willShow:'false',
      show:'false',
    }
  },
  computed:{

  },
  methods:{
    handleOpen(key, keyPath) {
      this.$tool.console(key, keyPath);
    },
    handleClose(key, keyPath) {
      this.$tool.console(key, keyPath);
    },
    open(){
        window.open("http://q.eqxiu.com/s/GPR1lynA");
    },
    close(){
        this.willShow=false;
        this.show=false;
    },

  },
  created(){

  },
  watch:{
   // 路由判断显示广告
    "$route" (to,from){


      if((to.path==='/workBench/myContacts'|| to.path==='/workBench/followup'||to.path==='/workBench/')&&this.willShow){
        this.show=true;
        this.willShow=true;
      }else{
        this.show=false;
        this.willShow=false;
      }
      if((from.path==='/workBench/myContacts'|| from.path==='/workBench/followup'||from.path==='/workBench/')&&this.willShow){
        this.show=true;
        this.willShow=true;
      }else{
        this.show=false;
        this.willShow=false;
      }
  }


  },
}
</script>

<style lang="less">
#workBench{
  width: 1263px;
  margin: 0 auto;
  background-color: #eff2f7;
  margin-top: 24px;
  .el-menu-item{height:50px;line-height: 50px;background-color: #d3dce6;width: 200px;}
  .main-left{width: 224px;position: absolute;font-size: 14px;background-color: #eff2f7;height: 100%;}
/*  .main-right{padding-left: 224px;}*/
  .guanggao{
    position: fixed;
    left:0;
    bottom: 0;
    width:320px;
    height:160px;
    cursor: pointer;
    z-index: 111111;
  }
  .close{
    width: 160px;
    height: 50px;
    position: fixed;
    left: 267px;
    padding-left: 30px;
    bottom: 109px;
    font-size: 13px;
    color: #cccccc;
    z-index: 1111111;
    cursor: pointer;
  }
}
/* 路由切换动效 */
.fade-enter-active, .fade-leave-active {
  transition: all .2s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
