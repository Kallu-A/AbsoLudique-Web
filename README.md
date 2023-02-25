# <img title="Abso'Ludique logo" alt="Logo d'abso'ludique" src=".res_readme/abso.svg" style="height: 80px; width: 80px; vertical-align: middle" width="80" height="80" >Abso'Ludique site Web 

## Description du projet

Site web du club Abso'Ludique (jeux de société) à TELECOM Nancy

## Configuration OAUTH2 
[Configuration du compte Google](https://support.google.com/googleapi/answer/6158849?hl=en)

[Tableau de bord API](https://console.cloud.google.com/apis/dashboard)
- **Identifiants** création d'un nouveau projet 
- **Écran de consentement OAuth**
  - user type = interne
  - nom de l'application = Abso'Ludique
  - Adresse email d'assistance = *.net
  - Logo de l'application = '.res_extern/logo.png'
  - l'uri de redirection `https://localhost:5000/login/callback`
  - Les domaines nécessaires si hébergés

### Ajout des secrets
faire un fichier `.secret` dans le répertoire `back` le remplir de cette manière
en remplacant avec les codes fournit par Google
```shell
GOOGLE_CLIENT_ID='ID client'
GOOGLE_CLIENT_SECRET='Secret client'
GOOGLE_DISCOVERY_URL='https://accounts.google.com/.well-known/openid-configuration'
```


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
