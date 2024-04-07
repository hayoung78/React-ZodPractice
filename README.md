## React-ZodPractice

🐝Zod 라이브러리 사용해보고 연습하는 레파지토리

# 🧸Zod란 ??

`zod ` 는 스키마 선언 및 유효성 검사 라이브러리이다.
`zod` 와 비슷한 역할을 하는 라이브러리로는 joi , yup , typia 등이 있다.
기본적으로 `zod` 는 TypeScript 를 기반으로 하지만 , `TypeScript`와 `JavaScript` **개발 환경에서 모두 사용** 할 수 있다.

공식문서에서 주장하는 이점으로는 다음과 같다.

> -   Zero dependencies => 의존성이 없음
> -   Works in Node.js and all modern browsers => Node.js 및 모든 최신 브라우저에서 작동
> -   Tiny: 8kb minified + zipped => 데이터 8kb 축소 + 압축됨
> -   Immutable: methods (e.g. .optional()) return a new instance => 메소드들 새로운 인스턴스 반환
> -   Concise, chainable interface. => 간결하고 연결가능한 인터페이스 제공
> -   Functional approach: parse, don't validate
> -   Works with plain JavaScript too! You don't need to use TypeScript. => 자바스크립트 랑 타입스크립트 둘다 사용가능

# 🧸Zod 라이브러리 사용법

## ⚙️Schema 설정

우선 유효성 검사를 하려면 입력 폼에 대한 **스키마**를 작성해줘야한다.
(yup 사용시에도 필요하다.)

재사용성 및 코드 수정 편의를 위해 `Schema` 컴포넌트를 따로 빼서 아래와 같이 작성했다.

```
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
        .optional(),
});
```

아마 `Yup` 을 사용해보았더라면 매우 비슷하다는것을 알 수 있을것이다.
약간의 메서드만 다르다.
`Object()` 로 객체 형식의 스키마를 정의한다. 이 메서드를 사용하여 객체의 구조, 필드, 각 필드의 유효성검증 조건을 정의할 수 있다.

또한 코드에서 보이는 `optional()` 메서드는 필드가 필수가 아니라 선택사항이라고 명시해주는것이다.

## ⚙️ZodComponent 생성

위와 같이 스키마를 작성했다면 이제 직접 써볼 차례이다.
CSS 를 뒤로 재쳐두고, 간단하게 사용해보겠다.
우선 Zod컴포넌트를 따로 생성했다.

```
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema } from "./Schema";

const ZodComponent = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(Schema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };
    //유효성 검증 parse 사용해봄
    Schema.parse({
        email: "123123@test.test",
        password: "1231231Edd@23",
    });
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>ZodComponent</h2>
                <input
                    placeholder="이메일을 입력하세요"
                    {...register("email")}
                />
                {errors.email && <p>{errors.email.message}</p>}
                <input
                    placeholder="비밀번호를 입력하세요"
                    {...register("password")}
                />
                {errors.password && <p>{errors.password.message}</p>}
                <button>Submit</button>
            </form>
        </>
    );
};

export default ZodComponent;
```

이렇게 작성한 후 메인페이지에 ZodComponent를 import 하여 불러오면,

![](https://velog.velcdn.com/images/hayoung78/post/c16ad4d0-60c7-435c-8c73-6321845d2876/image.png)
와 같이 뜨고, 양식이 올바르지 않는다면
![](https://velog.velcdn.com/images/hayoung78/post/79ab8d2b-754a-490f-a410-8614aa2f2caf/image.png)
양식이 올바르다면
![](https://velog.velcdn.com/images/hayoung78/post/5fa0bacd-e6b1-4d2d-a8df-cc558058504a/image.png)
에러 메세지가 사라지는것을 볼수 있다.
Yup 과 똑같다.

이 외에도 Zod 에는 다양한 메소드들과 요소들이 있다.
간단하게 알아보자.

## ⚙️Zod의 대표적인 메소드와 요소들

> ### 🔧Parse 메소드
>
> Zod에는 유효성 검증을 할 수 있는 메소드가 있다.

```
    Schema.parse({
        email: "123123test.test",
        password: "1231231Edd@23",
    });
```

이렇게 작성했을때 email의 스키마가 해당 형식이 아니므로 localhost 에는 error가 뜬다.
![](https://velog.velcdn.com/images/hayoung78/post/5ac33a18-39e0-4a1a-8630-b0e0a4419c6c/image.png)
근데 형식을 맞춰서 작성하면

```
    Schema.parse({
        email: "123123@test.test",
        password: "1231231Edd@23",
    });
```

에러는 사라지고 화면은 잘 뜬다.

> ### 🔧safeParse 메소드
>
> parse 메소드를 사용해서 오류를 발생하게 했다면,
> safeParse 메소드는 검증 실패시 Zod가 오류를 발생하지 않게 해주는 대신 검증문제에 대해 정보가 포함된 ZodError인스턴스를 포함하는 객체를 반환한다.

```
    const data = {
        email: "123123test.test",
        password: "1231231Edd@23",
    };
    const temp = Schema.safeParse(data);
    if (!temp.success) {
        console.error(temp.error);
    }
```

이렇게 작성하면 ,
![](https://velog.velcdn.com/images/hayoung78/post/85155e30-abc1-432a-9acc-495b1cf683aa/image.png)
위 사진과 같이 콘솔창에 zodError가 뜨고, 형식을 맞춰 작성하면 사라진다.

> ### 🔧Zod의 다양한 요소들

-   .Shape
    .shape특정 키에 대한 스키마에 액세스하는 데 사용
-   .passthrough
    스키마 구문 분석 중 인식 할 수 없는 키를 통과함
-   .strict
    입력에 알 수 없는 키가 있으면 Zod는 오류를 발생시킴
-   .extend
    메소드를 사용하여 객체 스키마에 추가 필드를 추가할 수 있음

## 🥹마치며

Yup 을 공부하면서 Zod 라이브러리도 같은 기능을 한다는것을 알게되었고,
이번 주제는 **"Zod 라이브러리 파헤치기"** 로 잡았다.
꾸미는거는 다 생략하고 아주 간단하게 만들어봤는데, 공식문서를 다 참고하고 에러가 어떻게 뜨는지 다 사용해보면서 만들어보니 시간은 많이 소요됐지만 잘 이해됐던거 같다.
암튼 질 좋은 공부가 된것같아 뿌듯 -✨
