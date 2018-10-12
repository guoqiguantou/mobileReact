/**
 * 参数处理工具函数
 */
const paramUtil = {
    /**
     * 获取url中的参数
     * @param parameterName
     */
    get(parameterName) {
        var result = null,
            tmp = [];
        var items = location.search.substr(1).split("&");
        for (var index = 0; index < items.length; index++) {
            tmp = items[index].split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        }
        return result;
    }
}

export  default paramUtil;