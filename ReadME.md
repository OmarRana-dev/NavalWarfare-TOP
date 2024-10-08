# Naval Warfare - Battleship Game

Welcome to **Naval Warfare**, a Battleship game built with JavaScript, Webpack, and tested using Jest.

## Project Overview

Naval Warfare is an implementation of the classic Battleship game. Players compete by taking turns to attack each other's fleets hidden on a gameboard. Ships are placed randomly, and the goal is to sink all of the opponent's ships before they sink yours.

## Key Features

- **Player vs Computer:** Play against a computer opponent with randomized ship placements and attacks.
- **Real-time Feedback:** Get immediate feedback on hits, misses, and ship sinking.
- **Dynamic Gameplay:** Ships are placed dynamically, ensuring each game provides a different challenge.

## Technologies Used

- **JavaScript:** The core logic of the game is written in modern ES6+ JavaScript.
- **Webpack:** We utilized Webpack for module bundling and building the project.
- **Sass:** The project is styled using Sass for enhanced CSS features and maintainability.
- **Jest:** The game's logic, particularly the gameboard and player functionalities, are rigorously tested using Jest.

## What We Learned

1. **Test-Driven Development (TDD):** Writing tests in Jest helped ensure the correctness of game logic and improved development flow.
2. **Modular Programming:** By using ES6 modules, the code is broken down into manageable, reusable components.
3. **Webpack Configuration:** Setting up and configuring Webpack for bundling JavaScript, handling stylesheets, and preparing for production deployment.
4. **GitHub Pages Deployment:** Deploying a JavaScript application directly from a GitHub repository to GitHub Pages.
5. **Babel and ES6+:** Understanding the benefits of Babel and modern JavaScript features in building scalable projects.

## How to Play

1. **Game Start:** Once the game loads, the computer places ships randomly on the gameboard.
2. **Player Turns:** You take turns attacking by selecting coordinates. The computer responds with its own attack.
3. **End Game:** The game ends when one player's entire fleet has been destroyed. Victory or defeat is displayed.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/OmarRana-dev/NavalWarfare-TOP.git
cd NavalWarfare-TOP
```

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

4. Run the development server:

```bash
npm start
```

5. Play the game by opening the browser at http://localhost:5000.

## Future Improvements

- **Multiplayer Mode:** Implement a two-player mode for local or online multiplayer gameplay.
- **Mobile Responsiveness:** Make the game fully responsive to provide a better experience on mobile devices.
- **Custom Ship Placement:** Allow players to manually place ships before the game starts.
- **Enhanced Graphics and Animations:** Improve the visual appeal of the game with better animations, effects, and a more polished UI.

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to suggest improvements or report bugs.

## License

This project is licensed under the MIT License. See the [LICENSE](https://choosealicense.com/licenses/mit/) file for details.
