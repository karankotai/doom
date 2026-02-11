"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
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

interface ChessMove {
  from: Position;
  to: Position;
}

interface ChessPuzzleProps {
  question: string;
  hint?: string;
  initialPosition: string; // FEN-like string for piece positions
  correctMove?: ChessMove; // Legacy single-move support
  correctMoves?: ChessMove[]; // Multi-step: [playerMove1, opponentResponse1, playerMove2, ...]
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

// Apply a move to a board and return a new board
function applyMove(board: Board, from: Position, to: Position): Board {
  const newBoard = board.map((r) => [...r]);
  const fromRow = newBoard[from.row];
  const toRow = newBoard[to.row];
  if (fromRow && toRow) {
    toRow[to.col] = fromRow[from.col] ?? null;
    fromRow[from.col] = null;
  }
  return newBoard;
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
    case "k":
      for (let rowDir = -1; rowDir <= 1; rowDir++) {
        for (let colDir = -1; colDir <= 1; colDir++) {
          if (rowDir === 0 && colDir === 0) continue;
          addMoveIfValid(row + rowDir, col + colDir);
        }
      }
      break;

    case "q":
      addSlidingMoves([
        [-1, 0], [1, 0], [0, -1], [0, 1],
        [-1, -1], [-1, 1], [1, -1], [1, 1],
      ]);
      break;

    case "r":
      addSlidingMoves([[-1, 0], [1, 0], [0, -1], [0, 1]]);
      break;

    case "b":
      addSlidingMoves([[-1, -1], [-1, 1], [1, -1], [1, 1]]);
      break;

    case "n": {
      const knightOffsets: [number, number][] = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1],
      ];
      for (const offset of knightOffsets) {
        addMoveIfValid(row + offset[0], col + offset[1]);
      }
      break;
    }

    case "p": {
      const direction = color === "w" ? -1 : 1;
      const startRow = color === "w" ? 6 : 1;
      const oneForward = row + direction;
      if (isInBounds(oneForward, col) && !getPiece(board, oneForward, col)) {
        moves.push({ row: oneForward, col });
        if (row === startRow) {
          const twoForward = row + 2 * direction;
          if (!getPiece(board, twoForward, col)) {
            moves.push({ row: twoForward, col });
          }
        }
      }
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
  }

  return moves;
}

// Check if a move is legal
function isLegalMove(board: Board, from: Position, to: Position): boolean {
  const legalMoves = getLegalMoves(board, from.row, from.col);
  return legalMoves.some((move) => move.row === to.row && move.col === to.col);
}

// Convert row/col to algebraic notation
function toAlgebraic(row: number, col: number): string {
  return String.fromCharCode(97 + col) + (8 - row);
}

function movesMatch(a: Position, b: Position): boolean {
  return a.row === b.row && a.col === b.col;
}

export function ChessPuzzle({
  question,
  hint,
  initialPosition,
  correctMove,
  correctMoves: rawCorrectMoves,
  onComplete,
}: ChessPuzzleProps) {
  // Normalize: support legacy single-move or new multi-move format
  const allMoves = useMemo<ChessMove[]>(() => {
    if (rawCorrectMoves && rawCorrectMoves.length > 0) return rawCorrectMoves;
    if (correctMove) return [correctMove];
    return [];
  }, [rawCorrectMoves, correctMove]);

  // Determine player color from first move
  const playerColor = useMemo<PieceColor>(() => {
    if (allMoves.length === 0) return "w";
    const firstMove = allMoves[0]!;
    const board = parsePosition(initialPosition);
    const piece = getPiece(board, firstMove.from.row, firstMove.from.col);
    return piece?.color ?? "w";
  }, [allMoves, initialPosition]);

  // Total player moves required (every other move in allMoves, starting from index 0)
  const playerMoveCount = useMemo(() => {
    return Math.ceil(allMoves.length / 2);
  }, [allMoves]);

  const [board, setBoard] = useState<Board>(() => parsePosition(initialPosition));
  const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);
  const [lastMove, setLastMove] = useState<{ from: Position; to: Position } | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0); // Index in allMoves
  const [isOpponentMoving, setIsOpponentMoving] = useState(false);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const opponentTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup opponent timer on unmount
  useEffect(() => {
    return () => {
      if (opponentTimerRef.current) clearTimeout(opponentTimerRef.current);
    };
  }, []);

  // Calculate legal moves for the selected piece
  const legalMoves = useMemo(() => {
    if (!selectedSquare) return [];
    return getLegalMoves(board, selectedSquare.row, selectedSquare.col);
  }, [board, selectedSquare]);

  const isLegalTarget = useCallback(
    (row: number, col: number): boolean => {
      return legalMoves.some((move) => move.row === row && move.col === col);
    },
    [legalMoves]
  );

  // Apply opponent's response move after player makes correct move
  const playOpponentResponse = useCallback(
    (currentBoard: Board, opponentMoveIdx: number) => {
      const opponentMove = allMoves[opponentMoveIdx];
      if (!opponentMove) return;

      setIsOpponentMoving(true);
      opponentTimerRef.current = setTimeout(() => {
        const newBoard = applyMove(currentBoard, opponentMove.from, opponentMove.to);
        setBoard(newBoard);
        setLastMove({ from: opponentMove.from, to: opponentMove.to });
        setCurrentMoveIndex(opponentMoveIdx + 1);
        setIsOpponentMoving(false);

        // Add opponent move to history
        const piece = getPiece(currentBoard, opponentMove.from.row, opponentMove.from.col);
        const pieceStr = piece ? PIECE_SYMBOLS[`${piece.color}${piece.type}`] || "" : "";
        setMoveHistory((prev) => [
          ...prev,
          `${pieceStr}${toAlgebraic(opponentMove.to.row, opponentMove.to.col)}`,
        ]);
      }, 500);
    },
    [allMoves]
  );

  const handleSquareClick = useCallback(
    (row: number, col: number) => {
      if (isComplete || isOpponentMoving) return;

      const clickedPiece = getPiece(board, row, col);

      // If no square is selected
      if (!selectedSquare) {
        // Only allow selecting player's pieces
        if (clickedPiece && clickedPiece.color === playerColor) {
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

      const from = selectedSquare;
      const to = { row, col };

      if (!isLegalMove(board, from, to)) {
        setSelectedSquare(null);
        return;
      }

      // Check if this matches the expected move at currentMoveIndex
      const expectedMove = allMoves[currentMoveIndex];
      if (!expectedMove) {
        setSelectedSquare(null);
        return;
      }

      const isCorrect =
        movesMatch(from, expectedMove.from) &&
        movesMatch(to, expectedMove.to);

      if (isCorrect) {
        // Apply the move
        const newBoard = applyMove(board, from, to);
        setBoard(newBoard);
        setLastMove({ from, to });

        // Add to move history
        const piece = getPiece(board, from.row, from.col);
        const targetPiece = getPiece(board, to.row, to.col);
        const pieceStr = piece ? PIECE_SYMBOLS[`${piece.color}${piece.type}`] || "" : "";
        const captureStr = targetPiece ? "x" : "";
        setMoveHistory((prev) => [
          ...prev,
          `${pieceStr}${captureStr}${toAlgebraic(to.row, to.col)}`,
        ]);

        const nextIdx = currentMoveIndex + 1;

        // Check if puzzle is complete
        if (nextIdx >= allMoves.length) {
          // All moves made — puzzle complete!
          setFeedback("correct");
          setIsComplete(true);
          setCurrentMoveIndex(nextIdx);
          onComplete?.(true);
        } else {
          // There's an opponent response — play it
          setCurrentMoveIndex(nextIdx);
          playOpponentResponse(newBoard, nextIdx);
        }
      } else {
        // Legal chess move but wrong puzzle answer
        setFeedback("incorrect");
        setTimeout(() => setFeedback(null), 1200);
      }

      setSelectedSquare(null);
    },
    [
      board, selectedSquare, allMoves, currentMoveIndex,
      isComplete, isOpponentMoving, playerColor,
      onComplete, playOpponentResponse,
    ]
  );

  const resetPuzzle = useCallback(() => {
    if (opponentTimerRef.current) clearTimeout(opponentTimerRef.current);
    setBoard(parsePosition(initialPosition));
    setSelectedSquare(null);
    setLastMove(null);
    setFeedback(null);
    setIsComplete(false);
    setShowHint(false);
    setCurrentMoveIndex(0);
    setIsOpponentMoving(false);
    setMoveHistory([]);
  }, [initialPosition]);

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
          textShadow:
            piece.color === "w"
              ? "0 1px 2px rgba(0,0,0,0.5), 0 0 1px rgba(0,0,0,0.8)"
              : "0 1px 2px rgba(255,255,255,0.3)",
        }}
      >
        {symbol}
      </span>
    );
  };

  // Current step indicator for multi-move puzzles
  const currentPlayerStep = Math.floor(currentMoveIndex / 2) + 1;
  const isMultiStep = playerMoveCount > 1;

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl sm:text-2xl">{question}</CardTitle>
        {hint && showHint && (
          <p className="text-sm text-muted-foreground mt-2 animate-pop">
            {hint}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Multi-step progress indicator */}
        {isMultiStep && !isComplete && (
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: playerMoveCount }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  i < currentPlayerStep - 1
                    ? "bg-primary scale-100"
                    : i === currentPlayerStep - 1
                    ? "bg-primary/60 scale-125 animate-pulse"
                    : "bg-muted"
                )}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-2">
              Move {currentPlayerStep} of {playerMoveCount}
            </span>
          </div>
        )}

        {/* Feedback banner */}
        {feedback && (
          <div
            className={cn(
              "text-center py-2 px-4 rounded-xl font-bold text-white animate-pop",
              feedback === "correct" ? "bg-primary" : "bg-destructive"
            )}
          >
            {feedback === "correct"
              ? "Correct! Well done!"
              : "Not quite — try again!"}
          </div>
        )}

        {/* Opponent moving indicator */}
        {isOpponentMoving && (
          <div className="text-center py-1 text-sm text-muted-foreground animate-pulse">
            Opponent responds...
          </div>
        )}

        {/* Chess board */}
        <div className="relative aspect-square w-full max-w-md mx-auto">
          <div className="absolute inset-0 rounded-2xl bg-amber-900 p-1.5 sm:p-2 shadow-3d">
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
                  // Hint: highlight the piece that should move (first expected move)
                  const expectedMove = allMoves[currentMoveIndex];
                  const isHinted =
                    showHint &&
                    !isComplete &&
                    expectedMove &&
                    expectedMove.from.row === rowIndex &&
                    expectedMove.from.col === colIndex;
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
                        !isComplete &&
                          !isOpponentMoving &&
                          piece &&
                          piece.color === playerColor &&
                          "cursor-pointer hover:brightness-110",
                        !isComplete &&
                          !isOpponentMoving &&
                          isLegalMoveSquare &&
                          "cursor-pointer hover:bg-accent/30"
                      )}
                      onClick={() => handleSquareClick(rowIndex, colIndex)}
                      disabled={(isComplete || isOpponentMoving) && !piece}
                    >
                      {renderPiece(piece)}

                      {/* Move indicator */}
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

        {/* Move history */}
        {moveHistory.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5 text-sm">
            {moveHistory.map((move, i) => (
              <span
                key={i}
                className={cn(
                  "px-2 py-0.5 rounded-lg font-mono text-xs",
                  i % 2 === 0
                    ? "bg-primary/15 text-primary font-semibold"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {i % 2 === 0 ? `${Math.floor(i / 2) + 1}.` : ""} {move}
              </span>
            ))}
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-3 justify-center pt-2">
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
        {selectedSquare && !isOpponentMoving && (
          <p className="text-center text-sm text-muted-foreground">
            Selected: {toAlgebraic(selectedSquare.row, selectedSquare.col)}
            {legalMoves.length > 0
              ? ` — ${legalMoves.length} legal move${legalMoves.length === 1 ? "" : "s"}`
              : " — No legal moves"}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
