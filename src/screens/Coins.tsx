import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

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

const CoinsList = styled.ul``;

const Coin = styled.li`
    margin-bottom: 10px;
    border-radius: 15px;
    background-color: ${(props) => props.theme.boxColor};
    color: ${(props) => props.theme.textColor};
    a {
        display: flex;
        align-items: center;
        padding: 20px;
        border-radius: 15px;
        transition: all 0.25s ease-in;
    }
    &:hover {
        a {
            background-color: ${(props) => props.theme.primaryColor};
            color: ${(props) => props.theme.bgColor};
        }
    }
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

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

interface ICoin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

function Coins() {
    const isDark = useRecoilValue(isDarkAtom);
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

    /**@function toggleDarkAtom
     * 1. useSetRecoilState 함수를 이용해서 isDarkAtom 값 변경
     * 2. localStorage에 isDark 값 저장
     */
    const toggleDarkAtom = () => {
        setDarkAtom((prev) => !prev);
        localStorage.setItem("isdarkmode", `${!isDark}`);
    };

    return (
        <Container>
            <Helmet>
                <title>Coins</title>
            </Helmet>
            <Header>
                <Title>Coins</Title>
                <button onClick={toggleDarkAtom}>Toggle Mode</button>
            </Header>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <CoinsList>
                    {data?.slice(0, 100).map((coin) => (
                        <Coin key={coin.id}>
                            <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                                {coin.name} &rarr;
                            </Link>
                        </Coin>
                    ))}
                </CoinsList>
            )}
        </Container>
    );
}
export default Coins;
