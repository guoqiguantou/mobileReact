import React from 'react';
import Calendar from './Calendar';
import styles from './style/index.scss';
import PropTypes from 'prop-types';

const propTypes = {
    /**
     * 默认的初始选择日期
     */
    selectedDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    /**
     * 选择日期回调
     * (date)=>{}
     */
    onSelectDate:PropTypes.func,
    /**
     * 如果某天有活动，则会显示该decorate。这个值是一个key/value对象。 key的格式是YYYY-MM-DD, value则可为任意值。例如，如果decorate的值是{"2017-02-15": true}，那么在2017-02-15这一天会出现一个小圆圈来标识这一天有活动。
     */
    decorate: PropTypes.object,
}

const defaultProps = {
    selectedDate:new Date()
}

const VIEW_TYPE = [{type:'week',icon:'ar-down'},{type:'month',icon:'ar-rise'}];
/**
 * 支持周月视图切换的日期选择器
 */
export default class WeekCalendar extends React.Component{

    constructor(props){
        super(props);
        this.selectDate = props.selectedDate;
        this.state = {
            viewType:0,
        };
    }

    switchHandler = ()=>{
        let viewType = ++this.state.viewType;
        if(viewType>=VIEW_TYPE.length) viewType=0;
        this.setState({viewType:viewType});
    }

    dateSelectHandler = (date)=>{
        console.log('onSelectDate',date);
        this.selectDate = date;
        if(this.props.onSelectDate){
            this.props.onSelectDate(date);
        }
    }

    dragEndHandler = (deltaX,deltaY)=>{
        console.log('dragEndHandler',deltaX,deltaY);
        if(deltaY > 60){
            this.setState({viewType:1});
        }

        if(deltaY < -60){
            this.setState({viewType:0});
        }
    }

    render(){
        const {viewType} = this.state;
        let view = VIEW_TYPE[viewType];
        return (
            <div className={styles.weekCalendar}>
                <Calendar selectedDate={this.selectDate} view={view.type} key={view.type} decorate={this.props.decorate} onSelectDate={this.dateSelectHandler} onDragEnd={this.dragEndHandler} />
            </div>
        );
    }
}

WeekCalendar.propTypes = propTypes;
WeekCalendar.defaultProps = defaultProps;
