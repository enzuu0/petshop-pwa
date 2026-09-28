# Pata+ Petshop

Site moderno de petshop desenvolvido como PWA (Progressive Web App).

## Recursos

- layout responsivo para celular e computador;
- catálogo com filtros e carrinho;
- formulário de agendamento;
- instalação como aplicativo no computador e iPhone;
- download direto do APK para Android;
- funcionamento offline com Service Worker;
- manifesto e ícones prontos para o PWABuilder.

## Como instalar

O site possui três botões separados. No Android, use **Android — Baixar APK**. No computador, use **Computador — Instalar** no Chrome ou Edge. No iPhone, use **iPhone — Instalar** pelo Safari e escolha **Adicionar à Tela de Início** no menu de compartilhamento.

Quando o navegador não oferece a janela automática de instalação, o site mostra instruções específicas para Chrome, Edge ou Safari e permite abrir ou copiar o endereço correto.

## Estrutura PWA

- `manifest.json`: nome, cores e ícones do aplicativo;
- `sw.js`: cache e funcionamento offline;
- `icon-192.png` e `icon-512.png`: ícones exigidos pelo PWA;
- `index.html`, `styles.css` e `app.js`: interface e interações.
- `PataMais.apk`: pacote Android pronto para instalação.
