import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
  ymGoal?: string;
}

declare global {
  interface Window {
    ym?: (counterId: number, action: string, goal: string) => void;
  }
}

const LEAD_URL = "https://functions.poehali.dev/e3e54825-1bd4-41dd-afd9-bbbaddff5837";

export default function ContactModal({ isOpen, onClose, source = "Сайт", ymGoal = "leadgoal" }: ContactModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (window.ym) window.ym(107246756, "reachGoal", "popupopen");
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setStatus("loading");

    try {
      const url = LEAD_URL;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, source }),
      });
      if (res.ok) {
        setStatus("success");
        if (window.ym) window.ym(107246756, "reachGoal", ymGoal);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    setName("");
    setPhone("");
    setStatus("idle");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-background border border-white/15 rounded-2xl w-full max-w-md p-8 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon name="X" size={20} />
        </button>

        {status === "success" ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-4">
              <Icon name="Check" size={32} className="text-amber-400" />
            </div>
            <h3 className="font-display text-2xl font-bold mb-2">Заявка принята!</h3>
            <p className="text-muted-foreground">Свяжусь с вами в течение 24 часов. Без спама и навязчивых звонков.</p>
            <button
              onClick={handleClose}
              className="mt-6 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold px-8 py-3 rounded-lg transition-all hover:scale-105 active:scale-95"
            >
              Отлично!
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="font-display text-2xl font-bold mb-1">Бесплатный аудит рекламы</h3>
              <p className="text-muted-foreground text-sm">
                Оставьте контакт — разберу ваш кабинет и покажу, где утечка бюджета. Результат через 24 часа.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Ваше имя</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Александр"
                  required
                  className="w-full bg-card border border-white/15 rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-amber-400/60 placeholder:text-muted-foreground/40 transition-colors"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Телефон</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+7 (999) 000-00-00"
                  required
                  className="w-full bg-card border border-white/15 rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-amber-400/60 placeholder:text-muted-foreground/40 transition-colors"
                />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-sm">Ошибка отправки. Попробуйте ещё раз или напишите напрямую.</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold py-4 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Отправляю..." : "Получить аудит бесплатно →"}
              </button>

              <p className="text-center text-muted-foreground/50 text-xs">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}