#!/bin/bash
# Para resolver o mistério, realizei os seguintes passos:
# Procurei pelas linhas contendo a palavra CLUE no crimescene
# Procurei informações sobre pessoal com Annabel no nome
# Procurei quem possuia um carro Honda, com cor azul e tinha
# altura maior que 6' e placa começando por L337
# Cheguei que um possível assassino seria o Jeremy Bowers
# Fui procurar outros suspeitos verificando quais pessoas eram
# associadas aos grupos descritos na segunda pista do crimescene
# Crirei um arquivo contendo o nome de todas as pessoas que pertenciam
# a esses grupos, usei o comando sort para agrupar por nome e usei o
# comando uniq -c para contar quntas vezes cada nome aparecia no arquivo.
# Filtei apenas os suspeitos que apareciam 4 vezes no arquivo.
# Dentre os suspeitos, o única que se encaixava perfeitamente era o Jeremy Bowers
echo "O assassino é Jeremy Bowers."
