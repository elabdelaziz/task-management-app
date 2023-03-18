import {
  onGetLocalData,
  onDragAndDrop,
  onSetActiveColumn,
} from "@/actions/dataSliceActions";
import { createSlice } from "@reduxjs/toolkit";

export interface DataState {
  data: BoardsEntity[];
  activeColIndex: number;
}
export interface BoardsEntity {
  name: string;
  isActive: boolean;
  columns: ColumnsEntity[];
}
export interface ColumnsEntity {
  id: number;
  name: string;
  tasks: TasksEntity[];
}
export interface TasksEntity {
  title: string;
  description: string;
  id: number;
  status: string;
  subtasks: SubtasksEntity[];
}
export interface SubtasksEntity {
  title: string;
  isCompleted: boolean;
}

const initialState: DataState = {
  data: [],
  activeColIndex: 0,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    getLocalData: (state, action) => onGetLocalData(state, action),
    dragAndDrop: (state, action) => onDragAndDrop(state, action),
    setActiveColumn: (state, action) => {
      const activeColumn = onSetActiveColumn(state, action);
      state.activeColIndex = activeColumn;
    },
  },
});

export const { getLocalData, dragAndDrop, setActiveColumn } = dataSlice.actions;

export default dataSlice.reducer;
