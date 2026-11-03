# Construcción · Facultad de Arquitectura · UNAL Medellín

Sitio web oficial interactivo para estudiantes y aspirantes del programa de **Construcción** (Título otorgado: *Arquitecto(a) Constructor(a)*) de la Facultad de Arquitectura, Universidad Nacional de Colombia - Sede Medellín.

El proyecto implementa la identidad visual oficial con la **Paleta 02 – Tierra y arquitectura + gris cemento** (`#4B4038`, `#805B46`, `#B28B6B`, `#D5BFA5`, `#EEE5D8`, `#65715B`, `#929493`), la malla curricular oficial completa de 180 créditos reglamentada por el Acuerdo 002 de 2022 del Consejo de Facultad de Arquitectura, rutas curriculares de profundización, representación estudiantil, semilleros y grupos de investigación (GIC, SIMC), convenios, sistema intercampus y guía de trámites ante la Secretaría de Facultad.

## Módulos y Páginas

| Página | Contenido |
| --- | --- |
| `index.html` | Información del programa (180 créditos, 10 semestres, SNIES 128, título Arquitecto Constructor, acreditación de alta calidad), perfil profesional del egresado, las 5 rutas curriculares, representación estudiantil (@construccionunal, Johana Andrea) y grupos/semilleros de investigación (GIC, SIMC) |
| `malla.html` | Malla curricular interactiva oficial de 180 créditos: trazado interactivo de prerrequisitos, semáforo de colores por componente (Fundamentación, Disciplinar, Optativas y Libre Elección), desglose por semestre y catálogo completo de asignaturas con filtros por agrupación y paginación |
| `intercampus.html` | Rutas intercampus (Robledo ➔ El Volador, El Volador ➔ Robledo, Río ➔ El Volador), cálculo de próxima salida en tiempo real, guía explicativa y láminas oficiales |
| `convenios.html` | Convenios institucionales UNAL (Coursera, MATLAB, Microsoft 365) y beneficios estudiantiles (Autodesk AutoCAD/Revit para arquitectura y construcción, GitHub Student Developer Pack, JetBrains, Spotify): lista interactiva y guías de activación |
| `info.html` | Guía estudiantil oficial y simulador SIA: cálculo y permanencia de P.A.P.A. (mínimo 3.00), bolsa de 180 créditos + 90 adicionales (270 totales), horas de corresponsabilidad (16-40h), nuevo modelo DNINFOA de 4 grupos de citaciones, trámites y solicitudes ante la Secretaría de la Facultad de Arquitectura y preguntas frecuentes |

## Arquitectura de Datos

Los datos viven en `data/` estructurados en formato JSON, desacoplados de la capa de presentación:

```
data/
  programa.json          Ficha del programa (180 créditos, SNIES 128, 5 rutas curriculares)
  perfil.json            Perfil profesional y ocupacional del Arquitecto(a) Constructor(a)
  grupos.json            Representación Estudiantil (@construccionunal) y grupos/semilleros (GIC, SIMC)
  intercampus.json       Rutas, franjas horarias y conexiones de movilidad universitaria
  convenios/
    indice.json          Catálogo resumido de convenios y licencias de software
    <id>.json            Guía paso a paso de activación por plataforma
  info.json              Guía del estudiante, P.A.P.A., bolsa SIA, corresponsabilidad, citas y trámites de Arquitectura
  malla/
    componentes.json     Componentes de formación oficial y agrupaciones (créditos exigidos)
    plan.json            Plan de estudios semestralizado (Semestres I al X, 180 créditos)
    asignaturas.json     Catálogo maestro de 87 asignaturas con créditos, códigos, agrupaciones y prerrequisitos
```

**Fuente de la malla curricular:** *Acuerdo 002 de 2022 del Consejo de Facultad de Arquitectura*, Universidad Nacional de Colombia - Sede Medellín.

## Visualización en Servidor Local

Dado que la información se consulta de manera asíncrona mediante `fetch()`, se requiere ejecutar el sitio a través de un servidor HTTP local:

```bash
# Con Node.js
npx serve .

# O con Python
python -m http.server 8000
# Abrir en el navegador: http://localhost:8000
```

## Créditos y Contacto

- **Representación Estudiantil de Construcción:** Johana Andrea · WhatsApp `(+57) 319 358 4740` · Instagram [@construccionunal](https://www.instagram.com/construccionunal/)
- **Desarrollo y Diseño Web:** Santiago Escobar Arias · Representante de Sistemas UNAL · WhatsApp `(+57) 312 377 2091` · `saescobara@unal.edu.co` · Instagram [@s_escobar__](https://www.instagram.com/s_escobar__/)
