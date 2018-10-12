# 通用页面容器

通用页面控件是框架的基础控件，几乎每个业务页面都会用到。其具体功能如下：

- 数据拉取
- 导航条
- 数据缓存
- 内容滚动
- 滚动位置维持
- 下拉刷新

## 代码位置

src/js/components/common/DataListView

## 使用示例

```js
<Page title="页面控件Demo">
页面内容
</Page>
```

这是最简单用法，具体使用可参照src/js/demo/PageTest的通用列表完整demo，也可通过访问链接/demo/Page来查看实际运行效果。

## 注意事项

### 高度
Page控件默认是全屏控件，除了导航本身的高度，剩余的部分会占满剩余的空间。

### 缓存
Page控件默认会进行session级别的数据缓存，用于提高客户体验和减小网络压力，也就是说，用户只要打开Page控件所在的页面，不论怎么刷新，数据都是不会变的，除非关掉浏览器重进、使用下拉刷新或者开发者自定义的清除缓存的行为。

默认的缓存key是用当前页面的地址作为key的，如果一个页面地址包含多个地址，那么需要开发人员自行指定cacheKey。

### 滚动位置保持
Page控件在启用滚动视图的模式下，和DataListView控件一样，支持滚动位置保持。详情请参照：
[DataListView滚动位置保持](../DataListView/readme.md#滚动位置保持)

### 和DataListView控件联用
参考：[DataListView和Page控件联用](../DataListView/readme.md#和page控件联用)

## 属性列表

```js
const propTypes = {
    /**
     * 标题
     */
    title: PropTypes.string,

    /**
     * 数据接口路径
     */
    dataUrl: PropTypes.string,

    /**
     * 数据加载完毕回调
     * (json)=>{}
     */
    onDataLoad: PropTypes.func,

    /**
     * 是否显示后退按钮
     */
    showBackBtn: PropTypes.bool,

    /**
     * 是否显示导航条
     */
    showNavBar:PropTypes.bool,

    /**
     * 是否嵌入到TabBar控件中
     */
    inTabBar:PropTypes.bool,

    /**
     * 模式
     * enum{'dark', 'light'}
     */
    mode: PropTypes.string,

    /**
     * 导航右边内容, 参考NavBar控件
     */
    rightContent: PropTypes.any,

    /**
     * 是否用ScrollView控件包含内容
     */
    wrapScollView: PropTypes.bool,

    /**
     * 是否支持数据缓存
     */
    cache: PropTypes.bool,

    /**
     * 缓存KEY
     */
    cacheKey:PropTypes.string,

    /**
     * 是否允许下拉刷新
     */
    enablePullToRefresh:PropTypes.bool,

    /**
     * 头部渲染函数
     */
    renderHeader: PropTypes.func,
    /**
     * 底部渲染函数
     */
    renderFooter: PropTypes.func,
    /**
     * 附加样式类
     */
    className:PropTypes.string
}

const defaultProps = {
    mode: 'dark',
    showBackBtn: true,
    wrapScollView: true,
    cache: true,
    enablePullToRefresh:false,
    showNavBar: true,
    inTabBar:false
}
```
