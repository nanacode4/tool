# frontend/Dockerfile

# Build Stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage - copy to Nginx
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
