FROM node:18-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package*.json ./

# Install production dependencies cleanly
RUN npm ci --only=production

# Copy all backend source code into container
COPY . .

# Expose backend API port
EXPOSE 5000

# Start Express server
CMD ["node", "server.js"]