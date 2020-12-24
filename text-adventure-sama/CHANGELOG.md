# Changelog #

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] ##

- Switch to lodash-es
- Conditions for `GatewayActions` to pass through to another Scene
- Name/Trigger collision check when adding new actions or items in a builder

## [0.0.9] - 2020-12-24 ##

### Added ###

- Mixins to change the theme of the text adventure
- Tests for the BaseClassifier
- Possibility to set case sensitivity in the component via an input field
- Doc comments to all files available via the public api

### Changed ###

- Using Angular Material theme to set typography and colors
- Setting the `UsagesLeft` value to the `MaximumUsages` value in the `ItemBuilder`

### Fixed ###

- Proper case sensitivity in `BaseClassifier`
- One had to set `NoUsagesLeftResponse` in every Item, even if it could not be used. Added `setCannotUse` method to the builder, that allows skipping that.
- Forgot to unsubscribe in some action tests. This lead to tests failing randomly.

## [0.0.8] - 2020-12-02 ##

### Fixed ###

- Forgot ReadMe.md in last publish...

## [0.0.7] - 2020-12-02 ##

### Fixed ###

- Hotfix: `InputParserService` was initialized before setting the game -> threw an error and would break the application

## [0.0.6] - 2020-12-02 ##

### Added ###

- `GameInitStartEvent` has been added to the component
- Added all the events to the _public-api_
- Added tests in which the component was hosted by another
- Commands can now end or reset a game
- Commands can now clear the output of the game

### Fixed ###

- The game was initialized even when the `Game` property was not set, which led to errors

## [0.0.5] - 2020-12-01 ##

### Added ###

- Tests for Items
- Tests for different InputTypes in the `InputParserService`
- Added a custom classifier class and interface, that creates a MatchScore (inspired by _Natural_ classifiers)

### Changed ###

- replaced ES6 style uniqueness method with `lodash.uniq` and `lodash.uniqWith`

### Fixed ###

- Game `getRelevantStrings` didn't return scene item names
- Resolved UMD warnings

### Removed ###

- The use of the LinearRegressionClassifier to find the most likely item/action by using the input

## [0.0.4] - 2020-11-30 ##

### Added ###

- UnitTests for Actions

### Changed ###

- Unsubscribing from Subscriptions in UnitTests
- Moved spec files to the files they test
- `ItemEventService` and `SceneEventService` usability improvements

### Removed ###

- Usage of `_.isEqual` - instead using built in jasmine deep comparison

### Fixed ###

- MultiTimeAction`s Response generation was faulty
