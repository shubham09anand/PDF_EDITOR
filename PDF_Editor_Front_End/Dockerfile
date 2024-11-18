# Use the official Node.js image
FROM node:latest

# Set the working directory inside the container
WORKDIR /appFrontend

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# copy the application code
COPY . .

# Expose the port on 3000
EXPOSE 3000

# command to run the app
CMD ["npm", "start"]
