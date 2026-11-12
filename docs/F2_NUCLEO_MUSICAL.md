# F2 — Núcleo musical

## Estado

Primeiro bloco implementado para revisão: notas, intervalos e grafia enarmônica. A F2 completa ainda exige formação de acordes, escalas, campo harmônico e afinações. A lição e o áudio homologados na F1 permanecem preservados.

## Convenções deste bloco

- Temperamento igual de 12 sons. Classe de altura: Dó = 0 até Si = 11.
- Letras internas científicas: C, D, E, F, G, A, B. Na interface, `formatNote` apresenta Dó, Ré, Mi, Fá, Sol, Lá, Si.
- Nota escrita é um par de letra e acidente. Não contém oitava nem registro MIDI. Dó♯ e Ré♭ são objetos diferentes, mesmo quando soam iguais.
- Acidentes aceitos: natural, sustenido, bemol, dobrado sustenido e dobrado bemol. Valores numéricos vão de -2 a 2.
- Funções são puras e independentes de React, DOM, áudio e armazenamento. Não há novas dependências.

## API

Em `src/music-domain/notes.ts`:

- `parseNote('C#')`: interpreta a grafia científica. Aceita também sinais musicais Unicode, caixa minúscula e espaços externos. Não interpreta solfejo, números de oitava nem acidentes mistos.
- `pitchClass(note)`: converte nota escrita para classe de altura de 0 a 11.
- `normalizePitchClass(value)`: reduz semitons inteiros positivos ou negativos ao ciclo de 12 alturas.
- `noteFromPitchClass(value, 'sharps' | 'flats')`: escolhe uma grafia simples para exibição sem contexto harmônico. A preferência é explícita; não deve substituir a transposição diatônica.
- `areEnharmonic(first, second)`: compara altura sonora sem comparar grafia.
- `formatNote(note, 'pt' | 'scientific')`: formata nome com sinais musicais; padrão português.

Em `src/music-domain/noteIntervals.ts`:

- `NOTE_INTERVALS`: uníssono, segundas e terças menores/maiores, quarta justa/aumentada, quinta diminuta/justa, sextas e sétimas menores/maiores e oitava justa.
- `transposeNote(note, intervalId)`: aplica intervalo ascendente, preservando a letra exigida pelo grau.
- `ascendingSemitones(from, to)`: distância cromática ascendente módulo 12, sem inferir registro ou qualidade diatônica.

## Exemplos de precisão musical

| Operação | Resultado | Motivo |
| --- | --- | --- |
| Dó♯ + terça maior | Mi♯ | Uma terça deve usar a terceira letra, Mi |
| Sol♭ + quarta justa | Dó♭ | Preserva a quarta letra e os cinco semitons |
| Sol♯ + sétima maior | Fá𝄪 | A sétima deve usar Fá, sem simplificar para Sol |
| Dó + quarta aumentada | Fá♯ | Quarta = letra Fá |
| Dó + quinta diminuta | Sol♭ | Quinta = letra Sol; mesma altura de Fá♯ |

`P8` registra 12 semitons, mas sua transposição retorna a mesma nota escrita porque este bloco não representa oitava. A distância entre notas enarmônicas é zero; ela não permite distinguir uníssono de oitava.

## Limites e erros

Este bloco cobre os intervalos ascendentes listados, até a oitava. Intervalos descendentes, compostos e outras qualidades não são inferidos nem convertidos silenciosamente.

Entradas inválidas geram `RangeError`. Uma transposição que exigiria acidente triplo também gera erro; o chamador deve escolher outra grafia de origem. Não é feita simplificação enarmônica automática que descaracterize o intervalo.

O motor da lição F1 (`intervals.ts`) usa índices relativos à sexta corda, com Mi na posição zero. Esses índices não são classes de altura baseadas em Dó. As APIs permanecem separadas para evitar confusão entre os dois referenciais.

## Validação

- Fixtures de terças e quintas com nomes esperados nos 12 tons.
- Todos os intervalos listados conferidos quanto à distância nos 12 tons.
- Grafia de cada intervalo a partir de Dó, incluindo distinção entre quarta aumentada e quinta diminuta.
- Casos com Mi♯, Si♯, Dó♭, Fá♭ e acidentes duplos.
- Normalização, entradas inválidas, limites de grafia e ausência de mutação dos argumentos.
- Testes de regressão da F1, lint e build de produção.

Como este bloco não altera a interface nem o áudio, sua validação é de domínio e regressão. A homologação final da F2 deve ocorrer após os demais blocos previstos no roadmap.
