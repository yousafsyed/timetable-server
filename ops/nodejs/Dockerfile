FROM node:16-buster

ADD entrypoint.sh /opt

RUN chmod +x /opt/entrypoint.sh

RUN npm install -g @nestjs/cli

CMD [ "/opt/entrypoint.sh" ]

WORKDIR /var/www/app/