import fs from "fs";
import path from "path";
import tratarErros from "./erros/funcoesErros.js";
import { contaPalavras } from "./index.js";
import { montaSaidaArquivo } from "./helper.js";
import { Command } from "Commander";
import chalk from "chalk";

const program = new Command();

program
  .version("0.0.1")
  .option("-t, --texto <string>", "caminho do texto a ser processado")
  .option(
    "-d, --destino <string>",
    "caminho da pasta onde salvar o arquivo de resultados"
  )
  .action((options) => {
    const { texto, destino } = options;
    if (!texto || !destino) {
      console.error("Error, por favor inserir caminho de origem e destino");
      program.help();
      return;
    }
    const caminhoTexto = path.resolve(texto);
    const caminhoDestino = path.resolve(destino);

    try {
      lerArquivo(caminhoTexto, caminhoDestino);
      console.log(chalk.green("texto lido com sucesso"));
    } catch (erro) {
      console.log("Ocorreu um erro no processamento", erro);
    }
  });

program.parse();

async function criaESalvaArquivo(listaPalavras, endereco) {
  const arquivoNovo = `${endereco}/resultado.txt`;
  const textoPalavras = montaSaidaArquivo(listaPalavras);
  try {
    await fs.promises.writeFile(arquivoNovo, textoPalavras);
    console.log("Arquivo Criado");
  } catch (erro) {
    throw erro;
  }
}

function lerArquivo(texto, destino) {
  fs.readFile(texto, "utf-8", (erro, texto) => {
    try {
      if (erro) throw erro;
      const resultado = contaPalavras(texto);
      criaESalvaArquivo(resultado, destino);
    } catch (erro) {
      console.log(tratarErros(erro));
    }
  });
}
