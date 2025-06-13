FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:ssr
CMD ["npm", "run", "serve:ssr"]
