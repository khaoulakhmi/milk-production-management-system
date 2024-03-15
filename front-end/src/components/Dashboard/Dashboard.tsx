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
            return <Route path="/" element={<Cow/>}/>;
          case 'Medical Exam':
            return <Route path="/MedicalExam" element={<MedicalExam/>}/>;
          case 'Birth':
              return <Route path="/Birth" element={<Birth/>}/>;
          case 'Milk Production':
              return <Route path="/MilkProduction" element={<MilkProduction/>}/> ;
          default :
              return <Route path="/" element={<Cow/>}/>;
        }
    }
    return(
        <>
        <div className="dash">
            <div className="leftPanel">
            <Sidebar onIconClick={handleIconClick}/>
            </div>
            <div className="rightPanel">
              <Routes>
              <Route path="/" element={<Cow/>}/>
              <Route path="/MedicalExam" element={<MedicalExam/>}/>
              <Route path="/Birth" element={<Birth/>}/>
              <Route path="/MilkProduction" element={<MilkProduction/>}/>
              </Routes>
              
            </div>
        </div>
        </>
    )
}
