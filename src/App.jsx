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

/* ─── Background Grid ─── */
function BgGrid() {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10"
      style={{
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
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-8 md:px-12 py-8" style={{ mixBlendMode: 'difference' }}>
      <div className="text-base font-medium" style={{ letterSpacing: '-0.02em' }}>Uppora —</div>
      <nav className="hidden md:flex gap-8">
        {[['#pain', 'Проблемы'], ['#steps', 'Как работает'], ['#compare', 'Сравнение'], ['#faq', 'FAQ']].map(([href, label]) => (
          <a key={href} href={href} className="text-white text-[0.8rem] font-normal hover:text-[var(--text-muted)] transition-colors duration-300 no-underline">{label}</a>
        ))}
      </nav>
      <a href="#final-cta" className="text-[0.8rem] font-normal text-white hover:text-[var(--text-muted)] transition-colors duration-300 no-underline">Заявка →</a>
    </header>
  )
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="text-center pt-48 pb-16 relative" id="hero">
      <Meta className="mb-8">[ Платформа QR-донатов ]</Meta>
      <Reveal>
        <h1 className="serif-text mx-auto mb-6" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', lineHeight: 1.1, letterSpacing: '-0.03em', maxWidth: 800 }}>
          Комиссия всего 4,5%.
        </h1>
      </Reveal>
      <Reveal style={{ transitionDelay: '0.1s' }}>
        <p className="text-lg text-[var(--text-muted)] max-w-md mx-auto font-light">
          QR-донаты без регистрации для донатеров. Без подписок. Без паспорта. Вывод на карту в тот же день.
        </p>
      </Reveal>
      <div className="absolute top-28 right-8 md:right-12 text-right hidden md:block">
        <Meta>
          SYS.REQ // ALPHA<br />
          VER. 1.0
        </Meta>
      </div>
    </section>
  )
}

/* ─── Spatial Cards Gallery (Pain Points as spatial cards) ─── */
function SpatialGallery() {
  const cards = [
    { meta: 'Проблема #1', title: '10–15%\nкомиссии', img: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { meta: 'Проблема #2', title: 'Регистрация\nдонатера', img: 'https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { meta: 'Решение', title: 'Uppora:\n4,5%', img: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { meta: 'Проблема #3', title: 'Подписки =\nдавление', img: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { meta: 'Проблема #4', title: 'Выплаты\nчерез неделю', img: 'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=800' },
  ]

  const transforms = [
    'translateX(-650px) translateZ(-400px) rotateY(25deg)',
    'translateX(-340px) translateZ(-200px) rotateY(15deg)',
    'translateX(0) translateZ(50px) rotateY(0deg)',
    'translateX(340px) translateZ(-200px) rotateY(-15deg)',
    'translateX(650px) translateZ(-400px) rotateY(-25deg)',
  ]
  const opacities = [0.3, 0.7, 1, 0.7, 0.3]

  return (
    <section className="w-full overflow-hidden mb-24 md:mb-32" style={{ perspective: 1500, height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
      <div className="flex justify-center items-center relative w-full" style={{ transformStyle: 'preserve-3d' }}>
        {cards.map((card, i) => (
          <div
            key={i}
            className="absolute w-72 md:w-80 h-[420px] md:h-[480px] rounded-3xl overflow-hidden flex items-end p-8"
            style={{
              backgroundImage: `url(${card.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: transforms[i],
              opacity: opacities[i],
              boxShadow: '0 30px 60px rgba(0,0,0,0.8)',
              transition: 'transform 0.8s cubic-bezier(0.2,0.8,0.2,1)',
              zIndex: i === 2 ? 10 : 1,
            }}
          >
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 60%)', zIndex: 1 }} />
            <div className="relative z-[2] w-full">
              <div className="text-xs text-white/60 mb-1">{card.meta}</div>
              <h3 className="serif-text text-2xl leading-tight whitespace-pre-line">{card.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Trust Bar ─── */
function TrustBar() {
  return (
    <Reveal>
      <section className="px-8 md:px-12 py-16 flex flex-col md:flex-row items-center gap-8 md:gap-16" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="text-xs text-[var(--text-muted)] w-full md:w-32 shrink-0 text-center md:text-left">Доверяют</div>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-[var(--text-meta)]">
          {['Т-Банк — платёжный партнёр', 'PCI DSS + SSL', '0% НДФЛ — ст. 217 НК РФ', 'Договор дарения'].map((t, i) => (
            <span key={i} className="text-xs font-mono uppercase tracking-wider whitespace-nowrap opacity-50">{t}</span>
          ))}
        </div>
      </section>
    </Reveal>
  )
}

/* ─── Pain Points Detail ─── */
function PainSection() {
  const pains = [
    { title: '10–15% комиссии', desc: 'Типичная платформа забирает 10% комиссии + 3% эквайринг. С каждой тысячи автору — 870 ₽.', answer: 'Uppora: 4,5% всего. Автору — 955 ₽' },
    { title: 'Регистрация для донатера', desc: 'Хочешь поддержать автора — создай аккаунт, подтверди email, запомни пароль. Половина уходит.', answer: 'Uppora: ноль регистрации. QR → сумма → готово' },
    { title: 'Подписки = обязательства', desc: 'Подписная модель создаёт давление: автор обязан выдавать контент, фан — продлевать подписку.', answer: 'Uppora: разовые донаты. Благодарность, не обязательство' },
    { title: 'Выплаты через неделю', desc: 'Деньги «на платформе» — вывод раз в неделю, у некоторых — раз в месяц или через 90 дней.', answer: 'Uppora: выплата на карту в тот же день' },
  ]

  return (
    <section className="max-w-[1440px] mx-auto px-8 md:px-12 py-32 md:py-40" id="pain">
      <Reveal>
        <div className="text-center mb-20">
          <Meta className="mb-4">[ Барьеры индустрии ]</Meta>
          <h2 className="serif-text text-4xl md:text-5xl">Барьеры, которых не должно быть.</h2>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {pains.map((p, i) => (
          <Reveal key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="p-8 md:p-10 rounded-2xl border border-white/5 bg-white/[0.02] hover:-translate-y-1 transition-transform duration-500">
              <Meta className="mb-4">BARRIER.0{i + 1}</Meta>
              <h3 className="serif-text text-2xl mb-3">{p.title}</h3>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-4">{p.desc}</p>
              <div className="pt-4 border-t border-white/10 text-[var(--amber)] text-sm font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--amber)]" />
                {p.answer}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ─── Founder Quote (Big Testimonial) ─── */
function FounderQuote() {
  return (
    <section className="max-w-[1000px] mx-auto px-8 md:px-12 py-32 md:py-40 text-center">
      <Reveal>
        <Meta className="mb-8">[ Основатель ]</Meta>
        <blockquote className="serif-text text-3xl md:text-5xl leading-tight mb-10 relative" style={{ letterSpacing: '-0.02em' }}>
          Я видел, как авторы теряют 20–30% заработанного на комиссиях и налогах. Мы нашли способ делать это иначе.
        </blockquote>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm uppercase tracking-widest">Илья Панов</span>
          <span className="text-xs text-[var(--text-muted)]">Основатель Uppora</span>
        </div>
      </Reveal>
    </section>
  )
}

/* ─── How It Works (Workflow) ─── */
function Workflow() {
  const steps = [
    { num: '01', title: 'Мы создаём страницу.', desc: 'Только имя и карта для выплат. Без загрузки паспорта. Занимает ровно 2 минуты.', tags: ['Консьерж-онбординг', 'Без регистрации', 'Без паспорта'], img: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { num: '02', title: 'Делитесь ссылкой или QR.', desc: 'Ссылка в био, QR на столе в кофейне, стикер на витрине. Один линк — все площадки.', tags: ['QR-кит', 'A5-постер', 'Стикеры'], img: 'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { num: '03', title: 'Деньги на карте.', desc: 'Донатер сканирует QR → вводит сумму → готово. Без регистрации. Деньги — в тот же день.', tags: ['Т-Банк', 'В тот же день'], img: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800' },
  ]

  return (
    <section className="max-w-[1440px] mx-auto px-8 md:px-12 py-32 md:py-40" id="steps">
      <Reveal>
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-20 md:mb-24 gap-6">
          <div>
            <Meta className="mb-4">[ Три шага ]</Meta>
            <h2 className="serif-text text-4xl md:text-5xl">Начните за 2 минуты.</h2>
          </div>
          <Meta className="text-right">
            SEQ_01 — 03<br />
            ЛИНЕЙНЫЙ ПРОЦЕСС
          </Meta>
        </div>
      </Reveal>
      <div className="flex flex-col gap-24 md:gap-32">
        {steps.map((s, i) => (
          <Reveal key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center ${i % 2 === 1 ? 'md:[direction:rtl]' : ''}`}>
              <div className={i % 2 === 1 ? 'md:[direction:ltr]' : ''}>
                <div className="serif-text text-[6rem] md:text-[8rem] leading-[0.8] text-[var(--text-meta)] opacity-30 mb-6">{s.num}</div>
                <h3 className="serif-text text-3xl md:text-4xl mb-4 leading-tight">{s.title}</h3>
                <p className="text-lg text-[var(--text-muted)] font-light max-w-md">{s.desc}</p>
                <div className="flex flex-wrap gap-3 mt-6">
                  {s.tags.map((t, ti) => (
                    <span key={ti} className="border border-white/20 px-4 py-1.5 rounded-full text-xs text-[var(--text-muted)]">{t}</span>
                  ))}
                </div>
              </div>
              <div className={`w-full rounded-2xl overflow-hidden relative group ${i % 2 === 1 ? 'md:[direction:ltr]' : ''}`} style={{ aspectRatio: '4/5', background: '#111' }}>
                <img src={s.img} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[10s]" />
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
    <section className="max-w-[1440px] mx-auto px-8 md:px-12 py-32 md:py-40" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="max-w-lg mx-auto text-center">
        <Reveal>
          <Meta className="mb-4">[ Калькулятор ]</Meta>
          <h2 className="serif-text text-4xl md:text-5xl mb-10">Открытая бухгалтерия.</h2>
        </Reveal>
        <Reveal style={{ transitionDelay: '0.1s' }}>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-10">
            <div className="flex items-center justify-between mb-2">
              <Meta>Сумма доната</Meta>
            </div>
            <div className="serif-text text-5xl mb-6">{fmt(value)} <span className="text-2xl text-[var(--text-muted)]">₽</span></div>
            <input
              type="range" min="100" max="10000" step="100" value={value}
              onChange={e => setValue(+e.target.value)}
              className="w-full h-1 rounded-full appearance-none bg-white/10 cursor-pointer mb-8
                [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-[var(--amber)] [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:shadow-[0_0_20px_var(--amber-glow)]"
            />
            <div className="font-mono text-sm text-left space-y-3">
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-[var(--text-muted)]">Автору</span>
                <span className="serif-text text-2xl text-[var(--amber)] font-medium">{fmt(author)} ₽</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-[var(--text-muted)]">Банку (процессинг)</span>
                <span className="text-[var(--text-main)]">{fmt(bank)} ₽</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-[var(--text-muted)]">Uppora</span>
                <span className="text-[var(--text-main)]">{fmt(uppora)} ₽</span>
              </div>
              <div className="flex justify-between py-3 border-t-2 border-[var(--amber)] mt-2 font-bold">
                <span>ИТОГО</span>
                <span>{fmt(value)} ₽</span>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mt-6">
              <div className="h-full rounded-full bg-[var(--amber)] transition-all duration-300" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-4 text-xs text-[var(--text-meta)]">Альфа: комиссия 4,5% (3% эквайринг + 1,5% вывод). У конкурентов: 10–15%.</p>
          </div>
        </Reveal>
        <Reveal style={{ transitionDelay: '0.2s' }}>
          <p className="serif-text italic text-lg text-[var(--text-muted)] mt-8 max-w-md mx-auto">
            «Мы зарабатываем <span className="text-[var(--amber)] not-italic font-medium">15 ₽</span> с каждой тысячи. Не берём подписку. Не берём комиссию за контент. 15 рублей — наш единственный доход.»
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
    <section className="max-w-[1440px] mx-auto px-8 md:px-12 py-32 md:py-40" id="compare" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <Reveal>
        <div className="mb-16">
          <Meta className="mb-4">[ Сравнение ]</Meta>
          <h2 className="serif-text text-4xl md:text-5xl">Uppora vs. конкуренты.</h2>
          <p className="text-sm text-[var(--text-muted)] mt-2">На основе публичных тарифов, март 2026</p>
        </div>
      </Reveal>
      <Reveal style={{ transitionDelay: '0.1s' }}>
        <div className="overflow-x-auto -mx-8 md:mx-0">
          <table className="w-full text-left text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10">
                {headers.map((h, i) => (
                  <th key={i} className={`py-4 font-mono text-[0.65rem] uppercase tracking-widest font-normal ${i === 1 ? 'text-[var(--amber)]' : 'text-[var(--text-meta)]'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  {row.map((cell, ci) => (
                    <td key={ci} className={`py-4 ${ci === 0 ? 'text-white font-medium' : ci === 1 ? 'text-[var(--amber)] font-medium' : 'text-[var(--text-muted)] opacity-60'} ${cell.startsWith?.('✓') ? 'text-[var(--emerald)]!' : cell.startsWith?.('✗') ? 'text-[var(--red)]!' : ''}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[var(--text-meta)] text-center mt-6">Данные из публичных тарифов платформ. Комиссии включают все сборы.</p>
      </Reveal>
    </section>
  )
}

/* ─── Legal Model ─── */
function LegalModel() {
  return (
    <section className="max-w-[1440px] mx-auto px-8 md:px-12 py-32 md:py-40" id="legal" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <Reveal>
        <div className="text-center mb-16">
          <Meta className="mb-4">[ Юридическая модель ]</Meta>
          <h2 className="serif-text text-4xl md:text-5xl">Две модели. Мы выбрали лучшую.</h2>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Reveal style={{ transitionDelay: '0.1s' }}>
          <div className="p-8 md:p-10 rounded-2xl border border-white/5 bg-white/[0.02] opacity-50">
            <Meta className="mb-4 text-[var(--red)]">STD.PATH // REJECTED</Meta>
            <h3 className="serif-text text-2xl mb-6">Оплата услуг</h3>
            <div className="space-y-3 text-sm text-[var(--text-muted)]">
              {['Донат отправляется', 'Попадает на счёт платформы (ООО)', 'Комиссия платформы 10–15%', 'Удержание НДФЛ 13%', 'Запрос на вывод средств', 'Остаток доходит автору'].map((step, j) => (
                <div key={j} className="flex items-start gap-3">
                  <span className="shrink-0 w-5 h-5 rounded-full border border-[var(--red)]/30 flex items-center justify-center text-[0.6rem] text-[var(--red)] font-mono">{j + 1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-[var(--red)] font-medium text-sm">
              Потери: до 25–30% с каждого доната
            </div>
          </div>
        </Reveal>
        <Reveal style={{ transitionDelay: '0.2s' }}>
          <div className="p-8 md:p-10 rounded-2xl border border-[var(--amber)]/40 bg-white/[0.03]">
            <Meta className="mb-4 text-[var(--amber)]">UPP.PATH // ACTIVE</Meta>
            <h3 className="serif-text text-2xl mb-6">Договор дарения</h3>
            <div className="space-y-3 text-sm text-[var(--text-muted)]">
              {['Донатер отправляет деньги', 'Деньги сразу на карте автора'].map((step, j) => (
                <div key={j} className="flex items-start gap-3">
                  <span className="shrink-0 w-5 h-5 rounded-full border border-[var(--amber)]/30 flex items-center justify-center text-[0.6rem] text-[var(--amber)] font-mono">{j + 1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-4 border-t border-[var(--amber)]/30 text-[var(--amber)] font-medium text-sm leading-relaxed">
              Основание: ст. 217 НК РФ<br />
              НДФЛ: 0%<br />
              Статус ИП/самозанятого: не нужен
            </div>
          </div>
        </Reveal>
      </div>
      <Reveal className="text-center mt-8">
        <p className="text-xs text-[var(--text-meta)]">Дарение между физическими лицами не облагается НДФЛ по ст. 217 НК РФ, п. 18.1</p>
      </Reveal>
    </section>
  )
}

/* ─── Benefits Grid ─── */
function Benefits() {
  return (
    <div className="max-w-[1440px] mx-auto px-8 md:px-12 pb-32" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 80 }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Reveal>
          <div className="p-8 md:p-10 bg-white/[0.02] rounded-2xl border border-white/5">
            <Meta className="mb-4">FIN.OPEN // 01</Meta>
            <h3 className="serif-text text-2xl mb-3">Процессинг карт</h3>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">3% покрывает стоимость эквайринга через Т-Банк. Оставшиеся 1,5% — это всё, что получает Uppora с каждой транзакции.</p>
          </div>
        </Reveal>
        <Reveal style={{ transitionDelay: '0.1s' }}>
          <div className="p-8 md:p-10 bg-white/[0.02] rounded-2xl border border-white/5">
            <Meta className="mb-4">FIN.OPEN // 02</Meta>
            <h3 className="serif-text text-2xl mb-3">Инфраструктура и развитие</h3>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">Серверы, безопасность, поддержка 24/7. Постоянные улучшения: скорость, удобство, новые функции для авторов.</p>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

/* ─── Marquee ─── */
function Marquee() {
  const items = ['Комиссия 4,5%', 'Без регистрации', 'Вывод в тот же день', '0% НДФЛ', 'QR-кит бесплатно', 'Договор дарения']
  const content = items.map((item, i) => (
    <span key={i} className="inline-flex items-center gap-[4vw]">
      <span className="serif-text text-3xl md:text-4xl whitespace-nowrap text-[var(--text-muted)]">
        {item.includes('4,5%') || item.includes('0%') ? <><span className="text-white">{item}</span></> : item}
      </span>
      <span className="w-2 h-2 rounded-full bg-[var(--text-meta)]" />
    </span>
  ))

  return (
    <section className="w-full overflow-hidden py-24 relative" style={{ background: '#050505' }}>
      <Meta style={{ position: 'absolute', top: 40, left: 48, zIndex: 20 }}>[ Ключевые преимущества ]</Meta>
      <div className="absolute inset-y-0 left-0 w-[15vw] z-10" style={{ background: 'linear-gradient(to right, #000, transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-[15vw] z-10" style={{ background: 'linear-gradient(to left, #000, transparent)' }} />
      <div className="flex w-fit gap-[4vw] px-[4vw]" style={{ animation: 'marquee-scroll 30s linear infinite' }}>
        {content}{content}
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
    <section className="max-w-3xl mx-auto px-8 md:px-12 py-32 md:py-40" id="faq" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <Reveal>
        <div className="text-center mb-16">
          <Meta className="mb-4">[ FAQ ]</Meta>
          <h2 className="serif-text text-4xl">Частые вопросы.</h2>
        </div>
      </Reveal>
      <div>
        {questions.map((item, i) => (
          <div key={i} className="border-b border-white/10">
            <button
              className="w-full flex justify-between items-center py-5 text-left cursor-pointer group"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className={`text-sm font-medium pr-4 transition-colors duration-300 ${openIndex === i ? 'text-[var(--amber)]' : 'text-white group-hover:text-[var(--amber)]'}`}>{item.q}</span>
              <span className={`text-[var(--text-meta)] text-xl transition-transform duration-300 shrink-0 ${openIndex === i ? 'rotate-45' : ''}`}>+</span>
            </button>
            <div className={`overflow-hidden transition-all duration-400 ${openIndex === i ? 'max-h-48 pb-5' : 'max-h-0'}`}>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Second Quote ─── */
function SecondQuote() {
  return (
    <section className="max-w-[1000px] mx-auto px-8 md:px-12 py-24 text-center">
      <Reveal>
        <blockquote className="serif-text text-2xl md:text-4xl leading-tight mb-8" style={{ letterSpacing: '-0.02em' }}>
          Через договор дарения, где комиссия всего 4,5%. Мы убрали посредника, чтобы вы оставались в потоке.
        </blockquote>
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm uppercase tracking-widest">Илья Панов</span>
          <span className="text-xs text-[var(--text-muted)]">Основатель Uppora</span>
        </div>
      </Reveal>
    </section>
  )
}

/* ─── Final CTA ─── */
function FinalCTA() {
  return (
    <section className="max-w-xl mx-auto px-8 md:px-12 py-32 md:py-40 text-center" id="final-cta" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <Reveal>
        <Meta className="mb-6">[ Заявка ]</Meta>
        <h2 className="serif-text text-4xl md:text-5xl mb-4">Бесплатно. Без паспорта. Без подписки.</h2>
        <p className="text-sm text-[var(--text-muted)] mb-10">Оставьте заявку — мы настроим страницу и QR за вас. Ответим в течение 2 часов.</p>
      </Reveal>
      <Reveal style={{ transitionDelay: '0.1s' }}>
        <form className="flex flex-col gap-3 mb-6">
          <input type="text" placeholder="Ваше имя" className="px-5 py-4 rounded-xl border border-white/10 bg-white/[0.03] text-white text-sm focus:outline-none focus:border-[var(--amber)]/50 transition-colors placeholder:text-[var(--text-meta)]" />
          <input type="email" placeholder="Email" className="px-5 py-4 rounded-xl border border-white/10 bg-white/[0.03] text-white text-sm focus:outline-none focus:border-[var(--amber)]/50 transition-colors placeholder:text-[var(--text-meta)]" />
          <select className="px-5 py-4 rounded-xl border border-white/10 bg-white/[0.03] text-[var(--text-meta)] text-sm focus:outline-none focus:border-[var(--amber)]/50 transition-colors appearance-none">
            <option value="" disabled selected>Ваша ниша</option>
            <option value="music">Музыка</option>
            <option value="education">Образование / лекции</option>
            <option value="art">Искусство / хендмейд</option>
            <option value="streaming">Стримы / видео</option>
            <option value="nko">НКО / благотворительность</option>
            <option value="other">Другое</option>
          </select>
          <button type="button" className="bg-[var(--amber)] text-black px-8 py-4 rounded-xl font-medium text-sm hover:opacity-90 active:scale-[0.98] transition-all mt-2">
            Оставить заявку →
          </button>
        </form>
      </Reveal>
      <Reveal style={{ transitionDelay: '0.2s' }}>
        <a href="https://t.me/uppora_support" target="_blank" rel="noopener" className="inline-block text-xs text-[var(--text-muted)] border border-white/10 px-5 py-2 rounded-full hover:border-white/30 transition-colors no-underline mb-6">
          Или напишите в Telegram
        </a>
        <p className="text-xs text-[var(--text-meta)] mb-6">Удалить аккаунт можно в один клик. Нет донатов — нет расходов.</p>
        <div className="flex flex-wrap gap-6 justify-center text-[var(--text-meta)]">
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
    <footer className="px-8 md:px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="text-base font-medium" style={{ letterSpacing: '-0.02em' }}>Uppora — 2026</div>
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
        <SecondQuote />
        <Marquee />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
