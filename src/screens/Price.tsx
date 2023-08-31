import { useOutletContext } from "react-router-dom";

interface PriceProps {
    coinId: string;
}

function Price() {
    const { coinId } = useOutletContext<PriceProps>();
    console.log(coinId);
    return <h1>Price</h1>;
}

export default Price;
