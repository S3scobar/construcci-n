/* =============================================
   CONSTRUCCIÓN · FACULTAD DE ARQUITECTURA
   MÓDULO INICIO — ARQUITECTURA, INGENIERÍA Y EDIFICACIÓN
   "El Plano que se Construye": Trazado de ejes, cotas de nivel
   y montaje de elementos estructurales al hacer scroll.
   ============================================= */

const ICONOS_ARQ = {
  // Estructuras y sistemas constructivos
  estructura: '<path d="M3 21h18M5 21V5l7-3 7 3v16M9 9h1M14 9h1M9 13h1M14 13h1M9 17h1M14 17h1M9 21v-4h6v4"/>',
  // Modelado BIM y gestión
  bim: '<path d="m12 3-8 4.5v9L12 21l8-4.5v-9L12 3zM12 12 4 7.5M12 12v9M12 12l8-4.5"/>',
  // Materiales y laboratorio
  materiales: '<rect width="18" height="18" x="3" y="3" rx="3"/><path d="M3 9h18M9 21V9M15 21V9M3 15h18"/>',
  // Hábitat y territorio
  habitat: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10"/>',
  // Sostenibilidad bioclimática
  sostenible: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 21 2c-1 4.5-1.5 6-2.6 11.7A7 7 0 0 1 11 20zM2 21c0-4 3.5-7 7.5-7"/>',
  // Obra y ejecución
  obra: '<path d="M2 22h20M4 22V11l4-4 4 4v11M12 14h8v8M18 5l-2-2-2 2M16 3v5"/>',
  // Calidad e interventoría
  interventoria: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  // Patología y peritaje
  patologia: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  // Vocería y liderazgo
  voceria: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>',
  // Laboratorio técnico
  laboratorio: '<path d="M10 2v7.5a2 2 0 0 1-.2.9L4.7 20.5A1 1 0 0 0 5.6 22h12.8a1 1 0 0 0 .9-1.5l-5.1-10.1a2 2 0 0 1-.2-.9V2"/><path d="M8.5 2h7M7 16h10"/>',
  // Documentación y biblioteca
  libro: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/>',
  // Verificación técnica
  check: '<polyline points="20 6 9 17 4 12"/>',
  // Director / Investigador
  usuario: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  // Economía circular y ciclo de vida
  circular: '<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/>'
};

const svgIcono = (nombre, size = 22) => `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="${size}" height="${size}" aria-hidden="true">
    ${ICONOS_ARQ[nombre] || ICONOS_ARQ.estructura}
  </svg>
`;

const ICONO_SELLO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.5-8"/><path d="m9.5 9 1.8 1.8L15 7.2"/></svg>';


/* ---------- 1. Animación de Conteo de Cifras (Estación Total) ---------- */

function animarCifras() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const elementos = $$('#portada-cifras li');
  elementos.forEach((li) => {
    const small = li.querySelector('small');
    if (!small) return;
    const textoCompleto = li.textContent.replace(small.textContent, '').trim();
    const numero = parseInt(textoCompleto.replace(/\D/g, ''), 10);
    if (isNaN(numero) || numero <= 0) return;

    const tieneSufijo = textoCompleto.includes('+') ? '+' : '';
    const duracion = 1200;
    const inicio = performance.now();

    function actualizar(ahora) {
      const transcurrido = ahora - inicio;
      const progreso = Math.min(transcurrido / duracion, 1);
      const facilidad = progreso === 1 ? 1 : 1 - Math.pow(2, -10 * progreso);
      const actual = Math.floor(facilidad * numero);

      const nodoTexto = Array.from(li.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
      if (nodoTexto) {
        nodoTexto.textContent = `${actual}${progreso === 1 ? tieneSufijo : ''} `;
      }

      if (progreso < 1) {
        requestAnimationFrame(actualizar);
      }
    }
    requestAnimationFrame(actualizar);
  });
}


/* ---------- 2. Observador de Plano y Construcción en Scroll ---------- */

let observadorPlano = null;

function observarPlanoConstruccion() {
  const elementos = $$('.plano-construir:not(.plano-construido)');
  if (!elementos.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    elementos.forEach(el => el.classList.add('plano-construido'));
    return;
  }

  if (!observadorPlano) {
    observadorPlano = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('plano-construido');
          observadorPlano.unobserve(entrada.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.12
    });
  }

  elementos.forEach(el => observadorPlano.observe(el));
}


/* ---------- 3. Programa y Especificaciones ---------- */

function pintarPrograma(p) {
  // Cifras en la portada (modular architectural cards)
  const cifrasWrap = $('#portada-cifras');
  if (cifrasWrap) {
    cifrasWrap.innerHTML = p.cifras
      .map((c) => `<li class="cifra-plano">${esc(c.valor)}<small>${esc(c.texto)}</small></li>`)
      .join('');
    animarCifras();
  }

  const acreditacion = p.acreditacion;
  const contenido = $('#programa-contenido');
  if (!contenido) return;

  contenido.innerHTML = `
    <!-- EJE ESTRUCTURAL 01 · FUNDAMENTACIÓN -->
    <div class="cota-eje plano-construir">
      <span class="cota-eje__marca">01</span>
      <span class="cota-eje__linea"></span>
      <span class="cota-eje__nivel">▲ N.P.T. +3.50m</span>
      <span class="cota-eje__linea"></span>
      <span class="cota-eje__marca">EJE A</span>
    </div>

    <!-- ENCABEZADO DE LA SECCIÓN -->
    <div class="seccion-titulo plano-construir">
      <h2 id="programa-titulo">Definición y Enfoque del Pregrado</h2>
      <p class="seccion-titulo__intro">
        Formación integral en ciencias de la ingeniería, sensibilidad del diseño arquitectónico, gestión estratégica y tecnología de la edificación y el hábitat.
      </p>
    </div>

    <!-- TABLERO TÉCNICO: DESCRIPCIÓN Y ESPECIFICACIONES DE OBRA -->
    <div class="tablero-obra">
      <!-- COLUMNA IZQUIERDA: IDENTIDAD Y VISIÓN -->
      <div class="tablero-obra__col-identidad plano-construir">
        <div class="tablero-obra__tarjeta-vision plano-bloque">
          <div class="tablero-obra__badge-arquitectura">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            <span>Escuela de Construcción · Área Curricular de Construcción y Hábitat</span>
          </div>

          <div class="tablero-obra__parrafos">
            ${p.descripcion.map((parrafo) => `<p>${esc(parrafo)}</p>`).join('')}
          </div>
        </div>
      </div>

      <!-- COLUMNA DERECHA: ESPECIFICACIONES CLAVE -->
      <div class="tablero-obra__col-ficha plano-construir">
        <div class="ficha-especificaciones plano-bloque">
          <div class="ficha-especificaciones__cabecera">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
            <h3>Matriz Académica y Registro</h3>
          </div>
          <ul class="ficha-especificaciones__lista">
            ${p.ficha.filter((f) => !['Créditos del plan', 'Duración del plan', 'Modalidad', 'Jornada', 'Código SNIES'].includes(f.etiqueta)).map((f) => `
              <li class="ficha-especificaciones__item">
                <span class="ficha-especificaciones__clave">${esc(f.etiqueta)}</span>
                <span class="ficha-especificaciones__valor">${esc(f.valor)}</span>
              </li>`).join('')}
          </ul>
        </div>
      </div>
    </div>

    <!-- RUTAS CURRICULARES OFICIALES -->
    <div class="rutas-curriculares" id="rutas-curriculares">
      <!-- EJE ESTRUCTURAL 02 · TRAYECTORIAS -->
      <div class="cota-eje plano-construir">
        <span class="cota-eje__marca">02</span>
        <span class="cota-eje__linea"></span>
        <span class="cota-eje__nivel">▲ N.P.T. +7.00m</span>
        <span class="cota-eje__linea"></span>
        <span class="cota-eje__marca">EJE B</span>
      </div>

      <div class="seccion-titulo seccion-titulo--rutas plano-construir">
        <h3 class="rutas__titulo">Cinco Rutas Curriculares de Énfasis</h3>
        <p class="seccion-titulo__intro">
          Trayectorias optativas del plan de estudios (Acuerdo 002 de 2022 del Consejo de Facultad):
        </p>
      </div>

      <div class="rutas__bento">
        ${(p.rutas || []).map((ruta, idx) => {
          let iconoTipo = 'estructura';
          let claseExtra = 'ruta-bento--secundaria';
          if (idx === 0) {
            iconoTipo = 'estructura';
            claseExtra = 'ruta-bento--principal';
          } else if (ruta.id.includes('gestion')) {
            iconoTipo = 'bim';
            claseExtra = 'ruta-bento--gestion';
          } else if (ruta.id.includes('materiales')) {
            iconoTipo = 'materiales';
            claseExtra = 'ruta-bento--materiales';
          } else if (ruta.id.includes('habitat')) {
            iconoTipo = 'habitat';
            claseExtra = 'ruta-bento--habitat';
          } else if (ruta.id.includes('sostenible')) {
            iconoTipo = 'sostenible';
            claseExtra = 'ruta-bento--sostenible';
          }

          const num = `0${idx + 1}`;

          return `
            <article class="ruta-bento ${claseExtra} plano-bloque plano-construir" id="ruta-${esc(ruta.id)}">
              <span class="ruta-bento__watermark" aria-hidden="true">${num}</span>
              
              <div class="ruta-bento__top">
                <span class="ruta-bento__badge">${esc(ruta.codigo || `RUTA · ${num}`)}</span>
                <span class="ruta-bento__icono">${svgIcono(iconoTipo, 18)}</span>
              </div>

              <h4 class="ruta-bento__nombre">${esc(ruta.nombre)}</h4>
              <p class="ruta-bento__descripcion">${esc(ruta.descripcion)}</p>

              ${ruta.tags && ruta.tags.length ? `
              <div class="ruta-bento__tags" aria-label="Temáticas clave">
                ${ruta.tags.slice(0, 3).map(tag => `<span class="ruta-tag">${esc(tag)}</span>`).join('')}
              </div>` : ''}

              <div class="ruta-bento__pie">
                <a href="malla.html" class="ruta-bento__cta" title="Ver asignaturas de esta ruta en la malla">
                  <span>Ver asignaturas</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </a>
              </div>
            </article>`;
        }).join('')}
      </div>
    </div>

    <!-- CERTIFICACIÓN Y ACREDITACIÓN DE CALIDAD -->
    <div class="acreditacion plano-bloque plano-construir">
      <div class="acreditacion__cabecera">
        <span class="acreditacion__sello-icono">${ICONO_SELLO}</span>
        <div>
          <span class="acreditacion__antetitulo">Facultad de Arquitectura · Sede Medellín</span>
          <h3 class="acreditacion__estado">${esc(acreditacion.estado)}</h3>
        </div>
      </div>
      <div class="acreditacion__rejilla">
        ${acreditacion.hitos.map((h, i) => `
          <div class="acreditacion__tarjeta ${String(h.anio).toLowerCase().includes('acredit') ? 'acreditacion__tarjeta--renovacion' : ''}">
            <div class="acreditacion__tarjeta-encabezado">
              <span class="acreditacion__anio-badge">${esc(h.anio)}</span>
              <span class="acreditacion__hito-tipo">${i === 0 ? 'Pioneros en Colombia' : 'Acreditación de Alta Calidad'}</span>
            </div>
            <p class="acreditacion__texto">${esc(h.texto)}</p>
          </div>`).join('')}
      </div>
      <div class="acreditacion__pie">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="acreditacion__info-icono" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        <p class="acreditacion__nota">${esc(acreditacion.nota)}</p>
      </div>
    </div>

    <p class="fuentes plano-construir">Fuentes oficiales:
      ${p.fuentes.map((f) => `<a href="${esc(f.url)}" target="_blank" rel="noopener">${esc(f.titulo)}</a>`).join(' · ')}
    </p>`;

  if (p.fortalezas) {
    pintarFortalezas(p.fortalezas);
  }

  observarPlanoConstruccion();
}


/* ---------- 4. Fortalezas Exclusivas del Pregrado ---------- */

function pintarFortalezas(fortalezas) {
  const contenido = $('#fortalezas-contenido');
  if (!contenido || !fortalezas) return;

  const lab = fortalezas.find(f => f.id === 'laboratorio-construccion') || fortalezas[0];
  const hab = fortalezas.find(f => f.id === 'escuela-habitat') || fortalezas[1];

  contenido.innerHTML = `
    <!-- EJE ESTRUCTURAL 03 · FORTALEZAS Y DIFERENCIALES EXCLUSIVOS -->
    <div class="cota-eje plano-construir">
      <span class="cota-eje__marca">03</span>
      <span class="cota-eje__linea"></span>
      <span class="cota-eje__nivel">▲ N.P.T. +10.50m</span>
      <span class="cota-eje__linea"></span>
      <span class="cota-eje__marca">EJE C</span>
    </div>

    <!-- ENCABEZADO DE LA SECCIÓN -->
    <div class="seccion-titulo plano-construir">
      <div class="cajetin-proyecto cajetin-proyecto--sub">
        <span>EXCLUSIVIDAD Y LIDERAZGO · FACULTAD DE ARQUITECTURA</span>
      </div>
      <h2 id="fortalezas-titulo">Grandes Fortalezas del Pregrado</h2>
      <p class="seccion-titulo__intro">
        En Colombia solo 6 universidades ofrecen el pregrado en Construcción. En la UNAL Medellín contamos con infraestructura especializada propia y un centro de pensamiento del hábitat que marcan un estándar único en el país.
      </p>
    </div>

    <!-- REJILLA DE LAS 2 GRANDES FORTALEZAS (CARDS DESPLEGABLES) -->
    <div class="fortalezas-grid">

      <!-- FORTALEZA 1: LABORATORIO DE CONSTRUCCIÓN (BLOQUE 25) -->
      <article class="fortaleza-card fortaleza-card--laboratorio plano-bloque plano-construir" id="fortaleza-lab">
        <span class="mira-plano mira-plano--tl" aria-hidden="true"></span>
        <span class="mira-plano mira-plano--tr" aria-hidden="true"></span>
        <span class="mira-plano mira-plano--bl" aria-hidden="true"></span>
        <span class="mira-plano mira-plano--br" aria-hidden="true"></span>

        <!-- VISTA RESUMIDA SIEMPRE VISIBLE -->
        <div class="fortaleza-card__resumen">
          <div class="fortaleza-card__cabeza">
            <div class="fortaleza-card__tags">
              <span class="fortaleza-badge fortaleza-badge--lab">${svgIcono('laboratorio', 16)} ${esc(lab.badge)}</span>
              <span class="fortaleza-sello">${esc(lab.sello)}</span>
            </div>
            <div class="fortaleza-card__icono-box">
              ${svgIcono('materiales', 28)}
            </div>
          </div>

          <div class="fortaleza-stat">
            <div class="fortaleza-stat__cifra">
              <span class="fortaleza-stat__num">1</span>
              <span class="fortaleza-stat__den">de 6</span>
            </div>
            <div class="fortaleza-stat__info">
              <strong class="fortaleza-stat__resaltado">Únicos en Colombia con laboratorio propio de la carrera</strong>
              <p class="fortaleza-stat__bajada">De las 6 universidades que ofrecen la carrera en el país, solo la UNAL dispone de este espacio exclusivo para formación e investigación.</p>
            </div>
          </div>

          <div class="fortaleza-card__titulares">
            <h3 class="fortaleza-card__titulo">${esc(lab.titulo)}</h3>
            <p class="fortaleza-card__ubicacion">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              ${esc(lab.ubicacion)}
            </p>
          </div>
        </div>

        <!-- BOTÓN DESPLEGABLE -->
        <button type="button" class="fortaleza-card__toggle" aria-expanded="false" aria-controls="fortaleza-detalles-lab" id="btn-toggle-lab">
          <span class="fortaleza-card__toggle-texto">Ver capacidades y equipamiento</span>
          <span class="fortaleza-card__toggle-icono" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="m6 9 6 6 6-6"/></svg>
          </span>
        </button>

        <!-- PANEL DESPLEGABLE CON ANIMACIÓN -->
        <div class="fortaleza-card__desplegable" id="fortaleza-detalles-lab" role="region" aria-labelledby="btn-toggle-lab">
          <div class="fortaleza-card__desplegable-interior">
            <p class="fortaleza-card__destacado">
              ${esc(lab.destacado)}
            </p>

            <p class="fortaleza-card__descripcion">
              ${esc(lab.descripcion)}
            </p>

            <div class="fortaleza-card__chips" aria-label="Capacidades del laboratorio">
              ${(lab.puntos || []).map(p => `
                <span class="fortaleza-chip">
                  ${svgIcono('check', 13)}
                  <span>${esc(p)}</span>
                </span>`).join('')}
            </div>

            <div class="fortaleza-card__pie">
              <a href="${esc(lab.enlace.url)}" target="_blank" rel="noopener noreferrer" class="boton-fortaleza">
                <span>Explorar Laboratorio de Construcción (Bloque 25)</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
          </div>
        </div>
      </article>

      <!-- FORTALEZA 2: ESCUELA DEL HÁBITAT Y UNIDAD DE DOCUMENTACIÓN -->
      <article class="fortaleza-card fortaleza-card--habitat plano-bloque plano-construir" id="fortaleza-hab">
        <span class="mira-plano mira-plano--tl" aria-hidden="true"></span>
        <span class="mira-plano mira-plano--tr" aria-hidden="true"></span>
        <span class="mira-plano mira-plano--bl" aria-hidden="true"></span>
        <span class="mira-plano mira-plano--br" aria-hidden="true"></span>

        <!-- VISTA RESUMIDA SIEMPRE VISIBLE -->
        <div class="fortaleza-card__resumen">
          <div class="fortaleza-card__cabeza">
            <div class="fortaleza-card__tags">
              <span class="fortaleza-badge fortaleza-badge--hab">${svgIcono('habitat', 16)} ${esc(hab.badge)}</span>
              <span class="fortaleza-sello fortaleza-sello--verde">${esc(hab.sello)}</span>
            </div>
            <div class="fortaleza-card__icono-box fortaleza-card__icono-box--hab">
              ${svgIcono('libro', 28)}
            </div>
          </div>

          <div class="fortaleza-stat fortaleza-stat--hab">
            <div class="fortaleza-stat__cifra">
              <span class="fortaleza-stat__num">ÚNICA</span>
            </div>
            <div class="fortaleza-stat__info">
              <strong class="fortaleza-stat__resaltado">Unidad de Documentación única en la ciudad</strong>
              <p class="fortaleza-stat__bajada">Acervo bibliográfico e investigativo de vanguardia en vivienda, hábitat popular y territorio.</p>
            </div>
          </div>

          <div class="fortaleza-card__titulares">
            <h3 class="fortaleza-card__titulo">${esc(hab.titulo)}</h3>
            <p class="fortaleza-card__ubicacion">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              ${esc(hab.ubicacion)}
            </p>
          </div>
        </div>

        <!-- BOTÓN DESPLEGABLE -->
        <button type="button" class="fortaleza-card__toggle fortaleza-card__toggle--hab" aria-expanded="false" aria-controls="fortaleza-detalles-hab" id="btn-toggle-hab">
          <span class="fortaleza-card__toggle-texto">Ver los 5 pilares e investigación</span>
          <span class="fortaleza-card__toggle-icono" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="m6 9 6 6 6-6"/></svg>
          </span>
        </button>

        <!-- PANEL DESPLEGABLE CON ANIMACIÓN -->
        <div class="fortaleza-card__desplegable" id="fortaleza-detalles-hab" role="region" aria-labelledby="btn-toggle-hab">
          <div class="fortaleza-card__desplegable-interior">
            <p class="fortaleza-card__destacado">
              ${esc(hab.destacado)}
            </p>

            <div class="fortaleza-pilares">
              <h4 class="fortaleza-pilares__titulo">Por qué la Escuela del Hábitat es un referente destacado:</h4>
              <ul class="fortaleza-pilares__lista">
                ${(hab.pilares || []).map((pil, idx) => `
                  <li class="fortaleza-pilar-item">
                    <span class="fortaleza-pilar-num">0${idx + 1}</span>
                    <div class="fortaleza-pilar-contenido">
                      <strong class="fortaleza-pilar-nombre">${esc(pil.titulo)}:</strong>
                      <span class="fortaleza-pilar-detalle">${esc(pil.detalle)}</span>
                    </div>
                  </li>`).join('')}
              </ul>
            </div>

            <div class="fortaleza-card__pie">
              <a href="${esc(hab.enlace.url)}" target="_blank" rel="noopener noreferrer" class="boton-fortaleza boton-fortaleza--hab">
                <span>Conoce la Escuela del Hábitat</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
          </div>
        </div>
      </article>

    </div>
  `;

  // Interacción de desplegar / contraer cards
  contenido.querySelectorAll('.fortaleza-card__toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.fortaleza-card');
      if (!card) return;
      const estaAbierta = card.classList.contains('is-abierta');
      card.classList.toggle('is-abierta', !estaAbierta);
      btn.setAttribute('aria-expanded', !estaAbierta);

      const textoSpan = btn.querySelector('.fortaleza-card__toggle-texto');
      if (textoSpan) {
        if (!estaAbierta) {
          btn.dataset.textoCerrado = textoSpan.textContent;
          textoSpan.textContent = 'Ocultar detalles';
        } else {
          textoSpan.textContent = btn.dataset.textoCerrado || 'Ver más detalles';
        }
      }
    });
  });

  observarPlanoConstruccion();
}


/* ---------- 5. Perfil del Egresado ---------- */

function pintarPerfil(perfil) {
  const contenido = $('#perfil-contenido');
  if (!contenido) return;

  const camposAccion = [
    { rol: 'DIRECCIÓN DE OBRA Y RESIDENCIA', icono: 'obra' },
    { rol: 'COORDINACIÓN BIM Y PLANIFICACIÓN', icono: 'bim' },
    { rol: 'CONTROL FINANCIERO E INTERVENTORÍA', icono: 'interventoria' },
    { rol: 'LABORATORIO, PATOLOGÍA Y REHABILITACIÓN', icono: 'patologia' }
  ];

  contenido.innerHTML = `
    <!-- EJE ESTRUCTURAL 04 · COMPETENCIAS -->
    <div class="cota-eje plano-construir">
      <span class="cota-eje__marca">04</span>
      <span class="cota-eje__linea"></span>
      <span class="cota-eje__nivel">▲ N.P.T. +14.00m</span>
      <span class="cota-eje__linea"></span>
      <span class="cota-eje__marca">EJE D</span>
    </div>

    <div class="seccion-titulo plano-construir">
      <div class="cajetin-proyecto cajetin-proyecto--sub">
        <span>CAMPO OCUPACIONAL · TÍTULO ARQUITECTO(A) CONSTRUCTOR(A)</span>
      </div>
      <h2 id="perfil-titulo">${esc(perfil.titulo)}</h2>
      <p class="seccion-titulo__intro">${esc(perfil.intro)}</p>
    </div>

    <div class="perfil__rejilla-profesional">
      ${perfil.rasgos.map((r, idx) => {
        const campo = camposAccion[idx] || { rol: 'COMPETENCIA PROFESIONAL', icono: 'estructura' };
        return `
          <div class="rasgo-profesional plano-bloque plano-construir">
            <div class="rasgo-profesional__cabecera">
              <span class="rasgo-profesional__tag">${esc(campo.rol)}</span>
              <span class="rasgo-profesional__icono">${svgIcono(campo.icono, 24)}</span>
            </div>
            <h3 class="rasgo-profesional__titulo">${esc(r.titulo)}</h3>
            <p class="rasgo-profesional__texto">${esc(r.texto)}</p>
            <div class="rasgo-profesional__cota">
              <span class="rasgo-profesional__cota-linea"></span>
              <span class="rasgo-profesional__cota-punto"></span>
            </div>
          </div>`;
      }).join('')}
    </div>
    <p class="perfil__fuente plano-construir">${esc(perfil.fuente)}</p>`;

  observarPlanoConstruccion();
}


/* ---------- 6. Grupos de Investigación y Semilleros ---------- */

function pintarGrupos(grupos) {
  const contenido = $('#grupos-contenido');
  if (!contenido) return;

  const semilleros = grupos.filter(g => !g.id.includes('representacion'));

  const ICONOS_GRUPO = {
    'construccion-y-ciencia': 'obra',
    'sigcon': 'interventoria',
    'grinco': 'laboratorio',
    'sicc': 'circular'
  };

  const semillerosCards = semilleros.map((grupo) => {
    const ico = ICONOS_GRUPO[grupo.id] || 'materiales';
    return `
      <article class="grupo-card plano-bloque plano-construir" id="grupo-${esc(grupo.id)}" style="--color-grupo: ${esc(grupo.color)}">
        <div class="grupo-card__header">
          <div class="grupo-card__emblema">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="26" height="26" aria-hidden="true">
              ${ICONOS_ARQ[ico] || ICONOS_ARQ.materiales}
            </svg>
          </div>
          <div class="grupo-card__titulos">
            <div class="grupo-card__tags-top">
              <span class="grupo-card__tipo">${esc(grupo.tipo)}</span>
              ${grupo.subtipo ? `<span class="grupo-card__subtipo">${esc(grupo.subtipo)}</span>` : ''}
            </div>
            <h3 class="grupo-card__nombre">${esc(grupo.nombre)}</h3>
          </div>
        </div>

        ${grupo.director ? `
          <div class="grupo-card__director">
            ${svgIcono('usuario', 15)}
            <span><strong>Director:</strong> ${esc(grupo.director)}</span>
          </div>` : ''}

        <p class="grupo-card__descripcion">${esc(grupo.descripcion)}</p>

        ${grupo.lineas && grupo.lineas.length ? `
          <div class="grupo-card__lineas-box">
            <span class="grupo-card__lineas-label">Líneas y temas de trabajo:</span>
            <ul class="grupo-card__lineas">
              ${grupo.lineas.map(l => `
                <li class="grupo-card__linea-item">
                  <span class="grupo-card__bullet" aria-hidden="true">${svgIcono('check', 12)}</span>
                  <span>${esc(l)}</span>
                </li>`).join('')}
            </ul>
          </div>` : ''}

        <div class="grupo-card__acciones">
          ${grupo.email ? `
            <a href="mailto:${esc(grupo.email)}" class="grupo-card__btn grupo-card__btn--correo" title="Enviar correo de contacto">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span>Contacto</span>
            </a>` : ''}
          ${grupo.enlace ? `
            <a href="${esc(grupo.enlace)}" target="_blank" rel="noopener noreferrer" class="grupo-card__btn grupo-card__btn--enlace" title="Abrir ficha en Hermes o sitio web">
              <span>${esc(grupo.enlaceTexto || 'Consultar')}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>` : ''}
        </div>
      </article>`;
  }).join('');

  contenido.innerHTML = `
    <!-- EJE ESTRUCTURAL 05 · LÍNEAS EXPERIMENTALES -->
    <div class="cota-eje cota-eje--oscuro plano-construir">
      <span class="cota-eje__marca">05</span>
      <span class="cota-eje__linea"></span>
      <span class="cota-eje__nivel">▲ N.P.T. +17.50m</span>
      <span class="cota-eje__linea"></span>
      <span class="cota-eje__marca">EJE E</span>
    </div>

    <div class="seccion-titulo seccion-titulo--comunidad plano-construir">
      <div class="cajetin-proyecto cajetin-proyecto--sub">
        <span>INVESTIGACIÓN Y DESARROLLO · FACULTAD DE ARQUITECTURA</span>
      </div>
      <h2 id="grupos-titulo">Grupos de Investigación y Semilleros</h2>
      <p class="seccion-titulo__intro">
        Líneas experimentales y proyectos científicos en patología edilicia, innovación en materiales de construcción y hábitat sostenible.
      </p>
    </div>

    <!-- SEMILLEROS Y GRUPOS DE INVESTIGACIÓN -->
    <div class="semilleros-grid">
      ${semillerosCards}
    </div>`;

  observarPlanoConstruccion();
}


/* ---------- 7. Inicialización y Carga Modular ---------- */

const SECCIONES = {
  perfil: () => cargarDatos('perfil').then(pintarPerfil),
  grupos: () => cargarDatos('grupos').then(pintarGrupos),
};

function cargarSeccion(seccion) {
  const cargar = SECCIONES[seccion.dataset.carga];
  if (cargar) {
    cargar().catch((error) => mostrarErrorDeCarga(seccion.querySelector('.contenedor'), error));
  }
}

// Cargar programa inmediatamente
cargarDatos('programa')
  .then((p) => {
    pintarPrograma(p);
    if (p.fortalezas) pintarFortalezas(p.fortalezas);
  })
  .catch((error) => {
    mostrarErrorDeCarga($('#programa-contenido'), error);
    mostrarErrorDeCarga($('#fortalezas-contenido'), error);
  });

// Carga perezosa con IntersectionObserver
const porCargar = $$('[data-carga]');
if ('IntersectionObserver' in window) {
  const vigilante = new IntersectionObserver((entradas) => {
    entradas.filter((e) => e.isIntersecting).forEach((e) => {
      vigilante.unobserve(e.target);
      cargarSeccion(e.target);
    });
  }, { rootMargin: '300px 0px' });
  porCargar.forEach((seccion) => vigilante.observe(seccion));
} else {
  porCargar.forEach(cargarSeccion);
}

