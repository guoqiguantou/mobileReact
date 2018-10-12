# 页面加载组件

由于我们推荐的页面路由模式是采用懒加载的方式，所以在用户网络条件不好的情况下，动态加载页面是需要耗费一定时间的，那么为了良好的客户体验，我们需要给用户一个页面正在加载的提示。其具体能显示的页面状态如下：

- 加载状态显示
- 超时状态显示
- 错误装填显示

## 代码位置

src/js/components/common/PageLoading

## 使用示例

```js
const DemoIndex = Loadable({
    loader: () => import('./demo/DemoIndex'/* webpackChunkName:"DemoIndex" */),
    loading: PageLoading
});
```

## 属性列表

```js
const propTypes = {
    /**
     * 超时提示
     */
    timeOutInfo: PropTypes.string,
    /**
     * 加载提示
     */
    loadInfo: PropTypes.string,
    /**
     * 错误提示
     */
    errInfo: PropTypes.string,
}

const defaultProps = {
    timeOutInfo:'页面加载超时!',
    loadInfo:'页面加载中…',
    errInfo:'错误! 页面加载失败！'
}
```
