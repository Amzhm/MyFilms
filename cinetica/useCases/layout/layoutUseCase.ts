// useCases/layout/layoutUseCase.ts
export class LayoutUseCase {
    private readonly MOBILE_BREAKPOINT = 1024;

    isMobileView(width: number): boolean {
        return width < this.MOBILE_BREAKPOINT;
    }

    shouldCollapseOnMobile(isMobile: boolean): boolean {
        return isMobile;
    }
}