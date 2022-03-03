import React, { useState } from "react";

import { Card, Row, Col, Button } from "antd";
import Chart from "react-apexcharts";

export default function ComplianceChart() {
  const [data] = useState({
    series: [
      {
        name: "Total Compliance",
        data: [
          28877, 29334, 33233, 36439, 32675, 32333, 33457, 38345, 36783, 39457,
          22459, 39840,
        ],
      },
      {
        name: "Pending Compliance",
        data: [
          12010, 11313, 14623, 18935, 17345, 13465, 17813, 19125, 16256, 20356,
          12233, 14570,
        ],
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
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 2,
          columnWidth: "45%",
          endingShape: "rounded",
        },
        colors: {
          backgroundBarColors: ["#eb7b5d", "#FF904D"],
        },
      },

      stroke: {
        show: true,
        width: 4,
        colors: ["transparent"],
      },
      xaxis: {
        axisTicks: {
          show: false,
          borderType: "solid",
          color: "#eb7b5d",
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
      yaxis: {
        labels: {
          style: {
            colors: ["636E72"],
            fontSize: "14px",
          },
          formatter: (value) => {
            return value / 1000 + "K";
          },
        },

        min: 0,
        max: 40000,
        tickAmount: 4,
      },
    },
  });

  const myarray = ["C", "A", "L", "P", "ESG", "T"];
  const [active, setActive] = useState("C");

  const LetterBox = ({ passLetter, green }) => {
    return (
      <Button
        onClick={(value) => setActive(value)}
        className={`${green ? "letterGreen" : "letterGray"}`}
      >
        {passLetter}
      </Button>
    );
  };

  return (
    <Card className="da-border-color-black-40">
      <Row span={24}>
        <Col span={2}>
          {/* <LetterBox onClick={() => setActive('C')} green passLetter='C' /> */}
          {myarray.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setActive(item);
                }}
              >
                <LetterBox passLetter={item} />
              </div>
            );
          })}
        </Col>

        {active === "C" ? (
          <Col span={22}>
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
        ) : active === "A" ? (
          "Data of A"
        ) : active === "L" ? (
          "Data of L"
        ) : active === "P" ? (
          "Data of P"
        ) : active === "ESG" ? (
          "Data of ESG"
        ) : active === "T" ? (
          "Data of T"
        ) : null}
        {/* <Col className="da-mb-16" span={24}>
          <Row justify="space-between">

            <Row justify='end'>
            <Button type="secoundry">View details</Button>
            </Row>
          </Row>
        </Col> */}
      </Row>
    </Card>
  );
}
