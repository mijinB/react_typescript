import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    primaryColor: string;
    boxColor: string;
    contentText: string;
    contentLeft: string;
  }
}