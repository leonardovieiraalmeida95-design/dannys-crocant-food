"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SiteInteractions() {
  const introRef = useRef<HTMLDivElement>(null);
  const introPlayed = useRef(false);

  useLayoutEffect(() => {
    const events = new AbortController();
    const notice = document.querySelector<HTMLElement>(".demo-notice");
    const updateNotice = () => document.documentElement.style.setProperty("--notice-height", `${notice?.offsetHeight ?? 0}px`);
    updateNotice();
    let refreshFrame = 0;
    const layoutObserver = new ResizeObserver(() => {
      updateNotice();
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    if (notice) layoutObserver.observe(notice);
    const content = document.querySelector("main");
    if (content) layoutObserver.observe(content);
    const menu = document.querySelector<HTMLDetailsElement>(".mobile-nav");
    document.addEventListener("click", (event) => {
      if (!menu || !(event.target instanceof Element)) return;
      if (!menu.contains(event.target) || event.target.closest("a")) menu.open = false;
    }, { signal: events.signal });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu?.open) {
        menu.open = false;
        menu.querySelector<HTMLElement>("summary")?.focus();
      }
    }, { signal: events.signal });

    const media = gsap.matchMedia();
    const intro = introRef.current;
    let alive = true;
    let failSafe: ReturnType<typeof setTimeout> | undefined;

    media.add({
      desktop: "(min-width: 901px)",
      mobile: "(max-width: 900px)",
      reduce: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      const { desktop, reduce } = context.conditions!;
      if (reduce) {
        if (intro) intro.hidden = true;
        return;
      }
      const localEvents = new AbortController();
      const distance = desktop ? 32 : 18;
      const playIntro = !introPlayed.current && window.scrollY < 24 && !location.hash;
      introPlayed.current = true;
      const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });
      const finishIntro = () => {
        if (intro) intro.hidden = true;
        if (failSafe) clearTimeout(failSafe);
      };

      if (playIntro && intro) {
        intro.hidden = false;
        entrance
          .fromTo(".intro-mark", { opacity: 0 }, { opacity: 1, duration: .35 }, 0)
          .fromTo(".intro-label", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .4 }, .1)
          .fromTo(".intro-line i", { scaleX: 0 }, { scaleX: 1, duration: .75, ease: "power2.inOut" }, .05)
          .to(intro, { yPercent: -100, duration: .65, ease: "power3.inOut", onComplete: finishIntro }, .8);
        failSafe = setTimeout(finishIntro, 2400);
      }

      const start = playIntro ? 1.05 : 0;
      entrance
        .from(".topbar", { opacity: 0, duration: .55, clearProps: "opacity" }, start)
        .from(".hero-copy > *", {
          opacity: 0, y: distance, duration: .85, stagger: .1,
          clearProps: "opacity,transform",
        }, start)
        // Fade the artwork without scaling or rotating the logo.
        .from(".hero-art", { opacity: 0, duration: .9, clearProps: "opacity" }, start + .18)
        .from(".hero-foot", { opacity: 0, duration: .65, clearProps: "opacity" }, start + .45);

      intro?.querySelector("button")?.addEventListener("click", () => {
        finishIntro();
        entrance.progress(1);
      }, { signal: localEvents.signal });

      const revealSelectors = [
        ".menu-side > .eyebrow", ".menu-side h2", ".menu-side > p",
        ".menu-item", ".menu-side > .btn", ".menu-frame-wrap",
        ".story-section .eyebrow", ".story-section h2", ".story-lede",
        ".chapter", ".story-note", ".locations .section-head > *",
        ".location-card", ".location-aside", ".social-inner > *",
      ];
      gsap.utils.toArray<HTMLElement>(revealSelectors.join(",")).forEach((element) => {
        const cardIndex = element.matches(".chapter,.location-card")
          ? Array.from(element.parentElement!.children).indexOf(element) : 0;
        gsap.from(element, {
          opacity: 0, y: distance, duration: .8, ease: "power3.out",
          delay: desktop ? cardIndex * .09 : 0,
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: element, start: "top 94%", once: true },
        });
      });

      const orbit = gsap.to(".hero-orbit", {
        rotation: 360, duration: 90, repeat: -1, ease: "none",
      });
      ScrollTrigger.create({
        trigger: ".hero", start: "top bottom", end: "bottom top",
        onToggle: (self) => { orbit.paused(!self.isActive); },
      });

      if (desktop) {
        gsap.to(".art-stamp", {
          y: -24, rotation: 5, ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 },
        });
        gsap.to(".story-section", {
          "--story-offset": "-55px", ease: "none",
          scrollTrigger: { trigger: ".story-section", start: "top bottom", end: "bottom top", scrub: 1.2 },
        });
      }
      gsap.fromTo(".timeline", { "--timeline-progress": 0 }, {
        "--timeline-progress": 1, ease: "none",
        scrollTrigger: { trigger: ".timeline", start: "top 80%", end: "bottom 45%", scrub: .8 },
      });

      return () => {
        localEvents.abort();
        if (failSafe) clearTimeout(failSafe);
        if (intro) intro.hidden = true;
      };
    });

    document.fonts.ready.then(() => { if (alive) ScrollTrigger.refresh(); });
    window.addEventListener("pageshow", () => ScrollTrigger.refresh(), { signal: events.signal });
    return () => {
      alive = false;
      events.abort();
      layoutObserver.disconnect();
      cancelAnimationFrame(refreshFrame);
      media.revert();
      if (failSafe) clearTimeout(failSafe);
    };
  }, []);

  return (
    <div className="site-intro" ref={introRef} hidden aria-label="Apresentação Danny’s">
      <div className="intro-content">
        <img className="intro-mark" src="assets/danny-logo.svg" alt="Danny’s Jaguariaíva" width="144" height="144" />
        <p className="intro-label">O sabor tem uma história.</p>
        <p className="intro-demo">Proposta independente · Demonstração</p>
        <div className="intro-line" aria-hidden="true"><i /></div>
        <button type="button">Entrar no site <span aria-hidden="true">↗</span></button>
      </div>
    </div>
  );
}
