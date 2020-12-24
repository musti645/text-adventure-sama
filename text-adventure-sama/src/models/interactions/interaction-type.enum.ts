/**
 * Each input of the user is classified and then labelled with an InteractionType.
 * This type determines, how the game reacts to the input and what it matches the input with.
 * 
 * A GO_TO input type will be matched with Gateway Actions in the Scene.
 * A LOOK_AT type input will be matched with Items in the Inventory or Scene.
 * A PICK_UP type input will be matched with Items in the Scene.
 * A DO type input will be matched with Actions in the Scene.
 * A USE type input will be matched with Items in the Inventory or Scene.
 * 
 * To alter the classification of the input, you can pass your own ClassificationTrainer to the game. 
 */
export enum InteractionType {
    /**
     * A USE type input will be matched with Items in the Inventory or Scene.
     * 
     * Example input: use key
     */
    USE,

    /**
     * A LOOK_AT type input will be matched with Items in the Inventory or Scene.
     * 
     * Example input: look at key
     */
    LOOK_AT,

    /**
     * A GO_TO input type will be matched with Gateway Actions in the Scene.
     * 
     * Example input: go to hut
     */
    GO_TO,

    /**
     * A PICK_UP type input will be matched with Items in the Scene.
     * 
     * Example input: pick up key
     */
    PICK_UP,

    /**
     * A DO type input will be matched with Actions in the Scene.
     * 
     * Example input: sleep
     */
    DO
}
