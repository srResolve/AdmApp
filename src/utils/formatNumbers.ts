export function formatNumber(number: string) {
  // Remove todos os caracteres não numéricos, exceto o sinal de +
  let justNumbers = number.replace(/[^\d+]/g, '');

  // Remove o código do país se presente (+55)
  if (justNumbers.startsWith('+55')) {
    justNumbers = justNumbers.substring(3);
  }

  if (justNumbers.startsWith('0')) {
    justNumbers = justNumbers.substring(3);
  }

  // Verifica se o DDD está presente; caso contrário, adiciona o '66' como padrão
  if (justNumbers.length === 8 || justNumbers.length === 9) {
    // Números com 8 ou 9 dígitos são considerados sem DDD
    justNumbers = '66' + justNumbers;
  }

  // Extrai o DDD e o número, considerando que o DDD pode ter 2 ou 3 dígitos
  // e o número pode ter 8 (fixo) ou 9 (móvel) dígitos após o DDD
  let ddd = justNumbers.substring(0, 2);
  let finalNumber = justNumbers.substring(2);

  // Formata o número para o padrão (DDD) NNNNN-NNNN
  // Nota: Esta abordagem assume que todos os números são móveis com 9 dígitos após o DDD,
  // que é o mais comum no Brasil atualmente.
  if (finalNumber.length === 9) {
    finalNumber = finalNumber.replace(/(\d{5})(\d{4})/, '$1-$2');
  } else if (finalNumber.length === 8) {
    // Para números fixos com 8 dígitos
    finalNumber = finalNumber.replace(/(\d{4})(\d{4})/, '$1-$2');
  }

  return `(${ddd}) ${finalNumber}`;
}
