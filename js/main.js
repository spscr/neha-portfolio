/* Renders content from content.js and adds light interactions.
   You normally don't need to edit this file. */
(function () {
  const S = window.SITE;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (t) => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const paras = (arr) => arr.map(p => `<p>${esc(p)}</p>`).join('');

  /* ---------- Fill content ---------- */
  document.querySelectorAll('[data-bind]').forEach(el => { el.textContent = S[el.dataset.bind]; });
  { /* Hero name: first word on line one, the rest on line two */
    const [first, ...rest] = String(S.name).trim().split(/\s+/);
    $('#hero-name').innerHTML = `<span class="hero__first">${esc(first)}</span>` +
      (rest.length ? ` <span class="hero__last">${esc(rest.join(' '))}</span>` : '');
  }
  $('#tagline').innerHTML = S.tagline.map(esc).join('<span class="dot" aria-hidden="true">·</span>');
  Object.assign($('#hero-img'), { src: S.heroImage.src, alt: S.heroImage.alt });

  const gallery = $('#gallery');
  gallery.innerHTML = S.artworks.map((a, i) => `
    <li class="gallery__item reveal" style="--d:${(i % 3) * 80}ms">
      <div class="gallery__inner">
      <button class="gallery__btn" data-index="${i}" aria-label="View ${esc(a.title)} larger">
        <span class="gallery__frame"><span class="gallery__img"><img src="${esc(a.src)}" alt="${esc(a.alt)}" loading="lazy"></span></span>
      </button>
      <p class="caption"><span class="caption__title">${esc(a.title)}</span>
        <span class="caption__meta">${esc(a.medium)}, ${esc(a.year)}</span></p>
      </div>
    </li>`).join('');

  /* Masonry: keeps reading order left-to-right and balances columns */
  const ROW = 4;
  function layoutGallery() {
    const cols = getComputedStyle(gallery).gridTemplateColumns.split(' ').length;
    gallery.classList.add('is-masonry');
    const gap = parseFloat(getComputedStyle(gallery).getPropertyValue('--gap-y')) || 48;
    gallery.querySelectorAll('.gallery__item').forEach(li => {
      const h = li.firstElementChild.getBoundingClientRect().height;
      li.style.gridRowEnd = cols > 1 ? `span ${Math.ceil((h + gap) / ROW)}` : 'auto';
    });
  }
  gallery.querySelectorAll('img').forEach(img => img.complete ? null : img.addEventListener('load', layoutGallery));
  layoutGallery(); window.addEventListener('load', layoutGallery);
  let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(layoutGallery, 120); });

  const A = S.arangetram;
  $('#ar-title').textContent = A.heading;
  $('#ar-sub').textContent = A.subheading;
  $('#ar-story').innerHTML = paras(A.story);
  $('#ar-details').innerHTML = A.details.map(d => {
    const v = Array.isArray(d.value)
      ? `<ul class="detail-lines">${d.value.map(line => {
          const [role, ...rest] = String(line).split(' · ');
          return rest.length
            ? `<li><span class="detail-role">${esc(role)}</span> ${esc(rest.join(' · '))}</li>`
            : `<li>${esc(line)}</li>`;
        }).join('')}</ul>`
      : esc(d.value);
    return `<div><dt>${esc(d.label)}</dt><dd>${v}</dd></div>`;
  }).join('');

  /* Photo gallery: justified rows (equal height per row, nothing cropped).
     Desktop rows follow A.rowPattern (default 2, then 3s); phones: 1, then 2s. */
  const photos = A.photos.filter(p => !p.placeholder);
  const arG = $('#ar-gallery');
  const ratio = p => (p.w && p.h) ? p.w / p.h : 0.75;
  const phoneMQ = window.matchMedia('(max-width: 640px)');
  const srcW = p => p.w && p.h ? Math.round(1000 * p.w / Math.max(p.w, p.h)) : 1000;
  let arBuilt = false;
  function buildArGallery() {
    const phone = phoneMQ.matches;
    const pattern = phone ? [1] : (A.rowPattern && A.rowPattern.length ? A.rowPattern : [2]);
    const fallback = 3;
    const rows = [];
    if (phone) {
      // phones: first photo alone, then wide photos get their own row and
      // tall photos pair up side by side (so nothing ends up tiny)
      let tall = [];
      photos.forEach((p, i) => {
        const it = { p, i };
        if (i === 0 || ratio(p) >= 1) rows.push([it]);
        else { tall.push(it); if (tall.length === 2) { rows.push(tall); tall = []; } }
      });
      if (tall.length) rows.push(tall);
    } else {
      let i = 0;
      while (i < photos.length) {
        const size = pattern[rows.length] || fallback;
        rows.push(photos.slice(i, i + size).map((p, k) => ({ p, i: i + k })));
        i += size;
      }
    }
    // avoid a lonely last photo on wide screens: fold it into the row above
    if (!phone && rows.length > 2 && rows[rows.length - 1].length === 1) rows[rows.length - 2].push(...rows.pop());
    arG.innerHTML = rows.map((row, r) => {
      const total = row.reduce((t, { p }) => t + ratio(p), 0);
      return `
      <div class="ar-row${r === 0 ? ' ar-row--feature' : ''}">${row.map(({ p, i }, k) => {
        const share = ratio(p) / total; // this photo's share of the row width
        const srcset = p.full ? `${esc(p.src)} ${srcW(p)}w, ${esc(p.full)} ${p.w || 2000}w` : '';
        const sizes = `(max-width: 1200px) ${Math.ceil(share * 96)}vw, ${Math.ceil(share * 1110)}px`;
        return `
        <figure class="ar-photo reveal${arBuilt ? ' is-visible' : ''}" style="flex-grow:${(ratio(p) * 100).toFixed(2)};--d:${k * 90}ms">
          <button class="ar-photo__btn" data-index="${i}" aria-label="View larger: ${esc(p.caption || 'arangetram photo ' + (i + 1))}">
            <img src="${esc(p.src)}"${srcset ? ` srcset="${srcset}" sizes="${sizes}"` : ''} alt="${esc(p.alt)}" ${p.w ? `width="${p.w}" height="${p.h}"` : ''} loading="lazy" decoding="async" style="aspect-ratio:${p.w && p.h ? p.w + ' / ' + p.h : '3 / 4'}">
          </button>${p.caption ? `
          <figcaption>${esc(p.caption)}</figcaption>` : ''}
        </figure>`;
      }).join('')}
      </div>`;
    }).join('');
    arG.hidden = photos.length === 0;
    arBuilt = true;
  }
  buildArGallery();
  (phoneMQ.addEventListener ? phoneMQ.addEventListener('change', buildArGallery) : phoneMQ.addListener(buildArGallery));

  /* Margam (program) — two columns split at the intermission */
  const M = A.margam || [];
  const mWrap = $('#ar-margam');
  if (!M.length) { mWrap.hidden = true; } else {
    $('#margam-title').textContent = A.margamTitle || 'The Margam';
    $('#margam-note').textContent = A.margamNote || '';
    let n = 0;
    const item = m => {
      n += 1;
      const rt = [m.raga, m.tala].filter(Boolean).map(esc).join('<span class="margam__sep" aria-hidden="true">·</span>');
      return `<li><span class="margam__n">${String(n).padStart(2, '0')}</span><div>
        <span class="margam__title">${esc(m.title)}${m.kind ? ` <em>${esc(m.kind)}</em>` : ''}</span>
        ${rt ? `<span class="margam__rt">${rt}</span>` : ''}</div></li>`;
    };
    const cut = M.findIndex(m => m.intermission);
    const partA = cut >= 0 ? M.slice(0, cut) : M, partB = cut >= 0 ? M.slice(cut + 1) : [];
    const listA = `<ol class="margam__list">${partA.map(item).join('')}</ol>`;
    const listB = partB.length ? `<div class="margam__part"><p class="margam__break"><span>Intermission</span></p>
      <ol class="margam__list" start="${partA.length + 1}">${partB.map(item).join('')}</ol></div>` : '';
    $('#margam-list').innerHTML = `<div class="margam__part">${listA}</div>${listB}`;
  }

  /* Video: a featured YouTube video (privacy-friendly: the player loads only on
     click, from youtube-nocookie.com) and/or self-hosted clips below it.
     Only one video plays at a time. */
  const video = $('#ar-video');
  const clips = A.videos || [];
  let ytFrame = null;
  const pauseYT = () => { if (ytFrame) ytFrame.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*'); };
  let html = '';
  if (A.youtubeId) {
    html += `
      <figure class="video">
        <div class="video__frame"${A.videoPoster ? ` style="background-image:url('${esc(A.videoPoster)}')"` : ''}>
          <button class="video__play" aria-label="Play video: ${esc(A.videoTitle || 'Arangetram')}">
            <span class="video__icon" aria-hidden="true"></span>
          </button>
          ${A.videoTitle ? `<p class="video__label">${esc(A.videoTitle)}<em>YouTube</em></p>` : ''}
        </div>${A.videoCaption ? `
        <figcaption class="videos__caption">${esc(A.videoCaption)}</figcaption>` : ''}
      </figure>`;
  }
  if (clips.length) {
    html += `
      <div class="videos__grid videos__grid--n${Math.min(clips.length, 2)}${A.youtubeId ? ' videos__grid--sub' : ''}">${clips.map(v => `
        <figure class="videos__item">
          <div class="videos__frame">
            <video controls preload="metadata" playsinline poster="${esc(v.poster || '')}" aria-label="${esc(v.alt || v.label || 'Video')}">
              <source src="${esc(v.src)}" type="video/mp4">
              Your browser can’t play this video.
            </video>
          </div>${v.label ? `
          <figcaption class="videos__label">${esc(v.label)}</figcaption>` : ''}
        </figure>`).join('')}
      </div>${!A.youtubeId && A.videoCaption ? `
      <p class="videos__caption">${esc(A.videoCaption)}</p>` : ''}`;
  }
  if (!html) { video.hidden = true; } else {
    video.innerHTML = html;
    const vids = [...video.querySelectorAll('video')];
    vids.forEach(v => v.addEventListener('play', () => { pauseYT(); vids.forEach(o => { if (o !== v) o.pause(); }); }));
    const play = $('.video__play', video);
    if (play) play.addEventListener('click', () => {
      vids.forEach(o => o.pause());
      const frame = $('.video__frame', video);
      frame.classList.add('is-playing');
      frame.innerHTML =
        `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(A.youtubeId)}?autoplay=1&rel=0&playsinline=1&enablejsapi=1"
          title="${esc(A.videoTitle || 'Arangetram video')}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen"></iframe>`;
      ytFrame = $('iframe', frame);
      ytFrame.focus();
    });
  }

  const B = S.about;
  Object.assign($('#portrait'), { src: B.portrait.src, alt: B.portrait.alt });
  $('#bio').innerHTML = paras(B.bio);
  $('#interests').innerHTML = B.interests.map((it, i) =>
    `<li class="reveal" style="--d:${i * 60}ms"><h3>${esc(it.title)}</h3><p>${esc(it.text)}</p></li>`).join('');

  $('#contact-title').textContent = S.contact.heading;
  $('#contact-text').textContent = S.contact.text;
  Object.assign($('#contact-email'), { href: 'mailto:' + S.contact.email, textContent: S.contact.email });
  $('#footer-text').textContent = S.footer;

  /* ---------- Nav: scrolled state + mobile menu ---------- */
  const nav = $('.nav'), toggle = $('.nav__toggle');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 10);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  document.querySelectorAll('.nav__links a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false');
  }));

  /* ---------- Reveal on scroll ---------- */
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(el => io.observe(el));
  }

  /* ---------- Lightbox ---------- */
  const lb = $('#lightbox'), lbImg = $('img', lb);
  let idx = 0, lastFocus = null;
  const dateDetail = (A.details.find(d => /date/i.test(d.label)) || {}).value || '';
  const sets = {
    art: S.artworks.map(a => ({ src: a.src, alt: a.alt, title: a.title, meta: `${a.medium}, ${a.year}` })),
    ar: photos.map(p => ({ src: p.full || p.src, alt: p.alt, title: p.caption || A.heading, meta: dateDetail }))
  };
  let set = sets.art;
  function show(i) {
    idx = (i + set.length) % set.length;
    const a = set[idx];
    lb.classList.remove('is-loaded');
    lbImg.onload = () => lb.classList.add('is-loaded');
    lbImg.src = a.src; lbImg.alt = a.alt;
    $('.lb-title', lb).textContent = a.title;
    $('.lb-meta', lb).textContent = a.meta;
    $('.lb-count', lb).textContent = `${idx + 1} / ${set.length}`;
  }
  function open(i, which) {
    set = sets[which || 'art'];
    lastFocus = document.activeElement;
    show(i); lb.hidden = false;
    requestAnimationFrame(() => lb.classList.add('is-open'));
    document.body.style.overflow = 'hidden';
    $('.lightbox__close', lb).focus();
  }
  function close() {
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => { lb.hidden = true; }, reduce ? 0 : 250);
    if (lastFocus) lastFocus.focus();
  }
  gallery.addEventListener('click', e => {
    const b = e.target.closest('.gallery__btn'); if (b) open(+b.dataset.index);
  });
  arG.addEventListener('click', e => {
    const b = e.target.closest('.ar-photo__btn'); if (b) open(+b.dataset.index, 'ar');
  });
  $('.lightbox__close', lb).addEventListener('click', close);
  $('.lightbox__prev', lb).addEventListener('click', () => show(idx - 1));
  $('.lightbox__next', lb).addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(idx - 1);
    else if (e.key === 'ArrowRight') show(idx + 1);
    else if (e.key === 'Tab') { // keep focus inside the viewer
      const f = [...lb.querySelectorAll('button')];
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  let tx = null; // swipe on touch devices
  lb.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    if (tx === null) return; const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1)); tx = null;
  });
})();
