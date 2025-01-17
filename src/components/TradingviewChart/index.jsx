import React, { useState, useEffect, useRef } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { createChart } from "lightweight-charts";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { usePrevious } from "react-use";

dayjs.extend(utc);

export const CHART_TYPES = {
  BAR: "BAR",
  AREA: "AREA",
};

const Wrapper = () => {
  return <div className="relative"></div>;
};

const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

// using a currency library here in case we want to add more in future
var priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const formattedNum = (number, usd = false, acceptNegatives = false) => {
  if (isNaN(number) || number === "" || number === undefined) {
    return usd ? "0" : 0;
  }
  let num = parseFloat(number);

  if (num > 500000000) {
    return (usd ? "" : "") + toK(num.toFixed(0), true);
  }

  if (num === 0) {
    if (usd) {
      return "0";
    }
    return 0;
  }

  if (num < 0.0001 && num > 0) {
    return usd ? "< 0.0001" : "< 0.0001";
  }

  if (num > 1000) {
    return usd ? "" + Number(parseFloat(num).toFixed(0)).toLocaleString() : "" + Number(parseFloat(num).toFixed(0)).toLocaleString();
  }

  if (usd) {
    if (num < 0.1) {
      return "" + Number(parseFloat(num).toFixed(4));
    } else {
      let usdString = priceFormatter.format(num);
      return "" + usdString.slice(1, usdString.length);
    }
  }

  return Number(parseFloat(num).toFixed(5));
};

// constant height for charts
const HEIGHT = 300;

const TradingViewChart = ({ type = CHART_TYPES.BAR, data, base, baseChange, field, title, width, useWeekly = false }) => {
  // reference for DOM element to create with chart
  const ref = useRef();

  // pointer to the chart object
  const [chartCreated, setChartCreated] = useState(false);
  const dataPrev = usePrevious(data);

  useEffect(() => {
    if (data !== dataPrev && chartCreated && type === CHART_TYPES.BAR) {
      // remove the tooltip element
      let tooltip = document.getElementById("tooltip-id" + type);
      let node = document.getElementById("test-id" + type);
      node?.removeChild(tooltip);
      chartCreated.resize(0, 0);
      setChartCreated(true);
    }
  }, [chartCreated, data, dataPrev, type]);

  // parese the data and format for tardingview consumption
  const formattedData = data.map((entry) => {
    return {
      time: dayjs.unix(entry.date).utc().format("YYYY-MM-DD"),
      value: parseFloat(entry[field]),
    };
  });

  // adjust the scale based on the type of chart
  const topScale = type === CHART_TYPES.AREA ? 0.32 : 0.2;

  const darkMode = false;
  const textColor = darkMode ? "white" : "black";
  const previousTheme = usePrevious(darkMode);

  // reset the chart if them switches
  useEffect(() => {
    if (chartCreated && previousTheme !== darkMode) {
      // remove the tooltip element
      let tooltip = document.getElementById("tooltip-id" + type);
      let node = document.getElementById("test-id" + type);
      node?.removeChild(tooltip);
      chartCreated.resize(0, 0);
      setChartCreated(true);
    }
  }, [chartCreated, darkMode, previousTheme, type]);

  // if no chart created yet, create one with options and add to DOM manually
  useEffect(() => {
    if (!chartCreated && formattedData) {
      if (ref.current != undefined) {
        var chart = createChart(ref.current, {
          width: width,
          height: HEIGHT,
          layout: {
            backgroundColor: "transparent",
            textColor: textColor,
          },
          rightPriceScale: {
            scaleMargins: {
              top: topScale,
              bottom: 0,
            },
            borderVisible: false,
          },
          timeScale: {
            borderVisible: false,
          },
          grid: {
            horzLines: {
              color: "rgba(197, 203, 206, 0.5)",
              visible: false,
            },
            vertLines: {
              color: "rgba(197, 203, 206, 0.5)",
              visible: false,
            },
          },
          crosshair: {
            horzLine: {
              visible: false,
              labelVisible: false,
            },
            vertLine: {
              visible: true,
              style: 0,
              width: 2,
              color: "rgba(32, 38, 46, 0.1)",
              labelVisible: false,
            },
          },
          localization: {
            priceFormatter: (val) => formattedNum(val, true),
          },
        });

        var series =
          type === CHART_TYPES.BAR
            ? chart.addHistogramSeries({
                color: "#7CE0D6",
                priceFormat: {
                  type: "volume",
                },
                scaleMargins: {
                  top: 0.32,
                  bottom: 0,
                },
                lineColor: "#7CE0D6",
                lineWidth: 3,
              })
            : chart.addAreaSeries({
                topColor: "rgba(96, 165, 250, 0.8)", //blue-400
                bottomColor: "rgb(255, 255, 255)", //blue-200
                lineColor: "rgba(59, 130, 246, 0.9)", //blue-600
                lineWidth: 3,
              });

        series.setData(data);
        var toolTip = document.createElement("div");
        toolTip.setAttribute("id", "tooltip-id" + type);
        toolTip.className = darkMode ? "three-line-legend-dark" : "three-line-legend";
        ref.current?.appendChild(toolTip);
        toolTip.style.display = "block";
        toolTip.style.fontWeight = "500";
        toolTip.style.left = -4 + "px";
        toolTip.style.top = "-" + 8 + "px";
        toolTip.style.backgroundColor = "transparent";

        // format numbers
        let percentChange = baseChange;
        let formattedPercentChange = (percentChange > 0 ? "+" : "") + percentChange + "%";
        let color = percentChange >= 0 ? "green" : "red";

        // get the title of the chart
        function setLastBarText() {
          toolTip.innerHTML =
            `<div style="font-size: 16px; margin: 4px 0px; color: ${textColor};">${title} ${type === CHART_TYPES.BAR && !useWeekly ? "(24hr)" : ""}</div>` +
            `<div style="font-size: 22px; margin: 4px 0px; color:${textColor}" >` +
            formattedNum(base ?? 0, true) +
            `<span style="margin-left: 10px; font-size: 16px; color: ${color};">${formattedPercentChange}</span>` +
            "</div>";
        }
        setLastBarText();

        // update the title when hovering on the chart
        chart.subscribeCrosshairMove(function (param) {
          if (param === undefined || param.time === undefined || param.point.x < 0 || param.point.x > width || param.point.y < 0 || param.point.y > HEIGHT) {
            setLastBarText();
          } else {
            let dateStr = useWeekly
              ? dayjs(param.time.year + "-" + param.time.month + "-" + param.time.day)
                  .startOf("week")
                  .format("MMMM D, YYYY") +
                "-" +
                dayjs(param.time.year + "-" + param.time.month + "-" + param.time.day)
                  .endOf("week")
                  .format("MMMM D, YYYY")
              : dayjs(param.time.year + "-" + param.time.month + "-" + param.time.day).format("MMMM D, YYYY");
            var price = param.seriesPrices.get(series);

            toolTip.innerHTML =
              `<div style="font-size: 16px; margin: 4px 0px; color: ${textColor};">${title}</div>` +
              `<div style="font-size: 22px; margin: 4px 0px; color: ${textColor}">` +
              formattedNum(price, true) +
              "</div>" +
              "<div>" +
              dateStr +
              "</div>";
          }
        });

        chart.timeScale().fitContent();

        setChartCreated(chart);
      }
    }
  }, [base, baseChange, chartCreated, darkMode, data, formattedData, textColor, title, topScale, type, useWeekly, width]);

  // responsiveness
  useEffect(() => {
    if (width) {
      chartCreated && chartCreated.resize(width, HEIGHT);
      chartCreated && chartCreated.timeScale().scrollToPosition(0);
    }
  }, [chartCreated, width]);

  return (
    <div className="relative">
      <div ref={ref} id={"test-id" + type} />
      {/* <div className="absolute rounded-md w-10 h-10 flex justify-center items-center text-gray-600 hover:cursor-pointer bottom-0 right-0"></div>
      <div
        onClick={() => {
          chartCreated && chartCreated.timeScale().fitContent();
        }}
      >
        <AiOutlinePlayCircle size={20} />
      </div> */}
    </div>
  );
};

export default TradingViewChart;
