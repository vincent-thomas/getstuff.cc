import * as AriaKit from "@ariakit/react";
import { formErrorStyle } from "./form.css";
import { FC } from "react";

const FormRoot = AriaKit.Form;

const FormLabel = AriaKit.FormLabel;

export type FormInputProps = AriaKit.FormInputProps;

const FormInput = AriaKit.FormInput;

interface FormErrorProps extends AriaKit.FormErrorProps {}

const FormError: FC<FormErrorProps> = ({ className, ...props }) => {
	return (
		<AriaKit.FormError className={cn(formErrorStyle, className)} {...props} />
	);
};

const FormReset = AriaKit.FormReset;

const useFormStore = AriaKit.useFormStore;

export const Form = {
	Root: FormRoot,
	Label: FormLabel,
	Input: FormInput,
	Reset: FormReset,
	Error: FormError,
	useStore: useFormStore,
};
