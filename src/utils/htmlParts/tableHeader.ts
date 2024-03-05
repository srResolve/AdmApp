export const tableHeader = (title: string) => {
  return `
<tr style="height: 22pt">
        <td style="width: 241pt" bgcolor="#F6F6F6">
          <p
            class="s1"
            style="
              padding-top: 3pt;
              padding-left: 4pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            ${title}
          </p>
        </td>
        <td style="width: 241pt" colspan="4" bgcolor="#F6F6F6">
          <br />
        </td>
      </tr>
      <tr style="height: 21pt">
        <td style="width: 241pt">
          <p
            class="s2"
            style="
              padding-top: 7pt;
              padding-left: 4pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            Descrição
          </p>
        </td>
        <td style="width: 51pt">
          <p
            class="s2"
            style="
              padding-top: 7pt;
              padding-left: 4pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
            Unidade
          </p>
        </td>
        <td style="width: 82pt">
          <p
            class="s2"
            style="
              padding-top: 7pt;
              padding-right: 12pt;
              text-indent: 0pt;
              text-align: right;
            "
          >
            Preço unitário
          </p>
        </td>
        <td style="width: 43pt">
          <p
            class="s2"
            style="
              padding-top: 7pt;
              padding-right: 7pt;
              text-indent: 0pt;
              text-align: right;
            "
          >
            Qtd.
          </p>
        </td>
        <td style="width: 65pt">
          <p
            class="s2"
            style="
              padding-top: 7pt;
              padding-right: 4pt;
              text-indent: 0pt;
              text-align: right;
            "
          >
            Preço
          </p>
        </td>
      </tr>
`;
};
