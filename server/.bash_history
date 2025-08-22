ls -la
apt get-uupdate
apt get-update
apt-get update
sudo apt-get update
sudo apt-get install nginx
service nginx status
curl localhost
sudo netstat -plnt
vi /var/log/nginx/error.log
tail /var/log/nginx/error.log
netstat -ntlp
sudo apt-get netstat
sudo apt install netstat
sudo apt install net-tools
netstat -ntlp
sudo apt update
sudo apt install nodejs
sudo apt install npm
sudo apt-get install gnupg curl
curl -fsSL https://pgp.mongodb.com/server-7.0.asc |    sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg    --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
mongosh
echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-database hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-mongosh hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections
sudo systemctl start mongod
mongosh
sudo swapon --show
free -h
df -h
sudo fallocate -l 1G /swapfile
ls -lh /swapfile
-rw-r--r-- 1 root root 1.0G Apr 25 11:14 /swapfile
sudo chmod 600 /swapfile
ls -lh /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo swapon --show
free -h
sudo cp /etc/fstab /etc/fstab.bak
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
cat /proc/sys/vm/swappiness
sudo sysctl vm.swappiness=10
sudo nano /etc/sysctl.conf
cat /proc/sys/vm/vfs_cache_pressure
sudo sysctl vm.vfs_cache_pressure=50
sudo nano /etc/sysctl.conf
mkdir workspace
cd workspace/
mkdri server admin website
mkdir server admin website
ls 
cd /etc/nginx/sites-enabled/
cp default picfan
sudo cp default picfan
sudo cp default picfanAdmin
sudo cp default picfanApi
ls -ls
ls -la
nano picfan
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot --nginx
nano picfan
sudo nano picfan
sudo nano picfanAdmin
sudo nano picfanApi
sudo nano picfanAdmin
sudo nano picfan
sudo certbot --nginx
sudo nano picfan
sudo nano picfanAdmin
sudo nano picfanApi
sudo certbot --nginx
sudo nano picfanApi
sudo certbot --nginx
sudo nano picfanApi
sudo nano picfan
sudo certbot --nginx
cd workspace/
cd server/
unzip server.zip
sudo apt install unzip
unzip server.zip
df -h
cd /dev/root
unzip server.zip 
npm i
rm -r node_modules
rm -r package-lock.json
ls -la
unzip server.zip 
npm i
npm -v
node -v
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
sudo n latest
node -v
sudo apt remove nodejs
sudo apt-get install -y nodejs
node -v
cd /etc//nginx/sites-enabled/
nano picfan
sudo nano picfan
sudo nano picfanAdmin
sudo nano picfanApi
cat default 
sudo nano picfanApi
sudo certbot --nginx
cd ../
ls 
cd /home/ubuntu/workspace/website/
ls
unzip assets.zip 
sudo apt-get update
redis-cli --version
sudo apt install redis-tools
sudo systemctl status redis
redis-cli --version
sudo systemctl status redis
sudo systemctl enable redis-server
redis-server --version
sudo apt install redis-server
redis-server --version
sudo systemctl enable redis-server
sudo systemctl status redis
clear
cd workspace/server/
npm install pm2 -g
sudo npm install pm2 -g
pm2 start index.js --watch
top -i
cd /etc/nginx/conf.d/
ls
lscd ../
cd ../
ls
nano nginx.conf
ls
cd workspace/website/
unzip assets.zip 
cd /etc/nginx/sites-enabled/
nano picfan
sudo nano picfan
curl pic.fan
cat /etc/nginx/sites-enabled/picfan
cat /etc/nginx/nginx.conf 
ls -l /home/ubuntu/workspace/website/dist
sudo chown -R ubuntu:www-data /home/ubuntu/workspace/website
ls -l /home/ubuntu/workspace/website/dist
sudo nginx -t
sudo systemctl reload nginx
curl pic.fan
ls -l /home/ubuntu/workspace/website
sudo nano /etc/nginx/sites-enabled/picfan
sudo systemctl reload nginx
curl pic.fan
sudo nginx -t
sudo systemctl reload nginx
sudo chmod -R 755 /home/ubuntu/workspace/website
sudo chown -R ubuntu:www-data /home/ubuntu/workspace/website
curl pic.fan
cd /var/log/nginx/
ls
tail -f error.log
sudo chmod -R 755 /home/ubuntu/workspace/website
sudo chmod -R 755 /home/ubuntu/workspace
sudo find /home/ubuntu/workspace -type f -exec chmod 644 {} \;
sudo chown -R ubuntu:www-data /home/ubuntu/workspace
sudo chmod o+x /home/ubuntu
sudo systemctl reload nginx
sudo tail -f /var/log/nginx/error.log
curl pic.fan
sudo ufw status
sudo systemctl status nginx
sudo netstat -tuln | grep nginx
ip addr show
curl -I http://pic.fan
sudo ufw status
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
node -v
sudo ufw allow 443
sudo ufw status
sudo certbot --nginx
cat /etc/nginx/sites-enabled/picfan
curl pic.fan
sudo nano /etc/nginx/sites-enabled/
sudo nano /etc/nginx/sites-enabled/picfan
sudo nano /etc/nginx/sites-enabled/picfanAdmin
sudo nano /etc/nginx/sites-enabled/picfanApi
sudo certbot --nginx
certbot --nginx
sudo certbot --nginx
cd workspace/website/
nano .env
cd /etc/nginx/sites-enabled/
nano picfanApi
pm2 list
cd /home/ubuntu/workspace/server/
npm run dev
npm i
npm run dev
sudo lsof -i :5010
npm run dev
sudo lsof -i :port
pm2 stop all
npm run dev
pm2 start index.js --watch
cd ../website/
r -r assets
rm -r assets
cd ../
cd server/
nano .env
nano index.js 
nano .env
pm2 stop all
npm run dev
pm2 start all
nano .env
pm2 restart 0
nano .env
pm2 restart 0
nano .env
pm2 restart 0
redis-cli flushall
nano index.js
pm2 restart 0
nano index.js
pm2 restart 0
nano index.js
nano .env
nano index.js
pm2 restart 0
nano .env
pm2 restart 0
nano .env
pm2 restart 0
nano .env
pm2 restart 0
nano .env
pm2 restart 0
nano .env
pm2 restart 0
nano .env
pm2 restart 0
nano .env
pm2 restart 0
nano .env
cd /etc/nginx/sites-enabled/
nano picfanAdmin 
cd /home/ubuntu/workspace/
cat /var/log/nginx/error.log
pm2 restart 0
cd server/
pm2 start index.js --watch
pm2 start index.js --watch -f
pm2 kill
pm2 list
pm2 start index.js --watch
pm2 list
pm2 restart 0
pm2 stop all
npm run dev
pm2 start all
pm2 logs
cls
clear
rm -r node_modules
npm i
pm2 restart 0
pm2 kill
pm2 start index.js --watch
pm2 stop 0
npm run dev
pm2 start index.js --watch
cat /etc/nginx/sites-enabled/picfanApi 
sudo nano /etc/nginx/sites-enabled/picfanApi 
pm2 restart 0
sudo systemctl nginx reload
sudo systemctl reload nginx
pm2 restart 0
sudo nano /etc/nginx/sites-enabled/picfanApi 
sudo systemctl reload nginx
cd /etc/nginx/
sudo nano nginx.conf 
sudo systemctl reload nginx
sudo nano nginx.conf 
sudo systemctl reload nginx
pm2 restart 0
cd /home/ubuntu/workspace/server/
pm2 logs
top -i
cat /etc/nginx/nginx.conf 
cat /etc//nginx/sites-enabled/picfanApi 
cat /var/log/nginx/
cat /var/log/nginx/error.logo
cat /var/log/nginx/error.log
pm2 stop all
npm run dev
sudo nano app.config.js
rm -r app.config.js
pm2 start ecosystem.config.js
pm2 kill
pm2 start ecosystem.config.js --watching
pm2 start ecosystem.config.js 
cd workspace/server/
nano .env
pm2 restart 0
cat /var/log/nginx/error.log
ls -ld /root/workspace/
sudo ls -ld /root/workspace/
sudo ls -ld /home/ubuntu/workspace/
sudo chmod -R 755 /home/ubuntu/workspace/
cat /var/log/nginx/error.log
udo systemctl reload nginx
sudo systemctl reload nginx
ls -a
ls --all
cd workspace/
ls --all
ls -all
sudo nano /etc/nginx/nginx.conf 
sudo nano /etc/nginx/sites-enabled/picfanAdmin 
sudo systemctl reload nginx
sudo apt-get install cron -y
systemctl start cron systemctl enable cron
sudo systemctl start cron systemctl enable cron
sudo systemctl start crond systemctl enable crond
crontab -e
sudo systemctl enable cron
cd workspace/server/
nano .env
pm2 restart 0
nano .env
pm2 restart 0
nano controllers/payments.js 
pm2 restart 0
nano controllers/payments.js 
nano .env
pm2 restart 0
top -i
cd workspace/server/
nano .env
pm2 restart 0
pm2 stop all
npm run dev
pm2 restart all
pm2 kill all
pm2 kil
pm2 kill
pm2 list
pm2 start ecosystem.config.js
top -i
cd wo
cd workspace/server/
nano .env
cd workspace/server/
nano .env
pm2 restart
pm2 restart 0
npm run dev
mongosh
mongod -v
mongo -v
sudo service mongod status
mongod --repair
mongod -v
sudo rm /tmp/mongodb-27017.sock
sudo service mongod restart
sudo service mongod status
mongosh
mongoimport --ur
mongoimport --uri mongodb+srv://picfan:5kwFxlvLhSwRd8Rp@picfan-v1.8rorngc.mongodb.net/picfan?retryWrites=true&w=majority
mongoimport --uri mongodb+srv://picfan:5kwFxlvLhSwRd8Rp@picfan-v1.8rorngc.mongodb.net/picfan?retryWrites=true&w=majority -c picfan
mongoimport --uri mongodb+srv://picfan:5kwFxlvLhSwRd8Rp@picfan-v1.8rorngc.mongodb.net/picfan?retryWrites=true&w=majority -c picfan --file picfan
mongoimport --uri mongodb+srv://picfan:5kwFxlvLhSwRd8Rp@picfan-v1.8rorngc.mongodb.net/picfan?retryWrites=true&w=majority -c picfan
mongodump --uri "mongodb+srv://picfan:5kwFxlvLhSwRd8Rp@picfan-v1.8rorngc.mongodb.net/picfan?retryWrites=true&w=majority" --out ~/dump
mongorestore --uri "mongodb://localhost:27017" ~/dump
pm2 stop all
npm run dev
pm2 ecosystem.config.js
pm2 start ecosystem.config.js
cd../
cd ../../
sudo a2enmod http2
cd /et
cd /etc/ngin
cd /etc/nginx
cd sites-enabled/
nano picfan
sudo nano picfan
sudo nano picfanApi
sudo nano picfanAdmin
sudo nano picfan
sudo systemctl reload nginx
cd workspace/server/
nano .env
cat /etc/nginx/sites-enabled/picfan
cat /etc/nginx/sites-enabled/picfanApi
sudo nano /etc/nginx/sites-enabled/picfan
sudo nano /etc/nginx/sites-enabled/picfanApi
sudo systemctl reload nginx
sudo nano workspace/server/.env
pm2 restart 0
sudo nano workspace/server/.env
pm2 stop a
pm2 stop all
cd workspace/server/
npm run dev
cls
pm2 start ecosystem.config.js
top -i
cd wor
cd workspace/server/
sudo nano .env
pm2 restart 0
cat /etc/nginx/sites-enabled/picfan
cat /etc/nginx/sites-enabled/picfanApi
pm2 restart 0
cd /et
cd /etc/ngin
cd /etc/nginx/sites-enabled/ls -l --all
cd /etc/nginx/sites-enabled/
ls -l --all
cd workspace/server/
pm2 restart 0
cat /etc/nginx/nginx.conf
pm2 restart all
cd workspace/server/
nano .env
cd workspace/server/
nano .env
pm2 restart all
nginx -v
cat /etc/nginx/nginx.conf
nano /etc/nginx/nginx.conf
sudo nano /etc/nginx/nginx.conf
sudo apt-get update
sudo apt-get install postfix
cat /etc/postfix/main.cf
sudo systemctl start postfix
sudo systemctl enable postfix
echo "This is a test email" | mail -s "Test Email" pfnadeem@gmail.com
sudo apt-get install mailutils
echo "This is a test email" | mail -s "Test Email" pfnadeem@gmail.com
sudo less /var/log/mail.log
telnet gmail-smtp-in.l.google.com 25
sudo service postfix status
sudo dpkg-reconfigure postfix
sudo systemctl reload postfix
sudo postconf -e 'home_mailbox = Maildir/'
sudo postconf -e 'smtpd_sasl_type = dovecot'
sudo postconf -e 'smtpd_sasl_path = private/auth'
sudo postconf -e 'smtpd_sasl_local_domain ='
sudo postconf -e 'smtpd_sasl_security_options = noanonymous,noplaintext'
sudo postconf -e 'smtpd_sasl_tls_security_options = noanonymous'
sudo postconf -e 'broken_sasl_auth_clients = yes'
sudo postconf -e 'smtpd_sasl_auth_enable = yes'
sudo postconf -e 'smtpd_recipient_restrictions = \
permit_sasl_authenticated,permit_mynetworks,reject_unauth_destination'
sudo postconf -e 'smtpd_sasl_type = dovecot'
sudo postconf -e 'smtpd_sasl_path = private/auth'
sudo postconf -e 'smtpd_sasl_local_domain ='
sudo postconf -e 'smtpd_sasl_security_options = noanonymous,noplaintext'
sudo postconf -e 'smtpd_sasl_tls_security_options = noanonymous'
sudo postconf -e 'broken_sasl_auth_clients = yes'
sudo postconf -e 'smtpd_sasl_auth_enable = yes'
sudo postconf -e 'smtpd_recipient_restrictions = \

permit_sasl_authenticated,permit_mynetworks,reject_unauth_destination'
sudo postconf -e 'smtpd_recipient_restrictions = \
permit_sasl_authenticated
permit_mynetworks
reject_unauth_destination

sudo postconf -e 'smtp_tls_security_level = may'
sudo postconf -e 'smtpd_tls_security_level = may'
sudo postconf -e 'smtp_tls_note_starttls_offer = yes'
sudo postconf -e 'smtpd_tls_key_file = /etc/ssl/private/server.key'
sudo postconf -e 'smtpd_tls_cert_file = /etc/ssl/certs/server.crt'
sudo postconf -e 'smtpd_tls_loglevel = 1'
sudo postconf -e 'smtpd_tls_received_header = yes'
sudo postconf -e 'myhostname = mail.pic.fan'
cat /etc/postfix/main.cf
sudo systemctl restart postfix.service
telnet mail.pic.fan 25
pm2 restart all
pm2 log
pm2 restart all
pm2 log
top -i
pm2 restart all
mongosh
pm2 restart all
cd workspace/server/
sudo nano .env
pm2 restart all
pm2 logs 
pm2 restart all
top -i
pm2 restart all
df -h
cd /dev/root
rm -rf /tmp/*
sudo rm -rf /tmp/*
df -h
du -h --max-depth=1 / | sort -hr
sudo du -h --max-depth=1 / | sort -hr
sudo apt clean
df -h~
df -h
sudo du -h --max-depth=1 /usr | sort -hr
sudo du -h --max-depth=1 /var | sort -hr
sudo apt autoremove --purge
df -h
sudo reboot
df -h
pm2 restart all
cd workspace/server/
pm2 start ecosystem.config.js --watching
pm2 start ecosystem.config.js
mongosh
sudo systemctl start mongod
mongosh
pm2 restart all
df -h
