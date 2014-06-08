function json(){
	$.getJSON('scraper/vagas.json', function (data) { 

		// arrays para guardar a quantidade de vagas em cada periodo
		vagas_quadrimestre = new Array(3);
		vagas_mensal = new Array(12);
		vagas_anual = new Array(7);

		// zera os contadores das vagas de cada periodo
		for (i = 0; i < vagas_quadrimestre.length; i++)
			vagas_quadrimestre[i] = 0;
		for (i = 0; i < vagas_mensal.length; i++)
			vagas_mensal[i] = 0;
		for (i = 0; i < vagas_anual.length; i++)
			vagas_anual[i] = 0;

		// conta vagas por quadrimestre
		for (i = 0; i < data.vagas.length; i++)
			vagas_quadrimestre[Math.floor((1*data.vagas[i].DataAnuncio.split("/")[1] - 1)/4)] += 1*data.vagas[i].NumeroVagas;

		// conta vagas por mes
		for (i = 0; i < data.vagas.length; i++)
			vagas_mensal[1*data.vagas[i].DataAnuncio.split("/")[1] - 1] += 1*data.vagas[i].NumeroVagas;

		// conta vagas por ano
		for (i = 0; i < data.vagas.length; i++)
			vagas_anual[1*data.vagas[i].DataAnuncio.split("/")[2] - 2008] += 1*data.vagas[i].NumeroVagas;

		// define o periodo quadrimestral como padrao
		$("#rbQuadrimestre").attr("checked", true);
		dist = vagas_quadrimestre;
		category = ['1º Quadrimestre', '2º Quadrimestre', '3º Quadrimestre'];

		// troca o tipo de periodo a ser exibido no grafico
		$("input[name=tipoPeriodo]").change(function() {
			if ($("#rbMês").is(":checked"))
			{
				dist = vagas_mensal;
				category = ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
				GerarGrafico();
			}
			else if($("#rbQuadrimestre").is(":checked"))
			{
				dist = vagas_quadrimestre;
				category = ['1º Quadrimestre', '2º Quadrimestre', '3º Quadrimestre'];
				GerarGrafico();
			}
			else if($("#rbAno").is(":checked"))
			{
				dist = vagas_anual;
				category = ['2008', '2009', '2010', '2011', '2012', '2013', '2014'];
				GerarGrafico();
			}
		});
	});
};

// Gera o grafico de colunas
function GerarGrafico() {
	$('#container').highcharts({
		chart: {
			type: 'column'
		},
		title: {
			text: 'Vagas por período'
		},
		subtitle: {
			text: 'De 01/05/2008 a 31/08/2014'
		},
		xAxis: {
			categories: category
		},
		yAxis: {
			title: {
				text: ''
			}
		},
		legend: {
			enabled: false
		},
		plotOptions: {
			series: {
				borderWidth: 0,
				dataLabels: {
					enabled: true,
					format: '{point.y}'
				}
			}
		},

		tooltip: {
			headerFormat: '<span style="font-size:11px">Vagas:</span><br>',
			pointFormat: '<span style="color:{point.color}">{point.name}</span><b>{point.y}</b><br/>'
		}, 

		series: [{
			name: 'Brands',
			colorByPoint: true,
			data: dist
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
