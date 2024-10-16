

const calculateStandardDeviation = (prices) => {
    const len = prices.length;
    const mean = prices.reduce((acc, price) => acc + price, 0) / len;
    const variance = prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0)/len;

    return Math.sqrt(variance);
}

export default calculateStandardDeviation;