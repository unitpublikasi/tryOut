# Stage 1: Build the React application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package configurations and install dependencies
COPY package*.json ./
RUN npm ci

# Copy full application code and compile
COPY . .
RUN npm run build

# Stage 2: Serve the compiled static assets using Nginx
FROM nginx:stable-alpine

# Copy custom built static files to Nginx public server directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose container port 80 for traffic ingress
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
