<template>
  <!--项目推送人脉入口-->
  <div id="projectPush">
    <el-dialog :visible="projectPushShow" :before-close="closeProjectPush">

     <span slot="title" class="dialog-title clearfix">
        <div class="lines fl"></div>
        <div class="title fl">项目推送</div>
        <div class="lost fl">今日剩余推送<i>{{pushCount}}</i>次</div>
        <el-tooltip content="Top center" placement="top">
          <div slot="content">每天可以推送5次，1个项目推送给1个投资人计1次，1个项目推送给多个投资人计多次</div>
          <div class="img fl" style="cursor: pointer"><img src="../../../assets/images/why.png"></div>
        </el-tooltip>
      </span>

       <el-form label-position="top" :model="email2" label-width="80px" style="position: relative" ref="email2">
        <el-form-item label="推送人脉"
                      prop="nameEmail"
                      :rules="emailRule">
          <el-input v-model="email2.nameEmail" placeholder="该用户未填写邮箱，请完善对方邮箱"></el-input>
        </el-form-item>
      </el-form>
      <div class="message">
        <span class="message_innder fl" v-if="userMessage.user_real_name!=''">{{userMessage.user_real_name}}</span>
        <span class="message_innder fl" v-else>&#45;&#45;</span>
        <span class="lines fl"></span>
        <span class="message_innder fl" v-if="userMessage.user_company_career!=''">{{userMessage.user_company_career}}</span>
        <span class="message_innder fl" v-else>&#45;&#45;</span>
        <span class="lines fl"></span>
        <span class="message_innder fl" v-if="userMessage.user_company_name!=''">{{userMessage.user_company_name}}</span>
        <span class="message_innder fl" v-else>&#45;&#45;</span>
      </div>

            <el-form label-position="top" label-width="80px">
              <el-form-item label="推送项目">
                <el-select v-model="projectList" filterable
                           remote placeholder="请输入项目关键词"
                           multiple @remove-tag="removeTag"
                           :remote-method="remoteMethod"  popper-class="popper">
                  <el-option v-for="item in projectAll" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
      <div class="select">
              <el-tabs v-model="activeName">
                <el-tab-pane label="我的项目" name="first"></el-tab-pane>
              </el-tabs>
            </div>
            <div class="top-lists" style="background: #f3f4f8;cursor: pointer;margin-bottom: 29px;" >
              <el-table
                v-loading="loading"
                element-loading-text="拼命加载中"
                ref="multipleTable"
                :data="tableData3"
                tooltip-effect="dark"
                style="width: 100%"
                max-height="430"
                @row-click="handleSelect"
                :row-class-name="tableRowClassName">
                <el-table-column
                  width="64">
                  <template scope="scope">
                    <el-radio class="radio" v-model="projectRadio" :label="scope.row.project_id"></el-radio>
                  </template>
                </el-table-column>
                <el-table-column
                  label="项目介绍"
                  min-width="570">
                  <template scope="scope">
                    <el-tooltip placement="top" :disabled="scope.row.pro_intro.length > 30 ? false:true">
                      <div slot="content">
                        <div class="tips-txt">{{scope.row.pro_intro}}</div>
                      </div>
                      <div>
                        {{scope.row.pro_intro}}
                      </div>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="match_weight"
                  label="匹配度"
                  min-width="80">
                  <template scope="scope">
                    <div class="origin">
                      {{scope.row.match_weight}}%
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                class="pagination fr"
                small
                v-if="totalMatchProject!=0"
                @current-change="filterChangeMatchProject"
                :current-page.sync="currentPageMatchProject"
                layout="prev, pager, next"
                :page-size="10"
                :total="totalMatchProject">
              </el-pagination>
            </div>

            <el-form label-position="top" label-width="80px" ref="email" :model="email">
              <el-form-item label="标题" prop="title"
              :rules="[{max: 100, message: '长度不能大于100个字符', trigger: 'blur' }]">
                <el-input v-model="email.title" placeholder="浙江安琪创投-投资VP-杜兴国推荐项目|微天使乐投平台—互联网化FA平台—AI驱动的智能云投行"></el-input>
              </el-form-item>
              <el-form-item label="正文"
                            prop="body"
                            :rules="[{max: 500, message: '长度不能大于500个字符', trigger: 'blur' }]">
                <el-input type="textarea"
                          v-model="email.body"
                          placeholder="请输入简要项目介绍，作为邮件正文，便于投资人快速了解项目"
                          :autosize="{ minRows: 4, maxRows: 7}"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="preview">预览</el-button>
              <!--<el-button type="primary" @click="push(2)">继续推送</el-button>-->
              <el-button type="primary" @click="push(1)">推送</el-button>
            </span>
    </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">

export default {
  props: ["projectPushShow", "userMessage", "userEmail"],
  data () {
    var checkEmail = (rule, value, callback) => {
      if (this.$tool.getNull(value)) {
        return callback(new Error('邮箱不能为空'));
      }
      setTimeout(() => {
        if (!this.$tool.checkEmail(value)) {
          callback(new Error('请输入正确的邮箱'));
        } else {
          callback();
        }
      }, 300);


    };//邮箱判断
    var checkTitle = (rule, value, callback) => {
      if (this.$tool.getNull(value)) {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };//不为空判断

    return {
      emailRule: {validator: checkEmail, trigger: 'blur'},
      titleRule: {validator: checkTitle, trigger: 'blur'},
      close: false,//默认关闭
      loading: false,//加载动画
      pushTitle1:'',
      activeName: 'first',
//      dialogPush:false,//控制显不显示

      email: {
        title: this.pushTitle1,//邮件标题
        body: '',//邮件正文
      },
      email2: {
        nameEmail: '',//人脉的邮箱(一个)
      },
      user: {
        user_real_name: '',
        user_company_career: '',
        user_company_name: '',
        card_id: ""
      },//推送的用户消息
      project:{
        pro_id:"",//项目id
        pro_intro:"",//项目介绍
      },//推送的项目消息
      projectList: [],//推送的项目列表
      projectAll: [],//项目列表下拉框基本是不用的

      tableData3: [
        /*          {
        pro_intro: '项目的一句话介绍，字数可能会有点长，但不管怎样，就显示一行，如果显示不下那但不管怎样，就显示一行，如果显示不下那但不管怎样，就显示一行，如果显示不下那',
        match_weight : '100',
        project_id:1
      }*/
      ],
      projectRadio:'',//绑定当前项目数据,单选框的数据(project_id)
      firstInData:{
        user:{},
        email2:{},
        email:{}
      },//保存数据
      pushCount:0,//剩余推送次数
      totalMatchProject: 0,//项目加载总页数
      currentPageMatchProject:1,//当前第几页
      searchProject:{},//搜索项目的数据
      searchProjectInput:'',//搜素项目用的
    }
  },
  methods: {
    title(){
      this.user_company_name=localStorage.user_company_name;
      this.user_brand=localStorage.user_brand;
      this.user_company_career=localStorage.user_company_career+'-' || "";
      this.user_real_name=localStorage.user_real_name;
      if(!this.user_brand){
        this.pushbrand=this.user_company_name+'-' || "";
      }else{
        this.pushbrand=this.user_brand+'-' || "";
      }

      this.pushTitle1=this.pushbrand+this.user_company_career+this.user_real_name+'推荐项目|微天使乐投平台—互联网化FA平台—AI驱动的智能云投行';
    },
    preview(){
      if(this.pushCount!=0) {
        if (this.projectRadio == '' || this.projectRadio==undefined) this.$tool.error("请选择要推送的项目")
        else if (!this.$tool.checkEmail(this.email2.nameEmail)) this.$tool.error("请输入正确的邮箱")
        else if(this.email.title.length>100) this.$tool.error("标题不能大于100个字")
        else if(this.email.body.length>500) this.$tool.error("正文不能大于500个字")
        else {
          this.zgClick("预览");
          this.$store.state.pushProject.project_id = this.projectRadio;
          this.$store.state.pushProject.user = this.user;
          this.$store.state.pushProject.pushMessage.user_id = localStorage.user_id;
          this.$store.state.pushProject.pushMessage.card_id = this.user.card_id;
//          this.$store.state.pushProject.pushMessage.investor_id=this.user.investor_id;
          this.$store.state.pushProject.pushMessage.email = this.email2.nameEmail;
          this.$store.state.pushProject.pushMessage.title = this.email.title;
          this.$store.state.pushProject.pushMessage.body = this.email.body;
          this.$store.state.pushProject.pushMessage.project_ids = new Array;
          this.$store.state.pushProject.pushMessage.project_ids.push(this.projectRadio);
          this.$store.state.pushProject.pushMessage.type=this.user.type;
/*          console.log(this.$store.state.pushProject.pushMessage)
          console.log(this.user)*/
          this.$store.state.pushProject.email.title = this.email.title;
          this.$store.state.pushProject.email.body = this.email.body;
          this.$emit('openPreview', true);//
        }
      }else{
        this.$tool.warning("您今日的推送次数已用完,请明天再试")
      }
    },//推送预览

    push(type){
      if(this.pushCount!=0){
        this.firstInData.email=this.email;
        let check1 = this.submitForm('email');
        let check2 = this.submitForm('email2');
        if(this.projectRadio=='' || this.projectRadio==undefined) this.$tool.error("请选择要推送的项目")
        else if(!this.$tool.checkEmail(this.email2.nameEmail)) this.$tool.error("请输入正确的邮箱")
        else if(this.email.title.length>100) this.$tool.error("标题不能大于100个字")
        else if(this.email.body.length>500) this.$tool.error("正文不能大于500个字")
        else if(type ==1){ //关闭
          if(check1 && check2) {
            this.zgClick("推送");
            let pushData=new Object;
            pushData.user_id= localStorage.user_id;
            pushData.card_id=this.user.card_id;
            pushData.email=this.email2.nameEmail;
            pushData.title=this.email.title;
            pushData.body=this.email.body;
            pushData.type=this.userMessage.type || '';
            pushData.project_ids=new Array;
            pushData.project_ids.push(this.projectRadio);
//            alert("过")
            this.loading=true;
            this.$http.post(this.URL.pushUser, pushData)
              .then(res => {
                let data=res.data.data;
//              this.$tool.console(res);
                this.$tool.success("推送成功");
                this.getpushCount();
                this.loading=false;
                this.open2('推送成功', '推送成功', '继续推送', '返回');
              })
              .catch(err => {
                this.$tool.console(err);
                this.$tool.success("推送失败");
              })
          }
        }

      }else{
          this.$tool.warning("您今日的推送次数已用完")
      }
    },//推送按钮

    remoteMethod(query) {
      return new Promise((resolve, reject)=>{
        if(query=="") this.projectRadio="";
        this.loading=true;
        this.currentPageMatchProject=1;
        this.searchProject.user_id=localStorage.user_id;
        this.searchProject.card_id=this.user.card_id;
        this.searchProject.pro_intro=query;
        this.searchProject.page=1;
        this.searchProject.type=this.userMessage.type || '';
        this.$http.post(this.URL.matchProject,this.searchProject)
          .then(res=>{
            let data = res.data.data;
//          this.$tool.console(data);
            this.tableData3=data.projects;
            this.projectAll=this.setProjectAll(data.projects);
            this.totalMatchProject=data.count;
            this.loading=false;
            resolve(1);
          })
          .catch(err =>{
            this.$tool.console(err,2);
            this.loading=false;
          })

      })
    },//项目搜索
    filterChangeMatchProject(page){

      this.loading=true;
      this.searchProject.page=page;
      this.searchProject.pro_intro=this.searchProjectInput;
      this.$http.post(this.URL.matchProject,this.searchProject)
        .then(res=>{
          let data = res.data.data;
//          this.$tool.console(data);
          this.tableData3=data.projects;
          this.projectAll=this.setProjectAll(data.projects);
          this.loading=false;
          this.totalMatchProject=data.count;
        })
        .catch(err =>{
          this.$tool.console(err,2);
          this.loading=false;
        })
    },//页码控制
    removeTag(e){
      this.projectRadio='';
      this.remoteMethod("");
    },//删除标签
    setProjectAll(data){
      let arr = [];
      data.forEach((x)=>{
        let obj = {};
        obj.label = x.pro_intro;
        obj.value = x.project_id;
        arr.push(obj);
      });
      return arr
    },//设置项目下拉框,虽然没什么卵用
    tableRowClassName(row, index) {
      if (index%2 === 1) {
        return 'info-row';
      }
      return '';
    },//控制列表颜色
    getIntroduce(id){
      if(id!=""){
        this.projectList=[];
        this.projectList.push(id);
        let arr = this.tableData3;
        for(let i=0; i<arr.length; i++){
          if(arr[i].project_id==id){
            this.$store.state.pushProject.pro_intro=arr[i].pro_intro;

          }
        }
      }
    },//获取项目详情
    submitForm(formName) {
      let check = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          return
        } else {
          check = false;
        }
      });
      return check;
    },
    closeProjectPush(){
      this.$emit('closeProjectPush',false);
    },//关闭项目推送
    getpushCount(){
      this.$http.post(this.URL.pushCount,{
        user_id: localStorage.user_id})
        .then(res=>{
          let data = res.data.data;
          this.pushCount=data.push_count.remain_times || 0;
//          this.$tool.console(data.push_count);
        })
        .catch(err =>{
          this.$tool.console(err,2);
          this.loading=false;
        })
    },//获取剩余推送次数
    handleSelect(row, event, column) {
      this.projectRadio=row.project_id;
      this.remoteMethod(row.pro_intro);
    },//点击单选
    open2(title, main, confirm, cancel) {
      this.$confirm(main, title, {
        confirmButtonText: confirm,
        cancelButtonText: cancel,
        type: 'success'
      }).then(() => {
        this.remoteMethod("");
        this.getpushCount();
        this.clearData();
      }).catch(() => {
        this.$emit("closeProjectPush",false);
        this.clearData();
      });
    },
    clearData(){
      this.user={};
      this.email2.nameEmai="";
      this.projectList=[];
      this.tableData3 =[];
      this.email=this.firstInData.email;
      this.user=this.firstInData.user;
      this.email2=this.firstInData.email2;
    }
  },
  watch : {
    projectRadio : function(e){
      this.getIntroduce(e);
    },
    projectPushShow : function (e) {
        if(e){
          this.getCheckUserInfo(localStorage.user_id);

          setTimeout(()=>{this.title();this.email.title = this.pushTitle1;},1000);
          this.user={};
          this.email2.nameEmai="";
          this.projectList=[];
          this.tableData3 =[];
          this.projectRadio="";
          this.user =this.userMessage || this.$store.state.pushProject.user;
          this.project = this.$store.state.pushProject.projectMessgae || {};
          this.email2.nameEmail =this.userEmail;
          this.firstInData.user =this.userMessage;
          this.firstInData.email2.nameEmail = this.userEmail;
          this.firstInData.project = this.$store.state.pushProject.projectMessgae || {};

          /*    this.email.body=this.$store.state.pushProject.email.body || '';
           this.projectRadio=this.$store.state.pushProject.project_id || '';*/
          if(this.firstInData.project.pro_id!=""){
            this.remoteMethod(this.firstInData.project.pro_intro)
              .then((data)=>{
                this.projectRadio=this.firstInData.project.pro_id;
              })
          }else{
            this.remoteMethod("");
          }
        }
        this.getpushCount();
    },
  },
  created(){

  }
}
</script>

<style lang="less">
  @import '../../../assets/css/projectPush';
  .popper{
    display: none;
  }
</style>
