import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Logo } from '../components/brand/Logo'
import { Button } from '../components/ui/Button'
import { Metric } from '../components/ui/Metric'

export function LandingPage() {
  return (
    <div className="min-h-dvh bg-porcelain">
      <header className="h-16 px-6 md:px-10 flex items-center justify-between border-b border-hairline sticky top-0 z-20 bg-porcelain/90 backdrop-blur">
        <Logo />
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm text-ink-muted hover:text-ink hidden sm:inline no-underline"
          >
            Sign in
          </Link>
          <Link to="/login">
            <Button size="sm">Start free</Button>
          </Link>
        </div>
      </header>

      <section className="relative survey-grid overflow-hidden border-b border-hairline">
        <div className="absolute inset-0 porcelain-wash pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-7 animate-settle">
            <p className="font-mono text-label uppercase text-ink-faint tracking-[0.12em] mb-5">
              For NZ landlords · headache optional
            </p>
            <h1 className="font-display text-mega font-extrabold text-ink mb-5">
              Sit down.
              <br />
              <span className="text-primary">It’s handled.</span>
            </h1>
            <p className="text-ink-muted text-lg max-w-[40ch] mb-8 leading-relaxed">
              RentIQ is the quiet cup of tea for self-managing owners — messages, maintenance,
              rent and Healthy Homes, already sorted. You only approve.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/login">
                <Button size="lg">
                  Start your free trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link
                to="/tenant/login"
                className="text-sm text-ink-muted hover:text-ink no-underline marked pb-0.5"
              >
                Tenant portal
              </Link>
            </div>
          </div>

          <div className="md:col-span-5 animate-settle" style={{ animationDelay: '80ms' }}>
            <div className="panel overflow-hidden md:translate-x-4">
              <div className="px-4 py-3 border-b border-hairline flex items-center justify-between bg-basalt text-basalt-ink">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em]">
                  Rent roll · this week
                </span>
                <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-steam" />
                  Watching
                </span>
              </div>
              {[
                { addr: '12 Oriental Pde', amt: '$680', ok: true },
                { addr: '88 Karori Rd', amt: '$610', ok: true },
                { addr: '4B Hawker St', amt: '$520', ok: false },
              ].map((row) => (
                <div
                  key={row.addr}
                  className="relative px-4 py-3.5 border-b border-hairline last:border-0 flex items-center justify-between"
                >
                  <span
                    className={`absolute left-0 top-0 bottom-0 w-[2px] ${row.ok ? 'bg-positive' : 'bg-accent'}`}
                  />
                  <span className="text-sm text-ink pl-2">{row.addr}</span>
                  <span
                    className={`font-display font-bold text-base tabular-nums ${row.ok ? 'text-ink' : 'text-accent-ink marked'}`}
                    data-currency
                  >
                    {row.amt}
                  </span>
                </div>
              ))}
              <div className="px-4 py-3 bg-sunken flex justify-between text-sm">
                <span className="text-ink-muted">Collected</span>
                <span className="font-display font-bold text-primary" data-currency>
                  $1,290 / $1,810
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-hairline bg-surface">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-4 flex flex-wrap gap-x-10 gap-y-2">
          {[
            'Healthy Homes deadlines',
            'RTA 1986 notices',
            'Tenancy Services bond',
            'IRD-ready statements',
          ].map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-8 mb-14">
          <div className="md:col-span-1">
            <p className="font-mono text-label uppercase text-ink-faint tracking-[0.12em] writing-mode-vertical md:pt-2">
              Calm
            </p>
          </div>
          <div className="md:col-span-11">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-4 tracking-[-0.025em]">
              Landlording, minus the landlording.
            </h2>
            <p className="text-ink-muted max-w-[46ch] text-lg">
              One quiet place for the headaches — so evenings stop belonging to your rentals.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-0 border-t border-hairline">
          {[
            {
              n: '01',
              title: 'Skip handles first contact',
              body: 'Tenant messages, leak triage, late-rent nudges — drafted for your approval, never sent alone.',
            },
            {
              n: '02',
              title: 'Compliance that doesn’t slip',
              body: 'Heating, insulation, ventilation, moisture, draught — tracked per property against Healthy Homes.',
            },
            {
              n: '03',
              title: 'Money you can trust',
              body: 'Rent ledger, arrears visibility, and Xero-ready exports without spreadsheet archaeology.',
            },
          ].map((item) => (
            <div
              key={item.n}
              className="border-b md:border-b-0 md:border-r border-hairline last:border-r-0 p-6 md:p-8"
            >
              <p className="font-mono text-[10px] text-accent tracking-[0.14em] mb-4">{item.n}</p>
              <h3 className="font-display text-xl font-extrabold mb-2 tracking-[-0.02em]">
                {item.title}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-basalt text-basalt-ink">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20 grid md:grid-cols-3 gap-12">
          <div>
            <Metric value={4} suffix=" evenings" className="text-basalt-ink" />
            <p className="text-sm text-basalt-ink/55 mt-2">back each month, on average</p>
          </div>
          <div>
            <p className="font-display font-extrabold text-metric text-accent">You approve.</p>
            <p className="text-sm text-basalt-ink/55 mt-2">Nothing outbound without your tap</p>
          </div>
          <div>
            <Metric value={29} prefix="From $" suffix="/mo" className="text-basalt-ink" animate={false} />
            <p className="text-sm text-basalt-ink/55 mt-2">vs ~8.5% to a property manager</p>
          </div>
        </div>
      </section>

      <section className="relative max-w-6xl mx-auto px-6 md:px-10 py-20 text-center survey-grid">
        <div className="absolute inset-0 porcelain-wash pointer-events-none" />
        <h2 className="font-display text-4xl font-extrabold mb-3 relative">
          Put the kettle on.
        </h2>
        <p className="text-ink-muted mb-8 relative">
          Thirty days free. No lock-in. Made for New Zealand.
        </p>
        <Link to="/login" className="relative inline-block">
          <Button size="lg">Start free trial</Button>
        </Link>
      </section>

      <footer className="border-t border-hairline py-8 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-ink-faint max-w-6xl mx-auto">
        <Logo size="sm" />
        <span>© 2026 RentIQ · Sit down. It’s handled.</span>
      </footer>
    </div>
  )
}
