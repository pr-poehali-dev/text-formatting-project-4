import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";

declare global {
  interface Window {
    ym?: (counterId: number, action: string, goal: string) => void;
  }
}

const HERO_IMAGE = "https://cdn.poehali.dev/projects/06d842e1-c888-43bf-b28a-97d35d5e5dd2/files/1f0a741e-0e9c-494b-9791-3026b2e6de24.jpg";

const reviews = [
  // 0
  { author: "Arturius",          date: "5 февраля 2026",   img: "https://cdn.poehali.dev/files/6762a050-4705-4f48-8af7-eccc0fd411e4.jpg" },
  // 1
  { author: "Akimova_art",       date: "6 февраля 2026",   img: "https://cdn.poehali.dev/files/10c2f78c-9612-4de7-8be2-d552923f04b8.jpg" },
  // 2
  { author: "korifeylogo",       date: "15 января 2026",   img: "https://cdn.poehali.dev/files/481485f3-b098-45ce-81b5-af2db9de3dd2.jpg" },
  // 3
  { author: "svsb77",            date: "3 февраля 2026",   img: "https://cdn.poehali.dev/files/272dc2cb-0aa3-4eb1-af12-a2abbdc3d43e.jpg" },
  // 4
  { author: "comradeLV",         date: "29 января 2026",   img: "https://cdn.poehali.dev/files/125ef1a5-f60c-45ad-b441-4f6d2abee9eb.jpg" },
  // 5
  { author: "v88vap",            date: "29 декабря 2025",  img: "https://cdn.poehali.dev/files/871e860c-4b92-4255-9fd6-ec46a0aa8423.jpg" },
  // 6
  { author: "TranslateCapitals", date: "20 декабря 2025",  img: "https://cdn.poehali.dev/files/38e965f7-7edf-46cd-bb36-76a8c4b8b3ce.jpg" },
  // 7
  { author: "alexandrastaffpro", date: "11 декабря 2025",  img: "https://cdn.poehali.dev/files/e82ad6bd-68d3-4fde-a0da-31ffae6522f0.jpg" },
  // 8
  { author: "dasatarasenko9",    date: "20 ноября 2025",   img: "https://cdn.poehali.dev/files/11c24c08-e00a-49d0-b632-6caedc7abe32.jpg" },
  // 9  — Arturius #2 (+9 от #0)
  { author: "Arturius",          date: "28 января 2026",   img: "https://cdn.poehali.dev/files/c5643bd9-724e-4cc3-8127-003db9dfdaf9.jpg" },
  // 10
  { author: "escmsc",            date: "17 ноября 2025",   img: "https://cdn.poehali.dev/files/dfcd0d55-8248-4592-9455-e9000e135338.jpg" },
  // 11
  { author: "morozriel",         date: "13 ноября 2025",   img: "https://cdn.poehali.dev/files/eeabc731-03e9-48cf-ae56-887a5befd6c8.jpg" },
  // 12
  { author: "Gravip",            date: "15 октября 2025",  img: "https://cdn.poehali.dev/files/8ba6309c-5d22-43fc-b518-da12d0277b1f.jpg" },
  // 13 — svsb77 #2 (+10 от #3)
  { author: "svsb77",            date: "3 февраля 2026",   img: "https://cdn.poehali.dev/files/ac96cc2b-abdb-41a9-b4cd-8737f497f151.jpg" },
  // 14
  { author: "ManooMaria",        date: "20 октября 2025",  img: "https://cdn.poehali.dev/files/f1dd388f-77df-4538-83fe-00f5644896a9.jpg" },
  // 15
  { author: "m4ximka201815",     date: "8 октября 2025",   img: "https://cdn.poehali.dev/files/f826ba50-db0c-44bb-8dd3-1499a9b53ceb.jpg" },
  // 16 — TranslateCapitals #2 (+10 от #6)
  { author: "TranslateCapitals", date: "3 декабря 2025",   img: "https://cdn.poehali.dev/files/0205fe0c-f864-4dd5-95f3-e9dc7ab3985a.jpg" },
  // 17
  { author: "ichigek",           date: "18 сентября 2025", img: "https://cdn.poehali.dev/files/14abc063-254a-4f21-a31a-5ec4c82cea60.jpg" },
  // 18
  { author: "Pavkich",           date: "4 сентября 2025",  img: "https://cdn.poehali.dev/files/81c95b9e-6f03-4bbb-a342-1982b06da286.jpg" },
  // 19
  { author: "phil",              date: "5 сентября 2025",  img: "https://cdn.poehali.dev/files/045f5897-945c-4da4-ae31-165489caa53d.jpg" },
  // 20 — comradeLV #2 (+16 от #4)
  { author: "comradeLV",         date: "20 ноября 2025",   img: "https://cdn.poehali.dev/files/3d162c5a-58b3-420a-adbe-5bd7f6f6d555.jpg" },
  // 21
  { author: "avd379",            date: "22 августа 2025",  img: "https://cdn.poehali.dev/files/21c8c0a6-03f1-455c-a73a-54c9c343223d.jpg" },
  // 22
  { author: "seowork23",         date: "13 августа 2025",  img: "https://cdn.poehali.dev/files/6be4e030-e245-4d80-8c9d-759b9dd86adb.jpg" },
  // 23
  { author: "buganoff82",        date: "12 августа 2025",  img: "https://cdn.poehali.dev/files/4f0bf400-b094-4512-94bc-e7a1e17c106c.jpg" },
  // 24
  { author: "smyulia",           date: "3 августа 2025",   img: "https://cdn.poehali.dev/files/b3338ce8-07c7-4784-9278-a3bbad32bd75.jpg" },
  // 25
  { author: "EKBEGOR",           date: "3 июня 2025",      img: "https://cdn.poehali.dev/files/cf88db64-d6c0-488e-bb16-5b838f7ba45a.jpg" },
  // 26 — dasatarasenko9 #2 (+18 от #8)
  { author: "dasatarasenko9",    date: "15 сентября 2025", img: "https://cdn.poehali.dev/files/edc1cf06-d7c4-40b3-80e9-6756d27e2b30.jpg" },
  // 27
  { author: "munigovskaya",      date: "23 мая 2025",      img: "https://cdn.poehali.dev/files/e95a32ab-ce48-4271-aeb5-2a91bd3ce5a3.jpg" },
  // 28
  { author: "sv775577",          date: "5 мая 2025",       img: "https://cdn.poehali.dev/files/ed285e81-fe6a-4bd7-8f1f-ef508870f530.jpg" },
  // 29 — seowork23 #2 (+7 от #22)
  { author: "seowork23",         date: "12 августа 2025",  img: "https://cdn.poehali.dev/files/319a9d07-ee78-4cd6-83a1-bed379203df2.jpg" },
  // 30
  { author: "loboffgood",        date: "29 апреля 2025",   img: "https://cdn.poehali.dev/files/df59f3a3-41f4-4630-9f25-688dbc32afb5.jpg" },
  // 31
  { author: "and2381",           date: "10 апреля 2025",   img: "https://cdn.poehali.dev/files/c762c81f-15a5-48fb-b58d-e5600e153415.jpg" },
  // 32
  { author: "redsell",           date: "10 апреля 2025",   img: "https://cdn.poehali.dev/files/0f3e1aa2-2e5d-4fc7-8a2e-ba18b1da3c70.jpg" },
  // 33 — ichigek #2 (+16 от #17)
  { author: "ichigek",           date: "6 сентября 2025",  img: "https://cdn.poehali.dev/files/44f5c541-332f-41f6-a53a-25402d32dbd2.jpg" },
  // 34
  { author: "vladimir_willis",   date: "23 марта 2025",    img: "https://cdn.poehali.dev/files/d0ece022-3d2f-4a5e-95c5-f00ccc52f877.jpg" },
  // 35
  { author: "eagleFin",          date: "26 марта 2025",    img: "https://cdn.poehali.dev/files/a5086054-d78b-4da6-851c-bc3783fdc31b.jpg" },
  // 36
  { author: "Tronid",            date: "19 марта 2025",    img: "https://cdn.poehali.dev/files/8409b519-945e-4371-82c0-17a928158abd.jpg" },
  // 37 — Akimova_art #2 (+36 от #1)
  { author: "Akimova_art",       date: "24 февраля 2025",  img: "https://cdn.poehali.dev/files/350143d5-989e-4894-b99f-f368a3bdb6aa.jpg" },
  // 38
  { author: "Mitrofanova_mariya",date: "7 февраля 2025",   img: "https://cdn.poehali.dev/files/5fb27a55-5e3b-47f9-9cef-a073adcd66cf.jpg" },
  // 39
  { author: "OOOMDS",            date: "28 февраля 2025",  img: "https://cdn.poehali.dev/files/19d2b0e9-7501-4f09-bf35-dfeff1c210fb.jpg" },
  // 40
  { author: "sloov",             date: "31 января 2025",   img: "https://cdn.poehali.dev/files/2f0c2b06-071e-4a49-a205-b9edc12149d4.jpg" },
  // 41 — dasatarasenko9 #3 (+15 от #26)
  { author: "dasatarasenko9",    date: "17 января 2025",   img: "https://cdn.poehali.dev/files/0bf5f121-c9a6-42d7-893c-b74acaaaeb4b.jpg" },
  // 42
  { author: "Aleks_Y",           date: "24 января 2025",   img: "https://cdn.poehali.dev/files/d0268d94-1c17-4e4c-a3b7-d4ac4603b32e.jpg" },
  // 43
  { author: "popovdenis22",      date: "23 декабря 2024",  img: "https://cdn.poehali.dev/files/93fc814a-3249-433b-a6fa-7ebe65ab120d.jpg" },
  // 44
  { author: "Valelord",          date: "13 августа 2024",  img: "https://cdn.poehali.dev/files/475492d3-fd65-4ba5-8c14-d886f8b9a66b.jpg" },
  // 45 — comradeLV #3 (+25 от #20)
  { author: "comradeLV",         date: "2 февраля 2024",   img: "https://cdn.poehali.dev/files/e864d5cc-1ced-4386-a5b2-d9def381f7f9.jpg" },
  // 46
  { author: "matvey_devve",      date: "4 июля 2024",      img: "https://cdn.poehali.dev/files/c2d5d821-f0b6-44d8-8bc1-29576e77d898.jpg" },
  // 47
  { author: "ava1anch9",         date: "26 июня 2024",     img: "https://cdn.poehali.dev/files/39dc987b-bc69-4940-9bae-735959baebe9.jpg" },
];

const faqItems = [
  {
    q: "35 000 рублей — это дорого за настройку рекламы",
    a: "Давайте посчитаем иначе. Если ваш текущий рекламный бюджет — 50 000 рублей в месяц, и хотя бы треть из него уходит на широкие запросы с низкой отдачей, то за один месяц вы теряете около 15 000–20 000 рублей впустую. За два месяца потери уже перекрывают стоимость системы. При этом «Товарный Снайпер» — единоразовая инвестиция, а не ежемесячный платёж. Финальные 10 500 рублей вы платите только через 30 дней работы рекламы — когда уже видите результат в своём кабинете.",
  },
  {
    q: "Я уже пробовал динамические объявления — они не работали",
    a: "Это самое частое возражение. Стандартный запуск динамики в Директе почти всегда даёт слабый результат: стандартный фид даёт Яндексу размытые данные, и система начинает хоронить ваши товары. «Умный Фид» решает эту проблему в корне. Динамика с правильно подготовленным фидом и динамика со стандартным фидом — это два принципиально разных инструмента с принципиально разными результатами.",
  },
  {
    q: "Почему не настроить это самому или через штатного маркетолога?",
    a: "Технически — можно. Но разработка скрипта для «Умного Фида» требует понимания структуры данных вашего каталога, логики работы автотаргетинга Директа и опыта именно в e-commerce. Это не задача на один вечер. Я прошёл этот путь на десятках проектов — вам не нужно проходить его заново.",
  },
  {
    q: "А вдруг результат будет хуже, чем сейчас?",
    a: "Именно для этого существует гарантия, прописанная в договоре. KPI согласовываются до старта работ на основе медиаплана. Если через 30 дней мы их не достигаем — я продолжаю работу бесплатно до результата. Вы ничем не рискуете сверх того, что уже вложили.",
  },
  {
    q: "Что будет после 30 дней ведения? Мне снова нужно будет кого-то нанимать?",
    a: "Нет. После 30 дней вы получаете настроенную и отлаженную систему, которая работает автономно. Цены и остатки синхронизируются автоматически — если товар закончился, реклама по нему выключается сама. Вы управляете системой по инструкции «Автопилот» за 15 минут в неделю.",
  },
];

const includedItems = [
  {
    icon: "BarChart3",
    title: "Медиаплан и юнит-экономика",
    desc: "Расчёт трафика, цены клика, ожидаемой конверсии и количества заказов до старта работ. Никаких сюрпризов в конце месяца.",
    bonus: false,
  },
  {
    icon: "Layers",
    title: "«Умный Фид»",
    desc: "Авторский скрипт, который разбивает каждый товар на все вариации, добавляет триггеры автотаргетинга и подставляет нужные изображения.",
    bonus: false,
    note: "Стоимость у программистов — от 15 000 руб.",
  },
  {
    icon: "Search",
    title: "Запуск динамической рекламы на Поиске",
    desc: "Система автоматически охватывает тысячи точных низкочастотных запросов по всему вашему каталогу.",
    bonus: false,
  },
  {
    icon: "RefreshCw",
    title: "Бонус №1: «Дожимающая Петля»",
    desc: "Динамический ретаргетинг — догоняем тех, кто смотрел, но не купил. Показываем именно те товары, которые человек просматривал.",
    bonus: true,
    note: "Стоимость отдельно — 10 000 руб.",
  },
  {
    icon: "TrendingUp",
    title: "Бонус №2: 30 дней ведения и вывода на KPI",
    desc: "Я остаюсь рядом в самый важный период — чищу трафик, корректирую ставки, довожу показатели до цифр медиаплана.",
    bonus: true,
  },
  {
    icon: "BookOpen",
    title: "Бонус №3: Инструкция «Автопилот»",
    desc: "Пошаговое управление системой за 15 минут в неделю. Без ежемесячных платежей агентству.",
    bonus: true,
  },
];

const NICHES = [
  "Одежда и обувь",
  "Электроника и гаджеты",
  "Детские товары",
  "Мебель и интерьер",
  "Спорт и туризм",
  "Зоотовары",
  "Косметика и парфюмерия",
  "Товары для дома",
  "Строительство и ремонт",
  "Автотовары",
  "Ювелирные украшения",
  "Продукты питания",
  "Медицинские товары",
  "Книги и канцтовары",
  "Садоводство и огород",
];

const SEASON_COEFFICIENTS: Record<string, number> = {
  "Одежда и обувь": 1.15,
  "Электроника и гаджеты": 1.2,
  "Детские товары": 1.1,
  "Мебель и интерьер": 1.05,
  "Спорт и туризм": 1.18,
  "Зоотовары": 1.0,
  "Косметика и парфюмерия": 1.12,
  "Товары для дома": 1.08,
  "Строительство и ремонт": 1.22,
  "Автотовары": 1.1,
  "Ювелирные украшения": 1.25,
  "Продукты питания": 1.0,
  "Медицинские товары": 1.05,
  "Книги и канцтовары": 1.07,
  "Садоводство и огород": 1.3,
};

function CalcSection() {
  const [budget, setBudget] = useState(50000);
  const [niche, setNiche] = useState("Электроника и гаджеты");
  const [skuCount, setSkuCount] = useState(500);
  const [useDynamic, setUseDynamic] = useState(false);
  const [channels, setChannels] = useState({ search: true, rsya: true, gallery: false });
  const [hasCompetitors, setHasCompetitors] = useState(true);
  const [avgCheck, setAvgCheck] = useState(3500);
  const [convRate, setConvRate] = useState(1.5);
  const [campaignAge, setCampaignAge] = useState<"new" | "mid" | "old">("mid");

  const toggleChannel = (key: keyof typeof channels) => {
    setChannels(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const results = useMemo(() => {
    const nicheMult = SEASON_COEFFICIENTS[niche] ?? 1.0;

    // базовый % мусорного трафика
    let junkBase = 0.28;

    // влияние каналов
    if (channels.rsya) junkBase += 0.08;
    if (channels.gallery) junkBase += 0.04;
    if (channels.search) junkBase -= 0.03;

    // влияние динамики
    if (useDynamic) junkBase += 0.06;

    // влияние количества SKU: чем больше — тем больше мусора без правильной структуры
    if (skuCount > 5000) junkBase += 0.07;
    else if (skuCount > 1000) junkBase += 0.04;
    else if (skuCount < 100) junkBase -= 0.03;

    // влияние конкурентов (скликивание)
    if (hasCompetitors) junkBase += 0.05;

    // возраст кампании: новые страдают больше
    if (campaignAge === "new") junkBase += 0.06;
    else if (campaignAge === "old") junkBase -= 0.04;

    // ниша
    junkBase *= nicheMult;

    // ограничиваем разумными пределами
    const junkRate = Math.min(Math.max(junkBase, 0.12), 0.62);

    // потери
    const lostBudget = Math.round(budget * junkRate);
    const effectiveBudget = budget - lostBudget;

    // клики и заказы
    const avgCpc = niche === "Электроника и гаджеты" ? 38 :
                   niche === "Ювелирные украшения" ? 55 :
                   niche === "Строительство и ремонт" ? 42 : 28;
    const totalClicks = Math.round(budget / avgCpc);
    const junkClicks = Math.round(totalClicks * junkRate);
    const goodClicks = totalClicks - junkClicks;

    const crFactor = convRate / 100;
    const ordersTotal = Math.round(totalClicks * crFactor);
    const ordersLost = Math.round(junkClicks * crFactor * 0.15); // часть мусора даёт фейк-конверсии
    const ordersReal = ordersTotal - ordersLost;

    // потери в деньгах
    const revenueLost = Math.round(lostBudget * (avgCheck / avgCpc) * crFactor * 0.6);

    // потенциальный ДРР
    const drrCurrent = budget > 0 && ordersReal > 0
      ? ((budget / (ordersReal * avgCheck)) * 100).toFixed(1)
      : "—";
    const drrOptimal = budget > 0 && ordersReal > 0
      ? ((effectiveBudget / (ordersReal * avgCheck)) * 100).toFixed(1)
      : "—";

    return {
      junkRate: Math.round(junkRate * 100),
      lostBudget,
      effectiveBudget,
      totalClicks,
      junkClicks,
      goodClicks,
      ordersReal,
      revenueLost,
      drrCurrent,
      drrOptimal,
    };
  }, [budget, niche, skuCount, useDynamic, channels, hasCompetitors, avgCheck, convRate, campaignAge]);

  const fmtRub = (n: number) =>
    n.toLocaleString("ru-RU") + " ₽";

  return (
    <section className="py-24 bg-card">
      <div className="container max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-amber-400 text-sm font-medium uppercase tracking-widest">Инструмент</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Сколько вы теряете на мусорных показах?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-2">
            Калькулятор работает на основе реальных данных сотен интернет-магазинов из моей практики — по каждой тематике выведены усреднённые показатели потерь. Введите параметры своей рекламы и узнайте, сколько бюджета утекает прямо сейчас.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* ─── ЛЕВАЯ КОЛОНКА — ПАРАМЕТРЫ ─── */}
          <div className="space-y-5 bg-background rounded-2xl p-6 border border-white/10">

            {/* Тематика */}
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Тематика магазина</label>
              <select
                value={niche}
                onChange={e => setNiche(e.target.value)}
                className="w-full bg-card border border-white/15 rounded-lg px-3 py-2.5 text-foreground text-sm focus:outline-none focus:border-amber-400/50"
              >
                {NICHES.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>

            {/* Бюджет */}
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 flex justify-between">
                <span>Месячный бюджет на рекламу</span>
                <span className="text-amber-400 font-medium">{fmtRub(budget)}</span>
              </label>
              <input
                type="range" min={10000} max={500000} step={5000}
                value={budget}
                onChange={e => setBudget(Number(e.target.value))}
                className="w-full accent-amber-400"
              />
              <div className="flex justify-between text-xs text-muted-foreground/50 mt-1">
                <span>10 000 ₽</span><span>500 000 ₽</span>
              </div>
            </div>

            {/* Средний чек */}
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 flex justify-between">
                <span>Средний чек</span>
                <span className="text-amber-400 font-medium">{fmtRub(avgCheck)}</span>
              </label>
              <input
                type="range" min={500} max={50000} step={500}
                value={avgCheck}
                onChange={e => setAvgCheck(Number(e.target.value))}
                className="w-full accent-amber-400"
              />
              <div className="flex justify-between text-xs text-muted-foreground/50 mt-1">
                <span>500 ₽</span><span>50 000 ₽</span>
              </div>
            </div>

            {/* Конверсия сайта */}
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 flex justify-between">
                <span>Конверсия сайта в заказ</span>
                <span className="text-amber-400 font-medium">{convRate}%</span>
              </label>
              <input
                type="range" min={0.3} max={8} step={0.1}
                value={convRate}
                onChange={e => setConvRate(parseFloat(e.target.value))}
                className="w-full accent-amber-400"
              />
              <div className="flex justify-between text-xs text-muted-foreground/50 mt-1">
                <span>0.3%</span><span>8%</span>
              </div>
            </div>

            {/* Количество SKU */}
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 flex justify-between">
                <span>Количество SKU (артикулов)</span>
                <span className="text-amber-400 font-medium">{skuCount.toLocaleString("ru-RU")}</span>
              </label>
              <input
                type="range" min={10} max={20000} step={10}
                value={skuCount}
                onChange={e => setSkuCount(Number(e.target.value))}
                className="w-full accent-amber-400"
              />
              <div className="flex justify-between text-xs text-muted-foreground/50 mt-1">
                <span>10</span><span>20 000</span>
              </div>
            </div>

            {/* Возраст кампании */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Возраст рекламных кампаний</label>
              <div className="flex gap-2">
                {(["new", "mid", "old"] as const).map(v => (
                  <button
                    key={v}
                    onClick={() => setCampaignAge(v)}
                    className={`flex-1 py-1.5 rounded-lg text-sm border transition-all ${
                      campaignAge === v
                        ? "bg-amber-400 text-gray-900 border-amber-400 font-medium"
                        : "border-white/15 text-muted-foreground hover:border-amber-400/40"
                    }`}
                  >
                    {v === "new" ? "До 3 мес." : v === "mid" ? "3–12 мес." : "Год и более"}
                  </button>
                ))}
              </div>
            </div>

            {/* Чекбоксы */}
            <div className="space-y-3 pt-1">
              <p className="text-sm text-muted-foreground font-medium">Где рекламируетесь:</p>
              {([ 
                { key: "search", label: "Поиск Яндекса" },
                { key: "rsya", label: "РСЯ (рекламная сеть)" },
                { key: "gallery", label: "Товарная галерея" },
              ] as { key: keyof typeof channels; label: string }[]).map(({ key, label }) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => toggleChannel(key)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      channels[key]
                        ? "bg-amber-400 border-amber-400"
                        : "border-white/25 group-hover:border-amber-400/50"
                    }`}
                  >
                    {channels[key] && <Icon name="Check" size={12} className="text-gray-900" />}
                  </div>
                  <span className="text-sm text-foreground">{label}</span>
                </label>
              ))}

              <div className="pt-1 space-y-3">
                <p className="text-sm text-muted-foreground font-medium">Дополнительно:</p>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => setUseDynamic(!useDynamic)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      useDynamic
                        ? "bg-amber-400 border-amber-400"
                        : "border-white/25 group-hover:border-amber-400/50"
                    }`}
                  >
                    {useDynamic && <Icon name="Check" size={12} className="text-gray-900" />}
                  </div>
                  <span className="text-sm text-foreground">Использую динамическую рекламу</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => setHasCompetitors(!hasCompetitors)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      hasCompetitors
                        ? "bg-amber-400 border-amber-400"
                        : "border-white/25 group-hover:border-amber-400/50"
                    }`}
                  >
                    {hasCompetitors && <Icon name="Check" size={12} className="text-gray-900" />}
                  </div>
                  <span className="text-sm text-foreground">Есть активные конкуренты в нише</span>
                </label>
              </div>
            </div>
          </div>

          {/* ─── ПРАВАЯ КОЛОНКА — РЕЗУЛЬТАТЫ ─── */}
          <div className="flex flex-col gap-4">
            {/* Главная цифра */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center">
              <p className="text-sm text-red-400/80 uppercase tracking-widest mb-2">Вы теряете ежемесячно</p>
              <p className="text-5xl font-bold text-red-400 mb-1">{fmtRub(results.lostBudget)}</p>
              <p className="text-sm text-muted-foreground">
                {results.junkRate}% вашего бюджета уходит на нецелевой трафик
              </p>
            </div>

            {/* Карточки метрик */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-xl p-4 border border-white/10">
                <p className="text-xs text-muted-foreground mb-1">Кликов всего</p>
                <p className="text-2xl font-bold text-foreground">{results.totalClicks.toLocaleString("ru-RU")}</p>
                <p className="text-xs text-red-400 mt-1">из них мусор: {results.junkClicks.toLocaleString("ru-RU")}</p>
              </div>
              <div className="bg-background rounded-xl p-4 border border-white/10">
                <p className="text-xs text-muted-foreground mb-1">Целевых кликов</p>
                <p className="text-2xl font-bold text-amber-400">{results.goodClicks.toLocaleString("ru-RU")}</p>
                <p className="text-xs text-muted-foreground mt-1">реальный потенциал</p>
              </div>
              <div className="bg-background rounded-xl p-4 border border-white/10">
                <p className="text-xs text-muted-foreground mb-1">ДРР сейчас</p>
                <p className="text-2xl font-bold text-red-400">{results.drrCurrent}%</p>
                <p className="text-xs text-muted-foreground mt-1">доля рекламных расходов</p>
              </div>
              <div className="bg-background rounded-xl p-4 border border-white/10">
                <p className="text-xs text-muted-foreground mb-1">ДРР без мусора</p>
                <p className="text-2xl font-bold text-green-400">{results.drrOptimal}%</p>
                <p className="text-xs text-muted-foreground mt-1">после чистки трафика</p>
              </div>
            </div>

            {/* Потери выручки */}
            <div className="bg-background rounded-xl p-4 border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm text-muted-foreground">Рабочий бюджет</p>
                <p className="text-sm font-medium text-green-400">{fmtRub(results.effectiveBudget)}</p>
              </div>
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm text-muted-foreground">Потери выручки</p>
                <p className="text-sm font-medium text-red-400">−{fmtRub(results.revenueLost)}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Реальных заказов в месяц</p>
                <p className="text-sm font-medium text-foreground">{results.ordersReal}</p>
              </div>
            </div>

            {/* За год */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-center gap-4">
              <Icon name="TrendingDown" size={28} className="text-amber-400 shrink-0" />
              <div>
                <p className="text-xs text-amber-400/80 uppercase tracking-wider">Потери за 12 месяцев</p>
                <p className="text-2xl font-bold text-amber-400">{fmtRub(results.lostBudget * 12)}</p>
                <p className="text-xs text-muted-foreground mt-0.5">при сохранении текущего бюджета</p>
              </div>
            </div>

            <a
              href="#"
              onClick={e => { e.preventDefault(); document.querySelector("#audit")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold px-6 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-sm"
            >
              <Icon name="Shield" size={18} />
              Хочу вернуть этот бюджет — получить аудит бесплатно
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground/40 mt-6">
          * Расчёт оценочный, основан на статистике 377 проектов. Реальные цифры определяются после аудита аккаунта.
        </p>
      </div>
    </section>
  );
}

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-amber-500/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-amber-500/15 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-amber-500/20 pointer-events-none" />

        <div className="relative z-10 container max-w-5xl mx-auto px-6 py-24 pt-32">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-400 text-sm font-medium tracking-wide">Контекстная реклама для e-commerce</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6 uppercase">
            Пока конкуренты{" "}
            <span className="text-amber-400">толкаются</span>{" "}
            на дорогом аукционе —<br />
            <span className="text-amber-400">вы берёте точные запросы</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            Система «Товарный Снайпер» автоматически охватывает тысячи точных низкочастотных запросов по всему вашему каталогу. Без ручного сбора семантики. Без написания тысяч объявлений вручную.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-lg px-8 py-4 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95">
              Получить бесплатный аудит →
            </button>
            <button className="border border-white/20 hover:border-amber-400/50 text-foreground px-8 py-4 rounded-lg transition-all duration-200 hover:text-amber-400">
              Узнать подробнее
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-16 pt-12 border-t border-white/10">
            {[
              { val: "377", label: "проектов выполнено" },
              { val: "10×", label: "рост конверсии у клиентов" },
              { val: "7,94%", label: "ДРР у действующего клиента" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl md:text-4xl font-bold text-amber-400">{s.val}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── МАТЕМАТИКА ─── */}
      <section className="py-24 container max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-amber-400 text-sm font-medium uppercase tracking-widest">Математика рекламы</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 uppercase">
            Один товар. Два запроса.<br />
            <span className="text-amber-400">Разная экономика.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <Icon name="TrendingDown" size={20} className="text-red-400" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Широкий запрос</div>
                <div className="font-semibold text-red-400">«перфоратор купить»</div>
              </div>
            </div>
            <div className="space-y-3">
              {[
                ["Цена клика", "120 руб."],
                ["Конверсия", "0,5%"],
                ["Стоимость заказа", "24 000 руб."],
                ["Маржа товара", "1 335 руб."],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-muted-foreground text-sm">{k}</span>
                  <span className="font-mono font-medium">{v}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-3">
                <span className="font-semibold">Итог с заказа</span>
                <span className="font-display text-2xl font-bold text-red-400">−22 665 руб.</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Icon name="Target" size={20} className="text-amber-400" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Точный запрос</div>
                <div className="font-semibold text-amber-400">«Bosch GBH 2-26 DRE купить»</div>
              </div>
            </div>
            <div className="space-y-3">
              {[
                ["Цена клика", "12 руб."],
                ["Конверсия", "4%"],
                ["Стоимость заказа", "300 руб."],
                ["Маржа товара", "1 335 руб."],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-muted-foreground text-sm">{k}</span>
                  <span className="font-mono font-medium">{v}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-3">
                <span className="font-semibold">Итог с заказа</span>
                <span className="font-display text-2xl font-bold text-amber-400">+1 035 руб.</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-muted-foreground mt-8 text-lg">
          Один и тот же товар. Одна и та же реклама. Разница только в типе запроса —{" "}
          <strong className="text-foreground">и экономика переворачивается с ног на голову.</strong>
        </p>
      </section>

      {/* ─── ПРОБЛЕМА ─── */}
      <section className="py-24 bg-card">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-medium uppercase tracking-widest">Корень проблемы</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 uppercase">
              Почему стандартный запуск<br />
              <span className="text-amber-400">почти всегда разочаровывает</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              {[
                {
                  n: "1",
                  title: "Неправильные названия в каталоге",
                  text: "Платье «Рафаэлло» в каталоге магазина — красиво для витрины. Но Яндекс начинает показывать рекламу людям, которые ищут конфеты. Буквально.",
                },
                {
                  n: "2",
                  title: "Одна позиция вместо 18",
                  text: "Платье в 6 цветах и 3 размерах — это 18 товаров. При стандартной выгрузке в фид попадает одна позиция с фото красного платья. Человек ищет синее — видит красное — уходит.",
                },
                {
                  n: "3",
                  title: "Яндекс хоронит ваши товары",
                  text: "Яндекс фиксирует: товар показывается, но не продаётся. Умная стратегия делает вывод — этот товар неинтересен — и перестаёт его продвигать. Возможно, именно те, что дают 80% продаж.",
                },
              ].map((item) => (
                <div key={item.n} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-red-400 text-sm font-bold">{item.n}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Icon name="Lightbulb" size={24} className="text-amber-400" />
                <h3 className="font-semibold text-amber-400">Решение: «Умный Фид»</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Авторская технология подготовки товарного файла для Директа. Один товар превращается в 10, 15, 18 отдельных позиций — каждая со своим изображением, названием и характеристиками.
              </p>
              <div className="space-y-3">
                {[
                  "Артикулы, модели, синонимы, сленговые названия",
                  "Каждая вариация — своё изображение и карточка",
                  "Яндекс получает чистые данные и продвигает товары",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Icon name="Check" size={16} className="text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── КЕЙС ─── */}
      <section className="py-24 container max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-amber-400 text-sm font-medium uppercase tracking-widest">Реальный результат</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 uppercase">
            Это не магия.<br />
            <span className="text-amber-400">Это математика.</span>
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-card overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-10 border-b md:border-b-0 md:border-r border-white/10">
              <div className="text-sm text-muted-foreground uppercase tracking-wider mb-6 flex items-center gap-2">
                <Icon name="Clock" size={14} />
                До системы
              </div>
              <div className="space-y-4">
                {[
                  ["Рекламный бюджет", "40 000 руб./мес."],
                  ["Количество заказов", "40 шт./мес."],
                  ["Стоимость заказа", "1 000 руб."],
                  ["Рентабельность", "На пределе"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-muted-foreground text-sm">{k}</span>
                    <span className="font-mono">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-10 bg-amber-500/5">
              <div className="text-sm text-amber-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                <Icon name="Zap" size={14} />
                После «Товарного Снайпера»
              </div>
              <div className="space-y-4">
                {[
                  ["Рекламный бюджет", "248 000 руб./мес.", false],
                  ["Количество заказов", "400 шт./мес.", true],
                  ["Стоимость заказа", "100 руб.", true],
                  ["Выручка (30 дней)", "3 122 000 руб.", true],
                ].map(([k, v, hi]) => (
                  <div key={String(k)} className="flex justify-between items-center py-2 border-b border-amber-500/10">
                    <span className="text-muted-foreground text-sm">{k}</span>
                    <span className={`font-mono font-semibold ${hi ? "text-amber-400" : ""}`}>{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-amber-500/20">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">ДРР</span>
                  <span className="font-display text-3xl font-bold text-amber-400">7,94%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-muted-foreground mt-6">
          Результат закрепился и держится по сей день. Бюджет вырос, потому что владелец увидел реальную отдачу.
        </p>
      </section>

      {/* ─── СОСТАВ СИСТЕМЫ ─── */}
      <section className="py-24 bg-card">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-medium uppercase tracking-widest">Состав системы</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 uppercase">
              Что входит в<br />
              <span className="text-amber-400">«Товарный Снайпер»</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {includedItems.map((item) => (
              <div
                key={item.title}
                className={`rounded-xl p-6 border ${item.bonus ? "border-amber-500/20 bg-amber-500/5" : "border-white/10 bg-background"}`}
              >
                {item.bonus && (
                  <div className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-400 text-xs font-medium px-2 py-0.5 rounded-full mb-3">
                    <Icon name="Gift" size={10} />
                    Бонус
                  </div>
                )}
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                  <Icon name={item.icon} size={20} className="text-amber-400" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                {item.note && (
                  <p className="text-amber-400/60 text-xs mt-3 italic">{item.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── АВТОР ─── */}
      <section className="py-24 container max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-amber-400 text-sm font-medium uppercase tracking-widest">Кто за этим стоит</span>
            <h2 className="font-display text-4xl font-bold mt-3 mb-6 uppercase">
              Личная работа.<br />
              <span className="text-amber-400">Личная ответственность.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Я занимаюсь контекстной рекламой с 2016 года. За это время выполнил 377 проектов, получил 215 положительных отзывов и наивысший рейтинг на фриланс-бирже. 42% клиентов возвращаются повторно.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Я принципиально беру не более четырёх проектов в месяц — иначе не смогу гарантировать результат, который прописываю в договоре. Каждый фид, каждая кампания — это моя личная работа.
            </p>
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-lg px-4 py-3">
              <Icon name="AlertCircle" size={16} className="text-amber-400 shrink-0" />
              <span className="text-sm text-amber-300">На этот месяц осталось <strong>одно свободное место</strong></span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div
              className="relative rounded-xl overflow-hidden cursor-zoom-in group"
              onClick={() => setLightboxImg("https://cdn.poehali.dev/files/9446a551-d05e-425a-9db0-609e9384afdc.JPG")}
            >
              <img
                src="https://cdn.poehali.dev/files/9446a551-d05e-425a-9db0-609e9384afdc.JPG"
                alt="Алексей с семьёй"
                className="w-full object-contain rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
                style={{ imageRendering: "auto" }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center rounded-xl">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 rounded-full p-3">
                  <Icon name="ZoomIn" size={22} className="text-white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 rounded-b-xl">
                <div className="font-semibold text-white text-sm">Цыбуля Алексей Викторович</div>
                <div className="text-white/70 text-xs mt-0.5 flex items-center gap-1">
                  <Icon name="MapPin" size={11} className="text-amber-400" />
                  г. Ижевск
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { val: "377", label: "проектов" },
                { val: "215", label: "отзывов" },
                { val: "42%", label: "возвращаются" },
                { val: "с 2016", label: "года в рекламе" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-white/10 bg-card p-6 text-center">
                  <div className="font-display text-3xl font-bold text-amber-400">{s.val}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Лайтбокс */}
        {lightboxImg && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setLightboxImg(null)}
          >
            <img
              src={lightboxImg}
              alt="Отзыв"
              className="max-w-full max-h-full rounded-xl shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              onClick={() => setLightboxImg(null)}
            >
              <Icon name="X" size={20} className="text-white" />
            </button>
          </div>
        )}

        {/* Отзывы */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <span className="text-amber-400 text-sm font-medium uppercase tracking-widest">Реальные клиенты</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 uppercase">
              215 отзывов.<br />
              <span className="text-amber-400">Все положительные.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(showAllReviews ? reviews : reviews.slice(0, 9)).map((r) => (
              <div
                key={r.author}
                className="rounded-xl border border-white/10 bg-card overflow-hidden group cursor-pointer"
                onClick={() => setLightboxImg(r.img)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={r.img}
                    alt={`Отзыв от ${r.author}`}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 rounded-full p-3">
                      <Icon name="ZoomIn" size={22} className="text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <span className="text-amber-400 text-xs font-bold uppercase">{r.author[0]}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{r.author}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-green-500/20 flex items-center justify-center">
                        <span className="text-green-400 text-[9px]">✓</span>
                      </span>
                      <span className="text-muted-foreground text-xs">{r.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 flex flex-col items-center gap-4">
            {!showAllReviews && (
              <button
                onClick={() => {
                  setShowAllReviews(true);
                  if (window.ym) window.ym(107246756, "reachGoal", "vseotzivi");
                }}
                className="inline-flex items-center gap-2 border border-white/20 hover:border-amber-400/50 hover:text-amber-400 text-foreground px-6 py-3 rounded-lg transition-all duration-200"
              >
                <Icon name="ChevronDown" size={18} />
                Посмотреть все {reviews.length} отзывов
              </button>
            )}

            {showAllReviews && (
              <a
                href="https://kwork.ru/user/vash_directolog"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (window.ym) window.ym(107246756, "reachGoal", "vash_directolog");
                }}
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold px-8 py-4 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Icon name="ExternalLink" size={18} />
                Все 215 отзывов на Kwork
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ─── КАЛЬКУЛЯТОР ПОТЕРЬ ─── */}
      <CalcSection />

      {/* ─── ЦЕНА ─── */}
      <section className="py-24 container max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-amber-400 text-sm font-medium uppercase tracking-widest">Инвестиция</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 uppercase">
            Прозрачная оплата.<br />
            <span className="text-amber-400">Без рисков.</span>
          </h2>
        </div>

        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 overflow-hidden max-w-2xl mx-auto">
          <div className="p-8 border-b border-amber-500/20 text-center">
            <div className="font-display text-6xl font-bold text-amber-400">35 000</div>
            <div className="text-muted-foreground mt-1">рублей · единоразово · без ежемесячных платежей</div>
          </div>

          <div className="p-8 space-y-6">
            {[
              { amount: "10 500 руб.", desc: "Аванс при подписании договора — приступаю к разработке медиаплана и «Умного Фида»", step: "1" },
              { amount: "14 000 руб.", desc: "После запуска кампаний — вы видите систему в работе. Срок — 5 рабочих дней.", step: "2" },
              { amount: "10 500 руб.", desc: "Через 30 дней ведения — когда уже видите реальные результаты в своём кабинете.", step: "3" },
            ].map((p) => (
              <div key={p.step} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <span className="text-amber-400 text-sm font-bold">{p.step}</span>
                </div>
                <div>
                  <div className="font-mono font-semibold text-amber-300">{p.amount}</div>
                  <div className="text-muted-foreground text-sm mt-0.5">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 pt-0">
            <button className="w-full bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-lg py-4 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
              Получить бесплатный аудит →
            </button>
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-center">
          {[
            { label: "«Умный Фид» у программистов", val: "от 15 000 руб." },
            { label: "Настройка ретаргетинга", val: "10 000 руб." },
            { label: "Итого по частям", val: "от 25 000 руб." },
          ].map((c) => (
            <div key={c.label} className="rounded-xl border border-white/10 bg-card p-4">
              <div className="text-muted-foreground text-xs mb-1">{c.label}</div>
              <div className="font-mono font-semibold">{c.val}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-sm mt-4">
          Только эти два элемента у сторонних исполнителей — уже 25 000 руб. Без стратегии, медиаплана и гарантии результата.
        </p>
      </section>

      {/* ─── ГАРАНТИЯ ─── */}
      <section className="py-24 bg-card">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-8">
              <Icon name="Shield" size={32} className="text-amber-400" />
            </div>
            <span className="text-amber-400 text-sm font-medium uppercase tracking-widest">Договорная гарантия</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-8 uppercase">
              Все риски —<br />
              <span className="text-amber-400">на мне</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              До старта работ мы согласовываем конкретные KPI — стоимость заказа и количество заказов, рассчитанные в медиаплане. Эти цифры прописываются в договоре.
            </p>
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8">
              <p className="text-lg font-medium leading-relaxed">
                Если через 30 дней ведения мы не достигаем этих показателей — я продолжаю вести и оптимизировать вашу рекламу{" "}
                <span className="text-amber-400 font-bold">бесплатно</span>{" "}
                столько времени, сколько потребуется для достижения результата.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-24 container max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-amber-400 text-sm font-medium uppercase tracking-widest">Частые вопросы</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 uppercase">
            Ответы на<br />
            <span className="text-amber-400">возражения</span>
          </h2>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqItems.map((item, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-card overflow-hidden">
              <button
                className="w-full flex justify-between items-start gap-4 p-6 text-left"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-medium">{item.q}</span>
                <Icon
                  name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                  size={20}
                  className="text-amber-400 shrink-0 mt-0.5"
                />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-6 text-muted-foreground leading-relaxed text-sm border-t border-white/5 pt-4">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── ФИНАЛЬНЫЙ CTA ─── */}
      <section className="py-32 bg-card">
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 uppercase leading-tight">
            Каждый день с неправильной рекламой —<br />
            это деньги,{" "}
            <span className="text-amber-400">которые уходят не туда</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-4 max-w-2xl mx-auto">
            Дайте мне гостевой доступ в ваш рекламный кабинет — и через 48 часов вы будете точно знать, где утечка и что с этим делать.
          </p>
          <p className="text-muted-foreground mb-10">
            Без обязательств. Без давления. Просто цифры вашего магазина — честно и по делу.
          </p>
          <button className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-xl px-12 py-5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/25">
            Получить бесплатный аудит →
          </button>
          <p className="text-muted-foreground/50 text-sm mt-4">Это занимает 5 рабочих дней</p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-8 border-t border-white/10">
        <div className="container max-w-5xl mx-auto px-6 text-center text-muted-foreground text-sm">
          © 2026 · Система «Товарный Снайпер» · Контекстная реклама для e-commerce
        </div>
      </footer>

    </div>
  );
}