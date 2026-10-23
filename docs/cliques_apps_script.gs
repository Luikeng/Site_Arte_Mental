/**
 * Arte Mental — registro de cliques do site (WhatsApp / agenda) numa planilha privada
 * ---------------------------------------------------------------------------
 * O site manda um POST silencioso a cada clique no WhatsApp ou interação com a
 * agenda online. Cada clique vira uma linha. O Geisson marca à mão quem virou
 * paciente (colunas "paciente", "valor", "data_1a_sessao"). Um script do projeto
 * MCP_google_ADS lê as linhas marcadas e avisa o Google Ads (conversão offline
 * "Paciente"), usando o gclid. Nada aparece pra pessoa nem na mensagem do WhatsApp.
 *
 * O site NÃO manda nome, telefone nem dado clínico. Só horário, botão e código do clique.
 *
 * ANOTAÇÕES: a coluna N ("anotações") e as seguintes são livres pro Geisson
 * (nome, telefone…). O script só lê/escreve A–M e nunca envia N+ ao Google.
 * NUNCA inserir coluna entre A e M — as posições são fixas (COLUNAS abaixo).
 *
 * COMO INSTALAR (uma vez, ~5 min)
 *   1. Crie uma planilha nova no Google Sheets: "Arte Mental — Cliques do site".
 *   2. Nela: Extensões → Apps Script. Apague o conteúdo e cole este arquivo.
 *   3. Troque o valor de TOKEN abaixo por uma senha longa qualquer (anote).
 *   4. Implantar → Nova implantação → engrenagem → App da Web.
 *        Executar como:  Eu (geisson.oleques@gmail.com)
 *        Quem pode acessar:  Qualquer pessoa           <-- obrigatório
 *   5. Autorize ("app não verificado" → Avançado → Ir para...). É o seu script.
 *   6. Copie a URL que termina em /exec e mande pro Claude, junto com o TOKEN.
 *
 * TESTE: abrir a URL /exec no navegador responde {"ok":true,"servico":"cliques-site"}.
 * ---------------------------------------------------------------------------
 */

var TOKEN = 'TROQUE-POR-UMA-SENHA-LONGA';
// Aviso no Discord a cada clique (opcional). Discord → canal → Editar canal →
// Integrações → Webhooks → Novo webhook → Copiar URL do webhook. Vazio = sem aviso.
var DISCORD_WEBHOOK = '';
var ABA = 'Cliques';
var COLUNAS = [
  'recebido_em', 'quando_cliente', 'botao', 'pagina', 'dispositivo', 'origem',
  'gclid', 'gbraid', 'wbraid',
  'paciente', 'valor', 'data_1a_sessao', 'enviado_google'
];
var COL = {};
COLUNAS.forEach(function (c, i) { COL[c] = i + 1; });

/* ========================================================================= */

function _aba() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(ABA);
  if (!sh) {
    sh = ss.insertSheet(ABA);
    sh.appendRow(COLUNAS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, COLUNAS.length).setFontWeight('bold');
    // colunas que o Geisson preenche ficam destacadas
    sh.getRange(1, COL.paciente, 1, 3).setBackground('#fff2cc');
    // gclid etc. são longos e não precisam ficar à vista
    sh.hideColumns(COL.gclid, 3);
    var regra = SpreadsheetApp.newDataValidation().requireValueInList(['sim', 'não'], true).build();
    sh.getRange(2, COL.paciente, 5000, 1).setDataValidation(regra);
  }
  return sh;
}

function _json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function _txt(v, max) { return String(v == null ? '' : v).slice(0, max || 200); }

/** Manda "novo clique" pro Discord. Falha do Discord nunca impede de gravar a linha. */
function _avisarDiscord(botao, dispositivo, origem, linha) {
  if (!DISCORD_WEBHOOK) return;
  try {
    var hora = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM HH:mm');
    var de = origem === 'google-ads' ? 'veio do **anúncio**' : (origem ? 'veio de ' + origem : 'origem desconhecida');
    var o_que = botao === 'agenda' ? 'abriu a **agenda online**' : 'clicou no **WhatsApp**';
    var url = SpreadsheetApp.getActiveSpreadsheet().getUrl() + '#gid=' + _aba().getSheetId() + '&range=A' + linha;
    UrlFetchApp.fetch(DISCORD_WEBHOOK, {
      method: 'post', contentType: 'application/json', muteHttpExceptions: true,
      payload: JSON.stringify({
        username: 'Arte Mental — site',
        content: '🔔 ' + hora + ' · alguém ' + o_que + ' · ' + dispositivo + ' · ' + de +
                 '\nSe virar paciente, marque a linha ' + linha + ': ' + url
      })
    });
  } catch (e) {}
}

/** Rode 1x pelo editor (Executar → testarDiscord) pra autorizar e ver a mensagem chegar. */
function testarDiscord() {
  _avisarDiscord('whatsapp', 'celular', 'google-ads', 2);
}

/** GET sem token = teste. GET com token = devolve linhas marcadas como paciente e ainda não enviadas. */
function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.token !== TOKEN) return _json({ ok: true, servico: 'cliques-site', versao: 1 });

  var sh = _aba();
  var n = sh.getLastRow();
  if (n < 2) return _json({ ok: true, linhas: [] });
  var dados = sh.getRange(2, 1, n - 1, COLUNAS.length).getValues();
  var tz = Session.getScriptTimeZone();
  var out = [];
  dados.forEach(function (r, i) {
    var paciente = String(r[COL.paciente - 1]).trim().toLowerCase();
    var enviado = String(r[COL.enviado_google - 1]).trim();
    if (paciente !== 'sim' || enviado) return;
    var d1 = r[COL.data_1a_sessao - 1];
    out.push({
      linha: i + 2,
      recebido_em: Utilities.formatDate(new Date(r[COL.recebido_em - 1]), tz, "yyyy-MM-dd'T'HH:mm:ssXXX"),
      botao: r[COL.botao - 1],
      gclid: r[COL.gclid - 1], gbraid: r[COL.gbraid - 1], wbraid: r[COL.wbraid - 1],
      valor: Number(String(r[COL.valor - 1]).replace(',', '.')) || 0,
      data_1a_sessao: d1 instanceof Date ? Utilities.formatDate(d1, tz, 'yyyy-MM-dd') : String(d1)
    });
  });
  return _json({ ok: true, linhas: out });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) throw new Error('sem corpo');
    var d = JSON.parse(e.postData.contents);
    var sh = _aba();

    // --- marcação de enviado (vem do script do Claude, exige token) ---
    if (d.acao === 'marcar_enviado') {
      if (d.token !== TOKEN) throw new Error('token');
      var agora = new Date();
      (d.linhas || []).forEach(function (l) {
        if (l >= 2) sh.getRange(l, COL.enviado_google).setValue(agora);
      });
      return _json({ ok: true, marcadas: (d.linhas || []).length });
    }

    // --- clique vindo do site ---
    if (d.v !== 1 || d.tipo !== 'clique') throw new Error('formato');
    var botao = _txt(d.botao, 30);
    if (['whatsapp', 'agenda'].indexOf(botao) < 0) throw new Error('botao');

    sh.appendRow([
      new Date(), _txt(d.quando, 40), botao, _txt(d.pagina, 120), _txt(d.dispositivo, 10),
      _txt(d.origem, 60), _txt(d.gclid, 200), _txt(d.gbraid, 200), _txt(d.wbraid, 200),
      '', '', '', ''
    ]);
    _avisarDiscord(botao, _txt(d.dispositivo, 10), _txt(d.origem, 60), sh.getLastRow());
    return _json({ ok: true });
  } catch (err) {
    return _json({ ok: false, erro: String(err.message || err) });
  }
}
