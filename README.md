# TextAdventureSama #

<!-- IMPORTANT NOTE: There's a copy of this ReadMe in the library itself. Either automate the process or don't forget to replace that one with the updated version. -->

[![Build Status - Master](https://travis-ci.org/musti645/text-adventure-sama.svg?branch=development)](https://travis-ci.org/musti645/text-adventure-sama) [![Coverage Status](https://coveralls.io/repos/github/musti645/text-adventure-sama/badge.svg)](https://coveralls.io/github/musti645/text-adventure-sama)

An Angular library to add a Text Adventure to your Web Application.

## Getting Started ##

### Configuration Changes ###

We need to add the following to the `package.json` and `polyfills.ts`, in order to be able to use the Natural Language Processing Library. This is due to the fact, that [NaturalNode](https://github.com/NaturalNode/natural) is actually a back end library, but we want to use it on the client side.

```json
// package.json
{
  "name": "something",
  ...
  "browser": {
    "fs": false,
    "os": false,
    "path": false,
    "webworker-threads": false
  },
  ...
}
```

And

```typescript
// polyfills.ts
(window as any).global = window;
```

See [here](https://github.com/angular/angular-cli/issues/8160) for more information on the *polyfills.ts* part

### Installing the Library ###

Use the command `npm i text-adventure-sama` to add the library to your project.

### Adding the Component ###

Import the `TextAdventureModule` to the Module that is to contain the component.

```typescript
import { TextAdventureModule } from 'text-adventure-sama';

@NgModule({
  declarations: [
    //...
  ],
  imports: [
    //... other modules
    TextAdventureModule
  ],
  providers: [
      //...
  ],
  bootstrap: [
      //...
  ]
})

```

Add the Text-Adventure-Component to your DOM and pass it a Game Object via the corresponding Attribute.

```HTML
<tas-text-adventure [Game]="Game"></tas-text-adventure>
```

Currently there are 3 Events, that you can listen to.

```HTML
<tas-text-adventure [Game]="Game"
    (OnGameStartEvent)="onGameStart($event)"
    (OnGameResetEvent)="onGameReset($event)"
    (OnGameEndEvent)="onGameEnd($event)">
</tas-text-adventure>
```

### Creating a new Game ###

To create a new Game, you'll want to use the Builders, that guide you through that process. The builders allow you to chain the method calls without interrupting it in any way from start to finish.

In order to finish the creation process of one element, you'll have to call the `finish()` method on that builder. That method also will trigger some checks and throw errors, if required fields have not been set during game creation. So make sure to check your Browsers Console Output, to see, if there have been any issues during the build.

To understand how the game is put together, have a look at the [Structure](#structure).

#### The Build ####

First, you create the [Game](#game) itself and set all the necessary Strings to do so.

```typescript
const builder = new GameBuilder();

builder.setTitle('-- Test Adventure --')
.setIntroduction('You\'ve lost track of where you are while hiking in the woods.')
.setGatewayTargetNotFoundResponse('You don\'t know where that is.')
.setItemAddedToInventoryResponse('You put that thing into your bag.')
.setItemNotFoundInInventoryResponse('You can\'t seem to find what you\'re looking for')
.setInventoryEmptyResponse('Just emptiness. Nothing more.');
```

Then you add a [Scene](#scenes) to the Game. By calling `addScene()` you receive a `SceneBuilder.` Once you're done with the Scene itself, you can call `finish()` in order to get the `GameBuilder` back. But before doing so, let's add some Actions and Items to the Scene.

```typescript
// either pass your own ID to the SceneBuilder, or let the game generate it for you
builder.addScene(1)
    .setName('Shed in the Woods')
    .setDescription('A cozy looking shed surrounded by a lot of trees.')
    .setActionNotRecognizedResponse('Doing that in a forrest? You don\'t think so.')
    .setItemNotFoundResponse('There, beneath the leaves and sticks, you seem to have spotted something. As you get closer, you realize that it was a useless rock.')
    .setInvalidInputResponse('You\'re confused. Good thing this isn\'t Pokèmon, so you don\'t hit yourself')
```

Now you can add an [Action](#actions) to the game and allow the user to do something.

```typescript
// a gateway action, for example, allows the user to go to another scene
// it's triggered by writing something like "go to shed"
.addGatewayAction()
    .setTargetSceneId(2)
    .setTrigger('Shed')
    .setResponse('The door is not locked. You open it and walk inside.')
    .finish()
```

It is also possible to add [Items](#items) to the Scene, with which the user can interact.

```typescript
.addItem()
    .setName('Door')
    .setDescription('A door made out of wood. It looks like the door is not locked.')
    .setInSceneDescription('From where you\'re standing, you can see the door of the shed.')
    .setCanPickUp(false)
    .setCannotPickUpResponse('You pick up the door as if it was nothing. Then, you realize that your bag isn\'t large enough to carry a door, so you put it back.')
    .setNoUsagesLeftResponse('The door is unlocked already.')
    .setUsagesLeft(0)
    .finish()
```

Once you are done with that, your code that creates the game should look something like this:

- Create a new GameBuilder
- Set Game Properties
- Add a Scene
- Set Scene Properties
- Add Action to the Scene
- Set Action Properties
- Finish Action Creation
- Add Item to the Scene
- Finish Item Creation
- Finish Scene Creation
- Add another Scene
- Finish Scene Creation
- ...
- Finish Game Creation

## Structure ##

### Game ###

The Game is the outermost layer and contains Scenes, Commands and the Inventory, as well as some general Strings, that are consistently used throughout the whole game.

Required Strings

- Title
- Introduction
- GatewayTargetNotFoundResponse
- ItemAddedToInventoryResponse
- ItemNotFoundInInventoryResponse
- InventoryEmptyResponse

The Title and the Introduction are sent when the game begins. The other strings are sent, when the corresponding event is triggered within the game.

### Commands ###

Commands are globally accessible (not bound to Scenes) and give general Information. Currently, there are these 3 predefined Commands:

- *help* - gives a list of all commands and their descriptions
- *look around* - gives a description of the current scene
- *inventory* - gives a list of the items in the inventory

You can also add new Commands via the corresponding builder.

### Scenes ###

Scenes represent locations in the game. The player can always only be in one Scene at a time.
Scenes may have [Items](#items) (Objects) in them and also may allow the user to do something via [Actions](#actions).

### Items ###

Items represent Objects within the game. This can be something fixed in a scene or something that can be picked up.

Items can be used without being picked up.
The player may have multiple instances of an Item in her inventory and use each of it 1 or more times.
This maximum amount of uses and instances is free to choose for each Item.
ene contains a certain number of actions, which the player can trigger.

### Actions ###

Actions generally have triggers and responses. A trigger is something the player types.
This causes the response to be created.

There are multiple types of Actions, which behave differently to triggers.

#### Types of Actions ####

| Type                   | Description                                                                                                                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gateway Action         | When Gateway Action is triggered, the player leaves the current scene and moves on to the linked scene.                                                                                                 |
| Multi-Time Action      | The Multi-Time Action (open for name suggestions) can be triggered multiple times and each time returns a different response.                                                                           |
| One-Time Action        | A One-Time Action can only be triggered once and after having been triggered, always responds with the same string.                                                                                     |
| Random-Response Action | Triggering a RandomResponse Action returns a random response out of a list of responses.                                                                                                                |
| Item-Yielding Action   | Once an Item-Yielding Action is triggered, the player receives an Item into her inventory.                                                                                                              |
| ItemConsuming Action   | In order to trigger this an Item-Consuming Action, the player needs to have a certain item in her inventory.The Item is used once. If it has got one Usage left, it will be removed from the inventory. |
| ItemRemoving Action    | In order to trigger this an Item-Removing Action, the player needs to have a certain item in her inventory.The Item is removed from the inventory without being used.                                   |

#### InteractionTypes ####

User input is classified into the following, so called, *InteractionTypes*.

- GO_TO
- USE
- DO
- LOOK_AT
- PICK_UP

Each Action has a predefined InteractionType, but may also be set to have another.
These define, what the user has to write in order to trigger that specific action.

The different InteractionTypes have the following meaning:

|Type|Description|
|---|---|
|GO_TO|Trigger an Action in the current scene with that InteractionType - usually GatewayActions|
|LOOK_AT|Gets the description of an Item, either in the inventory or in the current scene|
|PICK_UP|Add an item from the scene to the inventory|
|USE|Use an item either in the scene or in your inventory|
|DO|Trigger an Action in the current scene with that InteractionType|

## Playing the Game ##

The game is a Text-Adventure, so it is played in a console-like window.
The Interaction with the game is done via imperatives, e.g. `look around` or `use stick`

## Customizations ##

### Typewriting Animation ###

TextAdventureSama allows you to determine the typing speed of the Typewriter Animation (defaults to 40ms per character) or just not use it alltogether (defaults to true).

```html
<tas-text-adventure [Game]="Game"
[UseTypewritingAnimation]="useTypewriter"
[TypewriterSpeed]="typewriterSpeed"
></tas-text-adventure>
```

### Classification ###

If you're not liking the classification of your input, you can always pass your own ClassificationTrainer into the game.

```html
<tas-text-adventure [Game]="Game"
[ClassificationTrainer]="classificationTrainer"
></tas-text-adventure>
```

See [here](https://github.com/NaturalNode/natural#classifiers) for more Information about the BayesClassifier, that we're using, and about how to train it with NaturalNode.

## Limitations ##

We're using a Natural Language Processing Library for NodeJS called [Natural](https://github.com/NaturalNode/natural) to tag the user input. But because there aren't many imperatives in everyday language (and in the Corpora that are available to us), we face many difficulties getting the right tag for some words. We've also got some problems with Nouns being tagged as Verbs and vice versa.

### Work-Arounds ###

Becaues of these reasons, we've got some work arounds in place, to make the experience a bit better.

#### Classification Trainer ####

Classification is the process, where the InputType is derived from the user`s input. We've created a custom ClassificationTrainer and an interface to create your own trainer.

In order to use your own ClassificationTrainer, just implement the interface and pass the created object into the game component.

```HTML
<tas-text-adventure [Game]="Game" [ClassificationTrainer]="MyClassificationTrainer">
</tas-text-adventure>
```

*If you've got additions for the built in ClassificationTrainer, feel free to add them!*

#### Using standardized input ####

There's also the possibility to make sure, the user only uses standardized input, that has been used to train the classifier. This way, the InteractionTypes are more clearly distinguishable for the classifier and we don't get wront InteractionTypes for input.

## Known Issues ##

### CommonJS Warnings ##

In order to remove the Build warnings regarding CommonJS, include the following to your `angular.json` file.

```json
    "build": {
        "builder": "@angular-devkit/build-angular:browser",
        "options": {
            //...
        "allowedCommonJsDependencies": [
            "lodash",
            "lodash.clonedeep",
            "natural"
        ]
    }
```

<!-- TODO: install lodash-es, instead of lodash -->

## In Depth Look ##

<!-- TODO:
### From Input to Output ###

 TODO: THIS -->

### ID Generator ##

The idea behind the ID Generator is to be able to outsource the ID assignment to an automated service.
It goes ahead and holds a counter for each type of object, that it comes across and uses that
counter to return the new ID of the created object. It is also supposed to track already assigned IDs.

Actions don't need IDs, since they are triggered via their - you guessed it - Trigger and InteractionType.
