// this is to create all the functions that we would use to get our trends 

const priceTrend = function(open,close){
    if(close>open){
        return "Bullish Trend (Uptrend)";
    }
    else if(open>close){
        return "Bearish Trend (Downtrend)";
    }
    else{
        return "Neutral Trend (No movement)";
    }
}

const return_max_value = function(one,two,three,max_){
    if(one===max_){
        return "Most of the times the stock is: Bullish Trend (Uptrend)"
    }
    else if(two===max_){
         return "Most of the times the stock is: Bearish Trend (Downtrend))"
    }
    else{
        return "Most of the times the stock is: Neutral Trend (No movement)"
    }
}



export{priceTrend,return_max_value}