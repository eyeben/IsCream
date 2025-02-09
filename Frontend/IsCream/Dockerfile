# Node.js 빌드 환경
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./ 
RUN npm install
COPY . .  # 전체 코드 복사
RUN npm run build --omit=dev  

# Nginx 실행 환경
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html  
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
