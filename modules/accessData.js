//var MongoClient = require('mongodb').MongoClient;

var recherche = function (){
    resultat = {titre:'Java',prix:25};
    return resultat;
}
/* Ici on exporte la fonction recherche
(la rendre visible de l'exterieur du module)
sous le nom rech */
module.exports = {rech:recherche};