# F1 — Intervalos na guitarra

## Escopo implementado

Lição de terça maior (4 semitons) e quinta justa (7 semitons), com seleção de tônica nos 12 sons, recorte da sexta corda em afinação padrão, demonstração sintetizada, aplicação na guitarra e recuperação ativa com feedback.

O recorte usa uma única corda para tornar explícita a relação casa–semitom. Não antecipa o visualizador completo da F3. Os nomes da seleção identificam a tônica; a nota de destino é apresentada pelo grau, sem antecipar a grafia enarmônica da F2.

## Decisões

- Contexto compartilhado por parâmetros `tom` e `intervalo` na rota hash. Links diretos funcionam no GitHub Pages.
- Nenhum progresso armazenado. Respostas ficam apenas no componente.
- Domínio musical puro separado da interface e do áudio.
- Motor Web Audio incluído no bundle para criar e retomar o contexto diretamente no clique, com envelope curto e parada explícita; sem novas dependências. Nenhum contexto de áudio é criado antes da ação do usuário.
- Som sintetizado, sem pretensão de simular timbre de guitarra.

## Validação e homologação

Instalação reproduzível com Node 24 validada na base F0. Lint, testes de domínio nos 12 tons, integração de navegação, feedback e agendamento/parada de áudio, além de build de produção, devem passar antes da revisão.

A prévia gerenciada falhou com `relay could not open browser port 4173: timed out waiting for relay readiness`. Verificação visual em desktop/celular e audição em navegador permanecem pendentes. O teste automatizado de áudio verifica agendamento e cancelamento, não a qualidade percebida.

F1 implementada para revisão; ainda não homologada. Antes de encerrar a fase: conferir layout, teclado, áudio e exercício na guitarra, e obter homologação explícita conforme o roadmap. Publicação existente permanece pelo GitHub Pages; nenhuma hospedagem adicional foi criada.
