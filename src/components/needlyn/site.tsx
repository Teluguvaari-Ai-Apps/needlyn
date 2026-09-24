import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, Plus, X } from "lucide-react";
import {
  capabilities,
  engagements,
  faqs,
  horizons,
  moments,
  projectTypes,
  reasons,
  specLine,
  stages,
  type Capability,
} from "./content";

const BRIEF_KEY = "needlyn-brief";

type Brief = {
  picks: string[];
  moment: (typeof moments)[number];
  horizon: (typeof horizons)[number];
};

const defaultBrief: Brief = {
  picks: ["software"],
  moment: "An MVP",
  horizon: "A quarter",
};

function loadBrief(): Brief {
  try {
    const raw = localStorage.getItem(BRIEF_KEY);
    if (!raw) return defaultBrief;
    const parsed = JSON.parse(raw) as Partial<Brief>;
    const picks = Array.isArray(parsed.picks)
      ? parsed.picks.filter((id) => capabilities.some((c) => c.id === id))
      : defaultBrief.picks;
    const moment = moments.includes(parsed.moment as Brief["moment"])
      ? (parsed.moment as Brief["moment"])
      : defaultBrief.moment;
    const horizon = horizons.includes(parsed.horizon as Brief["horizon"])
      ? (parsed.horizon as Brief["horizon"])
      : defaultBrief.horizon;
    return { picks: picks.length ? picks : defaultBrief.picks, moment, horizon };
  } catch {
    return defaultBrief;
  }
}

function briefParagraph(brief: Brief) {
  const names = capabilities
    .filter((c) => brief.picks.includes(c.id))
    .map((c) => c.title.replace(".", ""))
    .join(", ");
  return `${brief.moment}. We need help with ${names}. The horizon is ${brief.horizon.toLowerCase()}.`;
}

export function Home() {
  const [tone, setTone] = useState<"dark" | "light">("dark");
  const [menu, setMenu] = useState(false);
  const [storyId, setStoryId] = useState<string | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setTone(entry.isIntersecting ? "dark" : "light"),
      { rootMargin: "-48px 0px 0px 0px", threshold: 0.12 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  const story = capabilities.find((c) => c.id === storyId) ?? null;

  return (
    <>
      <a href="#work" className="skip">
        Skip to content
      </a>
      <header className="nav-bar" data-tone={menu ? "light" : tone}>
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5">
          <a href="#top" className="wordmark" onClick={() => setMenu(false)}>
            needlyn
          </a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            <a className="nav-link" href="#work">Services</a>
            <a className="nav-link" href="#process">Process</a>
            <a className="nav-link" href="#studio">Studio</a>
            <a className="nav-link" href="#faq">FAQ</a>
            <a className={`nav-link more ${tone === "dark" ? "on-dark" : ""}`} href="#contact">
              Start a project
            </a>
          </nav>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center md:hidden"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            onClick={() => setMenu((open) => !open)}
          >
            {menu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>
      {menu ? (
        <nav className="menu-sheet px-6 py-6 md:hidden" aria-label="Mobile">
          <div className="flex flex-col text-2xl tracking-tight">
            {[
              ["Services", "#work"],
              ["Process", "#process"],
              ["Studio", "#studio"],
              ["FAQ", "#faq"],
              ["Start a project", "#contact"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="flex min-h-14 items-center border-b border-ink/10"
                onClick={() => setMenu(false)}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      ) : null}

      <main id="top">
        <section ref={heroRef} className="flex min-h-svh flex-col bg-void text-canvas">
          <div className="mx-auto w-full max-w-3xl px-6 pt-28 text-center md:pt-32">
            <h1 className="display">Needlyn.</h1>
            <p className="lede mx-auto mt-4 max-w-xl text-canvas/80">
              A software development company for consultants. We scope the work with you, then build the mobile app, the robotics system or the AI.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              <a className="more on-dark inline-flex min-h-11 items-center" href="#work">
                See the services ›
              </a>
              <a className="more on-dark inline-flex min-h-11 items-center" href="#contact">
                Start a project ›
              </a>
            </div>
          </div>
          <div className="mt-8 w-full">
            <img
              src="/media/hero.jpg"
              alt="A workshop bench with a monitor, sketches, and an industrial robot arm"
              width={1792}
              height={1008}
              className="hero-photo"
            />
          </div>
          <p className="px-6 pb-8 text-center text-xs tracking-wide text-canvas/70">{specLine}</p>
        </section>

        <section id="work" className="scroll-mt-anchor bg-canvas px-3 pt-20 pb-3 md:pt-28">
          <div className="mx-auto max-w-3xl px-4 pb-12 text-center md:pb-16">
            <h2 className="title">Four services. One development company.</h2>
            <p className="lede mt-4 text-mute">
              Consultants hire Needlyn when a client needs more than advice. Software consulting, mobile app development, robotics and AI — delivered by the same team.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {capabilities.map((item) => (
              <Tile key={item.id} item={item} onOpen={() => setStoryId(item.id)} />
            ))}
          </div>
        </section>

        <section id="process" className="scroll-mt-anchor bg-paper px-6 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="title">How a consulting engagement runs.</h2>
            <p className="lede mt-4 text-mute">You always know where the work is, and what happens next.</p>
          </div>
          <ol className="mx-auto mt-14 grid max-w-6xl gap-10 md:grid-cols-4">
            {stages.map((step) => (
              <li key={step.n} className="border-t border-ink/15 pt-5">
                <p className="text-sm tabular-nums text-mute">{step.n}</p>
                <h3 className="mt-3 text-xl tracking-tight">{step.title}</h3>
                <p className="mt-2 text-mute">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-canvas px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <h2 className="title max-w-2xl">Built to sit beside a consulting practice.</h2>
            <ul className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
              {reasons.map((reason) => (
                <li key={reason.title} className="grid gap-2 py-7 md:grid-cols-5 md:gap-10">
                  <h3 className="text-xl tracking-tight md:col-span-2">{reason.title}</h3>
                  <p className="text-mute md:col-span-3">{reason.body}</p>
                </li>
              ))}
            </ul>
            <div className="mt-16 grid gap-3 md:grid-cols-3">
              {engagements.map((item) => (
                <article key={item.name} className="bg-paper p-7">
                  <p className="text-sm text-mute">{item.fit}</p>
                  <h3 className="mt-2 text-2xl tracking-tight">{item.name}</h3>
                  <p className="mt-3 text-mute">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Studio />

        <section id="faq" className="scroll-mt-anchor bg-canvas px-6 py-20 md:py-28">
          <div className="mx-auto max-w-3xl">
            <h2 className="title">Before you reach out.</h2>
            <div className="mt-8 border-t border-ink/10">
              {faqs.map((item) => (
                <Faq key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </main>

      <footer className="bg-paper">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-14 sm:grid-cols-2 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="wordmark">needlyn</p>
            <p className="mt-3 max-w-xs text-sm text-mute">
              Software consulting, mobile apps, robotics and AI.
            </p>
          </div>
          <div>
            <p className="text-xs text-mute">Explore</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a className="hover:underline" href="#work">Services</a></li>
              <li><a className="hover:underline" href="#process">Process</a></li>
              <li><a className="hover:underline" href="#studio">Studio</a></li>
              <li><a className="hover:underline" href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs text-mute">Contact</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a className="hover:underline" href="mailto:hello@needlyn.com">hello@needlyn.com</a></li>
              <li><a className="hover:underline" href="mailto:hello@needlyn.in">hello@needlyn.in</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-ink/10">
          <p className="mx-auto max-w-5xl px-6 py-4 text-xs text-mute">
            Copyright © {new Date().getFullYear()} Needlyn. All rights reserved.
          </p>
        </div>
      </footer>

      <Dialog.Root open={story !== null} onOpenChange={(open) => { if (!open) setStoryId(null); }}>
        <Dialog.Portal>
          <Dialog.Content className="story">
            {story ? <Story item={story} onPick={setStoryId} /> : <Dialog.Title className="skip">Capability</Dialog.Title>}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

function Tile({ item, onOpen }: { item: Capability; onOpen: () => void }) {
  const dark = item.tone === "dark";
  return (
    <button
      type="button"
      className={`tile ${dark ? "bg-void text-canvas" : "bg-paper text-ink"}`}
      onClick={onOpen}
    >
      <span className="px-6 pt-12">
        <span className="tile-title block">{item.title}</span>
        <span className={`mt-2 block text-lg ${dark ? "text-canvas/70" : "text-mute"}`}>{item.line}</span>
        <span className={`more mt-3 inline-flex min-h-11 items-center ${dark ? "on-dark" : ""}`}>
          Learn more ›
        </span>
      </span>
      <span className="tile-photo">
        <img src={item.image} alt="" width={1600} height={1200} />
      </span>
    </button>
  );
}

function Story({ item, onPick }: { item: Capability; onPick: (id: string) => void }) {
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [item.id]);

  return (
    <div ref={scroller} className="min-h-full">
      <div className="sticky top-0 z-10 flex h-nav items-center justify-between bg-canvas/80 px-5 backdrop-blur-xl">
        <Dialog.Close className="wordmark">needlyn</Dialog.Close>
        <Dialog.Close className="inline-flex min-h-11 items-center text-sm text-link">
          Close
        </Dialog.Close>
      </div>
      <article className="mx-auto max-w-3xl px-6 pt-10 pb-16">
        <Dialog.Title className="title">{item.title}</Dialog.Title>
        <Dialog.Description className="lede mt-4 text-mute">{item.summary}</Dialog.Description>
      </article>
      <div className={item.tone === "dark" ? "bg-void" : "bg-paper"}>
        <img
          src={item.image}
          alt={item.alt}
          width={1600}
          height={1200}
          className="story-photo"
        />
      </div>
      <div className="mx-auto grid max-w-3xl gap-10 px-6 py-14 md:grid-cols-5">
        <h2 className="text-xl tracking-tight md:col-span-2">What you get</h2>
        <ul className="divide-y divide-ink/10 border-y border-ink/10 md:col-span-3">
          {item.includes.map((line) => (
            <li key={line} className="py-4 text-mute">{line}</li>
          ))}
        </ul>
      </div>
      <p className="mx-auto max-w-3xl px-6 text-sm text-mute">{item.stack}</p>
      <div className="mx-auto max-w-3xl px-6 pt-8 pb-16">
        <Dialog.Close asChild>
          <a className="btn" href="#contact">Start a project ›</a>
        </Dialog.Close>
      </div>
      <nav className="sticky bottom-0 flex gap-2 overflow-x-auto border-t border-ink/10 bg-canvas/90 px-4 py-3 backdrop-blur-xl" aria-label="Services">
        {capabilities.map((cap) => (
          <button
            key={cap.id}
            type="button"
            aria-current={cap.id === item.id ? "true" : undefined}
            className={`flex min-h-11 shrink-0 items-center rounded-full px-4 text-sm ${cap.id === item.id ? "bg-ink text-canvas" : "text-ink"}`}
            onClick={() => onPick(cap.id)}
          >
            {cap.title.replace(".", "")}
          </button>
        ))}
      </nav>
    </div>
  );
}

function Studio() {
  const [brief, setBrief] = useState<Brief>(defaultBrief);
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setBrief(loadBrief());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(BRIEF_KEY, JSON.stringify(brief));
  }, [brief, ready]);

  const paragraph = useMemo(() => briefParagraph(brief), [brief]);

  function toggle(id: string) {
    setBrief((current) => {
      const has = current.picks.includes(id);
      const picks = has ? current.picks.filter((item) => item !== id) : [...current.picks, id];
      return { ...current, picks: picks.length ? picks : current.picks };
    });
    setCopied(false);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(paragraph);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const mail = `mailto:hello@needlyn.com?subject=${encodeURIComponent("New project inquiry")}&body=${encodeURIComponent(paragraph + "\n\n")}`;

  return (
    <section id="studio" className="scroll-mt-anchor bg-paper px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <div>
          <h2 className="title">Shape the engagement.</h2>
          <p className="lede mt-4 text-mute">
            Pick the service, where the client is, and the horizon. We reply within two working days — or say plainly if we are not the right fit.
          </p>
          <fieldset className="mt-10">
            <legend className="text-sm text-mute">What do you need?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {capabilities.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="chip"
                  aria-pressed={brief.picks.includes(item.id)}
                  onClick={() => toggle(item.id)}
                >
                  {item.title.replace(".", "")}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="mt-8">
            <legend className="text-sm text-mute">Where is the work?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {moments.map((moment) => (
                <button
                  key={moment}
                  type="button"
                  className="chip"
                  aria-pressed={brief.moment === moment}
                  onClick={() => setBrief((current) => ({ ...current, moment }))}
                >
                  {moment}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="mt-8">
            <legend className="text-sm text-mute">Horizon</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {horizons.map((horizon) => (
                <button
                  key={horizon}
                  type="button"
                  className="chip"
                  aria-pressed={brief.horizon === horizon}
                  onClick={() => setBrief((current) => ({ ...current, horizon }))}
                >
                  {horizon}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
        <aside className="self-start bg-canvas p-8 md:p-10 lg:sticky lg:top-24">
          <p className="text-sm text-mute">Your brief</p>
          <p className="mt-4 text-2xl leading-snug tracking-tight">{paragraph}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn" href={mail}>Email this brief</a>
            <button type="button" className="btn" data-tone="ink" onClick={copy}>
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="mt-4 text-sm text-mute">
            Email opens on your device. The choices stay in this browser only.
          </p>
        </aside>
      </div>
    </section>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  return (
    <div className="border-b border-ink/10">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-6 py-5 text-left text-lg tracking-tight"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {q}
        <Plus
          size={18}
          className={`shrink-0 text-mute transition-transform duration-200 ${open ? "rotate-45" : ""}`}
          aria-hidden
        />
      </button>
      <div id={panelId} hidden={!open}>
        <p className="max-w-2xl pb-5 text-mute">{a}</p>
      </div>
    </div>
  );
}

function Contact() {
  const [sent, setSent] = useState<string | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const type = String(data.get("type") ?? "");
    const message = String(data.get("message") ?? "").trim();
    const body = `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nProject type: ${type}\n\n${message}`;
    const href = `mailto:hello@needlyn.com?subject=${encodeURIComponent("New project inquiry: " + type)}&body=${encodeURIComponent(body)}`;
    setSent(body);
    window.location.href = href;
  }

  return (
    <section id="contact" className="scroll-mt-anchor bg-paper px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
        <div>
          <h2 className="title">Tell us about the client work.</h2>
          <p className="lede mt-4 text-mute">
            Share a few details. We reply within two working days with next steps — or a straight answer if we are not the right fit.
          </p>
          <div className="mt-8 space-y-2">
            <a className="more inline-flex min-h-11 items-center" href="mailto:hello@needlyn.com">hello@needlyn.com</a>
            <a className="more inline-flex min-h-11 items-center" href="mailto:hello@needlyn.in">hello@needlyn.in</a>
          </div>
        </div>
        {sent ? (
          <div className="bg-canvas p-7">
            <h3 className="text-2xl tracking-tight">Ready in your mail app.</h3>
            <p className="mt-3 text-mute">
              If it did not open, copy this and send it to hello@needlyn.com. Nothing is stored on this page.
            </p>
            <pre className="mt-5 whitespace-pre-wrap text-sm text-ink">{sent}</pre>
            <button type="button" className="btn mt-6" data-tone="ink" onClick={() => setSent(null)}>
              Edit details
            </button>
          </div>
        ) : (
          <form className="flex flex-col gap-3" onSubmit={onSubmit}>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="sr-only" htmlFor="cf-name">Name</label>
              <input id="cf-name" className="field" name="name" placeholder="Name" required autoComplete="name" />
              <label className="sr-only" htmlFor="cf-company">Company</label>
              <input id="cf-company" className="field" name="company" placeholder="Company" autoComplete="organization" />
            </div>
            <label className="sr-only" htmlFor="cf-email">Email</label>
            <input id="cf-email" className="field" name="email" type="email" placeholder="Email" required autoComplete="email" />
            <label className="sr-only" htmlFor="cf-type">What do you need?</label>
            <select id="cf-type" className="field" name="type" defaultValue={projectTypes[0]}>
              {projectTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            <label className="sr-only" htmlFor="cf-message">Message</label>
            <textarea id="cf-message" className="field" name="message" placeholder="What are you building?" required />
            <button className="btn mt-1 self-start" type="submit">Send & open email</button>
            <p className="text-sm text-mute">Opens your email client with the details filled in. Nothing is stored on this page.</p>
          </form>
        )}
      </div>
    </section>
  );
}
