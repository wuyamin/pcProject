/**
 * Created by WengHaoping on 2017/6/5.
 */

/*const URL ='https://dev.weitianshi.cn/'*/

/*项目详情URL*/

export default
{
  /*总地址,下载用的*/
  weitianshi:"https://pc.dev.weitianshi.cn/",//下载用
  weitianshiLine:"https://pc.dev.weitianshi.cn/",//上传
  // weitianshi:"http://192.168.9.74",//下载用
  // weitianshiLine:"http://192.168.9.74",//上传接口汇总
  //weitianshi:"https://pc.debug.weitianshi.cn/",//上线接口下载用
  //weitianshiLine:"https://pc.debug.weitianshi.cn/",//上线接口上传
/*   weitianshi:"https://wts.weitianshi.cn/",//上线接口下载用
  weitianshiLine:"https://wts.weitianshi.cn/",//上线接口上传*/

  /*上传用*/

  /*登陆接口*/
  returnQrCredential:"api/auth/returnQrCredential",   //(获取生成二维码的uuid接口)，返回值
  ajaxPolling:"api/auth/ajaxPolling",   //获取登陆信息
  getWxosProjectData:"api/v/project/getWxosProjectData",   //创建页面获取微信信息


  /*项目列表页*/
  getNodeCount:"api/v/project/getNodeCount", //项目节点数量
  deleteUpload:"api/v/project/deleteUpload",  //删除批量上传的文件
  saveUpload:"api/v/project/saveUpload",  //修改批量上传文件的绑定
  titleSift:"api/v/project/titleSift", //项目列表表头数据
  getProjectList:"api/v/project/getProjectList",  //获取項目列表
  deleteProject:'api/v/project/deleteProject',//删除项目

  /*项目详情页*/
  getProjectDetail:"api/project/getProjectDetail",  //获取項目詳情
  deleteCoreTeam:"api/v/project/deleteCoreTeam",  //删除核心成员
  deleteFinance:"api/v/project/deleteFinance",  //删除历史融资
  deleteDevelop:"api/v/project/deleteDevelop",  //删除里程碑
  editProject:"api/v/project/editProject",  //项目编辑、新建
  getOneCompany:"api/dataTeam/getOneCompany",  //获取公司信息
  setProjectSchedule:'/api/project/setProjectSchedule',//设置项目进度

  /*项目编辑页*/
  getWxProjectCategory:"api/category/getProjectCategory",  //编辑项目各种标签接口
  getArea:"api/category/getArea",  //二级城市接口
  createStatusPro:"api/category/createStatusPro",  //添加自定义运营状态
  createCustomTag:"api/category/createCustomTag",  //添加自定义标签/个人,团队,人脉
  selectCompany:"api/dataTeam/selectCompany",  //公司名称提示
  getFileType:"api/category/getFileType",  //文件分组设置选项
  getAllFileType:"api/category/getAllFileType",  //文件分组设置选项(全)
  createFileType:"api/category/createFileType",  //添加文件分组设置

  /*一键尽调*/
  getCrawlerCompany:"api/dataTeam/getCrawlerCompany",  //一键尽调-公司
  getCrawlerLeader:"api/dataTeam/getCrawlerLeader",  //一键尽调-公司高管
  getCrawlerBrand:"api/dataTeam/getCrawlerBrand",  //一键尽调-商标
  getCrawlerTeam:"api/dataTeam/getCrawlerTeam",  //一键尽调-核心成员
  getCrawlerHistoryFinance:"api/dataTeam/getCrawlerHistoryFinance",

  //一键尽调-历史融资
  getCrawlerMilestone:"api/dataTeam/getCrawlerMilestone",  //一键尽调-里程碑
  getCrawlerNews:"api/dataTeam/getCrawlerNews",  //一键尽调-新闻
  getCrawlerCompeting:"api/dataTeam/getCrawlerCompeting",  //一键尽调-竞品
  getCrawlerProject:"api/dataTeam/getCrawlerProject",  //一键尽调-项目

  //身份认证相关
  getGroupIdentify:'api/category/getGroupIdentify',//身份类型列表
  setUserGroup:'api/user/setUserGroup',//设置身份类型
  saveUserIdentity:'api/user/saveUserAuthentication',//保存身份认证信息
  createUserProjectCase:'api/v/project/createUserProjectCase',//保存投资成功案例
  getUserGroupByStatus:'/api/user/getUserGroupByStatus',//核对用户认证状态（用于判断用户是否能进入认证相关页面）

  //登录方面相关
  authCaptcha:'api/auth/authCaptcha',//用户注册,登录获取验证码接口
  loginForCaptcha:'api/auth/loginForCaptcha',//用户注册/登录接口(验证码登录)
  loginForPassword:'api/auth/loginForPassword',//用户登录接口(账号密码)
  resetPasswordCaptcha:'api/auth/resetPasswordCaptcha',//重置密码获取验证码接口
  resetPassword:'api/auth/resetPassword',//重置密码接口
  bindTelephone:'/api/user/bindUser',//绑定手机号码

  /*我的人脉*/
  userTitleSift:"api/v/user/userTitleSift",//人脉列表表头
  getConnectUser:"api/v/user/getConnectUser",//获取人脉列表
  setConnectTag:"api/v/user/setConnectTag",//给人脉设置标签
  deleteConnectUser:"api/v/user/deleteConnectUser",//.删除人脉
  createUserCard:"api/v/user/createUserCard",//添加人脉
  deleteConnectCard:"api/v/user/deleteConnectCard",//删除人脉名片(图片)
  getOneUserInfo:"api/v/user/getOneUserInfo",//人脉详情

  /*跟进记录*/
  get_follow_records:'/api/project/get_follow_records',//获取跟进记录总列表
  get_follow_record:'/api/project/get_follow_record',//获取跟进记录单独
  getToInvestor:'/api/project/getToInvestor',//获取跟进记录表头
  delete_follow_record:'/api/project/delete_follow_record',//删除跟进记录
  match_my_relation:'/api/user/match_my_relation',//模糊匹配我的人脉,添加跟进里是用
  add_follow_record:'/api/project/add_follow_record',//添加跟进记录
  getProjectFollowList:'api/v/project/getProjectFollowList',//项目跟进记录列表

  //文件管理
  getProjectFiles:'api/v/project/getProjectFiles',//文件管理列表数据
  deleteAtUpload:"api/v/project/deleteAtUpload",  //bp文件软删除
  deleteAtFile:"api/v/project/deleteAtFile",  //项目文件软删除
  download:"api/v/project/download",  //文件下载
  uploadFile:"api/v/project/uploadFile",  //文件上传
  setFileType:"api/v/project/setFileType",  //文件分组设置
  deleteFileType:"api/v/project/deleteFileType", //删除文件分组
  renameFileType:"api/category/renameFileType",//重命名文件分组



  /*意向项目(人脉详情右边)*/
  getEnjoyProjectsGroup:'/api/v/project/getEnjoyProjectsGroup',//意向项目归总(图表)
  getEnjoyProjects:'/api/v/project/getEnjoyProjects',//意向项目列表,
  setEnjoyProjectSchedule:'api/v/project/setEnjoyProjectSchedule',//设置意向项目的跟进进度

  /*推荐项目(人脉详情右边)*/
  getInvestorsMatchProjects:'api/v/investors/getInvestorsMatchProjects',//推荐项目
  exceptMatchAction:'api/v/project/exceptMatchAction',//移除匹配
  /*意向投资人(项目详情右边)*/
  getEnjoyedInvestors:'api/project/getEnjoyedInvestors',//意向投资人列表
  getEnjoyedInvestorsGroup:'api/project/getEnjoyedInvestorsGroup',//意向投资人归总(图表)

  /*买家图谱*(项目详情右边)*/
  getProjectMatchInvestors:'api/v/project/getProjectMatchInvestors',//买家图谱列表

  /*项目推送*/
  matchProject:'api/v/project/matchProject',//我的人脉-推送（模糊匹配我的项目）
  pushUser:'/api/v/project/pushUser',//我的人脉-推送（发送邮件）
  pushProject:'/api/v/project/pushProject',//我的项目-推送(发送邮件)
  pushCount:'/api/v/project/pushCount',//推送剩余次数
  getConnectUserSortByMatch:'api/v/project/getConnectUserSortByMatch',//推送项目时获取我的人脉
  getAllConnectUserSortByMatch:'api/v/project/getAllConnectUserSortByMatch',//推送项目时获取全网人脉
}
