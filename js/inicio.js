/* =============================================
   CONSTRUCCIÓN · FACULTAD DE ARQUITECTURA
   MÓDULO INICIO — ARQUITECTURA, INGENIERÍA Y EDIFICACIÓN
   Pide sus propios datos: programa.json al abrir,
   perfil.json y grupos.json cuando la persona se acerca a esa sección.
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
  voceria: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>'
};

const svgIcono = (nombre, size = 22) => `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="${size}" height="${size}" aria-hidden="true">
    ${ICONOS_ARQ[nombre] || ICONOS_ARQ.estructura}
  </svg>
`;

const ICONO_SELLO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.5-8"/><path d="m9.5 9 1.8 1.8L15 7.2"/></svg>';


/* ---------- Programa ---------- */

function pintarPrograma(p) {
  // 1. Cifras en la portada (modular architectural cards)
  const cifrasWrap = $('#portada-cifras');
  if (cifrasWrap) {
    cifrasWrap.innerHTML = p.cifras
      .map((c) => `<li>${esc(c.valor)}<small>${esc(c.texto)}</small></li>`)
      .join('');
  }

  const acreditacion = p.acreditacion;
  const contenido = $('#programa-contenido');
  if (!contenido) return;

  contenido.innerHTML = `
    <!-- ENCABEZADO DE LA SECCIÓN -->
    <div class="seccion-titulo">
      <h2 id="programa-titulo">Definición y Enfoque del Pregrado</h2>
      <p class="seccion-titulo__intro">
        Formación integral en ciencias de la ingeniería, sensibilidad del diseño arquitectónico, gestión estratégica y tecnología de la edificación y el hábitat.
      </p>
    </div>

    <!-- TABLERO TÉCNICO: DESCRIPCIÓN Y ESPECIFICACIONES DE OBRA -->
    <div class="tablero-obra">
      <!-- COLUMNA IZQUIERDA: IDENTIDAD Y VISIÓN -->
      <div class="tablero-obra__col-identidad">
        <div class="tablero-obra__tarjeta-vision">
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
      <div class="tablero-obra__col-ficha">
        <div class="ficha-especificaciones">
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
      <div class="seccion-titulo seccion-titulo--rutas">
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
            <article class="ruta-bento ${claseExtra}" id="ruta-${esc(ruta.id)}">
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
    <div class="acreditacion">
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

    <p class="fuentes">Fuentes oficiales:
      ${p.fuentes.map((f) => `<a href="${esc(f.url)}" target="_blank" rel="noopener">${esc(f.titulo)}</a>`).join(' · ')}
    </p>`;
}


/* ---------- Perfil del egresado ---------- */

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
    <div class="seccion-titulo">
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
          <div class="rasgo-profesional">
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
    <p class="perfil__fuente">${esc(perfil.fuente)}</p>`;
}


/* ---------- Grupos de investigación y semilleros ---------- */

function pintarGrupos(grupos) {
  const contenido = $('#grupos-contenido');
  if (!contenido) return;

  // Filtrar exclusivamente los grupos y semilleros de investigación
  const semilleros = grupos.filter(g => !g.id.includes('representacion'));

  const semillerosCards = semilleros.map((grupo) => {
    const destino = grupo.enlace ? `href="${esc(grupo.enlace)}" target="_blank" rel="noopener noreferrer"` : '';
    let iconoTipo = 'materiales';
    if (grupo.id === 'gic') iconoTipo = 'estructura';
    else if (grupo.id.includes('ambiente') || grupo.id.includes('habitat')) iconoTipo = 'habitat';

    return `
      <article class="grupo-card" style="--color-grupo: ${esc(grupo.color)};">
        <div class="grupo-card__header">
          <div class="grupo-card__emblema">
            <span class="grupo-card__emblema-fondo"></span>
            <div class="grupo-card__emblema-icono">
              ${svgIcono(iconoTipo, 26)}
            </div>
          </div>
          <div class="grupo-card__titulos">
            <span class="grupo-card__tipo">${esc(grupo.tipo)}</span>
            <h4 class="grupo-card__nombre">${esc(grupo.nombre)}</h4>
          </div>
        </div>

        <p class="grupo-card__descripcion">${esc(grupo.descripcion || '')}</p>

        <div class="grupo-card__acciones">
          ${grupo.email ? `
            <a class="grupo-card__btn grupo-card__btn--correo" href="mailto:${esc(grupo.email)}" title="Escribir correo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span>${esc(grupo.email)}</span>
            </a>` : ''}
          ${destino ? `
            <a class="grupo-card__btn grupo-card__btn--enlace" ${destino} title="Ver detalles y convocatorias">
              <span>Sitio oficial ↗</span>
            </a>` : ''}
        </div>
      </article>`;
  }).join('');

  contenido.innerHTML = `
    <div class="seccion-titulo seccion-titulo--comunidad">
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
}


/* ---------- Carga por secciones ---------- */

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

cargarDatos('programa')
  .then(pintarPrograma)
  .catch((error) => mostrarErrorDeCarga($('#programa-contenido'), error));

const porCargar = $$('[data-carga]');
if ('IntersectionObserver' in window) {
  const vigilante = new IntersectionObserver((entradas) => {
    entradas.filter((e) => e.isIntersecting).forEach((e) => {
      vigilante.unobserve(e.target);
      cargarSeccion(e.target);
    });
  }, { rootMargin: '400px 0px' });
  porCargar.forEach((seccion) => vigilante.observe(seccion));
} else {
  porCargar.forEach(cargarSeccion);
}
