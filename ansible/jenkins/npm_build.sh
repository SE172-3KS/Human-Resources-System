killall node
cd /home/ubuntu/Human-Resources-System
git stash
git pull origin server
#npm install
npm run build
forever start server.js
