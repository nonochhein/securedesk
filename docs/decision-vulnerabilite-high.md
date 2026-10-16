# Décision : vulnérabilité HIGH transitive sans correctif

**Cas** : une vulnérabilité HIGH touche une dépendance transitive, aucun correctif n'existe, et la fonction concernée n'est pas appelée.

**Décision** : ne pas bloquer la pipeline, avec une dérogation temporaire.

| Élément | Contenu |
|---|---|
| Exposition | La fonction vulnérable n'est jamais appelée par SecureDesk, directement ou via une dépendance directe. Aucune entrée utilisateur ne l'atteint. |
| Preuves | Recherche dans le code et l'arbre de dépendances (`npm ls <paquet>`), absence d'appel dans les tests, rapport `npm audit` joint à la merge request. |
| Mesure compensatoire | Validation stricte des entrées (400 sur toute valeur imprévue), limite JSON à 16 ko, en-têtes Helmet, surveillance de l'avis de sécurité. |
| Propriétaire | Responsable de l'équipe de développement SecureDesk (à nommer). |
| Date de réévaluation | 14 jours, soit le délai cible de correction d'une vulnérabilité haute. La dérogation expire à cette date si aucun correctif n'est intégré. |

Si l'exposition est confirmée, ou si un correctif sort, le blocage s'applique et la mise à jour est testée avant fusion.
