import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Logo } from '../components/brand/Logo'
import { Button } from '../components/ui/Button'
import { InstallButton } from '../components/pwa/InstallButton'

export function LandingPage() {
  return (
    <div className="min-h-dvh bg-porcelain">
      <header className="h-20 px-6 md:px-10 flex items-center justify-between border-b border-hairline sticky top-0 z-20 bg-porcelain/90 backdrop-blur">
        <Logo />
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/login"
            className="text-sm text-ink-muted hover:text-ink hidden sm:inline no-underline"
          >
            Sign in
          </Link>
          <InstallButton size="sm" />
          <Link to="/login">
            <Button size="sm">Start 30 days free</Button>
          </Link>
        </div>
      </header>

      <section className="relative survey-grid overflow-hidden border-b border-hairline">
        <div className="absolute inset-0 porcelain-wash pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-7 animate-settle">
            <h1 className="font-display text-mega font-extrabold text-ink mb-5">
              Sit down.
              <br />
              <span className="text-primary">It’s handled.</span>
            </h1>
            <p className="text-ink-muted text-lg max-w-[42ch] mb-8 leading-relaxed">
              RentIQ runs the rent, the repairs and the Healthy Homes clock across your rentals —
              and shows you exactly where every one of them stands. The work is done before it’s
              urgent. The final word stays yours.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/login">
                <Button size="lg">
                  Start 30 days free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link
                to="/login"
                className="text-sm text-ink-muted hover:text-ink no-underline marked pb-0.5"
              >
                See how a week looks
              </Link>
            </div>
          </div>

          <div className="md:col-span-5 animate-settle" style={{ animationDelay: '80ms' }}>
            <div className="panel overflow-hidden md:translate-x-4">
              <div className="px-4 py-3 border-b border-hairline flex items-center justify-between bg-basalt text-basalt-ink">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em]">
                  Portfolio · this week
                </span>
                <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-steam" />
                  Clear
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
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint mb-6">
            Built around New Zealand law
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {[
              {
                title: 'Healthy Homes',
                body: 'Heating, insulation, ventilation, moisture and draught — tracked per property so nothing falls past its deadline.',
              },
              {
                title: 'RTA notices',
                body: '14-day, 21-day, breach and rent-increase templates aligned with the Residential Tenancies Act 1986.',
              },
              {
                title: 'Tenant screening',
                body: 'Credit checks via Centrix, plus an Iris score, so you decide with a clear picture — not a gut feel.',
              },
              {
                title: 'Books that add up',
                body: 'Rent ledger syncs to Xero. Export statements ready for your accountant and IRD at year end.',
              },
            ].map((item) => (
              <div key={item.title} className="border-t border-hairline pt-4">
                <h3 className="font-display text-lg font-extrabold tracking-[-0.02em] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="mb-14 max-w-2xl">
          <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-4 tracking-[-0.025em]">
            Landlording, minus the guesswork.
          </h2>
          <p className="text-ink-muted text-lg">
            One place where the rent, the repairs and the legal dates all agree with each other.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-0 border-t border-hairline">
          {[
            {
              n: '01',
              title: 'Nothing reaches you as a surprise',
              body: 'Iris watches the rent roll, the inbox and the calendar. Late payment, leaking cylinder, expiring insulation statement — you get the facts, the recommendation and a drafted reply in one card. One decision, then it’s away.',
            },
            {
              n: '02',
              title: 'Compliance with a paper trail',
              body: 'Every property tracked against the five Healthy Homes standards, with dated statements, tradesperson records and photos stored where you can find them. If the Tenancy Tribunal ever asks, you’re already holding the answer.',
            },
            {
              n: '03',
              title: 'Money that reconciles itself',
              body: 'Rent ledger, arrears ageing, bond lodgement and maintenance spend — reconciled and pushed to Xero. End of year is an export, not an archaeology dig.',
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
            <p className="font-display font-extrabold text-metric text-basalt-ink">5 standards</p>
            <p className="text-sm text-basalt-ink/55 mt-2">
              tracked per property, with evidence attached
            </p>
          </div>
          <div>
            <p
              className="font-display font-extrabold text-metric tabular-nums"
              style={{ color: 'hsl(37 96% 55%)' }}
              data-currency
            >
              From $29/mo
            </p>
            <p className="text-sm text-basalt-ink/55 mt-2">
              against roughly 8.5% plus a letting fee
            </p>
          </div>
          <div>
            <p className="font-display font-extrabold text-metric text-basalt-ink">You decide.</p>
            <p className="text-sm text-basalt-ink/55 mt-2">
              nothing goes to a tenant without your sign-off
            </p>
          </div>
        </div>
      </section>

      <section className="relative max-w-6xl mx-auto px-6 md:px-10 py-20 text-center survey-grid">
        <div className="absolute inset-0 porcelain-wash pointer-events-none" />
        <h2 className="font-display text-4xl font-extrabold mb-3 relative">Put the kettle on.</h2>
        <p className="text-ink-muted mb-8 relative max-w-[40ch] mx-auto">
          Thirty days free, no lock-in, built for New Zealand law. Bring one property or twenty.
        </p>
        <Link to="/login" className="relative inline-block">
          <Button size="lg">Start 30 days free</Button>
        </Link>
      </section>

      <footer className="border-t border-hairline py-8 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-ink-faint max-w-6xl mx-auto">
        <Logo size="sm" />
        <span>© 2026 RentIQ · Property management for New Zealand landlords</span>
      </footer>
    </div>
  )
}
