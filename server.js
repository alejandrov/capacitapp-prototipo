import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';
import serveStatic from 'serve-static';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Habilitar compresión gzip
app.use(compression());

// Servir archivos estáticos desde la carpeta dist
app.use(serveStatic(path.join(__dirname, 'dist')));

// Todas las solicitudes no manejadas por serveStatic se redirigen a index.html
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});