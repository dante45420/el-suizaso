# El Suizaso · Hostal en Gualliguaica

Sitio completamente estático: HTML semántico, CSS y JavaScript sin dependencias. Conserva la paleta crema, oliva y terracota y las familias Fraunces y Work Sans. Las fuentes se sirven localmente, con licencias OFL incluidas.

## Publicación

En Vercel, importa este repositorio con **Framework: Other**, sin comando de instalación ni de compilación. El directorio de salida es la raíz (`.`). `vercel.json` configura rutas limpias, caché de un día para assets y cabeceras básicas.

Para revisión local, abre `index.html` o ejecuta `python -m http.server 8080` desde esta carpeta.

## Al conectar el dominio

1. Agrega el dominio que controles en Vercel → proyecto → Settings → Domains y configura los registros DNS que indique Vercel. Elige una versión principal (con o sin www) y redirige la otra.
2. Ejecuta `python configurar-dominio.py https://tu-dominio.cl` y sube los cambios. Genera el canonical, `og:url`, URL del negocio, sitemap y referencia en robots. Usa el dominio real, nunca el ejemplo.
3. Verifica la propiedad del dominio en Google Search Console y envía `/sitemap.xml`. Solicita indexación de la portada.
4. Configura o actualiza Google Business Profile con nombre, teléfono y dirección consistentes con la web. Añade fotos reales, categoría correcta, ubicación verificada y solicita reseñas auténticas a huéspedes.

El contenido incluye título y descripción locales, encabezados, ubicación, preguntas frecuentes, metadatos sociales y JSON-LD de tipo Hostel. No se incluyen puntuaciones, reseñas, coordenadas ni dominios inventados. La posición en Google no se puede garantizar. No se han medido Core Web Vitals de campo ni puntuaciones Lighthouse.

## Contenido pendiente de confirmar con el hostal

Los precios son referenciales, como en el archivo original. Confirmar tarifas, capacidad de las habitaciones, disponibilidad tras la remodelación, dirección, teléfono y servicios. La web no cobra ni confirma reservas: abre una consulta de WhatsApp. No hay formulario que almacene información.

Las fotografías siguen pendientes. Se conserva una ilustración y se ofrece pedir fotos actuales. Para añadirlas: usar fotos propias autorizadas en AVIF/WebP, dimensiones explícitas, texto alternativo descriptivo y `loading="lazy"` salvo para la imagen principal. No sustituirlas por fotografías de otro alojamiento. Los enlaces ficticios de correo y redes fueron retirados.

## Accesibilidad y movimiento

Menú móvil con estado expandido y cierre por Escape, enlace para saltar al contenido, foco visible, etiquetas y validación nativa. Las animaciones usan IntersectionObserver y CSS y respetan `prefers-reduced-motion`. El contenido principal se puede leer sin JavaScript; el cotizador requiere JavaScript.

## Verificación

Se revisaron estructura HTML, IDs, anclas, sintaxis JS y JSON. Pruebas de lógica del cotizador: fechas vacías, pasadas e invertidas; cálculo por persona, habitación privada y pieza completa; rechazo de cantidades negativas o decimales; actualización de salida y codificación de WhatsApp. La revisión visual en navegador queda pendiente porque la herramienta de navegador exigida por el entorno no está disponible.


## Segunda propuesta visual

Disponible en `/propuesta`, con acceso «Nuestra propuesta» en el navbar original. Incluye carrusel automático con pausa, botones, teclado y gesto táctil; pestañas de panoramas; habitaciones desplegables y galería horizontal. Mantiene un solo CTA general de habitaciones y el cotizador por WhatsApp.

La propuesta tiene `noindex,follow` mientras se compara con la portada para evitar competir con contenido duplicado. Si se elige como portada, mover su contenido a index.html, actualizar canonical/robots y conservar las URLs principales. No se cambió el sitemap de producción para indexar un diseño de comparación.

Los 16 espacios «Poner foto» son marcadores, no fotografías del negocio. Priorizar: foto horizontal del entorno real, anfitriones recibiendo huéspedes, desayuno, habitación con luz natural, espacios comunes, quincho, acceso y actividades reales. Sustituir por AVIF/WebP con dimensiones y texto alternativo adecuados. Pedir autorización para usar imágenes reconocibles de huéspedes.

Mejoras recomendadas para la siguiente etapa: retratos reales de anfitriones y una bienvenida con sus nombres; capacidad y disponibilidad confirmadas de cada habitación; reseñas auténticas con fuente; guía breve con panoramas y tiempos verificados; ficha de Google Business Profile y dominio propio. No se publicaron reseñas, nombres, rutas ni horarios inventados.

La revisión estática y las pruebas de estado de las interacciones se ejecutaron; la revisión visual de esta segunda propuesta en navegador queda pendiente porque el entorno no ofrece su herramienta de navegador requerida.


## Carruseles y fotos de ejemplo

El hero avanza cada 5,5 segundos; servicios cada 2 segundos. Ambos se pausan mediante control explícito, al pasar el cursor, al recibir foco, en pestaña oculta o fuera del viewport. El movimiento reducido inicia en pausa. La franja de ocho servicios muestra hasta cuatro opciones en escritorio, dos en tablet y dos en móvil. Los iconos SVG son locales y de trazo fino.

El botón «Ver fotos de ejemplo» alterna con los marcadores. Las imágenes de Unsplash solo se solicitan tras activarlo; se sirven localmente y llevan aviso visible de que no son fotografías del hostal. Las fuentes se documentan en assets/referencias/FUENTES.txt.

Dominio elsuizaso.cl preparado en Vercel junto con www.elsuizaso.cl redirigido al dominio principal. Pendiente: DNS en NIC Chile y comprobación HTTPS. Canonical y sitemap mantienen el dominio vercel.app hasta verificar el nuevo dominio.


## Revisión móvil

assets/mobile.css y assets/mobile.js se comparten entre ambas versiones. Cabecera compacta con comparación en el menú móvil, zonas de toque ampliadas, textos legibles, galerías y pestañas horizontales, formularios en una columna en pantallas estrechas, opciones de habitación abreviadas y fechas con estado vacío explícito. La acción flotante se oculta al entrar el cotizador o pie de página al viewport y al editar campos. Safe areas de iPhone y fuente de 16px en inputs para evitar zoom automático. Se verifica lógica del menú y visibilidad del CTA en work/test-mobile.cjs (script de desarrollo fuera del sitio). Revisión visual en iPhone real pendiente por ausencia de la herramienta de navegador requerida en el entorno.

En pantallas táctiles, hover sintético y foco por toque no detienen el carrusel. El foco visible de teclado sigue pausando las presentaciones.

Panoramas: tres opciones visibles simultáneamente en móvil, con iconos (Descansar, Explorar y Compartir). Separación por fondos cálidos alternados y bordes sutiles. Se retiró el enlace intermedio a panoramas y se usó un título autocontenido.
