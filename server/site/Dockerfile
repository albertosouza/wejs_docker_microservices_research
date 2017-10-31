FROM node:slim

# Install Graphicsmagick
RUN apt-get update && apt-get install -y graphicsmagick

# Install We.js CLI and generators
RUN npm install -g --silent we yo generator-wejs

# Mount API folder in docker
WORKDIR /usr/src/app

CMD ["node", "app.js"]
