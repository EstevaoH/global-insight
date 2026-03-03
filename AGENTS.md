# AGENTS.md

# 🌍 Global Insight — Plataforma Acadêmica de Análise Comparativa de Países

## 1. 📌 Visão Geral do Projeto

Global Insight é uma plataforma web acadêmica voltada para análise comparativa de indicadores socioeconômicos entre países, utilizando dados oficiais públicos.

O sistema tem como foco:

* Ensino de Geografia e Ciências Sociais
* Alfabetização estatística
* Análise comparativa baseada em dados reais
* Visualização interativa de séries históricas

---

## 2. 🎯 Objetivos Acadêmicos

* Desenvolver uma ferramenta didática baseada em dados oficiais.
* Estimular pensamento crítico por meio de comparação de indicadores.
* Facilitar interpretação de gráficos e dados históricos.
* Permitir geração de relatórios analíticos.

---

## 3. 🧱 Arquitetura Geral

### 3.1 Estrutura de Alto Nível

* Frontend (Next.js)
* Camada de Serviços (API Adapter)
* Camada de Agregação de Dados
* Cache
* Integração com API oficial

---

## 4. 📂 Estrutura de Pastas

```
/global-insight
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── pais/[codigo]/page.tsx
│   ├── comparador/page.tsx
│   └── ranking/page.tsx
│
├── components/
│   ├── ui/
│   ├── charts/
│   ├── map/
│   ├── country/
│   └── comparison/
│
├── services/
│   ├── ibge.service.ts
│   ├── indicator.service.ts
│   └── cache.service.ts
│
├── hooks/
│   ├── useCountries.ts
│   ├── useIndicators.ts
│   └── useComparison.ts
│
├── utils/
│   ├── formatters.ts
│   ├── calculations.ts
│   └── insights.ts
│
├── types/
│   ├── country.types.ts
│   └── indicator.types.ts
│
├── context/
│   └── comparison.context.tsx
│
└── docs/
    ├── metodologia.md
    └── fundamentacao_teorica.md
```

---

## 5. 📊 Módulos Funcionais

### 5.1 Módulo de País

* Busca por nome ou código
* Perfil detalhado
* Exibição de indicadores principais

### 5.2 Módulo de Comparação

* Comparação entre 2+ países
* Gráficos lado a lado
* Comparação temporal

### 5.3 Módulo de Ranking

* Ordenação por indicador
* Filtro por período
* Top 10 / Bottom 10

### 5.4 Modo Educacional

* Perguntas orientadas
* Geração automática de insights
* Exportação de relatório em PDF

---

## 6. 🧠 Geração de Insights Automáticos

O sistema deve gerar análises automáticas baseadas em:

* Crescimento percentual
* Diferença absoluta
* Tendência histórica
* Classificação relativa

Exemplo de insight:
"Entre 2010 e 2020, o País A apresentou crescimento superior ao País B em 18%."

---

## 7. 📚 Fundamentação Teórica

O projeto deve se apoiar em:

* Visualização de Dados Educacional
* Alfabetização Estatística
* Aprendizagem Baseada em Dados
* Interação Humano-Computador

Documento completo deve ser mantido em /docs/fundamentacao_teorica.md

---

## 8. 🧪 Boas Práticas Técnicas

* Separação clara entre camada de dados e UI
* Uso de React Query para cache
* Tipagem forte com TypeScript
* Componentização orientada a domínio
* Testes unitários para services e utils

---

## 9. 📈 Possíveis Extensões Acadêmicas

* Aplicação de Machine Learning para clusterização de países
* Sistema de recomendação de países similares
* Análise de correlação entre indicadores
* Modo professor com criação de atividades

---

## 10. 🔐 Critérios de Qualidade Acadêmica

* Reprodutibilidade dos dados
* Transparência metodológica
* Referência às fontes oficiais
* Documentação clara
* Validação estatística das análises

---

## 11. 🚀 MVP Acadêmico

Versão mínima deve conter:

* Listagem de países
* Página de perfil
* Comparação entre dois países
* Gráfico temporal
* Insight automático simples

---

## 12. 📌 Padrões de Código

* Nomes em inglês
* Funções puras em utils
* Nenhuma lógica de negócio em componentes
* Serviços responsáveis apenas por comunicação externa

---

## 13. 📝 Controle de Versão

* Commits semânticos
* Branch principal: main
* Branch de desenvolvimento: develop
* Feature branches padronizadas

---

## 14. 📅 Roadmap Inicial

Fase 1 – Estrutura e integração básica
Fase 2 – Comparação e gráficos
Fase 3 – Insights automáticos
Fase 4 – Modo educacional
Fase 5 – Publicação e validação acadêmica

---

# Fim do Documento AGENTS.md
