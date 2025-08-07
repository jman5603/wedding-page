# Stage 0 - Build Frontend Assets
FROM node:18-alpine AS build

WORKDIR /app
ARG REACT_APP_BACKEND_API_URL
ARG REACT_APP_STRIPE_PUBLISHABLE_KEY
COPY package*.json ./
RUN npm install
COPY . .
ENV REACT_APP_BACKEND_API_URL=$REACT_APP_BACKEND_API_URL
ENV REACT_APP_STRIPE_PUBLISHABLE_KEY=$REACT_APP_STRIPE_PUBLISHABLE_KEY
RUN npm run build

# Stage 1 - Serve Frontend Assets
FROM fholzer/nginx-brotli:v1.24.0

WORKDIR /etc/nginx
ADD nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 443
CMD ["-g", "daemon off;"]