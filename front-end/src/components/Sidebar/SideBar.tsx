import React, { useState } from 'react';
import './Sidebar.css';
const Logo = require('../../assets/logo.png');

interface SideBarProps {
  onIconClick: (icon: string) => void;
}

const SideBar: React.FC<SideBarProps> = (props) => {
  const [activeIcon, setActiveIcon] = useState<string | null>('Cow');

  const handleIconClick = (icon: string) => {
    setActiveIcon(icon);
    props.onIconClick(icon);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo ">
        <img src={Logo} alt="logo" />
      </div>
      <div className={`sidebar-icon ${activeIcon === 'Cow' ? 'active' : ''}`} onClick={() => handleIconClick('Cow')}>
        <span><b>Cow</b></span>
      </div>
      <div className={`sidebar-icon ${activeIcon === 'Medical Exam' ? 'active' : ''}`} onClick={() => handleIconClick('Medical Exam')}>
        <span><b>Medical Exam</b></span>
      </div>
      <div className={`sidebar-icon ${activeIcon === 'Milk Production' ? 'active' : ''}`} onClick={() => handleIconClick('Milk Production')}>
        <span><b>Milk Production</b></span>
      </div>
      <div className={`sidebar-icon ${activeIcon === 'Birth' ? 'active' : ''}`} onClick={() => handleIconClick('Birth')}>
        <span><b>Birth</b></span>
      </div>
    </div>
  );
};

export default SideBar;
