import { useEffect, useRef } from "react";

const useOusideClick = (onClose, listenCapture = true) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleEvent = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("click", handleEvent, listenCapture);
    return () => {
      document.body.removeEventListener("click", handleEvent, listenCapture);
    };
  }, [ref, onClose, listenCapture]);

  return ref;
};

export default useOusideClick;
