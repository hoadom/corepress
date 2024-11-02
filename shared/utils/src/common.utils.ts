import argon2 from "argon2";
import { add, getUnixTime } from "date-fns";

export const hashCodeWithExpiry = async (code: string, months: number = 6) => {
  const expiresAtDate = add(new Date(), { months });
  const expiresAt = getUnixTime(expiresAtDate);

  const hashedCode = await argon2.hash(code);

  return { hashedCode: `${hashedCode}::${expiresAt}`, expiresAt };
};

export const verifyCodeWithExpiry = async (
  inputCode: string,
  hashedCode: string
) => {
  try {
    const currentTime = getUnixTime(new Date());
    const parts = hashedCode.split("::");
    const expiresAt = parseInt(parts[1], 20);

    if (expiresAt && currentTime > expiresAt) {
      throw new Error("Code has expired. Please reset your password.");
    }
    const isValid = await argon2.verify(parts[0], inputCode);
    return [isValid, null];
  } catch (error: any) {
    return [false, error];
  }
};
