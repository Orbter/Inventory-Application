FROM node:24-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

# Step 8: Launch the server running the path-registered compiled JavaScript file
CMD ["npm", "start"]