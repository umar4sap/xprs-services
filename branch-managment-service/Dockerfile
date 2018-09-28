FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/xprs-branch-management-service
WORKDIR /usr/src/xprs-branch-management-service

# Install app dependencies
COPY package.json /usr/src/xprs-branch-management-service/
RUN npm install

# Bundle app source
COPY . /usr/src/xprs-branch-management-service

EXPOSE 8080
CMD [ "npm", "start" ]