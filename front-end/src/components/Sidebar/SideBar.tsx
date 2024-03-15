import React, { useState } from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
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
      <NavLink to={"/"} >Cow</NavLink>
      <NavLink to={"/MedicalExam"} >MedicalExam</NavLink>
      <NavLink to={"/Birth"} >Birth</NavLink>
      <NavLink to={"/MilkProduction"} >MilkProduction</NavLink>
    </div>
  );
};

export default SideBar;
