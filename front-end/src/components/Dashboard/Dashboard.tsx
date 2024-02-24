import Sidebar from "../Sidebar/SideBar"
import { useState } from "react";
import { Cow } from "../Cow";
import { MedicalExam } from "../MedicalExam";
import { MilkProduction } from "../MilkProduction";
import { Birth } from "../Birth";
import "./Dashboard.css"
import { Route, Routes } from "react-router-dom";

export const Dashboard = () => {
    const [activeOption, setActiveOption] = useState('');

  const handleIconClick = (icon: string) => {
    setActiveOption(icon);
  };

    const renderRightPanel = () => {
        switch (activeOption) {
          case 'Cow':
            return <Cow/>;
          case 'Medical Exam':
            return <MedicalExam/>;
          case 'Birth':
              return <Birth/>;
          case 'Milk Production':
              return  <MilkProduction/>;
          default :
              return <Cow/>;
        }
    }
    return(
        <>
        <div className="dash">
            <div className="leftPanel">
            <Sidebar onIconClick={handleIconClick}/>
            </div>
            <div className="rightPanel">
               {renderRightPanel()}
            </div>
        </div>
        </>
    )
}
