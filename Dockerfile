FROM selenium/standalone-chrome:latest

USER root
RUN apt-get update && apt-get install -y curl gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Définir le repertoire de travail
WORKDIR /app

# Copier les fichiers vers le repertoire de travail
COPY . .

# Installer selenium-webdriver + http-server
RUN npm install -g selenium-webdriver http-server

# Exposer le port 
EXPOSE 8081

# Simple entrypoint that starts Selenium + web + (optionally) runs tests
COPY entrypoint.sh /usr/local/bin/run-all.sh
RUN chmod +x /usr/local/bin/run-all.sh

# Démarrer le serveur statique + attendre + lancer les tests
ENV MODE = tests
ENTRYPOINT ["/usr/local/bin/run-all.sh"]
# CMD ["http-server", ".", "-p", "8081"]