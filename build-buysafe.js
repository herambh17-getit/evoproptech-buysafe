/* build-buysafe.js — regenerates the config-driven HTML blocks from
   buysafe-framework.js into the pages, between <!-- BUYSAFE:x --> markers.
   Run after editing the config:  node build-buysafe.js
   Pure dev script: no runtime dependency, no framework. Output is static
   HTML (good for SEO), kept in one source (the config). */
const fs = require('fs');
const path = require('path');
const B = require('./buysafe-framework.js');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function pillars() {
  return B.pillars.map((p, i) =>
`      <article class="pillar">
        <p class="pillar__n">Area ${String(i + 1).padStart(2, '0')}</p>
        <h3>${esc(p.name)}</h3>
        <p class="pillar__summary">${esc(p.summary)}</p>
        <ul class="pillar__checks">
${p.checks.map(c => `          <li>${esc(c)}</li>`).join('\n')}
        </ul>
      </article>`).join('\n');
}

function additional() {
  return B.additional.map(a =>
`      <div class="addl__card">
        <h3>${esc(a.name)}</h3>
        <ul>
${a.checks.map(c => `          <li>${esc(c)}</li>`).join('\n')}
        </ul>
      </div>`).join('\n');
}

function sources() {
  return B.sources.map(s =>
`      <span class="source-pill"><i aria-hidden="true"></i>${esc(s)}</span>`).join('\n');
}

function statusLegend() {
  return B.statuses.map(s =>
`      <div class="legend__row"><span class="badge badge--${s.tone}">${esc(s.label)}</span><span class="legend__note">${esc(s.note)}</span></div>`).join('\n');
}

function evidenceLegend() {
  var tone = { high: 'go', medium: 'caution', low: 'muted', unavailable: 'muted' };
  return B.evidenceConfidence.map(e =>
`      <div class="legend__row"><span class="badge badge--${tone[e.id] || 'muted'}">${esc(e.label)}</span><span class="legend__note">${esc(e.note)}</span></div>`).join('\n');
}

function journey() {
  return B.product.journey.map((s, i) =>
    (i ? '      <svg class="journey__arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>\n' : '') +
    `      <span class="journey__step">${esc(s)}</span>`).join('\n');
}

function limitations() {
  return B.limitations.map(l => `          <li>${esc(l)}</li>`).join('\n');
}

const BLOCKS = {
  pillars: pillars, additional: additional, sources: sources,
  statuslegend: statusLegend, evidencelegend: evidenceLegend,
  journey: journey, limitations: limitations
};

const targets = process.argv.slice(2);
if (!targets.length) { console.error('usage: node build-buysafe.js <file.html> [more.html]'); process.exit(1); }

let totalBlocks = 0;
targets.forEach(file => {
  let html = fs.readFileSync(file, 'utf8');
  let n = 0;
  Object.keys(BLOCKS).forEach(name => {
    const re = new RegExp('(<!-- BUYSAFE:' + name + ' -->)[\\s\\S]*?(<!-- /BUYSAFE:' + name + ' -->)', 'g');
    html = html.replace(re, (m, a, b) => { n++; return a + '\n' + BLOCKS[name]() + '\n      ' + b; });
  });
  fs.writeFileSync(file, html);
  totalBlocks += n;
  console.log('  ' + path.basename(file) + ': ' + n + ' block(s) filled');
});
console.log('done — ' + totalBlocks + ' block(s) across ' + targets.length + ' file(s).');
