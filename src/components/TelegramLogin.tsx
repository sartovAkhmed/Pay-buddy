import { Send } from "lucide-react";
import { useEffect } from "react";

// src/components/TelegramLogin.jsx
export default function TelegramLogin() {
  const openTelegram = () => {
    const bot = "8573655300"; // без @
    const origin = "https://our.paybuddy.tw1.su"; // https://our.paybuddy.tw1.su
    const redirect = encodeURIComponent(
      "https://api.paybudy.tw1.su/api/telegram/check"
    );
    const url = `https://oauth.telegram.org/auth?bot_id=${bot}&origin=${origin}&redirect_uri=${redirect}&request_access=write`;
    window.open(url, "_blank", "width=600,height=600");
  };

  /* слушаем сообщение из всплывающего окна */
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.origin !== "https://api.paybudy.tw1.su") return;
      if (e.data.type === "telegram_auth") {
        localStorage.setItem("token", e.data.token);
        console.log("JWT получен", e.data.token);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <button className="bg-white p-2 rounded-xl" onClick={openTelegram}>
      <Send color="black" />
    </button>
  );
}
