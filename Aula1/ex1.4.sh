#!/bin/sh
case ${1} in
	"ls") echo -e \
		"O comando ls é usado para listar os arquivos contidos em um diretório."\
		"\nAlgumas opções do comando ls são:"\
		"\n-a	lista também os arquivos ocultos."\
		"\n--color	aplica cores diferentes para pastas, arquivos e links."\
		"\n-l	mostra o arquivo com algumas informações extras.";;
	"ln") echo -e \
		"O comando ln é usado para criar um link para algum outro arquivo."\
		"\nA opção mais comum de ser usada junto com o ln é a opção -s, que "\
		"gera um link simbólico."\
		"\nExemplo:"\
		"\nln -s arquivo link_para_arquivo";;
	"pwd") echo -e \
		"O comando pwd é usado para mostrar o diretório atual do usuário,"\
		"ele mostra o caminho da pasta atual em relação à raiz (/).";;
	"chmod") echo -e \
		"O comando chmod é usado para alterar a permissão sobre um arquivo."\
		"\nAs permissões são do tipo escrita (w), leitura (r) e execução (x)."\
		"\nPara dar permissão de execução em um arquivo, basta digitar chmod +x arquivo"\
		"e para retirar a permissão de execução basta digitar chmod -x arquivo."\
		"\nO mesmo vale para as outras opções (w e r).";;
	"cat") echo -e \
		"O comando cat exibe o conteúdo de um arquivo na saída padrão (stdout)."\
		"\nTambém é possível redirecionar a saída do comando cat para um arquivo."\
		"\nOutra utilidade do cat é concatenar textos ou arquivos."\
		"\nExemplos:"\
		"\ncat arquivo.txt -- exibe o conteúdo de arquivos.txt na saída padrão (stdout)"\
		"\ncat arquivo1.txt > arquivo2.txt -- copia o conteúdo de arquivo1.txt para arquivo2.txt"\
		"caso arquivo2.txt já exista, o conteúdo anterior é perdido."\
		"\ncat arquivo1.txt >> arquivo2.txt -- copia o conteúdo de arquivo1.txt para arquivo2.txt"\
		"caso arquivo2.txt já exista, o conteúdo de arquivo1.txt é acrescentado no final de arquivo2.txt"\
		"\ncat arquivo1.txt arquivo2.txt > arquivo.txt -- concatena o conteúdo de arquivo1.txt"\
		"e arquivo2.txt em arquivo.txt";;
	"tail") echo -e \
		"O comando tail exibe por padrão as últimas 10 linhas de um arquivo."\
		"\nUtilizando a opção -n, é possível escolher a partir de qual linha"\
		"do arquivo será exibido."\
		"\nExemplos:"\
		"\ntail -n 15 arquivo.txt -- exibe as últimas 15 linhas de arquivo.txt."\
		"\ntail -n +15 arquivo.txt -- exibe as linhas a partir da linha 15 de arquivo.txt";;
	"head") echo -e \
		"O comando head exibe por padrão as primeiras 10 linhas de um arquivo."\
		"\nUtilizando a opção -n, é possível escolher até qual linha do arquivo"\
		"será exibido."\
		"\nExemplos:"\
		"\nhead -n 15 arquivo.txt -- exibe as primeiras 15 linhas de arquivo.txt"\
		"\nhead -n -15 arquivo.txt -- exibe o conteúdo de arquivo.txt, exceto as"\
		" 15 últimas linhas";;
	"sort") echo -e \
		"Ordena as linhas de um arquivo."\
		"\nAlgumas opções que podem ser usadas com esse comando são:"\
		"\n-d	Considera apenas caracteres alfanuméricos e espaços em branco."\
		"\n-o arquivo.txt	Redireciona a saída do comando para arquivo.txt.";;
	"grep") echo -e \
		"Pesquisa por um determinado padrão dentro de um arquivo e imprime as"\
		"linhas que contém o padrão."\
		"\nAlgumas opção do comando grep são:"\
		"\n-i	ignora diferenças entre maiúsculas e minúsculas."\
		"\n-v	retorna as linhas que não contém o padrão."\
		"\n-c	retorna o número de linhas que contém o padrão";;
	"rm") echo -e \
		"Remove arquivos e/ou diretórios."\
		"\nAlgumas opções do comando rm são:"\
		"\n-i	pede confirmação para cada arquivo a ser excluido."\
		"\n-r	remove arquivos de forma recursiva, é utilizado para"\
		"\n remover diretórios."\
		"\n-f	força a exclusão dos arquivos."\
		"\nExemplos:"\
		"\nrm -i arquivo.txt arquivo2.txt"\
		"\nrm -r Documentos/";;
	*) echo -e \
		"\nUsage: ./ex1.4.sh comando"\
		"\nEscolha algum dos seguintes comandos:"\
		"\nls, ln, pwd, chmod, cat, tail, head, sort, grep, rm";;
esac
