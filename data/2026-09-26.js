window.IPD_DAYS = window.IPD_DAYS || {};
window.IPD_DAYS['2026-09-26'] = {
  date: '2026-09-26', day: 45, topicIndex: 4,
  topicTitle: 'IPD 的需求/Charter/CBB：需求怎么来、共用模块怎么沉淀复用【第二轮·审计实战视角】',
  oneLiner: '第二轮把需求/Charter/CBB 当成「三条可追溯性审计链」：需求从哪来、 Charter 谁锁、CBB 复用率多少——都能定量、都能比对。',
  learning: `<h2>Day 45 · IPD 的需求 / Charter / CBB（审计实战视角：三条可追溯性审计链）</h2>
<p class="lead">第一轮我们记了「需求怎么来、Charter 是什么、CBB 怎么复用」；第二轮把它们升级为审计的三条<strong>可追溯性证据链</strong>——每一条都能定量、都能比对，这正是审计最容易产出价值的地方。</p>

<h3>① 今日主题</h3>
<p>IPD 的三个「源头物件」：<strong>需求（Requirement）</strong>来自市场/客户/标准，是产品存在的理由；<strong>Charter（任务书）</strong>是 IPMT 批准的项目任务书，锁定需求、范围、初始投资与里程碑；<strong>CBB（Common Building Block，共用构建模块）</strong>是可复用的成熟模块，沉淀后减少重复设计、提速降本。三者串成「需求→Charter→CBB 复用」的价值链。</p>

<h3>② 核心概念（三物件 + 审计追溯链）</h3>
<table class="term">
<thead><tr><th>物件</th><th>一句话</th><th>审计可追溯性验证</th></tr></thead>
<tbody>
<tr><td>需求 Requirement</td><td>产品要满足什么（市场/客户/法规）</td><td>需求有无编号、来源可追溯、变更有无记录</td></tr>
<tr><td>Charter</td><td>IPMT 批准的任务书，锁范围/投资</td><td>是否经 IPMT 批；变更是否重走 DCP</td></tr>
<tr><td>CBB</td><td>可复用共用模块</td><td>复用率指标；新设计是否优先调用 CBB</td></tr>
</tbody>
</table>

<h3>③ 为什么重要（业务 + 审计/内控/风险价值）</h3>
<ul>
<li><strong>业务价值</strong>：需求清、Charter 稳、CBB 多复用 → 少返工、快上市、低成本。</li>
<li><strong>审计价值</strong>：这三者是<strong>天然的审计线索</strong>。需求可追溯性差 → 范围蔓延；Charter 变更不重走 → 投资失控；CBB 复用率低 → 重复设计与采购分散。每一条都有数据可查。</li>
<li><strong>风险价值</strong>：三链断裂的三类经典病：① 需求「口说无凭」被随意加；② Charter 私下改、目标成本失效；③ 每个项目从零造轮子、采购无法归一。</li>
</ul>

<h3>④ 5W1H 拆解（审计取数清单）</h3>
<table class="map">
<thead><tr><th>物件</th><th>审计要拿的证据</th><th>缺失红旗</th></tr></thead>
<tbody>
<tr><td>需求</td><td>需求编号库 + 来源（市场/客户/法规）+ 变更日志</td><td>需求无编号、口头来、加了不记</td></tr>
<tr><td>Charter</td><td>IPMT 批准件 + 变更重走 DCP 记录</td><td>私下改范围、变更无决策</td></tr>
<tr><td>CBB</td><td>CBB 库 + 复用率报表 + 新设计调用记录</td><td>复用率不统计、每项目重造</td></tr>
</tbody>
</table>

<h3>⑤ 业内对标</h3>
<ul>
<li><strong>华为</strong>：需求有 OR（Offering Requirement）体系可追溯；Charter 强管控、变更走 DCP；CBB 平台化、复用率纳入考核。</li>
<li><strong>华三</strong>：同样可追溯，但更轻，Charter 变更靠预算闸门锁。</li>
<li><strong>宁德时代</strong>：CBB/平台化做到极致，电芯/模组高度复用，采购归一化收益巨大。</li>
</ul>

<h3>⑥ 生活化例子</h3>
<p>把三者想成<strong>开连锁餐厅</strong>：需求=顾客到底要吃什么（问卷/销量，可追溯）；Charter=总部批的「这家店卖什么、投多少钱」的任务书（改菜单要重新报批）；CBB=中央厨房的通用酱料/半成品（每家店复用，不用各店重熬）。审计就是「巡店督查」：需求有没有记录、改菜单有没有报批、各店是不是还在各熬各的（复用率低=采购分散、成本高）。</p>

<h3>⑦ 一句话记住</h3>
<p class="remember">需求、Charter、CBB 是 IPD 的三条<strong>可追溯性证据链</strong>；审计的价值，是核验「需求从哪来、Charter 谁锁、CBB 复用多少」——三条都能量化、都能比对。</p>`,
  exam: [
    { type:'single', q:'Charter（任务书）在 IPD 中的作用是？', options:['A. 一份可有可无的文档', 'B. 经 IPMT 批准、锁定需求/范围/初始投资与里程碑的项目任务书；变更须重走 DCP', 'C. 研发自己写的备注', 'D. 只给财务看'], answer:'B', analysis:'Charter 是投资的「契约」，锁定范围与钱；变更不重走 DCP 是最大内控缺口。' },
    { type:'single', q:'关于「需求可追溯性」，审计最该确认的是？', options:['A. 需求写得好不好看', 'B. 需求有无编号、来源（市场/客户/法规）是否可追溯、变更是否有记录', 'C. 需求字数', 'D. 谁写的'], answer:'B', analysis:'可追溯性 = 能追到来源 + 变更留痕；否则范围蔓延、加需求无据。' },
    { type:'multiple', q:'下列哪些属于 Charter 变更失控的红旗（采购审计警惕）？', options:['A. 计划阶段被业务私下加需求，未重走 DCP', 'B. 目标成本因范围变更失效，采购被动选商', 'C. 变更有 IPMT 书面决议并存档', 'D. 范围蔓延导致长交期器件紧急救火'], answer:['A','B','D'], analysis:'A/B/D 都是 Charter 失控症状；C 是正面控制。' },
    { type:'single', q:'CBB（共用构建模块）对采购的核心价值是？', options:['A. 让研发更忙', 'B. 复用成熟模块 → 减少重复设计、提升采购归一化与议价力、降本保供', 'C. 只服务研发效率', 'D. 增加 SKU'], answer:'B', analysis:'CBB 复用直接带来采购归一化（更少器件、更大批量、更强议价），是降本保供的底层抓手。' },
    { type:'multiple', q:'审计验证 CBB 机制是否真落地，可取的证据有？', options:['A. CBB 库是否维护、模块是否标注成熟度', 'B. 新设计是否「优先调用 CBB」的规则与记录', 'C. CBB 复用率是否纳入考核报表', 'D. 每个项目都从零设计、无复用统计'], answer:['A','B','C'], analysis:'A/B/C 是 CBB 落地的正面证据；D 是反面——复用率不统计等于没做。' },
    { type:'single', q:'「需求口说无凭」最直接导致的下游问题是？', options:['A. 团队氛围差', 'B. 范围蔓延：业务随时加需求、Charter 失效、成本失控', 'C. 文档太少', 'D. 会议太少'], answer:'B', analysis:'需求不可追溯 → 加需求无据 → Charter 锁不住 → 成本与选型全被动。' },
    { type:'single', q:'从审计看，需求/Charter/CBB 三链的共同特征是？', options:['A. 都很主观', 'B. 都是「可追溯、可量化、可比对」的证据链，适合审计取数', 'C. 都只给研发看', 'D. 都无法验证'], answer:'B', analysis:'三物件天然带编号/版本/指标，是审计最容易定量产出价值的区域。' },
    { type:'multiple', q:'下列哪些是「三链断裂」的典型病症？', options:['A. 需求无编号、口头来', 'B. Charter 私下改、不重走 DCP', 'C. CBB 复用率不统计、每项目重造', 'D. 需求可追溯、Charter 变更走 DCP、CBB 复用率高'], answer:['A','B','C'], analysis:'A/B/C 是三链断裂病症；D 是健康状态。' },
    { type:'short', q:'请为「需求/Charter/CBB」设计一张审计检查单：每物件写 1 个最想卡的审计点 + 1 类硬证据。', answer:null, analysis:'参考要点：需求（可追溯性：编号库+来源+变更日志）；Charter（变更管控：IPMT 批准件+变更重走 DCP 记录）；CBB（复用率：CBB 库+复用率报表+新设计调用记录）。每点配证据，体现「可追溯、可量化、可比对」。' },
    { type:'short', q:'结合本公司，写一句你最想推动的「三链可追溯」整改建议（针对目前最弱的一链）。', answer:null, analysis:'参考要点：先点最弱链（如「Charter 变更不重走 DCP」），建议「Charter 设版本库 + 范围/投资变更强制重走 DCP 系统卡点 + 变更台账审计可查」，把软约束变硬卡点。' }
  ],
  caseStudy: `<h2>典型案例深读：Charter 私下改写，让一款产品成本失控 2000 万</h2>
<p class="lead">本案例与今日主题关系：用真实风格复盘，演示「Charter 变更不重走 DCP」如何传导到采购成本失控——把需求/Charter/CBB 三链串成一条审计因果线。</p>

<h3>背景</h3>
<p>某工业交换机厂商（化名「K 厂」）一款网关产品，Charter 原定「标准型、BOM 成本 ≤ 800 元」。上市前业务为抢一个客户，私下把规格提到「高端型」，BOM 成本飙到 1200 元，仍按原定价卖，单台亏 200 元、累计亏约 2000 万。审计在成本异常中被拉入。</p>

<h3>过程</h3>
<p>审计沿三链倒查：需求链——客户「加配」要求仅销售口头传达，无需求编号；Charter 链——原 Charter 未变更、无 IPMT 重批，范围被私下放大；CBB 链——新规格弃用现有 CBB、改用定制件，采购无法归一、单价高。三链全断，根因在 Charter 变更失控。</p>

<h3>踩坑（三个被钉死的点）</h3>
<ol>
<li><strong>Charter 私下改</strong>：范围放大未经 IPMT，目标成本失效，采购按新规格被动选商。</li>
<li><strong>需求无编号可追溯</strong>：客户加配只口头传，无法判断是否真需求、能否拒绝。</li>
<li><strong>CBB 未调用</strong>：为赶规格弃用成熟 CBB，定制件拉高成本且拉长交期。</li>
</ol>

<h3>与别家对比</h3>
<p>华为同类变更，Charter 必重走 DCP、目标成本重算、CBB 优先调用；K 厂输在<strong>Charter 当摆设、变更靠口头</strong>。</p>

<h3>现状</h3>
<p>审计定性「Charter 变更失控 + 成本前端失守」，推动：① Charter 版本库 + 变更强制重走 DCP；② 需求编号与可追溯；③ 新设计「CBB 优先」规则。后续同类变更均经决策，成本回归基线。</p>

<h3>启示（审计视角）</h3>
<ul>
<li>成本失控往往不在采购环节，而在<strong>前端的 Charter 变更没卡住</strong>。审计要往前看。</li>
<li>需求可追溯性是第一道防线——口说无凭的需求，是范围蔓延的入口。</li>
<li>CBB 复用率是采购降本的「隐藏杠杆」，审计应把它纳入常态化指标监控。</li>
</ul>`,
  resources: [
    { type:'📖', title:'从偶然到必然：华为研发投资与管理实践（升级版）', source:'夏忠毅·清华大学出版社', reason:'需求/Charter/CBB 与 OR 体系的可追溯设计', link:'https://www.sinobook.com.cn/main/newsdetail.cfm?iCntno=110479' },
    { type:'📖', title:'华为能，你也能：IPD重构产品研发', source:'刘劲松、胡必刚·中国人民大学出版社', reason:'Charter 与 CBB 的通俗讲法', link:'https://book.douban.com/subject_search?search_text=华为能你也能IPD' },
    { type:'🔗', title:'一文讲透华为IPD：从核心理念到落地实践', source:'CSDN 长文', reason:'需求与 Charter 落地视角', link:'https://blog.csdn.net/weixin_33960567/article/details/162358087' },
    { type:'🔗', title:'IPD不只是流程：解码华为产品从构想到退市的「生命线」', source:'CSDN 长文', reason:'CBB 平台化与复用视角', link:'https://blog.csdn.net/weixin_30898555/article/details/162116309' },
    { type:'🔗', title:'IPD流程的最高境界，是知道边界在哪', source:'人人都是产品经理', reason:'帮你判断 Charter 该硬卡到哪', link:'https://www.woshipm.com/pd/6440701.html' }
  ],
  advanced: [
    { q:'把你本公司一个真实产品的「需求→Charter→CBB」三链画出来，标出哪一链最先断、断了带来什么成本后果？', hint:'通常 Charter 变更不重走 DCP 最先断，直接传导采购成本与选型被动。' },
    { q:'如果业务总用「客户要的」为理由口头加需求，作为审计你该怎么既满足客户又守住可追溯底线？', hint:'需求必须编号+来源记录+影响评估；加配触发 Charter 变更重走 DCP，而非口头改。' },
    { q:'用今天的概念，给研发/采购提 1 条「把 CBB 复用率变硬指标」的建议（落到考核/系统）。', hint:'把「新设计 CBB 优先调用率」纳入研发考核 + 系统在设计工具里强制推荐 CBB，复用率低需特批。' }
  ]
};
