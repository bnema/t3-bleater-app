FROM node:18.04 as builder

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

COPY . ./

RUN npx prisma db push

RUN npm run build


# Define some ENV Vars
ENV PORT=3000 \
  DIRECTORY=/app \
  IS_DOCKER=true


CMD [ "npm", "start" ]

# Expose the port ${PORT} to 80
EXPOSE ${PORT}:80