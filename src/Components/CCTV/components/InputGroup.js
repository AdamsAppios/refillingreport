import React from 'react';

const InputGroup = ({ label, value, onChange, type = "text" }) => (
    <div style={{ margin: '10px 0' }}>
        <label>{label}: </label>
        <input type={type} value={value} onChange={onChange} />
    </div>
);

export default InputGroup;