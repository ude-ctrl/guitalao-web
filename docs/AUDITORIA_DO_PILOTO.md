# Auditoria do Piloto

## 1. Papel do Piloto

O arquivo Conservatório Digital V23 é uma referência funcional para o modo Praticar. Ele não será convertido diretamente nem usado como arquitetura definitiva.

Identificador da versão analisada:

- SHA-256: 8c0df53faa18b8b645ad2570e8addc54b16e690a9d6b907cd24c657ca8411b02
- Tamanho: 2.548.782 bytes
- Estrutura: HTML único com CSS, JavaScript, fontes e áudio incorporados.

## 2. Distribuição aproximada

| Parte | Tamanho | Participação |
|---|---:|---:|
| Bancos de áudio incorporados | 2,07 MB | 81,4% |
| Fontes incorporadas | 139 KB | 5,5% |
| JavaScript funcional | 191 KB | 7,5% |
| CSS | 99 KB | 3,9% |
| HTML e outros conteúdos | 45 KB | 1,7% |

O banco inclui 83 amostras:

- 17 de guitarra limpa;
- 17 de violão de nylon;
- 17 de piano;
- 12 de baixo;
- 20 de bateria.

## 3. Capacidades a preservar

- braço de 22 casas e cordas soltas;
- notas, graus e dedilhados;
- CAGED;
- 3NPS;
- cinco shapes pentatônicos;
- pentatônicas diagonais;
- mapa completo;
- conexão entre shapes;
- tablatura sincronizada;
- escalas, arpejos e campo harmônico;
- progressões em quatro compassos;
- metrônomo e controle de BPM;
- base com acordes, baixo e bateria;
- mixer por canal;
- sincronização entre braço, harmonia e áudio;
- temas e opções de acessibilidade;
- funcionamento offline como intenção de produto.

## 4. Problemas estruturais

- 146 funções nomeadas no módulo principal;
- 122 registros de eventos;
- 189 identificadores estáticos;
- 77 botões;
- 22 seletores;
- estado global mutável;
- manipulação direta e extensa do DOM;
- persistência ligada a IDs da interface;
- CSS acumulado de várias versões;
- recursos Base64 dentro do HTML;
- ausência de testes automatizados;
- mistura de teoria, áudio, interface e armazenamento.

## 5. Decisão de migração

Não converter o HTML automaticamente para React.

A reconstrução deverá:

1. extrair e validar regras musicais;
2. criar um domínio musical testável;
3. separar o motor de áudio;
4. reconstruir o braço como funcionalidade independente;
5. implementar harmonia e base por módulos;
6. carregar amostras de áudio sob demanda;
7. adicionar a experiência pedagógica ao redor das ferramentas.

## 6. Áudio e desempenho

Os áudios deverão ser arquivos independentes com manifesto de carregamento. Bancos serão carregados somente quando utilizados e poderão ser armazenados em cache pela PWA.

O piano poderá ser adiado ou opcional. Guitarra, baixo e bateria têm prioridade para o modo Praticar.

## 7. Licenças

Devem ser preservados e revisados antes da publicação:

- licença OFL da fonte Inter;
- atribuição do FluidR3 e da distribuição MIDI.js Soundfonts;
- atribuição e condições CC BY-SA 3.0 do Salamander Drumkit.

Os ativos licenciados ficarão separados do código e acompanhados por documentação própria.

## 8. Validação necessária

Antes de reutilizar algoritmos do Piloto, testar:

- shapes 3NPS;
- conexões diagonais;
- formas CAGED em todos os tons;
- grafia enarmônica;
- dedilhados sugeridos;
- compatibilidade entre escala e harmonia;
- sincronização de braço, tablatura e áudio.
