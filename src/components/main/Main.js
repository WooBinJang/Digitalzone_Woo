import React from "react";
import "./Main.css";
import MainSection from "./MainSection";
import OrderSection from "./OrderSection";
import PointSection from "./PointSection";
import SendSection from "./SendSection";
import SkillSection from "./SkillSection";
import SolutionSection from "./SolutionSection";
const Main = () => {
  return (
    <div className="wrapper">
      <MainSection />
      <SolutionSection />
      <SendSection />
      <OrderSection />
      <SkillSection />
      <PointSection />
    </div>
  );
};

export default Main;
