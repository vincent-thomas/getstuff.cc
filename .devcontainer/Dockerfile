FROM node:20-alpine

WORKDIR /app

RUN apk update && apk upgrade

RUN corepack enable

RUN apk add --no-cache aws-cli

RUN apk add git

COPY . .

RUN <<EOR
mkdir ~/.aws && echo "
[default]
sso_account_id = 649534857523
sso_role_name = Admin
sso_start_url = https://d-c36701264f.awsapps.com/start
sso_region = eu-north-1
sso_registration_scopes = sso:account:access
region = eu-central-1
" > ~/.aws/config
EOR

WORKDIR /app
EXPOSE 3000