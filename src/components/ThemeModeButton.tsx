import { styled } from "styled-components";

const ThemeModeWrapper = styled.button`
    width: 80px;
    height: 50px;
    border: none;
    border-radius: 10px;
    background-color: red;
`;

interface IThemeMode {
    themeMode: string;
    clickEvent: React.MouseEventHandler<HTMLButtonElement>;
}

function ThemeModeButton({ themeMode, clickEvent }: IThemeMode) {
    return (
        <ThemeModeWrapper onClick={clickEvent}>
            {`${themeMode}` === "lightTheme" ? "light" : "dark"}
        </ThemeModeWrapper>
    );
}

export default ThemeModeButton;
