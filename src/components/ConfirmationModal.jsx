import { Cross, Warning } from "@/icons/index";
import React from "react";

const ConfirmationModal = ({ onClose, subHeading, functionCall, loading }) => {
  return (
    <div className="bg-surface p-4 rounded-2xl">
      <div className="flex items-start justify-between">
        <h2 className="mb-4 text-xl font-semibold">Confirm Action</h2>
        <div className="cursor-pointer" onClick={onClose}>
          <Cross className="h-5 w-5" />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center text-center mb-4 gap-1">
        <Warning />
        <p className="font-bold text-xl">Hang On a Sec!</p>
        <p className="text-sm">{subHeading}</p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          disabled={loading}
          type="button"
          onClick={() => {
            functionCall();
            onClose();
          }}
          className="text-white bg-accent cursor-pointer w-full py-2 rounded-lg"
        >
          Confirm
        </button>

        <button
          type="button"
          onClick={onClose}
          className="bg-background text-surface shadow-lg cursor-pointer w-full py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
