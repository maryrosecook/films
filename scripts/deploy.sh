printf "Pulling latest code\n\n"
git pull origin master

printf "Install dependencies\n\n"

npm install

printf "\n"

printf "Restarting site\n\n"
pm2 restart films

printf "\n"

printf "Site status:\n"

pm2 list
