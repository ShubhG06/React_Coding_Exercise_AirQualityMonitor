import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Message } from 'semantic-ui-react';

const options = {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Air Quality Comparison'
  },
  xAxis: {
    categories: [],
    title: {
      text: null
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: '',
      align: 'high'
    },
    labels: {
      overflow: 'justify'
    }
  },
  tooltip: {
    valueSuffix: ''
  },
  plotOptions: {
    bar: {
      dataLabels: {
        enabled: true
      }
    }
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'top',
    x: -40,
    y: 80,
    floating: true,
    borderWidth: 1,
    backgroundColor:
      Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
    shadow: true
  },
  credits: {
    enabled: false
  }
};

const ComparisonInfo = ({ locationAInfo, locationBInfo }) => {
  const metricsASet = {};
  const metricsBSet = {};
  const dataPoints = [];

  options.xAxis.categories = [];

  locationAInfo.measurements.forEach(v => {
    metricsASet[v.parameter] = v.value;
  });

  locationBInfo.measurements.forEach(v => {
    if (typeof metricsASet[v.parameter] !== 'undefined') {
      options.xAxis.categories.push(`${v.parameter} (${v.unit})`);
      dataPoints.push(v.parameter);
      metricsBSet[v.parameter] = v.value;
    }
  });

  options.series = [{
    name: locationAInfo.city,
    data: []
  }, {
    name: locationBInfo.city,
    data: []
  }];

  dataPoints.forEach(point => {
    options.series[0].data.push(metricsASet[point]);
    options.series[1].data.push(metricsBSet[point]);
  });

  return dataPoints.length > 0 ? (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  ) : <Message>No data to compare</Message>;
};

export default ComparisonInfo;