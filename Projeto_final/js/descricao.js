function json(){
	$.getJSON('scraper/vagas.json', function (data) {
		desc = '';

		// palavras que serao desconsideradas na tagcloud
		desconsiderados = ["uma", "um", "como", "os", "é", "na", "no", "ano", "do", "conhecimento",
											"estar", "cursando", "ao", "por", "e", "a", "dos", "de", "o", "da", "para",
											"pelo", "quinto", "com", "quarto", "curso", "cursos", "das", "será", "em",
											"ou", "and", "que"];

		// concatena a descricao de todas as vagas
		for (i = 0; i < data.vagas.length; i++)
			if (data.vagas[i].Descricao != "")
				desc += data.vagas[i].Descricao + ' ';

		// troca os caracteres especiais por espaco e separa a string em um array
		var desc2 = desc.replace(/[:,-.\r\n\(\);\/]/gi, " ");
		spdesc = desc2.split(' ');

		// guarda a quantidade de ocorrencia de cada palavra em um objeto
		peso = {};
		for (i = 0; i < spdesc.length; i++)
			if (desconsiderados.indexOf(spdesc[i].toLowerCase()) < 0 && spdesc[i] != "")
					if (peso[spdesc[i]] != null)
						peso[spdesc[i]]++;
					else
						peso[spdesc[i]] = 1;

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
			$(".tag-cloud").prepend("<a href='' rel='" + arr_sort[i][1] + "'>" + arr_sort[i][0] + "</a> ");

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
		size: {start:14, end:22, unit: "pt"},
		color: {start: "#cde", end: "#f52"}
	};
	var obj = new json();
});
