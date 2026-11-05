# Trackada

Le projet trackada consiste à programmer un script qui vérifie dans nos dossiers projets plusieurs éléments.
- si le dossier est bien présent et son nom exact.
- si le dépôt Git est bien initialisé.
- si tous les fichiers requis sont bien présents.
- afficher un état d'avancement de chaque projet avec un % de réalisation.

## Lancer le script
Dans le terminal lancer la commande bash:
```node checktrack.js```
​
Le script vous demande si vous voulez véirifer tous les projets (dossiers) ou bien un en particulier (à ce moment là, tapez le nom du dossier désiré)

## Ce que le script vérifie
Il vérifie si le dossier projet est bien là.
Ensuite il vérifie si le git init a bien été lancé.
Puis le script vérifie si tous les fichiers nécessaires sont créés et présents.

## Exemple d'affichage

``` ✅ dossier du projet trackada ```
``` ❌ dossier du projet adalgo```
```- le repository git n'est pas initialisé```
```- Il manque : package.json et README.md ```
```❌ 43% des projets sont initialisés correctement (3/7)```


## Ce que j'ai appris
J'ai appris beaucoup d'élements, notamment l'interactivité de l'utilisateur avec le terminal.
(Je me suis toujours demandé comment cela fonctionnait donc je suis content)
J'ai conforté l'importance de structurer son code, et j'apprends de mieux en mieux à parametrer mon IA au fur et à mesure.

## Limites connues

Il y'a le cas ou l'utilisateur rentre un nom inconnu que je n'ai pas encore programmé.


© Richard Brochier - 2026