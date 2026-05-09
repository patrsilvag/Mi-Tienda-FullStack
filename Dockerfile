# ==========================================
# Etapa 1: Construcción (Build) con Node.js
# ==========================================
FROM node:20 AS build

WORKDIR /app

# Copiamos primero los archivos de dependencias para aprovechar la caché de Docker
COPY package*.json ./

# Instalamos las dependencias
RUN npm install --legacy-peer-deps

# Copiamos el resto del código fuente
COPY . .

# Compilamos la aplicación para producción
RUN npm run build -- --configuration production

# ==========================================
# Etapa 2: Servidor Web con Nginx
# ==========================================
FROM nginx:alpine

# ¡Importante! Copiamos los archivos generados al directorio de Nginx.
# La ruta refleja el nombre exacto de tu proyecto actual.
COPY --from=build /app/dist/front-tienda-pedidos/browser /usr/share/nginx/html

# Exponemos el puerto 80 dentro del contenedor
EXPOSE 80

# Arrancamos Nginx
CMD ["nginx", "-g", "daemon off;"]