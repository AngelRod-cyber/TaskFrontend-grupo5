# Etapa 1: Build
FROM node:18-alpine AS build
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Generar build de producción
RUN npm run build --prod

# Etapa 2: Servir la aplicación con nginx
FROM nginx:alpine
# Copiar el build generado al contenedor nginx
COPY --from=build /app/dist/task-manager /usr/share/nginx/html

# Exponer el puerto
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
