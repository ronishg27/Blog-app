/* eslint-disable react/prop-types */

export default function Button({
	children,
	bgColor = "bg-blue-500",
	className = "",
	...props
}) {
	// console.log(bgColor);
	return (
		<button
			className={`px-4 py-2 rounded-lg border-2 ${bgColor} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}
