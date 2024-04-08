"use client";

import * as AriaKit from "@ariakit/react";
import { formErrorStyle } from "./form.css";
import { FC } from "react";
import { border } from "src/components/recipies";

const FormRoot = AriaKit.Form;

const FormLabel = AriaKit.FormLabel;

export type FormInputProps = AriaKit.FormInputProps;

const FormInput = AriaKit.FormInput;

const FormError: FC<AriaKit.FormErrorProps> = ({ className, ...props }) => {
	return (
		<AriaKit.FormError className={cn(formErrorStyle, className)} {...props} />
	);
};

export interface FormCheckboxProps
	extends Omit<AriaKit.FormCheckboxProps, "store" | "onClick"> {
	store: AriaKit.FormStore;
}

const FormReset = AriaKit.FormReset;

const useFormStore = AriaKit.useFormStore;

function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const FormField: FC<AriaKit.FormInputProps> = ({ name, ...props }) => {
	return (
		<AriaKit.Group aria-label="form field" style={{ textAlign: "start" }}>
			<Form.Label
				name={name}
				className={cn(
					stack({ direction: "col", gap: "sm" }),
					css({ color: "text2" }),
				)}
			>
				<span>{capitalizeFirstLetter(name.toString())}</span>
				<Form.Input
					name={name}
					className={cn(
						css({
							bg: "bgComponent",
							p: "medium",
							color: "text2",
							fontSize: "medium",
						}),
						border({ rounded: "radius", color: "interactive", side: "all" }),
					)}
					{...props}
				/>
			</Form.Label>
			<Form.Error name={name} className={css({ paddingTop: "small" })} />
		</AriaKit.Group>
	);
};

export const Form = {
	Root: FormRoot,
	Label: FormLabel,
	Field: FormField,
	Input: FormInput,
	Reset: FormReset,
	Error: FormError,
	useStore: useFormStore,
};
