FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm ci --force
COPY . .
RUN npm run prerender
CMD ["npm", "run", "serve:ssr"]
