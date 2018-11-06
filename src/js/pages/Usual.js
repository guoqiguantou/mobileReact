// usual
import React, { Component } from 'react';
import iiHoc from './ii-hoc';


class Usual extends Component {

    constructor() {
        super();
        this.state = {
            usual: 'usual',
        }
    }

    componentDidMount() {
        console.log('didMount')
    }

    render() {
        return (
            <div>
                Usual
            </div>
        )
    }
}
export default iiHoc(Usual);