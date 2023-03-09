# <img title="Abso'Ludique logo" alt="Logo d'abso'ludique" src=".res_readme/abso.svg" style="height: 80px; width: 80px; vertical-align: middle" width="80" height="80" >Abso'Ludique site Web 

# Configuration
## OAUTH2 
[Configuration du compte Google](https://support.google.com/googleapi/answer/6158849?hl=en)

[Tableau de bord API](https://console.cloud.google.com/apis/dashboard)
- **Identifiants** création d'un nouveau projet 
- **Écran de consentement OAuth**
  - user type = interne
  - nom de l'application = Abso'Ludique
  - Adresse email d'assistance = *.net
  - Logo de l'application = '.res_extern/logo.png'
  - l'uri de redirection `https://localhost:5000/login/callback?redirect_callback=https://localhost:3000/logincallback`
  - Les domaines nécessaires si hébergés

### Ajout des secrets
faire un fichier `.secret` dans le répertoire `back` le remplir de cette manière
en remplacant avec les codes fournit par Google
```shell
GOOGLE_CLIENT_ID='ID client'
GOOGLE_CLIENT_SECRET='Secret client'
GOOGLE_DISCOVERY_URL='https://accounts.google.com/.well-known/openid-configuration'
```

## Domaines
Il peut être nécessaire de changer les noms de domaines lors du passage en prod/dev modifier 
- `back/.env` FRONT_URI
- `front/next.config.js` remotePatterns
- `front/api.js` BACK_PATH
- `front/server.js` hostname, port

## Certificats
[Générer certificat pour development uniquement](https://gist.github.com/cecilemuller/9492b848eb8fe46d462abeb26656c4f8)
Ajouter les certicats dans 
- `front/cert/abso.pem`
- `front/cert/abso.key`
- `back/cert/abso.pem`
- `back/cert/abso.key`

---

## Back-end - dev
### Installation
Dans le répertoire back du projet, veuillez exécuter les commandes suivantes pour installer les dépendances :
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Lancement
Après avoir installé le projet, vous pouvez le lancer en utilisant
```bash
cd back
source venv/bin/activate
python3 app.py
```

### Lancement des tests
Dans le répertoire back du projet :
```bash
cd back
source venv/bin/activate
pytest
```

### Mise à jour des dépendances
```bash
cd back
source venv/bin/activate
pip freeze > requirements.txt
```

## Front-End - dev

### Installation
Dans le répertoire front du projet, veuillez exécuter les commandes suivantes pour installer les dépendances :
```bash
cd front
npm install
```

### Lancement
Après avoir installé le projet, vous pouvez le lancer en utilisant
```bash
cd front
npm run dev
# or
npm run build
# or 
npm start
```
