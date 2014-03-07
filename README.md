# 

Ongair Website

## Setting up server


cat ~/.ssh/id_rsa.pub | ssh root@ssh.ongair.im "cat >> ~/.ssh/authorized_keys"
sudo apt-get update
sudo apt-get install nginx
sudo service nginx start

ifconfig eth0 | grep inet | awk '{ print $2 }'

update-rc.d nginx defaults


sudo mkdir -p /var/www/{domain_name}/public_html

sudo apt-get install git-core
git config --global alias.s status

git clone https://github.com/kimenye/ongair.im.git public_html

sudo chown -R www-data:www-data /var/www/ongair.im/public_html

sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/ongair.im


sudo ln -s /etc/nginx/sites-available/ongair.im /etc/nginx/sites-enabled/ongair.im