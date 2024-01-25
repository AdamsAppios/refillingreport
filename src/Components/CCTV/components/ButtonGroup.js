import React from 'react';

const ButtonGroup = ({ buttons }) => (
    <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
        {buttons.map(button => (
            <button key={button.label} onClick={button.onClick}>
                {button.label}
            </button>
        ))}
    </div>
);

export default ButtonGroup;