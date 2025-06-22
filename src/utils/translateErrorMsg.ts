export default function translateErrorMsg(message: string) {
  const errorMessages: Record<string, string> = {
    "User already registered": "این ایمیل قبلاً ثبت‌نام شده است",
    "Failed to fetch": "خطا در اتصال به اینترنت! اینترنت خود را بررسی کنید",
    "Invalid login credentials": "ایمیل یا رمز عبور وارد شده نادرست است",
    'duplicate key value violates unique constraint "category_name_key"':
      "دسته بندی با این نام قبلا اضافه شده",
  };

  return errorMessages[message] || "خطای ناشناخته";
}
