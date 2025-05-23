# AI Evolution Timeline Game - Architecture

This document outlines the architecture for the AI Evolution Timeline Game.

## Core Architecture: Scene-Based

The game utilizes a **Scene-Based Architecture**. Each distinct combination of a time period (e.g., 2025, 2030, 2040) and location (Home, Workplace) will be represented by its own dedicated Scene.

Examples:
- `Home_2025_Scene`
- `Workplace_2030_Scene`
- `Home_2040_Scene`

This approach isolates the logic, assets, and interactive elements specific to each environment and era, making the codebase modular and easier to manage as complexity grows.

## Components

Within each scene, interactive elements (like turning on lights, using a smart screen, interacting with NPCs) will be implemented as reusable **Components**. This promotes code reuse and simplifies the development of individual features described in `Time Characteristics.md`.

## Folder Structure

- `src/`: Main source code directory.
  - `core/`: Core game logic, state management, potentially the main game loop or framework initialization.
  - `scenes/`: Contains individual scene files (e.g., `Home_2025_Scene.ts`).
  - `components/`: Reusable UI and game object components.
  - `assets/`: Static assets like images, sounds, models.
- `tasks/`: Task management files (generated by Taskmaster AI).

## Technology Stack

- **Frontend Framework/Engine:** (To be determined - likely a JavaScript/TypeScript game framework like Phaser, PixiJS, or potentially a 3D engine like Babylon.js if needed)
- **Build Tool:** Vite
- **Task Management:** Taskmaster AI
