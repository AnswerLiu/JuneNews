// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     *  轮播图 start
     */
    imgUrls:[
      {
        link:'/pages/user/user',
        url:'../../images/1.png',
      },
      {
        link: '/pages/user/user',
        url: '../../images/2.png',
      },
      {
        link: '/pages/user/user',
        url: '../../images/3.png',
      }
    ],
    indicatorDots:true,
    autoplay:true,
    interval:3000,
    duration:1000,
    indicatorColor:'#fff',
    indicatorActiveColor:'#119CEF',
    previousMargin:'15rpx',
    nextMargin:'15rpx',
    circular:true,
    // 轮播图end
    /**
     * 广告条件渲染
     */
    isVip:false,
    // 是否显示频道
    isShow:false,
    // 内容区高度
    height:1000,
    // 所有频道
    channels:[
      { name: '推荐', id: "tuijian", data: [] },
      { name: '热点', id: "redian", data: [] },
      { name: '本地', id: "bendi", data: [] },
      { name: '社会', id: "shehui", data: [] },
      { name: '娱乐', id: "yule", data: [] },
      { name: '军事', id: "junshi", data: [] },
      { name: '科技', id: "keji", data: [] },
      { name: '汽车', id: "qiche", data: [] },
      { name: '两性', id: "liangxing", data: [] },
      { name: '健康', id: "jiankang", data: [] },
    ],
    // 当前激活频道
    activeChannel:'tuijian',
  },
  // 显示频道
  showPindao: function(){
    // 修改变量的值
    this.setData({ isShow:true });
  },
  // 关闭频道
  hidePindao:function(){
    this.setData({isShow:false});
  },
  // 点击切换频道
  clickChangeChannel:function(e){
    // 先获取当前点击的频道id
    var id = e.currentTarget.dataset.id;
    // 设置当前正在浏览的频道id
    this.setData({activeChannel:id});
    // 获取当前频道下标
    var index = e.currentTarget.dataset.index;
    // 检测当前的频道是否有数据
    if(this.data.channels[index].data.length == 0){
      // 如果没有，应该请求数据
      var that = this;
      wx.request({
        url: 'http://c.m.163.com/nc/article/headline/data/10-20.html?from=toutiao&passport=&devId=OPdeGFsVSojY0ILFe6009pLR%2FMsg7TLJv5TjaQQ6Hpjxd%2BaWU4dx4OOCg2vE3noj&size=20&version=5.5.3&spever=false&net=wifi&lat=&lon=&ts=1456985878&sign=oDwq9mBweKUtUuiS%2FPvB015PyTDKHSxuyuVq2076XQB48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore',
        data: {
          x: '',
          y: ''
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          // console.log(res.data);
          var key = 'channels[' + index + '].data';
          that.setData({[key] : res.data.data });
        }
      })
    }
  },
  // 滑动切换频道
  swipeChangeChannel:function(e){
    var id = e.detail.currentItemId;
    // 设置正在浏览的频道id
    this.setData({ activeChannel:id });
    // 获取当前频道下标
    var itemId = e.detail.currentItemId;
    var index = 0;
    // 遍历所有频道，获取当前的频道的索引
    for( var i=0;i<this.data.channels.length;i++){
      if(this.data.channels[i].id == itemId){
        index = i;
      }
    }
    // 检测当前的频道是否有数据
    if (this.data.channels[index].data.length == 0) {
      // 如果没有，应该请求数据
      var that = this;
      wx.request({
        url: 'http://c.m.163.com/nc/article/headline/data/10-20.html?from=toutiao&passport=&devId=OPdeGFsVSojY0ILFe6009pLR%2FMsg7TLJv5TjaQQ6Hpjxd%2BaWU4dx4OOCg2vE3noj&size=20&version=5.5.3&spever=false&net=wifi&lat=&lon=&ts=1456985878&sign=oDwq9mBweKUtUuiS%2FPvB015PyTDKHSxuyuVq2076XQB48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore',
        data: {
          x: '',
          y: ''
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data);
          var key = 'channels[' + index + '].data';
          that.setData({ [key]: res.data.data });
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 计算页面除头部和轮播的尺寸，设置内容高度
    var height = wx.getSystemInfoSync().windowHeight - 45;
    this.setData({height:height});
    // 接收this指向
    var that = this;
    // 请求数据
    wx.request({
      url: 'http://c.m.163.com/nc/article/headline/data/10-20.html?from=toutiao&passport=&devId=OPdeGFsVSojY0ILFe6009pLR%2FMsg7TLJv5TjaQQ6Hpjxd%2BaWU4dx4OOCg2vE3noj&size=20&version=5.5.3&spever=false&net=wifi&lat=&lon=&ts=1456985878&sign=oDwq9mBweKUtUuiS%2FPvB015PyTDKHSxuyuVq2076XQB48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore',
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        that.setData({'channels[0].data':res.data.data});
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})