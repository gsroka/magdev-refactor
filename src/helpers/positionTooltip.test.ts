import { describe, it, expect, afterEach } from 'vitest';
import { calculateTooltipPosition } from './positionTooltip';

describe('calculateTooltipPosition', () => {
    // DOMRect-like object
    const createRect = (
        x: number,
        y: number,
        width: number,
        height: number
    ): DOMRect =>
    ({
        x,
        y,
        width,
        height,
        top: y,
        right: x + width,
        bottom: y + height,
        left: x,
        toJSON: () => { },
    } as DOMRect);

    // Preserve original window dimensions
    const originalInnerWidth = window.innerWidth;
    const originalInnerHeight = window.innerHeight;

    afterEach(() => {
        // Restore window dimensions after each test
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: originalInnerWidth,
        });
        Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: originalInnerHeight,
        });
    });

    const setWindowSize = (width: number, height: number) => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: width,
        });
        Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: height,
        });
    };

    it('positions tooltip at the bottom correctly', () => {
        setWindowSize(1024, 768);
        // Button at (100, 100), 50x50. Center X = 125, Bottom Y = 150
        const rect = createRect(100, 100, 50, 50);
        const tooltipWidth = 100;
        const tooltipHeight = 50;
        const offset = 10;

        const pos = calculateTooltipPosition(
            rect,
            'bottom',
            tooltipWidth,
            tooltipHeight,
            offset
        );

        // Left: CenterX (125) - HalfTooltip (50) = 75
        // Top: BottomY (150) + Offset (10) = 160
        expect(pos).toEqual({ top: 160, left: 75 });
    });

    it('positions tooltip at the top correctly', () => {
        setWindowSize(1024, 768);
        // Button at (100, 200), 50x50.
        const rect = createRect(100, 200, 50, 50);
        const pos = calculateTooltipPosition(rect, 'top', 100, 50, 10);

        // Top: TopY (200) - TooltipHeight (50) - Offset (10) = 140
        expect(pos).toEqual({ top: 140, left: 75 });
    });

    it('positions tooltip at the left correctly', () => {
        setWindowSize(1024, 768);
        // Button at (200, 100), 50x50. Center Y = 125.
        const rect = createRect(200, 100, 50, 50);
        const pos = calculateTooltipPosition(rect, 'left', 100, 50, 10);

        // Top: CenterY (125) - HalfHeight (25) = 100
        // Left: LeftX (200) - Width (100) - Offset (10) = 90
        expect(pos).toEqual({ top: 100, left: 90 });
    });

    it('positions tooltip at the right correctly', () => {
        setWindowSize(1024, 768);
        // Button at (200, 100), 50x50.
        const rect = createRect(200, 100, 50, 50);
        const pos = calculateTooltipPosition(rect, 'right', 100, 50, 10);

        // Left: RightX (250) + Offset (10) = 260
        expect(pos).toEqual({ top: 100, left: 260 });
    });

    it('clamps tooltip to viewport (top-left edge)', () => {
        setWindowSize(1024, 768);
        // Button very close to top-left (0,0)
        const rect = createRect(0, 0, 50, 50);

        // Attempt to position 'top' which would result in negative coordinates:
        // Top: 0 - 50 - 10 = -60
        // Left: 25 - 50 = -25
        const pos = calculateTooltipPosition(rect, 'top', 100, 50, 10);

        // Should clamp to min 10px
        expect(pos).toEqual({ top: 10, left: 10 });
    });

    it('clamps tooltip to viewport (bottom-right edge)', () => {
        setWindowSize(500, 500);
        // Button close to bottom-right (450, 450)
        const rect = createRect(450, 450, 50, 50);

        // Position 'bottom', would push it off screen
        // Top: 500 + 10 = 510 (Screen height is 500)
        // Left: 475 - 50 = 425

        // Max Top: 500 - 50 (height) - 10 (margin) = 440
        // Max Left: 500 - 100 (width) - 10 (margin) = 390

        const pos = calculateTooltipPosition(rect, 'bottom', 100, 50, 10);

        // The function clamps with: Math.min(top, window.innerHeight - tooltipHeight - 10)
        expect(pos.top).toBe(440);
        // The left calculation (425) is > maxLeft (390), so it should be clamped to 390
        expect(pos.left).toBe(390);
    });
});
