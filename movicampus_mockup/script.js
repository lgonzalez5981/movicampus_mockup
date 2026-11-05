// Navegación por hash entre las 5 pantallas del prototipo
const screens = ['login','registro','panel','gestion','reportes'];
const inner = ['panel','gestion','reportes'];
const topbar = document.getElementById('topbar');
const bottombar = document.getElementById('bottombar');

function show() {
  let id = location.hash.replace('#','');
  if (!screens.includes(id)) id = 'login';
  screens.forEach(s => document.getElementById('s-' + s).classList.toggle('is-active', s === id));
  const isInner = inner.includes(id);
  topbar.hidden = !isInner;
  bottombar.hidden = !(isInner && matchMedia('(max-width:767px)').matches);
  document.querySelectorAll('[data-nav]').forEach(a => a.classList.toggle('is-current', a.dataset.nav === id));
  document.title = 'MoviCampus – ' + ({login:'Iniciar sesión',registro:'Crear cuenta',panel:'Panel principal',gestion:'Gestión de rutas',reportes:'Reportes'})[id];
  window.scrollTo(0, 0);
}
addEventListener('hashchange', show);
matchMedia('(max-width:767px)').addEventListener('change', show);
show();

// Formularios que llevan a otra pantalla
document.querySelectorAll('[data-go]').forEach(el => {
  const go = () => { location.hash = el.dataset.go; };
  if (el.tagName === 'FORM') el.addEventListener('submit', e => { e.preventDefault(); go(); });
  else el.addEventListener('click', go);
});

// Filtros por tipo de transporte (HU-03)
const filters = document.getElementById('filters');
filters.addEventListener('click', e => {
  const b = e.target.closest('[data-filter]'); if (!b) return;
  filters.querySelectorAll('.chip').forEach(c => { c.classList.toggle('is-active', c === b); c.setAttribute('aria-pressed', c === b); });
  let shown = 0;
  document.querySelectorAll('#route-list .card').forEach(c => {
    const ok = b.dataset.filter === 'todos' || c.dataset.type.split(' ').includes(b.dataset.filter);
    c.hidden = !ok; if (ok) shown++;
  });
  document.getElementById('empty-msg').hidden = shown > 0;
});

// Buscador de rutas (simulado)
document.getElementById('search').addEventListener('submit', e => {
  e.preventDefault();
  const o = document.getElementById('origen').value.trim(), d = document.getElementById('destino').value.trim();
  const m = document.getElementById('search-msg');
  m.hidden = false;
  m.textContent = (o && d) ? `Mostrando rutas de ${o} a ${d} (datos de ejemplo).` : 'Escribe origen y destino para buscar.';
});

// Chips de periodo (solo cambia el estado visual)
document.getElementById('period').addEventListener('click', e => {
  const b = e.target.closest('.chip'); if (!b) return;
  e.currentTarget.querySelectorAll('.chip').forEach(c => { c.classList.toggle('is-active', c === b); c.setAttribute('aria-pressed', c === b); });
});

// Diálogo simple para "Nueva ruta" y "Publicar novedad"
const dlg = document.getElementById('dlg');
document.querySelectorAll('[data-dialog]').forEach(b => b.addEventListener('click', () => {
  document.getElementById('dlg-title').textContent = b.dataset.dialog;
  document.getElementById('dlg-field').placeholder = b.dataset.field;
  document.getElementById('dlg-field').setAttribute('aria-label', b.dataset.field);
  dlg.showModal();
}));
