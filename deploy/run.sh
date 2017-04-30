#!/bin/bash
source ~/env/bin/activate
ansible-playbook -i deploy/inventory.yml deploy/nrd_deploy.yml --private-key ~/nrd-key-pair.pem
