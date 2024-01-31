import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './header.css';
import { PROFILE_URL } from "../Routes/constant";

const Header = () => {
    const [isToggleOn, setIsToggleOn] = useState(false);

    const handleToggle = () => {
        setIsToggleOn(!isToggleOn);
    };
    return (
        <>
            {/* <div className='header'>
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

            </div> */}
            {/* <div className='response'>
                <h5>System Monitoring</h5>
            </div> */}

<div className='mn_hd'>

<div className='col-md-8'>
<div className='des_tx'>  
<h1>Dashboards</h1>


<div className='top_icon'>
<ul>
    <li>

    <a href=''>
                   <img
                        src={`${PROFILE_URL}/Circle-View.png`}

                        alt="Circle View"
                    />
</a>


    </li>
    <li>

<a href=''>
               <img
                    src={`${PROFILE_URL}/Long-Card-View.png`}

                    alt="Circle View"
                />
</a>


</li>

<li>

<a href=''>
               <img
                    src={`${PROFILE_URL}/Card-View.png`}

                    alt="Circle View"
                />
</a>


</li>

<li>

<a href=''>
               <img
                    src={`${PROFILE_URL}/Graph-View.png`}

                    alt="Circle View"
                />
</a>


</li>

<li className='icon_pdg1'>

<a href=''>
               <img
                    src={`${PROFILE_URL}/Icon-awesome-star.png`}

                    alt="Circle View"
                />
</a>


</li>


<li>

<a href=''>
               <img
                    src={`${PROFILE_URL}/Notification-Bell Icon.png`}

                    alt="Circle View"
                />
</a>


</li>

</ul>

</div>

</div>



</div>

<div className='col-md-4'>
<div className='user_nm'>
    
    <p>Your Name</p>
    <span>Designation</span>

   

</div>

<div className='user_nm_pic'>
    <img
                        src={`${PROFILE_URL}/user.png`}

                        alt="user user"
                    />
                    </div>







</div>

</div>

<div className='system_tx'>
    
    <h4>System Monitoring</h4>
    <hr className='line1'></hr>
</div>



<div className={`w-100 sidebar-tabs d-flex justify-content-center align-items-center ${isToggleOn ? 'active' : ''}`} >
      <img
        id="sidebar-click"
        className='me-2'
        src={`${PROFILE_URL}/side_icon.png`}
        width={50}
        height={50}
        alt="user side_icon"
        onClick={(e) => {
          e.stopPropagation();
          handleToggle(); // Add this line to handle the click on the image
        }}
      />
      <div className='sidebar-tabs-data'>
        <Tabs defaultActiveKey="profile" id="fill-tab-example" className="mb-3" fill>
          <Tab eventKey="home" title="Home">
            
          </Tab>
          <Tab eventKey="profile" title="Profile">
            Tab content for Profile
          </Tab>
          <Tab eventKey="longer-tab" title="Loooonger Tab">
            Tab content for Loooonger Tab
          </Tab>
        </Tabs>
      </div>
    </div>



        </>
    );




}
export default Header;