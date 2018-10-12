import React,{Component} from 'react';
import PropTypes from 'prop-types';
import styles from './styles/index.scss';
import pureControl from '../../../enhance/pureControl';
import {Toast} from 'antd-mobile';
import {List} from 'immutable';

const propTypes = {
    accept : PropTypes.string,//接收文件类型
    multiple: PropTypes.bool,//是否可多选
    max: PropTypes.number,//最多显示
    onChange: PropTypes.func,//当数据发生变化时的回调
};

const defaultProps = {
    accept : 'image/*',
    multiple: false,
    max: 9
};

/**
 * 图片选择器
 */
class ImagePicker extends Component {

    constructor(props) {
        super(props);
        this.files = [];
        this.state = {
            accept : this.props.accept,
            multiple: this.props.multiple,
            files: List()
        }
    }

    handleChange = ()=> {
        const fileSelectorEl = this.fileSelectorInput;
        if (fileSelectorEl && fileSelectorEl.files && fileSelectorEl.files.length) {
            const files = fileSelectorEl.files;
            let pool = [];
            for (let i = 0; i < files.length; i++) {
                pool.splice(-1, 0, this.parseFile(files[i], i))
            }
            Promise.all(pool).then(()=>{
                let temp =  this.state.files;
                for (let file of this.files) {
                    if (temp.size == this.props.max) {
                        break;
                    }
                    temp = temp.push(file);
                }
                this.setState({
                    files: temp
                }, ()=>{
                    this.files = [];
                })
            }, (msg)=>{
                console.error(msg);
                Toast.fail(msg);
            })
        }
        if (fileSelectorEl) {
            fileSelectorEl.value = '';
        }
    }

    parseFile = (file, i) => {
        return new Promise((resolve, reject)=>{
            const reader = new FileReader();
            reader.onload = e => {
                const dataURL = e.target.result;
                if (!dataURL) {
                    reject('第' + i + '张图片加载失败');
                    return;
                }
                let orientation = 1;
                this.getOrientation(file, res => {
                    // -2: not jpeg , -1: not defined
                    if (res > 0) {
                        orientation = res;
                    }
                    this.addImage({
                        url: dataURL,
                        orientation,
                        file,
                    });
                    resolve();
                });
            };
            reader.readAsDataURL(file);
        })
    }

    getOrientation = (file, callback) => {
        const reader = new FileReader();
        reader.onload = e => {
            const view = new DataView(e.target.result);
            if (view.getUint16(0, false) !== 0xffd8) {
                return callback(-2);
            }
            const length = view.byteLength;
            let offset = 2;
            while (offset < length) {
                const marker = view.getUint16(offset, false);
                offset += 2;
                if (marker === 0xffe1) {
                    const tmp = view.getUint32((offset += 2), false);
                    if (tmp !== 0x45786966) {
                        return callback(-1);
                    }
                    const little = view.getUint16((offset += 6), false) === 0x4949;
                    offset += view.getUint32(offset + 4, little);
                    const tags = view.getUint16(offset, little);
                    offset += 2;
                    for (let i = 0; i < tags; i++) {
                        if (view.getUint16(offset + i * 12, little) === 0x0112) {
                            return callback(view.getUint16(offset + i * 12 + 8, little));
                        }
                    }
                } else if ((marker & 0xff00) !== 0xff00) {
                    break;
                } else {
                    offset += view.getUint16(offset, false);
                }
            }
            return callback(-1);
        };
        reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
    }

    addImage = (imgItem) => {
        this.files.splice(-1, 0, imgItem)
        if (this.props.onChange) {
            this.props.onChange(imgItem, this.state.files, 'add');
        }
    }

    selectImages = ()=> {
        this.fileSelectorInput.click()
        return this.fileSelectorInput.click();
    }

    handleRemove = (value, index)=> {
        this.setState({
            files: this.state.files.delete(index)
        })
        if (this.props.onChange) {
            this.props.onChange(value, this.state.files, 'remove');
        }
    }

    renderImgItem = (value, index)=> {
        return (
            <div key={'img' + index} className={styles.imageItem}>
                <img src={value.url}/>
                <div onClick={this.handleRemove.bind(null, value, index)}>x</div>
            </div>
        )
    }

    render(){
        const {accept, multiple} = this.state;
        return(
            <div>
                <div className={styles.imagePicker}>
                    {
                        this.state.files.map((value, index) => (
                            this.renderImgItem(value, index)
                        ))
                    }
                </div>
                <div className={styles.inputLayout}>
                    <input
                        className={styles.imgInput}
                        ref={(input) => { if (input) { this.fileSelectorInput = input; } }}
                        type="file"
                        accept={accept}
                        onChange={this.handleChange}
                        multiple={multiple}
                    />
                </div>
            </div>
        );
    }
}

ImagePicker.propTypes = propTypes;
ImagePicker.defaultProps = defaultProps;
export default pureControl(ImagePicker)