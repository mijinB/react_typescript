import { useOutletContext } from "react-router-dom";

interface ChartProps {
    coinId: string;
}

function Chart() {
    const { coinId } = useOutletContext<ChartProps>();
    console.log(coinId);

    return <h1>Chart</h1>;
}

export default Chart;
