import { useState, useEffect } from 'react';

import { UseAtBottomPropsType } from './use-at-bottom.types';

export const useAtBottom = ({ containerRef, offset = 0 }: UseAtBottomPropsType): boolean => {
	const [isAtBottom, setIsAtBottom] = useState(false);

	const onScroll = () => {
		let hasReachedBottom = false;

		if (containerRef?.current) {
			const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
			hasReachedBottom = scrollTop + clientHeight >= scrollHeight - offset;
		} else {
			hasReachedBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - offset;
		}

		setIsAtBottom(hasReachedBottom);
	};

	useEffect(() => {
		const element = containerRef?.current || window;

		onScroll();
		element.addEventListener('scroll', onScroll, { passive: true });
		return () => {
			element.removeEventListener('scroll', onScroll);
		};
	}, [containerRef, offset]);

	return isAtBottom;
};
