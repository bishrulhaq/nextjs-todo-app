# Use the base image
FROM node:18.15.0-alpine

# Set the working directory inside the container
WORKDIR /usr/app

# Copy the entire current directory to the working directory in the container
COPY . .

# Install production dependencies using the package.json and package-lock.json files
RUN npm ci --only=production

# Run the build script defined in the package.json file
RUN npm run build

# Set the command to run when the container starts
CMD ["npm", "start"]