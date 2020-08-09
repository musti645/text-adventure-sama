# text-adventure-sama #

An object oriented framework to create text adventures. Built with Angular.

## How it works ##

A Text Adventure consists of the following components:

- Game
- Player
- Item
- Scene
- Action

### Game ###

A game Item contains scenes and the Inventory of the player.

### Items ###

The player may have multiple instances of an InGameItems in her inventory and use them 1+ times.
This maximum amount of uses and instances is free to choose for each InGameItem.

### Scenes ###

There are Scenes in a game, which may represent certain locations within the adventure.
A scene has got a certain number of Items it contains, with which the player can interact.
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

#### ItemYielding Action ####

Once an ItemYielding Action is triggered, the player receives an Item into her inventory.

#### ItemConsuming Action ####

In order to trigger this an ItemConsuming Action, the player needs to have a certain item in her inventory.
The Item is used once. If it has got one Usage left, it will be removed from the inventory.

#### ItemRemoving Action ####

In order to trigger this an ItemConsuming Action, the player needs to have a certain item in her inventory.
The Item is removed from the inventory without being used.

## From Input to Output ##

input -> InputParserService
-> InputType and Parameters found
-> Get Scene From Stage
-> Look for Action in Scene that matches the InputType and the Parameters
    -> If not found, return Scene's ActionNotFoundResponse
    -> If found, but InputType or parameter don't match, return Actions WrongInteractionTypeResponse
-> Check Action's preconditions
    -> If not successful return corresponding Response
-> Trigger the Action and receive the response
-> Trigger EventListeners (Item related Events & Scene related Events)

## In Depth Look ##

### ID Generator ##

The idea behind the ID Generator is to be able to outsource the ID assignment to an automated service.
It goes ahead and holds a counter for each type of object, that it comes across and uses that
counter to return the new ID of the created object. It is also supposed to track already assigned IDs.

Actions don't need IDs, since they are triggered via their - you guessed it - Trigger and InteractionType.
