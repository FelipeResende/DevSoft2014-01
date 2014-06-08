function json(){
	$.getJSON('scraper/vagas.json', function (data) {

		// guarda total de links visitados
		total_anuncios = data.vagas.length;
		document.getElementById('TotalPags').innerHTML += total_anuncios;

		total_vagas = 0, branco = 0, validas = 0, duplicadas = 0;
		vagas_nao_branco = [];

		// conta vagas em branco e o numero de vagas
		for (i = 0; i < total_anuncios; i++)
		{
			if (data.vagas[i].NumeroVagas == '')
				branco++;
			else
			{
				vagas_nao_branco.push(data.vagas[i]);
				total_vagas += 1*data.vagas[i].NumeroVagas;
			}
		}
		document.getElementById('TotalVagas').innerHTML += total_vagas;
		document.getElementById('VagasEmBranco').innerHTML += branco;

		// conta vagas duplicadas (vagas seguidas uma da outra que sao identicas)
		for (i = 0; i < vagas_nao_branco.length - 1; i++)
		{
			v_atual = vagas_nao_branco[i];
			v_prox = vagas_nao_branco[i + 1];
			if (v_atual.Habilitacao == v_prox.Habilitacao && 
					v_atual.Titulo == v_prox.Titulo && 
					v_atual.Empresa == v_prox.Empresa && 
					v_atual.Area == v_prox.Area && 
					v_atual.Descricao == v_prox.Descricao && 
					v_atual.Requisitos == v_prox.Requisitos && 
					v_atual.Beneficios == v_prox.Beneficios && 
					v_atual.Contatos == v_prox.Contatos && 
					v_atual.DataAnuncio == v_prox.DataAnuncio && 
					v_atual.DataValidade == v_prox.DataValidade && 
					v_atual.NumeroVagas == v_prox.NumeroVagas)
			{
				duplicadas += 1*v_atual.NumeroVagas;
			}
		}
		document.getElementById('VagasDuplicadas').innerHTML += duplicadas;
		validas = total_vagas - duplicadas;
		document.getElementById('VagasValidas').innerHTML += validas;
	});
};
function GerarGrafico() {
	$('#container').highcharts({
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false
		},
		title: {
			text: 'Vagas analisadas'
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
					style: {
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
					}
				}
			}
		},
		series: [{
			type: 'pie',
			name: 'Browser share',
			data: [
				['Em branco',       branco],
				{
					name: 'Válidas',
					y: validas,
					sliced: true,
					selected: true
				},
				['Duplicadas',    duplicadas]
			]
		}]
	});
};

$(document).ready(function (){
	$.ajaxSetup({
		async: false
	});
	var obj = new json();
	GerarGrafico();
});
