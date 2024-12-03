Vagrant.configure("2") do |config|
    config.vm.define "kb_app_server" do |kb_app|
        kb_app.vm.box = "ubuntu/focal64"
        kb_app.vm.provider "virtualbox" do |vb|
            vb.memory = "1024"
            vb.cpus = 1
        end
        kb_app.vm.network "public_network", ip: "192.168.110.150"
        kb_app.vm.synced_folder ".", "/var/www/html", type: "rsync", rsync__auto: true
        kb_app.vm.provision "shell", inline: <<-SHELL
            sudo apt update &&\
            sudo apt install -y apache2 git &&\
            sudo systemctl enable apache2 &&\
            sudo systemctl start apache2 &&\
            sudo ufw enable &&\
            sudo ufw allow 80/tcp
            # cd /var/www/html &&
            # if [ -d "KB_app" ]; then
            #     echo "Folder exists"
            #     exit
            # else
            #     git clone https://github.com/SEP5155/KB_app.git
            # fi
            sudo chown -R www-data:www-data /var/www/html &&\
            sudo chmod -R 755 /var/www/html
        SHELL
        kb_app.vm.provision "file", source: "apachi2.conf", destination: "/home/vagrant/apachi2.conf"
        kb_app.vm.provision "shell", inline: <<-SHELL
            sudo mv /home/vagrant/apachi2.conf /etc/apache2/sites-available/000-default.conf && \
            sudo chown root:root /etc/apache2/sites-available/000-default.conf && \
            sudo systemctl restart apache2 && \
            echo "LOOKS LIKE EVERYTHING WORKED CORRECTLY!!!"
        SHELL
    end
end