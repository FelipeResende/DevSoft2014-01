# encoding:utf-8

require 'mechanize'
require 'json'

################################################
##           !USE YOUR CREDENTIALS            ##
################################################
USERNAME = '' # Use your username!
PASSWORD = '' # Use your password!

#
# Helper function that saves a HTML file on the html directory.
#
# @param [String] filename the name of the file to be saved.
# @param [String] body the body of the HTML file.
#
def save_json(filename, body)
  File.open("#{filename}.json", "w") do |f|
    f.write(body.force_encoding('utf-8'))
  end
end

mechanize = Mechanize.new
mechanize.user_agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.131 Safari/537.36"

mechanize.get('http://estagios.pcs.usp.br/')
mechanize.get('http://estagios.pcs.usp.br/semLogin/login.aspx')

#save_json('before_login', mechanize.page.body)

form = mechanize.page.forms[0]

headers = {
  'Host' => 'estagios.pcs.usp.br',
  'Connection'      => 'keep-alive',
  'Cache-Control'   => 'max-age=0',
  'Accept'          => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Origin'          => 'http://estagios.pcs.usp.br',
  'Content-Type'    => 'application/x-www-form-urlencoded',
  'Referer'         => 'http://estagios.pcs.usp.br/semLogin/login.aspx',
  'Accept-Encoding' => 'gzip,deflate,sdch',
  'Accept-Language' => 'en-US,en;q=0.8,pt;q=0.6,de;q=0.4'
}

params = {
  '__EVENTTARGET'     => '',
  '__EVENTARGUMENT'   => '',
  '__VIEWSTATE'       => form.field_with(name: '__VIEWSTATE').value,
  '__EVENTVALIDATION' => form.field_with(name: '__EVENTVALIDATION').value,
  'ctl00$ContentPlaceHolder1$Login1$UserName'    => USERNAME,
  'ctl00$ContentPlaceHolder1$Login1$Password'    => PASSWORD,
  'ctl00$ContentPlaceHolder1$Login1$LoginButton' => 'Logar'
}

mechanize.post("http://estagios.pcs.usp.br/semLogin/login.aspx", params, headers)

#save_json('after_login', mechanize.page.body)

################################################
##         TODO: CONTINUE FROM HERE!          ##
################################################
lista_vagas = []

1500.times do |i|
	vagas = {}

	url = "http://estagios.pcs.usp.br/aluno/vagas/exibirVaga.aspx?id=#{i+1}"

	mechanize.get(url)

	doc = mechanize.page.parser

	vagas[:Vaga] = i+1
	
	selector = "#ContentPlaceHolder1_lblHabilitacao"

	vagas[:Habilitacao] = doc.css(selector).text

	selector = "#ContentPlaceHolder1_lblTitulo"

	vagas[:Titulo] = doc.css(selector).text

	selector = "#ContentPlaceHolder1_lblEmpresa"

	vagas[:Empresa] = doc.css(selector).text

	selector = "#ContentPlaceHolder1_lblArea"

	vagas[:Area] = doc.css(selector).text

	selector = "#ContentPlaceHolder1_lblDescricao"

	vagas[:Descricao] = doc.css(selector).text

	selector = "#ContentPlaceHolder1_lblRequisitos"

	vagas[:Requisitos] = doc.css(selector).text

	selector = "#ContentPlaceHolder1_lblBeneficios"

	vagas[:Beneficios] = doc.css(selector).text

	selector = "#ContentPlaceHolder1_lblContatos"

	vagas[:Contatos] = doc.css(selector).text

	selector = "#ContentPlaceHolder1_lblDataAnuncio"

	vagas[:DataAnuncio] = doc.css(selector).text

	selector = "#ContentPlaceHolder1_lblDataValidade"

	vagas[:DataValidade] = doc.css(selector).text

	selector = "#ContentPlaceHolder1_lblNumeroVagas"

	vagas[:NumeroVagas] = doc.css(selector).text

	lista_vagas << vagas
end
vagas = {}
vagas[:vagas] = lista_vagas[0, lista_vagas.length]
save_json("vagas", vagas.to_json)
