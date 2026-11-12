# Meu SiteGuitaLao

Nome técnico provisório de uma plataforma web para estudo e prática de guitarra.

## Proposta

A plataforma é destinada ao guitarrista autodidata que já consegue acompanhar cifras e tocar músicas simples, mas ainda não compreende de forma organizada teoria, braço, harmonia, escalas e improvisação.

O objetivo é transformar conhecimento fragmentado em autonomia musical: ver, ouvir, compreender e aplicar cada conceito diretamente na guitarra.

## Estrutura principal

- **Estudo:** diagnóstico opcional, mapa de lacunas, conteúdos guiados e navegação livre.
- **Praticar:** sessões de treino, braço e escalas, harmonia, dicionário de acordes e bases para tocar junto.

Não haverá conta, bloqueio de conteúdo ou acompanhamento permanente de progresso na primeira versão. O aluno poderá abrir qualquer conteúdo ou ferramenta diretamente.

## Público inicial

Guitarristas que:

- já leem cifras;
- conhecem acordes básicos;
- conseguem acompanhar músicas simples;
- estudaram assuntos isolados;
- sentem dificuldade para relacionar acordes, escalas e braço.

Uma trilha totalmente iniciante poderá ser adicionada futuramente dentro do modo Estudo.

## Direção técnica

Arquitetura planejada:

- React;
- TypeScript;
- Vite;
- GitHub Pages;
- PWA;
- áudio carregado sob demanda;
- preferências técnicas salvas apenas no dispositivo.

## Estado atual

F0 implementada e F1 disponível para homologação: lição interativa de intervalos, áudio sintetizado e prática com contexto compartilhado. Veja [validação da F1](docs/F1_INTERVALOS.md).

## Documentação

- [Visão do produto](docs/VISAO_DO_PRODUTO.md)
- [Arquitetura pedagógica](docs/ARQUITETURA_PEDAGOGICA.md)
- [Arquitetura técnica](docs/ARQUITETURA_TECNICA.md)
- [Auditoria do Piloto](docs/AUDITORIA_DO_PILOTO.md)
- [Design system](docs/DESIGN_SYSTEM.md)
- [Protocolo de desenvolvimento](docs/PROTOCOLO_DE_DESENVOLVIMENTO.md)
- [Roadmap do MVP](docs/ROADMAP_MVP.md)

## Executar e validar

Requer Node 24.

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm test
npm run build
```

## Publicação

Em Settings → Pages, selecione GitHub Actions como fonte. O workflow de publicação valida e publica a branch `main`. Caminho público configurado: `/guitalao-web/`.
