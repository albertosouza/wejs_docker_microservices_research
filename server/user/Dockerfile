FROM node:argon
# Install We.js CLI
RUN npm install we -g

# Mount API folder in docker
VOLUME  /usr/src/app
WORKDIR /usr/src/app

# EXPOSE 4001
CMD [ "npm", "start" ]
