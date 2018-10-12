import ajaxUtil from "./ajaxUtil"
/**
 * 微信工具类
 *
 */
var wxUtil = {
    /**
     * 微信分享方法
     * @param obj
     */
    share(obj){
        wx.ready(function(){
            wx.onMenuShareTimeline(obj);
            wx.onMenuShareAppMessage(obj);
            wx.onMenuShareQQ(obj);
            wx.onMenuShareWeibo(obj);
            wx.onMenuShareQZone(obj);
        });
    },
    /**
     * 微信授权
     * @param param 参数
     * @param callback 回调
     */
    config(param,callback){
        ajaxUtil.loadJsonp("http://wxs.0luzhe.com/Js/Api/config", param, callback, false);
    },
    /**
     * 分享图片地址处理
     * @param path
     */
    img(path){
        return path ? path.indexOf("http") == 0 ? path: __imgRoot+path: setting.logo;
    }
}
export default wxUtil;
