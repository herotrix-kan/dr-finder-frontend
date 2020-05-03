import { createGlobalStyle } from 'styles/styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: #9a9a9a;
    font-size: 12px;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }
  h1, h2, h3, h4, h5{
    color:#000;
  }
  h5{
    font-size:1rem;
    margin-top:0;
    margin-bottom:5px;
    font-weight:normal;
  }
  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5;
    color: #9a9a9a;
    margin-top:0;
  }
  p:last-child{
    margin-bottom:0;
  }
  a{
    text-decoration:none;
  }
`;

export default GlobalStyle;
