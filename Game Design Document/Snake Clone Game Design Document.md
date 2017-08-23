# Snake Clone (Game Design Document)

### Introduction
Snake is a video game that was first implemented in the mid 1970s in arcades. The objective of the Snake Clone project is to implement a clone of this classic game using JavaScript. More details about Snake can be found on <a href="https://en.wikipedia.org/wiki/Snake_(video_game)">Wikipedia</a>.


### Gameplay
- The game takes place on a 25 x 25 square grid with the first and last rows and columns of the grid being filled by wall tiles.
- The player controls a snake that takes up tiles based off of how much food it has eaten.
- The snake moves in the direction that its head is facing. The player can change this direction using the arrow keys.
- Food is randomly generated on a tile that the snake is not occupying. A maximum of one food item is on the board at any given time.
- If the snake's head comes into contact with the food tile. The food is eaten and the snake's size increases by one tile.
- If the snake's head comes into contact with a wall tile or with a tile that corresponds to the snake's own body, then the game is over.
- The player begins the game with the snake generated in a consistent location. At the start of the game, the snake takes up five tiles.
- A score is displayed in an area that is separate from the grid. The player begins with a score of 1. Each time the snake eats a food tile, the player gets 1 point.
- The game has three states: a title state (where a title screen is shown and the user is prompted to start the game), a play state (where the game is played), and a game over state (where the game is stopped, the user can see their score and final game position, and the user can restart the game).

### Mockup
<center>
  <img src="Snake Clone Mockup.png" style="width:550px;height:574px"></img>
</center>

### Engine (Reusable) Classes
#### Game
In general, a game's main loop is modeled using a general reusable __Game__ class. In the main program we iterate in a loop and call the __update()__ method followed immediately by the __draw()__ method until the game is finished. The __Game__ class has a state attribute which is used to model the current situation that the game is in. The state object itself is expected to have its own __draw()__ and __update()__ operations.
<center>
  <img src="Snake Clone Game Class Diagram.png"></img>
</center>

##### Attributes
- __canvas (Canvas):__ the HTML5 canvas upon which the game is drawn.
- __width (integer):__ the desired width of the canvas.
- __height (integer):__ the desired height of the canvas.
- __timeout (integer):__ how long the main program should wait between loop iterations.
- __state (Object):__ represents whether the game is currently in the title, play, or game over state.

##### Methods
- __getCanvasContext() (CanvasRenderingContext2D):__ extracts the drawing context from the canvas (for use in both the __draw()__ and __update()__ operations).
- __draw() (void):__ extracts the canvas context and passes it to the state's __draw()__ operation.
- __update() (void):__ adjusts the game canvas width and height to match the game's desired width and height and then calls the state's __update__ operation.

#### Grid
The game grid is modeled using a general reusable __Grid__ class. In the game grid there is a 25 x 25 area for the snake; food; and walls, and there is an additional row on top for the score area. The purpose of this class is to store the grid and tile dimensions for use by grid elements.
<center>
  <img src="Snake Clone Grid Class Diagram.png"></img>
</center>

##### Attributes
- __rows (integer):__ the number of rows there are in the grid.
- __columns (integer):__ the number of columns there are in the grid.
- __x (integer)__: the x coordinate that the grid has with respect to the canvas area.
- __y (integer)__: the y coordinate that the grid has with respect to the canvas area.
- __width (integer)__: the width that the grid has with respect to the canvas area.
- __height (integer)__: the height that the grid has with respect to the canvas area.

##### Methods
- __tileWidth() (integer):__ the width of each tile in the grid; computed as __width // columns__.
- __tileHeight() (integer):__ the height of each tile in the grid; computed as __height // rows__.

#### GridElement
To model the parts of the game that exist in the grid, a general reusable __GridElement__ class is used to specify the interface that all drawn components of the game must satisfy.
<center>
  <img src="Snake Clone GridElement Class Diagram.png"></img>
</center>

##### Attributes
- __grid (Grid):__ the grid to use when updating the element.

##### Methods
- __draw(context) (void):__ displays the element on the canvas using the passed in canvas context (__CanvasRenderingContext2D__).
- __update() (void):__ called at each game tick; updates the element so that the next call to draw() displays the element accurately.
- __tilesOccupied() (Set):__ used for collision detection; a set of all tiles that the element is considered to be occupying.
- __tileOccupiedHash(rowIndex, columnIndex) (string):__ converts a given tile's rowIndex (__integer__) and columnIndex (__integer__) into a string value for insertion and comparison within the tilesOccupied() Set.

#### GridRectElement
There are six kinds of __GridElements__ on the grid that are rectangular in shape. These include: the game walls, game background (also known as the floor), score background, food tiles, snake tiles, and text (while text is not drawn as a rectangle, it does take up a rectangular area). A general reusable class called __GridRectElement__ is used for implementing the __update()__ and __tilesOccupied()__ methods of these elements. The __draw()__ method is left for a subclass to implement.
<center>
  <img src="Snake Clone GridRectElement Class Diagram.png"></img>
</center>

##### Attributes
- __rowIndex (integer):__ the number corresponding to the grid row of the top left corner of the element (0-based indexing is used).
- __columnIndex (integer):__ the number corresponding to the grid column of the top left corner of the element (0-based indexing is used).
- __rowTiles (integer):__ the number of rows that the element occupies.
- __columnTiles (integer):__ the number of columns that the element occupies.
- __x (integer)__: the x coordinate that the element's top left corner has with respect to the canvas area.
- __y (integer)__: the y coordinate that the element's top left corner has with respect to the canvas area.
- __width (integer)__: the pixel width that the element has with respect to the canvas area.
- __height (integer)__: the pixel height that the element has with respect to the canvas area.

##### Methods
- __update() (void):__ called at each game tick; changes the values of __x__, __y__, __width__,  and __height__ in accordance with the current values of __rowIndex__, __columnIndex__, __rowTiles__, __columnTiles__, and __grid__.
- __tilesOccupied() (Set):__ returns a Set of strings corresponding of all tiles in the rectangular area between (rowIndex, columnIndex) and (rowIndex + rowTiles - 1, columnIndex + columnTiles - 1) inclusive.

#### GridRectangle
The game walls, game background (floor), score background, food tiles, and snake tiles are all coloured rectangles. They are thus implemented by using a __GridRectangle__ class that subclasses the above __GridRectElement__ class. The __GridRectangle__ class has an additional attribute for the colour of the rectangle and implements the __draw()__ method.
<center>
  <img src="Snake Clone GridRectangle Class Diagram.png"></img>
</center>

##### Attributes
- __colour (string):__ A CSS string corresponding to the colour of the rectangle.

##### Methods
- __draw(context) (void):__ uses the <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect">fillRect</a> method of the passed in canvas context (__CanvasRenderingContext2D__) to draw a coloured rectangle between (x, y) and (x + width, y + height).

#### GridText
The score area displays text including text for the title of the game as well as text for the score. This text is modeled using a __GridText__ class that subclasses the __GridRectElement__ class in order to draw the text within a bounding rectangle of tiles in the grid. The class also includes attributes for vertical and horizontal alignment.
<center>
  <img src="Snake Clone GridText Class Diagram.png"></img>
</center>

##### Attributes
- __colour (string):__ A CSS string corresponding to the colour of the text.
- __font (string):__ A CSS string corresponding to the font of the text.
- __text (string):__ The words to display.
- __verticalAlign (string):__ How the text should be vertically aligned within its bounding rectangle (one of "top", "middle", or "bottom").
- __horizontalAlign (string):__ How the text should be horizontally aligned within its bounding rectangle (one of "left", "centre", or "right").

##### Methods
- __draw(context) (void):__ uses the <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText">fillText</a> method of the passed in canvas context (__CanvasRenderingContext2D__) to draw the desired text between (x, y) and (x + width, y + height).

#### GridElementCollection
The __GridElementCollection__ class is a general reusable class that is used for encapsulating several __GridElements__ at once. It can draw its elements all at once and update them all at once. It can also take a union of the Sets returned by each element's tilesOccupied() method. Since the __GridElementCollection__ class is able to implement its own __draw()__, __update()__, and __tilesOccupied()__ methods, it subclasses the __GridElement__ class. (Note that this technique is formally known as the <a href="https://en.wikipedia.org/wiki/Composite_pattern">Composite Pattern</a>)
<center>
  <img src="Snake Clone GridElementCollection Class Diagram.png"></img>
</center>

##### Attributes
- __gridElements (Array):__ An array of the __GridElements__ associated with the collection in the order that they should be drawn/updated.

##### Methods
- __draw(context):__ loops through gridElements, calling each one's __draw()__ operation with the passed in canvas context (__CanvasRenderingContext2D__)
- __update():__ loops through gridElements, calling each one's __update()__ operation.
- __tilesOccupied()__: loops through gridElements, unioning all of their __tilesOccupied()__ Sets together and returning the result.

### Implementation-Specific Classes

#### ScoreText
The  __ScoreText__ class is an implementation-specific class because its approach for computing the text to display is not as reusable as desired. The __ScoreText__ class subclasses the __GridText__ class and has an additional attribute for storing the game score. The __ScoreText__ class updates its text based off of what the score is and ensures that it is a right-aligned 3 character string.
<center>
  <img src="Snake Clone ScoreText Class Diagram.png"></img>
</center>

##### Attributes
- __score (integer):__ the score in the current game (a number between 0 and 999).

##### Methods
- __computeText() (string):__ converts the game score into a right-aligned 3 character string
and then returns the string for use by the __update()__ operation.
- __update() (void):__ Sets the text equal to what is returned by the __computeText()__ operation
and then calls the super class's __update()__ operation.

#### Snake
The  __Snake__ class is an implementation-specific class because its use case is specific to the game of Snake. The __Snake__ class subclasses the __GridElementCollection__ class and stores its tiles in the super class's gridElements array. The __Snake__ class also has a direction attribute for moving its head and body, as well as operations that facilitate coding the game.
<center>
  <img src="Snake Clone Snake Class Diagram.png"></img>
</center>

##### Attributes
- __direction (Enum):__ the direction that the snake is moving in. One of "up", "down", "left", "right".

##### Methods
- __tileInFrontOfHead() (Pair of Integers):__ Computes and returns the row index and column index of the tile directly in front of the snake's head using the direction attribute. Used for collision detection.
- __advanceOneTile() (void):__ Adjusts the Snake's tiles so that the head is moved one tile in the snake's direction and the snake's body moves along with the head.
- __eat(rowIndex, columnIndex) (void):__ Adds a tile at the specified row index and column index to the snake's body.

#### SnakeGame
The __SnakeGame__ class is an implementation-specific class because it is the implementation! This class subclasses the __Game__ class and includes the code for initializing the game elements, storing the game state, operations for changing the game state, and additional overhead for handling user input.
<center>
  <img src="Snake Clone SnakeGame Class Diagram.png"></img>
</center>

##### Attributes
- __grid (Grid):__ The __Grid__ instance used by the game.
- __walls (GridElement):__ The __GridElement__ that represents the boundary of the game. Should the snake leave the boundary. It is game over!
- __wallTiles (Set):__ A __Set__ that corresponds to the __tilesOccupied()__ of the __walls__ attribute. Note that __wallTiles__ is computed only once (when we call __initElements__) so that we don't have to keep calling __tilesOccupied()__.
- __snake (Snake):__ The __Snake__ that corresponds with game element that the player moves with the arrow keys.
- __floor (GridElement):__ The __GridElement__ used for drawing the background area upon which the snake is allowed to move.
- __topBackgroundArea (GridElement):__ The __GridElement__ used for drawing the background area upon which the score text is displayed.
- __scoreText (GridText):__ The __GridText__ that displays the game score.
- __titleText (GridText):__ The __GridText__ that displays the main title on the title screen.
- __miniTitleText (GridText):__ The __GridText__ that displays the game title in the score area.
- __subtitleText (GridText):__ The __GridText__ that displays text below the main title on the title screen.
- __gameOverText (GridText):__ The __GridText__ that displays the text "Game Over" in place of the game title in the score area when the game is over.
- __gameOverSubtitleText (GridText):__ The __GridText__ that displays additional instructions (regarding how to start a new game) when the game is over.
- __titleState (SnakeTitleState):__ The game state that corresponds to displaying the title screen.
- __playState (SnakePlayState):__ The game state that corresponds to playing the game.
- __gameOverState (SnakeGameOverState):__ The game state that corresponds to the game being over.

##### Methods
- __onKeyDown(event) (void):__ Handles the overhead involved with user keyboard input and passes the event to the current game state.
- __initElements() (void):__ Calls all of the over __init__ operations to initialize the game elements and then initializes the game state objects. Also computes the value for the __wallTiles__ attribute.
- __showTitleScreen() (void):__ Changes the game state to __titleState__.
- __newGame() (void):__ Changes the game state to __playState__ and starts a new game.
- __showGameOverScreen() (void):__ Changes the game state to __gameOverState__.
- __initGrid() (Grid):__ Returns an initialized value for the __grid__ attribute.
- __initWalls() (GridElement):__ Returns an initialized value for the __walls__ attribute.
- __initFloor() (GridElement):__ Returns an initialized value for the __floor__ attribute.
- __initTopBackgroundArea() (GridElement):__ Returns an initialized value for the __topBackgroundArea__ attribute.
- __initScoreText() (GridText):__ Returns an initialized value for the __scoreText__ attribute.
- __initTitleText() (GridText):__ Returns an initialized value for the __titleText__ attribute.
- __initMiniTitleText() (GridText):__ Returns an initialized value for the __miniTitleText__ attribute.
- __initSubtitleText() (GridText):__ Returns an initialized value for the __subtitleText__ attribute.
- __initGameOverText() (GridText):__ Returns an initialized value for the __gameOverText__ attribute.
- __initGameOverSubtitleText() (GridText):__ Returns an initialized value for the __gameOverSubtitleText__ attribute.

### Outstanding Issues
- Game Design Document needs a navigation zone to make jumping to sections and subsections easier.
- Game state classes to be refactored and documented.
- Class diagram showing all classes and the inheritance structure to be added.
- Support for dynamic sizing of the game screen to be added.
- Graphics to be enhanced with images instead of raw colours.
- An eating animation to be added for when the snake eats a tile.
- Sound effects to be added.
- High scores to be added.
