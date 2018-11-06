import React, { Component } from 'react';
//HOC
const formCreate = WrappedComponent => class extends Component {

    constructor() {
        super();
        this.state = {
            fields: {},
        }

    }
    onChange = key => e => {
        const { fields } = this.state;
        fields[key] = e.target.value;
        this.setState({
            fields,
        })
    }
    handleSubmit = () => {
        console.log(this.state.fields);
    }
    getField = fieldName => {
        return {
            onChange: this.onChange(fieldName),
        }
    }
    render() {
        const props = {
            ...this.props,
            handleSubmit: this.handleSubmit,
            getField: this.getField,
        }

        return (<WrappedComponent
            {...props}
        />);
    }
};
export default formCreate;