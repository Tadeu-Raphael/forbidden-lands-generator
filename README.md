# Forbidden Lands Generator

Geradores de aldeias, masmorras e castelos para o G-City. As páginas compartilham o layout, a troca de idioma, a exportação em TXT, o registro das rolagens e os botões de rerrolagem por campo.

O `js/layout.js` monta o header e o footer sem requisições `fetch`, permitindo abrir as páginas diretamente por `file://`.

## Rolagens

- D66 é formado por dois D6: o primeiro indica a dezena e o segundo, a unidade.
- Paradas de dados somam os D6 e aplicam o modificador indicado depois da soma.
- O porte da aldeia, o tipo/porte do castelo e as faixas de idade usam os dados e faixas próprios das tabelas.
- O tamanho da masmorra determina a quantidade de salas: pequena `1D6`, média `3D6`, grande `4D6 + 10` e imensa `6D6 + 50`.
- A idade do castelo aplica o modificador correspondente à rolagem de condição. O tipo/porte define a fórmula da quantidade de novos ocupantes.
- Ao rerrolar o tamanho da masmorra, as salas são geradas novamente.

As descrições de resultados são textos originais inspirados nas categorias e mecânicas de geração do material de referência.