# Feature Management & User Settings - Frontend

Frontend em React Native (Expo) para gerenciamento de preferências do usuário e feature flags.

## 🏗️ Arquitetura

O projeto utiliza a arquitetura **MVVM (Model-View-ViewModel)**

## 🚀 Tecnologias

- React Native + Expo
- Expo Router
- TypeScript
- TanStack Query
- Zustand
- AsyncStorage
- React Native Toast Message

## 📋 Pré-requisitos

- Node.js (v18+)
- npm
- Expo CLI
- Backend rodando em `http://localhost:3333`

## 🔧 Instalação

1. Clone o repositório

```bash
git clone https://github.com/INTLPiva/feature-management-and-user-settings-challenge
cd frontend
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
EXPO_PUBLIC_API_URL=http://IpDoComputador:3333
```

## 💻 Executando Localmente

1. Inicie o servidor de desenvolvimento:

```bash
npx expo start
```

2. Rode no dispositivo/emulador:

- Pressione `i` para iOS
- Pressione `a` para Android
- Escaneie o QR Code com o app Expo Go (mobile)

## 🔌 Integração com API

O app consome os seguintes endpoints:

### Feature Flags

```
GET /api/feature-flags
```

Retorna todas as feature flags disponíveis.

### Settings

```
GET /api/settings
```

Retorna as configurações atuais do usuário.

```
PUT /api/settings
Content-Type: application/json

{
  "setting": "darkMode",
  "value": true
}
```

Atualiza uma configuração específica.

## 🎯 Funcionalidades

### Tela Inicial

- Mensagem de boas-vindas
- Botão para acessar configurações
- Tema responsivo (claro/escuro)

### Tela de Configurações

**Toggles condicionais (baseados em feature flags):**

- **Receber Notificações**: Ativa/desativa notificações (se `enable_notifications` = true)
- **Modo Dark**: Alterna entre tema claro e escuro (se `enable_dark_mode` = true)

**Campo condicional:**

- **Assinatura do Perfil**: Só aparece se a feature flag `enable_signature` estiver ativa

**Características:**

- Loading state durante carregamento inicial
- Feedback via toast em sucesso/erro
- Atualização automática do tema ao mudar "Modo Dark"
- Debounce automático no campo de texto (atualiza ao perder foco)
- Persistência do tema via AsyncStorage

## 📁 Estrutura de Pastas

```
/app
  ├── _layout.tsx
  ├── index.tsx
  └── settings.tsx

/src
  ├── /constants
  │   └── theme.ts
  ├── /services
  │   └── api.ts
  ├── /stores
  │   └── themeStore.ts
  ├── /types
  │   └── index.ts
  ├── /viewmodels
  │   └── useSettingsViewModel.ts
  └── /views
      └── /components
          ├── Loading.tsx
          ├── TextInputField.tsx
          └── Toggle.tsx
```
