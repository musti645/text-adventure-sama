# text-adventure-sama #

An object oriented framework to create text adventures. Built with Angular.

## How it works ##

A Text Adventure consists of the following components:

- Game
- Player
- Object
- Scene
- Action

### Game ###

A game object contains scenes and the Inventory of the player.

### Objects ###

The player may have multiple instances of an InGameObjects in her inventory and use them 1+ times.
This maximum amount of uses and instances is free to choose for each InGameObject.

### Scenes ###

There are Scenes in a game, which may represent certain locations within the adventure.
A scene has got a certain number of objects it contains, with which the player can interact.
Also a scene contains a certain number of actions, which the player can trigger.

### Actions ###

Actions generally have triggers and responses. A trigger is something the player types.
This causes the response to be created.

There are multiple types of Actions, which behave differently to triggers.

#### Gateway Action ####

When Gateway Action is triggered, the player leaves the current scene and moves on to the linked scene.

#### MultiTime Action ####

The MultiTime Action (open for name suggestions) can be triggered multiple times and each time returns a different response.

#### OneTime Action ####

A OneTime Action can only be triggered once and after having been triggered, always responds with the same string.

#### RandomResponse Action ####

Triggering a RandomResponse Action returns a random response out of a list of responses.

#### ObjectYielding Action ####

Once an ObjectYielding Action is triggered, the player receives an object into her inventory.

#### ObjectConsuming Action ####

In order to trigger this an ObjectConsuming Action, the player needs to have a certain item in her inventory.
The object is used once. If it has got one Usage left, it will be removed from the inventory.

#### ObjectRemoving Action ####

In order to trigger this an ObjectConsuming Action, the player needs to have a certain item in her inventory.
The object is removed from the inventory without being used.
