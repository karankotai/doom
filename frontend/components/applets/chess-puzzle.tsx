"use client";

import { useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Chess piece types
type PieceType = "k" | "q" | "r" | "b" | "n" | "p" | null;
type PieceColor = "w" | "b" | null;

interface Piece {
  type: PieceType;
  color: PieceColor;
}

interface Position {
  row: number;
  col: number;
}

interface ChessPuzzleProps {
  question: string;
  hint?: string;
  initialPosition: string; // FEN-like string for piece positions
  correctMove: {
    from: Position;
    to: Position;
  };
  onComplete?: (success: boolean) => void;
}

// Unicode chess pieces
const PIECE_SYMBOLS: Record<string, string> = {
  wk: "♔",
  wq: "♕",
  wr: "♖",
  wb: "♗",
  wn: "♘",
  wp: "♙",
  bk: "♚",
  bq: "♛",
  br: "♜",
  bb: "♝",
  bn: "♞",
  bp: "♟",
};

// Board type - always 8x8
type Board = (Piece | null)[][];

// Parse position string to board
// Format: "wKe1,wQd1,bKe8,bQd8" etc.
function parsePosition(positionString: string): Board {
  const board: Board = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null) as (Piece | null)[]);

  if (!positionString) return board;

  const pieces = positionString.split(",");
  for (const piece of pieces) {
    if (piece.length < 4) continue;
    const color = piece[0] as PieceColor;
    const type = piece[1]?.toLowerCase() as PieceType;
    const colChar = piece[2];
    const rowChar = piece[3];
    if (!colChar || !rowChar) continue;

    const col = colChar.charCodeAt(0) - 97; // 'a' = 0
    const row = 8 - parseInt(rowChar); // '8' = 0, '1' = 7

    if (row >= 0 && row < 8 && col >= 0 && col < 8) {
      const boardRow = board[row];
      if (boardRow) {
        boardRow[col] = { type, color };
      }
    }
  }

  return board;
}

// Safe board access helper
function getPiece(board: Board, row: number, col: number): Piece | null {
  if (row < 0 || row > 7 || col < 0 || col > 7) return null;
  return board[row]?.[col] ?? null;
}

// Check if a square is within board bounds
function isInBounds(row: number, col: number): boolean {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

// Get all legal moves for a piece at a given position
function getLegalMoves(board: Board, row: number, col: number): Position[] {
  const piece = getPiece(board, row, col);
  if (!piece || !piece.type || !piece.color) return [];

  const moves: Position[] = [];
  const { type, color } = piece;

  const addMoveIfValid = (toRow: number, toCol: number) => {
    if (!isInBounds(toRow, toCol)) return;
    const targetPiece = getPiece(board, toRow, toCol);
    // Can't capture own pieces
    if (targetPiece && targetPiece.color === color) return;
    moves.push({ row: toRow, col: toCol });
  };

  const addSlidingMoves = (directions: [number, number][]) => {
    for (const [rowDir, colDir] of directions) {
      let newRow = row + rowDir;
      let newCol = col + colDir;
      while (isInBounds(newRow, newCol)) {
        const targetPiece = getPiece(board, newRow, newCol);
        if (targetPiece) {
          // Can capture enemy piece but can't go further
          if (targetPiece.color !== color) {
            moves.push({ row: newRow, col: newCol });
          }
          break;
        }
        moves.push({ row: newRow, col: newCol });
        newRow += rowDir;
        newCol += colDir;
      }
    }
  };

  switch (type) {
    case "k": // King - one square in any direction
      for (let rowDir = -1; rowDir <= 1; rowDir++) {
        for (let colDir = -1; colDir <= 1; colDir++) {
          if (rowDir === 0 && colDir === 0) continue;
          addMoveIfValid(row + rowDir, col + colDir);
        }
      }
      break;

    case "q": // Queen - combines rook and bishop
      addSlidingMoves([
        [-1, 0], [1, 0], [0, -1], [0, 1], // Rook directions
        [-1, -1], [-1, 1], [1, -1], [1, 1], // Bishop directions
      ]);
      break;

    case "r": // Rook - horizontal and vertical
      addSlidingMoves([
        [-1, 0], [1, 0], [0, -1], [0, 1],
      ]);
      break;

    case "b": // Bishop - diagonal
      addSlidingMoves([
        [-1, -1], [-1, 1], [1, -1], [1, 1],
      ]);
      break;

    case "n": // Knight - L-shape
      const knightOffsets: [number, number][] = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1],
      ];
      for (const offset of knightOffsets) {
        addMoveIfValid(row + offset[0], col + offset[1]);
      }
      break;

    case "p": // Pawn
      const direction = color === "w" ? -1 : 1; // White moves up (negative row), black moves down
      const startRow = color === "w" ? 6 : 1;

      // Forward one square
      const oneForward = row + direction;
      if (isInBounds(oneForward, col) && !getPiece(board, oneForward, col)) {
        moves.push({ row: oneForward, col });

        // Forward two squares from starting position
        if (row === startRow) {
          const twoForward = row + 2 * direction;
          if (!getPiece(board, twoForward, col)) {
            moves.push({ row: twoForward, col });
          }
        }
      }

      // Diagonal captures
      for (const captureCol of [col - 1, col + 1]) {
        if (isInBounds(oneForward, captureCol)) {
          const targetPiece = getPiece(board, oneForward, captureCol);
          if (targetPiece && targetPiece.color !== color) {
            moves.push({ row: oneForward, col: captureCol });
          }
        }
      }
      break;
  }

  return moves;
}

// Check if a move is legal
function isLegalMove(
  board: Board,
  from: Position,
  to: Position
): boolean {
  const legalMoves = getLegalMoves(board, from.row, from.col);
  return legalMoves.some((move) => move.row === to.row && move.col === to.col);
}

// Convert row/col to algebraic notation
function toAlgebraic(row: number, col: number): string {
  return String.fromCharCode(97 + col) + (8 - row);
}

export function ChessPuzzle({
  question,
  hint,
  initialPosition,
  correctMove,
  onComplete,
}: ChessPuzzleProps) {
  const [board, setBoard] = useState<Board>(() =>
    parsePosition(initialPosition)
  );
  const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);
  const [lastMove, setLastMove] = useState<{ from: Position; to: Position } | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Calculate legal moves for the selected piece
  const legalMoves = useMemo(() => {
    if (!selectedSquare) return [];
    return getLegalMoves(board, selectedSquare.row, selectedSquare.col);
  }, [board, selectedSquare]);

  // Check if a square is a legal move target
  const isLegalTarget = useCallback(
    (row: number, col: number): boolean => {
      return legalMoves.some((move) => move.row === row && move.col === col);
    },
    [legalMoves]
  );

  const handleSquareClick = useCallback(
    (row: number, col: number) => {
      if (isComplete) return;

      const clickedPiece = getPiece(board, row, col);

      // If no square is selected
      if (!selectedSquare) {
        // Only allow selecting pieces (in a real app, you'd check whose turn it is)
        if (clickedPiece) {
          setSelectedSquare({ row, col });
        }
        return;
      }

      // If clicking the same square, deselect
      if (selectedSquare.row === row && selectedSquare.col === col) {
        setSelectedSquare(null);
        return;
      }

      // If clicking another piece of the same color, select that instead
      const selectedPiece = getPiece(board, selectedSquare.row, selectedSquare.col);
      if (clickedPiece && selectedPiece?.color === clickedPiece.color) {
        setSelectedSquare({ row, col });
        return;
      }

      // Check if the move is legal
      const from = selectedSquare;
      const to = { row, col };

      if (!isLegalMove(board, from, to)) {
        // Not a legal move - just deselect
        setSelectedSquare(null);
        return;
      }

      // Check if this is the correct move for the puzzle
      const isCorrect =
        from.row === correctMove.from.row &&
        from.col === correctMove.from.col &&
        to.row === correctMove.to.row &&
        to.col === correctMove.to.col;

      if (isCorrect) {
        // Make the move
        const newBoard = board.map((r) => [...r]);
        const fromRow = newBoard[from.row];
        const toRow = newBoard[to.row];
        if (fromRow && toRow) {
          toRow[to.col] = fromRow[from.col] ?? null;
          fromRow[from.col] = null;
        }
        setBoard(newBoard);
        setLastMove({ from, to });
        setFeedback("correct");
        setIsComplete(true);
        onComplete?.(true);
      } else {
        // Legal chess move but wrong puzzle answer
        setFeedback("incorrect");
        setTimeout(() => setFeedback(null), 1000);
      }

      setSelectedSquare(null);
    },
    [board, selectedSquare, correctMove, isComplete, onComplete]
  );

  const resetPuzzle = () => {
    setBoard(parsePosition(initialPosition));
    setSelectedSquare(null);
    setLastMove(null);
    setFeedback(null);
    setIsComplete(false);
    setShowHint(false);
  };

  const renderPiece = (piece: Piece | null) => {
    if (!piece) return null;
    const symbol = PIECE_SYMBOLS[`${piece.color}${piece.type}`];
    return (
      <span
        className={cn(
          "text-4xl sm:text-5xl select-none drop-shadow-md transition-transform",
          piece.color === "w" ? "text-white" : "text-gray-900"
        )}
        style={{
          textShadow: piece.color === "w"
            ? "0 1px 2px rgba(0,0,0,0.5), 0 0 1px rgba(0,0,0,0.8)"
            : "0 1px 2px rgba(255,255,255,0.3)",
        }}
      >
        {symbol}
      </span>
    );
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl sm:text-2xl">{question}</CardTitle>
        {hint && showHint && (
          <p className="text-sm text-muted-foreground mt-2 animate-pop">{hint}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Feedback banner */}
        {feedback && (
          <div
            className={cn(
              "text-center py-2 px-4 rounded-xl font-bold text-white animate-pop",
              feedback === "correct" ? "bg-primary" : "bg-destructive"
            )}
          >
            {feedback === "correct" ? "Correct! Well done!" : "Not quite - try again!"}
          </div>
        )}

        {/* Chess board */}
        <div className="relative aspect-square w-full max-w-md mx-auto">
          {/* Board border */}
          <div className="absolute inset-0 rounded-2xl bg-amber-900 p-1.5 sm:p-2 shadow-duo">
            {/* File labels (a-h) */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-around px-2 text-xs font-bold text-muted-foreground">
              {["a", "b", "c", "d", "e", "f", "g", "h"].map((file) => (
                <span key={file}>{file}</span>
              ))}
            </div>
            {/* Rank labels (1-8) */}
            <div className="absolute -left-5 top-0 bottom-0 flex flex-col justify-around py-2 text-xs font-bold text-muted-foreground">
              {[8, 7, 6, 5, 4, 3, 2, 1].map((rank) => (
                <span key={rank}>{rank}</span>
              ))}
            </div>

            {/* Board grid */}
            <div className="grid grid-cols-8 grid-rows-8 h-full w-full overflow-hidden rounded-xl">
              {board.map((row, rowIndex) =>
                row.map((piece, colIndex) => {
                  const isLight = (rowIndex + colIndex) % 2 === 0;
                  const isSelected =
                    selectedSquare?.row === rowIndex &&
                    selectedSquare?.col === colIndex;
                  const isLastMoveFrom =
                    lastMove?.from.row === rowIndex &&
                    lastMove?.from.col === colIndex;
                  const isLastMoveTo =
                    lastMove?.to.row === rowIndex &&
                    lastMove?.to.col === colIndex;
                  const isHinted =
                    showHint &&
                    !isComplete &&
                    correctMove.from.row === rowIndex &&
                    correctMove.from.col === colIndex;
                  const isLegalMoveSquare = isLegalTarget(rowIndex, colIndex);
                  const isCapture = isLegalMoveSquare && piece !== null;

                  return (
                    <button
                      key={`${rowIndex}-${colIndex}`}
                      className={cn(
                        "relative flex items-center justify-center transition-all duration-150",
                        isLight ? "bg-amber-100" : "bg-amber-600",
                        isSelected && "ring-4 ring-inset ring-accent",
                        (isLastMoveFrom || isLastMoveTo) && "bg-yellow-300",
                        isHinted && "animate-pulse bg-accent/50",
                        !isComplete && piece && "cursor-pointer hover:brightness-110",
                        !isComplete && isLegalMoveSquare && "cursor-pointer hover:bg-accent/30"
                      )}
                      onClick={() => handleSquareClick(rowIndex, colIndex)}
                      disabled={isComplete && !piece}
                    >
                      {renderPiece(piece)}

                      {/* Move indicator - dot for empty squares, ring for captures */}
                      {selectedSquare && isLegalMoveSquare && !piece && (
                        <div className="absolute w-4 h-4 rounded-full bg-black/25" />
                      )}
                      {selectedSquare && isCapture && (
                        <div className="absolute inset-1 rounded-full ring-4 ring-black/25" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3 justify-center pt-4">
          {!isComplete && hint && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHint(true)}
              disabled={showHint}
            >
              {showHint ? "Hint shown" : "Show hint"}
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={resetPuzzle}>
            Reset
          </Button>
          {isComplete && (
            <Button size="sm" onClick={() => onComplete?.(true)}>
              Continue
            </Button>
          )}
        </div>

        {/* Move notation helper */}
        {selectedSquare && (
          <p className="text-center text-sm text-muted-foreground">
            Selected: {toAlgebraic(selectedSquare.row, selectedSquare.col)}
            {legalMoves.length > 0
              ? ` - ${legalMoves.length} legal move${legalMoves.length === 1 ? "" : "s"}`
              : " - No legal moves"}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// Example puzzle presets
export const SAMPLE_PUZZLES = [
  {
    id: "mate-in-1-back-rank",
    question: "White to move - Find the checkmate!",
    hint: "The rook can deliver checkmate on the back rank.",
    initialPosition: "bKg8,bPf7,bPg7,bPh7,wRa1,wKg1",
    correctMove: { from: { row: 7, col: 0 }, to: { row: 0, col: 0 } }, // Ra1-a8#
  },
  {
    id: "mate-in-1-queen",
    question: "White to move - Deliver checkmate!",
    hint: "The queen can attack the king with no escape.",
    initialPosition: "bKh8,bPg7,bPh7,wQf6,wKg1",
    correctMove: { from: { row: 2, col: 5 }, to: { row: 0, col: 5 } }, // Qf6-h8#
  },
  {
    id: "fork-knight",
    question: "White to move - Win material with a fork!",
    hint: "The knight can attack two pieces at once.",
    initialPosition: "bKe8,bQd8,bRa8,wNc3,wKe1",
    correctMove: { from: { row: 2, col: 5 }, to: { row: 3, col: 3 } }, // Nc3-d5 (threatens Ne7+ forking K and Q)
  },
];
