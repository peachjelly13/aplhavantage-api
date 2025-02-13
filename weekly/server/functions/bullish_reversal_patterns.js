const bullishEngulfing = function(currentOpen, currentClose, previousOpen, previousClose) {
    const isPreviousBearish = previousClose < previousOpen;
    const isCurrentBullish = currentClose > currentOpen;
    const engulfsPrevious = currentOpen < previousClose && currentClose > previousOpen;
    if (isPreviousBearish && isCurrentBullish && engulfsPrevious) {
        return "Bullish Engulfing Pattern";
    }
    return false;
};

const hammer = function(open, close, high, low) {
    const bodySize = Math.abs(close - open);
    const totalRange = high - low;
    const upperWick = high - Math.max(open, close);
    const lowerWick = Math.min(open, close) - low;
    const isSmallUpperWick = upperWick <= 0.3 * totalRange;
    const isSmallBody = bodySize <= 0.3 * totalRange;
    const isLongLowerWick = lowerWick >= 2 * upperWick;

    if (isSmallUpperWick && isSmallBody && isLongLowerWick) {
        return "Hammer pattern";
    }
    return false;
};

const morningStar = (
    firstOpen, firstClose,
    secondOpen, secondClose,
    thirdOpen, thirdClose
) => {
    return (
        firstClose < firstOpen &&          
        secondOpen < firstClose &&         
        thirdClose > thirdOpen &&          
        thirdClose > firstOpen             
    );
};

export{bullishEngulfing,morningStar,hammer}