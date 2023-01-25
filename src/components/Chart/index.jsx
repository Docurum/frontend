import React, { useState, useMemo, useEffect, useRef } from "react";
import { ResponsiveContainer } from "recharts";
import { useMedia } from "react-use";
import TradingViewChart, { CHART_TYPES } from "../TradingviewChart";

const timeframeOptions = {
  WEEK: "1 week",
  MONTH: "1 month",
  // THREE_MONTHS: '3 months',
  // YEAR: '1 year',
  ALL_TIME: "All time",
};

const CHART_VIEW = {
  VOLUME: "Volume",
  LIQUIDITY: "Liquidity",
};

const VOLUME_WINDOW = {
  WEEKLY: "WEEKLY",
  DAYS: "DAYS",
};

export const toK = (num) => {
  return Numeral(num).format("0.[00]a");
};

const Chart = ({ display }) => {
  // chart options
  const [chartView, setChartView] = useState(display === "volume" ? CHART_VIEW.VOLUME : CHART_VIEW.LIQUIDITY);

  // time window and window size for chart
  const timeWindow = timeframeOptions.ALL_TIME;
  const [volumeWindow, setVolumeWindow] = useState(VOLUME_WINDOW.DAYS);

  // global historical data

  var dailyData = [
    { time: "2018-10-19", value: 26.19 },
    { time: "2018-10-22", value: 25.87 },
    { time: "2018-10-23", value: 25.83 },
    { time: "2018-10-24", value: 25.78 },
    { time: "2018-10-25", value: 25.82 },
    { time: "2018-10-26", value: 25.81 },
    { time: "2018-10-29", value: 25.82 },
    { time: "2018-10-30", value: 25.71 },
    { time: "2018-10-31", value: 25.82 },
    { time: "2018-11-01", value: 25.72 },
    { time: "2018-11-02", value: 25.74 },
    { time: "2018-11-05", value: 25.81 },
    { time: "2018-11-06", value: 25.75 },
    { time: "2018-11-07", value: 25.73 },
    { time: "2018-11-08", value: 25.75 },
    { time: "2018-11-09", value: 25.75 },
    { time: "2018-11-12", value: 25.76 },
    { time: "2018-11-13", value: 25.8 },
    { time: "2018-11-14", value: 25.77 },
    { time: "2018-11-15", value: 25.75 },
    { time: "2018-11-16", value: 25.75 },
    { time: "2018-11-19", value: 25.75 },
    { time: "2018-11-20", value: 25.72 },
    { time: "2018-11-21", value: 25.78 },
    { time: "2018-11-23", value: 25.72 },
    { time: "2018-11-26", value: 25.78 },
    { time: "2018-11-27", value: 25.85 },
    { time: "2018-11-28", value: 25.85 },
    { time: "2018-11-29", value: 25.55 },
    { time: "2018-11-30", value: 25.41 },
    { time: "2018-12-03", value: 25.41 },
    { time: "2018-12-04", value: 25.42 },
    { time: "2018-12-06", value: 25.33 },
    { time: "2018-12-07", value: 25.39 },
    { time: "2018-12-10", value: 25.32 },
    { time: "2018-12-11", value: 25.48 },
    { time: "2018-12-12", value: 25.39 },
    { time: "2018-12-13", value: 25.45 },
    { time: "2018-12-14", value: 25.52 },
    { time: "2018-12-17", value: 25.38 },
    { time: "2018-12-18", value: 25.36 },
    { time: "2018-12-19", value: 25.65 },
    { time: "2018-12-20", value: 25.7 },
    { time: "2018-12-21", value: 25.66 },
    { time: "2018-12-24", value: 25.66 },
    { time: "2018-12-26", value: 25.65 },
    { time: "2018-12-27", value: 25.66 },
    { time: "2018-12-28", value: 25.68 },
    { time: "2018-12-31", value: 25.77 },
    { time: "2019-01-02", value: 25.72 },
    { time: "2019-01-03", value: 25.69 },
    { time: "2019-01-04", value: 25.71 },
    { time: "2019-01-07", value: 25.72 },
    { time: "2019-01-08", value: 25.72 },
    { time: "2019-01-09", value: 25.66 },
    { time: "2019-01-10", value: 25.85 },
    { time: "2019-01-11", value: 25.92 },
    { time: "2019-01-14", value: 25.94 },
    { time: "2019-01-15", value: 25.95 },
    { time: "2019-01-16", value: 26.0 },
    { time: "2019-01-17", value: 25.99 },
    { time: "2019-01-18", value: 25.6 },
    { time: "2019-01-22", value: 25.81 },
    { time: "2019-01-23", value: 25.7 },
    { time: "2019-01-24", value: 25.74 },
    { time: "2019-01-25", value: 25.8 },
    { time: "2019-01-28", value: 25.83 },
    { time: "2019-01-29", value: 25.7 },
    { time: "2019-01-30", value: 25.78 },
    { time: "2019-01-31", value: 25.35 },
    { time: "2019-02-01", value: 25.6 },
    { time: "2019-02-04", value: 25.65 },
    { time: "2019-02-05", value: 25.73 },
    { time: "2019-02-06", value: 25.71 },
    { time: "2019-02-07", value: 25.71 },
    { time: "2019-02-08", value: 25.72 },
    { time: "2019-02-11", value: 25.76 },
    { time: "2019-02-12", value: 25.84 },
    { time: "2019-02-13", value: 25.85 },
    { time: "2019-02-14", value: 25.87 },
    { time: "2019-02-15", value: 25.89 },
    { time: "2019-02-19", value: 25.9 },
    { time: "2019-02-20", value: 25.92 },
    { time: "2019-02-21", value: 25.96 },
    { time: "2019-02-22", value: 26.0 },
    { time: "2019-02-25", value: 25.93 },
    { time: "2019-02-26", value: 25.92 },
    { time: "2019-02-27", value: 25.67 },
    { time: "2019-02-28", value: 25.79 },
    { time: "2019-03-01", value: 25.86 },
    { time: "2019-03-04", value: 25.94 },
    { time: "2019-03-05", value: 26.02 },
    { time: "2019-03-06", value: 25.95 },
    { time: "2019-03-07", value: 25.89 },
    { time: "2019-03-08", value: 25.94 },
    { time: "2019-03-11", value: 25.91 },
    { time: "2019-03-12", value: 25.92 },
    { time: "2019-03-13", value: 26.0 },
    { time: "2019-03-14", value: 26.05 },
    { time: "2019-03-15", value: 26.11 },
    { time: "2019-03-18", value: 26.1 },
    { time: "2019-03-19", value: 25.98 },
    { time: "2019-03-20", value: 26.11 },
    { time: "2019-03-21", value: 26.12 },
    { time: "2019-03-22", value: 25.88 },
    { time: "2019-03-25", value: 25.85 },
    { time: "2019-03-26", value: 25.72 },
    { time: "2019-03-27", value: 25.73 },
    { time: "2019-03-28", value: 25.8 },
    { time: "2019-03-29", value: 25.77 },
    { time: "2019-04-01", value: 26.06 },
    { time: "2019-04-02", value: 25.93 },
    { time: "2019-04-03", value: 25.95 },
    { time: "2019-04-04", value: 26.06 },
    { time: "2019-04-05", value: 26.16 },
    { time: "2019-04-08", value: 26.12 },
    { time: "2019-04-09", value: 26.07 },
    { time: "2019-04-10", value: 26.13 },
    { time: "2019-04-11", value: 26.04 },
    { time: "2019-04-12", value: 26.04 },
    { time: "2019-04-15", value: 26.05 },
    { time: "2019-04-16", value: 26.01 },
    { time: "2019-04-17", value: 26.09 },
    { time: "2019-04-18", value: 26.0 },
    { time: "2019-04-22", value: 26.0 },
    { time: "2019-04-23", value: 26.06 },
    { time: "2019-04-24", value: 26.0 },
    { time: "2019-04-25", value: 25.81 },
    { time: "2019-04-26", value: 25.88 },
    { time: "2019-04-29", value: 25.91 },
    { time: "2019-04-30", value: 25.9 },
    { time: "2019-05-01", value: 26.02 },
    { time: "2019-05-02", value: 25.97 },
    { time: "2019-05-03", value: 26.02 },
    { time: "2019-05-06", value: 26.03 },
    { time: "2019-05-07", value: 26.04 },
    { time: "2019-05-08", value: 26.05 },
    { time: "2019-05-09", value: 26.05 },
    { time: "2019-05-10", value: 26.08 },
    { time: "2019-05-13", value: 26.05 },
    { time: "2019-05-14", value: 26.01 },
    { time: "2019-05-15", value: 26.03 },
    { time: "2019-05-16", value: 26.14 },
    { time: "2019-05-17", value: 26.09 },
    { time: "2019-05-20", value: 26.01 },
    { time: "2019-05-21", value: 26.12 },
    { time: "2019-05-22", value: 26.15 },
    { time: "2019-05-23", value: 26.18 },
    { time: "2019-05-24", value: 26.16 },
    { time: "2019-05-28", value: 26.23 },
  ];

  var weeklyData = [
    { time: "2016-07-18", value: 26.1 },
    { time: "2016-07-25", value: 26.19 },
    { time: "2016-08-01", value: 26.24 },
    { time: "2016-08-08", value: 26.22 },
    { time: "2016-08-15", value: 25.98 },
    { time: "2016-08-22", value: 25.85 },
    { time: "2016-08-29", value: 25.98 },
    { time: "2016-09-05", value: 25.71 },
    { time: "2016-09-12", value: 25.84 },
    { time: "2016-09-19", value: 25.89 },
    { time: "2016-09-26", value: 25.65 },
    { time: "2016-10-03", value: 25.69 },
    { time: "2016-10-10", value: 25.67 },
    { time: "2016-10-17", value: 26.11 },
    { time: "2016-10-24", value: 25.8 },
    { time: "2016-10-31", value: 25.7 },
    { time: "2016-11-07", value: 25.4 },
    { time: "2016-11-14", value: 25.32 },
    { time: "2016-11-21", value: 25.48 },
    { time: "2016-11-28", value: 25.08 },
    { time: "2016-12-05", value: 25.06 },
    { time: "2016-12-12", value: 25.11 },
    { time: "2016-12-19", value: 25.34 },
    { time: "2016-12-26", value: 25.2 },
    { time: "2017-01-02", value: 25.33 },
    { time: "2017-01-09", value: 25.56 },
    { time: "2017-01-16", value: 25.32 },
    { time: "2017-01-23", value: 25.71 },
    { time: "2017-01-30", value: 25.85 },
    { time: "2017-02-06", value: 25.77 },
    { time: "2017-02-13", value: 25.94 },
    { time: "2017-02-20", value: 25.67 },
    { time: "2017-02-27", value: 25.6 },
    { time: "2017-03-06", value: 25.54 },
    { time: "2017-03-13", value: 25.84 },
    { time: "2017-03-20", value: 25.96 },
    { time: "2017-03-27", value: 25.9 },
    { time: "2017-04-03", value: 25.97 },
    { time: "2017-04-10", value: 26.0 },
    { time: "2017-04-17", value: 26.13 },
    { time: "2017-04-24", value: 26.02 },
    { time: "2017-05-01", value: 26.3 },
    { time: "2017-05-08", value: 26.27 },
    { time: "2017-05-15", value: 26.24 },
    { time: "2017-05-22", value: 26.02 },
    { time: "2017-05-29", value: 26.2 },
    { time: "2017-06-05", value: 26.12 },
    { time: "2017-06-12", value: 26.2 },
    { time: "2017-06-19", value: 26.46 },
    { time: "2017-06-26", value: 26.39 },
    { time: "2017-07-03", value: 26.52 },
    { time: "2017-07-10", value: 26.57 },
    { time: "2017-07-17", value: 26.65 },
    { time: "2017-07-24", value: 26.45 },
    { time: "2017-07-31", value: 26.37 },
    { time: "2017-08-07", value: 26.13 },
    { time: "2017-08-14", value: 26.21 },
    { time: "2017-08-21", value: 26.31 },
    { time: "2017-08-28", value: 26.33 },
    { time: "2017-09-04", value: 26.38 },
    { time: "2017-09-11", value: 26.38 },
    { time: "2017-09-18", value: 26.5 },
    { time: "2017-09-25", value: 26.39 },
    { time: "2017-10-02", value: 25.95 },
    { time: "2017-10-09", value: 26.15 },
    { time: "2017-10-16", value: 26.43 },
    { time: "2017-10-23", value: 26.22 },
    { time: "2017-10-30", value: 26.14 },
    { time: "2017-11-06", value: 26.08 },
    { time: "2017-11-13", value: 26.27 },
    { time: "2017-11-20", value: 26.3 },
    { time: "2017-11-27", value: 25.92 },
    { time: "2017-12-04", value: 26.1 },
    { time: "2017-12-11", value: 25.88 },
    { time: "2017-12-18", value: 25.82 },
    { time: "2017-12-25", value: 25.82 },
    { time: "2018-01-01", value: 25.81 },
    { time: "2018-01-08", value: 25.95 },
    { time: "2018-01-15", value: 26.03 },
    { time: "2018-01-22", value: 26.04 },
    { time: "2018-01-29", value: 25.96 },
    { time: "2018-02-05", value: 25.99 },
    { time: "2018-02-12", value: 26.0 },
    { time: "2018-02-19", value: 26.06 },
    { time: "2018-02-26", value: 25.77 },
    { time: "2018-03-05", value: 25.81 },
    { time: "2018-03-12", value: 25.88 },
    { time: "2018-03-19", value: 25.72 },
    { time: "2018-03-26", value: 25.75 },
    { time: "2018-04-02", value: 25.7 },
    { time: "2018-04-09", value: 25.73 },
    { time: "2018-04-16", value: 25.74 },
    { time: "2018-04-23", value: 25.69 },
    { time: "2018-04-30", value: 25.76 },
    { time: "2018-05-07", value: 25.89 },
    { time: "2018-05-14", value: 25.89 },
    { time: "2018-05-21", value: 26.0 },
    { time: "2018-05-28", value: 25.79 },
    { time: "2018-06-04", value: 26.11 },
    { time: "2018-06-11", value: 26.43 },
    { time: "2018-06-18", value: 26.3 },
    { time: "2018-06-25", value: 26.58 },
    { time: "2018-07-02", value: 26.33 },
    { time: "2018-07-09", value: 26.33 },
    { time: "2018-07-16", value: 26.32 },
    { time: "2018-07-23", value: 26.2 },
    { time: "2018-07-30", value: 26.03 },
    { time: "2018-08-06", value: 26.15 },
    { time: "2018-08-13", value: 26.17 },
    { time: "2018-08-20", value: 26.28 },
    { time: "2018-08-27", value: 25.86 },
    { time: "2018-09-03", value: 25.69 },
    { time: "2018-09-10", value: 25.69 },
    { time: "2018-09-17", value: 25.64 },
    { time: "2018-09-24", value: 25.67 },
    { time: "2018-10-01", value: 25.55 },
    { time: "2018-10-08", value: 25.59 },
    { time: "2018-10-15", value: 26.19 },
    { time: "2018-10-22", value: 25.81 },
    { time: "2018-10-29", value: 25.74 },
    { time: "2018-11-05", value: 25.75 },
    { time: "2018-11-12", value: 25.75 },
    { time: "2018-11-19", value: 25.72 },
    { time: "2018-11-26", value: 25.41 },
    { time: "2018-12-03", value: 25.39 },
    { time: "2018-12-10", value: 25.52 },
    { time: "2018-12-17", value: 25.66 },
    { time: "2018-12-24", value: 25.68 },
    { time: "2018-12-31", value: 25.71 },
    { time: "2019-01-07", value: 25.92 },
    { time: "2019-01-14", value: 25.6 },
    { time: "2019-01-21", value: 25.8 },
    { time: "2019-01-28", value: 25.6 },
    { time: "2019-02-04", value: 25.72 },
    { time: "2019-02-11", value: 25.89 },
    { time: "2019-02-18", value: 26.0 },
    { time: "2019-02-25", value: 25.86 },
    { time: "2019-03-04", value: 25.94 },
    { time: "2019-03-11", value: 26.11 },
    { time: "2019-03-18", value: 25.88 },
    { time: "2019-03-25", value: 25.77 },
    { time: "2019-04-01", value: 26.16 },
    { time: "2019-04-08", value: 26.04 },
    { time: "2019-04-15", value: 26.0 },
    { time: "2019-04-22", value: 25.88 },
    { time: "2019-04-29", value: 26.02 },
    { time: "2019-05-06", value: 26.08 },
    { time: "2019-05-13", value: 26.09 },
    { time: "2019-05-20", value: 26.16 },
    { time: "2019-05-27", value: 26.23 },
  ];
  const { totalLiquidityUSD, oneDayVolumeUSD, volumeChangeUSD, liquidityChangeUSD, oneWeekVolume, weeklyVolumeChange } = {
    totalLiquidityUSD: 173,
    oneDayVolumeUSD: 3.1,
    volumeChangeUSD: 4,
    liquidityChangeUSD: 7.3,
    oneWeekVolume: 31,
    weeklyVolumeChange: 13,
  };

  // based on window, get starttim
  let utcStartTime = "";

  const chartDataFiltered = useMemo(() => {
    let currentData = volumeWindow === VOLUME_WINDOW.DAYS ? dailyData : weeklyData;
    return (
      currentData &&
      Object.keys(currentData)
        ?.map((key) => {
          let item = currentData[key];
          if (item.date > utcStartTime) {
            return item;
          } else {
            return;
          }
        })
        .filter((item) => {
          return !!item;
        })
    );
  }, [utcStartTime, volumeWindow]);
  const below800 = useMedia("(max-width: 800px)");

  // update the width on a window resize
  const ref = useRef();
  const isClient = typeof window === "object";
  const [width, setWidth] = useState(ref?.current?.container?.clientWidth);
  useEffect(() => {
    if (!isClient) {
      return false;
    }
    function handleResize() {
      setWidth(ref?.current?.container?.clientWidth ?? width);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient, width]); // Empty array ensures that effect is only run on mount and unmount

  return (
    <>
      <div ref={ref}>
        <TradingViewChart data={weeklyData} base={totalLiquidityUSD} baseChange={liquidityChangeUSD} title="Reputation" field="totalLiquidityUSD" width={width} type={CHART_TYPES.AREA} />
      </div>
    </>
  );
};

export default Chart;
