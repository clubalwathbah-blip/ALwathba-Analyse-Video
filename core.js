/* Al-Wathba Analyse Vidéo — noyau (connexion, données, comptes) */
(function () {
'use strict';
var C = window.VO2C;
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { return null; } }
function today() { var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
function uid() { return Date.now().toString(36).slice(-5) + Math.random().toString(36).slice(2, 6); }
function fmtDate(d) { if (!d) return ''; var p = String(d).slice(0, 10).split('-'); return p[2] + '/' + p[1] + '/' + p[0]; }
var R = C.round, F = C.fmtTime;
var LANG = ls('wav_lang') || 'ar';

var D = {
  appName: ['الوثبة أناليز فيديو', 'Al-Wathba Analyse Vidéo'], appSub: ['تحليل التقنية والسرعة', 'Technique & vitesse'],
  login: ['دخول', 'Connexion'], codeP: ['الرمز', 'Code'], loginHint: ['الإدارة والمدربين: ادخلو بالرمز تاعكم.', 'Administration et entraîneurs : entrez votre code.'],
  first: ['✅ هذا هو رمز الإدارة من دركا.', '✅ Ce code est désormais celui de l’administration.'], bad: ['رمز غالط', 'Code incorrect'], short: ['الرمز لازم 6 حروف على الأقل', 'Au moins 6 caractères'], locked: ['محاولات بزاف، عاود من بعد 15 د', 'Trop d’essais, réessayez dans 15 min'],
  neterr: ['مشكل في الاتصال', 'Erreur réseau'], offline: ['بلا أنترنت: يتسجّل كي ترجع', 'Hors ligne : enregistré au retour'], forbidden: ['ماهوش مسموح', 'Non autorisé'], auth: ['عاود ادخل', 'Reconnectez-vous'],
  setupP: ['حط رابط الخادم (Apps Script /exec) مرة وحدة.', 'Collez l’URL du serveur (Apps Script /exec).'], next: ['التالي', 'Suivant'], demo: ['تجربة بلا خادم', 'Essai sans serveur'],
  settings: ['الإعدادات', 'Paramètres'], logout: ['خروج', 'Déconnexion'], admin: ['الإدارة', 'Administration'], coach: ['المدرب', 'Entraîneur'], coaches: ['المدربين', 'Entraîneurs'],
  addCoach: ['زيد مدرب', 'Ajouter'], name: ['الاسم واللقب', 'Nom et prénom'], phone: ['الهاتف', 'Téléphone'], code: ['الرمز', 'Code'], codeHint: [' (6 على الأقل، حروف وأرقام)', ' (6+, lettres et chiffres)'],
  active: ['مفعّل', 'Actif'], inactive: ['موقوف', 'Désactivé'], save: ['حفظ', 'Enregistrer'], cancel: ['إلغاء', 'Annuler'], del: ['حذف', 'Supprimer'], saved: ['تم الحفظ', 'Enregistré'], deleted: ['تم الحذف', 'Supprimé'],
  confirmDel: ['متأكد من الحذف؟', 'Confirmer la suppression ?'], weakCode: ['الرمز: 6 على الأقل، فيه حروف وأرقام', 'Code : 6+ caractères, lettres et chiffres'], dupcode: ['هذا الرمز مستعمل', 'Code déjà utilisé'],
  changePw: ['تبديل رمز الإدارة', 'Changer le code administration'], oldPw: ['الرمز الحالي', 'Code actuel'], newPw: ['الرمز الجديد', 'Nouveau code'], logT: ['سجل الدخول', 'Journal des connexions'],
  okLogin: ['دخل', 'OK'], failLogin: ['رمز غالط', 'Échec'], back: ['رجوع', 'Retour'], apiUrl: ['رابط الخادم', 'URL du serveur'], backup: ['نسخة احتياطية', 'Sauvegarde'],
  date: ['التاريخ', 'Date'], swimmers: ['السباحين', 'Nageurs'], addSw: ['زيد سباح', 'Ajouter un nageur'], dob: ['تاريخ الميلاد', 'Date de naissance'], sex: ['الجنس', 'Sexe'], male: ['ذكر', 'Garçon'], female: ['أنثى', 'Fille'],
  group: ['الفوج / الفئة', 'Groupe / catégorie'], noCoach: ['بلا مدرب', 'Sans entraîneur'], noSw: ['ما كاين حتى سباح. زيد الأول.', 'Aucun nageur. Ajoutez-en un.'], nAna: ['تحليل', 'analyses'], home: ['الرئيسية', 'Accueil'],
  when: ['الوقت', 'Quand'], who: ['شكون', 'Qui']
};
function T(k) { var v = D[k]; return v ? (LANG === 'fr' ? v[1] : v[0]) : k; }

/* ---------------- serveur ---------------- */
var DEFAULT_API = 'https://script.google.com/macros/s/AKfycbzd8TmPOJHySMIZJzYCSiitGXHiQpe6Cka64vML0banBpa3poEAnVX5D4eupqq9VeMM/exec';
(function () { try { var q = new URLSearchParams(location.search).get('api'); if (q && /^https:\/\/script\.google\.com\/.+\/exec$/.test(q)) localStorage.setItem('wav_api', q); } catch (e) {} })();
var API = {
  url: function () { return ls('wav_api') || DEFAULT_API; },
  tk: function () { return ls('wav_tk') || ''; },
  call: function (a, p) {
    p = p || {}; p.a = a; p.tk = API.tk();
    if (API.url() === 'demo') return Promise.resolve(Local.call(p));
    return fetch(API.url(), { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(p), redirect: 'follow' })
      .then(function (r) { return r.json(); })
      .then(function (r) { if (!r.ok && r.err === 'auth') { ls('wav_tk', null); render(); throw new Error('auth'); } return r; });
  }
};
// serveur local d'essai — mêmes règles que Code.gs
var Local = {
  db: function () { try { var d = JSON.parse(ls('wav_demo') || '{}'); d.s = d.s || []; d.t = d.t || []; d.c = d.c || []; d.log = d.log || []; return d; } catch (e) { return { s: [], t: [], c: [], log: [] }; } },
  put: function (d) { ls('wav_demo', JSON.stringify(d)); },
  call: function (p) {
    var d = Local.db();
    if (p.a === 'login') {
      if (!d.pw) { if (String(p.pw || '').length < 6) return { ok: false, err: 'short' }; d.pw = p.pw; Local.put(d); return { ok: true, tk: 'demo-admin', first: true, role: 'admin' }; }
      var c = p.pw === d.pw ? null : d.c.find(function (x) { return x.code === p.pw && x.active !== false; }), okk = p.pw === d.pw || !!c;
      d.log.push({ t: new Date().toISOString(), who: okk ? (c ? c.name : 'Administration') : '', ok: okk }); Local.put(d);
      return p.pw === d.pw ? { ok: true, tk: 'demo-admin', role: 'admin' } : c ? { ok: true, tk: 'demo-coach-' + c.id, role: 'coach' } : { ok: false, err: 'bad' };
    }
    var tk = p.tk || '', w = tk === 'demo-admin' ? { role: 'admin', name: 'Administration' } : null;
    if (!w && tk.indexOf('demo-coach-') === 0) { var co = d.c.find(function (x) { return x.id === tk.slice(11) && x.active !== false; }); if (co) w = { role: 'coach', id: co.id, name: co.name }; }
    if (!w) return { ok: false, err: 'auth' };
    var own = function (s) { return w.role === 'admin' || (s && s.coachId === w.id); }, S_ = function (id) { return d.s.find(function (x) { return x.id === id; }); };
    function up(arr, rec) { if (!rec.id) rec.id = uid(); rec.updated = new Date().toISOString(); var i = arr.findIndex(function (x) { return x.id === rec.id; }); if (i >= 0) arr[i] = rec; else arr.push(rec); return rec; }
    var r = { ok: true };
    if (p.a === 'all') { var ss = d.s.filter(own), ids = {}; ss.forEach(function (x) { ids[x.id] = 1; }); r.swimmers = ss; r.tests = d.t.filter(function (t) { return ids[t.swimmerId]; }); r.coaches = w.role === 'admin' ? d.c : []; r.me = { role: w.role, id: w.id || null, name: w.name }; }
    else if (p.a === 'saveSwimmer') { var o = S_(p.rec.id); if (o && !own(o)) return { ok: false, err: 'forbidden' }; if (w.role !== 'admin') p.rec.coachId = w.id; r.rec = up(d.s, p.rec); }
    else if (p.a === 'delSwimmer') { if (!own(S_(p.id))) return { ok: false, err: 'forbidden' }; d.s = d.s.filter(function (x) { return x.id !== p.id; }); d.t = d.t.filter(function (x) { return x.swimmerId !== p.id; }); }
    else if (p.a === 'saveTest') { if (!own(S_(p.rec.swimmerId))) return { ok: false, err: 'forbidden' }; p.rec.by = p.rec.by || w.name; r.rec = up(d.t, p.rec); }
    else if (p.a === 'delTest') { var t = d.t.find(function (x) { return x.id === p.id; }); if (t && !own(S_(t.swimmerId))) return { ok: false, err: 'forbidden' }; d.t = d.t.filter(function (x) { return x.id !== p.id; }); }
    else if (p.a === 'saveCoach') { if (w.role !== 'admin') return { ok: false, err: 'forbidden' }; if (!/^(?=.*[0-9])(?=.*[A-Za-z]).{6,}$/.test(String(p.rec.code || ''))) return { ok: false, err: 'weakCode' }; if (d.c.some(function (c) { return c.code === p.rec.code && c.id !== p.rec.id; }) || p.rec.code === d.pw) return { ok: false, err: 'dupcode' }; r.rec = up(d.c, p.rec); }
    else if (p.a === 'delCoach') { if (w.role !== 'admin') return { ok: false, err: 'forbidden' }; d.c = d.c.filter(function (c) { return c.id !== p.id; }); }
    else if (p.a === 'changePw') { if (p.old !== d.pw) return { ok: false, err: 'bad' }; if (String(p.nw).length < 6) return { ok: false, err: 'short' }; d.pw = p.nw; }
    else if (p.a === 'log') r.log = d.log.slice().reverse();
    Local.put(d); return JSON.parse(JSON.stringify(r));
  }
};

/* ---------------- état ---------------- */
var DB = { swimmers: [], tests: [], coaches: [], me: null };
try { var cache = JSON.parse(ls('wav_cache') || 'null'); if (cache) DB = cache; } catch (e) {}
var QUEUE = []; try { QUEUE = JSON.parse(ls('wav_queue') || '[]'); } catch (e) {}
var S = { view: 'btVideo' };
function isAdmin() { return DB.me && DB.me.role === 'admin'; }
function persist() { ls('wav_cache', JSON.stringify(DB)); ls('wav_queue', JSON.stringify(QUEUE)); }
function load() { return API.call('all').then(function (r) { if (r.ok) { DB = { swimmers: r.swimmers || [], tests: r.tests || [], coaches: r.coaches || [], me: r.me || null }; QUEUE.forEach(applyLocal); persist(); } return r; }); }
function applyLocal(q) {
  var arr = q.a.indexOf('Swimmer') > 0 ? DB.swimmers : DB.tests;
  if (q.a.indexOf('save') === 0) { var i = arr.findIndex(function (x) { return x.id === q.rec.id; }); if (i >= 0) arr[i] = q.rec; else arr.push(q.rec); }
  else { var j = arr.findIndex(function (x) { return x.id === q.id; }); if (j >= 0) arr.splice(j, 1); if (q.a === 'delSwimmer') DB.tests = DB.tests.filter(function (t) { return t.swimmerId !== q.id; }); }
}
function mutate(a, payload) { var q = Object.assign({ a: a }, payload); QUEUE.push(q); applyLocal(q); persist(); return flush(); }
var flushing = false;
function flush() {
  if (flushing || !QUEUE.length) return Promise.resolve();
  flushing = true; var q = QUEUE[0], p = Object.assign({}, q); delete p.a;
  return API.call(q.a, p).then(function (r) { flushing = false; QUEUE.shift(); persist(); if (r.ok) return flush(); toast(T(r.err) || r.err); return load().then(render); })
    .catch(function (e) { flushing = false; if (e.message !== 'auth') toast(T('offline')); });
}
window.addEventListener('online', flush);
function toast(m) { var t = document.createElement('div'); t.className = 'toast'; t.textContent = m; document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2600); }
function sw(id) { return DB.swimmers.find(function (s) { return s.id === id; }); }
function visibleSwimmers() { return DB.swimmers.slice(); }
function coachName(id) { var c = (DB.coaches || []).find(function (x) { return x.id === id; }); return c ? c.name : ''; }

/* ---------------- graphiques ---------------- */
var charts = [];
function chartBase() { if (window.Chart) { Chart.defaults.font.family = '"Rubik","PT Bold Heading",sans-serif'; Chart.defaults.font.size = 12; Chart.defaults.color = getComputedStyle(document.documentElement).getPropertyValue('--mute').trim() || '#8b98ae'; Chart.defaults.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--line').trim() || 'rgba(255,255,255,.08)'; } return { responsive: true, maintainAspectRatio: false, animation: false, plugins: { legend: { labels: { boxWidth: 12 } } } }; }
function mk(id, cfg) { var el = document.getElementById(id); if (!el || !window.Chart) return null; var c = new Chart(el, cfg); charts.push(c); return c; }

/* ---------------- rendu ---------------- */
var VIEWS = {};
function route(v, o) { Object.assign(S, { view: v }, o || {}); render(); window.scrollTo(0, 0); }
function render() {
  charts.forEach(function (c) { try { c.destroy(); } catch (e) {} }); charts = [];
  document.documentElement.lang = LANG; document.documentElement.dir = LANG === 'fr' ? 'ltr' : 'rtl';
  $('#lang-btn').textContent = LANG === 'fr' ? 'ع' : 'FR';
  $('#theme-btn').textContent = document.documentElement.getAttribute('data-theme') === 'light' ? '🌙' : '☀️';
  var logged = !!(API.url() && API.tk());
  $('#set-btn').classList.toggle('hide', !logged); $('#out-btn').classList.toggle('hide', !logged);
  $('#set-lbl').textContent = T('settings'); $('#out-lbl').textContent = T('logout');
  $('#hd-name').textContent = T('appName');
  $('#hd-sub').textContent = logged && DB.me ? (DB.me.role === 'admin' ? T('admin') : T('coach') + ' · ' + DB.me.name) : T('appSub');
  document.body.classList.toggle('auth', !logged);
  var app = $('#app');
  if (!API.url()) return vSetup(app);
  if (!API.tk()) return vLogin(app);
  if (!DB.me) { app.innerHTML = '<div class="card empty">…</div>'; load().then(render).catch(function () { toast(T('neterr')); }); return; }
  (VIEWS[S.view] || VIEWS.btVideo || vSettings)(app);
}
function authShell(inner) {
  return '<div class="auth-wrap"><button class="hbtn auth-lang" id="auth-lang" type="button">' + (LANG === 'fr' ? 'ع' : 'FR') + '</button>' +
    '<div class="auth-card"><img class="logo" src="logo.png" alt=""><div class="brand">' + T('appName') + '</div><div class="sub">🎥 ' + T('appSub') + '</div>' + inner + '</div></div>';
}
function vSetup(app) {
  app.innerHTML = authShell('<p class="small muted">' + T('setupP') + '</p><div class="f"><input id="api" class="ltr" placeholder="https://script.google.com/macros/s/…/exec"></div><button class="btn pri big" id="go" style="width:100%;justify-content:center">' + T('next') + '</button><p><a href="#" id="demo" class="small">' + T('demo') + '</a></p>');
  $('#auth-lang').onclick = function () { $('#lang-btn').click(); };
  $('#go').onclick = function () { var u = $('#api').value.trim(); if (!/^https:\/\/script\.google\.com\/.+\/exec$/.test(u)) { toast(T('apiUrl') + ' ✗'); return; } ls('wav_api', u); render(); };
  $('#demo').onclick = function (e) { e.preventDefault(); ls('wav_api', 'demo'); render(); };
}
function vLogin(app) {
  app.innerHTML = authShell('<form id="lf"><div class="f"><input type="password" id="pw" autocomplete="current-password" class="ltr" placeholder="' + T('codeP') + '"></div><button class="btn pri big" style="width:100%;justify-content:center">' + T('login') + ' →</button><p class="small muted" style="margin:14px 0 4px">' + T('loginHint') + '</p></form>');
  $('#auth-lang').onclick = function () { $('#lang-btn').click(); };
  $('#pw').focus();
  $('#lf').onsubmit = function (e) {
    e.preventDefault(); var b = $('#lf button'); b.disabled = true;
    API.call('login', { pw: $('#pw').value }).then(function (r) {
      b.disabled = false;
      if (!r.ok) { toast(T(r.err) || r.err); return; }
      ls('wav_tk', r.tk); if (r.first) toast(T('first'));
      return load().then(function () { route('btVideo'); });
    }).catch(function () { b.disabled = false; toast(T('neterr')); });
  };
}
/* --- paramètres --- */
function vSettings(app) {
  var h = '<button class="btn sm" id="bk">← ' + T('back') + '</button><h1>⚙ ' + T('settings') + '</h1>';
  if (isAdmin()) {
    var cs = DB.coaches || [];
    h += '<div class="card"><div class="row" style="margin-bottom:8px"><h3 class="sp" style="margin:0">👥 ' + T('coaches') + '</h3><button class="btn pri sm" id="addc">＋ ' + T('addCoach') + '</button></div><div id="cform"></div>' +
      (cs.length ? '<div class="tbl-wrap"><table><tr><th style="text-align:start">' + T('name') + '</th><th>' + T('phone') + '</th><th>' + T('code') + '</th><th>' + T('swimmers') + '</th><th></th><th></th></tr>' + cs.map(function (c) {
        return '<tr><td style="text-align:start"><b>' + esc(c.name) + '</b></td><td class="num">' + esc(c.phone || '') + '</td><td><span class="chip mono">' + esc(c.code) + '</span></td><td class="num">' + DB.swimmers.filter(function (s) { return s.coachId === c.id; }).length + '</td><td><span class="chip ' + (c.active === false ? 'bad' : 'ok') + '">' + T(c.active === false ? 'inactive' : 'active') + '</span></td><td><button class="btn sm" data-ec="' + c.id + '">✎</button></td></tr>';
      }).join('') + '</table></div>' : '<p class="muted">—</p>') + '</div>';
    h += '<form class="card" id="pwf"><h3>🔑 ' + T('changePw') + '</h3><div class="fr"><div class="f"><label>' + T('oldPw') + '</label><input type="password" name="o"></div><div class="f"><label>' + T('newPw') + '</label><input type="password" name="n"></div></div><button class="btn pri">' + T('save') + '</button></form>';
    h += '<div class="card"><h3>🔐 ' + T('logT') + '</h3><div id="loglist" class="small muted">…</div></div>';
    h += '<div class="card"><h3>🔗 ' + T('apiUrl') + '</h3><p class="small ltr muted" style="word-break:break-all">' + esc(API.url()) + '</p><button class="btn" id="bkp">⬇ ' + T('backup') + '</button></div>';
  }
  h += '<div class="card"><div class="row"><span class="sp muted">' + esc(DB.me ? DB.me.name : '') + '</span><button class="btn dan" id="lo">🚪 ' + T('logout') + '</button></div></div>';
  app.innerHTML = h;
  $('#bk').onclick = function () { route('btVideo'); };
  $('#lo').onclick = function () { $('#out-btn').click(); };
  if (!isAdmin()) return;
  $('#addc').onclick = function () { coachForm({}); };
  $$('[data-ec]').forEach(function (b) { b.onclick = function () { coachForm(DB.coaches.find(function (c) { return c.id === b.dataset.ec; })); }; });
  $('#pwf').onsubmit = function (e) { e.preventDefault(); API.call('changePw', { old: e.target.o.value, nw: e.target.n.value }).then(function (r) { toast(r.ok ? T('saved') : T(r.err)); if (r.ok) e.target.reset(); }).catch(function () { toast(T('neterr')); }); };
  $('#bkp').onclick = function () { var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(DB, null, 1)], { type: 'application/json' })); a.download = 'wathba-analyse-video-' + today() + '.json'; a.click(); };
  API.call('log').then(function (r) {
    var el = $('#loglist'); if (!el) return;
    el.innerHTML = r.ok && r.log && r.log.length ? '<div class="tbl-wrap" style="max-height:300px;overflow:auto"><table><tr><th>' + T('when') + '</th><th>' + T('who') + '</th><th></th></tr>' + r.log.map(function (x) { var d = new Date(x.t); return '<tr><td class="num">' + fmtDate(d.toISOString()) + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + '</td><td>' + esc(x.who || '—') + '</td><td><span class="chip ' + (x.ok ? 'ok' : 'bad') + '">' + T(x.ok ? 'okLogin' : 'failLogin') + '</span></td></tr>'; }).join('') + '</table></div>' : '—';
  }).catch(function () {});
}
function coachForm(c) {
  var box = $('#cform');
  box.innerHTML = '<form class="kbox" id="cf" style="margin-bottom:12px"><div class="fr"><div class="f"><label>' + T('name') + '</label><input name="name" required value="' + esc(c.name) + '"></div><div class="f"><label>' + T('phone') + '</label><input name="phone" class="ltr" value="' + esc(c.phone) + '"></div>' +
    '<div class="f"><label>' + T('code') + '<span class="hint">' + T('codeHint') + '</span></label><input name="code" required class="mono ltr" value="' + esc(c.code) + '"></div><div class="f"><label>' + T('active') + '</label><select name="active"><option value="1">' + T('active') + '</option><option value="0"' + (c.active === false ? ' selected' : '') + '>' + T('inactive') + '</option></select></div></div>' +
    '<div class="row"><button class="btn pri">' + T('save') + '</button><button type="button" class="btn" id="cc">' + T('cancel') + '</button><span class="sp"></span>' + (c.id ? '<button type="button" class="btn dan" id="cd">' + T('del') + '</button>' : '') + '</div></form>';
  $('#cc').onclick = function () { box.innerHTML = ''; };
  if (c.id) $('#cd').onclick = function () { if (confirm(T('confirmDel'))) API.call('delCoach', { id: c.id }).then(function (r) { if (!r.ok) return toast(T(r.err)); toast(T('deleted')); load().then(render); }); };
  $('#cf').onsubmit = function (e) {
    e.preventDefault(); var f = e.target, rec = Object.assign({}, c, { name: f.name.value.trim(), phone: f.phone.value.trim(), code: f.code.value.trim(), active: f.active.value === '1' });
    if (!/^(?=.*[0-9])(?=.*[A-Za-z]).{6,}$/.test(rec.code)) return toast(T('weakCode'));
    API.call('saveCoach', { rec: rec }).then(function (r) { if (!r.ok) return toast(T(r.err) || r.err); toast(T('saved')); load().then(render); }).catch(function () { toast(T('neterr')); });
  };
}
$('#lang-btn').onclick = function () { LANG = LANG === 'fr' ? 'ar' : 'fr'; ls('wav_lang', LANG); render(); };
$('#set-btn').onclick = function () { route('settings'); };
$('#theme-btn').onclick = function () { var t = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light'; document.documentElement.setAttribute('data-theme', t); ls('wav_theme', t); render(); };
$('#out-btn').onclick = function () { ls('wav_tk', null); DB = { swimmers: [], tests: [], coaches: [], me: null }; QUEUE = []; persist(); location.reload(); };
VIEWS.settings = vSettings;

window.VO2CORE = {
  $: $, $$: $$, esc: esc, ls: ls, today: today, uid: uid, T: T, D: D, C: C, R: R, F: F, API: API, S: S,
  db: function () { return DB; }, lang: function () { return LANG; }, route: route, render: render, mutate: mutate, load: load, toast: toast, sw: sw,
  isAdmin: isAdmin, coachName: coachName, visibleSwimmers: visibleSwimmers, fmtDate: fmtDate, chartBase: chartBase, mk: mk
};
window.BTV = { views: VIEWS };
document.addEventListener('DOMContentLoaded', function () { render(); if (API.tk()) flush(); });
})();
