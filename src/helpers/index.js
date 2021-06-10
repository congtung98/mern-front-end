export const sum = ( obj ) => {
    var sum = 0;
    for( var el in obj ) {
      if( obj.hasOwnProperty( el ) ) {
        sum += parseFloat( obj[el] );
      }
    }
    return sum;
}

export const ratingOverall = (key, index, rating) => {
    console.log(key, index, rating);
    return ((rating[1] + rating[2]*2 + rating[3]*3 + rating[4]*4 + rating[5]*5) / sum(key.rating)).toFixed(1);
}

export const calculateOffer = (price, offer) => {
    return price*offer/100;
}