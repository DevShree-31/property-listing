FROM node:22

WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install ALL dependencies, including devDependencies
RUN npm install

# Copy rest of the source code
COPY . .

# Compile TypeScript
RUN npx tsc
RUN npx tsc --version


CMD ["node", "dist/server.js"]
