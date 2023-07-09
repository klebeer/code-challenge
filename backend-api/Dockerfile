FROM node:14-alpine


COPY --chown=node:node ./ /home/node/tmp/
USER node
RUN cd /home/node/tmp && \
    npm install  && \
    npm run build &&  \
    mv -f /home/node/tmp/dist /home/node/app && \
    mv -f /home/node/tmp/package.json /home/node/app/ && \
    mv -f /home/node/tmp/node_modules  /home/node/app \
    && rm -rf  /home/node/tmp

WORKDIR /home/node/app
CMD [ "npm", "run", "start:prod"]
