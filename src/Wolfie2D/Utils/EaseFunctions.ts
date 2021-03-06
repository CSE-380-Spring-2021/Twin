// @ignorePage

export default class EaseFunctions {

    static easeInOutSine(x: number): number {
        return -(Math.cos(Math.PI * x) - 1) / 2;
    }

    static easeOutInSine(x: number): number {
        return x < 0.5 ? -Math.cos(Math.PI*(x + 0.5))/2 : -Math.cos(Math.PI*(x - 0.5))/2 + 1;
    }

    static easeOutSine(x: number): number {
        return Math.sin((x * Math.PI) / 2);
    }

    static easeInSine(x: number): number {
        return 1 - Math.cos((x * Math.PI) / 2); 
    }

    static easeInOutQuint(x: number): number {
        return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;    
    }

    static easeInOutQuad(x: number): number {
        return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    }

    static easeOutInQuad(x: number): number {
        return x < 0.5 ? this.easeOutIn_OutPow(x, 2) : this.easeOutIn_InPow(x, 2);
    }

    private static easeOutIn_OutPow(x: number, pow: number): number {
        return 0.5 - Math.pow(-2 * x + 1, pow) / 2;
    }

    private static easeOutIn_InPow(x: number, pow: number): number {
        return 0.5 + Math.pow(2 * x - 1, pow) / 2;
    }

    private static easeInWithDelay (x: number): number {
        return (x > 0.5) ? (x - 0.5) * 2 : 0;
    }

    private static linear (x: number): number {
        return x;
    }

    private static playerDying (x: number): number {
        return (x > 0.33) ? 1 : (x * 3);
    }

    private static flash (x: number): number {
        return (x > 0.0 && x < 0.1)? 1 : (1 - x);
    }

    private static blink(x: number): number {
        if (x < 0.25) { return 0; }
        if (0.25 < x && x < 0.5) { return 1; }
        if (0.5 < x && x < 0.75) { return 0; }
        else { return 1; }
    }

    private static freeze(x: number): number {
        return 0.5;
    }
}

export enum EaseFunctionType {
    // SINE
    IN_OUT_SINE = "easeInOutSine",
    OUT_IN_SINE = "easeOutInSine",
    IN_SINE = "easeInSine",
    OUT_SINE = "easeOutSine",

    // QUAD
    IN_OUT_QUAD = "easeInOutQuad",
    OUT_IN_QUAD = "easeOutInQuad",

    // QUINT
    IN_OUT_QUINT = "easeInOutQuint",

    // CUSTOM
    EASE_IN_WITH_DELAY = "easeInWithDelay",
    LINEAR = "linear",
    PLAYER_DYING = "playerDying",
    FLASH = "flash",
    BLINK = "blink",
    FREEZE = "freeze",
}