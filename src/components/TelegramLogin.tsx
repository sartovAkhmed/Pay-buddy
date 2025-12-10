// src/components/TelegramLogin.jsx
export default function TelegramLogin() {
  const openTelegram = () => {
    const bot = '8573655300';
    const origin = window.location.origin; // https://our.paybuddy.tw1.su
    const redirect = encodeURIComponent('https://api.paybudy.tw1.su/api/telegram/check'); // ← убрали пробел
    const url = `https://oauth.telegram.org/auth?bot_id=${bot}&origin=${origin}&redirect_uri=${redirect}&request_access=write`; // ← убрали пробел после bot_id=
    window.open(url, '_blank', 'width=600,height=600');
  };

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.origin !== 'https://api.paybudy.tw1.su') return; // ← убрали пробел
      if (e.data.type === 'telegram_auth') {
        localStorage.setItem('token', e.data.token);
        console.log('JWT получен', e.data.token);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  return <button onClick={openTelegram}>Войти через Telegram</button>;
}