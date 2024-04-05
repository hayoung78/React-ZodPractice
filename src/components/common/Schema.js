import { z } from "zod";

export const Schema = z.object({
    email: z
        .string()
        .email({ message: "이메일 양식이 올바르지 않습니다" })
        .min(1, { message: "ID를 입력해주세요" })
        .optional(),

    password: z
        .string()
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/, {
            message: "대소문자, 숫자, 특수문자를 하나 이상 포함해 주세요",
        })
        .min(8, { message: "8글자 이상 입력해주세요" })
        .optional(),
});
