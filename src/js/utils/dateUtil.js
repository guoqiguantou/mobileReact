var dateUtil = {
    /**
     * 格式化时间间隔
     */
    span(dateStr) {
        if(dateStr === null)
            dateStr = "";
        // 获取当前时间戳
        dateStr = dateStr.replace(/-/g,'/');
        var currentTime = parseInt(new Date().getTime() / 1000);
        var time = parseInt(new Date(dateStr).getTime() / 1000);
        var diffTime = currentTime - time;
        var second = 0;
        var minute = 0;
        var hour = 0;
        if (null != diffTime && "" != diffTime) {
            if (diffTime > 60 && diffTime < 60 * 60) {
                diffTime = parseInt(diffTime / 60.0) + "分钟" + parseInt((parseFloat(diffTime / 60.0) - parseInt(diffTime / 60.0)) * 60) + "秒";
            }
            else if (diffTime >= 60 * 60 && diffTime < 60 * 60 * 24) {
                diffTime = parseInt(diffTime / 3600.0) + "小时" + parseInt((parseFloat(diffTime / 3600.0) -
                    parseInt(diffTime / 3600.0)) * 60) + "分钟";
            }
            else if(diffTime < 60 * 60 * 48){
                diffTime = '昨天';
            }
            else if(diffTime < 60 * 60 * 72){
                diffTime = '前天';
            }
            else {
                //超过1天
                let date = new Date(parseInt(time) * 1000);
                diffTime = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
                //diffTime = parseInt(diffTime) + "秒";
            }
        }
        return diffTime;
    },

    /**
    * 格式化时间
    */
    format(datex, format) {
        var date = {
            "M+": datex.getMonth() + 1,
            "d+": datex.getDate(),
            "h+": datex.getHours(),
            "m+": datex.getMinutes(),
            "s+": datex.getSeconds(),
            "q+": Math.floor((datex.getMonth() + 3) / 3),
            "S+": datex.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (datex.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1
                    ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    }
}

export default dateUtil;
