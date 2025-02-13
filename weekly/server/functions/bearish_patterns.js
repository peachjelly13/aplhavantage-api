const bearishEngulfing = (currentOpen, currentClose, previousOpen, previousClose) => {
    return (
        previousClose > previousOpen &&  
        currentClose < currentOpen &&    
        currentOpen > previousClose &&   
        currentClose < previousOpen      
    );
};

const shootingStar = (open, close, high, low) => {
    const bodySize = Math.abs(close - open);
    const totalRange = high - low;
    const upperWick = high - Math.max(open, close);
    const lowerWick = Math.min(open, close) - low;

    return (
        lowerWick <= 0.3 * totalRange &&  
        bodySize <= 0.3 * totalRange &&   
        upperWick >= 2 * bodySize         
    );
};

const eveningStar = (
    firstOpen, firstClose,
    secondOpen, secondClose,
    thirdOpen, thirdClose
) => {
    return (
        firstClose > firstOpen &&         
        secondOpen > firstClose &&        
        thirdClose < thirdOpen &&         
        thirdClose < firstOpen            
    );
};

export{
    bearishEngulfing,shootingStar,eveningStar
}