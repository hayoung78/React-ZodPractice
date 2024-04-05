import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Schema from "./Schema";

const ZodComponent = () => {
    const {
        register,
        handleSubmit,
        formState: { error },
    } = useForm({
        resolver: zodResolver(Schema),
    });
    return (
        <>
            <form>
                <h2>ZodComponent</h2>
                <input {...register("age")} />
            </form>
        </>
    );
};
export default ZodComponent;
