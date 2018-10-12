/**
 * Created by omai on 2017/3/3.
 */
import {Toast} from 'antd-mobile'
import request from 'superagent'
import {Store} from 'locallyjs'
import jsonp from 'superagent-jsonp'

//授权存储key
const __authSaveKey = 'LUCK_AUTH';




var ajaxUtil = {
     showLoadingCount:0,
    /**
     * 加载数据
     * @param url 地址
     * @param callback 请求回调(err, res)=>{}
     * @param showProgress 显示loading
     */
    load(url, callback, showProgress = true, toast = "加载中...") {

        if (showProgress) this.showLoading(toast);
        request
            .get(url)
            .query(this.getTokenData())
            .end((err, res) => {
                if (err) {
                    console.log('err',err.response);
                }
                callback(err, res);
                if (showProgress) this.hideLoading();
            });
    },
    /**
     * 加载数据
     * @param url 地址
     * @param data 参数数组
     * @param callback 请求回调(err, res)=>{}
     * @param showProgress 显示loading
     *
     * 当使用get请求传递查询字符串的时候，用.query({ aaa: 'Manny' })方法,传递一个对象就可以,下面的代码将产生一个?aaa=Manny请求:
     */
    get(url, data, callback, showProgress = true, toast = "加载中...") {
        if (showProgress) this.showLoading(toast);
        request
            .get(url)
            .query(this.getTokenData(data))
            .end((err, res) => {
                if (err) {
                    console.log('err',err.response);
                }
                callback(err, res);
                if (showProgress) this.hideLoading();
            });
    },
    /**
     * post 请求
     * @param url 地址
     * @param params 发送的数据
     * @param callback 请求回调(err, res)=>{}
     * @param showProgress  显示loading
     * @param type 设置Content-Type
     * @param toast
     */
    post(url, params, callback, type = 'form', showProgress = true, toast = '加载中……') {
        if (showProgress) this.showLoading(toast);
        request
            .post(url)
            .query(this.getTokenData())
            .type(type)
            .send(params)
            .end((err, res) => {
                if (err) {
                    console.log('err',err.response);
                }
                callback(err, res);
                if (showProgress) this.hideLoading();
            });
    },

    /**
     * jsonp
     * @param url
     * @param data 参数数组
     * @param callback
     * @param showProgress
     * @param toast
     */
    loadJsonp(url,data,callback,jsonpParam,showProgress=false,toast="加载中..."){
        if(showProgress) Toast.loading(toast,0);
        console.log('loadJsonp',data);
        request
            .get(url)
            .query(this.getTokenData(data))
            .use(jsonp(jsonpParam))
            .end((err, res) => {
                callback(err, res);
                if(showProgress) Toast.hide();
            });
    },
    /**
     * 保存验证数据
     * @param data
     */
    // saveAuth(data) {
    //     localStorage.save(AUTH_SAVE_KEY, data);
    // },
    showLoading(toast){
        if(this.showLoadingCount===0){
           // console.log('showLoading')
            Toast.loading(toast, 0);
        }
        ++this.showLoadingCount;
    },
    hideLoading(){
        --this.showLoadingCount;
        if(this.showLoadingCount===0){
            //console.log('hideLoading')
            Toast.hide();
        }
    },
    /**
     * 获取Token参数
     * @returns {{}}
     */
    getTokenData(data){
        if(!data) data = {};
        let store = new Store();

        let accessToken = store.get(__authSaveKey);
        if (accessToken) data['access_token'] = accessToken;
        return data;
    }
}
export default ajaxUtil;