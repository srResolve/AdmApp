interface Props {
  products?: {
    name: string;
    quantity: number;
    value: number;
  }[];
  tasks: {
    name: string;
    quantity: number;
    value: number;
  }[];
}

export const paymentInformation = ({ products, tasks }: Props) => {
  const tasksValue = tasks.reduce((accumulator, service) => {
    return accumulator + service.value;
  }, 0);

  const productValue = products
    ? products.reduce((accumulator, product) => {
        return accumulator + product.value;
      }, 0)
    : 0;

  return `
    <table
    style="border-collapse: collapse; width: 100%;"
    cellspacing="0"
  >
    <tr style="height: 60pt">
      <td style="width: 43pt" bgcolor="#F6F6F6">
        <p
          class="s4"
          style="
            padding-top: 3pt;
            padding-left: 4pt;
            padding-right: 2pt;
            text-indent: 0pt;
            line-height: 174%;
            text-align: justify;
          "
        >
          Serviços Materiais <b>Subtotal</b>
        </p>
       
      </td>
      <td style="width: 150pt; align-items:end; " bgcolor="#F6F6F6">
        <p
          class="s4"
          style="
            padding-right: 3pt;
            padding-top: 3pt;
            text-indent: 0pt;
            text-align: right;
          "
        >
          ${tasksValue.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
        <p
          class="s4"
          style="
            padding-top: 7pt;
            padding-right: 3pt;
            text-indent: 0pt;
            text-align: right;
          "
        >
          ${productValue.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
        <p
          class="s3"
          style="
            padding-top: 7pt;
            text-indent: 0pt;
            padding-right: 3pt;
            text-align: right;
          "
        >
         ${(tasksValue + productValue).toLocaleString('pt-br', {
           style: 'currency',
           currency: 'BRL',
         })}
        </p>
      </td>
    </tr>
    <tr style="height: 19pt">
      <td style="width: 43pt" bgcolor="#E3E3E3">
        <p
          class="s3"
          style="
            padding-top: 3pt;
            padding-left: 4pt;
            text-indent: 0pt;
            text-align: left;
          "
        >
          Total
        </p>
      </td>
      <td style="width: 198pt" colspan="3" bgcolor="#E3E3E3">
        <p
          class="s3"
          style="
            padding-top: 3pt;
            padding-right: 3pt;
            text-indent: 0pt;
            text-align: right;
          "
        >
        ${(tasksValue + productValue).toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}
        </p>
      </td>
    </tr>
  </table>
    `;
};
