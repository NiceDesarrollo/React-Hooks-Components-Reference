FROM node:18-bullseye

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

EXPOSE 3001

# Create a startup script that pushes schema and starts the server
RUN echo '#!/bin/bash\nnpx prisma db push\nnpm start' > /app/start.sh && chmod +x /app/start.sh

CMD ["/app/start.sh"]
