import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return <Toaster position="top-right" toastOptions={{ duration: 2200 }} />;
};

export default ToastProvider;
