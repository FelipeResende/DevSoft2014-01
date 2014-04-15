%% Ex 5.4
%% Implementar fatorial em Prolog.
fat(0, 1).
fat(1, 1).
fat(N, NF):-
	A is N, B is N - 1,
	fat (B, BF),
	NF is A * BF.
?- fat(10, X)
%% Exemplo de query:
%% ?- fat(10, X)
