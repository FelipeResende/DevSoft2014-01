function Buscar(){
	$.getJSON('scraper/vagas.json', function (data) {

		// concatena os campos onde serao realizadas as buscas
		resultado = [];
		for (i = 0; i < data.vagas.length; i++)
		{
			str_aux = '';
			if ($("#chkHabilitacao").is(":checked"))
				str_aux += data.vagas[i].Habilitacao;
			if ($("#chkEmpresa").is(":checked"))
				str_aux += data.vagas[i].Empresa;
			if ($("#chkDescricao").is(":checked"))
				str_aux += data.vagas[i].Descricao;
			if ($("#chkBenefícios").is(":checked"))
				str_aux += data.vagas[i].Benefícios;
			if ($("#chkNumVagas").is(":checked"))
				str_aux += data.vagas[i].NumeroVagas;
			if ($("#chkTitulo").is(":checked"))
				str_aux += data.vagas[i].Titulo;
			if ($("#chkArea").is(":checked"))
				str_aux += data.vagas[i].Area;
			if ($("#chkRequisitos").is(":checked"))
				str_aux += data.vagas[i].Requisitos;
			if ($("#chkContatos").is(":checked"))
				str_aux += data.vagas[i].Contatos;
			if(new RegExp($("#txtBusca").val(), "i").test(str_aux))
				resultado.push(data.vagas[i]);
		}

		// Exibe o resultado da busca
		var tam = resultado.length;
		$("#nVagas").text("Vagas encontradas: " + tam);
		if (1*tam < 50)
			{
				$(".lista-resultados").html("");
				for (i = 0; i < resultado.length; i++)
				{
					$(".lista-resultados").append("<br>");
					$(".lista-resultados").append("<span><h4>Vaga </h4>#"+ resultado[i].Vaga +"</span><br>");
					$(".lista-resultados").append("<span><h4>Habilitação:</h4> "+ resultado[i].Habilitacao +"</span><br>");
					$(".lista-resultados").append("<span><h4>Título:</h4> "+ resultado[i].Titulo +"</span><br>");
					$(".lista-resultados").append("<span><h4>Empresa:</h4> "+ resultado[i].Empresa +"</span><br>");
					$(".lista-resultados").append("<span><h4>Área de atuação:</h4> "+ resultado[i].Area +"</span><br>");
					$(".lista-resultados").append("<span><h4>Descrição:</h4> "+ resultado[i].Descricao +"</span><br>");
					$(".lista-resultados").append("<span><h4>Requisitos:</h4> "+ resultado[i].Requisitos +"</span><br>");
					$(".lista-resultados").append("<span><h4>Benefícios:</h4> "+ resultado[i].Beneficios +"</span><br>");
					$(".lista-resultados").append("<span><h4>Contatos:</h4> "+ resultado[i].Contatos +"</span><br>");
					$(".lista-resultados").append("<span><h4>Data do anúncio:</h4> "+ resultado[i].DataAnuncio +"</span><br>");
					$(".lista-resultados").append("<span><h4>Válido até:</h4> "+ resultado[i].DataValidade +"</span><br>");
					$(".lista-resultados").append("<span><h4>Número de vagas:</h4> "+ resultado[i].NumeroVagas +"</span><br>");
				}
			}
			else
				$(".lista-resultados").html("<br><span>Muitos resultados encontrados. Faça uma pesquisa para refinar os resultados.</span>");
	});
};
$(document).ready(function (){
	$.ajaxSetup({
		async: false
	});

	$("#btnBuscar").click(function(e) {

		e.preventDefault();

		var datainicial = new Date().getTime();
		Buscar();
		var datafinal = new Date().getTime();

		$("#tempo_busca").text("Tempo de busca: " + (datafinal - datainicial)/1000 + "s");
	});
});
