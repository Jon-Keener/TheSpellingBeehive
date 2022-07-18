let curBoard;
let curPlayer;

let curHeldPiece;
let curHeldPieceStartingPosition;

function startGame() { // 15 columns and 15 rows: (0,0) - (14,14)
    const starterPosition = [
    ['.', '.', '.', '.', '.', '.', '.', 'R', '.', '.', '.', '.', '.', '.', '.' ],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    ['R', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'R' ],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    ['.', '.', '.', '.', '.', '.', '.', 'R', '.', '.', '.', '.', '.', '.', '.' ],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    ['R', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'R' ],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    ['.', '.', '.', '.', '.', '.', '.', 'R', '.', '.', '.', '.', '.', '.', '.' ],
    ];

    // Initialize the letter tiles and the player racks.
    var tiles = ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'b', 'b', 'b', 'c', 'c', 'd', 'd', 'd', 'd', 'e', 'e',
                 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'f', 'f', 'g', 'g', 'g', 'h', 'h', 'i', 'i', 'i', 'i', 
                 'i', 'i', 'i', 'i', 'i', 'j', 'k', 'l', 'l', 'l', 'l', 'm', 'm', 'n', 'n', 'n', 'n', 'n', 'n', 'o', 
                 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'p', 'p', 'q', 'r', 'r', 'r', 'r', 'r', 'r', 's', 's', 's', 's', 
                 't', 't', 't', 't', 't', 't', 'u', 'u', 'u', 'u', 'v', 'v', 'w', 'w', 'x', 'y', 'y', 'z', ' ', ' '];
    var p1rack = ['.', '.', '.', '.', '.', '.'];
    var p2rack = ['.', '.', '.', '.', '.', '.'];

    // Populate the player racks by alternating the draws.
    for (let i = 0; i < p1rack.length; i++) {

        let j = Math.floor(Math.random() * tiles.length);
        p1rack[i] = tiles[j]; // Assign to P1 rack.
        tiles.splice(j, 1); // Delete from tiles.

        j = Math.floor(Math.random() * tiles.length);
        p2rack[i] = tiles[j]; // Assign to P2 rack.
        tiles.splice(j, 1); // Delete from tiles.
    }

    console.log( 'p1rack: ', p1rack.sort() );
    console.log( 'p2rack: ', p2rack.sort() );
    console.log( 'tiles: ', tiles.sort() );

    const starterPlayer = 'white';

    // Add P1 rack to starterPosition, unless undefined.
    if (typeof p1rack[0] !== 'undefined') { starterPosition[0][0] = p1rack[0] } else { starterPosition[0][0] = '.' };
    if (typeof p1rack[1] !== 'undefined') { starterPosition[0][1] = p1rack[1] } else { starterPosition[0][1] = '.' };
    if (typeof p1rack[2] !== 'undefined') { starterPosition[1][0] = p1rack[2] } else { starterPosition[1][0] = '.' };
    if (typeof p1rack[3] !== 'undefined') { starterPosition[1][1] = p1rack[3] } else { starterPosition[1][1] = '.' };
    if (typeof p1rack[4] !== 'undefined') { starterPosition[0][2] = p1rack[4] } else { starterPosition[0][2] = '.' };
    if (typeof p1rack[5] !== 'undefined') { starterPosition[0][3] = p1rack[5] } else { starterPosition[0][3] = '.' };

    // Add P2 rack to starterPosition, unless undefined.
    if (typeof p2rack[0] !== 'undefined') { starterPosition[14][11] = p2rack[0] } else { starterPosition[14][11] = '.' };
    if (typeof p2rack[1] !== 'undefined') { starterPosition[13][12] = p2rack[1] } else { starterPosition[13][12] = '.' };
    if (typeof p2rack[2] !== 'undefined') { starterPosition[13][13] = p2rack[2] } else { starterPosition[13][13] = '.' };
    if (typeof p2rack[3] !== 'undefined') { starterPosition[12][14] = p2rack[3] } else { starterPosition[12][14] = '.' };
    if (typeof p2rack[4] !== 'undefined') { starterPosition[14][13] = p2rack[4] } else { starterPosition[14][13] = '.' };
    if (typeof p2rack[5] !== 'undefined') { starterPosition[13][14] = p2rack[5] } else { starterPosition[13][14] = '.' };

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
        case ' ': return 'assets/BLANK.png';
        case 'R': return 'assets/pink-rose.png';
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
    
    // switch (boardPiece) {
    //     case 'r':
    //     case 'R': return validateRookMovement(startingPosition, endingPosition);
    //     case 'n':
    //     case 'N': return validateKnightMovement(startingPosition, endingPosition);
    //     case 'b':
    //     case 'B': return validateBishopMovement(startingPosition, endingPosition);
    //     case 'q':
    //     case 'Q': return validateQueenMovement(startingPosition, endingPosition);
    //     case 'k': 
    //     case 'K': return validateKingMovement(startingPosition, endingPosition);
    //     case 'p': return validatePawnMovement('white', startingPosition, endingPosition);
    //     case 'P': return validatePawnMovement('black', startingPosition, endingPosition);
    // }
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

