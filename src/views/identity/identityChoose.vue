<template>
  <div id="identityChoose">
    <div class="title tc">请问您是?</div>
    <div class="identityFrame flex">
      <div class="identity" @click="toggle(index)" v-for="(identity,index) in identitys"
           :class="{border:active===index}">
        <img :src="identity.url"/>
        <div class="text tc">{{identity.group_title}}</div>
      </div>
    </div>
    <div class="tc">
      <button class="next" @click="next" style="cursor: pointer;">下一步</button>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  import a from '../../../static/images/maifangFA.png'
  import b from '../../../static/images/maifangFA.png'
  import c from '../../../static/images/touzifang.png'
  import d from '../../../static/images/chuangyezhe.png'
  import e from '../../../static/images/qita.png'
  export default {
    data () {
      return {
        active: "none",
        identitys: [{
          url: a,
          group_title: '买方FA',
          group_id: ''
        }, {
          url: b,
          group_title: '卖方FA',
          group_id: ''
        }, {
          url: c,
          group_title: '投资方',
          group_id: ''
        }, {
          url: d,
          group_title: '创业者',
          group_id: ''
        }, {
          url: e,
          group_title: '其他',
          group_id: ''
        }]
      }
    },
    methods: {
      //选择身份
      toggle(i){
        this.active = i;

      },
      //下一步
      next(){
        if (typeof this.active === "number") {
          this.$http.post(this.URL.setUserGroup, {
            user_id: localStorage.user_id,
            group_id: this.identitys[this.active].group_id,
          }).then(res => {
            this.zgClick("选择角色");
            if (res.data.status_code === 2000000) {
//              console.log(res.data)
              localStorage.group_id=this.identitys[this.active].group_id;
              localStorage.authenticate_id = res.data.authenticate_id;
              this.$router.push('/identityDetail');
            } else {
              this.$tool.error(res.data.error_msg)
            }
          })
        } else {
          this.$tool.error('请选择身份')
        }
      },
      // 获取身份列表信息
      getIdentity(){
        this.$http.post(this.URL.getGroupIdentify, {}).then(res => {
            this.identitys.forEach((x, index) => {
              x.group_id = res.data.data[index].group_id
            })
          }
        )
      }
    },
    created(){
      this.getIdentity();

      //核对是否认证过身份
      this.$http.post(this.URL.getUserGroupByStatus, {
        user_id: localStorage.user_id
      }).then(res => {
        if (res.data.status_code === 2000000) {
          if (res.data.status === 1 || res.data.status === 2) {
            this.$router.push({name: 'index'})
          }
        } else {
          this.$tool.error('核对身份接口调用失败')
        }
      })

    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/css/indentity.less";
</style>
