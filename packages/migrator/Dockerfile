FROM node:22-alpine

RUN adduser -D -u 1000 migrator

RUN apk add --no-cache ca-certificates

WORKDIR /app

COPY knexfile.js migrate.sh package.json yarn.lock ./

RUN yarn

CMD [ "./migrate.sh", "${DB_DRIVER}" ]
