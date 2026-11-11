# Protocolo de Desenvolvimento

## 1. Objetivos

Preservar precisão, qualidade, desempenho de aprendizagem, desempenho técnico e uso responsável dos recursos de IA.

## 2. Análise prévia obrigatória

Antes de cada etapa, informar:

- ambiente recomendado: Chat, Work ou Codex;
- modelo e nível de raciocínio adequados;
- arquivos que precisam ser lidos;
- risco e abrangência;
- critérios de conclusão.

## 3. Uso dos ambientes

- Chat: perguntas rápidas e comparação de ideias.
- Work: decisões, arquitetura, análise, conteúdo e documentação.
- Codex: código, testes, depuração, repositório e publicação.

## 4. Modelos

Quando disponíveis:

- Luna Low ou Sol Light: tarefas pequenas e mecânicas;
- GPT-6.1 Sol Medium: padrão para planejamento e implementação;
- Astra Light ou Medium: decisões críticas, áudio complexo e bugs persistentes;
- High, Extra High, Max ou Ultra: somente com justificativa explícita.

## 5. Leitura e contexto

- não reler arquivos aprovados sem evidência de problema;
- trabalhar por diferenças e módulos afetados;
- consultar documentos oficiais do projeto antes de conversas antigas;
- evitar despejar arquivos ou logs completos;
- abrir novo contexto quando o volume comprometer a precisão;
- avisar imediatamente sobre conflito ou perda de confiabilidade.

## 6. Implementação

- uma funcionalidade delimitada por execução;
- critérios de aceitação definidos antes do código;
- preservar alterações não relacionadas;
- não ampliar o escopo silenciosamente;
- manter teoria, áudio, interface, conteúdo e armazenamento separados;
- evitar dependências sem benefício comprovado;
- registrar decisões arquiteturais relevantes.

## 7. Validação

- testes unitários para regras musicais;
- testes de integração para sincronização;
- verificação visual em desktop e celular;
- acessibilidade por teclado e contraste;
- testes de áudio em navegadores compatíveis;
- auditoria completa apenas no encerramento de uma fase ou diante de risco estrutural.

## 8. Dúvidas

Perguntar antes de implementar quando a dúvida puder alterar:

- arquitetura;
- escopo;
- conteúdo musical;
- comportamento;
- experiência do usuário;
- dados;
- desempenho;
- publicação.

Decisões pequenas, reversíveis e já cobertas pelo design system podem ser tomadas sem interromper o fluxo.

## 9. Fonte oficial

A documentação do diretório docs e o código validado são a fonte oficial. Conversas anteriores servem como contexto, mas não substituem decisões registradas.

## 10. Estado e persistência do MVP

- sem conta;
- sem backend;
- sem progresso de aprendizagem permanente;
- navegação livre;
- diagnóstico apenas na sessão;
- preferências técnicas locais;
- PWA e cache para desempenho e uso offline.
