// Existing interactions retained during the framework migration.
let initialized = false;
export function initializeSite() {
if (initialized) return;
initialized = true;

    (function(){
      var elements=document.querySelectorAll('.hero-copy > *, .hero-art, .hero-foot > *, .menu-side > *, .menu-side .menu-item, .menu-frame-wrap, .story-section .eyebrow, .story-section h2, .story-lede, .chapter, .locations .section-head > *, .location-card, .location-aside, .social-inner > *');
      elements.forEach(function(element,index){element.setAttribute('data-reveal','');element.style.setProperty('--reveal-delay',((index%5)*75)+'ms')});
      document.documentElement.classList.add('motion-ready');
      if(!('IntersectionObserver' in window)){elements.forEach(function(element){element.classList.add('is-visible')});return}
      var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:.14,rootMargin:'0px 0px -35px 0px'});
      elements.forEach(function(element){observer.observe(element)});
    })();
  
}
