killall node
cd /home/ubuntu/Human-Resources-System
git stash
git pull origin server
npm run build
npm test
forever start server.js
