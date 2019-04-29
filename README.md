# biptransport

# Architecture

## /\_\_mocks\_\_/

## /\_\_tests\_\_/

## /assets/

## /e2e/

## /jest/

## /src/

Pour définir un alias de dossier afin de faciliter l'import dans le code, il faut créer un fichier index.js et package.json dans le dossier.

`index/js`

```
export { default as CText } from './Text';
export { default as CTitle } from './Title';
```

`package.json`

```

{
    "main": "index.js",
    "name": "@components"
}
```

## src/api

## src/components

Alias : _@components_

Les noms de fichiers en CamelCase portant le nom du composant.

Les composants de React ou de NativeBase sont volontairement surchargés (via le `C`...).

https://docs.nativebase.io

https://react-native-training.github.io/react-native-elements/docs/overview.html

## src/medias

Alias : _@medias_

Les noms de fichiers en lowercase.

Le fichier idnex exporte tous les fichiers avec un alias sous forme de constante.

```
export const LOGO = require('./logo.png');
```

## src/screens

Alias : _@screens_

Les noms de fichiers en lowercase portant le nom de l'écran.

## storybook

Alias : _aucun_

Les noms de fichiers en minuscule portant le nom du composant. Les écrans sont directement inclus dans `screens.js`.

## Point de départ de l'application

index.js -> src/App.js

Si on a story === true dans package.json alors on affiche le storybook.
index.js -> src/App.js -> /storybook/stories/index.js

## Mode opératoire du développement

**Dans la mesure du possible réaliser le dévelopement en suivant l'ordre `Screen <-> Story[Screen]` en ajoutant les composants nécessaires `Components <-> Story[Components]`. Cela implique d'utiliser des appels de fonctions factices afin de `contrôler le retour de fonctions` ainsi que des données factices statiques afin de `contrôler les données`.**

**Vient ensuite l'ajout des contextes `Screen|Components <-> Context + Functions` qui implémentent les fonctions jusque là factices. Les fonctions de lecture ou d'enregistrement des données s'appuient toujours sur des `données factices statiques`... Il peut être nécessaire de faire des `tests Jest` pour les contextes et les fonctions les plus complexes ou dangeureuses.**

**Vient enfin le remplacement des données par le codage des fonctions permettant l'accès en lecture/écriture des vraies données `Screen|Components|Contexts|Functions <-> Datas`. Il peut être intéressant de faire des `tests de structure, d'accès en lecture et en écriture` afin d'assurer que le système se base sur les mêmes données que celles souhaitées.**

**La dernière étape consiste a réaliser un ou plusieurs `tests end to end` de cet écran.**

### Numéro de version

Il est dans `package.json` et dans `android/app/src/build.gradle` dans la rubrique `android - defaultConfig`. Le version code suis la notation semver sans les . : m.n.p -> mnp.

Suivre `SemVer` : Les changements les plus récents sont indiqués en augmentant le nombre majeur (risque élevé), les nouvelles fonctionnalités non destructives incrémentant le nombre mineur (risque moyen) et toutes les autres modifications non destructives incrémentant le numéro de patch (risque le plus faible). La présence d'une balise de pré-libération (-alpha, -beta) indique un risque important, de même qu'un nombre majeur de 0 (0.yz), utilisé pour indiquer un travail en cours pouvant contenir un risque élevé de changements destructifs (risque le plus élevé).

### Emulateur iOS

^ + 🍏 + z pour afficher les paramètres

### Les commandes npm

`yarn start` pour lancer le serveur et le générateur de bundle

`yarn clean` à lancer lors de gros changements ou de bugs

`yarn iphone` lancer l'émulateur iOS

### Conventions de nommage

**Constantes**

EN_MAJUSCULE

**Fonctions**

- en réponse à un évènement -> on[EventName]
- pour set et get -> get[PropName], set[PropName]

### Les utilitaires

Le composant CSpace permet d'espacer les composants les uns des autres.

Le kit UI est Native Base et React Native Elements, surchargés par les composants `C`...

https://nativebase.io

Les icones viennent de http://evil-icons.io

`DEFAULT_FONT_SIZE` se trouve dans `@components`.

### Pour un nouvel écran

**Un écran par fichier `dans /src/screens/name.js et une story dans /stories/screens.js ->`.add('[Name]', () => <Screen[Name] />);`**

Les composants ont leur nom de classe préfixé par `Screen`

```
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Screen[Name] = () => {

  const [stateName, setStateName] = useState(init);

  useEffect(()=>{
    ...
  })

  return (
  );
};

export default Screen[Name];

```

### Pour un nouveau composant

**Un composant par fichier dans /src/components/Name.js et une story dans /stories/name.js**

Les composants ont leur nom de classe préfixé par `C`

```
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const C[Name] = ({ props }) => {

  const [stateName, setStateName] = useState(init);

  useEffect(()=>{
    ...
  })

  return (
  );
};

C[Name].propTypes = {
  property: PropTypes.kind[.isRequired],
  ...
};

C[Name].defaultProps = {
    property: value,
    ...
}

export default C[Name];

```

### Le business et les contextes

Créer un fichier par contexte métier et ensemble de données dans le dossier `/src/api/`.

```
import React, { Component } from "react";

const default[Name]State = {
  propOtherState: otherDefaultState,
  prop: defaultValue,
  func: () => {},
  ...
};

const [Name]Context = React.createContext(default[Name]State);

const [Name]ContextProvider = ({children}) => {

  [[name]ContextState, set[Name]ContextState] = useState(default[Name]State);

  const {propOtherState, prop} = [name]ContextState;

  myFunc = () => {...}

  ... other React Hooks usages

  return (
    <[Name]Context.Provider value={{
      propOtherState,
      prop,
      func: myFunc
    }}>
    {children}
    </[Name]Context.Provider>
  )
}


export default [Name]Context;
export { default[Name]State, [Name]ContextProvider };
```

### Les données et l'API

### Maintenance

# Installation

## Pré-requis

## Commandes

## Notes sur les modules tierces

## Notes sur GIT

# Storybook

Chaque composant et chaque écran et affichable sous forme de storybook. Chaque story doit permettre de créer le composant ou l'écran de manière autonome mais aussi de consulter leur format rapidement et de voir à quoi ils ressemblent en fonction des paramètres fournis.

## Installation

## Commandes

`yarn storybook` - lance le serveur et permet d'afficher le storybook dans les émulateurs

## Faire une story

1. Créer le fichier dans /storybook/stories
2. Ajouter l'import de ce fichier dans /storybook/stories/index.js
3. Ajouter la structure de base dans le fichier

```
import React from 'react';
import { storiesOf } from '@storybook/react-native';
[// import anything else]

storiesOf('[Title]', module).add('[Sentence1]', () => (
[...code]
)).add('[Sentence2]', () => (
[...code]
));
```

4. Coder les histoires en appliquant au moins une fois chaque propriété.

# Tests
