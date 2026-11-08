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
