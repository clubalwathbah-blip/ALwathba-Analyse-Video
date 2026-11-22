/* MR WATHBA ANALYSE VIDÉO · BY OKBA — المرحلة 6 : الذكاء الاصطناعي
   v6 : زاوية بنقاط ما تبانش = «—» · فحص منطق الهيكل (ما نتّاكلوش على ثقة النموذج) · أدنى/أقصى بلا الصور الشاذة
        تتبّع القبعة باللون (+ مطابقة الصورة كاحتياط) · سباحين 1 و 2 · الهيكل يتبع القبعة
   - الهيكل العظمي (MediaPipe Pose, يخدم في المتصفح، الفيديو ما يخرجش)
   - الزوايا الأوتوماتيكية + تصحيح النقاط باليد
   - تحليل مقطع: منحنى الزوايا + اقتراح الدورات
   - تتبّع الراس الأوتوماتيكي (مطابقة الصورة) ← السرعة و IVV */
(function () {
  'use strict';
  var X = window.VAX, K = window.VO2CORE, $ = K.$, $$ = K.$$, esc = K.esc, T = K.T, F = K.F;
  var VS = X.VS, PD = X.PD, MPRE = X.MPRE, angOf = X.angOf, refs = X.refs, pt = X.pt, tv = X.tv, thumbFor = X.thumbFor, vidPt = X.vidPt, seekV = X.seekV, setTool = X.setTool, toolBar = X.toolBar, bindTools = X.bindTools, refresh = X.refresh, refreshRes = X.refreshRes, drawOv = X.drawOv, mPx = X.mPx, L = X.L;
  var CDN = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14';
  var MODEL = function (k) { return 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_' + k + '/float16/1/pose_landmarker_' + k + '.task'; };
  var AD = {
    ai: ['🤖 الذكاء الاصطناعي', '🤖 IA'],
    title: ['🤖 التحليل الأوتوماتيكي', '🤖 Analyse automatique'],
    note: ['البرنامج يقترح والمدرب يأكّد. كلش يخدم في البيسي تاعك، الفيديو ما يخرجش. أول مرة يحتاج أنترنت باش يحمّل النموذج.', 'L’IA propose, l’entraîneur valide. Tout tourne sur votre PC, la vidéo ne sort pas. Internet nécessaire la 1re fois (modèle).'],
    model: ['النموذج', 'Modèle'], m_lite: ['سريع', 'Rapide'], m_full: ['عادي', 'Normal'], m_heavy: ['دقيق (ثقيل)', 'Précis (lourd)'],
    st_none: ['ما تحمّلش', 'non chargé'], st_load: ['يتحمّل…', 'chargement…'], st_ok: ['جاهز ✓', 'prêt ✓'], st_err: ['ما تحمّلش ✕', 'échec ✕'],
    loadErr: ['ما قدرش يحمّل النموذج. شوف الأنترنت وعاود.', 'Impossible de charger le modèle. Vérifiez internet.'],
    sk: ['🦴 الهيكل العظمي والزوايا', '🦴 Squelette et angles'],
    ctx: ['المرحلة', 'Phase'], c_none: ['— اختار (للمراجع)', '— choisir (références)'], c_block: ['فوق البلوك', 'Sur le plot'], c_flight: ['الطيران والدخول', 'Vol et entrée'], c_uw: ['الكولي', 'Coulée'], c_swim: ['السباحة', 'Nage'], c_turn: ['الدفعة من الحيط', 'Poussée au mur'],
    ctxH: ['اختار المرحلة باش كل زاوية تتقارن بالمرجع الصحيح.', 'Choisissez la phase pour comparer chaque angle à la bonne référence.'],
    roi: ['▢ حدّد منطقة السباح', '▢ Zone du nageur'], roiClr: ['✕ مسح المنطقة', '✕ Effacer la zone'],
    roiHint: ['اختياري بصح ينصح بيه: كي السباح صغير في الصورة، حدّد المستطيل حوالو (الحارة تاعو) باش يشوفو مليح.', 'Optionnel mais conseillé : si le nageur est petit, encadrez-le (son couloir) pour une meilleure détection.'],
    det: ['🦴 اكتشف الهيكل في هذي الصورة', '🦴 Détecter sur cette image'],
    edit: ['✋ صلّح النقاط', '✋ Corriger les points'],
    th_roi: ['اضغط زوج زوايا المستطيل (فوق-يسار ثم تحت-يمين)', 'Cliquer 2 coins du rectangle'],
    th_pose: ['اسحب أي نقطة غالطة وحطها في بلاصتها', 'Glisser un point mal placé à sa place'],
    th_head: ['اضغط على راس السباح (القبعة)', 'Cliquer sur la tête du nageur (bonnet)'],
    t_pose: ['🦴 هيكل', '🦴 Squelette'],
    noPose: ['ما لقاش السباح في هذي الصورة. جرّب تحدّد المنطقة، ولا بدّل الصورة، ولا النموذج «دقيق».', 'Nageur non trouvé sur cette image. Encadrez-le, changez d’image ou passez au modèle « Précis ».'],
    found: ['لقى الهيكل ✓ (ثقة {p}%)', 'Squelette trouvé ✓ (confiance {p} %)'],
    lowConf: ['⚠ ثقة ضعيفة: شوف النقاط وصلّحهم', '⚠ Confiance faible : vérifiez les points'],
    side: ['الجنب', 'Côté'], sR: ['يمين', 'droit'], sL: ['يسار', 'gauche'],
    angT: ['الزوايا في هذي الصورة', 'Angles sur cette image'], fromSer: ['(من المقطع)', '(du segment)'],
    a_elbow: ['المرفق', 'Coude'], a_sh: ['الكتف (الذراع/الجسم)', 'Épaule (bras/tronc)'], a_hip: ['الورك', 'Hanche'], a_knee: ['الركبة', 'Genou'], a_trunk: ['ميلان الجسم', 'Inclinaison du tronc'], a_head: ['الراس/الرقبة', 'Tête/cou'],
    add: ['＋ للقياسات', '＋ Mesures'], added: ['تزاد للقياسات ✓', 'Ajouté aux mesures ✓'], keep: ['💾 احفظ الهيكل في هذي الصورة', '💾 Garder ce squelette'],
    seg: ['📈 تحليل مقطع (صورة بصورة)', '📈 Analyse d’un segment (image par image)'],
    segHint: ['وقّف في بداية المقطع (مثلاً 2 ولا 3 دورات ذراع)، اختار المدة واضغط «حلّل». يحسب الزوايا في كل صورة ويرسم المنحنى.', 'Placez-vous au début (2–3 cycles), choisissez la durée puis « Analyser ».'],
    dur: ['المدة', 'Durée'], run: ['▶ حلّل المقطع', '▶ Analyser'], stop: ['⏹ وقف', '⏹ Stop'],
    prog: ['{i} / {n} صورة', '{i} / {n} images'], segDone: ['كمل: {n} صورة، لقى الهيكل في {k}', 'Terminé : {n} images, squelette trouvé sur {k}'],
    serT: ['منحنى الزوايا', 'Courbe des angles'], mn: ['أدنى', 'Min'], mx: ['أقصى', 'Max'], avg: ['المعدل', 'Moy.'],
    cyc: ['🔁 اقترح الدورات', '🔁 Proposer les cycles'], cycNone: ['ما قدرش يلقى دورات واضحة في هذا المقطع', 'Aucun cycle net trouvé sur ce segment'],
    cycSug: ['اقتراحات ({n}) — كل وحدة = دخول نفس اليد. اضغط على الوقت باش تشوف:', 'Propositions ({n}) — chaque = entrée de la même main. Cliquer pour voir :'],
    cycAdd: ['✓ زيدهم للأحداث', '✓ Ajouter aux événements'], cycDrop: ['✕ خلّيهم', '✕ Ignorer'], cycOk: ['تزادو {n} أحداث ✓', '{n} événements ajoutés ✓'],
    serClr: ['✕ مسح المقطع', '✕ Effacer le segment'],
    trk: ['🎯 تتبّع الراس الأوتوماتيكي (السرعة و IVV)', '🎯 Suivi automatique de la tête (vitesse & IVV)'],
    trkHint: ['1) عايَر المسافة بـ «⚖ معايرة» (مثلاً بين علامتين في الحبل). 2) اضغط «اضغط على الراس» واضغط على قبعة السباح. 3) «ابدا التتبّع».', '1) Étalonner (⚖). 2) « Cliquer la tête » puis cliquer le bonnet. 3) « Lancer le suivi ».'],
    pick: ['🎯 اضغط على الراس', '🎯 Cliquer la tête'], size: ['حجم الراس', 'Taille tête'], sz_s: ['صغير', 'petit'], sz_m: ['متوسط', 'moyen'], sz_l: ['كبير', 'grand'],
    go: ['▶ ابدا التتبّع', '▶ Lancer le suivi'], toEnd: ['حتى النهاية', 'jusqu’à la fin'], every: ['كل', 'toutes les'], img: ['صورة', 'img'],
    needHead: ['اضغط أولاً على راس السباح', 'Cliquez d’abord sur la tête'], lost: ['ضيّع السباح عند {t} ث: اضغط على راسو من جديد وكمّل', 'Nageur perdu à {t} s : recliquez sur la tête et relancez'],
    trkDone: ['كمل التتبّع: {n} نقطة ✓', 'Suivi terminé : {n} points ✓'], headOk: ['تحدّد الراس ✓ — اضغط «ابدا التتبّع»', 'Tête définie ✓ — lancez le suivi'],
    needCal: ['ما عايرتش المسافة: النقاط يتسجّلو بصح السرعة ما تتحسبش حتى تعاير', 'Pas d’étalonnage : points enregistrés, vitesse calculée après étalonnage'],
    notPlaus: ['لقى «هيكل» بصح ماهوش منطقي (طول الأعضاء ولا الراس بعيد على القبعة) ← ما تحسبش. حدّد المنطقة ولا حط النقاط باليد.', 'Squelette trouvé mais incohérent (proportions ou tête loin du bonnet) → ignoré. Encadrez le nageur ou placez les points à la main.'],
    notVis: ['ما يبانش', 'non visible'], robust: ['بلا الصور الشاذة (10%–90%)', 'sans valeurs aberrantes (10–90 %)'], nFr: ['صور', 'img'], rej: ['تنحّاو {n} صور ماهمش منطقيين', '{n} images incohérentes écartées'],
    who: ['السباح', 'Nageur'], sw1: ['1 (الأساسي)', '1 (principal)'], sw2: ['2', '2'], capCol: ['🎨 تتبّع بلون القبعة', '🎨 Suivi par couleur du bonnet'], capNo: ['لون القبعة ماهوش ظاهر (قريب للماء) ← تتبّع بالصورة', 'Couleur du bonnet peu distincte → suivi par image'],
    err: ['صرا مشكل في التحليل، عاود جرب', 'Erreur pendant l’analyse, réessayez'], trk2: ['مسار السباح 2', 'Trajectoire nageur 2'], clr2: ['مسح', 'Effacer'],
    busy: ['راهو يخدم…', 'En cours…'], limits: ['⚠ يخدم مليح تحت الماء من الجنب، الانطلاق والبر. من بعيد ومع الرشّ، الهيكل ماشي مضمون — التتبّع يخدم مليح.', '⚠ Fiable sous l’eau de côté, au départ et à sec. De loin avec éclaboussures, squelette incertain — le suivi reste fiable.']
  };
  function a(k, o) { var v = AD[k]; var s = v ? (L() === 'fr' ? v[1] : v[0]) : k; if (o) Object.keys(o).forEach(function (x) { s = s.split('{' + x + '}').join(o[x]); }); return s; }
  ['th_roi', 'th_pose', 'th_head', 't_pose'].forEach(function (k) { PD[k] = AD[k]; });

  var AIS = { open: false, model: 'full', st: 'none', roi: null, ser: null, sug: null, busy: false, stop: false, prog: '', dur: 3, head: null, hs: 'm', tdur: 5, msg: '', who: 1, col: null, rej: 0 };
  try { var sv = JSON.parse(localStorage.getItem('wav_ai') || '{}'); if (sv.model) AIS.model = sv.model; if (sv.open) AIS.open = true; } catch (e) {}
  function persist() { try { localStorage.setItem('wav_ai', JSON.stringify({ model: AIS.model, open: AIS.open })); } catch (e) {} }

  /* ---------- النموذج ---------- */
  var LM = null, LMK = null, LOADING = null, LOADK = null, PL = null;
  function loadPose() {
    if (window.__poseMock) { AIS.st = 'ok'; return Promise.resolve(window.__poseMock); }
    if (LM && LMK === AIS.model) return Promise.resolve(LM);
    if (LOADING) return LOADK === AIS.model ? LOADING : LOADING.then(loadPose, loadPose);   // بدّل النموذج وهو يتحمّل
    AIS.st = 'load'; stat();
    var key = AIS.model, MP; LOADK = key;
    LOADING = import(CDN + '/vision_bundle.mjs').then(function (m) { MP = m; return m.FilesetResolver.forVisionTasks(CDN + '/wasm'); }).then(function (fs) {
      var mk = function (dl) { return MP.PoseLandmarker.createFromOptions(fs, { baseOptions: { modelAssetPath: MODEL(key), delegate: dl }, runningMode: 'IMAGE', numPoses: 1, minPoseDetectionConfidence: 0.25, minPosePresenceConfidence: 0.25, minTrackingConfidence: 0.25 }); };
      return mk('GPU').catch(function () { return mk('CPU'); });
    }).then(function (pl) {
      if (PL && PL !== pl) try { PL.close(); } catch (e) {}   // نسكّرو النموذج القديم (الذاكرة وكرت الشاشة)
      PL = pl;
      LM = { detect: function (cv) { var r = pl.detect(cv); return r && r.landmarks && r.landmarks[0] ? r.landmarks[0] : null; } };
      LMK = key; AIS.st = 'ok'; LOADING = null; stat(); return LM;
    }).catch(function (e) { LOADING = null; AIS.st = 'err'; stat(); K.toast(a('loadErr')); throw e; });
    return LOADING;
  }
  function stat() { var el = $('#aist'); if (el) { el.textContent = a('st_' + AIS.st); el.className = 'chip ' + (AIS.st === 'ok' ? 'ok' : AIS.st === 'err' ? 'warn' : ''); } }

  /* ---------- القبعة: وين راهو الراس في هذا الوقت ---------- */
  function trkOf(w) { return (w || AIS.who) === 2 ? (VS.trk2 = VS.trk2 || []) : (VS.trk = VS.trk || []); }
  function capAt(t) {
    var T = trkOf(), tol = 2.5 / (VS.fps || 30), b = null;
    T.forEach(function (q) { if (Math.abs(q.t - t) <= tol && (!b || Math.abs(q.t - t) < Math.abs(b.t - t))) b = q; });
    return b ? { x: b.x, y: b.y, s: b.s || (AIS.head && AIS.head.s) || 20 } : null;
  }
  /* ---------- فحص منطق الهيكل: النموذج ساعات يقول 80% وهو حاطّو في الماء ---------- */
  function plaus(P, t) {
    if (!P || P.length < 29) return false;
    var d = function (a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }, vis = function (i) { return P[i].v >= 0.5; };
    var S = { x: (P[11].x + P[12].x) / 2, y: (P[11].y + P[12].y) / 2 }, H = { x: (P[23].x + P[24].x) / 2, y: (P[23].y + P[24].y) / 2 }, tor = d(S, H);
    if (tor < 6) return false;
    var R = [[11, 13, 0.3, 1.1], [12, 14, 0.3, 1.1], [23, 25, 0.45, 1.4], [24, 26, 0.45, 1.4], [25, 27, 0.4, 1.4], [26, 28, 0.4, 1.4]];
    for (var i = 0; i < R.length; i++) { var r = R[i]; if (vis(r[0]) && vis(r[1])) { var q = d(P[r[0]], P[r[1]]) / tor; if (q < r[2] || q > r[3]) return false; } }
    var LR = [[11, 13, 12, 14], [23, 25, 24, 26], [25, 27, 26, 28]];
    for (var j = 0; j < LR.length; j++) { var z = LR[j]; if (vis(z[0]) && vis(z[1]) && vis(z[2]) && vis(z[3])) { var q2 = d(P[z[0]], P[z[1]]) / Math.max(1, d(P[z[2]], P[z[3]])); if (q2 < 0.55 || q2 > 1.8) return false; } }
    if (d(P[0], S) > 1.3 * tor) return false;
    var cp = t != null ? capAt(t) : null; if (cp && d(P[0], cp) > Math.max(tor, cp.s * 3)) return false;
    return true;
  }

  /* ---------- اكتشاف على صورة ---------- */
  var CV = document.createElement('canvas'), CV2 = document.createElement('canvas');
  function region(v, center) {
    var W = v.videoWidth, H = v.videoHeight, r = AIS.roi ? { x: AIS.roi.x, y: AIS.roi.y, w: AIS.roi.w, h: AIS.roi.h } : { x: 0, y: 0, w: W, h: H };
    var cp = capAt(v.currentTime);
    if (cp && !AIS.roi) { var sz = Math.min(W, Math.max(cp.s * 16, H * 0.45)); r = { x: cp.x - sz / 2, y: cp.y - sz * 0.35, w: sz, h: sz * 0.7 }; }   // الهيكل يتبع القبعة
    else if (cp) { r.x = cp.x - r.w / 2; r.y = cp.y - r.h / 2; }
    else if (center && AIS.roi) { r.x = center.x - r.w / 2; r.y = center.y - r.h / 2; }
    r.w = Math.min(W, r.w); r.h = Math.min(H, r.h);
    r.x = Math.max(0, Math.min(W - r.w, r.x)); r.y = Math.max(0, Math.min(H - r.h, r.y)); return r;
  }
  function detectFrame(v, center) {
    return loadPose().then(function (lm) {
      var R = region(v, center); AIS._R = R; var sc = Math.min(4, 640 / Math.max(R.w, R.h)), cw = Math.max(32, Math.round(R.w * sc)), ch = Math.max(32, Math.round(R.h * sc));
      CV.width = cw; CV.height = ch; var g = CV.getContext('2d'); g.drawImage(v, R.x, R.y, R.w, R.h, 0, 0, cw, ch);
      var best = null, bestV = -1;
      // 0° ثم 90° في الجهتين (الجسم أفقي في الماء)
      [0, 1, -1].some(function (rot) {
        var src = CV, res;
        if (rot) { CV2.width = ch; CV2.height = cw; var g2 = CV2.getContext('2d'); g2.save(); if (rot > 0) { g2.translate(ch, 0); g2.rotate(Math.PI / 2); } else { g2.translate(0, cw); g2.rotate(-Math.PI / 2); } g2.drawImage(CV, 0, 0); g2.restore(); src = CV2; }
        try { res = lm.detect(src); } catch (e) { res = null; }
        if (res && res.length >= 29) {
          var pts = res.map(function (p) { var nx = p.x, ny = p.y; if (rot > 0) { nx = p.y; ny = 1 - p.x; } else if (rot < 0) { nx = 1 - p.y; ny = p.x; } return { x: Math.round((R.x + nx * R.w) * 10) / 10, y: Math.round((R.y + ny * R.h) * 10) / 10, v: Math.round((p.visibility == null ? 1 : p.visibility) * 100) / 100 }; });
          if (!plaus(pts, v.currentTime)) { AIS.rej++; return false; }
          var mv = conf(pts); if (mv > bestV) { bestV = mv; best = pts; }
        }
        return bestV >= 0.55;
      });
      return best;
    });
  }
  function conf(pts) { var ids = [11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28], s = 0; ids.forEach(function (i) { s += pts[i] ? pts[i].v : 0; }); return s / ids.length; }

  /* ---------- الزوايا ---------- */
  var IDX = { R: { ear: 8, sh: 12, el: 14, wr: 16, hip: 24, kn: 26, an: 28 }, L: { ear: 7, sh: 11, el: 13, wr: 15, hip: 23, kn: 25, an: 27 } };
  function sideOf(pts) { var s = function (o) { return pts[o.sh].v + pts[o.el].v + pts[o.wr].v + pts[o.hip].v + pts[o.kn].v + pts[o.an].v; }; return s(IDX.R) >= s(IDX.L) ? 'R' : 'L'; }
  var CTXP = { block: { knee: 1 }, flight: { trunk: 3 }, uw: { head: 9, trunk: 10 }, swim: { elbow: 0, trunk: 4 }, turn: { knee: 2 } };
  function ctxOf() { return AIS.ctx || (VS.mode === 'arm' ? 'swim' : 'none'); }
  function presetName(i) { return tv(MPRE[i].n); }
  function angDefs(pts, side) {
    var o = IDX[side || sideOf(pts)], P = function (i) { return { x: pts[i].x, y: pts[i].y }; }, md = VS.mode || 'race';
    var VIS = { elbow: [o.sh, o.el, o.wr], sh: [o.el, o.sh, o.hip], hip: [o.sh, o.hip, o.kn], knee: [o.hip, o.kn, o.an], trunk: [o.hip, o.sh], head: [o.ear, o.sh, o.hip] };
    return [
      { k: 'elbow', ty: 'ang3', p: [P(o.sh), P(o.el), P(o.wr)] },
      { k: 'sh', ty: 'ang3', p: [P(o.el), P(o.sh), P(o.hip)] },
      { k: 'hip', ty: 'ang3', p: [P(o.sh), P(o.hip), P(o.kn)] },
      { k: 'knee', ty: 'ang3', p: [P(o.hip), P(o.kn), P(o.an)] },
      { k: 'trunk', ty: 'angH', p: [P(o.hip), P(o.sh)] },
      { k: 'head', ty: 'ang3', p: [P(o.ear), P(o.sh), P(o.hip)] }
    ].map(function (d) {
      // المرجع يتبع المرحلة اللي يختارها المدرب (البلوك ماشي كيما السباحة)
      var pi = (CTXP[ctxOf()] || {})[d.k]; d.name = pi != null ? presetName(pi) : a('a_' + d.k);
      // كل زاوية تتحسب غير إذا النقاط تاعها يبانو (≥ 50%) — وإلا «—»، ماشي رقم مخترع
      d.vis = Math.min.apply(null, VIS[d.k].map(function (i) { return pts[i].v == null ? 1 : pts[i].v; }));
      d.v = d.vis >= 0.5 ? angOf({ ty: d.ty, pts: d.p }) : null; return d;
    });
  }

  /* ---------- الهيكل في الصورة الحالية ---------- */
  function tolF() { return 0.5 / (VS.fps || 30) + 0.004; }
  function poseAt(t) {
    var m = (VS.meas || []).filter(function (q) { return q.ty === 'pose' && Math.abs(q.t - t) <= tolF(); })[0];
    if (m) return { m: m, pts: m.pts, side: m.side, saved: true };
    if (AIS.ser) { var b = null; AIS.ser.forEach(function (f) { if (f.pts && Math.abs(f.t - t) <= tolF() && (!b || Math.abs(f.t - t) < Math.abs(b.t - t))) b = f; }); if (b) return { pts: b.pts, side: b.side, saved: false, f: b }; }
    return null;
  }
  function savePose(pts, t, side) {
    VS.meas = (VS.meas || []).filter(function (q) { return !(q.ty === 'pose' && Math.abs(q.t - t) <= tolF()); });
    var m = { id: K.uid(), t: Math.round(t * 10000) / 10000, ty: 'pose', pts: pts, side: side || sideOf(pts), col: '#38bdf8' };
    VS.meas.push(m); VS.dirty = true; return m;
  }
  var BONES = [[11, 12], [11, 13], [13, 15], [12, 14], [14, 16], [11, 23], [12, 24], [23, 24], [23, 25], [25, 27], [24, 26], [26, 28], [27, 31], [28, 32], [27, 29], [28, 30], [15, 19], [16, 20], [0, 7], [0, 8]];
  function drawPose(g, m, k, sc, ghost) {
    var P = m.pts; if (!P || !P.length) return; var side = m.side || sideOf(P), o = IDX[side];
    var main = {}; Object.keys(o).forEach(function (x) { main[o[x]] = 1; });
    g.save(); g.lineCap = 'round';
    BONES.forEach(function (b) { var p = P[b[0]], q = P[b[1]]; if (!p || !q) return; var on = main[b[0]] && main[b[1]], lo = Math.min(p.v, q.v) < 0.35; g.strokeStyle = on ? (ghost ? 'rgba(56,189,248,.75)' : '#38bdf8') : 'rgba(255,255,255,' + (lo ? 0.25 : 0.55) + ')'; g.lineWidth = (on ? 4 : 2) * sc; if (lo) g.setLineDash([5 * sc, 5 * sc]); g.beginPath(); g.moveTo(p.x * k, p.y * k); g.lineTo(q.x * k, q.y * k); g.stroke(); g.setLineDash([]); });
    P.forEach(function (p, i) { if (i > 0 && i < 7) return; if (i > 16 && i < 23 && i !== 19 && i !== 20) return; var on = main[i]; g.fillStyle = p.v < 0.35 ? '#f59e0b' : on ? '#fde047' : '#e2e8f0'; g.beginPath(); g.arc(p.x * k, p.y * k, (on ? 5.5 : 3.5) * sc, 0, 7); g.fill(); if (on) { g.strokeStyle = '#000'; g.lineWidth = 1.2 * sc; g.stroke(); } });
    if (!ghost && sc === 1) { g.font = 'bold ' + Math.round(15 * sc) + 'px sans-serif'; angDefs(P, side).forEach(function (d) { if (d.v == null || d.k === 'sh' || d.k === 'head') return; var q = d.ty === 'ang3' ? d.p[1] : d.p[1]; var s = Math.round(d.v) + '°'; g.lineWidth = 4 * sc; g.strokeStyle = '#000'; g.strokeText(s, q.x * k + 8, q.y * k - 8); g.fillStyle = '#fde047'; g.fillText(s, q.x * k + 8, q.y * k - 8); }); }
    g.restore();
  }

  /* ---------- الرسم فوق الفيديو ---------- */
  function drawOvAI(g, k, t) {
    if (AIS.roi && (VS.tool === 'roi' || VS.tool === 'pose' || AIS.open)) { g.save(); g.setLineDash([8, 6]); g.strokeStyle = 'rgba(34,211,238,.9)'; g.lineWidth = 2; g.strokeRect(AIS.roi.x * k, AIS.roi.y * k, AIS.roi.w * k, AIS.roi.h * k); g.restore(); }
    if (VS.tool === 'roi' && AIS._c1) { g.save(); g.fillStyle = '#22d3ee'; g.beginPath(); g.arc(AIS._c1.x * k, AIS._c1.y * k, 5, 0, 7); g.fill(); g.restore(); }
    var hp = poseAt(t); if (hp && !hp.saved) drawPose(g, { pts: hp.pts, side: hp.side }, k, 1, true);
    if (VS.trk2 && VS.trk2.length) { g.save(); g.strokeStyle = 'rgba(244,114,182,.9)'; g.fillStyle = '#f472b6'; g.lineWidth = 2; g.beginPath(); VS.trk2.forEach(function (q, i) { if (i) g.lineTo(q.x * k, q.y * k); else g.moveTo(q.x * k, q.y * k); }); g.stroke(); VS.trk2.forEach(function (q) { if (Math.abs(q.t - t) <= tolF()) { g.beginPath(); g.arc(q.x * k, q.y * k, 7, 0, 7); g.fill(); } }); g.restore(); }
    if (AIS.head && Math.abs(AIS.head.t - t) <= tolF()) { var s = AIS.head.s; g.save(); g.strokeStyle = '#a3e635'; g.lineWidth = 2; g.strokeRect((AIS.head.x - s / 2) * k, (AIS.head.y - s / 2) * k, s * k, s * k); g.restore(); }
    if (AIS.sug) AIS.sug.forEach(function (st) { if (Math.abs(st - t) <= tolF()) { g.save(); g.font = 'bold 18px sans-serif'; g.fillStyle = '#fbbf24'; g.strokeStyle = '#000'; g.lineWidth = 4; var tx = '🔁 ' + T('evC'); g.strokeText(tx, 12, 26); g.fillText(tx, 12, 26); g.restore(); } });
    angTable();
  }

  /* ---------- الضغط على الفيديو ---------- */
  function click(e, p) {
    var v = $('#vid');
    if (VS.tool === 'roi') {
      if (!AIS._c1) { AIS._c1 = p; drawOv(); return; }
      var c1 = AIS._c1; AIS._c1 = null; var r = { x: Math.min(c1.x, p.x), y: Math.min(c1.y, p.y), w: Math.abs(p.x - c1.x), h: Math.abs(p.y - c1.y) };
      if (r.w > 20 && r.h > 20) AIS.roi = r; setTool('roi'); render(); return;
    }
    if (VS.tool === 'head') {
      var s = Math.round(v.videoHeight * ({ s: 0.03, m: 0.05, l: 0.08 }[AIS.hs] || 0.05));
      AIS.head = { t: v.currentTime, x: p.x, y: p.y, s: Math.max(12, s) }; AIS.tpl = null; setTool('head'); K.toast(a('headOk')); render(); drawOv(); return;
    }
  }
  // سحب نقاط الهيكل
  var drag = null;
  function bindDrag() {
    var o = $('#ov'); if (!o || o._aid) return; o._aid = true;
    o.addEventListener('pointerdown', function (e) {
      if (VS.tool !== 'pose') return; var v = $('#vid'), hp = poseAt(v.currentTime); if (!hp) return;
      var p = vidPt(e), k = o.getBoundingClientRect().width / v.videoWidth, best = -1, bd = 22 / k;
      var mainI = {}, oo = IDX[hp.side || sideOf(hp.pts)]; Object.keys(oo).forEach(function (x) { mainI[oo[x]] = 1; });
      hp.pts.forEach(function (q, i) { var d = Math.hypot(q.x - p.x, q.y - p.y) * (mainI[i] ? 0.6 : 1); if (d < bd) { bd = d; best = i; } });
      if (best < 0) return; e.preventDefault(); e.stopPropagation();
      var m = hp.saved ? hp.m : savePose(JSON.parse(JSON.stringify(hp.pts)), v.currentTime, hp.side);
      drag = { m: m, i: best }; try { o.setPointerCapture(e.pointerId); } catch (er) {}
    });
    o.addEventListener('pointermove', function (e) { if (!drag) return; var p = vidPt(e); drag.m.pts[drag.i].x = p.x; drag.m.pts[drag.i].y = p.y; drag.m.pts[drag.i].v = 1; drawOv(); });
    var up = function () { if (!drag) return; drag.m.edited = true; drag = null; VS.dirty = true; drawOv(); refreshRes(); };
    o.addEventListener('pointerup', up); o.addEventListener('pointercancel', up);
  }

  /* ---------- سيك مضبوط ---------- */
  function seekTo(v, t) {
    return new Promise(function (ok) {
      var done = false, fin = function () { if (done) return; done = true; v.removeEventListener('seeked', on); clearTimeout(wd); if (v.requestVideoFrameCallback) { var w2 = setTimeout(ok, 120); v.requestVideoFrameCallback(function () { clearTimeout(w2); ok(); }); } else setTimeout(ok, 30); };
      var on = function () { fin(); }, wd = setTimeout(fin, 2500);
      v.addEventListener('seeked', on); v._tgt = null; v._busy = false; v.currentTime = Math.max(0, Math.min((v.duration || 0) - 0.001, t));
    });
  }

  /* ---------- تحليل مقطع ---------- */
  function runSeg() {
    var v = $('#vid'); if (!v || AIS.busy) return; v.pause();
    var fr = 1 / (VS.fps || 30), t0 = (Math.floor(v.currentTime / fr + 1e-3) + 0.5) * fr, dur = AIS.dur * (+VS.cfg.slow || 1), n = Math.max(2, Math.min(600, Math.round(dur / fr))), i = 0, ser = [], k = 0, last = null;
    AIS.busy = true; AIS.stop = false; AIS.sug = null; AIS.rej = 0; render();
    var fail = function () { AIS.busy = false; K.toast(a('err')); render(); };
    loadPose().then(function () {
      var next = function () {
        if (AIS.stop || i >= n || t0 + i * fr > v.duration) return finish();
        var t = t0 + i * fr; i++;
        seekTo(v, t).then(function () { return detectFrame(v, last); }).then(function (pts) {
          if (pts && conf(pts) > 0.2) { k++; var sd = sideOf(pts); ser.push({ t: v.currentTime, pts: pts, side: sd }); last = { x: (pts[11].x + pts[12].x + pts[23].x + pts[24].x) / 4, y: (pts[11].y + pts[12].y + pts[23].y + pts[24].y) / 4 }; }
          else ser.push({ t: v.currentTime, pts: null });
          AIS.prog = a('prog', { i: i, n: n }); var pe = $('#aiprog'); if (pe) pe.textContent = AIS.prog; var pb = $('#aibar'); if (pb) pb.style.width = (i / n * 100) + '%';
          if (i % 3 === 0) drawOv();
          setTimeout(next, 0);
        }).catch(function () { finish(); });
      };
      var finish = function () {
        AIS.busy = false; AIS.prog = a('segDone', { n: i, k: k }) + (AIS.rej ? ' · ' + a('rej', { n: AIS.rej }) : '');
        // الجنب الغالب في كامل المقطع
        var cnt = { R: 0, L: 0 }; ser.forEach(function (f) { if (f.pts) cnt[f.side]++; }); var sd = cnt.R >= cnt.L ? 'R' : 'L'; ser.forEach(function (f) { if (f.pts) f.side = sd; });
        AIS.ser = ser; render(); seekTo(v, t0).then(drawOv);
      };
      try { next(); } catch (e) { fail(); }
    }).catch(fail);
  }
  function serAngles() {
    if (!AIS.ser) return null; var f = +VS.cfg.slow || 1, t0 = AIS.ser[0] ? AIS.ser[0].t : 0, out = {};
    ['elbow', 'knee', 'hip', 'trunk'].forEach(function (k) { out[k] = []; });
    AIS.ser.forEach(function (fr) { if (!fr.pts) return; angDefs(fr.pts, fr.side).forEach(function (d) { if (out[d.k] && d.v != null) out[d.k].push({ x: +((fr.t - t0) / f).toFixed(3), y: Math.round(d.v * 10) / 10 }); }); });
    // تنعيم خفيف (وسيط 3 صور) باش صورة وحدة غالطة ما تخرّجش قفزة
    Object.keys(out).forEach(function (k) { var a0 = out[k]; out[k] = a0.map(function (p, i) { var w = a0.slice(Math.max(0, i - 1), i + 2).map(function (q) { return q.y; }).sort(function (x, y) { return x - y; }); return { x: p.x, y: w[Math.floor(w.length / 2)] }; }); });
    return out;
  }
  // اقتراح الدورات: أقصى امتداد لليد للقدّام (دخول اليد)
  function suggestCycles() {
    var S = (AIS.ser || []).filter(function (f) { return f.pts; }); if (S.length < 8) { AIS.sug = []; return; }
    var o = IDX[S[0].side], dir = 0; S.forEach(function (f) { dir += f.pts[0].x - (f.pts[23].x + f.pts[24].x) / 2; }); dir = dir >= 0 ? 1 : -1;
    var e = S.map(function (f) { var P = f.pts, L = Math.hypot(P[o.sh].x - P[o.hip].x, P[o.sh].y - P[o.hip].y) || 1; return { t: f.t, y: (P[o.wr].x - P[o.sh].x) * dir / L }; });
    var sm = e.map(function (p, i) { var s = 0, n = 0; for (var j = Math.max(0, i - 2); j <= Math.min(e.length - 1, i + 2); j++) { s += e[j].y; n++; } return { t: p.t, y: s / n }; });
    var ys = sm.map(function (p) { return p.y; }), lo = Math.min.apply(null, ys), hi = Math.max.apply(null, ys), rg = hi - lo; if (rg < 0.25) { AIS.sug = []; return; }
    var minGap = 0.55 * (+VS.cfg.slow || 1), peaks = [];
    for (var i = 1; i < sm.length - 1; i++) {
      if (sm[i].y >= sm[i - 1].y && sm[i].y > sm[i + 1].y && sm[i].y > lo + rg * 0.6) {
        if (peaks.length && sm[i].t - peaks[peaks.length - 1].t < minGap) { if (sm[i].y > peaks[peaks.length - 1].y) peaks[peaks.length - 1] = sm[i]; }
        else peaks.push(sm[i]);
      }
    }
    AIS.sug = peaks.map(function (p) { return Math.round(p.t * 10000) / 10000; });
  }
  function addSug() {
    var code = (VS.mode === 'arm') ? ((AIS.ser && AIS.ser.find(function (f) { return f.pts; }) || {}).side === 'L' ? 'LE' : 'RE') : 'C', n = 0;
    (AIS.sug || []).forEach(function (t) { if (!VS.ev.some(function (e) { return e.k === code && Math.abs(e.t - t) < 0.02; })) { VS.ev.push({ k: code, t: t }); n++; } });
    AIS.sug = null; VS.dirty = true; K.toast(a('cycOk', { n: n })); refresh(); render(); drawOv();
  }

  /* ---------- تتبّع الراس (مطابقة الصورة بالألوان) ---------- */
  var TC = document.createElement('canvas');
  function grab(v, cx, cy, half, sc) { // يرجّع مصفوفة RGB لمربع حول (cx,cy)
    var sz = Math.max(4, Math.round(half * 2 * sc)); TC.width = sz; TC.height = sz;
    var g = TC.getContext('2d', { willReadFrequently: true }); g.fillStyle = '#000'; g.fillRect(0, 0, sz, sz);
    g.drawImage(v, cx - half, cy - half, half * 2, half * 2, 0, 0, sz, sz);
    var d = g.getImageData(0, 0, sz, sz).data, o = new Float32Array(sz * sz * 3);
    for (var i = 0, j = 0; i < d.length; i += 4) { o[j++] = d[i]; o[j++] = d[i + 1]; o[j++] = d[i + 2]; }
    return { a: o, n: sz };
  }
  function norm(t) { var m = 0, i; for (i = 0; i < t.a.length; i++) m += t.a[i]; m /= t.a.length; var s = 0, o = new Float32Array(t.a.length); for (i = 0; i < t.a.length; i++) { o[i] = t.a[i] - m; s += o[i] * o[i]; } s = Math.sqrt(s) || 1; for (i = 0; i < o.length; i++) o[i] /= s; return { a: o, n: t.n }; }
  function match(tpl, win) { // NCC
    var n = tpl.n, W = win.n, best = -2, bx = 0, by = 0, N = n * n * 3, M = W - n + 1, S = new Float32Array(M * M);
    for (var y = 0; y <= W - n; y++) for (var x = 0; x <= W - n; x++) {
      var s = 0, s2 = 0, dot = 0, r, c, ti = 0;
      for (r = 0; r < n; r++) { var wi = ((y + r) * W + x) * 3; for (c = 0; c < n * 3; c++) { var w = win.a[wi + c]; s += w; s2 += w * w; dot += w * tpl.a[ti++]; } }
      var den = Math.sqrt(Math.max(1e-6, s2 - s * s / N)), sc = dot / den;
      S[y * M + x] = sc; if (sc > best) { best = sc; bx = x; by = y; }
    }
    var sub = function (l, c, r) { var d = l - 2 * c + r; return d < 0 ? Math.max(-0.5, Math.min(0.5, (l - r) / (2 * d))) : 0; };
    var dx = bx > 0 && bx < M - 1 ? sub(S[by * M + bx - 1], best, S[by * M + bx + 1]) : 0, dy = by > 0 && by < M - 1 ? sub(S[(by - 1) * M + bx], best, S[(by + 1) * M + bx]) : 0;
    return { s: best, x: bx + dx + n / 2, y: by + dy + n / 2 };
  }
  /* ---------- لون القبعة ---------- */
  function hsv(r, g, b) { r /= 255; g /= 255; b /= 255; var mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn, h = 0; if (d) { h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; if (h < 0) h += 360; } return [h, mx ? d / mx : 0, mx]; }
  var CC = document.createElement('canvas');
  function px(v, cx, cy, half, out) { var n = Math.max(8, Math.min(out, Math.round(half * 2))), sc = n / (half * 2); CC.width = n; CC.height = n; var g = CC.getContext('2d', { willReadFrequently: true }); g.fillStyle = '#000'; g.fillRect(0, 0, n, n); g.drawImage(v, cx - half, cy - half, half * 2, half * 2, 0, 0, n, n); return { d: g.getImageData(0, 0, n, n).data, n: n, sc: sc }; }
  function water(h, s) { return h >= 165 && h <= 220 && s < 0.9; }
  function sampleCol(v, x, y, s) {
    var P = px(v, x, y, s * 0.6, 40), hx = 0, hy = 0, ss = [], n = 0;
    for (var i = 0; i < P.d.length; i += 4) { var c = hsv(P.d[i], P.d[i + 1], P.d[i + 2]); if (c[1] < 0.35 || c[2] < 0.3 || water(c[0], c[1])) continue; hx += Math.cos(c[0] * Math.PI / 180); hy += Math.sin(c[0] * Math.PI / 180); ss.push(c[1]); n++; }
    if (n < P.n * P.n * 0.12) return null;   // لون القبعة ماهوش ظاهر
    ss.sort(function (p, q) { return p - q; }); var h = Math.atan2(hy, hx) * 180 / Math.PI; if (h < 0) h += 360;
    if (Math.hypot(hx, hy) / n < 0.8) return null;   // ألوان مخلّطة
    return { h: h, s: ss[Math.floor(ss.length / 2)] };
  }
  function findCol(v, col, cx, cy, R, s) {
    var P = px(v, cx, cy, R, 120), n = P.n, M = new Uint8Array(n * n), smin = Math.max(0.3, col.s * 0.55);
    for (var i = 0, j = 0; i < P.d.length; i += 4, j++) { var c = hsv(P.d[i], P.d[i + 1], P.d[i + 2]), dh = Math.abs(c[0] - col.h); if (dh > 180) dh = 360 - dh; M[j] = dh <= 16 && c[1] >= smin && c[2] >= 0.3 ? 1 : 0; }
    var minA = Math.max(3, Math.pow(s * P.sc, 2) * 0.06), best = null, seen = new Uint8Array(n * n), st = [];
    for (var k = 0; k < n * n; k++) {
      if (!M[k] || seen[k]) continue; var a0 = 0, sx = 0, sy = 0; st.push(k); seen[k] = 1;
      while (st.length) { var q = st.pop(), x = q % n, y = (q - x) / n; a0++; sx += x; sy += y; [q - 1, q + 1, q - n, q + n].forEach(function (z) { if (z >= 0 && z < n * n && !seen[z] && M[z] && Math.abs((z % n) - x) <= 1) { seen[z] = 1; st.push(z); } }); }
      if (a0 < minA || a0 > Math.pow(s * P.sc, 2) * 4) continue;
      var bx = sx / a0, by = sy / a0, dd = Math.hypot(bx - n / 2, by - n / 2), sc0 = a0 / (1 + dd * dd / (n * n / 16));
      if (!best || sc0 > best.sc) best = { sc: sc0, x: cx - R + bx / P.sc, y: cy - R + by / P.sc };
    }
    return best;
  }

  function runTrk() {
    var v = $('#vid'); if (!v || AIS.busy) return; if (!AIS.head) { K.toast(a('needHead')); return; }
    v.pause(); if (!mPx()) K.toast(a('needCal'));
    var H = AIS.head, half = H.s / 2, sc = Math.min(1.5, 28 / H.s), stepN = VS.trkStep || 1, fr = 1 / (VS.fps || 30), tEnd = AIS.tdur ? Math.min(v.duration, H.t + AIS.tdur * (+VS.cfg.slow || 1)) : v.duration;
    var pos = { x: H.x, y: H.y }, vel = { x: 0, y: 0 }, tpl = null, tpl0 = null, tb = (Math.floor(H.t / fr + 1e-3) + 0.5) * fr, t = tb, pts = [], n = Math.max(1, Math.round((tEnd - H.t) / (fr * stepN))), i = 0;
    AIS.busy = true; AIS.stop = false; render();
    var who = AIS.who, col = null;
    var push = function (tt, x, y) { pts.push({ t: Math.round(tt * 10000) / 10000, x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10, s: H.s }); };
    var fail = function () { AIS.busy = false; VS._live = null; K.toast(a('err')); render(); };
    seekTo(v, t).then(function () {
      col = sampleCol(v, pos.x, pos.y, H.s); AIS.col = col; if (!col) K.toast(a('capNo'));
      tpl0 = norm(grab(v, pos.x, pos.y, half, sc)); tpl = tpl0; push(v.currentTime, pos.x, pos.y);
      var next = function () {
        i++; t = tb + i * fr * stepN;
        if (AIS.stop || t > tEnd) return finish(null);
        seekTo(v, t).then(function () {
          var px = pos.x + vel.x, py = pos.y + vel.y, R = half * 2.6, nx, ny, m = { s: 0 };
          // 1) لون القبعة (أصح فوق الماء وتحت الماء) — 2) مطابقة الصورة كاحتياط
          var cf = col ? (findCol(v, col, px, py, H.s * 2.2, H.s) || findCol(v, col, px, py, H.s * 5, H.s)) : null;
          if (cf && Math.hypot(cf.x - px, cf.y - py) <= H.s * 5) { nx = cf.x; ny = cf.y; m.s = 1; }
          else { var win = grab(v, px, py, R, sc); m = match(tpl, win); nx = px - R + m.x / sc; ny = py - R + m.y / sc; if (m.s < 0.4) return finish(v.currentTime); }
          vel = { x: (nx - pos.x) * 0.7 + vel.x * 0.3, y: (ny - pos.y) * 0.7 + vel.y * 0.3 }; pos = { x: nx, y: ny }; push(v.currentTime, nx, ny);
          if (m.s > 0.7 && !cf) { var cur = norm(grab(v, nx, ny, half, sc)), mix = new Float32Array(cur.a.length); for (var j = 0; j < mix.length; j++) mix[j] = 0.6 * tpl0.a[j] + 0.25 * tpl.a[j] + 0.15 * cur.a[j]; tpl = norm({ a: mix, n: cur.n }); }
          AIS.prog = a('prog', { i: i, n: n }); var pe = $('#aiprog2'); if (pe) pe.textContent = AIS.prog; var pb = $('#aibar2'); if (pb) pb.style.width = Math.min(100, i / n * 100) + '%';
          VS._live = { x: nx, y: ny }; setTimeout(next, 0);
        }).catch(fail);
      };
      var finish = function (lostAt) {
        AIS.busy = false; VS._live = null; var a0 = pts[0].t, a1 = pts[pts.length - 1].t, T0 = trkOf(who);
        var merged = T0.filter(function (q) { return q.t < a0 - 1e-4 || q.t > a1 + 1e-4; }).concat(pts).sort(function (x, y) { return x.t - y.t; });
        if (who === 2) VS.trk2 = merged; else VS.trk = merged; VS.dirty = true;
        if (lostAt != null) { AIS.head = { t: v.currentTime, x: pos.x, y: pos.y, s: H.s }; AIS.msg = a('lost', { t: F(lostAt / (+VS.cfg.slow || 1), 2) }); K.toast(AIS.msg); }
        else { AIS.msg = a('trkDone', { n: pts.length }); K.toast(AIS.msg); }
        render(); refreshRes(); drawOv();
      };
      try { next(); } catch (e) { fail(); }
    }).catch(fail);
  }

  /* ---------- الواجهة ---------- */
  function sel(id, opts, cur) { return '<select id="' + id + '" style="width:auto;min-height:32px">' + opts.map(function (o) { return '<option value="' + o[0] + '"' + (String(o[0]) === String(cur) ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select>'; }
  function angTable() {
    var box = $('#aiang'); if (!box) return; var v = $('#vid'); if (!v) return; var hp = poseAt(v.currentTime);
    var key = hp ? (hp.saved ? hp.m.id + JSON.stringify(hp.pts[13]) + JSON.stringify(hp.pts[14]) + JSON.stringify(hp.pts[25]) + JSON.stringify(hp.pts[26]) : 's' + hp.f.t) : 'none' + L(); key += ctxOf(); if (box._k === key) return; box._k = key;
    if (!hp) { box.innerHTML = ''; return; }
    var R = refs(), ds = angDefs(hp.pts, hp.side), cf = Math.round(conf(hp.pts) * 100);
    box.innerHTML = '<div class="row small" style="gap:8px;margin:6px 0"><b>' + a('angT') + '</b>' + (hp.saved ? '' : ' <span class="muted">' + a('fromSer') + '</span>') + '<span class="chip">' + a('side') + ' : ' + a(hp.side === 'L' ? 'sL' : 'sR') + '</span><span class="chip ' + (cf >= 55 ? 'ok' : 'warn') + '">' + cf + '%</span>' + (cf < 55 ? '<span class="small">' + a('lowConf') + '</span>' : '') + (hp.saved ? '' : '<button class="btn sm" id="aikeep">' + a('keep') + '</button>') + '</div>' +
      '<div class="tbl-wrap"><table class="va-mt"><tr><th>' + pt('mName') + '</th><th>' + pt('mVal') + '</th><th>' + pt('mRef') + '</th><th></th></tr>' +
      ds.map(function (d, i) { var r = R[d.name], st = r && d.v != null ? (d.v >= r[0] && d.v <= r[1] ? 'ok' : 'out') : null; return '<tr><td style="text-align:start">' + esc(a('a_' + d.k)) + (d.name !== a('a_' + d.k) ? '<div class="small muted">' + esc(d.name) + '</div>' : '') + '</td><td class="num"><b>' + (d.v == null ? '— <small class="muted">' + a('notVis') + '</small>' : Math.round(d.v) + '°') + '</b> ' + (st ? '<span class="chip ' + (st === 'ok' ? 'ok' : 'warn') + '">' + pt(st) + '</span>' : '') + '</td><td class="num small">' + (r ? r[0] + '–' + r[1] + '°' : '—') + '</td><td>' + (d.v == null ? '' : '<button class="btn sm" data-aiadd="' + i + '">' + a('add') + '</button>') + '</td></tr>'; }).join('') + '</table></div>';
    $$('[data-aiadd]', box).forEach(function (b) { b.onclick = function () { var d = ds[+b.dataset.aiadd], m = { id: K.uid(), t: Math.round(v.currentTime * 10000) / 10000, ty: d.ty, pts: d.p.map(function (p) { return { x: p.x, y: p.y }; }), name: d.name, col: '#ffe14d', src: hp.saved && hp.m.edited ? null : 'ai' }; if (!hp.saved) savePose(JSON.parse(JSON.stringify(hp.pts)), v.currentTime, hp.side); VS.meas.push(m); VS.dirty = true; drawOv(); thumbFor(m); refreshRes(); K.toast(a('added')); }; });
    var kp = $('#aikeep'); if (kp) kp.onclick = function () { savePose(JSON.parse(JSON.stringify(hp.pts)), v.currentTime, hp.side); box._k = null; drawOv(); refreshRes(); };
  }
  function html() {
    if (!AIS.open) return '<div id="aip"></div>';
    var h = '<div id="aip" class="va-aip"><div class="row" style="gap:8px;flex-wrap:wrap"><h3 style="margin:0">' + a('title') + '</h3><span class="sp"></span><label class="small" style="margin:0">' + a('model') + '</label>' + sel('aimod', [['lite', a('m_lite')], ['full', a('m_full')], ['heavy', a('m_heavy')]], AIS.model) + '<span id="aist" class="chip ' + (AIS.st === 'ok' ? 'ok' : AIS.st === 'err' ? 'warn' : '') + '">' + a('st_' + AIS.st) + '</span></div>' +
      '<p class="small muted" style="margin:6px 0">' + a('note') + '<br>' + a('limits') + '</p>';
    // 1. الهيكل
    h += '<div class="va-aib"><b>' + a('sk') + '</b><div class="row" style="gap:6px;flex-wrap:wrap;margin-top:6px"><button class="btn sm' + (VS.tool === 'roi' ? ' pri' : '') + '" id="airoi">' + a('roi') + '</button>' + (AIS.roi ? '<button class="btn sm" id="airoic">' + a('roiClr') + '</button>' : '') + '<label class="small" style="margin:0">' + a('ctx') + '</label>' + sel('aictx', [['none', a('c_none')], ['block', a('c_block')], ['flight', a('c_flight')], ['uw', a('c_uw')], ['swim', a('c_swim')], ['turn', a('c_turn')]], ctxOf()) + '<button class="btn sm pri" id="aidet"' + (AIS.busy ? ' disabled' : '') + '>' + a('det') + '</button><button class="btn sm' + (VS.tool === 'pose' ? ' pri' : '') + '" id="aiedit">' + a('edit') + '</button></div><div class="small muted" style="margin-top:4px">' + a('roiHint') + ' ' + a('ctxH') + '</div><div id="aiang"></div></div>';
    // 2. المقطع
    var sa = serAngles();
    h += '<div class="va-aib"><b>' + a('seg') + '</b><div class="small muted">' + a('segHint') + '</div><div class="row" style="gap:6px;flex-wrap:wrap;margin-top:6px"><label class="small" style="margin:0">' + a('dur') + '</label>' + sel('aidur', [[1, '1 s'], [2, '2 s'], [3, '3 s'], [5, '5 s'], [8, '8 s']], AIS.dur) +
      (AIS.busy && AIS.mode === 'seg' ? '<button class="btn sm dan" id="aistop">' + a('stop') + '</button>' : '<button class="btn sm pri" id="airun"' + (AIS.busy ? ' disabled' : '') + '>' + a('run') + '</button>') +
      (AIS.ser ? '<button class="btn sm" id="aicyc">' + a('cyc') + '</button><button class="btn sm" id="aiserc">' + a('serClr') + '</button>' : '') + '<span class="small" id="aiprog">' + (AIS.mode === 'seg' ? AIS.prog : '') + '</span></div>' +
      (AIS.busy && AIS.mode === 'seg' ? '<div class="va-aibar"><i id="aibar"></i></div>' : '');
    if (AIS.sug) h += AIS.sug.length ? '<div class="small" style="margin-top:8px">' + a('cycSug', { n: AIS.sug.length }) + '</div><div class="row" style="gap:4px;flex-wrap:wrap;margin-top:4px">' + AIS.sug.map(function (t) { return '<a href="#" class="chip ltr" data-aisg="' + t + '">' + F(t / (+VS.cfg.slow || 1), 2) + ' s</a>'; }).join('') + '<button class="btn sm pri" id="aisgok">' + a('cycAdd') + '</button><button class="btn sm" id="aisgno">' + a('cycDrop') + '</button></div>' : '<div class="small" style="margin-top:6px">' + a('cycNone') + '</div>';
    if (sa && sa.elbow.length + sa.knee.length > 1) {
      h += '<div class="small" style="margin-top:8px"><b>' + a('serT') + '</b></div><div class="chart" style="height:200px"><canvas id="aich"></canvas></div><div class="tbl-wrap"><table><tr><th></th><th>' + a('mn') + '</th><th>' + a('mx') + '</th><th>' + a('avg') + '</th><th></th></tr>' +
        ['elbow', 'knee', 'hip', 'trunk'].map(function (k) { var ys = sa[k].map(function (p) { return p.y; }).sort(function (x, y) { return x - y; }); if (!ys.length) return '<tr><td style="text-align:start">' + a('a_' + k) + '</td><td colspan="4" class="small muted">— ' + a('notVis') + '</td></tr>'; var q = function (pp) { return ys[Math.min(ys.length - 1, Math.max(0, Math.round((ys.length - 1) * pp)))]; }, mn = q(0.1), mx = q(0.9), av = q(0.5); return '<tr><td style="text-align:start">' + a('a_' + k) + '</td><td class="num">' + Math.round(mn) + '°</td><td class="num">' + Math.round(mx) + '°</td><td class="num">' + Math.round(av) + '°</td><td class="num small muted">' + ys.length + ' ' + a('nFr') + '</td></tr>'; }).join('') + '</table></div><p class="small muted">' + a('robust') + ' · ' + a('avg') + ' = ' + (L() === 'fr' ? 'médiane' : 'الوسيط') + '</p>';
    }
    h += '</div>';
    // 3. التتبّع
    h += '<div class="va-aib"><b>' + a('trk') + '</b><div class="small muted">' + a('trkHint') + '</div><div class="row" style="gap:6px;flex-wrap:wrap;margin-top:6px"><label class="small" style="margin:0">' + a('size') + '</label>' + sel('aihs', [['s', a('sz_s')], ['m', a('sz_m')], ['l', a('sz_l')]], AIS.hs) +
      '<label class="small" style="margin:0">' + a('who') + '</label>' + sel('aiwho', [[1, a('sw1')], [2, a('sw2')]], AIS.who) + '<button class="btn sm' + (VS.tool === 'head' ? ' pri' : '') + '" id="aihead">' + a('pick') + '</button>' + (AIS.head ? '<span class="chip ok">✓</span>' : '') +
      '<label class="small" style="margin:0">' + a('dur') + '</label>' + sel('aitd', [[2, '2 s'], [5, '5 s'], [10, '10 s'], [20, '20 s'], [0, a('toEnd')]], AIS.tdur) +
      '<label class="small" style="margin:0">' + a('every') + '</label>' + sel('aitst', [[1, '1'], [2, '2'], [3, '3'], [5, '5']], VS.trkStep || 1) + '<span class="small">' + a('img') + '</span>' +
      (AIS.busy && AIS.mode === 'trk' ? '<button class="btn sm dan" id="aistop2">' + a('stop') + '</button>' : '<button class="btn sm pri" id="aitrk"' + (AIS.busy ? ' disabled' : '') + '>' + a('go') + '</button>') + '<span class="small" id="aiprog2">' + (AIS.mode === 'trk' ? (AIS.busy ? AIS.prog : AIS.msg) : '') + '</span></div>' +
      (AIS.busy && AIS.mode === 'trk' ? '<div class="va-aibar"><i id="aibar2"></i></div>' : '') +
      (AIS.col ? '<div class="small" style="margin-top:6px">' + a('capCol') + ' <span style="display:inline-block;width:14px;height:14px;border-radius:50%;vertical-align:middle;background:hsl(' + Math.round(AIS.col.h) + ',90%,55%)"></span></div>' : '') +
      (VS.trk2 && VS.trk2.length ? '<div class="small" style="margin-top:6px"><span style="color:#f472b6">●</span> ' + a('trk2') + ' : ' + VS.trk2.length + ' <button class="btn sm" id="aitrk2c">' + a('clr2') + '</button></div>' : '') + '</div>';
    return h + '</div>';
  }
  function render() { var el = $('#aip'); if (!el) return; el.outerHTML = html(); bind(); var tb = $('#tools'); if (tb) { tb.outerHTML = toolBar(); bindTools(); } }
  function bind() {
    bindDrag();
    var on = function (id, f) { var el = $(id); if (el) el.onclick = f; };
    var ch = function (id, f) { var el = $(id); if (el) el.onchange = f; };
    ch('#aimod', function () { AIS.model = this.value; AIS.st = (LM && LMK === AIS.model) ? 'ok' : 'none'; persist(); stat(); });
    on('#airoi', function () { AIS._c1 = null; setTool('roi'); render(); });
    on('#airoic', function () { AIS.roi = null; render(); drawOv(); });
    on('#aiedit', function () { setTool('pose'); render(); });
    on('#aidet', function () {
      var v = $('#vid'); if (!v || AIS.busy) return; v.pause(); var b = this; b.disabled = true; b.textContent = a('busy'); AIS.rej = 0;
      detectFrame(v).then(function (pts) {
        b.disabled = false; b.textContent = a('det');
        if (!pts || conf(pts) < 0.2) { K.toast(a(AIS.rej ? 'notPlaus' : 'noPose')); return; }
        var m = savePose(pts, v.currentTime); thumbFor(m); K.toast(a('found', { p: Math.round(conf(pts) * 100) })); drawOv(); refreshRes();
      }).catch(function () { b.disabled = false; b.textContent = a('det'); });
    });
    ch('#aidur', function () { AIS.dur = +this.value; });
    ch('#aictx', function () { AIS.ctx = this.value; var b = $('#aiang'); if (b) b._k = null; angTable(); });
    on('#airun', function () { AIS.mode = 'seg'; runSeg(); });
    on('#aistop', function () { AIS.stop = true; });
    on('#aistop2', function () { AIS.stop = true; });
    on('#aicyc', function () { suggestCycles(); render(); drawOv(); });
    on('#aiserc', function () { AIS.ser = null; AIS.sug = null; render(); drawOv(); });
    on('#aisgok', addSug);
    on('#aisgno', function () { AIS.sug = null; render(); drawOv(); });
    $$('[data-aisg]').forEach(function (x) { x.onclick = function (e) { e.preventDefault(); var v = $('#vid'); v.pause(); seekV(v, +x.dataset.aisg); }; });
    ch('#aihs', function () { AIS.hs = this.value; if (AIS.head) { var v = $('#vid'); AIS.head.s = Math.max(12, Math.round(v.videoHeight * ({ s: 0.03, m: 0.05, l: 0.08 }[AIS.hs]))); drawOv(); } });
    on('#aihead', function () { setTool('head'); render(); });
    ch('#aitd', function () { AIS.tdur = +this.value; });
    ch('#aiwho', function () { AIS.who = +this.value; AIS.head = null; render(); drawOv(); });
    on('#aitrk2c', function () { VS.trk2 = []; VS.dirty = true; render(); drawOv(); });
    ch('#aitst', function () { VS.trkStep = +this.value; });
    on('#aitrk', function () { AIS.mode = 'trk'; runTrk(); });
    var sa = serAngles();
    if (window.Chart && sa && $('#aich')) {
      var o = K.chartBase(); o.scales = { x: { type: 'linear', title: { display: true, text: 's' } }, y: { title: { display: true, text: '°' } } };
      var col = { elbow: '#fde047', knee: '#38bdf8', hip: '#a3e635', trunk: '#f472b6' };
      K.mk('aich', { type: 'line', data: { datasets: ['elbow', 'knee', 'hip', 'trunk'].map(function (k) { return { label: a('a_' + k), data: sa[k], borderColor: col[k], backgroundColor: col[k], tension: 0.3, pointRadius: 1.5 }; }) }, options: o });
    }
    angTable();
  }
  function toggle() { AIS.open = !AIS.open; persist(); if (!AIS.open && /^(roi|pose|head)$/.test(VS.tool || '')) setTool(VS.tool); render(); drawOv(); }
  function reset() { AIS.ser = null; AIS.sug = null; AIS.head = null; AIS.roi = null; AIS.col = null; VS._live = null; }

  window.WAI = { plaus: plaus, sampleCol: sampleCol, findCol: findCol, detectFrame: detectFrame, loadPose: loadPose, angDefs: angDefs, a: a, html: html, bind: bind, render: render, toggle: toggle, drawPose: drawPose, drawOv: drawOvAI, click: click, reset: reset, isOpen: function () { return AIS.open; }, _s: AIS, _sug: suggestCycles, _ang: angDefs };
})();
