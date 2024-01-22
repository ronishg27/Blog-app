/* eslint-disable react/prop-types */

import reactLogo from "../assets/react.svg";
function Logo({ width = "100px" }) {
	return (
		<div className={`w-[${width}]`}>
			<img src={reactLogo} alt="logo" />
		</div>
	);
}

export default Logo;
