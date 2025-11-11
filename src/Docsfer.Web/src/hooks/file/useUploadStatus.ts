import { useReducer } from "react";

interface UploadStatusState {
  errorMessage: string;
  submitError: string;
  submitSuccess: string;
}

type UploadStatusAction =
  | { type: "SET_ERROR_MESSAGE"; payload: string }
  | { type: "SET_SUBMIT_ERROR"; payload: string }
  | { type: "SET_SUBMIT_SUCCESS"; payload: string }
  | { type: "CLEAR_ALL" }
  | { type: "CLEAR_ERRORS" };

const initialState: UploadStatusState = {
  errorMessage: "",
  submitError: "",
  submitSuccess: "",
};

function uploadStatusReducer(
  state: UploadStatusState,
  action: UploadStatusAction
): UploadStatusState {
  switch (action.type) {
    case "SET_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: action.payload,
        submitError: "",
        submitSuccess: "",
      };
    case "SET_SUBMIT_ERROR":
      return {
        ...state,
        submitError: action.payload,
        submitSuccess: "",
      };
    case "SET_SUBMIT_SUCCESS":
      return {
        ...state,
        submitSuccess: action.payload,
        errorMessage: "",
        submitError: "",
      };
    case "CLEAR_ALL":
      return initialState;
    case "CLEAR_ERRORS":
      return {
        ...state,
        errorMessage: "",
        submitError: "",
      };
    default:
      return state;
  }
}

export function useUploadStatus() {
  const [state, dispatch] = useReducer(uploadStatusReducer, initialState);

  const setErrorMessage = (message: string) => {
    dispatch({ type: "SET_ERROR_MESSAGE", payload: message });
  };
  const setSubmitError = (message: string) => {
    dispatch({ type: "SET_SUBMIT_ERROR", payload: message });
  };
  const setSubmitSuccess = (message: string) => {
    dispatch({ type: "SET_SUBMIT_SUCCESS", payload: message });
  };
  const clearAll = () => {
    dispatch({ type: "CLEAR_ALL" });
  };
  const clearErrors = () => {
    dispatch({ type: "CLEAR_ERRORS" });
  };

  return {
    errorMessage: state.errorMessage,
    submitError: state.submitError,
    submitSuccess: state.submitSuccess,
    // actions
    setErrorMessage,
    setSubmitError,
    setSubmitSuccess,
    clearAll,
    clearErrors,
  };
}
