export const pdfHead = `
    <head>
    <style type="text/css">
    * { print-color-adjust:exact !important; }
      * {
        margin: 0;
        padding: 0;
        text-indent: 0;
      }
  .wrapper {
          display: block;
          position: relative;
          align-items: center;
          height: calc(100% - 32px); 
          margin: 0;
          padding: 16px;
      }
      h2 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 12pt;
      }
      .p,
      p {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 9pt;
        margin: 0pt;
      }
      h1 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 14pt;
      }
      h3 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 9pt;
      }
      .s1 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 12pt;
      }
      .s2 {
        color: #636363;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 8pt;
      }
      .s3 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 9pt;
      }
      .s4 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 9pt;
      }
      table,
      tbody {
        vertical-align: top;
        overflow: visible;
      }
    </style>
  </head>
    `;
