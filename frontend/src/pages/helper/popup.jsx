import React, { useState, useEffect } from 'react';

import './css/popup.css';


const PopUp = ({ message, type = 'success', duration = 5000 }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration]);

    if (!visible) {
        return null;
    }

    return (
        <div className={`pop-container ${type}`}>
            <div className="pop-message">
                {message}
            </div>
        </div>
    );
};

export default PopUp;