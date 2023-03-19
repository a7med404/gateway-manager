FROM node:16.3.0-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

COPY . .

RUN yarn build --standalone

RUN rm -rf node_modules && \
  NODE_ENV=production yarn install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true

EXPOSE 3000
EXPOSE 80

ENV HOST 0.0.0.0
EXPOSE 80

CMD [ "yarn", "start" ]
