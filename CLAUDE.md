# CLAUDE.md — Buenas Viagens!

Landing page estática (HTML + CSS + JS puros, sem framework nem build). Aberta via Live Server e publicada no GitHub Pages.

## Convenções de código

- **Sem dependências de build.** Apenas `index.html`, `style.css`, `script.js` e `images/`. Não introduzir bundler, npm ou frameworks.
- **Nomes de classes em português** e descritivos (`passeios`, `destinos`, `avaliacoes`, `card-destino`, `slide-dots`); **comentários de código em inglês**.
- **JavaScript** roda todo dentro de um único `DOMContentLoaded`. Cada bloco de funcionalidade começa com uma _guard clause_ (`if (el) { ... }`) antes de registrar listeners — nunca assumir que o elemento existe.
- Preferir **gerar elementos repetidos dinamicamente** a partir do DOM existente (ex.: os dots do carrossel vêm de `slides.length`, não são escritos no HTML) para que escalem sozinhos.
- **CSS**: reset no topo; cor de destaque `#f5a623` (laranja), azul primário `#4087e5`. Reaproveitar essas variáveis de cor em vez de inventar tons novos. Reset global de `button` já zera `border` e define `cursor`/`font`.
- **Acessibilidade**: elementos interativos levam `aria-label` (botões de dots, ícones de redes, inputs).
- **Responsivo**: breakpoints em `style.css` — `≤992px` (mobile/tablet unificado), `≤380px` (ajustes finos), `631–990px` (grid intermediário).
- **Commits**: Conventional Commits com prefixo `feat:`/`fix:`, título em inglês. Commitar/pushar só quando solicitado.
- **Verificação de UI é runtime, não teste.** Confirmar mudanças visuais/interativas abrindo a página de verdade (Live Server / navegador), não só lendo o código.

## Diário de erros

> Lições aprendidas para não repetir. Adicionar uma linha sempre que algo custar tempo.

- **Caminho com acento + PowerShell 5.1**: o `.ps1` salvo em UTF-8 sem BOM é lido como ANSI pelo PowerShell 5.1, corrompendo literais com acento (`Maurício` → `MaurÃ­cio`) e quebrando o caminho. **Não** hardcodar o caminho do usuário; derivar de `$env:USERPROFILE` em runtime.
- **Chrome + `file://` com acento**: URL `file://` com o usuário acentuado (`Maur%C3%ADcio`) deu `ERR_FILE_NOT_FOUND`. Para verificação em navegador, **copiar o projeto para um caminho ASCII** (o scratchpad usa o nome curto 8.3 `MAURCI~1`) e carregar de lá — mesmos bytes, mesma feature.
- **Verificar no navegador sem Node/Python/Playwright**: este ambiente não tem nenhum dos três. Driver funcional usado: **Chrome headless + DevTools Protocol (CDP) sobre WebSocket a partir do PowerShell** (`System.Net.WebSockets.ClientWebSocket`) — permite navegar, ler estado do DOM, disparar `mouseenter`/`click` e capturar console/screenshots. Script de referência ficou no scratchpad da sessão.
