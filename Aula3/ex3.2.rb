def fatorial n
	return 1 if [1].include? n
	n * fatorial(n - 1)
end
puts fatorial 20
