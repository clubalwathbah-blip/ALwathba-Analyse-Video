/* MR WATHBA ANALYSE VIDÉO · BY OKBA — noyau (connexion, données, comptes, 📱 appareils) */
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
  appName: ['MR WATHBA ANALYSE VIDÉO', 'MR WATHBA ANALYSE VIDÉO'], appSub: ['تحليل التقنية والسرعة', 'Technique & vitesse'],
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
  when: ['الوقت', 'Quand'], who: ['شكون', 'Qui'],
  weakAdmin: ['رمز الإدارة ضعيف: لازم 10 حروف على الأقل، فيه أرقام وحروف (مثلاً Wathba-Batna-2026)', 'Code admin trop faible : 10+ caractères, chiffres et lettres (ex. Wathba-Batna-2026)'],
  mustChange: ['لازم تبدّل رمز الإدارة قبل ما تكمّل', 'Changez d’abord le code administration'], lockedAll: ['⛔ بزاف محاولات غالطة: الدخول تقفل ساعة. وصلك إيميل.', '⛔ Trop de tentatives : accès bloqué 1 h. Un e-mail vous a été envoyé.'],
  forceT: ['🛡 بدّل رمز الإدارة', '🛡 Changez le code administration'], forceP: ['الرمز الحالي ضعيف وساهل يتخمّن. اختار رمز جديد: 10 حروف على الأقل، فيه أرقام وحروف. سجّلو في بلاصة آمنة.', 'Le code actuel est trop faible. Choisissez un code de 10+ caractères avec chiffres et lettres. Notez-le en lieu sûr.'],
  confirmPw: ['عاود الرمز الجديد', 'Confirmer le nouveau code'], mismatch: ['الرمزين ماهمش كيف كيف', 'Les deux codes diffèrent'],
  retry: ['عاود', 'Réessayer'], srvHelp: ['السيرفر ما جاوبش مليح. إذا بدّلت Code.gs: نفّذ autoriserEmail وقبل الإذن، ومن بعد Nouvelle version.', 'Le serveur ne répond pas correctement. Si Code.gs a changé : exécuter autoriserEmail, accepter, puis Nouvelle version.'],
  secT: ['الحماية', 'Sécurité'], alertOn: ['ابعثلي إيميل كي يدخل واحد بحساب الإدارة', 'M’envoyer un e-mail à chaque connexion administration'], alertTo: ['التنبيهات توصل لـ', 'Alertes envoyées à'],
  logoutAll: ['🚪 خرّج كامل الأجهزة', '🚪 Déconnecter tous les appareils'], logoutAllP: ['يقطع كامل الجلسات المفتوحة. (هاتف مدرب ضاع؟ الأحسن «✕ فك الجهاز» قدام اسمو.)', 'Ferme toutes les sessions ouvertes. (Téléphone d’entraîneur perdu ? Utilisez plutôt « ✕ Retirer l’appareil ».)'],
  logoutAllQ: ['متأكد؟ كامل الأجهزة يخرجو', 'Confirmer ? Tous les appareils seront déconnectés'],
  devWait: ['⏳ هاذ الجهاز يستنى موافقة الإدارة.', '⏳ Cet appareil attend l’accord de l’administration.'],
  devNeedLink: ['🔗 حساب المدرب يتفتح غير بالرابط الشخصي اللي تبعثو الإدارة (مرة وحدة في الهاتف تاعك).', '🔗 Le compte entraîneur s’ouvre uniquement avec le lien personnel envoyé par l’administration.'],
  devOther: ['📵 هاذ الحساب مربوط بجهاز آخر. إذا بدلت الهاتف، اطلب من الإدارة رابط جديد.', '📵 Ce compte est lié à un autre appareil. Nouveau téléphone : demandez un nouveau lien.'],
  linkUsed: ['⛔ هاذ الرابط تستعمل من قبل ولا تبدّل. اطلب من الإدارة رابط جديد.', '⛔ Ce lien a déjà été utilisé ou remplacé. Demandez un nouveau lien.'],
  devBlocked: ['⛔ هاذ الجهاز ممنوع.', '⛔ Cet appareil est bloqué.'],
  devRevoked: ['🔒 الإدارة نحّات هاذ الجهاز، والبيانات تمسحت منو.', '🔒 L’administration a retiré cet appareil ; les données locales ont été effacées.'],
  devOld: ['⬆️ حدّث التطبيق (أعد تحميل الصفحة).', '⬆️ Mettez l’application à jour (rechargez la page).'],
  lastDev: ['لازم يبقى جهاز مقبول واحد على الأقل', 'Il faut garder au moins un appareil accepté'],
  devT: ['📱 أجهزة الإدارة', '📱 Appareils de l’administration'], device: ['الجهاز', 'Appareil'], noDev: ['ما تربطش', 'non lié'], linkSent: ['رابط مبعوث', 'lien envoyé'],
  lnkBtn: ['🔗 رابط', '🔗 Lien'], unbind: ['فك الجهاز', 'Retirer l’appareil'], copy: ['نسخ', 'Copier'], thisDev: ['هاذ الجهاز', 'cet appareil'],
  accept: ['قبول', 'Accepter'], block: ['منع', 'Bloquer'], accepted: ['مقبول', 'accepté'], blocked: ['ممنوع', 'bloqué'], pending: ['يستنى الموافقة', 'en attente'], lastSeen: ['آخر دخول ', 'vu le '],
  devHelp: ['أي جهاز جديد يدخل برمز الإدارة يبان هنا «يستنى»، وما يتفتحلو والو حتى تقبلو (ويوصلك إيميل). إذا ضاع هاتفك: امنعو من جهاز آخر.', 'Tout nouvel appareil utilisant le code admin apparaît « en attente » jusqu’à votre accord (e-mail envoyé).'],
  coachDevHelp: ['📱 كل مدرب يخدم في هاتف واحد: ابعثلو 🔗 الرابط الشخصي (يخدم مرة وحدة)، يفتحو في الهاتف تاعو ويكتب الرمز تاعو مرة وحدة، ومن بعد التطبيق يتحل وحدو. هاتف آخر ما يقدرش يفتح الحساب.', '📱 Un téléphone par entraîneur : envoyez 🔗 le lien personnel (usage unique), il l’ouvre sur son téléphone et saisit son code une fois ; ensuite l’app s’ouvre seule. Aucun autre appareil ne peut ouvrir le compte.'],
  linkHead: ['<b>ربط هاذ الجهاز بالحساب تاعك.</b> اكتب الرمز تاعك <b>مرة وحدة</b>. من بعد التطبيق يتحل وحدو في هاذ الجهاز برك.', '<b>Lier cet appareil à votre compte.</b> Saisissez votre code <b>une seule fois</b> ; ensuite l’app s’ouvre seule sur cet appareil uniquement.'],
  linkBtn: ['🔗 ربط الجهاز', '🔗 Lier l’appareil'], coachFirst: ['المدربين: أول مرة، افتح الرابط الشخصي اللي بعثتهولك الإدارة.', 'Entraîneurs : la 1re fois, ouvrez le lien personnel envoyé par l’administration.'],
  waitHow: ['قول للإدارة: ⚙ الإعدادات ← 📱 أجهزة الإدارة ← اقبل الجهاز اللي رقمو هذا.', 'Demandez : ⚙ Paramètres ← 📱 Appareils ← accepter ce code.'], again: ['🔄 عاود جرب', '🔄 Réessayer'], opening: ['⏳ نفتح…', '⏳ Ouverture…'],
  codeKeep: ['خلّيه فارغ باش يبقى نفس الرمز', 'Laisser vide pour garder le même code'], codeOnce: ['الرموز مخبّيين ما يبانوش. كي تبدّل رمز مدرب، سجّلو وعطيهولو.', 'Les codes sont chiffrés et invisibles. En changeant un code, notez-le et transmettez-le.']
};
function T(k) { var v = D[k]; return v ? (LANG === 'fr' ? v[1] : v[0]) : k; }

/* ---------------- serveur ---------------- */
var DEFAULT_API = 'https://script.google.com/macros/s/AKfycbzd8TmPOJHySMIZJzYCSiitGXHiQpe6Cka64vML0banBpa3poEAnVX5D4eupqq9VeMM/exec';
(function () { try { var q = new URLSearchParams(location.search).get('api'); if (q && /^https:\/\/script\.google\.com\/.+\/exec$/.test(q)) localStorage.setItem('wav_api', q); } catch (e) {} })();
// 📱 هوية الجهاز: رقم + سر عشوائيين، ما يخرجوش من هاذ المتصفح (السيرفر يحفظ غير البصمة تاع السر)
function rndHex(n) { var a = new Uint8Array(n); (window.crypto || window.msCrypto).getRandomValues(a); return Array.prototype.map.call(a, function (x) { return ('0' + x.toString(16)).slice(-2); }).join(''); }
function devInfo() {
  var di = ls('wav_di'), dk = ls('wav_dk');
  if (!/^[a-f0-9]{16,64}$/.test(di || '') || !/^[a-f0-9]{32,128}$/.test(dk || '')) { di = rndHex(12); dk = rndHex(24); ls('wav_di', di); ls('wav_dk', dk); }
  var u = navigator.userAgent || '', os = /Macintosh/.test(u) && navigator.maxTouchPoints > 1 ? 'iPad' : /iPhone/.test(u) ? 'iPhone' : /Android/.test(u) ? 'Android' : /Windows/.test(u) ? 'Windows' : /Mac/.test(u) ? 'Mac' : /Linux/.test(u) ? 'Linux' : '?';
  var br = /Edg\//.test(u) ? 'Edge' : /SamsungBrowser/.test(u) ? 'Samsung' : /OPR\//.test(u) ? 'Opera' : /Firefox/.test(u) ? 'Firefox' : /CriOS|Chrome/.test(u) ? 'Chrome' : /Safari/.test(u) ? 'Safari' : '';
  return { di: di, dk: dk, label: os + (br ? ' · ' + br : ''), code: di.slice(0, 4).toUpperCase() };
}
function wipeLocal(msg) { // جهاز ممنوع ولا مفكوك: نمسحو كلش من هاذ الجهاز
  ['wav_tk', 'wav_cache', 'wav_queue', 'wav_mc', 'wav_role'].forEach(function (k) { ls(k, null); });
  DB = { swimmers: [], tests: [], coaches: [], me: null }; QUEUE = []; S.authMsg = msg || ''; render();
}
var API = {
  url: function () { return ls('wav_api') || DEFAULT_API; },
  tk: function () { return ls('wav_tk') || ''; },
  raw: function (p) {
    if (API.url() === 'demo') return Promise.resolve(Local.call(p));
    return fetch(API.url(), { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(p), redirect: 'follow' }).then(function (r) { return r.json(); });
  },
  call: function (a, p, again) {
    p = p || {}; p.a = a; p.tk = API.tk();
    if (a === 'login' || a === 'devLogin') { var Dv = devInfo(); p.di = Dv.di; p.dk = Dv.dk; p.label = Dv.label; }
    return API.raw(p).then(function (r) {
      if (r && !r.ok && r.err === 'devRevoked') { wipeLocal('devRevoked'); throw new Error('auth'); }
      if (r && !r.ok && r.err === 'mustChange') { ls('wav_mc', '1'); render(); throw new Error('auth'); }
      if (r && !r.ok && r.err === 'auth') {
        // المدرب: الجهاز المربوط يرجع يدخل وحدو
        if (!again && ls('wav_role') === 'coach') return API.call('devLogin', {}, true).then(function (x) {
          if (x.ok) { ls('wav_tk', x.tk); var q = Object.assign({}, p); delete q.tk; return API.call(a, q, true); }
          if (x.err === 'devNeedLink' || x.err === 'devBlocked') { wipeLocal(x.err); throw new Error('auth'); }
          ls('wav_tk', null); render(); throw new Error('auth');
        });
        ls('wav_tk', null); render(); throw new Error('auth');
      }
      return r;
    });
  }
};
// serveur local d'essai — mêmes règles que Code.gs
var Local = {
  db: function () { try { var d = JSON.parse(ls('wav_demo') || '{}'); d.s = d.s || []; d.t = d.t || []; d.c = d.c || []; d.log = d.log || []; return d; } catch (e) { return { s: [], t: [], c: [], log: [] }; } },
  put: function (d) { ls('wav_demo', JSON.stringify(d)); },
  call: function (p) {
    var d = Local.db(), now = new Date().toISOString(); d.ad = d.ad || [];
    if (p.a === 'devLogin') { var cd = d.c.find(function (x) { return x.dev && x.dev.id === p.di && x.dev.h === p.dk; }); if (!cd) return { ok: false, err: 'devNeedLink' }; if (cd.active === false) return { ok: false, err: 'devBlocked' }; return { ok: true, tk: 'demo-coach-' + cd.id + '|' + p.di, role: 'coach' }; }
    if (p.a === 'login') {
      var first = false;
      if (!d.pw) { if (!strongPw(p.pw)) return { ok: false, err: 'weakAdmin' }; d.pw = p.pw; first = true; }
      var c = p.pw === d.pw ? null : d.c.find(function (x) { return x.code === p.pw && x.active !== false; }), okk = p.pw === d.pw || !!c;
      d.log.push({ t: now, who: okk ? (c ? c.name : 'Administration') : '', ok: okk });
      if (!okk) { Local.put(d); return { ok: false, err: 'bad' }; }
      if (!c) {
        var ad = d.ad.find(function (x) { return x.id === p.di; });
        if (!d.ad.some(function (x) { return x.ok && !x.blocked; })) { if (!ad) { ad = { id: p.di }; d.ad.push(ad); } Object.assign(ad, { h: p.dk, label: p.label, ok: true, blocked: false, at: now }); }
        else if (!ad) { d.ad.push({ id: p.di, h: p.dk, label: p.label, ok: false, at: now }); Local.put(d); return { ok: false, err: 'devWait', code: p.di.slice(0, 4).toUpperCase() }; }
        else if (ad.h !== p.dk) return { ok: false, err: 'devOther' };
        else if (ad.blocked) return { ok: false, err: 'devBlocked' };
        else if (!ad.ok) return { ok: false, err: 'devWait', code: p.di.slice(0, 4).toUpperCase() };
        ad.last = now; Local.put(d);
        return { ok: true, tk: 'demo-admin|' + p.di, role: 'admin', first: first, weak: !strongPw(p.pw) };
      }
      if (p.inv) { if (!c.inv || c.inv.tk !== p.inv) return { ok: false, err: 'linkUsed' }; c.dev = { id: p.di, h: p.dk, label: p.label, at: now }; delete c.inv; }
      else if (!c.dev) return { ok: false, err: 'devNeedLink' };
      else if (c.dev.id !== p.di || c.dev.h !== p.dk) return { ok: false, err: 'devOther' };
      c.dev.last = now; Local.put(d);
      return { ok: true, tk: 'demo-coach-' + c.id + '|' + p.di, role: 'coach' };
    }
    var tk = String(p.tk || ''), tdi = tk.split('|')[1] || '', w = null; tk = tk.split('|')[0];
    if (tk === 'demo-admin') { var ad2 = d.ad.find(function (x) { return x.id === tdi; }); if (!ad2 || !ad2.ok || ad2.blocked) return { ok: false, err: 'devRevoked' }; w = { role: 'admin', name: 'Administration', di: tdi }; }
    if (!w && tk.indexOf('demo-coach-') === 0) { var co = d.c.find(function (x) { return x.id === tk.slice(11); }); if (co && (co.active === false || !co.dev || co.dev.id !== tdi)) return { ok: false, err: 'devRevoked' }; if (co) w = { role: 'coach', id: co.id, name: co.name }; }
    if (!w) return { ok: false, err: 'auth' };
    if (w.role === 'admin' && !strongPw(d.pw) && p.a !== 'changePw') return { ok: false, err: 'mustChange' };
    var own = function (s) { return w.role === 'admin' || (s && s.coachId === w.id); }, S_ = function (id) { return d.s.find(function (x) { return x.id === id; }); };
    function up(arr, rec) { if (!rec.id) rec.id = uid(); rec.updated = new Date().toISOString(); var i = arr.findIndex(function (x) { return x.id === rec.id; }); if (i >= 0) arr[i] = rec; else arr.push(rec); return rec; }
    var r = { ok: true };
    if (p.a === 'all') { var ss = d.s.filter(own), ids = {}; ss.forEach(function (x) { ids[x.id] = 1; }); r.swimmers = ss; r.tests = d.t.filter(function (t) { return ids[t.swimmerId]; }); r.coaches = w.role === 'admin' ? d.c.map(function (c) { var o = Object.assign({}, c); delete o.code; if (o.dev) o.dev = { label: o.dev.label, at: o.dev.at, last: o.dev.last, code: String(o.dev.id).slice(0, 4).toUpperCase() }; if (o.inv) o.inv = { at: o.inv.at }; return o; }) : []; r.me = { role: w.role, id: w.id || null, name: w.name }; }
    else if (p.a === 'saveSwimmer') { var o = S_(p.rec.id); if (o && !own(o)) return { ok: false, err: 'forbidden' }; if (w.role !== 'admin') p.rec.coachId = w.id; r.rec = up(d.s, p.rec); }
    else if (p.a === 'delSwimmer') { if (!own(S_(p.id))) return { ok: false, err: 'forbidden' }; d.s = d.s.filter(function (x) { return x.id !== p.id; }); d.t = d.t.filter(function (x) { return x.swimmerId !== p.id; }); }
    else if (p.a === 'saveTest') { if (!own(S_(p.rec.swimmerId))) return { ok: false, err: 'forbidden' }; p.rec.by = p.rec.by || w.name; r.rec = up(d.t, p.rec); }
    else if (p.a === 'delTest') { var t = d.t.find(function (x) { return x.id === p.id; }); if (t && !own(S_(t.swimmerId))) return { ok: false, err: 'forbidden' }; d.t = d.t.filter(function (x) { return x.id !== p.id; }); }
    else if (p.a === 'saveCoach') { if (w.role !== 'admin') return { ok: false, err: 'forbidden' }; var oc = d.c.find(function (c) { return c.id === p.rec.id; }); if (!p.rec.code && oc) p.rec.code = oc.code; delete p.rec.dev; delete p.rec.inv; if (oc && oc.dev) p.rec.dev = oc.dev; if (oc && oc.inv) p.rec.inv = oc.inv; if (!/^(?=.*[0-9])(?=.*[A-Za-z]).{6,}$/.test(String(p.rec.code || ''))) return { ok: false, err: 'weakCode' }; if (d.c.some(function (c) { return c.code === p.rec.code && c.id !== p.rec.id; }) || p.rec.code === d.pw) return { ok: false, err: 'dupcode' }; r.rec = up(d.c, p.rec); }
    else if (p.a === 'delCoach') { if (w.role !== 'admin') return { ok: false, err: 'forbidden' }; d.c = d.c.filter(function (c) { return c.id !== p.id; }); }
    else if (p.a === 'changePw') { if (p.old !== d.pw) return { ok: false, err: 'bad' }; if (!strongPw(p.nw)) return { ok: false, err: 'weakAdmin' }; d.pw = p.nw; r.tk = 'demo-admin|' + w.di; }
    else if (p.a === 'sec') { r.alert = d.alert !== false; r.mail = 'demo@gmail.com'; }
    else if (p.a === 'setAlert') d.alert = !!p.on;
    else if (p.a === 'logoutAll') {}
    else if (p.a === 'coachLink') { if (w.role !== 'admin') return { ok: false, err: 'forbidden' }; var cl = d.c.find(function (x) { return x.id === p.id; }); cl.inv = { tk: rndHex(20), at: now }; delete cl.dev; r.tk = cl.inv.tk; }
    else if (p.a === 'coachUnbind') { if (w.role !== 'admin') return { ok: false, err: 'forbidden' }; var cu = d.c.find(function (x) { return x.id === p.id; }); if (cu) { delete cu.dev; delete cu.inv; } }
    else if (p.a === 'devs') { if (w.role !== 'admin') return { ok: false, err: 'forbidden' }; r.me = w.di; r.list = d.ad.map(function (x) { return { id: x.id, code: String(x.id).slice(0, 4).toUpperCase(), label: x.label, ok: !!x.ok, blocked: !!x.blocked, at: x.at, last: x.last }; }); }
    else if (p.a === 'devSet') { if (w.role !== 'admin') return { ok: false, err: 'forbidden' }; var dv = d.ad.find(function (x) { return x.id === p.id; }); if (dv) { if (p.op === 'ok') { dv.ok = true; dv.blocked = false; } else { if (!d.ad.some(function (x) { return x.ok && !x.blocked && x.id !== p.id; })) return { ok: false, err: 'lastDev' }; if (p.op === 'block') { dv.ok = false; dv.blocked = true; } else d.ad.splice(d.ad.indexOf(dv), 1); } } }
    else if (p.a === 'log') r.log = d.log.slice().reverse();
    Local.put(d); return JSON.parse(JSON.stringify(r));
  }
};

/* ---------------- état ---------------- */
var DB = { swimmers: [], tests: [], coaches: [], me: null };
try { var cache = JSON.parse(ls('wav_cache') || 'null'); if (cache) DB = cache; } catch (e) {}
var QUEUE = []; try { QUEUE = JSON.parse(ls('wav_queue') || '[]'); } catch (e) {}
var S = { view: 'btVideo', authMsg: '', wait: null };
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
  $('#hd-name').innerHTML = 'MR WATHBA ANALYSE VIDÉO <small class="hd-by">· BY OKBA</small>';
  $('#hd-sub').textContent = logged && DB.me ? (DB.me.role === 'admin' ? T('admin') : T('coach') + ' · ' + DB.me.name) : T('appSub');
  document.body.classList.toggle('auth', !logged);
  var app = $('#app');
  if (!API.url()) return vSetup(app);
  if (!API.tk()) return vLogin(app);
  if (ls('wav_mc')) return vForce(app);
  if (!DB.me) {
    app.innerHTML = '<div class="card empty">…</div>';
    var fail = function (m) { if (!API.tk() || ls('wav_mc')) return; app.innerHTML = '<div class="card empty"><p>⚠ ' + esc(m) + '</p><p class="small muted">' + T('srvHelp') + '</p><div class="row" style="justify-content:center;gap:8px"><button class="btn pri" id="rty">↻ ' + T('retry') + '</button><button class="btn" id="rlo">' + T('logout') + '</button></div></div>'; $('#rty').onclick = render; $('#rlo').onclick = function () { $('#out-btn').click(); }; };
    load().then(function (r) { if (r && r.ok) render(); else fail(T(r && r.err) || (r && r.err) || T('neterr')); }).catch(function (e) { if (e && e.message === 'auth') return; fail(T('neterr')); });
    return;
  }
  (VIEWS[S.view] || VIEWS.btVideo || vSettings)(app);
}
function authShell(inner) {
  return '<div class="auth-wrap"><button class="hbtn auth-lang" id="auth-lang" type="button">' + (LANG === 'fr' ? 'ع' : 'FR') + '</button>' +
    '<div class="auth-card"><img class="logo" src="logo.png" alt=""><div class="brand ltr">' + T('appName') + '</div><div class="by">BY OKBA</div><div class="sub">🎥 ' + T('appSub') + '</div>' + inner + '</div></div>';
}
function vSetup(app) {
  app.innerHTML = authShell('<p class="small muted">' + T('setupP') + '</p><div class="f"><input id="api" class="ltr" placeholder="https://script.google.com/macros/s/…/exec"></div><button class="btn pri big" id="go" style="width:100%;justify-content:center">' + T('next') + '</button><p><a href="#" id="demo" class="small">' + T('demo') + '</a></p>');
  $('#auth-lang').onclick = function () { $('#lang-btn').click(); };
  $('#go').onclick = function () { var u = $('#api').value.trim(); if (!/^https:\/\/script\.google\.com\/.+\/exec$/.test(u)) { toast(T('apiUrl') + ' ✗'); return; } ls('wav_api', u); render(); };
  $('#demo').onclick = function (e) { e.preventDefault(); ls('wav_api', 'demo'); render(); };
}
function vLogin(app) {
  var inv = (location.hash.match(/inv=([a-f0-9]{16,80})/) || [])[1] || '', Dv = devInfo();
  var msg = S.authMsg ? '<div class="auth-msg">' + esc(T(S.authMsg)) + '</div>' : '';
  // المدرب اللي جهازو مربوط: يدخل وحدو
  if (!inv && ls('wav_role') === 'coach' && !S.devTried) {
    S.devTried = true; app.innerHTML = authShell('<div class="auth-msg">' + T('opening') + '</div>'); $('#auth-lang').onclick = function () { $('#lang-btn').click(); };
    API.call('devLogin', {}, true).then(function (r) { if (r.ok) { ls('wav_tk', r.tk); S.authMsg = ''; return load().then(function () { route('btVideo'); }); } S.authMsg = r.err; if (r.err === 'devNeedLink' || r.err === 'devBlocked') ls('wav_role', null); render(); }).catch(function () { S.authMsg = ''; app.innerHTML = authShell('<div class="auth-msg">' + T('neterr') + '</div>'); $('#auth-lang').onclick = function () { $('#lang-btn').click(); }; });
    return;
  }
  if (S.wait) {
    app.innerHTML = authShell('<div class="auth-msg">' + T('devWait') + '</div><div class="auth-code">' + esc(S.wait.code) + '</div><p class="small muted">' + esc(Dv.label) + '<br>' + T('waitHow') + '</p><button class="btn pri big" id="w-again" type="button" style="width:100%;justify-content:center">' + T('again') + '</button><p><a href="#" id="w-back" class="small">' + T('back') + '</a></p>');
    $('#auth-lang').onclick = function () { $('#lang-btn').click(); };
    $('#w-back').onclick = function (e) { e.preventDefault(); S.wait = null; render(); };
    $('#w-again').onclick = function () { var b = this; b.disabled = true; doLogin(S.lastPw, '', b); };
    return;
  }
  var head = inv ? '<div class="auth-msg gold">🔗 ' + T('linkHead') + '</div>' : '';
  app.innerHTML = authShell(msg + head + '<form id="lf"><div class="f"><input type="password" id="pw" autocomplete="current-password" class="ltr" placeholder="' + T('codeP') + '"></div><button class="btn pri big" style="width:100%;justify-content:center">' + (inv ? T('linkBtn') : T('login') + ' →') + '</button><p class="small muted" style="margin:14px 0 4px">' + (inv ? '' : T('loginHint') + '<br>' + T('coachFirst')) + '</p></form><div class="auth-dev ltr">📱 ' + esc(Dv.label) + ' · ' + Dv.code + '</div>');
  $('#auth-lang').onclick = function () { $('#lang-btn').click(); };
  $('#pw').focus();
  $('#lf').onsubmit = function (e) {
    e.preventDefault(); var b = $('#lf button'); b.disabled = true;
    S.lastPw = $('#pw').value; doLogin(S.lastPw, inv, b);
  };
}
function doLogin(pw0, inv, b) {
  var p = { pw: pw0 }; if (inv) p.inv = inv;
  API.call('login', p).then(function (r) {
    if (b) b.disabled = false;
    if (!r.ok) {
      if (r.err === 'devWait') { S.wait = { code: r.code || devInfo().code }; return render(); }
      S.wait = null; S.authMsg = /^dev|^link/.test(r.err) ? r.err : '';
      if (S.authMsg) render(); else toast(T(r.err) || r.err);
      return;
    }
    S.wait = null; S.authMsg = ''; S.lastPw = '';
    ls('wav_tk', r.tk); ls('wav_role', r.role); if (r.first) toast(T('first'));
    if (inv) try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { location.hash = ''; }
    if (r.weak) { ls('wav_mc', '1'); window._pw0 = pw0; render(); return; }
    return load().then(function () { route('btVideo'); });
  }).catch(function () { if (b) b.disabled = false; toast(T('neterr')); });
}
window.addEventListener('hashchange', function () { if (/inv=/.test(location.hash) && !API.tk()) { S.authMsg = ''; S.wait = null; render(); } });
function vForce(app) {
  app.innerHTML = authShell('<form id="ff"><h3 style="margin:10px 0 6px">' + T('forceT') + '</h3><p class="small muted">' + T('forceP') + '</p><div class="f"><input type="password" name="o" class="ltr" placeholder="' + T('oldPw') + '" autocomplete="current-password"></div><div class="f"><input type="password" name="n" class="ltr" placeholder="' + T('newPw') + '" autocomplete="new-password"></div><div class="f"><input type="password" name="c" class="ltr" placeholder="' + T('confirmPw') + '" autocomplete="new-password"></div><button class="btn pri big" style="width:100%;justify-content:center">' + T('save') + '</button><p><a href="#" id="fo" class="small">' + T('logout') + '</a></p></form>');
  var f = $('#ff'); if (window._pw0) f.o.value = window._pw0;
  $('#auth-lang').onclick = function () { $('#lang-btn').click(); };
  $('#fo').onclick = function (e) { e.preventDefault(); ls('wav_mc', null); $('#out-btn').click(); };
  f.onsubmit = function (e) {
    e.preventDefault(); var n = f.n.value.trim();
    if (n !== f.c.value.trim()) return toast(T('mismatch'));
    if (!strongPw(n)) return toast(T('weakAdmin'));
    API.call('changePw', { old: f.o.value, nw: n }).then(function (r) { if (!r.ok) return toast(T(r.err) || r.err); if (r.tk) ls('wav_tk', r.tk); ls('wav_mc', null); window._pw0 = null; toast(T('saved')); DB.me = null; render(); }).catch(function () { toast(T('neterr')); });
  };
}
function strongPw(pw) { pw = String(pw || ''); return pw.length >= 10 && /[0-9]/.test(pw) && /[^0-9]/.test(pw) && !/^(.)\1+$/.test(pw) && !/^(0123456789|1234567890|azerty|qwerty|password)/i.test(pw); }
/* --- paramètres --- */
function vSettings(app) {
  var h = '<button class="btn sm" id="bk">← ' + T('back') + '</button><h1>⚙ ' + T('settings') + '</h1>';
  if (isAdmin()) {
    var cs = DB.coaches || [];
    h += '<div class="card"><div class="row" style="margin-bottom:8px"><h3 class="sp" style="margin:0">👥 ' + T('coaches') + '</h3><button class="btn pri sm" id="addc">＋ ' + T('addCoach') + '</button></div><div id="cform"></div>' +
      (cs.length ? '<div class="tbl-wrap"><table><tr><th style="text-align:start">' + T('name') + '</th><th>' + T('phone') + '</th><th>' + T('code') + '</th><th>' + T('device') + '</th><th>' + T('swimmers') + '</th><th></th><th></th></tr>' + cs.map(function (c) {
        var dv = c.dev ? '<span class="chip ok" title="' + esc(c.dev.code || '') + '">📱 ' + esc(c.dev.label || '?') + '</span>' : c.inv ? '<span class="chip warn">🔗 ' + T('linkSent') + '</span>' : '<span class="chip">' + T('noDev') + '</span>';
        dv += ' <button class="btn sm" data-lnk="' + c.id + '">' + T('lnkBtn') + '</button>' + (c.dev || c.inv ? ' <button class="btn sm dan" data-unb="' + c.id + '" title="' + esc(T('unbind')) + '">✕</button>' : '') + '<div id="lnk-' + c.id + '"></div>';
        return '<tr><td style="text-align:start"><b>' + esc(c.name) + '</b></td><td class="num">' + esc(c.phone || '') + '</td><td><span class="chip mono">🔒 ••••••</span></td><td style="text-align:start;white-space:nowrap">' + dv + '</td><td class="num">' + DB.swimmers.filter(function (s) { return s.coachId === c.id; }).length + '</td><td><span class="chip ' + (c.active === false ? 'bad' : 'ok') + '">' + T(c.active === false ? 'inactive' : 'active') + '</span></td><td><button class="btn sm" data-ec="' + c.id + '">✎</button></td></tr>';
      }).join('') + '</table></div>' : '<p class="muted">—</p>') + '<p class="small muted">🔒 ' + T('codeOnce') + '</p><p class="small muted">' + T('coachDevHelp') + '</p></div>';
    h += '<div class="card"><h3>' + T('devT') + '</h3><div id="devlist" class="small muted">…</div></div>';
    h += '<form class="card" id="pwf"><h3>🔑 ' + T('changePw') + '</h3><div class="fr"><div class="f"><label>' + T('oldPw') + '</label><input type="password" name="o"></div><div class="f"><label>' + T('newPw') + '</label><input type="password" name="n"></div></div><button class="btn pri">' + T('save') + '</button></form>';
    h += '<div class="card"><h3>🛡 ' + T('secT') + '</h3><label class="row small" style="gap:8px;cursor:pointer;margin:0 0 10px"><input type="checkbox" id="alrt" style="width:auto;min-height:0"> ' + T('alertOn') + '</label><div class="small muted" id="alrtto"></div><p class="small muted" style="margin-top:12px">' + T('logoutAllP') + '</p><button class="btn dan" id="lall">' + T('logoutAll') + '</button></div>';
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
  $$('[data-lnk]').forEach(function (b) { b.onclick = function () {
    var c = DB.coaches.find(function (x) { return x.id === b.dataset.lnk; });
    if (c.dev && !confirm((LANG === 'fr' ? 'Un nouveau lien retire l’appareil actuel de ' + c.name + '. Continuer ?' : 'رابط جديد يفك الجهاز تاع ' + c.name + ' (' + (c.dev.label || '') + '). نكملو؟'))) return;
    b.disabled = true;
    API.call('coachLink', { id: c.id }).then(function (r) {
      b.disabled = false; if (!r.ok) return toast(T(r.err) || r.err);
      var url = location.origin + location.pathname + '#inv=' + r.tk, box = $('#lnk-' + c.id);
      var txt = 'MR WATHBA ANALYSE VIDÉO · BY OKBA\n' + (LANG === 'fr' ? 'Bonjour ' + c.name + ', votre lien personnel (un seul téléphone, une seule fois). Ouvrez-le sur votre téléphone et saisissez votre code :' : 'السلام ' + c.name + '، هذا الرابط تاعك (يخدم في هاتف واحد، مرة وحدة). افتحو في الهاتف تاعك واكتب الرمز تاعك:') + '\n' + url;
      box.innerHTML = '<div class="kbox" style="margin-top:6px;white-space:normal;max-width:320px"><div class="small ltr" style="word-break:break-all">' + esc(url) + '</div><div class="row" style="gap:6px;margin-top:6px"><button class="btn sm" data-cp="1">📋 ' + T('copy') + '</button><a class="btn sm" target="_blank" rel="noopener" href="https://wa.me/' + String(c.phone || '').replace(/[^0-9]/g, '') + '?text=' + encodeURIComponent(txt) + '">WhatsApp</a></div></div>';
      $('[data-cp]', box).onclick = function () { (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(function () { toast('✅'); }).catch(function () { prompt('', url); }); };
      c.inv = { at: today() }; delete c.dev; persist();
    }).catch(function () { b.disabled = false; toast(T('neterr')); });
  }; });
  $$('[data-unb]').forEach(function (b) { b.onclick = function () {
    var c = DB.coaches.find(function (x) { return x.id === b.dataset.unb; });
    if (!confirm(LANG === 'fr' ? 'Retirer l’appareil de ' + c.name + ' ? Il devra recevoir un nouveau lien.' : 'نفكّو الجهاز تاع ' + c.name + '؟ يخرج من التطبيق ويحتاج رابط جديد.')) return;
    API.call('coachUnbind', { id: c.id }).then(function (r) { if (!r.ok) return toast(T(r.err) || r.err); toast(T('saved')); load().then(render); }).catch(function () { toast(T('neterr')); });
  }; });
  var devPaint = function () {
    API.call('devs').then(function (r) {
      var el = $('#devlist'); if (!el) return; if (!r.ok) { el.textContent = '—'; return; }
      el.innerHTML = '<div class="tbl-wrap"><table>' + r.list.map(function (d) {
        var me = d.id === r.me;
        return '<tr><td>' + (d.blocked ? '⛔' : d.ok ? '✅' : '⏳') + '</td><td style="text-align:start"><b>' + esc(d.label || '?') + '</b> <span class="chip mono">' + esc(d.code) + '</span>' + (me ? ' <span class="chip ok">' + T('thisDev') + '</span>' : '') + '<div class="small muted">' + T(d.blocked ? 'blocked' : d.ok ? 'accepted' : 'pending') + (d.last ? ' · ' + T('lastSeen') + fmtDate(String(d.last).slice(0, 10)) : '') + '</div></td><td style="white-space:nowrap">' +
          (!d.ok ? '<button class="btn sm pri" data-dv="' + d.id + '" data-op="ok">✅ ' + T('accept') + '</button> ' : '') + (!me && !d.blocked ? '<button class="btn sm" data-dv="' + d.id + '" data-op="block">⛔ ' + T('block') + '</button> ' : '') + (!me ? '<button class="btn sm dan" data-dv="' + d.id + '" data-op="del">🗑</button>' : '') + '</td></tr>';
      }).join('') + '</table></div><p class="small muted" style="margin-top:6px">' + T('devHelp') + '</p>';
      $$('[data-dv]', el).forEach(function (b) { b.onclick = function () { if (b.dataset.op !== 'ok' && !confirm('?')) return; API.call('devSet', { id: b.dataset.dv, op: b.dataset.op }).then(function (x) { if (!x.ok) return toast(T(x.err) || x.err); devPaint(); }).catch(function () { toast(T('neterr')); }); }; });
    }).catch(function () {});
  };
  devPaint();
  $('#pwf').onsubmit = function (e) { e.preventDefault(); if (!strongPw(e.target.n.value.trim())) return toast(T('weakAdmin')); API.call('changePw', { old: e.target.o.value, nw: e.target.n.value.trim() }).then(function (r) { toast(r.ok ? T('saved') : T(r.err)); if (r.ok) { if (r.tk) ls('wav_tk', r.tk); e.target.reset(); } }).catch(function () { toast(T('neterr')); }); };
  API.call('sec').then(function (r) { if (!r.ok || !$('#alrt')) return; $('#alrt').checked = !!r.alert; $('#alrtto').textContent = r.mail ? T('alertTo') + ' : ' + r.mail : ''; }).catch(function () {});
  $('#alrt').onchange = function () { API.call('setAlert', { on: this.checked }).then(function (r) { toast(r.ok ? T('saved') : T(r.err)); }); };
  $('#lall').onclick = function () { if (!confirm(T('logoutAllQ'))) return; API.call('logoutAll').then(function (r) { if (r.ok) $('#out-btn').click(); else toast(T(r.err)); }).catch(function () { toast(T('neterr')); }); };
  $('#bkp').onclick = function () { var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(DB, null, 1)], { type: 'application/json' })); a.download = 'wathba-analyse-video-' + today() + '.json'; a.click(); };
  API.call('log').then(function (r) {
    var el = $('#loglist'); if (!el) return;
    el.innerHTML = r.ok && r.log && r.log.length ? '<div class="tbl-wrap" style="max-height:300px;overflow:auto"><table><tr><th>' + T('when') + '</th><th>' + T('who') + '</th><th></th></tr>' + r.log.map(function (x) { var d = new Date(x.t); return '<tr><td class="num">' + fmtDate(d.toISOString()) + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + '</td><td>' + esc(x.who || '—') + '</td><td><span class="chip ' + (x.ok ? 'ok' : 'bad') + '">' + T(x.ok ? 'okLogin' : 'failLogin') + '</span></td></tr>'; }).join('') + '</table></div>' : '—';
  }).catch(function () {});
}
function coachForm(c) {
  var box = $('#cform');
  box.innerHTML = '<form class="kbox" id="cf" style="margin-bottom:12px"><div class="fr"><div class="f"><label>' + T('name') + '</label><input name="name" required value="' + esc(c.name) + '"></div><div class="f"><label>' + T('phone') + '</label><input name="phone" class="ltr" value="' + esc(c.phone) + '"></div>' +
    '<div class="f"><label>' + T('code') + '<span class="hint">' + T('codeHint') + '</span></label><input name="code"' + (c.id ? ' placeholder="' + esc(T('codeKeep')) + '"' : ' required') + ' class="mono ltr" autocomplete="off" value=""></div><div class="f"><label>' + T('active') + '</label><select name="active"><option value="1">' + T('active') + '</option><option value="0"' + (c.active === false ? ' selected' : '') + '>' + T('inactive') + '</option></select></div></div>' +
    '<div class="row"><button class="btn pri">' + T('save') + '</button><button type="button" class="btn" id="cc">' + T('cancel') + '</button><span class="sp"></span>' + (c.id ? '<button type="button" class="btn dan" id="cd">' + T('del') + '</button>' : '') + '</div></form>';
  $('#cc').onclick = function () { box.innerHTML = ''; };
  if (c.id) $('#cd').onclick = function () { if (confirm(T('confirmDel'))) API.call('delCoach', { id: c.id }).then(function (r) { if (!r.ok) return toast(T(r.err)); toast(T('deleted')); load().then(render); }); };
  $('#cf').onsubmit = function (e) {
    e.preventDefault(); var f = e.target, rec = Object.assign({}, c, { name: f.name.value.trim(), phone: f.phone.value.trim(), code: f.code.value.trim(), active: f.active.value === '1' });
    if ((rec.code || !c.id) && !/^(?=.*[0-9])(?=.*[A-Za-z]).{6,}$/.test(rec.code)) return toast(T('weakCode'));
    API.call('saveCoach', { rec: rec }).then(function (r) { if (!r.ok) return toast(T(r.err) || r.err); toast(T('saved')); load().then(render); }).catch(function () { toast(T('neterr')); });
  };
}
$('#lang-btn').onclick = function () { LANG = LANG === 'fr' ? 'ar' : 'fr'; ls('wav_lang', LANG); render(); };
$('#set-btn').onclick = function () { route('settings'); };
$('#theme-btn').onclick = function () { var t = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light'; document.documentElement.setAttribute('data-theme', t); ls('wav_theme', t); render(); };
$('#out-btn').onclick = function () { ls('wav_tk', null); ls('wav_mc', null); ls('wav_role', null); DB = { swimmers: [], tests: [], coaches: [], me: null }; QUEUE = []; persist(); location.reload(); };
VIEWS.settings = vSettings;

window.VO2CORE = {
  $: $, $$: $$, esc: esc, ls: ls, today: today, uid: uid, T: T, D: D, C: C, R: R, F: F, API: API, S: S,
  db: function () { return DB; }, lang: function () { return LANG; }, route: route, render: render, mutate: mutate, load: load, toast: toast, sw: sw,
  isAdmin: isAdmin, coachName: coachName, visibleSwimmers: visibleSwimmers, fmtDate: fmtDate, chartBase: chartBase, mk: mk
};
window.BTV = { views: VIEWS };
document.addEventListener('DOMContentLoaded', function () { render(); if (API.tk()) flush(); });
})();
