FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV="production"

# ---

COPY ./public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY ./.next/standalone ./
COPY ./.next/static ./.next/static

ENV NEXT_TELEMETRY_DISABLED 1

RUN corepack enable



ENV PORT $PORT
ENV HOSTNAME 0.0.0.0

EXPOSE 3000

RUN rm -rf node_modules && pnpm install

CMD [ "node", "./server.js" ]