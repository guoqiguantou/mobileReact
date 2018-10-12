# 圆形文字图标组件

很多列表页面的列表项中是没有图片的，这就导致了非常难以排版，圆形文字图标组件可以很好的解决这个问题，让界面变的美观。


## 代码位置

src/js/components/common/CircularFont

## 使用示例

```js
<CircularFont>测试</CircularFont>
```
src/js/demo/ListTest的通用列表示例中的列表项使用了该组件，可通过访问链接/demo/list来查看实际运行效果。

## 属性列表

```js

const propTypes = {
    /**
     * 字体颜色
     */
    fontColor: PropTypes.string,
    /**
     * 圆形颜色
     */
    color:PropTypes.string,
};

const defaultProps = {
    fontColor:'#ffffff',
    color:'#108ee9'
}

```
