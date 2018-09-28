FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/carrier-listing-service
WORKDIR /usr/src/carrier-listing-service

# Install app dependencies
COPY package.json /usr/src/carrier-listing-service
RUN npm install

# Bundle app source
COPY . /usr/src/carrier-listing-service

EXPOSE 8088
CMD [ "npm", "start" ]