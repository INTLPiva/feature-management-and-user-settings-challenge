# Feature Management & User Settings - Backend

Backend API desenvolvida com Node.js, TypeScript, Fastify e PostgreSQL seguindo os princípios da Clean Architecture.

## 🏗️ Arquitetura

O projeto segue Clean Architecture com separação clara de responsabilidades:

- **Domain**: Entidades, contratos de repositórios e casos de uso
- **Infrastructure**: Implementações concretas (PostgreSQL, migrations, conexão)
- **Application**: Controllers, rotas, DTOs e injeção de dependências
- **Shared**: Configurações e utilitários compartilhados

## 🚀 Tecnologias

- Node.js 20+
- TypeScript
- Fastify
- PostgreSQL 16
- Docker & Docker Compose
- Zod (validação)
- Tsup (build)
- TSX (execução em dev)

## 📋 Pré-requisitos

- Node.js 20 ou superior
- Docker e Docker Compose
- npm

## 🔧 Instalação

1. Clone o repositório

```bash
git clone https://github.com/INTLPiva/feature-management-and-user-settings-challenge
cd backend
```

2. Instale as dependências

```bash
npm install
```

3. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Exemplo de `.env`:

```env
NODE_ENV=dev
PORT=3333
DATABASE_URL="postgresql://postgres:docker@localhost:5432/api-feature-management?schema=public"
```

## 💻 Executando Localmente

1. Inicie o PostgreSQL (via Docker)

```bash
docker-compose up -d
```

2. Execute as migrations

```bash
npm run migrate
```

3. Inicie o servidor em modo desenvolvimento

```bash
npm run dev
```

## 🔌 Endpoints da API

### Feature Flags

```
GET /api/feature-flags
```

Retorna todas as feature flags disponíveis:

```json
{
  "success": true,
  "data": {
    "enable_signature": true,
    "enable_dark_mode": true,
    "enable_notifications": true
  }
}
```

### Settings

#### Obter configurações

```
GET /api/settings
```

Resposta:

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "receiveNotifications": false,
    "darkMode": false,
    "profileSignature": null,
    "createdAt": "2026-01-15T00:00:00.000Z",
    "updatedAt": "2026-01-15T00:00:00.000Z"
  }
}
```

#### Atualizar configurações

```
PUT /api/settings
Content-Type: application/json

{
  "setting": "receiveNotifications",
  "value": true
}
```

Resposta:

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "receiveNotifications": true,
    "darkMode": true,
    "profileSignature": "Minha assinatura personalizada",
    "createdAt": "2026-01-15T00:00:00.000Z",
    "updatedAt": "2026-01-15T00:00:00.000Z"
  }
}
```

## 🗄️ Estrutura do Banco de Dados

### Tabelas

- **settings**: Configurações do sistema
- **feature_flags**: Feature flags do sistema
- **audit_logs**: Logs de auditoria de todas as alterações

### Auditoria

Toda alteração nas configurações gera automaticamente um registro na tabela `audit_logs` contendo:

- Entidade afetada
- Campo alterado
- Valor anterior
- Novo valor
- Tipo de ação (UPDATE, CREATE, etc.)
- Timestamp

## 📁 Estrutura de Pastas

```
backend/
├── src/
│   ├── server.ts
│   ├── app.ts
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── settings.entity.ts
│   │   │   ├── feature-flag.entity.ts
│   │   │   └── audit-log.entity.ts
│   │   ├── repositories/
│   │   │   ├── settings.repository.ts
│   │   │   ├── feature-flag.repository.ts
│   │   │   └── audit-log.repository.ts
│   │   └── use-cases/
│   │       ├── get-settings.use-case.ts
│   │       ├── update-settings.use-case.ts
│   │       └── get-feature-flags.use-case.ts
│   ├── infrastructure/
│   │   ├── database/
│   │   │   ├── postgres.connection.ts
│   │   │   ├── run-migrations.ts
│   │   │   └── migrations/
│   │   │       └── 001_initial_schema.sql
│   │   └── repositories/
│   │       ├── postgres-settings.repository.ts
│   │       ├── postgres-feature-flag.repository.ts
│   │       └── postgres-audit-log.repository.ts
│   ├── application/
│   │   ├── controllers/
│   │   │   ├── settings.controller.ts
│   │   │   └── feature-flag.controller.ts
│   │   ├── routes/
│   │   │   ├── index.ts
│   │   │   ├── settings.routes.ts
│   │   │   └── feature-flag.routes.ts
│   │   ├── dtos/
│   │   │   └── settings.dto.ts
│   │   └── di/
│   │       └── container.ts
│   └── shared/
│       └── config/
│           └── env.ts
├── package.json
├── tsconfig.json
├── docker-compose.yml
└── README.md
```
