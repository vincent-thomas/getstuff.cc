FROM public.ecr.aws/docker/library/node:lts-alpine3.19

WORKDIR /app
EXPOSE 3000

ENV NODE_ENV="production"
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT $PORT
ENV HOSTNAME 0.0.0.0

COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.3 /lambda-adapter /opt/extensions/lambda-adapter
COPY ./public ./public
COPY ./.next/standalone ./
COPY ./.next/static ./.next/static

RUN corepack enable
RUN rm -rf node_modules && pnpm install

CMD [ "node", "./server.js" ]