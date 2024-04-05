import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
