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
				className={cn("flex", className)}
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
		<Input ref={ref} className={cn("rounded-l-none", className)} {...props} />
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
		<label className="relative shrink-0">
			<select
				aria-label="Select country"
				className="h-9 appearance-none rounded-l-md border border-r-0 border-input bg-transparent pl-11 pr-8 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
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
			<div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
				<FlagComponent country={value} countryName={value} />
			</div>
			<span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-xs text-muted-foreground">
				▾
			</span>
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
