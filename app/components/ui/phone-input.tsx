"use client";

import * as React from "react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

type PhoneInputProps = Omit<React.ComponentProps<"input">, "onChange" | "value" | "ref"> &
	Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
		onChange?: (value: RPNInput.Value) => void;
	};

const PhoneInput = React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
	({ className, onChange, value, ...props }, ref) => {
		return (
			<RPNInput.default
				ref={ref}
				className={cn("flex w-full min-w-0", className)}
				flagComponent={FlagComponent}
				countrySelectComponent={CountrySelect}
				inputComponent={InputComponent}
				smartCaret={false}
				value={value || undefined}
				onChange={(nextValue) => onChange?.(nextValue || ("" as RPNInput.Value))}
				{...props}
			/>
		);
	}
);
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
	({ className, ...props }, ref) => (
		<Input ref={ref} className={cn("min-w-0 rounded-l-none", className)} {...props} />
	)
);
InputComponent.displayName = "PhoneInputInput";

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
	disabled?: boolean;
	value: RPNInput.Country;
	options: CountryEntry[];
	onChange: (country: RPNInput.Country) => void;
};

function CountrySelect({ disabled, value, options, onChange }: CountrySelectProps) {
	return (
		<label className="relative block shrink-0">
			<select
				aria-label="Select country"
				className="absolute inset-0 z-10 h-9 w-16 cursor-pointer appearance-none opacity-0 disabled:pointer-events-none disabled:cursor-not-allowed"
				disabled={disabled}
				value={value}
				onChange={(event) => onChange(event.target.value as RPNInput.Country)}
			>
				{options.map(({ label, value: optionValue }) =>
					optionValue ? (
						<option key={optionValue} value={optionValue}>
							{label} +{RPNInput.getCountryCallingCode(optionValue)}
						</option>
					) : null
				)}
			</select>
			<div className="flex h-9 w-16 items-center justify-center gap-1 rounded-l-md border border-r-0 border-input bg-transparent px-2 text-muted-foreground">
				<FlagComponent country={value} countryName={value} />
				<span className="text-xs">▾</span>
			</div>
		</label>
	);
}

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
	const Flag = flags[country];

	return (
		<span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 [&_svg]:size-full">
			{Flag ? <Flag title={countryName} /> : null}
		</span>
	);
};

export { PhoneInput };
