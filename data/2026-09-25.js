window.IPD_DAYS = window.IPD_DAYS || {};
window.IPD_DAYS['2026-09-25'] = {
  date: '2026-09-25', day: 44, topicIndex: 3,
  topicTitle: '决策评审 DCP 与技术评审 TR：节点、输出物、如何决策（控制点）【第二轮·审计实战视角】',
  oneLiner: '第二轮把 DCP/TR 当成「审计的两类控制点」：一类管投资生死（可杀项目），一类管技术成熟度（可卡质量）——都必须是系统硬卡点。',
  learning: `<h2>Day 44 · 决策评审 DCP 与技术评审 TR（审计实战视角：两类控制点怎么验）</h2>
<p class="lead">第一轮我们记了 DCP/TR 的定义；第二轮把它们翻译成审计语言——<strong>DCP 是「投资生死闸」、TR 是「技术成熟度闸」strong>，审计要验的是：这两类闸，究竟是系统硬卡，还是人情软卡。</p>

<h3>① 今日主题</h3>
<p>IPD 在阶段之间设两类评审：<strong>DCP（Decision Checkpoint，决策评审点）</strong>由 IPMT 主持，做商业/投资决策（继续/暂停/终止），有「杀掉项目」的权力；<strong>TR（Technical Review，技术评审）</strong>由 SE/技术团队主持，评估技术成熟度与遗留问题，不具投资裁决权。二者互补：DCP 看「值不值得做」，TR 看「做没做出来」。</p>

<h3>② 核心概念（DCP vs TR 对照 + 审计验证法）</h3>
<table class="term">
<thead><tr><th>维度</th><th>DCP（决策评审）</th><th>TR（技术评审）</th></tr></thead>
<tbody>
<tr><td>主持人</td><td>IPMT（投资决策委员会）</td><td>SE / 技术团队</td></tr>
<tr><td>看什么</td><td>商业可行性、投资回报、组合优先级</td><td>技术成熟度、规格达成、遗留问题</td></tr>
<tr><td>权力</td><td>Go / No-Go / 重定向（可杀项目）</td><td>通过 / 有条件通过 / 打回（不杀投资）</td></tr>
<tr><td>常见节点</td><td>DCP1 概念、DCP2 计划、DCP3 发布等</td><td>TR1~TR6（各技术里程碑）</td></tr>
<tr><td>审计验什么</td><td>决议是否书面、例外是否特批</td><td>遗留是否清零、节点是否齐全</td></tr>
</tbody>
</table>

<h3>③ 为什么重要（业务 + 审计/内控/风险价值）</h3>
<ul>
<li><strong>业务价值</strong>：DCP 让「不值得做的项目及时止损」，TR 让「没做好的技术不过关」，两者避免资源打水漂。</li>
<li><strong>审计价值</strong>：DCP/TR 是 IPD 里最显性的两类控制点。审计无需发明标准，只需核验「评审有没有真发生、决议有没有留痕、例外有没有特批」。</li>
<li><strong>风险价值</strong>：两类经典失效：① DCP 走过场（永远 Go，从不 No-Go）；② TR 遗留不清零就放行。两者都靠「系统不强制」存活。</li>
</ul>

<h3>④ 5W1H 拆解（审计取数清单）</h3>
<table class="map">
<thead><tr><th>评审</th><th>审计取数</th><th>缺失红旗</th></tr></thead>
<tbody>
<tr><td>DCP</td><td>IPMT 书面决议 + 投票/签字 + 例外特批记录</td><td>无决议、无被否项目、例外只在微信群</td></tr>
<tr><td>TR</td><td>各 TR 节点报告 + 遗留问题清单 + 清零证据</td><td>节点缺失、遗留随量产流入市场</td></tr>
<tr><td>两者衔接</td><td>DCP 是否引用 TR 结论、TR 不过 DCP 能否 Go</td><td>DCP 跳过 TR 直接 Go</td></tr>
</tbody>
</table>

<h3>⑤ 业内对标</h3>
<ul>
<li><strong>华为</strong>：DCP 由重量级 IPMT 硬决策，TR 节点密、遗留必须清零，例外须书面特批。</li>
<li><strong>华三</strong>：DCP 同样硬，但更轻量、决策更快，靠预算闸门补强。</li>
<li><strong>宁德时代</strong>：TR 把可制造性/可靠性做重，验证不议会不过量产。</li>
</ul>

<h3>⑥ 生活化例子</h3>
<p>把 DCP/TR 想成<strong>装修的两道验收</strong>：DCP = 家庭投委会看「这预算花得值不值、要不要继续投」（可决定停工）；TR = 监理验「水电防水做到位没、空鼓有没有」。DCP 说「钱继续给」，前提是 TR 说「活干好了」。如果监理的整改单（遗留）没清零，投委会却直接打钱——这就是「DCP 跳过 TR」的翻车。</p>

<h3>⑦ 一句话记住</h3>
<p class="remember">DCP 管「投不投」（能杀项目），TR 管「成没成」（能卡质量）；审计验这两闸，核心就一句：<strong>决议有没有书面留痕、例外有没有特批、遗留有没有清零</strong>。</p>`,
  exam: [
    { type:'single', q:'DCP 与 TR 最关键的区别是？', options:['A. TR 看商业、DCP 看技术', 'B. DCP 是 IPMT 的商业/投资决策（可 Go/No-Go 杀项目），TR 是技术成熟度评审（不具投资裁决权）', 'C. 两者完全一样', 'D. TR 由 IPMT 主持'], answer:'B', analysis:'DCP 决策投资生死、可杀项目；TR 评技术成熟度、不裁决投资。这是 IPD 最重要的制衡区分。' },
    { type:'single', q:'从审计看，DCP「走过场」的典型表现是？', options:['A. 每次都认真讨论', 'B. 永远 Go、从不 No-Go，历史上查不到任何被终止/暂缓的项目', 'C. 有书面决议', 'D. 例外走特批'], answer:'B', analysis:'DCP 若从不说 No，说明决策委员会形同虚设，是「挂墙 IPD」的核心症状。' },
    { type:'multiple', q:'下列哪些属于 TR（技术评审）审计应核验的内容？', options:['A. 各 TR 节点是否齐全、未缺失', 'B. 遗留问题清单是否清零、有无证据', 'C. 技术成熟度是否达进入下阶段标准', 'D. 项目投资回报是否达标'], answer:['A','B','C'], analysis:'A/B/C 是 TR 范畴；D 属 DCP（商业/投资）评审内容。' },
    { type:'single', q:'「DCP 跳过 TR 直接 Go」的问题本质是？', options:['A. 效率高', 'B. 投资闸门绕过了技术成熟度闸门，批量质量/技术风险敞口', 'C. 没问题', 'D. 只是一种写法'], answer:'B', analysis:'DCP 应建立在 TR 结论之上；跳过 TR 等于没验「成没成」就继续投钱，风险极大。' },
    { type:'multiple', q:'关于评审「例外/特批」，审计正确的认知有？', options:['A. 例外可以存在，但须 IPMT 书面特批并留追溯', 'B. 例外只存在于微信群、无记录 = 红旗', 'C. 任何例外都必须禁止', 'D. 例外应有责任人承责与复盘'], answer:['A','B','D'], analysis:'例外本身非禁（业务确有急情），但须书面特批+追溯+承责；只口头/群聊无记录是失控。' },
    { type:'single', q:'TR 节点「遗留问题未清零就放行」最直接的后果是？', options:['A. 项目更快', 'B. 技术缺陷随阶段流入下道，最终在量产/市场爆发', 'C. 没有影响', 'D. 成本更低'], answer:'B', analysis:'遗留不清零是质量事故的种子；阶段越往后，修复成本越高。' },
    { type:'single', q:'从审计验证角度，DCP 最直接的硬证据是？', options:['A. 研发说「会议开过了」', 'B. IPMT 书面决议（含投票/签字）+ 被否/暂缓项目记录', 'C. 流程图', 'D. 培训证书'], answer:'B', analysis:'书面决议 + 真实被否记录，是 DCP 非摆设的铁证。' },
    { type:'multiple', q:'下列哪些是「评审失效」的红旗（审计应警惕）？', options:['A. DCP 永远 Go、无被终止项目', 'B. TR 遗留随量产流出、无清零证据', 'C. 例外只在微信群、无书面特批', 'D. DCP 决议引用 TR 结论、例外有追溯'], answer:['A','B','C'], analysis:'A/B/C 是评审失效红旗；D 是正面控制证据。' },
    { type:'short', q:'请为「DCP/TR 评审」设计一张审计检查单：列出你最想拿的 4 类证据，并说明每类能戳穿什么失效。', answer:null, analysis:'参考要点：① IPMT 书面决议库 + 被否项目清单——戳穿 DCP 走过场；② 各 TR 节点报告 + 遗留清零证据——戳穿 TR 放水；③ 例外特批记录（书面+责任人）——戳穿「口头跳过」；④ DCP 引用 TR 结论的链路——戳穿 DCP 跳过 TR。四类直指评审真假。' },
    { type:'short', q:'如果业务以「项目紧急」为由要求「TR 遗留先放着、量产后补」，请从审计角度写一句风险定性 + 2 条管控建议。', answer:null, analysis:'参考要点：定性为「技术闸门失效，缺陷流入量产/市场，修复成本指数级上升」；建议① 遗留分级，致命级必须清零方可 Go、一般级须 IPMT 书面特批+责任人承责；② 建立遗留追溯台账，量产后复盘闭环。' }
  ],
  caseStudy: `<h2>典型案例深读：DCP「只 Go 不 No」让一个亏损项目多烧了 8000 万</h2>
<p class="lead">本案例与今日主题关系：用真实风格复盘，演示 DCP 决策闸门失效时，审计怎么用「被否项目清单」这一铁证戳穿「走过场」，并推动止损。</p>

<h3>背景</h3>
<p>某光通信厂商（化名「G 厂」）一款消费级光模块项目，市场已明显转向，但项目连续三年在 DCP 上被评 Go，直到审计介入才发现：三年里该厂所有 DCP 无一 No-Go，累计投入超 8000 万仍无规模订单。</p>

<h3>过程</h3>
<p>审计调阅三年 DCP 库：① 决议均为「Go」，无一份 No-Go/暂缓；② 多次 DCP 材料里市场代表已标注「需求萎缩」，但被 PDT 经理在会上口头压下；③ 例外（延期/加预算）均微信群审批，无书面特批。证据链指向「DCP 决策闸门完全失效」。</p>

<h3>踩坑（三个审计钉死的点）</h3>
<ol>
<li><strong>IPMT 不独立</strong>：IPMT 主任由 PDT 上级兼任，决策与执行合一，自然「只 Go 不 No」。</li>
<li><strong>负面信号被压制</strong>：市场代表的反对意见未进决议记录，决策信息被选择性呈现。</li>
<li><strong>例外无追溯</strong>：三次预算追加仅群聊，无责任人承责，钱花出去无人复盘。</li>
</ol>

<h3>与别家对比</h3>
<p>华为同类项目，IPMT 独立、负面信号必须进决议、例外书面特批；G 厂输在<strong>决策委员会被执行方收编</strong>。</p>

<h3>现状</h3>
<p>审计定性「投资决策失控」，推动：① IPMT 与 PDT 汇报线分离；② DCP 须记录反对意见并归档；③ 例外书面特批+季度复盘。项目最终被终止，止损后续投入。</p>

<h3>启示（审计视角）</h3>
<ul>
<li>「被否项目清单」是判断 DCP 真假的试金石——没有 No-Go 的 IPMT，基本是摆设。</li>
<li>决策信息被选择性呈现，是「只 Go 不 No」的常见手法，审计要调原始材料而非会议纪要。</li>
<li>止损本身就是审计价值：DCP 闸门早一天硬起来，少烧一天钱。</li>
</ul>`,
  resources: [
    { type:'📖', title:'从偶然到必然：华为研发投资与管理实践（升级版）', source:'夏忠毅·清华大学出版社', reason:'DCP 硬决策与 IPMT 独立性的权威叙述', link:'https://www.sinobook.com.cn/main/newsdetail.cfm?iCntno=110479' },
    { type:'📖', title:'华为变革法：打造可持续进步的组织', source:'毛万金·中信出版社', reason:'变革中决策机制怎么立住', link:'https://e.dangdang.com/products/1901303981.html' },
    { type:'🔗', title:'华为流程变革的底层逻辑——IPD为什么是华为历史上最重要的变革', source:'头条深长文', reason:'从变革动机看 DCP 决策为何核心', link:'https://www.toutiao.com/a7665239377399775807' },
    { type:'🔗', title:'一文讲透华为IPD：从核心理念到落地实践', source:'CSDN 长文', reason:'DCP/TR 节点与决策落地', link:'https://blog.csdn.net/weixin_33960567/article/details/162358087' },
    { type:'🔗', title:'IPD流程的最高境界，是知道边界在哪', source:'人人都是产品经理', reason:'帮你判断评审该硬卡到哪', link:'https://www.woshipm.com/pd/6440701.html' }
  ],
  advanced: [
    { q:'把你本公司近一年的项目 DCP 拉出来，有没有「被否/暂缓」记录？没有的话，意味着什么、你第一步查什么？', hint:'没有 No-Go 通常说明 IPMT 不独立或被收编；第一步调原始材料看反对意见是否被压制。' },
    { q:'如果业务总用「项目紧急」跳过 TR 遗留，作为审计你该怎么既放行又守住底线？', hint:'遗留分级 + 致命级硬卡 + 一般级 IPMT 书面特批并承责，而非一刀切拦。' },
    { q:'用今天的概念，给治理层提 1 条「让 DCP 真能杀项目」的机制建议（落到组织/系统）。', hint:'把 IPMT 与 PDT 汇报线分离 + DCP 决议须记反对意见 + 例外书面特批，三选一落到制度。' }
  ]
};
