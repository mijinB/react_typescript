import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";
import { styled } from "styled-components";

const Loader = styled.span`
    display: block;
    color: ${(props) => props.theme.textColor};
    font-weight: 600;
    text-align: center;
`;

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
    const { coinId } = useOutletContext<ChartProps>();
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));

    return (
        <div>
            {isLoading ? (
                <Loader>Loading chart...</Loader>
            ) : (
                <ApexCharts
                    type="line"
                    series={[
                        {
                            name: "Price",
                            data: data?.map((price) => parseFloat(price.close)) as number[],
                        },
                    ]}
                    options={{
                        theme: { mode: "dark" },
                        chart: {
                            background: "transparent",
                            toolbar: {
                                show: false,
                            },
                        },
                        stroke: {
                            curve: "smooth",
                            width: 5,
                        },
                        colors: ["#FD7272"],
                        fill: {
                            type: "gradient",
                            gradient: {
                                gradientToColors: ["#F8EFBA"],
                                stops: [0, 100],
                            },
                        },
                        tooltip: {
                            y: {
                                formatter: (value) => `$ ${value.toFixed(2)}`,
                            },
                        },
                        grid: { show: false },
                        xaxis: {
                            type: "datetime",
                            categories: data?.map((date) => new Date(date.time_close * 1000).toISOString()),
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
