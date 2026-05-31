import type { Format } from '../types'

export function buildCss(format: Format): string {
  const isYT   = format === 'youtube'
  const stageW = isYT ? '1280px' : '390px'
  const stageH = isYT ? '720px'  : '844px'
  const mediaW = isYT ? '1280px' : '390px'
  const ratio  = isYT ? '720 / 1280' : '844 / 390'
  const minH   = isYT ? '' : 'min-height: 100svh;'

  return `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

body{background:#050508;min-height:100vh;display:flex;justify-content:center;align-items:center;overflow:hidden;font-family:'Segoe UI',system-ui,-apple-system,sans-serif}

.stage{width:${stageW};height:${stageH};flex-shrink:0;overflow:hidden;position:relative;background:#050508}

@media(max-width:${mediaW}){
  body{align-items:flex-start}
  .stage{width:100vw;height:calc(100vw * ${ratio});${minH}}
}

.scene{position:absolute;inset:0;display:none}
.scene.active{display:block}

.progress-bar{position:absolute;bottom:0;left:0;right:0;height:4px;background:rgba(255,255,255,.08);z-index:100}
.progress-fill{height:100%;width:0%;background:linear-gradient(90deg,#7c3aed,#06b6d4);position:relative;overflow:hidden}
.progress-fill::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.4),transparent);animation:shimmer 1.5s infinite}

.bg{position:absolute;inset:0;background:
  radial-gradient(ellipse 920px 620px at 15% 45%,rgba(109,40,217,.56) 0%,transparent 70%),
  radial-gradient(ellipse 700px 520px at 86% 68%,rgba(6,182,212,.33) 0%,transparent 65%),
  radial-gradient(ellipse 500px 380px at 58% 8%,rgba(139,92,246,.26) 0%,transparent 60%),
  radial-gradient(ellipse 400px 300px at 75% 88%,rgba(16,185,129,.13) 0%,transparent 55%)}
.grid-overlay{position:absolute;inset:0;background-image:linear-gradient(rgba(139,92,246,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,.05) 1px,transparent 1px);background-size:80px 80px}

@keyframes shimmer{from{transform:translateX(-100%)}to{transform:translateX(220%)}}
@keyframes phraseIn{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes phraseOut{from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-26px)}}
@keyframes slideRight{from{opacity:0;transform:translateX(-46px)}to{opacity:1;transform:translateX(0)}}
@keyframes slideLeft{from{opacity:0;transform:translateX(46px)}to{opacity:1;transform:translateX(0)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes glow{0%,100%{opacity:.72}50%{opacity:1}}

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

/* END */
#sEnd.active{display:flex!important;align-items:center;justify-content:center}
.end-wrap{text-align:center}
.end-title{font-size:52px;font-weight:900;background:linear-gradient(135deg,#a78bfa,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:14px}
.end-sub{font-size:20px;color:rgba(255,255,255,.4);margin-bottom:42px}
.btn-replay{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,#7c3aed,#0891b2);border:none;border-radius:100px;color:#fff;font-size:18px;font-weight:700;padding:18px 44px;cursor:pointer;letter-spacing:1px;transition:filter .2s}
.btn-replay:hover{filter:brightness(1.15)}
`.trim()
}
