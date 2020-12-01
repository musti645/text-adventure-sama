# Changelog #

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] ##

- Command to Reset a game
- Conditions for `GatewayActions` to pass through to another Scene
- Name/Trigger collision check when adding new actions or items in a builder

## [0.0.5] - 2020-12-01 ##

### Added ###

- Tests for Items
- Tests for different InputTypes in the `InputParserService`
- Added a custom classifier class and interface, that creates a MatchScore (inspired by _Natural_ classifiers)

### Changed ###

- replaced ES6 style uniqueness method with `lodash.uniq` and `lodash.uniqWith`

### Fixed ###

- Game `getRelevantStrings` didn't return scene item names

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
