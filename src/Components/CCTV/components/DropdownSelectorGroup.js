// DropdownSelectorGroup.js
import React from 'react';

const DropdownSelectorGroup = ({ 
    label, 
    value, 
    onChange, 
    options = [
        { value: 'Bellaswan', label: 'Bellaswan' },
        { value: 'ARSO', label: 'ARSO' },
        { value: 'Kalimpio', label: 'Kalimpio' },
        { value: 'Goldswan', label: 'Goldswan' }
    ] 
}) => {
    const inputGroupStyle = { margin: '10px 0' };

    return (
        <div style={inputGroupStyle}>
            <label>{label}: </label>
            <select value={value} onChange={onChange} >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DropdownSelectorGroup;

