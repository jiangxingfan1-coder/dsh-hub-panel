// dsh-hub-panel client face — Settings › Hub：生态索引浏览页。
// 数据源：dsh-hub-index 的公开 entries.json（策展 + 信任分层）。
// 铁律：本面板只「发现」，安装命令仅供复制——装插件 = npm postinstall +
// Host realm 零审批 = 交出整台机器，这个决定必须留在人手上。
import { useEffect, useMemo, useState } from 'react'

const INDEX_URL = 'https://jiangxingfan1-coder.github.io/dsh-hub-index/entries.json'
const SITE_URL = 'https://jiangxingfan1-coder.github.io/dsh-hub-index/'
const TRUST_COLOR = {
  official: { bg: '#dbeafe', fg: '#1d4ed8' },
  verified: { bg: '#dcfce7', fg: '#15803d' },
  community: { bg: '#fef9c3', fg: '#a16207' },
  unreviewed: { bg: '#fee2e2', fg: '#b91c1c' },
}

function Chip({ text, tone, title, onClick, active }) {
  const c = TRUST_COLOR[tone] ?? { bg: 'rgba(127,127,127,.14)', fg: 'inherit' }
  return (
    <span
      title={title}
      onClick={onClick}
      style={{
        fontSize: 12, padding: '1px 9px', borderRadius: 99, background: c.bg, color: c.fg,
        cursor: onClick ? 'pointer' : 'default', whiteSpace: 'nowrap',
        outline: active ? '1.5px solid currentColor' : 'none',
      }}
    >{text}</span>
  )
}

function installCmd(e) {
  if (!e.install) return null
  if (e.kind === 'plugin' && /^(github:|@|[a-z0-9-]+$)/.test(e.install)) return `dsh plugin --profile web add ${e.install}`
  return e.install
}

function Card({ e }) {
  const [copied, setCopied] = useState(false)
  const cmd = installCmd(e)
  return (
    <div style={{
      border: '1px solid rgba(127,127,127,.25)', borderRadius: 10, padding: '10px 14px',
      marginBottom: 10, borderLeft: e.kind === 'compose' ? '3px solid #6366f1' : undefined,
    }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
        <b style={{ fontSize: 15 }}>{e.name}</b>
        <Chip text={e.kind} />
        <Chip text={e.trust} tone={e.trust} />
        {e.security?.jsExpressions && <Chip text="!!js" tone="unreviewed" title="patch/preset 含 !!js 表达式（任意代码）" />}
        {e.publisher?.github && <Chip text={`@${e.publisher.github}`} title="发布者" />}
      </div>
      <div style={{ margin: '5px 0', lineHeight: 1.55 }}>{e.description}</div>
      {e.securityNotes && (
        <div style={{ fontSize: 12.5, opacity: 0.75, margin: '2px 0 6px' }}>🔎 <i>{e.securityNotes}</i></div>
      )}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', fontSize: 13 }}>
        {cmd && (
          <>
            <code style={{ background: 'rgba(127,127,127,.12)', padding: '2px 7px', borderRadius: 5 }}>{cmd}</code>
            <a
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => { navigator.clipboard?.writeText(cmd).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) }) }}
            >{copied ? '已复制 ✓' : '复制'}</a>
          </>
        )}
        {e.source?.repo && <a href={e.source.repo} target="_blank" rel="noreferrer">仓库</a>}
        {e.source?.npm && <a href={e.source.npm} target="_blank" rel="noreferrer">npm</a>}
        {e.source?.discussion && <a href={e.source.discussion} target="_blank" rel="noreferrer">discussion</a>}
      </div>
    </div>
  )
}

function HubPanel() {
  const [state, setState] = useState({ phase: 'loading', entries: [] })
  const [q, setQ] = useState('')
  const [fKind, setFKind] = useState('all')
  const [fTrust, setFTrust] = useState('all')

  useEffect(() => {
    const ac = new AbortController()
    fetch(INDEX_URL, { signal: ac.signal })
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
      .then((d) => setState({ phase: 'ready', entries: d.entries }))
      .catch((e) => { if (e.name !== 'AbortError') setState({ phase: 'error', entries: [], error: String(e.message ?? e) }) })
    return () => ac.abort()
  }, [])

  const kinds = useMemo(() => ['all', ...new Set(state.entries.map((e) => e.kind))], [state.entries])
  const trusts = useMemo(() => ['all', ...new Set(state.entries.map((e) => e.trust))], [state.entries])
  const hits = useMemo(() => state.entries.filter((e) =>
    (fKind === 'all' || e.kind === fKind) && (fTrust === 'all' || e.trust === fTrust) &&
    (!q || `${e.name} ${e.description} ${e.publisher?.github ?? ''}`.toLowerCase().includes(q.toLowerCase()))
  ), [state.entries, q, fKind, fTrust])

  return (
    <div style={{ maxWidth: 780, padding: '4px 2px', fontSize: 14 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
        <h2 style={{ margin: '2px 0 6px', fontSize: 18 }}>Hub — 生态索引</h2>
        <a href={SITE_URL} target="_blank" rel="noreferrer" style={{ fontSize: 12.5 }}>在浏览器打开 ↗</a>
      </div>
      <div style={{
        fontSize: 12.5, opacity: 0.8, border: '1px solid rgba(127,127,127,.25)',
        borderRadius: 8, padding: '7px 12px', marginBottom: 10, lineHeight: 1.5,
      }}>
        ⚠️ 装一个 dsh 插件 = npm postinstall + Host realm 零审批 = 交出整台机器。unreviewed 条目请读源码后再装；下载量与排名不参与信任评级。
      </div>
      <input
        placeholder="搜索名称 / 描述 / 发布者…" value={q} onChange={(e) => setQ(e.target.value)}
        style={{
          width: '100%', boxSizing: 'border-box', padding: '7px 12px', fontSize: 14,
          borderRadius: 8, border: '1px solid rgba(127,127,127,.35)', background: 'transparent', color: 'inherit', marginBottom: 8,
        }}
      />
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 10 }}>
        {kinds.map((k) => <Chip key={k} text={k} onClick={() => setFKind(k)} active={fKind === k} />)}
        <span style={{ width: 8 }} />
        {trusts.map((t) => <Chip key={t} text={t} tone={t} onClick={() => setFTrust(t)} active={fTrust === t} />)}
      </div>
      {state.phase === 'loading' && <p style={{ opacity: 0.7 }}>加载索引…</p>}
      {state.phase === 'error' && <p style={{ opacity: 0.7 }}>索引不可达（{state.error}）。<a href={SITE_URL} target="_blank" rel="noreferrer">试试网页版</a></p>}
      {state.phase === 'ready' && (
        <>
          <p style={{ fontSize: 12.5, opacity: 0.65, margin: '0 0 8px' }}>{hits.length} / {state.entries.length} 条目</p>
          {hits.map((e) => <Card key={e.name} e={e} />)}
        </>
      )}
    </div>
  )
}

function apply(ctx) {
  ctx.slots.inject('settings.section', () =>
    ctx.slots.register(
      {
        name: 'settings.section',
        id: 'hub-panel',
        order: 42,
        label: () => 'Hub',
        inject: () => ({}),
      },
      HubPanel,
    ))
}

// esbuild iife 不自动写 module.exports；banner 在运行时定义 module 变量。
if (typeof module !== 'undefined' && module !== null) {
  module.exports = { apply, inject: ['slots'] }
}
