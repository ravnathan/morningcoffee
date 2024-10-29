import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts'; // Import ApexOptions for typing

export default function DailyChart() {
  const options: ApexOptions = {
    chart: {
      type: 'bar', // Set the type to 'bar' for a bar column chart
      height: 350,
    },
    title: {
      text: 'Sales Over the Years',
      align: 'center',
    },
    plotOptions: {
      bar: {
        horizontal: false, // Set to true for horizontal bars
        columnWidth: '55%', // Width of the columns
        // Remove endingShape property
      },
    },
    dataLabels: {
      enabled: true, // Enable data labels on the bars
    },
    series: [
      {
        name: 'Sales',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125], // Data for the bar chart
      },
    ],
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999], // Categories for the x-axis
    },
    yaxis: {
      title: {
        text: 'Sales', // Title for the y-axis
      },
    },
    grid: {
      borderColor: '#e0e0e0', // Color of the grid lines
    },
  };

  return (
    <div className="chart-container">
      <Chart options={options} series={options.series} type="bar" height={350} />
    </div>
  );
}
