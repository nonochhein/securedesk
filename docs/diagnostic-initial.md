# Diagnostic initial DevSecOps — SecureDesk

| # | Risque | Conséquence métier | Contrôle |
|---|--------|--------------------|----------|
| 1 | Absence de tests | Une modification casse l'API sans que personne ne le voie ; incidents mal enregistrés ou perdus | Tests automatisés (Vitest + Supertest) et seuil de couverture à 80 % exécutés en CI |
| 2 | Version de Node.js inconnue | Comportement différent entre poste développeur et exploitation ; mises en production qui échouent | Version imposée (Node 22) dans l'image Docker et dans la pipeline |
| 3 | Dépendances non vérifiées | Une bibliothèque vulnérable expose le service à une attaque connue | Audit des dépendances (`npm audit`) et `package-lock.json` versionné avec `npm ci` |
| 4 | Secret dans Git | Un token exposé donne accès à un service tiers, même après suppression du fichier | Détection avec Gitleaks, révocation immédiate du secret exposé |
| 5 | Conteneur exécuté en root | Une compromission de l'application donne des droits étendus sur l'hôte | Image multi-stage avec utilisateur non-root, scan de l'image avec Trivy |
