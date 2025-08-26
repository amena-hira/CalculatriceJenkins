FROM selenium/standalone-chrome:latest

USER root
RUN apt-get update && apt-get install -y curl gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Définir le repertoire de travail

# Copier les fichiers vers le repertoire de travail

# Installer selenium-webdriver + http-server

# Exposer le port 

# Démarrer le serveur statique + attendre + lancer les tests