FROM node:20-alpine

WORKDIR /app

# better-sqlite3 is a native module and needs build tools to compile
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["node", "dist/main"]