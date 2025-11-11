import { useReducer, useEffect } from "react";

interface FileFormdataState {
  senderId: string;
  recipientId: string;
  fileName: string;
  fileExtension: string;
}

type FileFormDataAction =
  | { type: "SET_SENDER_ID"; payload: string }
  | { type: "SET_RECIPIENT_ID"; payload: string }
  | { type: "SET_FILE_NAME"; payload: string }
  | { type: "SET_FILE_EXTENSION"; payload: string }
  | { type: "SET_FILE_INFO"; payload: { name: string; extension: string } }
  | { type: "RESET_FORM" }
  | { type: "RESET_FILE_DATA" };

const initialState: FileFormdataState = {
  senderId: "",
  recipientId: "",
  fileName: "",
  fileExtension: "",
};

function fileFormDataReducer(
  state: FileFormdataState,
  action: FileFormDataAction
): FileFormdataState {
  switch (action.type) {
    case "SET_SENDER_ID":
      return { ...state, senderId: action.payload };
    case "SET_RECIPIENT_ID":
      return { ...state, recipientId: action.payload };
    case "SET_FILE_NAME":
      return { ...state, fileName: action.payload };
    case "SET_FILE_EXTENSION":
      return { ...state, fileExtension: action.payload };
    case "SET_FILE_INFO":
      return {
        ...state,
        fileName: action.payload.name,
        fileExtension: action.payload.extension,
      };
    case "RESET_FILE_DATA":
      return {
        ...state,
        fileName: "",
        fileExtension: "",
      };
    case "RESET_FORM":
      return {
        ...initialState,
        senderId: state.senderId,
      };
    default:
      return state;
  }
}

export function useFileFormdata(currentUserId?: string) {
  const [state, dispatch] = useReducer(fileFormDataReducer, {
    ...initialState,
    senderId: currentUserId ?? "",
  });

  useEffect(() => {
    if (currentUserId) {
      dispatch({ type: "SET_SENDER_ID", payload: currentUserId });
    }
  }, [currentUserId]);

  const setSenderId = (id: string) => {
    dispatch({ type: "SET_SENDER_ID", payload: id });
  };
  const setRecipientId = (id: string) => {
    dispatch({ type: "SET_RECIPIENT_ID", payload: id });
  };
  const setFileName = (name: string) => {
    dispatch({ type: "SET_FILE_NAME", payload: name });
  };
  const setFileExtension = (extension: string) => {
    dispatch({ type: "SET_FILE_EXTENSION", payload: extension });
  };

  // Convenience methods
  const setFileInfo = (name: string, extension: string) => {
    dispatch({ type: "SET_FILE_INFO", payload: { name, extension } });
  };
  const resetFileData = () => {
    dispatch({ type: "RESET_FILE_DATA" });
  };
  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
  };

  return {
    // states
    senderId: state.senderId,
    recipientId: state.recipientId,
    fileName: state.fileName,
    fileExtension: state.fileExtension,
    // methods
    setSenderId,
    setRecipientId,
    setFileName,
    setFileExtension,
    setFileInfo,
    resetFileData,
    resetForm,
  };
}
