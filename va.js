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
var VS = { tab: 'new', url: null, fname: '', cfg: null, ev: [], dirty: false, id: null, sel: [], fps: 30, fpsAuto: true, angle: false, pts: [], cmp: null, z: null, z2: null, tool: null, mode: 'race', meas: [], cal: null, trk: [], mimg: {}, trkStep: 1 };
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
    '<div class="va-stage' + (VS.url ? '' : ' hide') + '" id="stage"><div class="va-zm" id="zm"><video id="vid" playsinline preload="auto"' + (VS.url ? ' src="' + VS.url + '"' : '') + '></video><canvas id="ov"></canvas></div>' + zoomUi() + '</div>' +
    '<div class="va-ctl' + (VS.url ? '' : ' hide') + '"><div class="va-seekw"><div class="va-tl" id="vtl"></div><input type="range" id="seek" min="0" max="1000" value="0" class="va-seek"></div>' +
    '<div class="row" style="gap:6px;flex-wrap:wrap"><button class="btn sm" data-st="-30">«</button><button class="btn sm" data-st="-10">◀◀</button><button class="btn sm" data-st="-1">◀</button><button class="btn pri sm" id="play" style="min-width:56px">▶</button><button class="btn sm" data-st="1">▶</button><button class="btn sm" data-st="10">▶▶</button><button class="btn sm" data-st="30">»</button>' +
    '<select id="rate" style="width:auto;min-height:34px">' + [0.1, 0.25, 0.5, 1].map(function (r) { return '<option value="' + r + '"' + (r === 0.25 ? ' selected' : '') + '>×' + r + '</option>'; }).join('') + '</select>' +
    '<span class="sp"></span><span class="mono ltr" id="tdisp" style="font-weight:700">0.00</span><span class="chip ltr" id="fpsd"></span><button class="btn sm" id="snap">' + T('snap') + '</button><label class="btn sm" style="margin:0">📂<input type="file" id="vfile2" accept="video/*" hidden></label></div>' +
    toolBar() + '<div class="small muted" dir="auto" style="margin-top:6px;text-align:start">' + T('keys') + '</div></div></div>';
  if (VS.url) h += '<div class="card va-evc"><div class="row" style="margin-bottom:6px">' + modeTabs() + '<h3 style="margin:0">' + T('lap') + ' <span id="lapn" class="chip ltr" dir="ltr">1</span></h3><span class="sp small muted" id="evhelp">' + T('evHelp') + '</span><span class="chip" id="evlast"></span><button class="btn sm" id="evundo">' + pt('undo') + '</button></div><div class="va-btns" id="evbtns"></div></div>';
  h += '<div class="card" id="vres"></div><div id="vpro"></div><div id="vlc">' + lapCmpHtml() + '</div></div>';
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
  refreshRes();
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
  $('#vnew').onclick = function () { if (VS.dirty && !confirm(T('unsaved'))) return; VS.id = null; VS.ev = []; VS.snaps = []; VS.meas = []; VS.trk = []; VS.mimg = {}; VS.dirty = false; VS.cfg = Object.assign(defCfg(), { sid: c.sid, date: c.date, ctx: c.ctx, pool: c.pool, dist: c.dist, stroke: c.stroke, start: c.start, slow: c.slow }); K.render(); };
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
  VS.z = VS.z || { s: 1, x: 0, y: 0 };
  var ZM = zoomable([$('#stage')], [$('#zm')], VS.z, function () { if (!VS.tool) play.click(); }); bindZoomUi($('#stage'), ZM);
  vid.addEventListener('loadedmetadata', function () { ZM.apply(); });
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
    var cv = document.createElement('canvas'), o = $('#ov'), z = VS.z || { s: 1, x: 0, y: 0 }, zm = $('#zm'), W = zm.offsetWidth, H = zm.offsetHeight;
    var vx0 = vid.offsetLeft, vy0 = vid.offsetTop, vw = vid.clientWidth, vh = vid.clientHeight, kx = vid.videoWidth / vw, ky = vid.videoHeight / vh;
    var ax = Math.max(0, -z.x / z.s - vx0), ay = Math.max(0, -z.y / z.s - vy0), bx = Math.min(vw, (W - z.x) / z.s - vx0), by = Math.min(vh, (H - z.y) / z.s - vy0);
    var sw = Math.max(1, bx - ax), sh = Math.max(1, by - ay);
    cv.width = Math.round(sw * kx); cv.height = Math.round(sh * ky); var g = cv.getContext('2d'); g.drawImage(vid, ax * kx, ay * ky, sw * kx, sh * ky, 0, 0, cv.width, cv.height);
    if (o && o.width) g.drawImage(o, ax, ay, sw, sh, 0, 0, cv.width, cv.height);
    try { var tw = Math.min(640, cv.width), tc = document.createElement('canvas'); tc.width = tw; tc.height = Math.round(cv.height * tw / cv.width); tc.getContext('2d').drawImage(cv, 0, 0, tc.width, tc.height); VS.snaps = (VS.snaps || []).concat([tc.toDataURL('image/jpeg', 0.75)]).slice(-3); VS.dirty = true; } catch (e) {}
    var a = document.createElement('a'); a.href = cv.toDataURL('image/png'); a.download = (swName(c.sid) || 'nageur').replace(/\s+/g, '_') + '_' + (c.date || K.today()) + '_' + vid.currentTime.toFixed(2) + 's.png'; a.click();
  };
  bindTools(); bindModes(); $('#ov').addEventListener('click', onOvClick); $('#ov').style.pointerEvents = VS.tool ? 'auto' : 'none';
  vid.addEventListener('seeked', drawOv); vid.addEventListener('pause', drawOv);
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
    else if (/^[zZ]$/.test(k)) { if (VS.tool) undoDraw(); else undoEv(); }
    else if (/^[1-9]$/.test(k)) { var mk = (VS.keymap || {})[k]; if (mk) addEv(mk); }
    else if (k === 'Escape' && VS.tool) setTool(VS.tool);
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
function sizeOv() { var v = $('#vid'), o = $('#ov'); if (!v || !o) return; o.width = v.clientWidth; o.height = v.clientHeight; o.style.left = v.offsetLeft + 'px'; o.style.top = v.offsetTop + 'px'; drawOv(); }
function saveVa() {
  var c = VS.cfg; if (!c.sid) { K.toast(T('needSw')); return; }
  if (!VS.ev.length) { K.toast(T('noEv')); return; }
  var r = compute(c, VS.ev), id = VS.id || K.uid();
  var XX = computeX(c, VS.ev), iv0 = ivvOf(c, VS.trk, VS.cal);
  var sum = { idc: XX.arm ? XX.arm.idc : null, ivv: iv0 ? iv0.ivv : null, bt: XX.st.bt, final: r.final, rt: r.rt, t15: r.t15, turn: r.turn, turnSum: r.turnSum, v: r.v, sr: r.sr, dps: r.dps, fin5: r.fin5, vDrop: r.vDrop, srDrop: r.srDrop };
  K.mutate('saveTest', { rec: { id: id, swimmerId: c.sid, type: 'va', date: c.date || K.today(), data: { cfg: JSON.parse(JSON.stringify(c)), ev: VS.ev.map(function (e) { return { k: e.k, t: Math.round(e.t * 10000) / 10000, d: e.d }; }), fname: VS.fname, sum: sum, meas: VS.meas || [], cal: VS.cal || null, trk: VS.trk || [] } } });
  if (VS.snaps && VS.snaps.length) { try { localStorage.setItem('wav_snaps_' + id, JSON.stringify(VS.snaps)); } catch (e) {} }
  if (VS.mimg) { var keep = {}; (VS.meas || []).forEach(function (m) { if (VS.mimg[m.id]) keep[m.id] = VS.mimg[m.id]; }); try { localStorage.setItem('wav_mimg_' + id, JSON.stringify(keep)); } catch (e) {} }
  VS.id = id; VS.dirty = false; K.toast(T('saved')); K.render();
}
function openRec(rec) {
  VS.id = rec.id; VS.cfg = Object.assign(defCfg(), rec.data.cfg || {}, { sid: rec.swimmerId, date: rec.date }); VS.ev = (rec.data.ev || []).map(function (e) { return { k: e.k, t: e.t, d: e.d }; });
  if (VS.fname !== rec.data.fname && VS.url) { try { URL.revokeObjectURL(VS.url); } catch (e) {} VS.url = null; }
  VS.fname = rec.data.fname || ''; VS.snaps = snapsOf(rec.id).slice(); VS.meas = JSON.parse(JSON.stringify(rec.data.meas || [])); VS.cal = rec.data.cal || null; VS.trk = JSON.parse(JSON.stringify(rec.data.trk || [])); VS.mimg = mimgOf(rec.id); VS.dirty = false; VS.tab = 'new'; K.render();
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
  var MS = (src.meas || []).filter(function (m) { return m.ty === 'ang3' || m.ty === 'angH' || m.ty === 'dist'; }), MI = MS.filter(function (m) { return src.mimg && src.mimg[m.id]; }).slice(0, 6);
  return Promise.all([logoImg(), loadImgs(snapsOf(src.id).slice(0, 3)), loadImgs(MI.map(function (m) { return src.mimg[m.id]; }))]).then(function (res) {
    var logo = res[0], snaps = res[1].filter(Boolean), mimgs = res[2];
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
    // ---- analyse avancée
    var XX = computeX(c, evs), kk = src.cal && src.cal.pts ? src.cal.m / Math.hypot(src.cal.pts[1].x - src.cal.pts[0].x, src.cal.pts[1].y - src.cal.pts[0].y) : null;
    var kv = function (items) { var cw2 = (W - 2 * M - 3 * 16) / 4; items.forEach(function (it, i) { var cx = M + (i % 4) * (cw2 + 16), cy = y + Math.floor(i / 4) * 100; rect(cx, cy, cw2, 86, '#f1f6fd', 12); tx(it[0], cx + 16, cy + 30, { s: 17, w: 700, c: '#0b2a6e' }); tx(it[1], rtl ? W - cx - 16 : cx + 16, cy + 70, { s: 28, w: 800, n: 1, raw: 1, a: rtl ? 'right' : 'left' }); }); y += Math.ceil(items.length / 4) * 100 + 14; };
    var tbl = function (head, rows, fr) { var tw2 = W - 2 * M; rect(M, y, tw2, 40, '#0b2a6e', 8); var x0 = 0; head.forEach(function (hh, j) { var w = tw2 * fr[j]; tx(hh, rtl ? W - M - x0 - w / 2 : M + x0 + w / 2, y + 27, { s: 16, w: 700, c: '#fff', raw: 1, a: 'center' }); x0 += w; }); y += 40; rows.forEach(function (rw, i) { if (i % 2) rect(M, y, tw2, 38, '#f5f8fd', 0); var x1 = 0; rw.forEach(function (v, j) { var w = tw2 * fr[j]; tx(String(v), rtl ? W - M - x1 - w / 2 : M + x1 + w / 2, y + 26, { s: 17, w: j ? 500 : 700, n: j ? 1 : 0, raw: 1, a: 'center' }); x1 += w; }); y += 38; }); y += 24; };
    var nn = function (x, d, u) { return f2n(x, d, u); };
    if (XX.st.bt != null || XX.st.ft != null || XX.st.kicks || XX.turns.some(function (t) { return t.cont != null || t.kicks; })) {
      y = title(ptl('stT', lg).replace('🚀 ', ''), y);
      kv([[ptl('bt', lg), nn(XX.st.bt, 2, 's')], [ptl('ft', lg), nn(XX.st.ft, 2, 's')], [ptl('t5', lg), nn(XX.st.t5, 2, 's')], [rt('t15', lg), nn(XX.st.t15, 2, 's')], [ptl('uwk', lg), XX.st.kicks || '—'], [ptl('brkD', lg), nn(XX.st.brkD, 1, 'm')]]);
      if (XX.turns.length) tbl([ptl('turnN', lg), ptl('appr', lg), ptl('cont', lg), ptl('glide', lg), ptl('uwk', lg), ptl('brkD', lg)], XX.turns.map(function (t) { return [t.k, nn(t.appr), nn(t.cont), nn(t.glide), t.kicks || '—', nn(t.brkD, 1)]; }), [0.1, 0.22, 0.17, 0.17, 0.14, 0.2]);
    }
    if (XX.arm) {
      var aa = XX.arm; y = title(ptl('armT', lg).replace('💪 ', ''), y);
      kv([[ptl('cycT', lg), nn(aa.T, 2, 's')], [ptl('idc', lg), nn(aa.idc, 1, '%')], [ptl('sym', lg), nn(aa.sym, 1, '%')], [ptl('kb', lg), aa.kb ? String(Math.round(aa.kb)) : '—']]);
      if (aa.idc != null) { tx('IdC : ' + (aa.idc < -1 ? ptl('idcCU', lg) : aa.idc > 1 ? ptl('idcSP', lg) : ptl('idcOP', lg)), M + 10, y + 4, { s: 19, w: 600, c: '#334155' }); y += 30; }
      var arow = function (sd, o) { return [ptl(sd, lg), nn(o.A, 0, '%'), nn(o.B, 0, '%'), nn(o.C, 0, '%'), nn(o.D, 0, '%'), nn(o.B != null && o.C != null ? o.B + o.C : null, 0, '%')]; };
      tbl(['', ptl('phA', lg), ptl('phB', lg), ptl('phC', lg), ptl('phD', lg), ptl('prop', lg)], [arow('right', aa.R)].concat(aa.L.A != null ? [arow('left', aa.L)] : []), [0.12, 0.2, 0.16, 0.16, 0.16, 0.2]);
    }
    if (XX.br) { y = title(ptl('brT', lg), y); kv(XX.br.perLap.map(function (nb, i) { return [rt('lap', lg) + ' ' + (i + 1), String(nb)]; }).concat([[ptl('brC', lg), nn(XX.br.perCyc, 1)]])); }
    var IV = ivvOf(c, src.trk, src.cal);
    if (IV) {
      y = title(ptl('ivvT', lg).replace('⌖ ', ''), y);
      kv([[ptl('ivv', lg), nn(IV.ivv, 1, '%')], [ptl('vMean', lg), nn(IV.mean, 2, 'm/s')], [ptl('vMin', lg), nn(IV.min, 2, 'm/s')], [ptl('vMax', lg), nn(IV.max, 2, 'm/s')]]);
      var gx2 = M + 50, gw2 = W - 2 * M - 70, gh2 = 160, lo2 = IV.min * 0.95, hi2 = IV.max * 1.05, t00 = IV.pts[0].t, t11 = IV.pts[IV.pts.length - 1].t;
      g.strokeStyle = '#e2e8f0'; g.lineWidth = 1; for (var q2 = 0; q2 <= 2; q2++) { var yy2 = y + gh2 * q2 / 2; g.beginPath(); g.moveTo(gx2, yy2); g.lineTo(gx2 + gw2, yy2); g.stroke(); tx((hi2 - (hi2 - lo2) * q2 / 2).toFixed(2), gx2 - 8, yy2 + 5, { s: 13, n: 1, raw: 1, a: 'right', c: '#65a30d' }); }
      g.save(); g.strokeStyle = '#65a30d'; g.lineWidth = 3; g.beginPath(); IV.pts.forEach(function (pp, i) { var px = gx2 + gw2 * (pp.t - t00) / ((t11 - t00) || 1), py = y + gh2 * (1 - (pp.v - lo2) / ((hi2 - lo2) || 1)); if (i) g.lineTo(px, py); else g.moveTo(px, py); }); g.stroke(); g.restore();
      y += gh2 + 20; y += wrap(ptl('ivvNote', lg), M + 10, y + 16, W - 2 * M - 20, { s: 16, c: '#64748b', lh: 26 }) + 20;
    }
    if (MS.length) {
      y = title(ptl('meas', lg).replace('📐 ', ''), y); var RR = refs();
      tbl([ptl('mT', lg), ptl('mName', lg), ptl('mVal', lg), ptl('mRef', lg), ''], MS.map(function (m) { var v = mVal(m, kk), r0 = RR[m.name], stt = m.ty === 'dist' || !r0 || v == null ? '' : (v >= r0[0] && v <= r0[1] ? '✓' : '⚠'); return [(m.t / (+c.slow || 1)).toFixed(2), m.name || '', mTxt(m, kk), r0 && m.ty !== 'dist' ? r0[0] + '–' + r0[1] + '°' : '—', stt]; }), [0.12, 0.42, 0.16, 0.18, 0.12]);
      var okI = mimgs.map(function (im, i) { return im ? [im, MI[i]] : null; }).filter(Boolean);
      if (okI.length) { var sl = (W - 2 * M - 2 * 16) / 3, rowH = 0; okI.forEach(function (pr2, i) { var im = pr2[0], sc = sl / im.width, hh2 = im.height * sc, col = i % 3; if (col === 0 && i) { y += rowH + 44; rowH = 0; } rowH = Math.max(rowH, hh2); var xx = rtl ? W - M - (col + 1) * sl - col * 16 : M + col * (sl + 16); g.drawImage(im, xx, y, sl, hh2); g.strokeStyle = '#cbd5e1'; g.lineWidth = 2; g.strokeRect(xx, y, sl, hh2); tx((pr2[1].name || '') + ' · ' + mTxt(pr2[1], kk), rtl ? xx + sl : xx, y + hh2 + 26, { s: 16, w: 600, raw: 1, a: rtl ? 'right' : 'left', c: '#334155' }); }); y += rowH + 54; }
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
function curSrc() { return { id: VS.id, sid: VS.cfg.sid, date: VS.cfg.date || K.today(), cfg: VS.cfg, ev: VS.ev, meas: VS.meas || [], cal: VS.cal, trk: VS.trk || [], mimg: VS.mimg || {} }; }
function recSrc(rec) { return { id: rec.id, sid: rec.swimmerId, date: rec.date, cfg: Object.assign(defCfg(), rec.data.cfg || {}), ev: (rec.data.ev || []).map(function (e) { return { k: e.k, t: e.t, d: e.d }; }), meas: rec.data.meas || [], cal: rec.data.cal || null, trk: rec.data.trk || [], mimg: mimgOf(rec.id) }; }


/* ================= analyse avancée : modes d'événements, mesures, cycle, IVV ================= */
var PD = {
  m_race: ['🏁 السباق', '🏁 Course'], m_st: ['🚀 الانطلاق والدوران', '🚀 Départ & virages'], m_arm: ['💪 الذراعين', '💪 Bras'], m_bk: ['🫁 تنفس ورجلين', '🫁 Respiration & jambes'],
  evHE: ['دخول الماء', 'Entrée dans l’eau'], evDK: ['ضربة دولفين', 'Ondulation'], evTO: ['يفارق الحائط', 'Quitte le mur'], evBR: ['تنفس', 'Respiration'], evK: ['ضربة رجل', 'Battement'],
  evRE: ['يمين: دخول', 'D : entrée'], evRP: ['يمين: بداية الشد', 'D : début traction'], evRS: ['يمين: تحت الكتف', 'D : sous l’épaule'], evRX: ['يمين: خروج', 'D : sortie'],
  evLE: ['يسار: دخول', 'G : entrée'], evLP: ['يسار: بداية الشد', 'G : début traction'], evLS: ['يسار: تحت الكتف', 'G : sous l’épaule'], evLX: ['يسار: خروج', 'G : sortie'],
  h_race: ['اضغط كي يقطع الراس العلامة.', 'Cliquer quand la tête franchit le repère.'],
  h_st: ['الانطلاق: الإشارة ← يفارق المكعب ← دخول الماء (اليدين) ← كل ضربة دولفين ← الطلوع. الدوران: الحائط (اللمس) ← يفارق الحائط ← ضربات الدولفين ← الطلوع.', 'Départ : signal → décollage → entrée (mains) → chaque ondulation → sortie. Virage : mur (contact) → quitte le mur → ondulations → sortie.'],
  h_arm: ['فيديو من الجنب تحت الماء. لكل يد 4 لحظات: <b>الدخول</b> ← <b>بداية الشد</b> (اليد تبدا ترجع للور) ← <b>تحت الكتف</b> ← <b>الخروج</b>. علّم دورتين على الأقل.', 'Vue latérale sous l’eau. Pour chaque bras : <b>entrée</b> → <b>début traction</b> (la main recule) → <b>sous l’épaule</b> → <b>sortie</b>. Au moins deux cycles.'],
  h_bk: ['اضغط «تنفس» كي يطلع الراس يتنفس، و«ضربة رجل» في كل ضربة (رجل وحدة).', '« Respiration » à chaque inspiration, « Battement » à chaque battement (une jambe).'],
  tools: ['أدوات القياس والرسم', 'Outils de mesure et de dessin'], t_ang3: ['📐 زاوية', '📐 Angle'], t_angH: ['∠ مع الأفق', '∠ / horizontale'], t_dist: ['📏 مسافة', '📏 Distance'], t_cal: ['⚖ معايرة', '⚖ Étalonner'], t_line: ['／ خط', '／ Ligne'], t_arrow: ['➚ سهم', '➚ Flèche'], t_circle: ['◯ دائرة', '◯ Cercle'], t_text: ['T نص', 'T Texte'], t_trk: ['⌖ تتبع', '⌖ Suivi'], t_guide: ['📷 دليل التصوير', '📷 Guide de tournage'],
  th_ang3: ['اضغط 3 نقاط: طرف ← المفصل ← الطرف الآخر', '3 points : extrémité → articulation → extrémité'], th_angH: ['اضغط نقطتين على الخط (الزاوية مع الأفق)', '2 points sur le segment (angle avec l’horizontale)'], th_dist: ['اضغط نقطتين (لازم المعايرة قبل)', '2 points (étalonnage nécessaire)'], th_cal: ['اضغط على زوج نقاط مسافتهم معروفة (مثلاً علامتين في الحبل)، ومن بعد اكتب المسافة بالمتر', '2 points de distance connue (ex. deux repères), puis la distance en m'], th_line: ['نقطتين: خط مرجعي (أفقي ولا عمودي يتعدّل وحدو)', '2 points : ligne de référence'], th_arrow: ['نقطتين: من ← إلى', '2 points : de → vers'], th_circle: ['المركز ← الحافة', 'centre → bord'], th_text: ['اضغط وين تحب الكتابة', 'Cliquer à l’emplacement du texte'], th_trk: ['اضغط على الحوض (ولا الراس) في كل صورة، والفيديو يتقدم وحدو', 'Cliquer sur la hanche (ou la tête) à chaque image ; la vidéo avance seule'],
  calM: ['المسافة بالمتر بين النقطتين؟', 'Distance en mètres entre les deux points ?'], txtQ: ['النص؟', 'Texte ?'], needCal: ['دير المعايرة الأول (⚖)', 'Étalonnez d’abord (⚖)'], calOk: ['المعايرة تسجّلت', 'Étalonnage enregistré'],
  meas: ['📐 القياسات', '📐 Mesures'], mName: ['الإسم', 'Nom'], mVal: ['القيمة', 'Valeur'], mRef: ['المرجع', 'Réf.'], mT: ['الوقت', 'Temps'], noMeas: ['ما كاين حتى قياس. اختار أداة فوق الفيديو.', 'Aucune mesure. Choisissez un outil au-dessus de la vidéo.'],
  mOver: ['تتبع في الزمن', 'Évolution dans le temps'], mPrev: ['المرة اللي فاتت', 'Fois précédente'], refNote: ['المراجع تقريبية، تقدر تبدّلها (تتحفظ في هذا الجهاز).', 'Références indicatives, modifiables (enregistrées sur cet appareil).'],
  stT: ['🚀 الانطلاق والدوران بالتفصيل', '🚀 Départ et virages en détail'], bt: ['زمن البلوك', 'Temps de bloc'], ft: ['زمن الطيران', 'Temps de vol'], t5: ['زمن 5 م', 'Temps 5 m'], uwk: ['ضربات تحت الماء', 'Ondulations'], brkD: ['مسافة الطلوع', 'Distance de coulée'],
  appr: ['الاقتراب (5 م ← الحائط)', 'Approche (5 m → mur)'], cont: ['اللمس في الحائط', 'Contact au mur'], glide: ['الدفعة ← 5 م', 'Poussée → 5 m'], start: ['الانطلاق', 'Départ'], turnN: ['الدوران', 'Virage'],
  armT: ['💪 دورة الذراعين', '💪 Cycle de bras'], phA: ['الدخول والمسك', 'Entrée & prise'], phB: ['الشد', 'Traction'], phC: ['الدفع', 'Poussée'], phD: ['الرجوع', 'Retour'], right: ['يمين', 'Droit'], left: ['يسار', 'Gauche'], prop: ['الدفع الفعّال', 'Propulsion'],
  idc: ['مؤشر التنسيق IdC', 'Indice de coordination IdC'], idcCU: ['«يستناو بعضاهم» (catch-up)', 'rattrapé (catch-up)'], idcOP: ['«متقابلين» (opposition)', 'opposition'], idcSP: ['«متراكبين» (superposition)', 'superposition'],
  sym: ['التناظر يمين/يسار', 'Symétrie D/G'], cycT: ['مدة الدورة', 'Durée du cycle'], nCyc: ['الدورات المعلّمة', 'Cycles repérés'],
  brT: ['التنفس', 'Respiration'], brL: ['تنفس في كل طول', 'Respirations par longueur'], brC: ['دورات بين كل تنفس', 'Cycles par respiration'], kb: ['إيقاع الرجلين', 'Battements par cycle'],
  ivvT: ['⌖ تذبذب السرعة داخل الدورة (IVV)', '⌖ Variation intra-cycle de vitesse (IVV)'], ivv: ['IVV', 'IVV'], vMean: ['السرعة المتوسطة', 'Vitesse moyenne'], vMin: ['أدنى', 'Min'], vMax: ['أقصى', 'Max'], nPts: ['نقاط', 'points'],
  ivvNote: ['IVV = التذبذب في السرعة داخل الدورة. السباحين الكبار قرابة 7%، المبتدئين قرابة 10%. كل ما يكون أقل، السباحة أنعم وأقل تعب. يحتاج كاميرا ثابتة من الجنب ومعايرة.', 'IVV = fluctuation de la vitesse dans le cycle. ≈7 % chez les élites, ≈10 % chez les débutants. Plus bas = nage plus fluide. Caméra latérale fixe + étalonnage.'],
  trkStep: ['التقدم بعد كل نقطة', 'Avance après chaque point'], trkClr: ['مسح التتبع', 'Effacer le suivi'], img: ['صورة', 'image'], imgs: ['صور', 'images'],
  undo: ['↶ تراجع', '↶ Annuler'], last: ['آخر حدث', 'Dernier'], undoM: ['↶ تراجع على آخر رسم', '↶ Annuler le dernier dessin'], clrF: ['🗑 مسح رسومات هذي الصورة', '🗑 Effacer les dessins de cette image'], none: ['—', '—'], undone: ['تراجعت', 'Annulé'],
  ok: ['✓', '✓'], out: ['⚠ خارج المرجع', '⚠ hors réf.'], del: ['حذف', 'Suppr.']
};
function pt(k, o) { var v = PD[k]; var s = v ? (L() === 'fr' ? v[1] : v[0]) : k; if (o) Object.keys(o).forEach(function (x) { s = s.split('{' + x + '}').join(o[x]); }); return s; }
function ptl(k, lg) { var v = PD[k]; return v ? (lg === 'fr' ? v[1] : v[0]) : k; }
['HE', 'DK', 'TO', 'BR', 'K', 'RE', 'RP', 'RS', 'RX', 'LE', 'LP', 'LS', 'LX'].forEach(function (k) { K.D['ev' + k] = PD['ev' + k]; });

/* --- mesures : préréglages et références (modifiables, par appareil) --- */
var MPRE = [
  { n: ['المرفق في الشد (حرة)', 'Coude en traction (crawl)'], ty: 'ang3', lo: 90, hi: 120 },
  { n: ['الركبة الأمامية فوق المكعب', 'Genou avant sur le plot'], ty: 'ang3', lo: 125, hi: 145 },
  { n: ['الركبة في الدفع من الحائط', 'Genou à la poussée du mur'], ty: 'ang3', lo: 100, hi: 120 },
  { n: ['زاوية دخول الجسم (الانطلاق)', 'Angle d’entrée du corps (départ)'], ty: 'angH', lo: 30, hi: 45 },
  { n: ['ميلان الجسم في السباحة', 'Inclinaison du corps en nage'], ty: 'angH', lo: 0, hi: 8 },
  { n: ['زاوية دخول اليد', 'Angle d’entrée de la main'], ty: 'angH' },
  { n: ['مسافة الطيران', 'Distance de vol'], ty: 'dist' },
  { n: ['عمق الغطس', 'Profondeur après l’entrée'], ty: 'dist' },
  { n: ['عمق اليد في الشد', 'Profondeur de la main'], ty: 'dist' }
];
function refs() { var o = {}; MPRE.forEach(function (p) { if (p.lo != null) o[p.n[0]] = o[p.n[1]] = [p.lo, p.hi]; }); try { Object.assign(o, JSON.parse(localStorage.getItem('wav_refs') || '{}')); } catch (e) {} return o; }
function setRef(name, lo, hi) { var o = {}; try { o = JSON.parse(localStorage.getItem('wav_refs') || '{}'); } catch (e) {} o[name] = [lo, hi]; try { localStorage.setItem('wav_refs', JSON.stringify(o)); } catch (e) {} }
function mPx() { var c = VS.cal; if (!c || !c.pts || c.pts.length < 2 || !c.m) return null; var d = Math.hypot(c.pts[1].x - c.pts[0].x, c.pts[1].y - c.pts[0].y); return d ? c.m / d : null; }
function angOf(m) {
  var P = m.pts;
  if (m.ty === 'ang3' && P.length === 3) { var a = Math.atan2(P[0].y - P[1].y, P[0].x - P[1].x), b = Math.atan2(P[2].y - P[1].y, P[2].x - P[1].x), d = Math.abs(a - b) * 180 / Math.PI; return d > 180 ? 360 - d : d; }
  if (m.ty === 'angH' && P.length === 2) { var dx = Math.abs(P[1].x - P[0].x), dy = Math.abs(P[1].y - P[0].y); return Math.atan2(dy, dx) * 180 / Math.PI; }
  return null;
}
function mVal(m, k) { if (m.ty === 'ang3' || m.ty === 'angH') return angOf(m); if (m.ty === 'dist' && m.pts.length === 2) { k = k || mPx(); return k ? Math.hypot(m.pts[1].x - m.pts[0].x, m.pts[1].y - m.pts[0].y) * k : null; } return null; }
function mTxt(m, k) { var v = mVal(m, k); if (v == null) return m.ty === 'dist' ? '? m' : ''; return m.ty === 'dist' ? v.toFixed(2) + ' m' : Math.round(v) + '°'; }
function mStatus(m, v) { var r = refs()[m.name]; if (!r || v == null || m.ty === 'dist') return null; return v >= r[0] && v <= r[1] ? 'ok' : 'out'; }

/* --- outils sur la vidéo --- */
var NEED = { ang3: 3, angH: 2, dist: 2, cal: 2, line: 2, arrow: 2, circle: 2, text: 1 };
function toolBar() {
  return '<div class="va-tools" id="tools">' + ['ang3', 'angH', 'dist', 'cal', 'line', 'arrow', 'circle', 'text', 'trk'].map(function (k) { return '<button class="btn sm' + (VS.tool === k ? ' pri' : '') + '" data-tool="' + k + '">' + pt('t_' + k) + '</button>'; }).join('') +
    '<button class="btn sm" id="mundo">' + pt('undoM') + '</button><button class="btn sm" id="mclr">' + pt('clrF') + '</button><button class="btn sm" id="guideb">' + pt('t_guide') + '</button>' + (VS.tool ? '<span class="small va-th">' + pt('th_' + VS.tool) + '</span>' : '') +
    (VS.tool === 'trk' ? '<label class="small" style="margin:0">' + pt('trkStep') + '</label><select id="trkst" style="width:auto;min-height:30px">' + [1, 2, 3, 5].map(function (n) { return '<option' + (VS.trkStep === n ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select><button class="btn sm dan" id="trkclr">' + pt('trkClr') + '</button>' : '') + '</div>';
}
function setTool(k) { VS.tool = VS.tool === k ? null : k; VS.pts = []; var o = $('#ov'); if (o) o.style.pointerEvents = VS.tool ? 'auto' : 'none'; var tb = $('#tools'); if (tb) { tb.outerHTML = toolBar(); bindTools(); } if (VS.tool) { var v = $('#vid'); if (v) v.pause(); } drawOv(); }
function bindTools() {
  $$('[data-tool]').forEach(function (b) { b.onclick = function () { setTool(b.dataset.tool); }; });
  if ($('#guideb')) $('#guideb').onclick = openGuide;
  if ($('#mundo')) $('#mundo').onclick = undoDraw;
  if ($('#mclr')) $('#mclr').onclick = function () { var v = $('#vid'); if (!v) return; var tol = 0.5 / (VS.fps || 30) + 0.004, n0 = (VS.meas || []).length; VS.meas = (VS.meas || []).filter(function (m) { return Math.abs(m.t - v.currentTime) > tol; }); VS.pts = []; if (VS.meas.length !== n0) { VS.dirty = true; K.toast(pt('undone')); } drawOv(); refreshRes(); };
  if ($('#trkst')) $('#trkst').onchange = function () { VS.trkStep = +this.value; };
  if ($('#trkclr')) $('#trkclr').onclick = function () { if (confirm(T('confirmDel'))) { VS.trk = []; VS.dirty = true; refresh(); } };
}
function undoDraw() {
  if (VS.pts && VS.pts.length) { VS.pts.pop(); }
  else if (VS.tool === 'trk' && VS.trk && VS.trk.length) { VS.trk.pop(); VS.dirty = true; }
  else if (VS.meas && VS.meas.length) { var m = VS.meas.pop(); if (VS.mimg) delete VS.mimg[m.id]; VS.dirty = true; var v = $('#vid'); if (v && Math.abs(v.currentTime - m.t) > 0.02) seekV(v, m.t); }
  else if (VS.cal) { VS.cal = null; VS.dirty = true; }
  else return;
  K.toast(pt('undone')); drawOv(); refreshRes();
}
function undoEv() { if (!VS.ev.length) return; var e = VS.ev.pop(); VS.dirty = true; var v = $('#vid'); if (v) { v.pause(); seekV(v, e.t); } K.toast(pt('undone') + ' : ' + evLabel(e)); refresh(); }
function vidPt(e) { var v = $('#vid'), r = v.getBoundingClientRect(); return { x: Math.round((e.clientX - r.left) / r.width * v.videoWidth * 10) / 10, y: Math.round((e.clientY - r.top) / r.height * v.videoHeight * 10) / 10 }; }
function onOvClick(e) {
  if (!VS.tool) return; e.stopPropagation(); var v = $('#vid'), p = vidPt(e);
  if (VS.tool === 'trk') {
    if (!mPx()) { K.toast(pt('needCal')); return; }
    var t = v.currentTime, f = 1 / (VS.fps || 30); VS.trk = (VS.trk || []).filter(function (q) { return Math.abs(q.t - t) > f / 2; }); VS.trk.push({ t: Math.round(t * 10000) / 10000, x: p.x, y: p.y }); VS.trk.sort(function (a, b) { return a.t - b.t; }); VS.dirty = true;
    refreshRes(); step(VS.trkStep || 1); return;
  }
  VS.pts.push(p); drawOv();
  if (VS.pts.length < NEED[VS.tool]) return;
  var pts = VS.pts.slice(); VS.pts = [];
  if (VS.tool === 'cal') { var m = parseFloat(String(prompt(pt('calM'), '5') || '').replace(',', '.')); if (m > 0) { VS.cal = { pts: pts, m: m }; VS.dirty = true; K.toast(pt('calOk')); } drawOv(); refreshRes(); return; }
  var mm = { id: K.uid(), t: Math.round(v.currentTime * 10000) / 10000, ty: VS.tool, pts: pts, col: VS.tool === 'arrow' || VS.tool === 'circle' || VS.tool === 'text' || VS.tool === 'line' ? '#ff4d6d' : '#ffe14d' };
  if (VS.tool === 'text') { var tx = prompt(pt('txtQ'), ''); if (!tx) { drawOv(); return; } mm.txt = tx; }
  if (VS.tool === 'line') { var dx = Math.abs(pts[1].x - pts[0].x), dy = Math.abs(pts[1].y - pts[0].y); if (dy < dx * 0.08) pts[1].y = pts[0].y; else if (dx < dy * 0.08) pts[1].x = pts[0].x; }
  if (VS.tool === 'ang3' || VS.tool === 'angH' || VS.tool === 'dist') { var same = MPRE.filter(function (q) { return q.ty === VS.tool; }); var last = (VS.meas || []).filter(function (q) { return q.ty === VS.tool; }).pop(); mm.name = last ? last.name : (same[0] ? tv(same[0].n) : pt('t_' + VS.tool)); }
  VS.meas = (VS.meas || []).concat([mm]); VS.dirty = true; drawOv(); thumbFor(mm); refreshRes();
}
function thumbFor(m) {
  setTimeout(function () { try { var v = $('#vid'), o = $('#ov'), tw = 480, cv = document.createElement('canvas'); cv.width = tw; cv.height = Math.round(v.videoHeight * tw / v.videoWidth); var g = cv.getContext('2d'); g.drawImage(v, 0, 0, cv.width, cv.height); g.drawImage(o, 0, 0, cv.width, cv.height); VS.mimg = VS.mimg || {}; VS.mimg[m.id] = cv.toDataURL('image/jpeg', 0.7); } catch (e) {} }, 30);
}
function drawShape(g, m, k, sc, ghost) {
  var P = m.pts.map(function (p) { return { x: p.x * k, y: p.y * k }; }), col = ghost ? 'rgba(255,255,255,.7)' : (m.col || '#ffe14d');
  g.save(); g.strokeStyle = col; g.fillStyle = col; g.lineWidth = 3 * sc; g.lineCap = 'round';
  var lbl = function (s, x, y) { g.font = 'bold ' + Math.round(20 * sc) + 'px sans-serif'; g.lineWidth = 4 * sc; g.strokeStyle = '#000'; g.strokeText(s, x, y); g.fillText(s, x, y); };
  if (m.ty === 'circle' && P.length === 2) { g.beginPath(); g.arc(P[0].x, P[0].y, Math.hypot(P[1].x - P[0].x, P[1].y - P[0].y), 0, 7); g.stroke(); }
  else if (m.ty === 'text' && P.length) lbl(m.txt || '', P[0].x, P[0].y);
  else {
    g.beginPath(); P.forEach(function (p, i) { if (i) g.lineTo(p.x, p.y); else g.moveTo(p.x, p.y); }); g.stroke();
    if (m.ty === 'arrow' && P.length === 2) { var a = Math.atan2(P[1].y - P[0].y, P[1].x - P[0].x), h = 16 * sc; g.beginPath(); g.moveTo(P[1].x, P[1].y); g.lineTo(P[1].x - h * Math.cos(a - 0.45), P[1].y - h * Math.sin(a - 0.45)); g.lineTo(P[1].x - h * Math.cos(a + 0.45), P[1].y - h * Math.sin(a + 0.45)); g.closePath(); g.fill(); }
    if (m.ty === 'angH' && P.length === 2) { g.setLineDash([6 * sc, 6 * sc]); g.beginPath(); g.moveTo(P[0].x - 60 * sc, P[0].y); g.lineTo(P[0].x + 80 * sc, P[0].y); g.stroke(); g.setLineDash([]); }
    if (m.ty !== 'arrow' && m.ty !== 'line') P.forEach(function (p) { g.beginPath(); g.arc(p.x, p.y, 5 * sc, 0, 7); g.fill(); });
    var s = m.ty === 'cal' ? (m.m + ' m') : mTxt(m); if (s && P.length >= NEED[m.ty]) { var q = m.ty === 'ang3' ? P[1] : { x: (P[0].x + P[1].x) / 2, y: (P[0].y + P[1].y) / 2 }; g.fillStyle = col; lbl(s + (m.name && !ghost ? '  ' + m.name : ''), q.x + 10 * sc, q.y - 10 * sc); }
  }
  g.restore();
}
function drawOv() {
  var o = $('#ov'), v = $('#vid'); if (!o || !v || !v.videoWidth) return; var g = o.getContext('2d'); g.clearRect(0, 0, o.width, o.height);
  var k = o.width / v.videoWidth, t = v.currentTime, tol = 0.5 / (VS.fps || 30) + 0.004;
  if (VS.cal && (VS.tool === 'cal' || VS.tool === 'dist' || VS.tool === 'trk')) drawShape(g, { ty: 'cal', pts: VS.cal.pts, m: VS.cal.m, col: '#22d3ee' }, k, 1);
  (VS.meas || []).forEach(function (m) { if (Math.abs(m.t - t) <= tol) drawShape(g, m, k, 1); });
  if (VS.trk && VS.trk.length && (VS.tool === 'trk' || VS.trk.some(function (q) { return Math.abs(q.t - t) <= tol; }))) {
    g.save(); g.strokeStyle = 'rgba(163,230,53,.9)'; g.fillStyle = '#a3e635'; g.lineWidth = 2; g.beginPath(); VS.trk.forEach(function (q, i) { if (i) g.lineTo(q.x * k, q.y * k); else g.moveTo(q.x * k, q.y * k); }); g.stroke();
    VS.trk.forEach(function (q) { g.beginPath(); g.arc(q.x * k, q.y * k, Math.abs(q.t - t) <= tol ? 6 : 3, 0, 7); g.fill(); }); g.restore();
  }
  if (VS.pts && VS.pts.length) drawShape(g, { ty: VS.tool === 'cal' ? 'line' : VS.tool, pts: VS.pts, col: '#ffffff' }, k, 1, true);
}

/* --- calculs : départ/virages détaillés, cycle de bras, respiration, IVV --- */
function computeX(c, evs) {
  var f = +c.slow || 1, ev = evs.slice().sort(function (a, b) { return a.t - b.t; }), r = compute(c, evs), P = +c.pool;
  var g = function (k, lap) { return ev.filter(function (e) { return e.k === k && (lap == null || e.lap === lap); }); };
  var sig = g('S')[0], o = g('O')[0], he = g('HE')[0], walls = ev.filter(function (e) { return e.k === 'W' || e.k === 'F'; });
  var m = function (lap, d) { var x = ev.find(function (e) { return e.k === 'M' && e.lap === lap && e.d === d; }); return x ? x.t : null; };
  var st = { bt: sig && o ? (o.t - sig.t) / f : null, ft: o && he ? (he.t - o.t) / f : null, t5: sig && m(1, 5) != null ? (m(1, 5) - sig.t) / f : null, t15: r.t15, brkD: r.laps[0] ? r.laps[0].brkD : null };
  var b1 = g('B', 1)[0]; st.kicks = g('DK', 1).filter(function (e) { return (!he || e.t > he.t) && (!b1 || e.t < b1.t); }).length || null;
  var turns = [];
  for (var i = 1; i < r.n; i++) {
    var W = walls[i - 1]; if (!W) continue; var to = ev.find(function (e) { return e.k === 'TO' && e.t >= W.t && e.lap === i + 1; }), bb = g('B', i + 1)[0];
    turns.push({ k: i, appr: m(i, P - 5) != null ? (W.t - m(i, P - 5)) / f : null, cont: to ? (to.t - W.t) / f : null, glide: to && m(i + 1, 5) != null ? (m(i + 1, 5) - to.t) / f : null, kicks: g('DK', i + 1).filter(function (e) { return e.t > (to ? to.t : W.t) && (!bb || e.t < bb.t); }).length || null, brkD: r.laps[i] ? r.laps[i].brkD : null });
  }
  // cycle de bras
  var A = {}; ['RE', 'RP', 'RS', 'RX', 'LE', 'LP', 'LS', 'LX'].forEach(function (k) { A[k] = g(k).map(function (e) { return e.t; }); });
  var nx = function (arr, t, t2) { for (var j = 0; j < arr.length; j++) if (arr[j] >= t && (t2 == null || arr[j] < t2)) return arr[j]; return null; };
  var near = function (arr, t, w) { var best = null; arr.forEach(function (x) { if (Math.abs(x - t) <= w && (best == null || Math.abs(x - t) < Math.abs(best - t))) best = x; }); return best; };
  var cyc = [];
  for (var j = 0; j + 1 < A.RE.length; j++) {
    var t0 = A.RE[j], t1 = A.RE[j + 1], T = (t1 - t0) / f; if (T <= 0 || T > 4) continue;
    var rp = nx(A.RP, t0, t1), rs = nx(A.RS, t0, t1), rx = nx(A.RX, t0, t1); if (rp == null || rs == null || rx == null) continue;
    var le = near(A.LE, (t0 + t1) / 2, T * f * 0.75), lp = le != null ? nx(A.LP, le, le + T * f) : null, ls = lp != null ? nx(A.LS, lp, lp + T * f) : null, lx = ls != null ? nx(A.LX, ls, ls + T * f) : null, le2 = le != null ? nx(A.LE, le + 0.01, null) : null;
    var R = { A: (rp - t0) / f, B: (rs - rp) / f, C: (rx - rs) / f, D: (t1 - rx) / f }, Lh = le != null && lp != null && ls != null && lx != null && le2 != null ? { A: (lp - le) / f, B: (ls - lp) / f, C: (lx - ls) / f, D: (le2 - lx) / f } : null;
    var rp2 = nx(A.RP, t1, null), lag1 = lp != null ? (lp - rx) / f : null, lag2 = lx != null && rp2 != null ? (rp2 - lx) / f : null, lags = [lag1, lag2].filter(function (x) { return x != null; });
    cyc.push({ T: T, R: R, L: Lh, idc: lags.length ? -lags.reduce(function (a, b) { return a + b; }, 0) / lags.length / T * 100 : null, br: g('BR').filter(function (e) { return e.t >= t0 && e.t < t1; }).length, kk: g('K').filter(function (e) { return e.t >= t0 && e.t < t1; }).length });
  }
  var avg = function (a) { a = a.filter(function (x) { return x != null && isFinite(x); }); return a.length ? a.reduce(function (p, q) { return p + q; }, 0) / a.length : null; };
  var arm = null;
  if (cyc.length) {
    var ph = function (side, k) { return avg(cyc.map(function (c2) { return c2[side] ? c2[side][k] / c2.T * 100 : null; })); };
    arm = { n: cyc.length, T: avg(cyc.map(function (x) { return x.T; })), R: { A: ph('R', 'A'), B: ph('R', 'B'), C: ph('R', 'C'), D: ph('R', 'D') }, L: { A: ph('L', 'A'), B: ph('L', 'B'), C: ph('L', 'C'), D: ph('L', 'D') }, idc: avg(cyc.map(function (x) { return x.idc; })), kb: avg(cyc.map(function (x) { return x.kk || null; })) };
    var pr = arm.R.B != null && arm.R.C != null ? arm.R.B + arm.R.C : null, pl = arm.L.B != null && arm.L.C != null ? arm.L.B + arm.L.C : null;
    arm.propR = pr; arm.propL = pl; arm.sym = pr != null && pl != null ? (pr - pl) / ((pr + pl) / 2) * 100 : null;
  }
  // respiration
  var brL = []; for (var l = 1; l <= r.n; l++) brL.push(g('BR', l).length);
  var br = g('BR').length ? { perLap: brL, perCyc: cyc.length ? cyc.length / Math.max(1, cyc.reduce(function (a, b) { return a + b.br; }, 0)) : null } : null;
  if (br && !cyc.length && r.sr) { var cl = r.laps.map(function (lp, i) { return lp.split && lp.sr && brL[i] ? lp.split * lp.sr / 60 / brL[i] : null; }); br.perCyc = avg(cl); }
  return { r: r, st: st, turns: turns, arm: arm, br: br };
}
function ivvOf(c, trk, cal) {
  if (!trk || trk.length < 6 || !cal || !cal.pts || !cal.m) return null;
  var f = +c.slow || 1, dx = cal.pts[1].x - cal.pts[0].x, dy = cal.pts[1].y - cal.pts[0].y, L0 = Math.hypot(dx, dy), u = { x: dx / L0, y: dy / L0 }, k = cal.m / L0;
  var s = trk.map(function (q) { return { t: q.t / f, s: (q.x * u.x + q.y * u.y) * k }; }), v = [];
  for (var i = 1; i < s.length - 1; i++) { var dt = s[i + 1].t - s[i - 1].t; if (dt > 0) v.push({ t: s[i].t, v: Math.abs((s[i + 1].s - s[i - 1].s) / dt) }); }
  var sm = v.map(function (x, i) { var a = v.slice(Math.max(0, i - 1), i + 2); return { t: x.t, v: a.reduce(function (p, q) { return p + q.v; }, 0) / a.length }; });
  if (sm.length < 4) return null;
  var mean = sm.reduce(function (p, q) { return p + q.v; }, 0) / sm.length, sd = Math.sqrt(sm.reduce(function (p, q) { return p + (q.v - mean) * (q.v - mean); }, 0) / (sm.length - 1));
  return { mean: mean, ivv: sd / mean * 100, min: Math.min.apply(null, sm.map(function (x) { return x.v; })), max: Math.max.apply(null, sm.map(function (x) { return x.v; })), pts: sm, n: trk.length };
}

/* --- affichage dans l'écran d'analyse --- */
function f2n(x, d, u) { if (x == null || !isFinite(x)) return '—'; var dd = d == null ? 2 : d; if (Math.abs(x) < 0.5 * Math.pow(10, -dd)) x = 0; return (+x).toFixed(dd) + (u ? ' ' + u : ''); }
function idcLbl(x) { return x == null ? '' : x < -1 ? pt('idcCU') : x > 1 ? pt('idcSP') : pt('idcOP'); }
function proHtml() {
  var c = VS.cfg, X = computeX(c, VS.ev), h = '';
  // départ / virages
  if (X.st.bt != null || X.st.ft != null || X.st.kicks || X.turns.some(function (t) { return t.cont != null || t.kicks; })) {
    h += '<div class="card"><h3>' + pt('stT') + '</h3><div class="va-kpis">' + kpi(pt('bt'), f2n(X.st.bt), 's') + kpi(pt('ft'), f2n(X.st.ft), 's') + kpi(pt('t5'), f2n(X.st.t5), 's') + kpi(T('t15'), f2n(X.st.t15), 's') + kpi(pt('uwk'), X.st.kicks || '—', '') + kpi(pt('brkD'), f2n(X.st.brkD, 1), 'm') + '</div>';
    if (X.turns.length) h += '<div class="tbl-wrap"><table><tr><th>' + pt('turnN') + '</th><th>' + pt('appr') + '</th><th>' + pt('cont') + '</th><th>' + pt('glide') + '</th><th>' + pt('uwk') + '</th><th>' + pt('brkD') + '</th></tr>' + X.turns.map(function (t) { return '<tr><td><b>' + t.k + '</b></td><td class="num">' + f2n(t.appr) + '</td><td class="num">' + f2n(t.cont) + '</td><td class="num">' + f2n(t.glide) + '</td><td class="num">' + (t.kicks || '—') + '</td><td class="num">' + f2n(t.brkD, 1) + '</td></tr>'; }).join('') + '</table></div>';
    h += '</div>';
  }
  // bras
  if (X.arm) {
    var a = X.arm, row = function (s, o) { return '<tr><td style="text-align:start"><b>' + pt(s) + '</b></td>' + ['A', 'B', 'C', 'D'].map(function (k) { return '<td class="num">' + f2n(o[k], 0, '%') + '</td>'; }).join('') + '<td class="num"><b>' + f2n(o.B != null && o.C != null ? o.B + o.C : null, 0, '%') + '</b></td></tr>'; };
    h += '<div class="card"><h3>' + pt('armT') + '</h3><div class="va-kpis">' + kpi(pt('cycT'), f2n(a.T), 's') + kpi(pt('idc'), f2n(a.idc, 1, '%'), '') + kpi(pt('sym'), f2n(a.sym, 1, '%'), '') + kpi(pt('kb'), a.kb ? Math.round(a.kb) : '—', '') + kpi(pt('nCyc'), a.n, '') + '</div>' +
      (a.idc != null ? '<p class="small">IdC <b class="num">' + f2n(a.idc, 1, '%') + '</b> = ' + idcLbl(a.idc) + '</p>' : '') +
      '<div class="tbl-wrap"><table><tr><th></th><th>' + pt('phA') + '</th><th>' + pt('phB') + '</th><th>' + pt('phC') + '</th><th>' + pt('phD') + '</th><th>' + pt('prop') + '</th></tr>' + row('right', a.R) + (a.L.A != null ? row('left', a.L) : '') + '</table></div></div>';
  }
  if (X.br) h += '<div class="card"><h3>' + pt('brT') + '</h3><div class="va-kpis">' + X.br.perLap.map(function (n, i) { return kpi(T('lap') + ' ' + (i + 1), n, ''); }).join('') + kpi(pt('brC'), f2n(X.br.perCyc, 1), '') + '</div></div>';
  // IVV
  var iv = ivvOf(c, VS.trk, VS.cal);
  if ((VS.trk && VS.trk.length) || VS.tool === 'trk') h += '<div class="card"><h3>' + pt('ivvT') + '</h3>' + (iv ? '<div class="va-kpis">' + kpi(pt('ivv'), f2n(iv.ivv, 1, '%'), '') + kpi(pt('vMean'), f2n(iv.mean), 'm/s') + kpi(pt('vMin'), f2n(iv.min), 'm/s') + kpi(pt('vMax'), f2n(iv.max), 'm/s') + kpi(pt('nPts'), iv.n, '') + '</div><div class="chart" style="height:180px"><canvas id="ivch"></canvas></div>' : '<p class="small muted">' + (VS.trk ? VS.trk.length : 0) + ' ' + pt('nPts') + ' · ' + (mPx() ? '' : pt('needCal')) + '</p>') + '<p class="small muted">' + pt('ivvNote') + '</p></div>';
  // mesures
  var ms = (VS.meas || []).filter(function (m) { return m.ty === 'ang3' || m.ty === 'angH' || m.ty === 'dist'; }), dr = (VS.meas || []).filter(function (m) { return !(m.ty === 'ang3' || m.ty === 'angH' || m.ty === 'dist'); }), R = refs();
  var prev = VS.cfg.sid ? prevOf(VS.cfg.sid, VS.cfg, VS.id, VS.cfg.date) : null, pm = prev ? (prev.data.meas || []) : [], pk = prev && prev.data.cal ? (function () { var cc = prev.data.cal, d = Math.hypot(cc.pts[1].x - cc.pts[0].x, cc.pts[1].y - cc.pts[0].y); return d ? cc.m / d : null; })() : null;
  h += '<div class="card"><h3>' + pt('meas') + (VS.cal ? ' <span class="chip">⚖ ' + VS.cal.m + ' m</span>' : '') + '</h3>';
  if (!ms.length && !dr.length) h += '<p class="small muted">' + pt('noMeas') + '</p>';
  else {
    h += '<datalist id="mpre">' + MPRE.map(function (p) { return '<option value="' + esc(tv(p.n)) + '">'; }).join('') + '</datalist><div class="tbl-wrap"><table class="va-mt"><tr><th>' + pt('mT') + '</th><th>' + pt('mName') + '</th><th>' + pt('mVal') + '</th><th>' + pt('mRef') + '</th><th>' + pt('mPrev') + '</th><th></th></tr>' +
      ms.map(function (m) { var v = mVal(m), st = mStatus(m, v), r = R[m.name] || ['', ''], pv = pm.filter(function (q) { return q.name === m.name; }).map(function (q) { return mVal(q, pk); }).filter(function (x) { return x != null; }); var pvv = pv.length ? pv.reduce(function (a, b) { return a + b; }, 0) / pv.length : null;
        return '<tr><td class="num"><a href="#" data-mt="' + m.t + '">' + F(m.t / (+c.slow || 1), 2) + '</a></td><td><input data-mn="' + m.id + '" list="mpre" value="' + esc(m.name || '') + '"></td><td class="num"><b>' + mTxt(m) + '</b> ' + (st ? '<span class="chip ' + (st === 'ok' ? 'ok' : 'warn') + '">' + pt(st) + '</span>' : '') + '</td><td>' + (m.ty === 'dist' ? '—' : '<span class="va-ref"><input data-rlo="' + esc(m.name) + '" value="' + r[0] + '" inputmode="decimal">–<input data-rhi="' + esc(m.name) + '" value="' + r[1] + '" inputmode="decimal">°</span>') + '</td><td class="num">' + (pvv != null ? (m.ty === 'dist' ? pvv.toFixed(2) + ' m' : Math.round(pvv) + '°') + (v != null ? ' <small class="muted">(' + (v - pvv >= 0 ? '+' : '−') + (m.ty === 'dist' ? Math.abs(v - pvv).toFixed(2) : Math.round(Math.abs(v - pvv))) + ')</small>' : '') : '—') + '</td><td><button class="btn sm" data-md="' + m.id + '">✕</button></td></tr>'; }).join('') +
      dr.map(function (m) { return '<tr><td class="num"><a href="#" data-mt="' + m.t + '">' + F(m.t / (+c.slow || 1), 2) + '</a></td><td colspan="4" class="small muted" style="text-align:start">' + pt('t_' + m.ty) + (m.txt ? ' · ' + esc(m.txt) : '') + '</td><td><button class="btn sm" data-md="' + m.id + '">✕</button></td></tr>'; }).join('') + '</table></div><p class="small muted">' + pt('refNote') + '</p>';
    var groups = {}; ms.forEach(function (m) { if (m.name) (groups[m.name] = groups[m.name] || []).push(m); });
    var gl = Object.keys(groups).filter(function (n) { return groups[n].length >= 2; });
    if (gl.length) h += '<h3 style="margin-top:12px">' + pt('mOver') + '</h3>' + gl.map(function (n, i) { return '<div class="small"><b>' + esc(n) + '</b></div><div class="chart" style="height:150px"><canvas id="mch' + i + '"></canvas></div>'; }).join('');
    VS._mg = gl.map(function (n) { return groups[n]; });
  }
  h += '</div>';
  VS._iv = iv;
  return h;
}
function bindPro() {
  var c = VS.cfg;
  $$('[data-mt]').forEach(function (a) { a.onclick = function (e) { e.preventDefault(); var v = $('#vid'); if (v) { v.pause(); seekV(v, +a.dataset.mt); } }; });
  $$('[data-mn]').forEach(function (i) { i.onchange = function () { var m = (VS.meas || []).find(function (q) { return q.id === i.dataset.mn; }); if (m) { m.name = i.value.trim(); VS.dirty = true; refreshRes(); drawOv(); } }; });
  $$('[data-rlo],[data-rhi]').forEach(function (i) { i.onchange = function () { var n = i.dataset.rlo || i.dataset.rhi, lo = parseFloat($('[data-rlo="' + CSS.escape(n) + '"]').value), hi = parseFloat($('[data-rhi="' + CSS.escape(n) + '"]').value); if (isFinite(lo) && isFinite(hi)) { setRef(n, lo, hi); refreshRes(); } }; });
  $$('[data-md]').forEach(function (b) { b.onclick = function () { VS.meas = (VS.meas || []).filter(function (m) { return m.id !== b.dataset.md; }); if (VS.mimg) delete VS.mimg[b.dataset.md]; VS.dirty = true; refreshRes(); drawOv(); }; });
  if (window.Chart) {
    var o = K.chartBase();
    if (VS._iv && document.getElementById('ivch')) { var o1 = K.chartBase(); o1.scales = { x: { type: 'linear', title: { display: true, text: 's' } }, y: { title: { display: true, text: 'm/s' } } }; o1.plugins.legend = { display: false }; K.mk('ivch', { type: 'line', data: { datasets: [{ data: VS._iv.pts.map(function (p) { return { x: +(p.t - VS._iv.pts[0].t).toFixed(3), y: +p.v.toFixed(3) }; }), borderColor: '#a3e635', backgroundColor: '#a3e635', tension: 0.35, pointRadius: 2 }] }, options: o1 }); }
    (VS._mg || []).forEach(function (gr, i) { var o2 = K.chartBase(); o2.plugins.legend = { display: false }; o2.scales = { x: { type: 'linear', title: { display: true, text: 's' } } }; K.mk('mch' + i, { type: 'line', data: { datasets: [{ data: gr.slice().sort(function (a, b) { return a.t - b.t; }).map(function (m) { return { x: +(m.t / (+c.slow || 1)).toFixed(2), y: +(mVal(m) || 0).toFixed(2) }; }), borderColor: '#22d3ee', backgroundColor: '#22d3ee', tension: 0.3 }] }, options: o2 }); });
  }
}
function refreshRes() { if ($('#vpro')) { $('#vpro').innerHTML = proHtml(); bindPro(); } }

/* --- boutons d'événements par mode --- */
var MODES = { race: null, st: ['S', 'O', 'HE', 'DK', 'B', 'M5', 'M15', 'W', 'TO'], arm: ['RE', 'RP', 'RS', 'RX', 'LE', 'LP', 'LS', 'LX'], bk: ['BR', 'K', 'C'] };
function modeTabs() { return '<div class="seg va-modes">' + ['race', 'st', 'arm', 'bk'].map(function (k) { return '<button class="btn sm' + ((VS.mode || 'race') === k ? ' on' : '') + '" data-mode="' + k + '">' + pt('m_' + k) + '</button>'; }).join('') + '</div>'; }
function renderBtns() {
  var box = $('#evbtns'); if (!box) return;
  var lap = curLap(), n = laps(VS.cfg), c = VS.cfg, b = [], mode = VS.mode || 'race';
  if (mode === 'race') {
    if (lap === 1) { b.push(['S', T('evS'), 'S']); if (c.start !== 'push') b.push(['O', T('evO'), 'O']); }
    b.push(['B', T('evB'), 'B']);
    markers(c.pool).forEach(function (d, i) { b.push(['M' + d, mU(d), String(i + 1)]); });
    b.push([lap === n ? 'F' : 'W', lap === n ? T('evF') : T('evW'), 'W']);
    b.push(['C', T('evC'), 'C']);
  } else MODES[mode].forEach(function (k, i) { if (k === 'W') b.push([lap === n ? 'F' : 'W', lap === n ? T('evF') : T('evW'), 'W']); else if (k.charAt(0) === 'M') b.push([k, mU(+k.slice(1)), String(i + 1)]); else b.push([k, T('ev' + k), String(i + 1)]); });
  VS.keymap = {}; b.forEach(function (x) { if (/^[1-9]$/.test(x[2])) VS.keymap[x[2]] = x[0]; });
  box.innerHTML = b.map(function (x) { return '<button class="btn' + (x[0] === 'C' ? ' cyc' : x[0] === 'W' || x[0] === 'F' ? ' wall' : /^R/.test(x[0]) && x[0].length === 2 ? ' arm-r' : /^L/.test(x[0]) && x[0].length === 2 ? ' arm-l' : '') + '" data-ev="' + x[0] + '">' + x[1] + '<kbd>' + x[2] + '</kbd></button>'; }).join('');
  if ($('#lapn')) $('#lapn').textContent = lap + ' / ' + n;
  if ($('#evhelp')) $('#evhelp').innerHTML = mode === 'race' ? T('evHelp') : pt('h_' + mode);
  var le = VS.ev[VS.ev.length - 1]; if ($('#evlast')) $('#evlast').textContent = pt('last') + ' : ' + (le ? evLabel(le) : '—');
  if ($('#evundo')) { $('#evundo').onclick = undoEv; $('#evundo').disabled = !VS.ev.length; }
  $$('[data-ev]', box).forEach(function (bt) { bt.onclick = function () { addEv(bt.dataset.ev); }; });
}
function bindModes() { $$('[data-mode]').forEach(function (b) { b.onclick = function () { VS.mode = b.dataset.mode; $$('[data-mode]').forEach(function (x) { x.classList.toggle('on', x === b); }); renderBtns(); }; }); }

/* --- guide de tournage --- */
var GUIDE = [
  ['📏 السباق والأزمنة (السرعة، الإيقاع، الدورانات)', '📏 Course et temps (vitesse, fréquence, virages)', ['من المدرجات، فوق، من الجنب. تتبّع السباح ولا خلّي المسبح كامل في الصورة.', 'العلامات (5 م، 15 م) والحائطين يبانو.', '1080p · 60 صورة/ث · أفقي.'], ['Depuis les gradins, en hauteur, de côté. Suivre le nageur ou cadrer tout le bassin.', 'Repères (5 m, 15 m) et murs visibles.', '1080p · 60 i/s · horizontal.']],
  ['🚀 الانطلاق', '🚀 Départ', ['كاميرا فوق الماء: من الجنب، <b>عمودية على المكعب</b>، على بعد 5–10 م، في علو المكعب. تبان من المكعب حتى 7 م.', 'كاميرا تحت الماء (الغلاف): من الجنب، عمق 0.5–1 م، تقابل 3–8 م من الحائط: الدخول، العمق، ضربات الدولفين.', '120–240 صورة/ث إذا الهاتف يقدر.'], ['Caméra hors de l’eau : de côté, <b>perpendiculaire au plot</b>, à 5–10 m, hauteur du plot ; cadrer du plot à 7 m.', 'Caméra sous l’eau : de côté, 0,5–1 m de profondeur, face à la zone 3–8 m : entrée, profondeur, ondulations.', '120–240 i/s si possible.']],
  ['🔄 الدوران', '🔄 Virage', ['من الجنب، الحائط في وسط الصورة، و 5 م من كل جيهة تبان.', 'تحت الماء: الكاميرا قريبة من الحائط من الجنب، باش تشوف اللمس، الدفعة والطلوع.', '60–120 صورة/ث.'], ['De côté, mur au centre, 5 m visibles de chaque côté.', 'Sous l’eau : près du mur, de côté : contact, poussée, coulée.', '60–120 i/s.']],
  ['💪 دورة الذراعين والتنسيق (IdC)', '💪 Cycle de bras et coordination (IdC)', ['<b>تحت الماء، من الجنب</b>، عمودية على اتجاه السباحة، في وسط المسبح (10–15 م).', 'عمق 0.5–1 م، على بعد 3–5 م من الحارة. السباح يتعدّى قدام الكاميرا 2–3 دورات.', 'زيد كاميرا <b>من القدام</b> تحت الماء باش تشوف مسار اليد والتناظر.', '60 صورة/ث على الأقل.'], ['<b>Sous l’eau, de côté</b>, perpendiculaire à la nage, milieu du bassin (10–15 m).', '0,5–1 m de profondeur, à 3–5 m du couloir ; 2–3 cycles devant la caméra.', 'Ajouter une vue <b>de face</b> sous l’eau pour le trajet de la main et la symétrie.', '60 i/s minimum.']],
  ['⌖ IVV (تذبذب السرعة)', '⌖ IVV (variation de vitesse)', ['<b>كاميرا ثابتة</b> (حامل)، من الجنب، ما تتحركش ما تتبعش السباح.', 'حط في الصورة <b>مسافة معروفة</b> للمعايرة: علامتين في الحبل ولا عصا طولها 1–2 م.', 'تتبع الحوض (ولا الراس) صورة بصورة على 2–3 دورات. 60–120 صورة/ث.'], ['<b>Caméra fixe</b> (trépied), de côté, sans suivre le nageur.', 'Une <b>distance connue</b> dans l’image pour l’étalonnage : deux repères ou une perche de 1–2 m.', 'Suivre la hanche (ou la tête) image par image sur 2–3 cycles. 60–120 i/s.']],
  ['📐 الزوايا', '📐 Angles', ['الكاميرا <b>عمودية</b> على المستوى اللي يتحرك فيه المفصل (من الجنب للمرفق والركبة). إذا مايلة، الزاوية تتغلط.', 'GoPro: استعمل وضع <b>Linear</b> باش ما يتعوجش الإطار.', 'وقّف على الصورة اللي المفصل فيها واضح، وكبّر بالزوم قبل ما تقيس.'], ['Caméra <b>perpendiculaire</b> au plan du mouvement (de côté pour coude et genou), sinon l’angle est faussé.', 'GoPro : mode <b>Linéaire</b> pour éviter la déformation.', 'Se placer sur l’image où l’articulation est nette et zoomer avant de mesurer.']]
];
function openGuide() {
  var fr = L() === 'fr', box = document.createElement('div'); box.id = 'repbox';
  box.innerHTML = '<div class="rep-in card"><div class="row" style="margin-bottom:10px"><b class="sp">' + pt('t_guide') + '</b><button class="btn sm" id="gx">✕</button></div>' + GUIDE.map(function (g) { return '<div class="kbox" style="margin-bottom:10px"><b>' + (fr ? g[1] : g[0]) + '</b><ul style="margin:6px 0 0;padding-inline-start:20px;line-height:1.8">' + (fr ? g[3] : g[2]).map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul></div>'; }).join('') + '</div>';
  document.body.appendChild(box); $('#gx').onclick = function () { box.remove(); }; box.onclick = function (e) { if (e.target === box) box.remove(); };
}

/* --- rapport : sections supplémentaires --- */
function mimgOf(id) { if (VS.id === id && VS.mimg && Object.keys(VS.mimg).length) return VS.mimg; try { return JSON.parse(localStorage.getItem('wav_mimg_' + id) || '{}'); } catch (e) { return {}; } }

/* ================= zoom (molette, glisser, pincer) ================= */
// z = {s, x, y} partagé par toutes les vues d'un même groupe
function zoomable(stages, wraps, z, onTap) {
  var ptr = {}, pan = null, pin = null;
  var size = function () { return { W: wraps[0].offsetWidth, H: wraps[0].offsetHeight }; };
  var apply = function () {
    var d = size(); z.s = Math.max(1, Math.min(6, z.s)); z.x = Math.min(0, Math.max(d.W - d.W * z.s, z.x)); z.y = Math.min(0, Math.max(d.H - d.H * z.s, z.y));
    wraps.forEach(function (w) { w.style.transform = 'translate(' + z.x + 'px,' + z.y + 'px) scale(' + z.s + ')'; });
    stages.forEach(function (st) {
      st.classList.toggle('zoomed', z.s > 1.001); st.style.touchAction = z.s > 1.001 ? 'none' : 'pan-y';
      var m = st.querySelector('.va-mini i'); if (m) { m.style.width = (100 / z.s) + '%'; m.style.height = (100 / z.s) + '%'; m.style.left = (-z.x / z.s / d.W * 100) + '%'; m.style.top = (-z.y / z.s / d.H * 100) + '%'; }
      var lb = st.querySelector('.va-zl'); if (lb) lb.textContent = '×' + z.s.toFixed(1);
    });
  };
  var at = function (st, cx, cy) { var r = st.getBoundingClientRect(), r0 = wraps[0].parentNode.getBoundingClientRect(); return { x: cx - r0.left, y: cy - r0.top }; };
  var zoomAt = function (p, f) { var ns = Math.max(1, Math.min(6, z.s * f)); z.x = p.x - (p.x - z.x) * ns / z.s; z.y = p.y - (p.y - z.y) * ns / z.s; z.s = ns; apply(); };
  stages.forEach(function (st) {
    st.addEventListener('wheel', function (e) { e.preventDefault(); zoomAt(at(st, e.clientX, e.clientY), e.deltaY < 0 ? 1.18 : 1 / 1.18); }, { passive: false });
    st.addEventListener('pointerdown', function (e) {
      if (e.target.closest('button,select,input,.va-mini') || (VS.tool && e.target.id === 'ov')) return;
      ptr[e.pointerId] = { x: e.clientX, y: e.clientY }; try { st.setPointerCapture(e.pointerId); } catch (er) {}
      var ids = Object.keys(ptr);
      if (ids.length === 1) pan = { x: e.clientX, y: e.clientY, zx: z.x, zy: z.y, moved: false, t: Date.now() };
      if (ids.length === 2) { var a = ptr[ids[0]], b = ptr[ids[1]]; pin = { d: Math.hypot(a.x - b.x, a.y - b.y), s: z.s, mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2, zx: z.x, zy: z.y }; if (pan) pan.moved = true; }
    });
    st.addEventListener('pointermove', function (e) {
      if (!ptr[e.pointerId]) return; ptr[e.pointerId] = { x: e.clientX, y: e.clientY }; var ids = Object.keys(ptr);
      if (ids.length >= 2 && pin) {
        var a = ptr[ids[0]], b = ptr[ids[1]], d = Math.hypot(a.x - b.x, a.y - b.y), mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2, p = at(st, pin.mx, pin.my), ns = Math.max(1, Math.min(6, pin.s * d / (pin.d || 1)));
        z.x = p.x - (p.x - pin.zx) * ns / pin.s + (mx - pin.mx); z.y = p.y - (p.y - pin.zy) * ns / pin.s + (my - pin.my); z.s = ns; apply(); e.preventDefault();
      } else if (pan) {
        var dx = e.clientX - pan.x, dy = e.clientY - pan.y; if (Math.abs(dx) + Math.abs(dy) > 5) pan.moved = true;
        if (z.s > 1.001 && pan.moved) { z.x = pan.zx + dx; z.y = pan.zy + dy; apply(); e.preventDefault(); }
      }
    });
    var end = function (e) {
      if (!ptr[e.pointerId]) return; delete ptr[e.pointerId];
      if (!Object.keys(ptr).length) { if (pan && !pan.moved && e.type === 'pointerup' && Date.now() - pan.t < 400 && onTap) onTap(); pan = null; pin = null; }
      else if (Object.keys(ptr).length === 1) { pin = null; var k = Object.keys(ptr)[0]; pan = { x: ptr[k].x, y: ptr[k].y, zx: z.x, zy: z.y, moved: true, t: 0 }; }
    };
    st.addEventListener('pointerup', end); st.addEventListener('pointercancel', end);
    st.addEventListener('dblclick', function () { z.s = 1; z.x = 0; z.y = 0; apply(); });
    var mini = st.querySelector('.va-mini');
    if (mini) mini.addEventListener('pointerdown', function (e) { e.stopPropagation(); var r = mini.getBoundingClientRect(), d = size(), fx = (e.clientX - r.left) / r.width, fy = (e.clientY - r.top) / r.height; z.x = -(fx * d.W * z.s - d.W / 2); z.y = -(fy * d.H * z.s - d.H / 2); apply(); });
  });
  window.addEventListener('resize', apply);
  apply();
  return { apply: apply, zoomIn: function () { var d = size(); zoomAt({ x: d.W / 2, y: d.H / 2 }, 1.4); }, zoomOut: function () { var d = size(); zoomAt({ x: d.W / 2, y: d.H / 2 }, 1 / 1.4); }, reset: function () { z.s = 1; z.x = 0; z.y = 0; apply(); } };
}
function zoomUi() { return '<div class="va-zui"><button class="btn sm" data-z="out">－</button><span class="va-zl num">×1.0</span><button class="btn sm" data-z="in">＋</button><button class="btn sm" data-z="reset">⊡</button></div><div class="va-mini"><i></i></div>'; }
function bindZoomUi(st, Z) { $$('[data-z]', st).forEach(function (b) { b.onclick = function (e) { e.stopPropagation(); Z[b.dataset.z === 'in' ? 'zoomIn' : b.dataset.z === 'out' ? 'zoomOut' : 'reset'](); }; }); }

/* ================= deux longueurs d'une même vidéo ================= */
function lapStarts(c, evs) { var ev = evs.slice().sort(function (a, b) { return a.t - b.t; }), sig = ev.find(function (e) { return e.k === 'S'; }), w = ev.filter(function (e) { return e.k === 'W' || e.k === 'F'; }), o = [sig ? sig.t : (ev[0] ? ev[0].t : 0)]; for (var i = 1; i < laps(c); i++) o.push(w[i - 1] ? w[i - 1].t : null); return o; }
function lapCmpHtml() {
  var n = laps(VS.cfg), lg = L(); if (!VS.url || n < 2) return '';
  var opt = function (sel) { var s = ''; for (var i = 1; i <= n; i++) s += '<option value="' + i + '"' + (i === sel ? ' selected' : '') + '>' + rt('lap', lg) + ' ' + i + '</option>'; return s; };
  return '<div class="card"><h3>' + rt('lapCmp', lg) + '</h3><p class="small muted">' + rt('lapCmpH', lg) + '</p><div class="va-dual"><div><label class="small">' + rt('paneA', lg) + '</label><select id="lcA">' + opt(1) + '</select><div class="va-stage va-dst"><div class="va-zm"><video id="lv0" src="' + VS.url + '" playsinline preload="auto" muted></video></div>' + zoomUi() + '</div></div><div><label class="small">' + rt('paneB', lg) + '</label><select id="lcB">' + opt(n) + '</select><div class="va-stage va-dst"><div class="va-zm"><video id="lv1" src="' + VS.url + '" playsinline preload="auto" muted></video></div>' + zoomUi() + '</div></div></div>' +
    '<div class="row" style="margin-top:8px;gap:6px;direction:ltr"><button class="btn sm" id="lsync">' + rt('syncL', lg) + '</button><button class="btn sm" data-ls="-1">◀</button><button class="btn pri sm" id="lplay">▶</button><button class="btn sm" data-ls="1">▶</button><select id="lrate" style="width:auto;min-height:34px">' + [0.1, 0.25, 0.5, 1].map(function (r) { return '<option value="' + r + '"' + (r === 0.25 ? ' selected' : '') + '>×' + r + '</option>'; }).join('') + '</select></div></div>';
}
function bindLapCmp() {
  var a = $('#lv0'), b = $('#lv1'); if (!a || !b) return;
  var dst = $$('.va-dst'), Z2 = zoomable(dst, dst.map(function (d) { return d.querySelector('.va-zm'); }), VS.z2 = VS.z2 || { s: 1, x: 0, y: 0 }, function () { $('#lplay').click(); }); dst.forEach(function (d) { bindZoomUi(d, Z2); }); a.addEventListener('loadedmetadata', function () { Z2.apply(); });
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
