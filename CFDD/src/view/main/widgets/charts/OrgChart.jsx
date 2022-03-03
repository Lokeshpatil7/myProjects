import React, { useState } from "react";

import { Card, Row, Col, Button } from "antd";
import Chart from "react-apexcharts";

export default function OrgChart({ organizationCountByMonth }) {
  const data = {
    series: [
      {
        name: "Organizations Added",
        data: organizationCountByMonth,
      },
    ],
    options: {
      chart: {
        fontFamily: "Manrope, sans-serif",
        type: "bar",

        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
        },
      },
      labels: {
        style: {
          fontSize: "14px",
        },
      },

      dataLabels: {
        enabled: false,
      },

      grid: {
        borderColor: "#DFE6E9",
        row: {
          opacity: 0.5,
        },
      },
      fill: {
        opacity: 1,
        type: "solid",
      },
      stroke: {
        show: true,
        width: 2,
        curve: "straight",
        colors: ["transparent"],
      },
      xaxis: {
        axisTicks: {
          show: false,
          borderType: "solid",
          color: "#78909C",
          height: 6,
          offsetX: 0,
          offsetY: 0,
        },

        tickPlacement: "between",
        labels: {
          style: {
            colors: ["636E72"],
            fontSize: "14px",
          },
        },
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      legend: {
        horizontalAlign: "right",
        offsetX: 40,
        position: "top",
        markers: {
          radius: 12,
        },
      },
      colors: ["#4CA747"],

      yaxis: {
        labels: {
          style: {
            colors: ["636E72"],
            fontSize: "14px",
          },
        },
      },
    },
  };

  return (
    <Card className="da-border-color-black-40">
      <Row>
        <Col span={24}>
          <Row justify="space-between" align="top">
            <Col className="da-pb-16">
              <h4 className="da-mr-8">Organization</h4>
              <p className="da-badge-text"></p>
            </Col>

            {/* <Col>
              <DatePicker
                onChange={onChange}
                picker="week"
                defaultValue={moment("2019-06-03", "YYYY-MM-DD")}
              />
            </Col> */}
            {/* <Button type="secoundry">View details</Button> */}
          </Row>
        </Col>

        <Col span={24}>
          <div id="chart">
            <Chart
              options={data.options}
              series={data.series}
              type="bar"
              height={350}
              legend="legend"
            />
          </div>
        </Col>
      </Row>
    </Card>
  );
}
