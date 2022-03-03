import React, { useState } from "react";

import { Card, Row, Col } from "antd";
import Chart from "react-apexcharts";

export default function UtilityChart() {
  const [data] = useState({
    series: [98, 45, 35],
    options: {
      chart: {
        fontFamily: "Manrope, sans-serif",
        type: "donut",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      colors: ["#4CA747", "#FF904D", "#112037"],

      labels: ["Environmental", "Social", "Governance"],

      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "85%",
            labels: {
              show: true,
              name: {
                fontSize: "2rem",
              },
              value: {
                fontSize: "16px",
                formatter(val) {
                  return ` ${val}`;
                },
              },
              total: {
                show: true,
                fontSize: "16px",
                label: "Total",
                // formatter(w) {
                //   return `$ `;
                // },
                formatter: function (w) {
                  return ` ${w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0)}`;
                },
              },
            },
          },
        },
      },

      legend: {
        itemMargin: {
          horizontal: 24,
          vertical: 0,
        },
        horizontalAlign: "center",
        position: "bottom",
        fontSize: "14px",

        markers: {
          radius: 12,
        },
      },
    },
  });

  return (
    <Card className="da-border-color-black-40">
      <Row>
        <Col span={24}>
          <Row justify="space-between" align="top">
            <Col>
              <h4 className="da-mr-8">ESG</h4>
              <p className="da-badge-text"></p>
            </Col>

            {/*<Col>*/}
            {/*  <Dropdown overlay={menu} trigger={["click"]}>*/}
            {/*    <RiMoreFill size={24} onClick={(e) => e.preventDefault()} />*/}
            {/*  </Dropdown>*/}
            {/*</Col>*/}
          </Row>
        </Col>

        <Col span={24}>
          <div id="chart" className="da-donut-chart">
            <Chart
              options={data.options}
              series={data.series}
              type="donut"
              height={398}
              legend="legend"
            />
          </div>
        </Col>
      </Row>
    </Card>
  );
}
