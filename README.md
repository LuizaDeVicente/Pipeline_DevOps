# Percurso — Guia interativo de CI/CD

Aplicação estática em português para estudar o laboratório de pipeline CI/CD. Não usa bibliotecas, instalação de dependências ou etapa de build.

## Como abrir

Abra `index.html` no navegador. Mantenha `style.css` e `script.js` na mesma pasta.

## Arquivos para enviar ao GitHub

- `index.html`: conteúdo, simulador, quiz e roteiro da entrega.
- `style.css`: apresentação e adaptação para celular.
- `script.js`: simulação, quiz, checklist e download das anotações.
- `README.md`: instruções do projeto.

Não envie a pasta `tmp`: ela contém apenas material temporário de leitura do enunciado. Não coloque anotações pessoais ou capturas do relatório na pasta que será publicada.

## O que experimentar

1. Push na main sem falha: CI e CD simulados concluem.
2. Pull request para main sem falha: CI conclui; CD não executa.
3. Push ou pull request com falha: validação falha; CD fica bloqueado.
4. Quiz: confira a explicação de uma resposta correta e de uma incorreta.
5. Checklist: marque itens e recarregue para conferir a persistência, caso o navegador permita armazenamento local.
6. Anotações: edite, baixe o arquivo `.md` e confira seu conteúdo.
7. Abra em tela estreita e navegue pelos controles com a tecla Tab.

As simulações não acessam o GitHub, não testam a aplicação real e não fazem deployment. As anotações ficam apenas no navegador, quando permitido. Faça download de uma cópia.

## Próxima etapa do exercício

O estudante implementará o workflow em `.github/workflows/`: CI em push na main e pull request para main, checkout, ambiente, verificação útil e CD após push na main com CI bem-sucedida. GitHub Pages é uma estratégia adequada a esta aplicação estática. Não há arquivo de pipeline pronto neste projeto.

O enunciado pede um projeto autoral já desenvolvido e armazenado no GitHub. Confirme se este guia atende ao requisito antes de escolhê-lo para a avaliação. O código inicial deste guia foi gerado com apoio de IA; registre esse apoio e suas próprias alterações no relatório.

## Estrutura sugerida do PDF de entrega

1. Identificação: estudante, turma, disciplina e título.
2. Projeto: descrição, tecnologias, autoria e link do repositório.
3. Estratégia: objetivos da CI e justificativa do destino de deployment.
4. Pipeline: caminho e conteúdo do YAML final, com explicação das etapas e condições.
5. Interações com IA: prompt original, resultado, problema encontrado, alteração e verificação de cada interação relevante.
6. Evolução: principais problemas, correções e alterações feitas manualmente.
7. Evidências reais: CI em PR, CI/CD em push, bloqueio por falha e nova versão acessível, identificando execuções e commits.
8. Análise: quantidade real de prompts, aprendizados e limitações das verificações.

Use o modelo abaixo a cada resposta relevante. Não registre algo planejado como já executado.

```text
Interação nº:
Data:
Prompt original:
Objetivo:
Resultado obtido:
Problema encontrado (se houver):
Alteração realizada:
O que fiz manualmente:
Como verifiquei o resultado:
Evidências:
Próximo passo:
```

## Referências

- Enunciado local: Lab CICD-Pipeline.pdf, DevOps, outubro de 2026.
- [Conceitos do GitHub Actions](https://docs.github.com/en/actions/get-started/understand-github-actions).
- [Workflows de publicação no GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
