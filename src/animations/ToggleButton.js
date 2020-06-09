import React, { Component } from "react";
import "./toggle.css";

export default class ToggleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            value: props.value ? props.value : ""
        };
        this.onChange = this.onChange.bind(this);
    }
    onChange = e => {
        var active = e.target.checked;
        this.setState({ active });
        var fun = this.props.onToggleChange;
        if (typeof fun === "function") {
            fun(active, this.state.value);
        }
    };
    render() {
        const description = this.props.description
            ? this.props.description
            : this.props.value;
        return (
            <div className="d-inline-block text-secondary p-2">
                <div className="switch mr-2">
                    <label>
                        <input
                            type="checkbox"
                            checked={this.props.checked}
                            onChange={this.onChange}
                        />
                        <span className="slider round" />
                    </label>
                </div>
                <label>{description}</label>
            </div>
        );
    }
}
