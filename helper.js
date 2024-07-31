function filtrarOcorrencias(paragrafo) {
  return Object.keys(paragrafo).filter((chave) => paragrafo[chave] > 1);
}

function montaSaidaArquivo(listaPalavras) {
  let textoFinal = "";
  listaPalavras.forEach((paragrafo, i) => {
    const duplicadas = filtrarOcorrencias(paragrafo).join(", ");
    textoFinal += `palavras duplicadas no parágrafo ${i + 1}: ${duplicadas}\n`;
  });

  return textoFinal;
}

export { montaSaidaArquivo };
