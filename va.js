/* Al-Wathba Analyse Vidéo — analyse de course (technique & vitesse) */
(function () {
'use strict';
var K = window.VO2CORE, C = K.C, $ = K.$, $$ = K.$$, esc = K.esc, T = K.T, R = K.R, F = K.F;
function L() { return K.lang(); }
function tv(v) { return L() === 'fr' ? v[1] : v[0]; }
function DB() { return K.db(); }

Object.assign(K.D, {
  va: ['🎥 تحليل الفيديو', '🎥 Analyse vidéo'], vaNew: ['تحليل جديد', 'Nouvelle analyse'], vaHist: ['السجل', 'Historique'], vaCmp: ['مقارنة', 'Comparer'],
  vaOpen: ['📂 اختار فيديو من البيسي', '📂 Choisir une vidéo'], vaDrop: ['ولا اسحب الفيديو لهنا. الفيديو ما يترفعش لحتى بلاصة: يبقى في جهازك، والأرقام برك تتسجّل.', 'ou glissez la vidéo ici. Elle reste sur votre ordinateur : seuls les chiffres sont enregistrés.'],
  vaSw: ['السباح', 'Nageur'], vaCtx: ['النوع', 'Contexte'], vaTrain: ['تدريب', 'Entraînement'], vaComp: ['منافسة', 'Compétition'], vaLabel: ['ملاحظة (مثلاً 4×50 · التكرار 2)', 'Libellé (ex. 4×50 · rép. 2)'],
  vaPool: ['المسبح', 'Bassin'], vaDist: ['المسافة', 'Distance'], vaStroke: ['السباحة', 'Nage'], vaStart: ['الانطلاق', 'Départ'], stDive: ['من المكعب', 'Plongé'], stWater: ['من الماء (دفعة)', 'Poussée'], stBack: ['ظهر', 'Départ dos'],
  vaSlow: ['التصوير', 'Vidéo'], slow1: ['عادي', 'Normale'], vaFps: ['صورة/ث', 'img/s'], vaAuto: ['تلقائي', 'auto'],
  evS: ['الإشارة', 'Signal'], evO: ['الرجلين يفارقو', 'Décollage'], evB: ['الطلوع', 'Sortie (tête)'], evW: ['الحائط', 'Mur'], evF: ['اللمس النهائي', 'Touche finale'], evC: ['دورة ✋', 'Cycle ✋'],
  evHelp: ['اضغط الزر <b>في اللحظة</b> اللي <b>الراس</b> يقطع فيها العلامة (المسافة من الحائط اللي بدا منو الطول). «دورة»: اضغط كل ما <b>نفس اليد</b> تدخل الماء (3 حتى 5 مرات في وسط الطول).', 'Cliquer au moment où la <b>tête</b> franchit le repère (distance depuis le mur de départ de la longueur). « Cycle » : à chaque entrée de la <b>même main</b> (3 à 5 fois en milieu de longueur).'],
  keys: ['المفاتيح: مسافة = تشغيل/وقف · ← → صورة · Shift+← → 10 صور · S إشارة · O · B · 1…7 العلامات · W حائط · C دورة · Z تراجع', 'Clavier : Espace = lecture · ← → image · Maj+← → 10 images · S signal · O · B · 1…7 repères · W mur · C cycle · Z annuler'],
  lap: ['الطول', 'Longueur'], events: ['الأحداث', 'Événements'], noEv: ['ما كاين حتى حدث. ابدا بـ «الإشارة».', 'Aucun événement. Commencez par « Signal ».'], noSig: ['⚠ ما كاينش «الإشارة»: الأزمنة تتحسب من أول حدث.', '⚠ Pas de « Signal » : temps comptés depuis le premier événement.'],
  final: ['الزمن النهائي', 'Temps final'], rt: ['ردة الفعل', 'Temps de réaction'], t15: ['زمن 15 م', 'Temps 15 m'], turnAvg: ['معدل الدوران (5+5 م)', 'Virage moyen (5+5 m)'], vClean: ['السرعة الصافية', 'Vitesse nage'], srAvg: ['الإيقاع', 'Fréquence'], dpsAvg: ['المسافة/دورة', 'Distance/cycle'],
  split: ['الجزئي', 'Partiel'], cum: ['التراكمي', 'Cumul'], brk: ['الطلوع', 'Coulée'], turn: ['الدوران', 'Virage'], fin5: ['آخر 5 م', '5 derniers m'], cpm: ['دورة/د', 'cyc/min'], si: ['مؤشر الضربة', 'Indice de nage'],
  drop: ['هبوط من الأول للخر', 'Baisse 1re → dernière'], saveVa: ['💾 حفظ التحليل', '💾 Enregistrer l’analyse'], newVa: ['＋ تحليل آخر بنفس الفيديو', '＋ Autre analyse (même vidéo)'], loadVa: ['فتح', 'Ouvrir'],
  needSw: ['اختار السباح', 'Choisir le nageur'], reopen: ['عاود حلّ الفيديو', 'Rouvrir la vidéo'], reopenHint: ['باش تشوف ولا تصلّح الأحداث، حلّ نفس ملف الفيديو', 'Pour revoir ou corriger, rouvrez le même fichier vidéo'],
  angle: ['📐 زاوية', '📐 Angle'], angleHelp: ['وقّف الفيديو واضغط 3 نقاط: الطرف، المفصل (الزاوية)، الطرف الآخر.', 'Vidéo en pause : cliquez 3 points (extrémité, articulation, extrémité).'], clear: ['مسح', 'Effacer'],
  cmpPick: ['اختار زوج تحليلات من السجل (✓) ومن بعد «مقارنة».', 'Cochez deux analyses dans l’historique puis « Comparer ».'], cmpGo: ['⚖ مقارنة المختارين', '⚖ Comparer la sélection'],
  gain: ['ربح', 'gagné'], loss: ['ضيّع', 'perdu'], startPh: ['الانطلاق (حتى 15 م)', 'Départ (→15 m)'], turnsPh: ['الدورانات', 'Virages'], swimPh: ['السباحة', 'Nage'], finishPh: ['النهاية (5 م)', 'Arrivée (5 m)'],
  vaSwTab: ['👥 السباحين', '👥 Nageurs'], notes: ['ملاحظات تقنية', 'Notes techniques'], notesP: ['مثلاً: الراس عالي في التنفس، الرجلين يفتحو في الدوران…', 'Ex. : tête haute à la respiration, jambes écartées au virage…'], snap: ['📸 صورة', '📸 Image'], nAnaSw: ['تحليل', 'analyses'], lastAna: ['آخر تحليل', 'Dernière analyse'],
  dual: ['🎞 الفيديوهين جنب بعض', '🎞 Vidéos côte à côte'], dualHint: ['حلّ ملف الفيديو تاع كل تحليل. «مزامنة» تحط الزوج على الإشارة.', 'Ouvrez la vidéo de chaque analyse. « Synchroniser » les cale sur le signal.'], sync: ['⏱ مزامنة على الإشارة', '⏱ Synchroniser au signal'],
  vaSwT: ['🎥 تحليلات الفيديو', '🎥 Analyses vidéo'], approx: ['≈', '≈'], unsaved: ['التحليل ما تسجّلش. تخرج؟', 'Analyse non enregistrée. Quitter ?'], speedL: ['السرعة', 'Vitesse']
});

var STROKES = [['NL', ['حرة', 'Nage libre']], ['DOS', ['ظهر', 'Dos']], ['BRA', ['صدر', 'Brasse']], ['PAP', ['فراشة', 'Papillon']], ['4N', ['متنوعة', '4 nages']]];
var VS = { tab: 'new', url: null, fname: '', cfg: null, ev: [], dirty: false, id: null, sel: [], fps: 30, fpsAuto: true, angle: false, pts: [], cmp: null };
function defCfg() { return { sid: '', date: K.today(), ctx: 'train', label: '', pool: 25, dist: 50, stroke: 'NL', start: 'dive', slow: 1 }; }
function markers(pool) { return +pool === 50 ? [5, 10, 15, 25, 35, 40, 45] : [5, 10, 15, 20]; }
function laps(c) { return Math.max(1, Math.round(c.dist / c.pool)); }
function mU(d) { return d + (L() === 'fr' ? ' m' : ' م'); }
function evLabel(e) { return e.k === 'M' ? mU(e.d) : T('ev' + e.k); }

/* ================= calcul ================= */
function compute(c, evs) {
  var f = +c.slow || 1, ev = evs.slice().sort(function (a, b) { return a.t - b.t; });
  var sig = ev.find(function (e) { return e.k === 'S'; }), t0 = sig ? sig.t : (ev[0] ? ev[0].t : 0);
  var rt = function (t) { return (t - t0) / f; };
  var n = laps(c), P = +c.pool, walls = ev.filter(function (e) { return e.k === 'W' || e.k === 'F'; });
  // longueur de chaque événement = 1 + murs franchis avant
  ev.forEach(function (e) { var w = 0; walls.forEach(function (x) { if (x.t < e.t || (x === e)) w++; }); e.lap = (e.k === 'W' || e.k === 'F') ? w : w + 1; });
  var out = { laps: [], sig: !!sig, n: n };
  var o = ev.find(function (e) { return e.k === 'O'; }); out.rt = sig && o ? rt(o.t) : null;
  for (var i = 1; i <= n; i++) {
    var L0 = i === 1 ? t0 : (walls[i - 2] ? walls[i - 2].t : null), L1 = walls[i - 1] ? walls[i - 1].t : null;
    var inLap = ev.filter(function (e) { return e.lap === i; });
    var mk = inLap.filter(function (e) { return e.k === 'M'; }).sort(function (a, b) { return a.t - b.t; });
    var pts = []; if (L0 != null) pts.push({ d: 0, t: L0 }); mk.forEach(function (m) { pts.push({ d: m.d, t: m.t }); }); if (L1 != null) pts.push({ d: P, t: L1 });
    var lp = { i: i, split: L0 != null && L1 != null ? (L1 - L0) / f : null, cum: L1 != null ? rt(L1) : null };
    // coulée
    var b = inLap.find(function (e) { return e.k === 'B'; });
    if (b && L0 != null) { lp.brkT = (b.t - L0) / f; var a = null, z = null; pts.forEach(function (p) { if (p.t <= b.t) a = p; if (p.t >= b.t && !z) z = p; }); if (a && z && z.t > a.t) lp.brkD = a.d + (z.d - a.d) * (b.t - a.t) / (z.t - a.t); }
    // vitesse de nage : repères après la coulée et ≤ P−5
    var cand = mk.filter(function (m) { return m.d >= Math.max(10, lp.brkD ? lp.brkD : 0) - 0.01 && m.d <= P - 5 + 0.01; });
    if (cand.length < 2) cand = mk.filter(function (m) { return m.d >= 5 && m.d <= P - 5; });
    if (cand.length >= 2) { var m1 = cand[0], m2 = cand[cand.length - 1]; if (m2.t > m1.t) lp.v = (m2.d - m1.d) / ((m2.t - m1.t) / f); }
    // fréquence
    var cy = inLap.filter(function (e) { return e.k === 'C'; }).sort(function (a, b) { return a.t - b.t; });
    if (cy.length >= 2) { lp.sr = 60 * (cy.length - 1) / ((cy[cy.length - 1].t - cy[0].t) / f); if (lp.v) { lp.dps = lp.v * 60 / lp.sr; lp.si = lp.v * lp.dps; } }
    lp.m = {}; mk.forEach(function (m) { lp.m[m.d] = m.t; });
    out.laps.push(lp);
  }
  // départ 15 m
  if (out.laps[0] && out.laps[0].m[15] != null && sig) out.t15 = rt(out.laps[0].m[15]);
  // virages 5 m in / 5 m out
  out.turns = [];
  for (var k = 1; k < n; k++) {
    var A = out.laps[k - 1], B = out.laps[k], W = walls[k - 1]; if (!A || !B || !W) continue;
    var tin = A.m[P - 5], tout = B.m[5], tr = { k: k };
    if (tin != null) tr.inn = (W.t - tin) / f; if (tout != null) tr.out = (tout - W.t) / f; if (tin != null && tout != null) tr.tot = (tout - tin) / f;
    out.turns.push(tr); A.turn = tr;
  }
  var last = out.laps[n - 1]; if (last && last.m[P - 5] != null && walls[n - 1]) out.fin5 = (walls[n - 1].t - last.m[P - 5]) / f;
  out.final = walls.length >= n && sig ? rt(walls[n - 1].t) : null;
  var avg = function (k) { var a = out.laps.map(function (l) { return l[k]; }).filter(function (x) { return x != null && isFinite(x); }); return a.length ? a.reduce(function (p, q) { return p + q; }, 0) / a.length : null; };
  out.v = avg('v'); out.sr = avg('sr'); out.dps = avg('dps');
  var tt = out.turns.map(function (x) { return x.tot; }).filter(function (x) { return x != null; }); out.turn = tt.length ? tt.reduce(function (p, q) { return p + q; }, 0) / tt.length : null; out.turnSum = tt.length ? tt.reduce(function (p, q) { return p + q; }, 0) : null;
  var vv = out.laps.filter(function (l) { return l.v; }), ss = out.laps.filter(function (l) { return l.sr; });
  if (vv.length >= 2) out.vDrop = (vv[0].v - vv[vv.length - 1].v) / vv[0].v * 100;
  if (ss.length >= 2) out.srDrop = (ss[0].sr - ss[ss.length - 1].sr) / ss[0].sr * 100;
  return out;
}
function ft(x) { return x == null ? '—' : C.fmtTime ? C.fmtTime(x, 2) : F(x, 2); }
function f2(x, d) { return x == null || !isFinite(x) ? '—' : (+x).toFixed(d == null ? 2 : d); }

/* ================= vue principale ================= */
function swName(id) { var s = K.sw(id); return s ? s.name : '—'; }
function vaRecs() { return DB().tests.filter(function (t) { return t.type === 'va'; }).sort(function (a, b) { return (b.date || '').localeCompare(a.date || '') || (b.updated || '').localeCompare(a.updated || ''); }); }
function vVideo(app) {
  document.body.classList.add('wide');
  if (!VS.cfg) VS.cfg = defCfg();
  var h = '<div class="row"><h1 class="sp" style="margin:0 8px">🎥 ' + T('appName') + '</h1><div class="seg">' +
    [['new', VS.id ? '✎ ' + T('vaNew') : T('vaNew')], ['hist', T('vaHist') + ' (' + vaRecs().length + ')'], ['cmp', T('vaCmp')], ['sw', T('vaSwTab')]].map(function (x) { return '<button class="btn sm' + (VS.tab === x[0] ? ' on' : '') + '" data-tab="' + x[0] + '">' + x[1] + '</button>'; }).join('') + '</div></div>';
  if (VS.tab === 'hist') h += histHtml(); else if (VS.tab === 'cmp') h += cmpHtml(); else if (VS.tab === 'sw') h += swHtml(); else h += anaHtml();
  app.innerHTML = h;
  $$('[data-tab]').forEach(function (b) { b.onclick = function () { VS.tab = b.dataset.tab; K.render(); }; });
  if (VS.tab === 'hist') bindHist(); else if (VS.tab === 'cmp') bindCmp(); else if (VS.tab === 'sw') bindSw(); else bindAna();
}

/* ---------- analyse ---------- */
function anaHtml() {
  var c = VS.cfg, sws = K.visibleSwimmers().slice().sort(function (a, b) { return (a.name || '').localeCompare(b.name || ''); });
  var sel = function (k, opts, cur) { return '<select data-vc="' + k + '">' + opts.map(function (o) { return '<option value="' + o[0] + '"' + (String(cur) === String(o[0]) ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select>'; };
  var h = '<div class="va-grid"><div class="va-left">';
  h += '<div class="card va-vid" id="drop">' + (VS.url ? '' : '<div class="va-empty"><label class="btn pri big">' + T('vaOpen') + '<input type="file" id="vfile" accept="video/*" hidden></label><p class="small muted">' + T('vaDrop') + '</p>' + (VS.id && VS.fname ? '<p class="small"><b>' + T('reopenHint') + ' : </b><span class="ltr">' + esc(VS.fname) + '</span></p>' : '') + '</div>') +
    '<div class="va-stage' + (VS.url ? '' : ' hide') + '"><video id="vid" playsinline preload="auto"' + (VS.url ? ' src="' + VS.url + '"' : '') + '></video><canvas id="ov"></canvas></div>' +
    '<div class="va-ctl' + (VS.url ? '' : ' hide') + '"><div class="va-seekw"><div class="va-tl" id="vtl"></div><input type="range" id="seek" min="0" max="1000" value="0" class="va-seek"></div>' +
    '<div class="row" style="gap:6px;flex-wrap:wrap"><button class="btn sm" data-st="-30">«</button><button class="btn sm" data-st="-10">◀◀</button><button class="btn sm" data-st="-1">◀</button><button class="btn pri sm" id="play" style="min-width:56px">▶</button><button class="btn sm" data-st="1">▶</button><button class="btn sm" data-st="10">▶▶</button><button class="btn sm" data-st="30">»</button>' +
    '<select id="rate" style="width:auto;min-height:34px">' + [0.1, 0.25, 0.5, 1].map(function (r) { return '<option value="' + r + '"' + (r === 0.25 ? ' selected' : '') + '>×' + r + '</option>'; }).join('') + '</select>' +
    '<span class="sp"></span><span class="mono ltr" id="tdisp" style="font-weight:700">0.00</span><span class="chip ltr" id="fpsd"></span><button class="btn sm" id="angb">' + T('angle') + '</button><button class="btn sm" id="snap">' + T('snap') + '</button><label class="btn sm" style="margin:0">📂<input type="file" id="vfile2" accept="video/*" hidden></label></div>' +
    '<div class="small muted" dir="auto" style="margin-top:6px;text-align:start">' + T('keys') + '</div></div></div>';
  if (VS.url) h += '<div class="card va-evc"><div class="row" style="margin-bottom:6px"><h3 style="margin:0">' + T('lap') + ' <span id="lapn" class="chip ltr" dir="ltr">1</span></h3><span class="sp small muted">' + T('evHelp') + '</span></div><div class="va-btns" id="evbtns"></div></div>';
  h += '<div class="card" id="vres"></div></div>';
  // panneau
  h += '<div class="va-side"><div class="card"><div class="f"><label>' + T('vaSw') + '</label><select data-vc="sid"><option value="">— ' + T('needSw') + ' —</option>' + sws.map(function (s) { return '<option value="' + s.id + '"' + (c.sid === s.id ? ' selected' : '') + '>' + esc(s.name) + '</option>'; }).join('') + '</select></div>' +
    '<div class="fr"><div class="f"><label>' + T('date') + '</label><input type="date" data-vc="date" value="' + c.date + '"></div><div class="f"><label>' + T('vaCtx') + '</label>' + sel('ctx', [['train', T('vaTrain')], ['comp', T('vaComp')]], c.ctx) + '</div></div>' +
    '<div class="fr"><div class="f"><label>' + T('vaPool') + '</label>' + sel('pool', [[25, mU(25)], [50, mU(50)]], c.pool) + '</div><div class="f"><label>' + T('vaDist') + '</label>' + sel('dist', [25, 50, 100, 200, 400, 800, 1500].filter(function (d) { return d >= c.pool; }).map(function (d) { return [d, mU(d)]; }), c.dist) + '</div></div>' +
    '<div class="fr"><div class="f"><label>' + T('vaStroke') + '</label>' + sel('stroke', STROKES.map(function (s) { return [s[0], tv(s[1])]; }), c.stroke) + '</div><div class="f"><label>' + T('vaStart') + '</label>' + sel('start', [['dive', T('stDive')], ['push', T('stWater')], ['back', T('stBack')]], c.start) + '</div></div>' +
    '<div class="fr"><div class="f"><label>' + T('vaSlow') + '</label>' + sel('slow', [[1, T('slow1')], [2, 'Slow ×2'], [4, 'Slow ×4'], [8, 'Slow ×8']], c.slow) + '</div><div class="f"><label>' + T('vaFps') + '</label><select id="fpssel">' + [['auto', T('vaAuto')], [25, 25], [30, 30], [50, 50], [60, 60], [120, 120], [240, 240]].map(function (o) { return '<option value="' + o[0] + '"' + ((VS.fpsAuto && o[0] === 'auto') || (!VS.fpsAuto && +o[0] === VS.fps) ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select></div></div>' +
    '<div class="f"><input data-vc="label" placeholder="' + esc(T('vaLabel')) + '" value="' + esc(c.label) + '"></div>' +
    '<div class="f" style="margin:0"><label>' + T('notes') + '</label><textarea data-vc="notes" rows="3" placeholder="' + esc(T('notesP')) + '">' + esc(c.notes || '') + '</textarea></div></div>';
  h += '<div class="card"><h3>' + T('events') + '</h3><div id="evlist" class="va-evl"></div><div class="row" style="margin-top:10px;flex-wrap:wrap"><button class="btn pri" id="vsave">' + T('saveVa') + '</button><button class="btn sm" id="vnew">' + T('newVa') + '</button></div></div></div></div>';
  return h;
}
function curLap() { var vid = $('#vid'), t = vid ? vid.currentTime : 0, n = laps(VS.cfg), w = VS.ev.filter(function (e) { return (e.k === 'W' || e.k === 'F') && e.t <= t + 1e-6; }).length; return Math.min(n, w + 1); }
function renderBtns() {
  var box = $('#evbtns'); if (!box) return;
  var lap = curLap(), n = laps(VS.cfg), c = VS.cfg, b = [];
  if (lap === 1) { b.push(['S', T('evS'), 'S']); if (c.start !== 'push') b.push(['O', T('evO'), 'O']); }
  b.push(['B', T('evB'), 'B']);
  markers(c.pool).forEach(function (d, i) { b.push(['M' + d, mU(d), String(i + 1)]); });
  b.push([lap === n ? 'F' : 'W', lap === n ? T('evF') : T('evW'), 'W']);
  b.push(['C', T('evC'), 'C']);
  box.innerHTML = b.map(function (x) { return '<button class="btn' + (x[0] === 'C' ? ' cyc' : x[0] === 'W' || x[0] === 'F' ? ' wall' : '') + '" data-ev="' + x[0] + '">' + x[1] + '<kbd>' + x[2] + '</kbd></button>'; }).join('');
  if ($('#lapn')) $('#lapn').textContent = lap + ' / ' + n;
  $$('[data-ev]', box).forEach(function (bt) { bt.onclick = function () { addEv(bt.dataset.ev); }; });
}
function addEv(code) {
  var vid = $('#vid'); if (!vid || !VS.url) return;
  var t = vid.currentTime, e = code.charAt(0) === 'M' ? { k: 'M', d: +code.slice(1), t: t } : { k: code, t: t };
  if (e.k === 'S' || e.k === 'O') VS.ev = VS.ev.filter(function (x) { return x.k !== e.k; });
  VS.ev.push(e); VS.dirty = true; refresh();
}
function refresh() {
  renderBtns();
  var c = VS.cfg, f = +c.slow || 1, ev = VS.ev.slice().sort(function (a, b) { return a.t - b.t; }), sig = ev.find(function (e) { return e.k === 'S'; }), t0 = sig ? sig.t : (ev[0] ? ev[0].t : 0);
  var r = compute(c, VS.ev);
  $('#evlist').innerHTML = ev.length ? '<table>' + ev.map(function (e) { var i = VS.ev.indexOf(e); return '<tr data-seek="' + e.t + '"><td class="mono ltr">' + F((e.t - t0) / f, 2) + '</td><td style="text-align:start"><b>' + esc(evLabel(e)) + '</b></td><td class="small muted">' + T('lap') + ' ' + e.lap + '</td><td><button class="btn sm" data-del="' + i + '">✕</button></td></tr>'; }).join('') + '</table>' + (sig ? '' : '<p class="small" style="color:var(--warn)">' + T('noSig') + '</p>') : '<p class="muted small">' + T('noEv') + '</p>';
  $$('#evlist [data-seek]').forEach(function (tr) { tr.onclick = function (e) { if (e.target.dataset.del != null) return; var v = $('#vid'); if (v) { v.pause(); seekV(v, +tr.dataset.seek); } }; });
  $$('#evlist [data-del]').forEach(function (b) { b.onclick = function () { VS.ev.splice(+b.dataset.del, 1); VS.dirty = true; refresh(); }; });
  var tl = $('#vtl'), vd = $('#vid'); if (tl && vd && vd.duration) { tl.innerHTML = ev.map(function (e) { return '<i class="' + e.k + '" data-tt="' + e.t + '" title="' + esc(evLabel(e)) + '" style="left:' + (e.t / vd.duration * 100).toFixed(3) + '%"></i>'; }).join(''); $$('#vtl i').forEach(function (x) { x.onclick = function () { vd.pause(); seekV(vd, +x.dataset.tt); }; }); }
  $('#vres').innerHTML = resHtml(r, c);
  drawChart(r, 'vch');
}
function kpi(l, v, u) { return '<div class="kbox va-k"><div class="small muted">' + l + '</div><div class="num" style="font-size:22px;font-weight:800"><span dir="ltr">' + v + (u ? ' <small class="muted">' + u + '</small>' : '') + '</span></div></div>'; }
function resHtml(r, c) {
  var h = '<div class="va-kpis">' + kpi(T('final'), ft(r.final)) + (c.start === 'dive' ? kpi(T('rt'), f2(r.rt), 's') : '') + kpi(T('t15'), f2(r.t15), 's') + (r.turns.length ? kpi(T('turnAvg'), f2(r.turn), 's') : '') + kpi(T('vClean'), f2(r.v), 'm/s') + kpi(T('srAvg'), f2(r.sr, 1), T('cpm')) + kpi(T('dpsAvg'), f2(r.dps), 'm') + (r.fin5 != null ? kpi(T('fin5'), f2(r.fin5), 's') : '') + '</div>';
  h += '<div class="tbl-wrap"><table><tr><th>' + T('lap') + '</th><th>' + T('split') + '</th><th>' + T('cum') + '</th><th>' + T('brk') + '</th><th>' + T('vClean') + '</th><th>' + T('srAvg') + '</th><th>' + T('dpsAvg') + '</th><th>' + T('si') + '</th><th>' + T('turn') + ' (in+out)</th></tr>' +
    r.laps.map(function (l) { return '<tr><td><b>' + l.i + '</b></td><td class="num">' + f2(l.split) + '</td><td class="num">' + ft(l.cum) + '</td><td class="num"><span dir="ltr">' + (l.brkT != null ? f2(l.brkT) + ' s' + (l.brkD != null ? ' · ≈' + f2(l.brkD, 1) + ' m' : '') : '—') + '</span></td><td class="num">' + f2(l.v) + '</td><td class="num">' + f2(l.sr, 1) + '</td><td class="num">' + f2(l.dps) + '</td><td class="num">' + f2(l.si) + '</td><td class="num">' + (l.turn && l.turn.tot != null ? '<span dir="ltr"><b>' + f2(l.turn.tot) + '</b> <small class="muted">(' + f2(l.turn.inn) + '+' + f2(l.turn.out) + ')</small></span>' : '—') + '</td></tr>'; }).join('') + '</table></div>';
  if (r.vDrop != null || r.srDrop != null) h += '<p class="small"><b>' + T('drop') + ' :</b> ' + (r.vDrop != null ? T('vClean') + ' <b class="num">' + (r.vDrop >= 0 ? '−' : '+') + f2(Math.abs(r.vDrop), 1) + '%</b>' : '') + (r.srDrop != null ? ' · ' + T('srAvg') + ' <b class="num">' + (r.srDrop >= 0 ? '−' : '+') + f2(Math.abs(r.srDrop), 1) + '%</b>' : '') + '</p>';
  if (r.laps.length > 1) h += '<div class="chart" style="height:220px"><canvas id="vch"></canvas></div>';
  return h;
}
function drawChart(r, id, r2, labels) {
  if (!document.getElementById(id) || !window.Chart) return;
  var o = K.chartBase(); o.scales = { y: { title: { display: true, text: 'm/s' } }, y1: { position: 'right', grid: { drawOnChartArea: false }, title: { display: true, text: T('cpm') } } };
  var ds = [{ label: (labels ? labels[0] + ' · ' : '') + T('vClean'), data: r.laps.map(function (l) { return l.v || null; }), borderColor: '#22d3ee', backgroundColor: '#22d3ee', yAxisID: 'y', spanGaps: true, tension: .3 },
    { label: (labels ? labels[0] + ' · ' : '') + T('srAvg'), data: r.laps.map(function (l) { return l.sr || null; }), borderColor: '#fbbf24', backgroundColor: '#fbbf24', yAxisID: 'y1', borderDash: [5, 4], spanGaps: true, tension: .3 }];
  if (r2) { ds.push({ label: labels[1] + ' · ' + T('vClean'), data: r2.laps.map(function (l) { return l.v || null; }), borderColor: '#9aabc9', backgroundColor: '#9aabc9', yAxisID: 'y', spanGaps: true }); ds.push({ label: labels[1] + ' · ' + T('srAvg'), data: r2.laps.map(function (l) { return l.sr || null; }), borderColor: '#e0c38a', backgroundColor: '#e0c38a', yAxisID: 'y1', borderDash: [5, 4], spanGaps: true }); }
  var n = Math.max(r.laps.length, r2 ? r2.laps.length : 0), lb = []; for (var i = 1; i <= n; i++) lb.push(T('lap') + ' ' + i);
  K.mk(id, { type: 'line', data: { labels: lb, datasets: ds }, options: o });
}
function setVideo(file) {
  if (!file) return;
  if (VS.url) try { URL.revokeObjectURL(VS.url); } catch (e) {}
  VS.url = URL.createObjectURL(file); VS.fname = file.name; VS.keepT = 0; VS.fpsAuto = true; VS.fps = 30; K.render();
}
function bindAna() {
  var c = VS.cfg;
  $$('[data-vc]').forEach(function (i) { i.onchange = function () { var k = i.dataset.vc, v = i.value; c[k] = /^(pool|dist|slow)$/.test(k) ? +v : v; if (k === 'pool' && c.dist < c.pool) c.dist = c.pool; VS.dirty = true; if (/^(pool|dist|start|sid)$/.test(k)) K.render(); else refresh(); }; });
  ['#vfile', '#vfile2'].forEach(function (s) { var el = $(s); if (el) el.onchange = function () { setVideo(this.files[0]); }; });
  var drop = $('#drop'); drop.ondragover = function (e) { e.preventDefault(); }; drop.ondrop = function (e) { e.preventDefault(); var f = e.dataTransfer.files[0]; if (f && /video/.test(f.type)) setVideo(f); };
  $('#fpssel').onchange = function () { if (this.value === 'auto') { VS.fpsAuto = true; } else { VS.fpsAuto = false; VS.fps = +this.value; } showFps(); };
  $('#vsave').onclick = saveVa;
  $('#vnew').onclick = function () { if (VS.dirty && !confirm(T('unsaved'))) return; VS.id = null; VS.ev = []; VS.dirty = false; VS.cfg = Object.assign(defCfg(), { sid: c.sid, date: c.date, ctx: c.ctx, pool: c.pool, dist: c.dist, stroke: c.stroke, start: c.start, slow: c.slow }); K.render(); };
  refresh();
  var vid = $('#vid'); if (!vid || !VS.url) return;
  vid.playbackRate = 0.25;
  var seek = $('#seek'), play = $('#play');
  var upd = function () { if (!document.body.contains(vid) || !$('#tdisp')) return; VS.keepT = vid.currentTime; var d = vid.duration || 1; if (document.activeElement !== seek) seek.value = Math.round(vid.currentTime / d * 1000); var ev = VS.ev.find(function (e) { return e.k === 'S'; }); $('#tdisp').textContent = (ev ? ((vid.currentTime - ev.t) / (+c.slow || 1)) : vid.currentTime).toFixed(2) + ' s'; renderBtnsLite(); };
  vid.addEventListener('timeupdate', upd); vid.addEventListener('seeked', upd); vid.addEventListener('loadedmetadata', function () { if (VS.keepT) vid.currentTime = VS.keepT; upd(); sizeOv(); refresh(); });
  vid.addEventListener('play', function () { play.textContent = '⏸'; }); vid.addEventListener('pause', function () { play.textContent = '▶'; });
  vid.addEventListener('loadeddata', sizeOv);
  seek.oninput = function () { vid.pause(); seekV(vid, (vid.duration || 0) * seek.value / 1000); };
  play.onclick = function () { if (vid.paused) vid.play(); else vid.pause(); };
  $('#rate').onchange = function () { vid.playbackRate = +this.value; };
  $$('[data-st]').forEach(function (b) { b.onclick = function () { step(+b.dataset.st); }; });
  vid.onclick = function () { if (!VS.angle) play.click(); };
  // fps auto
  if (vid.requestVideoFrameCallback) {
    var last = null, ds = [];
    vid.addEventListener('seeking', function () { last = null; });
    vid.addEventListener('pause', function () { last = null; });
    var cb = function (now, md) {
      if (!vid.paused && !vid.seeking && last && md.presentedFrames > last.f) {
        var df = md.presentedFrames - last.f, dt = md.mediaTime - last.t;
        if (dt > 0.001 && dt < 0.5 && df <= 3) ds.push(dt / df);
      }
      last = vid.paused ? null : { f: md.presentedFrames, t: md.mediaTime };
      if (ds.length > 40) ds.shift();
      if (VS.fpsAuto && ds.length >= 10) { var q = ds.slice().sort(function (a, b) { return a - b; }), m = q[Math.floor(q.length * 0.3)], f = Math.round(1 / m); var std = [24, 25, 30, 50, 60, 120, 240].reduce(function (b, x) { return Math.abs(x - f) < Math.abs(b - f) ? x : b; }, 30); VS.fps = Math.abs(std - f) <= 3 ? std : f; showFps(); }
      vid.requestVideoFrameCallback(cb);
    };
    vid.requestVideoFrameCallback(cb);
  }
  showFps();
  // angle
  $('#snap').onclick = function () {
    var cv = document.createElement('canvas'), o = $('#ov'); cv.width = vid.videoWidth; cv.height = vid.videoHeight; var g = cv.getContext('2d'); g.drawImage(vid, 0, 0);
    if (o && o.width) g.drawImage(o, 0, 0, cv.width, cv.height);
    var a = document.createElement('a'); a.href = cv.toDataURL('image/png'); a.download = (swName(c.sid) || 'nageur').replace(/\s+/g, '_') + '_' + (c.date || K.today()) + '_' + vid.currentTime.toFixed(2) + 's.png'; a.click();
  };
  $('#angb').onclick = function () { VS.angle = !VS.angle; VS.pts = []; this.classList.toggle('pri', VS.angle); $('#ov').style.pointerEvents = VS.angle ? 'auto' : 'none'; drawOv(); if (VS.angle) { vid.pause(); K.toast(T('angleHelp')); } };
  $('#ov').onclick = function (e) { var r = this.getBoundingClientRect(); if (VS.pts.length >= 3) VS.pts = []; VS.pts.push({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height }); drawOv(); };
  window.addEventListener('resize', sizeOv);
  // clavier
  document.onkeydown = function (e) {
    if (K.S.view !== 'btVideo' || VS.tab !== 'new' || !$('#vid')) return;
    if (/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) return;
    var k = e.key;
    if (k === ' ') { e.preventDefault(); play.click(); }
    else if (k === 'ArrowRight' || k === 'ArrowLeft') { e.preventDefault(); var s = (k === 'ArrowRight' ? 1 : -1) * (e.shiftKey ? 10 : 1); if (L() !== 'fr' && !e.altKey) s = s; step(s); }
    else if (/^[sS]$/.test(k)) addEv('S'); else if (/^[oO]$/.test(k)) addEv('O'); else if (/^[bB]$/.test(k)) addEv('B'); else if (/^[cC]$/.test(k)) addEv('C');
    else if (/^[wW]$/.test(k)) addEv(curLap() === laps(c) ? 'F' : 'W');
    else if (/^[zZ]$/.test(k)) { if (VS.ev.length) { VS.ev.pop(); VS.dirty = true; refresh(); } }
    else if (/^[1-9]$/.test(k)) { var mk = markers(c.pool)[+k - 1]; if (mk) addEv('M' + mk); }
  };
}
var lastLapShown = 0;
function renderBtnsLite() { var l = curLap(); if (l !== lastLapShown) { lastLapShown = l; renderBtns(); } }
// déplacement « sûr » : une seule recherche à la fois (les téléphones bloquent si on en empile)
function seekV(v, t) {
  if (!v) return; t = Math.max(0, Math.min((v.duration || 0) - 0.001, t));
  v._tgt = t;
  if (v.seeking || v._busy) return;
  v._busy = true; v.currentTime = t;
  if (!v._sk) { v._sk = true; v.addEventListener('seeked', function () { v._busy = false; if (v._tgt != null && Math.abs(v._tgt - v.currentTime) > 0.0005) { var n = v._tgt; v._tgt = null; seekV(v, n); } else v._tgt = null; }); }
  clearTimeout(v._wd); v._wd = setTimeout(function () { v._busy = false; }, 1500);
}
function step(n) { var vid = $('#vid'); if (!vid) return; vid.pause(); var base = vid._tgt != null ? vid._tgt : vid.currentTime; seekV(vid, base + n / (VS.fps || 30)); }
function showFps() { var el = $('#fpsd'); if (el) el.textContent = (VS.fpsAuto ? 'auto ' : '') + VS.fps + ' img/s'; }
function sizeOv() { var v = $('#vid'), o = $('#ov'); if (!v || !o) return; o.width = v.clientWidth; o.height = v.clientHeight; drawOv(); }
function drawOv() {
  var o = $('#ov'); if (!o) return; var g = o.getContext('2d'); g.clearRect(0, 0, o.width, o.height);
  if (!VS.angle || !VS.pts.length) return;
  var P = VS.pts.map(function (p) { return { x: p.x * o.width, y: p.y * o.height }; });
  g.strokeStyle = '#ffe14d'; g.fillStyle = '#ffe14d'; g.lineWidth = 3;
  g.beginPath(); P.forEach(function (p, i) { if (i) g.lineTo(p.x, p.y); else g.moveTo(p.x, p.y); }); g.stroke();
  P.forEach(function (p) { g.beginPath(); g.arc(p.x, p.y, 5, 0, 7); g.fill(); });
  if (P.length === 3) {
    var a = Math.atan2(P[0].y - P[1].y, P[0].x - P[1].x), b = Math.atan2(P[2].y - P[1].y, P[2].x - P[1].x), d = Math.abs(a - b) * 180 / Math.PI; if (d > 180) d = 360 - d;
    g.font = 'bold 22px sans-serif'; g.lineWidth = 4; g.strokeStyle = '#000'; var txt = Math.round(d) + '°'; g.strokeText(txt, P[1].x + 10, P[1].y - 10); g.fillText(txt, P[1].x + 10, P[1].y - 10);
  }
}
function saveVa() {
  var c = VS.cfg; if (!c.sid) { K.toast(T('needSw')); return; }
  if (!VS.ev.length) { K.toast(T('noEv')); return; }
  var r = compute(c, VS.ev), id = VS.id || K.uid();
  var sum = { final: r.final, rt: r.rt, t15: r.t15, turn: r.turn, turnSum: r.turnSum, v: r.v, sr: r.sr, dps: r.dps, fin5: r.fin5, vDrop: r.vDrop, srDrop: r.srDrop };
  K.mutate('saveTest', { rec: { id: id, swimmerId: c.sid, type: 'va', date: c.date || K.today(), data: { cfg: JSON.parse(JSON.stringify(c)), ev: VS.ev.map(function (e) { return { k: e.k, t: Math.round(e.t * 10000) / 10000, d: e.d }; }), fname: VS.fname, sum: sum } } });
  VS.id = id; VS.dirty = false; K.toast(T('saved')); K.render();
}
function openRec(rec) {
  VS.id = rec.id; VS.cfg = Object.assign(defCfg(), rec.data.cfg || {}, { sid: rec.swimmerId, date: rec.date }); VS.ev = (rec.data.ev || []).map(function (e) { return { k: e.k, t: e.t, d: e.d }; });
  if (VS.fname !== rec.data.fname && VS.url) { try { URL.revokeObjectURL(VS.url); } catch (e) {} VS.url = null; }
  VS.fname = rec.data.fname || ''; VS.dirty = false; VS.tab = 'new'; K.render();
}

/* ---------- historique ---------- */
function histHtml() {
  var list = vaRecs().filter(function (r) { return !VS.filt || r.swimmerId === VS.filt; });
  if (!vaRecs().length) return '<div class="card empty" style="margin-top:12px">' + T('noEv') + '</div>';
  return '<div class="card" style="margin-top:12px"><div class="row"><p class="small muted sp">' + T('cmpPick') + '</p><select id="hfilt" style="width:auto"><option value="">' + T('swimmers') + ' : —</option>' + K.visibleSwimmers().map(function (s) { return '<option value="' + s.id + '"' + (VS.filt === s.id ? ' selected' : '') + '>' + esc(s.name) + '</option>'; }).join('') + '</select></div><div class="tbl-wrap"><table><tr><th></th><th>' + T('date') + '</th><th style="text-align:start">' + T('vaSw') + '</th><th>' + T('vaCtx') + '</th><th></th><th>' + T('final') + '</th><th>' + T('t15') + '</th><th>' + T('turnAvg') + '</th><th>' + T('vClean') + '</th><th>' + T('srAvg') + '</th><th>' + T('dpsAvg') + '</th><th></th></tr>' +
    list.map(function (r) { var c = r.data.cfg || {}, s = r.data.sum || {}, st = STROKES.find(function (x) { return x[0] === c.stroke; }); return '<tr><td><input type="checkbox" data-pick="' + r.id + '"' + (VS.sel.indexOf(r.id) >= 0 ? ' checked' : '') + ' style="width:auto"></td><td class="num">' + K.fmtDate(r.date) + '</td><td style="text-align:start"><b>' + esc(swName(r.swimmerId)) + '</b><div class="small muted">' + esc(c.label || '') + (c.notes ? ' · 📝 ' + esc(c.notes.slice(0, 60)) + (c.notes.length > 60 ? '…' : '') : '') + '</div></td><td><span class="chip' + (c.ctx === 'comp' ? ' warn' : '') + '">' + T(c.ctx === 'comp' ? 'vaComp' : 'vaTrain') + '</span></td><td class="small">' + c.dist + ' ' + (st ? tv(st[1]) : '') + ' · ' + c.pool + 'm</td><td class="num"><b>' + ft(s.final) + '</b></td><td class="num">' + f2(s.t15) + '</td><td class="num">' + f2(s.turn) + '</td><td class="num">' + f2(s.v) + '</td><td class="num">' + f2(s.sr, 1) + '</td><td class="num">' + f2(s.dps) + '</td><td style="white-space:nowrap"><button class="btn sm" data-open="' + r.id + '">' + T('loadVa') + '</button> <button class="btn sm" data-vdel="' + r.id + '">✕</button></td></tr>'; }).join('') +
    '</table></div><div class="row" style="margin-top:10px"><button class="btn pri" id="gocmp"' + (VS.sel.length === 2 ? '' : ' disabled') + '>' + T('cmpGo') + '</button></div></div>';
}
function bindHist() {
  var hf = $('#hfilt'); if (hf) hf.onchange = function () { VS.filt = this.value; K.render(); };
  $$('[data-pick]').forEach(function (b) { b.onchange = function () { var id = b.dataset.pick, i = VS.sel.indexOf(id); if (b.checked && i < 0) VS.sel.push(id); if (!b.checked && i >= 0) VS.sel.splice(i, 1); if (VS.sel.length > 2) VS.sel.shift(); K.render(); }; });
  $$('[data-open]').forEach(function (b) { b.onclick = function () { if (VS.dirty && !confirm(T('unsaved'))) return; openRec(vaRecs().find(function (r) { return r.id === b.dataset.open; })); }; });
  $$('[data-vdel]').forEach(function (b) { b.onclick = function () { if (!confirm(T('confirmDel'))) return; K.mutate('delTest', { id: b.dataset.vdel }); VS.sel = VS.sel.filter(function (x) { return x !== b.dataset.vdel; }); if (VS.id === b.dataset.vdel) VS.id = null; K.render(); }; });
  var g = $('#gocmp'); if (g) g.onclick = function () { VS.tab = 'cmp'; VS.cmp = { urls: [null, null] }; K.render(); };
}

/* ---------- comparaison ---------- */
function pair() { var all = vaRecs(); return VS.sel.map(function (id) { return all.find(function (r) { return r.id === id; }); }).filter(Boolean); }
function cmpHtml() {
  var p = pair(); if (p.length !== 2) return '<div class="card empty" style="margin-top:12px">' + T('cmpPick') + '</div>';
  var A = p[0], B = p[1]; if (A.date > B.date) { A = p[1]; B = p[0]; }
  var ra = compute(Object.assign(defCfg(), A.data.cfg), A.data.ev || []), rb = compute(Object.assign(defCfg(), B.data.cfg), B.data.ev || []);
  var la = K.fmtDate(A.date) + (A.swimmerId !== B.swimmerId ? ' · ' + swName(A.swimmerId) : ''), lb = K.fmtDate(B.date) + (A.swimmerId !== B.swimmerId ? ' · ' + swName(B.swimmerId) : '');
  var row = function (l, a, b, low, d, u) { var dd = a != null && b != null ? b - a : null; if (dd != null && Math.abs(dd) < 0.005) dd = 0; var good = dd == null ? null : (low ? dd < 0 : dd > 0); return '<tr><td style="text-align:start"><b>' + l + '</b></td><td class="num">' + (d === 't' ? ft(a) : f2(a, d)) + '</td><td class="num">' + (d === 't' ? ft(b) : f2(b, d)) + '</td><td class="num" style="font-weight:800;color:' + (dd == null || Math.abs(dd) < 1e-9 ? 'var(--mute)' : good ? 'var(--ok)' : 'var(--bad)') + '">' + (dd == null ? '—' : dd === 0 ? '=' : (dd > 0 ? '+' : '−') + f2(Math.abs(dd), d === 't' ? 2 : d) + (u || '')) + '</td></tr>'; };
  var h = '<div class="card" style="margin-top:12px"><h3>⚖ ' + esc(swName(A.swimmerId)) + (A.swimmerId !== B.swimmerId ? ' / ' + esc(swName(B.swimmerId)) : '') + '</h3><div class="tbl-wrap"><table><tr><th></th><th>A · ' + esc(la) + '</th><th>B · ' + esc(lb) + '</th><th>B − A</th></tr>' +
    row(T('final'), ra.final, rb.final, true, 't') + row(T('rt'), ra.rt, rb.rt, true, 2, ' s') + row(T('t15'), ra.t15, rb.t15, true, 2, ' s') + row(T('turnAvg'), ra.turn, rb.turn, true, 2, ' s') + row(T('vClean'), ra.v, rb.v, false, 2, ' m/s') + row(T('srAvg'), ra.sr, rb.sr, null, 1) + row(T('dpsAvg'), ra.dps, rb.dps, false, 2, ' m') + row(T('fin5'), ra.fin5, rb.fin5, true, 2, ' s') + '</table></div>';
  // décomposition du temps gagné/perdu
  var parts = [];
  if (ra.t15 != null && rb.t15 != null) parts.push([T('startPh'), rb.t15 - ra.t15]);
  if (ra.turnSum != null && rb.turnSum != null && ra.turns.length === rb.turns.length) parts.push([T('turnsPh'), rb.turnSum - ra.turnSum]);
  if (ra.fin5 != null && rb.fin5 != null) parts.push([T('finishPh'), rb.fin5 - ra.fin5]);
  if (ra.final != null && rb.final != null && parts.length) { var rest = rb.final - ra.final - parts.reduce(function (s, x) { return s + x[1]; }, 0); parts.push([T('swimPh'), rest]); }
  if (parts.length) h += '<div class="va-parts">' + parts.map(function (x) { var g = x[1] < 0; return '<div class="kbox va-k"><div class="small muted">' + x[0] + '</div><div class="num" style="font-size:20px;font-weight:800;color:' + (Math.abs(x[1]) < 0.005 ? 'var(--mute)' : g ? 'var(--ok)' : 'var(--bad)') + '">' + (Math.abs(x[1]) < 0.005 ? '0.00' : (g ? '−' : '+') + f2(Math.abs(x[1]))) + ' s</div><div class="small">' + (Math.abs(x[1]) < 0.005 ? '=' : 'B ' + (g ? T('gain') : T('loss'))) + '</div></div>'; }).join('') + '</div>';
  h += '<div class="chart" style="height:240px"><canvas id="cch"></canvas></div></div>';
  // vidéos côte à côte
  h += '<div class="card"><h3>' + T('dual') + '</h3><p class="small muted">' + T('dualHint') + '</p><div class="va-dual">' + [A, B].map(function (r, i) { return '<div><div class="small"><b>' + (i ? 'B' : 'A') + '</b> · <span class="ltr">' + esc(r.data.fname || '') + '</span></div>' + (VS.cmp && VS.cmp.urls[i] ? '<video id="dv' + i + '" src="' + VS.cmp.urls[i] + '" playsinline preload="auto"></video>' : '<label class="btn sm">' + T('vaOpen') + '<input type="file" data-dv="' + i + '" accept="video/*" hidden></label>') + '</div>'; }).join('') + '</div>' +
    '<div class="row" style="margin-top:8px;gap:6px;direction:ltr"><button class="btn sm" id="dsync">' + T('sync') + '</button><button class="btn sm" data-ds="-1">◀</button><button class="btn pri sm" id="dplay">▶</button><button class="btn sm" data-ds="1">▶</button><select id="drate" style="width:auto;min-height:34px">' + [0.1, 0.25, 0.5, 1].map(function (r) { return '<option value="' + r + '"' + (r === 0.25 ? ' selected' : '') + '>×' + r + '</option>'; }).join('') + '</select></div></div>';
  VS._pair = [A, B, ra, rb, la, lb];
  return h;
}
function bindCmp() {
  var P = VS._pair; if (!P || pair().length !== 2) return;
  drawChart(P[2], 'cch', P[3], ['A', 'B']);
  VS.cmp = VS.cmp || { urls: [null, null] };
  $$('[data-dv]').forEach(function (inp) { inp.onchange = function () { var f = this.files[0]; if (!f) return; VS.cmp.urls[+inp.dataset.dv] = URL.createObjectURL(f); K.render(); }; });
  var vids = [$('#dv0'), $('#dv1')].filter(Boolean);
  var sigOf = function (r) { var s = (r.data.ev || []).find(function (e) { return e.k === 'S'; }); return s ? s.t : 0; };
  vids.forEach(function (v) { v.playbackRate = 0.25; });
  $('#dsync').onclick = function () { [$('#dv0'), $('#dv1')].forEach(function (v, i) { if (v) { v.pause(); seekV(v, sigOf(P[i])); } }); };
  $('#dplay').onclick = function () { var anyPaused = vids.some(function (v) { return v.paused; }); vids.forEach(function (v) { if (anyPaused) v.play(); else v.pause(); }); this.textContent = anyPaused ? '⏸' : '▶'; };
  $('#drate').onchange = function () { var r = +this.value; vids.forEach(function (v) { v.playbackRate = r; }); };
  $$('[data-ds]').forEach(function (b) { b.onclick = function () { vids.forEach(function (v) { v.pause(); seekV(v, (v._tgt != null ? v._tgt : v.currentTime) + (+b.dataset.ds) / 30); }); }; });
}

/* ---------- section fiche nageur ---------- */
function swimmerSection(s) {
  var list = vaRecs().filter(function (r) { return r.swimmerId === s.id; }); if (!list.length) return '';
  return '<h2 style="margin-top:6px">' + T('vaSwT') + '</h2><div class="card"><div class="tbl-wrap"><table><tr><th>' + T('date') + '</th><th></th><th>' + T('final') + '</th><th>' + T('t15') + '</th><th>' + T('turnAvg') + '</th><th>' + T('vClean') + '</th><th>' + T('srAvg') + '</th><th>' + T('dpsAvg') + '</th><th></th></tr>' +
    list.slice(0, 12).map(function (r) { var c = r.data.cfg || {}, x = r.data.sum || {}; return '<tr><td class="num">' + K.fmtDate(r.date) + '</td><td class="small" style="text-align:start">' + c.dist + 'm · ' + T(c.ctx === 'comp' ? 'vaComp' : 'vaTrain') + (c.label ? ' · ' + esc(c.label) : '') + '</td><td class="num"><b>' + ft(x.final) + '</b></td><td class="num">' + f2(x.t15) + '</td><td class="num">' + f2(x.turn) + '</td><td class="num">' + f2(x.v) + '</td><td class="num">' + f2(x.sr, 1) + '</td><td class="num">' + f2(x.dps) + '</td><td><button class="btn sm" data-vopen="' + r.id + '">🎥</button></td></tr>'; }).join('') + '</table></div></div>';
}
function bindSwimmerSection() { $$('[data-vopen]').forEach(function (b) { b.onclick = function () { openRec(vaRecs().find(function (r) { return r.id === b.dataset.vopen; })); K.route('btVideo'); }; }); }

/* ---------- nageurs ---------- */
function swHtml() {
  var list = K.visibleSwimmers().sort(function (a, b) { return (a.name || '').localeCompare(b.name || ''); }), all = vaRecs();
  var h = '<div class="row" style="margin-top:12px"><span class="sp"></span><button class="btn pri" id="swadd">＋ ' + T('addSw') + '</button></div><div id="swform"></div>';
  if (!list.length) return h + '<div class="card empty">' + T('noSw') + '</div>';
  h += '<div class="card"><div class="tbl-wrap"><table><tr><th style="text-align:start">' + T('name') + '</th><th>' + T('group') + '</th><th>' + T('dob') + '</th>' + (K.isAdmin() ? '<th>' + T('coach') + '</th>' : '') + '<th>' + T('nAnaSw') + '</th><th>' + T('lastAna') + '</th><th></th></tr>' +
    list.map(function (s) { var a = all.filter(function (r) { return r.swimmerId === s.id; }), l = a[0]; return '<tr><td style="text-align:start"><b>' + esc(s.name) + '</b></td><td>' + esc(s.group || '') + '</td><td class="num">' + (s.dob ? K.fmtDate(s.dob) : '') + '</td>' + (K.isAdmin() ? '<td>' + esc(K.coachName(s.coachId) || '—') + '</td>' : '') + '<td class="num">' + a.length + '</td><td class="num">' + (l ? K.fmtDate(l.date) + ' · ' + ft((l.data.sum || {}).final) : '—') + '</td><td style="white-space:nowrap"><button class="btn sm" data-swh="' + s.id + '">🎥</button> <button class="btn sm" data-swe="' + s.id + '">✎</button></td></tr>'; }).join('') + '</table></div></div>';
  return h;
}
function swForm(s) {
  var co = K.isAdmin() ? '<div class="f"><label>' + T('coach') + '</label><select name="coachId"><option value="">' + T('noCoach') + '</option>' + (DB().coaches || []).map(function (c) { return '<option value="' + c.id + '"' + (s.coachId === c.id ? ' selected' : '') + '>' + esc(c.name) + '</option>'; }).join('') + '</select></div>' : '';
  $('#swform').innerHTML = '<form class="card" id="swf"><div class="fr"><div class="f"><label>' + T('name') + '</label><input name="name" required value="' + esc(s.name) + '"></div><div class="f"><label>' + T('dob') + '</label><input type="date" name="dob" value="' + esc(s.dob) + '"></div>' +
    '<div class="f"><label>' + T('sex') + '</label><select name="sex"><option value="M">' + T('male') + '</option><option value="F"' + (s.sex === 'F' ? ' selected' : '') + '>' + T('female') + '</option></select></div><div class="f"><label>' + T('group') + '</label><input name="group" value="' + esc(s.group) + '"></div>' + co + '</div>' +
    '<div class="row"><button class="btn pri">' + T('save') + '</button><button type="button" class="btn" id="swc">' + T('cancel') + '</button><span class="sp"></span>' + (s.id ? '<button type="button" class="btn dan" id="swd">' + T('del') + '</button>' : '') + '</div></form>';
  $('#swf [name=name]').focus();
  $('#swc').onclick = function () { $('#swform').innerHTML = ''; };
  if (s.id) $('#swd').onclick = function () { if (!confirm(T('confirmDel'))) return; K.mutate('delSwimmer', { id: s.id }); K.render(); };
  $('#swf').onsubmit = function (e) {
    e.preventDefault(); var f = e.target, rec = Object.assign({}, s, { id: s.id || K.uid(), name: f.name.value.trim(), dob: f.dob.value, sex: f.sex.value, group: f.group.value.trim() });
    if (f.coachId) rec.coachId = f.coachId.value; else if (!rec.coachId && DB().me) rec.coachId = DB().me.id || '';
    K.mutate('saveSwimmer', { rec: rec }); K.toast(T('saved')); K.render();
  };
}
function bindSw() {
  $('#swadd').onclick = function () { swForm({}); };
  $$('[data-swe]').forEach(function (b) { b.onclick = function () { swForm(K.sw(b.dataset.swe)); }; });
  $$('[data-swh]').forEach(function (b) { b.onclick = function () { VS.tab = 'hist'; VS.filt = b.dataset.swh; K.render(); }; });
}

window.BTV.views.btVideo = vVideo;
window.BTV.video = { section: swimmerSection, bind: bindSwimmerSection, compute: compute };
})();
