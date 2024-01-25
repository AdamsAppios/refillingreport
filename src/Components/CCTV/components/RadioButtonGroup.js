import React from 'react';

const RadioButtonGroup = ({ options, selectedValue, onChange }) => (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '15px', margin: '10px 0' }}>
        {options.map(option => (
            <div key={option.value}>
                <input
                    type="radio"
                    value={option.value}
                    checked={selectedValue === option.value}
                    onChange={onChange}
                />
                <label>{option.label}</label>
            </div>
        ))}
    </div>
);

export default RadioButtonGroup;