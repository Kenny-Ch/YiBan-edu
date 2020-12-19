# 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)



## 数据库设计

```json

//networkSchool
{
  网校名、网校编号、成立时间、志愿者人数、学生人数
  "_id": ""
  "schoolID": "" 网校编号
  "name": "" 网校名
  "openid": "" 发起人的openid
  "date": "" 成立时间
  "":""
  "volunteerNum": "" 志愿者人数
  "studentNum": "" 学生人数
  "waitCheckTeacherNum": "" 待审核老师人数
}

//sponsor(发起人绑定)
{
    "openid":"",
    "name":"",
    "isSponsor":true,
    "schoolID":"",                  //网校ID
    "perInfo": {
        "gender": "",               //性别
        "school": "",               //所在学校
        "grade": "",                //年级
        "area": [],                 //地区
        "major": "",                //专业
        "wechat": "",               //微信号
        "tel": "",                  //电话号码
    }
}
//ambassador(形象大使绑定)
{
    "openid":"",
    "name":"",
    "perInfo": {
        "gender": "",               //性别
        "school": "",               //所在学校
        "grade": "",                //年级
        "area": [],                 //地区
        "major": "",                //专业
        "wechat": "",               //微信号
        "tel": "",                  //电话号码
    },
    "inviteCode":"ybdsxxxxx",       //邀请码，后面是五位数
    "inviteCodeNum":x               //邀请码后面数字，类型是number，用于取当前最大值而自动生成下一个邀请码
}

//person(存储个人信息及匹配信息)
{
    "openid": "",                   //openid
    "yibanID": "" 专属编号
    "job": "",                      //职业 0是学生 1是老师 2是其他人
    "name": "",                     //姓名
    "registerDate": "",             //注册日期
    "matchList": [],                //匹配的名单列表（openid）
    "matchWaitList":[],             //申请的/待匹配的名单（openid）
    "matchReject": boolean          //true为被拒绝，false为没被拒绝
    "isMatchFull": false,           //匹配是否已经满了

    "schoolID": ""  网校编号
    "isManager": boolean 管理员
    "isAmbassador": boolean  爱心大使
    "isSupervisor": boolean  监事会成员
    "isSponsor": boolean 是否为发起人

    //个人信息模块
    "perInfo": {
        //老师
        "gender": "",               //性别
        "school": "",               //所在学校
        "grade": "",                //年级
        "area": [],                 //地区
        "major": "",                //专业
        "speciality": [],           //擅长科目
        "introduction": "",         //个人简介
        "wechat": "",               //微信号
        "tel": "",                  //电话号码
        "stuNum": 0,                //最多可辅导的学生数量
        "schoolID": "",             //网校id
        "orderNum": 1,              //网校志愿者成员序号
        
        //或者
        //学生
        "gender": "",               //性别
        "school": "",               //所在学校
        "grade": "",                //年级
        "area": [],                 //地区
        "qq": "",                   //QQ
        "tel": "",                  //电话号码
        "email": "",                //邮箱（选填）

    },

    //只有在小程序端注册的老师才有
    "otherInfo": {
      "collegeExamScore":{    //高考成绩
        "Chinese": number
        "Math": number
        "English": number
        "Integration" :number
      }
      comprehend: string      //对以伴服务的了解
      experience: string      //你的学生干部经历
      honor: string           //你的个人荣誉
      interest: string        //你的兴趣爱好
      arrange: boolean        //新学期课程安排是否紧凑
      questionA: string       //问题1
      questionB: string       //问题2
    },

    isCheck: number           //0代表未审核、1代表审核通过、2代表审核未通过

    //该字段只针对老师
    isWeChatReg: boolean       //true代表老师是微信端注册，false代表是绑定的老师

    //绑定码
    bindingCode: string

    //学生提供匹配所需要的信息
    "matchInfo": {
        "weakSubject":{             //需要辅导的弱势科目
            "": "",                 //key：科目名字  value：分数
        },
        "willCheckIn": true,        //是否愿意每日打卡
        "willMeeting": true,        //是否接受不定期班会
        "willGetAlong": true,       //是否愿意与志愿者老师好好相处并学到知识
        "habitAndPlan": "",         //学习习惯与学习计划
        "expectation": "",          //对老师的期望
    }
    inviteCode: string,             //受邀请学生或者爱心大使才有
    inviteCodeNum: number           //仅爱心大使有，用于自动生成inviteCode
},
//学习打卡不清楚


//question（问题区）//是否需要记录一个人的openid
{
    //(个人中心-意见反馈)
    "flag": "submitQue",
    "question": "",                 //意见
    "tel": "",                      //联系方式
    "hasRead": false,               //是否已读


    //或者
    //(个人中心-常见问题)
    "flag": "usingQue",
    "officialAnswer": "",           //官方答案
    "question": [],                 //问题
    "answer": [],                   //答案


    //或者
    //（心灵解压馆-压力疏导-常见问题解答）
    "flag": "pressQue",
    "question": "",                 //问题
    "officialAnswer": "",           //官方答案
    "answer": [],                   //答案
    "advisor": [],                  //回答者
    "tag": "",                      //分类标签  normal、study、method、life、family、society
},


//community(心灵解压馆-压力疏导-匿名社区)
{
    "name": "",                     //社区名
    "introduction": "",             //社区介绍
    "qq": ""                        //qq群二维码
}


//comments(留言区)
{
    "openid": "",
    "name": "",                     //用户昵称
    "comment": "",                  //用户留言
    "time": "Date()",               //留言时间
    "isAnonymous": true,            //是否匿名
}


//knowledge（知识储备站）
{
    //trick(知识储备站)
    "flag": "trick",
    "title": "",                    //标题
    "subtitle": "",                 //副标题
    "coverImgUrl": "",              //封面
    "time": "Date()",               //时间
    "author": "",                   //作者
    "isArticle": true,              //是文章嘛
    "contextUrl": "",               //内容链接（可能是文章，可能是视频）
    "introdution": "",              //视频介绍
    "viwerNum": "",                 //浏览量


    //(学习资料分享)
    "flag": "data",
    "title": "",                    //标题
    "subtitle": "",                 //副标题
    "coverImgUrl": "",              //封面
    "time": "Date()",               //时间
    "author": "",                   //作者
    "contextUrl": "",               //内容链接
    "viwerNum": "",                 //浏览量


    //(高考心得分享)
    "flag": "thoughts",
    "title": "",                    //标题
    "subtitle": "",                 //副标题
    "coverImgUrl": "",              //封面
    "time": "Date()",               //时间
    "author": "",                   //作者
    "isArticle": true,              //是文章嘛
    "contextUrl": "",               //内容链接（可能是文章，可能是视频）
    "introdution": "",              //视频介绍
    "viwerNum": "",                 //浏览量
}


//collegeInfo（升学梦工厂）
{
    //(选科资讯)
    "flag": "pickData",
    "title": "",                    //标题
    "subtitle": "",                 //副标题
    "coverImgUrl": "",              //封面
    "time": "new Date('2020-05-26 22:06:55')",               //时间
    "author": "",                   //作者
    "isArticle": true,              //是文章嘛
    "contextUrl": "",               //内容链接（可能是文章，可能是视频）
    "introdution": "",              //视频简介
    "viwerNum": "",                 //浏览量


    //或者
    //(高校资讯)
    "flag": "schoolData",
    "name": "",                     //院校名
    "tag": [],                      //标签
    "schoolLogo":"",                  //学校logo
    "coverImgUrl": "",              //封面
    "rank": {                       //排名
        "alumni": 0,                    //校友会排名
        "QS": 0,                        //QS排名
    }, 
    "site": "",                     //地点
    "introduction": "",              //院校介绍
    "speciality": "",               //特色专业
    "vid":"",                        //以伴大学说
    "contact": [{                   //师兄师姐联系方式
      "name": ""
      "wechat": ""
    }]


    //或者
    //(专业了解)
    "flag": "major",
    "type": "",                     //类别
    "name": "",                     //专业名
    "coverImgUrl": "",              //封面
    "average_salary":"",            //应届平均薪酬
    "rate_of_employment": "",       //就业率
    "industry": "",                 //最多就业方向
    "city":"",                      //最多就业城市
    "introduce":"",                //专业介绍
    "contact": [{                   //师兄师姐联系方式
      "name": ""
      "wechat": ""
    }],
}


//inClass(以伴课堂)
{
    //(精品课堂)
    "flag": "course",
    "title": "",                    //标题
    "subtitle": "",                 //类别
    "authorImg":"",                 //作者头像
    "coverImgUrl": "",              //封面
    "time": "Date()",               //时间
    "videoTime": "",                //视频时长
    "author": "",                   //作者
    "contextUrl": "",               //视频vid
    "introdution": "",              //视频介绍
    "viwerNum": "",                 //浏览量


    //或者
    //(学霸讲座)
    "flag": "speech",
    "title": "",                    //标题
    "subtitle": "",                 //副标题
    "coverImgUrl": "",              //封面
    "time": "Date()",               //时间
    "videoTime": "",                //视频时长
    "author": "",                   //作者
    "contextUrl": "",               //内容链接
    "introdution": "",              //视频介绍
    "viwerNum": "",                 //浏览量
}

//interaction(交互：评论、点赞、收藏)
{
    //评论类的
    "flag": "comment",
    "userOpenid": "",
    "imgUrl": "",
    "nickname": "",
    "contextId": "",
    "comment": "",
    "time": Date,
    "type": ""           //tree为树洞，artical为文章，video为视频
    "isCheck": number    //0代表未审核、1代表审核通过、2代表审核未通过
    

    //或者
    //点赞类
    "flag": "like",
    "userOpenid": "",
    "contextId": "",

    //或者
    //收藏类
    "flag": "store",
    "userOpenid": "",
    "contextId": "",
    "contextName": "",
    "type": "",   //文章为article、视频为video
    "database": "" //数据库名称
}
```

