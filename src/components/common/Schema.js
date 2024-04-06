import { z } from "zod";

export const Schema = z.object({
    email: z
        .string()
        .email({ message: "이메일 양식이 올바르지 않습니다" })
        .min(1, { message: "ID를 입력해주세요" })
        .optional(),

    password: z
        .string()
        //regex: 문자열이 주어진 정규식 패턴과 일치하는지 검증
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/, {
            message: "대소문자, 숫자, 특수문자를 하나 이상 포함해 주세요",
        })
        .min(8, { message: "8글자 이상 입력해주세요" })
        .optional(), // 필드가 필수가 아니라 선택사항임을 명시
});
