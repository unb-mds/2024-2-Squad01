FROM node:18-alpine
WORKDIR /app
# force rebuild

COPY backend/package*.json ./backend/
RUN cd backend && npm install

COPY backend ./backend

RUN cd backend && npm run build

EXPOSE 3002
CMD ["sh", "-c", "cd backend && npm start"]