FROM node:16.3.0-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the application will run on
EXPOSE 5000

# Start the application in development mode
CMD ["npm", "run", "dev"]

# Start the application
# CMD ["npm", "start"]
