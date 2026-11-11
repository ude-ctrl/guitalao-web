# Arquitetura Técnica

## 1. Objetivo

Definir uma fundação leve, previsível e modular para o MVP, evitando dependências e abstrações antes de existir necessidade comprovada.

## 2. Stack aprovada

- React;
- TypeScript em modo estrito;
- Vite;
- React Router;
- CSS Modules;
- variáveis CSS para tokens;
- Vitest;
- Testing Library;
- ESLint;
- Prettier;
- GitHub Actions;
- GitHub Pages.

A PWA será adicionada apenas na F6.

## 3. Navegação

O produto terá duas rotas principais:

- Estudo;
- Praticar.

A estratégia de rotas deverá funcionar diretamente no GitHub Pages. Para o MVP, priorizar robustez de navegação e links diretos sobre complexidade de servidor.

## 4. Estilos

- CSS Modules para estilos locais;
- variáveis CSS globais para cor, tipografia, espaçamento, raio e movimento;
- sem Tailwind;
- sem CSS-in-JS;
- sem framework completo de componentes;
- componentes compartilhados somente quando houver uso real em mais de um contexto.

## 5. Estado

- estado local por componente;
- Context e hooks para estados realmente compartilhados;
- serviços independentes para áudio e domínio musical;
- sem Redux, Zustand ou biblioteca equivalente na fundação;
- preferências técnicas locais apenas quando a funcionalidade exigir;
- sem armazenamento de progresso.

## 6. Organização inicial

- app: inicialização, rotas e shell;
- components: componentes compartilhados;
- features: funcionalidades por domínio de produto;
- music-domain: regras musicais puras;
- audio: motor e agendamento;
- content: conteúdo pedagógico estruturado;
- styles: tokens e estilos globais;
- test: configuração e utilitários de teste.

Diretórios sem uso não deverão ser criados apenas para antecipar o futuro.

## 7. Qualidade

A fundação deverá oferecer:

- TypeScript estrito;
- lint;
- formatação consistente;
- testes unitários;
- testes de componentes;
- build reproduzível;
- publicação automatizada;
- navegação por teclado;
- estados de foco visíveis;
- estrutura semântica.

## 8. GitHub Pages

- configurar o base path do Vite para o repositório;
- usar publicação por GitHub Actions;
- manter build e deploy separados;
- executar validações antes da publicação;
- não depender de backend;
- não incluir ativos pesados na F0.

## 9. Restrições da F0

A F0 não implementará:

- braço;
- teoria musical;
- áudio;
- diagnóstico;
- conteúdo definitivo;
- PWA;
- progresso;
- ferramentas do Piloto.

Ela entregará somente fundação, rotas, shell visual mínimo, testes e publicação.

## 10. Critérios de conclusão da F0

- instalação reproduzível;
- lint aprovado;
- testes aprovados;
- build aprovado;
- rotas Estudo e Praticar acessíveis;
- alternador entre modos;
- shell responsivo;
- design tokens iniciais;
- workflow de publicação configurado;
- documentação preservada;
- nenhuma funcionalidade fora do escopo.
