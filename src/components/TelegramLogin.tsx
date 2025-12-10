// src/components/TelegramLogin.jsx
import { useEffect } from "react";

export default function TelegramLogin() {
  /* 1. Парсим хэш, пришедший из Telegram (WebApp или окно) */
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const tgAuthResult = params.get('tgAuthResult');
    if (!tgAuthResult) return;

    fetch('https://api.paybudy.tw1.su/api/telegram/webapp', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: new URLSearchParams({tgAuthResult})
    })
      .then(r => r.json())
      .then(d => {
        if (d.token) {
          localStorage.setItem('token', d.token);
          window.location.hash = ''; // убираем #tgAuthResult
        } else {
          console.error('Auth failed', d);
        }
      });
  }, []);

  /* 2. (Опц.) Кнопка для тех, кто зашёл не из ТГ */
  const handleLogin = () => {
    const bot = '8573655300';
    const origin = window.location.origin;
    const redirect = encodeURIComponent('https://api.paybudy.tw1.su/api/telegram/check');
    const url = `https://oauth.telegram.org/auth?bot_id=${bot}&origin=${origin}&redirect_uri=${redirect}&request_access=write`;
    const win = window.open(url, '_blank', 'width=600,height=600');

    // ловим токен из всплывающего окна (тот же postMessage)
    window.addEventListener('message', e => {
      if (e.origin !== 'https://api.paybudy.tw1.su') return;
      if (e.data.type === 'telegram_auth' && e.data.token) {
        localStorage.setItem('token', e.data.token);
        win?.close();
      }
    });
  };

  return (
    <button onClick={handleLogin} className="bg-white p-2 rounded-xl">
      Войти через Telegram
    </button>
  );
}

// import { Send } from "lucide-react";
// import { useEffect } from "react";
//
// export default function TelegramLogin() {
//   const openTelegram = () => {
//     const bot = '8573655300';
//     const origin = window.location.origin; // https://our.paybuddy.tw1.su
//     const redirect = encodeURIComponent('https://api.paybudy.tw1.su/api/telegram/check');
//     const url = `https://oauth.telegram.org/auth?bot_id=${bot}&origin=${origin}&redirect_uri=${redirect}&request_access=write`;
//     window.open(url, '_blank', 'width=600,height=600');
//   };
//
//   useEffect(() => {
//     const handler = (e: MessageEvent) => {
//       if (e.origin !== 'https://api.paybudy.tw1.su') return;
//       if (e.data.type === 'telegram_auth') {
//         localStorage.setItem('token', e.data.token);
//         console.log('JWT получен', e.data.token);
//       }
//     };
//     window.addEventListener('message', handler);
//     return () => window.removeEventListener('message', handler);
//   }, []);
//
//   return (
//     <button className="bg-white p-2 rounded-xl" onClick={openTelegram}>
//       <Send color="black" />
//     </button>
//   );
// }
// // export default function TelegramLogin() {
// //   const openTelegram = () => {
// //     const bot = "8573655300"; // без @
// //     const origin = "https://our.paybuddy.tw1.su"; // https://our.paybuddy.tw1.su
// //     const redirect = encodeURIComponent(
// //       "https://api.paybudy.tw1.su/api/telegram/check"
// //     );
// //     const url = `https://oauth.telegram.org/auth?bot_id=${bot}&origin=${origin}&redirect_uri=${redirect}&request_access=write`;
// //     window.open(url, "_blank", "width=600,height=600");
// //   };
// //
// //   /* слушаем сообщение из всплывающего окна */
// //   useEffect(() => {
// //     const handler = (e: MessageEvent) => {
// //       if (e.origin !== "https://api.paybudy.tw1.su") return;
// //       if (e.data.type === "telegram_auth") {
// //         localStorage.setItem("token", e.data.token);
// //         console.log("JWT получен", e.data.token);
// //       }
// //     };
// //     window.addEventListener("message", handler);
// //     return () => window.removeEventListener("message", handler);
// //   }, []);
// //
// //   return (
// //     <button className="bg-white p-2 rounded-xl" onClick={openTelegram}>
// //       <Send color="black" />
// //     </button>
// //   );
// // }
