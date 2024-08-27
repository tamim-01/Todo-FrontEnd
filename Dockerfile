FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install

# Copy the rest of the application code
COPY . .


# Build the application (if needed)
# RUN npm run build

# Expose the port
EXPOSE 3001


# Start the application
CMD ["npm", "start"]