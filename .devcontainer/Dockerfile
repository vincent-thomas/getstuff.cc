FROM node:20

WORKDIR /app

RUN curl -s https://packages.stripe.dev/api/security/keypair/stripe-cli-gpg/public | gpg --dearmor | tee /usr/share/keyrings/stripe.gpg
RUN echo "deb [signed-by=/usr/share/keyrings/stripe.gpg] https://packages.stripe.dev/stripe-cli-debian-local stable main" | tee -a /etc/apt/sources.list.d/stripe.list

RUN apt update && apt upgrade
RUN apt install stripe

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" 
RUN unzip awscliv2.zip
RUN ./aws/install --bin-dir /usr/local/bin --install-dir /usr/local/aws-cli --update
RUN rm -rf awscliv2.vip
RUN rm -rf aws
RUN corepack enable


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