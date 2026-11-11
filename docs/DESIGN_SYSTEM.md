# Design System

## 1. Base escolhida

A identidade parte do modelo Bossa Nova Lounge, adaptado de landing page para plataforma educacional e estúdio de guitarra.

A linguagem visual será musical, brasileira, elegante, acolhedora e discreta.

## 2. Dois ambientes, uma identidade

### Estudo

- fundo creme;
- leitura confortável;
- hierarquia editorial;
- conteúdo em coluna controlada;
- baixa densidade;
- distrações mínimas.

### Praticar

- fundo azul noturno;
- superfícies escuras;
- detalhes quentes;
- maior densidade funcional;
- controles musicais compactos;
- foco no braço e nos transportes.

## 3. Cores iniciais

| Token | Valor | Uso |
|---|---|---|
| Azul noturno | #1B2838 | fundo do modo Praticar e elementos principais |
| Dourado quente | #D4A574 | destaques e seleção |
| Creme suave | #FFF8E7 | fundo do modo Estudo |
| Marrom café | #3C2415 | texto quente e detalhes |
| Coral discreto | #E8735A | alertas e destaques limitados |
| Verde oliva | #6B7B3A | sucesso |
| Azul oceano | #2E6B8A | informação e foco |

As combinações finais deverão passar por teste de contraste WCAG.

## 4. Tipografia

- Cormorant Garamond: marca e títulos editoriais.
- Inter: corpo, lições, menus, botões e formulários.
- JetBrains Mono: BPM, notas, graus, tablatura, compassos e valores técnicos.

Fontes deverão ser carregadas em poucos pesos e com font-display swap.

## 5. Formas

- cartões: raio de 12 a 16 px;
- botões: raio de 10 a 12 px;
- indicadores curtos: formato pill;
- áreas técnicas: geometria mais precisa;
- alvos de toque: mínimo de 44 por 44 px.

O raio de 9999 px sugerido pelo modelo original não será usado em cartões.

## 6. Movimento

- transições entre 160 e 240 ms;
- animações apenas com transform e opacity sempre que possível;
- destaque sincronizado com áudio;
- pulsação musical discreta;
- respeito a prefers-reduced-motion;
- sem WebGL no MVP;
- sem partículas ou notas decorativas permanentes;
- sem movimento que concorra com a aprendizagem.

## 7. Componentes essenciais

- alternador Estudo e Praticar;
- navegação global;
- cartões de competência;
- painel de diagnóstico;
- visualizador do braço;
- diagramas de acordes;
- transporte musical;
- controle de BPM;
- mixer progressivo;
- feedback de exercício;
- modal ou drawer acessível;
- estados de carregamento e erro.

## 8. Princípios de UX

- mostrar primeiro o essencial;
- revelar controles avançados sob demanda;
- manter consistência entre conceitos e cores;
- nunca depender apenas de cor;
- permitir teclado e leitor de tela;
- evitar rolagem horizontal, exceto no braço quando tecnicamente necessária;
- manter ações primárias visíveis;
- não misturar explicação longa com controles densos.

## 9. Desempenho visual

- SVG ou CSS para diagramas exatos;
- sem imagens decorativas pesadas no núcleo da aplicação;
- ícones consistentes;
- fontes e áudio com cache;
- carregamento preguiçoso das ferramentas;
- orçamento de animação limitado.
