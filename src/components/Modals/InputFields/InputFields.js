import React from 'react';
import "./InputFields.css";

const InputFields = props => {
    const {
        id,
        labelText,
        type,
        placeholder,
        name,
        value,
        onChange,
        error,
    } = props;

    return (
        <div className="form-group">
            <label htmlFor={id} className="form-label">{labelText}</label>
            <input
                id={id}
                type={type}
                className="form-control"
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
            { error
                ? <div className="errors-message">{error}</div>
                : null
            }
        </div>
    )

};

export default InputFields;
