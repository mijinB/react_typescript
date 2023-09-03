import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import { darkTheme, lightTheme } from "./theme";
// import ThemeModeButton from "./components/ThemeModeButton";

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
    box-sizing: border-box;
}
body {
    font-family: 'Source Sans 3', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
}
a {
    text-decoration: none;
    color: inherit;
}
`;

function Root() {
    /* const THEMEMODE_KEY = "toggletheme";

    const savedThemeMode = localStorage.getItem(THEMEMODE_KEY);
    const [themeMode, setThemeMode] = useState(savedThemeMode === "lightTheme" ? "darkTheme" : "lightTheme");
    const theme = themeMode === "lightTheme" ? lightTheme : darkTheme; */

    /**@function saveToLocalStorage
     * 1. localStorage에 themeMode data 저장
     */
    /* const saveToLocalStorage = () => {
        localStorage.setItem(THEMEMODE_KEY, themeMode);
    }; */

    /**@function clickEvent
     * 1. themeMode가 lightTheme인지 확인 후
     * 2. lightTheme이면, "darkTheme"을 themeMode 변수에 저장하고 saveToLocalStorage 함수 실행
     * 3. lightTheme아니면, "lightTheme"을 themeMode 변수에 저장하고 saveToLocalStorage 함수 실행
     */
    /* const clickEvent = () => {
        if (themeMode === "lightTheme") {
            setThemeMode("darkTheme");
            saveToLocalStorage();
        } else {
            setThemeMode("lightTheme");
            saveToLocalStorage();
        }
    }; */

    //study
    const [isDark, setIsDark] = useState(false);

    return (
        <>
            <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
                {/* <ThemeModeButton clickEvent={clickEvent} /> */}
                <GlobalStyle />
                {/* <Outlet context={{themeMode}} /> */}
                <Outlet />
                <ReactQueryDevtools initialIsOpen={true} />
            </ThemeProvider>
        </>
    );
}

export default Root;
