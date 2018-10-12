import React from 'react';
import {List} from 'antd-mobile';
import PropTypes from "prop-types";
import ajaxUtil from "../../../utils/ajaxUtil";
import CustomIcon from "../CustomIcon";

const Item = List.Item;
const Brief = Item.Brief;

const propTypes = {
    /**
     * 数据接口路径
     */
    dataUrl: PropTypes.string.isRequired,

    /**
     * 列表在JSON数据里的名称
     */
    listVarName:PropTypes.string,
};

const defaultProps = {
    listVarName : 'content',
};

/***
 *  附件展示组件
 */
export default class AnnexList extends React.Component {

    constructor(props){
        super(props);

        this.dataList = [];
        this.state = {
            dataSource: [],
        };
    }

    componentDidMount() {
        ajaxUtil.load(`${this.props.dataUrl}`, (err, res) => {
            if (!err) {
                this.onDataLoad(res.body);
            }
        });
    }

    onDataLoad = (data)=>{
        this.setState({
            dataSource: data[this.props.listVarName],
        });
    };

    render() {
        let lists = (x) => {

            let ReturnList = [];

            if (x.length === 0) {
                ReturnList.push(
                    <Item key={"no"} align="top" multipleLine>
                        暂无附件信息
                    </Item>
                );
            }
            else {
                x.forEach(function (i, index) {
                    let fileType = "jpg";
                    const stype = i.stype.toLowerCase();
                    switch (stype) {
                        case "exe":
                            fileType = "exe";
                            break;
                        case "docx":
                            fileType = "word";
                            break;
                        case "doc":
                            fileType = "word";
                            break;
                        case "xls":
                            fileType = "excel";
                            break;
                        case "xlsx":
                            fileType = "excel";
                            break;
                        case "zip":
                            fileType = "zip";
                            break;
                        case "rar":
                            fileType = "zip";
                            break;
                        case "7z":
                            fileType = "zip";
                            break;
                        case "pptx":
                            fileType = "ppt";
                            break;
                        case "pptm":
                            fileType = "ppt";
                            break;
                        case "gif":
                            fileType = "gif";
                            break;
                        case "bmp":
                            fileType = "jpg";
                            break;
                        case "jpg":
                            fileType = "jpg";
                            break;
                        case "jpeg":
                            fileType = "jpg";
                            break;
                        case "png":
                            fileType = "jpg";
                            break;
                    }
                    ReturnList.push(
                        <Item key={index} align="top" multipleLine>
                            <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                                <div style={{display: "flex"}}>
                                    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", height: "25px" }}>
                                        <CustomIcon style={{marginRight: "0.3rem"}} path={require("./images/" + fileType + ".svg")} />
                                    </div>
                                    <a href={`${__apiRoot}/common/file/download.file.html?spath=` + i.spath} style={{whiteSpace:"normal"}}>{i.sname}</a>
                                </div>
                            </div>
                        </Item>
                    );
                });
            }
            return ReturnList;
        };

        return (
            <List renderHeader={() => '附件列表'} className="my-list">
                {lists(this.state.dataSource)}
            </List>
        )
    }

}

AnnexList.propTypes = propTypes;
AnnexList.defaultProps = defaultProps;
