interface Props {
  name: string;
  quantity: number;
  value: number;
}

export const pdfServicesAndProducts = (data: Props[]) => {
  let finalText = '';

  for (const item of data) {
    finalText += `
    <tr style="height: 29pt">
    <td
      style="
        width: 241pt;
        border-bottom-style: solid;
        border-bottom-width: 1pt;
        border-bottom-color: #f6f6f6;
      "
    >
      <p
        class="s3"
        style="
          padding-top: 3pt;
          padding-left: 4pt;
          padding-right: 4pt;
          text-indent: 0pt;
          text-align: left;
        "
      >
      ${item.name}
      </p>
    </td>
    <td
      style="
        width: 51pt;
        border-bottom-style: solid;
        border-bottom-width: 1pt;
        border-bottom-color: #f6f6f6;
      "
    >
      <br />
    </td>
    <td
      style="
        width: 82pt;
        border-bottom-style: solid;
        border-bottom-width: 1pt;
        border-bottom-color: #f6f6f6;
      "
    >
      <p
        class="s4"
        style="
          padding-top: 3pt;
          padding-right: 12pt;
          text-indent: 0pt;
          text-align: right;
        "
      >
        ${item.value.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </p>
    </td>
    <td
      style="
        width: 43pt;
        border-bottom-style: solid;
        border-bottom-width: 1pt;
        border-bottom-color: #f6f6f6;
      "
    >
      <p
        class="s4"
        style="
          padding-top: 3pt;
          padding-right: 7pt;
          text-indent: 0pt;
          text-align: right;
        "
      >
       ${item.quantity}
      </p>
    </td>
    <td
      style="
        width: 65pt;
        border-bottom-style: solid;
        border-bottom-width: 1pt;
        border-bottom-color: #f6f6f6;
      "
    >
      <p
        class="s4"
        style="
          padding-top: 3pt;
          padding-right: 3pt;
          text-indent: 0pt;
          text-align: right;
        "
      >
      ${(item.quantity * item.value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })}
      </p>
    </td>
  </tr>
</tr>
    `;
  }

  return finalText;
};
