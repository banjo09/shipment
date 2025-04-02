# Shipment Tracker App

A React Native mobile application that allows drivers to manage their shipment status.

## Overview

This Shipment Tracker app features:

- Animated splash screen
- User authentication
- Shipment listing with status indicators
- Pull-to-refresh functionality

## Screenshots

[Screenshots will be added here]

## Screenshots

|                 Splash Screen                  |                  Splash1 Screen                  |                       Blue                       |                    Login                     |                    LoginModal                    |                       LoginModalFilled                       |                 Loader Screen                  |                Shipments Screen                |                      ShipmentsScreen                       |                     ShipmentItems                      |
| :--------------------------------------------: | :----------------------------------------------: | :----------------------------------------------: | :------------------------------------------: | :----------------------------------------------: | :----------------------------------------------------------: | :--------------------------------------------: | :--------------------------------------------: | :--------------------------------------------------------: | :----------------------------------------------------: |
| ![Splash](assets/screenshots/SplashScreen.png) | ![Splash1](assets/screenshots/SplashScreen1.png) | ![BlueScreen](assets/screenshots/BlueScreen.png) | ![Login](assets/screenshots/LoginScreen.png) | ![LoginModal](assets/screenshots/LoginModal.png) | ![LoginModalFilled](assets/screenshots/LoginModalFilled.png) | ![Loader](assets/screenshots/LoaderScreen.png) | ![Shipments](assets/screenshots/Shipments.png) | ![ShipmentsScreen](assets/screenshots/ShipmentsScreen.png) | ![ShipmentItems](assets/screenshots/ShipmentItems.png) |

## Tech Stack

- React Native
- TypeScript
- React Navigation
- [Other libraries used]

## Features

### Implemented Features

- **Splash Screen:** Animated introduction screen based on Figma design
- **Login Screen:**
  - Form validation
  - Animations as specified in design
  - Username/email and password fields
- **Shipment List Screen:**
  - Display of shipments with status indicators (Received, Canceled, etc.)
  - Implementation using FlatList
  - Pull-to-refresh functionality

### Bonus Features

- [Any additional features you've implemented]

## Installation

### Prerequisites

- Node.js >= 14.0.0
- JDK >= 11 (for Android)
- Android Studio (for Android development)
- Xcode (for iOS development)
- CocoaPods (for iOS dependencies)

### Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/[your-username]/shipment-tracker-app.git
   cd shipment-tracker-app
   ```

2. Install dependencies:

   ```sh
   npm install
   # OR
   yarn install
   ```

3. For iOS, install CocoaPods dependencies:
   ```sh
   bundle install
   bundle exec pod install
   ```

## Running the App

### Start Metro Server

```sh
# Using npm
npm start
# OR using Yarn
yarn start
```

### Run on Android

```sh
# Using npm
npm run android
# OR using Yarn
yarn android
```

### Run on iOS

```sh
# Using npm
npm run ios
# OR using Yarn
yarn ios
```

## Building APK

To build a release APK:

```sh
cd android
./gradlew assembleRelease
```

The APK will be generated at `android/app/build/outputs/apk/release/app-release.apk`

## Project Structure

```
shipment-tracker-app/
├── android/              # Android native code
├── ios/                  # iOS native code
├── src/
│   ├── assets/           # Images, fonts, etc.
│   ├── components/       # Reusable components
│   ├── navigation/       # Navigation configuration
│   ├── screens/          # Screen components
│   ├── services/         # API services
│   ├── store/            # State management
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── App.tsx               # Root component
├── index.js              # Entry point
└── README.md             # Project documentation
```

## Development

### Code Style

This project follows the [TypeScript ESLint](https://typescript-eslint.io/) rules.

To check linting:

```sh
npm run lint
# OR
yarn lint
```

### Testing

Run tests with:

```sh
npm test
# OR
yarn test
```

## API Integration

The app integrates with [API details if applicable].

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## Contact

[olabanjoolaleye@gmail.com]

## License

[MIT]
