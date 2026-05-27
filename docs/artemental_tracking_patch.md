# Patch de tracking — `artemental.com.br`

**Problema diagnosticado em 2026-04-29:** A conversão primária da conta Arte Mental (Google Ads `1028027196`) é `WhatsApp - Botão Site 2026` (id `7529144825`, tipo WEBPAGE), mas no HTML cru do site **não há gtag instalado** — só um placeholder de GTM comentado. Resultado: nenhum clique no WhatsApp está sendo contabilizado como conversão. Os "0 conv" no painel não significam zero pacientes — significam zero medição.

Este patch instala o gtag.js direto no `index.html` (sem precisar de conta GTM) e adiciona um listener global que dispara o evento de conversão sempre que o usuário clica em qualquer link/botão WhatsApp do site, sem precisar mexer nos componentes React.

## IDs já confirmados via API

- Conversion ID: `AW-873651176`
- Conversion Label: `TtzCCPnDloYcEOi3y6AD`
- Send-to: `AW-873651176/TtzCCPnDloYcEOi3y6AD`
- Default value: `R$ 220` (já configurado na ação de conversão)
- GA4 (mesmo gtag): `G-D24SC617RW`

## Alteração no `index.html`

Substituir o bloco placeholder (atualmente comentado entre `<!-- Google Tag Manager (Placeholder para o futuro) -->` e `<!-- Fim Google Tag Manager -->`) pelo snippet abaixo. Coloque imediatamente antes de `</head>`:

```html
<!-- Google tag (gtag.js) — Ads + GA4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-873651176"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-873651176');
  gtag('config', 'G-D24SC617RW');

  // Dispara conversão "WhatsApp - Botão Site 2026" em qualquer clique em link wa.me / api.whatsapp.com
  // Funciona com SPA: usa event delegation no document, não depende do React
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href*="wa.me"], a[href*="api.whatsapp.com"], a[href*="whatsapp://"]');
    if (!a) return;
    gtag('event', 'conversion', {
      'send_to': 'AW-873651176/TtzCCPnDloYcEOi3y6AD',
      'value': 220.0,
      'currency': 'BRL'
    });
  }, true); // capture=true pra não perder se o React der stopPropagation
</script>
```

## Por que não usei o snippet "callback" do Google

O snippet padrão do Google espera que você troque o `onclick` de cada botão por `gtag_report_conversion(url)`. Como a landing é React renderizada em runtime (`<div id="root">`), instrumentar cada botão exige mexer nos componentes. O listener global em `document` resolve sem tocar no JSX e cobre todos os botões WhatsApp que existirem hoje ou no futuro.

A perda é o `event_callback` que segura o navegador até o evento ser enviado. Em prática, links `wa.me` abrem em aba nova / app do WhatsApp — o tab/app de origem permanece aberto, então a request HTTP do gtag tem tempo de ir embora. Aceitável.

## Como validar antes de rodar campanha de novo

1. Subir a alteração e abrir o site numa janela anônima.
2. Abrir DevTools → Network → filtrar por `google-analytics` e `googleads.g.doubleclick.net`.
3. Clicar em um botão WhatsApp do site.
4. Esperar ver request para `googleads.g.doubleclick.net/pagead/conversion/...` com `label=TtzCCPnDloYcEOi3y6AD`.
5. No painel do Google Ads → Ferramentas → Conversões → `WhatsApp - Botão Site 2026` → "Verificação" deve sair de "Sem atividade recente" para "Tag ativa" em 24-48h.

## Próximos passos sugeridos depois que o tracking voltar

- Esperar 7 dias com tráfego pra ter base honesta.
- Aí sim avaliar se o problema é comunicação ou apenas medição.
