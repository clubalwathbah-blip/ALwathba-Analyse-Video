/* MR WATHBA ANALYSE VIDÉO · BY OKBA — 🔴 Live + 🔊 إشارة الانطلاقة من الصوت
   - Live : كاميرا الهاتف مباشرة · إعادة مؤجلة (السباح يشوف روحو) · تسجيل كل محاولة وحدها · علامات بلمسة · هيكل مباشر (اختياري)
   - الصوت : يدوّر على الأصوات القوية (صفارة / بيب) ويقترحهم كـ «إشارة»، والمدرب يختار */
(function () {
  'use strict';
  var X = window.VAX, K = window.VO2CORE, $ = K.$, $$ = K.$$, esc = K.esc, F = K.F;
  var VS = X.VS, L = X.L;
  var LD = {
    tab: ['🔴 Live', '🔴 Live'],
    title: ['🔴 التصوير المباشر', '🔴 Prise de vue en direct'],
    help: ['الهاتف على حامل، من الجنب. «تأخير» = الشاشة توري اللي صرا قبل كم ثانية، باش السباح يطلع ويشوف روحو. سجّل كل انطلاقة ولا دورة وحدها، ومن بعد «📊 حلّل».', 'Téléphone sur trépied, de côté. « Différé » = l’écran montre ce qui s’est passé il y a X s, pour que le nageur se voie en sortant de l’eau. Enregistrez chaque départ ou virage séparément, puis « 📊 Analyser ».'],
    cam: ['الكاميرا', 'Caméra'], q: ['الجودة', 'Qualité'], delay: ['العرض', 'Affichage'], now: ['مباشر', 'Direct'], dl: ['تأخير {s} ث', 'Différé {s} s'],
    start: ['▶ شغّل الكاميرا', '▶ Démarrer la caméra'], stop: ['⏹ وقّف الكاميرا', '⏹ Arrêter la caméra'],
    rec: ['⏺ سجّل محاولة', '⏺ Enregistrer un essai'], recStop: ['⏹ وقّف التسجيل', '⏹ Arrêter l’enregistrement'], mark: ['📌 علامة', '📌 Repère'],
    ai: ['🦴 هيكل مباشر', '🦴 Squelette en direct'], aiNote: ['الهيكل المباشر للبر والبلوك. في الماء من فوق يغلط بزاف (الرشّ).', 'Squelette en direct : fiable à sec et sur le plot. Dans l’eau vue de dessus, peu fiable (éclaboussures).'],
    clips: ['المحاولات المسجّلة', 'Essais enregistrés'], noClip: ['ما سجلت حتى محاولة', 'Aucun essai enregistré'], ana: ['📊 حلّل', '📊 Analyser'], save: ['💾 حفظ', '💾 Enregistrer'], del: ['🗑', '🗑'],
    noCam: ['ما قدرناش نفتحو الكاميرا. اسمح للمتصفح بالكاميرا (🔒 قدام العنوان) وعاود.', 'Caméra inaccessible. Autorisez la caméra (🔒 dans la barre d’adresse) et réessayez.'],
    noHttps: ['الكاميرا تخدم غير في https', 'La caméra nécessite https'], webm: ['⚠ المتصفح يسجّل بـ WebM: التنقل في الفيديو يقدر يكون بطيء. Chrome الجديد يسجّل MP4.', '⚠ Enregistrement en WebM : la navigation peut être lente. Un Chrome récent enregistre en MP4.'],
    marks: ['علامات', 'Repères'], fpsR: ['صورة/ث فعلية', 'img/s réelles'], recT: ['تسجيل', 'Enregistrement'], lost: ['⚠ المحاولات تضيع إذا خرجت من الصفحة قبل «حلّل» ولا «حفظ»', '⚠ Les essais sont perdus si vous quittez la page avant « Analyser » ou « Enregistrer »'],
    // الإشارة
    sigB: ['🔊 اقترح الإشارة من الصوت', '🔊 Proposer le signal (son)'], sigW: ['⏳ نسمع…', '⏳ Écoute…'], sigNo: ['ما لقيتش صوت قوي واضح. حط «الإشارة» باليد.', 'Aucun son net trouvé. Placez le « Signal » à la main.'],
    sigL: ['أصوات قوية (اختار الإشارة، اسمعها بـ ▶):', 'Sons forts (choisissez le signal, écoutez avec ▶) :'], sigOk: ['✓ هذي هي الإشارة', '✓ C’est le signal'], sigSet: ['الإشارة تحطّت ✓', 'Signal placé ✓'],
    sigNote: ['الصوت يوصل للهاتف متأخر شوية (≈ 3 ميلي ثانية لكل متر بين الصفارة والهاتف).', 'Le son arrive avec un léger retard (≈ 3 ms par mètre entre le signal et le téléphone).'],
    sigBig: ['الفيديو كبير بزاف باش نقراو الصوت تاعو هنا', 'Vidéo trop lourde pour analyser le son ici'], sigErr: ['ما قدرناش نقراو الصوت تاع هذا الفيديو', 'Impossible de lire le son de cette vidéo']
  };
  function a(k, o) { var v = LD[k], s = v ? (L() === 'fr' ? v[1] : v[0]) : k; if (o) Object.keys(o).forEach(function (x) { s = s.split('{' + x + '}').join(o[x]); }); return s; }

  /* =================== 🔊 الإشارة من الصوت =================== */
  var SG = { busy: false, res: null, fname: null };
  function onsets(buf) {
    var sr = buf.sampleRate, ch = buf.numberOfChannels, n = buf.length, w = Math.round(sr * 0.01), m = Math.floor(n / w), E = new Float32Array(m);
    var d0 = buf.getChannelData(0), d1 = ch > 1 ? buf.getChannelData(1) : null;
    for (var i = 0; i < m; i++) { var s = 0; for (var j = i * w, e = j + w; j < e; j++) { var x = d1 ? (d0[j] + d1[j]) / 2 : d0[j]; s += x * x; } E[i] = Math.sqrt(s / w); }
    // صوت قوي «مفاجئ» مقارنة بالجو اللي قبلو (ثانية) — ماشي مقارنة بأقوى صوت (الرشّ يكون أقوى من الصفارة)
    var srt = Array.prototype.slice.call(E).sort(function (p, q) { return p - q; }), med = srt[Math.floor(m / 2)] || 1e-6, out = [];
    var bgOf = function (k) { var s0 = Array.prototype.slice.call(E, Math.max(0, k - 100), Math.max(1, k - 3)).sort(function (p, q) { return p - q; }); return s0.length ? s0[Math.floor(s0.length / 2)] : med; };
    for (var k = 10; k < m; k++) {
      var pre = (E[k - 5] + E[k - 4] + E[k - 3]) / 3, bg = Math.max(bgOf(k), 1e-6);
      if (E[k] > Math.max(4 * bg, 2.5 * med) && E[k] > pre * 3) {
        var pk = k; while (pk + 1 < m && E[pk + 1] > E[pk]) pk++;
        var t = (k * w) / sr;
        if (!out.length || t - out[out.length - 1].t > 0.5) out.push({ t: t, p: E[pk] / bg });
        k = pk + 20;
      }
    }
    var mx = Math.max.apply(null, out.map(function (o) { return o.p; }).concat([1])); out.forEach(function (o) { o.p = o.p / mx; });
    return out.sort(function (p, q) { return q.p - p.p; }).slice(0, 6).sort(function (p, q) { return p.t - q.t; });
  }
  function sigRun() {
    if (!VS.file || SG.busy) return;
    if (VS.file.size > 700 * 1024 * 1024) { K.toast(a('sigBig')); return; }
    SG.busy = true; SG.fname = VS.file.name; sig();
    var AC = window.AudioContext || window.webkitAudioContext, ac = new AC();
    VS.file.arrayBuffer().then(function (b) { return new Promise(function (ok, ko) { ac.decodeAudioData(b, ok, ko); }); }).then(function (buf) {
      SG.res = onsets(buf); SG.busy = false; try { ac.close(); } catch (e) {} sig();
    }).catch(function () { SG.busy = false; SG.res = []; try { ac.close(); } catch (e) {} K.toast(a('sigErr')); sig(); });
  }
  function sig() {
    var box = $('#vsig'); if (!box) return;
    if (!VS.file || !VS.url || (VS.mode !== 'race' && VS.mode !== 'st' && VS.mode)) { box.innerHTML = ''; return; }
    if (SG.fname && SG.fname !== VS.file.name) { SG.res = null; SG.fname = null; }
    var h = '';
    if (!SG.res) h = '<button class="btn sm" id="sigb"' + (SG.busy ? ' disabled' : '') + '>' + (SG.busy ? a('sigW') : a('sigB')) + '</button>';
    else if (!SG.res.length) h = '<span class="small muted">' + a('sigNo') + '</span>';
    else h = '<div class="small">' + a('sigL') + '</div><div class="row" style="gap:6px;flex-wrap:wrap;margin-top:4px">' + SG.res.map(function (o, i) {
      return '<span class="chip ltr" style="gap:6px"><a href="#" data-sgp="' + i + '">▶ ' + F(o.t, 2) + ' s</a> <i style="display:inline-block;width:' + Math.round(8 + o.p * 40) + 'px;height:6px;border-radius:3px;background:var(--acc)"></i> <a href="#" data-sgo="' + i + '">✓</a></span>';
    }).join('') + '</div><div class="small muted" style="margin-top:4px">' + a('sigNote') + '</div>';
    box.innerHTML = '<div style="margin-top:8px">' + h + '</div>';
    var b = $('#sigb', box); if (b) b.onclick = sigRun;
    $$('[data-sgp]', box).forEach(function (x) { x.onclick = function (e) { e.preventDefault(); var v = $('#vid'), o = SG.res[+x.dataset.sgp]; if (!v) return; v.pause(); X.seekV(v, Math.max(0, o.t - 0.6)); setTimeout(function () { v.playbackRate = 1; v.play(); setTimeout(function () { v.pause(); X.seekV(v, o.t); }, 1100); }, 250); }; });
    $$('[data-sgo]', box).forEach(function (x) { x.onclick = function (e) { e.preventDefault(); var o = SG.res[+x.dataset.sgo], v = $('#vid'); if (v) { v.pause(); X.seekV(v, o.t); } setTimeout(function () { X.addEv('S'); K.toast(a('sigSet')); }, 300); }; });
  }

  /* =================== 🔴 Live =================== */
  var LV = { st: null, rec: null, chunks: [], recOn: false, t0: 0, marks: [], delay: +(localStorage.getItem('wav_lvd') || 5), q: localStorage.getItem('wav_lvq') || '1080x60', dev: localStorage.getItem('wav_lvc') || '', clips: [], ring: [], ai: false, raf: 0, devs: [], aiBusy: false, aiPts: null, fr: { n: 0, t: 0, v: 0 } };
  function mime() { var c = ['video/mp4;codecs=avc1.640028,mp4a.40.2', 'video/mp4;codecs=avc1', 'video/mp4', 'video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm']; for (var i = 0; i < c.length; i++) if (window.MediaRecorder && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(c[i])) return c[i]; return ''; }
  function html() {
    var o = function (v, t, cur) { return '<option value="' + v + '"' + (String(v) === String(cur) ? ' selected' : '') + '>' + t + '</option>'; };
    var h = '<div class="card" style="margin-top:12px"><h3>' + a('title') + '</h3><p class="small muted">' + a('help') + '</p>' +
      '<div class="row" style="gap:8px;flex-wrap:wrap"><label class="small" style="margin:0">' + a('cam') + '</label><select id="lvdev" style="width:auto">' + (LV.devs.length ? LV.devs.map(function (d, i) { return o(d.deviceId, esc(d.label || ('📷 ' + (i + 1))), LV.dev); }).join('') : o('', '📷', '')) + '</select>' +
      '<label class="small" style="margin:0">' + a('q') + '</label><select id="lvq" style="width:auto">' + o('1080x60', '1080p · 60', LV.q) + o('720x60', '720p · 60', LV.q) + o('1080x30', '1080p · 30', LV.q) + o('2160x30', '4K · 30', LV.q) + '</select>' +
      '<label class="small" style="margin:0">' + a('delay') + '</label><select id="lvd" style="width:auto">' + [0, 3, 5, 10, 15].map(function (s) { return o(s, s ? a('dl', { s: s }) : a('now'), LV.delay); }).join('') + '</select>' +
      (LV.st ? '<button class="btn dan" id="lvstop">' + a('stop') + '</button>' : '<button class="btn pri" id="lvgo">' + a('start') + '</button>') + '</div>' +
      (LV.st ? '<div class="row" style="gap:8px;flex-wrap:wrap;margin-top:10px"><button class="btn ' + (LV.recOn ? 'dan' : 'pri') + ' big" id="lvrec">' + (LV.recOn ? a('recStop') : a('rec')) + '</button><button class="btn big" id="lvmk"' + (LV.recOn ? '' : ' disabled') + '>' + a('mark') + '</button>' +
        '<label class="row small" style="gap:6px;margin:0;cursor:pointer"><input type="checkbox" id="lvai"' + (LV.ai ? ' checked' : '') + ' style="width:20px;height:20px;min-height:0"> ' + a('ai') + '</label><span class="small muted" id="lvfps"></span></div><div class="small muted" style="margin-top:4px">' + (LV.ai ? a('aiNote') : '') + (mime().indexOf('webm') >= 0 ? ' ' + a('webm') : '') + '</div>' : '') +
      '<div class="va-lv" id="lvstage" style="position:relative;margin-top:10px;background:#000;border-radius:14px;overflow:hidden;' + (LV.st ? '' : 'display:none') + '"><video id="lvv" muted playsinline autoplay style="width:100%;display:block"></video><canvas id="lvc" style="position:absolute;inset:0;width:100%;height:100%"></canvas>' +
      '<div id="lvbadge" style="position:absolute;top:10px;inset-inline-start:10px;display:flex;gap:6px"></div></div>' +
      '</div>';
    h += '<div class="card"><h3>' + a('clips') + '</h3>' + (LV.clips.length ? '<div class="small muted" style="margin-bottom:6px">' + a('lost') + '</div><div class="tbl-wrap"><table>' + LV.clips.map(function (c, i) {
      return '<tr><td class="num"><b>' + (i + 1) + '</b></td><td class="num">' + c.at + '</td><td class="num">' + F(c.dur, 1) + ' s</td><td class="small" style="text-align:start">' + (c.marks.length ? '📌 ' + c.marks.map(function (m) { return F(m, 1); }).join(' · ') : '') + '</td><td style="white-space:nowrap"><button class="btn sm pri" data-lva="' + i + '">' + a('ana') + '</button> <button class="btn sm" data-lvs="' + i + '">' + a('save') + '</button> <button class="btn sm dan" data-lvx="' + i + '">' + a('del') + '</button></td></tr>';
    }).join('') + '</table></div>' : '<p class="small muted">' + a('noClip') + '</p>') + '</div>';
    return h;
  }
  function devList() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return Promise.resolve();
    return navigator.mediaDevices.enumerateDevices().then(function (l) { LV.devs = l.filter(function (d) { return d.kind === 'videoinput'; }); });
  }
  function startCam() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { K.toast(location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1' ? a('noCam') : a('noHttps')); return; }
    var q = LV.q.split('x'), h = +q[0], fps = +q[1], w = Math.round(h * 16 / 9);
    var vc = { width: { ideal: w }, height: { ideal: h }, frameRate: { ideal: fps } }; if (LV.dev) vc.deviceId = { exact: LV.dev }; else vc.facingMode = { ideal: 'environment' };
    navigator.mediaDevices.getUserMedia({ video: vc, audio: true }).catch(function () { return navigator.mediaDevices.getUserMedia({ video: vc, audio: false }); }).then(function (st) {
      LV.st = st; var tr = st.getVideoTracks()[0], set = tr && tr.getSettings ? tr.getSettings() : {}; if (set.deviceId) LV.dev = set.deviceId;
      return devList().then(paint);
    }).catch(function () { K.toast(a('noCam')); });
  }
  function stopAll() {
    if (LV.recOn) recStop();
    cancelAnimationFrame(LV.raf); LV.raf = 0; LV.ring = []; LV.aiPts = null;
    if (LV.st) LV.st.getTracks().forEach(function (t) { t.stop(); }); LV.st = null;
  }
  function recStart() {
    var mt = mime(); if (!window.MediaRecorder || !LV.st) return;
    var r; try { r = new MediaRecorder(LV.st, mt ? { mimeType: mt, videoBitsPerSecond: 16e6 } : {}); } catch (e) { r = new MediaRecorder(LV.st); }
    LV.chunks = []; LV.marks = []; LV.rec = r; LV.t0 = performance.now(); LV.recOn = true;
    r.ondataavailable = function (e) { if (e.data && e.data.size) LV.chunks.push(e.data); };
    r.onstop = function () {
      var type = (r.mimeType || mt || 'video/webm').split(';')[0], ext = type.indexOf('mp4') >= 0 ? 'mp4' : 'webm', d = new Date();
      var name = 'live-' + d.toISOString().slice(0, 19).replace(/[:T]/g, '-') + '.' + ext, blob = new Blob(LV.chunks, { type: type }), file;
      try { file = new File([blob], name, { type: type }); } catch (e) { file = blob; file.name = name; }
      LV.clips.push({ file: file, marks: LV.marks.slice(), dur: (performance.now() - LV.t0) / 1000, at: d.toTimeString().slice(0, 8) }); LV.chunks = []; paint();
    };
    r.start(1000); paint();
  }
  function recStop() { if (LV.rec && LV.rec.state !== 'inactive') LV.rec.stop(); LV.recOn = false; }
  // العرض: مباشر ولا مؤجل (صور JPEG صغار في الذاكرة)
  var CVS = document.createElement('canvas'), busyEnc = false;
  function loop() {
    var v = $('#lvv'), c = $('#lvc'); if (!v || !c || !LV.st) { LV.raf = 0; return; }
    LV.raf = requestAnimationFrame(loop);
    if (!v.videoWidth) return;
    var now = performance.now();
    LV.fr.n++; if (now - LV.fr.t > 1000) { LV.fr.v = LV.fr.n * 1000 / (now - LV.fr.t); LV.fr.n = 0; LV.fr.t = now; var fe = $('#lvfps'); if (fe) fe.textContent = Math.round(LV.fr.v) + ' ' + a('fpsR') + ' · ' + v.videoWidth + '×' + v.videoHeight; }
    if (c.width !== c.clientWidth) { c.width = c.clientWidth; c.height = c.clientHeight; }
    var g = c.getContext('2d'); g.clearRect(0, 0, c.width, c.height);
    if (LV.delay > 0) {
      if (!busyEnc && (!LV.ring.length || now - LV.ring[LV.ring.length - 1].t > 30)) {
        busyEnc = true; var tw = 960, th = Math.round(v.videoHeight * tw / v.videoWidth); CVS.width = tw; CVS.height = th; CVS.getContext('2d').drawImage(v, 0, 0, tw, th);
        var tt = now; CVS.toBlob(function (b) { busyEnc = false; if (b) LV.ring.push({ t: tt, b: b }); }, 'image/jpeg', 0.72);
      }
      while (LV.ring.length && LV.ring[0].t < now - (LV.delay + 1) * 1000) LV.ring.shift();
      var tgt = now - LV.delay * 1000, fr = null; for (var i = LV.ring.length - 1; i >= 0; i--) if (LV.ring[i].t <= tgt) { fr = LV.ring[i]; break; }
      if (fr && fr !== LV.shown) { LV.shown = fr; createImageBitmap(fr.b).then(function (bm) { LV.bm = bm; }); }
      g.fillStyle = '#000'; g.fillRect(0, 0, c.width, c.height);
      if (LV.bm) g.drawImage(LV.bm, 0, 0, c.width, c.height);
      else { g.fillStyle = '#fff'; g.font = 'bold 22px sans-serif'; g.fillText('⏳ ' + LV.delay + ' s', 20, 50); }
    }
    // هيكل مباشر (على المباشر فقط)
    if (LV.ai && window.WAI && !LV.aiBusy && LV.delay === 0 && (!LV.aiT || now - LV.aiT > 120)) {
      LV.aiBusy = true; LV.aiT = now;
      WAI.detectFrame(v).then(function (p) { LV.aiPts = p; LV.aiBusy = false; }).catch(function () { LV.aiBusy = false; });
    }
    if (LV.ai && LV.aiPts && LV.delay === 0) WAI.drawPose(g, { pts: LV.aiPts }, c.width / v.videoWidth, 1);
    var bd = $('#lvbadge'); if (bd) bd.innerHTML = (LV.delay ? '<span class="chip warn">⏪ ' + LV.delay + ' s</span>' : '<span class="chip ok">● ' + a('now') + '</span>') + (LV.recOn ? '<span class="chip" style="background:#dc2626;color:#fff">⏺ ' + F((now - LV.t0) / 1000, 1) + ' s</span>' : '');
  }
  function paint() { var el = $('#lvbox'); if (!el) return; el.innerHTML = html(); bind(); }
  function bind() {
    var v = $('#lvv'); if (v && LV.st) { v.srcObject = LV.st; v.play().catch(function () {}); v.style.visibility = LV.delay > 0 ? 'hidden' : 'visible'; if (!LV.raf) LV.raf = requestAnimationFrame(loop); }
    var on = function (id, f) { var e = $(id); if (e) e.onclick = f; };
    on('#lvgo', startCam); on('#lvstop', function () { stopAll(); paint(); });
    on('#lvrec', function () { if (LV.recOn) recStop(); else recStart(); paint(); });
    on('#lvmk', function () { if (LV.recOn) { LV.marks.push((performance.now() - LV.t0) / 1000); K.toast('📌 ' + LV.marks.length); } });
    var ch = function (id, f) { var e = $(id); if (e) e.onchange = f; };
    ch('#lvd', function () { LV.delay = +this.value; localStorage.setItem('wav_lvd', LV.delay); LV.ring = []; LV.bm = null; LV.shown = null; paint(); });
    ch('#lvq', function () { LV.q = this.value; localStorage.setItem('wav_lvq', LV.q); if (LV.st && !LV.recOn) { stopAll(); startCam(); } });
    ch('#lvdev', function () { LV.dev = this.value; localStorage.setItem('wav_lvc', LV.dev); if (LV.st && !LV.recOn) { stopAll(); startCam(); } });
    ch('#lvai', function () { LV.ai = this.checked; if (LV.ai && window.WAI) WAI.loadPose().catch(function () {}); paint(); });
    $$('[data-lva]').forEach(function (b) { b.onclick = function () {
      var c = LV.clips[+b.dataset.lva]; if (VS.dirty && !confirm(K.T('unsaved'))) return;
      stopAll(); VS.tab = 'new'; VS.id = null; VS.ev = []; VS.meas = []; VS.trk = []; VS.trk2 = []; VS.snaps = []; VS.mimg = {}; VS.dirty = false;
      VS.liveMarks = c.marks.slice();
      c.marks.forEach(function (t, i) { VS.meas.push({ id: K.uid(), t: Math.round(t * 1000) / 1000, ty: 'text', pts: [{ x: 40, y: 80 }], txt: '📌 ' + (i + 1), col: '#ff4d6d' }); });
      X.setVideo(c.file);
    }; });
    $$('[data-lvs]').forEach(function (b) { b.onclick = function () { var c = LV.clips[+b.dataset.lvs], u = URL.createObjectURL(c.file), x = document.createElement('a'); x.href = u; x.download = c.file.name; document.body.appendChild(x); x.click(); x.remove(); setTimeout(function () { URL.revokeObjectURL(u); }, 5000); }; });
    $$('[data-lvx]').forEach(function (b) { b.onclick = function () { if (!confirm(K.T('confirmDel'))) return; LV.clips.splice(+b.dataset.lvx, 1); paint(); }; });
  }
  function view() { if (!LV.devs.length) devList().then(paint).catch(function () {}); return '<div id="lvbox">' + html() + '</div>'; }

  window.WLIVE = { html: view, bind: bind, stop: stopAll, sig: sig, _onsets: onsets, _lv: LV, label: function () { return a('tab'); } };
})();
