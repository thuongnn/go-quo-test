FROM node:10

WORKDIR /usr/src/app1

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080