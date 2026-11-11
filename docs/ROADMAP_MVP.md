# Roadmap do MVP

## 1. Estratégia

O MVP será desenvolvido por fases pequenas e homologáveis. A primeira experiência funcional será uma fatia vertical completa entre Estudo e Praticar, antes da reconstrução ampla das ferramentas do Piloto.

Cada fase deverá ter escopo, critérios de aceitação, testes direcionados e homologação antes do avanço.

## 2. Fases

### F0 — Fundação técnica

**Entregas**

- React, TypeScript e Vite;
- estrutura modular;
- testes;
- tokens iniciais do design system;
- rotas de Estudo e Praticar;
- publicação automática no GitHub Pages.

**Aprovação**

- build sem erros;
- site publicado;
- navegação básica em desktop e celular;
- ausência de dependências desnecessárias.

### F1 — Experiência vertical: Intervalos na guitarra

**Entregas**

- uma lição completa;
- explicação curta;
- visualização de intervalos no braço;
- demonstração sonora;
- aplicação guiada;
- recuperação ativa;
- passagem para Praticar preservando o contexto.

**Aprovação**

- conceito pode ser visto, ouvido e aplicado;
- Estudo e Praticar compartilham tom e exercício;
- interface responsiva e acessível;
- experiência compreensível sem instruções externas.

### F2 — Núcleo musical

**Entregas**

- notas;
- intervalos;
- grafia enarmônica;
- formação de acordes;
- escalas;
- campo harmônico;
- afinações previstas.

**Aprovação**

- funções puras e independentes da interface;
- testes nos 12 tons;
- comportamento musical documentado;
- divergências do Piloto resolvidas antes da reutilização.

### F3 — Braço e escalas

**Entregas**

- 22 casas e cordas soltas;
- notas, graus e dedos;
- mapa completo;
- CAGED;
- 3NPS;
- pentatônicas;
- conexões entre shapes;
- tablatura e reprodução.

**Aprovação**

- precisão musical;
- uso confortável em desktop e celular;
- ausência de controles excessivos na entrada;
- carregamento independente de ferramentas não utilizadas.

### F4 — Harmonia

**Entregas**

- dicionário de acordes;
- tríades e tétrades;
- inversões essenciais;
- campo harmônico;
- funções;
- progressões;
- sincronização com o braço.

**Aprovação**

- acordes corretos nos 12 tons;
- grafia coerente;
- funções explicadas sem simplificações enganosas;
- seleção refletida no braço e no áudio.

### F5 — Tocar junto

**Entregas**

- metrônomo;
- transporte;
- BPM;
- acompanhamento harmônico;
- baixo;
- bateria;
- mixer progressivo;
- áudio carregado sob demanda.

**Aprovação**

- reprodução estável;
- sincronização perceptiva entre canais;
- parada imediata confiável;
- carregamento e cache sem bloquear a interface;
- créditos e licenças preservados.

### F6 — Estudo e lançamento

**Entregas**

- diagnóstico opcional;
- mapa dos oito eixos;
- conjunto inicial de lições;
- links diretos para conteúdos e ferramentas;
- PWA;
- auditoria final do MVP.

**Aprovação**

- navegação livre;
- diagnóstico somente na sessão;
- acessibilidade por teclado;
- verificação visual em desktop e celular;
- desempenho aceitável;
- GitHub Pages estável.

## 3. Limites

O MVP valida arquitetura, aprendizagem e ferramentas centrais. Ele não exige conteúdo completo para todos os oito eixos.

Ficam fora:

- conta;
- backend;
- progresso permanente;
- sincronização entre dispositivos;
- violão;
- trilha de iniciante absoluto;
- gamificação;
- inteligência artificial no produto.

## 4. Regra de avanço

Uma fase só avança após:

1. implementação do escopo;
2. testes direcionados;
3. verificação visual e funcional;
4. correções necessárias;
5. homologação explícita.

Mudanças futuras não deverão reabrir fases homologadas sem evidência concreta de falha estrutural.
