"""Configura URLs de SEO una vez elegido y conectado el dominio final."""
from pathlib import Path
import sys,re,json
from urllib.parse import urlsplit
from xml.sax.saxutils import escape
base=sys.argv[1].rstrip('/') if len(sys.argv)>1 else ''
u=urlsplit(base)
if u.scheme!='https' or not u.hostname or u.path or u.query or u.fragment or u.username or u.port:
 raise SystemExit('Uso: python configurar-dominio.py https://tu-dominio.cl')
p=Path(__file__).resolve().parent
s=(p/'index.html').read_text()
s=re.sub(r'\n<!-- DOMAIN-SEO -->.*?<!-- /DOMAIN-SEO -->','',s,flags=re.S)
s=s.replace('</head>',f'\n<!-- DOMAIN-SEO --><link rel="canonical" href="{base}/"><meta property="og:url" content="{base}/"><!-- /DOMAIN-SEO -->\n</head>')
def update(m):
 data=json.loads(m[1]);data['url']=base+'/';data['@id']=base+'/#hostal'
 return '<script type="application/ld+json">'+json.dumps(data,ensure_ascii=False)+'</script>'
s=re.sub(r'<script type="application/ld\+json">(.*?)</script>',update,s,flags=re.S)
(p/'index.html').write_text(s)
(p/'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: '+base+'/sitemap.xml\n')
(p/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>'+escape(base)+'/</loc></url></urlset>\n')
print('Canonical, Open Graph, Hostel, sitemap y robots configurados:',base)
