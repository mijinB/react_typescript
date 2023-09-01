import { styled } from "styled-components";

const ThemeModeWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 20px 40px;
`;

const ThemeModeToggle = styled.input.attrs({ id: "toggle", type: "checkbox" })`
    position: absolute;
    left: -10000px;
`;

const ThemeModeLabel = styled.label`
    display: block;
    position: relative;
    width: 60px;
    height: 33px;
    border-radius: 24px;
    background-color: ${props => props.theme.textColor};
    transition: all ease-out 0.5s;
    cursor: pointer;
    &::after {
        position: absolute;
        top: 3px;
        left: ${props => props.theme.contentLeft};
        color: ${props => props.theme.primaryColor};
        font-size: 23px;
        transition: all ease-out 0.5s;
        content: "${props => props.theme.contentText}";
    }
`;

interface IThemeMode {
    themeMode: string;
    clickEvent: React.MouseEventHandler<HTMLInputElement>;
}

function ThemeModeButton({ themeMode, clickEvent }: IThemeMode) {
    return (
        <ThemeModeWrapper>
            <ThemeModeToggle onClick={clickEvent} />
            <ThemeModeLabel htmlFor="toggle" />
        </ThemeModeWrapper>
    );
}

export default ThemeModeButton;
