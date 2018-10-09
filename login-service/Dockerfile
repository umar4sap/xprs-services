FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/xprs-login-service
WORKDIR /usr/src/xprs-login-service

# Install app dependencies
COPY package.json /usr/src/xprs-login-service/
RUN npm install

# Bundle app source
COPY . /usr/src/xprs-login-service

EXPOSE 7071
CMD [ "npm", "start" ]