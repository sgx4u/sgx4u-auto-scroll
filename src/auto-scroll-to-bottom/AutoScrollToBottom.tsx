import { forwardRef, useEffect, useRef, useImperativeHandle } from 'react';

import { AutoScrollToBottomPropsType } from './auto-scroll-to-bottom.types';
import { useIntersection } from '../use-intersection/useIntersection';
import { useAtBottom } from '../use-at-bottom/useAtBottom';

export const AutoScrollToBottom = forwardRef(
	({ containerRef, stopAutoScroll, bottomHeight = '80px' }: AutoScrollToBottomPropsType, ref) => {
		const isAtBottom = useAtBottom({ containerRef });
		const endPointRef = useRef<HTMLDivElement>(null);

		const endPointObserver = useIntersection(endPointRef, { root: null, rootMargin: '0px', threshold: 1 });
		const isEndPointVisible = endPointObserver?.isIntersecting || false;

		useImperativeHandle(ref, () => ({
			scrollToBottom,
		}));

		const scrollToBottom = () => {
			if (!endPointRef.current) return;
			endPointRef.current.scrollIntoView({ behavior: 'smooth' });
		};

		useEffect(() => {
			if (!endPointRef.current || isEndPointVisible || stopAutoScroll || !isAtBottom) {
				return () => {};
			}
			endPointRef.current.scrollIntoView({ behavior: 'smooth' });
		}, [isEndPointVisible, isAtBottom]);

		return <div ref={endPointRef} style={{ height: bottomHeight }}></div>;
	},
);

AutoScrollToBottom.displayName = 'AutoScrollToBottom';
