import React from "react";
import "./SurveyChart.css";
import "@toast-ui/chart/dist/toastui-chart.min.css";
require("@toast-ui/chart/dist/toastui-chart.min.css");
const toastui = require("@toast-ui/react-chart");

function SurveyChart({ needSample, completeSample }) {
  const perData = Number(((completeSample / needSample) * 100).toFixed(2));

  const data = {
    categories: ["질문지 현황"],
    series: [
      {
        name: "응답완료",
        data: perData,
      },
      {
        name: "응답 미완료",
        data: 100 - perData,
      },
    ],
  };

  const options = {
    series: {
      dataLabels: { visible: true },
      radiusRange: {
        inner: "40%",
        outer: "100%",
      },
    },
    legend: {
      showCheckbox: false,
    },
    theme: {
      series: {
        colors: ["rgba(255, 222, 89)", "rgba(176, 194, 77)"],
      },
    },
    exportMenu: {
      visible: false,
    },
  };

  const containerStyle = {
    width: "340px",
    height: "340px",
  };

  const BarChart = toastui.PieChart;
  return (
    <div className="survey-chart-box">
      <BarChart data={data} options={options} style={containerStyle} />
      <div className="survey-chart-text-box">
        <span className="survey-chart-text1">{`${perData}%`} 응답완료</span>
        <span className="survey-chart-text2">
          {`${100 - perData}%`} 응답 미완료
        </span>
      </div>
    </div>
  );
}
export default SurveyChart;
