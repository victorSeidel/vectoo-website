import { hashPassword } from "@/lib/password";

(async () =>
{
    const password = '';
    const hash = await hashPassword(password);
    console.log({ hash });
})();