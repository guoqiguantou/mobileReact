/**
 * Created by omai on 2017/2/27.
 * session周期页面存储工具类
 */
var sessionStorageUtil = {

    /**
     * 获得key
     * @returns {string}
     */
    getKey(){
        return "state:" + window.location.href;
    },
    /**
     * 保存
     * @param key 关键字
     * @param data 数据
     */
    save : function(key,data) {
        sessionStorage.setItem(key,JSON.stringify(data));
    },

    /**
     * 读取
     * @param key 关键字text
     */
    read : function (key) {
        let data = sessionStorage.getItem(key);
        if(data){
           data = JSON.parse(data);
        }
        return data;
    },

    /**
     * 移除
     * @param key 关键字
     */
    remove : function (key) {
        sessionStorage.removeItem(key)
    }
}
export default sessionStorageUtil;