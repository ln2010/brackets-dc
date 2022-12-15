FROM node:lts-buster-slim AS base
RUN apt-get update && apt-get install libssl-dev ca-certificates -y
WORKDIR /app

COPY package.json package-lock.json ./

FROM base as build
RUN export NODE_ENV=production
RUN npm install

COPY . .
RUN npm run generate-db
RUN yarn build

FROM base as prod-build

RUN npm install --production
COPY prisma prisma
RUN npm run generate-db
RUN cp -R node_modules prod_node_modules

FROM base as prod

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=prod-build /app/prod_node_modules /app/node_modules
COPY --from=build  /app/.next /app/.next
COPY --from=build  /app/public /app/public
COPY --from=build  /app/prisma /app/prisma

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "run", "start"]
