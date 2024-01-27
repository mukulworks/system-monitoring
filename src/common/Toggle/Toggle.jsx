import React, { useState } from 'react';
import './toggle.css';

const Toggle = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <nav className={isOpen ? 'open' : ''}>
                <button>1st</button>
                <button>1st</button>
                <button>1st</button>

            </nav>
        </>
    )
}

export default Toggle;
