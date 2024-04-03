import { BudgetPdfCreate } from '../@types/types';
import { pdfHead } from './htmlParts/head';
import { pdfHeader } from './htmlParts/header';
import { paymentInformation } from './htmlParts/paymentInformation';
import { paymentOptions } from './htmlParts/paymentOptions';
import { pdfServicesAndProducts } from './htmlParts/servicesAndProducts';
import { pdfSignature } from './htmlParts/signature';
import { tableHeader } from './htmlParts/tableHeader';

export const htmlToPdf = `


`;

export const createPdf = (props: BudgetPdfCreate) => {
  return `
  <html>
  ${pdfHead}
  <body
    style="
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      justify-content: center;
    "
  >
  <div style=" margin-top:30px; display:flex; flex-direction:column; align-items:center;">
  ${pdfHeader(props)}
  <table
  style="border-collapse: collapse; margin-left: 5.69291pt"
  cellspacing="0"
>
  ${tableHeader('Serviços')}
  ${pdfServicesAndProducts(props.tasks)}
  
    ${props.product && props.product.length > 0 ? tableHeader('Materiais') : ''}
    ${pdfServicesAndProducts(props.product)}
  </table>

  </div>
  <div style="display:flex; flex-direction:column; align-items:center;">
  <div style=" display:flex; flex-direction:column; align-items:start; justify-content:space-between; width:100%;">
  <div  style=" width:100%; display:flex; margin-top:20px">
  ${paymentOptions}
  </div">
  ${paymentInformation(props)}
  </div>
  <div style="margin-top:50px; width:100%; align-items:center; justify-content:center; display:flex; flex-direction:column">
  ${pdfSignature}
  </div>
  </div>
  </body>
  </html>
    `;
};
