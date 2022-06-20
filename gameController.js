let curBoard;
let curPlayer;

let curHeldPiece;
let curHeldPieceStartingPosition;

function startGame() { // 15 rows and 15 columns
    const starterPosition = [
    ['.', '.', '.', '.', '.', '.', '.', 'R', '.', '.', '.', '.', '.', '.', '.' ],
    ['.', '.', '.', '.', 'e', '.', '.', '.', 'n', 'g', '.', '.', '.', '.', '.' ],
    ['.', '.', 't', 'h', '.', '.', 'l', 'i', '.', '.', '.', '.', '.', '.', '.' ],
    ['R', '.', '.', '.', 'e', 'l', '.', '.', 'e', '.', '.', '.', '.', '.', 'R' ],
    ['.', '.', 's', 'p', '.', '.', 'i', 'v', '.', '.', '.', '.', '.', '.', '.' ],
    ['.', '.', '.', '.', 'e', 'h', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    ['.', '.', 'b', 'e', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    ['.', '.', '.', '.', '.', '.', '.', 'R', '.', '.', '.', '.', '.', '.', '.' ],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    ['R', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'R' ],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    ['.', '.', '.', '.', '.', '.', '.', 'R', '.', '.', '.', '.', '.', '.', '.' ],
    ];

//  (column, row): (0,0) - (14,14)
//  0,0  1,0  2,0  3,0  4,0  5,0  6,0  7,0  8,0  9,0  10,0  11,0  12,0  13,0  14,0  //
//  0,1  1,1  2,1  3,1  4,1  5,1  6,1  7,1  8,1  9,1  10,1  11,1  12,1  13,1  14,1  //
//  0,2  1,2  2,2  3,2  4,2  5,2  6,2  7,2  8,2  9,2  10,2  11,2  12,2  13,2  14,2  //
//  0,3  1,3  2,3  3,3  4,3  5,3  6,3  7,3  8,3  9,3  10,3  11,3  12,3  13,3  14,3  //
//  0,4  1,4  2,4  3,4  4,4  5,4  6,4  7,4  8,4  9,4  10,4  11,4  12,4  13,4  14,4  //
//  0,5  1,5  2,5  3,5  4,5  5,5  6,5  7,5  8,5  9,5  10,5  11,5  12,5  13,5  14,5  //
//  0,6  1,6  2,6  3,6  4,6  5,6  6,6  7,6  8,6  9,6  10,6  11,6  12,6  13,6  14,6  //
//  0,7  1,7  2,7  3,7  4,7  5,7  6,7  7,7  8,7  9,7  10,7  11,7  12,7  13,7  14,7  //
//  0,8  1,8  2,8  3,8  4,8  5,8  6,8  7,8  8,8  9,8  10,8  11,8  12,8  13,8  14,8  //
//  0,9  1,9  2,9  3,9  4,9  5,9  6,9  7,9  8,9  9,9  10,9  11,9  12,9  13,9  14,9  //
//  0,10 1,10 2,10 3,10 4,10 5,10 6,10 7,10 8,10 9,10 10,10 11,10 12,10 13,10 14,10 //
//  0,11 1,11 2,11 3,11 4,11 5,11 6,11 7,11 8,11 9,11 10,11 11,11 12,11 13,11 14,11 //
//  0,12 1,12 2,12 3,12 4,12 5,12 6,12 7,12 8,12 9,12 10,12 11,12 12,12 13,12 14,12 //
//  0,13 1,13 2,13 3,13 4,13 5,13 6,13 7,13 8,13 9,13 10,13 11,13 12,13 13,13 14,13 //
//  0,14 1,14 2,14 3,14 4,14 5,14 6,14 7,14 8,14 9,14 10,14 11,14 12,14 13,14 14,14 //

    const starterPlayer = 'white';

    loadPosition(starterPosition, starterPlayer);
}

function loadPosition(position, playerToMove) {
    curBoard = position;
    curPlayer = playerToMove;

    // column i and row j
    for (let i = 0; i < 15 ; i++) { // 15 columns
        for (let j = 0; j < 15; j++) { // 15 rows
            if (position[i][j] != '.') {
                loadPiece(position[i][j], [i + 1, j + 1]);
            }
        }
    }
}

function loadPiece(piece, position) {
    const squareElement = document.getElementById(`${position[0]}${position[1]}`);

    const pieceElement = document.createElement('img');
    pieceElement.classList.add('piece');
    pieceElement.id = piece;
    pieceElement.draggable = false;
    pieceElement.src = getPieceImageSource(piece);

    squareElement.appendChild(pieceElement);
    //gameController.js:62 Uncaught TypeError: Cannot read properties of null (reading 'appendChild')
    // at loadPiece (gameController.js:62:19)
    // at loadPosition (gameController.js:47:17)
    // at startGame (gameController.js:36:5)
    // at gameController.js:373:1
}

function getPieceImageSource(piece) {
    switch (piece) {
        case 'a': return 'assets/A.png';
        case 'b': return 'assets/B.png';
        case 'c': return 'assets/C.png';
        case 'd': return 'assets/D.png';
        case 'e': return 'assets/E.png';
        case 'f': return 'assets/F.png';
        case 'g': return 'assets/G.png';
        case 'h': return 'assets/H.png';
        case 'i': return 'assets/I.png';
        case 'j': return 'assets/J.png';
        case 'k': return 'assets/K.png';
        case 'l': return 'assets/L.png';
        case 'm': return 'assets/M.png';
        case 'n': return 'assets/N.png';
        case 'o': return 'assets/O.png';
        case 'p': return 'assets/P.png';
        case 'q': return 'assets/Q.png';
        case 'r': return 'assets/R.png';
        case 's': return 'assets/S.png';
        case 't': return 'assets/T.png';
        case 'u': return 'assets/U.png';
        case 'v': return 'assets/V.png';
        case 'w': return 'assets/W.png';
        case 'x': return 'assets/X.png';
        case 'y': return 'assets/Y.png';
        case 'z': return 'assets/Z.png';
        case 'R': return 'assets/red-rose.png';
    }
}

function setPieceHoldEvents() {
    let mouseX, mouseY = 0;

    document.addEventListener('mousemove', function(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    let pieces = document.getElementsByClassName('piece');
    let movePieceInterval;
    let hasIntervalStarted = false;

    for (const piece of pieces) {
        piece.addEventListener('mousedown', function(event) {
            mouseX = event.clientX;
            mouseY = event.clientY;
        
            if (hasIntervalStarted === false) {
                piece.style.position = 'absolute';

                curHeldPiece = piece;
                const curHeldPieceStringPosition = piece.parentElement.id.split('');

                curHeldPieceStartingPosition = [parseInt(curHeldPieceStringPosition[0]) - 1, parseInt(curHeldPieceStringPosition[1]) - 1];

                movePieceInterval = setInterval(function() {
                    piece.style.top = mouseY - piece.offsetHeight / 2 + window.scrollY + 'px';
                    piece.style.left = mouseX - piece.offsetWidth / 2 + window.scrollX + 'px';
                }, 1);
        
                hasIntervalStarted = true;
            }
        });
    }
        
    document.addEventListener('mouseup', function(event) {
        window.clearInterval(movePieceInterval);

        if (curHeldPiece != null) {
            const boardElement = document.querySelector('.board');

            if ((event.clientX > boardElement.offsetLeft - window.scrollX && event.clientX < boardElement.offsetLeft + boardElement.offsetWidth - window.scrollX) &&
                (event.clientY > boardElement.offsetTop - window.scrollY && event.clientY < boardElement.offsetTop + boardElement.offsetHeight - window.scrollY)) {
                    const mousePositionOnBoardX = event.clientX - boardElement.offsetLeft + window.scrollX;
                    const mousePositionOnBoardY = event.clientY - boardElement.offsetTop + window.scrollY;

                    const boardBorderSize = parseInt(getComputedStyle(document.querySelector('.board'), null)
                                                .getPropertyValue('border-left-width')
                                                .split('px')[0]);

                    const xPosition = Math.floor((mousePositionOnBoardX - boardBorderSize) / document.getElementsByClassName('square')[0].offsetWidth);
                    const yPosition = Math.floor((mousePositionOnBoardY - boardBorderSize) / document.getElementsByClassName('square')[0].offsetHeight);

                    const pieceReleasePosition = [yPosition, xPosition];

                    if (!(pieceReleasePosition[0] == curHeldPieceStartingPosition[0] && pieceReleasePosition[1] == curHeldPieceStartingPosition[1])) {
                        if (validateMovement(curHeldPieceStartingPosition, pieceReleasePosition)) {
                            movePiece(curHeldPiece, curHeldPieceStartingPosition, pieceReleasePosition);
                        }
                    }
                }

            curHeldPiece.style.position = 'static';
            curHeldPiece = null;
            curHeldPieceStartingPosition = null;
        }
    
        hasIntervalStarted = false;
    });
}

function movePiece(piece, startingPosition, endingPosition) {
    // move validations to validateMovement()
    const boardPiece = curBoard[startingPosition[0]][startingPosition[1]];
    
    if (boardPiece != '.') {
        if ((boardPiece === boardPiece.toUpperCase() && curPlayer == 'black') ||
            (boardPiece === boardPiece.toLowerCase() && curPlayer == 'white')) {
                curBoard[startingPosition[0]][startingPosition[1]] = '.';
                curBoard[endingPosition[0]][endingPosition[1]] = boardPiece;

                const destinationSquare = document.getElementById(`${endingPosition[0] + 1}${endingPosition[1] + 1}`);
                destinationSquare.textContent = '';
                destinationSquare.appendChild(piece);

                // check if is check/checkmate

                if (curPlayer == 'white') {
                    curPlayer = 'black';
                } else {
                    curPlayer = 'white';
                }
        }
    }
}

function validateMovement(startingPosition, endingPosition) {
    const boardPiece = curBoard[startingPosition[0]][startingPosition[1]];
    
    switch (boardPiece) {
        case 'r':
        case 'R': return validateRookMovement(startingPosition, endingPosition);
        case 'n':
        case 'N': return validateKnightMovement(startingPosition, endingPosition);
        case 'b':
        case 'B': return validateBishopMovement(startingPosition, endingPosition);
        case 'q':
        case 'Q': return validateQueenMovement(startingPosition, endingPosition);
        case 'k': 
        case 'K': return validateKingMovement(startingPosition, endingPosition);
        case 'p': return validatePawnMovement('white', startingPosition, endingPosition);
        case 'P': return validatePawnMovement('black', startingPosition, endingPosition);
    }
}

function validateBishopMovement(startingPosition, endingPosition) {
    if (endingPosition[0] - endingPosition[1] == startingPosition[0] - startingPosition[1] ||
        endingPosition[0] + endingPosition[1] == startingPosition[0] + startingPosition[1]) {
            if (!validatePathIsBlocked(startingPosition, endingPosition)) {
                return false;
            }
            // validate if move puts own king in check
            return true;
    } else {
        return false;
    }
}

function validateRookMovement(startingPosition, endingPosition) {
    if (endingPosition[0] == startingPosition[0] || endingPosition[1] == startingPosition[1]) {
        if (!validatePathIsBlocked(startingPosition, endingPosition)) {
            return false;
        }
        // validate if move puts own king in check
        return true;
    } else {
        return false;
    }
}

function validateKingMovement(startingPosition, endingPosition) {
    if ([-1, 0, 1].includes(endingPosition[0] - startingPosition[0]) && [-1, 0, 1].includes(endingPosition[1] - startingPosition[1])) {
        if (isFriendlyPieceOnEndingPosition(endingPosition)) {
            return false;
        }
        // validate if move puts own king in check
        // validate castling
        return true;
    } else {
        return false;
    }
}

function validateQueenMovement(startingPosition, endingPosition) {
    if (endingPosition[0] - endingPosition[1] == startingPosition[0] - startingPosition[1] ||
        endingPosition[0] + endingPosition[1] == startingPosition[0] + startingPosition[1] ||
        endingPosition[0] == startingPosition[0] || endingPosition[1] == startingPosition[1]) {
            if (!validatePathIsBlocked(startingPosition, endingPosition)) {
                return false;
            }
            // validate if move puts own king in check
            return true;
    } else {
        return false;
    }
}

function validatePawnMovement(pawnColor, startingPosition, endingPosition) {
    direction = pawnColor == 'black' ? 1 : -1;

    let isCapture = false;

    if (endingPosition[0] == startingPosition[0] + direction &&
        [startingPosition[1] - 1, startingPosition[1] + 1].includes(endingPosition[1])) {
            // validate if is en passant
            if (isEnemyPieceOnEndingPosition(endingPosition)) {
                isCapture = true;
            }
        }

    // validate if is promotion
    let isFirstMove = false;

    if ((pawnColor == 'white' && startingPosition[0] == 6) || (pawnColor == 'black' && startingPosition[0] == 1)) {
        isFirstMove = true;
    }

    if (((endingPosition[0] == startingPosition[0] + direction || (endingPosition[0] == startingPosition[0] + direction * 2 && isFirstMove)) &&
         endingPosition[1] == startingPosition[1]) || isCapture) {
            if (isFriendlyPieceOnEndingPosition(endingPosition)) {
                return false;
            } else if (!isCapture && isEnemyPieceOnEndingPosition(endingPosition)) {
                return false;
            }

            // validate if move puts own king in check
            return true;
    } else {
        return false;
    }
}

function validateKnightMovement(startingPosition, endingPosition) {
    if (([-2, 2].includes(endingPosition[0] - startingPosition[0]) && [-1, 1].includes(endingPosition[1] - startingPosition[1])) || 
        ([-2, 2].includes(endingPosition[1] - startingPosition[1]) && [-1, 1].includes(endingPosition[0] - startingPosition[0]))) {
            if (isFriendlyPieceOnEndingPosition(endingPosition)) {
                return false;
            }
            // validate if move puts own king in check
            return true;
    } else {
        return false;
    }
}

function validatePathIsBlocked(startingPosition, endingPosition) {
    const xDifference = endingPosition[0] - startingPosition[0]
    const yDifference = endingPosition[1] - startingPosition[1]

    let xDirection = 0;
    let yDirection = 0;

    if (xDifference < 0) {
        xDirection = -1;
    } else if (xDifference > 0) {
        xDirection = 1;
    }

    if (yDifference < 0) {
        yDirection = -1;
    } else if (yDifference > 0) {
        yDirection = 1;
    }

    let squareX = startingPosition[0] + xDirection;
    let squareY = startingPosition[1] + yDirection;

    while (squareX != endingPosition[0] || squareY != endingPosition[1]) {
        const isSquareOccupied = document.getElementById(`${squareX + 1}${squareY + 1}`).children.length > 0;

        if (isSquareOccupied) {
            return false;
        }

        squareX += xDirection;
        squareY += yDirection;
    }
    
    if (isFriendlyPieceOnEndingPosition(endingPosition)) {
        return false;
    } else {
        // enemy piece has been captured
    }

    return true;
}

function isFriendlyPieceOnEndingPosition(endingPosition) {
    const destinationSquare = document.getElementById(`${endingPosition[0] + 1}${endingPosition[1] + 1}`);

    if (destinationSquare.children.length > 0) {
        const destinationPiece = destinationSquare.querySelector('.piece').id;
    
        if (destinationPiece == destinationPiece.toUpperCase() && curPlayer == 'black' ||
            destinationPiece == destinationPiece.toLowerCase() && curPlayer == 'white') {
                return true;
        } else {
            return false;
        }        
    } else {
        return false;
    }
}

function isEnemyPieceOnEndingPosition(endingPosition) {
    const destinationSquare = document.getElementById(`${endingPosition[0] + 1}${endingPosition[1] + 1}`);

    if (destinationSquare.children.length > 0) {
        const destinationPiece = destinationSquare.querySelector('.piece').id;
    
        if (destinationPiece == destinationPiece.toUpperCase() && curPlayer == 'white' ||
            destinationPiece == destinationPiece.toLowerCase() && curPlayer == 'black') {
                return true;
        } else {
            return false;
        }        
    } else {
        return false;
    }
}

startGame();
setPieceHoldEvents();
