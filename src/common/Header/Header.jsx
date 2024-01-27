import React from 'react';
import './header.css';
import { PROFILE_URL } from "../Routes/constant";

const Header = () => {
    return (
        <>
            <div className='header'>
                <div className='dashboard'>
                    <h1>Dashboards</h1>
                </div>
                <div className='account'>
                    <h4>Your Name</h4>
                    <h6>Designation</h6>
                </div>
                <div className='image'>
                    <img
                        src={`${PROFILE_URL}/profile.png`}

                        alt="user profile"
                    />
                </div>

            </div>
            <div className='response'>
                <h5>System Monitoring</h5>
            </div>
        </>
    );




}
export default Header;