FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm ci --force
COPY . .
RUN npm run build:ssr
CMD ["npm", "run", "serve:ssr"]
