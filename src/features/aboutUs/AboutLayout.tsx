import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "../../ui/icons/arrow";
import Title from "../../ui/Title";
import { LinkedinIcon, PhoneIcon, TelegramIcon } from "../../ui/icons/social";

export default function AboutLayout() {
  return (
    <div className="space-y-6">
      <Title title="درباره خرجینو">
        <button onClick={() => window.history.back()}>
          <ArrowLeftIcon className="w-6 h-6 text-primary-3" />
        </button>
      </Title>

      <div className="flex items-center flex-col justify-center gap-2 mt-16">
        <img src="/images/kharjinoo-logo.png" alt="" className="w-20" />
        <div className="font-alibaba text-xl text-primary-1 font-black">
          خرجینو
        </div>
      </div>
      <div className="mt-4 text-sm text-primary-3 space-y-2">
        <p className="w-full  text-sm text-primary-3 leading-6 whitespace-pre-line">
          خرجینو یک اپلیکیشن مخصوص کاربران ایرانیه که با هدف ساده‌سازی مدیریت
          مالی شخصی طراحی شده. ما در خرجینو سعی کردیم همه چیز رو بر اساس نیازهای
          واقعی شما بسازیم — از پشتیبانی کامل تاریخ شمسی، تا نمایش کارت‌های
          بانکی ایرانی و نمودارهای ساده و قابل فهم.
        </p>
        <p className="w-full  text-sm text-primary-3 leading-6 whitespace-pre-line">
          خرجینو برای ایرانی‌ها ساخته شده؛ ساده، امن و دقیق
          <br /> ما با تمرکز روی تجربه کاربری فارسی‌زبان، تلاش کردیم ابزاری
          بسازیم که مدیریت مالی، از یه کار سخت، به یه عادت آسون تبدیل بشه.
        </p>
      </div>

      <div className="w-full flex items-center justify-between text-sm">
        <span className="text-primary-3">وب سایت من</span>
        <Link
          to={"https://mrfaramarzi.ir"}
          target="_blank"
          className="text-primary-1 underline"
        >
          mrfaramarzi.ir
        </Link>
      </div>

      <div className="w-full flex items-center justify-center gap-4">
        <Link to={"tel:989365456309"} target="_blank">
          <PhoneIcon className="text-primary-3 w-6 h-6" />
        </Link>
        <Link to={"https://t.me/mohammadrezafaramarziii"} target="_blank">
          <TelegramIcon className="text-primary-3 w-6 h-6" />
        </Link>
        <Link
          to={"https://www.linkedin.com/in/mohammadreza--faramarzi/"}
          target="_blank"
        >
          <LinkedinIcon className="text-primary-3 w-6 h-6" />
        </Link>
      </div>

      <p className="text-primary-3 font-alibaba font-bold text-center pt-6 text-sm">
        ساخته شده با 💙 توسط محمدرضا فرامرزی
      </p>
    </div>
  );
}
