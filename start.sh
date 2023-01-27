#!/bin/bash

cd /home/
apt-get update
apt-get upgrade
apt install -y git
git clone https://github.com/OtShellNick/apmo-users.git
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
apt install -y npm
cd apmo-users/
npm i
npm run watch:dev