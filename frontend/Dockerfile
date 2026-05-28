# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json yarn.lock* package-lock.json* ./

# Install dependencies (skip optional packages that can't be fetched)
RUN yarn install --network-timeout 600000

# Copy source
COPY . .

# Build the app
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN yarn build || npm run build

# Stage 2: Serve with nginx
FROM nginx:1.27-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/app.conf.template

COPY --from=builder /app/build /usr/share/nginx/html

CMD ["/bin/sh", "-c", "envsubst '${PORT}' < /etc/nginx/conf.d/app.conf.template > /etc/nginx/conf.d/app.conf && nginx -g 'daemon off;'"]
