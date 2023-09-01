import { styled } from "styled-components";

const ThemeModeWrapper = styled.button`
    width: 80px;
    height: 50px;
    border: none;
    border-radius: 10px;
    background-color: red;
`;

interface ITheneMode {
    themeMode: string;
    clickEvent: React.MouseEventHandler<HTMLButtonElement>;
}

function ThemeModeButton({ themeMode, clickEvent }: ITheneMode) {
    return (
        <ThemeModeWrapper onClick={clickEvent}>
            {`${themeMode}` === "lightTheme" ? "light" : "dark"}
        </ThemeModeWrapper>
    );
}

export default ThemeModeButton;
