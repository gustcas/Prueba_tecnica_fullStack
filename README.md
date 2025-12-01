# Prueba Técnica Fullstack – Angular + Ionic + Express + Firebase + MySQL

## 1. Requerimientos

- Node.js 24 LTS
- npm 11 (incluido con Node 24)
- Angular CLI 19: `npm install -g @angular/cli@19`
- Ionic CLI: `npm install -g @ionic/cli`
- MySQL 8.4 LTS
- VS Code (recomendado)

## 2. Configuración de base de datos

1. Instalar MySQL 8.4.
2. Crear usuario `root` o configurar en `.env`.
3. Ejecutar:

```bash
mysql -u root -p < sql/schema.sql
