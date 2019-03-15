// pages/detail/detail.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    source:'',
    time:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取url的参数
    var id = options.id;
    // 测试id
    // var id = "DESBV25T0529B6P0";
    var that = this;
    // 获取当前id对应的文章内容
    wx.request({
      url: 'http://c.m.163.com/nc/article/'+id+'/full.html',
      success:function(res){
        var data = res.data[id];
        that.setData({
          title: data.title,
          source: data.source,
          time: data.ptime,
        });
        // 替换内容区中的图片注释
        var body = data.body;
        for(var i=0;i<data.img.length;i++){
          body = body.replace(data.img[i].ref,'<img src="'+data.img[i].src+'" />');
        }
        that.setData({ body: body });
        // 将html转化成小程序可以识别的内容
        WxParse.wxParse('body', 'html', body, that, 5);
      },
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