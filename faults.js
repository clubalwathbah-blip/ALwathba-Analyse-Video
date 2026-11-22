/* MR WATHBA ANALYSE VIDÉO · BY OKBA — 🔧 الأخطاء والتصحيح
   القاعدة: ما يتكتب حتى خطأ إلا من رقم صحيح:
   - قياس دارو المدرب، ولا قياس من الـ AI أكّدو المدرب (✓)
   - ولا أوقات من العلامات اللي حطها المدرب
   المدرب يقدر يخبّي أي خطأ ولا يبدّل التصحيح والتمرين (يتحفظو مع التحليل). */
(function () {
  'use strict';
  var X = window.VAX, K = window.VO2CORE, $ = K.$, $$ = K.$$, esc = K.esc;
  var L = X.L, VS = X.VS;

  var FD = {
    title: ['🔧 الأخطاء والتصحيح', '🔧 Erreurs et corrections'],
    none: ['ما لقيناش أخطاء في القياسات والأوقات المؤكدة ✓', 'Aucune erreur sur les mesures et temps confirmés ✓'],
    empty: ['باش تخرج الأخطاء: قيس الزوايا (📐) ولا أكّد قياسات الـ AI، وحط علامات السباق.', 'Pour obtenir les erreurs : mesurez les angles (📐) ou confirmez les mesures IA, et placez les repères.'],
    pend: ['🤖 {n} قياسات من الـ AI ما تأكدوش: ما دخلوش هنا. أكّدهم في «📐 القياسات».', '🤖 {n} mesures IA non confirmées : non prises en compte. Confirmez-les dans « 📐 Mesures ».'],
    val: ['القيمة', 'Valeur'], ref: ['المرجع', 'Réf.'], why: ['علاش مهم', 'Pourquoi'], cue: ['التصحيح', 'Correction'], drill: ['التمرين', 'Exercice'], note: ['ملاحظة المدرب', 'Note de l’entraîneur'],
    hide: ['👁 خبّي', '👁 Masquer'], show: ['إظهار', 'Afficher'], hidden: ['مخبّيين ({n})', 'Masquées ({n})'], go: ['▶ شوف', '▶ Voir'], edit: ['✎ بدّل', '✎ Modifier'], save: ['حفظ', 'OK'],
    s_m: ['📐 قياس', '📐 mesure'], s_t: ['⏱ أوقات', '⏱ temps'], c_c: ['✋ مأكد', '✋ confirmé'], n_m: ['{n} قياسات', '{n} mesures'],
    a_start: ['الانطلاقة', 'Départ'], a_uw: ['الكولي', 'Coulée'], a_swim: ['السباحة', 'Nage'], a_turn: ['الدورة', 'Virage'], a_fin: ['الوصول', 'Arrivée'],
    rep: ['الأخطاء والتصحيح', 'Erreurs et corrections'], repNone: ['ما كاينش أخطاء في الأرقام المؤكدة.', 'Aucune erreur sur les données confirmées.'],
    refNote: ['المراجع تقريبية وتتبدّل في «📐 القياسات» حسب العمر والمستوى.', 'Références indicatives, modifiables dans « 📐 Mesures » selon l’âge et le niveau.']
  };
  function f(k, o, lg) { var v = FD[k], s = v ? ((lg || L()) === 'fr' ? v[1] : v[0]) : k; if (o) Object.keys(o).forEach(function (x) { s = s.split('{' + x + '}').join(o[x]); }); return s; }
  function tl(v, lg) { return (lg || L()) === 'fr' ? v[1] : v[0]; }

  /* ---------- مكتبة الأخطاء ---------- */
  // قياسات: p = رقم الإعداد في MPRE، dir = 'lo' (تحت المرجع) ولا 'hi' (فوق المرجع)
  var MR = [
    { k: 'elbow_lo', p: 0, dir: 'lo', a: 'swim',
      t: ['المرفق مسكّر بزاف في الشد', 'Coude trop fermé pendant la traction'],
      why: ['الشد يقصر واليد ما تدفعش الماء للور مليح: قوة ضايعة في كل دورة.', 'Traction raccourcie, la main pousse moins d’eau vers l’arrière : force perdue à chaque cycle.'],
      cue: ['«طوّل الشد: اليد تبعد شوية على الجسم وتدفع الماء للور حتى الفخذ.»', '« Allonge la traction : la main s’écarte un peu du corps et pousse l’eau jusqu’à la cuisse. »'],
      dr: ['Sculling أمامي 4×25 م · كرول بالقبضة مسكّرة 4×25 م', 'Godille avant 4×25 m · crawl poings fermés 4×25 m'] },
    { k: 'elbow_hi', p: 0, dir: 'hi', a: 'swim',
      t: ['المرفق مفتوح بزاف (ذراع مستقيمة) في الشد', 'Coude trop ouvert (bras tendu) pendant la traction'],
      why: ['اليد «تزلق» في الماء وما تمسكش، والكتف يتعب ويتضرّ.', 'La main glisse sans prendre appui, l’épaule se fatigue et s’expose.'],
      cue: ['«المرفق عالي: اليد تحت المرفق، والساعد يولّي عمودي بكري في الشد.»', '« Coude haut : main sous le coude, avant-bras vertical tôt dans la traction. »'],
      dr: ['Sculling 4×25 م · Catch-up بالمرفق العالي 4×25 م · Doggy paddle 2×25 م', 'Godille 4×25 m · rattrapé coude haut 4×25 m · nage du chien 2×25 m'] },
    { k: 'kblock_hi', p: 1, dir: 'hi', a: 'start',
      t: ['الركبة مفتوحة بزاف فوق البلوك', 'Genou trop tendu sur le plot'],
      why: ['ما كاينش «نابض»: الدفعة قصيرة والطيران ضعيف.', 'Pas de « ressort » : poussée courte, envol faible.'],
      cue: ['«انزل بالورك شوية والوزن للقدام على رجل القدام.»', '« Descends un peu les hanches, poids vers l’avant sur le pied avant. »'],
      dr: ['Track start من البلوك 3×4 مع ثبات 2 ث في «Prêt» · قفز من القرفصاء في البر 3×8', 'Départs track 3×4 avec 2 s d’immobilité à « Prêt » · squat jumps à sec 3×8'] },
    { k: 'kblock_lo', p: 1, dir: 'lo', a: 'start',
      t: ['الركبة مطوية بزاف فوق البلوك', 'Genou trop fléchi sur le plot'],
      why: ['يتعطّل فوق البلوك قبل ما يخرج: وقت البلوك يطول.', 'Il reste trop longtemps sur le plot : temps de bloc allongé.'],
      cue: ['«ارفع الورك شوية: الركبة بين 125° و145°.»', '« Remonte un peu les hanches : genou entre 125° et 145°. »'],
      dr: ['انطلاقات على الصفارة 2×5 مع قياس وقت البلوك', 'Départs au signal 2×5 en chronométrant le temps de bloc'] },
    { k: 'kwall_lo', p: 2, dir: 'lo', a: 'turn',
      t: ['مطوي بزاف على الحيط (قريب بزاف)', 'Trop groupé au mur (trop près)'],
      why: ['الدورة تطول والدفعة تولّي ثقيلة.', 'Le virage s’allonge et la poussée devient lourde.'],
      cue: ['«ابدا الشقلبة بعيد شوية: الركبة قرابة 110° كي يلمسو الرجلين.»', '« Culbute un peu plus loin : genou vers 110° au contact. »'],
      dr: ['دورات في نص المسبح بلا حيط 4× · دورات من 5 م مع العد 3×6', 'Culbutes en pleine eau 4× · virages depuis 5 m en comptant 3×6'] },
    { k: 'kwall_hi', p: 2, dir: 'hi', a: 'turn',
      t: ['بعيد على الحيط (الرجلين ممدودين)', 'Trop loin du mur (jambes tendues)'],
      why: ['ما يقدرش يدفع بقوة: الخروج من الحيط بطيء.', 'Impossible de pousser fort : sortie de mur lente.'],
      cue: ['«قرّب للحيط قبل الشقلبة: الركبة مطوية قرابة 110° قبل الدفعة.»', '« Rapproche-toi avant la culbute : genou vers 110° avant de pousser. »'],
      dr: ['دورات من 5 م مع علامة (الخط في القاع) 3×6', 'Virages depuis 5 m avec repère au fond 3×6'] },
    { k: 'entry_hi', p: 3, dir: 'hi', a: 'start',
      t: ['الدخول للماء عمودي بزاف', 'Entrée dans l’eau trop verticale'],
      why: ['يغطس عميق ويضيّع الوقت باش يطلع.', 'Il plonge trop profond et perd du temps à remonter.'],
      cue: ['«اطلق للقدام ماشي للفوق، وادخل من نقطة وحدة بزاوية 30–45°.»', '« Pousse vers l’avant, pas vers le haut ; entrée par un seul point à 30–45°. »'],
      dr: ['انطلاقات فوق نودل ولا حبل (يدخل من فوقو) 3×4', 'Départs par-dessus une frite ou une corde 3×4'] },
    { k: 'entry_lo', p: 3, dir: 'lo', a: 'start',
      t: ['الدخول للماء مسطّح (يطيح بالبطن)', 'Entrée à plat (« plat ventre »)'],
      why: ['الجسم يضرب الماء ويتفرمل.', 'Le corps frappe l’eau et freine.'],
      cue: ['«ارفع الورك في الطيران: اليدين ثم الراس ثم الورك يدخلو من نفس الثقبة.»', '« Monte les hanches en vol : mains, tête puis hanches entrent par le même trou. »'],
      dr: ['انطلاقات من الحافة «من ثقبة وحدة» 3×4', 'Départs du bord « un seul trou » 3×4'] },
    { k: 'tilt_hi', p: 4, dir: 'hi', a: 'swim',
      t: ['الورك والرجلين هابطين (الجسم مايل)', 'Hanches et jambes basses (corps incliné)'],
      why: ['الجسم يقابل الماء بسطح كبير: المقاومة تكبر بزاف.', 'Le corps présente plus de surface : la résistance augmente fortement.'],
      cue: ['«الراس في الماء والعين للتحت، اضغط بالصدر، والرجلين يضربو من الورك.»', '« Tête dans l’eau, regard vers le fond, appuie avec la poitrine, battements depuis la hanche. »'],
      dr: ['رجلين بلا لوحة في Streamline 4×25 م · Superman glide 4×12.5 م', 'Battements sans planche en flèche 4×25 m · glisse « Superman » 4×12,5 m'] },
    { k: 'head_lo', p: 9, dir: 'lo', a: 'uw',
      t: ['الراس ماهوش في الخط في الكولي', 'Tête hors de l’alignement en coulée'],
      why: ['الجسم يخرج من الخط ويتفرمل تحت الماء.', 'Le corps sort de l’alignement et freine sous l’eau.'],
      cue: ['«الراس بين الذراعين، الأذنين تحت الذراعين، العين للتحت.»', '« Tête entre les bras, oreilles sous les bras, regard vers le fond. »'],
      dr: ['Push & glide من الحيط في Streamline 6×', 'Coulées « flèche » depuis le mur 6×'] },
    { k: 'stream_hi', p: 10, dir: 'hi', a: 'uw',
      t: ['الجسم ماهوش مستقيم في الكولي', 'Corps pas aligné en coulée'],
      why: ['أي ميلان في الكولي يزيد المقاومة ويقصّر المسافة.', 'Toute inclinaison en coulée augmente la résistance et réduit la distance.'],
      cue: ['«شد البطن واضغط الذراعين على الأذنين: الجسم كيما السهم.»', '« Gainage, bras serrés sur les oreilles : le corps comme une flèche. »'],
      dr: ['Push & glide + 4 ضربات دولفين 6×', 'Coulée + 4 ondulations 6×'] }
  ];
  // أوقات من العلامات
  var TR = [
    { k: 'rt', a: 'start', ref: '0.50–0.85 s',
      get: function (D) { return D.c.start === 'dive' ? D.r.rt : null; }, bad: function (v) { return v > 0.85 && v < 1.6; }, fmt: function (v) { return v.toFixed(2) + ' s'; }, ev: 'S',
      t: ['ردة الفعل بطيئة', 'Temps de réaction lent'],
      why: ['كل جزء من الثانية يضيع هنا يضيع على كامل السباق.', 'Chaque centième perdu ici l’est pour toute la course.'],
      cue: ['«ركّز على الصوت، الوزن للقدام، وابدا الحركة باليدين.»', '« Concentre-toi sur le son, poids vers l’avant, démarre par les bras. »'],
      dr: ['انطلاقات على الصفارة بأوقات انتظار مختلفة 2×5', 'Départs au signal avec attentes variables 2×5'] },
    { k: 'kicks', a: 'uw', ref: '3–8',
      get: function (D) { return /^(NL|PAP|DOS|FLY|BK|FR)/.test(D.c.stroke || 'NL') && D.X.st.kicks ? D.X.st.kicks : null; }, bad: function (v) { return v < 3; }, fmt: function (v) { return String(v); }, ev: 'HE',
      t: ['قليل الضربات تحت الماء بعد الانطلاقة', 'Peu d’ondulations après le départ'],
      why: ['الكولي أسرع من السباحة في أول 15 م.', 'La coulée est plus rapide que la nage sur les 15 premiers mètres.'],
      cue: ['«بعد الدخول: 3 حتى 6 ضربات دولفين قوية وسريعة قبل أول ذراع.»', '« Après l’entrée : 3 à 6 ondulations fortes et rapides avant le 1er bras. »'],
      dr: ['Push + 5 ضربات دولفين 6× · دولفين على الظهر 4×15 م', 'Coulée + 5 ondulations 6× · ondulations sur le dos 4×15 m'] },
    { k: 'brk', a: 'uw', ref: '5–15 m',
      get: function (D) { return D.c.start === 'dive' && D.r.laps[0] ? D.r.laps[0].brkD : null; }, bad: function (v) { return v < 5; }, fmt: function (v) { return v.toFixed(1) + ' m'; }, ev: 'B',
      t: ['يطلع من الماء بكري بزاف (قبل 5 م)', 'Sortie de coulée trop tôt (avant 5 m)'],
      why: ['ما استغلش السرعة تاع الانطلاقة.', 'La vitesse du départ n’est pas exploitée.'],
      cue: ['«ابقى تحت الماء حتى 6–10 م، واطلع بأول ذراع قوية.»', '« Reste sous l’eau jusqu’à 6–10 m, sors sur un 1er bras puissant. »'],
      dr: ['انطلاقات + كولي حتى علامة 8 م 3×4', 'Départs + coulée jusqu’au repère 8 m 3×4'] },
    { k: 'cont', a: 'turn', ref: '≤ 0.45 s',
      get: function (D) { if (!/^(NL|DOS|FR|BK)/.test(D.c.stroke || 'NL')) return null; var a = D.X.turns.map(function (t) { return t.cont; }).filter(function (x) { return x != null; }); return a.length ? a.reduce(function (p, q) { return p + q; }, 0) / a.length : null; }, bad: function (v) { return v > 0.45; }, fmt: function (v) { return v.toFixed(2) + ' s'; }, ev: 'W',
      t: ['الرجلين يطوّلو على الحيط في الدورة', 'Contact trop long au mur'],
      why: ['الوقت على الحيط وقت ضايع: الدفعة لازم تكون سريعة.', 'Le temps au mur est du temps perdu : la poussée doit être explosive.'],
      cue: ['«الرجلين يلمسو ويدفعو مباشرة، بلا ما يستناو.»', '« Les pieds touchent et poussent aussitôt, sans attendre. »'],
      dr: ['دورات سريعة «لمس-دفع» 3×6 مع عدّ المدرب', 'Virages « touche-pousse » 3×6, rythmés par l’entraîneur'] },
    { k: 'turn', a: 'turn', ref: '≥ 0 %',
      get: function (D) { return D.r.turn != null && D.r.v ? ((10 / D.r.turn) / D.r.v - 1) * 100 : null; }, bad: function (v) { return v < 0; }, fmt: function (v) { return v.toFixed(0) + ' %'; }, ev: 'W',
      t: ['الدورة أبطأ من السباحة', 'Virage plus lent que la nage'],
      why: ['دورة مليحة لازم تكون أسرع من السباحة (الدفعة من الحيط).', 'Un bon virage doit être plus rapide que la nage (poussée du mur).'],
      cue: ['«ما تنقصش السرعة قبل الحيط، والدفعة في Streamline.»', '« Ne ralentis pas avant le mur, pousse en flèche. »'],
      dr: ['25 م سريعة مع دورة في النص 4× · دورات من 5 م 3×6', '25 m rapides avec virage au milieu 4× · virages depuis 5 m 3×6'] },
    { k: 'fade', a: 'swim', ref: '≤ 8 %',
      get: function (D) { return D.r.vDrop != null ? D.r.vDrop : null; }, bad: function (v) { return v > 8; }, fmt: function (v) { return '−' + v.toFixed(1) + ' %'; }, ev: null,
      t: ['السرعة تطيح بزاف مع التعب', 'Vitesse qui chute avec la fatigue'],
      why: ['السباح يبدا قوي ويخلّص ضعيف: التوزيع ولا التحمّل.', 'Départ fort, fin faible : répartition de l’effort ou endurance.'],
      cue: ['«ابدا بإيقاع تقدر تحافظ عليه، وحافظ على طول الضربة حتى اللخر.»', '« Pars à un rythme tenable et garde l’amplitude jusqu’au bout. »'],
      dr: ['تكرارات 4×50 م بنفس الوقت (± 0.5 ث) · سلسلة Negative split', 'Séries 4×50 m à temps constant (± 0,5 s) · négative split'] },
    { k: 'fin', a: 'fin', ref: '≥ −10 %',
      get: function (D) { if (D.r.fin5 == null) return null; var vl = D.r.laps.filter(function (l) { return l.v; }), vL = vl.length ? vl[vl.length - 1].v : D.r.v; return vL ? ((5 / D.r.fin5) / vL - 1) * 100 : null; }, bad: function (v) { return v < -10; }, fmt: function (v) { return v.toFixed(0) + ' %'; }, ev: 'F',
      t: ['النهاية بطيئة (آخر 5 م)', 'Arrivée lente (5 derniers m)'],
      why: ['يضيّع الوقت قبل اللمس: يتنفس ولا ينقص الضربات.', 'Temps perdu avant la touche : respiration ou glisse.'],
      cue: ['«ما تتنفسش في آخر 5 م، ومد اليد للحيط بلا ما تنقص السرعة.»', '« Pas de respiration sur les 5 derniers m, allonge vers le mur sans ralentir. »'],
      dr: ['نهايات 10 م بلا تنفس 6× · لمس الحيط بيد ممدودة', 'Arrivées 10 m sans respirer 6× · touche bras tendu'] }
  ];

  /* ---------- الحساب ---------- */
  function nameOk(m, p) { return m.name === p.n[0] || m.name === p.n[1]; }
  function med(a) { a = a.slice().sort(function (x, y) { return x - y; }); return a[Math.floor((a.length - 1) / 2)]; }
  function evaluate(src) {
    var c = src.cfg, fx = c.fx || {}, out = [], R = X.refs(), M = src.meas || [];
    var ok = M.filter(function (m) { return (m.ty === 'ang3' || m.ty === 'angH') && (!m.src || m.ok); });
    var pend = M.filter(function (m) { return (m.ty === 'ang3' || m.ty === 'angH') && m.src === 'ai' && !m.ok; }).length;
    MR.forEach(function (rule) {
      var p = X.MPRE[rule.p]; if (!p) return; var r = R[p.n[0]] || R[p.n[1]]; if (!r) return;
      var ms = ok.filter(function (m) { return nameOk(m, p); }); if (!ms.length) return;
      var vals = ms.map(function (m) { return X.angOf(m); }).filter(function (v) { return v != null; }); if (!vals.length) return;
      var v = med(vals); if (!(rule.dir === 'lo' ? v < r[0] : v > r[1])) return;
      var m0 = ms.slice().sort(function (a, b) { return Math.abs(X.angOf(b) - v) - Math.abs(X.angOf(a) - v); }).pop();
      out.push({ k: rule.k, a: rule.a, rule: rule, val: Math.round(v) + '°', ref: r[0] + '–' + r[1] + '°', src: 'm', n: vals.length, t: m0.t, mid: m0.id });
    });
    var D = null;
    if ((src.ev || []).length) { try { D = { c: c, r: X.compute(c, src.ev), X: X.computeX(c, src.ev) }; } catch (e) { D = null; } }
    if (D) TR.forEach(function (rule) {
      var v = rule.get(D); if (v == null || !isFinite(v) || !rule.bad(v)) return;
      var e = rule.ev ? (src.ev || []).filter(function (x) { return x.k === rule.ev; })[0] : null;
      out.push({ k: rule.k, a: rule.a, rule: rule, val: rule.fmt(v), ref: rule.ref, src: 't', t: e ? e.t : null });
    });
    var order = { start: 0, uw: 1, swim: 2, turn: 3, fin: 4 };
    out.sort(function (a, b) { return order[a.a] - order[b.a]; });
    out.forEach(function (x) { var o = fx[x.k] || {}; x.o = o; x.off = !!o.off; x.cue = o.cue || tl(x.rule.cue); x.dr = o.dr || tl(x.rule.dr); x.note = o.note || ''; });
    return { list: out, pend: pend };
  }

  /* ---------- الشاشة ---------- */
  function curSrc() { return { cfg: VS.cfg, ev: VS.ev, meas: VS.meas || [], id: VS.id }; }
  function html() {
    if (!VS.cfg) return '';
    var E = evaluate(curSrc()), on = E.list.filter(function (x) { return !x.off; }), off = E.list.filter(function (x) { return x.off; });
    var h = '<div class="card va-fx" id="vfx"><h3>' + f('title') + '</h3>';
    if (E.pend) h += '<div class="small" style="color:var(--warn);margin-bottom:8px">' + f('pend', { n: E.pend }) + '</div>';
    if (!E.list.length) h += '<p class="small muted">' + ((VS.meas || []).length || VS.ev.length > 3 ? f('none') : f('empty')) + '</p>';
    h += on.map(function (x) {
      return '<div class="va-fxi"><div class="row" style="gap:8px;flex-wrap:wrap"><span class="chip">' + f('a_' + x.a) + '</span><b class="sp" style="color:var(--bad)">❌ ' + esc(tl(x.rule.t)) + '</b>' +
        '<span class="chip warn num">' + esc(x.val) + '</span><span class="small muted">' + f('ref') + ' ' + esc(x.ref) + '</span></div>' +
        '<div class="small muted" style="margin:4px 0">' + (x.src === 'm' ? f('s_m') + ' · ' + f('n_m', { n: x.n }) : f('s_t')) + ' · ' + f('c_c') + '</div>' +
        '<div class="small"><b>' + f('why') + ' :</b> ' + esc(tl(x.rule.why)) + '</div>' +
        '<div class="small" style="margin-top:4px"><b style="color:var(--ok)">✅ ' + f('cue') + ' :</b> <span data-fxt="cue" data-fk="' + x.k + '">' + esc(x.cue) + '</span></div>' +
        '<div class="small" style="margin-top:4px"><b>🏋 ' + f('drill') + ' :</b> <span data-fxt="dr" data-fk="' + x.k + '">' + esc(x.dr) + '</span></div>' +
        (x.note ? '<div class="small" style="margin-top:4px"><b>📝 ' + f('note') + ' :</b> ' + esc(x.note) + '</div>' : '') +
        '<div class="row" style="gap:6px;margin-top:6px">' + (x.t != null ? '<button class="btn sm" data-fxgo="' + x.t + '">' + f('go') + '</button>' : '') + '<button class="btn sm" data-fxe="' + x.k + '">' + f('edit') + '</button><button class="btn sm" data-fxh="' + x.k + '">' + f('hide') + '</button></div><div data-fxf="' + x.k + '"></div></div>';
    }).join('');
    if (off.length) h += '<details class="small" style="margin-top:8px"><summary>' + f('hidden', { n: off.length }) + '</summary>' + off.map(function (x) { return '<div class="row" style="gap:8px;margin-top:4px"><span class="sp">' + esc(tl(x.rule.t)) + ' (' + esc(x.val) + ')</span><button class="btn sm" data-fxs="' + x.k + '">' + f('show') + '</button></div>'; }).join('') + '</details>';
    if (E.list.length) h += '<p class="small muted" style="margin-top:8px">' + f('refNote') + '</p>';
    return h + '</div>';
  }
  function fxSet(k, o) { VS.cfg.fx = VS.cfg.fx || {}; VS.cfg.fx[k] = Object.assign(VS.cfg.fx[k] || {}, o); VS.dirty = true; X.refreshRes(); }
  function bind() {
    $$('[data-fxgo]').forEach(function (b) { b.onclick = function () { var v = $('#vid'); if (v) { v.pause(); X.seekV(v, +b.dataset.fxgo); v.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }; });
    $$('[data-fxh]').forEach(function (b) { b.onclick = function () { fxSet(b.dataset.fxh, { off: true }); }; });
    $$('[data-fxs]').forEach(function (b) { b.onclick = function () { fxSet(b.dataset.fxs, { off: false }); }; });
    $$('[data-fxe]').forEach(function (b) { b.onclick = function () {
      var k = b.dataset.fxe, x = evaluate(curSrc()).list.find(function (q) { return q.k === k; }), box = $('[data-fxf="' + k + '"]'); if (!x || !box) return;
      box.innerHTML = '<div class="f" style="margin-top:6px"><label>✅ ' + f('cue') + '</label><textarea rows="2" data-fxi="cue">' + esc(x.cue) + '</textarea></div><div class="f"><label>🏋 ' + f('drill') + '</label><textarea rows="2" data-fxi="dr">' + esc(x.dr) + '</textarea></div><div class="f"><label>📝 ' + f('note') + '</label><textarea rows="2" data-fxi="note">' + esc(x.note) + '</textarea></div><button class="btn sm pri" data-fxok="1">' + f('save') + '</button>';
      $('[data-fxok]', box).onclick = function () { var o = {}; $$('[data-fxi]', box).forEach(function (t) { var v = t.value.trim(), d = t.dataset.fxi === 'cue' ? tl(x.rule.cue) : t.dataset.fxi === 'dr' ? tl(x.rule.dr) : ''; o[t.dataset.fxi] = v && v !== d ? v : ''; }); fxSet(k, o); };
    }; });
  }

  /* ---------- التقرير ---------- */
  function prep(src) {
    var E = evaluate(src), L2 = E.list.filter(function (x) { return !x.off; }), mi = src.mimg || {};
    return Promise.all(L2.map(function (x) { return new Promise(function (ok) { var s = x.mid && mi[x.mid]; if (!s) return ok(null); var i = new Image(); i.onload = function () { ok(i); }; i.onerror = function () { ok(null); }; i.src = s; }); }))
      .then(function (imgs) { return { list: L2, imgs: imgs }; });
  }
  function drawRep(D, P, lg) {
    if (!P) return D.y;
    var y = D.title(f('rep', null, lg), D.y), W = D.W, M = D.M;
    if (!P.list.length) { y += D.wrap(f('repNone', null, lg), M + 10, y + 20, W - 2 * M - 20, { s: 19, c: '#047857' }) + 20; return y; }
    P.list.forEach(function (x, i) {
      var im = P.imgs[i], iw = im ? 300 : 0, ih = im ? im.height * iw / im.width : 0, tw = W - 2 * M - 40 - (im ? iw + 20 : 0), y0 = y;
      // نقيسو الطول قبل الرسم
      var c0 = document.createElement('canvas').getContext('2d'), FN = '"IBM Plex Sans Arabic","Inter",sans-serif';
      var lines = function (s, sz) { c0.font = '500 ' + sz + 'px ' + FN; var w = String(s).split(' '), l = '', n = 1; w.forEach(function (q) { var t = l ? l + ' ' + q : q; if (c0.measureText(t).width > tw && l) { n++; l = q; } else l = t; }); return n; };
      var c = x.o.cue || tl(x.rule.cue, lg), dr = x.o.dr || tl(x.rule.dr, lg), why = tl(x.rule.why, lg), ttl = '❌ ' + tl(x.rule.t, lg);
      var hh = 24 + 36 + 30 + lines(f('why', null, lg) + ' : ' + why, 18) * 28 + lines('✅ ' + c, 19) * 30 + lines('🏋 ' + dr, 18) * 28 + (x.note ? lines(x.note, 18) * 28 : 0) + 24;
      hh = Math.max(hh, ih + 30);
      D.rect(M, y, W - 2 * M, hh, i % 2 ? '#fff7f7' : '#fff1f1', 12); D.rect(M, y, 6, hh, '#dc2626', 3);
      var xt = M + 22; y += 38;
      D.tx(ttl, xt, y, { s: 22, w: 800, c: '#b91c1c' }); y += 32;
      D.tx(f('val', null, lg) + ' : ' + x.val + '   ·   ' + f('ref', null, lg) + ' : ' + x.ref + '   ·   ' + (x.src === 'm' ? f('s_m', null, lg) : f('s_t', null, lg)) + ' · ' + f('c_c', null, lg), xt, y, { s: 17, c: '#475569' }); y += 12;
      y += D.wrap(f('why', null, lg) + ' : ' + why, xt, y + 22, tw, { s: 18, c: '#334155', lh: 28 });
      y += D.wrap('✅ ' + c, xt, y + 24, tw, { s: 19, w: 700, c: '#047857', lh: 30 });
      y += D.wrap('🏋 ' + dr, xt, y + 22, tw, { s: 18, c: '#0b2a6e', lh: 28 });
      if (x.note) y += D.wrap('📝 ' + x.note, xt, y + 22, tw, { s: 18, c: '#7c2d12', lh: 28, auto: 1 });
      if (im) { var ix = D.rtl ? M + 16 : W - M - 16 - iw; D.g.drawImage(im, ix, y0 + 15, iw, ih); D.g.strokeStyle = '#fecaca'; D.g.lineWidth = 2; D.g.strokeRect(ix, y0 + 15, iw, ih); }
      y = y0 + hh + 14;
    });
    y += D.wrap(f('refNote', null, lg), M + 10, y + 16, W - 2 * M - 20, { s: 15, c: '#94a3b8' }) + 16;
    return y;
  }

  window.WFX = { evaluate: evaluate, html: html, bind: bind, prep: prep, drawRep: drawRep, rules: { M: MR, T: TR } };
})();
