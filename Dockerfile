FROM node AS fbuilder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM node

WORKDIR /app
RUN mkdir ./processed-vids

RUN apt update && apt install -y ffmpeg

COPY --from=fbuilder /app/package*.json .
COPY --from=fbuilder /app/t1.webm .
COPY --from=fbuilder /app/dist ./dist

RUN npm install --only=production

EXPOSE 8431

CMD [ "npm", "run", "serve" ]

