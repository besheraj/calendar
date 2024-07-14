FROM node:18

EXPOSE 8100

RUN mkdir /app
WORKDIR /app
ADD package.json /app
ADD . /app
RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]