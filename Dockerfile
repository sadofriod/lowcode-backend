FROM mongo-express
RUN npm i -g nodemon yarn
ENTRYPOINT [ "yarn","start" ]