import { useState, useEffect, useRef } from 'react'
import './index.css'

/* ─── Reveal on scroll ─── */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

const Reveal = ({ children, className = '', style = {} }) => {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, transform: 'translateY(40px)', transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)', ...style }}
    >
      {children}
    </div>
  )
}

const Meta = ({ children, className = '', style = {} }) => (
  <div className={`meta-text ${className}`} style={style}>{children}</div>
)

/* ─── Background Grid (CSS only) ─── */
function BgGrid() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: -1,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '100px 100px',
        backgroundPosition: 'center center',
        maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
      }}
    />
  )
}

/* ─── Header ─── */
function Header() {
  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 md:py-8" style={{ mixBlendMode: 'difference' }}>
      <div className="text-base font-medium" style={{ letterSpacing: '-0.02em' }}>Uppora —</div>
      <nav className="hidden md:flex gap-8">
        {[['#pain', 'Проблемы'], ['#steps', 'Как работает'], ['#compare', 'Сравнение'], ['#faq', 'FAQ']].map(([href, label]) => (
          <a key={href} href={href} className="text-white no-underline" style={{ fontSize: '0.8rem', fontWeight: 400, transition: 'color 0.3s' }}>{label}</a>
        ))}
      </nav>
      <a href="#final-cta" className="text-white no-underline" style={{ fontSize: '0.8rem', fontWeight: 400 }}>Заявка →</a>
    </header>
  )
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="text-center relative" style={{ paddingTop: 200, paddingBottom: 80 }} id="hero">
      <Meta style={{ marginBottom: '2rem' }}>[ Платформа QR-донатов ]</Meta>
      <Reveal>
        <h1 className="serif-text" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', lineHeight: 1.1, letterSpacing: '-0.03em', maxWidth: 800, margin: '0 auto 24px' }}>
          Комиссия всего 4,5%.
        </h1>
      </Reveal>
      <Reveal style={{ transitionDelay: '0.15s' }}>
        <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', maxWidth: 420, margin: '0 auto', fontWeight: 300 }}>
          QR-донаты без регистрации для донатеров. Без подписок. Без паспорта. Вывод на карту в тот же день.
        </p>
      </Reveal>
      <div className="hidden md:block" style={{ position: 'absolute', top: 120, right: 48, textAlign: 'right' }}>
        <Meta>SYS.REQ // ALPHA<br />VER. 1.0</Meta>
      </div>
    </section>
  )
}

/* ─── Spatial Cards Gallery ─── */
function SpatialGallery() {
  const cards = [
    { meta: 'Проблема #1', title: '10–15%\nкомиссии', img: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { meta: 'Проблема #2', title: 'Регистрация\nдонатера', img: 'https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { meta: 'Решение', title: 'Uppora:\n4,5%', img: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { meta: 'Проблема #3', title: 'Подписки =\nдавление', img: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { meta: 'Проблема #4', title: 'Выплаты\nчерез неделю', img: 'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=800' },
  ]

  const positions = [
    { x: -650, z: -400, ry: 25, opacity: 0.3 },
    { x: -340, z: -200, ry: 15, opacity: 0.7 },
    { x: 0, z: 50, ry: 0, opacity: 1 },
    { x: 340, z: -200, ry: -15, opacity: 0.7 },
    { x: 650, z: -400, ry: -25, opacity: 0.3 },
  ]

  return (
    <section style={{ perspective: 1500, height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden', marginBottom: 80 }}>
      <div style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {cards.map((card, i) => {
          const p = positions[i]
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: 320,
                height: 480,
                borderRadius: 24,
                backgroundImage: `url(${card.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: `translateX(${p.x}px) translateZ(${p.z}px) rotateY(${p.ry}deg)`,
                opacity: p.opacity,
                boxShadow: '0 30px 60px rgba(0,0,0,0.8)',
                transition: 'transform 0.8s cubic-bezier(0.2,0.8,0.2,1)',
                zIndex: i === 2 ? 10 : 1,
                display: 'flex',
                alignItems: 'flex-end',
                padding: 32,
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 60%)', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>{card.meta}</div>
                <h3 className="serif-text" style={{ fontSize: '1.75rem', lineHeight: 1.1, whiteSpace: 'pre-line' }}>{card.title}</h3>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ─── Trust Bar ─── */
function TrustBar() {
  return (
    <Reveal>
      <section style={{ padding: '48px 48px', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 40 }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', width: 120, flexShrink: 0 }}>Доверяют</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48 }}>
          {['Т-Банк — платёжный партнёр', 'PCI DSS + SSL', '0% НДФЛ — ст. 217 НК РФ', 'Договор дарения'].map((t, i) => (
            <span key={i} className="meta-text" style={{ opacity: 0.5, whiteSpace: 'nowrap' }}>{t}</span>
          ))}
        </div>
      </section>
    </Reveal>
  )
}

/* ─── Pain Points ─── */
function PainSection() {
  const pains = [
    { title: '10–15% комиссии', desc: 'Типичная платформа забирает 10% комиссии + 3% эквайринг. С каждой тысячи автору — 870 ₽.', answer: 'Uppora: 4,5% всего. Автору — 955 ₽' },
    { title: 'Регистрация для донатера', desc: 'Хочешь поддержать автора — создай аккаунт, подтверди email, запомни пароль. Половина уходит.', answer: 'Uppora: ноль регистрации. QR → сумма → готово' },
    { title: 'Подписки = обязательства', desc: 'Подписная модель создаёт давление: автор обязан выдавать контент, фан — продлевать подписку.', answer: 'Uppora: разовые донаты. Благодарность, не обязательство' },
    { title: 'Выплаты через неделю', desc: 'Деньги «на платформе» — вывод раз в неделю, у некоторых — раз в месяц или через 90 дней.', answer: 'Uppora: выплата на карту в тот же день' },
  ]

  return (
    <section id="pain" style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 48px' }}>
      <Reveal>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <Meta style={{ marginBottom: 16 }}>[ Барьеры индустрии ]</Meta>
          <h2 className="serif-text" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Барьеры, которых не должно быть.</h2>
        </div>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
        {pains.map((p, i) => (
          <Reveal key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
            <div style={{ padding: 40, borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
              <Meta style={{ marginBottom: 16 }}>BARRIER.0{i + 1}</Meta>
              <h3 className="serif-text" style={{ fontSize: '1.5rem', marginBottom: 12 }}>{p.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: 16 }}>{p.desc}</p>
              <div style={{ paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)', color: 'var(--amber)', fontSize: '0.875rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--amber)' }} />
                {p.answer}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ─── Founder Quote ─── */
function FounderQuote() {
  return (
    <section style={{ maxWidth: 900, margin: '0 auto', padding: '120px 48px', textAlign: 'center' }}>
      <Reveal>
        <Meta style={{ marginBottom: 32 }}>[ Основатель ]</Meta>
        <blockquote className="serif-text" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 40 }}>
          Я видел, как авторы теряют 20–30% заработанного на комиссиях и налогах. Мы нашли способ делать это иначе.
        </blockquote>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Илья Панов</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Основатель Uppora</span>
        </div>
      </Reveal>
    </section>
  )
}

/* ─── Workflow (How It Works) ─── */
function Workflow() {
  const steps = [
    { num: '01', title: 'Мы создаём страницу.', desc: 'Только имя и карта для выплат. Без загрузки паспорта. Занимает ровно 2 минуты.', tags: ['Консьерж-онбординг', 'Без регистрации', 'Без паспорта'], img: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { num: '02', title: 'Делитесь ссылкой или QR.', desc: 'Ссылка в био, QR на столе в кофейне, стикер на витрине. Один линк — все площадки.', tags: ['QR-кит', 'A5-постер', 'Стикеры'], img: 'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { num: '03', title: 'Деньги на карте.', desc: 'Донатер сканирует QR → вводит сумму → готово. Без регистрации. Деньги — в тот же день.', tags: ['Т-Банк', 'В тот же день'], img: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800' },
  ]

  return (
    <section id="steps" style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 48px' }}>
      <Reveal>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 80, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <Meta style={{ marginBottom: 16 }}>[ Три шага ]</Meta>
            <h2 className="serif-text" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Начните за 2 минуты.</h2>
          </div>
          <Meta style={{ textAlign: 'right' }}>SEQ_01 — 03<br />ЛИНЕЙНЫЙ ПРОЦЕСС</Meta>
        </div>
      </Reveal>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 100 }}>
        {steps.map((s, i) => (
          <Reveal key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 60, alignItems: 'center', direction: i % 2 === 1 ? 'rtl' : 'ltr' }}>
              <div style={{ direction: 'ltr' }}>
                <div className="serif-text" style={{ fontSize: 'clamp(5rem, 10vw, 8rem)', lineHeight: 0.8, color: 'var(--text-meta)', opacity: 0.3, marginBottom: 24 }}>{s.num}</div>
                <h3 className="serif-text" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: 16, lineHeight: 1.2 }}>{s.title}</h3>
                <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', fontWeight: 300, maxWidth: 400 }}>{s.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
                  {s.tags.map((t, ti) => (
                    <span key={ti} style={{ border: '1px solid rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: 30, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ direction: 'ltr', width: '100%', aspectRatio: '4/5', background: '#111', borderRadius: 16, overflow: 'hidden', position: 'relative' }}>
                <img src={s.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, transition: 'opacity 0.5s ease' }} />
                <Meta style={{ position: 'absolute', bottom: 24, right: 24, background: 'rgba(0,0,0,0.5)', padding: '4px 8px' }}>IMG_SRC: RAW</Meta>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ─── Calculator ─── */
function Calculator() {
  const [value, setValue] = useState(1000)
  const bank = Math.round(value * 0.03)
  const uppora = Math.round(value * 0.015)
  const author = value - bank - uppora
  const pct = ((author / value) * 100).toFixed(1)
  const fmt = (n) => n.toLocaleString('ru-RU')

  return (
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 48px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
        <Reveal>
          <Meta style={{ marginBottom: 16 }}>[ Калькулятор ]</Meta>
          <h2 className="serif-text" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 40 }}>Открытая бухгалтерия.</h2>
        </Reveal>
        <Reveal style={{ transitionDelay: '0.1s' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '32px 40px' }}>
            <Meta style={{ textAlign: 'left', marginBottom: 8 }}>Сумма доната</Meta>
            <div className="serif-text" style={{ fontSize: '3rem', marginBottom: 24 }}>
              {fmt(value)} <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>₽</span>
            </div>
            <input
              type="range" min="100" max="10000" step="100" value={value}
              onChange={e => setValue(+e.target.value)}
              style={{ width: '100%', height: 4, borderRadius: 2, appearance: 'none', WebkitAppearance: 'none', background: 'rgba(255,255,255,0.1)', cursor: 'pointer', marginBottom: 32, outline: 'none' }}
            />
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.875rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Автору</span>
                <span className="serif-text" style={{ fontSize: '1.5rem', color: 'var(--amber)', fontWeight: 500 }}>{fmt(author)} ₽</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Банку (процессинг)</span>
                <span>{fmt(bank)} ₽</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Uppora</span>
                <span>{fmt(uppora)} ₽</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderTop: '2px solid var(--amber)', marginTop: 8, fontWeight: 700 }}>
                <span>ИТОГО</span>
                <span>{fmt(value)} ₽</span>
              </div>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.1)', overflow: 'hidden', marginTop: 24 }}>
              <div style={{ height: '100%', borderRadius: 3, background: 'var(--amber)', transition: 'width 0.3s', width: `${pct}%` }} />
            </div>
            <p style={{ marginTop: 16, fontSize: '0.75rem', color: 'var(--text-meta)' }}>Альфа: комиссия 4,5% (3% эквайринг + 1,5% вывод). У конкурентов: 10–15%.</p>
          </div>
        </Reveal>
        <Reveal style={{ transitionDelay: '0.2s' }}>
          <p className="serif-text" style={{ fontStyle: 'italic', fontSize: '1.125rem', color: 'var(--text-muted)', marginTop: 32, maxWidth: 460, marginInline: 'auto' }}>
            «Мы зарабатываем <span style={{ color: 'var(--amber)', fontStyle: 'normal', fontWeight: 500 }}>15 ₽</span> с каждой тысячи. Не берём подписку. Не берём комиссию за контент. 15 рублей — наш единственный доход.»
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Comparison Table ─── */
function Comparison() {
  const rows = [
    ['Итого комиссия', '4,5%', '~11,7%', '~12%', '~13–15%', '~3–8%'],
    ['Регистрация донатера', '✓ Не нужна', '✗ Нужна', '✗ Нужна', '✗ Нужна', '✗ PayPal'],
    ['Скорость выплат', 'В тот же день', '1–5 дней', 'До 90 дней', 'Раз в месяц', 'Напрямую'],
    ['Офлайн (QR-кит)', '✓ Есть', '✗', '✗', '✗', '✗'],
    ['НДФЛ для автора', '0% (дарение)', '13%+', '13%+', 'По стране', 'По стране'],
    ['Модель', 'Разовые донаты', 'Подписки', 'Стрим-донаты', 'Подписки', 'Донаты + подписки'],
    ['Онбординг', 'Консьерж', 'Self-serve', 'Self-serve', 'Self-serve', 'Self-serve'],
  ]
  const headers = ['Характеристика', 'Uppora', 'Boosty', 'DonationAlerts', 'Patreon', 'Ko-fi']

  return (
    <section id="compare" style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 48px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <Reveal>
        <Meta style={{ marginBottom: 16 }}>[ Сравнение ]</Meta>
        <h2 className="serif-text" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 8 }}>Uppora vs. конкуренты.</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 48 }}>На основе публичных тарифов, март 2026</p>
      </Reveal>
      <Reveal style={{ transitionDelay: '0.1s' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', fontSize: '0.875rem', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                {headers.map((h, i) => (
                  <th key={i} className="meta-text" style={{ padding: '16px 12px', fontWeight: 400, color: i === 1 ? 'var(--amber)' : undefined }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  {row.map((cell, ci) => {
                    let color = 'var(--text-muted)'
                    if (ci === 0) color = 'var(--text-main)'
                    if (ci === 1) color = 'var(--amber)'
                    if (typeof cell === 'string' && cell.startsWith('✓')) color = 'var(--emerald)'
                    if (typeof cell === 'string' && cell.startsWith('✗')) color = 'var(--red)'
                    return (
                      <td key={ci} style={{ padding: '14px 12px', color, fontWeight: ci <= 1 ? 500 : 400, opacity: ci > 1 ? 0.6 : 1 }}>{cell}</td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-meta)', textAlign: 'center', marginTop: 24 }}>Данные из публичных тарифов платформ. Комиссии включают все сборы.</p>
      </Reveal>
    </section>
  )
}

/* ─── Legal Model ─── */
function LegalModel() {
  const standardSteps = ['Донат отправляется', 'Попадает на счёт платформы (ООО)', 'Комиссия платформы 10–15%', 'Удержание НДФЛ 13%', 'Запрос на вывод средств', 'Остаток доходит автору']
  const upporaSteps = ['Донатер отправляет деньги', 'Деньги сразу на карте автора']

  return (
    <section id="legal" style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 48px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <Reveal>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <Meta style={{ marginBottom: 16 }}>[ Юридическая модель ]</Meta>
          <h2 className="serif-text" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Две модели. Мы выбрали лучшую.</h2>
        </div>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, maxWidth: 900, margin: '0 auto' }}>
        <Reveal style={{ transitionDelay: '0.1s' }}>
          <div style={{ padding: 40, borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', opacity: 0.5 }}>
            <Meta style={{ marginBottom: 16, color: 'var(--red)' }}>STD.PATH // REJECTED</Meta>
            <h3 className="serif-text" style={{ fontSize: '1.5rem', marginBottom: 24 }}>Оплата услуг</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {standardSteps.map((step, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: '50%', border: '1px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: 'var(--red)', fontFamily: "'Space Mono', monospace" }}>{j + 1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)', color: 'var(--red)', fontWeight: 500, fontSize: '0.875rem' }}>
              Потери: до 25–30% с каждого доната
            </div>
          </div>
        </Reveal>
        <Reveal style={{ transitionDelay: '0.2s' }}>
          <div style={{ padding: 40, borderRadius: 16, border: '1px solid rgba(245,158,11,0.4)', background: 'rgba(255,255,255,0.03)' }}>
            <Meta style={{ marginBottom: 16, color: 'var(--amber)' }}>UPP.PATH // ACTIVE</Meta>
            <h3 className="serif-text" style={{ fontSize: '1.5rem', marginBottom: 24 }}>Договор дарения</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {upporaSteps.map((step, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: '50%', border: '1px solid rgba(245,158,11,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: 'var(--amber)', fontFamily: "'Space Mono', monospace" }}>{j + 1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 32, paddingTop: 16, borderTop: '1px solid rgba(245,158,11,0.3)', color: 'var(--amber)', fontWeight: 500, fontSize: '0.875rem', lineHeight: 1.8 }}>
              Основание: ст. 217 НК РФ<br />НДФЛ: 0%<br />Статус ИП/самозанятого: не нужен
            </div>
          </div>
        </Reveal>
      </div>
      <Reveal style={{ transitionDelay: '0.3s' }}>
        <p style={{ textAlign: 'center', marginTop: 32, fontSize: '0.75rem', color: 'var(--text-meta)' }}>Дарение между физическими лицами не облагается НДФЛ по ст. 217 НК РФ, п. 18.1</p>
      </Reveal>
    </section>
  )
}

/* ─── Benefits ─── */
function Benefits() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 48px 120px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
        <Reveal>
          <div style={{ padding: 40, background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
            <Meta style={{ marginBottom: 16 }}>FIN.OPEN // 01</Meta>
            <h3 className="serif-text" style={{ fontSize: '1.5rem', marginBottom: 12 }}>Процессинг карт</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>3% покрывает стоимость эквайринга через Т-Банк. Оставшиеся 1,5% — это всё, что получает Uppora.</p>
          </div>
        </Reveal>
        <Reveal style={{ transitionDelay: '0.1s' }}>
          <div style={{ padding: 40, background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
            <Meta style={{ marginBottom: 16 }}>FIN.OPEN // 02</Meta>
            <h3 className="serif-text" style={{ fontSize: '1.5rem', marginBottom: 12 }}>Инфраструктура и развитие</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>Серверы, безопасность, поддержка 24/7. Постоянные улучшения для авторов.</p>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

/* ─── Marquee ─── */
function Marquee() {
  const items = ['Комиссия 4,5%', 'Без регистрации', 'Вывод в тот же день', '0% НДФЛ', 'QR-кит бесплатно', 'Договор дарения']

  return (
    <section style={{ width: '100%', overflow: 'hidden', padding: '80px 0', background: '#050505', position: 'relative' }}>
      <Meta style={{ position: 'absolute', top: 32, left: 48, zIndex: 20 }}>[ Ключевые преимущества ]</Meta>
      <div style={{ position: 'absolute', inset: '0 auto 0 0', width: '15vw', zIndex: 10, background: 'linear-gradient(to right, #050505, transparent)' }} />
      <div style={{ position: 'absolute', inset: '0 0 0 auto', width: '15vw', zIndex: 10, background: 'linear-gradient(to left, #050505, transparent)' }} />
      <div style={{ display: 'flex', width: 'fit-content', animation: 'marquee-scroll 30s linear infinite' }}>
        {[0, 1].map(set => (
          <div key={set} style={{ display: 'flex', alignItems: 'center' }}>
            {items.map((item, i) => (
              <span key={`${set}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4vw', padding: '0 4vw' }}>
                <span className="serif-text" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', whiteSpace: 'nowrap', color: item.includes('4,5%') || item.includes('0%') ? 'var(--text-main)' : 'var(--text-muted)' }}>
                  {item}
                </span>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--text-meta)' }} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── FAQ ─── */
function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const questions = [
    { q: 'Есть ли отзывы?', a: 'Мы сейчас на стадии альфы, поэтому пока собираем первую волну авторов. Зато сейчас можно подключиться в числе первых и спокойно протестировать сервис на старте.' },
    { q: 'Почему подключаете к платформе сами?', a: 'Чтобы вам не пришлось разбираться в регистрации и настройках. Мы берём создание страницы на себя, всё настраиваем за пару минут.' },
    { q: 'Почему такая низкая комиссия?', a: 'Мы изначально хотели сделать сервис доступным. Комиссия максимально комфортная, чтобы донаты оставались рабочим инструментом монетизации.' },
    { q: 'Могу зарегистрироваться и начать позднее?', a: 'Да, конечно. Страница никуда не исчезнет и не «сгорит».' },
    { q: 'У меня уже есть Boosty / VK Донаты — нужно ли отключаться?', a: 'Нет. Uppora работает параллельно с другими сервисами донатов.' },
    { q: 'Зачем мне дополнительный сервис для донатов?', a: 'Далеко не все готовы оформлять ежемесячную подписку. Часто человек хочет просто поддержать автора один раз. Для этого и создана Uppora.' },
    { q: 'Можно ли вывести на зарубежную карту?', a: 'Пока нет, сейчас вывод доступен только на карту РФ. В будущем планируем добавить другие варианты.' },
    { q: 'Сколько времени занимает подключение?', a: 'Обычно всего несколько минут. Мы сами помогаем с настройкой.' },
    { q: 'Нужно ли что-то регулярно обновлять или вести?', a: 'Нет. После подключения страница готова к использованию.' },
    { q: 'Это замена другим способам монетизации?', a: 'Скорее дополнение. Uppora подходит для разовой поддержки и может работать вместе с подписками.' },
    { q: 'На чём зарабатывает Uppora?', a: 'С каждой тысячи рублей мы получаем 15 ₽ (1,5%). Ещё 30 ₽ (3%) забирает банк. Итого 4,5%. Никаких подписок и скрытых сборов.' },
    { q: 'А что с налогами?', a: 'Донаты оформляются как договор дарения. По ст. 217 НК РФ не облагаются НДФЛ. Статус ИП не требуется.' },
  ]

  return (
    <section id="faq" style={{ maxWidth: 720, margin: '0 auto', padding: '120px 48px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <Reveal>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <Meta style={{ marginBottom: 16 }}>[ FAQ ]</Meta>
          <h2 className="serif-text" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Частые вопросы.</h2>
        </div>
      </Reveal>
      <div>
        {questions.map((item, i) => (
          <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              style={{
                width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '20px 0', textAlign: 'left', cursor: 'pointer',
                background: 'none', border: 'none', color: openIndex === i ? 'var(--amber)' : 'var(--text-main)',
                fontFamily: "'Inter', sans-serif", fontSize: '0.9375rem', fontWeight: 500,
                transition: 'color 0.3s',
              }}
            >
              <span style={{ paddingRight: 16 }}>{item.q}</span>
              <span style={{ color: 'var(--text-meta)', fontSize: '1.25rem', flexShrink: 0, transition: 'transform 0.3s', transform: openIndex === i ? 'rotate(45deg)' : 'none' }}>+</span>
            </button>
            <div style={{ overflow: 'hidden', maxHeight: openIndex === i ? 200 : 0, transition: 'max-height 0.4s ease', paddingBottom: openIndex === i ? 20 : 0 }}>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Final CTA ─── */
function FinalCTA() {
  return (
    <section id="final-cta" style={{ maxWidth: 520, margin: '0 auto', padding: '120px 48px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <Reveal>
        <Meta style={{ marginBottom: 24 }}>[ Заявка ]</Meta>
        <h2 className="serif-text" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: 16 }}>Бесплатно. Без паспорта. Без подписки.</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 40 }}>Оставьте заявку — мы настроим страницу и QR за вас. Ответим в течение 2 часов.</p>
      </Reveal>
      <Reveal style={{ transitionDelay: '0.1s' }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {[
            { type: 'text', placeholder: 'Ваше имя' },
            { type: 'email', placeholder: 'Email' },
          ].map((f, i) => (
            <input key={i} type={f.type} placeholder={f.placeholder} style={{
              padding: '16px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.03)', color: 'white', fontSize: '0.875rem',
              fontFamily: "'Inter', sans-serif", outline: 'none',
            }} />
          ))}
          <select style={{
            padding: '16px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.03)', color: 'var(--text-meta)', fontSize: '0.875rem',
            fontFamily: "'Inter', sans-serif", outline: 'none', appearance: 'none', WebkitAppearance: 'none',
          }}>
            <option value="" disabled selected>Ваша ниша</option>
            <option value="music">Музыка</option>
            <option value="education">Образование / лекции</option>
            <option value="art">Искусство / хендмейд</option>
            <option value="streaming">Стримы / видео</option>
            <option value="nko">НКО / благотворительность</option>
            <option value="other">Другое</option>
          </select>
          <button type="button" style={{
            background: 'var(--amber)', color: '#000', padding: '16px 32px', borderRadius: 12,
            fontWeight: 500, fontSize: '0.875rem', border: 'none', cursor: 'pointer', marginTop: 8,
            fontFamily: "'Inter', sans-serif",
          }}>
            Оставить заявку →
          </button>
        </form>
      </Reveal>
      <Reveal style={{ transitionDelay: '0.2s' }}>
        <a href="https://t.me/uppora_support" target="_blank" rel="noopener" style={{
          display: 'inline-block', fontSize: '0.75rem', color: 'var(--text-muted)',
          border: '1px solid rgba(255,255,255,0.1)', padding: '8px 20px', borderRadius: 30,
          textDecoration: 'none', marginBottom: 24,
        }}>
          Или напишите в Telegram
        </a>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-meta)', marginBottom: 24 }}>Удалить аккаунт можно в один клик. Нет донатов — нет расходов.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
          <Meta>SSL + PCI DSS</Meta>
          <Meta>Ст. 217 НК РФ</Meta>
          <Meta>Т-Банк</Meta>
        </div>
      </Reveal>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer style={{ padding: '48px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
      <div style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '-0.02em' }}>Uppora — 2026</div>
      <Meta>SYSTEM NORM: NOMINAL</Meta>
    </footer>
  )
}

/* ─── App ─── */
export default function App() {
  return (
    <>
      <BgGrid />
      <Header />
      <main style={{ paddingTop: 160 }}>
        <Hero />
        <SpatialGallery />
        <TrustBar />
        <PainSection />
        <FounderQuote />
        <Workflow />
        <Calculator />
        <Comparison />
        <LegalModel />
        <Benefits />
        <Marquee />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
