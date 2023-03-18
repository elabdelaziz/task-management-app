import { DataState } from "@/reducers/dataSlice";
import { AnyAction, current } from "@reduxjs/toolkit";

export const onGetLocalData = (state: DataState, action: AnyAction) => {
  return { ...state, data: action.payload };
};

export const onDragAndDrop = (state: DataState, action: AnyAction) => {
  const { colIndex, prevColIndex, taskIndex, droppableAreaIndex } = action.payload;
  const board = state.data.find((board) => board.isActive);
  const prevCol = board!.columns.find((_col, i) => i === prevColIndex);
  const task = prevCol!.tasks.splice(taskIndex, 1)[0];
  const dropBoard = board!.columns.find((_col, i) => i === colIndex);

  if (dropBoard && task) {
    dropBoard.tasks.splice(droppableAreaIndex, 0, task)
  }
};

export const onSetActiveColumn = (state: DataState, action: AnyAction) => {
  const boardIndex = action.payload;
  const activeBoard = state.data.find((b) => b.isActive);
  const board = state.data.find((_b, i) => i === boardIndex);
  if (board) {
    if (activeBoard) activeBoard.isActive = false;
    board.isActive = true;
    return boardIndex;
  }
};
