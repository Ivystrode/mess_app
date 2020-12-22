import React from 'react';

// function OrderLoading(Component) {
//     return function OrderLoadingComponent({ isLoading, ...props }) {
//         // if (!isLoading) return <Component {...props}/>;
//         console.log("LOADING COMPONENT")
//         return (
//             <p style={{fontSize: '25px'}}>
//                 Data is loading...
//             </p>
//         )
//     }
// }

// export default OrderLoading;

function OrderLoading(Component) {
	return function OrderLoadingComponent({ isLoading, ...props }) {
		if (!isLoading) return <Component {...props} />;
		return (
			<p style={{ fontSize: '25px' }}>
				We are waiting for the data to load!...
			</p>
		);
	};
}
export default OrderLoading;