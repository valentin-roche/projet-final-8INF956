# Guide d'installation et d'utilisation

1. Installer les différentes composantes du projet
## Node.js
Pour installer Node, le mieux est de se référer à la [documentation officielle](https://nodejs.org/en/download/).
## Redis
Pour Windows voici [un lien vers un portage](https://github.com/dmajkic/redis/downloads).
Pour Linux voici [un lien vers un tutoriel d'installation](https://redis.io/topics/quickstart).

2. Aller dans le dossier «grapghql-server»

3. Lancer la commande suivante pour télécharger les dépendances :
```powershell
npm install
```

4. Lancer le serveur GraphQL à l'aide de la commande suivante :
```powershell
node server.js
```

5. Aller dans le dossier «cache-server»

6. Lancer la commande suivante pour télécharger les dépendances :
```powershell
npm install
```

7. Lancer le serveur cache à l'aide de la commande suivante :
```powershell
node server.js
```

8. vous pouvez maintenant faire des requêtes aus serveur proxy avec l'outil de votre choix.
