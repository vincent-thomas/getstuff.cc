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

ENV PORT $PORT
ENV HOSTNAME 0.0.0.0

RUN rm -rf node_modules && npm install --force

CMD [ "node", "./server.js" ]