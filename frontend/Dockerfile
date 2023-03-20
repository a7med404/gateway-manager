FROM node:16.3.0-alpine

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run build --standalone

EXPOSE 3000

ENV HOST 0.0.0.0

CMD ["npm", "run", "dev"]
# CMD [ "npm", "start" ]
