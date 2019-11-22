# base image
FROM node:latest

COPY package.json /app/
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
RUN npm install
RUN npm install --only=dev
RUN npm audit fix

COPY . /app

CMD ["npm", "run", "dev"]
