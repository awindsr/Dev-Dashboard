import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJs } from "@fortawesome/free-brands-svg-icons";
import { faArrowsRotate, faClock, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
// import GitHubStats from "./GithubStats";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const apiKey = import.meta.env.VITE_WAKATIME_API_KEY;

const wakatimeAPI = "https://wakatime.com/api/v1";

export default function UserStats() {
  const [hours, setHours] = useState(0);
  const [mostUsedLanguage, setMostUsedLanguage] = useState({});
  const [bestDay, setBestDay] = useState({}); 


  const handleRefresh = ()  => { 
    handleRefreshHoursandBestDay();
    handleRefreshLanguages();
  }

  useEffect(() => {
    handleRefresh();
  }, []);
  const handleRefreshHoursandBestDay = () => {
    axios
      .get(`${wakatimeAPI}/users/current/stats/all_time?api_key=${apiKey}`)
      .then((apiResponse) => {
        // Extract data from the API response
        const totalSeconds = apiResponse.data.data.total_seconds_including_other_language;
        const bestDayData = apiResponse.data.data.best_day;
  
        // Calculate total hours and best day hours
        const hours = Math.floor(totalSeconds / 3600);
        const bestDay = {
          date: bestDayData.date,
          hours: Math.floor(bestDayData.total_seconds / 3600),
        };
  
        // Set the state with the calculated values
        setHours(hours);
        setBestDay(bestDay);
  
        // Optionally log the values
        console.log('Best day:', bestDay);
        console.log('Total hours:', hours);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle error
      });
  };
  

  const handleRefreshLanguages = () => {
    axios.get('https://wakatime.com/share/@awindsr/ef43d203-f742-4329-813e-451877e89565.json')
    .then(response => {
        const data = response.data.data; 
  
        let maxHours = 0;
        let languageWithMostHours = '';

        data.forEach(language => {
            if (language.hours > maxHours) {
                maxHours = language.hours;
                languageWithMostHours = language.name;
            }
        });
        setMostUsedLanguage({ name: languageWithMostHours, hours: maxHours });
        console.log(mostUsedLanguage);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
  }

  // console.log(data);
  return (
    <div>
      <WakatimeStats onRefresh={handleRefresh} hours={hours} mostUsedLanguage={mostUsedLanguage} bestDay={bestDay}/>
      {/* <GitHubStats /> */}
    </div>
  );
}

function WakatimeStats({ onRefresh, hours, mostUsedLanguage, bestDay}) {
  return (
    <div className="flex flex-col w-full space-y-3 rounded-lg p-4">
      <div className="flex items-center">
        <h1 className="text-white font-nunito font-bold text-[1.2rem]">
          WakaTime Stats
        </h1>
        <RefreshButton onrefresh={onRefresh} />
      </div>
      <div className="flex justify-between">
        <CardOne stat={hours} heading="Coding Hours" icon={faClock} text="Total Coding Hours" subText={"hrs"} />
   
        <ChartComponent />
        <CardOne stat={mostUsedLanguage.name} text={`${mostUsedLanguage.hours} hours coded`} icon={faJs} heading="Top Language" subText={""} />
        <CardOne stat={bestDay.date} text={`${bestDay.hours} hours coded`} icon={faCalendarDay} heading="Best Day" subText={""}/>
      </div>
    </div>
  );
}


function CardOne({stat, text, icon, heading, subText}) {
  return (
    <div className="bg-gradient-to-tr from-neutral-900 to-gray-700 w-[15rem] h-[12rem] rounded-lg p-4 flex justify-between flex-col">
      <div>
        <p className="text-white font-nunito text-[1rem]">{heading}</p>
      </div>
      <div>
        <FontAwesomeIcon icon={icon} className="text-3xl text-white" />
        <p className="text-[#f9e733] font-nunito text-[1.7rem] font-bold">
          {stat}{" "} {subText}
        </p>
        <p className="text-gray-400 font-nunito text-[1rem]">{text}</p>
      </div>
    </div>
  );
}



// export function GithubStats() {
//   return (
//     <div className="flex flex-col w-full space-y-3 rounded-lg p-4">
//       <h1 className="text-white font-nunito font-bold text-[1.2rem]">
//         Github Stats
//       </h1>
//       <div className="flex space-x-4 justify-between">
//         <GithubCardTwo />
//         <GithubCardOne />
//       </div>
//     </div>
//   );
// }

// function GithubCardTwo() {
//   return (
//     <div className="bg-gradient-to-tr from-neutral-900 to-gray-700 w-1/2 h-[17rem] rounded-lg p-4 flex justify-between flex-col">
//       <p className="text-white font-nunito text-[1rem]">Top Language</p>
//       <div>
//         <FontAwesomeIcon icon={faJs} className="text-3xl text-white" />
//         <p className="text-[#fbd332] font-nunito text-[1.4rem] font-bold">
//           JavaScript
//         </p>
//         <p className="text-gray-400 font-nunito text-[1rem]">2 hrs 30 mins</p>
//       </div>
//     </div>
//   );
// }

// function GithubCardOne() {
//   return (
//     <div className="bg-gradient-to-tr from-neutral-900 to-gray-700 w-1/2 h-[17rem] rounded-lg p-4 flex justify-between flex-col">
//       <p className="text-white font-nunito text-[1rem]">Top Language</p>
//       <div>
//         <FontAwesomeIcon icon={faJs} className="text-3xl text-white" />
//         <p className="text-[#fbd332] font-nunito text-[1.4rem] font-bold">
//           JavaScript
//         </p>
//         <p className="text-gray-400 font-nunito text-[1rem]">2 hrs 30 mins</p>
//       </div>
//     </div>
//   );
// }

function RefreshButton({ onrefresh }) {
  return (
    <button
      className=" p-2 rounded-lg font-nunito text-white"
      onClick={onrefresh}
    >
      <FontAwesomeIcon icon={faArrowsRotate} />
    </button>
  );
}


function ChartComponent() {
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    axios
      .get('https://wakatime.com/share/@awindsr/ef43d203-f742-4329-813e-451877e89565.json')
      .then(response => {
        const data = response.data.data;

        // Sort data by hours in descending order and take the top 10
        const top10Data = data.sort((a, b) => b.hours - a.hours).slice(0, 10);

        const labels = top10Data.map(item => item.name);
        const hours = top10Data.map(item => item.hours);
        
        
        

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Hours',
              data: hours,
              borderColor: 'rgb(251, 211, 50)',
              borderWidth: 2,
              fill: {
                target: 'origin',
                above: 'rgba(155, 197, 252, 0.1)',
              },
              // fill: true,
              // backgroundColor: "rgba(8, 162, 235, 0.5)",
            },
          ],
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };
  // Chart.register(Chart.filler);

  return (
    <div className="bg-gradient-to-tr from-neutral-900 to-gray-700 w-[40rem] h-[12rem] rounded-lg p-4 flex justify-between flex-col">
      <p className="text-white font-nunito text-[1rem]">Top Language Chart</p>
      {chartData ? (
        <div className="flex-grow">
          <Line ref={chartRef} data={chartData} options={options} />
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};