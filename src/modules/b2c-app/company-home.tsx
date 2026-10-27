import { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled, { createGlobalStyle, css } from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  CreditCard,
  Laptop,
  Smartphone,
  ChefHat,
  Headset,
  Lock,
  Menu,
  Minus,
  Package,
  Plus,
  Receipt,
  Send,
  ShoppingCart,
  Sparkles,
  Store,
  Tablet,
  Users,
  Wallet,
  Wine,
  X,
} from "lucide-react";
import logo from "../../../assets/Logo.svg";

/** Paste the Google Play link here and the "Get it on Google Play" buttons appear everywhere. */
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.lellall.lellall_b2b_mobile";

/* ───────────────────────── brand ───────────────────────── */
const c = {
  ink: "#0B1F1C",
  forest: "#05431E",
  green: "#0E5D37",
  mint: "#DDF1E6",
  orange: "#F06D06",
  orangeSoft: "#FFE7D4",
  bg: "#F7FAF8",
  card: "#FFFFFF",
  muted: "#5E6F69",
  line: "#E5EDE8",
};
const sans = "'Poppins', 'Nunito', system-ui, sans-serif";
const text = "'Nunito', 'Poppins', system-ui, sans-serif";
const wrap = css`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
`;

const Global = createGlobalStyle`
  html { scroll-behavior: smooth; }
  .rv { opacity: 0; transform: translate3d(0, var(--y, 30px), 0) scale(.985); filter: blur(6px);
    transition: opacity .85s cubic-bezier(.2,.7,.2,1) var(--d, 0ms), transform .85s cubic-bezier(.2,.7,.2,1) var(--d, 0ms), filter .85s ease var(--d, 0ms); }
  .rv.in { opacity: 1; transform: none; filter: none; }
  @keyframes rise { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: none; } }
  @keyframes wordUp { from { transform: translateY(112%); } to { transform: none; } }
  @keyframes drift { from { transform: rotate(calc(var(--r) * 1deg)) scaleY(.62); } to { transform: rotate(calc(var(--r) * 1deg + 16deg)) scaleY(.62) translateX(14px); } }
  @keyframes breathe { from { scale: 1; } to { scale: 1.14; } }
  @keyframes bob { 0%, 100% { translate: 0 0; } 50% { translate: 0 -12px; } }
  @keyframes slideIn { from { opacity: 0; transform: translateY(-14px); background: #DDF1E6; } to { opacity: 1; transform: none; } }
  @keyframes pop { 0% { transform: scale(.9); } 60% { transform: scale(1.07); } 100% { transform: scale(1); } }
  @keyframes fill { from { width: 0; } to { width: 100%; } }
  @keyframes pulseRing { 0% { box-shadow: 0 0 0 0 rgba(240,109,6,.45); } 100% { box-shadow: 0 0 0 12px rgba(240,109,6,0); } }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    .rv { opacity: 1; transform: none; filter: none; transition: none; }
    *, *::before, *::after { animation: none !important; transition-duration: .01ms !important; }
  }
`;

/* ───────────────────────── motion helpers ───────────────────────── */
const reduced = () => typeof window !== "undefined" && !!window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useInView<T extends HTMLElement>(margin = "0px 0px -12% 0px") {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setSeen(true); setOn(true); return; }
    const io = new IntersectionObserver(([e]) => { setOn(e.isIntersecting); if (e.isIntersecting) setSeen(true); }, { rootMargin: margin, threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return { ref, seen, on };
}

/** Scroll-reveal: spread onto any element (`ref`, `className`, `style`). */
function useReveal(delay = 0, y = 30) {
  const { ref, seen } = useInView<any>();
  return { ref, cls: `rv${seen ? " in" : ""}`, style: { "--d": `${delay}ms`, "--y": `${y}px` } as React.CSSProperties };
}
function withReveal(C: any) {
  return ({ i = 0, ...p }: any) => {
    const r = useReveal(i * 90);
    return <C {...p} ref={r.ref} className={`${p.className ?? ""} ${r.cls}`} style={{ ...p.style, ...r.style }} />;
  };
}

const CountUp = ({ to, prefix = "", suffix = "", ms = 1500, start = true }: { to: number; prefix?: string; suffix?: string; ms?: number; start?: boolean }) => {
  const [v, setV] = useState(0);
  const from = useRef(0);
  useEffect(() => {
    if (!start) return;
    if (reduced()) { setV(to); from.current = to; return; }
    let raf = 0, t0 = 0;
    const base = from.current;
    const tick = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / ms);
      const next = Math.round(base + (to - base) * (1 - Math.pow(1 - p, 3)));
      from.current = next;
      setV(next);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, start, ms]);
  return <>{prefix}{v.toLocaleString("en-NG")}{suffix}</>;
};

/* ───────────────────────── primitives ───────────────────────── */
const Page = styled.div`
  font-family: ${text};
  color: ${c.ink};
  background: ${c.bg};
  overflow-x: hidden;
  a, button, input, textarea { font-family: inherit; }
  :focus-visible { outline: 3px solid ${c.orange}; outline-offset: 3px; }
`;
const shine = css`
  overflow: hidden;
  &::before { content: ""; position: absolute; top: 0; left: -70%; width: 40%; height: 100%; background: linear-gradient(100deg, transparent, rgba(255,255,255,.38), transparent); transform: skewX(-20deg); transition: left .7s ease; pointer-events: none; }
  &:hover::before { left: 140%; }
`;
const Btn = styled.button<{ $v?: "dark" | "line" | "orange" }>`
  position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 12px; cursor: pointer;
  height: 54px; padding: 0 28px; border-radius: 999px; font-weight: 800; font-size: 15.5px; letter-spacing: -0.005em; border: 1.5px solid transparent;
  transition: transform .18s, box-shadow .18s, background .18s; text-decoration: none; white-space: nowrap;
  &:has(.go) { padding-right: 8px; }
  .go { width: 38px; height: 38px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; background: ${c.orange}; color: #fff; transition: transform .2s; }
  &:hover { transform: translateY(-2px); } &:hover .go { transform: translateX(3px) rotate(-45deg); }
  &:active { transform: translateY(0); } &:disabled { opacity: .7; cursor: wait; }
  ${({ $v }) =>
    $v === "line"
      ? css`background: rgba(255,255,255,.75); color: ${c.ink}; border-color: #D3E1D9; backdrop-filter: blur(8px); &:hover { background: #fff; border-color: ${c.green}; box-shadow: 0 14px 28px -16px rgba(5,67,30,.5); }`
      : $v === "orange"
      ? css`${shine} background: linear-gradient(180deg, #FF8A2B, ${c.orange}); color: #fff; box-shadow: inset 0 1px 0 rgba(255,255,255,.35), 0 16px 30px -14px rgba(240,109,6,.85); &:hover { box-shadow: inset 0 1px 0 rgba(255,255,255,.35), 0 20px 36px -14px rgba(240,109,6,.95); }`
      : css`${shine} background: linear-gradient(180deg, #1B3A35, ${c.ink}); color: #fff; box-shadow: inset 0 1px 0 rgba(255,255,255,.16), 0 18px 32px -16px rgba(11,31,28,.9); &:hover { box-shadow: inset 0 1px 0 rgba(255,255,255,.16), 0 22px 38px -16px rgba(11,31,28,1); }`}
`;
const Go = () => (<span className="go"><ArrowRight size={18} /></span>);

const Pill = styled.span`
  display: inline-flex; align-items: center; gap: 8px; padding: 7px 14px; border-radius: 999px; font-size: 13.5px; font-weight: 700;
  background: rgba(255,255,255,.8); border: 1px solid ${c.line}; color: ${c.green};
  svg { color: ${c.orange}; }
`;
const H2 = styled.h2`
  font-family: ${sans}; font-weight: 600; letter-spacing: -0.025em; line-height: 1.08; margin: 0 0 14px;
  font-size: clamp(32px, 4.8vw, 54px); text-wrap: balance;
  em { font-style: normal; background: linear-gradient(90deg, ${c.green}, ${c.orange}); -webkit-background-clip: text; background-clip: text; color: transparent; }
`;
const Lead = styled.p`font-size: 18px; line-height: 1.7; color: ${c.muted}; margin: 0; max-width: 620px;`;
const Section = styled.section`position: relative; padding: 104px 0; @media (max-width: 700px) { padding: 70px 0; }`;
const Inner = styled.div`${wrap}`;
const HeadBox = styled.div`display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 56px; p { margin: 0 auto; }`;
const Head = withReveal(HeadBox);
const Glow = styled.span<{ $c: string; $s: number; $x: string; $y: string; $o?: number; $k?: number }>`
  position: absolute; pointer-events: none; z-index: 0; border-radius: 50%; filter: blur(70px);
  width: ${({ $s }) => $s}px; height: ${({ $s }) => $s}px; left: ${({ $x }) => $x}; top: ${({ $y }) => $y};
  background: ${({ $c }) => $c}; opacity: ${({ $o }) => $o ?? 0.5};
  translate: 0 calc(var(--sy, 0) * ${({ $k }) => $k ?? -0.08} * 1px); animation: breathe 9s ease-in-out infinite alternate;
`;
const Ring = styled.span<{ $c: string; $s: number; $x: string; $y: string; $r?: number; $k?: number }>`
  position: absolute; pointer-events: none; z-index: 0; border-radius: 50%; --r: ${({ $r }) => $r ?? 0};
  width: ${({ $s }) => $s}px; height: ${({ $s }) => $s}px; left: ${({ $x }) => $x}; top: ${({ $y }) => $y};
  border: ${({ $s }) => Math.round($s / 11)}px solid ${({ $c }) => $c}; opacity: .85;
  transform: rotate(calc(var(--r) * 1deg)) scaleY(.62); translate: 0 calc(var(--sy, 0) * ${({ $k }) => $k ?? -0.16} * 1px);
  animation: drift 12s ease-in-out infinite alternate;
`;

/* ───────────────────────── nav ───────────────────────── */
const Nav = styled.header`position: fixed; top: 0; left: 0; right: 0; z-index: 50;`;
const NavRow = styled.div`${wrap} display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; height: 88px; gap: 16px; @media (max-width: 960px) { grid-template-columns: 1fr auto; }`;
const Brand = styled.img`height: 38px; width: auto; cursor: pointer; justify-self: start;`;
const Links = styled.nav<{ $open: boolean }>`
  display: flex; align-items: center; gap: 4px; padding: 6px; border-radius: 999px; background: rgba(255,255,255,.82);
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border: 1px solid ${c.line}; box-shadow: 0 10px 30px -18px rgba(11,31,28,.35);
  a { color: ${c.muted}; text-decoration: none; font-weight: 700; font-size: 14.5px; padding: 9px 16px; border-radius: 999px; &:hover { color: ${c.ink}; background: ${c.bg}; } }
  a:first-child { color: ${c.ink}; background: ${c.bg}; }
  @media (max-width: 960px) {
    position: absolute; top: 80px; left: 16px; right: 16px; flex-direction: column; align-items: stretch; border-radius: 22px; padding: 10px; background: #fff;
    display: ${({ $open }) => ($open ? "flex" : "none")}; a { padding: 14px 16px; }
  }
`;
const NavRight = styled.div`display: flex; align-items: center; gap: 10px; justify-self: end; @media (max-width: 960px) { display: none; }`;
const Burger = styled.button`display: none; justify-self: end; background: #fff; border: 1px solid ${c.line}; border-radius: 14px; width: 46px; height: 46px; cursor: pointer; align-items: center; justify-content: center; @media (max-width: 960px) { display: inline-flex; }`;

/* ───────────────────────── hero ───────────────────────── */
const Hero = styled.section`position: relative; overflow: hidden; padding: 176px 0 90px; text-align: center; @media (max-width: 700px) { padding: 130px 0 60px; }`;
const HeroIn = styled.div`${wrap} position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center;
  > * { animation: rise .9s cubic-bezier(.2,.7,.2,1) both; }
  > *:nth-child(1) { animation-delay: .05s; } > *:nth-child(3) { animation-delay: .55s; } > *:nth-child(4) { animation-delay: .7s; } > *:nth-child(5) { animation-delay: .85s; }
  > h1 { animation: none; }
`;
const H1 = styled.h1`
  font-family: ${sans}; font-weight: 600; letter-spacing: -0.035em; line-height: 1.03; margin: 22px 0 22px; text-wrap: balance;
  font-size: clamp(42px, 7.2vw, 88px); max-width: 980px;
  .w { display: inline-block; overflow: hidden; vertical-align: bottom; padding: .1em .02em .14em; margin: -.1em 0 -.14em; }
  .w > span { display: inline-block; animation: wordUp .95s cubic-bezier(.2,.8,.2,1) both; animation-delay: calc(var(--i) * 85ms + 120ms); }
`;
const Rot = styled.span`
  display: inline-grid; vertical-align: bottom; overflow: hidden; padding: .1em .04em .16em; margin: -.1em 0 -.16em; animation: rise .9s .55s cubic-bezier(.2,.7,.2,1) both;
  > span { grid-area: 1 / 1; justify-self: center; white-space: nowrap; background: linear-gradient(90deg, ${c.green} 10%, ${c.orange} 90%); -webkit-background-clip: text; background-clip: text; color: transparent;
    transform: translateY(112%); opacity: 0; transition: transform .75s cubic-bezier(.2,.8,.2,1), opacity .5s ease; }
  > span.on { transform: none; opacity: 1; } > span.off { transform: translateY(-112%); opacity: 0; }
`;
const words = ["one screen.", "your phone.", "every branch.", "any device."];
const RotWord = () => {
  const [k, setK] = useState(0);
  useEffect(() => {
    if (reduced()) return;
    const id = setInterval(() => setK((x) => (x + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, []);
  return <Rot aria-hidden="true">{words.map((w, j) => <span key={w} className={j === k ? "on" : j === (k + words.length - 1) % words.length ? "off" : ""}>{w}</span>)}</Rot>;
};
const HeroLead = styled.p`font-size: clamp(17px, 2vw, 20px); line-height: 1.7; color: ${c.muted}; max-width: 640px; margin: 0 0 34px;`;
const Row = styled.div`display: flex; flex-wrap: wrap; gap: 14px; justify-content: center;`;
const Kinds = styled.ul`list-style: none; padding: 0; margin: 30px 0 0; display: flex; flex-wrap: wrap; gap: 8px 22px; justify-content: center; li { font-size: 14.5px; font-weight: 700; color: ${c.muted}; display: inline-flex; gap: 8px; align-items: center; } svg { color: ${c.green}; }`;

/* ───────────────────────── browser frame + screens ───────────────────────── */
const FrameBar = styled.div`
  display: flex; align-items: center; gap: 7px; padding: 12px 16px; border-bottom: 1px solid ${c.line}; background: #FBFDFC;
  i { width: 10px; height: 10px; border-radius: 50%; background: #E1EBE5; }
  span { margin-left: 12px; flex: 1; max-width: 300px; background: #fff; border: 1px solid ${c.line}; border-radius: 999px; padding: 4px 14px; font-size: 12px; color: ${c.muted}; }
`;
const Main = styled.div`padding: 20px; display: flex; flex-direction: column; gap: 14px; font-size: 13.5px;`;
const Top = styled.div`display: flex; justify-content: space-between; align-items: center; b { font-family: ${sans}; font-size: 15.5px; } small { color: ${c.muted}; }`;
const Tiles = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;`;
const Tile = styled.div<{ $hot?: boolean }>`
  background: ${({ $hot }) => ($hot ? c.forest : "#fff")}; color: ${({ $hot }) => ($hot ? "#fff" : c.ink)};
  border: 1px solid ${({ $hot }) => ($hot ? c.forest : c.line)}; border-radius: 14px; padding: 12px 14px;
  small { display: block; opacity: .7; font-size: 11.5px; margin-bottom: 4px; } b { font-family: ${sans}; font-size: 16px; }
`;
const Li = styled.div`display: flex; align-items: center; justify-content: space-between; gap: 10px; background: #fff; border: 1px solid ${c.line}; border-radius: 12px; padding: 10px 13px; span:first-child { font-weight: 700; } em { font-style: normal; color: ${c.muted}; font-size: 12.5px; }`;
const Chip = styled.span<{ $w?: boolean }>`font-size: 11.5px; font-weight: 800; padding: 3px 10px; border-radius: 999px; background: ${({ $w }) => ($w ? c.orangeSoft : c.mint)}; color: ${({ $w }) => ($w ? "#B24A00" : c.forest)};`;
const LiveDot = styled.i`display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${c.orange}; margin-right: 7px; animation: pulseRing 1.6s ease-out infinite;`;

/* ───────────────────────── bento ───────────────────────── */
const Bento = styled.div`
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px;
  @media (max-width: 960px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 600px) { grid-template-columns: 1fr; }
`;
const Cell = styled.article<{ $span?: number; $tone?: "orange" | "green" | "mint" }>`
  position: relative; overflow: hidden; background: ${({ $tone }) => ($tone === "orange" ? `linear-gradient(135deg, ${c.orange}, #FF9A4D)` : $tone === "green" ? `linear-gradient(135deg, ${c.forest}, ${c.green})` : $tone === "mint" ? c.mint : c.card)};
  color: ${({ $tone }) => ($tone === "orange" || $tone === "green" ? "#fff" : c.ink)};
  border: 1px solid ${({ $tone }) => ($tone === "orange" || $tone === "green" ? "transparent" : c.line)}; border-radius: 24px; padding: 28px; min-height: 230px; display: flex; flex-direction: column; gap: 10px;
  grid-column: span ${({ $span }) => $span ?? 1}; transition: translate .25s ease, box-shadow .25s ease;
  &:hover { translate: 0 -4px; box-shadow: 0 30px 50px -30px rgba(5,67,30,.4); }
  &::before { content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity .3s ease; background: radial-gradient(260px circle at var(--mx, 50%) var(--my, 0%), ${({ $tone }) => ($tone === "orange" || $tone === "green" ? "rgba(255,255,255,.28)" : "rgba(240,109,6,.15)")}, transparent 70%); }
  &:hover::before { opacity: 1; }
  h3 { font-family: ${sans}; font-weight: 600; font-size: 20px; margin: 10px 0 0; letter-spacing: -0.01em; }
  p { margin: 0; line-height: 1.65; font-size: 15.5px; opacity: .82; max-width: 380px; }
  @media (max-width: 960px) { grid-column: span ${({ $span }) => ($span && $span > 1 ? 2 : 1)}; }
  @media (max-width: 600px) { grid-column: span 1; }
`;
const BC = ({ i = 0, children, ...p }: { i?: number; children: React.ReactNode; $span?: number; $tone?: "orange" | "green" | "mint" }) => {
  const r = useReveal(i * 70);
  const spot = (e: React.PointerEvent<HTMLElement>) => {
    const b = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - b.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - b.top}px`);
  };
  return <Cell {...p} ref={r.ref} className={r.cls} style={r.style} onPointerMove={spot}>{children}</Cell>;
};
const Ico = styled.span<{ $inv?: boolean }>`width: 46px; height: 46px; border-radius: 14px; display: inline-flex; align-items: center; justify-content: center; background: ${({ $inv }) => ($inv ? "rgba(255,255,255,.2)" : c.mint)}; color: ${({ $inv }) => ($inv ? "#fff" : c.forest)};`;
const Mini = styled.div`margin-top: auto; padding-top: 12px; display: grid; gap: 8px;`;
const PayChips = styled.div`display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; padding-top: 12px; span { background: #fff; border: 1px solid ${c.line}; border-radius: 999px; padding: 7px 14px; font-weight: 800; font-size: 13px; }`;
const PlayBtn = styled.a`
  display: inline-flex; align-items: center; gap: 12px; height: 54px; padding: 0 22px 0 16px; border-radius: 14px; background: linear-gradient(180deg, #1c1c1c, #000); color: #fff; text-decoration: none;
  border: 1.5px solid #A6A6A6; box-shadow: 0 16px 30px -16px rgba(0,0,0,.7); transition: transform .18s, box-shadow .18s; text-align: left;
  svg { flex: none; }
  span { display: grid; line-height: 1.05; font-family: ${sans}; font-weight: 600; font-size: 20px; letter-spacing: -0.01em; }
  small { font-family: ${text}; font-weight: 700; font-size: 10px; letter-spacing: .1em; text-transform: uppercase; opacity: .85; margin-bottom: 3px; }
  &:hover { transform: translateY(-2px); box-shadow: 0 22px 36px -16px rgba(0,0,0,.85); }
`;
const PlayLogo = () => (
  <svg width="26" height="28" viewBox="0 0 28 30" aria-hidden="true">
    <path fill="#00A0FF" d="M1 1.2C.5 1.7.3 2.4.3 3.2v23.6c0 .8.2 1.5.7 2L14.6 15z" />
    <path fill="#00E076" d="M1 1.2 14.6 15l4.6-4.6L3.6 1.5C2.6.9 1.7.7 1 1.2z" />
    <path fill="#FFD400" d="M19.2 10.4 14.6 15l4.6 4.6 6.5-3.7c1.3-.7 1.3-1.9 0-2.6z" />
    <path fill="#FF3A44" d="M1 28.8c.7.5 1.6.3 2.6-.3l15.6-8.9L14.6 15z" />
  </svg>
);


/* ───────────────────────── phone tour (real app screen + callouts) ───────────────────────── */
const Tour = styled.div<{ $mid?: string; $hide?: boolean }>`
  ${wrap} position: relative; z-index: 1; display: grid; grid-template-columns: 1fr ${({ $mid }) => $mid ?? "310px"} 1fr; gap: 0; min-height: 640px;
  @media (max-width: 960px) { grid-template-columns: 1fr; justify-items: center; gap: 28px; min-height: 0; }
  ${({ $hide }) => $hide && css`
    .dash { grid-column: 2; min-width: 0; }
    && .t { max-width: 148px; } && .t b { font-size: 15px; } && .t span { font-size: 13.5px; }
    @media (max-width: 1100px) { grid-template-columns: 1fr; padding: 0; > div:not(.dash) { display: none; } .dash { grid-column: 1; width: 100%; } }
  `}
`;
const Side2 = styled.div<{ $right?: boolean }>`
  position: relative; z-index: 3;
  @media (max-width: 960px) { order: 2; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;
const Call = styled.div<{ $top: number; $right?: boolean; $i?: number }>`
  position: absolute; top: ${({ $top }) => $top}px; left: 0; right: 0; --i: ${({ $i }) => $i ?? 0};
  display: flex; align-items: center; flex-direction: ${({ $right }) => ($right ? "row-reverse" : "row")}; gap: 0;
  .t { max-width: 215px; text-align: ${({ $right }) => ($right ? "left" : "right")}; opacity: 0; transform: translateY(10px); transition: opacity .7s ease calc(.15s + var(--i) * .2s), transform .7s ease calc(.15s + var(--i) * .2s); }
  .t b { display: block; font-family: ${sans}; font-weight: 600; font-size: 16.5px; margin-bottom: 3px; }
  .t span { color: ${c.muted}; font-size: 14.5px; line-height: 1.55; display: block; }
  .l { flex: 1; height: 0; border-top: 2px dashed ${c.orange}; margin: 0 ${({ $right }) => ($right ? "0 0 -34px" : "-34px 0 0")}; min-width: 30px; position: relative; opacity: .9;
    clip-path: inset(-20px ${({ $right }) => ($right ? "-20px -20px 100%" : "100% -20px -20px")}); transition: clip-path 1s cubic-bezier(.6,0,.2,1) calc(.4s + var(--i) * .2s); }
  .l::after { content: ""; position: absolute; top: -7px; ${({ $right }) => ($right ? "left: -2px;" : "right: -2px;")} width: 12px; height: 12px; border-radius: 50%; background: ${c.orange}; box-shadow: 0 0 0 5px rgba(240,109,6,.22); animation: pulseRing 2.2s ease-out infinite; }
  .in & .t { opacity: 1; transform: none; }
  .in & .l { clip-path: inset(-20px); }
  @media (max-width: 960px) {
    position: static; display: block; background: #fff; border: 1px solid ${c.line}; border-radius: 20px; padding: 18px 20px;
    .t { max-width: none; text-align: left; } .l { display: none; }
  }
`;
const ViewTour = ({ children, ...p }: any) => {
  const { ref, seen } = useInView<HTMLDivElement>("0px 0px -15% 0px");
  return <Tour {...p} ref={ref} className={seen ? "in" : ""}>{children}</Tour>;
};
const PhoneWrap = styled.div`position: relative; z-index: 2; display: flex; justify-content: center; align-items: flex-start; @media (max-width: 960px) { order: 1; }`;
const Halo = styled.span`position: absolute; inset: 30px -60px; border-radius: 50%; background: radial-gradient(closest-side, rgba(240,109,6,.28), rgba(14,93,55,.16) 55%, transparent 75%); filter: blur(30px); z-index: 0; animation: breathe 6s ease-in-out infinite alternate;`;
const PhoneBody = styled.div`
  animation: bob 7s ease-in-out infinite; position: relative; z-index: 1; width: 300px; border-radius: 46px; background: ${c.ink}; padding: 10px; box-shadow: 0 60px 90px -40px rgba(5,67,30,.65), 0 0 0 2px #1f3a35 inset;
  &::before { content: ""; position: absolute; top: 18px; left: 50%; transform: translateX(-50%); width: 92px; height: 24px; border-radius: 99px; background: ${c.ink}; z-index: 3; }
`;
const PhoneScreen = styled.div`position: relative; height: 600px; border-radius: 37px; overflow: hidden; background: #F5F8F6; padding: 46px 16px 16px; display: flex; flex-direction: column; gap: 12px; text-align: left; font-size: 12.5px;`;
const PHead = styled.div`display: flex; justify-content: space-between; align-items: center; small { color: ${c.muted}; display: block; } b { font-family: ${sans}; font-size: 17px; }`;
const Avatar = styled.span`width: 36px; height: 36px; border-radius: 50%; background: ${c.forest}; color: #fff; font-weight: 800; display: inline-flex; align-items: center; justify-content: center;`;
const SaleCard = styled.div<{ $bg: string }>`background: ${({ $bg }) => $bg}; border-radius: 14px; padding: 12px 14px; small { color: ${c.muted}; font-weight: 700; display: block; margin-bottom: 4px; } b { font-family: ${sans}; font-size: 18px; } em { font-style: normal; font-weight: 800; font-size: 11px; color: ${c.green}; margin-left: 8px; }`;
const Warn = styled.div`animation: pulseRing 2.4s ease-out infinite; background: ${c.orangeSoft}; border: 1px solid #FFCFA6; color: #8A3B00; border-radius: 14px; padding: 11px 13px; display: flex; gap: 10px; align-items: center; font-weight: 700; line-height: 1.4; svg { flex: none; }`;
const QGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 10px;`;
const Q = styled.div<{ $bg: string }>`background: ${({ $bg }) => $bg}; color: #fff; border-radius: 14px; padding: 13px; font-weight: 800; display: flex; flex-direction: column; gap: 14px; font-size: 12.5px;`;
const PRow = styled.div`display: flex; justify-content: space-between; align-items: center; background: #fff; border: 1px solid ${c.line}; border-radius: 12px; padding: 10px 12px; b { display: block; font-size: 12.5px; } small { color: ${c.muted}; }`;
const Sec = styled.h5`margin: 2px 0 -2px; font-family: ${sans}; font-weight: 600; font-size: 13.5px; color: ${c.forest};`;

const Notif = styled.div<{ $show: boolean }>`
  position: absolute; top: 44px; left: 12px; right: 12px; z-index: 4; display: flex; gap: 10px; align-items: center; padding: 11px 13px; border-radius: 16px;
  background: rgba(11,31,28,.95); color: #fff; font-size: 12px; box-shadow: 0 18px 30px -12px rgba(0,0,0,.55);
  transform: translateY(${({ $show }) => ($show ? "0" : "-150%")}); opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: transform .6s cubic-bezier(.2,.9,.3,1.25), opacity .3s ease;
  i { flex: none; width: 30px; height: 30px; border-radius: 10px; background: ${c.orange}; display: inline-flex; align-items: center; justify-content: center; }
  b { display: block; font-family: ${sans}; font-size: 12.5px; } small { opacity: .75; }
`;
const notes = [["Table 7", "₦18,400"], ["Takeaway", "₦9,500"], ["Table 2", "₦31,200"]];
const PhoneApp = () => {
  const { ref, seen, on } = useInView<HTMLDivElement>("0px");
  const [show, setShow] = useState(false);
  const [k, setK] = useState(0);
  useEffect(() => {
    if (!on || reduced()) return;
    let hide: ReturnType<typeof setTimeout>;
    const fire = () => { setK((x) => x + 1); setShow(true); hide = setTimeout(() => setShow(false), 2800); };
    const first = setTimeout(fire, 1800);
    const id = setInterval(fire, 6200);
    return () => { clearTimeout(first); clearInterval(id); clearTimeout(hide); };
  }, [on]);
  const n = notes[k % notes.length];
  return (
    <PhoneBody ref={ref}>
      <PhoneScreen>
        <Notif $show={show} aria-hidden="true"><i><ShoppingCart size={15} /></i><div><b>New order · {n[0]}</b><small>{n[1]} · just now</small></div></Notif>
        <PHead><div><small>Good morning</small><b>Dashboard</b></div><Avatar>L</Avatar></PHead>
        <SaleCard $bg="#E0F7F2"><small>Weekly sales</small><b><CountUp to={7420000} prefix="₦" start={seen} ms={1900} /></b><em>+12%</em></SaleCard>
        <SaleCard $bg="#FFF0E3"><small>Monthly sales</small><b><CountUp to={29860000} prefix="₦" start={seen} ms={2200} /></b></SaleCard>
        <Warn><Package size={18} />2 items are running low on stock</Warn>
        <Sec>Quick links</Sec>
        <QGrid>
          <Q $bg={c.forest}><ShoppingCart size={18} />Orders</Q>
          <Q $bg={c.orange}><Receipt size={18} />Menu</Q>
          <Q $bg={c.green}><Package size={18} />Inventory</Q>
          <Q $bg={c.ink}><BarChart3 size={18} />Reports</Q>
        </QGrid>
        <PRow><div><b>Table 4</b><small>3 items · ₦26,338</small></div><Chip>Paid</Chip></PRow>
      </PhoneScreen>
    </PhoneBody>
  );
};

/* ───────────────────────── devices ───────────────────────── */
type DevId = "phone" | "pos" | "tablet" | "laptop";
type Line = [string, number, number];
type Order = { place: string; items: Line[] };
const ORDERS: Record<DevId, Order> = {
  phone: { place: "Table 4", items: [["Grilled chicken", 2, 6500], ["Jollof rice", 3, 3000], ["Zobo (jug)", 1, 2500]] },
  pos: { place: "Takeaway", items: [["Suya platter", 1, 9000], ["Chapman", 2, 3500], ["Water", 1, 800]] },
  tablet: { place: "Table 9", items: [["Pepperoni pizza", 1, 9500], ["Fries", 2, 2500], ["Chapman", 1, 3500]] },
  laptop: { place: "Table 12", items: [["Jollof rice", 4, 3000], ["Grilled chicken", 2, 6500], ["Zobo (jug)", 2, 2500]] },
};
const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

type Scn = { shown: number; phase: 1 | 2 | 3; sub: number; vat: number; total: number };
/** One order, taken line by line, charged, paid: replays every time the device becomes active. */
function useScenario(active: boolean, o: Order): Scn {
  const n = o.items.length;
  const [st, setSt] = useState<{ shown: number; phase: 1 | 2 | 3 }>({ shown: n, phase: 3 });
  useEffect(() => {
    const done = { shown: n, phase: 3 as const };
    if (!active || reduced()) { setSt((p) => (p.phase === 3 && p.shown === n ? p : done)); return; }
    setSt({ shown: 0, phase: 1 });
    const t: ReturnType<typeof setTimeout>[] = [];
    o.items.forEach((_, k) => t.push(setTimeout(() => setSt({ shown: k + 1, phase: 1 }), 800 + k * 850)));
    const end = 800 + n * 850;
    t.push(setTimeout(() => setSt((p) => ({ ...p, phase: 2 })), end + 450));
    t.push(setTimeout(() => setSt((p) => ({ ...p, phase: 3 })), end + 1350));
    return () => t.forEach(clearTimeout);
  }, [active, n, o]);
  const sub = o.items.slice(0, st.shown).reduce((a, [, q, pr]) => a + q * pr, 0);
  const vat = Math.round(sub * 0.075);
  return { ...st, sub, vat, total: sub + vat };
}
const payLabel = (s: Scn) => (s.phase === 3 ? "Paid ✓" : s.phase === 2 ? "Processing…" : `Charge ${naira(s.total)}`);

const Rows = styled.div`display: grid; gap: 6px; align-content: start;`;
const Ln = styled.div<{ $sm?: boolean }>`
  display: flex; justify-content: space-between; align-items: center; gap: 8px; background: #fff; border: 1px solid ${c.line}; border-radius: 10px;
  padding: ${({ $sm }) => ($sm ? "6px 9px" : "8px 11px")}; font-size: ${({ $sm }) => ($sm ? 10.5 : 12)}px; animation: slideIn .55s cubic-bezier(.2,.8,.2,1);
  b { font-weight: 700; } em { font-style: normal; color: ${c.muted}; white-space: nowrap; }
`;
const Hint = styled.div`color: ${c.muted}; font-size: 11.5px; padding: 8px 2px;`;
const HdRow = styled.div`display: flex; justify-content: space-between; align-items: baseline; b { font-family: ${sans}; font-size: 14px; } small { color: ${c.muted}; font-weight: 700; }`;
const TotBox = styled.div<{ $sm?: boolean }>`
  display: grid; gap: 3px; font-size: ${({ $sm }) => ($sm ? 10 : 11.5)}px; color: ${c.muted}; > div { display: flex; justify-content: space-between; }
  .t { color: ${c.ink}; font-family: ${sans}; font-weight: 600; font-size: ${({ $sm }) => ($sm ? 14 : 17)}px; margin-top: 3px; }
`;
const Totals = ({ s, sm, only }: { s: Scn; sm?: boolean; only?: boolean }) => (
  <TotBox $sm={sm}>
    {!only && <><div><span>Subtotal</span><span>{naira(s.sub)}</span></div><div><span>VAT 7.5%</span><span>{naira(s.vat)}</span></div></>}
    <div className="t"><span>Total</span><span><CountUp to={s.total} prefix="₦" ms={500} /></span></div>
  </TotBox>
);
const PayBtn = styled.div<{ $p: number; $sm?: boolean }>`
  text-align: center; font-weight: 800; border-radius: 12px; color: #fff; padding: ${({ $sm }) => ($sm ? "8px" : "11px")}; font-size: ${({ $sm }) => ($sm ? 11 : 13)}px;
  background: ${({ $p }) => ($p === 3 ? c.green : $p === 2 ? c.orange : c.ink)}; transform: scale(${({ $p }) => ($p === 2 ? 0.96 : 1)}); transition: background .3s, transform .2s;
  ${({ $p }) => ($p === 3 ? css`animation: pop .5s ease;` : "")}
`;
const ItemRows = ({ o, s, sm }: { o: Order; s: Scn; sm?: boolean }) => (
  <Rows>
    {o.items.slice(0, s.shown).map(([nm, q, pr]) => <Ln key={nm} $sm={sm}><b>{nm}</b><em>{q} × {naira(pr)}</em></Ln>)}
    {s.shown === 0 && <Hint>Adding items…</Hint>}
  </Rows>
);
const Spacer = styled.div`flex: 1;`;

/* phone */
const PFrame = styled.div`position: relative; width: 236px; border-radius: 40px; background: ${c.ink}; padding: 8px; box-shadow: 0 50px 70px -36px rgba(5,67,30,.6);
  &::before { content: ""; position: absolute; top: 15px; left: 50%; transform: translateX(-50%); width: 74px; height: 20px; border-radius: 99px; background: ${c.ink}; z-index: 3; }`;
const PScr = styled.div`height: 480px; border-radius: 32px; background: #F5F8F6; padding: 40px 14px 14px; display: flex; flex-direction: column; gap: 8px; font-size: 11.5px; overflow: hidden;`;
const DevPhone = ({ active }: { active: boolean }) => {
  const o = ORDERS.phone; const s = useScenario(active, o);
  return (
    <PFrame><PScr>
      <HdRow><b>New order</b><small>{o.place}</small></HdRow>
      <ItemRows o={o} s={s} /><Spacer /><Totals s={s} /><PayBtn $p={s.phase}>{payLabel(s)}</PayBtn>
    </PScr></PFrame>
  );
};

/* handheld POS with receipt printer */
const PosWrap = styled.div`position: relative; width: 200px; height: 560px;`;
const Paper = styled.div<{ $out: boolean }>`
  position: absolute; left: 26px; width: 148px; top: 196px; height: 200px; z-index: 0; background: #fff; border-radius: 5px 5px 0 0; padding: 12px 10px; font: 8.5px/1.55 'Courier New', monospace; color: #222; text-align: center;
  box-shadow: 0 8px 16px -8px rgba(0,0,0,.35); transform: translateY(${({ $out }) => ($out ? -160 : 0)}px); transition: transform 1.2s cubic-bezier(.3,.9,.3,1);
  .r { display: flex; justify-content: space-between; text-align: left; } hr { border: 0; border-top: 1px dashed #aaa; margin: 4px 0; }
`;
const PosBody = styled.div`position: absolute; z-index: 1; top: 150px; left: 0; width: 200px; height: 410px; border-radius: 28px; padding: 16px 14px 14px; background: linear-gradient(160deg, #22332F, ${c.ink});
  box-shadow: 0 40px 60px -30px rgba(5,67,30,.7), inset 0 1px 0 rgba(255,255,255,.12); display: flex; flex-direction: column; gap: 12px;
  &::before { content: ""; position: absolute; top: 0; left: 24px; right: 24px; height: 5px; border-radius: 0 0 6px 6px; background: ${c.orange}; }`;
const PosScr = styled.div`background: #F5F8F6; border-radius: 12px; height: 196px; padding: 9px; display: flex; flex-direction: column; gap: 6px; font-size: 10px; overflow: hidden;`;
const Keys = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px; flex: 1; i { border-radius: 9px; background: #31423E; box-shadow: inset 0 -3px 0 rgba(0,0,0,.35); } i.g { background: ${c.green}; } i.r { background: #B6422F; } i.o { background: ${c.orange}; }`;
const DevPos = ({ active }: { active: boolean }) => {
  const o = ORDERS.pos; const s = useScenario(active, o);
  return (
    <PosWrap>
      <Paper $out={s.phase === 3}>
        <b>LELLALL</b><br />{o.place}<hr />
        {o.items.map(([nm, q, pr]) => <div className="r" key={nm}><span>{q}x {nm.split(" ")[0]}</span><span>{(q * pr).toLocaleString("en-NG")}</span></div>)}
        <hr /><div className="r"><b>TOTAL</b><b>{naira(o.items.reduce((a, [, q, pr]) => a + q * pr, 0) + Math.round(o.items.reduce((a, [, q, pr]) => a + q * pr, 0) * 0.075))}</b></div>Thank you!
      </Paper>
      <PosBody>
        <PosScr><HdRow><b>New order</b><small>{o.place}</small></HdRow><ItemRows o={o} s={s} sm /><Spacer /><Totals s={s} sm only /><PayBtn $p={s.phase} $sm>{payLabel(s)}</PayBtn></PosScr>
        <Keys aria-hidden="true">{["", "", "", "", "", "", "", "", ""].map((_, k) => <i key={k} />)}<i className="r" /><i /><i className={s.phase === 2 ? "o" : "g"} /></Keys>
      </PosBody>
    </PosWrap>
  );
};

/* tablet */
const TFrame = styled.div`width: 400px; height: 270px; border-radius: 28px; background: ${c.ink}; padding: 10px; box-shadow: 0 50px 70px -36px rgba(5,67,30,.6);`;
const TScr = styled.div`height: 100%; border-radius: 19px; background: #F5F8F6; display: grid; grid-template-columns: 1.15fr 1fr; gap: 10px; padding: 10px; overflow: hidden; font-size: 10.5px;`;
const MenuGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; grid-auto-rows: 1fr; gap: 6px;`;
const MTile = styled.div<{ $on: boolean }>`border-radius: 10px; padding: 7px 8px; border: 1px solid ${({ $on }) => ($on ? c.green : c.line)}; background: ${({ $on }) => ($on ? c.mint : "#fff")}; transition: background .3s, border-color .3s; display: flex; flex-direction: column; justify-content: space-between; font-weight: 700;
  small { color: ${c.muted}; font-weight: 700; }`;
const TSide = styled.div`display: flex; flex-direction: column; gap: 6px; min-height: 0;`;
const DevTablet = ({ active }: { active: boolean }) => {
  const o = ORDERS.tablet; const s = useScenario(active, o);
  const menu: Line[] = [...o.items, ["Water", 1, 800], ["Suya", 1, 4000], ["Zobo", 1, 2500]];
  return (
    <TFrame><TScr>
      <MenuGrid>{menu.map(([nm, , pr], k) => <MTile key={nm} $on={k < s.shown}>{nm}<small>{naira(pr)}</small></MTile>)}</MenuGrid>
      <TSide><HdRow><b>{o.place}</b><small>Order</small></HdRow><ItemRows o={o} s={s} sm /><Spacer /><Totals s={s} sm /><PayBtn $p={s.phase} $sm>{payLabel(s)}</PayBtn></TSide>
    </TScr></TFrame>
  );
};

/* laptop */
const LLid = styled.div`width: 580px; height: 372px; margin: 0 auto; background: ${c.ink}; border-radius: 18px 18px 0 0; padding: 10px 10px 0; box-shadow: 0 50px 70px -40px rgba(5,67,30,.6);`;
const LScr = styled.div`height: 100%; background: #fff; border-radius: 10px 10px 0 0; overflow: hidden;`;
const LBody = styled.div`display: grid; grid-template-columns: 124px 1fr;`;
const LSide = styled.aside`background: #FBFDFC; border-right: 1px solid ${c.line}; padding: 12px 10px; display: grid; gap: 4px; align-content: start; font-size: 12px; font-weight: 700; color: ${c.muted}; height: 100%;
  div { padding: 8px 10px; border-radius: 9px; } div.on { background: ${c.forest}; color: #fff; }`;
const LBase = styled.div`width: 640px; height: 14px; border-radius: 0 0 18px 18px; background: linear-gradient(#DCE4E0, #B2BDB8); position: relative; &::after { content: ""; position: absolute; left: 50%; top: 0; transform: translateX(-50%); width: 96px; height: 5px; border-radius: 0 0 8px 8px; background: #98A59F; }`;
const DevLaptop = ({ active }: { active: boolean }) => {
  const o = ORDERS.laptop; const s = useScenario(active, o);
  const final = o.items.reduce((a, [, q, pr]) => a + q * pr, 0);
  const sales = 1284500 + (s.phase === 3 ? final + Math.round(final * 0.075) : 0);
  return (
    <div style={{ width: 640 }}>
      <LLid><LScr>
        <FrameBar><i /><i /><i /><span>yourbusiness.lellall.net</span></FrameBar>
        <LBody>
          <LSide><div className="on">Dashboard</div><div>Orders</div><div>Menu</div><div>Inventory</div><div>Staff</div><div>Reports</div></LSide>
          <Main>
            <Top><b>Orders</b><small><LiveDot />Live today</small></Top>
            <Tiles>
              <Tile $hot><small>Sales</small><b><CountUp to={sales} prefix="₦" ms={900} /></b></Tile>
              <Tile><small>Orders</small><b><CountUp to={86 + (s.phase >= 2 || s.shown > 0 ? 1 : 0)} ms={500} /></b></Tile>
              <Tile><small>Top item</small><b>Jollof rice</b></Tile>
            </Tiles>
            <Li key={s.shown === 0 ? "none" : "cur"} style={{ animation: "slideIn .6s cubic-bezier(.2,.8,.2,1)" }}>
              <span>{o.place}</span><em>{s.shown} {s.shown === 1 ? "item" : "items"} · {naira(s.total)}</em><Chip $w={s.phase !== 3}>{s.phase === 3 ? "Paid" : s.phase === 2 ? "Paying" : "Open"}</Chip>
            </Li>
            <Li><span>Table 4</span><em>3 items · ₦26,338</em><Chip>Paid</Chip></Li>
            <Li><span>Takeaway</span><em>2 items · ₦9,500</em><Chip>Paid</Chip></Li>
          </Main>
        </LBody>
      </LScr></LLid>
      <LBase />
    </div>
  );
};

const DEVS: { id: DevId; label: string; Icon: typeof Smartphone; w: number; h: number; zoom: number; blurb: string }[] = [
  { id: "phone", label: "Phone", Icon: Smartphone, w: 236, h: 496, zoom: 1.15, blurb: "Waiters take orders at the table on their own phone." },
  { id: "pos", label: "POS device", Icon: CreditCard, w: 200, h: 560, zoom: 1.05, blurb: "Charge at the counter and print the receipt on the spot." },
  { id: "tablet", label: "Tablet", Icon: Tablet, w: 400, h: 270, zoom: 1.35, blurb: "A bigger screen for the till, the bar or the host stand." },
  { id: "laptop", label: "Laptop", Icon: Laptop, w: 640, h: 400, zoom: 1.2, blurb: "The owner's view: every order and every naira as it comes in." },
];
const renderDev = (id: DevId, active: boolean) => (id === "phone" ? <DevPhone active={active} /> : id === "pos" ? <DevPos active={active} /> : id === "tablet" ? <DevTablet active={active} /> : <DevLaptop active={active} />);

const DevTabs = styled.div`display: flex; justify-content: center; gap: 6px; padding: 6px; border-radius: 999px; background: #fff; border: 1px solid ${c.line}; box-shadow: 0 10px 30px -18px rgba(11,31,28,.35); width: fit-content; max-width: 100%; margin: 0 auto 36px; overflow-x: auto;`;
const DevTab = styled.button<{ $on: boolean }>`position: relative; overflow: hidden; display: inline-flex; align-items: center; gap: 8px; border: 0; cursor: pointer; padding: 11px 18px; border-radius: 999px; font-weight: 800; font-size: 14.5px; white-space: nowrap;
  background: ${({ $on }) => ($on ? c.ink : "transparent")}; color: ${({ $on }) => ($on ? "#fff" : c.muted)}; transition: background .25s, color .25s;
  svg { color: ${({ $on }) => ($on ? c.orange : "inherit")}; } &:hover { color: ${({ $on }) => ($on ? "#fff" : c.ink)}; }
  i { position: absolute; left: 0; bottom: 0; height: 3px; background: ${c.orange}; animation: fill 7.6s linear forwards; }
  @media (max-width: 560px) { padding: 10px 12px; font-size: 13px; gap: 6px; }`;
const StageBox = styled.div`position: relative; width: 100%;`;
const DevSlot = styled.div`
  position: absolute; isolation: isolate; animation: rise .7s cubic-bezier(.2,.8,.2,1) both;
  &::before { content: ""; position: absolute; z-index: -1; inset: 4% -14% -6%; background: radial-gradient(closest-side, rgba(240,109,6,.30), rgba(14,93,55,.12) 60%, transparent 75%); filter: blur(30px); }
`;
const DevCap = styled.p`text-align: center; margin: 30px auto 0; max-width: 560px; color: ${c.muted}; line-height: 1.65; font-size: 17px; strong { display: block; color: ${c.ink}; font-family: ${sans}; font-size: 20px; font-weight: 600; margin-bottom: 4px; }`;

const Devices = () => {
  const [idx, setIdx] = useState(0);
  const { ref, on } = useInView<HTMLDivElement>("0px");
  const box = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(1100);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    setW(el.clientWidth);
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  useEffect(() => {
    if (!on || reduced()) return;
    const t = setTimeout(() => setIdx((i) => (i + 1) % DEVS.length), 7600);
    return () => clearTimeout(t);
  }, [on, idx]);

  const cur = DEVS[idx];
  const fit = Math.min(cur.zoom, w / cur.w);
  return (
    <div ref={ref}>
      <DevTabs role="tablist" aria-label="Choose a device">
        {DEVS.map((d, k) => (
          <DevTab key={d.id} role="tab" aria-selected={k === idx} $on={k === idx} onClick={() => setIdx(k)}>
            <d.Icon size={17} />{d.label}{k === idx && on && !reduced() && <i key={idx} />}
          </DevTab>
        ))}
      </DevTabs>
      <StageBox ref={box} style={{ height: cur.h * fit }}>
        <div style={{ position: "absolute", left: (w - cur.w * fit) / 2, top: 0, width: cur.w, height: cur.h, transform: `scale(${fit})`, transformOrigin: "top left" }}>
          <DevSlot key={cur.id} style={{ left: 0, top: 0, width: cur.w, height: cur.h }}>{renderDev(cur.id, on)}</DevSlot>
        </div>
      </StageBox>
      <DevCap key={cur.id} style={{ marginTop: 34 }}><strong>{cur.label}</strong>{cur.blurb}<br /><small style={{ opacity: 0.6 }}>Sample data</small></DevCap>
    </div>
  );
};

/* ───────────────────────── clients ───────────────────────── */
const CLIENTS = [
  { n: "The Burger Hub", k: "Restaurant", s: "Feb 2026" },
  { n: "355 Restaurant", k: "Restaurant", s: "Jun 2025" },
  { n: "355 Labone", k: "Restaurant", s: "Feb 2026" },
  { n: "No5ive Restaurant", k: "Restaurant", s: "May 2025" },
  { n: "Samsaj Urdi", k: "Lounge", s: "Aug 2026" },
  { n: "Gossip", k: "Restaurant", s: "Jun 2026" },
  { n: "Ramaya Beauty Studio", k: "Beauty studio", s: "Sep 2026" },
];
const initials = (n: string) => n.replace(/^The\s+/i, "").split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
const ClientGrid = styled.div`${wrap} display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; @media (max-width: 960px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 520px) { grid-template-columns: 1fr; }`;
const ClientCard = styled.article<{ $o: boolean }>`
  background: ${c.card}; border: 1px solid ${c.line}; border-radius: 22px; padding: 24px; display: flex; flex-direction: column; gap: 14px; transition: translate .25s ease, box-shadow .25s ease;
  &:hover { translate: 0 -4px; box-shadow: 0 30px 50px -32px rgba(5,67,30,.45); }
  .m { width: 54px; height: 54px; border-radius: 17px; display: inline-flex; align-items: center; justify-content: center; color: #fff; font-family: ${sans}; font-weight: 600; font-size: 19px;
    background: ${({ $o }) => ($o ? `linear-gradient(135deg, ${c.orange}, #FF9A4D)` : `linear-gradient(135deg, ${c.forest}, ${c.green})`)}; }
  h3 { font-family: ${sans}; font-weight: 600; font-size: 18px; margin: 0; letter-spacing: -0.01em; }
  p { margin: 0; color: ${c.muted}; font-size: 14px; display: flex; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
`;
const RClient = withReveal(ClientCard);
const BigStat = styled.div`${wrap} display: flex; justify-content: center; margin-top: 44px;
  > div { display: flex; align-items: center; gap: 22px; flex-wrap: wrap; justify-content: center; background: linear-gradient(135deg, ${c.mint}, #FFF1E5); border-radius: 26px; padding: 26px 40px; }
  b { font-family: ${sans}; font-weight: 600; font-size: clamp(38px, 6vw, 60px); letter-spacing: -0.03em; line-height: 1; } span { color: ${c.muted}; font-weight: 700; max-width: 220px; line-height: 1.4; }`;
const Clients = () => {
  const { ref, seen } = useInView<HTMLDivElement>("0px 0px -10% 0px");
  return (
    <>
      <ClientGrid>{CLIENTS.map((cl, i) => (
        <RClient key={cl.n} i={i % 4} $o={i % 3 === 1}>
          <span className="m" aria-hidden="true">{initials(cl.n)}</span>
          <h3>{cl.n}</h3>
          <p><span>{cl.k}</span><span>Since {cl.s}</span></p>
        </RClient>
      ))}</ClientGrid>
      <BigStat ref={ref}><div><b><CountUp to={25000} suffix="+" start={seen} ms={2200} /></b><span>orders processed on Lellall, and counting</span></div></BigStat>
    </>
  );
};

/* ───────────────────────── audience, steps ───────────────────────── */
const Three = styled.div`${wrap} display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; @media (max-width: 900px) { grid-template-columns: 1fr; }`;
const Aud = styled.article`
  background: ${c.card}; border: 1px solid ${c.line}; border-radius: 26px; padding: 32px; position: relative; overflow: hidden;
  &::after { content: ""; position: absolute; right: -60px; top: -60px; width: 190px; height: 190px; border-radius: 50%; background: radial-gradient(circle, rgba(240,109,6,.22), transparent 70%); }
  h3 { font-family: ${sans}; font-weight: 600; font-size: 22px; margin: 18px 0 8px; } p { color: ${c.muted}; line-height: 1.65; margin: 0 0 18px; }
  ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 9px; } li { display: flex; gap: 10px; font-size: 15px; font-weight: 600; } li svg { color: ${c.green}; flex: none; margin-top: 3px; }
`;
const RAud = withReveal(Aud);
const Steps = styled.ol`${wrap} list-style: none; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; counter-reset: s; @media (max-width: 900px) { grid-template-columns: 1fr; }`;
const Step = styled.li`
  position: relative; background: ${c.card}; border: 1px solid ${c.line}; border-radius: 24px; padding: 62px 28px 30px;
  &::before { counter-increment: s; content: counter(s); position: absolute; top: 22px; left: 28px; width: 46px; height: 46px; border-radius: 15px; background: ${c.ink}; color: #fff; font-family: ${sans}; font-weight: 600; font-size: 19px; display: flex; align-items: center; justify-content: center; }
  h3 { font-family: ${sans}; font-weight: 600; font-size: 20px; margin: 0 0 8px; } p { margin: 0; color: ${c.muted}; line-height: 1.65; }
`;

/* ───────────────────────── pricing-style, faq, contact ───────────────────────── */
const Duo = styled.div`${wrap} display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 28px; align-items: start; @media (max-width: 900px) { grid-template-columns: 1fr; }`;
const Talk = styled.div`background: ${c.card}; border: 1px solid ${c.line}; border-radius: 26px; padding: 28px; margin-top: 28px; h3 { font-family: ${sans}; font-weight: 600; font-size: 24px; margin: 0 0 16px; line-height: 1.2; } `;
const Big = styled.div`background: ${c.card}; border: 1px solid ${c.line}; border-radius: 28px; padding: 32px; box-shadow: 0 40px 70px -50px rgba(5,67,30,.5); h3 { font-family: ${sans}; font-weight: 600; font-size: 24px; margin: 0 0 6px; } > p { margin: 0 0 22px; color: ${c.muted}; line-height: 1.65; }`;
const Checks = styled.ul`list-style: none; margin: 0 0 24px; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 14px 22px; @media (max-width: 560px) { grid-template-columns: 1fr; } li { display: flex; gap: 10px; align-items: flex-start; font-weight: 700; font-size: 15px; } li span { flex: none; width: 24px; height: 24px; border-radius: 50%; background: ${c.mint}; color: ${c.forest}; display: inline-flex; align-items: center; justify-content: center; }`;
const Quote = styled.div`display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; background: linear-gradient(135deg, ${c.mint}, #FFF1E5); border-radius: 20px; padding: 22px 26px; b { font-family: ${sans}; font-size: 22px; font-weight: 600; display: block; } small { color: ${c.muted}; font-size: 14px; }`;
const RStep = withReveal(Step);
const RBig = withReveal(Big);
const RTalk = withReveal(Talk);
const Faq = styled.div`display: grid; gap: 12px;`;
const FaqItem = styled.div<{ $on: boolean }>`background: ${c.card}; border: 1px solid ${({ $on }) => ($on ? c.green : c.line)}; border-radius: 18px; overflow: hidden; transition: border-color .2s;
  button { width: 100%; background: none; border: 0; cursor: pointer; text-align: left; display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 20px 22px; font-weight: 800; font-size: 16px; color: ${c.ink}; }
  .body { display: grid; grid-template-rows: ${({ $on }) => ($on ? "1fr" : "0fr")}; transition: grid-template-rows .4s cubic-bezier(.2,.8,.2,1); }
  .body > div { overflow: hidden; }
  p { margin: 0; padding: 0 22px 22px; color: ${c.muted}; line-height: 1.7; font-size: 15.5px; }
  svg { transition: transform .3s ease; }`;
const FormCardBox = styled.form`max-width: 640px; margin: 0 auto; background: ${c.card}; border: 1px solid ${c.line}; border-radius: 28px; padding: 32px; display: grid; gap: 16px; box-shadow: 0 40px 70px -50px rgba(5,67,30,.5);
  label { display: grid; gap: 7px; font-weight: 800; font-size: 14px; }
  input, textarea { border: 1.5px solid ${c.line}; border-radius: 14px; padding: 14px 16px; font-size: 16px; background: #FBFDFC; color: ${c.ink}; resize: vertical; }
  input:focus, textarea:focus { border-color: ${c.green}; outline: none; background: #fff; }
  .two { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; } @media (max-width: 560px) { .two { grid-template-columns: 1fr; } }`;
const FormCard = withReveal(FormCardBox);
const Msg = styled.p<{ $err?: boolean }>`margin: 0; padding: 14px 16px; border-radius: 14px; font-weight: 700; font-size: 15px; background: ${({ $err }) => ($err ? c.orangeSoft : c.mint)}; color: ${({ $err }) => ($err ? "#9A3F00" : c.forest)};`;

const FootCard = styled.footer`background: ${c.card}; border-top: 1px solid ${c.line}; padding: 64px 0 28px; margin-top: 40px;
  a { color: ${c.muted}; text-decoration: none; font-weight: 700; &:hover { color: ${c.ink}; } }`;
const FootGrid = styled.div`display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 32px; @media (max-width: 900px) { grid-template-columns: 1fr 1fr; } @media (max-width: 560px) { grid-template-columns: 1fr; }
  h4 { font-family: ${sans}; font-weight: 600; margin: 0 0 14px; font-size: 15px; } ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; font-size: 15px; } p { color: ${c.muted}; line-height: 1.65; margin: 14px 0 16px; max-width: 300px; }`;
const Legal = styled.div`display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-top: 30px; padding-top: 22px; border-top: 1px solid ${c.line}; font-size: 13.5px; color: ${c.muted};`;

const Progress = styled.div`position: fixed; top: 0; left: 0; right: 0; height: 3px; z-index: 70; background: linear-gradient(90deg, ${c.green}, ${c.orange}); transform-origin: left; transform: scaleX(var(--p, 0)); pointer-events: none;`;

/* ───────────────────────── content ───────────────────────── */
const faqs = [
  { q: "Does it work on my phone and on a POS device?", a: "Yes. Lellall runs on phones, tablets and computers, and there is an Android app for your phone and POS device. Tell us what device you use when you request a demo." },
  { q: "How do we get started?", a: "We set up your menu or products, your staff accounts, your VAT and your receipt details with you, then show your team how to use it." },
  { q: "Can I control what my staff can see?", a: "Yes. Owners, managers, waiters and cashiers each have their own access, so people only see what their job needs." },
  { q: "I have more than one branch. Can I manage them together?", a: "Yes. You can manage several branches from the same account and see how each one is doing." },
  { q: "How do I pay for Lellall?", a: "It is a monthly subscription, paid securely online by card or bank transfer. We will explain the options when you request a demo." },
  { q: "What kind of businesses use it?", a: "Restaurants and bars, private lounges, and retail stores and boutiques." },
];
const included = ["Orders, tables and a fast POS", "Inventory and low-stock alerts", "Staff, attendance and payroll", "Receipts that carry your details", "Daily, weekly and monthly reports", "Staff roles and access control", "Setup and training with you", "Support when you need it"];

const CompanyHome = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [faq, setFaq] = useState<number | null>(0);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [problem, setProblem] = useState("");

  const heroRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduced()) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        heroRef.current?.style.setProperty("--sy", String(Math.min(y, 900)));
        barRef.current?.style.setProperty("--p", String(h > 0 ? Math.min(1, y / h) : 0));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  const toContact = () => { setOpen(false); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); };
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return setProblem("Please enter your name.");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setProblem("Please enter a valid email address.");
    if (form.message.trim().length < 10) return setProblem("Please tell us a little more (at least 10 characters).");
    setProblem(""); setStatus("sending");
    try {
      await axios.post("https://api-b2b-prod.lellall.com/inquiries", {
        name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim() || undefined, message: form.message.trim(),
      });
      setStatus("sent"); setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const play = PLAY_STORE_URL ? (
    <PlayBtn href={PLAY_STORE_URL} target="_blank" rel="noreferrer" aria-label="Get Lellall on Google Play"><PlayLogo /><span><small>Get it on</small>Google Play</span></PlayBtn>
  ) : null;

  return (
    <Page>
      <Global />
      <Progress ref={barRef} aria-hidden="true" />
      <Nav>
        <NavRow>
          <Brand src={logo} alt="Lellall" onClick={() => navigate("/")} />
          <Links $open={open} aria-label="Main">
            <a href="#top" onClick={() => setOpen(false)}>Home</a>
            <a href="#features" onClick={() => setOpen(false)}>Features</a>
            <a href="#devices" onClick={() => setOpen(false)}>Devices</a>
            <a href="#how" onClick={() => setOpen(false)}>How it works</a>
            <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
          </Links>
          <NavRight>
            <Btn onClick={toContact}>Request a demo</Btn>
          </NavRight>
          <Burger aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>{open ? <X size={22} /> : <Menu size={22} />}</Burger>
        </NavRow>
      </Nav>

      <Hero id="top" ref={heroRef}>
        <Glow $c={c.orange} $s={520} $x="62%" $y="-120px" $o={0.28} />
        <Glow $c={c.green} $s={560} $x="-8%" $y="40px" $o={0.2} />
        <Glow $c="#9ADCB6" $s={420} $x="38%" $y="260px" $o={0.35} />
        <Ring $c={c.orange} $s={300} $x="-90px" $y="420px" $r={-24} />
        <Ring $c={c.green} $s={340} $x="calc(100% - 200px)" $y="120px" $r={28} />
        <HeroIn>
          <Pill><Sparkles size={15} /> {PLAY_STORE_URL ? "Now on Google Play" : "Built for Nigerian businesses"}</Pill>
          <H1 aria-label="Run your whole business from one screen.">
            {["Run", "your", "whole", "business", "from"].map((w, k) => (<span key={w}><span className="w" aria-hidden="true"><span style={{ "--i": k } as React.CSSProperties}>{w}</span></span>{" "}</span>))}
            <RotWord />
          </H1>
          <HeroLead>Sales, stock, staff and reports in one simple system. Print professional receipts, see every naira, and know what is happening in your business even when you are not there.</HeroLead>
          <Row>
            <Btn onClick={toContact}>Request a demo <Go /></Btn>
            {play ?? <Btn $v="line" onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}>See how it works</Btn>}
          </Row>
          <Kinds>
            <li><ChefHat size={17} /> Restaurants</li><li><Wine size={17} /> Lounges</li><li><Store size={17} /> Stores</li><li><Tablet size={17} /> POS devices</li>
          </Kinds>
        </HeroIn>
        <div style={{ position: "relative", zIndex: 2, marginTop: 60 }}>
          <ViewTour>
            <Side2>
              <Call $top={120} $i={5}><div className="t"><b>Sales at a glance</b><span>Weekly and monthly sales the moment you open the app.</span></div><i className="l" /></Call>
              <Call $top={285} $i={0}><div className="t"><b>Low-stock warnings</b><span>Know what to buy before you run out.</span></div><i className="l" /></Call>
              <Call $top={500} $i={1}><div className="t"><b>Orders and payments</b><span>See what has been paid and what is still open.</span></div><i className="l" /></Call>
            </Side2>
            <PhoneWrap><Halo /><PhoneApp /></PhoneWrap>
            <Side2 $right>
              <Call $right $top={40} $i={2}><div className="t"><b>Runs on POS devices</b><span>Use the Android app on your POS device, phone or tablet.</span></div><i className="l" /></Call>
              <Call $right $top={390} $i={3}><div className="t"><b>Quick links</b><span>One tap to orders, menu, inventory and reports.</span></div><i className="l" /></Call>
              <Call $right $top={520} $i={4}><div className="t"><b>Receipts that print</b><span>Print a clean receipt with your business details.</span></div><i className="l" /></Call>
            </Side2>
          </ViewTour>
        </div>
      </Hero>

      <Section id="features">
        <Inner>
          <Head><Pill>What Lellall does</Pill><H2 style={{ marginTop: 18 }}>Everything the business needs, <em>in one place.</em></H2><Lead>From the first order of the day to the report you read at night.</Lead></Head>
          <Bento>
            <BC i={1} $span={2}><Ico><ShoppingCart size={22} /></Ico><h3>Orders and sales</h3><p>Take orders fast, add VAT and discounts, and accept cash, transfer or card.</p>
              <Mini><Li><span>Grilled chicken</span><em>2 × ₦6,500</em></Li><Li><span>Jollof rice</span><em>3 × ₦3,000</em></Li></Mini></BC>
            <BC i={2}><Ico><Package size={22} /></Ico><h3>Inventory and stock</h3><p>See what is in stock, what is running low, and what to buy next.</p></BC>
            <BC i={3}><Ico><Users size={22} /></Ico><h3>Staff and payroll</h3><p>Attendance, leave and salaries for your whole team.</p></BC>
            <BC i={0}><Ico><BarChart3 size={22} /></Ico><h3>Reports and insights</h3><p>Daily sales, best sellers and trends, ready to print or share.</p></BC>
            <BC i={1} $span={2} $tone="orange"><Ico $inv><Tablet size={22} /></Ico><h3>POS devices and mobile app</h3><p>Sell from a counter POS device, a tablet or your phone. Get the Android app and your whole team is connected.</p>
              {play && <div style={{ marginTop: "auto", paddingTop: 14 }}>{play}</div>}</BC>
            <BC i={2}><Ico><Receipt size={22} /></Ico><h3>Receipts and printing</h3><p>Clear receipts with your business name, bank details and totals.</p></BC>
            <BC i={3} $span={2} $tone="mint"><Ico><Wallet size={22} /></Ico><h3>Payments your customers use</h3><p>Record cash, bank transfer and card sales in one place, and see exactly what came in.</p>
              <PayChips><span>Cash</span><span>Bank transfer</span><span>Card</span><span>Online</span></PayChips></BC>
            <BC i={0}><Ico><Building2 size={22} /></Ico><h3>More than one branch</h3><p>Manage several locations from the same account.</p></BC>
            <BC i={1}><Ico><Lock size={22} /></Ico><h3>Roles and access</h3><p>Owners, managers, waiters and cashiers see only what they should.</p></BC>
          </Bento>
        </Inner>
      </Section>

      <Section id="devices" style={{ overflow: "hidden" }}>
        <Glow $c={c.green} $s={460} $x="-120px" $y="20%" $o={0.16} /><Glow $c={c.orange} $s={420} $x="calc(100% - 260px)" $y="35%" $o={0.2} />
        <Inner style={{ position: "relative", zIndex: 1 }}>
          <Head><Pill>One system, every device</Pill><H2 style={{ marginTop: 18 }}>Phone, POS, tablet or laptop. <em>Same Lellall.</em></H2><Lead>Take an order on any of them and it shows up everywhere, instantly. Sample data shown.</Lead></Head>
          <Devices />
        </Inner>
      </Section>

      <Section>
        <Inner><Head><Pill>Who it is for</Pill><H2 style={{ marginTop: 18 }}>One system, built around <em>your kind of business.</em></H2></Head></Inner>
        <Three>
          <RAud i={0}><Ico><ChefHat size={22} /></Ico><h3>Restaurants and bars</h3><p>Run the floor, the kitchen and the till together.</p><ul><li><Check size={16} />Menus, orders and tables</li><li><Check size={16} />Stock that updates as you sell</li><li><Check size={16} />Daily sales reports</li></ul></RAud>
          <RAud i={1}><Ico><Wine size={22} /></Ico><h3>Private lounges</h3><p>Look after members and guests properly.</p><ul><li><Check size={16} />Memberships and walk-ins</li><li><Check size={16} />Bottle storage records</li><li><Check size={16} />Billing and receipts</li></ul></RAud>
          <RAud i={2}><Ico><Store size={22} /></Ico><h3>Stores and boutiques</h3><p>Sell, track products and keep customers happy.</p><ul><li><Check size={16} />Product list and prices</li><li><Check size={16} />Sales with VAT and receipts</li><li><Check size={16} />Staff accounts for sellers</li></ul></RAud>
        </Three>
      </Section>

      <Section id="how" style={{ background: "#fff" }}>
        <Inner><Head><Pill>How it works</Pill><H2 style={{ marginTop: 18 }}>Up and running in <em>three steps.</em></H2></Head></Inner>
        <Steps>
          <RStep i={0}><h3>We set you up</h3><p>Your menu or products, your staff accounts, your VAT and your receipt details, done with you.</p></RStep>
          <RStep i={1}><h3>Your team starts selling</h3><p>Orders, payments and receipts all in one place, from any phone, POS device or computer.</p></RStep>
          <RStep i={2}><h3>You see the numbers</h3><p>Open your dashboard any time: sales, stock and staff, without waiting for a report.</p></RStep>
        </Steps>
      </Section>

      <Section id="pricing">
        <Inner>
          <Duo>
            <div>
              <Pill>Pricing</Pill>
              <H2 style={{ marginTop: 18 }}>Simple plans that <em>fit your business.</em></H2>
              <Lead>Every business is different, so we agree a plan with you after a short demo. No surprises.</Lead>
              <RTalk><h3>Not sure what you need? Let&apos;s talk.</h3><Btn onClick={toContact}>Request a demo <Go /></Btn></RTalk>
            </div>
            <RBig>
              <h3>Everything included</h3>
              <p>One subscription covers the whole system, so there is no pile of extra tools to pay for.</p>
              <Checks>{included.map((t) => <li key={t}><span><Check size={14} /></span>{t}</li>)}</Checks>
              <Quote><div><b>Tailored to you</b><small>Pick the plan that matches your size.</small></div><Btn $v="orange" onClick={toContact}>Get a quote</Btn></Quote>
            </RBig>
          </Duo>
        </Inner>
      </Section>

      <Section id="clients" style={{ overflow: "hidden" }}>
        <Glow $c={c.orange} $s={380} $x="calc(100% - 240px)" $y="10%" $o={0.16} />
        <Inner style={{ position: "relative", zIndex: 1 }}>
          <Head><Pill>Our clients</Pill><H2 style={{ marginTop: 18 }}>Businesses that run on <em>Lellall</em> every day.</H2><Lead>Restaurants, lounges and studios using Lellall for their orders, stock and staff.</Lead></Head>
        </Inner>
        <Clients />
      </Section>

      <Section id="faq" style={{ background: "#fff", overflow: "hidden" }}>
        <Ring $c={c.orange} $s={320} $x="-120px" $y="30%" $r={-20} />
        <Inner style={{ position: "relative", zIndex: 1 }}>
          <Duo>
            <div><Pill>FAQ</Pill><H2 style={{ marginTop: 18 }}>Questions we <em>often hear.</em></H2><Lead>Can&apos;t find your answer? Send us a message below and we will reply.</Lead></div>
            <Faq>
              {faqs.map((f, k) => (
                <FaqItem key={f.q} $on={faq === k}>
                  <button aria-expanded={faq === k} onClick={() => setFaq(faq === k ? null : k)}>{f.q}{faq === k ? <Minus size={20} /> : <Plus size={20} />}</button>
                  <div className="body" aria-hidden={faq !== k}><div><p>{f.a}</p></div></div>
                </FaqItem>
              ))}
            </Faq>
          </Duo>
        </Inner>
      </Section>

      <Section id="contact" style={{ overflow: "hidden" }}>
        <Glow $c={c.orange} $s={440} $x="60%" $y="-60px" $o={0.22} /><Glow $c={c.green} $s={480} $x="-8%" $y="40%" $o={0.16} />
        <Inner style={{ position: "relative", zIndex: 1 }}>
          <Head><Pill><Headset size={15} /> Talk to us</Pill><H2 style={{ marginTop: 18 }}>Let&apos;s get <em>in touch.</em></H2><Lead>Tell us about your business and we will show you how Lellall would work for you.</Lead></Head>
          <FormCard onSubmit={submit} noValidate>
            <div className="two">
              <label>Your name<input value={form.name} onChange={set("name")} placeholder="Full name" autoComplete="name" /></label>
              <label>Email<input type="email" value={form.email} onChange={set("email")} placeholder="you@business.com" autoComplete="email" /></label>
            </div>
            <label>Phone (optional)<input value={form.phone} onChange={set("phone")} placeholder="Your phone number" autoComplete="tel" /></label>
            <label>How can we help?<textarea rows={5} value={form.message} onChange={set("message")} placeholder="Tell us about your business" /></label>
            {problem && <Msg $err>{problem}</Msg>}
            {status === "sent" && <Msg>Thank you! We have your message and will get back to you shortly.</Msg>}
            {status === "error" && <Msg $err>Sorry, that did not send. Please try again in a moment.</Msg>}
            <Btn type="submit" disabled={status === "sending"} style={{ width: "100%", padding: "17px 26px" }}>{status === "sending" ? "Sending…" : <>Send message <Send size={17} /></>}</Btn>
          </FormCard>
        </Inner>
      </Section>

      <FootCard>
        <Inner>
          <FootGrid>
            <div><Brand src={logo} alt="Lellall" /><p>Business management for restaurants, lounges and stores.</p>{play}</div>
            <div><h4>Company</h4><ul><li><a href="#features">Features</a></li><li><a href="#how">How it works</a></li><li><a href="#faq">FAQ</a></li><li><a href="/shop">Shop</a></li></ul></div>
            <div><h4>Legal</h4><ul><li><a href="/terms">Terms and conditions</a></li><li><a href="/privacy-policy">Privacy policy</a></li></ul></div>
            <div><h4>Follow us</h4><ul>
              <li><a href="https://www.linkedin.com/company/l%C3%A9llall/about/" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href="https://www.instagram.com/lellall_ng" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://twitter.com/Lellall_ng" target="_blank" rel="noreferrer">X (Twitter)</a></li>
              <li><a href="https://www.tiktok.com/@lellall_ng" target="_blank" rel="noreferrer">TikTok</a></li></ul></div>
          </FootGrid>
          <Legal><span>© {new Date().getFullYear()} Lellall. All rights reserved.</span></Legal>
        </Inner>
      </FootCard>
    </Page>
  );
};

export default CompanyHome;
