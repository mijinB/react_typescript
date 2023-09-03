import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { Link, Outlet, useLocation, useParams, useMatch } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

const Container = styled.div`
    max-width: 480px;
    padding: 0 20px;
    margin: 0 auto;
`;

const Header = styled.header`
    display: flex;
    justify-content: center;
    height: 10vh;
    margin: 46px 0 23px;
    align-items: center;
`;

const Title = styled.h1`
    color: ${(props) => props.theme.primaryColor};
    font-size: 48px;
    font-weight: 600;
`;

const Loader = styled.span`
    display: block;
    color: ${(props) => props.theme.textColor};
    font-weight: 600;
    text-align: center;
`;

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.primaryColor};
`;

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 33%;
    color: ${(props) => props.theme.bgColor};
    span:first-child {
        margin-bottom: 5px;
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
    }
`;

const Description = styled.p`
    margin: 20px 0px;
`;

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0;
    gap: 10px;
`;

const Tab = styled.span<{ $isActive: boolean }>`
    border-radius: 10px;
    background-color: ${(props) => props.theme.boxColor};
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    color: ${(props) => (props.$isActive ? props.theme.primaryColor : props.theme.textColor)};
    box-shadow: 0px 0px 0px 1px ${(props) => props.theme.textColor};
    a {
        display: block;
        padding: 7px 0;
        border-radius: 10px;
        font-weight: 600;
        transition: all 0.25s ease-in;
    }
    &:hover {
        a {
            background-color: ${(props) => props.theme.primaryColor};
            color: ${(props) => props.theme.bgColor};
        }
    }
`;

const HomeButton = styled.div`
    font-size: 32px;
`;

interface CoinProps {
    themeMode: string;
}

interface RouteState {
    state: {
        name: string;
    };
}

interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface TickersData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
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
    };
}

function Coin() {
    // const { themeMode } = useOutletContext<CoinProps>();
    const { coinId } = useParams();
    const { state } = useLocation() as RouteState;
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");
    const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(["info", coinId], () =>
        fetchCoinInfo(coinId)
    );
    const { isLoading: tickersLoading, data: tickersData } = useQuery<TickersData>(["tickers", coinId], () =>
        fetchCoinTickers(coinId)
    );
    const loading = infoLoading || tickersLoading;
    const priceData = tickersData?.quotes.USD;

    return (
        <Container>
            <Helmet>
                <title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</title>
            </Helmet>
            <HomeButton>
                <Link to={`/`}>👈</Link>
            </HomeButton>
            <Header>
                <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{infoData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>{infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>started at:</span>
                            <span>{new Date(`${infoData?.started_at}`).toLocaleDateString()}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{infoData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Supply:</span>
                            <span>{tickersData?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{tickersData?.max_supply}</span>
                        </OverviewItem>
                    </Overview>
                    <Tabs>
                        <Tab $isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}>Price</Link>
                        </Tab>
                        <Tab $isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>Chart</Link>
                        </Tab>
                    </Tabs>
                    {/* <Outlet context={{ themeMode, coinId, priceData }} /> */}
                    <Outlet context={{ coinId, priceData }} />
                </>
            )}
        </Container>
    );
}
export default Coin;
