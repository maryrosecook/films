cd ~/node-sites/films/
git pull origin master
npm install
pm2 restart films
npm run scrape
pm2 list
