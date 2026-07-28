FROM node:20-slim

WORKDIR /code

COPY package.json package-lock.json* yarn.lock* ./
RUN npm install

COPY . /code

RUN npm run build

EXPOSE 8000
ENV PORT=8000
ENV HOST=0.0.0.0
ENV NODE_ENV=production

CMD ["npm", "run", "start"]
