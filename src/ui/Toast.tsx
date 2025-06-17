import toast from "react-hot-toast";
import "../styles/toast.css";
import { CheckIcon, ErrorIcon } from "./icons/bold";
import { CloseSquareIcon } from "./icons/outline";

export function ToastSuccess(message: string) {
  toast(
    (t) => (
      <span className="w-full flex items-center justify-between gap-6">
        <div className="h-full flex items-center">
          <div className="w-1 h-full bg-green-500"></div>
          <div className="p-4 text-green-500 flex items-center gap-2">
            <CheckIcon className="w-5 h-5" />
            <div className="text-sm">{message}</div>
          </div>
        </div>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="text-primary-3/50 p-4"
        >
          <CloseSquareIcon className="w-6 h-6" />
        </button>
      </span>
    ),
    {
      style: {
        borderRadius: "8px",
        maxWidth: "none",
        minWidth: "100%",
        padding: "0px",
        overflow: "hidden",
        width: "100%",
        background: "#fff",
        border: "1px solid #e2e8f0",
      },
      duration: 4000,
    }
  );
}

export function ToastError(message: string) {
  toast(
    (t) => (
      <span className="w-full flex items-center justify-between gap-6">
        <div className="h-full flex items-center">
          <div className="w-1 h-full bg-red-600"></div>
          <div className="p-4 text-red-600 flex items-center gap-2">
            <ErrorIcon className="w-5 h-5" />
            <div className="text-sm">{message}</div>
          </div>
        </div>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="text-primary-3/50 p-4"
        >
          <CloseSquareIcon className="w-6 h-6" />
        </button>
      </span>
    ),
    {
      style: {
        borderRadius: "8px",
        maxWidth: "none",
        minWidth: "100%",
        padding: "0px",
        overflow: "hidden",
        width: "100%",
        background: "#fff",
        border: "1px solid #e2e8f0",
      },
      duration: 4000,
    }
  );
}
