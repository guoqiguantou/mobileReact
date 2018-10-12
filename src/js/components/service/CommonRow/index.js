import React from 'react';
import style from './style/index.scss';
import CircularFont from '../../../components/common/CircularFont';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const propTypes = {
    /**
     * 图标颜色
     */
    iconColor: PropTypes.string,
    /**
     * 图标文字
     */
    iconText: PropTypes.string,
    /**
     * 标题
     */
    title: PropTypes.string,
    /**
     * 附加信息
     */
    notes: PropTypes.array,
    /**
     * 日期字符串
     */
    date: PropTypes.string,
    /**
     * 链接
     */
    url: PropTypes.string
};

const defaultProps = {
    iconColor: '#108ee9'
}

/**
 * 带文字图标的通用列表样式
 * @param props
 */
export default function CommonRow(props) {

    const {iconColor, iconText, title, notes, date, url} = props;

    return (
        <Link to={url}>
            <div className={style.box}>
                <div className={style.wrap}>
                    <div className={style.icon}>
                        <CircularFont color={iconColor}>{iconText}</CircularFont>
                    </div>
                    <div className={style.content}>
                        <div className={style.title}>
                            {title}
                        </div>
                        <div className={style.note}>
                            {notes.map((noteItem, index) => <div key={index}
                                                                 className={style.noteItem}>{noteItem}</div>)}
                        </div>
                    </div>
                    <div className={style.date}>
                        {date}
                    </div>
                </div>
                <div className={style.split}></div>
            </div>
        </Link>
    );
}

CommonRow.propTypes = propTypes;
