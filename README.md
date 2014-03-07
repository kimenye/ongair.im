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