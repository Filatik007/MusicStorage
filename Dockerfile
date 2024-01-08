FROM node:latest
COPY ./music/package*.json .
RUN npm install
COPY ./music .
CMD ["npm","run","music"]
