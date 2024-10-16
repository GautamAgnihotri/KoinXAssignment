import Crypto from "../model/crypto.js";
import calculateStandardDeviation from "../service/cryptoService.js";


const getCryptoStats = async (req, res) => {
    const { coin } = req.query;
    try {
        const latestCryptoData = await Crypto.findOne({ coin}).sort({timestamp: -1});

        if(!latestCryptoData) return res.status(404).json({message: 'Data not found'}); 

        res.json({
            price: latestCryptoData.price,
            marketCap: latestCryptoData.marketCap,
            '24hChange': latestCryptoData.change24h
        })
    } catch (error){
        res.status(500).json({error: 'Server error: '+ error})
    }
};

const getCryptoDeviation = async (req, res) => {
    const { coin} = req.query;
    try {
        const priceData = await Crypto.find({ coin }).sort({timestamp: -1}).limit(100);
        if(priceData.length === 0 ) return res.status(404).json({message: "No Data available"});
        const prices = priceData.map(data => data.price);
    
        const deviation = calculateStandardDeviation(prices);

        res.json({ deviation});
    } catch(error) {
        res.status(500).json({error: 'Server error: '+ error});
    }

    
}

export { getCryptoStats, getCryptoDeviation };