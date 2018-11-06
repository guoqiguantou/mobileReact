//IIHOC
import React from 'react';

const iiHoc = WrappedComponent => class extends WrappedComponent {
    constructor() {
        super();
        // this.state = {
        //     fields: {},
        // }

    }
    render() {
        console.log(this.state, 'state');

        // return super.render();
        return (<WrappedComponent/>);
    }
}

export default iiHoc;