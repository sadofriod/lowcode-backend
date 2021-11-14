FROM mongo-express
RUN npm i -g nodemon
WORKDIR /app
ENTRYPOINT yarn start
EXPOSE 3002 27017