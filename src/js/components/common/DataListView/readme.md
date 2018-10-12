# 通用列表组件

通用列表是框架一个极其重要的组件，几乎每个业务都有列表展示的需求，目前该组件支持以下功能：
- 数据自动加载
- 自动分页
- 上拉加载
- 下拉刷新
- 缓存管理
- 多列支持

## 代码位置

src/js/components/common/DataListView

## 使用示例

```js
<DataListView
dataUrl={`http://wxs.0luzhe.com/Active/Misc/Vote/voteList`}
columns={2}
onDataFirstLoad={this.onDataFirstLoad}
renderHeader={this.renderHeader}
renderRow={this.renderRow}/>
```

由以上代码段，可以很清晰的了解该组件的使用方式，只要提供数据接口（dataUrl），通用列表控件便会通过回调函数自动绘制界面，并且自动实现上拉加载、下拉刷新等功能。

具体使用可参照src/js/demo/ListTest的通用列表完整demo，也可通过访问链接/demo/list来查看实际运行效果。

## 注意事项

### 高度
默认通用列表控件会沾满所有可能的空间，其内部使用了height:100%的样式。如果需要自定义高度，可是自行通过style属性设置高度。

### 缓存
通用列表控件默认会进行session级别的数据缓存，用于提高客户体验和减小网络压力，也就是说，用户只要打开通用列表控件所在的页面，不论怎么刷新，数据都是不会变的，除非关掉浏览器重进、使用下拉刷新或者开发者自定义的清除缓存的行为。

默认的缓存key是用当前页面的地址作为key的，如果一个页面地址包含多个地址，那么需要开发人员自行指定cacheKey。

### 滚动位置保持
所谓的滚动位置保持是指当从列表页切换到其他页面后，用户点返回重新回到列表页希望原有的滚动位置的功能。

比如用户翻阅列表查看到了第100条数据，然后点击进入详情页面查看，查看完毕后，点返回又回到了列表页，这时候用户是期望列表页当前展示的还是第100条数据的位置，而不是回到第一条。

作为单入口的程序，框架页面之间的切换，其实是dom之间的切换，而非页面级的切换，所以不能使用现代浏览器默认提供的滚动位置保持功能。

通用列表控件默认通过缓存管理模块，默认实现了该需求，如果禁用了缓存功能，那么滚动位置保持功能也将失效。

> 注：框架的页面切换并非页面级切换，而是dom切换，从A页面进入B页面，A页面的dom会被完全移除内存，从B页面回到A页面，A页面将会重新加载，并执行整个生命周期。

### 和Page控件联用

通用列表控件通常和Page控件一起用，示例代码如下：
```js
<Page title="通用列表Demo" wrapScollView={false}>
            <DataListView onDataFirstLoad={this.onDataFirstLoad} columns={2} renderHeader={this.renderHeader}
                          dataUrl={`http://wxs.0luzhe.com/Active/Misc/Vote/voteList`} renderRow={this.renderRow}/>
        </Page>
```
由于通用列表控件本身已经包含了一个ScrollView来实现内容滚动的功能，而Page默认内部也有一个ScrollView，那么就需要Page控件通过设置
```js
wrapScollView={false}
```
来禁用本身的滚动视图功能。

### 多列
可以设置columns属性来使控件支持多个列展示，默认不设置就是单列。


## 属性列表
```js

const propTypes = {
    /**
     * 数据接口路径
     */
    dataUrl: PropTypes.string.isRequired,

    /**
     * 每页数据条数
     */
    pageSize: PropTypes.number,

    /**
     * 样式
     */
    style: PropTypes.object,

    /**
     * 是否允许下拉刷新
     */
    enablePullToRefresh:PropTypes.bool,

    /**
     *    从数据源(data source)中接受一条数据，以及它和它所在section的ID。
     *    返回一个可渲染的组件来为这行数据进行渲染。默认情况下参数中的数据就是放进数据源中的数据本身，
     *    不过也可以提供一些转换器。
     *    如果某一行正在被高亮（通过调用highlightRow函数），ListView会得到相应的通知。
     *    (rowData, sectionID, rowID, highlightRow) => renderable
     */
    renderRow: PropTypes.func.isRequired,

    /**
     * 列表头部渲染函数
     */
    renderHeader: PropTypes.func,

    /**
     * 如果提供了此函数，会为每个小节(section)渲染一个标题
     * (sectionData, sectionID) => renderable
     */
    renderSectionHeader: PropTypes.func,

    /**
     * 如果提供了此属性，一个可渲染的组件会被渲染在每一行下面，除了小节标题的前面的最后一行。
     * 在其上方的小节ID和行ID，以及邻近的行是否被高亮会作为参数传递进来。
     * (sectionID, rowID, adjacentRowHighlighted) => renderable
     */
    renderSeparator: PropTypes.func,

    /**
     * 滚动回调函数
     * (e)=>{}
     */
    scrollHandler: PropTypes.func,

    /**
     * 第一页数据加载完成回调
     *  (data,isCache)=>{}
     */
    onDataFirstLoad: PropTypes.func,

    /**
     * 列表在JSON数据里的名称
     */
    listVarName:PropTypes.string,

    /**
     * 总数量在JSON数据里的名称
     */
    totalVarName:PropTypes.string,

    /**
     * 分页参数名称
     */
    pageParamName:PropTypes.string,

    /**
     * 分页每页数量参数名称
     */
    pageSizeParamName:PropTypes.string,

    /**
     * 是否支持缓存
     */
    cache:PropTypes.bool,

    /**
     * 缓存KEY
     */
    cacheKey:PropTypes.string,

    /**
     * 自动加载
     */
    autoLoad:PropTypes.bool,
    /**
     * 列数
     */
    columns: PropTypes.number,
};

const defaultProps = {
    pageSize: 15,
    listVarName: 'list',
    totalVarName: 'total',
    pageParamName: 'page',
    pageSizeParamName: 'pagesize',
    enablePullToRefresh: true,
    cache: true,
    autoLoad:true,
    columns:1
};

```

## 公共方法

方法名称 | 参数 | 返回值 | 说明
-- | :--: | :--: | --
getDataSource | - | Array | 获取数据源
refresh | - | - | 刷新数据
