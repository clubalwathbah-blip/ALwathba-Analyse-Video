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
  h += '<div class="card" id="vres"></div><div id="vlc">' + lapCmpHtml() + '</div></div>';
  // panneau
  h += '<div class="va-side"><div class="card"><div class="f"><label>' + T('vaSw') + '</label><select data-vc="sid"><option value="">— ' + T('needSw') + ' —</option>' + sws.map(function (s) { return '<option value="' + s.id + '"' + (c.sid === s.id ? ' selected' : '') + '>' + esc(s.name) + '</option>'; }).join('') + '</select></div>' +
    '<div class="fr"><div class="f"><label>' + T('date') + '</label><input type="date" data-vc="date" value="' + c.date + '"></div><div class="f"><label>' + T('vaCtx') + '</label>' + sel('ctx', [['train', T('vaTrain')], ['comp', T('vaComp')]], c.ctx) + '</div></div>' +
    '<div class="fr"><div class="f"><label>' + T('vaPool') + '</label>' + sel('pool', [[25, mU(25)], [50, mU(50)]], c.pool) + '</div><div class="f"><label>' + T('vaDist') + '</label>' + sel('dist', [25, 50, 100, 200, 400, 800, 1500].filter(function (d) { return d >= c.pool; }).map(function (d) { return [d, mU(d)]; }), c.dist) + '</div></div>' +
    '<div class="fr"><div class="f"><label>' + T('vaStroke') + '</label>' + sel('stroke', STROKES.map(function (s) { return [s[0], tv(s[1])]; }), c.stroke) + '</div><div class="f"><label>' + T('vaStart') + '</label>' + sel('start', [['dive', T('stDive')], ['push', T('stWater')], ['back', T('stBack')]], c.start) + '</div></div>' +
    '<div class="fr"><div class="f"><label>' + T('vaSlow') + '</label>' + sel('slow', [[1, T('slow1')], [2, 'Slow ×2'], [4, 'Slow ×4'], [8, 'Slow ×8']], c.slow) + '</div><div class="f"><label>' + T('vaFps') + '</label><select id="fpssel">' + [['auto', T('vaAuto')], [25, 25], [30, 30], [50, 50], [60, 60], [120, 120], [240, 240]].map(function (o) { return '<option value="' + o[0] + '"' + ((VS.fpsAuto && o[0] === 'auto') || (!VS.fpsAuto && +o[0] === VS.fps) ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select></div></div>' +
    '<div class="f"><input data-vc="label" placeholder="' + esc(T('vaLabel')) + '" value="' + esc(c.label) + '"></div>' +
    '<div class="f" style="margin:0"><label>' + T('notes') + '</label><textarea data-vc="notes" rows="3" placeholder="' + esc(T('notesP')) + '">' + esc(c.notes || '') + '</textarea></div></div>';
  h += '<div class="card"><h3>' + T('events') + '</h3><div id="evlist" class="va-evl"></div><div class="row" style="margin-top:10px;flex-wrap:wrap"><button class="btn pri" id="vsave">' + T('saveVa') + '</button><button class="btn" id="vrep">' + rt('report', L()) + '</button><button class="btn sm" id="vnew">' + T('newVa') + '</button></div></div></div></div>';
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
  $('#vres').innerHTML = aidHtml(c, VS.ev, r) + resHtml(r, c);
  bindAid();
  drawChart(r, 'vch');
}
function kpi(l, v, u, hk) { return '<div class="kbox va-k"><div class="small muted">' + l + '</div><div class="num" style="font-size:22px;font-weight:800"><span dir="ltr">' + v + (u ? ' <small class="muted">' + u + '</small>' : '') + '</span></div>' + (hk ? '<div class="va-hint">' + rt('x_' + hk, L()) + '</div>' : '') + '</div>'; }
function resHtml(r, c) {
  var h = '<div class="va-kpis">' + kpi(T('final'), ft(r.final), '', 'final') + (c.start === 'dive' ? kpi(T('rt'), f2(r.rt), 's', 'rt') : '') + kpi(T('t15'), f2(r.t15), 's', 't15') + (r.turns.length ? kpi(T('turnAvg'), f2(r.turn), 's', 'turn') : '') + kpi(T('vClean'), f2(r.v), 'm/s', 'v') + kpi(T('srAvg'), f2(r.sr, 1), T('cpm'), 'sr') + kpi(T('dpsAvg'), f2(r.dps), 'm', 'dps') + (r.fin5 != null ? kpi(T('fin5'), f2(r.fin5), 's', 'fin5') : '') + '</div>';
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
  $('#vrep').onclick = function () { if (!VS.ev.length) { K.toast(T('noEv')); return; } if (!VS.cfg.sid) { K.toast(T('needSw')); return; } openReport(curSrc()); };
  bindLapCmp();
  $('#vnew').onclick = function () { if (VS.dirty && !confirm(T('unsaved'))) return; VS.id = null; VS.ev = []; VS.snaps = []; VS.dirty = false; VS.cfg = Object.assign(defCfg(), { sid: c.sid, date: c.date, ctx: c.ctx, pool: c.pool, dist: c.dist, stroke: c.stroke, start: c.start, slow: c.slow }); K.render(); };
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
    try { var tw = Math.min(640, cv.width), tc = document.createElement('canvas'); tc.width = tw; tc.height = Math.round(cv.height * tw / cv.width); tc.getContext('2d').drawImage(cv, 0, 0, tc.width, tc.height); VS.snaps = (VS.snaps || []).concat([tc.toDataURL('image/jpeg', 0.75)]).slice(-3); VS.dirty = true; } catch (e) {}
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
  if (VS.snaps && VS.snaps.length) { try { localStorage.setItem('wav_snaps_' + id, JSON.stringify(VS.snaps)); } catch (e) {} }
  VS.id = id; VS.dirty = false; K.toast(T('saved')); K.render();
}
function openRec(rec) {
  VS.id = rec.id; VS.cfg = Object.assign(defCfg(), rec.data.cfg || {}, { sid: rec.swimmerId, date: rec.date }); VS.ev = (rec.data.ev || []).map(function (e) { return { k: e.k, t: e.t, d: e.d }; });
  if (VS.fname !== rec.data.fname && VS.url) { try { URL.revokeObjectURL(VS.url); } catch (e) {} VS.url = null; }
  VS.fname = rec.data.fname || ''; VS.snaps = snapsOf(rec.id).slice(); VS.dirty = false; VS.tab = 'new'; K.render();
}

/* ---------- historique ---------- */
function histHtml() {
  var list = vaRecs().filter(function (r) { return !VS.filt || r.swimmerId === VS.filt; });
  if (!vaRecs().length) return '<div class="card empty" style="margin-top:12px">' + T('noEv') + '</div>';
  return '<div class="card" style="margin-top:12px"><div class="row"><p class="small muted sp">' + T('cmpPick') + '</p><select id="hfilt" style="width:auto"><option value="">' + T('swimmers') + ' : —</option>' + K.visibleSwimmers().map(function (s) { return '<option value="' + s.id + '"' + (VS.filt === s.id ? ' selected' : '') + '>' + esc(s.name) + '</option>'; }).join('') + '</select></div><div class="tbl-wrap"><table><tr><th></th><th>' + T('date') + '</th><th style="text-align:start">' + T('vaSw') + '</th><th>' + T('vaCtx') + '</th><th></th><th>' + T('final') + '</th><th>' + T('t15') + '</th><th>' + T('turnAvg') + '</th><th>' + T('vClean') + '</th><th>' + T('srAvg') + '</th><th>' + T('dpsAvg') + '</th><th></th></tr>' +
    list.map(function (r) { var c = r.data.cfg || {}, s = r.data.sum || {}, st = STROKES.find(function (x) { return x[0] === c.stroke; }); return '<tr><td><input type="checkbox" data-pick="' + r.id + '"' + (VS.sel.indexOf(r.id) >= 0 ? ' checked' : '') + ' style="width:auto"></td><td class="num">' + K.fmtDate(r.date) + '</td><td style="text-align:start"><b>' + esc(swName(r.swimmerId)) + '</b><div class="small muted">' + esc(c.label || '') + (c.notes ? ' · 📝 ' + esc(c.notes.slice(0, 60)) + (c.notes.length > 60 ? '…' : '') : '') + '</div></td><td><span class="chip' + (c.ctx === 'comp' ? ' warn' : '') + '">' + T(c.ctx === 'comp' ? 'vaComp' : 'vaTrain') + '</span></td><td class="small">' + c.dist + ' ' + (st ? tv(st[1]) : '') + ' · ' + c.pool + 'm</td><td class="num"><b>' + ft(s.final) + '</b></td><td class="num">' + f2(s.t15) + '</td><td class="num">' + f2(s.turn) + '</td><td class="num">' + f2(s.v) + '</td><td class="num">' + f2(s.sr, 1) + '</td><td class="num">' + f2(s.dps) + '</td><td style="white-space:nowrap"><button class="btn sm" data-open="' + r.id + '">' + T('loadVa') + '</button> <button class="btn sm" data-rep="' + r.id + '">📄</button> <button class="btn sm" data-vdel="' + r.id + '">✕</button></td></tr>'; }).join('') +
    '</table></div><div class="row" style="margin-top:10px"><button class="btn pri" id="gocmp"' + (VS.sel.length === 2 ? '' : ' disabled') + '>' + T('cmpGo') + '</button></div></div>';
}
function bindHist() {
  var hf = $('#hfilt'); if (hf) hf.onchange = function () { VS.filt = this.value; K.render(); };
  $$('[data-pick]').forEach(function (b) { b.onchange = function () { var id = b.dataset.pick, i = VS.sel.indexOf(id); if (b.checked && i < 0) VS.sel.push(id); if (!b.checked && i >= 0) VS.sel.splice(i, 1); if (VS.sel.length > 2) VS.sel.shift(); K.render(); }; });
  $$('[data-rep]').forEach(function (b) { b.onclick = function () { openReport(recSrc(vaRecs().find(function (r) { return r.id === b.dataset.rep; }))); }; });
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

/* ================= aide à la lecture : contrôles, résumé, phases ================= */
var RD = {
  ttl: ['تقرير تحليل السباق', 'Rapport d’analyse de course'], club: ['نادي الوثبة الرياضي · باتنة', 'Club Sportif Al-Wathba · Batna'],
  sw: ['السباح', 'Nageur'], date: ['التاريخ', 'Date'], ev: ['السباق', 'Épreuve'], pool: ['مسبح', 'Bassin'], train: ['تدريب', 'Entraînement'], comp: ['منافسة', 'Compétition'],
  final: ['الزمن النهائي', 'Temps final'], rt: ['ردة الفعل', 'Réaction'], t15: ['زمن 15 م', 'Temps 15 m'], turn: ['معدل الدوران', 'Virage moyen'], v: ['السرعة الصافية', 'Vitesse de nage'], sr: ['الإيقاع', 'Fréquence'], dps: ['المسافة/دورة', 'Distance/cycle'], fin5: ['آخر 5 م', '5 derniers m'],
  x_final: ['من الإشارة حتى اللمس', 'du signal à la touche'], x_rt: ['الإشارة ← الرجلين يفارقو المكعب', 'signal → décollage'], x_t15: ['الانطلاق كامل حتى 15 م', 'départ complet jusqu’à 15 m'], x_turn: ['5 م قبل الحائط + 5 م بعدو', '5 m avant + 5 m après le mur'], x_v: ['بلا انطلاق ولا دوران', 'hors départ et virages'], x_sr: ['دورات ذراع في الدقيقة', 'cycles de bras par minute'], x_dps: ['قداش يتقدم في كل دورة', 'avance par cycle de bras'], x_fin5: ['النهاية: 5 م الأخيرة', 'arrivée : 5 derniers m'],
  phases: ['وين راح الوقت', 'Répartition du temps'], ph_start: ['الانطلاق', 'Départ'], ph_swim: ['سباحة', 'Nage'], ph_turn: ['دوران', 'Virage'], ph_fin: ['الوصول', 'Arrivée'], ph_mix: ['…', '…'],
  sum: ['الخلاصة', 'Synthèse'], good: ['نقطة قوة', 'Point fort'], bad: ['نقطة ضعف', 'Point faible'], focus: ['نخدمو على', 'À travailler'], noSum: ['ما كاينش علامات كافية للخلاصة (لازم 15 م، 20 م/5 م حول الحوائط، ودورات).', 'Repères insuffisants pour la synthèse (15 m, repères autour des murs, cycles).'],
  laps: ['تفاصيل الأطوال', 'Détail par longueur'], lap: ['الطول', 'Long.'], split: ['الجزئي', 'Partiel'], cum: ['التراكمي', 'Cumul'], brk: ['الطلوع', 'Coulée'], si: ['مؤشر الضربة', 'Indice'], turnC: ['الدوران', 'Virage'],
  chart: ['السرعة والإيقاع في كل طول', 'Vitesse et fréquence par longueur'], notes: ['ملاحظات تقنية', 'Notes techniques'], imgs: ['صور', 'Images'],
  prev: ['مقارنة مع التحليل اللي فات', 'Comparaison avec l’analyse précédente'], gain: ['ربح', 'gagné'], loss: ['ضيّع', 'perdu'], same: ['نفس الشي', 'identique'],
  warn: ['⚠ علامات مشكوك فيها: الأرقام المعنية ماهيش أكيدة', '⚠ Repères douteux : chiffres concernés non fiables'], gen: ['تقرير من «الوثبة تحليل فيديو»', 'Rapport généré par « Al-Wathba Analyse Vidéo »'],
  c_rt: ['ردة الفعل {v} ث ماهيش معقولة (العادي 0.5–1.0): شوف «الإشارة» و«الرجلين يفارقو»', 'Réaction {v} s improbable (0,5–1,0) : vérifier « Signal » et « Décollage »'],
  c_ord: ['الطول {l}: علامة {d} م جات قبل علامة أقرب منها', 'Longueur {l} : le repère {d} m arrive avant un repère plus proche'],
  c_seg: ['الطول {l}: بين {a} و {b} م السرعة {v} م/ث ما تصراش', 'Longueur {l} : entre {a} et {b} m, vitesse {v} m/s impossible'],
  c_tin: ['الدوران {l}: {v} ث في آخر 5 م ماهيش معقولة (العادي 1.5–4.5)', 'Virage {l} : {v} s sur les 5 derniers m improbable (1,5–4,5)'],
  c_tout: ['الدوران {l}: {v} ث في أول 5 م ماهيش معقولة (العادي 1.0–4.0)', 'Virage {l} : {v} s sur les 5 premiers m improbable (1,0–4,0)'],
  c_15: ['زمن 15 م {v} ث ماهوش معقول', 'Temps 15 m {v} s improbable'], c_brk: ['الطول {l}: الطلوع بعد {v} م (أكثر من 15 م ممنوع)', 'Longueur {l} : sortie à {v} m (> 15 m interdit)'],
  go: ['روح لتما', 'Aller'], warnT: ['تنبيهات على العلامات', 'Alertes sur les repères'], okT: ['العلامات معقولة ✓', 'Repères cohérents ✓'],
  s_start_g: ['انطلاق قوي: سرعة 15 م أسرع بـ {p}% من السباحة', 'Départ efficace : 15 m {p}% plus rapide que la nage'], s_start_b: ['الانطلاق ضعيف: سرعة 15 م غير {p}% فوق السباحة', 'Départ faible : 15 m seulement {p}% au-dessus de la nage'], f_start: ['الانطلاق: الدفعة، الدخول للماء، والضربات تحت الماء (دولفين)', 'Départ : impulsion, entrée dans l’eau et ondulations'],
  s_turn_g: ['دوران مليح: أسرع من السباحة بـ {p}%', 'Bons virages : {p}% plus rapides que la nage'], s_turn_b: ['الدوران أبطأ من السباحة بـ {p}%: الوقت يضيع عند الحائط', 'Virages {p}% plus lents que la nage : temps perdu au mur'], f_turn: ['الدورانات: الاقتراب من الحائط، الدفعة، والطلوع', 'Virages : approche, poussée et coulée'],
  s_fade_g: ['حافظ على السرعة (هبوط {p}% برك)', 'Vitesse maintenue (baisse de {p}% seulement)'], s_fade_b: ['السرعة طاحت {p}% من الطول الأول للخر', 'Vitesse en baisse de {p}% entre la 1re et la dernière longueur'],
  f_fade_sr: ['الهبوط جاي خاصة من الإيقاع (طاح بـ {p}%): التحمّل والحفاظ على الريتم', 'La baisse vient surtout de la fréquence (−{p}%) : endurance et maintien du rythme'], f_fade_dps: ['الهبوط جاي خاصة من المسافة/دورة (طاحت بـ {p}%): التقنية تضعف مع التعب', 'La baisse vient surtout de la distance/cycle (−{p}%) : la technique se dégrade avec la fatigue'],
  s_fin_g: ['نهاية قوية', 'Arrivée solide'], s_fin_b: ['النهاية بطيئة: آخر 5 م أبطأ بـ {p}% من السباحة', 'Arrivée lente : 5 derniers m {p}% sous la vitesse de nage'], f_fin: ['النهاية: ما يتنفسش في آخر 5 م، ويمد اليد للحائط', 'Arrivée : pas de respiration sur les 5 derniers m, allonge vers le mur'],
  s_brk_g: ['طلوع طويل تحت الماء (≈{v} م)', 'Coulées longues (≈{v} m)'], s_brk_b: ['الطلوع قصير (≈{v} م)', 'Coulées courtes (≈{v} m)'], f_brk: ['الضربات تحت الماء بعد الانطلاق والدوران', 'Ondulations sous l’eau après départ et virages'],
  pdf: ['📄 PDF', '📄 PDF'], img: ['🖼 صورة', '🖼 Image'], share: ['📤 مشاركة', '📤 Partager'], report: ['📄 التقرير', '📄 Rapport'], lang: ['لغة التقرير', 'Langue du rapport'], close: ['✕', '✕'],
  lapCmp: ['🎞 مقارنة طولين في نفس الفيديو', '🎞 Comparer deux longueurs (même vidéo)'], lapCmpH: ['مثلاً الطول الأول (قبل التعب) ضد اللخراني (مع التعب). «مزامنة» تحط الزوج على بداية الطول.', 'Ex. 1re longueur (frais) contre la dernière (fatigue). « Synchroniser » cale les deux au début de la longueur.'],
  paneA: ['الجزء الأول (مثلاً الطول 1)', 'Partie A (ex. longueur 1)'], paneB: ['الجزء الثاني (مثلاً الطول الأخير)', 'Partie B (ex. dernière longueur)'],
  syncL: ['⏱ مزامنة على بداية الطول', '⏱ Caler au début de la longueur']
};
function rt(k, lg, o) { var v = RD[k]; var s = v ? (lg === 'fr' ? v[1] : v[0]) : k; if (o) Object.keys(o).forEach(function (x) { s = s.split('{' + x + '}').join(o[x]); }); return s; }
function r1(x) { return (Math.round(x * 10) / 10).toFixed(1); }
function stName(c, lg) { var s = STROKES.find(function (x) { return x[0] === c.stroke; }); return s ? (lg === 'fr' ? s[1][1] : s[1][0]) : ''; }

/* --- contrôles de cohérence des repères --- */
function checkEv(c, evs, r, lg) {
  var out = [], P = +c.pool, f = +c.slow || 1, add = function (msg, t, lvl) { if (!out.some(function (x) { return x.msg === msg; })) out.push({ msg: msg, t: t, lvl: lvl || 'bad' }); };
  var ev = evs.slice().sort(function (a, b) { return a.t - b.t; }), sig = ev.find(function (e) { return e.k === 'S'; }), o = ev.find(function (e) { return e.k === 'O'; });
  if (c.start === 'dive' && r.rt != null && (r.rt < 0.4 || r.rt > 1.3)) add(rt('c_rt', lg, { v: r1(r.rt) }), o ? o.t : null);
  var walls = ev.filter(function (e) { return e.k === 'W' || e.k === 'F'; });
  for (var i = 1; i <= r.n; i++) {
    var L0 = i === 1 ? (sig ? sig.t : null) : (walls[i - 2] ? walls[i - 2].t : null), L1 = walls[i - 1] ? walls[i - 1].t : null;
    var mk = ev.filter(function (e) { return e.k === 'M' && e.lap === i; });
    mk.forEach(function (m, j) { mk.forEach(function (n2, k) { if (k > j && n2.d < m.d) add(rt('c_ord', lg, { l: i, d: m.d }), m.t); }); });
    var pts = []; if (L0 != null) pts.push({ d: 0, t: L0, m: null }); mk.slice().sort(function (a, b) { return a.d - b.d; }).forEach(function (m) { pts.push({ d: m.d, t: m.t, m: m }); }); if (L1 != null) pts.push({ d: P, t: L1, m: null });
    for (var k = 1; k < pts.length; k++) {
      var a = pts[k - 1], b = pts[k], dt = (b.t - a.t) / f; if (dt <= 0) continue;
      var sp = (b.d - a.d) / dt, lo = i === 1 && a.d === 0 ? 0.45 : 0.45, hi = a.d === 0 ? 3.2 : 2.45;
      if (sp > hi || sp < lo) add(rt('c_seg', lg, { l: i, a: a.d, b: b.d, v: r1(sp) }), (b.m || a.m || {}).t);
    }
    var lp = r.laps[i - 1]; if (lp && lp.brkD != null && lp.brkD > 15) add(rt('c_brk', lg, { l: i, v: r1(lp.brkD) }), (ev.find(function (e) { return e.k === 'B' && e.lap === i; }) || {}).t);
  }
  r.turns.forEach(function (tr) {
    if (tr.inn != null && (tr.inn < 1.5 || tr.inn > 4.5)) add(rt('c_tin', lg, { l: tr.k, v: r1(tr.inn) }), (ev.find(function (e) { return e.k === 'M' && e.lap === tr.k && e.d === P - 5; }) || {}).t);
    if (tr.out != null && (tr.out < 1.0 || tr.out > 4.0)) add(rt('c_tout', lg, { l: tr.k, v: r1(tr.out) }), (ev.find(function (e) { return e.k === 'M' && e.lap === tr.k + 1 && e.d === 5; }) || {}).t);
  });
  if (r.t15 != null && (r.t15 < 4.5 || r.t15 > 13)) add(rt('c_15', lg, { v: r1(r.t15) }), (ev.find(function (e) { return e.k === 'M' && e.lap === 1 && e.d === 15; }) || {}).t);
  return out;
}
/* --- répartition du temps par phase --- */
function phasesOf(c, evs, r) {
  var P = +c.pool, f = +c.slow || 1, ev = evs.slice().sort(function (a, b) { return a.t - b.t; }), sig = ev.find(function (e) { return e.k === 'S'; });
  if (!sig || r.final == null) return null;
  var walls = ev.filter(function (e) { return e.k === 'W' || e.k === 'F'; }), m = function (lap, d) { var x = ev.find(function (e) { return e.k === 'M' && e.lap === lap && e.d === d; }); return x ? x.t : null; };
  var B = [{ t: sig.t, k: 'start' }]; B.push({ t: m(1, 15), k: 'swim' });
  for (var i = 1; i < r.n; i++) { B.push({ t: m(i, P - 5), k: 'turn' }); B.push({ t: m(i + 1, 5), k: 'swim' }); }
  B.push({ t: m(r.n, P - 5), k: 'fin' }); B.push({ t: walls[r.n - 1] ? walls[r.n - 1].t : null, k: 'end' });
  var segs = [], cur = B[0];
  for (var j = 1; j < B.length; j++) {
    if (B[j].t == null) { if (cur.k !== 'mix') cur = { t: cur.t, k: cur.k === B[j].k ? cur.k : 'mix', mixed: true }; continue; }
    if (B[j].t < cur.t) return null;
    segs.push({ k: cur.mixed ? 'mix' : cur.k, d: (B[j].t - cur.t) / f }); cur = B[j];
  }
  // fusion des phases consécutives identiques
  var o = []; segs.forEach(function (s) { if (o.length && o[o.length - 1].k === s.k && s.k === 'mix') o[o.length - 1].d += s.d; else o.push(s); });
  return o;
}
var PHC = { start: '#f472b6', swim: '#22d3ee', turn: '#a3e635', fin: '#fbbf24', mix: '#64748b' };
/* --- synthèse automatique (version entraîneur) --- */
function summary(c, r, lg) {
  var G = [], Bd = [], F2 = [];
  if (!r.v) return null;
  var P = +c.pool;
  if (r.t15 != null && c.start !== 'push') { var sr0 = (15 / r.t15) / r.v - 1; if (sr0 >= 0.35) G.push([sr0, rt('s_start_g', lg, { p: Math.round(sr0 * 100) })]); else if (sr0 < 0.2) { Bd.push([0.2 - sr0, rt('s_start_b', lg, { p: Math.round(sr0 * 100) }), rt('f_start', lg)]); } }
  if (r.turn != null) { var tr = (10 / r.turn) / r.v - 1; if (tr >= 0.15) G.push([tr, rt('s_turn_g', lg, { p: Math.round(tr * 100) })]); else if (tr < 0) Bd.push([-tr + 0.1, rt('s_turn_b', lg, { p: Math.round(-tr * 100) }), rt('f_turn', lg)]); }
  var vl = r.laps.filter(function (l) { return l.v; }), vLast = vl.length ? vl[vl.length - 1].v : r.v;
  if (r.fin5 != null) { var fr = (5 / r.fin5) / vLast - 1; if (fr >= -0.02) G.push([0.05, rt('s_fin_g', lg)]); else if (fr < -0.1) Bd.push([-fr, rt('s_fin_b', lg, { p: Math.round(-fr * 100) }), rt('f_fin', lg)]); }
  if (r.vDrop != null) {
    if (r.vDrop <= 4) G.push([0.1, rt('s_fade_g', lg, { p: r1(Math.max(0, r.vDrop)) })]);
    else if (r.vDrop > 8) {
      var dl = r.laps.filter(function (l) { return l.dps; }), dd = dl.length >= 2 ? (dl[0].dps - dl[dl.length - 1].dps) / dl[0].dps * 100 : null;
      var fx = r.srDrop != null && dd != null ? (r.srDrop >= dd ? rt('f_fade_sr', lg, { p: r1(r.srDrop) }) : rt('f_fade_dps', lg, { p: r1(dd) })) : rt('f_fade_sr', lg, { p: r1(r.srDrop || 0) });
      Bd.push([r.vDrop / 50, rt('s_fade_b', lg, { p: r1(r.vDrop) }), fx]);
    }
  }
  var bk = r.laps.map(function (l) { return l.brkD; }).filter(function (x) { return x != null && x <= 15; });
  if (bk.length) { var ab = bk.reduce(function (a, b) { return a + b; }, 0) / bk.length; if (ab >= 6) G.push([0.08, rt('s_brk_g', lg, { v: r1(ab) })]); else if (ab < 4) Bd.push([0.15, rt('s_brk_b', lg, { v: r1(ab) }), rt('f_brk', lg)]); }
  G.sort(function (a, b) { return b[0] - a[0]; }); Bd.sort(function (a, b) { return b[0] - a[0]; });
  if (!G.length && !Bd.length) return null;
  return { good: G.slice(0, 2).map(function (x) { return x[1]; }), bad: Bd.slice(0, 2).map(function (x) { return x[1]; }), focus: Bd.length ? Bd[0][2] : null };
}
/* --- analyse précédente comparable --- */
function prevOf(sid, c, id, date) {
  return vaRecs().filter(function (x) { var q = x.data.cfg || {}; return x.id !== id && x.swimmerId === sid && +q.dist === +c.dist && q.stroke === c.stroke && +q.pool === +c.pool && (x.date || '') <= (date || '9999'); })[0] || null;
}
/* --- blocs HTML pour l'écran d'analyse --- */
function aidHtml(c, evs, r) {
  var lg = L(), ck = checkEv(c, evs, r, lg), sm = summary(c, r, lg), ph = phasesOf(c, evs, r), h = '';
  if (evs.length > 3) h += '<div class="va-chk ' + (ck.length ? 'bad' : 'ok') + '"><b>' + (ck.length ? '⚠ ' + rt('warnT', lg) : rt('okT', lg)) + '</b>' + ck.map(function (x) { return '<div class="row" style="gap:8px;margin-top:6px"><span class="sp">' + esc(x.msg) + '</span>' + (x.t != null ? '<button class="btn sm" data-goto="' + x.t + '">' + rt('go', lg) + ' ▸</button>' : '') + '</div>'; }).join('') + '</div>';
  if (ph && ph.length) {
    var tot = ph.reduce(function (a, b) { return a + b.d; }, 0);
    h += '<div class="va-phw"><div class="small muted" style="margin-bottom:6px">' + rt('phases', lg) + '</div><div class="va-ph">' + ph.map(function (p) { return '<div style="flex:' + (p.d / tot).toFixed(4) + ';background:' + PHC[p.k] + '" title="' + rt('ph_' + p.k, lg) + ' ' + p.d.toFixed(2) + ' s"><span dir="ltr">' + p.d.toFixed(2) + '</span></div>'; }).join('') + '</div><div class="row small muted" style="gap:12px;margin-top:6px">' + ['start', 'swim', 'turn', 'fin'].map(function (k) { return '<span><i style="display:inline-block;width:10px;height:10px;border-radius:3px;background:' + PHC[k] + '"></i> ' + rt('ph_' + k, lg) + '</span>'; }).join('') + '</div></div>';
  }
  if (sm) h += '<div class="va-sum"><div class="small muted">' + rt('sum', lg) + '</div>' + sm.good.map(function (x) { return '<div>✅ <b>' + rt('good', lg) + ' :</b> ' + esc(x) + '</div>'; }).join('') + sm.bad.map(function (x) { return '<div>🔻 <b>' + rt('bad', lg) + ' :</b> ' + esc(x) + '</div>'; }).join('') + (sm.focus ? '<div>🎯 <b>' + rt('focus', lg) + ' :</b> ' + esc(sm.focus) + '</div>' : '') + (ck.length ? '<div class="small" style="color:var(--warn)">' + rt('warn', lg) + '</div>' : '') + '</div>';
  return h;
}
function bindAid() { $$('[data-goto]').forEach(function (b) { b.onclick = function () { var v = $('#vid'); if (v) { v.pause(); seekV(v, +b.dataset.goto); v.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }; }); }

/* ================= rapport (canvas → image / PDF) ================= */
var LOGO = null; function logoImg() { return new Promise(function (ok) { if (LOGO) return ok(LOGO); var i = new Image(); i.onload = function () { LOGO = i; ok(i); }; i.onerror = function () { ok(null); }; i.src = 'logo.png'; }); }
function snapsOf(id) { if (VS.id === id && VS.snaps && VS.snaps.length) return VS.snaps; try { return JSON.parse(localStorage.getItem('wav_snaps_' + id) || '[]'); } catch (e) { return []; } }
function loadImgs(src) { return Promise.all(src.map(function (s) { return new Promise(function (ok) { var i = new Image(); i.onload = function () { ok(i); }; i.onerror = function () { ok(null); }; i.src = s; }); })); }
function drawReport(src, lg) {
  var c = src.cfg, evs = src.ev, r = compute(c, evs), ck = checkEv(c, evs, r, lg), sm = summary(c, r, lg), ph = phasesOf(c, evs, r);
  var prev = prevOf(src.sid, c, src.id, src.date), pr = prev ? compute(Object.assign(defCfg(), prev.data.cfg), prev.data.ev || []) : null;
  return Promise.all([logoImg(), loadImgs(snapsOf(src.id).slice(0, 3))]).then(function (res) {
    var logo = res[0], snaps = res[1].filter(Boolean);
    var W = 1240, M = 64, cv = document.createElement('canvas'); cv.width = W; cv.height = 4200;
    var g = cv.getContext('2d'), rtl = lg !== 'fr', FN = '"IBM Plex Sans Arabic","Inter","Segoe UI",Tahoma,sans-serif', NF = '"Inter","Segoe UI",Arial,sans-serif';
    var X = function (x) { return rtl ? W - x : x; };
    var AR = /[\u0600-\u06FF]/; var tx = function (s, x, y, o) { o = o || {}; if (o.auto && !rtl && AR.test(s)) { o = Object.assign({}, o, { raw: 1, a: 'right' }); g.save(); g.font = (o.w || 500) + ' ' + (o.s || 22) + 'px ' + FN; g.fillStyle = o.c || '#0f172a'; g.direction = 'rtl'; g.textAlign = 'right'; g.fillText(String(s), W - M, y); g.restore(); return; } g.save(); g.font = (o.w || 500) + ' ' + (o.s || 22) + 'px ' + (o.n ? NF : FN); g.fillStyle = o.c || '#0f172a'; g.direction = o.n ? 'ltr' : (rtl ? 'rtl' : 'ltr'); g.textAlign = o.a || (o.n ? (rtl ? 'right' : 'left') : 'start'); g.textBaseline = 'alphabetic'; g.fillText(String(s), o.raw ? x : X(x), y); g.restore(); };
    var wrap = function (s, x, y, maxW, o) { o = o || {}; g.save(); g.font = (o.w || 500) + ' ' + (o.s || 22) + 'px ' + FN; var words = String(s).split(' '), line = '', lines = []; words.forEach(function (w) { var t = line ? line + ' ' + w : w; if (g.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t; }); if (line) lines.push(line); g.restore(); lines.forEach(function (l, i) { tx(l, x, y + i * (o.lh || 32), o); }); return lines.length * (o.lh || 32); };
    var rect = function (x, y, w, h, col, rad) { g.save(); g.fillStyle = col; g.beginPath(); var xx = rtl ? W - x - w : x; if (g.roundRect) g.roundRect(xx, y, w, h, rad || 0); else g.rect(xx, y, w, h); g.fill(); g.restore(); };
    var title = function (s, y) { rect(M, y, 6, 30, '#0891b2', 3); tx(s, M + 18, y + 25, { s: 26, w: 700, c: '#0b2a6e' }); return y + 50; };
    g.fillStyle = '#fff'; g.fillRect(0, 0, W, cv.height);
    // en-tête
    var hg = g.createLinearGradient(0, 0, W, 0); hg.addColorStop(0, '#0b2a6e'); hg.addColorStop(1, '#0891b2'); g.fillStyle = hg; g.fillRect(0, 0, W, 190);
    if (logo) g.drawImage(logo, rtl ? W - M - 110 : M, 40, 110, 110);
    tx(rt('ttl', lg), M + 135, 85, { s: 38, w: 800, c: '#fff' }); tx(rt('club', lg), M + 135, 125, { s: 22, c: '#cfe9ff' });
    tx(ft(r.final), rtl ? M : W - M, 110, { s: 64, w: 800, c: '#fff', n: 1, raw: 1, a: rtl ? 'left' : 'right' }); tx(rt('final', lg), rtl ? M + 2 : W - M, 145, { s: 20, c: '#cfe9ff', raw: 1, a: rtl ? 'left' : 'right' });
    var y = 240, info = [[rt('sw', lg), swName(src.sid)], [rt('date', lg), K.fmtDate(src.date)], [rt('ev', lg), c.dist + (lg === 'fr' ? ' m ' : ' م ') + stName(c, lg) + ' · ' + rt('pool', lg) + ' ' + c.pool], ['', rt(c.ctx === 'comp' ? 'comp' : 'train', lg) + (c.label ? ' · ' + c.label : '')]];
    info.forEach(function (it, i) { var cx = M + (i % 2) * 560, cy = y + Math.floor(i / 2) * 40; if (it[0]) tx(it[0] + ' :', cx, cy, { s: 20, c: '#64748b' }); tx(it[1], cx + (it[0] ? 120 : 0), cy, { s: 22, w: 700 }); });
    y += 100;
    if (ck.length) { var hh = 44 + ck.length * 30; rect(M, y, W - 2 * M, hh, '#fff4e5', 12); tx(rt('warn', lg), M + 20, y + 32, { s: 20, w: 700, c: '#b45309' }); ck.forEach(function (x, i) { tx('• ' + x.msg, M + 20, y + 64 + i * 30, { s: 18, c: '#92400e' }); }); y += hh + 24; }
    // KPI
    var K8 = [['final', ft(r.final), ''], ['rt', c.start === 'dive' ? f2(r.rt) : '—', 's'], ['t15', f2(r.t15), 's'], ['turn', f2(r.turn), 's'], ['v', f2(r.v), 'm/s'], ['sr', f2(r.sr, 1), lg === 'fr' ? 'cyc/min' : 'دورة/د'], ['dps', f2(r.dps), 'm'], ['fin5', f2(r.fin5), 's']];
    var cw = (W - 2 * M - 3 * 16) / 4;
    K8.forEach(function (k, i) { var cx = M + (i % 4) * (cw + 16), cy = y + Math.floor(i / 4) * 140; rect(cx, cy, cw, 124, '#f1f6fd', 14); rect(cx, cy, 5, 124, '#0891b2', 2); tx(rt(k[0], lg), cx + 20, cy + 34, { s: 20, w: 700, c: '#0b2a6e' }); var vx = rtl ? W - cx - 20 : cx + 20; tx(k[1] + (k[2] && k[1] !== '—' ? ' ' + k[2] : ''), vx, cy + 78, { s: 34, w: 800, n: 1, raw: 1, a: rtl ? 'right' : 'left' }); tx(rt('x_' + k[0], lg), cx + 20, cy + 108, { s: 15, c: '#64748b' }); });
    y += 290;
    // phases
    if (ph && ph.length) {
      y = title(rt('phases', lg), y); var tot = ph.reduce(function (a, b) { return a + b.d; }, 0), bw = W - 2 * M, x0 = 0;
      ph.forEach(function (p) { var w = bw * p.d / tot; rect(M + x0, y, w - 3, 54, PHC[p.k], 6); if (w > 60) tx(p.d.toFixed(2), rtl ? W - M - x0 - w / 2 : M + x0 + w / 2, y + 36, { s: 20, w: 800, n: 1, raw: 1, a: 'center', c: '#0f172a' }); x0 += w; });
      y += 78; var lx = 0; ['start', 'swim', 'turn', 'fin'].forEach(function (k) { rect(M + lx, y - 16, 18, 18, PHC[k], 4); tx(rt('ph_' + k, lg), M + lx + 28, y, { s: 18, c: '#334155' }); lx += 190; }); y += 40;
    }
    // synthèse
    if (sm) {
      y = title(rt('sum', lg), y);
      var rows = sm.good.map(function (s) { return ['✅ ' + rt('good', lg) + ' : ', s, '#047857']; }).concat(sm.bad.map(function (s) { return ['🔻 ' + rt('bad', lg) + ' : ', s, '#b91c1c']; })); if (sm.focus) rows.push(['🎯 ' + rt('focus', lg) + ' : ', sm.focus, '#0b2a6e']);
      rows.forEach(function (rw) { y += wrap(rw[0] + rw[1], M + 10, y + 22, W - 2 * M - 20, { s: 22, w: 600, c: rw[2], lh: 34 }) + 6; }); y += 20;
    } else { y = title(rt('sum', lg), y); y += wrap(rt('noSum', lg), M + 10, y + 20, W - 2 * M - 20, { s: 19, c: '#64748b' }) + 20; }
    // tableau des longueurs
    y = title(rt('laps', lg), y);
    var cols = [['lap', 0.07], ['split', 0.11], ['cum', 0.12], ['brk', 0.17], ['v', 0.12], ['sr', 0.11], ['dps', 0.11], ['turnC', 0.19]], tw = W - 2 * M;
    rect(M, y, tw, 44, '#0b2a6e', 8); var cx0 = 0; cols.forEach(function (cl) { var w = tw * cl[1]; tx(rt(cl[0], lg), rtl ? W - M - cx0 - w / 2 : M + cx0 + w / 2, y + 29, { s: 17, w: 700, c: '#fff', raw: 1, a: 'center' }); cx0 += w; }); y += 44;
    r.laps.forEach(function (l, i) {
      if (i % 2) rect(M, y, tw, 40, '#f5f8fd', 0);
      var vals = [String(l.i), f2(l.split), ft(l.cum), l.brkT != null ? f2(l.brkT) + ' s' + (l.brkD != null ? ' · ' + f2(l.brkD, 1) + ' m' : '') : '—', f2(l.v), f2(l.sr, 1), f2(l.dps), l.turn && l.turn.tot != null ? f2(l.turn.tot) + ' (' + f2(l.turn.inn) + '+' + f2(l.turn.out) + ')' : '—'];
      var x1 = 0; cols.forEach(function (cl, j) { var w = tw * cl[1]; tx(vals[j], rtl ? W - M - x1 - w / 2 : M + x1 + w / 2, y + 27, { s: 18, w: j ? 500 : 800, n: 1, raw: 1, a: 'center' }); x1 += w; }); y += 40;
    });
    y += 30;
    // graphique
    var pv = r.laps.filter(function (l) { return l.v; });
    if (pv.length >= 2) {
      y = title(rt('chart', lg), y); var gx = M + 60, gw = W - 2 * M - 120, gh = 220, vs = r.laps.map(function (l) { return l.v; }), ss = r.laps.map(function (l) { return l.sr; });
      var rng = function (a) { a = a.filter(function (x) { return x; }); if (!a.length) return null; var lo = Math.min.apply(null, a), hi = Math.max.apply(null, a), p = (hi - lo) * 0.2 || hi * 0.05; return [lo - p, hi + p]; };
      var rv = rng(vs), rs = rng(ss), n = r.laps.length;
      g.strokeStyle = '#e2e8f0'; g.lineWidth = 1; for (var q = 0; q <= 4; q++) { var gy = y + gh * q / 4; g.beginPath(); g.moveTo(gx, gy); g.lineTo(gx + gw, gy); g.stroke(); if (rv) tx((rv[1] - (rv[1] - rv[0]) * q / 4).toFixed(2), gx - 8, gy + 6, { s: 14, n: 1, raw: 1, a: 'right', c: '#0891b2' }); if (rs) tx((rs[1] - (rs[1] - rs[0]) * q / 4).toFixed(0), gx + gw + 8, gy + 6, { s: 14, n: 1, raw: 1, a: 'left', c: '#d97706' }); }
      var line = function (a, rg, col, dash) { if (!rg) return; g.save(); g.strokeStyle = col; g.fillStyle = col; g.lineWidth = 4; g.setLineDash(dash || []); g.beginPath(); var st = false; a.forEach(function (v, i) { if (!v) return; var px = gx + (n === 1 ? gw / 2 : gw * i / (n - 1)), py = y + gh * (1 - (v - rg[0]) / (rg[1] - rg[0])); if (!st) { g.moveTo(px, py); st = true; } else g.lineTo(px, py); }); g.stroke(); g.setLineDash([]); a.forEach(function (v, i) { if (!v) return; var px = gx + (n === 1 ? gw / 2 : gw * i / (n - 1)), py = y + gh * (1 - (v - rg[0]) / (rg[1] - rg[0])); g.beginPath(); g.arc(px, py, 6, 0, 7); g.fill(); }); g.restore(); };
      line(vs, rv, '#0891b2'); line(ss, rs, '#d97706', [10, 8]);
      for (var li = 0; li < n; li++) tx((lg === 'fr' ? 'L' : 'ط') + (li + 1), gx + (n === 1 ? gw / 2 : gw * li / (n - 1)), y + gh + 28, { s: 15, raw: 1, a: 'center', c: '#64748b' });
      y += gh + 50; rect(M, y - 14, 30, 6, '#0891b2', 3); tx(rt('v', lg) + ' (m/s)', M + 42, y - 4, { s: 17, c: '#334155' }); rect(M + 330, y - 14, 30, 6, '#d97706', 3); tx(rt('sr', lg), M + 372, y - 4, { s: 17, c: '#334155' }); y += 40;
    }
    // comparaison
    if (pr && pr.final != null && r.final != null) {
      y = title(rt('prev', lg) + ' (' + K.fmtDate(prev.date) + ')', y);
      var cmp = [['final', pr.final, r.final], ['t15', pr.t15, r.t15], ['turn', pr.turnSum, r.turnSum], ['fin5', pr.fin5, r.fin5], ['v', pr.v, r.v, 1]];
      cmp.forEach(function (cm, i) { if (cm[1] == null || cm[2] == null) return; var d = cm[2] - cm[1], better = cm[3] ? d > 0 : d < 0, col = Math.abs(d) < 0.005 ? '#64748b' : better ? '#047857' : '#b91c1c'; var cx = M + (i % 3) * 380, cy = y + Math.floor(i / 3) * 70; tx(rt(cm[0], lg) + ' :', cx, cy + 24, { s: 19, c: '#334155' }); tx((d > 0 ? '+' : d < 0 ? '−' : '') + Math.abs(d).toFixed(2) + (cm[3] ? ' m/s' : ' s'), rtl ? W - cx - 190 : cx + 190, cy + 24, { s: 22, w: 800, n: 1, raw: 1, a: rtl ? 'right' : 'left', c: col }); });
      y += 150;
    }
    // notes
    if (c.notes) { y = title(rt('notes', lg), y); y += wrap(c.notes, M + 10, y + 20, W - 2 * M - 20, { s: 21, lh: 32, auto: 1 }) + 24; }
    // images
    if (snaps.length) {
      y = title(rt('imgs', lg), y); var slot = (W - 2 * M - 2 * 16) / 3, ih = 0;
      snaps.forEach(function (im, i) { var sc = Math.min(slot / im.width, 360 / im.height), w = im.width * sc, h = im.height * sc; ih = Math.max(ih, h); var xx = rtl ? W - M - (i + 1) * slot - i * 16 + (slot - w) : M + i * (slot + 16); g.drawImage(im, xx, y, w, h); g.strokeStyle = '#cbd5e1'; g.lineWidth = 2; g.strokeRect(xx, y, w, h); });
      y += ih + 30;
    }
    // pied
    g.fillStyle = '#e2e8f0'; g.fillRect(M, y, W - 2 * M, 2); tx(rt('gen', lg) + ' · ' + K.fmtDate(K.today()), M, y + 34, { s: 16, c: '#94a3b8' });
    var outC = document.createElement('canvas'); outC.width = W; outC.height = y + 60; outC.getContext('2d').drawImage(cv, 0, 0);
    return outC;
  });
}
// PDF minimal (une page, image JPEG)
function pdfFromCanvas(cv) {
  var jpg = atob(cv.toDataURL('image/jpeg', 0.9).split(',')[1]), pw = 595.28, ph = pw * cv.height / cv.width;
  var enc = function (s) { var a = new Uint8Array(s.length); for (var i = 0; i < s.length; i++) a[i] = s.charCodeAt(i) & 255; return a; };
  var parts = [], off = [], len = 0, push = function (s) { var b = typeof s === 'string' ? enc(s) : s; parts.push(b); len += b.length; };
  var content = 'q ' + pw.toFixed(2) + ' 0 0 ' + ph.toFixed(2) + ' 0 0 cm /Im0 Do Q';
  push('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
  off[1] = len; push('1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n');
  off[2] = len; push('2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n');
  off[3] = len; push('3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 ' + pw.toFixed(2) + ' ' + ph.toFixed(2) + ']/Resources<</XObject<</Im0 4 0 R>>>>/Contents 5 0 R>>endobj\n');
  off[4] = len; push('4 0 obj<</Type/XObject/Subtype/Image/Width ' + cv.width + '/Height ' + cv.height + '/ColorSpace/DeviceRGB/BitsPerComponent 8/Filter/DCTDecode/Length ' + jpg.length + '>>stream\n'); push(enc(jpg)); push('\nendstream endobj\n');
  off[5] = len; push('5 0 obj<</Length ' + content.length + '>>stream\n' + content + '\nendstream endobj\n');
  var xr = len, x = 'xref\n0 6\n0000000000 65535 f \n'; for (var i = 1; i <= 5; i++) x += ('0000000000' + off[i]).slice(-10) + ' 00000 n \n';
  push(x + 'trailer<</Size 6/Root 1 0 R>>\nstartxref\n' + xr + '\n%%EOF');
  return new Blob(parts, { type: 'application/pdf' });
}
function fileName(src, ext) { return ('Wathba_' + swName(src.sid) + '_' + src.cfg.dist + 'm_' + src.date).replace(/[^\w؀-ۿ.-]+/g, '_') + '.' + ext; }
function sendBlob(blob, name) {
  var f = null; try { f = new File([blob], name, { type: blob.type }); } catch (e) {}
  if (f && navigator.canShare && navigator.canShare({ files: [f] })) return navigator.share({ files: [f], title: name }).catch(function () {});
  var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
}
function openReport(src) {
  var lg = L(), box = document.createElement('div'); box.id = 'repbox';
  box.innerHTML = '<div class="rep-in card"><div class="row" style="margin-bottom:10px"><b class="sp">' + rt('report', lg) + '</b><label class="small muted" style="margin:0">' + rt('lang', lg) + '</label><select id="replg" style="width:auto"><option value="ar">العربية</option><option value="fr">Français</option></select><button class="btn pri sm" id="repimg">' + rt('img', lg) + '</button><button class="btn pri sm" id="reppdf">' + rt('pdf', lg) + '</button><button class="btn sm" id="repx">✕</button></div><div id="repview" class="rep-view">…</div></div>';
  document.body.appendChild(box); $('#replg').value = lg;
  var cur = null, draw = function () { $('#repview').innerHTML = '…'; drawReport(src, $('#replg').value).then(function (cv) { cur = cv; cv.style.width = '100%'; cv.style.height = 'auto'; $('#repview').innerHTML = ''; $('#repview').appendChild(cv); }); };
  draw();
  $('#replg').onchange = draw;
  $('#repx').onclick = function () { box.remove(); };
  box.onclick = function (e) { if (e.target === box) box.remove(); };
  $('#repimg').onclick = function () { if (cur) cur.toBlob(function (b) { sendBlob(b, fileName(src, 'png')); }, 'image/png'); };
  $('#reppdf').onclick = function () { if (cur) sendBlob(pdfFromCanvas(cur), fileName(src, 'pdf')); };
}
function curSrc() { return { id: VS.id, sid: VS.cfg.sid, date: VS.cfg.date || K.today(), cfg: VS.cfg, ev: VS.ev }; }
function recSrc(rec) { return { id: rec.id, sid: rec.swimmerId, date: rec.date, cfg: Object.assign(defCfg(), rec.data.cfg || {}), ev: (rec.data.ev || []).map(function (e) { return { k: e.k, t: e.t, d: e.d }; }) }; }

/* ================= deux longueurs d'une même vidéo ================= */
function lapStarts(c, evs) { var ev = evs.slice().sort(function (a, b) { return a.t - b.t; }), sig = ev.find(function (e) { return e.k === 'S'; }), w = ev.filter(function (e) { return e.k === 'W' || e.k === 'F'; }), o = [sig ? sig.t : (ev[0] ? ev[0].t : 0)]; for (var i = 1; i < laps(c); i++) o.push(w[i - 1] ? w[i - 1].t : null); return o; }
function lapCmpHtml() {
  var n = laps(VS.cfg), lg = L(); if (!VS.url || n < 2) return '';
  var opt = function (sel) { var s = ''; for (var i = 1; i <= n; i++) s += '<option value="' + i + '"' + (i === sel ? ' selected' : '') + '>' + rt('lap', lg) + ' ' + i + '</option>'; return s; };
  return '<div class="card"><h3>' + rt('lapCmp', lg) + '</h3><p class="small muted">' + rt('lapCmpH', lg) + '</p><div class="va-dual"><div><label class="small">' + rt('paneA', lg) + '</label><select id="lcA">' + opt(1) + '</select><video id="lv0" src="' + VS.url + '" playsinline preload="auto" muted></video></div><div><label class="small">' + rt('paneB', lg) + '</label><select id="lcB">' + opt(n) + '</select><video id="lv1" src="' + VS.url + '" playsinline preload="auto" muted></video></div></div>' +
    '<div class="row" style="margin-top:8px;gap:6px;direction:ltr"><button class="btn sm" id="lsync">' + rt('syncL', lg) + '</button><button class="btn sm" data-ls="-1">◀</button><button class="btn pri sm" id="lplay">▶</button><button class="btn sm" data-ls="1">▶</button><select id="lrate" style="width:auto;min-height:34px">' + [0.1, 0.25, 0.5, 1].map(function (r) { return '<option value="' + r + '"' + (r === 0.25 ? ' selected' : '') + '>×' + r + '</option>'; }).join('') + '</select></div></div>';
}
function bindLapCmp() {
  var a = $('#lv0'), b = $('#lv1'); if (!a || !b) return;
  var vids = [a, b];
  var sync = function () { var st = lapStarts(VS.cfg, VS.ev), ia = +$('#lcA').value - 1, ib = +$('#lcB').value - 1; vids.forEach(function (v) { v.pause(); }); if (st[ia] != null) seekV(a, st[ia]); if (st[ib] != null) seekV(b, st[ib]); $('#lplay').textContent = '▶'; };
  vids.forEach(function (v) { v.playbackRate = 0.25; v.addEventListener('loadedmetadata', sync, { once: true }); });
  $('#lsync').onclick = sync; $('#lcA').onchange = sync; $('#lcB').onchange = sync;
  $('#lplay').onclick = function () { var p = vids.some(function (v) { return v.paused; }); vids.forEach(function (v) { if (p) v.play(); else v.pause(); }); this.textContent = p ? '⏸' : '▶'; };
  $('#lrate').onchange = function () { var r = +this.value; vids.forEach(function (v) { v.playbackRate = r; }); };
  $$('[data-ls]').forEach(function (bt) { bt.onclick = function () { vids.forEach(function (v) { v.pause(); seekV(v, (v._tgt != null ? v._tgt : v.currentTime) + (+bt.dataset.ls) / (VS.fps || 30)); }); }; });
}

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
