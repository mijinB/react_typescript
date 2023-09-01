import { useOutletContext } from "react-router-dom";
import { styled } from "styled-components";

const OverviewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 23px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.boxColor};
    box-shadow: 0px 0px 0px 2px ${(props) => props.theme.primaryColor};
`;

const OverviewStrong = styled.span`
    display: flex;
    justify-content: center;
    margin-bottom: 18px;
    font-weight: 600;
`;

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 10px;
`;

const OverviewInnerBox = styled.div`
    margin-top: 14px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.accentColor};
`;

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100px;
    margin: 8px 0;
    color: ${(props) => props.theme.textColor};
    span:first-child {
        margin-bottom: 5px;
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
    }
`;

interface PriceProps {
    priceData: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
    };
}

function Price() {
    const { priceData } = useOutletContext<PriceProps>();

    return (
        <OverviewWrapper>
            <OverviewStrong>Price: ${priceData.price.toFixed(2)}</OverviewStrong>
            <Overview>
                <OverviewItem>
                    <span>ath date:</span>
                    <span>{new Date(`${priceData.ath_date}`).toLocaleDateString()}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>ath price:</span>
                    <span>${priceData.ath_price.toFixed(2)}</span>
                </OverviewItem>
            </Overview>
            <OverviewInnerBox>
                <Overview>
                    <OverviewItem>
                        <span>30m:</span>
                        <span>{priceData.percent_change_30m}%</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>1h:</span>
                        <span>{priceData.percent_change_1h}%</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>6h:</span>
                        <span>{priceData.percent_change_6h}%</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>12h:</span>
                        <span>{priceData.percent_change_12h}%</span>
                    </OverviewItem>
                </Overview>
                <Overview>
                    <OverviewItem>
                        <span>1d:</span>
                        <span>{priceData.percent_change_24h}%</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>7d:</span>
                        <span>{priceData.percent_change_7d}%</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>30d:</span>
                        <span>{priceData.percent_change_30d}%</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>1y:</span>
                        <span>{priceData.percent_change_1y}%</span>
                    </OverviewItem>
                </Overview>
            </OverviewInnerBox>
        </OverviewWrapper>
    );
}

export default Price;
