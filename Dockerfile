# Use node official image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install --production

# Copy source code
COPY . .

# Build the app (transpile TS -> JS)
RUN npm run build

# Expose app port
EXPOSE 5000

# Start the app from the compiled JS
CMD ["node", "dist/main.js"]
