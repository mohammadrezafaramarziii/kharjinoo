export default function translateErrorMsg(message: string) {
  const errorMessages: Record<string, string> = {
    "User already registered": "این ایمیل قبلاً ثبت‌نام شده است",
    "Failed to fetch": "خطا در اتصال به اینترنت! اینترنت خود را بررسی کنید",
    "Invalid login credentials": "ایمیل یا رمز عبور وارد شده نادرست است",
    'duplicate key value violates unique constraint "unique_user_category"':
      "دسته بندی با این نام قبلا اضافه شده",
    'duplicate key value violates unique constraint "unique_user_card"':
      "شماره کارت قبلا اضافه شده است",
    'update or delete on table "cards" violates foreign key constraint "transactions_cardId_fkey" on table "transactions"':
      "برای حذف این کارت، ابتدا باید تراکنش‌های مربوط به آن را حذف کنید",

    'update or delete on table "category" violates foreign key constraint "transactions_categoryId_fkey" on table "transactions"':
      "برای حذف این دسته بندی، ابتدا باید تراکنش‌های مربوط به آن را حذف کنید",
  };

  return errorMessages[message] || "خطای ناشناخته";
}
