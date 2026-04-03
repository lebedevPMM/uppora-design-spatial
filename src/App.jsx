import { useState, useEffect, useRef } from 'react'
import './index.css'

/* ─── Reveal ─── */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.classList.add('reveal-hidden')
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add('reveal-visible') },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}
const R = ({ children, className = '', delay = 0 }) => {
  const ref = useReveal()
  return <div ref={ref} className={className} style={{ transitionDelay: `${delay}s` }}>{children}</div>
}

/* ─── Header ─── */
function Header() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const h = () => setShow(window.scrollY > 300)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${show ? 'bg-black/80 backdrop-blur-xl py-4' : 'py-6 md:py-8'}`} style={{ mixBlendMode: show ? 'normal' : 'difference' }}>
      <div className="max-w-[1400px] mx-auto px-[var(--padding-edge)] flex justify-between items-center">
        <span className="text-sm font-medium tracking-tight">Uppora —</span>
        <nav className="hidden md:flex gap-8">
          {[['#pain','Проблемы'],['#steps','Как работает'],['#compare','Сравнение'],['#faq','FAQ']].map(([h,l])=>(
            <a key={h} href={h} className="text-[0.8rem] text-white/70 hover:text-white transition-colors no-underline">{l}</a>
          ))}
        </nav>
        <a href="#final-cta" className="text-[0.8rem] text-white/70 hover:text-white transition-colors no-underline">Заявка →</a>
      </div>
    </header>
  )
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="text-center pt-40 md:pt-52 pb-12 relative px-[var(--padding-edge)]">
      <R><div className="meta mb-6">[ Платформа QR-донатов ]</div></R>
      <R delay={0.1}>
        <h1 className="serif text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.03em] max-w-[800px] mx-auto mb-6">
          Комиссия{' '}<br className="hidden sm:block" />
          <span className="italic">всего 4,5%.</span>
        </h1>
      </R>
      <R delay={0.2}>
        <p className="text-[1.05rem] text-[var(--text-muted)] max-w-[420px] mx-auto font-light leading-relaxed">
          QR-донаты без регистрации для донатеров. Без подписок. Без паспорта. Вывод на карту в тот же день.
        </p>
      </R>
      <R delay={0.3}>
        <div className="flex flex-wrap gap-4 justify-center mt-10">
          <a href="#final-cta" className="bg-[var(--amber)] text-black px-8 py-3.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity no-underline">Оставить заявку</a>
          <a href="#steps" className="border border-white/15 text-white/70 px-8 py-3.5 rounded-full text-sm hover:border-white/30 hover:text-white transition-all no-underline">Как это работает</a>
        </div>
      </R>
      <div className="hidden md:block absolute top-32 right-[var(--padding-edge)]">
        <div className="meta text-right">SYS.REQ // ALPHA<br/>VER. 1.0</div>
      </div>
    </section>
  )
}

/* ─── Spatial Cards ─── */
function SpatialGallery() {
  const cards = [
    { meta: 'Барьер #1', title: '10–15%\nкомиссии', img: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { meta: 'Барьер #2', title: 'Регистрация\nдонатера', img: 'https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { meta: 'Решение', title: 'Uppora:\n4,5%', img: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { meta: 'Барьер #3', title: 'Подписки =\nдавление', img: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { meta: 'Барьер #4', title: 'Выплаты\nчерез неделю', img: 'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=600' },
  ]
  const cfgs = [
    { x: -580, z: -350, ry: 22, o: 0.25 },
    { x: -290, z: -170, ry: 12, o: 0.65 },
    { x: 0, z: 40, ry: 0, o: 1 },
    { x: 290, z: -170, ry: -12, o: 0.65 },
    { x: 580, z: -350, ry: -22, o: 0.25 },
  ]
  return (
    <section className="spatial-stage mb-20">
      <div className="spatial-track">
        {cards.map((c, i) => (
          <div key={i} className="spatial-card" style={{
            backgroundImage: `url(${c.img})`,
            transform: `translateX(${cfgs[i].x}px) translateZ(${cfgs[i].z}px) rotateY(${cfgs[i].ry}deg)`,
            opacity: cfgs[i].o, zIndex: i === 2 ? 10 : 1,
          }}>
            <div className="relative z-[2] w-full">
              <div className="text-[0.7rem] text-white/50 mb-1 font-medium uppercase tracking-wider">{c.meta}</div>
              <h3 className="serif text-[1.6rem] leading-[1.1] whitespace-pre-line">{c.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Trust Strip ─── */
function Trust() {
  return (
    <R>
      <div className="section-line py-10 px-[var(--padding-edge)] flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-14" style={{ borderBottom: '1px solid var(--section-border)' }}>
        <span className="text-[0.7rem] text-[var(--text-muted)] uppercase tracking-wider shrink-0 w-24">Доверяют</span>
        <div className="flex flex-wrap gap-x-12 gap-y-3">
          {['Т-Банк — платёжный партнёр','PCI DSS + SSL','0% НДФЛ — ст. 217 НК РФ','Договор дарения'].map((t,i)=>(
            <span key={i} className="meta opacity-40">{t}</span>
          ))}
        </div>
      </div>
    </R>
  )
}

/* ─── Pain Points ─── */
function Pains() {
  const items = [
    { t: '10–15% комиссии', d: 'Типичная платформа забирает 10% комиссии + 3% эквайринг. С каждой тысячи автору — 870\u00A0₽.', a: 'Uppora: 4,5% всего. Автору — 955\u00A0₽' },
    { t: 'Регистрация для донатера', d: 'Хочешь поддержать автора — создай аккаунт, подтверди email, запомни пароль. Половина уходит.', a: 'Ноль регистрации. QR → сумма → готово' },
    { t: 'Подписки = обязательства', d: 'Подписная модель создаёт давление: автор обязан выдавать контент, фан — продлевать подписку.', a: 'Разовые донаты. Благодарность, не обязательство' },
    { t: 'Выплаты через неделю', d: 'Деньги «на платформе» — вывод раз в неделю, у некоторых — раз в месяц или через 90 дней.', a: 'Выплата на карту в тот же день' },
  ]
  return (
    <section id="pain" className="max-w-[1200px] mx-auto px-[var(--padding-edge)] py-28 md:py-36">
      <R>
        <div className="text-center mb-16 md:mb-20">
          <div className="meta mb-4">[ Барьеры индустрии ]</div>
          <h2 className="serif text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.05]">Барьеры, которых не должно быть.</h2>
        </div>
      </R>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((p,i)=>(
          <R key={i} delay={i*0.08}>
            <div className="p-8 md:p-10 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-white/12 transition-colors group h-full flex flex-col">
              <div className="meta mb-5 text-white/20">BARRIER.0{i+1}</div>
              <h3 className="serif text-[1.4rem] mb-3 leading-snug">{p.t}</h3>
              <p className="text-[0.9rem] text-[var(--text-muted)] leading-relaxed flex-1">{p.d}</p>
              <div className="mt-6 pt-5 border-t border-white/6 flex items-center gap-2.5 text-[var(--amber)] text-[0.85rem] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--amber)] shrink-0" />
                {p.a}
              </div>
            </div>
          </R>
        ))}
      </div>
    </section>
  )
}

/* ─── Big Quote ─── */
function BigQuote({ text, name, role, label }) {
  return (
    <section className="max-w-[900px] mx-auto px-[var(--padding-edge)] py-24 md:py-32 text-center">
      <R>
        {label && <div className="meta mb-8">{label}</div>}
        <blockquote className="serif italic text-[clamp(1.6rem,4vw,3rem)] leading-[1.15] tracking-[-0.015em] mb-10 text-white/90">
          {text}
        </blockquote>
        <div className="flex flex-col items-center gap-1">
          <span className="text-[0.8rem] uppercase tracking-[0.1em] font-medium">{name}</span>
          <span className="text-[0.75rem] text-[var(--text-muted)]">{role}</span>
        </div>
      </R>
    </section>
  )
}

/* ─── Workflow ─── */
function Workflow() {
  const steps = [
    { n:'01', t:'Мы создаём страницу.', d:'Только имя и карта для выплат. Без загрузки паспорта. Занимает ровно 2 минуты.', tags:['Консьерж-онбординг','Без паспорта','2 минуты'], img:'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { n:'02', t:'Делитесь ссылкой или QR.', d:'Ссылка в био, QR на столе в кофейне, стикер на витрине. Один линк — все площадки.', tags:['QR-кит','A5-постер','Стикеры'], img:'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { n:'03', t:'Деньги на карте.', d:'Донатер сканирует QR → вводит сумму → готово. Без регистрации. Деньги — в тот же день.', tags:['Т-Банк','В тот же день'], img:'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600' },
  ]
  return (
    <section id="steps" className="section-line max-w-[1200px] mx-auto px-[var(--padding-edge)] py-28 md:py-36">
      <R>
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-20 md:mb-24">
          <div>
            <div className="meta mb-4">[ Три шага ]</div>
            <h2 className="serif text-[clamp(2rem,4.5vw,3.2rem)]">Начните за 2 минуты.</h2>
          </div>
          <div className="meta text-right opacity-60">SEQ_01 — 03<br/>ЛИНЕЙНЫЙ ПРОЦЕСС</div>
        </div>
      </R>
      <div className="flex flex-col gap-28 md:gap-36">
        {steps.map((s,i)=>(
          <R key={i} delay={i*0.1}>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${i%2===1 ? 'md:[direction:rtl]' : ''}`}>
              <div className={i%2===1 ? 'md:[direction:ltr]' : ''}>
                <div className="serif text-[clamp(4rem,8vw,7rem)] leading-[0.75] text-white/[0.04] mb-6 select-none">{s.n}</div>
                <h3 className="serif text-[clamp(1.6rem,3vw,2.2rem)] mb-4 leading-snug">{s.t}</h3>
                <p className="text-[1rem] text-[var(--text-muted)] font-light max-w-[380px] leading-relaxed">{s.d}</p>
                <div className="flex flex-wrap gap-2.5 mt-6">
                  {s.tags.map((tag,ti)=>(
                    <span key={ti} className="border border-white/10 px-4 py-1.5 rounded-full text-[0.7rem] text-white/40 hover:text-white/60 hover:border-white/20 transition-colors">{tag}</span>
                  ))}
                </div>
              </div>
              <div className={`rounded-2xl overflow-hidden relative group ${i%2===1?'md:[direction:ltr]':''}`} style={{ aspectRatio:'4/5', background:'#0a0a0a' }}>
                <img src={s.img} alt="" className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="meta absolute bottom-5 right-5 bg-black/60 px-2 py-1 rounded">IMG_SRC: RAW</div>
              </div>
            </div>
          </R>
        ))}
      </div>
      <R delay={0.1} className="text-center mt-16">
        <a href="#final-cta" className="inline-block bg-[var(--amber)] text-black px-8 py-3.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity no-underline">Оставить заявку →</a>
      </R>
    </section>
  )
}

/* ─── Calculator ─── */
function Calc() {
  const [val, setVal] = useState(1000)
  const bank = Math.round(val*0.03), upp = Math.round(val*0.015), auth = val-bank-upp
  const pct = ((auth/val)*100).toFixed(1)
  const f = n => n.toLocaleString('ru-RU')
  return (
    <section className="section-line max-w-[1200px] mx-auto px-[var(--padding-edge)] py-28 md:py-36">
      <div className="max-w-[480px] mx-auto">
        <R>
          <div className="text-center mb-10">
            <div className="meta mb-4">[ Калькулятор ]</div>
            <h2 className="serif text-[clamp(2rem,4.5vw,3.2rem)]">Открытая бухгалтерия.</h2>
          </div>
        </R>
        <R delay={0.1}>
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-8 md:p-10">
            <div className="meta mb-2">Сумма доната</div>
            <div className="serif text-[2.8rem] mb-6 tracking-tight">{f(val)} <span className="text-[1.4rem] text-white/30">₽</span></div>
            <input type="range" min="100" max="10000" step="100" value={val} onChange={e=>setVal(+e.target.value)} className="mb-8" />
            <div className="mono text-[0.85rem] space-y-0">
              {[
                ['Автору', f(auth)+' ₽', 'text-[var(--amber)] serif text-[1.3rem] font-medium'],
                ['Банку (процессинг)', f(bank)+' ₽', 'text-white/60'],
                ['Uppora', f(upp)+' ₽', 'text-white/60'],
              ].map(([label, value, cls],i)=>(
                <div key={i} className="flex justify-between items-center py-3 border-b border-white/6">
                  <span className="text-white/40">{label}</span>
                  <span className={cls}>{value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center py-3 mt-1 border-t-2 border-[var(--amber)] font-bold text-white">
                <span>ИТОГО</span><span>{f(val)} ₽</span>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-white/6 overflow-hidden mt-6">
              <div className="h-full rounded-full bg-[var(--amber)] transition-all duration-300" style={{width:`${pct}%`}} />
            </div>
            <p className="meta text-center mt-4 opacity-60">Альфа: 4,5% (3% эквайринг + 1,5% вывод). Конкуренты: 10–15%.</p>
          </div>
        </R>
        <R delay={0.2}>
          <p className="serif italic text-[1.05rem] text-white/40 mt-8 text-center leading-relaxed">
            «Мы зарабатываем <span className="text-[var(--amber)] not-italic font-medium">15&nbsp;₽</span> с каждой тысячи. 15 рублей — наш единственный доход.»
          </p>
        </R>
      </div>
    </section>
  )
}

/* ─── Comparison ─── */
function Compare() {
  const hdr = ['Характеристика','Uppora','Boosty','DonationAlerts','Patreon','Ko-fi']
  const rows = [
    ['Итого комиссия','4,5%','~11,7%','~12%','~13–15%','~3–8%'],
    ['Регистрация донатера','✓ Не нужна','✗ Нужна','✗ Нужна','✗ Нужна','✗ PayPal'],
    ['Скорость выплат','В тот же день','1–5 дней','До 90 дней','Раз в месяц','Напрямую'],
    ['Офлайн (QR-кит)','✓ Есть','✗','✗','✗','✗'],
    ['НДФЛ для автора','0% (дарение)','13%+','13%+','По стране','По стране'],
    ['Модель','Разовые донаты','Подписки','Стрим-донаты','Подписки','Донаты + подписки'],
    ['Онбординг','Консьерж','Self-serve','Self-serve','Self-serve','Self-serve'],
  ]
  const cellColor = (cell, ci) => {
    if (ci === 1) return 'text-[var(--amber)] font-medium'
    if (typeof cell === 'string' && cell.startsWith('✓')) return 'text-[var(--emerald)]'
    if (typeof cell === 'string' && cell.startsWith('✗')) return 'text-[var(--red)] opacity-50'
    if (ci === 0) return 'text-white/80 font-medium'
    return 'text-white/30'
  }
  return (
    <section id="compare" className="section-line max-w-[1200px] mx-auto px-[var(--padding-edge)] py-28 md:py-36">
      <R>
        <div className="mb-12 md:mb-16">
          <div className="meta mb-4">[ Сравнение ]</div>
          <h2 className="serif text-[clamp(2rem,4.5vw,3.2rem)] mb-2">Uppora vs. конкуренты.</h2>
          <p className="text-[0.85rem] text-white/30">На основе публичных тарифов, март 2026</p>
        </div>
      </R>
      <R delay={0.1}>
        <div className="overflow-x-auto rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]">
          <table className="w-full text-left text-[0.85rem] min-w-[720px]">
            <thead>
              <tr className="border-b border-white/8">
                {hdr.map((h,i)=>(
                  <th key={i} className={`py-4 px-5 meta font-normal ${i===1?'text-[var(--amber)]':''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row,ri)=>(
                <tr key={ri} className="border-b border-white/4 hover:bg-white/[0.015] transition-colors">
                  {row.map((cell,ci)=>(
                    <td key={ci} className={`py-3.5 px-5 ${cellColor(cell,ci)}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="meta text-center mt-5 opacity-40">Комиссии включают все сборы: платформа + эквайринг + вывод.</p>
      </R>
    </section>
  )
}

/* ─── Legal ─── */
function Legal() {
  return (
    <section id="legal" className="section-line max-w-[1200px] mx-auto px-[var(--padding-edge)] py-28 md:py-36">
      <R>
        <div className="text-center mb-14">
          <div className="meta mb-4">[ Юридическая модель ]</div>
          <h2 className="serif text-[clamp(2rem,4.5vw,3.2rem)]">Две модели. Мы выбрали лучшую.</h2>
        </div>
      </R>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[860px] mx-auto">
        <R delay={0.1}>
          <div className="p-8 md:p-10 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] opacity-40 h-full">
            <div className="meta text-[var(--red)] mb-5">STD.PATH // REJECTED</div>
            <h3 className="serif text-[1.4rem] mb-6">Оплата услуг</h3>
            <div className="space-y-2.5 text-[0.85rem] text-white/40">
              {['Донат отправляется','На счёт платформы (ООО)','Комиссия 10–15%','Удержание НДФЛ 13%','Запрос на вывод','Остаток автору'].map((s,j)=>(
                <div key={j} className="flex items-start gap-3">
                  <span className="shrink-0 w-5 h-5 rounded-full border border-[var(--red)]/20 flex items-center justify-center text-[0.55rem] text-[var(--red)] mono">{j+1}</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-white/6 text-[var(--red)] font-medium text-[0.85rem]">Потери: до 25–30%</div>
          </div>
        </R>
        <R delay={0.2}>
          <div className="p-8 md:p-10 rounded-2xl bg-[var(--card-bg)] border border-[var(--amber)]/25 h-full">
            <div className="meta text-[var(--amber)] mb-5">UPP.PATH // ACTIVE</div>
            <h3 className="serif text-[1.4rem] mb-6">Договор дарения</h3>
            <div className="space-y-2.5 text-[0.85rem] text-white/50">
              {['Донатер отправляет деньги','Деньги сразу на карте автора'].map((s,j)=>(
                <div key={j} className="flex items-start gap-3">
                  <span className="shrink-0 w-5 h-5 rounded-full border border-[var(--amber)]/25 flex items-center justify-center text-[0.55rem] text-[var(--amber)] mono">{j+1}</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-5 border-t border-[var(--amber)]/20 text-[var(--amber)] font-medium text-[0.85rem] leading-[1.8]">
              Основание: ст. 217 НК РФ<br/>НДФЛ: 0%<br/>ИП/самозанятый: не нужен
            </div>
          </div>
        </R>
      </div>
      <R delay={0.3} className="text-center mt-8"><p className="meta opacity-40">Ст. 217 НК РФ, п. 18.1 — дарение между физлицами не облагается НДФЛ</p></R>
    </section>
  )
}

/* ─── Benefits ─── */
function Benefits() {
  return (
    <div className="section-line max-w-[1200px] mx-auto px-[var(--padding-edge)] py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[
          {code:'FIN.OPEN // 01', t:'Процессинг карт', d:'3% покрывает стоимость эквайринга через Т-Банк. 1,5% — всё, что получает Uppora.'},
          {code:'FIN.OPEN // 02', t:'Инфраструктура и развитие', d:'Серверы, безопасность, поддержка 24/7. Постоянные улучшения для авторов.'},
        ].map((b,i)=>(
          <R key={i} delay={i*0.1}>
            <div className="p-8 md:p-10 bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)]">
              <div className="meta mb-4">{b.code}</div>
              <h3 className="serif text-[1.3rem] mb-3">{b.t}</h3>
              <p className="text-[0.9rem] text-[var(--text-muted)] leading-relaxed">{b.d}</p>
            </div>
          </R>
        ))}
      </div>
    </div>
  )
}

/* ─── Marquee ─── */
function Marquee() {
  const items = ['Комиссия 4,5%','Без регистрации','Вывод в тот же день','0% НДФЛ','QR-кит бесплатно','Договор дарения']
  const Item = () => items.map((t,i)=>(
    <span key={i} className="inline-flex items-center gap-[3vw] px-[3vw]">
      <span className={`serif text-[clamp(1.3rem,2.5vw,2rem)] whitespace-nowrap ${t.includes('4,5%')||t.includes('0%')?'text-white':'text-white/25'}`}>{t}</span>
      <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
    </span>
  ))
  return (
    <section className="w-full overflow-hidden py-20 relative bg-[#030303]">
      <div className="meta absolute top-6 left-[var(--padding-edge)] z-20">[ Ключевые преимущества ]</div>
      <div className="absolute inset-y-0 left-0 w-[12vw] z-10 bg-gradient-to-r from-[#030303] to-transparent" />
      <div className="absolute inset-y-0 right-0 w-[12vw] z-10 bg-gradient-to-l from-[#030303] to-transparent" />
      <div className="marquee-track"><Item /><Item /></div>
    </section>
  )
}

/* ─── FAQ ─── */
function FAQ() {
  const [open, setOpen] = useState(null)
  const qs = [
    ['Есть ли отзывы?','Мы на стадии альфы — собираем первую волну авторов. Можно подключиться в числе первых и протестировать.'],
    ['Почему подключаете к платформе сами?','Чтобы вам не разбираться в настройках. Создаём страницу за пару минут.'],
    ['Почему такая низкая комиссия?','Сделали комфортной, чтобы донаты оставались рабочим инструментом монетизации.'],
    ['Могу зарегистрироваться и начать позднее?','Да. Страница никуда не исчезнет.'],
    ['У меня есть Boosty / VK Донаты — отключаться?','Нет. Uppora работает параллельно.'],
    ['Зачем мне ещё один сервис для донатов?','Не все готовы оформлять подписку. Часто хочется поддержать один раз, здесь и сейчас.'],
    ['Можно вывести на зарубежную карту?','Пока нет, только РФ. Планируем добавить.'],
    ['Сколько времени занимает подключение?','Несколько минут. Мы помогаем с настройкой.'],
    ['Нужно ли что-то обновлять?','Нет. Страница готова сразу после подключения.'],
    ['Это замена другим способам монетизации?','Скорее дополнение — работает вместе с подписками и другими сервисами.'],
    ['На чём зарабатывает Uppora?','15 ₽ с каждой тысячи (1,5%). Плюс 30 ₽ (3%) банку. Итого 4,5%. Без скрытых сборов.'],
    ['А что с налогами?','Договор дарения — ст. 217 НК РФ. НДФЛ 0%. Статус ИП не нужен.'],
  ]
  return (
    <section id="faq" className="section-line max-w-[700px] mx-auto px-[var(--padding-edge)] py-28 md:py-36">
      <R>
        <div className="text-center mb-12">
          <div className="meta mb-4">[ FAQ ]</div>
          <h2 className="serif text-[clamp(2rem,4vw,2.8rem)]">Частые вопросы.</h2>
        </div>
      </R>
      <div>
        {qs.map(([q,a],i)=>(
          <div key={i} className="border-b border-white/6">
            <button onClick={()=>setOpen(open===i?null:i)} className="w-full flex justify-between items-center py-5 text-left cursor-pointer bg-transparent border-none text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
              <span className={`text-[0.9rem] font-medium pr-4 transition-colors duration-300 ${open===i?'text-[var(--amber)]':''}`}>{q}</span>
              <span className={`text-white/20 text-lg shrink-0 transition-transform duration-300 ${open===i?'rotate-45':''}`}>+</span>
            </button>
            <div className={`overflow-hidden transition-all duration-400 ${open===i?'max-h-40 pb-5':'max-h-0'}`}>
              <p className="text-[0.875rem] text-[var(--text-muted)] leading-relaxed">{a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── CTA ─── */
function CTA() {
  return (
    <section id="final-cta" className="section-line max-w-[480px] mx-auto px-[var(--padding-edge)] py-28 md:py-36 text-center">
      <R>
        <div className="meta mb-6">[ Заявка ]</div>
        <h2 className="serif text-[clamp(2rem,5vw,2.8rem)] mb-4 leading-[1.1]">Бесплатно.<br/>Без паспорта. Без подписки.</h2>
        <p className="text-[0.85rem] text-[var(--text-muted)] mb-10">Мы настроим страницу и QR за вас. Ответим за 2 часа.</p>
      </R>
      <R delay={0.1}>
        <form className="flex flex-col gap-3 mb-6 text-left">
          {[['text','Ваше имя'],['email','Email']].map(([t,p],i)=>(
            <input key={i} type={t} placeholder={p} className="w-full px-5 py-3.5 rounded-xl border border-white/8 bg-white/[0.02] text-white text-[0.85rem] outline-none focus:border-[var(--amber)]/40 transition-colors placeholder:text-white/20" style={{fontFamily:"'Inter',sans-serif"}} />
          ))}
          <select className="w-full px-5 py-3.5 rounded-xl border border-white/8 bg-white/[0.02] text-white/20 text-[0.85rem] outline-none focus:border-[var(--amber)]/40 transition-colors appearance-none" style={{fontFamily:"'Inter',sans-serif"}}>
            <option value="" disabled selected>Ваша ниша</option>
            <option>Музыка</option><option>Образование</option><option>Искусство</option><option>Стримы</option><option>НКО</option><option>Другое</option>
          </select>
          <button type="button" className="w-full bg-[var(--amber)] text-black py-3.5 rounded-xl text-[0.85rem] font-medium mt-1 cursor-pointer border-none hover:opacity-90 transition-opacity" style={{fontFamily:"'Inter',sans-serif"}}>
            Оставить заявку →
          </button>
        </form>
      </R>
      <R delay={0.2}>
        <a href="https://t.me/uppora_support" target="_blank" rel="noopener" className="inline-block text-[0.7rem] text-white/30 border border-white/8 px-5 py-2 rounded-full hover:border-white/15 transition-colors no-underline mb-6">Или в Telegram</a>
        <p className="meta opacity-40 mb-5">Удалить аккаунт — один клик. Нет донатов — нет расходов.</p>
        <div className="flex flex-wrap gap-5 justify-center">
          {['SSL + PCI DSS','Ст. 217 НК РФ','Т-Банк'].map((t,i)=><span key={i} className="meta opacity-30">{t}</span>)}
        </div>
      </R>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="section-line px-[var(--padding-edge)] py-10 flex flex-wrap justify-between items-center gap-4">
      <span className="text-[0.85rem] font-medium tracking-tight">Uppora — 2026</span>
      <span className="meta opacity-40">SYSTEM NORM: NOMINAL</span>
    </footer>
  )
}

/* ─── App ─── */
export default function App() {
  return (
    <>
      <div className="bg-grid" />
      <Header />
      <main>
        <Hero />
        <SpatialGallery />
        <Trust />
        <Pains />
        <BigQuote
          label="[ Основатель ]"
          text="Я видел, как авторы теряют 20–30% заработанного на комиссиях и налогах. Мы нашли способ делать это иначе."
          name="Илья Панов"
          role="Основатель Uppora"
        />
        <Workflow />
        <Calc />
        <Compare />
        <Legal />
        <Benefits />
        <BigQuote
          text="Через договор дарения, где комиссия всего 4,5%. Мы убрали посредника, чтобы вы оставались в потоке."
          name="Илья Панов"
          role="Основатель Uppora"
        />
        <Marquee />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
