import moment from 'moment';

interface Props {
  client: {
    name: string;
  };
  created_at: Date;
  referenceValue: number;
  due_date: Date;
  execution_period: number;
  observation: string;
}

export const pdfHeader = ({
  client,
  created_at,
  referenceValue,
  due_date,
  execution_period,
  observation,
}: Props) => {
  return `
    <img
    width="96"
    height="34"
    src="data:image/jpg;base64,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"
  />
  <h2 style="padding-top: 3pt; text-indent: 0pt; text-align: center">
    Senhor Resolve
  </h2>
  <p style="padding-top: 3pt; text-indent: 0pt; text-align: center">
    TEM COISAS QUE SÓ O SENHOR RESOLVE!
  </p>
  <br />
  <h1
    style="
      padding-top: 3pt;
      padding-left: 4pt;
      text-indent: 0pt;
      text-align: left;
      width: 482pt;
      background-color: #f7f7f7;
    "
  >
    Orçamento ${referenceValue} - ${moment(created_at).format('YYYY')}
  </h1>
  <h3
    style="
      padding-top: 6pt;
      
      text-indent: 0pt;
      text-align: left;
      width: 482pt;
    "
  >
    Cliente: ${client.name}
  </h3>
  <br />
  <h2
    style="
      padding-top: 3pt;
      padding-left: 4pt;
      text-indent: 0pt;
      text-align: left;
      width: 482pt;
      background-color: #f7f7f7;
    "
  >
    Informações básicas
  </h2>
  <br />
  <div
    style="
      display: flex;
      align-items: top;
      justify-content: space-between;
      width: 482pt;
    "
  >
    <div>
      <h3 style=" text-indent: 0pt; text-align: left">
        Validade do orçamento
      </h3>
      <p style=" text-indent: 0pt; text-align: left">
        ${moment(due_date).diff(moment(), 'days')} dias
      </p>
    </div>
    <div>
      <h3
        style="
          padding-top: 3pt;
          
          text-indent: 0pt;
          text-align: left;
        "
      >
        Prazo de execução
      </h3>
      <p
        style="
          padding-top: 1pt;
          
          text-indent: 0pt;
          text-align: left;
        "
      >
        ${execution_period} dias
      </p>
    </div>
    <div></div>
  </div>
  <h3
    style="
      text-indent: 0pt;
      text-align: left;
      width: 482pt;
    "
  >
    Duração do serviço
  </h3>
  <p
    style="
      padding-top: 1pt;
      text-indent: 0pt;
      line-height: 10pt;
      text-align: left;
      width: 482pt;
    "
  >
    Inicio imediato
  </p>
  <p
    style="
      text-indent: 0pt;
      text-align: left;
      width: 482pt;
    "
  >
    ${execution_period} dias para entrega do serviço
  </p>
  ${
    observation &&
    observation !== '' &&
    `
    <h3
    style="
      text-indent: 0pt;
      text-align: left;
      width: 482pt;
    "
  >
    Observações
  </h3>
  <p
    style="
      text-align: left;
      width: 482pt;
      white-space: pre-line;
    "
  >
    ${observation}
  </p>    
    `
  }
    `;
};
