import React from "react";
import PropTypes from 'prop-types';
import '../styles/checkbox.css';

const propTypes = {
    /** Boolean value to indicate if checbox is checked or not */
    checked: PropTypes.bool,
    /** Label for the checkbox */
    label: PropTypes.string,
    /** Boolean value to set semi selected type in the checkbox */
    indeterminate: PropTypes.bool,
    /** Boolean value to render checkbox as readonly */
    readOnly: PropTypes.bool,
    /** A function to be fired on change of checkbox */
    onChange: PropTypes.func,
}

const CheckBox = React.forwardRef((props, ref) =>{
    const {checked, label, readOnly, indeterminate} = props;
    return (
        <div className={`checkbox ${checked ? 'checked': ''} ${indeterminate ? 'semi-selection': ''}`}>
            <span className="checbox-input-wrapper">
                <input ref={ref} readOnly={readOnly} onChange={props.onChange} type="checkbox" checked={checked} />
                <span className="checkbox-input"></span>
            </span>
            {label && <span className="checkbox-label">{label}</span>}
        </div>
    )
})

CheckBox.propTypes = propTypes;

export default CheckBox;