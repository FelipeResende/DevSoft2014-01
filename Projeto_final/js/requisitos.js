function json(){
	$.getJSON('scraper/vagas.json', function (data) {
		req = '';

		// palavras que serao desconsideradas na tagcloud
		desconsiderados = ["•", "bons", "ano", "do", "conhecimento", "conhecimentos", "estar", "cursando", "ao", "por", "e", "a",
											"dos", "de", "o", "da", "para", "pelo", "quinto", "com", "quarto", "curso", "cursos",
											"das", "será", "em", "ou", "and", "que"];

		// concatena os requisitos de todas as vagas
		for (i = 0; i < data.vagas.length; i++)
			if (data.vagas[i].Requisitos != "")
				req += data.vagas[i].Requisitos + ' ';

		// troca os caracteres especiais por espaco e separa a string em um array
		var req2 = req.replace(/[:,-.\r\n\(\);\/]/gi, " ");
		spreq = req2.split(' ');

		peso = {};

		// guarda a quantidade de ocorrencia de cada palavra em um objeto
		for (i = 0; i < spreq.length; i++)
			if (desconsiderados.indexOf(spreq[i].toLowerCase()) < 0 && spreq[i] != "")
					if (peso[spreq[i]] != null)
						peso[spreq[i]]++;
					else
						peso[spreq[i]] = 1;

		// guarda as palavras e o peso delas num array [palavra, peso]
		// e ordena o array
		var arr_sort = [];
		for (i in peso)
			arr_sort.push([i, peso[i]]);
		arr_sort.sort(function (a,b) { return b[1] - a[1] });

		// pega apenas as n palavras com maior peso e as "embaralha"
		n = 25;
		arr_sort = arr_sort.slice(0, n);
		arr_sort.sort(function () { return 0.5 - Math.random() });

		// preenche a div com as palavras da tagcloud
		for (i = 0; i < arr_sort.length; i++)
			$(".tag-cloud").append("<a href='' rel='" + arr_sort[i][1] + "'>" + arr_sort[i][0] + "</a> ");

		// preenche a div com as palavras nao consideradas na tagcloud
		for (i = 0; i < desconsiderados.length; i++)
			$(".desconsiderados").append("<span>" + desconsiderados[i] + "</span> ");

		// formata a tagcloud
		$(".tag-cloud a").tagcloud();
	});
};
$(document).ready(function (){
	$.ajaxSetup({
		async: false
	});
	$.fn.tagcloud.defaults = {
		size: {start:14, end:18, unit: "pt"},
		color: {start: "#cde", end: "#f52"}
	};
	var obj = new json();
});
