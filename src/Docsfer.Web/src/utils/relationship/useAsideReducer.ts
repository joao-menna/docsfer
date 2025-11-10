import type { stateInterface, actionInterface } from "@/types/relationship";

export function asideReducer(state: stateInterface, action: actionInterface) {
  switch (action.type) {
    case "ENTER":
      if (!state.isPinned && !state.isKeepMinimized)
        return { ...state, isExpanded: true };
      return state;
    case "LEAVE":
      if (!state.isPinned) return { ...state, isExpanded: false };
      return state;
    case "KEEP_PINNED":
      return {
        ...state,
        isKeepMinimized: false,
        isPinned: !state.isPinned,
        isExpanded: true,
      };
    case "KEEP_MINIMIZED":
      return {
        ...state,
        isKeepMinimized: !state.isKeepMinimized,
        isPinned: false,
        isExpanded: false,
      };
    default:
      return state;
  }
}
