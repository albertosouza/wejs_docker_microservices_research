FROM node:argon
# Install We.js CLI
RUN npm install we -g

RUN ls /usr/src/

# Mount API folder in docker
VOLUME  /usr/src/app
WORKDIR /usr/src/app

RUN ls /usr/src/* -al

# EXPOSE 4001
CMD [ "npm", "start" ]
