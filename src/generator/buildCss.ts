import type { BgTheme, Format } from '../types'

const BG_THEMES: Record<BgTheme, { base: string; bg: string; grid: string }> = {
  nebula: {
    base: '#050508',
    bg: `radial-gradient(ellipse 920px 620px at 15% 45%,rgba(109,40,217,.56) 0%,transparent 70%),
  radial-gradient(ellipse 700px 520px at 86% 68%,rgba(6,182,212,.33) 0%,transparent 65%),
  radial-gradient(ellipse 500px 380px at 58% 8%,rgba(139,92,246,.26) 0%,transparent 60%),
  radial-gradient(ellipse 400px 300px at 75% 88%,rgba(16,185,129,.13) 0%,transparent 55%)`,
    grid: 'rgba(139,92,246,.05)',
  },
  midnight: {
    base: '#020510',
    bg: `radial-gradient(ellipse 900px 600px at 12% 50%,rgba(49,46,129,.65) 0%,transparent 70%),
  radial-gradient(ellipse 720px 500px at 88% 60%,rgba(29,78,216,.4) 0%,transparent 65%),
  radial-gradient(ellipse 520px 380px at 55% 10%,rgba(6,182,212,.22) 0%,transparent 60%),
  radial-gradient(ellipse 380px 280px at 70% 90%,rgba(109,40,217,.18) 0%,transparent 55%)`,
    grid: 'rgba(99,102,241,.05)',
  },
  ember: {
    base: '#080205',
    bg: `radial-gradient(ellipse 900px 600px at 18% 48%,rgba(159,18,57,.55) 0%,transparent 70%),
  radial-gradient(ellipse 700px 500px at 84% 65%,rgba(194,65,12,.38) 0%,transparent 65%),
  radial-gradient(ellipse 500px 360px at 60% 10%,rgba(120,53,15,.28) 0%,transparent 60%),
  radial-gradient(ellipse 380px 280px at 78% 85%,rgba(127,29,29,.18) 0%,transparent 55%)`,
    grid: 'rgba(239,68,68,.04)',
  },
  forest: {
    base: '#020a05',
    bg: `radial-gradient(ellipse 920px 620px at 14% 46%,rgba(6,78,59,.6) 0%,transparent 70%),
  radial-gradient(ellipse 700px 520px at 85% 65%,rgba(19,78,74,.38) 0%,transparent 65%),
  radial-gradient(ellipse 500px 360px at 56% 8%,rgba(20,83,45,.28) 0%,transparent 60%),
  radial-gradient(ellipse 380px 280px at 74% 88%,rgba(6,182,212,.12) 0%,transparent 55%)`,
    grid: 'rgba(52,211,153,.04)',
  },
  ice: {
    base: '#030609',
    bg: `radial-gradient(ellipse 900px 600px at 16% 48%,rgba(7,89,133,.55) 0%,transparent 70%),
  radial-gradient(ellipse 720px 500px at 86% 62%,rgba(30,58,138,.35) 0%,transparent 65%),
  radial-gradient(ellipse 500px 360px at 57% 9%,rgba(8,145,178,.22) 0%,transparent 60%),
  radial-gradient(ellipse 380px 280px at 72% 88%,rgba(37,99,235,.14) 0%,transparent 55%)`,
    grid: 'rgba(186,230,253,.04)',
  },
}

export function buildCss(format: Format, bgTheme: BgTheme = 'nebula'): string {
  const isYT   = format === 'youtube'
  const stageW = isYT ? '1280px' : '390px'
  const stageH = isYT ? '720px'  : '844px'
  const mediaW = isYT ? '1280px' : '390px'
  const ratio  = isYT ? '720 / 1280' : '844 / 390'
  const minH   = isYT ? '' : 'min-height: 100svh;'
  const { base, bg, grid } = BG_THEMES[bgTheme]

  return `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

body{background:${base};min-height:100vh;display:flex;justify-content:center;align-items:center;overflow:hidden;font-family:'Segoe UI',system-ui,-apple-system,sans-serif}

.stage{width:${stageW};height:${stageH};flex-shrink:0;overflow:hidden;position:relative;background:${base}}

@media(max-width:${mediaW}){
  body{align-items:flex-start}
  .stage{width:100vw;height:calc(100vw * ${ratio});${minH}}
}

.scene{position:absolute;inset:0;display:none}
.scene.active{display:block}

.progress-bar{position:absolute;bottom:0;left:0;right:0;height:4px;background:rgba(255,255,255,.08);z-index:100}
.progress-fill{height:100%;width:0%;background:linear-gradient(90deg,#7c3aed,#06b6d4);position:relative;overflow:hidden}
.progress-fill::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.4),transparent);animation:shimmer 1.5s infinite}

.bg{position:absolute;inset:0;pointer-events:none;background:
  ${bg}}
.grid-overlay{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(${grid} 1px,transparent 1px),linear-gradient(90deg,${grid} 1px,transparent 1px);background-size:80px 80px}

@keyframes shimmer{from{transform:translateX(-100%)}to{transform:translateX(220%)}}
@keyframes phraseIn{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes phraseOut{from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-26px)}}
@keyframes slideRight{from{opacity:0;transform:translateX(-46px)}to{opacity:1;transform:translateX(0)}}
@keyframes slideLeft{from{opacity:0;transform:translateX(46px)}to{opacity:1;transform:translateX(0)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes glow{0%,100%{opacity:.72}50%{opacity:1}}
@keyframes popIn{from{opacity:0;transform:scale(.72)}to{opacity:1;transform:scale(1)}}

.phrase{position:absolute;inset:0;display:flex;opacity:0;animation-fill-mode:forwards}
.phrase.entering{animation:phraseIn .6s ease-out forwards}
.phrase.exiting{animation:phraseOut .45s ease-in forwards}

/* STATEMENT */
.st-label{font-size:12px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:#8b5cf6;margin-bottom:22px}
.st-main{font-size:62px;font-weight:900;line-height:1.13;color:#f1f5f9}
.st-kw{background:linear-gradient(135deg,#a78bfa,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.st-sub{font-size:22px;color:rgba(255,255,255,.48);margin-top:26px;line-height:1.55}

/* QUOTE */
.q-mark{font-size:100px;line-height:.6;color:rgba(139,92,246,.3);font-family:Georgia,serif;display:block;margin-bottom:26px}
.q-text{font-size:28px;font-style:italic;line-height:1.68;color:rgba(255,255,255,.9)}
.q-text em{font-style:normal;color:#a78bfa;font-weight:700}
.q-line{height:3px;width:60px;background:linear-gradient(90deg,#7c3aed,transparent);margin:30px 0 18px}
.q-foot{font-size:13px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.35)}

/* ALERT RED */
.al-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.35);border-radius:100px;padding:6px 18px;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#fca5a5;margin-bottom:24px}
.al-card{border-left:4px solid #ef4444;background:rgba(18,3,3,.92);border-radius:16px;padding:30px 36px}
.al-title{font-size:18px;font-weight:700;color:#fca5a5;margin-bottom:20px}
.al-body{font-size:22px;line-height:1.7;color:#f1f5f9}
.al-body.code{font-family:'Courier New',monospace}
.al-highlight{display:inline-flex;align-items:center;gap:12px;margin-top:20px;padding:12px 18px;background:rgba(239,68,68,.1);border-radius:10px;border:1px solid rgba(239,68,68,.2);font-size:17px;font-weight:700;color:#fca5a5}

/* ALERT AMBER */
.al7-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.35);border-radius:100px;padding:6px 18px;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#fde68a;margin-bottom:24px}
.al7-card{border-left:4px solid #f59e0b;background:rgba(20,13,2,.92);border-radius:16px;padding:30px 36px}
.al7-title{font-size:16px;font-weight:700;color:#fde68a;margin-bottom:20px;letter-spacing:2px;text-transform:uppercase}
.al7-body{font-size:22px;line-height:1.65;color:#f1f5f9}
.al7-body.code{font-family:'Courier New',monospace}
.al7-highlight{display:inline-flex;align-items:center;gap:12px;margin-top:22px;padding:14px 20px;background:rgba(245,158,11,.12);border-radius:12px;border:1px solid rgba(245,158,11,.25);font-size:18px;font-weight:700;color:#fde68a}

/* LIST-ITEMS */
.li-intro{font-size:13px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.38);margin-bottom:28px}
.list-card{display:flex;align-items:center;gap:20px;border-radius:14px;padding:20px 26px;margin-bottom:12px;opacity:0;animation-fill-mode:forwards}
.list-card.visible{animation:slideRight .45s ease-out forwards}
.lc-icon{font-size:26px;flex-shrink:0}
.lc-text{font-size:22px;color:#f1f5f9;font-weight:600}
.list-card.purple{border:1px solid rgba(124,58,237,.4);background:rgba(124,58,237,.1)}
.list-card.cyan{border:1px solid rgba(6,182,212,.4);background:rgba(6,182,212,.09)}
.list-card.amber{border:1px solid rgba(251,191,36,.32);background:rgba(251,191,36,.07)}
.list-card.green{border:1px solid rgba(52,211,153,.32);background:rgba(52,211,153,.07)}

/* BIG-NUMBER */
.bn-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(6,182,212,.12);border:1px solid rgba(6,182,212,.35);border-radius:100px;padding:6px 18px;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#67e8f9;margin-bottom:24px}
.bn-label{font-size:12px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:#06b6d4;margin-bottom:18px}
.bn-title{font-size:40px;font-weight:900;color:#f1f5f9;line-height:1.2;margin-bottom:18px}
.bn-sub{font-size:20px;color:rgba(255,255,255,.45);line-height:1.6}
.bn-num{font-size:180px;font-weight:900;line-height:1;background:linear-gradient(135deg,#a78bfa,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;filter:drop-shadow(0 0 50px rgba(6,182,212,.4))}
.bn-unit{font-size:18px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.4);margin-top:8px}

/* CHAIN */
.chain-label{font-size:13px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:36px}
.chain-item{display:flex;align-items:center;gap:26px;margin-bottom:18px;opacity:0;animation-fill-mode:forwards}
.chain-item.visible{animation:slideRight .5s ease-out forwards}
.ci-step{font-size:12px;font-weight:700;letter-spacing:2px;color:rgba(255,255,255,.2);flex-shrink:0;width:28px}
.chain-item:nth-child(2) .ci-consequence{font-size:28px;color:rgba(255,255,255,.45)}
.chain-item:nth-child(3) .ci-consequence{font-size:40px;color:#fde68a;font-weight:700}
.chain-item:nth-child(4) .ci-consequence{font-size:54px;color:#f97316;font-weight:900;line-height:1.15}
.chain-item:nth-child(5) .ci-consequence{font-size:60px;color:#ef4444;font-weight:900;line-height:1.1}

/* CHECKLIST */
.cl-intro{font-size:13px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.38);margin-bottom:32px}
.check-item{display:flex;align-items:flex-start;gap:20px;margin-bottom:22px;opacity:0;animation-fill-mode:forwards}
.check-item.visible{animation:fadeUp .45s ease-out forwards}
.ci-check{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#059669,#34d399);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;margin-top:2px}
.ci-text{font-size:24px;color:#f1f5f9;line-height:1.45}
.ci-text em{font-style:normal;color:#6ee7b7;font-weight:700}

/* COMPARISON */
.cmp-label{font-size:13px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.28)}
.cmp-row{display:flex;gap:20px;width:100%}
.cmp-card{flex:1;border-radius:18px;padding:30px 32px;opacity:0;animation-fill-mode:forwards}
.cmp-card.yes{background:rgba(5,150,105,.1);border:1px solid rgba(52,211,153,.3)}
.cmp-card.no{background:rgba(127,29,29,.12);border:1px solid rgba(239,68,68,.25)}
.cmp-card.enter-l{animation:slideRight .5s ease-out forwards}
.cmp-card.enter-r{animation:slideLeft .5s ease-out forwards}
.cmp-icon{font-size:32px;margin-bottom:14px}
.cmp-tag{font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin-bottom:10px}
.cmp-card.yes .cmp-tag{color:#34d399}
.cmp-card.no .cmp-tag{color:#f87171}
.cmp-title{font-size:26px;font-weight:900;line-height:1.2;margin-bottom:12px}
.cmp-card.yes .cmp-title{color:#f1f5f9}
.cmp-card.no .cmp-title{color:rgba(255,255,255,.42);text-decoration:line-through;text-decoration-color:rgba(239,68,68,.5)}
.cmp-desc{font-size:17px;line-height:1.5}
.cmp-card.yes .cmp-desc{color:rgba(255,255,255,.6)}
.cmp-card.no .cmp-desc{color:rgba(255,255,255,.3)}
.cmp-verdict{font-size:20px;font-weight:700;color:rgba(255,255,255,.55);text-align:center;opacity:0;animation-fill-mode:forwards}
.cmp-verdict.visible{animation:fadeUp .5s ease-out forwards}
.cmp-verdict strong{color:#a78bfa}

/* TITLE-CARD */
.tc-eyebrow{font-size:13px;font-weight:700;letter-spacing:5px;text-transform:uppercase;color:rgba(255,255,255,.35);margin-bottom:32px}
.tc-main{font-size:82px;font-weight:900;line-height:1.05;color:#f1f5f9}
.tc-line{height:4px;width:80px;background:linear-gradient(90deg,#7c3aed,#06b6d4);border-radius:2px;margin:32px auto}
.tc-tagline{font-size:24px;color:rgba(255,255,255,.45);line-height:1.5}

/* STEPS */
.sp-intro{font-size:13px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.35);margin-bottom:30px}
.step-item{display:flex;align-items:flex-start;gap:24px;margin-bottom:22px;opacity:0;animation-fill-mode:forwards}
.step-item.visible{animation:slideRight .45s ease-out forwards}
.sp-num{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:900;flex-shrink:0;background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#fff}
.sp-text{font-size:26px;font-weight:700;color:#f1f5f9;line-height:1.3}
.sp-detail{font-size:16px;color:rgba(255,255,255,.4);margin-top:5px}

/* STAT-ROW */
.srow-label{font-size:12px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:40px;text-align:center}
.srow-grid{display:flex;gap:20px;justify-content:center}
.srow-card{flex:1;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:32px 20px;text-align:center;opacity:0;animation-fill-mode:forwards}
.srow-card.visible{animation:fadeUp .45s ease-out forwards}
.srow-icon{font-size:34px;margin-bottom:14px}
.srow-value{font-size:50px;font-weight:900;line-height:1;background:linear-gradient(135deg,#a78bfa,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.srow-metric{font-size:14px;font-weight:600;color:rgba(255,255,255,.55);margin-top:10px;letter-spacing:1px}
.srow-detail{font-size:12px;color:rgba(255,255,255,.3);margin-top:5px}

/* QUESTION */
.qn-mark{font-size:80px;font-weight:900;line-height:1;font-style:italic;background:linear-gradient(135deg,#7c3aed,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;display:block;text-align:center;margin-bottom:14px}
.qn-q{font-size:34px;font-weight:800;color:#f1f5f9;text-align:center;line-height:1.3;margin-bottom:30px}
.qn-divider{height:2px;width:80px;background:linear-gradient(90deg,transparent,rgba(124,58,237,.7),rgba(6,182,212,.7),transparent);margin:0 auto 28px}
.qn-a{font-size:26px;color:rgba(255,255,255,.7);text-align:center;line-height:1.6;opacity:0;animation-fill-mode:forwards}
.qn-a.visible{animation:fadeUp .5s ease-out forwards}
.qn-note{font-size:15px;color:rgba(255,255,255,.3);margin-top:14px}

/* MYTH-FACT */
.mf-label{font-size:12px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.28);margin-bottom:24px;text-align:center}
.mf-row{display:flex;gap:20px;width:100%}
.mf-card{flex:1;border-radius:18px;padding:32px;opacity:0;animation-fill-mode:forwards}
.mf-card.myth{background:rgba(127,29,29,.18);border:2px solid rgba(239,68,68,.3)}
.mf-card.fact{background:rgba(5,150,105,.12);border:2px solid rgba(52,211,153,.3)}
.mf-badge{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;padding:5px 14px;border-radius:100px;margin-bottom:18px}
.mf-card.myth .mf-badge{background:rgba(239,68,68,.15);color:#fca5a5}
.mf-card.fact .mf-badge{background:rgba(52,211,153,.15);color:#6ee7b7}
.mf-icon{font-size:30px;margin-bottom:12px}
.mf-title{font-size:24px;font-weight:800;line-height:1.25;margin-bottom:10px}
.mf-card.myth .mf-title{color:rgba(255,255,255,.4);text-decoration:line-through;text-decoration-color:rgba(239,68,68,.65)}
.mf-card.fact .mf-title{color:#f1f5f9}
.mf-desc{font-size:17px;line-height:1.5}
.mf-card.myth .mf-desc{color:rgba(255,255,255,.3)}
.mf-card.fact .mf-desc{color:rgba(255,255,255,.6)}
.mf-card.enter-l{animation:slideRight .5s ease-out forwards}
.mf-card.enter-r{animation:slideLeft .5s ease-out forwards}

/* PILL-TAGS */
.pt-title{font-size:42px;font-weight:900;color:#f1f5f9;text-align:center;margin-bottom:8px}
.pt-sub{font-size:19px;color:rgba(255,255,255,.38);text-align:center;margin-bottom:36px}
.pt-grid{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
.pill-tag{display:inline-flex;align-items:center;padding:10px 24px;border-radius:100px;font-size:18px;font-weight:600;opacity:0;transform:scale(.75);animation-fill-mode:forwards}
.pill-tag.visible{animation:popIn .4s cubic-bezier(.34,1.56,.64,1) forwards}
.pill-tag.purple{background:rgba(109,40,217,.2);border:1px solid rgba(139,92,246,.45);color:#c4b5fd}
.pill-tag.cyan{background:rgba(6,182,212,.15);border:1px solid rgba(6,182,212,.4);color:#67e8f9}
.pill-tag.amber{background:rgba(245,158,11,.12);border:1px solid rgba(245,158,11,.35);color:#fde68a}
.pill-tag.green{background:rgba(16,185,129,.12);border:1px solid rgba(52,211,153,.35);color:#6ee7b7}
.pill-tag.rose{background:rgba(244,63,94,.12);border:1px solid rgba(251,113,133,.35);color:#fda4af}

/* TIMELINE */
.tl-intro{font-size:13px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.35);margin-bottom:30px}
.tl-list{position:relative;padding-left:16px}
.tl-list::before{content:'';position:absolute;left:8px;top:8px;bottom:8px;width:2px;background:linear-gradient(to bottom,rgba(124,58,237,.8),rgba(6,182,212,.2))}
.tl-event{display:flex;align-items:flex-start;gap:20px;margin-bottom:24px;opacity:0;animation-fill-mode:forwards}
.tl-event.visible{animation:slideRight .45s ease-out forwards}
.tl-dot{width:16px;height:16px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#06b6d4);flex-shrink:0;margin-top:5px;box-shadow:0 0 12px rgba(124,58,237,.5)}
.tl-date{font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:3px}
.tl-etitle{font-size:22px;font-weight:700;color:#f1f5f9;line-height:1.25}
.tl-edesc{font-size:15px;color:rgba(255,255,255,.4);margin-top:3px;line-height:1.5}

/* CALLOUT */
.co-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:24px;padding:52px 64px;text-align:center;position:relative;overflow:hidden}
.co-card::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 700px 400px at 50% 130%,rgba(124,58,237,.1),transparent)}
.co-icon{font-size:66px;display:block;margin-bottom:20px}
.co-label{font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.28);margin-bottom:18px}
.co-text{font-size:38px;font-weight:800;line-height:1.28;color:#f1f5f9}
.co-note{font-size:18px;color:rgba(255,255,255,.38);margin-top:22px;line-height:1.5}

/* VERSUS */
.vs-label{font-size:12px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.28);margin-bottom:24px;text-align:center}
.vs-row{display:flex;align-items:stretch;gap:3px;width:100%;position:relative}
.vs-badge{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:10;background:#050508;border:2px solid rgba(255,255,255,.1);border-radius:50%;width:50px;height:50px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:900;letter-spacing:1px;color:rgba(255,255,255,.45)}
.vs-side{flex:1;padding:30px;opacity:0;animation-fill-mode:forwards}
.vs-side.left{background:rgba(124,58,237,.08);border:1px solid rgba(124,58,237,.2);border-radius:16px 0 0 16px}
.vs-side.right{background:rgba(6,182,212,.08);border:1px solid rgba(6,182,212,.2);border-radius:0 16px 16px 0}
.vs-side.left.enter-l{animation:slideRight .5s ease-out forwards}
.vs-side.right.enter-r{animation:slideLeft .5s ease-out forwards}
.vs-name{font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin-bottom:14px}
.vs-side.left .vs-name{color:#a78bfa}
.vs-side.right .vs-name{color:#67e8f9}
.vs-heading{font-size:26px;font-weight:900;color:#f1f5f9;margin-bottom:14px;line-height:1.2}
.vs-desc{font-size:17px;color:rgba(255,255,255,.55);line-height:1.55}

/* END */
#sEnd.active{display:flex!important;align-items:center;justify-content:center}
.end-wrap{text-align:center}
.end-title{font-size:52px;font-weight:900;background:linear-gradient(135deg,#a78bfa,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:14px}
.end-sub{font-size:20px;color:rgba(255,255,255,.4);margin-bottom:42px}
.btn-replay{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,#7c3aed,#0891b2);border:none;border-radius:100px;color:#fff;font-size:18px;font-weight:700;padding:18px 44px;cursor:pointer;letter-spacing:1px;transition:filter .2s}
.btn-replay:hover{filter:brightness(1.15)}
`.trim()
}
