import { Badge, Button, Card, Input, Select } from '@/components/ui';
import { Briefcase, CheckSquare, Edit3, Eye, Mail, Plus, Search, Sparkles } from 'lucide-react';
import React from 'react';

function Foundation(): React.ReactElement {
  const colorTokens = [
    { name: 'app-bg', bgClass: 'bg-app-bg', hex: '#F7F6EE', desc: 'Main Application Background' },
    { name: 'app-sage', bgClass: 'bg-app-sage', hex: '#B7D7A8', desc: 'Soft Border & Soft Accent' },
    { name: 'app-mint', bgClass: 'bg-app-mint', hex: '#9FCCB0', desc: 'Secondary Light Badge Base' },
    { name: 'app-eucalyptus', bgClass: 'bg-app-eucalyptus', hex: '#7BAE8F', desc: 'Primary Interactive Elements' },
    { name: 'app-seafoam', bgClass: 'bg-app-seafoam', hex: '#6DB6A6', desc: 'Growth / Productivity Accent' },
    { name: 'app-sunshine', bgClass: 'bg-app-sunshine', hex: '#F2C400', desc: 'Warning & AI Highlight Base' },
    { name: 'app-brown', bgClass: 'bg-app-brown', hex: '#4A3525', desc: 'Deep Earth Brown for Text Warning' },
    { name: 'app-moss', bgClass: 'bg-app-moss', hex: '#8FAE6E', desc: 'Moss Green Accent' },
    { name: 'app-olive', bgClass: 'bg-app-olive', hex: '#6D7F44', desc: 'Olive Accent' },
    { name: 'app-leaf', bgClass: 'bg-app-leaf', hex: '#4E6336', desc: 'Leaf High Priority Text Base' },
    { name: 'app-forest', bgClass: 'bg-app-forest', hex: '#2E4A2F', desc: 'Forest Green Base' },
  ];

  const textTokens = [
    { className: 'text-app-title', name: 'text-app-title', hex: '#233024', desc: 'Deep Charcoal Forest (Main headings, card titles)' },
    { className: 'text-app-body', name: 'text-app-body', hex: '#3B4B3C', desc: 'Muted Leaf (Primary content, task titles, paragraph)' },
    { className: 'text-app-subtext', name: 'text-app-subtext', hex: '#64748B', desc: 'Slate 500 (Descriptions, timestamps, secondary notes)' },
    { className: 'text-app-disabled', name: 'text-app-disabled', hex: '#CBD5E1', desc: 'Slate 300 (Striked-through texts for completed tasks)' },
  ];

  return (
    <div className="min-h-screen bg-app-bg p-8 md:p-12 text-app-body">

      {/* HEADER SECTION */}
      <header className="mb-12 border-b border-app-subtext/20 pb-6">
        <h1 className="text-3xl font-extrabold text-app-title tracking-tight">📐 Application Foundations</h1>
        <p className="text-sm text-app-subtext mt-2">
          Design System documentation for Momentum Daily Tracker App. Managed via global v4 CSS theme.
        </p>
      </header>

      <div className="space-y-12 max-w-4xl">

        {/* SECTION 1: COLOR PALETTE */}
        <section className="bg-white border border-app-subtext/10 rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-app-title mb-1">🎨 Color Palette (Fresh Daisy)</h2>
          <p className="text-xs text-app-subtext mb-6">Reading directly from your custom CSS token variables (`--color-app-*`).</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {colorTokens.map((color) => (
              <div key={color.name} className="flex items-center gap-3 p-3 border border-app-subtext/5 rounded-xl bg-app-bg/20">
                <div className={`w-12 h-12 rounded-lg border border-app-subtext/10 shadow-inner shrink-0 ${color.bgClass}`} />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-app-title font-mono">--color-{color.name}</p>
                  <p className="text-[10px] text-app-subtext uppercase font-semibold">{color.hex}</p>
                  <p className="text-[11px] text-app-subtext truncate mt-0.5">{color.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: TYPOGRAPHY */}
        <section className="bg-white border border-app-subtext/10 rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-app-title mb-1">✍️ Typography & Semantic Text Colors</h2>
          <p className="text-xs text-app-subtext mb-6">Organic text hierarchy mapped to your precise Slate and Charcoal-Forest tokens.</p>

          <div className="space-y-5">
            {textTokens.map((token) => (
              <div key={token.name} className="border-b border-app-subtext/5 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-mono font-bold text-app-subtext/60">{token.name} ({token.hex})</span>
                </div>
                <p className={`text-base font-semibold ${token.className}`}>
                  The quick brown fox jumps over the lazy dog.
                </p>
                <p className="text-xs text-app-subtext mt-1">{token.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: ATOMIC BADGES */}
        <section className="bg-white border border-app-subtext/10 rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-app-title mb-1">🏷️ Atomic Components: Badges</h2>
          <p className="text-xs text-app-subtext mb-6">Testing the customized Badge component styles mapped to CSS layers.</p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold text-app-title uppercase tracking-wider mb-3">Fresh Daisy Shades</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="sage">Sage Accent</Badge>
                <Badge variant="mint">Mint Sub-badge</Badge>
                <Badge variant="eucalyptus">Eucalyptus Primary</Badge>
                <Badge variant="seafoam">Seafoam Growth</Badge>
                <Badge variant="moss">Moss Green</Badge>
                <Badge variant="olive">Olive Accent</Badge>
                <Badge variant='sunshine'>Yellow Sunshine</Badge>
                <Badge variant="leaf">Leaf High Priority</Badge>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-app-title uppercase tracking-wider mb-3">Functional Status</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="success" dot>Success State</Badge>
                <Badge variant="warning" dot>Warning</Badge>
                <Badge variant="error" dot>Error Critical</Badge>
                <Badge variant="info" dot>System Info</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: ATOMIC COMPONENTS (BUTTONS) */}
        <section className="bg-white border border-app-subtext/10 rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-app-title mb-1">🎛️ Atomic Components: Buttons</h2>
          <p className="text-xs text-app-subtext mb-6">Interactive preview of the TypeScript reusable Button component mapped to v4 variants.</p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold text-app-title uppercase tracking-wider mb-3">Button Variants</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="danger">Danger Button</Button>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-app-title uppercase tracking-wider mb-3">States & Sizes</h3>
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-medium text-app-subtext w-20">States:</span>
                  <Button variant="primary" loading>Loading State</Button>
                  <Button variant="primary" disabled>Disabled State</Button>
                  <Button variant="secondary" leftIcon={<Plus />}>With Left Icon</Button>
                </div>

                {/* Pilihan Ukuran */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-medium text-app-subtext w-20">Sizes:</span>
                  <Button variant="primary" size="sm">Small (sm)</Button>
                  <Button variant="primary" size="md">Medium (md)</Button>
                  <Button variant="primary" size="lg">Large (lg)</Button>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className="bg-white border border-app-subtext/10 rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-app-title mb-1">🎴 Atomic Components: Cards & Compound Structures</h2>
          <p className="text-xs text-app-subtext mb-6">Interactive compound structure preview for tracking cards, modular dashboards, and grid modules.</p>

          <div className="space-y-8">

            {/* Contoh 1: Card Standar untuk Tracker Modul */}
            <div>
              <h3 className="text-xs font-bold text-app-title uppercase tracking-wider mb-3">1. Module Standard Card</h3>
              <div className="max-w-md">
                <Card
                  title="Daily Activity Tracker"
                  extra={<span className="flex items-center gap-1">✨ AI Live</span>}
                  actions={[
                    <span key="view"><Eye /> View Details</span>,
                    <span key="edit"><Edit3 /> Manage Tasks</span>
                  ]}
                >
                  <Card.Meta
                    avatar={
                      <div className="w-8 h-8 rounded-full bg-app-eucalyptus/20 text-app-forest flex items-center justify-center font-bold text-xs">
                        AT
                      </div>
                    }
                    title="Overview Activity"
                    description="Lacak performa belajar Tech English harian serta manajemen refactoring modul arsitektur microfrontend React milikmu."
                  />
                </Card>
              </div>
            </div>

            {/* Contoh 2: Card Grid untuk Ringkasan Bento Layout (Bisa dipakai di Finance/Diary summary) */}
            <div>
              <h3 className="text-xs font-bold text-app-title uppercase tracking-wider mb-3">2. Compound Card Grid Layout</h3>
              <div className="overflow-hidden border border-app-subtext/15 rounded-xl bg-slate-50 flex flex-wrap">
                <Card.Grid>
                  <div className="flex items-center gap-2 mb-2 text-app-forest">
                    <CheckSquare />
                    <h4 className="text-xs font-bold uppercase tracking-wide">Tasks Completed</h4>
                  </div>
                  <p className="text-2xl font-extrabold text-app-title">18 / 24</p>
                  <p className="text-[11px] text-app-subtext mt-1">75% velocity this week</p>
                </Card.Grid>

                <Card.Grid>
                  <div className="flex items-center gap-2 mb-2 text-app-yellow-dark">
                    <Sparkles />
                    <h4 className="text-xs font-bold uppercase tracking-wide">AI Health Score</h4>
                  </div>
                  <p className="text-2xl font-extrabold text-app-title">9.4 <span className="text-xs font-medium text-app-subtext">/ 10</span></p>
                  <p className="text-[11px] text-app-subtext mt-1">Productivity streak is excellent</p>
                </Card.Grid>

                <Card.Grid className="border-r-0!">
                  <h4 className="text-xs font-bold text-app-subtext uppercase tracking-wide mb-2">Finance Overview</h4>
                  <p className="text-xl font-extrabold text-app-title">Rp 850.000</p>
                  <p className="text-[11px] text-app-leaf font-medium mt-2">📉 12% lower than last week</p>
                </Card.Grid>
              </div>
            </div>

          </div>
        </section>

        <section className="bg-white border border-app-subtext/10 rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-app-title mb-1">🎛️ Form Components: Select Fields</h2>
          <p className="text-xs text-app-subtext mb-6">Testing vertical and inline horizontal alignment options for form layouts.</p>

          <div className="space-y-6 max-w-md">

            {/* Contoh 1: Layout Vertikal Standar */}
            <div>
              <h3 className="text-xs font-bold text-app-title uppercase tracking-wider mb-3">1. Standard Vertical Layout</h3>
              <Select
                label="Category Type"
                placeholder="Choose active module..."
                options={[
                  { label: '💼 Work Management', value: 'work' },
                  { label: '🎓 Tech Learning', value: 'learning' },
                  { label: '🏠 Household Notes', value: 'household' }
                ]}
                helperText="Select the primary group for task isolation."
                fullWidth
              />
            </div>

            {/* Contoh 2: Layout Horizontal / Inline (Opsi yang kamu inginkan) */}
            <div className="pt-4 border-t border-slate-50">
              <h3 className="text-xs font-bold text-app-title uppercase tracking-wider mb-4">2. Inline Horizontal Layout (Label Side-by-Side)</h3>
              <Select
                label="Priority Level"
                alignLabel="horizontal"
                leftIcon={<Briefcase />}
                options={[
                  { label: 'High Priority (Leaf)', value: 'high' },
                  { label: 'Medium Priority (Yellow)', value: 'medium' },
                  { label: 'Low Priority (Sage)', value: 'low' }
                ]}
                fullWidth
              />
            </div>

            {/* Contoh 3: State Error Fungsional */}
            <div className="pt-4 border-t border-slate-50">
              <h3 className="text-xs font-bold text-app-title uppercase tracking-wider mb-3">3. Error Validation State</h3>
              <Select
                label="Required Option"
                required
                errorText="Please select an option before proceeding to push to GitHub repository."
                options={[
                  { label: 'Production Ready', value: 'prod' }
                ]}
                fullWidth
              />
            </div>

          </div>
        </section>

        <section className="bg-white border border-app-subtext/10 rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-app-title mb-1">⌨️ Form Components: Text Input Fields</h2>
          <p className="text-xs text-app-subtext mb-6">Testing reusable custom inputs with icon anchors and text layouts.</p>

          <div className="space-y-6 max-w-md">

            {/* Contoh 1: Input Standar dengan Left Icon */}
            <div>
              <h3 className="text-xs font-bold text-app-title uppercase tracking-wider mb-3">1. Input with Left Icon (Vertical)</h3>
              <Input
                label="Search Activities"
                placeholder="Type here..."
                leftIcon={<Search />}
                fullWidth
              />
            </div>

            {/* Contoh 2: Layout Inline Horizontal (Opsi khusus) */}
            <div className="pt-4 border-t border-slate-50">
              <h3 className="text-xs font-bold text-app-title uppercase tracking-wider mb-4">2. Inline Horizontal Layout</h3>
              <Input
                label="Email Address"
                alignLabel="horizontal"
                placeholder="your-name@domain.com"
                leftIcon={<Mail />}
                fullWidth
              />
            </div>

            {/* Contoh 3: State Error Validasi */}
            <div className="pt-4 border-t border-slate-50">
              <h3 className="text-xs font-bold text-app-title uppercase tracking-wider mb-3">3. Input Error State</h3>
              <Input
                label="Account Token"
                required
                errorText="Token has expired. Please verify your custom server configurations."
                placeholder="Enter API token..."
                fullWidth
              />
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}

export default Foundation