import { useState, useEffect, RefObject } from 'react';

export const useIntersection = (
	ref: RefObject<HTMLElement | null>,
	options: IntersectionObserverInit,
): IntersectionObserverEntry | null => {
	const [observer, setObserver] = useState<IntersectionObserverEntry | null>(null);

	useEffect(() => {
		if (!ref.current || typeof IntersectionObserver !== 'function') return () => {};

		const handler = (entries: IntersectionObserverEntry[]) => setObserver(entries[0]);
		const observer = new IntersectionObserver(handler, options);
		observer.observe(ref.current);

		return () => {
			setObserver(null);
			observer.disconnect();
		};
	}, [ref.current, options.threshold, options.root, options.rootMargin]);

	return observer;
};
