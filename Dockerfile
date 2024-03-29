FROM --platform=linux/amd64 node:16 as builder

# Create app directory
WORKDIR /app
ADD . /app/

# build
RUN npm install
RUN npm run build

FROM --platform=linux/amd64 node:16-alpine

WORKDIR /app
ADD package.json ./
ADD nuxt.config.ts ./
COPY --from=builder ./app ./

# Default environment variables
ENV NUXT_HOST=0.0.0.0
ENV NODE_ENV=PRODUCTION
# set app port
ENV NUXT_PORT=8080
EXPOSE 8080

# start command
CMD [ "npm", "start" ]