# ==========================================
# Etapa 1: Construcción (Build) con Node.js
# ==========================================
FROM node:20 AS build

WORKDIR /app

# Aprovechamos la caché para las dependencias
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copiamos el código fuente y compilamos
COPY . .
RUN npm run build -- --configuration production

# ==========================================
# Etapa 2: Servidor Web con Nginx
# ==========================================
FROM nginx:alpine

# 1. Limpiamos la configuración y archivos por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*
RUN rm /etc/nginx/conf.d/default.conf

# 2. Copiamos nuestra configuración interna para el ruteo de Angular
COPY nginx-internal.conf /etc/nginx/conf.d/default.conf

# 3. Copiamos los archivos generados (ajustado según tu angular.json)
COPY --from=build /app/dist/front-tienda-pedidos/browser/. /usr/share/nginx/html/

# Aseguramos que Nginx tenga permisos de lectura
RUN chmod -R 755 /usr/share/nginx/html

# Exponemos el puerto 80 interno
EXPOSE 80

# Arrancamos Nginx
CMD ["nginx", "-g", "daemon off;"]