import React, { Component } from 'react'
// import { get } from '../../service/ReadAPI';
import {
    Input, Label, Row, Col
} from "reactstrap";
export default class FilterState extends Component {
    constructor(props) {
        super(props);
        this.state = {
            states: [],
            defaultCheck: false,
        }

    }
    componentDidMount() {
        this.setState({
            states: this.props.list,
        })
    }
    handleCheckAll(e) {
        this.props.onChangeCheckBox(e, -1);
        this.setState({
            defaultCheck: e.target.checked,
        })
    }
    render() {
        return (<>
            {this.state.states.map((state, index) => (

                <div key={index}><Input key={this.state.defaultCheck}
                    //className = 'form-control'
                    name={state}
                    type="checkbox"
                    style={{ verticalAlign: "middle", marginTop: "0rem" }}
                    onChange={(e) => {
                        this.props.onChangeCheckBox(e, index);
                    }}
                    defaultChecked={this.state.defaultCheck}
                />
                    <Label>{state}</Label></div>

            ))}</>
        )
    }
}