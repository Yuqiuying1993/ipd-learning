(function () {
  "use strict";

  var DAYS = window.IPD_DAYS || {};
  var MANIFEST = window.IPD_MANIFEST || [];
  var currentDate = null;
  var BATCH = 5;            // 每关题数
  var viewBatch = 0;        // 当前解锁到的批次（0-based）

  // 团队共享榜（飞书多维表格）。如需更换，改这里即可。
  var CONFIG = {
    BASE_URL: "https://ruijie.feishu.cn/base/NjQYbJ2VIakvjWsFZCKcxB92nCe"
  };

  // ---------- 数据加载 ----------
  // 用当日日期做缓存破坏：每天第一次访问强制拉最新 manifest/数据文件
  function cacheBust(src) {
    var cb = window.__IPD_CB || new Date().toISOString().slice(0, 10).replace(/-/g, "");
    return src + (src.indexOf("?") >= 0 ? "&" : "?") + "_cb=" + cb;
  }

  function loadScript(src) {
    return new Promise(function (res) {
      var s = document.createElement("script");
      s.src = cacheBust(src);
      s.onload = res;
      s.onerror = function () { console.warn("加载失败:", src); res(); };
      document.head.appendChild(s);
    });
  }

  function getUrlDate() {
    var m = location.search.match(/[?&]date=([^&#]+)/);
    return m ? decodeURIComponent(m[1]) : null;
  }

  function renderTodayBanner() {
    var latest = MANIFEST[MANIFEST.length - 1];
    if (!latest) return;
    var d = DAYS[latest.date];
    if (!d) return;
    $("todayTitle").textContent = d.topicTitle || latest.title || "";
    $("todayOne").textContent = d.oneLiner || "点「开始学习」进入今日课程";
    $("todayBanner").hidden = false;
    $("startTodayBtn").onclick = function () { openDay(latest.date); };
  }

  async function boot() {
    if (!MANIFEST.length) { setProgress("暂无课程数据"); return; }
    for (var i = 0; i < MANIFEST.length; i++) {
      await loadScript("data/" + MANIFEST[i].date + ".js");
    }
    DAYS = window.IPD_DAYS || {};
    renderSidebar();
    updateProgress();

    var target = getUrlDate();
    if (target && DAYS[target]) {
      openDay(target);
    } else {
      renderTodayBanner();
    }
  }

  // ---------- 工具 ----------
  function $(id) { return document.getElementById(id); }
  function setProgress(txt) { $("progressPill").textContent = txt; }
  function scoreKey(d) { return "ipd_score_" + d; }
  function refKey(d) { return "ipd_reflection_" + d; }
  function examAnsKey(d) { return "ipd_examans_" + d; }

  function loadScore(date) { try { return JSON.parse(localStorage.getItem(scoreKey(date)) || "null"); } catch (e) { return null; } }
  function saveScore(date, obj) { try { localStorage.setItem(scoreKey(date), JSON.stringify(obj)); } catch (e) {} }
  function loadAns(date) { try { return JSON.parse(localStorage.getItem(examAnsKey(date)) || "{}"); } catch (e) { return {}; } }
  function saveAns(date, map) { try { localStorage.setItem(examAnsKey(date), JSON.stringify(map)); } catch (e) {} }

  function updateProgress() {
    var studied = MANIFEST.length;
    var list = MANIFEST.map(function (m) { return loadScore(m.date); }).filter(Boolean);
    if (!list.length) { setProgress("已备 " + studied + " 天课程 · 待开考"); return; }
    var sum = 0, cnt = 0;
    list.forEach(function (s) { if (s.percent != null) { sum += s.percent; cnt++; } });
    var avg = cnt ? Math.round(sum / cnt) : 0;
    setProgress("已学 " + studied + " 天 · 平均得分 " + avg + "%");
  }

  // ---------- 侧边栏 ----------
  function renderSidebar() {
    var list = $("dayList");
    list.innerHTML = "";
    MANIFEST.forEach(function (m) {
      var d = DAYS[m.date];
      var score = loadScore(m.date);
      var hasRef = !!localStorage.getItem(refKey(m.date));
      var btn = document.createElement("button");
      btn.className = "day-item";
      btn.dataset.date = m.date;
      var badge = score
        ? '<span class="score-badge">' + score.score + "/" + score.total + "</span>"
        : '<span class="score-badge none">未考</span>';
      btn.innerHTML =
        '<div class="di-top"><span class="di-day">Day ' + m.day + '</span>' + badge + "</div>" +
        '<div class="di-title">' + escapeHtml(m.title) + (hasRef ? '<span class="ref-dot" title="已写心得"></span>' : "") + "</div>";
      btn.onclick = function () { openDay(m.date); };
      list.appendChild(btn);
    });
  }

  function markActive(date) {
    document.querySelectorAll(".day-item").forEach(function (el) {
      el.classList.toggle("active", el.dataset.date === date);
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // ---------- 打开某一天 ----------
  function openDay(date) {
    var d = DAYS[date];
    if (!d) return;
    currentDate = date;
    viewBatch = 0;
    markActive(date);
    $("emptyState").hidden = true;
    $("todayBanner").hidden = true;
    $("lesson").hidden = false;
    $("lessonTag").textContent = "Day " + d.day + " · 主题 #" + (d.topicIndex + 1);
    $("lessonTitle").textContent = d.topicTitle;
    $("lessonDate").textContent = date;

    $("panel-learning").innerHTML = d.learning || "<p>（暂无内容）</p>";
    renderExam(d);
    $("panel-case").innerHTML = d.caseStudy || "<p>暂无案例</p>";
    if (d.advanced && d.advanced.length) {
      var adv = '<div class="advanced-box"><h4 class="adv-h">🎯 第二轮 · 审计进阶思考</h4>';
      d.advanced.forEach(function (a, i) {
        adv += '<div class="adv-q"><b>Q' + (i + 1) + "：</b>" + escapeHtml(a.q) + "</div>";
        if (a.hint) adv += '<div class="adv-hint">💡 提示：' + escapeHtml(a.hint) + "</div>";
      });
      adv += "</div>";
      $("panel-case").innerHTML += adv;
    }
    renderResources(d);
    renderReflection(date);
    switchTab("learning");
  }

  // ---------- 标签页 ----------
  function switchTab(tab) {
    document.querySelectorAll(".tab").forEach(function (t) {
      t.classList.toggle("active", t.dataset.tab === tab);
    });
    ["learning", "exam", "case", "resources", "reflection"].forEach(function (k) {
      $("panel-" + k).hidden = (k !== tab);
    });
  }

  // ---------- 考试（分批闯关）----------
  function getBatches(d) {
    var ex = d.exam || [];
    var batches = [];
    for (var i = 0; i < ex.length; i += BATCH) {
      batches.push(ex.slice(i, i + BATCH).map(function (q, j) { return { q: q, absIndex: i + j }; }));
    }
    return batches;
  }

  function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
  }

  function renderExam(d) {
    var box = $("panel-exam");
    if (!d.exam || !d.exam.length) { box.innerHTML = "<p>暂无考题</p>"; return; }
    var batches = getBatches(d);
    var totalBatches = batches.length;
    if (viewBatch > totalBatches - 1) viewBatch = totalBatches - 1;
    var sc = loadScore(d.date);
    var submitted = (sc && sc.batches) ? sc.batches : {};

    var html = "";
    html += '<div class="exam-report-bar"><button class="btn btn-ghost" id="openReportBtn">🏆 上报成绩到团队榜</button><span class="report-hint">考完可上报，和同事一起排名</span></div>';
    for (var b = 0; b <= viewBatch; b++) {
      html += '<div class="batch-block" data-batch="' + b + '">';
      html += '<div class="batch-head">📝 第 ' + (b + 1) + " 关 / 共 " + totalBatches + " 关（" + batches[b].length + " 题）</div>";
      html += submitted[b] ? renderSubmittedBatch(batches[b], b, submitted[b]) : renderActiveBatch(batches[b], b);
      html += "</div>";
    }

    if (viewBatch < totalBatches - 1) {
      if (submitted[viewBatch]) {
        html += '<div class="exam-more"><button class="btn btn-primary" id="moreBtn">🎯 第 ' + (viewBatch + 1) + " 关已通关！还有精力？解锁第 " + (viewBatch + 2) + " 关（+" + batches[viewBatch + 1].length + " 题）▶</button></div>";
      }
    } else {
      html += '<div class="exam-done">🎉 今日 ' + d.exam.length + " 题已全部解锁，明天见！</div>";
    }

    box.innerHTML = html;
    bindExamEvents(d, batches, submitted);
  }

  function renderActiveBatch(batch, b) {
    var html = "";
    batch.forEach(function (item) {
      var q = item.q, idx = item.absIndex;
      var typeLabel = q.type === "single" ? "单选" : q.type === "multiple" ? "多选" : "简答";
      html += '<div class="exam-q" data-abs="' + idx + '" data-type="' + q.type + '">';
      html += '<div><span class="q-type">' + typeLabel + '</span><span class="q-text">' + (idx + 1) + ". " + escapeHtml(q.q) + "</span></div>";
      if (q.type !== "short") {
        q.options.forEach(function (opt) {
          var it = q.type === "single" ? "radio" : "checkbox";
          html += '<label class="opt"><input type="' + it + '" name="q' + idx + '" value="' + opt.charAt(0) + '">' + escapeHtml(opt) + "</label>";
        });
      } else {
        html += '<textarea class="short-input" data-abs="' + idx + '" rows="3" placeholder="写下你的答案，提交后查看参考要点…" style="width:100%;border:1px solid var(--line);border-radius:8px;padding:8px;font-family:inherit;"></textarea>';
      }
      html += '<div class="analysis" hidden></div>';
      html += '<div class="self-grade" hidden></div>';
      html += "</div>";
    });
    html += '<div class="exam-actions"><button class="btn btn-primary" data-submit="' + b + '">提交本关</button>' +
            '<button class="btn btn-ghost" data-reset="' + b + '">重做本关</button></div>';
    html += '<div class="score-bar" id="scoreBar-' + b + '" hidden></div>';
    return html;
  }

  function renderSubmittedBatch(batch, b, sub) {
    var html = "";
    batch.forEach(function (item) {
      var q = item.q, idx = item.absIndex;
      var res = sub.results ? sub.results[idx] : null;
      var typeLabel = q.type === "single" ? "单选" : q.type === "multiple" ? "多选" : "简答";
      html += '<div class="exam-q locked">';
      html += '<div><span class="q-type">' + typeLabel + '</span><span class="q-text">' + (idx + 1) + ". " + escapeHtml(q.q) + "</span></div>";
      if (q.type !== "short") {
        q.options.forEach(function (opt) {
          var letter = opt.charAt(0);
          var it = q.type === "single" ? "radio" : "checkbox";
          var checked = (res && res.selected && res.selected.indexOf(letter) >= 0) ? "checked" : "";
          var cls = "";
          if (res) {
            var isAnswer = (q.type === "single") ? (letter === q.answer) : (q.answer || []).indexOf(letter) >= 0;
            var isSel = (res.selected || []).indexOf(letter) >= 0;
            if (isAnswer) cls = "correct"; else if (isSel) cls = "wrong";
          }
          html += '<label class="opt ' + cls + '"><input type="' + it + '" ' + checked + ' disabled>' + escapeHtml(opt) + "</label>";
        });
      } else {
        var saved = (res && res.text) ? res.text : "";
        html += '<div class="short-saved">你提交的答案：' + (saved ? escapeHtml(saved) : "（未填写）") + "</div>";
        if (res && res.self) html += '<div class="self-tag ' + (res.self === "ok" ? "tag-ok" : "tag-no") + '">' + (res.self === "ok" ? "✅ 自评已掌握" : "🔁 自评待加强") + "</div>";
      }
      html += '<div class="analysis">' + (q.analysis ? ("<b>解析：</b>" + escapeHtml(q.analysis)) : "") + "</div>";
      html += "</div>";
    });
    html += '<div class="score-bar done">✅ 本关得分 ' + sub.score + "/" + sub.total + ' · <button class="link-btn" data-redo="' + b + '">重做本关</button></div>';
    return html;
  }

  function bindExamEvents(d, batches, submitted) {
    var more = $("moreBtn");
    if (more) more.onclick = function () { viewBatch++; renderExam(d); };

    var openReport = $("openReportBtn");
    if (openReport) openReport.onclick = openReportModal;

    document.querySelectorAll("#panel-exam [data-submit]").forEach(function (btn) {
      btn.onclick = function () { submitBatch(d, batches, parseInt(btn.dataset.submit, 10)); };
    });
    document.querySelectorAll("#panel-exam [data-reset]").forEach(function (btn) {
      btn.onclick = function () { renderExam(d); };
    });
    document.querySelectorAll('#panel-exam [data-redo]').forEach(function (btn) {
      btn.onclick = function () {
        var b = parseInt(btn.dataset.redo, 10);
        var sc = loadScore(d.date) || { batches: {} };
        if (!sc.batches) sc.batches = {};
        delete sc.batches[b];
        recalcTotals(d, sc);
        saveScore(d.date, sc);
        renderExam(d);
      };
    });
    // 简答题草稿实时保存（刷新不丢）
    document.querySelectorAll("#panel-exam .short-input").forEach(function (ta) {
      var idx = ta.dataset.abs;
      var ans = loadAns(d.date);
      if (ans[idx] != null) ta.value = ans[idx];
      ta.oninput = function () { var m = loadAns(d.date); m[idx] = ta.value; saveAns(d.date, m); };
    });
  }

  function submitBatch(d, batches, b) {
    var batch = batches[b];
    var dDate = d.date;
    var results = {};
    var correctCount = 0, denom = 0, pending = 0;

    batch.forEach(function (item) {
      var q = item.q, idx = item.absIndex;
      var res = { type: q.type };

      if (q.type === "short") {
        var ta = document.querySelector('#panel-exam .short-input[data-abs="' + idx + '"]');
        var text = ta ? ta.value : "";
        res.text = text;
        var ans = loadAns(dDate); ans[idx] = text; saveAns(dDate, ans); // 草稿留存
        var qEl = document.querySelector('#panel-exam .exam-q[data-abs="' + idx + '"]');
        var gradeBox = qEl.querySelector(".self-grade");
        gradeBox.hidden = false;
        gradeBox.innerHTML = '<button class="btn btn-ghost" data-g="ok">✅ 我会了 (+1)</button><button class="btn btn-ghost" data-g="no">🔁 还不会 (0)</button>';
        gradeBox.querySelectorAll("button").forEach(function (b2) {
          b2.onclick = function () {
            res.self = b2.dataset.g;
            if (b2.dataset.g === "ok") correctCount++;
            denom++;
            results[idx] = res;
            finalizeBatch(d, batches, b, results, correctCount, denom, pending);
          };
        });
        pending++;
        results[idx] = res;
        return;
      }

      var inputs = document.querySelectorAll('#panel-exam input[name="q' + idx + '"]');
      var sel = []; inputs.forEach(function (inp) { if (inp.checked) sel.push(inp.value); }); sel.sort();
      res.selected = sel;
      var correct = (q.type === "single") ? (sel.length === 1 && sel[0] === q.answer) : arraysEqual(sel, (q.answer || []).slice().sort());

      var qEl = document.querySelector('#panel-exam .exam-q[data-abs="' + idx + '"]');
      qEl.querySelectorAll(".opt").forEach(function (optEl) {
        var inp = optEl.querySelector("input");
        inp.disabled = true;
        var letter = inp.value;
        var isAnswer = (q.type === "single") ? (letter === q.answer) : (q.answer || []).indexOf(letter) >= 0;
        var isSel = sel.indexOf(letter) >= 0;
        if (isAnswer) optEl.classList.add("correct");
        else if (isSel) optEl.classList.add("wrong");
        if (isSel) optEl.classList.add("selected");
      });
      var ana = qEl.querySelector(".analysis");
      ana.hidden = false; ana.innerHTML = "<b>解析：</b>" + escapeHtml(q.analysis || "");
      if (correct) correctCount++;
      denom++;
      results[idx] = res;
    });

    if (pending === 0) finalizeBatch(d, batches, b, results, correctCount, denom, pending);
  }

  function finalizeBatch(d, batches, b, results, correctCount, denom, pending) {
    var total = batches[b].length;
    var pct = denom ? Math.round(correctCount / denom * 100) : 0;
    var sc = loadScore(d.date) || { batches: {} };
    if (!sc.batches) sc.batches = {};
    sc.batches[b] = { results: results, score: correctCount, total: total, percent: pct };
    recalcTotals(d, sc);
    saveScore(d.date, sc);
    scheduleAutoBackup();
    renderExam(d);
  }

  function recalcTotals(d, sc) {
    var totalScore = 0, totalQ = 0;
    if (sc.batches) {
      Object.keys(sc.batches).forEach(function (k) {
        totalScore += sc.batches[k].score || 0;
        totalQ += sc.batches[k].total || 0;
      });
    }
    sc.score = totalScore; sc.total = totalQ;
    sc.percent = totalQ ? Math.round(totalScore / totalQ * 100) : null;
    sc.at = Date.now();
  }

  // ---------- 拓展阅读 ----------
  function renderResources(d) {
    var box = $("panel-resources");
    if (!d.resources || !d.resources.length) { box.innerHTML = "<p>暂无拓展阅读</p>"; return; }
    var html = '<p class="ref-hint">以下资源均经检索核对、链接真实可查，延伸理解 IPD 的前世今生：</p>';
    d.resources.forEach(function (r) {
      html += '<div class="res-card">' +
        '<div class="res-top">' + escapeHtml(r.type || "📌") + " " + escapeHtml(r.title) + "</div>" +
        '<div class="res-source">' + escapeHtml(r.source || "") + "</div>" +
        '<div class="res-reason">' + escapeHtml(r.reason || "") + "</div>" +
        '<a class="res-link" href="' + escapeHtml(r.link) + '" target="_blank" rel="noopener">🔗 打开来源</a>' +
        "</div>";
    });
    box.innerHTML = html;
  }

  // ---------- 心得 ----------
  function renderReflection(date) {
    var box = $("panel-reflection");
    box.innerHTML =
      '<p class="ref-hint">记录今天的学习心得、疑问或行动点。内容保存在本浏览器本地，便于后续复盘（左侧「全部心得」可统一查看；顶部「导出」可备份）。</p>' +
      '<div class="ref-box"><textarea id="refText" placeholder="今天印象最深的一点是什么？有什么可以马上用到审计工作里的？"></textarea></div>' +
      '<div class="exam-actions"><button class="btn btn-primary" id="saveRef">保存心得</button>' +
      '<span class="ref-saved" id="refSaved"></span></div>';

    try {
      var saved = JSON.parse(localStorage.getItem(refKey(date)) || "null");
      if (saved) { $("refText").value = saved.text; $("refSaved").textContent = "上次保存：" + new Date(saved.at).toLocaleString(); }
    } catch (e) {}

    $("saveRef").onclick = function () {
      var text = $("refText").value;
      try {
        localStorage.setItem(refKey(date), JSON.stringify({ text: text, at: Date.now() }));
        $("refSaved").textContent = "已保存：" + new Date().toLocaleString();
        renderSidebar();
      } catch (e) { $("refSaved").textContent = "保存失败（浏览器存储不可用）"; }
    };
  }

  // ---------- 全部心得弹窗 ----------
  function openAllRef() {
    var body = $("allRefBody");
    var rows = [];
    MANIFEST.forEach(function (m) {
      try {
        var r = JSON.parse(localStorage.getItem(refKey(m.date)) || "null");
        if (r) rows.push({ date: m.date, day: m.day, title: m.title, text: r.text, at: r.at });
      } catch (e) {}
    });
    if (!rows.length) { body.innerHTML = '<p style="color:var(--ink-soft);margin:0">还没有任何心得，去学习后记录第一条吧～</p>'; }
    else {
      rows.sort(function (a, b) { return b.at - a.at; });
      body.innerHTML = rows.map(function (r) {
        return '<div class="ref-row"><div class="rr-head">Day ' + r.day + " · " + r.date + " · " + escapeHtml(r.title) + "</div>" +
          '<div class="rr-text">' + escapeHtml(r.text || "（空）") + "</div></div>";
      }).join("");
    }
    body.innerHTML += '<div class="modal-foot" style="margin-top:14px;text-align:right"><button class="btn btn-ghost" id="closeAllRefFoot">关闭</button></div>';
    $("closeAllRefFoot").onclick = function () { $("allRefModal").hidden = true; };
    $("allRefModal").hidden = false;
  }

  // ---------- 上报成绩到团队榜 ----------
  function openReportModal() {
    var d = DAYS[currentDate];
    if (!d) return;
    var sc = loadScore(d.date);
    var sum = sc ? (sc.score + "/" + sc.total) : "（请先完成考试）";
    $("reportSummary").innerHTML = "<b>Day " + d.day + " · " + escapeHtml(d.topicTitle) + "</b><br>日期：" + d.date +
      "<br>你的得分：<b>" + sum + "</b>";
    $("reportCopied").textContent = "";
    $("reportName").value = "";
    $("reportDept").value = "";
    $("reportModal").hidden = false;
  }

  function copyAndOpenBoard() {
    var d = DAYS[currentDate];
    if (!d) return;
    var sc = loadScore(d.date);
    var name = ($("reportName").value || "").trim() || "（未填姓名）";
    var dept = ($("reportDept").value || "").trim();
    var score = sc ? (sc.score + "/" + sc.total) : "未考试";
    var line = "【IPD学习上报】姓名：" + name + (dept ? "｜部门：" + dept : "") +
      "｜" + d.date + " Day" + d.day + " " + d.topicTitle + "｜得分 " + score;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(line).then(
        function () { $("reportCopied").textContent = "已复制，去榜单粘贴一行即可 ✓"; },
        function () { $("reportCopied").textContent = "复制失败，请手动记录：" + line; }
      );
    } else {
      $("reportCopied").textContent = "请手动复制：" + line;
    }
    window.open(CONFIG.BASE_URL, "_blank");
  }

  // ---------- 学习档案导出 / 导入 ----------
  function exportArchive() {
    var data = { type: "ipd-archive", version: 1, at: Date.now(), days: {} };
    MANIFEST.forEach(function (m) {
      var d = m.date;
      var read = function (k) { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { return null; } };
      data.days[d] = { score: read(scoreKey(d)), ref: read(refKey(d)), ans: read(examAnsKey(d)) };
    });
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "IPD学习档案_" + new Date().toISOString().slice(0, 10) + ".json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function importArchive(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = JSON.parse(reader.result);
        if (!data.days) throw new Error("文件格式不对");
        Object.keys(data.days).forEach(function (d) {
          var dd = data.days[d];
          if (dd.score) localStorage.setItem(scoreKey(d), JSON.stringify(dd.score));
          if (dd.ref) localStorage.setItem(refKey(d), JSON.stringify(dd.ref));
          if (dd.ans) localStorage.setItem(examAnsKey(d), JSON.stringify(dd.ans));
        });
        renderSidebar(); updateProgress();
        if (currentDate) { renderExam(DAYS[currentDate]); renderReflection(currentDate); }
        alert("档案已导入：共恢复 " + Object.keys(data.days).length + " 天的数据");
        scheduleAutoBackup();
      } catch (e) { alert("导入失败：" + e.message); }
    };
    reader.readAsText(file);
  }

  // 直接粘贴 DevTools 复制的内容（支持三种格式）：
  //  A) 归档格式 {"days":{...}}  B) {"ipd_score_...":"...",...}（copy(JSON.stringify(localStorage)) 的输出）
  //  C) 多行 "ipd_xxx: 值" 或 "ipd_xxx\t值"（DevTools 逐行复制）
  function setIfAbsent(key, obj) { if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(obj)); }
  function setIfAbsentRaw(key, rawVal) { if (!localStorage.getItem(key)) localStorage.setItem(key, rawVal); }

  function importFromText(text) {
    text = (text || "").trim();
    if (!text) { $("importMsg").textContent = "请先粘贴内容"; return; }
    var imported = 0;
    try {
      var obj = JSON.parse(text);
      if (obj && obj.days) {
        Object.keys(obj.days).forEach(function (d) {
          var dd = obj.days[d];
          if (dd.score) setIfAbsent(scoreKey(d), dd.score);
          if (dd.ref) setIfAbsent(refKey(d), dd.ref);
          if (dd.ans) setIfAbsent(examAnsKey(d), dd.ans);
          imported++;
        });
      } else if (typeof obj === "object" && obj !== null) {
        Object.keys(obj).forEach(function (k) {
          if (k.indexOf("ipd_") === 0) { setIfAbsentRaw(k, obj[k]); imported++; }
        });
      }
    } catch (e) {
      text.split(/\r?\n/).forEach(function (ln) {
        var m = ln.match(/^(ipd_[A-Za-z0-9_]+)\s*[:=]\s*(.*)$/) || ln.match(/^(ipd_[A-Za-z0-9_]+)\t(.*)$/);
        if (m) { setIfAbsentRaw(m[1], m[2]); imported++; }
      });
    }
    if (!imported) { $("importMsg").textContent = "没识别到 ipd_ 开头的数据，请确认粘贴内容来自 DevTools 的 localStorage"; return; }
    renderSidebar(); updateProgress();
    if (currentDate) { renderExam(DAYS[currentDate]); renderReflection(currentDate); }
    $("importMsg").textContent = "✅ 成功恢复 " + imported + " 条数据，已合并进本浏览器（原有数据不会被覆盖）";
    scheduleAutoBackup();
  }

  // ---------- 自动备份（防换网址丢分） ----------
  // 浏览器本地存储按"网址"隔离，CloudStudio 每次部署换网址会把成绩拆进不同保险箱。
  // 解决办法：每次保存都自动把整套档案下载成一份文件存到电脑，换网址后用「📥 导入」即可恢复。
  var AUTO_BACKUP_NAME = "IPD学习档案-自动备份.json";
  var _backupTimer = null;
  function buildArchive() {
    var data = { type: "ipd-archive", version: 1, at: Date.now(), days: {} };
    MANIFEST.forEach(function (m) {
      var d = m.date;
      var read = function (k) { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { return null; } };
      data.days[d] = { score: read(scoreKey(d)), ref: read(refKey(d)), ans: read(examAnsKey(d)) };
    });
    return data;
  }
  function triggerBackupDownload() {
    var data = buildArchive();
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = AUTO_BACKUP_NAME; document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }
  function showBackupToast() {
    var t = $("backupToast");
    if (!t) { t = document.createElement("div"); t.id = "backupToast"; t.className = "backup-toast"; document.body.appendChild(t); }
    t.textContent = "✅ 已自动备份到下载文件夹（换网址后用「📥 导入」恢复）";
    t.classList.add("show");
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove("show"); }, 3200);
  }
  function scheduleAutoBackup() {
    try { localStorage.setItem("ipd_lastbackup_at", String(Date.now())); } catch (e) {}
    if (_backupTimer) clearTimeout(_backupTimer);
    _backupTimer = setTimeout(function () {
      try { triggerBackupDownload(); } catch (e) {}
    }, 1500);
  }

  // ---------- 事件绑定 ----------
  $("showAllRefBtn").onclick = openAllRef;
  $("closeAllRef").onclick = function () { $("allRefModal").hidden = true; };
  $("closeAllRef").setAttribute("aria-label", "关闭");
  $("allRefModal").addEventListener("click", function (e) { if (e.target === $("allRefModal")) $("allRefModal").hidden = true; });

  $("teamBoardBtn").onclick = function () { window.open(CONFIG.BASE_URL, "_blank"); };
  $("copyReport").onclick = copyAndOpenBoard;
  $("closeReport").onclick = function () { $("reportModal").hidden = true; };
  $("reportModal").addEventListener("click", function (e) { if (e.target === $("reportModal")) $("reportModal").hidden = true; });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (!$("allRefModal").hidden) $("allRefModal").hidden = true;
      if (!$("reportModal").hidden) $("reportModal").hidden = true;
      if (!$("importModal").hidden) $("importModal").hidden = true;
    }
  });

  $("exportBtn").onclick = exportArchive;
  $("importBtn").onclick = function () { $("importModal").hidden = false; };
  $("closeImport").onclick = function () { $("importModal").hidden = true; };
  $("importModal").addEventListener("click", function (e) { if (e.target === $("importModal")) $("importModal").hidden = true; });
  $("pickFileBtn").onclick = function () { $("importFile").click(); };
  $("importFile").onchange = function (e) { if (e.target.files[0]) importArchive(e.target.files[0]); e.target.value = ""; };
  $("importTextBtn").onclick = function () { importFromText($("importText").value); };

  document.querySelectorAll(".tab").forEach(function (t) {
    t.onclick = function () { switchTab(t.dataset.tab); };
  });

  boot();
})();
