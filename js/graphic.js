document.addEventListener('DOMContentLoaded', function () {
  var myChart1 = Highcharts.chart('container1', {
    chart: {
      type: 'areaspline',
      style: {
        fontFamily: 'Hero New',
      },
      styledMode: true,
      renderTo: 'chart',
    },
    navigation: {
      buttonOptions: {
        enabled: false,
      },
    },
    credits: {
      enabled: false,
    },
    title: {
      text: '',
      style: {
        color: '#333333',
        fontSize: '16px',
      },
    },

    xAxis: {
      labels: {
        style: {
          color: '#858EBD',
          fontSize: '14px',
          fontFamily: 'Hero New',
        },
      },
      categories: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    },

    yAxis: {
      gridLineColor: '#E5E7FE',
      gridLineDashStyle: 'longdash',
      opposite: true,
      title: {
        enabled: false,
      },
    },
    colors: [
      '#39A0FF',
      '#56F5FF',
      '#4B5EFF',
      '#7e57c2',
      '#5c6bc0',
      '#42a5f5',
      '#8d6e63',
      '#26a69a',
      '#66bb6a',
      '#ffa726',
      '#006064',
      '#4dd0e1',
      '#3949ab',
      '#7986cb',
      '#004d40',
      '#4db6ac',
      '#424242',
      '#78909c',
      '#4e342e',
      '#a1887f',
    ],
    plotOptions: {
      series: {
        pointPlacement: 'on',
      },
    },
    defs: {
      gradient0: {
        tagName: 'linearGradient',
        id: 'gradient-0',
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1,
        children: [
          {
            tagName: 'stop',
            offset: 0,
          },
          {
            tagName: 'stop',
            offset: 1,
          },
        ],
      },
      gradient1: {
        tagName: 'linearGradient',
        id: 'gradient-1',
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1,
        children: [
          {
            tagName: 'stop',
            offset: 0,
          },
          {
            tagName: 'stop',
            offset: 1,
          },
        ],
      },
      gradient2: {
        tagName: 'linearGradient',
        id: 'gradient-2',
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1,
        children: [
          {
            tagName: 'stop',
            offset: 0,
          },
          {
            tagName: 'stop',
            offset: 1,
          },
        ],
      },
      gradient3: {
        tagName: 'linearGradient',
        id: 'gradient-3',
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1,
        children: [
          {
            tagName: 'stop',
            offset: 0,
          },
          {
            tagName: 'stop',
            offset: 1,
          },
        ],
      },

      gradient4: {
        tagName: 'linearGradient',
        id: 'gradient-4',
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1,
        children: [
          {
            tagName: 'stop',
            offset: 0,
          },
          {
            tagName: 'stop',
            offset: 1,
          },
        ],
      },
      gradient5: {
        tagName: 'linearGradient',
        id: 'gradient-5',
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1,
        children: [
          {
            tagName: 'stop',
            offset: 0,
          },
          {
            tagName: 'stop',
            offset: 1,
          },
        ],
      },
    },
    series: [
      {
        showInLegend: false,
        cursor: 'pointer',
        className: 'wave-first',
        allowPointSelect: true,
        data: [0, 1.5, 0.5, 2.5, 1.5, 5, 3.5, 4.5, 3, 3.5, 4.5, 5],
      },
      {
        showInLegend: false,
        cursor: 'pointer',
        allowPointSelect: true,
        className: 'wave-second',
        data: [0, 2, 1, 3, 2, 6.5, 4, 5, 3.5, 4, 5, 5.5],
      },
      {
        showInLegend: false,
        cursor: 'pointer',
        allowPointSelect: true,
        className: 'wave-third',
        data: [0, 2.5, 1.5, 3.5, 2.5, 7.5, 4.5, 5.5, 4, 4.5, 5.5, 6],
      },
    ],
  })
})
