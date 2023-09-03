import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";
import { styled } from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

const Loader = styled.span`
    display: block;
    color: ${(props) => props.theme.textColor};
    font-weight: 600;
    text-align: center;
`;

/* interface ChartProps {
    themeMode: string;
    coinId: string;
} */
interface ChartProps {
    coinId: string;
}

interface IHistorical {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}

function Chart() {
    // const { themeMode, coinId } = useOutletContext<ChartProps>();
    const isDark = useRecoilValue(isDarkAtom);
    const { coinId } = useOutletContext<ChartProps>();
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));

    return (
        <div>
            {isLoading ? (
                <Loader>Loading chart...</Loader>
            ) : (
                <ApexCharts
                    type="candlestick"
                    series={[
                        {
                            data:
                                data?.map((price) => {
                                    return {
                                        x: new Date(price.time_close * 1000).toISOString(),
                                        y: [
                                            parseFloat(price.open),
                                            parseFloat(price.high),
                                            parseFloat(price.low),
                                            parseFloat(price.close),
                                        ],
                                    };
                                }) ?? [],
                        },
                    ]}
                    options={{
                        // theme: { mode: themeMode === "lightTheme" ? "light" : "dark" },
                        theme: { mode: !isDark ? "light" : "dark" },
                        chart: {
                            background: "transparent",
                            toolbar: { show: false },
                        },
                        plotOptions: {
                            candlestick: {
                                /* colors: {
                                    upward: themeMode === "lightTheme" ? "#22a6b3" : "#7ed6df",
                                    downward: themeMode === "lightTheme" ? "#eb4d4b" : "#ff7979",
                                }, */
                                colors: {
                                    upward: !isDark ? "#22a6b3" : "#7ed6df",
                                    downward: !isDark ? "#eb4d4b" : "#ff7979",
                                },
                            },
                        },
                        grid: { show: false },
                        xaxis: {
                            labels: { show: false },
                            axisTicks: { show: false },
                            axisBorder: { show: false },
                        },
                        yaxis: { show: false },
                    }}
                />
            )}
        </div>
    );
}

export default Chart;
