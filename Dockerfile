# Dockerfile
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --omit-dev \ 
    && npm cache clean --force

# Set environment variables
ENV NODE_ENV=production

# Copy app code
COPY . .

# Expose port and start the app
EXPOSE 8080
CMD ["npm", "start"]