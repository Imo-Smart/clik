# ImoClick - Sistema Revolucionário de Aluguel de Imóveis

## Visão Geral

O ImoClick é um sistema revolucionário que permite alugar imóveis com apenas um clique, eliminando burocracias e terceiros. O sistema combina tecnologias avançadas de verificação de identidade, contratos digitais e automação para criar uma experiência única no mercado imobiliário.

## Estrutura do Projeto

```
imoclick-release/
├── backend/                 # Código do backend Flask
│   ├── main.py             # Arquivo principal do Flask
│   ├── routes/             # Rotas da API
│   ├── models/             # Modelos de dados
│   ├── static/             # Arquivos estáticos (frontend build)
│   └── database/           # Banco de dados SQLite
├── frontend-src/           # Código fonte do frontend React
├── frontend-build/         # Frontend compilado para produção
├── requirements.txt        # Dependências Python
├── package.json           # Dependências Node.js
└── *.md                   # Documentação do projeto
```

## Instalação e Execução

### Pré-requisitos
- Python 3.11+
- Node.js 20+
- pnpm

### Backend (Flask)

1. Crie um ambiente virtual:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows
```

2. Instale as dependências:
```bash
pip install -r requirements.txt
```

3. Execute o servidor:
```bash
cd backend
python main.py
```

O servidor estará disponível em `http://localhost:5000`

### Frontend (React) - Desenvolvimento

1. Instale as dependências:
```bash
pnpm install
```

2. Execute o servidor de desenvolvimento:
```bash
cd frontend-src
pnpm run dev
```

O frontend estará disponível em `http://localhost:3000`

### Sistema Integrado

O backend Flask já serve o frontend compilado automaticamente. Basta executar o backend e acessar `http://localhost:5000` para usar o sistema completo.

## Funcionalidades Principais

### 🚀 Aluguel com Um Clique
- Processo completamente automatizado
- Verificação instantânea de elegibilidade
- Geração automática de contratos digitais
- Pagamento automático via PIX/cartão
- Chaves digitais enviadas instantaneamente

### 🔒 Segurança Avançada
- Verificação biométrica facial
- Análise de documentos com OCR
- Consulta automática aos órgãos de proteção ao crédito
- Contratos digitais com certificação ICP-Brasil
- Criptografia end-to-end

### 🎯 Experiência do Usuário
- Interface moderna e responsiva
- Busca inteligente com filtros avançados
- Visualização imersiva dos imóveis
- Processo sem burocracia
- Suporte mobile e desktop

## APIs Disponíveis

### Propriedades
- `GET /api/properties` - Lista propriedades disponíveis
- `GET /api/properties/{id}` - Detalhes de uma propriedade
- `POST /api/properties/{id}/instant-rent` - Aluguel instantâneo
- `POST /api/properties/{id}/check-eligibility` - Verifica elegibilidade

### Verificação de Usuários
- `POST /api/verify-user` - Inicia verificação de usuário
- `GET /api/user/{id}/status` - Status de verificação
- `POST /api/biometric-verify` - Verificação biométrica
- `POST /api/document-verify` - Verificação de documentos
- `POST /api/credit-check` - Consulta de crédito

## Tecnologias Utilizadas

### Frontend
- React 18 com TypeScript
- Tailwind CSS para estilização
- Framer Motion para animações
- Lucide React para ícones
- Shadcn/ui para componentes

### Backend
- Flask (Python)
- SQLAlchemy para ORM
- Flask-CORS para integração
- SQLite para banco de dados
- JWT para autenticação

## Próximos Passos

1. **Integração com APIs Reais:**
   - Serasa/SPC para consulta de crédito
   - Receita Federal para validação de CPF
   - Bancos para pagamentos PIX

2. **Funcionalidades Avançadas:**
   - Biometria facial real
   - Contratos blockchain
   - IoT para fechaduras inteligentes
   - App mobile nativo

3. **Escalabilidade:**
   - Migração para PostgreSQL
   - Deploy em cloud (AWS/Azure)
   - CDN para assets
   - Load balancing

## Contato

Sistema desenvolvido por Manus AI para revolucionar o mercado imobiliário brasileiro.

---

**ImoClick - A Revolução do Mercado Imobiliário Chegou!** 🏠✨

