var app = {
  // Je définis les propriétés de mon objet app
  leftPosition: 0,
  topPosition: 0,
  squareSize: 20,
  squareClasses: {
    'x': 'square-dark',
    '-': 'square-light',
    'o': 'square-red',
    '8': 'square-blue'
  },
  // Je définis les méthodes de mon objet app
  // Méthode appelée au chargement du DOM
  init: function(){
    console.log('Invader init');
    
    // Je génère la myth
    app.generatePattern('myth');
    
    // Je génère la liste de boutons
    app.generateButtons();
  },
  // Méthode permettant de générer les boutons dans la nav, à partir de l'objet map
  generateButtons: function() {
    // Je parcours tous les models d'invaders
    for (var currentInvader in map.models) {
      //console.log(currentInvader); // debug
      // Je créé mon bouton (avec jQuery)
      var $currentButton = $('<button>', {
        class: 'select-model-button',
        text: currentInvader
      });
      // J'ajoute le bouton au DOM (dans la nav)
      // $('nav.select-model').append($currentButton);
      $currentButton.appendTo('nav.select-model'); // même effet, mais syntaxe différente
      
      // J'intercepte le click sur le bouton que je viens d'ajouter au DOM
      $currentButton.on('click', app.loadPattern);
    }
  },
  // Méthode gérant l'event click sur les boutons de la nav
  loadPattern: function(event) {
    console.log('loadPattern');
    
    //console.log($(this).text()); // debug nom du Invader sur lequel on a cliqué
    var invaderName = $(this).text();

    // J'appelle la méthode s'occupant de générer le model fourni en paramètre
    app.generatePattern(invaderName);
  },
  // Méthode permettant de préparer la div#invader (centrer)
  prepareInvaderDiv: function(map) {
    // Je calcule le nombre de carré par ligne
    var nbSquares = map[0].length;
    // J'en déduis la largeur en pixels de ma div#invader
    var invaderWidth = nbSquares * app.squareSize;
    // Je modifie la propriété css "width" sur ma div#invader
    $('#invader').css('width', invaderWidth);
    // je vide la div
    $('#invader').empty();
  },
  // Méthode permettant de générer le code HTML pour le model demandé
  generatePattern: function(pattern) {
    console.log('pattern');
    //console.log(map['models'][pattern]);
    
    // Je stocke la map du pattern demandé dans une variable
    var currentMap = map['models'][pattern];
    
    // Je délègue à une méthode de mon objet le calcul et la modification de la width de #invader
    app.prepareInvaderDiv(currentMap);
    
    // Je réinitialise les positions top et left, pour repartir au coin haut gauche après chaque click
    app.leftPosition = 0;
    app.topPosition = 0;
    
    // Je commence par afficher les caractères dans la div id=invader
    // Il faut parcourir le tableau du modèle "myth"
    //$.each(map.models.myth, function(index, currentLine) {
    for (var index in currentMap) { // Boucle VanillaJS
      // Je crée la variable currentLine contenant la string de chaque ligne du model
      var currentLine = currentMap[index];
      //console.log(currentLine);
      // for (instruction d'initialisation ; condition; instruction d'itération)
      // for (début; jusqu'à ce que la condition soit fausse; ce que je fais pour avancer)
      for (var i=0; i < currentLine.length; i++) {
        //console.log(currentLine[i]);
        
        // J'appelle la méthode s'occupant d'ajouter chaque square au DOM
        app.generateSquare(currentLine[i]);
        
        // Je décale vers la droite le prochain "sqaure"
        app.leftPosition += app.squareSize;
      }
      // Ajout d'un br sale
      // $('#invader').append('<br>'); plus besoin avec les squares en absolute
      // La position horizontale renvient au début => 0
      app.leftPosition = 0;
      app.topPosition += app.squareSize;
    } // end of for
    // }); // end of $.each()
  },
  // Méthode permettant d'ajouter au DOM un square
  generateSquare: function(character) {
    /*
    // initialisation de currentClass
    var currentClass = '';
    // Calculer le nom de la classe pour le carré courant
    if (character == 'x') {
      currentClass = 'square-dark';
    }
    else if (character == '-') {
      currentClass = 'square-light';
    }
    else if (character == '8') {
      currentClass = 'square-blue';
    }
    else if (character == 'o') {
      currentClass = 'square-red';
    }*/
    // Même façon de faire, mais avec un tableau de correspondance
    var currentClass = app.squareClasses[character];
    
    // Je crée une div pour chaque caractère
    // Je stocke l'élément jQuery généré dans une variable
    // Le nom de cette variable comment par "$" car elle contient un élément jQuery
    var $currentSquare = $('<div>', {
      class: 'square '+currentClass,
      text: character
    });
    // var $currentSquare = $('<div class="square '+currentClass+'">'+character+'</div>'); // même effet que la ligne précédente
    // Je veux positionner ma div square
    $currentSquare.css('top', app.topPosition);
    $currentSquare.css('left', app.leftPosition);
    // J'ajoute la div Square au DOM
    $('#invader').append($currentSquare);
  }
};

// quand le DOM est chargé, on appelle la méthode app.init();
$(app.init);
