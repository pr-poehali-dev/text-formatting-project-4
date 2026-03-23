import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/06d842e1-c888-43bf-b28a-97d35d5e5dd2/files/1f0a741e-0e9c-494b-9791-3026b2e6de24.jpg";

const reviews = [
  {
    author: "seowork23",
    date: "12 августа 2025",
    text: "Если вам нужна скорость и качество работы — вам к Алексею. Быстро и профессионально настраивает рекламу, не навязывает лишних услуг, напротив, старается сэкономить ваш бюджет. Буду обращаться ещё",
  },
  {
    author: "smyulia",
    date: "3 августа 2025",
    text: "Заказывала настройку яндекс директа у Алексея, работа была выполнена качественно и быстро. Рекомендую.",
  },
  {
    author: "EKBEGOR",
    date: "3 июня 2025",
    text: "Оперативно все настроили, показатели хорошие, будем работать дальше Спасибо!",
  },
  {
    author: "munigovskaya",
    date: "23 мая 2025",
    text: "Спасибо большое специалисту за настройку Товарной кампании — аккуратная и быстрая работа, буду обращаться еще!",
  },
  {
    author: "sv775577",
    date: "5 мая 2025",
    text: "Запускала контекстную рекламу с нуля. Обратилась к Алексею и не ошиблась, все настроил как надо, пошли заявки. Будем продолжать сотрудничество. Рекомендую Алексея, как профессионала своего дела.",
  },
  {
    author: "loboffgood",
    date: "29 апреля 2025",
    text: "Обращался к Алексею по поводу настройки рекламы в Директе на поиске, работа была выполнена на высоком уровне и даже раньше срока, спустя несколько дней после первичной настройки Алексей сделал оптимизацию и подсказал что можно дальше улучшить, уже есть первые результаты, будем продолжать работу. Что не менее важно, Алексей оперативно отвечает на возникающие вопросы.",
  },
  {
    author: "and2381",
    date: "10 апреля 2025",
    text: "Отличный специалист своего дела, знает все нюансы Директа, делает хорошую и уникальную (чего другие не умеют) настройку рекламных компаний, подсказывает и консультирует \"до и после\", надежен, общителен, рекомендую!",
  },
  {
    author: "redsell",
    date: "10 апреля 2025",
    text: "Заказывал настройку поиска в директе. Консультация на уровне. Получил заявки по нужной стоимости в первый же день, будем дальше смотреть по результату, приятный бонус порадовал. Спасибо, вернемся еще",
  },
  {
    author: "vladimir_willis",
    date: "23 марта 2025",
    text: "Быстрая и качественная работа. Списались, обсудили, все четко и по делу! Рекомендую исполнителя! Сделал больше чем обсуждалось. Спасибо.",
  },
  {
    author: "eagleFin",
    date: "26 марта 2025",
    text: "Спасибо Алексею за подробную консультацию по Яндекс Директ. Помог разобраться не только с яндекс директом, но и с метрикой. Рассказал про А/Б тестирование и как с ним работать. Человек явно вел не один десяток проектов и понимает о чем говорит. За час я научился больше, чем за десятками часов просмотра обучающих роликов. Однозначно рекомендую специалиста всем кто хочет улучшить свои знания или дать буст рекламе вашего бизнеса.",
  },
  {
    author: "Tronid",
    date: "19 марта 2025",
    text: "Рекламная кампания, разработанная Алексеем в директе (поиск) продемонстрировала лучшую эффективность (порядка в 2 раза), чем ранее созданная.",
  },
  {
    author: "Akimova_art",
    date: "24 февраля 2025",
    text: "Благодарю Алексея за проделанную работу! Задача была запустить 3 компании с 0, оптимизировать старые не было смысла. Работа проведена грамотно: подобраны ключи по нашей нише — их количество намного больше, чем было, образованы новые группы, подобрана стратегия, подходящая для нашего бизнеса, в первую неделю я увидела охват в 4 р больше по одной из компаний, что не могло не порадовать, по каждой компании мы получали конверсии со стоимостью ниже, чем было до в 2 раза!!!",
  },
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

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

        {/* Отзывы */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <span className="text-amber-400 text-sm font-medium uppercase tracking-widest">Реальные клиенты</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 uppercase">
              215 отзывов.<br />
              <span className="text-amber-400">Все положительные.</span>
            </h2>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {reviews.map((r) => (
              <div
                key={r.author}
                className="break-inside-avoid rounded-xl border border-white/10 bg-card p-5 mb-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <span className="text-amber-400 text-xs font-bold uppercase">
                      {r.author[0]}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{r.author}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                        <span className="text-green-400 text-[10px]">✓</span>
                      </span>
                      <span className="text-muted-foreground text-xs">{r.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── КАЛЬКУЛЯТОР (ЗАГЛУШКА) ─── */}
      <section className="py-24 bg-card">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="rounded-2xl border-2 border-dashed border-amber-500/20 bg-amber-500/5 p-12 text-center">
            <Icon name="Calculator" size={40} className="text-amber-400 mx-auto mb-4" />
            <h3 className="font-display text-2xl font-bold text-amber-400 uppercase mb-3">
              Калькулятор потерь
            </h3>
            <p className="text-muted-foreground max-w-lg mx-auto mb-2">
              «Сколько вы теряете на мусорных показах» — интерактивный ROI-калькулятор
            </p>
            <p className="text-muted-foreground/50 text-sm">
              Этот блок будет разработан и встроен после согласования лендинга
            </p>
          </div>
        </div>
      </section>

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