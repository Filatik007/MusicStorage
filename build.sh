#!/bin/bash
sudo firewall-cmd --add-port=3063/tcp
sudo firewall-cmd --add-port=3003/tcp
sudo firewall-cmd --reload

sudo dnf -y install dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
sudo dnf -y install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

sudo systemctl enable docker
sudo systemctl start docker

sudo docker build -t music .

