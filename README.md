# 🎴 WCard - Cartão de Visita Online Profissional

Um cartão de visita digital moderno, responsivo e interativo construído com Next.js, React, TypeScript, Tailwind CSS e shadcn/ui.

## ✨ Funcionalidades

- 🎨 **Design Glassmorphism** - Efeito de vidro fosco moderno
- 🌓 **Dark Mode** - Toggle animado com persistência no localStorage
- 📱 **100% Responsivo** - Perfeito em mobile, tablet e desktop
- 🔗 **Múltiplos Contactos** - Email, telefone, WhatsApp, LinkedIn, GitHub, website
- 📋 **Copiar Contacto** - Botão para copiar informações com feedback visual
- 📥 **Download vCard** - Gere e descarregue um ficheiro .vcf
- 🔲 **QR Code** - Gere dinamicamente um QR code para partilhar o cartão
- 📤 **Partilhar** - Usa Web Share API quando disponível
- ✨ **Animações Suaves** - Fade-in, hover effects e microtransições
- 🎯 **Efeito 3D** - Interação suave ao mover o mouse sobre o cartão

## 🚀 Começar

### Pré-requisitos

- Node.js 18+ 
- npm, yarn, pnpm ou bun

### Instalação

1. Clone o repositório ou use este projeto
2. Instale as dependências:

```bash
npm install
```

3. Personalize os seus dados em `lib/contact-data.ts`

4. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📝 Personalização

Edite o ficheiro `lib/contact-data.ts` para personalizar:

- Nome completo
- Título profissional
- Biografia
- Localização
- Idiomas
- Avatar (adicione uma imagem em `/public` e descomente a linha)
- Email
- Telefone
- WhatsApp
- Website
- LinkedIn
- GitHub

### Exemplo:

```typescript
export const contactData: ContactInfo = {
  name: "João Silva",
  title: "Senior Full Stack Developer",
  bio: "Desenvolvedor apaixonado por criar soluções inovadoras.",
  location: "Lisboa, Portugal",
  languages: ["Português", "English"],
  avatar: "/avatar.jpg", // Adicione a imagem em /public
  email: "joao@exemplo.com",
  phone: "+351 912 345 678",
  // ... outros campos
}
```

## 🎨 Personalizar Cores

As cores podem ser personalizadas editando `app/globals.css`. As variáveis CSS permitem ajustar facilmente a paleta de cores.

## 📦 Estrutura do Projeto

```
wcard/
├── app/
│   ├── layout.tsx          # Layout raiz
│   ├── page.tsx            # Página principal
│   └── globals.css         # Estilos globais + Tailwind
├── components/
│   ├── ui/
│   │   └── button.tsx      # Componente Button do shadcn/ui
│   ├── business-card.tsx   # Componente principal do cartão
│   ├── contact-button.tsx  # Botões de contacto
│   └── theme-toggle.tsx    # Toggle de dark mode
├── lib/
│   ├── contact-data.ts     # Dados de contacto (PERSONALIZE AQUI)
│   └── utils.ts            # Utilitários (cn function)
└── hooks/
    └── use-theme.tsx       # Hook para gerir tema
```

## 🚢 Deploy

### Vercel (Recomendado)

1. Faça push do código para o GitHub
2. Importe o projeto na [Vercel](https://vercel.com)
3. A Vercel detectará automaticamente o Next.js
4. Clique em "Deploy"

O projeto estará online em segundos!

### Outras Plataformas

Este projeto pode ser deployado em qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- AWS Amplify
- Cloudflare Pages

## 🛠️ Tecnologias

- **Next.js 16** - Framework React
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização
- **shadcn/ui** - Componentes UI
- **lucide-react** - Ícones
- **qrcode.react** - Geração de QR codes

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

Feito com ❤️ usando Next.js e Tailwind CSS
