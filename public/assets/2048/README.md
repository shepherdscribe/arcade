# 2048 Game Assets

This directory contains the custom fantasy assets for the 2048 game.

## Current Setup

The game now uses a **sprite sheet approach** with the `tiles.png` file, which is much more efficient than individual PNG files.

## Sprite Sheet

### `tiles.png` - Main Sprite Sheet

- **Size**: 384x384 pixels (4x4 grid of 96x96 tiles)
- **Format**: PNG with transparency support
- **Layout**: 4 rows × 4 columns of tile sprites

### Sprite Positions in the Sheet

**Row 1 (Top):**

- Position 0,0: Tile "2" (lime green glow)
- Position 0,1: Tile "4" (cyan/light blue glow)
- Position 0,2: Tile "8" (soft purple glow)
- Position 0,3: Tile "16" (warm orange/yellow glow)

**Row 2:**

- Position 1,0: Tile "32" (lime green glow)
- Position 1,1: Tile "64" (cyan/light blue glow)
- Position 1,2: Tile "128" (soft purple glow)
- Position 1,3: Tile "256" (warm orange/yellow glow)

**Row 3:**

- Position 2,0: Tile "512" (lime green glow)
- Position 2,1: Tile "1024" (cyan/light blue glow)
- Position 2,2: Tile "2048" (soft purple glow)
- Position 2,3: Tile "4096" (warm orange/yellow glow)

**Row 4 (Bottom):**

- Position 3,0: Tile "8192" (lime green glow)
- Position 3,1: Question mark "?" (soft purple glow)
- Position 3,2: Cracked tile with lightning (blue lightning effects)
- Position 3,3: Empty slot

### Special Tiles

- **Question Mark (?)** - Represents unknown/hidden tiles
- **Cracked Tile** - Special effect tile with lightning fissures
- **Golden Gem** - Separate asset (not in the grid) for special rewards

## Asset Specifications

### Sprite Sheet Requirements

- **Individual Tile Size**: 96x96 pixels
- **Total Sheet Size**: 384x384 pixels
- **Format**: PNG with transparency support
- **Style**: Fantasy/medieval themed with glowing effects

### Color Progression

The tiles follow a repeating color cycle every 4 tiles:

1. **Lime Green** - Energetic, fresh feeling
2. **Cyan/Light Blue** - Cool, calm feeling  
3. **Soft Purple** - Mystical, magical feeling
4. **Warm Orange/Yellow** - Warm, powerful feeling

## How It Works

The game automatically:

- Loads the `tiles.png` sprite sheet
- Extracts individual tiles based on their grid position
- Maps tile numbers to sprite positions
- Renders tiles using CSS background positioning
- Provides fallback gradients for missing tiles

## Benefits of Sprite Sheet Approach

1. **Performance**: Single image load instead of 15+ separate files
2. **Efficiency**: Better caching and reduced HTTP requests
3. **Consistency**: All tiles load together, preventing visual glitches
4. **Maintenance**: Easier to manage one file instead of many
5. **Scalability**: Easy to add new tiles by extending the grid

## Adding New Tiles

To add new tile numbers beyond 8192:

1. Extend the sprite sheet grid (e.g., add a 5th row)
2. Update the `TILE_SPRITES` mapping in the game code
3. Follow the color progression pattern
4. Ensure consistent art style and sizing

## Fallback System

If any tile sprites are missing or undefined:

- Shows a beautiful purple-to-pink gradient background
- Displays the number in white text
- Ensures the game always works regardless of asset status

## Tips for Asset Creation

- **Consistent Style**: Maintain the same stone block + glowing effect theme
- **Color Harmony**: Follow the established 4-color progression cycle
- **Visual Progression**: Consider making higher-number tiles more elaborate
- **Contrast**: Ensure good visibility of the glowing numbers/symbols
- **Transparency**: Use PNG transparency for clean edges and effects
