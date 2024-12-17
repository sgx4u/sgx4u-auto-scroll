import { RefObject } from 'react';

export type AutoScrollToBottomPropsType = {
	containerRef?: RefObject<HTMLDivElement>;
	stopAutoScroll?: boolean;
	bottomHeight?: string;
};
