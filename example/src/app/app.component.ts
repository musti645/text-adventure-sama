import { Component, OnInit } from '@angular/core';
import { Game, GameBuilder, InteractionType } from 'text-adventure-sama';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'example-app';
  Game: Game;

  constructor() {
  }

  ngOnInit(): void {
    this.Game = this.buildGame();
  }


  private buildGame(): Game {
    const builder = new GameBuilder()
      .setTitle('-- Test Adventure --')
      .setIntroduction('You\'ve lost track of where you are while hiking in the woods. Your battery is dead and it\'s going to get dark outside soon. You better find shelter for the night. \r\n'
        + 'While looking for signs of civilization, such as roads or lights, you come across a small hut...')
      .setGatewayTargetNotFoundResponse('You don\'t know where that is.')
      .setItemAddedToInventoryResponse('You put that thing into your bag.')
      .setItemNotFoundInInventoryResponse('You can\'t seem to find what you\'re looking for')
      .setInventoryEmptyResponse('You look into your bag, hoping to find something helpful in there, but it\'s empty.');

    builder.addScene(1)
      .setName('Shed in the Woods')
      .setDescription('A cozy looking shed surrounded by a lot of trees.')
      .setActionNotRecognizedResponse('Doing that in a forrest? You don\'t think so.')
      .setItemNotFoundResponse('There, beneath the leaves and sticks, you seem to have spotted something. As you get closer, you realize that it was a useless rock.')
      .setInvalidInputResponse('You\'re confused. Good thing this isn\'t Pokèmon, so you don\'t hit yourself')
      .addGatewayAction()
        .setTargetSceneId(2)
        .setTrigger('Shed')
        .setResponse('The door is not locked. You open it and walk inside.')
        .finish()
      .addItem()
        .setName('Door')
        .setDescription('A door made out of wood. It looks like the door is not locked.')
        .setInSceneDescription('From where you\'re standing, you can see the door of the shed.')
        .setCanPickUp(false)
        .setCannotPickUpResponse('You pick up the door as if it was nothing. Then, you realize that your bag isn\'t large enough to carry a door, so you put it back.')
        .setNoUsagesLeftResponse('You don\'t think that doing that would help you in any way.')
        .setUsagesLeft(0)
        .finish()
      .addItem()
        .setName('weird Stick')
        .setDescription('A weird stick, that looks like a cross.')
        .setItemUsedResponse('You use the stick to scratch your back. The stick breaks, but at least the itch is gone.')
        .setNoUsagesLeftResponse('You broke the stick. It\'s unusable now.')
        .setCanPickUp(true)
        .setInSceneDescription('Just infront of your feet is a weird looking stick. Looks like someone glued it together to look like a cross.')
        .setMaximumUsages(1)
        .setUsagesLeft(1)
        .finish()
      .finish();

    builder.addScene(2)
      .setName('Inside of the Shed')
      .setDescription('Wooden floors, wooden doors, wooden walls. Everything seems to be made from the same wood. Probably the one surrounding this shed.')
      .setActionNotRecognizedResponse('You don\'t think, that this is an appropriate thing to do here.')
      .setItemNotFoundResponse('The place is too messy. You can\'t seem to find what you\'re looking for.')
      .setInvalidInputResponse('Just as you start doing that a fly passes your ear. You feel irritated and forget what you wanted to do.')
      .addGatewayAction()
        .setTrigger('leave')
        .setResponse('You walk out the door through which you came in. You find yourself infront of the shed.')
        .setTargetSceneId(1)
        .finish()
      .addItem()
        .setName('Bed')
        .setCanPickUp(false)
        .setCannotPickUpResponse('A massive bed, which you cannot pick up as easy as, say, a door. You leave it as it is.')
        .setDescription('A comfortable looking bed. Just by looking at it, you feel like sleeping. What\'s keeping you from just doing it?')
        .setInSceneDescription('In the corner you see a bed. It\'s decorated with many pillows and a fluffy looking blanket.')
        .setUsagesLeft(0)
        .setNoUsagesLeftResponse('You don\'t know how to do that. Surely, a bit of sleep will help you figure it out.')
        .finish()
      .addItemYieldingAction()
        .setTrigger('sleep')
        .setAmountOfItems(1)
        .setResetItemUsagesToMaximum(true)
        .setResponseAfterUse('You don\'t feel like sleeping now. You want to find out what the key is all about')
        .setInteractionType(InteractionType.DO)
        .setResponse('You jump into the bed and snuggle into place. While doing that you feel something hard inside your pillow. You open it up and find a rusty key of some sorts.')
        .addItem()
          .setName('Key')
          .setDescription('A rusty key.')
          .setItemUsedResponse('You stick the key into the hole. It turns and you hear a clicking sound. Of course, the key breaks in the process.')
          .setNoUsagesLeftResponse('You broke the key. It\'s unusable now.')
          .setMaximumUsages(1)
          .setUsagesLeft(1)
          .finish()
        .finish()
      .finish();

    return builder.finish();
  }

}
