FROM node:20-alpine

WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application source code
COPY . .

# Expose server port
ENV PORT=8080
ENV NODE_ENV=production
EXPOSE 8080

# Start unified full-stack server
CMD ["node", "server/server.js"]
